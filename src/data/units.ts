import { hasLoadout, loadoutGear, loadoutHas, loadoutLine, loadoutMentions, loadoutPoints } from "@/data/loadouts";

export type UnitSize = {
  models: number;
  /** Cost of the 1st copy, then the 2nd, then the 3rd, when those copies are allowed. */
  costs: number[];
  /** Cost of the 4th copy and every copy after that. */
  fourthPlus?: number;
};

export type Unit = {
  id: string;
  name: string;
  category: string;
  sizes: UnitSize[];
  /** Only this many copies may be taken. Trajann is once only; everything else uses the battleline rule. */
  maxCopies?: number;
  /** Custodian Guard datasheets. Six copies, later ones repeat the third cost. */
  battleline?: boolean;
  note?: string;
};

export const CATEGORIES = [
  "Characters",
  "Battleline",
  "Infantry",
  "Elites",
  "Fast Attack",
  "Heavy Support",
  "Transports",
  "Imperial Agents",
  "Imperial Retinue",
  "Requisitioned",
  "Knights",
  "Armigers",
  "Titans",
] as const;

const flat = (points: number): number[] => [points, points, points];

export const UNITS: Unit[] = [
  {
    id: "trajann",
    name: "Trajann Valoris",
    category: "Characters",
    sizes: [{ models: 1, costs: [265] }],
    maxCopies: 1,
  },
  {
    id: "shield-captain",
    name: "Shield-Captain",
    category: "Characters",
    sizes: [{ models: 1, costs: [180, 200, 200] }],
  },
  {
    id: "shield-captain-allarus",
    name: "Shield-Captain Allarus",
    category: "Characters",
    sizes: [{ models: 1, costs: [185, 205, 205] }],
  },
  {
    id: "shield-captain-jetbike",
    name: "Shield-Captain jetbike",
    category: "Characters",
    sizes: [{ models: 1, costs: [205, 225, 225] }],
  },
  {
    id: "blade-champion",
    name: "Blade Champion",
    category: "Characters",
    sizes: [{ models: 1, costs: [175, 175, 195] }],
  },
  {
    id: "sentinel-guard",
    name: "Sentinel Guard Sodality",
    category: "Battleline",
    battleline: true,
    sizes: [{ models: 3, costs: [240, 240, 270] }],
    note: "Sheet marks Spears beside the third cost.",
  },
  {
    id: "custodian-guard",
    name: "Custodian Guard Sodality",
    category: "Battleline",
    battleline: true,
    sizes: [{ models: 3, costs: [240, 240, 270] }],
  },
  {
    id: "wardens",
    name: "Custodian Wardens",
    category: "Elites",
    sizes: [
      { models: 2, costs: [200, 230, 230] },
      { models: 3, costs: [295, 325, 325] },
    ],
  },
  {
    id: "allarus",
    name: "Allarus Custodians",
    category: "Elites",
    sizes: [
      { models: 2, costs: [180, 180, 210] },
      { models: 3, costs: [270, 270, 300] },
    ],
  },
  {
    id: "aquilon-gauntlets",
    name: "Aquilon Gauntlets",
    category: "Elites",
    sizes: [{ models: 3, costs: [285, 285, 315] }],
  },
  {
    id: "aquilon-talons",
    name: "Aquilon Talons",
    category: "Elites",
    sizes: [{ models: 3, costs: [275, 275, 305] }],
  },
  {
    id: "venatari-kinetic",
    name: "Venatari (Kinetic Destroyers)",
    category: "Fast Attack",
    sizes: [{ models: 3, costs: [255, 255, 280] }],
    note: "Sheet marks Pistols beside the third cost.",
  },
  {
    id: "venatari-lances",
    name: "Venatari (Verutum Lances)",
    category: "Fast Attack",
    sizes: [{ models: 3, costs: [270, 270, 300] }],
    note: "Sheet marks Spears beside the third cost.",
  },
  {
    id: "vertus",
    name: "Vertus Praetors",
    category: "Fast Attack",
    sizes: [
      { models: 2, costs: [220, 240, 240] },
      { models: 3, costs: [330, 350, 350] },
    ],
  },
  {
    id: "gyrfalcon",
    name: "Gyrfalcon jetbike Sodality",
    category: "Fast Attack",
    sizes: [{ models: 2, costs: [260, 280, 280] }],
  },
  {
    id: "telemon",
    name: "Telemon",
    category: "Heavy Support",
    sizes: [{ models: 1, costs: [280, 310, 310] }],
  },
  {
    id: "galatus",
    name: "Contemptor-Galatus",
    category: "Elites",
    sizes: [{ models: 1, costs: [220, 220, 250] }],
  },
  {
    id: "achillus",
    name: "Contemptor-Achillus",
    category: "Elites",
    sizes: [{ models: 1, costs: [230, 230, 260] }],
  },
  {
    id: "pallas",
    name: "Pallas Grav-Attack",
    category: "Fast Attack",
    sizes: [{ models: 1, costs: flat(135) }],
  },
  {
    id: "coronus",
    name: "Coronus Grav-Carrier",
    category: "Transports",
    sizes: [{ models: 1, costs: [225, 225, 245] }],
  },
  {
    id: "caladius",
    name: "Caladius Grav-Tank",
    category: "Heavy Support",
    sizes: [{ models: 1, costs: [230, 230, 260] }],
  },
  {
    id: "caladius-annihilator",
    name: "Caladius Annihilator",
    category: "Heavy Support",
    sizes: [{ models: 1, costs: [250, 250, 280] }],
  },
  {
    id: "knight-centura",
    name: "Knight Centura",
    category: "Characters",
    sizes: [{ models: 1, costs: flat(55) }],
  },
  {
    id: "prosecutors",
    name: "Prosecutors",
    category: "Infantry",
    sizes: [
      { models: 4, costs: flat(45) },
      { models: 5, costs: flat(50) },
      { models: 9, costs: flat(80) },
      { models: 10, costs: flat(90) },
    ],
  },
  {
    id: "vigilators",
    name: "Vigilators",
    category: "Infantry",
    sizes: [
      { models: 4, costs: flat(50) },
      { models: 5, costs: flat(55) },
      { models: 9, costs: flat(90) },
      { models: 10, costs: flat(100) },
    ],
  },
  {
    id: "witchseekers",
    name: "Witchseekers",
    category: "Infantry",
    sizes: [
      { models: 4, costs: flat(55) },
      { models: 5, costs: flat(60) },
      { models: 9, costs: flat(100) },
      { models: 10, costs: flat(110) },
    ],
  },
  {
    id: "rhino",
    name: "Psykana Rhino",
    category: "Transports",
    sizes: [{ models: 1, costs: [70, 70, 70], fourthPlus: 80 }],
  },
  { id: "callidus", name: "Callidus Assassin", category: "Imperial Agents", sizes: [{ models: 1, costs: [100] }], maxCopies: 1 },
  { id: "culexus", name: "Culexus Assassin", category: "Imperial Agents", sizes: [{ models: 1, costs: [85] }], maxCopies: 1 },
  { id: "eversor", name: "Eversor Assassin", category: "Imperial Agents", sizes: [{ models: 1, costs: [110] }], maxCopies: 1 },
  { id: "coteaz", name: "Inquisitor Coteaz", category: "Imperial Agents", sizes: [{ models: 1, costs: [95] }], maxCopies: 1 },
  { id: "draxus", name: "Inquisitor Draxus", category: "Imperial Agents", sizes: [{ models: 1, costs: [110] }], maxCopies: 1 },
  { id: "greyfax", name: "Inquisitor Greyfax", category: "Imperial Agents", sizes: [{ models: 1, costs: [65] }], maxCopies: 1 },
  { id: "kroyle", name: "Inquisitor Kroyle", category: "Imperial Agents", sizes: [{ models: 1, costs: [100] }], maxCopies: 1 },
  { id: "vindicare", name: "Vindicare Assassin", category: "Imperial Agents", sizes: [{ models: 1, costs: [125] }], maxCopies: 1 },
  { id: "artemis", name: "Watch Captain Artemis", category: "Imperial Agents", sizes: [{ models: 1, costs: [65] }], maxCopies: 1 },
  { id: "inquisitor", name: "Inquisitor", category: "Imperial Agents", sizes: [{ models: 1, costs: flat(65) }] },
  { id: "ministorum-priest", name: "Ministorum Priest", category: "Imperial Agents", sizes: [{ models: 1, costs: flat(40) }] },
  { id: "navigator", name: "Navigator", category: "Imperial Agents", sizes: [{ models: 1, costs: flat(75) }] },
  { id: "rogue-trader", name: "Rogue Trader Entourage", category: "Imperial Agents", sizes: [{ models: 4, costs: flat(105) }] },
  { id: "watch-master", name: "Watch Master", category: "Imperial Agents", sizes: [{ models: 1, costs: flat(95) }] },
  { id: "aquila", name: "Aquila Kill Team", category: "Imperial Retinue", sizes: [{ models: 5, costs: flat(100) }, { models: 10, costs: flat(200) }] },
  { id: "deathwatch-kt", name: "Deathwatch Kill Team", category: "Imperial Retinue", sizes: [{ models: 5, costs: flat(100) }, { models: 10, costs: flat(190) }] },
  { id: "breachers", name: "Imperial Navy Breachers", category: "Imperial Retinue", sizes: [{ models: 10, costs: flat(90) }] },
  { id: "vigilants", name: "Vigilant Squad", category: "Imperial Retinue", sizes: [{ models: 11, costs: flat(85) }] },
  { id: "exaction", name: "Exaction Squad", category: "Imperial Retinue", sizes: [{ models: 11, costs: flat(85) }] },
  { id: "inquisitorial-agents", name: "Inquisitorial Agents", category: "Imperial Retinue", sizes: [{ models: 6, costs: flat(60) }, { models: 12, costs: flat(120) }] },
  { id: "sanctifiers", name: "Sanctifiers", category: "Imperial Retinue", sizes: [{ models: 9, costs: flat(100) }] },
  { id: "subductors", name: "Subductor Squad", category: "Imperial Retinue", sizes: [{ models: 11, costs: flat(100) }] },
  { id: "voidsmen", name: "Voidsmen-at-Arms", category: "Imperial Retinue", sizes: [{ models: 6, costs: flat(70) }] },
  { id: "corvus", name: "Corvus Blackstar", category: "Imperial Retinue", sizes: [{ models: 1, costs: flat(180) }] },
  { id: "grey-knights-terminators", name: "Grey Knights Terminator Squad", category: "Requisitioned", sizes: [{ models: 5, costs: flat(190) }] },
  { id: "sisters-squad", name: "Sisters of Battle Squad", category: "Requisitioned", sizes: [{ models: 10, costs: flat(110) }] },
  { id: "imperial-rhino", name: "Imperial Rhino", category: "Requisitioned", sizes: [{ models: 1, costs: [65, 65, 65], fourthPlus: 75 }] },
  { id: "inquisitorial-chimera", name: "Inquisitorial Chimera", category: "Requisitioned", sizes: [{ models: 1, costs: [60, 60, 60], fourthPlus: 70 }] },
  { id: "immolator", name: "Sisters of Battle Immolator", category: "Requisitioned", sizes: [{ models: 1, costs: [105, 105, 105], fourthPlus: 115 }] },
  { id: "warhound", name: "Warhound Titan", category: "Titans", sizes: [{ models: 1, costs: flat(1100) }] },
  { id: "reaver", name: "Reaver Titan", category: "Titans", sizes: [{ models: 1, costs: flat(2200) }] },
  { id: "warbringer", name: "Warbringer Nemesis Titan", category: "Titans", sizes: [{ models: 1, costs: flat(2600) }] },
  { id: "warlord-titan", name: "Warlord Titan", category: "Titans", sizes: [{ models: 1, costs: flat(3500) }] },
  { id: "canis-rex", name: "Canis Rex", category: "Knights", sizes: [{ models: 1, costs: flat(415) }] },
  { id: "knight-paladin", name: "Knight Paladin", category: "Knights", sizes: [{ models: 1, costs: [375, 375, 390] }] },
  { id: "knight-errant", name: "Knight Errant", category: "Knights", sizes: [{ models: 1, costs: [355, 355, 370] }] },
  { id: "knight-gallant", name: "Knight Gallant", category: "Knights", sizes: [{ models: 1, costs: [355, 355, 370] }] },
  { id: "knight-warden", name: "Knight Warden", category: "Knights", sizes: [{ models: 1, costs: [375, 375, 390] }] },
  { id: "knight-crusader", name: "Knight Crusader", category: "Knights", sizes: [{ models: 1, costs: [395, 415, 415] }] },
  { id: "knight-preceptor", name: "Knight Preceptor", category: "Knights", sizes: [{ models: 1, costs: [365, 365, 380] }] },
  { id: "knight-castellan", name: "Knight Castellan", category: "Knights", sizes: [{ models: 1, costs: [425, 450, 450] }] },
  { id: "knight-valiant", name: "Knight Valiant", category: "Knights", sizes: [{ models: 1, costs: [400, 400, 415] }] },
  { id: "knight-defender", name: "Knight Defender", category: "Knights", sizes: [{ models: 1, costs: [400, 420, 420] }] },
  { id: "knight-destrier", name: "Knight Destrier", category: "Knights", sizes: [{ models: 1, costs: [265, 265, 280] }] },
  { id: "cerastus-lancer", name: "Cerastus Knight Lancer", category: "Knights", sizes: [{ models: 1, costs: [415, 435, 435] }] },
  { id: "cerastus-castigator", name: "Cerastus Knight Castigator", category: "Knights", sizes: [{ models: 1, costs: [380, 395, 395] }] },
  { id: "cerastus-acheron", name: "Cerastus Knight Acheron", category: "Knights", sizes: [{ models: 1, costs: [380, 395, 395] }] },
  { id: "cerastus-atrapos", name: "Cerastus Knight Atrapos", category: "Knights", sizes: [{ models: 1, costs: [405, 425, 425] }] },
  { id: "questoris-magaera", name: "Questoris Knight Magaera", category: "Knights", sizes: [{ models: 1, costs: [385, 400, 400] }] },
  { id: "questoris-styrix", name: "Questoris Knight Styrix", category: "Knights", sizes: [{ models: 1, costs: [375, 390, 390] }] },
  { id: "acastus-asterius", name: "Acastus Knight Asterius", category: "Knights", sizes: [{ models: 1, costs: [785, 860, 860] }] },
  { id: "acastus-porphyrion", name: "Acastus Knight Porphyrion", category: "Knights", sizes: [{ models: 1, costs: [725, 800, 800] }] },
  { id: "armiger-helverin", name: "Armiger Helverin", category: "Armigers", sizes: [{ models: 1, costs: flat(140) }] },
  { id: "armiger-warglaive", name: "Armiger Warglaive", category: "Armigers", sizes: [{ models: 1, costs: flat(140) }] },
  { id: "armiger-moirax", name: "Armiger Moirax", category: "Armigers", sizes: [{ models: 1, costs: [150, 150, 160] }] },
];

export function unitCategory(unit: Unit, detachments: readonly string[]): string {
  if (unit.id === "prosecutors" && detachments.includes("vigil")) return "Battleline";
  return unit.category;
}

/** How many units from a filter can be in one army. Unlisted filters use the per-unit copy rules only. */
export const CATEGORY_LIMITS: Record<string, number> = {
  "Imperial Agents": 2,
  "Imperial Retinue": 2,
  Knights: 1,
  Armigers: 3,
  Titans: 1,
};

export function categoryLimit(category: string): number | undefined {
  return CATEGORY_LIMITS[category];
}

const INQUISITOR_IDS = ["coteaz", "draxus", "greyfax", "inquisitor"] as const;
const VOIDFARER_IDS = ["navigator", "rogue-trader"] as const;

function countOf(entries: readonly { unitId: string }[], ids: readonly string[]): number {
  return entries.filter((entry) => ids.includes(entry.unitId)).length;
}

/** Retinue units that use the 2-unit cap. An Inquisitor sponsors one Inquisitorial Agents unit, and a Voidfarers character sponsors one Voidsmen-at-Arms unit. */
export function retinueCounting(entries: readonly { unitId: string }[]): number {
  const other = entries.filter((entry) => {
    const unit = unitById(entry.unitId);
    return unit?.category === "Imperial Retinue" && entry.unitId !== "inquisitorial-agents" && entry.unitId !== "voidsmen";
  }).length;
  return (
    other +
    Math.max(0, countOf(entries, ["inquisitorial-agents"]) - countOf(entries, INQUISITOR_IDS)) +
    Math.max(0, countOf(entries, ["voidsmen"]) - countOf(entries, VOIDFARER_IDS))
  );
}

export function withinCategoryCap(unit: Unit, entries: readonly { unitId: string }[], detachments: readonly string[]): boolean {
  const category = unitCategory(unit, detachments);
  const cap = categoryLimit(category);
  if (cap == null) return true;
  if (category === "Imperial Retinue") {
    if (unit.id === "inquisitorial-agents" && countOf(entries, ["inquisitorial-agents"]) < countOf(entries, INQUISITOR_IDS)) return true;
    if (unit.id === "voidsmen" && countOf(entries, ["voidsmen"]) < countOf(entries, VOIDFARER_IDS)) return true;
    return retinueCounting(entries) < cap;
  }
  const taken = entries.filter((entry) => {
    const other = unitById(entry.unitId);
    return other != null && unitCategory(other, detachments) === category;
  }).length;
  return taken < cap;
}

export function copyLimit(unit: Unit, detachments: readonly string[] = []): number {
  if (unit.maxCopies != null) return unit.maxCopies;
  if (unit.battleline || (unit.id === "prosecutors" && detachments.includes("vigil"))) return 6;
  if (unit.sizes.some((size) => size.fourthPlus != null)) return 6;
  return 3;
}

export function unitById(id: string): Unit | undefined {
  return UNITS.find((unit) => unit.id === id);
}

export function sizeOf(unit: Unit, models: number): UnitSize | undefined {
  return unit.sizes.find((size) => size.models === models);
}

export function costAt(size: UnitSize, copyIndex: number): number {
  if (copyIndex < size.costs.length) return size.costs[copyIndex]!;
  return size.fourthPlus ?? size.costs[size.costs.length - 1]!;
}

/** One version ladder for the datasheet, then the extra cost of the chosen model count. */
export function squadCost(unit: Unit, models: number, copyIndex: number): number {
  const parts = costParts(unit, models, copyIndex);
  if (!parts) return 0;
  return parts.unit + parts.additionalUnit + parts.additionalModels;
}

export function costParts(
  unit: Unit,
  models: number,
  copyIndex: number,
): { unit: number; additionalUnit: number; additionalModels: number } | null {
  const base = unit.sizes[0];
  const size = sizeOf(unit, models);
  if (!base || !size) return null;
  const unitCost = base.costs[0] ?? 0;
  return {
    unit: unitCost,
    additionalUnit: costAt(base, copyIndex) - unitCost,
    additionalModels: (size.costs[0] ?? unitCost) - unitCost,
  };
}

export function priceLine(
  unit: Unit,
  models: number,
  copyIndex: number,
  extras?: { wargear?: number; enhancement?: number },
): string {
  const parts = costParts(unit, models, copyIndex);
  if (!parts) return "";
  const wargear = extras?.wargear ?? 0;
  const enhancement = extras?.enhancement ?? 0;
  const bits = [`${ordinal(copyIndex + 1)} unit ${parts.unit} pts`];
  if (parts.additionalUnit) bits.push(`additional unit +${parts.additionalUnit} pts`);
  if (parts.additionalModels) bits.push(`${models} models +${parts.additionalModels} pts`);
  if (wargear) bits.push(`wargear +${wargear} pts`);
  if (enhancement) bits.push(`enhancement +${enhancement} pts`);
  const total = parts.unit + parts.additionalUnit + parts.additionalModels + wargear + enhancement;
  return `${bits.join(" · ")} = ${total} pts`;
}

export function costNote(unit: Unit, models: number, copies: number): string {
  const base = unit.sizes[0];
  if (!base || copies < 1) return "";
  const unitCost = base.costs[0] ?? 0;
  const prices = Array.from({ length: copies }, (_, index) => costAt(base, index));
  const parts: string[] = [];
  let index = 0;
  while (index < prices.length) {
    let end = index;
    while (end + 1 < prices.length && prices[end + 1] === prices[index]) end += 1;
    const from = ordinal(index + 1);
    const label = index === end ? `${from} unit` : `${from}–${ordinal(end + 1)} unit`;
    const price = prices[index] ?? unitCost;
    parts.push(price === unitCost ? `${label} ${unitCost} pts` : `${label} +${price - unitCost} pts`);
    index = end + 1;
  }
  const additionalModels = (sizeOf(unit, models)?.costs[0] ?? unitCost) - unitCost;
  if (additionalModels) parts.push(`${models} models +${additionalModels} pts`);
  return parts.join(" · ");
}

export function ordinal(n: number): string {
  const teen = n % 100;
  if (teen >= 11 && teen <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

const INFANTRY = ["sentinel-guard", "custodian-guard", "wardens"] as const;
const TERMINATORS = ["allarus", "aquilon-gauntlets", "aquilon-talons"] as const;
const JETBIKES = ["vertus", "gyrfalcon"] as const;
const SISTERS = ["prosecutors", "vigilators", "witchseekers"] as const;
const AGENT_BATTLELINE_LEADERS = new Set(["coteaz", "draxus", "greyfax", "inquisitor"]);
const NAMED_BODIES: Record<string, readonly string[]> = {
  coteaz: ["exaction", "breachers", "inquisitorial-agents", "subductors", "vigilants"],
  draxus: ["aquila", "exaction", "breachers", "inquisitorial-agents", "subductors", "vigilants"],
  greyfax: ["exaction", "breachers", "inquisitorial-agents", "sanctifiers", "subductors", "vigilants", "sisters-squad"],
  inquisitor: ["aquila", "exaction", "breachers", "inquisitorial-agents", "sanctifiers", "subductors", "vigilants", "sisters-squad"],
  navigator: ["breachers", "voidsmen"],
  "rogue-trader": ["breachers", "voidsmen"],
  artemis: ["aquila", "deathwatch-kt"],
  "watch-master": ["aquila", "deathwatch-kt"],
};

/**
 * Characters with the Support ability. They join a unit that already has a
 * Leader, and only the bodyguard units named on the datasheet.
 * The Ministorum Priest is the only Support datasheet in this army.
 */
export const SUPPORT_TARGETS: Record<string, readonly string[]> = {
  "ministorum-priest": ["exaction", "breachers", "inquisitorial-agents", "sanctifiers", "subductors", "vigilants", "sisters-squad"],
};

/** Body datasheets a character may join. Venatari are jump packs, so neither Trajann nor the jetbike captain can join them. */
export const LEADER_TARGETS: Record<string, readonly string[]> = {
  trajann: [...INFANTRY, ...TERMINATORS],
  "shield-captain": INFANTRY,
  "blade-champion": INFANTRY,
  "shield-captain-allarus": TERMINATORS,
  "shield-captain-jetbike": JETBIKES,
  "knight-centura": SISTERS,
};

export function isCharacter(unitId: string): boolean {
  return unitId in LEADER_TARGETS || unitId in NAMED_BODIES || unitId in SUPPORT_TARGETS;
}

export function isSupport(unitId: string): boolean {
  return unitId in SUPPORT_TARGETS;
}

/** A Support character may join this bodyguard unit. A Leader must already be attached. */
export function canSupport(supportUnitId: string, bodyUnitId: string): boolean {
  return SUPPORT_TARGETS[supportUnitId]?.includes(bodyUnitId) ?? false;
}

const KNIGHT_WARLORDS = new Set([
  "canis-rex",
  "knight-paladin",
  "knight-errant",
  "knight-gallant",
  "knight-warden",
  "knight-crusader",
  "knight-preceptor",
  "knight-castellan",
  "knight-valiant",
  "knight-defender",
  "knight-destrier",
  "cerastus-lancer",
  "cerastus-castigator",
  "cerastus-acheron",
  "cerastus-atrapos",
  "questoris-magaera",
  "questoris-styrix",
]);

/** Characters, plus Knights whose sheet says they can be the Warlord. Acastus Knights and Armigers cannot. */
export function canBeWarlord(unitId: string): boolean {
  return isCharacter(unitId) || KNIGHT_WARLORDS.has(unitId);
}

export function canLead(leaderUnitId: string, bodyUnitId: string, detachments: readonly string[] = []): boolean {
  if (isSupport(leaderUnitId)) return false;
  if (LEADER_TARGETS[leaderUnitId]?.includes(bodyUnitId)) return true;
  if (NAMED_BODIES[leaderUnitId]?.includes(bodyUnitId)) return true;
  if (!AGENT_BATTLELINE_LEADERS.has(leaderUnitId)) return false;
  const body = unitById(bodyUnitId);
  return body != null && unitCategory(body, detachments) === "Battleline";
}

export type AttachmentLink = { id: string; unitId: string; attachedTo?: string };

/** Other models in the same Leader / Support / Bodyguard group. */
export function attachmentMates<T extends AttachmentLink>(entry: T, entries: readonly T[]): T[] {
  const bodyId = entry.attachedTo ?? (entries.some((other) => other.attachedTo === entry.id) ? entry.id : undefined);
  if (!bodyId) return [];
  return entries.filter((other) => other.id !== entry.id && (other.id === bodyId || other.attachedTo === bodyId));
}

/**
 * One Leader and one Support per bodyguard. Support stays attached only while
 * that bodyguard still has a Leader. Dropping the Leader detaches Support
 * and leaves the Support model in the army.
 */
export function reconcileAttachments<T extends AttachmentLink>(entries: readonly T[], detachments: readonly string[] = []): T[] {
  const ids = new Set(entries.map((entry) => entry.id));
  const next = entries.map((entry) => ({ ...entry }));
  for (const entry of next) {
    if (!entry.attachedTo || !ids.has(entry.attachedTo)) {
      entry.attachedTo = undefined;
      continue;
    }
    const body = next.find((candidate) => candidate.id === entry.attachedTo);
    const allowed =
      body != null &&
      (isSupport(entry.unitId) ? canSupport(entry.unitId, body.unitId) : canLead(entry.unitId, body.unitId, detachments));
    if (!allowed) entry.attachedTo = undefined;
  }
  const leaderBodies = new Set<string>();
  const supportBodies = new Set<string>();
  for (const entry of next) {
    if (!entry.attachedTo) continue;
    const taken = isSupport(entry.unitId) ? supportBodies : leaderBodies;
    if (taken.has(entry.attachedTo)) entry.attachedTo = undefined;
    else taken.add(entry.attachedTo);
  }
  for (const entry of next) {
    if (entry.attachedTo && isSupport(entry.unitId) && !leaderBodies.has(entry.attachedTo)) entry.attachedTo = undefined;
  }
  return next;
}

export function attachSummary(unitId: string): string | null {
  switch (unitId) {
    case "trajann":
      return "Attaches to infantry and terminators. Not jump packs.";
    case "shield-captain":
    case "blade-champion":
      return "Attaches to infantry.";
    case "shield-captain-allarus":
      return "Attaches to terminators.";
    case "shield-captain-jetbike":
      return "Attaches to jetbikes. Not Venatari.";
    case "knight-centura":
      return "Attaches to Sisters squads. Not the Rhino.";
    case "coteaz":
    case "draxus":
    case "greyfax":
    case "inquisitor":
      return "Attaches to Battleline and the Retinue units on its sheet.";
    case "navigator":
    case "rogue-trader":
      return "Attaches to Imperial Navy Breachers or Voidsmen-at-Arms.";
    case "ministorum-priest":
      return "Supports a unit that already has a Leader, from the units on its sheet.";
    case "artemis":
    case "watch-master":
      return "Attaches to an Aquila Kill Team or a Deathwatch Kill Team.";
    default:
      return null;
  }
}

export type GearChoice = { id: string; name: string; points?: number; profiles?: string[] };
export type GearGroup = { id: string; choices: GearChoice[]; optional?: boolean };

const pick = (id: string, choices: GearChoice[], optional?: boolean): GearGroup => ({ id, choices, optional });
const choice = (id: string, name: string, points?: number, profiles?: string[]): GearChoice => ({
  id,
  name,
  points,
  profiles,
});

const none = choice("none", "None");
const knightCarapace = pick("carapace", [
  none,
  choice("ironstorm", "Ironstorm missile pod", undefined, ["Ironstorm missile pod"]),
  choice("stormspear", "Stormspear rocket pod", undefined, ["Stormspear rocket pod"]),
  choice("icarus", "Twin Icarus autocannon", undefined, ["Twin Icarus autocannon"]),
]);
const knightChest = pick("chest", [
  choice("melta", "Meltagun", undefined, ["Meltagun"]),
  choice("stubber", "Questoris heavy stubber", undefined, ["Questoris heavy stubber"]),
]);
const knightMelee = pick("melee", [
  choice("chainsword", "Reaper chainsword", undefined, ["Reaper chainsword, strike", "Reaper chainsword, sweep"]),
  choice("gauntlet", "Thunderstrike gauntlet", undefined, ["Thunderstrike gauntlet, strike", "Thunderstrike gauntlet, sweep"]),
]);
const dominusCarapace = pick("carapace", [
  choice("two-shield", "2 Shieldbreaker missile launchers, Twin siegebreaker cannon", undefined, ["Shieldbreaker missile launcher", "Twin siegebreaker cannon"]),
  choice("two-siege", "Shieldbreaker missile launcher, 2 Twin siegebreaker cannons", undefined, ["Shieldbreaker missile launcher", "Twin siegebreaker cannon"]),
]);
const forgeMelee = pick("melee", [
  choice("chainsword", "Reaper chainsword", undefined, ["Reaper chainsword, strike", "Reaper chainsword, sweep"]),
  choice("claw", "Hekaton siege claw and twin rad cleanser", undefined, ["Hekaton siege claw, strike", "Hekaton siege claw, sweep", "Twin rad cleanser"]),
]);
const armigerChest = pick("chest", [
  choice("stubber", "Questoris heavy stubber", undefined, ["Questoris heavy stubber"]),
  choice("melta", "Meltagun", undefined, ["Meltagun"]),
]);
const destrierMount = (id: string, gunId: string, gunName: string, profiles: string[]): GearGroup =>
  pick(id, [
    choice(gunId, gunName, undefined, profiles),
    choice("chainsword", "Bellatus reaper chainsword", undefined, ["Bellatus reaper chainsword, strike", "Bellatus reaper chainsword, sweep"]),
    choice("spear", "Thundershock spear", undefined, ["Thundershock spear, strike", "Thundershock spear, sweep"]),
  ]);

const GEAR: Record<string, GearGroup[]> = {
  "shield-captain": [
    pick("weapon", [
      choice("spear", "Guardian Spear", undefined, ["Guardian spear"]),
      choice("axe", "Castellan Axe", undefined, ["Castellan axe"]),
      choice("shield-pyrithite", "Shield + Pyrithite Spear", 25, ["Pyrithite spear"]),
      choice("shield-eternity", "Shield + Eternity Blade", 25, ["Eternity-pattern paragon blade"]),
    ]),
  ],
  "shield-captain-allarus": [
    pick("weapon", [
      choice("spear", "Guardian Spear", undefined, ["Guardian spear"]),
      choice("axe", "Castellan Axe", undefined, ["Castellan axe"]),
    ]),
  ],
  "shield-captain-jetbike": [
    pick("gun", [
      choice("salvo", "Salvo Launcher", undefined, ["Salvo launcher"]),
      choice("hurricane", "Hurricane Bolter", undefined, ["Hurricane bolter"]),
    ]),
  ],
  "sentinel-guard": [pick("vexilla", [choice("vexilla", "Vexilla")], true)],
  "custodian-guard": [pick("vexilla", [choice("vexilla", "Vexilla")], true)],
  wardens: [
    pick("weapon", [
      choice("spear", "Guardian Spears", undefined, ["Guardian spear"]),
      choice("axe", "Castellan Axes", undefined, ["Castellan axe"]),
    ]),
    pick("vexilla", [choice("vexilla", "Vexilla")], true),
  ],
  allarus: [
    pick("weapon", [
      choice("spear", "Guardian Spears", undefined, ["Guardian spear"]),
      choice("axe", "Castellan Axes", undefined, ["Castellan axe"]),
    ]),
    pick("vexilla", [choice("vexilla", "Vexilla")], true),
  ],
  "aquilon-talons": [
    pick("gun", [
      choice("bolter", "Lastrum Storm Bolters", undefined, ["Lastrum storm bolter"]),
      choice("firepike", "Infernus Firepikes", undefined, ["Infernus firepike"]),
    ]),
  ],
  vertus: [
    pick("gun", [
      choice("salvo", "Salvo Launchers", undefined, ["Salvo launcher"]),
      choice("hurricane", "Hurricane Bolters", undefined, ["Hurricane bolter"]),
    ]),
  ],
  gyrfalcon: [
    pick("gun", [
      choice("lastrum", "Lastrum Bolt Cannons", undefined, ["Lastrum bolt cannon"]),
      choice("adrathic", "Adrathic Devastators", undefined, ["Adrathic devastator"]),
      choice("arachnus", "Arachnus Volley Cannons", undefined, ["Arachnus volley cannon"]),
      choice("corvae", "Twin Corvae Las-pulsers", undefined, ["Twin Corvae las-pulser"]),
    ]),
  ],
  telemon: [
    pick("arm", [
      choice("fists", "Dual Caestus Fists, 2 Twin Cascade Projectors", undefined, [
        "Dual Caestus Fists",
        "Twin Neutronium Cascade Projectors",
      ]),
      choice("adrathic", "Adrathic Desolator, Caestus Fist, Twin Cascade Projector", undefined, [
        "Adrathic Desolator",
        "Caestus Fist",
        "Twin Neutronium Cascade Projectors",
      ]),
      choice("arachnus", "Arachnus Storm Cannon, Caestus Fist, Twin Cascade Projector", undefined, [
        "Arachnus Storm Cannon",
        "Caestus Fist",
        "Twin Neutronium Cascade Projectors",
      ]),
      choice("iliastus", "Iliastus Accelerator Culverin, Caestus Fist, Twin Cascade Projector", undefined, [
        "Iliastus Accelerator Culverin",
        "Caestus Fist",
        "Twin Neutronium Cascade Projectors",
      ]),
    ]),
  ],
  achillus: [
    pick("guns", [
      choice("bolter", "2 Lastrum Storm Bolters", undefined, ["Lastrum storm bolter"]),
      choice("adrathic", "2 Adrathic Combi-destructors", undefined, ["Adrathic combi-destructor"]),
      choice("infernus", "2 Twin Infernus Incinerators", undefined, ["Twin Infernus incinerator"]),
    ]),
  ],
  pallas: [
    pick("gun", [
      choice("blaze", "Twin Arachnus Blaze Cannon", undefined, ["Twin Arachnus blaze cannon"]),
      choice("fusil", "Twin Iliastus Accelerator Fusil", undefined, ["Twin Iliastus accelerator fusil"]),
    ]),
  ],
  coronus: [
    pick("sponson", [
      choice("lastrum", "Twin Lastrum Bolt Cannon", undefined, ["Twin Lastrum bolt cannon"]),
      choice("cascade", "Twin Neutronium Cascade Projectors", undefined, ["Twin Neutronium cascade projectors"]),
    ]),
  ],
  caladius: [
    pick("sponson", [
      choice("lastrum", "Twin Lastrum Bolt Cannon", undefined, ["Twin Lastrum bolt cannon"]),
      choice("cascade", "Twin Neutronium Cascade Projectors", undefined, ["Twin Neutronium cascade projectors"]),
    ]),
  ],
  "caladius-annihilator": [
    pick("sponson", [
      choice("lastrum", "Twin Lastrum Bolt Cannon", undefined, ["Twin Lastrum bolt cannon"]),
      choice("cascade", "Twin Neutronium Cascade Projectors", undefined, ["Twin Neutronium cascade projectors"]),
    ]),
  ],
  "knight-centura": [
    pick("weapon", [
      choice("blade", "Executioner Greatblade", undefined, ["Executioner greatblade"]),
      choice("boltgun", "Master-crafted Boltgun", undefined, ["Master-crafted boltgun", "Gun stock"]),
      choice("flamer", "Master-crafted Flamer", undefined, ["Master-crafted flamer", "Gun stock"]),
    ]),
  ],
  rhino: [pick("missile", [choice("hunter", "Hunter-killer Missile", undefined, ["Hunter-killer missile"])], true)],
  corvus: [
    pick("centre", [
      choice("cannon", "Twin assault cannon", undefined, ["Twin assault cannon"]),
      choice("lascannon", "Twin lascannon", undefined, ["Twin lascannon"]),
    ]),
    pick("missiles", [
      choice("rockets", "Blackstar rocket launchers", undefined, ["Blackstar rocket launcher"]),
      choice("stormstrike", "Stormstrike missile launchers", undefined, ["Stormstrike missile launcher"]),
    ]),
    pick("hurricane", [choice("hurricane", "Hurricane bolter", undefined, ["Hurricane bolter"])], true),
    pick("extra", [
      choice("none", "No array or halo-launcher"),
      choice("auspex", "Auspex array"),
      choice("halo", "Infernum halo-launcher"),
    ]),
  ],
  "imperial-rhino": [pick("missile", [choice("hunter", "Hunter-killer missile", undefined, ["Hunter-killer missile"])], true)],
  "inquisitorial-chimera": [
    pick("hull", [
      choice("bolter", "Hull heavy bolter", undefined, ["Heavy bolter"]),
      choice("flamer", "Hull heavy flamer", undefined, ["Heavy flamer"]),
    ]),
    pick("turret", [
      choice("laser", "Multi-laser", undefined, ["Multi-laser"]),
      choice("bolter", "Turret heavy bolter", undefined, ["Heavy bolter"]),
      choice("flamer", "Turret heavy flamer", undefined, ["Heavy flamer"]),
    ]),
    pick("pintle", [
      choice("none", "No pintle"),
      choice("stubber", "Heavy stubber", undefined, ["Heavy stubber"]),
      choice("storm", "Storm bolter", undefined, ["Storm bolter"]),
    ]),
    pick("missile", [choice("hunter", "Hunter-killer missile", undefined, ["Hunter-killer missile"])], true),
  ],
  immolator: [
    pick("turret", [
      choice("flamers", "Immolation flamers", undefined, ["Immolation flamers"]),
      choice("bolter", "Twin heavy bolter", undefined, ["Twin heavy bolter"]),
      choice("melta", "Twin multi-melta", 15, ["Twin multi-melta"]),
    ]),
    pick("missile", [choice("hunter", "Hunter-killer missile", undefined, ["Hunter-killer missile"])], true),
  ],
  subductors: [pick("nuncio", [choice("nuncio", "Nuncio-aquila")], true)],
  inquisitor: [
    pick("pistol", [
      choice("bolt", "Bolt pistol", undefined, ["Bolt pistol"]),
      choice("combi", "Combi-weapon", undefined, ["Combi-weapon"]),
    ]),
    pick("gifts", [
      choice("wardings", "Blessed wardings"),
      choice("gifts", "Psychic gifts and Psychic Shock Wave", undefined, ["Psychic Shock Wave"]),
    ]),
    pick("melee", [
      choice("melee", "Inquisitorial melee weapon", undefined, ["Inquisitorial melee weapon"]),
      choice("force", "Force weapon", undefined, ["Force weapon"]),
    ]),
  ],
  "ministorum-priest": [
    pick("armament", [
      choice("vindictor", "Zealot’s vindictor", undefined, ["Zealot’s vindictor"]),
      choice("pistol", "Holy pistol and power weapon", undefined, ["Holy pistol", "Power weapon"]),
    ]),
  ],
  warhound: [
    pick("arm-a", [
      choice("plasma", "Warhound plasma blastgun", undefined, ["Warhound plasma blastgun", "Warhound plasma blastgun, supercharge"]),
      choice("inferno", "Warhound inferno gun", undefined, ["Warhound inferno gun"]),
      choice("turbo", "Warhound turbo-laser destructor", undefined, ["Warhound turbo-laser destructor"]),
      choice("vulcan", "Warhound vulcan mega-bolter", undefined, ["Warhound vulcan mega-bolter"]),
    ]),
    pick("arm-b", [
      choice("vulcan", "Warhound vulcan mega-bolter", undefined, ["Warhound vulcan mega-bolter"]),
      choice("inferno", "Warhound inferno gun", undefined, ["Warhound inferno gun"]),
      choice("plasma", "Warhound plasma blastgun", undefined, ["Warhound plasma blastgun", "Warhound plasma blastgun, supercharge"]),
      choice("turbo", "Warhound turbo-laser destructor", undefined, ["Warhound turbo-laser destructor"]),
    ]),
  ],
  reaver: [
    pick("gatling-arm", [
      choice("gatling", "Reaver gatling blaster", undefined, ["Reaver gatling blaster"]),
      choice("laser", "Reaver laser blaster", undefined, ["Reaver laser blaster"]),
      choice("melta", "Reaver melta cannon", undefined, ["Reaver melta cannon"]),
      choice("volcano", "Reaver volcano cannon", undefined, ["Reaver volcano cannon"]),
      choice("fist", "Reaver power fist", undefined, ["Reaver power fist, strike", "Reaver power fist, sweep"]),
    ]),
    pick("laser-arm", [
      choice("laser", "Reaver laser blaster", undefined, ["Reaver laser blaster"]),
      choice("gatling", "Reaver gatling blaster", undefined, ["Reaver gatling blaster"]),
      choice("melta", "Reaver melta cannon", undefined, ["Reaver melta cannon"]),
      choice("volcano", "Reaver volcano cannon", undefined, ["Reaver volcano cannon"]),
    ]),
  ],
  warbringer: [
    pick("carapace", [
      choice("quake", "Nemesis quake cannon", undefined, ["Nemesis quake cannon"]),
      choice("volcano", "Nemesis volcano cannon", undefined, ["Nemesis volcano cannon"]),
    ]),
    pick("gatling-arm", [
      choice("gatling", "Reaver gatling blaster", undefined, ["Reaver gatling blaster"]),
      choice("laser", "Reaver laser blaster", undefined, ["Reaver laser blaster"]),
      choice("melta", "Reaver melta cannon", undefined, ["Reaver melta cannon"]),
      choice("volcano", "Reaver volcano cannon", undefined, ["Reaver volcano cannon"]),
    ]),
    pick("laser-arm", [
      choice("laser", "Reaver laser blaster", undefined, ["Reaver laser blaster"]),
      choice("gatling", "Reaver gatling blaster", undefined, ["Reaver gatling blaster"]),
      choice("melta", "Reaver melta cannon", undefined, ["Reaver melta cannon"]),
      choice("volcano", "Reaver volcano cannon", undefined, ["Reaver volcano cannon"]),
    ]),
  ],
  "warlord-titan": [
    pick("carapace", [
      choice("apocalypse", "Apocalypse launchers", undefined, ["Apocalypse launcher"]),
      choice("lasers", "Laser blasters", undefined, ["Laser blaster"]),
    ]),
    pick("claw-arm", [
      choice("claw", "Arioch power claw", undefined, ["Arioch power claw", "Arioch power claw, strike", "Arioch power claw, sweep"]),
      choice("belicosa", "Belicosa volcano cannon", undefined, ["Belicosa volcano cannon"]),
      choice("gatling", "Macro gatling blaster", undefined, ["Macro gatling blaster"]),
      choice("quake", "Mori quake cannon", undefined, ["Mori quake cannon"]),
      choice("sunfury", "Sunfury plasma annihilator", undefined, ["Sunfury plasma annihilator", "Sunfury plasma annihilator, supercharge"]),
    ]),
    pick("gatling-arm", [
      choice("gatling", "Macro gatling blaster", undefined, ["Macro gatling blaster"]),
      choice("claw", "Arioch power claw", undefined, ["Arioch power claw", "Arioch power claw, strike", "Arioch power claw, sweep"]),
      choice("belicosa", "Belicosa volcano cannon", undefined, ["Belicosa volcano cannon"]),
      choice("quake", "Mori quake cannon", undefined, ["Mori quake cannon"]),
      choice("sunfury", "Sunfury plasma annihilator", undefined, ["Sunfury plasma annihilator", "Sunfury plasma annihilator, supercharge"]),
    ]),
  ],
  "knight-paladin": [knightCarapace, knightChest, knightMelee],
  "knight-errant": [knightCarapace, knightChest, knightMelee],
  "knight-gallant": [knightCarapace, knightChest],
  "knight-warden": [knightCarapace, knightChest, knightMelee],
  "knight-crusader": [
    knightCarapace,
    knightChest,
    pick("arm", [
      choice("thermal", "Thermal cannon", undefined, ["Thermal cannon"]),
      choice("battle", "Rapid-fire battle cannon and Questoris heavy stubber", 15, ["Rapid-fire battle cannon", "Questoris heavy stubber"]),
    ]),
  ],
  "knight-preceptor": [
    knightCarapace,
    pick("chest", [
      choice("laser", "Questoris multi-laser", undefined, ["Questoris multi-laser"]),
      choice("melta", "Meltagun", undefined, ["Meltagun"]),
      choice("stubber", "Questoris heavy stubber", undefined, ["Questoris heavy stubber"]),
    ]),
    knightMelee,
  ],
  "knight-castellan": [dominusCarapace],
  "knight-valiant": [dominusCarapace],
  "knight-destrier": [
    destrierMount("mount-a", "gatling", "Chastiser gatling cannon", ["Chastiser gatling cannon"]),
    destrierMount("mount-b", "bombard", "Frag bombard", ["Frag bombard"]),
  ],
  "questoris-magaera": [forgeMelee],
  "questoris-styrix": [forgeMelee],
  "acastus-porphyrion": [
    pick("sides", [
      choice("cannons", "2 Acastus autocannons", undefined, ["Acastus autocannon"]),
      choice("mixed", "Acastus autocannon and lascannon", undefined, ["Acastus autocannon", "Lascannon"]),
      choice("las", "2 Lascannons", undefined, ["Lascannon"]),
    ]),
    pick("mount", [
      choice("ironstorm", "Acastus ironstorm missile pod", undefined, ["Acastus ironstorm missile pod"]),
      choice("helios", "Helios defence missiles", undefined, ["Helios defence missiles"]),
    ]),
  ],
  "armiger-helverin": [armigerChest],
  "armiger-warglaive": [armigerChest],
  "armiger-moirax": [
    pick("arm-a", [
      choice("graviton", "Graviton pulsar", undefined, ["Graviton pulsar"]),
      choice("claw", "Siege claw and rad cleanser", undefined, ["Siege claw", "Rad cleanser"]),
      choice("lightning", "Lightning lock", undefined, ["Lightning lock"]),
      choice("conversion", "Conversion beam cannon", undefined, ["Conversion beam cannon"]),
      choice("volkite", "Volkite veuglaire", undefined, ["Volkite veuglaire"]),
    ]),
    pick("arm-b", [
      choice("volkite", "Volkite veuglaire", undefined, ["Volkite veuglaire"]),
      choice("claw", "Siege claw and rad cleanser", undefined, ["Siege claw", "Rad cleanser"]),
      choice("graviton", "Graviton pulsar", undefined, ["Graviton pulsar"]),
      choice("lightning", "Lightning lock", undefined, ["Lightning lock"]),
      choice("conversion", "Conversion beam cannon", undefined, ["Conversion beam cannon"]),
    ]),
  ],
};

const ARMED: Record<string, string> = {
  trajann: "Eagle's Scream, Watcher's Axe",
  "shield-captain-allarus": "Balistus Grenade Launcher",
  "shield-captain-jetbike": "Interceptor Lance",
  "blade-champion": "Vaultswords",
  "sentinel-guard": "Sentinel Blade, Praesidium Shield",
  "custodian-guard": "Guardian Spears",
  allarus: "Balistus Grenade Launchers",
  "aquilon-gauntlets": "Solarite Power Gauntlets, Adrathic Combi-destructors",
  "aquilon-talons": "Solarite Power Talons",
  "venatari-kinetic": "Kinetic Destroyers, Tarsus Bucklers",
  "venatari-lances": "Verutum Lances",
  vertus: "Interceptor Lances",
  gyrfalcon: "Solarite Power Lances",
  telemon: "Spiculus Bolt Launcher",
  galatus: "Warblade",
  achillus: "Dreadspear",
  coronus: "Twin Arachnus Blaze Cannon",
  caladius: "Iliastus Accelerator Cannon",
  "caladius-annihilator": "Arachnus Blaze Carronade",
  prosecutors: "Boltguns",
  vigilators: "Executioner Greatblades",
  witchseekers: "Flamers",
  rhino: "Storm Bolter",
  callidus: "Neural Shredder, Phase Sword and Poison Blades",
  culexus: "Animus Speculum, Life-draining Touch",
  eversor: "Executioner Pistol, Power Sword and Neuro Gauntlet",
  coteaz: "Bolt Pistol, Psychic Blast, Nemesis Daemon Hammer",
  draxus: "Dirgesinger, Psychic Tempest, Power Fist",
  greyfax: "Castigation, Condemnor Stake, Master-crafted Power Sword",
  kroyle: "Jindarii Tox-cycler, Stubcarbine, Butcher Blade",
  vindicare: "Exitus Rifle, Exitus Pistol, Vindicare Combat Knife",
  artemis: "Hellfire Extremis, Master-crafted Power Weapon",
  inquisitor: "Bolt Pistol, Inquisitorial Melee Weapon",
  navigator: "Laspistol, Force-orb Cane",
  "watch-master": "Vigil Spear",
  corvus: "Armoured hull",
  "imperial-rhino": "Storm bolter, Armoured tracks",
  "inquisitorial-chimera": "Lasgun array, Armoured tracks",
  immolator: "Heavy bolter, Armoured tracks",
  "grey-knights-terminators": "Nemesis force weapons, Storm bolters",
  warhound: "Warhound feet",
  reaver: "Reaver apocalypse launcher, Reaver feet",
  warbringer: "2 Anvilus defence batteries, 3 Ardex-defensor maulers, Nemesis feet",
  "warlord-titan": "2 Ardex-defensor lascannons, 2 Ardex-defensor maulers, Warlord feet",
  "canis-rex": "Las-impulsor, Freedom's Hand, Questoris multi-laser, Hekhtur's pistol, Close combat weapon",
  "knight-paladin": "Rapid-fire battle cannon, Questoris heavy stubber",
  "knight-errant": "Thermal cannon",
  "knight-gallant": "Reaper chainsword, Thunderstrike gauntlet",
  "knight-warden": "Avenger gatling cannon, Heavy flamer",
  "knight-crusader": "Avenger gatling cannon, Heavy flamer, Titanic feet",
  "knight-preceptor": "Las-impulsor",
  "knight-castellan": "Plasma decimator, Volcano lance, 2 Twin meltagun, Titanic feet",
  "knight-valiant": "Conflagration cannon, Thundercoil harpoon, 2 Twin meltagun, Titanic feet",
  "knight-defender": "Twin incendine combustor, Conversion beam obliterator, Plasma executor, Phosphor blaster, Titanic feet",
  "knight-destrier": "Questoris heavy stubber, Titanic feet",
  "cerastus-lancer": "Cerastus shock lance",
  "cerastus-castigator": "Castigator bolt cannon, Tempest warblade",
  "cerastus-acheron": "Twin heavy bolter, Acheron flame cannon, Reaper chainfist",
  "cerastus-atrapos": "Atrapos lascutter, Graviton singularity cannon",
  "questoris-magaera": "Lightning cannon, Phased plasma-fusil",
  "questoris-styrix": "Graviton crusher, Volkite chierovile",
  "acastus-asterius": "2 Twin conversion beam cannon, 2 Asterius volkite culverin, Karacnos mortar battery, Titanic feet",
  "acastus-porphyrion": "2 Twin magna lascannon, Titanic feet",
  "armiger-helverin": "2 Armiger autocannon, Armoured feet",
  "armiger-warglaive": "Thermal spear, Reaper chain-cleaver",
  "armiger-moirax": "Armoured feet",
};

export function gearGroups(unitId: string): GearGroup[] {
  return GEAR[unitId] ?? [];
}

export function armedWith(unitId: string): string | undefined {
  return ARMED[unitId];
}

export function gearPoints(unitId: string, gear?: Record<string, string>, models?: number): number {
  const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
  let total = loadoutPoints(unitId, size, gear);
  for (const group of gearGroups(unitId)) {
    const picked = gear?.[group.id];
    if (group.optional) {
      if (!picked) continue;
    }
    const choice = group.choices.find((item) => item.id === picked) ?? (group.optional ? undefined : group.choices[0]);
    total += choice?.points ?? 0;
  }
  return total;
}

function counted(label: string, models: number): string {
  return label
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const leading = /^(\d+)\s+(.+)$/.exec(trimmed);
      const each = leading ? Number(leading[1]) : 1;
      const name = leading ? leading[2]! : trimmed;
      return `${name} x${each * models}`;
    })
    .join(", ");
}

export function gearLineCounted(unitId: string, gear: Record<string, string> | undefined, models: number): string {
  const names: string[] = [];
  if (hasLoadout(unitId)) names.push(loadoutLine(unitId, models, gear));
  for (const group of gearGroups(unitId)) {
    const picked = gear?.[group.id];
    const choice = group.optional
      ? picked
        ? group.choices.find((item) => item.id === picked)
        : undefined
      : (group.choices.find((item) => item.id === picked) ?? group.choices[0]);
    if (!choice || choice.id === "none") continue;
    names.push(group.optional ? `${choice.name} x1` : counted(choice.name, models));
  }
  const fixed = armedWith(unitId);
  if (fixed && !hasLoadout(unitId)) names.push(counted(fixed, models));
  return names.filter(Boolean).join(", ");
}

export function gearLine(unitId: string, gear?: Record<string, string>, includeFixed = true, models?: number): string {
  const names: string[] = [];
  const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
  if (hasLoadout(unitId)) names.push(loadoutLine(unitId, size, gear));
  for (const group of gearGroups(unitId)) {
    const picked = gear?.[group.id];
    const choice = group.optional
      ? picked
        ? group.choices.find((item) => item.id === picked)
        : undefined
      : (group.choices.find((item) => item.id === picked) ?? group.choices[0]);
    if (choice && choice.id !== "none") names.push(choice.name);
  }
  if (includeFixed && !hasLoadout(unitId)) {
    const fixed = armedWith(unitId);
    if (fixed) names.push(fixed);
  }
  return names.join(", ");
}

export function weaponTaken(unitId: string, weaponName: string, gear?: Record<string, string>, models?: number): boolean {
  const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
  if (hasLoadout(unitId) && loadoutMentions(unitId, weaponName, size)) return loadoutHas(unitId, weaponName, size, gear);
  const mentioned = new Set(
    gearGroups(unitId).flatMap((group) => group.choices.flatMap((item) => item.profiles ?? []).map((name) => name.toLowerCase())),
  );
  if (!mentioned.has(weaponName.toLowerCase())) return true;
  const active = new Set<string>();
  for (const group of gearGroups(unitId)) {
    const picked = gear?.[group.id] ?? (group.optional ? undefined : group.choices[0]?.id);
    group.choices.find((item) => item.id === picked)?.profiles?.forEach((name) => active.add(name.toLowerCase()));
  }
  return active.has(weaponName.toLowerCase());
}

export function gearHint(unitId: string): string {
  const parts: string[] = [];
  for (const group of gearGroups(unitId)) {
    if (group.optional) {
      const item = group.choices[0];
      parts.push(item?.points ? `optional ${item.name} +${item.points}` : `optional ${item?.name ?? ""}`);
    } else {
      parts.push(group.choices.map((item) => (item.points ? `${item.name} +${item.points}` : item.name)).join(" / "));
    }
  }
  const fixed = armedWith(unitId);
  if (fixed) parts.push(fixed);
  return parts.filter(Boolean).join(" · ");
}

export function cleanGear(unitId: string, gear: unknown, models?: number): Record<string, string> | undefined {
  const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
  const source = gear && typeof gear === "object" ? (gear as Record<string, unknown>) : {};
  const next: Record<string, string> = {};
  const composed = loadoutGear(unitId, size, Object.fromEntries(Object.entries(source).filter((entry): entry is [string, string] => typeof entry[1] === "string")));
  if (composed) Object.assign(next, composed);
  for (const group of gearGroups(unitId)) {
    const value = source[group.id];
    if (typeof value !== "string" || !group.choices.some((item) => item.id === value)) continue;
    next[group.id] = value;
  }
  if (unitId === "knight-destrier") {
    const left = next["mount-a"];
    const right = next["mount-b"];
    if (left && left === right && (left === "chainsword" || left === "spear")) delete next["mount-b"];
  }
  if (unitId === "inquisitor" && next.melee === "force" && next.gifts !== "gifts") delete next.melee;
  return Object.keys(next).length ? next : undefined;
}
