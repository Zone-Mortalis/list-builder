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
  if (!gear) return false;
  if (unitId === "aquila") return Object.entries(gear).some(([key, value]) => key.startsWith("hammer") && value === "shield");
  if (unitId === "deathwatch-kt") {
    return gear.sergeant === "shield-bolt" || gear.sergeant === "shield-power" || taken(gear, "shield-bolt") || taken(gear, "shield-power");
  }
  return false;
}

function hasSimulacrum(unitId: string, gear: Record<string, string> | undefined): boolean {
  if (unitId === "sisters-squad") return gear?.simulacrum === "sim";
  if (unitId === "sanctifiers") return taken(gear, "simulacrum");
  return false;
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
  const auspex = gear?.extra === "auspex";
  const oc = (gear?.vexilla === "vexilla" ? 1 : 0) + (taken(gear, "banner") ? 1 : 0);
  const leadership = hasSimulacrum(unitId, gear) ? 1 : 0;
  const wounds = enhancement?.wounds ?? 0;
  const mod = enhancement?.weaponMod;
  const target = mod ? chosenWeapon(weaponChoices(unitId, models, gear, mod.scope), enhancementWeapon) : undefined;
  const adjust = (weapon: WeaponProfile, scope: "ranged" | "melee"): WeaponProfile => {
    let next = weapon;
    if (scope === "ranged" && auspex) next = { ...next, tags: addTags(next.tags, "Ignores Cover") };
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
  return {
    stats: patchStats(sheet.stats, wounds, oc, leadership),
    profiles: (sheet.profiles ?? []).map((profile) => ({
      ...profile,
      stats: patchStats(profile.stats, 0, oc, leadership),
    })),
    ranged,
    melee,
    abilities,
  };
}
