import { weaponChoices } from "@/data/sheet-mods";
import {
  MAX_DP,
  MAX_ENHANCEMENTS,
  detachmentById,
  enhancementById,
  repeatable,
  spentDp,
} from "@/data/enhancements";
import {
  attachmentMates,
  canBeWarlord,
  categoryLimit,
  cleanGear,
  copyLimit,
  isCharacter,
  isSupport,
  reconcileAttachments,
  sizeOf,
  unitById,
  unitCategory,
} from "@/data/units";

export type Entry = {
  id: string;
  unitId: string;
  models: number;
  addedAt?: number;
  attachedTo?: string;
  enhancementId?: string;
  /** Equipped weapon an enhancement modifies, when the enhancement changes a weapon. */
  enhancementWeapon?: string;
  gear?: Record<string, string>;
};

export type Roster = {
  name: string;
  limit: number;
  detachments: string[];
  mainDisposition?: string;
  warlordId?: string;
  building: boolean;
  entries: Entry[];
};

export type SavedList = Roster & { id: string; updatedAt: number };

/**
 * Storage keys are part of the contract with lists already on devices.
 * Renaming either key orphans every saved army.
 */
export const LIBRARY_KEY = "shield-host-library-v1";
export const LEGACY_ROSTER_KEY = "shield-host-roster-v1";
/** Exact pre-upgrade payload, written once. Never read back over the live library. */
export const LIBRARY_BACKUP_KEY = "shield-host-library-v1-backup";
export const LIBRARY_VERSION_KEY = "shield-host-library-version";
/**
 * 1 — implicit library written before Support characters (no version key).
 * 2 — Support joins beside a Leader. The saved array shape is unchanged;
 *     Knight-Centura and the Ministorum Priest keep `attachedTo`.
 */
export const LIBRARY_VERSION = 2;

export const EMPTY: Roster = { name: "The Ten Thousand", limit: 2000, detachments: [], building: false, entries: [] };

export type KeyValueStore = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};

export type LibraryLoad = {
  lists: SavedList[];
  /** False when the stored payload could not be read. The caller must not overwrite it. */
  persist: boolean;
};

export function dispositionChoices(detachments: readonly string[]): string[] {
  const choices: string[] = [];
  for (const id of detachments) {
    for (const name of detachmentById(id)?.dispositions ?? []) {
      if (!choices.includes(name)) choices.push(name);
    }
  }
  return choices;
}

export function cleanMainDisposition(detachments: readonly string[], value?: string) {
  const choices = dispositionChoices(detachments);
  if (value && choices.includes(value)) return value;
  return choices.length === 1 ? choices[0] : undefined;
}

function arrange(entries: Entry[], warlordId?: string): Entry[] {
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  const used = new Set<string>();
  const result: Entry[] = [];

  const pushGroup = (body: Entry) => {
    if (used.has(body.id)) return;
    const attached = entries.filter((entry) => entry.attachedTo === body.id);
    const leader = attached.find((entry) => !isSupport(entry.unitId));
    const support = attached.find((entry) => isSupport(entry.unitId));
    if (leader && !used.has(leader.id)) {
      result.push(leader);
      used.add(leader.id);
    }
    if (support && !used.has(support.id)) {
      result.push(support);
      used.add(support.id);
    }
    result.push(body);
    used.add(body.id);
  };

  const pushEntry = (entry: Entry) => {
    if (used.has(entry.id)) return;
    if (entry.attachedTo) {
      const body = byId.get(entry.attachedTo);
      if (body && !used.has(body.id)) pushGroup(body);
    } else if (entries.some((other) => other.attachedTo === entry.id)) {
      pushGroup(entry);
    }
    if (!used.has(entry.id)) {
      result.push(entry);
      used.add(entry.id);
    }
  };

  const warlord = warlordId ? byId.get(warlordId) : undefined;
  if (warlord && canBeWarlord(warlord.unitId)) pushEntry(warlord);
  for (const entry of entries) {
    if (isCharacter(entry.unitId)) pushEntry(entry);
  }
  for (const entry of entries) pushEntry(entry);
  return result;
}

/** Drop one list entry. Characters joined to it become unattached; nothing else is removed. */
export function withoutEntry<T extends { id: string; attachedTo?: string }>(entries: readonly T[], id: string): T[] {
  return entries
    .filter((entry) => entry.id !== id)
    .map((entry) => (entry.attachedTo === id ? { ...entry, attachedTo: undefined } : { ...entry }));
}

/**
 * Point a Leader or Support at a bodyguard, or clear the link.
 * A second model in the same role is detached. The other role stays.
 * One enhancement remains for the whole group.
 */
export function retargetAttachment<T extends Entry>(entries: readonly T[], characterId: string, bodyId: string): T[] {
  const character = entries.find((entry) => entry.id === characterId);
  if (!character) return entries.map((entry) => ({ ...entry }));
  const support = isSupport(character.unitId);
  return entries.map((entry) => {
    if (entry.id === characterId) {
      const shared =
        bodyId !== "" &&
        entries.some(
          (other) =>
            other.id !== characterId &&
            Boolean(other.enhancementId) &&
            (other.id === bodyId || other.attachedTo === bodyId),
        );
      const drop = shared && Boolean(entry.enhancementId);
      return {
        ...entry,
        attachedTo: bodyId || undefined,
        enhancementId: drop ? undefined : entry.enhancementId,
        enhancementWeapon: drop ? undefined : entry.enhancementWeapon,
      };
    }
    if (bodyId && entry.id !== characterId && entry.attachedTo === bodyId && isSupport(entry.unitId) === support) {
      return { ...entry, attachedTo: undefined };
    }
    return { ...entry };
  });
}

export function settle(roster: Roster): Roster {
  const ordered = [...roster.entries].sort(
    (left, right) => (left.addedAt ?? 0) - (right.addedAt ?? 0) || left.id.localeCompare(right.id),
  );
  const counts = new Map<string, number>();
  const categoryCounts = new Map<string, number>();
  const keepIds = new Set<string>();
  const retinue: typeof ordered = [];
  for (const entry of ordered) {
    const unit = unitById(entry.unitId);
    if (!unit) continue;
    const count = counts.get(entry.unitId) ?? 0;
    if (count >= copyLimit(unit, roster.detachments)) continue;
    const category = unitCategory(unit, roster.detachments);
    if (category === "Imperial Retinue") {
      counts.set(entry.unitId, count + 1);
      retinue.push(entry);
      continue;
    }
    const cap = categoryLimit(category);
    const inCategory = categoryCounts.get(category) ?? 0;
    if (cap != null && inCategory >= cap) continue;
    counts.set(entry.unitId, count + 1);
    categoryCounts.set(category, inCategory + 1);
    keepIds.add(entry.id);
  }
  const sponsors = ordered.filter((entry) => keepIds.has(entry.id));
  let freeAgents = sponsors.filter((entry) => ["coteaz", "draxus", "greyfax", "inquisitor"].includes(entry.unitId)).length;
  let freeVoidsmen = sponsors.filter((entry) => entry.unitId === "navigator" || entry.unitId === "rogue-trader").length;
  let retinueRoom = categoryLimit("Imperial Retinue") ?? 2;
  for (const entry of retinue) {
    if (entry.unitId === "inquisitorial-agents" && freeAgents > 0) {
      freeAgents -= 1;
      keepIds.add(entry.id);
      continue;
    }
    if (entry.unitId === "voidsmen" && freeVoidsmen > 0) {
      freeVoidsmen -= 1;
      keepIds.add(entry.id);
      continue;
    }
    if (retinueRoom <= 0) continue;
    retinueRoom -= 1;
    keepIds.add(entry.id);
  }
  const kept = roster.entries.filter((entry) => keepIds.has(entry.id));
  const entries = reconcileAttachments(kept, roster.detachments);
  const eligible = entries.filter((entry) => canBeWarlord(entry.unitId));
  const warlordId = eligible.some((entry) => entry.id === roster.warlordId)
    ? roster.warlordId
    : eligible.length === 1
      ? eligible[0]!.id
      : undefined;
  return {
    ...roster,
    warlordId,
    mainDisposition: cleanMainDisposition(roster.detachments, roster.mainDisposition),
    entries: arrange(entries, warlordId),
  };
}

function legalDetachments(ids: string[]): string[] {
  if (ids.includes("guardians")) return ["guardians"];
  const kept: string[] = [];
  let uniqueTaken = false;
  for (const id of ids) {
    const detachment = detachmentById(id);
    if (!detachment) continue;
    if (detachment.unique && uniqueTaken) continue;
    if (spentDp([...kept, id]) > MAX_DP) continue;
    kept.push(id);
    if (detachment.unique) uniqueTaken = true;
  }
  return kept;
}

export function rosterFrom(parsed: Partial<Roster> | null): Roster {
  if (!parsed) return { ...EMPTY, entries: [] };
  const entries = Array.isArray(parsed.entries)
    ? parsed.entries.flatMap((entry, index) => {
        if (!entry || typeof entry.id !== "string" || typeof entry.unitId !== "string" || typeof entry.models !== "number") {
          return [];
        }
        const unitId = entry.unitId === "shield-captain-shield" ? "shield-captain" : entry.unitId;
        if (!unitById(unitId) || !sizeOf(unitById(unitId)!, entry.models)) return [];
        const next: Entry = {
          id: entry.id,
          unitId,
          models: entry.models,
          addedAt: typeof entry.addedAt === "number" ? entry.addedAt : index,
        };
        if (entry.unitId === "shield-captain-shield") next.gear = { weapon: "shield-pyrithite" };
        if (typeof entry.attachedTo === "string") next.attachedTo = entry.attachedTo;
        if (typeof entry.enhancementId === "string") next.enhancementId = entry.enhancementId;
        if (typeof entry.enhancementWeapon === "string") next.enhancementWeapon = entry.enhancementWeapon;
        const gear = cleanGear(next.unitId, next.gear ?? entry.gear, next.models);
        if (gear) next.gear = gear;
        return [next];
      })
    : [];
  const detachments = legalDetachments(
    Array.isArray(parsed.detachments) ? parsed.detachments.filter((id): id is string => typeof id === "string") : [],
  );
  const attached = reconcileAttachments(entries, detachments);
  const seenEnhancements = new Set<string>();
  const enhanced = new Set<string>();
  for (const entry of attached) {
    const enhancement = entry.enhancementId ? enhancementById(entry.enhancementId) : undefined;
    const partnerHas = attachmentMates(entry, attached).some((mate) => enhanced.has(mate.id));
    const allowed =
      enhancement &&
      detachments.includes(enhancement.detachment) &&
      enhancement.targets.includes(entry.unitId) &&
      !partnerHas &&
      (repeatable(enhancement) || !seenEnhancements.has(enhancement.id)) &&
      (seenEnhancements.has(enhancement.id) || seenEnhancements.size < MAX_ENHANCEMENTS);
    if (!enhancement || !allowed) {
      delete entry.enhancementId;
      delete entry.enhancementWeapon;
      continue;
    }
    if (enhancement.weaponMod) {
      const choices = weaponChoices(entry.unitId, entry.models, entry.gear, enhancement.weaponMod.scope);
      entry.enhancementWeapon = choices.some((choice) => choice.id === entry.enhancementWeapon) ? entry.enhancementWeapon : choices[0]?.id;
    } else {
      delete entry.enhancementWeapon;
    }
    seenEnhancements.add(enhancement.id);
    enhanced.add(entry.id);
  }
  const stored = parsed as Partial<Roster> & { mainDispositions?: Record<string, unknown> };
  const legacyMain = stored.mainDispositions
    ? Object.values(stored.mainDispositions).find((value): value is string => typeof value === "string")
    : undefined;
  const warlordId = typeof parsed.warlordId === "string" ? parsed.warlordId : undefined;
  return settle({
    name: typeof parsed.name === "string" ? parsed.name : EMPTY.name,
    limit: typeof parsed.limit === "number" && parsed.limit > 0 ? parsed.limit : EMPTY.limit,
    detachments,
    mainDisposition: typeof parsed.mainDisposition === "string" ? parsed.mainDisposition : legacyMain,
    warlordId,
    building: parsed.building === true,
    entries: attached,
  });
}

function savedListFrom(source: Partial<SavedList>): SavedList {
  const roster = rosterFrom(source);
  return {
    ...roster,
    id: typeof source.id === "string" ? source.id : crypto.randomUUID(),
    updatedAt: typeof source.updatedAt === "number" ? source.updatedAt : Date.now(),
  };
}

function parseLibrary(raw: string): SavedList[] {
  const parsed = JSON.parse(raw) as unknown;
  if (!Array.isArray(parsed)) throw new Error("Saved library is not an array");
  return parsed.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    return [savedListFrom(item as Partial<SavedList>)];
  });
}

function parseLegacy(raw: string): SavedList[] {
  const roster = rosterFrom(JSON.parse(raw) as Partial<Roster>);
  if (!roster.detachments.length && !roster.entries.length) return [];
  return [{ ...roster, id: crypto.randomUUID(), updatedAt: Date.now() }];
}

function worthBackingUp(raw: string | null): raw is string {
  if (raw == null) return false;
  const trimmed = raw.trim();
  return trimmed.length > 0 && trimmed !== "[]" && trimmed !== "null";
}

/**
 * Read the library, keep every list, and snapshot the original payload once.
 * A payload that cannot be parsed is left untouched (`persist: false`).
 */
export function loadSavedLibrary(storage: KeyValueStore): LibraryLoad {
  const raw = storage.getItem(LIBRARY_KEY);
  const legacy = storage.getItem(LEGACY_ROSTER_KEY);
  const storedVersion = Number(storage.getItem(LIBRARY_VERSION_KEY) ?? "0");
  if (storedVersion < LIBRARY_VERSION && storage.getItem(LIBRARY_BACKUP_KEY) == null) {
    const snapshot = worthBackingUp(raw) ? raw : worthBackingUp(legacy) ? legacy : null;
    if (snapshot != null) storage.setItem(LIBRARY_BACKUP_KEY, snapshot);
  }

  try {
    const lists = raw != null ? parseLibrary(raw) : legacy != null ? parseLegacy(legacy) : [];
    if (storedVersion < LIBRARY_VERSION) storage.setItem(LIBRARY_VERSION_KEY, String(LIBRARY_VERSION));
    return { lists, persist: true };
  } catch {
    return { lists: [], persist: false };
  }
}
