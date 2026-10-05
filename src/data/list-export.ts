import { datasheetById } from "@/data/datasheets";
import { hasLoadout, loadoutProfiles, resolvedLoadout } from "@/data/loadouts";
import { armedWith, gearGroups, isSupport, unitById, weaponTaken, type GearChoice } from "@/data/units";

export type WeaponLine = { count: number; name: string };
export type ModelGroup = { count: number; name: string; weapons: WeaponLine[] };

export type ShareEnhancement = { id?: string; name: string; upgrade?: boolean };

export type ShareEntry = {
  id: string;
  unitId: string;
  name: string;
  models: number;
  cost: number;
  gear?: Record<string, string>;
  attachedTo?: string;
  warlord?: boolean;
  enhancement?: ShareEnhancement;
};

export type ShareList = {
  name: string;
  total: number;
  limit: number;
  detachmentNames?: string;
  entries: ShareEntry[];
};

const GRANTED_WEAPONS: Record<string, string> = {
  "emperors-light": "Emperor's Light",
  orb: "Auriferous Orb",
};

const MODEL_NAME: Record<string, string> = {
  "sentinel-guard": "Sentinel Guard",
  "custodian-guard": "Custodian Guard",
  wardens: "Custodian Warden",
  allarus: "Allarus Custodian",
  "aquilon-gauntlets": "Aquilon Custodian",
  "aquilon-talons": "Aquilon Custodian",
  "venatari-kinetic": "Venatari",
  "venatari-lances": "Venatari",
  vertus: "Vertus Praetor",
  gyrfalcon: "Gyrfalcon",
  prosecutors: "Prosecutor",
  vigilators: "Vigilator",
  witchseekers: "Witchseeker",
};

const MODE = /, (supercharge|strike|sweep|frag|krak|heavy flamer)$/i;

function baseWeapon(name: string): string {
  return name.replace(/ — .+$/, "").replace(MODE, "").trim();
}

function isAltMode(name: string): boolean {
  return MODE.test(name);
}

function explicitCount(label: string): { count: number; name: string } {
  const match = /^(\d+)\s+(.+)$/.exec(label.trim());
  if (!match) return { count: 1, name: label.trim() };
  return { count: Number(match[1]), name: match[2]!.trim() };
}

function normWeapon(name: string): string {
  return name
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/s\b/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function isChassis(name: string): boolean {
  return /hull|tracks|feet/i.test(name);
}

function collapseProfiles(names: readonly string[]): WeaponLine[] {
  const lines: WeaponLine[] = [];
  const index = new Map<string, number>();
  for (const raw of names) {
    const base = baseWeapon(raw);
    if (!base) continue;
    const key = base.toLowerCase();
    const existing = index.get(key);
    if (existing != null) {
      if (!isAltMode(raw)) lines[existing]!.count += 1;
      continue;
    }
    index.set(key, lines.length);
    lines.push({ count: 1, name: base });
  }
  return lines;
}

function addWeapon(lines: WeaponLine[], count: number, name: string) {
  if (count <= 0 || !name) return;
  const key = normWeapon(name);
  const existing = lines.find((line) => normWeapon(line.name) === key);
  if (existing) {
    existing.count = Math.max(existing.count, count);
    return;
  }
  lines.push({ count, name });
}

function sortChassis(lines: WeaponLine[]): WeaponLine[] {
  return [...lines.filter((line) => isChassis(line.name)), ...lines.filter((line) => !isChassis(line.name))];
}

function choiceWeapons(choice: GearChoice): WeaponLine[] {
  if (choice.id === "none" || /^no\b/i.test(choice.name)) return [];
  if (!choice.profiles?.length) {
    const parsed = explicitCount(choice.name);
    return [{ count: parsed.count, name: parsed.name }];
  }
  const collapsed = collapseProfiles(choice.profiles);
  const label = explicitCount(choice.name);
  if (collapsed.length === 1 && label.count > 1 && collapsed[0]!.count === 1) {
    return [{ count: label.count, name: collapsed[0]!.name }];
  }
  if (/shield/i.test(choice.name) && !collapsed.some((item) => /shield/i.test(item.name))) {
    return [{ count: 1, name: "Praesidium shield" }, ...collapsed];
  }
  return collapsed;
}

function selectedChoice(groupId: string, choices: GearChoice[], gear: Record<string, string> | undefined, optional?: boolean) {
  const picked = gear?.[groupId];
  if (optional) return picked ? choices.find((item) => item.id === picked) : undefined;
  return choices.find((item) => item.id === picked) ?? choices[0];
}

/** Equipped weapons and wargear, with counts, for a unit that is not broken into model types. */
export function equippedWeapons(unitId: string, models: number, gear?: Record<string, string>): WeaponLine[] {
  const lines: WeaponLine[] = [];
  if (hasLoadout(unitId)) {
    for (const item of loadoutProfiles(unitId, models, gear)) {
      if (isAltMode(item.name)) continue;
      addWeapon(lines, item.count, baseWeapon(item.name));
    }
    return sortChassis(lines);
  }
  for (const group of gearGroups(unitId)) {
    const choice = selectedChoice(group.id, group.choices, gear, group.optional);
    if (!choice) continue;
    const multiplier = group.optional ? 1 : models;
    for (const weapon of choiceWeapons(choice)) addWeapon(lines, weapon.count * multiplier, weapon.name);
  }
  const sheet = datasheetById(unitId);
  if (sheet) {
    for (const weapon of [...sheet.ranged, ...sheet.melee]) {
      if (isAltMode(weapon.name) || !weaponTaken(unitId, weapon.name, gear, models)) continue;
      addWeapon(lines, models, weapon.name);
    }
  }
  const fixed = armedWith(unitId);
  if (fixed && !hasLoadout(unitId)) {
    const mentioned = new Set(
      gearGroups(unitId).flatMap((group) =>
        group.choices.flatMap((choice) => (choice.profiles?.length ? choice.profiles : [choice.name]).map((name) => normWeapon(baseWeapon(name)))),
      ),
    );
    for (const part of fixed.split(",")) {
      const parsed = explicitCount(part);
      if (mentioned.has(normWeapon(parsed.name))) continue;
      addWeapon(lines, parsed.count * models, parsed.name);
    }
  }
  return sortChassis(lines);
}

function modelName(unitId: string): string {
  if (MODEL_NAME[unitId]) return MODEL_NAME[unitId]!;
  const name = unitById(unitId)?.name ?? "Model";
  return name.replace(/ (sodality|squad)$/i, "");
}

function splitSquad(unitId: string, models: number, weapons: WeaponLine[]): ModelGroup[] {
  const name = modelName(unitId);
  if (models <= 1) return [{ count: models, name, weapons }];
  const shared = weapons.filter((weapon) => weapon.count > 0 && weapon.count % models === 0);
  const extras = weapons.filter((weapon) => weapon.count > 0 && weapon.count % models !== 0);
  if (extras.length === 0) return [{ count: models, name, weapons }];
  const each = (weapon: WeaponLine) => weapon.count / models;
  const groups: ModelGroup[] = [
    {
      count: 1,
      name,
      weapons: [
        ...shared.map((weapon) => ({ count: each(weapon), name: weapon.name })),
        ...extras.map((weapon) => ({ count: weapon.count, name: weapon.name })),
      ],
    },
  ];
  if (models > 1) {
    groups.push({
      count: models - 1,
      name,
      weapons: shared.map((weapon) => ({ count: each(weapon) * (models - 1), name: weapon.name })),
    });
  }
  return groups;
}

type Resolved = NonNullable<ReturnType<typeof resolvedLoadout>>;

function slotProfiles(resolved: Resolved, slotId: string): WeaponLine[] {
  const slot = resolved.spec.slots.find((item) => item.id === slotId);
  if (!slot) return [];
  if (slot.kind === "choice") {
    const option = slot.options.find((item) => item.id === resolved.choices[slotId]);
    if (!option || option.id === "none" || /^no\b/i.test(option.name)) return [];
    if (!option.profiles?.length) return [{ count: 1, name: option.name }];
    return collapseProfiles(option.profiles);
  }
  return collapseProfiles(slot.kit.profiles ?? [slot.kit.name]);
}

function scale(weapons: WeaponLine[], count: number): WeaponLine[] {
  return weapons.map((weapon) => ({ count: weapon.count * count, name: weapon.name }));
}

function line(count: number, name: string): WeaponLine {
  return { count, name };
}

function combineGroups(groups: ModelGroup[]): ModelGroup[] {
  const order: string[] = [];
  const buckets = new Map<string, ModelGroup>();
  for (const group of groups) {
    if (group.count <= 0) continue;
    const key = `${group.name}::${group.weapons.map((weapon) => `${weapon.name.toLowerCase()}#${weapon.count / group.count}`).join(",")}`;
    const existing = buckets.get(key);
    if (!existing) {
      order.push(key);
      buckets.set(key, { count: group.count, name: group.name, weapons: group.weapons.map((weapon) => ({ ...weapon })) });
      continue;
    }
    const total = existing.count + group.count;
    existing.weapons = existing.weapons.map((weapon) => ({
      name: weapon.name,
      count: (weapon.count / existing.count) * total,
    }));
    existing.count = total;
  }
  return order.map((key) => buckets.get(key)!);
}

function rangedAndMelee(names: string[], count: number): WeaponLine[] {
  return names.map((name) => line(count, name));
}

function sistersGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("sisters-squad", models, gear);
  if (!resolved) return [];
  const pistol = "Bolt pistol";
  const cc = "Close combat weapon";
  const superiorGun = slotProfiles(resolved, "superior");
  const superiorMelee = slotProfiles(resolved, "superior-melee");
  const special = slotProfiles(resolved, "special");
  const heavy = slotProfiles(resolved, "heavy");
  const simulacrum = resolved.choices.simulacrum === "sim";
  const groups: ModelGroup[] = [
    {
      count: 1,
      name: "Sister Superior",
      weapons: [line(1, pistol), ...superiorGun, line(1, cc), ...superiorMelee],
    },
  ];
  const pushSister = (weapons: WeaponLine[]) => groups.push({ count: 1, name: "Battle Sister", weapons });
  if (resolved.choices.special !== "boltgun") pushSister([line(1, pistol), ...special, line(1, cc)]);
  if (resolved.choices.heavy !== "boltgun") pushSister([line(1, pistol), ...heavy, line(1, cc)]);
  let plain = (resolved.counts.sister ?? 0) + (resolved.choices.special === "boltgun" ? 1 : 0) + (resolved.choices.heavy === "boltgun" ? 1 : 0);
  if (simulacrum && plain > 0) {
    pushSister([line(1, pistol), line(1, "Boltgun"), line(1, cc), line(1, "Simulacrum Imperialis")]);
    plain -= 1;
  }
  if (plain > 0) groups.push({ count: plain, name: "Battle Sister", weapons: rangedAndMelee([pistol, "Boltgun", cc], plain) });
  return combineGroups(groups);
}

function greyKnightGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("grey-knights-terminators", models, gear);
  if (!resolved) return [];
  const nemesis = "Nemesis force weapon";
  const bolter = "Storm bolter";
  const banner = (resolved.counts.banner ?? 0) > 0;
  const narthecium = (resolved.counts.narthecium ?? 0) > 0;
  const specialBolter = resolved.choices.special === "bolter";
  const groups: ModelGroup[] = [];
  const justicar = [line(1, nemesis), line(1, bolter)];
  if (banner) justicar.push(line(1, "Ancient's banner"));
  groups.push({ count: 1, name: "Terminator Justicar", weapons: justicar });
  if (!specialBolter) {
    groups.push({ count: 1, name: "Grey Knight Terminator", weapons: [line(1, nemesis), ...slotProfiles(resolved, "special")] });
  }
  if (narthecium) {
    groups.push({ count: 1, name: "Grey Knight Terminator", weapons: [line(1, nemesis), line(1, "Narthecium")] });
  }
  const plain = (resolved.counts.bolter ?? 0) + (specialBolter ? 1 : 0);
  if (plain > 0) groups.push({ count: plain, name: "Grey Knight Terminator", weapons: rangedAndMelee([nemesis, bolter], plain) });
  return combineGroups(groups);
}

function breacherGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("breachers", models, gear);
  if (!resolved) return [];
  const groups: ModelGroup[] = [
    { count: 1, name: "Sergeant-at-Arms", weapons: slotProfiles(resolved, "sergeant") },
    { count: 1, name: "Armsman", weapons: slotProfiles(resolved, "special") },
  ];
  const heavy = resolved.counts.heavy ?? 0;
  if (heavy > 0) {
    groups.push({
      count: heavy,
      name: "Armsman",
      weapons: [...scale(slotProfiles(resolved, "heavy"), heavy), line(heavy, "Endurant shield")],
    });
  }
  for (const id of ["chainfist", "power"] as const) {
    const count = resolved.counts[id] ?? 0;
    if (count > 0) groups.push({ count, name: "Armsman", weapons: scale(slotProfiles(resolved, id), count) });
  }
  let shotguns = resolved.counts.shotgun ?? 0;
  if (resolved.choices.demo === "charge" && shotguns > 0) {
    groups.push({
      count: 1,
      name: "Armsman",
      weapons: [line(1, "Navis shotgun"), line(1, "Close combat weapon"), line(1, "Demolition charge")],
    });
    shotguns -= 1;
  }
  if (shotguns > 0) {
    groups.push({ count: shotguns, name: "Armsman", weapons: rangedAndMelee(["Navis shotgun", "Close combat weapon"], shotguns) });
  }
  return combineGroups(groups);
}

function arbitesGroups(unitId: "vigilants" | "exaction", models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout(unitId, models, gear);
  if (!resolved) return [];
  const exaction = unitId === "exaction";
  const vigilant = exaction ? "Exaction Vigilant" : "Vigilant";
  const proctor = [line(1, "Arbites combat shotgun"), line(1, "Arbites shotpistol"), line(1, "Close combat weapon")];
  if (resolved.choices.nuncio === "nuncio") proctor.push(line(1, "Nuncio-aquila"));
  const groups: ModelGroup[] = [{ count: 1, name: exaction ? "Proctor-Exactant" : "Proctor-Vigilant", weapons: proctor }];
  for (const id of ["executioner", "launcher", "stubber", "webber"] as const) {
    const count = resolved.counts[id] ?? 0;
    if (!count) continue;
    groups.push({
      count,
      name: vigilant,
      weapons: [...scale(slotProfiles(resolved, id), count), line(count, "Arbites shotpistol"), line(count, "Close combat weapon")],
    });
  }
  let shotguns = resolved.counts.shotgun ?? 0;
  if (exaction) {
    const extras: WeaponLine[] = [];
    if (resolved.choices.maul === "maul") extras.push(line(1, "Excruciator maul"));
    if (resolved.choices.medikit === "medikit") extras.push(line(1, "Arbites medi-kit"));
    if (resolved.choices.scanner === "scanner") extras.push(line(1, "Soulguilt scanner"));
    for (const extra of extras) {
      if (shotguns <= 0) break;
      shotguns -= 1;
      groups.push({
        count: 1,
        name: vigilant,
        weapons: [line(1, "Arbites combat shotgun"), line(1, "Arbites shotpistol"), line(1, "Close combat weapon"), extra],
      });
    }
  }
  if (shotguns > 0) {
    groups.push({
      count: shotguns,
      name: vigilant,
      weapons: rangedAndMelee(["Arbites combat shotgun", "Arbites shotpistol", "Close combat weapon"], shotguns),
    });
  }
  groups.push({ count: 1, name: "Cyber-mastiff", weapons: [line(1, "Mechanical bite")] });
  return combineGroups(groups);
}

function agentGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("inquisitorial-agents", models, gear);
  if (!resolved) return [];
  const groups: ModelGroup[] = [];
  for (const id of ["bolter", "melta", "cannon"] as const) {
    const count = resolved.counts[id] ?? 0;
    if (count > 0) groups.push({ count, name: "Gun Servitor", weapons: scale(slotProfiles(resolved, id), count) });
  }
  for (const id of ["eviscerator", "stave", "plasma"] as const) {
    const count = resolved.counts[id] ?? 0;
    if (count > 0) groups.push({ count, name: "Inquisitorial Agent", weapons: scale(slotProfiles(resolved, id), count) });
  }
  let agents = resolved.counts.agent ?? 0;
  const tomes = resolved.counts.tome ?? 0;
  const bearers = Math.min(tomes, agents);
  if (bearers > 0) {
    agents -= bearers;
    groups.push({
      count: bearers,
      name: "Inquisitorial Agent",
      weapons: rangedAndMelee(["Agent firearm", "Agent melee weapon", "Tome-skull"], bearers),
    });
  }
  if (agents > 0) {
    groups.push({ count: agents, name: "Inquisitorial Agent", weapons: rangedAndMelee(["Agent firearm", "Agent melee weapon"], agents) });
  }
  return combineGroups(groups);
}

function sanctifierGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("sanctifiers", models, gear);
  if (!resolved) return [];
  const missionary = slotProfiles(resolved, "missionary");
  const melee = line(1, "Sanctifier melee weapon");
  const groups: ModelGroup[] = [
    { count: 1, name: "Miraculist", weapons: [line(1, "Holy fire"), line(1, "Burning hands")] },
    { count: 1, name: "Salvationist", weapons: [line(1, "Close combat weapon"), line(1, "Salvationist medikit")] },
    { count: 1, name: "Death Cult Assassin", weapons: [line(1, "Death Cult blades")] },
    { count: 1, name: "Missionary", weapons: [...missionary, melee] },
    { count: 1, name: "Missionary", weapons: [line(1, "Ministorum flamer"), melee] },
  ];
  const flamers = resolved.counts.flamer ?? 0;
  if (flamers > 0) {
    groups.push({
      count: flamers,
      name: "Sanctifier",
      weapons: [line(flamers * 2, "Ministorum hand flamer"), line(flamers, "Close combat weapon")],
    });
  }
  const simulacrum = resolved.counts.simulacrum ?? 0;
  if (simulacrum > 0) {
    groups.push({
      count: simulacrum,
      name: "Sanctifier",
      weapons: [line(simulacrum, "Ministorum hand flamer"), line(simulacrum, "Close combat weapon"), line(simulacrum, "Simulacrum Imperialis")],
    });
  }
  const plain = resolved.counts.sanctifier ?? 0;
  if (plain > 0) {
    groups.push({
      count: plain,
      name: "Sanctifier",
      weapons: rangedAndMelee(["Ministorum hand flamer", "Sanctifier melee weapon"], plain),
    });
  }
  return combineGroups(groups);
}

function aquilaGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("aquila", models, gear);
  if (!resolved) return [];
  const groups: ModelGroup[] = [
    { count: 1, name: "Kill Team Sergeant", weapons: [line(1, "Plasma pistol"), line(1, "Power weapon")] },
  ];
  const names: Record<string, string> = {
    "Gravis Veteran": "Gravis Veteran",
    "Veteran gun": "Deathwatch Veteran",
    "Veteran weapon": "Deathwatch Veteran",
    "Phobos Veteran": "Deathwatch Veteran",
    Veteran: "Deathwatch Veteran",
  };
  for (const slot of resolved.spec.slots) {
    if (slot.kind !== "choice") continue;
    const label = names[slot.label] ?? slot.label;
    groups.push({ count: 1, name: label, weapons: slotProfiles(resolved, slot.id) });
  }
  return combineGroups(groups);
}

function deathwatchGroups(models: number, gear?: Record<string, string>): ModelGroup[] {
  const resolved = resolvedLoadout("deathwatch-kt", models, gear);
  if (!resolved) return [];
  const groups: ModelGroup[] = [{ count: 1, name: "Watch Sergeant", weapons: slotProfiles(resolved, "sergeant") }];
  for (const slot of resolved.spec.slots) {
    if (slot.kind !== "count") continue;
    const count = resolved.counts[slot.id] ?? 0;
    if (count > 0) groups.push({ count, name: "Deathwatch Veteran", weapons: scale(slotProfiles(resolved, slot.id), count) });
  }
  return combineGroups(groups);
}

function subductorGroups(gear?: Record<string, string>): ModelGroup[] {
  const proctor = [line(1, "Arbites shotpistol"), line(1, "Shock maul")];
  if (gear?.nuncio === "nuncio") proctor.push(line(1, "Nuncio-aquila"));
  return [
    { count: 1, name: "Proctor-Subductor", weapons: proctor },
    { count: 9, name: "Subductor", weapons: rangedAndMelee(["Arbites shotpistol", "Shock maul"], 9) },
    { count: 1, name: "Cyber-mastiff", weapons: [line(1, "Mechanical bite")] },
  ];
}

function voidsmenGroups(): ModelGroup[] {
  return [
    { count: 1, name: "Voidmaster", weapons: rangedAndMelee(["Artificer shotgun", "Laspistol", "Close combat weapon"], 1) },
    { count: 1, name: "Voidsman", weapons: rangedAndMelee(["Laspistol", "Voidsman rotor cannon", "Close combat weapon"], 1) },
    { count: 3, name: "Voidsman", weapons: rangedAndMelee(["Lasgun", "Laspistol", "Close combat weapon"], 3) },
    { count: 1, name: "Canid", weapons: [line(1, "Vicious bite")] },
  ];
}

function rogueTraderGroups(): ModelGroup[] {
  return [
    { count: 1, name: "Rogue Trader", weapons: rangedAndMelee(["Household pistol", "Monomolecular cane-rapier"], 1) },
    { count: 1, name: "Death Cult Assassin", weapons: rangedAndMelee(["Dartmask", "Death Cult power blade"], 1) },
    { count: 1, name: "Lectro-maester", weapons: rangedAndMelee(["Voltaic pistol", "Close combat weapon"], 1) },
    { count: 1, name: "Rejuvenant Adept", weapons: rangedAndMelee(["Laspistol", "Healing Serum", "Close combat weapon"], 1) },
  ];
}

function specialGroups(unitId: string, models: number, gear?: Record<string, string>): ModelGroup[] | null {
  switch (unitId) {
    case "sisters-squad":
      return sistersGroups(models, gear);
    case "grey-knights-terminators":
      return greyKnightGroups(models, gear);
    case "breachers":
      return breacherGroups(models, gear);
    case "vigilants":
      return arbitesGroups("vigilants", models, gear);
    case "exaction":
      return arbitesGroups("exaction", models, gear);
    case "inquisitorial-agents":
      return agentGroups(models, gear);
    case "sanctifiers":
      return sanctifierGroups(models, gear);
    case "aquila":
      return aquilaGroups(models, gear);
    case "deathwatch-kt":
      return deathwatchGroups(models, gear);
    case "subductors":
      return subductorGroups(gear);
    case "voidsmen":
      return voidsmenGroups();
    case "rogue-trader":
      return rogueTraderGroups();
    default:
      return null;
  }
}

function withGranted(weapons: WeaponLine[], enhancementId?: string): WeaponLine[] {
  const granted = enhancementId ? GRANTED_WEAPONS[enhancementId] : undefined;
  if (!granted) return weapons;
  const next = weapons.map((weapon) => ({ ...weapon }));
  addWeapon(next, 1, granted);
  return next;
}

function composition(entry: ShareEntry): { flat: WeaponLine[] } | { groups: ModelGroup[] } {
  const granted = entry.enhancement?.id;
  const special = specialGroups(entry.unitId, entry.models, entry.gear);
  if (special) {
    const groups = special.map((group, index) =>
      index === 0 ? { ...group, weapons: withGranted(group.weapons, granted) } : group,
    );
    return { groups };
  }
  const weapons = withGranted(equippedWeapons(entry.unitId, entry.models, entry.gear), granted);
  if (entry.models <= 1) return { flat: weapons };
  return { groups: splitSquad(entry.unitId, entry.models, weapons) };
}

function weaponLines(weapons: WeaponLine[], indent: number): string[] {
  return weapons.map((weapon, index) => {
    const text = `${weapon.count}x ${weapon.name}`;
    if (index === 0) return `${" ".repeat(indent)}• ${text}`;
    return `${" ".repeat(indent + 2)}${text}`;
  });
}

function blockLines(entry: ShareEntry, role: "leader" | "support" | "bodyguard" | null): string[] {
  const lines = [`${entry.name} (${entry.cost} points)${entry.warlord ? " — Warlord" : ""}`];
  if (role === "leader") lines.push("• Attached as: Leader (Character)");
  if (role === "support") lines.push("• Attached as: Support (Character)");
  if (role === "bodyguard") lines.push("• Attached as: Bodyguard");
  const gear = composition(entry);
  if ("flat" in gear) lines.push(...weaponLines(gear.flat, 2));
  else {
    for (const group of gear.groups) {
      lines.push(`  • ${group.count}x ${group.name}`);
      lines.push(...weaponLines(group.weapons, 4));
    }
  }
  if (entry.enhancement) {
    const upgrade = entry.enhancement.upgrade ? " (Upgrade)" : "";
    lines.push(`  • Enhancement: ${entry.enhancement.name}${upgrade}`);
  }
  return lines;
}

function formatEntry(entry: ShareEntry, role: "leader" | "support" | "bodyguard" | null): string {
  return blockLines(entry, role).join("\n");
}

/** Share-list text: army header, then each unit with weapons, wargear, enhancements, and attachments. */
export function formatShareList(list: ShareList): string {
  const used = new Set<string>();
  const blocks: string[] = [];
  const pushGroup = (body: ShareEntry) => {
    if (used.has(body.id)) return;
    const attached = list.entries.filter((entry) => entry.attachedTo === body.id);
    const leader = attached.find((entry) => !isSupport(entry.unitId));
    const support = attached.find((entry) => isSupport(entry.unitId));
    if (leader && !used.has(leader.id)) {
      blocks.push(formatEntry(leader, "leader"));
      used.add(leader.id);
    }
    if (support && !used.has(support.id)) {
      blocks.push(formatEntry(support, "support"));
      used.add(support.id);
    }
    const role = leader || support ? "bodyguard" : null;
    blocks.push(formatEntry(body, role));
    used.add(body.id);
  };

  for (const entry of list.entries) {
    if (used.has(entry.id)) continue;
    if (entry.attachedTo) {
      const body = list.entries.find((candidate) => candidate.id === entry.attachedTo);
      if (body) {
        pushGroup(body);
        continue;
      }
    }
    if (list.entries.some((candidate) => candidate.attachedTo === entry.id)) {
      pushGroup(entry);
      continue;
    }
    blocks.push(formatEntry(entry, null));
    used.add(entry.id);
  }

  const header = [list.name, `${list.total} pts / ${list.limit} pts`];
  if (list.detachmentNames) header.push(list.detachmentNames);
  return [...header, "", blocks.join("\n\n")].join("\n");
}
