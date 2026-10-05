import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Crown, Minus, Plus, Trash2 } from "lucide-react";
import { Collapse, MotionSwap, Reveal } from "@/components/motion";
import { APP_VERSION_LABEL } from "@/lib/app-version";
import { useListMotion } from "@/lib/motion";
import { DatasheetView, WargearPicker } from "@/components/datasheet-view";
import { DetachmentSheet } from "@/components/detachment-sheet";
import { CoreRules } from "@/components/core-rules";
import { Settings, applySettings, loadReduceMotion, loadTheme, type ThemeId } from "@/components/settings";
import { PlayView, type PlayEntry } from "@/components/play-view";
import { datasheetById } from "@/data/datasheets";
import { chosenWeapon, weaponChoices } from "@/data/sheet-mods";
import { katahByName } from "@/data/rules";
import {
  EMPTY,
  LIBRARY_KEY,
  cleanMainDisposition,
  dispositionChoices,
  loadSavedLibrary,
  retargetAttachment,
  settle,
  withoutEntry,
  type Entry,
  type Roster,
  type SavedList,
} from "@/data/saved-library";
import {
  DETACHMENTS,
  ENHANCEMENTS,
  MAX_DP,
  MAX_ENHANCEMENTS,
  detachmentById,
  enhancementById,
  enhancementsFor,
  bearerNames,
  repeatable,
  spentDp,
  type Enhancement,
} from "@/data/enhancements";
import { formatShareList } from "@/data/list-export";
import {
  UNITS,
  attachSummary,
  attachmentMates,
  canLead,
  canSupport,
  canBeWarlord,
  armedWith,
  cleanGear,
  categoryLimit,
  copyLimit,
  costNote,
  gearLine,
  gearLineCounted,
  gearPoints,
  isSupport,
  ordinal,
  priceLine,
  retinueCounting,
  sizeOf,
  squadCost,
  unitById,
  unitCategory,
  withinCategoryCap,
  type Unit,
  type UnitSize,
} from "@/data/units";

const CUSTODES_FILTERS = ["Characters", "Battleline", "Infantry", "Elites", "Fast Attack", "Heavy Support", "Transports"];
const ALLIED_FILTERS = ["Imperial Agents", "Imperial Retinue", "Requisitioned", "Knights", "Armigers", "Titans"];

type Screen = "home" | "saved" | "library" | "detachments" | "units" | "play";

type Priced = Entry & { copy: number; cost: number; unit: Unit; size: UnitSize };

function price(entries: Entry[]): Priced[] {
  const seen = new Map<string, number>();
  const costById = new Map<string, { copy: number; cost: number }>();
  const ordered = [...entries].sort(
    (left, right) => (left.addedAt ?? 0) - (right.addedAt ?? 0) || left.id.localeCompare(right.id),
  );
  for (const entry of ordered) {
    const unit = unitById(entry.unitId);
    const size = unit ? sizeOf(unit, entry.models) : undefined;
    if (!unit || !size) continue;
    const key = entry.unitId;
    const copyIndex = seen.get(key) ?? 0;
    seen.set(key, copyIndex + 1);
    const bonus = entry.enhancementId ? (enhancementById(entry.enhancementId)?.points ?? 0) : 0;
    costById.set(entry.id, {
      copy: copyIndex + 1,
      cost: squadCost(unit, entry.models, copyIndex) + bonus + gearPoints(entry.unitId, entry.gear, entry.models),
    });
  }
  return entries.flatMap((entry) => {
    const priced = costById.get(entry.id);
    const unit = unitById(entry.unitId);
    const size = unit ? sizeOf(unit, entry.models) : undefined;
    if (!priced || !unit || !size) return [];
    return [{ ...entry, ...priced, unit, size }];
  });
}

function categoryCount(category: string, entries: Entry[], detachments: readonly string[]): number {
  return entries.filter((entry) => {
    const unit = unitById(entry.unitId);
    return unit != null && unitCategory(unit, detachments) === category;
  }).length;
}

function nextCost(unit: Unit, models: number, entries: Entry[], detachments: readonly string[]): number | null {
  const ofUnit = entries.filter((entry) => entry.unitId === unit.id).length;
  if (ofUnit >= copyLimit(unit, detachments)) return null;
  if (!withinCategoryCap(unit, entries, detachments)) return null;
  if (!sizeOf(unit, models)) return null;
  return squadCost(unit, models, ofUnit);
}

function bodyguardSheet(entryId: string | undefined, entries: readonly Entry[]) {
  const entry = entryId ? entries.find((candidate) => candidate.id === entryId) : undefined;
  if (!entry?.attachedTo) return undefined;
  const body = entries.find((candidate) => candidate.id === entry.attachedTo);
  return body ? { unitId: body.unitId, gear: body.gear } : undefined;
}


function enhancementSlots(entries: Entry[], exceptId?: string): Set<string> {
  return new Set(
    entries
      .filter((entry) => entry.id !== exceptId && entry.enhancementId)
      .map((entry) => entry.enhancementId!),
  );
}

function choicesFor(entry: Entry, roster: Roster): Enhancement[] {
  const slots = enhancementSlots(roster.entries, entry.id);
  return ENHANCEMENTS.filter((enhancement) => {
    if (!roster.detachments.includes(enhancement.detachment)) return false;
    if (!enhancement.targets.includes(entry.unitId)) return false;
    if (entry.enhancementId === enhancement.id) return true;
    if (attachmentMates(entry, roster.entries).some((mate) => mate.enhancementId)) return false;
    if (!repeatable(enhancement) && roster.entries.some((other) => other.enhancementId === enhancement.id)) return false;
    if (!slots.has(enhancement.id) && slots.size >= MAX_ENHANCEMENTS) return false;
    return true;
  });
}


const UNIQUE_ORDER = ["shadowkeepers", "solar", "dread-host", "emissaries", "chosen", "aquilan"];

function orderedDetachments(unique: boolean) {
  const items = DETACHMENTS.filter((detachment) => Boolean(detachment.unique) === unique);
  if (!unique) return items;
  return UNIQUE_ORDER.map((id) => items.find((detachment) => detachment.id === id)).filter((item) => item != null);
}

function DetachmentChoices({
  selected,
  mainDisposition,
  onToggle,
  onMainDisposition,
  onRules,
}: {
  selected: string[];
  mainDisposition?: string;
  onToggle: (id: string) => void;
  onMainDisposition: (disposition: string) => void;
  onRules: (id: string) => void;
}) {
  const guardians = selected.includes("guardians");
  const uniqueTaken = selected.some((id) => detachmentById(id)?.unique);
  const groups = [
    { title: "Shield Hosts", hint: "Only one of these can be taken.", items: orderedDetachments(true) },
    { title: "Other detachments", hint: "These can be combined with each other, and with one unique.", items: orderedDetachments(false) },
  ];
  const choices = dispositionChoices(selected);
  return (
    <div className="flex flex-col gap-6">
      {choices.length > 0 ? (
        <section>
          <h2 className="font-display text-lg">Main disposition</h2>
          {choices.length > 1 ? (
            <label className="mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted">
              Choose one from the detachments below
              <select
                aria-label="Main disposition"
                value={mainDisposition && choices.includes(mainDisposition) ? mainDisposition : ""}
                onChange={(event) => onMainDisposition(event.target.value)}
                className="weapon-select mt-1 h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
              >
                <option value="" disabled>
                  Choose
                </option>
                {choices.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <p className="mt-1 text-sm">{choices[0]}</p>
          )}
        </section>
      ) : null}
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="font-display text-lg">{group.title}</h2>
          <p className="mt-1 text-sm text-muted">{group.hint}</p>
          <div className="mt-3 grid gap-2">
            {group.items.map((detachment) => {
              const on = selected.includes(detachment.id);
              const blocked =
                !on &&
                ((detachment.unique && uniqueTaken && !guardians) ||
                  (detachment.id !== "guardians" && !guardians && spentDp(selected) + detachment.dp > MAX_DP));
              return (
                <div
                  key={detachment.id}
                  className={`motion-card rounded-lg border px-4 py-3 ${on ? "border-gold bg-surface" : "border-line bg-bg"} ${
                    blocked ? "opacity-40" : ""
                  }`}
                >
                  <button
                    type="button"
                    disabled={blocked}
                    onClick={() => onToggle(detachment.id)}
                    className="flex min-h-11 w-full min-w-0 flex-col items-start text-left disabled:cursor-not-allowed"
                  >
                    <span className="text-base font-medium">{detachment.name}</span>
                    {detachment.unique ? (
                      <span className="mt-1 min-w-0 text-xs break-words text-muted">
                        Shield Host{detachment.flavor ? ` — ${detachment.flavor}` : ""}
                      </span>
                    ) : null}
                    <span className="mt-1 text-xs text-muted">
                      Force disposition: {detachment.dispositions.join(", ")}
                    </span>
                  </button>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={!on}
                      onClick={() => onToggle(detachment.id)}
                      className={`min-h-11 rounded-lg border px-3 text-xs disabled:opacity-40 ${
                        on ? "border-gold text-gold" : "border-line text-muted"
                      }`}
                    >
                      Deselect
                    </button>
                    <button
                      type="button"
                      onClick={() => onRules(detachment.id)}
                      className="min-h-11 rounded-lg border border-line px-3 text-xs text-muted"
                    >
                      Rules
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function HomeButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 w-fit rounded-lg border border-line px-3 py-2 text-sm">
      Home
    </button>
  );
}

function DetachmentLibrary({ onHome }: { onHome: () => void }) {
  const groups = [
    { title: "Shield Hosts", items: orderedDetachments(true) },
    { title: "Other detachments", items: orderedDetachments(false) },
  ];
  const [id, setId] = useState(groups[0]?.items[0]?.id ?? "");
  const detachment = detachmentById(id) ?? groups[0]?.items[0];
  const katah = detachment?.katah ? katahByName(detachment.katah.name) : undefined;
  const enhancements = detachment ? enhancementsFor(detachment.id) : [];

  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-3">
        <HomeButton onClick={onHome} />
        <div>
          <p className="text-xs font-medium tracking-wide text-gold uppercase">Adeptus Custodes</p>
          <h1 className="mt-1 font-display text-3xl leading-tight">Detachments</h1>
          <p className="mt-3 max-w-xl text-sm text-muted">Pick one detachment. The rest stay in the menu.</p>
        </div>
        <label className="flex w-full max-w-sm flex-col items-start text-xs text-muted">
          Detachment
          <select
            aria-label="Detachment"
            value={detachment?.id ?? ""}
            onChange={(event) => setId(event.target.value)}
            className="weapon-select mt-1 h-8 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
          >
            {groups.map((group) => (
              <optgroup key={group.title} label={group.title}>
                {group.items.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </header>
      {detachment ? (
        <article key={detachment.id} className="section-open flex min-w-0 flex-col gap-4">
          <div>
            <h2 className="font-display text-2xl">{detachment.name}</h2>
            <p className="mt-1 text-xs text-muted">
              {detachment.dp} DP
              {detachment.unique ? ` · Shield Host${detachment.flavor ? ` — ${detachment.flavor}` : ""}` : ""}
            </p>
            <p className="mt-2 text-sm">Force disposition: {detachment.dispositions.join(", ")}</p>
          </div>
          {detachment.rule ? (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">{detachment.rule.name}</h3>
              <p className="mt-1 text-sm">{detachment.rule.text}</p>
            </section>
          ) : null}
          {detachment.katah ? (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">Favoured Ka’tah · {detachment.katah.name}</h3>
              {katah ? <p className="mt-1 text-sm">{katah.rule}</p> : null}
              <p className="mt-1 text-sm">Additional effect: {detachment.katah.effect}</p>
            </section>
          ) : null}
          {enhancements.length > 0 ? (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">Enhancements</h3>
              <ul className="mt-2 flex flex-col gap-3">
                {enhancements.map((enhancement) => (
                  <li key={enhancement.id}>
                    <p className="text-sm font-medium">
                      {enhancement.name} · {enhancement.points} pts
                      {enhancement.once ? " · one per army" : enhancement.upgrade ? " · upgrade" : ""}
                    </p>
                    <p className="text-sm text-muted">{enhancement.rule}</p>
                    <p className="text-xs text-muted">{bearerNames(enhancement.targets)}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {detachment.stratagems.length > 0 ? (
            <section>
              <h3 className="text-xs tracking-wide text-gold uppercase">Stratagems</h3>
              <ul className="mt-2 flex flex-col gap-3">
                {detachment.stratagems.map((stratagem) => (
                  <li key={stratagem.name}>
                    <p className="text-sm font-medium">
                      {stratagem.name} · {stratagem.cp} CP
                    </p>
                    <p className="text-xs text-gold">{stratagem.when}</p>
                    <p className="text-sm text-muted">{stratagem.rule}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      ) : null}
    </main>
  );
}

function EnhancementPick({
  unitId,
  unitName,
  models,
  gear,
  value,
  weapon,
  choices,
  onChange,
  onWeapon,
}: {
  unitId: string;
  unitName: string;
  models: number;
  gear?: Record<string, string>;
  value: string;
  weapon?: string;
  choices: Enhancement[];
  onChange: (enhancementId: string) => void;
  onWeapon: (weaponId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = choices.find((enhancement) => enhancement.id === value);
  const weapons = selected?.weaponMod ? weaponChoices(unitId, models, gear, selected.weaponMod.scope) : [];
  const picked = chosenWeapon(weapons, weapon);
  return (
    <div className="mt-2 flex w-full min-w-0 flex-col items-start">
      <span className="text-xs text-muted">Enhancement</span>
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Enhancement for ${unitName}`}
        onClick={() => setOpen((current) => !current)}
        className="mt-1 inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-line bg-bg px-2 text-xs text-fg"
      >
        <MotionSwap cue={selected?.id ?? "none"} className="min-w-0 truncate">
          {selected ? `${selected.name} +${selected.points} pts` : "None"}
        </MotionSwap>
        <ChevronDown className={`motion-rotate size-3.5 shrink-0 text-gold ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>
      <Collapse open={Boolean(selected) && !open}>
        <p className="mt-1 max-w-full text-xs break-words text-muted">{selected?.rule}</p>
      </Collapse>
      {selected?.weaponMod ? (
        weapons.length > 1 ? (
          <label className="mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted">
            {selected.weaponMod.scope === "ranged" ? "Ranged weapon" : "Melee weapon"}
            <select
              aria-label={`Weapon modified by ${selected.name}`}
              value={picked?.id ?? ""}
              onChange={(event) => onWeapon(event.target.value)}
              className="wargear-select mt-1 h-8 w-fit max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
            >
              {weapons.map((choice) => (
                <option key={choice.id} value={choice.id}>
                  {choice.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <p className="mt-1 text-xs text-muted">
            {weapons.length === 1 ? `Modifies ${weapons[0]!.label}` : `No equipped ${selected.weaponMod.scope} weapon.`}
          </p>
        )
      ) : null}
      <Collapse open={open}>
        <div className="mt-1 flex w-full min-w-0 flex-col">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className={`border-b border-line py-2 text-left text-xs ${value ? "text-muted" : "text-gold"}`}
          >
            None
          </button>
          {choices.map((enhancement) => (
            <button
              key={enhancement.id}
              type="button"
              onClick={() => {
                onChange(enhancement.id);
                setOpen(false);
              }}
              className="border-b border-line py-2 text-left last:border-b-0"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className={`min-w-0 text-xs break-words ${enhancement.id === value ? "text-gold" : ""}`}>
                  {enhancement.name}
                  {enhancement.once ? " · one per army" : enhancement.upgrade ? " · upgrade" : ""}
                </span>
                <span className="shrink-0 text-xs text-gold">+{enhancement.points} pts</span>
              </span>
              <span className="mt-0.5 block text-xs break-words text-muted">{enhancement.rule}</span>
            </button>
          ))}
        </div>
      </Collapse>
    </div>
  );
}

export function ListBuilder() {
  const savedListRef = useListMotion<HTMLDivElement>();
  const rosterRef = useListMotion<HTMLOListElement>();
  const [lists, setLists] = useState<SavedList[]>([]);
  const [persistLibrary, setPersistLibrary] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [screen, setScreen] = useState<Screen>("home");
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<string>("Characters");
  const [panel, setPanel] = useState<"units" | "list">("units");
  const [sizes, setSizes] = useState<Record<string, number>>({});
  const [copied, setCopied] = useState(false);
  const [draftGear, setDraftGear] = useState<Record<string, Record<string, string>>>({});
  const [sheet, setSheet] = useState<{ unitId: string; entryId?: string } | null>(null);
  const [rulesIds, setRulesIds] = useState<string[] | null>(null);
  const [coreOpen, setCoreOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeId>("auramite");
  const [reduceMotion, setReduceMotion] = useState(false);
  const roster = lists.find((list) => list.id === activeId) ?? EMPTY;

  function setRoster(update: Roster | ((current: Roster) => Roster)) {
    setLists((currentLists) =>
      currentLists.map((list) => {
        if (list.id !== activeId) return list;
        const next = typeof update === "function" ? update(list) : update;
        return { ...next, id: list.id, updatedAt: Date.now() };
      }),
    );
  }

  useEffect(() => {
    const loaded = loadSavedLibrary(localStorage);
    setLists(loaded.lists);
    setPersistLibrary(loaded.persist);
    const nextTheme = loadTheme();
    const nextMotion = loadReduceMotion();
    setTheme(nextTheme);
    setReduceMotion(nextMotion);
    applySettings(nextTheme, nextMotion);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || !persistLibrary) return;
    localStorage.setItem(LIBRARY_KEY, JSON.stringify(lists));
  }, [lists, ready, persistLibrary]);

  const priced = useMemo(() => price(roster.entries), [roster.entries]);
  const total = priced.reduce((sum, entry) => sum + entry.cost, 0);
  const remaining = roster.limit - total;
  const over = remaining < 0;
  const fill = roster.limit > 0 ? Math.min(100, Math.round((total / roster.limit) * 100)) : 0;

  function chooseTheme(next: ThemeId) {
    setTheme(next);
    applySettings(next, reduceMotion);
  }

  function chooseMotion(next: boolean) {
    setReduceMotion(next);
    applySettings(theme, next);
  }

  const settings = settingsOpen ? (
    <Settings
      theme={theme}
      reduceMotion={reduceMotion}
      onTheme={chooseTheme}
      onMotion={chooseMotion}
      onClose={() => setSettingsOpen(false)}
    />
  ) : null;

  function nextStamp(entries: Entry[]): number {
  const latest = entries.reduce((max, entry) => Math.max(max, entry.addedAt ?? 0), 0);
  return Math.max(Date.now(), latest + 1);
}

  function chosenModels(unit: Unit): number {
    return sizes[unit.id] ?? unit.sizes[0]!.models;
  }

  function add(unit: Unit, models: number) {
    setRoster((current) => {
      if (nextCost(unit, models, current.entries, current.detachments) == null) return current;
      return settle({
        ...current,
        entries: [
          ...current.entries,
          {
            id: crypto.randomUUID(),
            unitId: unit.id,
            models,
            addedAt: nextStamp(current.entries),
            gear: cleanGear(unit.id, draftGear[unit.id], models),
          },
        ],
      });
    });
  }

  function remove(id: string) {
    setRoster((current) => settle({ ...current, entries: withoutEntry(current.entries, id) }));
  }

  function attach(characterId: string, bodyId: string) {
    setRoster((current) => settle({ ...current, entries: retargetAttachment(current.entries, characterId, bodyId) }));
  }

  function setDraft(unitId: string, groupId: string, choiceId: string) {
    setDraftGear((current) => {
      const next = { ...(current[unitId] ?? {}) };
      if (!choiceId) delete next[groupId];
      else next[groupId] = choiceId;
      if (unitId === "knight-destrier") {
        const left = next["mount-a"];
        const right = next["mount-b"];
        if (left && left === right && (left === "chainsword" || left === "spear")) return current;
      }
      if (unitId === "inquisitor" && next.melee === "force" && next.gifts !== "gifts") {
        if (groupId === "melee") return current;
        next.melee = "melee";
      }
      return { ...current, [unitId]: next };
    });
  }

  function setEnhancementWeapon(entryId: string, weaponId: string) {
    setRoster((current) => ({
      ...current,
      entries: current.entries.map((entry) => (entry.id === entryId ? { ...entry, enhancementWeapon: weaponId } : entry)),
    }));
  }

  function setEnhancement(entryId: string, enhancementId: string) {
    setRoster((current) => ({
      ...current,
      entries: current.entries.map((entry) => {
        if (entry.id !== entryId) return entry;
        if (!enhancementId) return { ...entry, enhancementId: undefined, enhancementWeapon: undefined };
        const allowed = choicesFor(entry, current).some((enhancement) => enhancement.id === enhancementId);
        if (!allowed) return entry;
        const mod = enhancementById(enhancementId)?.weaponMod;
        if (!mod) return { ...entry, enhancementId, enhancementWeapon: undefined };
        const weapons = weaponChoices(entry.unitId, entry.models, entry.gear, mod.scope);
        const keep = weapons.some((choice) => choice.id === entry.enhancementWeapon);
        return { ...entry, enhancementId, enhancementWeapon: keep ? entry.enhancementWeapon : weapons[0]?.id };
      }),
    }));
  }

  function toggleDetachment(id: string) {
    setRoster((current) => {
      const detachment = detachmentById(id);
      if (!detachment) return current;
      let detachments: string[];
      if (current.detachments.includes(id)) {
        detachments = current.detachments.filter((picked) => picked !== id);
      } else if (detachment.dp === MAX_DP || current.detachments.includes("guardians")) {
        detachments = [id];
      } else if (detachment.unique && current.detachments.some((picked) => detachmentById(picked)?.unique)) {
        return current;
      } else if (spentDp(current.detachments) + detachment.dp > MAX_DP) {
        return current;
      } else {
        detachments = [...current.detachments, id];
      }
      return settle({
        ...current,
        detachments,
        entries: current.entries.map((entry) => {
          const enhancement = entry.enhancementId ? enhancementById(entry.enhancementId) : undefined;
          if (enhancement && !detachments.includes(enhancement.detachment)) {
            return { ...entry, enhancementId: undefined };
          }
          return entry;
        }),
      });
    });
  }

  function setMainDisposition(disposition: string) {
    setRoster((current) => settle({ ...current, mainDisposition: disposition }));
  }

  function setWarlord(id: string) {
    setRoster((current) => settle({ ...current, warlordId: id }));
  }

  function exportText(): string {
    const detachmentNames = roster.detachments
      .map((id) => detachmentById(id)?.name)
      .filter(Boolean)
      .join(", ");
    return formatShareList({
      name: roster.name,
      total,
      limit: roster.limit,
      detachmentNames,
      entries: priced.map((entry) => {
        const enhancement = entry.enhancementId ? enhancementById(entry.enhancementId) : undefined;
        return {
          id: entry.id,
          unitId: entry.unitId,
          name: entry.unit.name,
          models: entry.models,
          cost: entry.cost,
          gear: entry.gear,
          attachedTo: entry.attachedTo,
          warlord: entry.id === roster.warlordId,
          enhancement: enhancement
            ? { id: enhancement.id, name: enhancement.name, upgrade: enhancement.upgrade }
            : undefined,
        };
      }),
    });
  }

  async function copyList() {
    const text = exportText();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  const visible = UNITS.filter((unit) => unitCategory(unit, roster.detachments) === category);

  function createList() {
    const id = crypto.randomUUID();
    const list: SavedList = { ...EMPTY, name: "", id, updatedAt: Date.now() };
    setLists((current) => [list, ...current]);
    setActiveId(id);
    setScreen("detachments");
  }

  function openList(id: string) {
    const list = lists.find((item) => item.id === id);
    if (!list) return;
    setActiveId(id);
    setScreen(list.name.trim() && list.detachments.length ? "units" : "detachments");
  }

  function deleteList(id: string) {
    setLists((current) => current.filter((list) => list.id !== id));
    if (activeId === id) {
      setActiveId(null);
      setScreen("home");
    }
  }

  function leaveToHome() {
    setLists((current) =>
      current.filter((list) => list.id !== activeId || list.detachments.length > 0 || list.entries.length > 0),
    );
    setActiveId(null);
    setScreen("home");
  }

  if (!ready) return <main className="min-h-screen" />;

  if (screen === "library") {
    return <DetachmentLibrary onHome={() => setScreen("home")} />;
  }

  if (screen === "home" || (!activeId && screen !== "saved")) {
    return (
      <main className="page-enter mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-6 px-4 pt-6 pr-[max(1rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))]">
        <header>
          <p className="text-xs font-medium tracking-wide text-gold uppercase">Adeptus Custodes</p>
          <h1 className="mt-1 font-display text-3xl leading-tight">The Ten Thousand's List Builder</h1>
          <p className="mt-3 max-w-xl text-sm text-muted">Create a list, or open one you already saved.</p>
        </header>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={createList}
            className="min-h-11 rounded-lg bg-gold px-4 py-4 text-left text-base font-medium text-bg"
          >
            Create a list
          </button>
          <button
            type="button"
            onClick={() => setScreen("saved")}
            className="min-h-11 rounded-lg border border-line bg-surface px-4 py-4 text-left text-base font-medium"
          >
            View a saved list
          </button>
          <button
            type="button"
            onClick={() => setScreen("library")}
            className="min-h-11 rounded-lg border border-line bg-surface px-4 py-4 text-left text-base font-medium"
          >
            Detachments
          </button>
          <button
            type="button"
            onClick={() => setCoreOpen(true)}
            className="min-h-11 rounded-lg border border-line px-4 py-3 text-left text-sm"
          >
            Core rules
          </button>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="min-h-11 rounded-lg border border-line px-4 py-3 text-left text-sm"
          >
            Settings
          </button>
        </div>
        {coreOpen ? <CoreRules onClose={() => setCoreOpen(false)} /> : null}
        {settings}
        <p className="pointer-events-none mt-auto max-w-full self-end pt-4 text-right text-[11px] leading-tight tracking-wide text-muted">
          {APP_VERSION_LABEL}
        </p>
      </main>
    );
  }

  if (screen === "saved") {
    const saved = [...lists].sort((a, b) => b.updatedAt - a.updatedAt);
    return (
      <main className="page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6">
        <header className="flex flex-col gap-3">
          <HomeButton onClick={() => setScreen("home")} />
          <div>
            <p className="text-xs font-medium tracking-wide text-gold uppercase">Adeptus Custodes</p>
            <h1 className="mt-1 font-display text-3xl leading-tight">Saved lists</h1>
          </div>
        </header>
        {saved.length === 0 ? (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-muted">No saved lists.</p>
            <button
              type="button"
              onClick={createList}
              className="min-h-11 w-fit rounded-lg bg-gold px-4 py-3 text-sm font-medium text-bg"
            >
              Create a list
            </button>
          </div>
        ) : (
          <div ref={savedListRef} className="flex flex-col gap-2">
            {saved.map((list) => {
              const points = price(list.entries).reduce((sum, entry) => sum + entry.cost, 0);
              const names = list.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ");
              return (
                <div key={list.id} className="flex items-stretch gap-2">
                  <button
                    type="button"
                    onClick={() => openList(list.id)}
                    className="motion-card min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 py-4 text-left"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-base font-medium">{list.name.trim() || "Unnamed"}</span>
                      <span className="shrink-0 text-sm text-gold">
                        {points} pts / {list.limit} pts
                      </span>
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {names || "No detachments"} · {list.entries.length} {list.entries.length === 1 ? "unit" : "units"}
                    </span>
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${list.name}`}
                    onClick={() => deleteList(list.id)}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-muted"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    );
  }

  if (screen === "detachments") {
    return (
      <>
      <main className="page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6 pb-24">
        <header>
          <div className="flex flex-col gap-3">
            <HomeButton onClick={leaveToHome} />
            <div>
              <p className="text-xs font-medium tracking-wide text-gold uppercase">Adeptus Custodes</p>
              <h1 className="mt-1 font-display text-3xl leading-tight">Choose detachments</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCoreOpen(true)}
                className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
              >
                Army rules
              </button>
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
              >
                Settings
              </button>
            </div>
          </div>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Choose detachments before the list. You have {MAX_DP} detachment points. Guardians of the Throne costs 3.
            Shield Hosts cannot be taken together. Use Deselect on a highlighted detachment to remove it.
          </p>
          <p className="mt-3 text-sm text-muted">
            {spentDp(roster.detachments)} / {MAX_DP} DP
          </p>
          <label className="mt-4 block text-xs tracking-wide text-muted uppercase">
            List name
            <input
              aria-label="List name"
              value={roster.name}
              onChange={(event) => setRoster((current) => ({ ...current, name: event.target.value }))}
              className="mt-1 w-full rounded-lg border border-line bg-surface px-3 py-3 text-base font-normal tracking-normal text-fg normal-case"
            />
          </label>
        </header>
        <DetachmentChoices
          selected={roster.detachments}
          mainDisposition={roster.mainDisposition}
          onToggle={toggleDetachment}
          onMainDisposition={setMainDisposition}
          onRules={(id) => setRulesIds([id])}
        />
        <div className="fixed inset-x-0 bottom-0 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm text-muted">
              {!roster.name.trim()
                ? "Name the list"
                : dispositionChoices(roster.detachments).length > 1 && !roster.mainDisposition
                  ? "Choose a main disposition"
                  : `${spentDp(roster.detachments)} / ${MAX_DP} DP`}
            </p>
            <button
              type="button"
              disabled={
                !roster.name.trim() ||
                roster.detachments.length === 0 ||
                (dispositionChoices(roster.detachments).length > 1 && !roster.mainDisposition)
              }
              onClick={() => {
                setRoster((current) => ({ ...current, name: current.name.trim(), building: true }));
                setScreen("units");
              }}
              className="min-h-11 rounded-lg bg-gold px-4 py-3 text-sm font-medium text-bg disabled:opacity-40"
            >
              Build list
            </button>
          </div>
        </div>
      </main>
      {rulesIds ? <DetachmentSheet ids={rulesIds} onClose={() => setRulesIds(null)} /> : null}
      {coreOpen ? <CoreRules army onClose={() => setCoreOpen(false)} /> : null}
      {settings}
      </>
    );
  }

  if (screen === "play") {
    const playEntries: PlayEntry[] = priced.map((entry) => ({
      id: entry.id,
      unitId: entry.unitId,
      name: entry.unit.name,
      models: entry.models,
      cost: entry.cost,
      warlord: entry.id === roster.warlordId,
      enhancement: entry.enhancementId ? enhancementById(entry.enhancementId)?.name : undefined,
      enhancementId: entry.enhancementId,
      enhancementWeapon: entry.enhancementWeapon,
      gearText: gearLine(entry.unitId, entry.gear) || undefined,
      gear: entry.gear,
      attachedTo: entry.attachedTo,
    }));
    return (
      <PlayView
        name={roster.name}
        total={total}
        limit={roster.limit}
        detachments={roster.detachments}
        mainDisposition={roster.mainDisposition}
        dispositionChoices={dispositionChoices(roster.detachments)}
        onMainDisposition={setMainDisposition}
        entries={playEntries}
        onBack={() => setScreen("units")}
        onHome={leaveToHome}
      />
    );
  }

  return (
    <main className="page-enter mx-auto flex min-h-screen w-full max-w-3xl min-w-0 flex-col gap-4 px-4 py-5">
      <header className="flex flex-col gap-3 border-b border-line pb-4">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={leaveToHome}
            className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
          >
            Home
          </button>
          <button
            type="button"
            disabled={!cleanMainDisposition(roster.detachments, roster.mainDisposition)}
            onClick={() => setScreen("play")}
            className="min-h-11 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-bg disabled:opacity-40"
          >
            Play
          </button>
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-wide text-gold uppercase">The Ten Thousand</p>
            <input
              aria-label="Army name"
              value={roster.name}
              onChange={(event) => setRoster((current) => ({ ...current, name: event.target.value }))}
              className="mt-1 w-full bg-transparent font-display text-2xl leading-tight text-fg outline-none"
            />
          </div>
          <label className="flex shrink-0 flex-col gap-1 text-xs tracking-wide text-muted uppercase">
            Limit
            <input
              type="number"
              min={1}
              step={50}
              value={roster.limit}
              onChange={(event) =>
                setRoster((current) => ({
                  ...current,
                  limit: Math.max(1, Number(event.target.value) || 0),
                }))
              }
              className="w-24 rounded-lg border border-line bg-surface px-3 py-2 text-base text-fg"
            />
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <div className="min-w-0">
            <p className="text-sm break-words">
              {roster.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ") || "No detachments"}
            </p>
            <p className="text-xs text-muted">
              {spentDp(roster.detachments)} / {MAX_DP} DP · {enhancementSlots(roster.entries).size} / {MAX_ENHANCEMENTS}{" "}
              enhancements
            </p>
            {dispositionChoices(roster.detachments).length > 1 ? (
              <label className="mt-3 block min-w-0 text-xs text-muted">
                Main disposition
                <select
                  aria-label="Main disposition"
                  value={
                    roster.mainDisposition && dispositionChoices(roster.detachments).includes(roster.mainDisposition)
                      ? roster.mainDisposition
                      : ""
                  }
                  onChange={(event) => setMainDisposition(event.target.value)}
                  className="mt-1 h-11 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg normal-case"
                >
                  <option value="" disabled>
                    Choose
                  </option>
                  {dispositionChoices(roster.detachments).map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setCoreOpen(true)}
              className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
            >
              Core rules
            </button>
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
            >
              Settings
            </button>
            <button
              type="button"
              onClick={() => setRulesIds(roster.detachments)}
              className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
            >
              Rules
            </button>
            <button
              type="button"
              onClick={() => setScreen("detachments")}
              className="min-h-11 rounded-lg border border-line px-3 py-2 text-sm"
            >
              Change
            </button>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-20 -mx-4 border-b border-line bg-bg px-4 py-3">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <p className={`motion-color font-display text-3xl tabular-nums ${over ? "text-danger" : "text-fg"}`}>
            <MotionSwap cue={total}>{total}</MotionSwap>{" "}
            <span className="font-sans text-base font-normal tracking-normal">pts</span>
          </p>
          <p className={`motion-color text-sm ${over ? "text-danger" : "text-muted"}`}>
            <MotionSwap cue={`${over ? "over" : "under"}-${remaining}`}>
              {over ? `${Math.abs(remaining)} pts over` : `${remaining} pts left`} of {roster.limit} pts
            </MotionSwap>
          </p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-raised">
          <div
            className={`points-fill h-full ${over ? "bg-danger" : "bg-gold"}`}
            style={{ transform: `scaleX(${fill / 100})` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["units", "list"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setPanel(key)}
              className={`min-h-11 rounded-lg border px-3 text-sm ${
                panel === key ? "border-gold bg-gold text-bg" : "border-line bg-surface text-fg"
              }`}
            >
              {key === "units" ? "Units" : <>List (<MotionSwap cue={priced.length}>{priced.length}</MotionSwap>)</>}
            </button>
          ))}
        </div>
      </div>

      <div className="grid min-w-0 gap-4 overflow-x-hidden">
        <section key={panel === "units" ? "units" : "units-hidden"} className={`min-w-0 ${panel === "list" ? "hidden" : "section-open"}`}>
          <div className="grid min-w-0 gap-2 border-b border-line py-3">
            <label className="block min-w-0 text-xs text-muted">
              Custodes
              <select
                aria-label="Custodes"
                value={CUSTODES_FILTERS.includes(category) ? category : ""}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 h-11 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg"
              >
                <option value="" disabled>
                  Custodes
                </option>
                {CUSTODES_FILTERS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="block min-w-0 text-xs text-muted">
              Allies
              <select
                aria-label="Allies"
                value={ALLIED_FILTERS.includes(category) ? category : ""}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 h-11 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg"
              >
                <option value="" disabled>
                  Allies
                </option>
                {ALLIED_FILTERS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {categoryLimit(category) != null ? (
            <p className="pt-2 text-xs text-muted">
              {category === "Imperial Retinue" ? retinueCounting(roster.entries) : categoryCount(category, roster.entries, roster.detachments)} of {categoryLimit(category)} {category}
            </p>
          ) : null}
          <Reveal cue={category} className="min-w-0">
            {visible.length === 0 ? (
              <p className="py-6 text-sm text-muted">Nothing matches.</p>
            ) : (
              visible.map((unit) => {
                const models = chosenModels(unit);
                const size = sizeOf(unit, models)!;
                const upcoming = nextCost(unit, models, roster.entries, roster.detachments);
                const gearCost = gearPoints(unit.id, draftGear[unit.id], models);
                const shown = upcoming == null ? null : upcoming + gearCost;
                const taken = roster.entries.filter((entry) => entry.unitId === unit.id).length;
                const nextLine = upcoming == null ? null : priceLine(unit, models, taken, { wargear: gearCost });
                return (
                  <article key={unit.id} className="motion-surface min-w-0 border-b border-line py-4 last:border-b-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="text-base leading-snug font-medium break-words">{unit.name}</h2>
                        <p className="mt-0.5 text-xs text-muted">{unitCategory(unit, roster.detachments)}</p>
                      </div>
                      <button
                        type="button"
                        disabled={shown == null}
                        onClick={() => add(unit, models)}
                        className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg bg-gold px-3 text-sm font-medium text-bg disabled:opacity-40"
                      >
                        <Plus className="size-4" aria-hidden="true" />
                        {shown == null ? "Max" : `${shown} pts`}
                      </button>
                    </div>
                    {unit.sizes.length > 1 || unit.sizes[0]!.models > 1 ? (
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label={`Fewer ${unit.name} models`}
                          disabled={unit.sizes.findIndex((option) => option.models === models) <= 0}
                          onClick={() => {
                            const index = unit.sizes.findIndex((option) => option.models === models);
                            const next = unit.sizes[index - 1];
                            if (!next) return;
                            setSizes((current) => ({ ...current, [unit.id]: next.models }));
                          }}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-fg disabled:opacity-40"
                        >
                          <Minus className="size-4" aria-hidden="true" />
                        </button>
                        <p className="min-w-12 text-center text-sm tabular-nums">x{models}</p>
                        <button
                          type="button"
                          aria-label={`More ${unit.name} models`}
                          disabled={unit.sizes.findIndex((option) => option.models === models) >= unit.sizes.length - 1}
                          onClick={() => {
                            const index = unit.sizes.findIndex((option) => option.models === models);
                            const next = unit.sizes[index + 1];
                            if (!next) return;
                            setSizes((current) => ({ ...current, [unit.id]: next.models }));
                          }}
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-fg disabled:opacity-40"
                        >
                          <Plus className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    ) : null}
                    <p className="mt-2 text-xs break-words text-muted">
                      {nextLine ?? costNote(unit, models, copyLimit(unit, roster.detachments))}
                    </p>
                    {attachSummary(unit.id) || unit.note ? (
                      <p className="mt-1 text-xs text-muted">
                        {[attachSummary(unit.id), unit.note].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                    {armedWith(unit.id) ? <p className="mt-2 text-xs text-muted">{armedWith(unit.id)}</p> : null}
                    <WargearPicker
                      unitId={unit.id}
                      models={models}
                      gear={draftGear[unit.id]}
                      onGear={(groupId, choiceId) => setDraft(unit.id, groupId, choiceId)}
                    />
                    {datasheetById(unit.id) ? (
                      <button
                        type="button"
                        onClick={() => setSheet({ unitId: unit.id })}
                        className="mt-1 inline-flex min-h-11 items-center text-xs text-gold"
                      >
                        Datasheet
                      </button>
                    ) : null}
                  </article>
                );
              })
            )}
          </Reveal>
        </section>

        <section key={panel === "list" ? "list" : "list-hidden"} className={panel === "units" ? "hidden" : "section-open"}>
          <div className="flex items-center justify-between gap-3 border-b border-line py-3">
            <h2 className="font-display text-lg">List</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyList}
                className="min-h-11 rounded-lg border border-line px-3 text-sm text-fg"
              >
                <MotionSwap cue={copied ? "copied" : "copy"}>{copied ? "Copied" : "Copy"}</MotionSwap>
              </button>
              <button
                type="button"
                onClick={() => setRoster((current) => settle({ ...current, entries: [], warlordId: undefined }))}
                className="min-h-11 rounded-lg border border-line px-3 text-sm text-muted"
              >
                Clear
              </button>
            </div>
          </div>
          <div>
          {priced.length === 0 ? <p className="py-6 text-sm text-muted">Add a unit.</p> : null}
            <ol ref={rosterRef}>
              {priced.length > 0 && priced.some((entry) => canBeWarlord(entry.unitId)) && !roster.warlordId ? (
                <li className="border-b border-line py-3 text-sm text-danger">Choose a warlord.</li>
              ) : null}
              {priced.map((entry) => {
                const supportCharacter = isSupport(entry.unitId);
                const targets = priced.filter((candidate) => {
                  if (candidate.id === entry.id) return false;
                  if (supportCharacter) {
                    const supportTaken = priced.some(
                      (other) => other.id !== entry.id && isSupport(other.unitId) && other.attachedTo === candidate.id,
                    );
                    return canSupport(entry.unitId, candidate.unitId) && !supportTaken;
                  }
                  const leaderTaken = priced.some(
                    (leader) => leader.id !== entry.id && !isSupport(leader.unitId) && leader.attachedTo === candidate.id,
                  );
                  return canLead(entry.unitId, candidate.unitId, roster.detachments) && !leaderTaken;
                });
                const leader = priced.find((candidate) => candidate.attachedTo === entry.id && !isSupport(candidate.unitId));
                const support = priced.find((candidate) => candidate.attachedTo === entry.id && isSupport(candidate.unitId));
                const indent = Boolean(leader || support);
                const character = canBeWarlord(entry.unitId);
                const warlord = entry.id === roster.warlordId;
                const kit = gearLineCounted(entry.unitId, entry.gear, entry.models);
                const line = priceLine(entry.unit, entry.models, entry.copy - 1, {
                  wargear: gearPoints(entry.unitId, entry.gear, entry.models),
                  enhancement: entry.enhancementId ? (enhancementById(entry.enhancementId)?.points ?? 0) : 0,
                });
                const role = entry.attachedTo ? (supportCharacter ? "Support" : "Leader") : leader || support ? "Bodyguard" : "";
                return (
                <li key={entry.id} className={`motion-surface border-b border-line py-3 last:border-b-0 ${indent ? "border-l-2 border-l-gold pl-4" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium break-words">
                        {entry.unit.name}
                        {entry.models > 1 ? ` x${entry.models}` : ""}
                      </p>
                      <p className="text-xs break-words text-muted">
                        {line}
                        {entry.unit.maxCopies === 1 ? " · one only" : ""}
                        {warlord ? " · Warlord" : ""}
                        {role ? ` · ${role}` : ""}
                        {leader ? ` · led by ${leader.unit.name}` : ""}
                        {support ? ` · supported by ${support.unit.name}` : ""}
                        {entry.enhancementId ? ` · ${enhancementById(entry.enhancementId)?.name ?? ""}` : ""}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm text-gold tabular-nums">
                      <MotionSwap cue={entry.cost}>{entry.cost} pts</MotionSwap>
                    </p>
                  </div>
                  {kit ? <p className="mt-1 text-xs break-words text-muted">{kit}</p> : null}
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {character ? (
                      <button
                        type="button"
                        aria-pressed={warlord}
                        onClick={() => setWarlord(entry.id)}
                        className={`inline-flex min-h-11 items-center gap-1 rounded-lg border px-3 text-xs ${
                          warlord ? "border-gold bg-gold text-bg" : "border-line text-muted"
                        }`}
                      >
                        <Crown className="size-4" aria-hidden="true" />
                        Warlord
                      </button>
                    ) : null}
                    {datasheetById(entry.unitId) ? (
                      <button
                        type="button"
                        onClick={() => setSheet({ unitId: entry.unitId, entryId: entry.id })}
                        className="inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-xs text-gold"
                      >
                        Datasheet
                      </button>
                    ) : null}
                    <button
                      type="button"
                      aria-label={`Remove ${entry.unit.name}`}
                      onClick={() => remove(entry.id)}
                      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-muted"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  {supportCharacter && targets.length === 0 && !entry.attachedTo ? (
                    <p className="mt-2 text-xs text-muted">{attachSummary(entry.unitId)}</p>
                  ) : null}
                  {attachSummary(entry.unitId) && (targets.length > 0 || entry.attachedTo) ? (
                    <label className="mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted">
                      {supportCharacter ? "Supporting" : "Attached to"}
                      <select
                        aria-label={supportCharacter ? `Support with ${entry.unit.name}` : `Attach ${entry.unit.name}`}
                        value={entry.attachedTo ?? ""}
                        onChange={(event) => attach(entry.id, event.target.value)}
                        className="wargear-select mt-1 h-8 w-fit max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg"
                      >
                        <option value="">Not attached</option>
                        {targets.map((candidate) => (
                          <option key={candidate.id} value={candidate.id}>
                            {candidate.unit.name}
                            {candidate.models > 1 ? ` x${candidate.models}` : ""} · {ordinal(candidate.copy)}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}
                  {(() => {
                    const choices = choicesFor(entry, roster);
                    const partnerHas = attachmentMates(entry, roster.entries).some((mate) => mate.enhancementId);
                    const couldTake = ENHANCEMENTS.some(
                      (enhancement) =>
                        roster.detachments.includes(enhancement.detachment) && enhancement.targets.includes(entry.unitId),
                    );
                    if (!couldTake && !entry.enhancementId) return null;
                    if (partnerHas && !entry.enhancementId) {
                      return <p className="mt-2 text-xs text-muted">This squad already has an enhancement.</p>;
                    }
                    return (
                      <EnhancementPick
                        unitId={entry.unitId}
                        unitName={entry.unit.name}
                        models={entry.models}
                        gear={entry.gear}
                        value={entry.enhancementId ?? ""}
                        weapon={entry.enhancementWeapon}
                        choices={choices}
                        onChange={(enhancementId) => setEnhancement(entry.id, enhancementId)}
                        onWeapon={(weaponId) => setEnhancementWeapon(entry.id, weaponId)}
                      />
                    );
                  })()}
                </li>
                );
              })}
            </ol>
          </div>
        </section>
      </div>
      {sheet ? (
        <DatasheetView
          unitId={sheet.unitId}
          unitName={unitById(sheet.unitId)?.name ?? "Datasheet"}
          models={roster.entries.find((entry) => entry.id === sheet.entryId)?.models}
          gear={roster.entries.find((entry) => entry.id === sheet.entryId)?.gear}
          enhancementId={sheet.entryId ? roster.entries.find((entry) => entry.id === sheet.entryId)?.enhancementId : undefined}
          enhancementWeapon={sheet.entryId ? roster.entries.find((entry) => entry.id === sheet.entryId)?.enhancementWeapon : undefined}
          bodyguard={bodyguardSheet(sheet.entryId, roster.entries)}
          listOnly={Boolean(sheet.entryId)}
          onClose={() => setSheet(null)}
        />
      ) : null}
      {rulesIds ? <DetachmentSheet ids={rulesIds} armyRules onClose={() => setRulesIds(null)} /> : null}
      {coreOpen ? <CoreRules onClose={() => setCoreOpen(false)} /> : null}
      {settings}
    </main>
  );
}
