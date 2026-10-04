import { unitById } from "@/data/units";

export type Stratagem = { name: string; cp: number; when: string; rule: string };

export type Detachment = {
  id: string;
  name: string;
  dp: number;
  unique?: boolean;
  rule?: { name: string; text: string };
  dispositions: readonly string[];
  katah?: { name: string; effect: string };
  stratagems: Stratagem[];
};

export type Enhancement = {
  id: string;
  name: string;
  detachment: string;
  points: number;
  rule: string;
  /** May be taken on more than one unit, and still counts as one enhancement. */
  upgrade?: boolean;
  /** Upgrade that can still only be taken once in the army. */
  once?: boolean;
  targets: readonly string[];
};

export const MAX_DP = 3;
export const MAX_ENHANCEMENTS = 4;

const CUSTODES = [
  "shield-captain",
  "shield-captain-allarus",
  "shield-captain-jetbike",
  "blade-champion",
] as const;

const INFANTRY_CHARACTERS = CUSTODES.filter((id) => id !== "shield-captain-jetbike");
const CAPTAINS = ["shield-captain", "shield-captain-allarus", "shield-captain-jetbike"] as const;
const DREADS = ["telemon", "galatus", "achillus"] as const;
const GRAV = ["pallas", "caladius", "caladius-annihilator", "coronus"] as const;
const SENTINELS = ["sentinel-guard", "custodian-guard", "wardens"] as const;
const EAGLE = [
  "shield-captain",
  "blade-champion",
  "sentinel-guard",
  "custodian-guard",
  "wardens",
  "venatari-kinetic",
  "venatari-lances",
  "vertus",
  "gyrfalcon",
  "shield-captain-jetbike",
] as const;

export const DETACHMENTS: Detachment[] = [
  {
    id: "guardians",
    name: "Guardians of the Throne",
    dispositions: ["Priority Assets", "Purge the Foe"],
    dp: 3,
    rule: {
      name: "Martial Mastery",
      text: "In the Fight phase, when a friendly Adeptus Custodes unit is selected to fight, its melee attacks have [Sustained Hits 1] or [Lethal Hits].",
    },
    stratagems: [
      {
        name: "Superhuman Focus",
        cp: 1,
        when: "The end of any phase, on one friendly Adeptus Custodes unit that is not readied.",
        rule: "It is readied. You cannot select the same unit more than once per battle round.",
      },
      {
        name: "Unlimited Endurance",
        cp: 1,
        when: "Your Movement phase, when a friendly Adeptus Custodes unit ends an Advance.",
        rule: "Until the end of the turn its ranged attacks have [Assault], and that Advance does not stop it declaring a charge.",
      },
      {
        name: "Shield of Honour",
        cp: 1,
        when: "The start of the Fight phase, on one friendly Adeptus Custodes Infantry or Mounted unit.",
        rule: "When an enemy model engaged with your unit selects targets, if it does not select your unit as the target of all of its attacks, that model’s attacks have −1 to hit and −1 to wound.",
      },
      {
        name: "Prime Target",
        cp: 1,
        when: "Your Shooting phase, when a friendly Adeptus Custodes unit is selected to shoot.",
        rule: "Its ranged attacks can re-roll one hit roll, one wound roll, and one damage roll.",
      },
      {
        name: "In Auramite Clad",
        cp: 1,
        when: "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes unit, excluding Custodian Wardens.",
        rule: "Attacks that target your unit have −1 AP until that enemy unit has attacked.",
      },
      {
        name: "Swift as the Eagle",
        cp: 1,
        when: "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Trusted Sentinel unit.",
        rule: "That Trusted Sentinel unit can make a Normal move of up to D3+3\".",
      },
    ],
  },
  {
    id: "aquilan",
    name: "Aquilan Shield",
    dispositions: ["Take and Hold"],
    dp: 1,
    unique: true,
    rule: {
      name: "Gilded Guardians",
      text: "While a friendly Adeptus Custodes unit, excluding Monster and Vehicle units, is within range of an objective, ranged attacks that target it with Strength greater than its Toughness have −1 to wound.",
    },
    katah: { name: "Salvus", effect: "This unit’s ranged attacks have +6\" Range." },
    stratagems: [
      {
        name: "Manoeuvre and Fire",
        cp: 1,
        when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to Fall Back.",
        rule: "That move does not stop it shooting or declaring a charge.",
      },
      {
        name: "Tip of the Talon",
        cp: 1,
        when: "Your Shooting phase, when a friendly Adeptus Custodes unit is selected to shoot.",
        rule: "Its ranged attacks against an enemy unit within 9\" have +1 Strength.",
      },
      {
        name: "Rapid Reactions",
        cp: 1,
        when: "Your opponent’s Movement phase, when an enemy unit ends a Fall Back.",
        rule: "Target one friendly Adeptus Custodes Infantry unit that was engaged with that enemy unit at the start of the phase. Your unit shoots as normal, but can only target that enemy unit.",
      },
    ],
  },
  {
    id: "auric",
    name: "Auric Champions",
    dispositions: ["Purge the Foe"],
    dp: 1,
    rule: {
      name: "Assemblage of Might",
      text: "In your Command phase, select one enemy unit to be a dreadful foe until the start of your next Command phase. Friendly Adeptus Custodes Character models’ attacks against a dreadful foe have +1 to wound.",
    },
    stratagems: [
      {
        name: "Gilded Champion",
        cp: 1,
        when: "Any phase, when a friendly Adeptus Custodes Character has used a once-per-battle, per-unit datasheet ability.",
        rule: "It can use that ability one additional time, but not in the same phase. You cannot use this Stratagem on the same Character more than once per battle.",
      },
      {
        name: "Duty Unto Death",
        cp: 1,
        when: "The Fight phase, when an enemy unit targets a friendly Adeptus Custodes unit.",
        rule: "When a model in your unit is destroyed, if your unit has not been selected to fight this phase, roll one D6, adding 1 if that model is a Character. On a 3+, do not remove it. When your unit has fought, or at the end of the phase, remove it.",
      },
    ],
  },
  {
    id: "dread-host",
    name: "Dread Host",
    dispositions: ["Purge the Foe"],
    dp: 1,
    unique: true,
    rule: {
      name: "Instruments of the Emperor’s Wrath",
      text: "Friendly Adeptus Custodes units can re-roll charge rolls.",
    },
    katah: {
      name: "Dacatarai",
      effect: "When an enemy unit engaged with your unit piles in or consolidates, subtract 2\" from that move.",
    },
    stratagems: [
      {
        name: "Lightning Wrath",
        cp: 1,
        when: "The Fight phase, when a friendly Adeptus Custodes unit is selected to pile in.",
        rule: "That pile-in can be up to D3+3\".",
      },
      {
        name: "Golden Light of the Moiraides",
        cp: 2,
        when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to ingress.",
        rule: "Until the start of your next turn, attacks that target it have −1 to hit, and enemy units cannot target it with snap shooting attacks.",
      },
      {
        name: "Preternatural Rapidity",
        cp: 1,
        when: "Your Movement phase, when a friendly Adeptus Custodes unit ends an Advance.",
        rule: "That Advance does not stop it declaring a charge.",
      },
    ],
  },
  {
    id: "emissaries",
    name: "Emissaries Imperatus",
    dispositions: ["Priority Assets"],
    dp: 1,
    unique: true,
    rule: { name: "Heralds of the Throne", text: "Friendly Adeptus Custodes units have Fights First." },
    katah: {
      name: "Conservai",
      effect: "Until the end of the turn, being selected to Advance or Fall Back does not stop your unit being eligible to start an action.",
    },
    stratagems: [
      {
        name: "Bearers of His Light",
        cp: 1,
        when: "The Fight phase, when a friendly Adeptus Custodes unit is selected to fight.",
        rule: "Its melee attacks can ignore modifiers to hit rolls and wound rolls.",
      },
      {
        name: "Slayers of Nightmares",
        cp: 1,
        when: "The Fight phase, when a friendly Adeptus Custodes unit is selected to fight.",
        rule: "Its melee attacks against a unit with higher Toughness have +1 to wound.",
      },
      {
        name: "Selfless Service",
        cp: 1,
        when: "The end of your opponent’s Charge phase, on one friendly unengaged Adeptus Custodes unit within 6\" of an enemy unit.",
        rule: "A Vehicle can only be selected if it is a Character or Walker. Declare a charge. If the charge roll is greater than 6 after modifiers, change it to 6. Charge targets can only be enemy units within 6\" and within the maximum distance.",
      },
    ],
  },
  {
    id: "chosen",
    name: "Emperor's Chosen",
    dispositions: ["Priority Assets"],
    dp: 1,
    unique: true,
    rule: {
      name: "Magna Imperator",
      text: "When a friendly Adeptus Custodes unit is selected to attack, it can re-roll one hit roll and one wound roll.",
    },
    katah: {
      name: "Rendax",
      effect: "Select one enemy Monster or Vehicle engaged with your unit and roll one D6. On 1–2 it suffers 1 mortal wound, on 3–5 it suffers D3 mortal wounds, and on a 6 it suffers 3 mortal wounds.",
    },
    stratagems: [
      {
        name: "Superhuman Focus",
        cp: 1,
        when: "The end of any phase, on one friendly Adeptus Custodes unit that is not readied.",
        rule: "It is readied. You cannot select the same unit more than once per battle round.",
      },
      {
        name: "In Auramite Clad",
        cp: 1,
        when: "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes unit, excluding Custodian Wardens.",
        rule: "Attacks that target your unit have −1 AP until that enemy unit has attacked.",
      },
      {
        name: "Impenetrable Bastion",
        cp: 1,
        when: "The end of your Movement phase, on one friendly Adeptus Custodes unit, excluding Monster and Vehicle units.",
        rule: "Select one objective it is controlling. That objective is secured.",
      },
    ],
  },
  {
    id: "grav",
    name: "Grav-Assault Force",
    dispositions: ["Reconnaissance"],
    dp: 1,
    rule: {
      name: "Flare Shields",
      text: "Friendly Grav-Assault units have a 4+ invulnerable save against ranged attacks.",
    },
    stratagems: [
      {
        name: "Victory Before Death",
        cp: 1,
        when: "Any phase, when a friendly Grav-Assault unit within range of an objective is destroyed.",
        rule: "You can target it even though it is destroyed. Select one objective it was controlling that has no enemy units, excluding Aircraft, within range. That objective is secured.",
      },
      {
        name: "Advanced Stabilisers",
        cp: 1,
        when: "Your Shooting phase, when a friendly Grav-Assault unit is selected to shoot.",
        rule: "Its ranged attacks have [Assault].",
      },
      {
        name: "Inevitable Annihilation",
        cp: 1,
        when: "Your Shooting phase, when a friendly Grav-Assault unit is selected to shoot.",
        rule: "It can ignore modifiers to Ballistic Skill and hit rolls.",
      },
    ],
  },
  {
    id: "companions",
    name: "Honoured Companions",
    dispositions: ["Take and Hold"],
    dp: 1,
    rule: {
      name: "Companion’s Watch",
      text: "While a friendly Trusted Sentinel unit is within range of an objective, that unit’s attacks can re-roll wound rolls of 1.",
    },
    stratagems: [
      {
        name: "Emperor’s Domain",
        cp: 1,
        when: "The Fight phase, when a friendly Trusted Sentinel unit is selected to consolidate.",
        rule: "You can choose the objective consolidation mode regardless of that move’s Before Moving restrictions, so the unit can leave engagement range if it meets that mode’s conditions.",
      },
      {
        name: "Avenge the Fallen",
        cp: 1,
        when: "The Fight phase, when a friendly Trusted Sentinel unit below starting strength is selected to fight.",
        rule: "Its melee attacks, excluding those made by Character models, have +2 Attacks.",
      },
      {
        name: "Swift as the Eagle",
        cp: 1,
        when: "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Trusted Sentinel unit.",
        rule: "That Trusted Sentinel unit can make a Normal move of up to D3+3\".",
      },
    ],
  },
  {
    id: "lions",
    name: "Lions of the Emperor",
    dispositions: ["Disruption"],
    dp: 1,
    rule: {
      name: "On Gilded Wings",
      text: "At the end of your opponent’s Fight phase, if a friendly Adeptus Custodes Terminator unit is unengaged, you can place it in Strategic Reserves.",
    },
    stratagems: [
      {
        name: "Vigil Unending",
        cp: 2,
        when: "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes Terminator unit.",
        rule: "Attacks that target your unit have −1 Damage until that enemy unit has attacked.",
      },
      {
        name: "Unleash the Lions",
        cp: 1,
        when: "Your Command phase, on one friendly Adeptus Custodes Terminator unit with 2 or more models.",
        rule: "Split it into separate units of one model each. Each new unit has a starting strength of 1.",
      },
      {
        name: "Fury of the Emperor",
        cp: 1,
        when: "Your Charge phase, when a friendly Adeptus Custodes Terminator unit that made an ingress move this turn is selected to declare a charge.",
        rule: "It has +2 to charge rolls.",
      },
    ],
  },
  {
    id: "moritoi",
    name: "Might of the Moritoi",
    dispositions: ["Take and Hold"],
    dp: 1,
    rule: {
      name: "Moritoi Ancients",
      text: "A friendly Adeptus Custodes Dreadnought at starting strength has +2 OC. Below starting strength, its attacks can re-roll hit rolls of 1. Below half-strength, its attacks can re-roll hit rolls of 1 and wound rolls of 1.",
    },
    stratagems: [
      {
        name: "Honoured Interred",
        cp: 1,
        when: "Your Shooting phase or the Fight phase, on one friendly Adeptus Custodes Dreadnought.",
        rule: "It gains Honoured Interred (Aura): friendly Adeptus Custodes units within 6\" can re-roll hit rolls of 1.",
      },
      {
        name: "Unceasing Onslaught",
        cp: 1,
        when: "Your Movement phase, when a friendly Adeptus Custodes Dreadnought ends an Advance.",
        rule: "Until the end of the turn its ranged attacks have [Assault], and that move does not stop it declaring a charge.",
      },
      {
        name: "Unstoppable Momentum",
        cp: 1,
        when: "Your Movement or Charge phase, when a friendly Adeptus Custodes Dreadnought is selected to move or declares a charge.",
        rule: "It has Mobile.",
      },
    ],
  },
  {
    id: "vigil",
    name: "Null Maiden Vigil",
    dispositions: ["Disruption"],
    dp: 1,
    rule: {
      name: "Silent Sisterhood",
      text: "When mustering, you can select a friendly Anathema Psykana Character to be your Warlord. Friendly Prosecutor Squad units have Battleline. Friendly Anathema Psykana units have Creeping Dread (Aura): in the Battle-shock step of your opponent’s Command phase, each enemy unit within 12\" that is a Psyker or below starting strength takes a Battle-shock test at −1.",
    },
    stratagems: [
      {
        name: "Anathema Blademastery",
        cp: 1,
        when: "The Fight phase, when a friendly Vigilator Squad is selected to fight.",
        rule: "Its attacks have [Sustained Hits 1] or [Lethal Hits].",
      },
      {
        name: "Psy-chaff Volley",
        cp: 1,
        when: "Your Shooting phase, when a friendly Prosecutor Squad has shot.",
        rule: "Select one enemy unit hit by those attacks. It is prosecuted until the end of the turn, and attacks that target it have +1 AP.",
      },
      {
        name: "Purgation Sweep",
        cp: 1,
        when: "Your Shooting phase, when a friendly Witchseeker Squad is selected to shoot.",
        rule: "Its [Torrent] attacks have +1 Attack, or +2 Attacks if they target a Psyker or battle-shocked unit.",
      },
    ],
  },
  {
    id: "shadowkeepers",
    name: "Shadowkeepers",
    dispositions: ["Purge the Foe"],
    dp: 1,
    unique: true,
    rule: {
      name: "Wardens of the Dark Cells",
      text: "While a friendly Adeptus Custodes unit, excluding Monster and Vehicle units, is within range of an objective, melee attacks that target it with Strength greater than its Toughness have −1 to wound.",
    },
    katah: {
      name: "Kaptaris",
      effect: "Select one enemy unit engaged with your unit. It takes a Battle-shock test at −1. You cannot select the same enemy unit for this more than once per phase.",
    },
    stratagems: [
      {
        name: "Grim Responsibility",
        cp: 1,
        when: "The Fight phase, when a friendly Adeptus Custodes Infantry unit is selected to fight.",
        rule: "Its melee attacks have [Lethal Hits: Character/Monster].",
      },
      {
        name: "No Escape",
        cp: 2,
        when: "Your opponent’s Movement phase, when an enemy unit ends a Fall Back.",
        rule: "Target one friendly unengaged Adeptus Custodes Infantry unit within 6\" of that enemy unit and declare a charge. Charge targets can only be enemy units that Fell Back this phase and are within the maximum distance.",
      },
      {
        name: "Indomitable Guardians",
        cp: 1,
        when: "Your opponent’s Fight phase, when an enemy unit has fought.",
        rule: "Target one friendly Adeptus Custodes unit within range of an objective that is eligible to fight. It has Fights First and must be the next unit you select to fight.",
      },
    ],
  },
  {
    id: "solar",
    name: "Solar Watch",
    dispositions: ["Reconnaissance"],
    dp: 1,
    unique: true,
    rule: {
      name: "Talon Sortie",
      text: "When a friendly Adeptus Custodes unit Falls Back, that move does not stop it being eligible to charge.",
    },
    katah: { name: "Calistus", effect: "Your unit has +2\" Movement." },
    stratagems: [
      {
        name: "Inexorable",
        cp: 1,
        when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to move.",
        rule: "Until the end of the turn it can ignore modifiers to Movement, advance rolls, and charge rolls.",
      },
      {
        name: "At Spear’s Length",
        cp: 1,
        when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to Fall Back.",
        rule: "That move does not stop it being eligible to shoot.",
      },
      {
        name: "Gravimetric Grenade",
        cp: 1,
        when: "The start of your opponent’s Charge phase, on one friendly unengaged Adeptus Custodes unit.",
        rule: "Select one visible enemy unit within 12\". When that enemy unit declares a charge, it has −1 to charge rolls.",
      },
    ],
  },
];

export const ENHANCEMENTS: Enhancement[] = [
  {
    id: "bane",
    name: "Bane of Abominations",
    detachment: "guardians",
    points: 20,
    rule: "Adeptus Custodes model only. Its attacks against an enemy Character, Monster, or Vehicle have +1 to wound.",
    targets: CUSTODES,
  },
  {
    id: "eagles-eye",
    name: "Eagle's Eye",
    detachment: "guardians",
    points: 30,
    rule: "Adeptus Custodes model only. This model has +1 Wound. Once per battle, per army, when attacks are allocated to this model, it can have a 3+ invulnerable save.",
    targets: CUSTODES,
  },
  {
    id: "castellan",
    name: "Castellan's Mark",
    detachment: "guardians",
    points: 25,
    rule: "Adeptus Custodes model only. After both players have deployed, you can redeploy up to three friendly Adeptus Custodes units, including into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
    targets: CUSTODES,
  },
  {
    id: "emperors-light",
    name: "Emperor's Light",
    detachment: "guardians",
    points: 15,
    rule: "Adeptus Custodes model only. Emperor’s Light [Extra Attacks]: Melee, A3, WS 2+, S5, AP −2, D2.",
    targets: CUSTODES,
  },
  {
    id: "not-a-shell",
    name: "Not a Shell Wasted",
    detachment: "aquilan",
    points: 10,
    rule: "Adeptus Custodes Infantry model only. Its ranged attacks have +1 Attack.",
    targets: INFANTRY_CHARACTERS,
  },
  {
    id: "caducatrix",
    name: "Pareldor's Caducatrix",
    detachment: "aquilan",
    points: 30,
    rule: "Adeptus Custodes model only, once per battle, per army. At the start of any phase, this model heals D3+3 wounds.",
    targets: CUSTODES,
  },
  {
    id: "exemplar",
    name: "Inspirational Exemplar",
    detachment: "auric",
    points: 10,
    rule: "Adeptus Custodes Infantry model only, once per battle round, per army. At the start of any phase, select one friendly battle-shocked Adeptus Custodes unit within 9\". It is no longer battle-shocked.",
    targets: INFANTRY_CHARACTERS,
  },
  {
    id: "superior",
    name: "Superior Creation",
    detachment: "auric",
    points: 30,
    rule: "Adeptus Custodes Infantry model only. At the end of a phase in which this model is destroyed, roll one D6. On a 2+, set it back up as close as possible to where it was destroyed, unengaged, with 3 wounds remaining.",
    targets: INFANTRY_CHARACTERS,
  },
  {
    id: "hidden-blade",
    name: "Shroud of the Hidden Blade",
    detachment: "auric",
    points: 20,
    rule: "Adeptus Custodes model only. It has Stealth and Lone Operative.",
    targets: CUSTODES,
  },
  {
    id: "auric-exemplar",
    name: "Auric Exemplar",
    detachment: "dread-host",
    points: 15,
    rule: "Adeptus Custodes model only. Its melee attacks have [Cleave 1].",
    targets: CUSTODES,
  },
  {
    id: "flawless",
    name: "Flawless Bladework",
    detachment: "dread-host",
    points: 15,
    rule: "Adeptus Custodes model only. Its melee attacks have [Sustained Hits 1].",
    targets: CUSTODES,
  },
  {
    id: "orb",
    name: "Auriferous Orb",
    detachment: "emissaries",
    points: 20,
    rule: "Adeptus Custodes model only. Auriferous Orb [Anti-non-Monster/Vehicle 2+, Blinding Light, Devastating Wounds]: 12\", A3, BS 2+, S1, AP 0, D1. After this unit has shot, select one enemy unit hit by the Orb. That unit’s attacks have −1 to hit until the start of your next turn.",
    targets: CUSTODES,
  },
  {
    id: "edge",
    name: "Edge of the Blade",
    detachment: "emissaries",
    points: 15,
    rule: "Adeptus Custodes model only. If this unit charged this turn, this model’s attacks can re-roll hit rolls of 1 and wound rolls of 1.",
    targets: CUSTODES,
  },
  {
    id: "armouries",
    name: "From the Hall of Armouries",
    detachment: "chosen",
    points: 15,
    rule: "Adeptus Custodes model only. Its melee attacks have [Devastating Wounds].",
    targets: CUSTODES,
  },
  {
    id: "mantle",
    name: "Radiant Mantle",
    detachment: "chosen",
    points: 40,
    rule: "Adeptus Custodes Infantry model only. Attacks that target this unit have −1 to hit.",
    targets: INFANTRY_CHARACTERS,
  },
  {
    id: "anti-grav",
    name: "Anti-gravitic Mobility",
    detachment: "grav",
    points: 15,
    upgrade: true,
    rule: "Upgrade for a Grav-Assault unit only. A Fall Back move does not stop this unit being eligible to shoot.",
    targets: GRAV,
  },
  {
    id: "deployment",
    name: "Combat Deployment",
    detachment: "grav",
    points: 20,
    upgrade: true,
    rule: "Upgrade for a Grav-Assault Transport model only. When a friendly Adeptus Custodes unit disembarks from it, until the end of the turn that unit can re-roll charge rolls, and enemy units cannot target it with snap shooting attacks.",
    targets: ["coronus"],
  },
  {
    id: "arae",
    name: "Arae-Shrike",
    detachment: "companions",
    points: 20,
    rule: "Adeptus Custodes Infantry model only. Enemy units selected to make an ingress move cannot be set up within 12\" of this unit.",
    targets: INFANTRY_CHARACTERS,
  },
  {
    id: "sentries",
    name: "Celeritous Sentries",
    detachment: "companions",
    points: 15,
    upgrade: true,
    rule: "Upgrade for a Trusted Sentinel unit only, once per phase, per unit. You can target this unit with Heroic Intervention regardless of other uses this phase. That use is −1 CP and does not stop other units using that Stratagem this phase.",
    targets: SENTINELS,
  },
  {
    id: "conqueror",
    name: "Leonine Ferocity",
    detachment: "lions",
    points: 20,
    rule: "Shield-Captain in Allarus Terminator Armour only, once per phase, per army. You can target this unit with Rapid Ingress regardless of other uses this phase. That use is −1 CP and does not stop other units using that Stratagem this phase.",
    targets: ["shield-captain-allarus"],
  },
  {
    id: "descent",
    name: "Lightning Descent",
    detachment: "lions",
    points: 20,
    rule: "Shield-Captain in Allarus Terminator Armour only. In your first Movement phase, this unit can make an ingress move.",
    targets: ["shield-captain-allarus"],
  },
  {
    id: "augury",
    name: "Augury Uplink",
    detachment: "moritoi",
    points: 30,
    upgrade: true,
    once: true,
    rule: "Upgrade, one per army, for an Adeptus Custodes Dreadnought model only. It has Feel No Pain 5+.",
    targets: DREADS,
  },
  {
    id: "memento",
    name: "Memento Moritoi",
    detachment: "moritoi",
    points: 30,
    upgrade: true,
    once: true,
    rule: "Upgrade, one per army, for an Adeptus Custodes Dreadnought model only. Its melee attacks have +1 Attack, Strength, and Damage.",
    targets: DREADS,
  },
  {
    id: "huntress",
    name: "Huntress' Eye",
    detachment: "vigil",
    points: 10,
    rule: "Anathema Psykana model only. In your Movement phase, select one visible enemy unit within 12\". It takes a Battle-shock test at −1.",
    targets: ["knight-centura"],
  },
  {
    id: "oblivion",
    name: "Oblivion Knight",
    detachment: "vigil",
    points: 15,
    rule: "Anathema Psykana model only. This unit’s attacks have +1 to hit, or +1 to hit and wound if the target is a Psyker or battle-shocked.",
    targets: ["knight-centura"],
  },
  {
    id: "warding",
    name: "Genalchemic Warding",
    detachment: "shadowkeepers",
    points: 30,
    rule: "Adeptus Custodes model only. It has Feel No Pain 5+.",
    targets: CUSTODES,
  },
  {
    id: "destroyer",
    name: "Unstoppable Destroyer",
    detachment: "shadowkeepers",
    points: 25,
    rule: "Adeptus Custodes Infantry model only. When selected to pile in or consolidate, it can move up to 4\", and you can choose any consolidation mode regardless of Before Moving restrictions.",
    targets: INFANTRY_CHARACTERS,
  },
  {
    id: "auric-eagle",
    name: "Auric Eagle",
    detachment: "solar",
    points: 15,
    upgrade: true,
    rule: "Upgrade for an Adeptus Custodes Infantry or Mounted unit only, excluding Terminator units. It has +1 to advance rolls and charge rolls.",
    targets: EAGLE,
  },
  {
    id: "sally",
    name: "Sally Forth",
    detachment: "solar",
    points: 30,
    rule: "Adeptus Custodes Shield-Captain model only. At the start of your Charge phase, select one friendly Adeptus Custodes Infantry unit within 6\". If it Advanced this turn, that Advance does not stop it declaring a charge.",
    targets: CAPTAINS,
  },
];

export function detachmentById(id: string): Detachment | undefined {
  return DETACHMENTS.find((detachment) => detachment.id === id);
}

export function enhancementById(id: string): Enhancement | undefined {
  return ENHANCEMENTS.find((enhancement) => enhancement.id === id);
}

export function enhancementsFor(detachmentId: string): Enhancement[] {
  return ENHANCEMENTS.filter((enhancement) => enhancement.detachment === detachmentId);
}

export function spentDp(ids: readonly string[]): number {
  return ids.reduce((sum, id) => sum + (detachmentById(id)?.dp ?? 0), 0);
}

export function bearerNames(targets: readonly string[]): string {
  return targets.map((id) => unitById(id)?.name ?? id).join(", ");
}

export function repeatable(enhancement: Enhancement): boolean {
  return Boolean(enhancement.upgrade && !enhancement.once);
}
