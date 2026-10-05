import {
  astartesShieldTaken,
  bannerTaken,
  equippedKeywordGrants,
  invulnFromAffects,
  selectedAffects,
  simulacrumTaken,
  vexillaTaken,
  type Affects,
  type UnitStat,
  type WeaponAffect,
  type WeaponStat,
} from "@/data/characteristic-mods";
import { datasheetById, type ModelStats, type WeaponProfile } from "@/data/datasheets";
import { enhancementById, type WeaponMod } from "@/data/enhancements";
import { weaponTaken } from "@/data/units";

export type WeaponChoice = { id: string; label: string; names: string[] };

const GRANTED: Record<string, WeaponProfile[]> = {
  "emperors-light": [
    {
      name: "Emperor's Light",
      tags: "Extra Attacks",
      range: "Melee",
      a: "3",
      skill: "WS 2+",
      s: "5",
      ap: "−2",
      d: "2",
    },
  ],
  orb: [
    {
      name: "Auriferous Orb",
      tags: "Anti-non-Monster/Vehicle 2+, Blinding Light, Devastating Wounds",
      range: '12"',
      a: "3",
      skill: "BS 2+",
      s: "1",
      ap: "0",
      d: "1",
    },
  ],
};

function weaponKey(name: string): string {
  return name.split(" — ")[0]!.replace(/, supercharge$/i, "");
}

export function weaponChoices(
  unitId: string,
  models: number,
  gear: Record<string, string> | undefined,
  scope: "ranged" | "melee",
): WeaponChoice[] {
  const sheet = datasheetById(unitId);
  if (!sheet) return [];
  const groups = new Map<string, WeaponChoice>();
  for (const weapon of scope === "ranged" ? sheet.ranged : sheet.melee) {
    if (!weaponTaken(unitId, weapon.name, gear, models)) continue;
    const id = weaponKey(weapon.name);
    const existing = groups.get(id);
    if (existing) existing.names.push(weapon.name);
    else groups.set(id, { id, label: id, names: [weapon.name] });
  }
  return [...groups.values()];
}

export function chosenWeapon(
  choices: WeaponChoice[],
  selected?: string,
): WeaponChoice | undefined {
  return choices.find((choice) => choice.id === selected) ?? choices[0];
}

function addStat(value: string, delta: number): string {
  if (!delta) return value;
  const dice = value.match(/^(.*[Dd]\d*)\+(\d+)$/);
  if (dice) return `${dice[1]}+${Number(dice[2]) + delta}`;
  const split = value.match(/^(\d+)\+(\d+)$/);
  if (split) return `${split[1]}+${Number(split[2]) + delta}`;
  const plain = value.match(/^(\d+)(.*)$/);
  if (plain && !/[Dd]/.test(value)) return `${Number(plain[1]) + delta}${plain[2]}`;
  if (/[Dd]/.test(value)) return `${value}+${delta}`;
  return value;
}

function betterLeadership(value: string, steps: number): string {
  const match = value.match(/^(\d+)\+$/);
  if (!match) return value;
  return `${Math.max(2, Number(match[1]) - steps)}+`;
}

function addTags(existing: string | undefined, tags: string): string {
  const have = (existing ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);
  for (const tag of tags.split(",").map((item) => item.trim()).filter(Boolean)) {
    if (!have.some((item) => item.toLowerCase() === tag.toLowerCase())) have.push(tag);
  }
  return have.join(", ");
}

function applyWeapon(weapon: WeaponProfile, mod: WeaponMod): WeaponProfile {
  return {
    ...weapon,
    a: mod.attacks ? addStat(weapon.a, mod.attacks) : weapon.a,
    s: mod.strength ? addStat(weapon.s, mod.strength) : weapon.s,
    d: mod.damage ? addStat(weapon.d, mod.damage) : weapon.d,
    tags: mod.tags ? addTags(weapon.tags, mod.tags) : weapon.tags,
  };
}

function taken(gear: Record<string, string> | undefined, id: string): boolean {
  return Number(gear?.[id]) > 0;
}

function hasAstartesShield(unitId: string, gear: Record<string, string> | undefined): boolean {
  return astartesShieldTaken(unitId, gear);
}

function hasSimulacrum(unitId: string, gear: Record<string, string> | undefined): boolean {
  return simulacrumTaken(unitId, gear);
}

/** Optional datasheet abilities that only exist when that wargear is equipped. */
function wargearAbility(name: string, unitId: string, gear: Record<string, string> | undefined): boolean | undefined {
  switch (name.replace(/’/g, "'")) {
    case "Vexilla":
      return gear?.vexilla === "vexilla";
    case "Praesidium Shield":
      return unitId === "sentinel-guard" || (unitId === "shield-captain" && (gear?.weapon ?? "").startsWith("shield"));
    case "Ancient's Banner":
      return taken(gear, "banner");
    case "Narthecium":
      return taken(gear, "narthecium");
    case "Astartes Shield":
      return hasAstartesShield(unitId, gear);
    case "Endurant shield":
      return unitId === "breachers";
    case "Nuncio Aquila":
      return gear?.nuncio === "nuncio";
    case "Simulacrum Imperialis":
      return hasSimulacrum(unitId, gear);
    case "Auspex Array":
      return gear?.extra === "auspex";
    case "Infernum Halo-launcher":
      return gear?.extra === "halo";
    case "Blessed Wardings":
      return unitId === "inquisitor" && (gear?.gifts ?? "wardings") !== "gifts";
    case "Tome-skull":
      return taken(gear, "tome");
    default:
      return undefined;
  }
}

function patchStats(stats: ModelStats, wounds: number, oc: number, leadership: number): ModelStats {
  return {
    ...stats,
    w: wounds ? addStat(stats.w, wounds) : stats.w,
    oc: oc ? addStat(stats.oc, oc) : stats.oc,
    ld: leadership ? betterLeadership(stats.ld, leadership) : stats.ld,
  };
}

export function playSheet({
  unitId,
  models = 1,
  gear,
  enhancementId,
  enhancementWeapon,
}: {
  unitId: string;
  models?: number;
  gear?: Record<string, string>;
  enhancementId?: string;
  enhancementWeapon?: string;
}): {
  stats: ModelStats;
  profiles: { name: string; stats: ModelStats }[];
  ranged: WeaponProfile[];
  melee: WeaponProfile[];
  abilities: { name: string; rule: string }[];
} | null {
  const sheet = datasheetById(unitId);
  if (!sheet) return null;
  const enhancement = enhancementId ? enhancementById(enhancementId) : undefined;
  const affects = selectedAffects({ unitId, gear, enhancementId });
  const rangedKeywords = equippedKeywordGrants(affects, "ranged");
  const oc = (vexillaTaken(gear) ? 1 : 0) + (bannerTaken(gear) ? 1 : 0);
  const leadership = hasSimulacrum(unitId, gear) ? 1 : 0;
  const wounds = enhancement?.wounds ?? 0;
  const inv = invulnFromAffects(affects);
  const mod = enhancement?.weaponMod;
  const target = mod ? chosenWeapon(weaponChoices(unitId, models, gear, mod.scope), enhancementWeapon) : undefined;
  const adjust = (weapon: WeaponProfile, scope: "ranged" | "melee"): WeaponProfile => {
    let next = weapon;
    if (scope === "ranged" && rangedKeywords.length) next = { ...next, tags: addTags(next.tags, rangedKeywords.join(", ")) };
    if (mod && target && mod.scope === scope && target.names.includes(weapon.name)) next = applyWeapon(next, mod);
    return next;
  };
  const ranged = sheet.ranged.filter((weapon) => weaponTaken(unitId, weapon.name, gear, models)).map((weapon) => adjust(weapon, "ranged"));
  const melee = sheet.melee.filter((weapon) => weaponTaken(unitId, weapon.name, gear, models)).map((weapon) => adjust(weapon, "melee"));
  for (const weapon of enhancement ? (GRANTED[enhancement.id] ?? []) : []) {
    if (weapon.range === "Melee") melee.push(weapon);
    else ranged.push(weapon);
  }
  const abilities = sheet.abilities.filter((ability) => wargearAbility(ability.name, unitId, gear) !== false);
  if (enhancement) abilities.push({ name: enhancement.name, rule: enhancement.rule });
  const stats = patchStats(sheet.stats, wounds, oc, leadership);
  return {
    stats: inv ? { ...stats, inv } : stats,
    profiles: (sheet.profiles ?? []).map((profile) => ({
      ...profile,
      stats: patchStats(profile.stats, 0, oc, leadership),
    })),
    ranged,
    melee,
    abilities,
  };
}

export type WeaponMark = {
  name: boolean;
  stats: ReadonlySet<WeaponStat>;
  /** Lowercased keywords to mark. Null marks every keyword on the profile. */
  keywords: ReadonlySet<string> | null;
};

export type CharacteristicMarks = {
  /** Profile key (`primary` or an extra profile name) to the unit stats that option changes. */
  unit: ReadonlyMap<string, ReadonlySet<UnitStat>>;
  /** Keyed by `${scope}\\0${weapon name}`. */
  weapons: ReadonlyMap<string, WeaponMark>;
  unitKeywords: ReadonlySet<string>;
};

export function weaponMarkKey(scope: "ranged" | "melee", name: string): string {
  return `${scope}\0${name}`;
}

export function keywordMarked(mark: WeaponMark | undefined, tag: string): boolean {
  if (!mark?.stats.has("keywords")) return false;
  if (mark.keywords == null) return true;
  return mark.keywords.has(tag.toLowerCase());
}

type MutableWeaponMark = { name: boolean; stats: Set<WeaponStat>; keywords: Set<string>; allKeywords: boolean };

function addWeaponMark(weapons: Map<string, MutableWeaponMark>, scope: "ranged" | "melee", name: string, affect: WeaponAffect) {
  const key = weaponMarkKey(scope, name);
  const mark = weapons.get(key) ?? { name: false, stats: new Set<WeaponStat>(), keywords: new Set<string>(), allKeywords: false };
  if (affect.name) mark.name = true;
  for (const stat of affect.stats) mark.stats.add(stat);
  if (affect.stats.includes("keywords")) {
    if (affect.keywords?.length) {
      for (const keyword of affect.keywords) mark.keywords.add(keyword.toLowerCase());
    } else mark.allKeywords = true;
  }
  weapons.set(key, mark);
}

/** Highlights for characteristics a selected enhancement or wargear option actually changes. */
export function characteristicMarks({
  unitId,
  models = 1,
  gear,
  enhancementId,
  enhancementWeapon,
}: {
  unitId: string;
  models?: number;
  gear?: Record<string, string>;
  enhancementId?: string;
  enhancementWeapon?: string;
}): CharacteristicMarks {
  const sheet = datasheetById(unitId);
  const unit = new Map<string, Set<UnitStat>>();
  const weapons = new Map<string, MutableWeaponMark>();
  const unitKeywords = new Set<string>();
  const profileNames = sheet?.profiles?.map((profile) => profile.name) ?? [];
  const enhancement = enhancementId ? enhancementById(enhancementId) : undefined;

  const markUnit = (stat: UnitStat, profiles: "primary" | "all" | undefined) => {
    const keys = profiles === "all" ? ["primary", ...profileNames] : ["primary"];
    for (const key of keys) {
      const stats = unit.get(key) ?? new Set<UnitStat>();
      stats.add(stat);
      unit.set(key, stats);
    }
  };

  const apply = (item: Affects) => {
    if (item.unit) {
      for (const stat of item.unit.stats) markUnit(stat, item.unit.profiles);
    }
    for (const keyword of item.unitKeywords ?? []) unitKeywords.add(keyword);
    for (const weapon of item.weapons ?? []) {
      if (weapon.where.kind === "granted") addWeaponMark(weapons, weapon.where.scope, weapon.where.name, weapon);
      else if (weapon.where.kind === "equipped") {
        for (const choice of weaponChoices(unitId, models, gear, weapon.where.scope)) {
          for (const name of choice.names) addWeaponMark(weapons, weapon.where.scope, name, weapon);
        }
      } else if (enhancement?.weaponMod) {
        const chosen = chosenWeapon(weaponChoices(unitId, models, gear, enhancement.weaponMod.scope), enhancementWeapon);
        if (!chosen) continue;
        for (const name of chosen.names) addWeaponMark(weapons, enhancement.weaponMod.scope, name, weapon);
      }
    }
  };

  for (const item of selectedAffects({ unitId, gear, enhancementId })) apply(item);

  const frozen = new Map<string, WeaponMark>();
  for (const [key, mark] of weapons) {
    frozen.set(key, { name: mark.name, stats: mark.stats, keywords: mark.allKeywords ? null : mark.keywords });
  }
  return { unit, weapons: frozen, unitKeywords };
}
