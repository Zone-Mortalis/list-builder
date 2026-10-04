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

export const CATEGORIES = ["Characters", "Battleline", "Infantry", "Elites", "Fast Attack", "Heavy Support", "Transports"] as const;

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
];

export function unitCategory(unit: Unit, detachments: readonly string[]): string {
  if (unit.id === "prosecutors" && detachments.includes("vigil")) return "Battleline";
  return unit.category;
}

export function copyLimit(unit: Unit, detachments: readonly string[] = []): number {
  if (unit.maxCopies != null) return unit.maxCopies;
  if (unit.battleline || (unit.id === "prosecutors" && detachments.includes("vigil"))) return 6;
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
  return unitId in LEADER_TARGETS;
}

export function canLead(leaderUnitId: string, bodyUnitId: string): boolean {
  return LEADER_TARGETS[leaderUnitId]?.includes(bodyUnitId) ?? false;
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
};

export function gearGroups(unitId: string): GearGroup[] {
  return GEAR[unitId] ?? [];
}

export function armedWith(unitId: string): string | undefined {
  return ARMED[unitId];
}

export function gearPoints(unitId: string, gear?: Record<string, string>): number {
  let total = 0;
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
  for (const group of gearGroups(unitId)) {
    const picked = gear?.[group.id];
    const choice = group.optional
      ? picked
        ? group.choices.find((item) => item.id === picked)
        : undefined
      : (group.choices.find((item) => item.id === picked) ?? group.choices[0]);
    if (!choice) continue;
    names.push(group.optional ? `${choice.name} x1` : counted(choice.name, models));
  }
  const fixed = armedWith(unitId);
  if (fixed) names.push(counted(fixed, models));
  return names.join(", ");
}

export function gearLine(unitId: string, gear?: Record<string, string>, includeFixed = true): string {
  const names: string[] = [];
  for (const group of gearGroups(unitId)) {
    const picked = gear?.[group.id];
    const choice = group.optional
      ? picked
        ? group.choices.find((item) => item.id === picked)
        : undefined
      : (group.choices.find((item) => item.id === picked) ?? group.choices[0]);
    if (choice) names.push(choice.name);
  }
  if (includeFixed) {
    const fixed = armedWith(unitId);
    if (fixed) names.push(fixed);
  }
  return names.join(", ");
}

export function weaponTaken(unitId: string, weaponName: string, gear?: Record<string, string>): boolean {
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

export function cleanGear(unitId: string, gear: unknown): Record<string, string> | undefined {
  if (!gear || typeof gear !== "object") return undefined;
  const source = gear as Record<string, unknown>;
  const next: Record<string, string> = {};
  for (const group of gearGroups(unitId)) {
    const value = source[group.id];
    if (typeof value !== "string" || !group.choices.some((item) => item.id === value)) continue;
    next[group.id] = value;
  }
  return Object.keys(next).length ? next : undefined;
}
