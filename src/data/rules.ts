export type RuleEntry = { name: string; rule: string; key: string };

export type ArmyRule = { name: string; rule: string; parts?: { name: string; rule: string }[] };

export const ARMY_RULES: ArmyRule[] = [
  {
    name: "Martial Ka’tah",
    rule: "At the start of your Command phase, each unit with this ability becomes readied. While a unit is readied, it can use one ka’tah when that ka’tah’s timing window opens. You choose it then, not at the start of the turn. After the ability resolves, the unit is no longer readied, so it cannot use a second ka’tah that turn unless a Stratagem or other rule readies it again. A Shield Host’s favoured ka’tah adds an extra effect when that ka’tah is activated. It does not stop the unit using a different one.",
    parts: [
      {
        name: "Conservai",
        rule: "Your Command phase, one friendly readied unit. Until the end of the turn, being engaged or battle-shocked does not stop it being eligible to start an action, and starting an action does not stop it being eligible to shoot.",
      },
      {
        name: "Calistus",
        rule: "Your Movement phase, when a friendly readied unit is selected to move. When it makes a Normal, Advance, or Fall Back move, it can move through all types of model.",
      },
      {
        name: "Salvus",
        rule: "Your Shooting phase, when a friendly readied unit is selected to shoot. It can ignore modifiers to its Ballistic Skill, hit rolls, and wound rolls.",
      },
      {
        name: "Dacatarai",
        rule: "Start of the Fight phase, one friendly readied unit. Its melee attacks against a non-Monster/Vehicle unit can re-roll hit rolls of 1.",
      },
      {
        name: "Kaptaris",
        rule: "Start of the Fight phase, one friendly readied unit. Melee attacks that target your unit have −1 to hit.",
      },
      {
        name: "Rendax",
        rule: "Fight phase, when a friendly readied unit is selected to fight. Its melee attacks have [Lethal Hits: Monster/Vehicle].",
      },
    ],
  },
  {
    name: "Aegis of the Emperor",
    rule: "Friendly Adeptus Custodes units with this ability have Feel No Pain 5+ against mortal wounds.",
  },
  {
    name: "Aquila Commander",
    rule: "On several Character units. Grants an extra Command Point at the start of every battle round.",
  },
  {
    name: "Daughters of the Abyss",
    rule: "Friendly Anathema Psykana units with this ability have Feel No Pain 3+ against psychic attacks.",
    parts: [
      {
        name: "Psychic Null (Aura)",
        rule: "Friendly Adeptus Custodes units within 6\" have Feel No Pain 5+ against psychic attacks.",
      },
    ],
  },
];


export const KEYWORD_RULES: string[] = [
  "Keywords are tags, not a glossary. A rule that names a keyword only applies to units that have it.",
  "Singular and plural are the same.",
  "Faction keywords and other keywords work the same in play. Faction keywords also decide what can go in the army.",
  "If a weapon ability is followed by a keyword, it only applies when the target has that keyword. [Lethal Hits: Vehicle] only triggers against a Vehicle.",
  "Duplicated abilities are not cumulative. Pick one instance each time the unit attacks.",
  "An attached unit has every keyword of its component units, but models do not gain each other’s keywords.",
  "Attacks target the unit. [Anti-Psyker 4+] works against the whole unit if any model in it is a Psyker.",
  "A unit with mixed keywords has all of them. Its models do not.",
];

export const FLY_RULE =
  "Models with Fly, and their units, can fly. When selected to make a Normal, Advance, Fall Back, or charge move, you may declare it takes to the skies. If you do, subtract 2\" from the maximum distance. While moving, ignore vertical distance, move through all models including Monsters and Vehicles, and move through all terrain.";

export const WEAPON_ABILITIES: RuleEntry[] = [
  {
    key: "anti",
    name: "Anti-X Y+",
    rule: "Against a target with keyword X, an unmodified wound roll of Y+ is a critical wound.",
  },
  { key: "assault", name: "Assault", rule: "The unit can use assault shooting." },
  {
    key: "blast",
    name: "Blast",
    rule: "When gathering attack dice, add 1 extra dice for every 5 models in the target in the Select Targets step, rounding down. [Blast X] adds X dice per 5 models instead.",
  },
  {
    key: "cleave",
    name: "Cleave X",
    rule: "If you selected only one target for all of that weapon’s attacks, add X extra attack dice for every 5 models in that target, rounding down.",
  },
  {
    key: "close-quarters",
    name: "Close-quarters",
    rule: "The unit can use close-quarters shooting. With any other shooting type, each non-Monster/Vehicle model can use either its [Close-quarters] weapons or its other ranged weapons, not both. [Pistol] is identical.",
  },
  {
    key: "pistol",
    name: "Pistol",
    rule: "Identical to [Close-quarters]. The unit can use close-quarters shooting. With any other shooting type, each non-Monster/Vehicle model can use either its [Pistol] weapons or its other ranged weapons, not both.",
  },
  {
    key: "devastating wounds",
    name: "Devastating Wounds",
    rule: "A critical wound ends that attack’s sequence and inflicts mortal wounds equal to the weapon’s Damage, after normal damage. Those mortal wounds can damage only one model per critical wound. Leftovers are lost.",
  },
  {
    key: "extra attacks",
    name: "Extra Attacks",
    rule: "Those models fight with every [Extra Attacks] weapon in addition to one other melee weapon, if they have one.",
  },
  {
    key: "hazardous",
    name: "Hazardous",
    rule: "After the unit resolves its attacks, make one hazard roll for each [Hazardous] weapon you selected.",
  },
  {
    key: "heavy",
    name: "Heavy",
    rule: "In your Shooting phase, +1 to the hit roll if the unit is unengaged, was not set up this turn, and no model in it has moved more than 3\" this turn.",
  },
  {
    key: "ignores cover",
    name: "Ignores Cover",
    rule: "The target cannot have the benefit of cover against that attack, including from Stealth.",
  },
  { key: "indirect fire", name: "Indirect Fire", rule: "The unit can use indirect shooting." },
  { key: "lance", name: "Lance", rule: "If the unit charged this turn, +1 to the wound roll." },
  {
    key: "lethal hits",
    name: "Lethal Hits",
    rule: "On a critical hit, you may choose for that attack to automatically wound. No wound roll is made, so it cannot be a critical wound.",
  },
  {
    key: "melta",
    name: "Melta X",
    rule: "If the target was within half range in the Select Targets step, add X to Damage until those attacks are resolved.",
  },
  {
    key: "one shot",
    name: "One Shot",
    rule: "Each such weapon can be selected once per battle. A returned model cannot use [One Shot] weapons it already fired. A new unit added to the army can use its [One Shot] weapons once.",
  },
  {
    key: "precision",
    name: "Precision",
    rule: "If a visible Character is in the target, you may make that Character’s allocation group the current one until those attacks are resolved or that group is destroyed.",
  },
  {
    key: "psychic",
    name: "Psychic",
    rule: "You can ignore any or all modifiers to that attack’s BS or WS and to the hit roll. These are psychic attacks.",
  },
  {
    key: "rapid fire",
    name: "Rapid Fire X",
    rule: "Add X attack dice if the target was within half range in the Select Targets step.",
  },
  { key: "sustained hits", name: "Sustained Hits X", rule: "A critical hit scores X additional hits." },
  { key: "torrent", name: "Torrent", rule: "The attack automatically hits." },
  { key: "twin-linked", name: "Twin-linked", rule: "You can re-roll the wound roll." },
];

const BY_LENGTH = [...WEAPON_ABILITIES].sort((a, b) => b.key.length - a.key.length);

export function explainTag(tag: string): { name: string; rule: string; only?: string } | undefined {
  const raw = tag.trim().replace(/^\[/, "").replace(/\]$/, "");
  const [head, qualifier] = raw.split(":").map((part) => part.trim());
  if (!head) return undefined;
  const found = BY_LENGTH.find((ability) => {
    const text = head.toLowerCase();
    return text === ability.key || text.startsWith(`${ability.key} `) || text.startsWith(`${ability.key}-`);
  });
  if (!found) return undefined;
  return { name: found.name, rule: found.rule, only: qualifier || undefined };
}
