import { detachmentById, type Stratagem } from "@/data/enhancements";
import { keywordsOf } from "@/data/datasheets";

export const RULE_UPDATES = [
  "Universal Rules Updates, version 1.1, are legal for matched play from 26 August 2026.",
  "A rule that lets you target a friendly unit with a Stratagem for 0 CP, but does not name that Stratagem, instead reduces that use by 1 CP.",
  "A rule that lets you use a Stratagem even though you have already targeted another unit with it in the same phase only works if that rule names the Stratagem. The same limit applies if the Stratagem is limited to one use per player per turn, battle round, or battle.",
  "A Stratagem that says the target can only be selected as the target of a ranged attack if the attacking model is within 12\", or cannot be targeted by ranged attacks unless the attacking model is within 12\", is changed to 18\".",
  "A Stratagem that adds a new unit to your army identical to your destroyed unit can only be used once per battle.",
  "If a rule lets a unit declare a charge after disembarking from a Transport that made a Normal move that turn, that disembarkation is an assault disembark move instead of a disembark move. If a rule lets a unit disembark from a Transport that made an Advance that turn, that disembarkation is a shock disembark move instead of a disembark move.",
];

export const USING_STRATAGEMS =
  "Each Stratagem states its CP cost, WHEN, TARGET, EFFECT, and RESTRICTIONS. A player cannot use the same Stratagem more than once in the same phase. Unless otherwise stated, a player cannot target the same unit with more than one Stratagem in the same phase. Select targets, pay the CP cost, including any optional extra cost, then resolve the effect. If you cannot pay, you cannot use it.";

export type PhaseId = "any" | "command" | "movement" | "shooting" | "charge" | "fight";

export const PHASES: { id: PhaseId; label: string }[] = [
  { id: "command", label: "Command" },
  { id: "movement", label: "Movement" },
  { id: "shooting", label: "Shooting" },
  { id: "charge", label: "Charge" },
  { id: "fight", label: "Fight" },
  { id: "any", label: "Any phase" },
];

type TargetQuery = {
  groups?: string[][];
  unitIds?: string[];
  excludeKeywords?: string[];
  excludeUnitIds?: string[];
  minModels?: number;
  vehicleNeedsWalker?: boolean;
};

export type PlayStratagem = {
  id: string;
  name: string;
  cp: number;
  phases: PhaseId[];
  when: string;
  effect: string;
  restrictions?: string;
  source: string;
  target: TargetQuery;
};

export type RosterUnit = {
  key: string;
  label: string;
  keywords: string[];
  unitIds: string[];
  models: number;
};

const KEYWORD_LIST = [
  "Adeptus Custodes",
  "Anathema Psykana",
  "Trusted Sentinel",
  "Grav-Assault",
  "Dreadnought",
  "Terminator",
  "Character",
  "Infantry",
  "Mounted",
  "Vehicle",
  "Monster",
  "Walker",
  "Explosives",
  "Grenades",
  "Smoke",
  "Aircraft",
  "Titanic",
];

const NAMED_UNITS: [string, string][] = [
  ["Vigilator Squad", "vigilators"],
  ["Prosecutor Squad", "prosecutors"],
  ["Witchseeker Squad", "witchseekers"],
];

const sameKeyword = (left: string, right: string) => left.toLowerCase().replace(/s$/, "") === right.toLowerCase().replace(/s$/, "");

const hasKeyword = (unit: RosterUnit, keyword: string) => unit.keywords.some((word) => sameKeyword(word, keyword));

export function phasesOf(when: string): PhaseId[] {
  const text = when.toLowerCase();
  if (text.includes("any phase")) return ["any"];
  const phases: PhaseId[] = [];
  if (text.includes("command")) phases.push("command");
  if (text.includes("movement")) phases.push("movement");
  if (text.includes("shooting")) phases.push("shooting");
  if (text.includes("charge")) phases.push("charge");
  if (text.includes("fight")) phases.push("fight");
  return phases.length ? phases : ["any"];
}

function friendlyClause(when: string, rule: string): string {
  if (/friendly/i.test(when)) return when.slice(when.toLowerCase().indexOf("friendly"));
  if (/friendly/i.test(rule)) return rule.slice(rule.toLowerCase().indexOf("friendly"));
  return "";
}

function inferTarget(when: string, rule: string): TargetQuery {
  const full = `${when} ${rule}`;
  const clause = friendlyClause(when, rule).replace(/excluding [^.]*/gi, "");
  const excludeKeywords: string[] = [];
  const excludeUnitIds: string[] = [];
  if (/excluding titanics?/i.test(full)) excludeKeywords.push("Titanic");
  if (/excluding monsters?/i.test(full)) excludeKeywords.push("Monster", "Vehicle");
  if (/excluding custodian wardens/i.test(full)) excludeUnitIds.push("wardens");
  const unitIds = NAMED_UNITS.filter(([label]) => clause.includes(label)).map(([, id]) => id);
  const found: { name: string; index: number }[] = [];
  const lower = clause.toLowerCase();
  for (const keyword of KEYWORD_LIST) {
    const index = lower.indexOf(keyword.toLowerCase());
    if (index >= 0) found.push({ name: keyword, index });
  }
  found.sort((left, right) => left.index - right.index);
  const groups: string[][] = [];
  if (found.length > 0 && unitIds.length === 0) {
    let current = [found[0]!.name];
    for (let index = 1; index < found.length; index += 1) {
      const previous = found[index - 1]!;
      const next = found[index]!;
      const between = clause.slice(previous.index + previous.name.length, next.index);
      if (/\bor\b|\//.test(between) && between.trim().length < 8) current.push(next.name);
      else {
        groups.push(current);
        current = [next.name];
      }
    }
    groups.push(current);
  }
  const models = full.match(/(\d+) or more models/i);
  return {
    groups: groups.length ? groups : undefined,
    unitIds: unitIds.length ? unitIds : undefined,
    excludeKeywords: excludeKeywords.length ? excludeKeywords : undefined,
    excludeUnitIds: excludeUnitIds.length ? excludeUnitIds : undefined,
    minModels: models ? Number(models[1]) : undefined,
  };
}

const core = (
  name: string,
  cp: number,
  when: string,
  effect: string,
  target: TargetQuery,
  restrictions?: string,
): PlayStratagem => ({
  id: `core-${name}`,
  name,
  cp,
  phases: phasesOf(when),
  when,
  effect,
  restrictions,
  source: "Core",
  target,
});

const ANY: TargetQuery = {};

export const CORE_STRATAGEMS: PlayStratagem[] = [
  core(
    "Command Re-roll",
    1,
    "Any phase, just after you make an Advance roll, charge roll, Damage roll, hazard roll, hit roll, wound roll, or a roll to determine the number of attacks generated with a weapon, for a friendly unit or model.",
    "Re-roll that roll. If you are rolling more than one dice together, select one of those dice to re-roll. Charge rolls must be re-rolled in full.",
    ANY,
  ),
  core(
    "Epic Challenge",
    1,
    "Fight phase, just after a friendly Character unit is selected to fight.",
    "Select one Character model in your unit. Until the end of the phase, that model’s melee weapons have [Precision].",
    { groups: [["Character"]] },
  ),
  core(
    "Insane Bravery",
    1,
    "Battle-shock step of your Command phase, just before you make a battle-shock roll for a friendly unit.",
    "That battle-shock roll is automatically successful.",
    ANY,
    "Once per battle.",
  ),
  core(
    "Explosives",
    1,
    "Your Shooting phase. One friendly unengaged Explosives/Grenades unit that is eligible to shoot and did not Advance this turn.",
    "Select one Explosives/Grenades model in your unit, then one unengaged enemy unit within 8\" of and visible to that model. Roll one D6: for each 4+, that enemy unit suffers 1 mortal wound.",
    { groups: [["Explosives", "Grenades"]] },
  ),
  core(
    "Crushing Impact",
    1,
    "Your Charge phase, just after a friendly Monster/Vehicle unit ends a charge move.",
    "Select one enemy unit engaged with your unit, then one model in your unit engaged with that enemy unit. Roll a number of D6 equal to that model’s Toughness: for each 1, your unit suffers 1 mortal wound; for each 5+, that enemy unit suffers 1 mortal wound, to a maximum of 6 mortal wounds per unit.",
    { groups: [["Monster", "Vehicle"]] },
  ),
  core(
    "Rapid Ingress",
    1,
    "End of your opponent’s Movement phase. One friendly unit in Strategic Reserves, including Aircraft.",
    "That unit makes an ingress move. Cannot be used in the first battle round.",
    ANY,
    "The unit must be in Strategic Reserves.",
  ),
  core(
    "Fire Overwatch",
    1,
    "End of your opponent’s Movement phase. One friendly unengaged unit, excluding Titanic units.",
    "That unit shoots using snap shooting. Snap shooting can only target one visible enemy unit within 24\", and only if that unit is an eligible target. Each attack hits only on an unmodified hit roll of 6, ignoring Ballistic Skill and modifiers, and hit rolls cannot be re-rolled. Until the end of the phase, your unit is not eligible to start an action.",
    { excludeKeywords: ["Titanic"] },
    "The unit must be unengaged.",
  ),
  core(
    "Smokescreen",
    1,
    "Start of your opponent’s Shooting phase. One friendly Smoke unit.",
    "Until the end of the phase, each time an attack targets that Smoke unit, or a unit that is not fully visible to the attacking model because of one or more models in that Smoke unit, the target has the benefit of cover against that attack.",
    { groups: [["Smoke"]] },
  ),
  core(
    "Heroic Intervention",
    1,
    "End of your opponent’s Charge phase. One friendly unengaged unit within 12\" of one or more enemy units.",
    "Resolve a charge with your unit. Before the charge roll, choose one mode. Leap to Defend: when selecting charge targets, you can only select enemy units that made a charge move this phase and are within the maximum distance. Into the Fray costs +1 CP: if the charge roll is greater than 6 after modifiers, change it to 6, and you can select any enemy units within 6\" of your unit and within the maximum distance.",
    { vehicleNeedsWalker: true },
    "A Vehicle can only be selected if it is a Character or Walker. The unit must be unengaged.",
  ),
  core(
    "Counteroffensive",
    2,
    "Fight step of your opponent’s Fight phase, just after an enemy unit has resolved its attacks.",
    "Until the end of the phase, your unit has Fights First and must be the next unit you select to fight.",
    ANY,
    "The unit must be eligible to fight.",
  ),
];

function fromDetachment(stratagem: Stratagem, source: string): PlayStratagem {
  return {
    id: `${source}-${stratagem.name}`,
    name: stratagem.name,
    cp: stratagem.cp,
    phases: phasesOf(stratagem.when),
    when: stratagem.when,
    effect: stratagem.rule,
    source,
    target: inferTarget(stratagem.when, stratagem.rule),
  };
}

export function stratagemsFor(detachmentIds: readonly string[]): PlayStratagem[] {
  const detachment = detachmentIds.flatMap((id) => {
    const sheet = detachmentById(id);
    if (!sheet) return [];
    return sheet.stratagems.map((stratagem) => fromDetachment(stratagem, sheet.name));
  });
  return [...CORE_STRATAGEMS, ...detachment];
}

export function canTarget(stratagem: PlayStratagem, unit: RosterUnit): boolean {
  const target = stratagem.target;
  if (target.unitIds?.length && !target.unitIds.some((id) => unit.unitIds.includes(id))) return false;
  if (target.excludeUnitIds?.some((id) => unit.unitIds.includes(id))) return false;
  if (target.excludeKeywords?.some((keyword) => hasKeyword(unit, keyword))) return false;
  if (target.minModels != null && unit.models < target.minModels) return false;
  if (
    target.vehicleNeedsWalker &&
    hasKeyword(unit, "Vehicle") &&
    !hasKeyword(unit, "Walker") &&
    !hasKeyword(unit, "Character")
  ) {
    return false;
  }
  if (target.groups?.some((group) => !group.some((keyword) => hasKeyword(unit, keyword)))) return false;
  return true;
}

export function keywordsFor(unitIds: readonly string[]): string[] {
  return [...new Set(unitIds.flatMap((id) => keywordsOf(id)))];
}
