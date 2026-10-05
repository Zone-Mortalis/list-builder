import { enhancementById, type WeaponMod } from "@/data/enhancements";

/**
 * Printed datasheet characteristics an enhancement, upgrade, or wargear option
 * can change. Highlighting reads this module — a value that happens to differ
 * from the printed profile is not enough.
 */
export type UnitStat = "m" | "t" | "sv" | "w" | "ld" | "oc" | "inv";
export type WeaponStat = "range" | "a" | "skill" | "s" | "ap" | "d" | "keywords";

export type WeaponWhere =
  | { kind: "chosen" }
  | { kind: "granted"; name: string; scope: "ranged" | "melee" }
  | { kind: "equipped"; scope: "ranged" | "melee" };

export type WeaponAffect = {
  where: WeaponWhere;
  stats: readonly WeaponStat[];
  /** Weapon keywords this option adds. Omit to mark every keyword (a profile the option creates). */
  keywords?: readonly string[];
  /** Mark the weapon's name. Used when the option adds the whole profile. */
  name?: boolean;
};

export type Affects = {
  unit?: {
    stats: readonly UnitStat[];
    /**
     * Bearer-only changes stay on the first profile.
     * Unit-wide changes (`all`) mark every profile line and, while a leader is
     * attached, also change that leader's matching characteristics.
     */
    profiles?: "primary" | "all";
    /** Invulnerable save the rule gives the bearer, when that line is not already computed elsewhere. */
    inv?: string;
    /** Added to Objective Control for every model this change covers. */
    oc?: number;
    /** Leadership improved by this many steps (a 7+ becomes a 6+). */
    leadership?: number;
  };
  unitKeywords?: readonly string[];
  weapons?: readonly WeaponAffect[];
};

const WEAPON_PROFILE: readonly WeaponStat[] = ["range", "a", "skill", "s", "ap", "d", "keywords"];

/**
 * Effects that `wounds` and `weaponMod` do not already describe.
 * Granted profiles list every characteristic the rule prints for that weapon.
 */
const ENHANCEMENT_AFFECTS: Record<string, Affects> = {
  "emperors-light": {
    weapons: [
      {
        where: { kind: "granted", name: "Emperor's Light", scope: "melee" },
        stats: WEAPON_PROFILE,
        name: true,
      },
    ],
  },
  orb: {
    weapons: [
      {
        where: { kind: "granted", name: "Auriferous Orb", scope: "ranged" },
        stats: WEAPON_PROFILE,
        name: true,
      },
    ],
  },
  "hidden-blade": {
    unitKeywords: ["Stealth", "Lone Operative"],
  },
};

function counted(gear: Record<string, string> | undefined, id: string): boolean {
  return Number(gear?.[id]) > 0;
}

export function vexillaTaken(gear: Record<string, string> | undefined): boolean {
  return gear?.vexilla === "vexilla";
}

export function bannerTaken(gear: Record<string, string> | undefined): boolean {
  return counted(gear, "banner");
}

export function simulacrumTaken(unitId: string, gear: Record<string, string> | undefined): boolean {
  if (unitId === "sisters-squad") return gear?.simulacrum === "sim";
  if (unitId === "sanctifiers") return counted(gear, "simulacrum");
  return false;
}

export function astartesShieldTaken(
  unitId: string,
  gear: Record<string, string> | undefined,
): boolean {
  if (!gear) return false;
  if (unitId === "aquila")
    return Object.entries(gear).some(
      ([key, value]) => key.startsWith("hammer") && value === "shield",
    );
  if (unitId === "deathwatch-kt") {
    return (
      gear.sergeant === "shield-bolt" ||
      gear.sergeant === "shield-power" ||
      counted(gear, "shield-bolt") ||
      counted(gear, "shield-power")
    );
  }
  return false;
}

type WargearRule = {
  id: string;
  when: (unitId: string, gear: Record<string, string> | undefined) => boolean;
  affects: Affects;
};

/**
 * Wargear whose rule text changes a printed characteristic.
 * Selection checks match the gear ids the list builder stores.
 */
const WARGEAR_AFFECTS: readonly WargearRule[] = [
  {
    id: "vexilla",
    when: (_unitId, gear) => vexillaTaken(gear),
    affects: { unit: { stats: ["oc"], profiles: "all", oc: 1 } },
  },
  {
    id: "ancients-banner",
    when: (_unitId, gear) => bannerTaken(gear),
    affects: { unit: { stats: ["oc"], profiles: "all", oc: 1 } },
  },
  {
    id: "simulacrum",
    when: (unitId, gear) => simulacrumTaken(unitId, gear),
    affects: { unit: { stats: ["ld"], profiles: "all", leadership: 1 } },
  },
  {
    id: "auspex",
    when: (_unitId, gear) => gear?.extra === "auspex",
    affects: {
      weapons: [
        {
          where: { kind: "equipped", scope: "ranged" },
          stats: ["keywords"],
          keywords: ["Ignores Cover"],
        },
      ],
    },
  },
  {
    id: "soulguilt-scanner",
    when: (unitId, gear) => unitId === "exaction" && gear?.scanner === "scanner",
    affects: {
      weapons: [
        {
          where: { kind: "equipped", scope: "ranged" },
          stats: ["keywords"],
          keywords: ["Ignores Cover"],
        },
      ],
    },
  },
  {
    id: "infernum-halo",
    when: (_unitId, gear) => gear?.extra === "halo",
    affects: { unitKeywords: ["Smoke"] },
  },
  {
    id: "astartes-shield",
    when: (unitId, gear) => astartesShieldTaken(unitId, gear),
    affects: { unit: { stats: ["inv"], profiles: "primary", inv: "4+" } },
  },
  {
    id: "psychic-gifts",
    when: (unitId, gear) => unitId === "inquisitor" && gear?.gifts === "gifts",
    affects: { unitKeywords: ["Psyker"] },
  },
];

function weaponModAffect(mod: WeaponMod): WeaponAffect | undefined {
  const stats: WeaponStat[] = [];
  if (mod.attacks) stats.push("a");
  if (mod.strength) stats.push("s");
  if (mod.damage) stats.push("d");
  const keywords = mod.tags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (keywords?.length) stats.push("keywords");
  if (stats.length === 0) return undefined;
  return { where: { kind: "chosen" }, stats, keywords };
}

/** Characteristic changes for one selected enhancement, including wounds and weaponMod. */
export function enhancementAffects(enhancementId: string | undefined): Affects[] {
  const enhancement = enhancementId ? enhancementById(enhancementId) : undefined;
  if (!enhancement) return [];
  const extra = ENHANCEMENT_AFFECTS[enhancement.id];
  const weapons = [...(extra?.weapons ?? [])];
  const fromMod = enhancement.weaponMod ? weaponModAffect(enhancement.weaponMod) : undefined;
  if (fromMod) weapons.push(fromMod);
  const stats = [...(extra?.unit?.stats ?? [])];
  if (enhancement.wounds && !stats.includes("w")) stats.unshift("w");
  const unit = stats.length
    ? { stats, profiles: extra?.unit?.profiles ?? "primary", inv: extra?.unit?.inv }
    : undefined;
  const affects: Affects = {};
  if (unit) affects.unit = unit;
  if (extra?.unitKeywords?.length) affects.unitKeywords = extra.unitKeywords;
  if (weapons.length) affects.weapons = weapons;
  return Object.keys(affects).length ? [affects] : [];
}

/** Characteristic changes for wargear that is actually selected on this unit. */
export function wargearAffects(
  unitId: string,
  gear: Record<string, string> | undefined,
): Affects[] {
  return WARGEAR_AFFECTS.filter((rule) => rule.when(unitId, gear)).map((rule) => rule.affects);
}

export function selectedAffects(input: {
  unitId: string;
  gear?: Record<string, string>;
  enhancementId?: string;
}): Affects[] {
  return [...enhancementAffects(input.enhancementId), ...wargearAffects(input.unitId, input.gear)];
}

/** Invulnerable save a selected option writes onto the bearer. */
export function invulnFromAffects(affects: readonly Affects[]): string | undefined {
  for (const item of affects) {
    if (item.unit?.stats.includes("inv") && item.unit.inv) return item.unit.inv;
  }
  return undefined;
}

export type BodyguardSheet = {
  unitId: string;
  gear?: Record<string, string>;
};

/** Printed Objective Control and Leadership steps a wargear change adds. */
export function characteristicDelta(
  affects: readonly Affects[],
  profiles: "all" | "any",
): { oc: number; leadership: number } {
  let oc = 0;
  let leadership = 0;
  for (const item of affects) {
    const unit = item.unit;
    if (!unit) continue;
    if (profiles === "all" && unit.profiles !== "all") continue;
    oc += unit.oc ?? 0;
    leadership += unit.leadership ?? 0;
  }
  return { oc, leadership };
}

/**
 * Unit-wide characteristic changes from a bodyguard's selected wargear.
 * Weapon mods and bearer-only stats (a shield's invulnerable save, a scanner's
 * Ignores Cover) stay on the squad.
 */
export function inheritedUnitAffects(bodyguard: BodyguardSheet | undefined): Affects[] {
  if (!bodyguard) return [];
  const inherited: Affects[] = [];
  for (const item of wargearAffects(bodyguard.unitId, bodyguard.gear)) {
    if (item.unit?.profiles !== "all") continue;
    inherited.push({ unit: item.unit });
  }
  return inherited;
}

/** Keywords a selected option adds to every equipped weapon in that scope. */
export function equippedKeywordGrants(
  affects: readonly Affects[],
  scope: "ranged" | "melee",
): string[] {
  const tags: string[] = [];
  for (const item of affects) {
    for (const weapon of item.weapons ?? []) {
      if (weapon.where.kind === "equipped" && weapon.where.scope === scope)
        tags.push(...(weapon.keywords ?? []));
    }
  }
  return tags;
}
