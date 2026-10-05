export type Kit = { id: string; name: string; profiles?: string[]; points?: number };

type ChoiceSlot = { kind: "choice"; id: string; label: string; options: Kit[] };
type CountSlot = { kind: "count"; id: string; label: string; kit: Kit; min: number; max: number; base?: number; fill?: boolean; extra?: boolean };

export type Loadout = {
  fixed: { name: string; count: number }[];
  slots: Array<ChoiceSlot | CountSlot>;
  total?: number;
  caps?: { ids: string[]; max: number }[];
  floors?: { ids: string[]; min: number }[];
};

const kit = (id: string, name: string, profiles?: string[], points?: number): Kit => ({ id, name, profiles, points });

export function hasLoadout(unitId: string): boolean {
  return LOADOUT_UNITS.has(unitId);
}

const LOADOUT_UNITS = new Set([
  "aquila",
  "deathwatch-kt",
  "breachers",
  "vigilants",
  "exaction",
  "inquisitorial-agents",
  "sanctifiers",
  "grey-knights-terminators",
  "sisters-squad",
]);

function copies(count: number, slot: ChoiceSlot, label: string): ChoiceSlot[] {
  return Array.from({ length: count }, (_, index) => ({ ...slot, id: `${slot.id}-${index + 1}`, label: count > 1 ? `${label} ${index + 1}` : label }));
}

export function loadoutFor(unitId: string, models: number, gear?: Record<string, string>): Loadout | null {
  switch (unitId) {
    case "aquila":
      return aquila(models);
    case "deathwatch-kt":
      return deathwatch(models, gear);
    case "breachers":
      return breachers();
    case "vigilants":
      return vigilants();
    case "exaction":
      return exaction();
    case "inquisitorial-agents":
      return agents(models);
    case "sanctifiers":
      return sanctifiers();
    case "grey-knights-terminators":
      return greyKnights();
    case "sisters-squad":
      return sisters();
    default:
      return null;
  }
}

function aquila(models: number): Loadout {
  const n = models >= 10 ? 2 : 1;
  const gravis = {
    kind: "choice" as const,
    id: "gravis",
    label: "Gravis Veteran",
    options: [
      kit("infernus", "Infernus heavy bolter", ["Bolt pistol", "Close combat weapon", "Infernus heavy bolter", "Infernus heavy bolter, heavy flamer"]),
      kit("frag", "Frag cannon", ["Bolt pistol", "Close combat weapon", "Frag cannon"]),
      kit("hellstorm", "Hellstorm bolt rifle and Astartes grenade launcher", ["Bolt pistol", "Close combat weapon", "Hellstorm bolt rifle", "Astartes grenade launcher, frag", "Astartes grenade launcher, krak"]),
    ],
  };
  const gun = {
    kind: "choice" as const,
    id: "gun",
    label: "Veteran gun",
    options: [
      kit("stalker", "Stalker bolt rifle", ["Bolt pistol", "Close combat weapon", "Stalker bolt rifle"]),
      kit("plasma", "Plasma incinerator", ["Bolt pistol", "Close combat weapon", "Plasma incinerator", "Plasma incinerator, supercharge"]),
    ],
  };
  const hammer = {
    kind: "choice" as const,
    id: "hammer",
    label: "Veteran weapon",
    options: [
      kit("hammer", "Heavy thunder hammer", ["Bolt pistol", "Heavy thunder hammer"]),
      kit("shield", "Power weapon and Astartes shield", ["Bolt pistol", "Power weapon", "Astartes shield"]),
    ],
  };
  const knife = {
    kind: "choice" as const,
    id: "knife",
    label: "Phobos Veteran",
    options: [
      kit("carbine", "Deathwatch marksman bolt carbine", ["Close combat weapon", "Special-issue bolt pistol", "Deathwatch marksman bolt carbine"]),
      kit("knife", "Combat knife", ["Close combat weapon", "Special-issue bolt pistol", "Combat knife"]),
    ],
  };
  return {
    fixed: [
      { name: "Plasma pistol", count: 1 },
      { name: "Plasma pistol, supercharge", count: 1 },
      { name: "Power weapon", count: 1 },
    ],
    slots: [
      ...copies(n, gravis, "Gravis Veteran"),
      ...copies(n, gun, "Veteran gun"),
      ...copies(n, hammer, "Veteran weapon"),
      ...copies(n, knife, "Phobos Veteran"),
      ...(models >= 10
        ? [{ kind: "choice" as const, id: "xenophase", label: "Veteran", options: [kit("xeno", "Xenophase blade", ["Special-issue bolt pistol", "Xenophase blade"])] }]
        : []),
    ],
  };
}

function deathwatch(models: number, gear?: Record<string, string>): Loadout {
  const per = models >= 10 ? 2 : 1;
  const sergeant = gear?.sergeant ?? "bolt-power";
  const took = (id: string) => (sergeant === id ? 1 : 0);
  const shieldTook = sergeant === "shield-bolt" || sergeant === "shield-power" ? 1 : 0;
  const veterans = Math.max(0, models - 1);
  const room = (max: number, taken = 0) => Math.max(0, Math.min(veterans, max - taken));
  return {
    fixed: [],
    total: veterans,
    caps: [{ ids: ["shield-bolt", "shield-power"], max: room(2 * per, shieldTook) }],
    slots: [
      {
        kind: "choice",
        id: "sergeant",
        label: "Watch Sergeant",
        options: [
          kit("bolt-power", "Boltgun and power weapon", ["Boltgun", "Power weapon"]),
          kit("combi-power", "Combi-weapon and power weapon", ["Combi-weapon", "Power weapon"]),
          kit("bolt-xeno", "Boltgun and xenophase blade", ["Boltgun", "Xenophase blade"]),
          kit("combi-xeno", "Combi-weapon and xenophase blade", ["Combi-weapon", "Xenophase blade"]),
          kit("shield-bolt", "Astartes shield and boltgun", ["Boltgun", "Astartes shield"]),
          kit("shield-power", "Astartes shield and power weapon", ["Power weapon", "Astartes shield"]),
          kit("black", "Black Shield blades", ["Black Shield blades"]),
          kit("shotgun", "Deathwatch shotgun", ["Deathwatch shotgun", "Close combat weapon"]),
          kit("hammer", "Deathwatch thunder hammer", ["Deathwatch thunder hammer"]),
          kit("frag", "Frag cannon", ["Frag cannon", "Close combat weapon"]),
          kit("infernus", "Infernus heavy bolter", ["Infernus heavy bolter", "Infernus heavy bolter, heavy flamer", "Close combat weapon"]),
          kit("stalker", "Stalker-pattern boltgun", ["Stalker-pattern boltgun", "Close combat weapon"]),
        ],
      },
      { kind: "count", id: "shield-bolt", label: "Astartes shield and boltgun", kit: kit("shield-bolt", "Astartes shield and boltgun", ["Boltgun", "Astartes shield"]), min: 0, max: room(2 * per, shieldTook) },
      { kind: "count", id: "shield-power", label: "Astartes shield and power weapon", kit: kit("shield-power", "Astartes shield and power weapon", ["Power weapon", "Astartes shield"]), min: 0, max: room(2 * per, shieldTook) },
      { kind: "count", id: "black", label: "Black Shield blades", kit: kit("black", "Black Shield blades", ["Black Shield blades"]), min: 0, max: room(1, took("black")) },
      { kind: "count", id: "shotgun", label: "Deathwatch shotgun", kit: kit("shotgun", "Deathwatch shotgun", ["Deathwatch shotgun", "Close combat weapon"]), min: 0, max: room(2 * per, took("shotgun")) },
      { kind: "count", id: "hammer", label: "Thunder hammer", kit: kit("hammer", "Deathwatch thunder hammer", ["Deathwatch thunder hammer"]), min: 0, max: room(2 * per, took("hammer")) },
      { kind: "count", id: "frag", label: "Frag cannon", kit: kit("frag", "Frag cannon", ["Frag cannon", "Close combat weapon"]), min: 0, max: room(per, took("frag")) },
      { kind: "count", id: "infernus", label: "Infernus heavy bolter", kit: kit("infernus", "Infernus heavy bolter", ["Infernus heavy bolter", "Infernus heavy bolter, heavy flamer", "Close combat weapon"]), min: 0, max: room(per, took("infernus")) },
      { kind: "count", id: "stalker", label: "Stalker-pattern boltgun", kit: kit("stalker", "Stalker-pattern boltgun", ["Stalker-pattern boltgun", "Close combat weapon"]), min: 0, max: room(per, took("stalker")) },
      { kind: "count", id: "bolt-power", label: "Boltgun and power weapon", kit: kit("bolt-power", "Boltgun and power weapon", ["Boltgun", "Power weapon"]), min: 0, max: veterans, fill: true },
    ],
  };
}

function breachers(): Loadout {
  return {
    fixed: [],
    total: 8,
    slots: [
      {
        kind: "choice",
        id: "sergeant",
        label: "Sergeant-at-Arms",
        options: [
          kit("shotgun", "Navis shotgun", ["Navis shotgun", "Close combat weapon"]),
          kit("auto", "Autopistol and chainsword", ["Autopistol", "Chainsword", "Close combat weapon"]),
          kit("bolt", "Bolt pistol and power weapon", ["Bolt pistol", "Power weapon", "Close combat weapon"]),
        ],
      },
      {
        kind: "choice",
        id: "special",
        label: "Special weapon",
        options: [
          kit("volley", "Navis las-volley", ["Navis las-volley", "Close combat weapon"]),
          kit("melta", "Meltagun", ["Meltagun", "Close combat weapon"]),
          kit("plasma", "Plasma gun", ["Plasma gun", "Plasma gun, supercharge", "Close combat weapon"]),
        ],
      },
      { kind: "count", id: "chainfist", label: "Autopistol and chainfist", kit: kit("chainfist", "Autopistol and chainfist", ["Autopistol", "Chainfist", "Close combat weapon"]), min: 0, max: 1 },
      { kind: "count", id: "power", label: "Autopistol and power weapon", kit: kit("power", "Autopistol and power weapon", ["Autopistol", "Power weapon", "Close combat weapon"]), min: 0, max: 1 },
      { kind: "count", id: "heavy", label: "Heavy shotgun and Endurant shield", kit: kit("heavy", "Navis heavy shotgun", ["Navis heavy shotgun", "Close combat weapon"]), min: 1, max: 1 },
      { kind: "count", id: "shotgun", label: "Navis shotgun", kit: kit("shotgun", "Navis shotgun", ["Navis shotgun", "Close combat weapon"]), min: 5, max: 7, fill: true },
      {
        kind: "choice",
        id: "demo",
        label: "Demolition charge",
        options: [kit("none", "No demolition charge"), kit("charge", "Demolition charge", ["Demolition charge"])],
      },
    ],
  };
}

function vigilants(): Loadout {
  return {
    fixed: [
      { name: "Arbites combat shotgun", count: 1 },
      { name: "Arbites shotpistol", count: 10 },
      { name: "Close combat weapon", count: 10 },
      { name: "Mechanical bite", count: 1 },
    ],
    total: 9,
    caps: [{ ids: ["executioner", "launcher", "stubber", "webber"], max: 2 }],
    slots: [
      {
        kind: "choice",
        id: "nuncio",
        label: "Nuncio-aquila",
        options: [kit("none", "No nuncio-aquila"), kit("nuncio", "Nuncio-aquila", ["Nuncio-aquila"])],
      },
      { kind: "count", id: "executioner", label: "Executioner shotgun", kit: kit("executioner", "Executioner shotgun", ["Executioner shotgun"]), min: 0, max: 1 },
      { kind: "count", id: "launcher", label: "Arbites grenade launcher", kit: kit("launcher", "Arbites grenade launcher", ["Arbites grenade launcher, frag", "Arbites grenade launcher, krak"]), min: 0, max: 1 },
      { kind: "count", id: "stubber", label: "Heavy stubber", kit: kit("stubber", "Heavy stubber", ["Heavy stubber"]), min: 0, max: 1 },
      { kind: "count", id: "webber", label: "Webber", kit: kit("webber", "Webber", ["Webber"]), min: 0, max: 1 },
      { kind: "count", id: "shotgun", label: "Combat shotgun", kit: kit("shotgun", "Arbites combat shotgun", ["Arbites combat shotgun"]), min: 7, max: 9, fill: true },
    ],
  };
}

function exaction(): Loadout {
  return {
    fixed: [
      { name: "Arbites combat shotgun", count: 1 },
      { name: "Arbites shotpistol", count: 10 },
      { name: "Close combat weapon", count: 10 },
      { name: "Mechanical bite", count: 1 },
    ],
    total: 9,
    caps: [{ ids: ["executioner", "launcher", "stubber", "webber"], max: 2 }],
    slots: [
      {
        kind: "choice",
        id: "maul",
        label: "Excruciator maul",
        options: [kit("none", "No excruciator maul"), kit("maul", "Excruciator maul", ["Excruciator maul"])],
      },
      {
        kind: "choice",
        id: "medikit",
        label: "Arbites medi-kit",
        options: [kit("none", "No medi-kit"), kit("medikit", "Arbites medi-kit", ["Arbites medi-kit"])],
      },
      {
        kind: "choice",
        id: "scanner",
        label: "Soulguilt scanner",
        options: [kit("none", "No soulguilt scanner"), kit("scanner", "Soulguilt scanner", ["Soulguilt scanner"])],
      },
      { kind: "count", id: "executioner", label: "Executioner shotgun", kit: kit("executioner", "Executioner shotgun", ["Executioner shotgun"]), min: 0, max: 1 },
      { kind: "count", id: "launcher", label: "Arbites grenade launcher", kit: kit("launcher", "Arbites grenade launcher", ["Arbites grenade launcher, frag", "Arbites grenade launcher, krak"]), min: 0, max: 1 },
      { kind: "count", id: "stubber", label: "Heavy stubber", kit: kit("stubber", "Heavy stubber", ["Heavy stubber"]), min: 0, max: 1 },
      { kind: "count", id: "webber", label: "Webber", kit: kit("webber", "Webber", ["Webber"]), min: 0, max: 1 },
      { kind: "count", id: "shotgun", label: "Combat shotgun", kit: kit("shotgun", "Arbites combat shotgun", ["Arbites combat shotgun"]), min: 7, max: 9, fill: true },
    ],
  };
}

function agents(models: number): Loadout {
  const big = models >= 12;
  const servitors = big ? 2 : 1;
  const body = big ? 10 : 5;
  const per = big ? 2 : 1;
  return {
    fixed: [],
    total: body,
    caps: [{ ids: ["melta", "cannon", "bolter"], max: servitors }],
    floors: [{ ids: ["bolter", "melta", "cannon"], min: servitors }],
    slots: [
      { kind: "count", id: "bolter", label: "Gun Servitor, heavy bolter", kit: kit("bolter", "Heavy bolter", ["Heavy bolter", "Agent melee weapon"]), min: 0, max: servitors, base: servitors, extra: true },
      { kind: "count", id: "melta", label: "Gun Servitor, multi-melta", kit: kit("melta", "Multi-melta", ["Multi-melta", "Agent melee weapon"]), min: 0, max: servitors, extra: true },
      { kind: "count", id: "cannon", label: "Gun Servitor, plasma cannon", kit: kit("cannon", "Plasma cannon", ["Plasma cannon", "Plasma cannon, supercharge", "Agent melee weapon"]), min: 0, max: servitors, extra: true },
      { kind: "count", id: "tome", label: "Tome-skull", kit: kit("tome", "Tome-skull", ["Tome-skull"]), min: 0, max: per, extra: true },
      { kind: "count", id: "eviscerator", label: "Eviscerator", kit: kit("eviscerator", "Eviscerator", ["Agent firearm", "Agent melee weapon", "Eviscerator"]), min: 0, max: per },
      { kind: "count", id: "stave", label: "Mystic stave", kit: kit("stave", "Mystic stave", ["Agent firearm", "Agent melee weapon", "Mystic stave"]), min: 0, max: per },
      { kind: "count", id: "plasma", label: "Plasma pistol", kit: kit("plasma", "Plasma pistol", ["Agent firearm", "Agent melee weapon", "Plasma pistol", "Plasma pistol, supercharge"]), min: 0, max: per },
      { kind: "count", id: "agent", label: "Agent", kit: kit("agent", "Agent firearm and melee weapon", ["Agent firearm", "Agent melee weapon"]), min: body - per * 3, max: body, fill: true },
    ],
  };
}

function sanctifiers(): Loadout {
  return {
    fixed: [
      { name: "Holy fire", count: 1 },
      { name: "Burning hands", count: 1 },
      { name: "Death Cult blades", count: 1 },
      { name: "Close combat weapon", count: 1 },
      { name: "Ministorum flamer", count: 1 },
      { name: "Sanctifier melee weapon", count: 2 },
    ],
    total: 4,
    slots: [
      {
        kind: "choice",
        id: "missionary",
        label: "Missionary",
        options: [
          kit("plasma", "Plasma gun", ["Plasma gun", "Plasma gun, supercharge"]),
          kit("melta", "Meltagun", ["Meltagun"]),
          kit("fire", "Plasma gun and holy fire", ["Plasma gun", "Plasma gun, supercharge", "Holy fire"]),
        ],
      },
      { kind: "count", id: "flamer", label: "Second hand flamer", kit: kit("flamer", "Hand flamer and close combat weapon", ["Ministorum hand flamer", "Ministorum hand flamer", "Close combat weapon"]), min: 0, max: 1 },
      { kind: "count", id: "simulacrum", label: "Simulacrum Imperialis", kit: kit("simulacrum", "Simulacrum Imperialis", ["Ministorum hand flamer", "Close combat weapon", "Simulacrum Imperialis"]), min: 0, max: 1 },
      { kind: "count", id: "sanctifier", label: "Sanctifier", kit: kit("sanctifier", "Hand flamer", ["Ministorum hand flamer", "Sanctifier melee weapon"]), min: 2, max: 4, fill: true },
    ],
  };
}

function greyKnights(): Loadout {
  return {
    fixed: [
      { name: "Nemesis force weapon", count: 5 },
      { name: "Storm bolter", count: 1 },
    ],
    total: 3,
    slots: [
      {
        kind: "choice",
        id: "special",
        label: "Heavy weapon",
        options: [
          kit("bolter", "None", ["Storm bolter"]),
          kit("incinerator", "Incinerator", ["Incinerator"]),
          kit("psilencer", "Psilencer", ["Psilencer"]),
          kit("psycannon", "Psycannon", ["Psycannon"], 5),
        ],
      },
      {
        kind: "count",
        id: "banner",
        label: "Ancient's banner",
        kit: kit("banner", "Ancient's banner", ["Ancient's banner"]),
        min: 0,
        max: 1,
        extra: true,
      },
      { kind: "count", id: "narthecium", label: "Narthecium", kit: kit("narthecium", "Narthecium", ["Narthecium"]), min: 0, max: 1 },
      { kind: "count", id: "bolter", label: "Storm bolter", kit: kit("bolter", "Storm bolter", ["Storm bolter"]), min: 1, max: 3, fill: true },
    ],
  };
}

function sisters(): Loadout {
  return {
    fixed: [
      { name: "Bolt pistol", count: 10 },
      { name: "Close combat weapon", count: 10 },
    ],
    total: 7,
    slots: [
      {
        kind: "choice",
        id: "superior",
        label: "Sister Superior ranged",
        options: [
          kit("boltgun", "Boltgun", ["Boltgun"]),
          kit("pistol", "Bolt pistol", ["Bolt pistol"]),
          kit("combi", "Combi-weapon", ["Combi-weapon"]),
          kit("condemnor", "Condemnor boltgun", ["Condemnor boltgun"]),
          kit("inferno", "Inferno pistol", ["Inferno pistol"]),
          kit("flamer", "Ministorum hand flamer", ["Ministorum hand flamer"]),
          kit("plasma", "Plasma pistol", ["Plasma pistol", "Plasma pistol, supercharge"]),
        ],
      },
      {
        kind: "choice",
        id: "superior-melee",
        label: "Superior melee",
        options: [kit("none", "No extra melee"), kit("chain", "Chainsword", ["Chainsword"]), kit("power", "Power weapon", ["Power weapon"])],
      },
      {
        kind: "choice",
        id: "special",
        label: "Special weapon",
        options: [
          kit("boltgun", "Boltgun", ["Boltgun"]),
          kit("storm", "Artificer-crafted storm bolter", ["Artificer-crafted storm bolter"]),
          kit("melta", "Meltagun", ["Meltagun"]),
          kit("flamer", "Ministorum flamer", ["Ministorum flamer"]),
        ],
      },
      {
        kind: "choice",
        id: "heavy",
        label: "Special or heavy weapon",
        options: [
          kit("boltgun", "Boltgun", ["Boltgun"]),
          kit("storm", "Artificer-crafted storm bolter", ["Artificer-crafted storm bolter"]),
          kit("heavy", "Heavy bolter", ["Heavy bolter"]),
          kit("melta", "Meltagun", ["Meltagun"]),
          kit("flamer", "Ministorum flamer", ["Ministorum flamer"]),
          kit("heavy-flamer", "Ministorum heavy flamer", ["Ministorum heavy flamer"]),
          kit("multi", "Multi-melta", ["Multi-melta"]),
        ],
      },
      {
        kind: "choice",
        id: "simulacrum",
        label: "Simulacrum Imperialis",
        options: [kit("none", "No simulacrum"), kit("sim", "Simulacrum Imperialis", ["Simulacrum Imperialis"])],
      },
      { kind: "count", id: "sister", label: "Battle Sister", kit: kit("sister", "Boltgun", ["Boltgun"]), min: 7, max: 7, fill: true },
    ],
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function resolvedLoadout(unitId: string, models: number, gear?: Record<string, string>): { spec: Loadout; choices: Record<string, string>; counts: Record<string, number> } | null {
  const spec = loadoutFor(unitId, models, gear);
  if (!spec) return null;
  const choices: Record<string, string> = {};
  const counts: Record<string, number> = {};
  for (const slot of spec.slots) {
    if (slot.kind === "choice") choices[slot.id] = slot.options.some((option) => option.id === gear?.[slot.id]) ? gear![slot.id]! : slot.options[0]!.id;
  }
  const counted = spec.slots.filter((slot): slot is CountSlot => slot.kind === "count" && !slot.fill);
  for (const slot of counted) {
    const raw = Number(gear?.[slot.id]);
    counts[slot.id] = clamp(Number.isFinite(raw) ? raw : (slot.base ?? slot.min), slot.min, slot.max);
  }
  const pullDown = (ids: string[], overflow: number) => {
    let left = overflow;
    for (const id of [...ids].reverse()) {
      if (left <= 0) break;
      const slot = counted.find((item) => item.id === id);
      if (!slot) continue;
      const next = Math.max(slot.min, (counts[id] ?? 0) - left);
      left -= (counts[id] ?? 0) - next;
      counts[id] = next;
    }
  };
  for (const cap of spec.caps ?? []) pullDown(cap.ids, cap.ids.reduce((sum, id) => sum + (counts[id] ?? 0), 0) - cap.max);
  for (const floor of spec.floors ?? []) {
    const have = floor.ids.reduce((sum, id) => sum + (counts[id] ?? 0), 0);
    if (have >= floor.min) continue;
    const id = floor.ids.find((item) => counted.some((slot) => slot.id === item));
    if (!id) continue;
    const slot = counted.find((item) => item.id === id)!;
    counts[id] = clamp((counts[id] ?? 0) + (floor.min - have), slot.min, slot.max);
  }
  const fill = spec.slots.find((slot): slot is CountSlot => slot.kind === "count" && Boolean(slot.fill));
  if (fill && spec.total != null) {
    const modelIds = counted.filter((slot) => !slot.extra).map((slot) => slot.id);
    const usedModels = () => modelIds.reduce((sum, id) => sum + (counts[id] ?? 0), 0);
    let used = usedModels();
    if (spec.total - used < fill.min) pullDown(modelIds, fill.min - (spec.total - used));
    used = usedModels();
    counts[fill.id] = clamp(spec.total - used, fill.min, fill.max);
  }
  return { spec, choices, counts };
}

export function loadoutGear(unitId: string, models: number, gear?: Record<string, string>): Record<string, string> | undefined {
  const resolved = resolvedLoadout(unitId, models, gear);
  if (!resolved) return undefined;
  const next: Record<string, string> = {};
  for (const [id, value] of Object.entries(resolved.choices)) next[id] = value;
  for (const [id, value] of Object.entries(resolved.counts)) next[id] = String(value);
  return next;
}

export function loadoutPoints(unitId: string, models: number, gear?: Record<string, string>): number {
  const resolved = resolvedLoadout(unitId, models, gear);
  if (!resolved) return 0;
  let total = 0;
  for (const slot of resolved.spec.slots) {
    if (slot.kind === "choice") total += slot.options.find((option) => option.id === resolved.choices[slot.id])?.points ?? 0;
    if (slot.kind === "count") total += (slot.kit.points ?? 0) * (resolved.counts[slot.id] ?? 0);
  }
  return total;
}

export function loadoutProfiles(unitId: string, models: number, gear?: Record<string, string>): { name: string; count: number }[] {
  const resolved = resolvedLoadout(unitId, models, gear);
  if (!resolved) return [];
  const totals = new Map<string, number>();
  const add = (name: string, count: number) => {
    if (count <= 0) return;
    totals.set(name, (totals.get(name) ?? 0) + count);
  };
  for (const item of resolved.spec.fixed) add(item.name, item.count);
  for (const slot of resolved.spec.slots) {
    if (slot.kind === "choice") {
      slot.options.find((option) => option.id === resolved.choices[slot.id])?.profiles?.forEach((name) => add(name, 1));
    } else {
      const count = resolved.counts[slot.id] ?? 0;
      slot.kit.profiles?.forEach((name) => add(name, count));
    }
  }
  return [...totals.entries()].map(([name, count]) => ({ name, count }));
}

export function loadoutLine(unitId: string, models: number, gear?: Record<string, string>): string {
  return loadoutProfiles(unitId, models, gear)
    .filter((item) => !item.name.toLowerCase().includes("supercharge"))
    .map((item) => `${item.name} x${item.count}`)
    .join(", ");
}

export function loadoutMentions(unitId: string, weaponName: string, models: number): boolean {
  const spec = loadoutFor(unitId, models);
  if (!spec) return false;
  const wanted = weaponName.toLowerCase();
  if (spec.fixed.some((item) => item.name.toLowerCase() === wanted)) return true;
  return spec.slots.some((slot) => {
    const profiles = slot.kind === "choice" ? slot.options.flatMap((option) => option.profiles ?? []) : (slot.kit.profiles ?? []);
    return profiles.some((name) => name.toLowerCase() === wanted);
  });
}

export function loadoutHas(unitId: string, weaponName: string, models: number, gear?: Record<string, string>): boolean {
  const wanted = weaponName.toLowerCase();
  return loadoutProfiles(unitId, models, gear).some((item) => item.name.toLowerCase() === wanted && item.count > 0);
}
