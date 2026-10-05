export type WeaponProfile = {
  name: string;
  tags?: string;
  range: string;
  a: string;
  skill: string;
  s: string;
  ap: string;
  d: string;
};

export type ModelStats = {
  m: string;
  t: string;
  sv: string;
  w: string;
  ld: string;
  oc: string;
  inv?: string;
  damaged?: string;
};

export type Datasheet = {
  stats: ModelStats;
  /** Extra models in the unit, such as Sir Hekhtur. */
  profiles?: { name: string; stats: ModelStats }[];
  ranged: WeaponProfile[];
  melee: WeaponProfile[];
  fixed: string;
  /** Name of the first characteristic line when the unit has more than one. */
  profileName?: string;
  swaps?: string;
  abilities: { name: string; rule: string }[];
};

const gun = (
  name: string,
  tags: string,
  range: string,
  a: string,
  bs: string,
  s: string,
  ap: string,
  d: string,
): WeaponProfile => ({
  name,
  tags: tags || undefined,
  range,
  a,
  skill: bs === "—" ? "BS —" : `BS ${bs}`,
  s,
  ap,
  d,
});

const blade = (name: string, tags: string, a: string, ws: string, s: string, ap: string, d: string): WeaponProfile => ({
  name,
  tags: tags || undefined,
  range: "Melee",
  a,
  skill: `WS ${ws}`,
  s,
  ap,
  d,
});

const TAKE_WING = "At the end of the opponent’s Fight phase, if unengaged, place this unit in Strategic Reserves.";
const CASCADE_MINE =
  "Once per battle, per unit. At the start of a phase, pick an enemy unit within 3\" and roll a D6. On a 2+, that unit suffers D3 mortal wounds, or 2D3 if it is a Vehicle or Monster.";
const KATAHS = "Once per battle round, per unit. If this unit is not readied, you may ready it.";
const UNYIELDING = "Attacks with Strength greater than this unit’s Toughness have −1 to wound.";
const VEXILLA = "+1 OC. This unit can ignore modifiers to its Leadership.";

const SHADOW =
  "Cannot be your Warlord. If your faction is Agents of the Imperium, during Declare Battle Formations you may replace this model with a different Officio Assassinorum model of equal or lower points. After the swap you cannot have more than one of any assassin.";
const AUTHORITY =
  "While leading, this model can embark in any Transport its Bodyguard unit can embark in.";

const NUNCIO =
  "Once per battle, at the start of any Command phase, select one objective marker within 6\" of the bearer. Enemy units within range of that marker, except Monsters and Vehicles, take a Battle-shock test. Each objective marker can only be targeted by this ability once per turn.";
const FIRING_DECK =
  "Firing Deck 2. When this transport shoots, up to 2 embarked models each lend one ranged weapon that is not One Shot. Those units cannot shoot for the rest of the turn.";
const CODE_CHIVALRIC = {
  name: "Code Chivalric",
  rule: 'If your Army Faction is Imperial Knights, choose or roll one Deed and one Quality at the end of Read Mission Objectives. Qualities: re-roll one Hit roll and one Wound roll when selected to shoot or fight; +2" Move and +1 to Advance and Charge rolls; or +2 Objective Control and +1 Leadership. The first time the Deed is completed, the army is Honoured and you gain 2CP, or 3CP if the Deed or the Quality was rolled. Deeds: destroy a chosen enemy Character; control more objectives at the end of your opponent’s turn; or destroy more enemy units this battle round than the battle round number.',
};
const SUPER_HEAVY = {
  name: "Super-heavy Walker",
  rule: 'When this model makes a Normal, Advance, or Fall Back move, it can move through models, excluding Titanic models, and through terrain 4" or less in height. It may move within Engagement Range of enemy models, but it cannot end that move there. If it moves through taller terrain, roll one D6 afterwards: on a 1, it is Battle-shocked.',
};
const demise = (value: string) => ({ name: "Deadly Demise", rule: `Deadly Demise ${value}.` });
const damagedBracket = (band: string, oc: string) => ({
  name: "Damaged",
  rule: `While this model has ${band} wounds remaining, subtract ${oc} from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack.`,
});

export const DATASHEETS: Record<string, Datasheet> = {
  "aquilon-gauntlets": {
    stats: { m: '7"', t: "8", sv: "2+", w: "6", ld: "5+", oc: "2", inv: "4+" },
    ranged: [gun("Adrathic combi-destructor", "", '12"', "2", "2+", "5", "−2", "3")],
    melee: [blade("Solarite power gauntlet", "", "5", "2+", "10", "−2", "3")],
    fixed: "1 Adrathic combi-destructor, 1 Solarite power gauntlet.",
    abilities: [{ name: "Dread Foe", rule: "Melee attacks against a unit that is not a Monster or Vehicle have +1 AP." }],
  },
  "aquilon-talons": {
    stats: { m: '7"', t: "8", sv: "2+", w: "6", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Infernus firepike", "Blast 2, Torrent", '12"', "3", "—", "5", "−1", "1"),
      gun("Lastrum storm bolter", "Rapid Fire 3", '24"', "3", "2+", "5", "−1", "1"),
    ],
    melee: [blade("Solarite power talon", "Sustained Hits 2", "6", "2+", "6", "−2", "1")],
    fixed: "1 Lastrum storm bolter, 1 Solarite power talon.",
    swaps: "Each model may swap the bolter for 1 Infernus firepike.",
    abilities: [
      { name: "Reap a Terrible Tally", rule: "Against Infantry, re-roll hit rolls of 1 and wound rolls of 1." },
    ],
  },
  "blade-champion": {
    stats: { m: '8"', t: "7", sv: "2+", w: "7", ld: "5+", oc: "2", inv: "4+" },
    ranged: [],
    melee: [
      blade("Vaultswords — Behemor", "Devastating Wounds", "5", "2+", "10", "−3", "3"),
      blade("Vaultswords — Hurricanis", "Cleave 1, Sustained Hits 1", "10", "2+", "6", "−2", "1"),
      blade("Vaultswords — Victus", "Precision", "8", "2+", "8", "−3", "2"),
    ],
    fixed: "1 Vaultswords. Pick one profile before selecting targets.",
    abilities: [
      { name: "Swift Onslaught", rule: "Re-roll advance rolls and charge rolls." },
      {
        name: "Sword of the Throne",
        rule: "At the start of the first battle round, mark one enemy unit. Attacks against the mark have +1 to wound. When the mark is destroyed, choose a new one.",
      },
    ],
  },
  "sentinel-guard": {
    stats: { m: '8"', t: "7", sv: "2+", w: "5", ld: "5+", oc: "3", inv: "4+" },
    ranged: [gun("Sentinel blade", "Assault, Close-quarters", '12"', "4", "2+", "5", "−1", "2")],
    melee: [blade("Sentinel blade", "", "5", "2+", "6", "−2", "2")],
    fixed: "1 Praesidium shield, 1 Sentinel blade.",
    swaps: "One model may take a Vexilla.",
    abilities: [
      {
        name: "Stand Vigil",
        rule: "Attacks have Lethal Hits against units that are not Monsters or Vehicles if this unit or the target is within range of an objective.",
      },
      { name: "Praesidium Shield", rule: "Attacks with Strength greater than this unit’s Toughness have −1 to wound." },
      { name: "Vexilla", rule: VEXILLA },
    ],
  },
  trajann: {
    stats: { m: '8"', t: "7", sv: "2+", w: "10", ld: "5+", oc: "2", inv: "4+" },
    ranged: [gun("Eagle’s Scream", "Assault, Rapid Fire 2", '24"', "2", "2+", "6", "−2", "2")],
    melee: [blade("Watcher’s Axe", "Cleave 1", "6", "2+", "12", "−3", "4")],
    fixed: "1 Eagle’s Scream, 1 Watcher’s Axe. If he is in the army, he is the Warlord.",
    abilities: [
      {
        name: "Captain-General (Aura)",
        rule: "Friendly Adeptus Custodes units, excluding Monsters and Vehicles, within 6\" re-roll hit rolls of 1 and wound rolls of 1.",
      },
      {
        name: "Moment Shackle",
        rule: "Once per battle, per army. At the start of a phase, until the end of that phase, either the Watcher’s Axe has +3 Attacks or this model has a 3+ invulnerable save.",
      },
    ],
  },
  "shield-captain": {
    stats: { m: '8"', t: "7", sv: "2+", w: "8", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Castellan axe", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
      gun("Guardian spear", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
      gun("Pyrithite spear", "Assault, Melta 2", '12"', "1", "2+", "10", "−3", "D3+2"),
    ],
    melee: [
      blade("Castellan axe", "", "5", "2+", "10", "−2", "4"),
      blade("Eternity-pattern paragon blade", "Precision", "6", "2+", "10", "−3", "3"),
      blade("Guardian spear", "Cleave 1", "8", "2+", "8", "−2", "2"),
      blade("Pyrithite spear", "Cleave 1", "8", "2+", "8", "−2", "2"),
    ],
    fixed: "1 Praesidium shield, 1 Pyrithite spear.",
    swaps:
      "The spear may be swapped for an Eternity-pattern paragon blade. Spear and shield may instead be swapped for a Castellan axe or a Guardian spear. The shield is +25.",
    abilities: [
      { name: "Master of Ka’tahs", rule: KATAHS },
      {
        name: "Vengeful Surge",
        rule: "Once per battle, per unit. In the opponent’s Shooting phase, after an enemy unit shoots, if a model here lost a wound, this unit may surge up to D6+2\".",
      },
      { name: "Praesidium Shield", rule: "Attacks allocated to this model have −1 Damage." },
    ],
  },
  "venatari-kinetic": {
    stats: { m: '12"', t: "7", sv: "2+", w: "5", ld: "5+", oc: "2", inv: "4+" },
    ranged: [gun("Kinetic destroyer", "Assault, Close-quarters, Sustained Hits 1", '18"', "4", "2+", "6", "−2", "1")],
    melee: [blade("Tarsus buckler", "Sustained Hits 1", "5", "2+", "6", "−2", "1")],
    fixed: "1 Kinetic destroyer, 1 Tarsus buckler.",
    abilities: [
      { name: "Take Wing", rule: TAKE_WING },
      { name: "Neutronium Cascade Mine", rule: CASCADE_MINE },
      { name: "Strike from the Skies", rule: "If this unit ingresses this turn, its ranged attacks re-roll hits." },
    ],
  },
  "venatari-lances": {
    stats: { m: '12"', t: "7", sv: "2+", w: "5", ld: "5+", oc: "2", inv: "4+" },
    ranged: [gun("Verutum lance", "Assault", '18"', "1", "2+", "10", "−2", "3")],
    melee: [blade("Verutum lance", "Lance, Precision", "5", "2+", "7", "−2", "2")],
    fixed: "1 Verutum lance.",
    abilities: [
      { name: "Take Wing", rule: TAKE_WING },
      { name: "Neutronium Cascade Mine", rule: CASCADE_MINE },
      {
        name: "Swift Ruin",
        rule: "Once per phase, per army. Rapid Ingress on this unit costs 1 fewer CP and does not stop other uses of that Stratagem this phase.",
      },
    ],
  },
  galatus: {
    stats: { m: '9"', t: "10", sv: "2+", w: "12", ld: "5+", oc: "3", inv: "4+", damaged: "4" },
    ranged: [gun("Warblade", "Blast 2, Torrent, Twin-linked", '12"', "4", "—", "6", "−1", "2")],
    melee: [blade("Warblade", "Cleave 1, Sustained Hits 1: non-Monster/Vehicle", "8", "2+", "10", "−2", "3")],
    fixed: "1 Warblade.",
    abilities: [{ name: "Unyielding Ancient", rule: UNYIELDING }],
  },
  achillus: {
    stats: { m: '9"', t: "10", sv: "2+", w: "12", ld: "5+", oc: "3", inv: "5+", damaged: "4" },
    ranged: [
      gun("Adrathic combi-destructor", "", '12"', "2", "2+", "5", "−2", "3"),
      gun("Dreadspear", "", '18"', "2", "2+", "10", "−3", "D3+2"),
      gun("Lastrum storm bolter", "Rapid Fire 3", '24"', "3", "2+", "5", "−1", "1"),
      gun("Twin Infernus incinerator", "Blast 2, Torrent, Twin-linked", '12"', "3", "—", "6", "−1", "1"),
    ],
    melee: [blade("Dreadspear", "Lance", "5", "2+", "12", "−3", "D3+3")],
    fixed: "1 Dreadspear, 2 Lastrum storm bolters.",
    swaps: "The bolters may be swapped for 2 Adrathic combi-destructors or 2 Twin Infernus incinerators.",
    abilities: [{ name: "Unyielding Ancient", rule: UNYIELDING }],
  },
  "shield-captain-allarus": {
    stats: { m: '7"', t: "8", sv: "2+", w: "9", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Balistus grenade launcher", "Assault, Blast 1", '18"', "3", "2+", "5", "−1", "1"),
      gun("Castellan axe", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
      gun("Guardian spear", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
    ],
    melee: [
      blade("Castellan axe", "", "5", "2+", "10", "−2", "4"),
      blade("Guardian spear", "Cleave 1", "8", "2+", "8", "−2", "2"),
    ],
    fixed: "1 Balistus grenade launcher, 1 Guardian spear.",
    swaps: "The spear may be swapped for 1 Castellan axe.",
    abilities: [
      { name: "Master of Ka’tahs", rule: KATAHS },
      {
        name: "Archeotech Teleport-shunter",
        rule: "Once per battle, per unit. In your Movement phase, if unengaged and not yet selected to move, place this unit in Strategic Reserves. It must ingress this phase.",
      },
    ],
  },
  "shield-captain-jetbike": {
    stats: { m: '12"', t: "8", sv: "2+", w: "10", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Hurricane bolter", "Rapid Fire 3, Twin-linked", '18"', "3", "2+", "5", "−1", "2"),
      gun("Salvo launcher", "", '24"', "2", "2+", "10", "−2", "D3+2"),
    ],
    melee: [blade("Interceptor lance", "Lance", "8", "2+", "8", "−2", "2")],
    fixed: "1 Interceptor lance, 1 Salvo launcher.",
    swaps: "The launcher may be swapped for 1 Hurricane bolter.",
    abilities: [
      { name: "Master of Ka’tahs", rule: KATAHS },
      {
        name: "Sweeping Advance",
        rule: "Once per battle, per unit. At the end of the Fight phase, if it was eligible to fight, it may make a Normal move if unengaged, or Fall Back if engaged.",
      },
    ],
  },
  "custodian-guard": {
    stats: { m: '8"', t: "7", sv: "2+", w: "5", ld: "5+", oc: "3", inv: "4+" },
    ranged: [gun("Guardian spear", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2")],
    melee: [blade("Guardian spear", "", "6", "2+", "8", "−2", "2")],
    fixed: "1 Guardian spear.",
    swaps: "One model may take a Vexilla.",
    abilities: [
      {
        name: "Impenetrable Defence",
        rule: "Attacks have Sustained Hits 1 against units that are not Monsters or Vehicles if this unit or the target is within range of an objective.",
      },
      { name: "Vexilla", rule: VEXILLA },
    ],
  },
  wardens: {
    stats: { m: '8"', t: "7", sv: "2+", w: "6", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Castellan axe", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
      gun("Guardian spear", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
    ],
    melee: [
      blade("Castellan axe", "", "3", "2+", "10", "−2", "4"),
      blade("Guardian spear", "", "6", "2+", "8", "−2", "2"),
    ],
    fixed: "1 Guardian spear.",
    swaps: "Each model may swap it for a Castellan axe. One model may take a Vexilla.",
    abilities: [
      { name: "Living Fortress", rule: "Attacks that target this unit have −1 AP." },
      { name: "Vexilla", rule: VEXILLA },
    ],
  },
  allarus: {
    stats: { m: '7"', t: "8", sv: "2+", w: "6", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Balistus grenade launcher", "Assault, Blast 1", '18"', "3", "2+", "5", "−1", "1"),
      gun("Castellan axe", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
      gun("Guardian spear", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "2"),
    ],
    melee: [
      blade("Castellan axe", "", "3", "2+", "10", "−2", "4"),
      blade("Guardian spear", "", "6", "2+", "8", "−2", "2"),
    ],
    fixed: "1 Balistus grenade launcher, 1 Guardian spear.",
    swaps: "Each model may swap the spear for a Castellan axe. One model may take a Vexilla.",
    abilities: [
      { name: "Slayer of Tyrants", rule: "Melee attacks against a unit with higher Toughness have +1 to wound." },
      { name: "Vexilla", rule: VEXILLA },
    ],
  },
  vertus: {
    stats: { m: '12"', t: "8", sv: "2+", w: "7", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Hurricane bolter", "Rapid Fire 3, Twin-linked", '18"', "3", "2+", "5", "−1", "2"),
      gun("Salvo launcher", "", '24"', "2", "2+", "10", "−2", "D3+2"),
    ],
    melee: [blade("Interceptor lance", "Lance", "6", "2+", "8", "−2", "2")],
    fixed: "1 Interceptor lance, 1 Salvo launcher.",
    swaps: "Each model may swap the launcher for a Hurricane bolter.",
    abilities: [
      { name: "Quicksilver Execution", rule: "If this unit charged this turn, its melee attacks have Sustained Hits 1." },
    ],
  },
  gyrfalcon: {
    stats: { m: '12"', t: "8", sv: "2+", w: "9", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Adrathic devastator", "", '18"', "3", "2+", "8", "−2", "3"),
      gun("Arachnus volley cannon", "Devastating Wounds, Sustained Hits 1", '24"', "8", "2+", "5", "−1", "1"),
      gun("Lastrum bolt cannon", "Sustained Hits 1", '36"', "3", "2+", "6", "−2", "2"),
      gun("Twin Corvae las-pulser", "Twin-linked", '18"', "1", "2+", "10", "−3", "D3+2"),
    ],
    melee: [blade("Solarite power lance", "Lance", "5", "2+", "8", "−2", "3")],
    fixed: "1 Lastrum bolt cannon, 1 Solarite power lance.",
    swaps: "Each model may swap the cannon for an Adrathic devastator, an Arachnus volley cannon, or a Twin Corvae las-pulser.",
    abilities: [{ name: "Death Blow", rule: "If this unit charged this turn, its melee attacks have +1 AP." }],
  },
  pallas: {
    stats: { m: '12"', t: "9", sv: "2+", w: "10", ld: "5+", oc: "2", inv: "5+" },
    ranged: [
      gun("Twin Arachnus blaze cannon", "Twin-linked", '24"', "2", "2+", "10", "−3", "D3+2"),
      gun("Twin Iliastus accelerator fusil", "Rapid Fire 2, Twin-linked", '48"', "2", "2+", "10", "−1", "3"),
    ],
    melee: [blade("Armoured hull", "", "3", "4+", "6", "0", "1")],
    fixed: "1 Armoured hull, 1 Twin Arachnus blaze cannon.",
    swaps: "The blaze cannon may be swapped for a Twin Iliastus accelerator fusil.",
    abilities: [
      {
        name: "Mobile Hunter",
        rule: "After this unit shoots, it may make a Normal move of up to D6\" and cannot charge this turn.",
      },
    ],
  },
  coronus: {
    stats: { m: '12"', t: "12", sv: "2+", w: "16", ld: "5+", oc: "5", inv: "5+", damaged: "6" },
    ranged: [
      gun("Twin Arachnus blaze cannon", "Twin-linked", '24"', "2", "2+", "10", "−3", "D3+2"),
      gun("Twin Lastrum bolt cannon", "Sustained Hits 1, Twin-linked", '36"', "3", "2+", "6", "−2", "2"),
      gun("Twin Neutronium cascade projectors", "Blast 1, Torrent, Twin-linked", '12"', "3", "—", "7", "−2", "1"),
    ],
    melee: [blade("Armoured hull", "", "6", "4+", "8", "0", "1")],
    fixed: "1 Armoured hull, 1 Twin Arachnus blaze cannon, 1 Twin Lastrum bolt cannon.",
    swaps: "The bolt cannon may be swapped for Twin Neutronium cascade projectors.",
    abilities: [
      {
        name: "Repulsor Suspensor Technology",
        rule: "Once per phase, per unit. In the opponent’s Shooting phase, if this unit lost a wound and is unengaged, it may move up to D6\".",
      },
      { name: "Assault Vehicle", rule: "After an Advance, embarked units may Shock Disembark." },
    ],
  },
  caladius: {
    stats: { m: '10"', t: "11", sv: "2+", w: "14", ld: "5+", oc: "4", inv: "5+", damaged: "5" },
    ranged: [
      gun("Iliastus accelerator cannon", "Rapid Fire 4, Sustained Hits 1: non-Monster/Vehicle", '48"', "4", "2+", "10", "−1", "3"),
      gun("Twin Lastrum bolt cannon", "Sustained Hits 1, Twin-linked", '36"', "3", "2+", "6", "−2", "2"),
      gun("Twin Neutronium cascade projectors", "Blast 1, Torrent, Twin-linked", '12"', "3", "—", "7", "−2", "1"),
    ],
    melee: [blade("Armoured hull", "", "4", "4+", "6", "0", "1")],
    fixed: "1 Armoured hull, 1 Iliastus accelerator cannon, 1 Twin Lastrum bolt cannon.",
    swaps: "The bolt cannon may be swapped for Twin Neutronium cascade projectors.",
    abilities: [
      { name: "Destructor Optics", rule: "Ranged attacks against a unit that is not a Monster or Vehicle have +1 AP." },
    ],
  },
  "caladius-annihilator": {
    stats: { m: '10"', t: "11", sv: "2+", w: "14", ld: "5+", oc: "4", inv: "5+", damaged: "5" },
    ranged: [
      gun("Arachnus blaze carronade", "Lethal Hits: Monster/Vehicle", '48"', "4", "2+", "12", "−3", "D6+2"),
      gun("Twin Lastrum bolt cannon", "Sustained Hits 1, Twin-linked", '36"', "3", "2+", "6", "−2", "2"),
      gun("Twin Neutronium cascade projectors", "Blast 1, Torrent, Twin-linked", '12"', "3", "—", "7", "−2", "1"),
    ],
    melee: [blade("Armoured hull", "", "4", "4+", "6", "0", "1")],
    fixed: "1 Arachnus blaze carronade, 1 Armoured hull, 1 Twin Lastrum bolt cannon.",
    swaps: "The bolt cannon may be swapped for Twin Neutronium cascade projectors.",
    abilities: [
      {
        name: "Advanced Firepower",
        rule: "Against a Monster or Vehicle, re-roll one hit roll, one wound roll, and one damage roll.",
      },
    ],
  },
  telemon: {
    stats: { m: '10"', t: "11", sv: "2+", w: "14", ld: "5+", oc: "4", inv: "4+", damaged: "5" },
    ranged: [
      gun("Adrathic Desolator", "", '24"', "4", "2+", "10", "−2", "4"),
      gun("Arachnus Storm Cannon", "Devastating Wounds, Sustained Hits 1", '24"', "12", "2+", "6", "−1", "1"),
      gun("Iliastus Accelerator Culverin", "Rapid Fire 3", '48"', "3", "2+", "10", "−1", "3"),
      gun("Spiculus Bolt Launcher", "Blast 2", '36"', "6", "2+", "5", "−1", "1"),
      gun("Twin Neutronium Cascade Projectors", "Blast 1, Torrent, Twin-linked", '12"', "3", "—", "7", "−2", "1"),
    ],
    melee: [
      blade("Caestus Fist", "", "5", "2+", "14", "−3", "4"),
      blade("Dual Caestus Fists", "Twin-linked", "7", "2+", "14", "−3", "4"),
    ],
    fixed: "1 Dual Caestus Fists, 1 Spiculus Bolt Launcher, 2 Twin Neutronium Cascade Projectors.",
    swaps:
      "The fists and both projector sets may be replaced with one of these: 1 Adrathic Desolator, 1 Caestus Fist, and 1 Twin Neutronium Cascade Projectors; 1 Arachnus Storm Cannon, 1 Caestus Fist, and 1 Twin Neutronium Cascade Projectors; or 1 Caestus Fist, 1 Iliastus Accelerator Culverin, and 1 Twin Neutronium Cascade Projectors. The Spiculus Bolt Launcher stays in every loadout.",
    abilities: [{ name: "Guardian Eternal", rule: "Ranged attacks that target this unit have −1 Damage." }],
  },
  "knight-centura": {
    stats: { m: '7"', t: "3", sv: "3+", w: "4", ld: "6+", oc: "1", inv: "5+" },
    ranged: [
      gun("Master-crafted boltgun", "Anti-Psyker 4+, Assault, Rapid Fire 1", '24"', "2", "2+", "5", "−1", "2"),
      gun("Master-crafted flamer", "Anti-Psyker 4+, Assault, Blast 2, Torrent", '12"', "4", "—", "4", "−1", "1"),
    ],
    melee: [
      blade("Executioner greatblade", "Anti-Psyker 5+, Cleave 1, Devastating Wounds: Psyker", "4", "2+", "5", "−2", "2"),
      blade("Gun stock", "", "3", "2+", "3", "0", "1"),
    ],
    fixed: "1 Executioner greatblade.",
    swaps: "It may be swapped for a master-crafted boltgun and gun stock, or a master-crafted flamer and gun stock.",
    abilities: [
      { name: "Seeker’s Instincts", rule: "+2\" Movement. Re-roll advance rolls and charge rolls." },
      {
        name: "Corner the Quarry",
        rule: "A unit that is not a Monster or Vehicle and Falls Back while engaged must use Desperate Escape. If it is battle-shocked, −1 to those Hazard rolls.",
      },
    ],
  },
  prosecutors: {
    stats: { m: '7"', t: "3", sv: "3+", w: "1", ld: "6+", oc: "2" },
    ranged: [gun("Boltgun", "Anti-Psyker 4+, Assault, Rapid Fire 1", '24"', "1", "3+", "5", "−1", "1")],
    melee: [blade("Gun stock", "", "2", "3+", "3", "0", "1")],
    fixed: "1 Boltgun, 1 gun stock.",
    abilities: [
      {
        name: "Purity of Execution",
        rule: "In your Shooting phase, one visible enemy unit within 18\" is detected and has +3\" detection range while detected.",
      },
    ],
  },
  witchseekers: {
    stats: { m: '7"', t: "3", sv: "3+", w: "1", ld: "6+", oc: "1" },
    ranged: [gun("Flamer", "Anti-Psyker 4+, Assault, Blast 1, Torrent", '12"', "3", "—", "4", "−1", "1")],
    melee: [blade("Gun stock", "", "2", "3+", "3", "0", "1")],
    fixed: "1 Flamer, 1 gun stock.",
    abilities: [
      {
        name: "Sanctified Flames",
        rule: "After this unit shoots, one enemy unit hit by those attacks takes a Battle-shock test, at −1 if it is a Psyker.",
      },
    ],
  },
  rhino: {
    stats: { m: '12"', t: "9", sv: "3+", w: "10", ld: "6+", oc: "2" },
    ranged: [
      gun("Hunter-killer missile", "One Shot", '48"', "1", "2+", "14", "−3", "D3+3"),
      gun("Storm bolter", "Rapid Fire 2", '24"', "2", "3+", "5", "−1", "1"),
    ],
    melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
    fixed: "1 Armoured tracks, 1 storm bolter.",
    swaps: "May take 1 hunter-killer missile.",
    abilities: [{ name: "Assault Vehicle", rule: "After an Advance, embarked units may Shock Disembark." }],
  },
  vigilators: {
    stats: { m: '7"', t: "3", sv: "3+", w: "1", ld: "6+", oc: "1" },
    ranged: [],
    melee: [blade("Executioner greatblade", "Anti-Psyker 5+, Devastating Wounds: Psyker", "3", "3+", "5", "−2", "2")],
    fixed: "1 Executioner greatblade.",
    abilities: [{ name: "Deft Parry", rule: "Melee attacks that target this unit have −1 to hit." }],
  },
  callidus: {
    stats: { m: '7"', t: "4", sv: "6+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [gun("Neural shredder", "Anti-Infantry 2+, Precision, Torrent", '12"', "D6", "—", "5", "−2", "1")],
    melee: [blade("Phase sword and poison blades", "Lethal Hits, Precision", "5", "2+", "5", "−4", "2")],
    fixed: "Base 32mm. 1 Neural shredder, 1 Phase sword and poison blades.",
    abilities: [
      { name: "Reign of Confusion", rule: "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, increase that use by 1 CP." },
      { name: "Acrobatic Escape", rule: "At the end of the Fight phase, if engaged, Fall Back up to D6\". At the end of your opponent’s turn, if more than 3\" from all enemy units, place this unit in Strategic Reserves. It must ingress in your next Movement phase, including turn 1." },
      { name: "Shadow Assignment", rule: SHADOW },
      { name: "Rules", rule: "Assigned Agents, Deep Strike, Lone Operative, Fights First, Infiltrators." },
    ],
  },
  culexus: {
    stats: { m: '7"', t: "4", sv: "6+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [gun("Animus speculum", "Anti-Psyker 2+, Assault, Precision", '24"', "3", "2+", "5", "−2", "D3")],
    melee: [blade("Life-draining touch", "Anti-Psyker 2+, Devastating Wounds, Precision", "4", "2+", "4", "−2", "2")],
    fixed: "Base 32mm. 1 Animus speculum, 1 Life-draining touch.",
    abilities: [
      { name: "Psychic Assassin", rule: "Each time you select a Psyker unit as the target of the animus speculum, until those attacks are resolved, that weapon’s Attacks characteristic is 6." },
      { name: "Abomination", rule: "Feel No Pain 2+ against psychic attacks." },
      { name: "Soulless Horror", rule: "Once per battle, at the start of any Command phase. Each enemy unit within 9\" takes a Battle-shock test at −1, or −2 if it is a Psyker." },
      { name: "Etheric Emergence", rule: "When set up with Deep Strike, it may be set up more than 6\" horizontally from all enemy units, but it cannot declare a charge that turn." },
      { name: "Shadow Assignment", rule: SHADOW },
      { name: "Rules", rule: "Assigned Agents, Lone Operative, Stealth, Deep Strike." },
    ],
  },
  eversor: {
    stats: { m: '9"', t: "4", sv: "6+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [gun("Executioner pistol", "Anti-Infantry 3+, Pistol, Precision, Sustained Hits 3", '12"', "4", "2+", "4", "0", "1")],
    melee: [blade("Power sword and neuro gauntlet", "Anti-Infantry 3+, Precision, Sustained Hits 3", "6", "2+", "5", "−2", "2")],
    fixed: "Base 32mm. 1 Executioner pistol, 1 Power sword and neuro gauntlet.",
    abilities: [
      { name: "Frenzon", rule: "Eligible to shoot and declare a charge in a turn it Advanced." },
      { name: "Overkill", rule: "Once per battle, in your Movement phase before a Normal move. Until the end of the turn, +6\" Move and +3 Attacks on its melee weapons." },
      { name: "Shadow Assignment", rule: SHADOW },
      { name: "Rules", rule: "Assigned Agents, Lone Operative, Deadly Demise D3, Scouts 9\"." },
    ],
  },
  coteaz: {
    stats: { m: '6"', t: "3", sv: "2+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [
      gun("Bolt pistol", "Pistol", '12"', "1", "3+", "4", "0", "1"),
      gun("Psychic Blast", "Anti-Daemon 4+, Anti-Infantry 5+, Devastating Wounds, Psychic", '18"', "D6", "3+", "3", "−1", "1"),
    ],
    melee: [blade("Nemesis daemon hammer", "Psychic", "3", "3+", "9", "−3", "3")],
    fixed: "Base 40mm. 1 Bolt pistol, 1 Glovodan Psyber-eagle, 1 Nemesis daemon hammer, 1 Psychic Blast.",
    abilities: [
      { name: "Malefic Wardings", rule: "Psychic. While leading, the unit has a 6+ invulnerable save, and a 4+ invulnerable save against psychic attacks and attacks made by Daemon models." },
      { name: "Spy Network", rule: "Each time your opponent gains a CP from an ability, roll one D6: on a 2+, you also gain 1 CP." },
      { name: "Glovodan Psyber-eagle", rule: "In your Command phase, select one enemy unit within 18\". Until your next Command phase, that unit cannot have the Benefit of Cover." },
      { name: "Leader", rule: "Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Spectrus Kill Team, Subductor Squad, Vigilant Squad." },
      { name: "Authority of the Inquisition", rule: AUTHORITY },
      { name: "Rules", rule: "Assigned Agents, Leader." },
    ],
  },
  draxus: {
    stats: { m: '6"', t: "3", sv: "3+", w: "4", ld: "6+", oc: "1", inv: "5+" },
    ranged: [
      gun("Dirgesinger", "Anti-Infantry 4+, Assault, Devastating Wounds", '18"', "4", "3+", "4", "0", "2"),
      gun("Psychic Tempest", "Psychic, Sustained Hits 2", '18"', "6", "3+", "6", "0", "2"),
    ],
    melee: [blade("Power fist", "", "3", "3+", "6", "−2", "2")],
    fixed: "Base 32mm. 1 Dirgesinger, 1 Power fist, 1 Psychic Tempest.",
    abilities: [
      { name: "Xenos Hunter", rule: "While leading, attacks against a unit without Imperium or Chaos get +1 to hit." },
      { name: "Psychic Veil", rule: "Psychic. In your Command phase, roll one D6. On a 1, the unit suffers D3 mortal wounds. On a 2+, until your next Command phase the unit can only be selected as the target of a ranged attack if the attacking model is within 18\"." },
      { name: "Leader", rule: "Aquila Kill Team, Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Spectrus Kill Team, Subductor Squad, Vigilant Squad." },
      { name: "Authority of the Inquisition", rule: AUTHORITY },
      { name: "Rules", rule: "Assigned Agents, Leader." },
    ],
  },
  greyfax: {
    stats: { m: '6"', t: "3", sv: "3+", w: "4", ld: "6+", oc: "1", inv: "5+" },
    ranged: [
      gun("Castigation", "Anti-Character 4+, Devastating Wounds, Precision, Psychic", '18"', "1", "3+", "8", "−2", "3"),
      gun("Condemnor stake", "Anti-Psyker 2+, Devastating Wounds, Precision, Rapid Fire 1", '24"', "1", "3+", "4", "0", "1"),
    ],
    melee: [blade("Master-crafted power sword", "", "4", "3+", "4", "−2", "2")],
    fixed: "Base 32mm. 1 Castigation, 1 Condemnor stake, 1 Master-crafted power sword.",
    abilities: [
      { name: "Psyoculum", rule: "While leading, ranged weapons in the unit have Anti-Psyker 4+." },
      { name: "No Mercy", rule: "While leading, attacks against a unit Below Half-strength get +1 to hit." },
      { name: "Leader", rule: "Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Sanctifiers, Sisters of Battle Squad, Spectrus Kill Team, Subductor Squad, Vigilant Squad." },
      { name: "Authority of the Inquisition", rule: AUTHORITY },
      { name: "Rules", rule: "Assigned Agents, Leader." },
    ],
  },
  kroyle: {
    stats: { m: '12"', t: "4", sv: "3+", w: "6", ld: "6+", oc: "2", inv: "4+" },
    ranged: [
      gun("Jindarii tox-cycler", "Anti-Monster 2+, Heavy, Precision", '36"', "1", "2+", "6", "−2", "2"),
      gun("Stubcarbine", "Pistol", '12"', "2", "2+", "5", "−2", "2"),
    ],
    melee: [
      blade("Butcher blade", "", "5", "3+", "4", "−2", "1"),
      blade("Garralisk’s claws and teeth", "Extra Attacks", "4", "4+", "5", "−1", "1"),
    ],
    fixed: "Base 60mm. 1 Jindarii tox-cycler, 1 Stubcarbine, 1 Butcher blade, 1 Garralisk’s claws and teeth.",
    abilities: [
      { name: "On My Signal, Fire!", rule: "After this unit has shot, select one enemy unit hit. Until the end of the phase, Agents of the Imperium or Imperium Infantry Battleline models from your army can re-roll the Hit roll against that unit." },
      { name: "Tox-cycler", rule: "In your Shooting phase, after shooting, if this model scored a hit with the tox-cycler, add 2 to that weapon’s Strength and Damage until the end of the battle, to a maximum Damage of 6." },
      { name: "Rules", rule: "Lone Operative, Scouts 6\", Assigned Agents." },
    ],
  },
  vindicare: {
    stats: { m: '7"', t: "4", sv: "6+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [
      gun("Exitus pistol", "Devastating Wounds, Ignores Cover, Pistol, Precision", '12"', "3", "2+", "6", "−2", "3"),
      gun("Exitus rifle", "Devastating Wounds, Heavy, Ignores Cover, Precision", '48"', "1", "2+", "8", "−3", "D3+3"),
    ],
    melee: [blade("Vindicare combat knife", "", "4", "2+", "4", "−1", "1")],
    fixed: "Base 32mm. 1 Exitus pistol, 1 Exitus rifle, 1 Vindicare combat knife.",
    abilities: [
      { name: "Shieldbreaker", rule: "Once per battle, when selecting targets for the exitus rifle, fire a shieldbreaker round. Until the end of the phase, +1 to wound, and any successful wound is a Critical Wound." },
      { name: "Dead-shot", rule: "When selected to shoot, until it has shot, enemy units do not have Lone Operative, and hidden enemy units have +15\" detection range." },
      { name: "Shadow Assignment", rule: SHADOW },
      { name: "Rules", rule: "Assigned Agents, Lone Operative, Stealth, Infiltrators." },
    ],
  },
  artemis: {
    stats: { m: '6"', t: "4", sv: "3+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [gun("Hellfire Extremis", "Anti-Infantry 4+, Devastating Wounds, Ignores Cover, Torrent", '12"', "D6", "—", "4", "−1", "1")],
    melee: [blade("Master-crafted power weapon", "", "6", "2+", "5", "−2", "2")],
    fixed: "Base 32mm. 1 Hellfire Extremis, 1 Master-crafted power weapon.",
    abilities: [
      { name: "Tactical Instinct", rule: "While leading, weapons in the unit have Lethal Hits." },
      { name: "Unstoppable Champion", rule: "The first time this model is destroyed, at the end of the phase roll one D6. On a 2+, set it back up as close as possible, not engaged, with 1 wound remaining." },
      { name: "Leader", rule: "Aquila Kill Team, Deathwatch Kill Team, Deathwatch Terminator Squad, Fortis Kill Team, Indomitor Kill Team, Proteus Kill Team, Spectrus Kill Team." },
      { name: "Rules", rule: "Leader, Feel No Pain 6+, Assigned Agents." },
    ],
  },
  inquisitor: {
    stats: { m: '6"', t: "3", sv: "4+", w: "4", ld: "6+", oc: "1", inv: "5+" },
    ranged: [
      gun("Bolt pistol", "Pistol", '12"', "1", "3+", "4", "0", "1"),
      gun("Combi-weapon", "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1", '24"', "1", "3+", "4", "−2", "1"),
      gun("Psychic Shock Wave", "Devastating Wounds, Psychic, Torrent", '18"', "2D6", "—", "3", "−2", "1"),
    ],
    melee: [
      blade("Inquisitorial melee weapon", "", "5", "3+", "4", "−2", "1"),
      blade("Force weapon", "Psychic", "4", "3+", "5", "−2", "D3"),
    ],
    fixed: "Base 32mm. Starts with a bolt pistol, an Inquisitorial melee weapon, and blessed wardings.",
    swaps: "The pistol can be a combi-weapon. Blessed wardings can be replaced with psychic gifts and Psychic Shock Wave. If it has psychic gifts, the melee weapon can be a force weapon. Psychic gifts give the Psyker keyword.",
    abilities: [
      { name: "Leader", rule: "Aquila Kill Team, Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Sanctifiers, Sisters of Battle Squad, Spectrus Kill Team, Subductor Squad, Vigilant Squad." },
      { name: "Authority of the Inquisition", rule: AUTHORITY },
      { name: "Power of the Rosette", rule: "Each time you target this model’s unit with a Stratagem, roll one D6: on a 3+, you gain 1 CP." },
      { name: "Blessed Wardings", rule: "While leading, models in the unit have a 6+ invulnerable save." },
      { name: "Rules", rule: "Assigned Agents, Leader." },
    ],
  },
  "ministorum-priest": {
    stats: { m: '6"', t: "3", sv: "6+", w: "3", ld: "7+", oc: "1", inv: "4+" },
    ranged: [
      gun("Holy pistol", "Pistol", '12"', "3", "4+", "4", "0", "1"),
      gun("Zealot’s vindictor", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "0", "1"),
    ],
    melee: [
      blade("Power weapon", "", "3", "4+", "4", "−2", "1"),
      blade("Zealot’s vindictor", "", "3", "4+", "5", "−1", "2"),
    ],
    fixed: "Base 32mm. Starts with a zealot’s vindictor, which can be replaced with a holy pistol and a power weapon. May support one allowed unit.",
    abilities: [
      { name: "Zealot", rule: "Once per battle, in the Fight phase. Until the end of the phase, +3 Strength and Attacks on this model’s melee weapons." },
      { name: "Holy Hatred", rule: "While leading, melee weapons in the unit have Sustained Hits 1." },
      { name: "Support", rule: "Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad." },
      { name: "Rules", rule: "Support, Assigned Agents." },
    ],
  },
  navigator: {
    stats: { m: '6"', t: "3", sv: "5+", w: "3", ld: "7+", oc: "1", inv: "4+" },
    ranged: [gun("Laspistol", "Pistol", '12"', "1", "4+", "3", "0", "1")],
    melee: [blade("Force-orb cane", "Psychic", "3", "4+", "6", "−1", "D3")],
    fixed: "Base 32mm. 1 Force-orb cane, 1 Laspistol.",
    abilities: [
      { name: "Third Eye", rule: "Psychic. At the start of your Shooting phase, select one visible enemy unit within 12\". It takes a Battle-shock test, at −2 if it is Infantry. If failed, it suffers 3 mortal wounds." },
      { name: "Gaze into the Empyrean", rule: "Psychic. Reinforcements cannot be set up within 12\" of this model." },
      { name: "Leader", rule: "Imperial Navy Breachers, Voidsmen-at-Arms." },
      { name: "Rules", rule: "Assigned Agents, Leader." },
    ],
  },
  "rogue-trader": {
    stats: { m: '6"', t: "3", sv: "4+", w: "4", ld: "6+", oc: "1", inv: "4+" },
    ranged: [
      gun("Household pistol", "Pistol, Devastating Wounds", '12"', "2", "3+", "5", "−2", "2"),
      gun("Dartmask", "Anti-Infantry 2+, Pistol, Precision", '12"', "1", "4+", "2", "−1", "D3"),
      gun("Voltaic pistol", "Pistol, Sustained Hits 2", '12"', "3", "3+", "4", "−2", "1"),
      gun("Laspistol", "Pistol", '12"', "1", "4+", "3", "0", "1"),
    ],
    melee: [
      blade("Monomolecular cane-rapier", "", "4", "3+", "4", "−1", "1"),
      blade("Death Cult power blade", "Precision", "5", "2+", "4", "−2", "1"),
      blade("Close combat weapon", "", "1", "4+", "3", "0", "1"),
    ],
    fixed: "Rogue Trader 25mm: Household pistol, Monomolecular cane-rapier. Death Cult Assassin 25mm, W2 Ld 7+: Dartmask, Death Cult power blade. Lectro-maester 25mm, W2 Ld 7+: Voltaic pistol, Close combat weapon. Rejuvenant Adept 25mm, W2 Ld 7+: Laspistol, Healing Serum, Close combat weapon.",
    abilities: [
      { name: "Backroom Deals", rule: "If your army has one or more units with this ability, during Declare Battle Formations select one. While that unit is leading, models in it have Infiltrators." },
      { name: "Leader", rule: "Imperial Navy Breachers, Voidsmen-at-Arms." },
      { name: "Warrant of Trade", rule: "After both players have deployed, select up to D3 Imperium Battleline units and redeploy them. You may set them up in Strategic Reserves regardless of how many units are already there." },
      { name: "Healing Serum", rule: "At the start of your Command phase, if the bearer’s unit is below Starting Strength, return up to D3 destroyed non-Character models." },
      { name: "Rules", rule: "Leader, Assigned Agents." },
    ],
  },
  "watch-master": {
    stats: { m: '6"', t: "4", sv: "2+", w: "5", ld: "6+", oc: "1", inv: "4+" },
    ranged: [gun("Vigil spear", "", '24"', "2", "2+", "4", "−1", "2")],
    melee: [blade("Vigil spear", "Lance", "6", "2+", "6", "−2", "D3")],
    fixed: "Base 32mm. 1 Vigil spear. The spear has both profiles.",
    abilities: [
      { name: "Strategic Knowledge", rule: "While leading, the unit is eligible to shoot and declare a charge in a turn it Advanced or Fell Back." },
      { name: "Rites of Battle", rule: "Once per battle round, one unit from your army with this ability, when targeted with a Stratagem, reduces that use by 1 CP." },
      { name: "Leader", rule: "Aquila Kill Team, Deathwatch Kill Team, Deathwatch Terminator Squad, Fortis Kill Team, Indomitor Kill Team, Proteus Kill Team, Spectrus Kill Team." },
      { name: "Rules", rule: "Leader, Assigned Agents." },
    ],
  },
  aquila: {
    stats: { m: '6"', t: "4", sv: "3+", w: "2", ld: "6+", oc: "2" },
    profileName: "Kill Team Sergeant, Deathwatch Veteran",
    profiles: [{ name: "Gravis Veteran", stats: { m: '5"', t: "6", sv: "3+", w: "3", ld: "6+", oc: "2" } }],
    ranged: [
      gun("Plasma pistol", "Pistol", '12"', "1", "3+", "7", "−2", "1"),
      gun("Plasma pistol, supercharge", "Hazardous, Pistol", '12"', "1", "3+", "8", "−3", "2"),
      gun("Bolt pistol", "Pistol, Lethal Hits", '12"', "1", "3+", "4", "0", "1"),
      gun("Infernus heavy bolter", "Sustained Hits 1", '36"', "3", "3+", "5", "−1", "2"),
      gun("Infernus heavy bolter, heavy flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "−1", "1"),
      gun("Frag cannon", "Blast, Heavy, Lethal Hits, Rapid Fire D3", '18"', "D3", "3+", "7", "−2", "2"),
      gun("Hellstorm bolt rifle", "Assault, Heavy, Lethal Hits", '30"', "2", "3+", "5", "−2", "2"),
      gun("Astartes grenade launcher, frag", "Blast", '24"', "D3", "3+", "4", "0", "1"),
      gun("Astartes grenade launcher, krak", "", '24"', "1", "3+", "9", "−2", "D3"),
      gun("Stalker bolt rifle", "Heavy, Lethal Hits, Precision", '30"', "2", "3+", "5", "−2", "2"),
      gun("Plasma incinerator", "Assault, Heavy", '24"', "2", "3+", "7", "−2", "1"),
      gun("Plasma incinerator, supercharge", "Assault, Hazardous, Heavy", '24"', "2", "3+", "8", "−3", "2"),
      gun("Special-issue bolt pistol", "Pistol, Precision, Lethal Hits", '18"', "1", "3+", "4", "−1", "1"),
      gun("Deathwatch marksman bolt carbine", "Heavy, Lethal Hits", '24"', "2", "3+", "5", "−1", "1"),
    ],
    melee: [
      blade("Power weapon", "Sustained Hits 1", "4", "3+", "5", "−2", "2"),
      blade("Close combat weapon", "", "3", "3+", "4", "0", "1"),
      blade("Heavy thunder hammer", "Devastating Wounds", "3", "4+", "10", "−2", "3"),
      blade("Combat knife", "Precision", "4", "3+", "4", "−1", "1"),
      blade("Xenophase blade", "Devastating Wounds", "4", "3+", "5", "−2", "1"),
    ],
    fixed: "5: 1 Sergeant (plasma pistol and power weapon, 32mm), 1 Gravis Veteran (infernus heavy bolter, bolt pistol, and close combat weapon, 40mm), and 3 Veterans. 10: 1 Sergeant, 2 Gravis Veterans, and 7 Veterans. For every 5 models, one Veteran has a stalker bolt rifle, one a heavy thunder hammer, and one a marksman bolt carbine. A 10-model unit also has one Veteran with a xenophase blade.",
    swaps: "For every 5 models, one infernus heavy bolter can be a frag cannon, or a Hellstorm bolt rifle and Astartes grenade launcher. One thunder hammer can be a power weapon and Astartes shield. One stalker bolt rifle can be a plasma incinerator. One marksman bolt carbine can be a combat knife.",
    abilities: [
      { name: "Death to the Alien", rule: "Re-roll a Hit roll of 1. If the target has neither Imperium nor Chaos, re-roll the Hit roll instead." },
      { name: "Kill Team", rule: "If this unit has mixed Toughness, incoming attacks use the majority Toughness, or the highest if two values tie. A Gravis Veteran counts as 2 models for Transport, but can still embark in any Transport this unit can." },
      { name: "Astartes Shield", rule: "The bearer has a 4+ invulnerable save." },
      { name: "Attached Unit", rule: "A Character that can join a Deathwatch Kill Team can join this unit instead." },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  "deathwatch-kt": {
    stats: { m: '6"', t: "4", sv: "3+", w: "2", ld: "6+", oc: "2" },
    ranged: [
      gun("Boltgun", "", '24"', "2", "3+", "4", "0", "1"),
      gun("Combi-weapon", "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1", '24"', "1", "4+", "4", "0", "1"),
      gun("Deathwatch shotgun", "Assault", '18"', "2", "3+", "4", "0", "2"),
      gun("Stalker-pattern boltgun", "Heavy, Precision", '24"', "1", "3+", "4", "−1", "2"),
      gun("Infernus heavy bolter", "Heavy, Sustained Hits 1", '36"', "3", "4+", "5", "−1", "2"),
      gun("Infernus heavy bolter, heavy flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "−1", "1"),
      gun("Frag cannon", "Blast, Heavy, Rapid Fire D3", '18"', "D3", "4+", "7", "−1", "2"),
    ],
    melee: [
      blade("Power weapon", "", "3", "3+", "5", "−2", "1"),
      blade("Xenophase blade", "Devastating Wounds", "4", "3+", "5", "−2", "1"),
      blade("Black Shield blades", "Twin-linked", "4", "3+", "5", "−2", "1"),
      blade("Deathwatch thunder hammer", "Devastating Wounds", "3", "4+", "10", "−2", "3"),
      blade("Close combat weapon", "", "3", "3+", "4", "0", "1"),
    ],
    fixed: "1 Watch Sergeant and 4–9 Deathwatch Veterans. Every model starts with a boltgun and a power weapon. Base 32mm.",
    swaps: "For every 5 models: up to 2 boltgun and Astartes shield, or power weapon and Astartes shield; up to 2 thunder hammers; 1 stalker-pattern boltgun; up to 2 shotguns; 1 frag cannon; 1 infernus heavy bolter. One model in the unit may take Black Shield blades. The Sergeant’s boltgun can be a combi-weapon, and the Sergeant’s power weapon can be a xenophase blade.",
    abilities: [
      { name: "Death to the Alien", rule: "Re-roll a Hit roll of 1. If the target has neither Imperium nor Chaos, re-roll the Hit roll instead." },
      { name: "Astartes Shield", rule: "The bearer has a 4+ invulnerable save." },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  breachers: {
    stats: { m: '6"', t: "3", sv: "4+", w: "1", ld: "7+", oc: "2" },
    ranged: [
      gun("Navis shotgun", "Assault", '12"', "2", "4+", "4", "0", "1"),
      gun("Navis las-volley", "", '18"', "4", "4+", "6", "0", "1"),
      gun("Navis heavy shotgun", "Assault", '12"', "4", "4+", "4", "0", "1"),
      gun("Autopistol", "Pistol", '12"', "1", "4+", "3", "0", "1"),
      gun("Bolt pistol", "Pistol", '12"', "1", "4+", "4", "0", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "4+", "9", "−4", "D6"),
      gun("Plasma gun", "Rapid Fire 1", '24"', "1", "4+", "7", "−1", "1"),
      gun("Plasma gun, supercharge", "Hazardous, Rapid Fire 1", '24"', "1", "4+", "8", "−2", "2"),
      gun("Demolition charge", "Assault, Blast, Hazardous, One Shot", '6"', "D6", "5+", "9", "−2", "2"),
    ],
    melee: [
      blade("Close combat weapon", "", "1", "4+", "3", "0", "1"),
      blade("Chainsword", "", "3", "4+", "3", "0", "1"),
      blade("Power weapon", "", "2", "4+", "4", "−2", "1"),
      blade("Chainfist", "Anti-Vehicle 3+", "1", "5+", "6", "−2", "2"),
    ],
    fixed: "Base 25mm, or 28mm if a meltagun or plasma gun. Sergeant starts with a Navis shotgun. One Armsman has a las-volley, one has a heavy shotgun and Endurant shield, and the rest have shotguns.",
    swaps: "The Sergeant’s shotgun can be an autopistol and chainsword, or a bolt pistol and power weapon. The las-volley can be a meltagun or a plasma gun. One shotgun can be an autopistol and power weapon. One shotgun can be an autopistol and chainfist. One Armsman can take a demolition charge.",
    abilities: [
      { name: "Breaching Team", rule: "Re-roll a Wound roll of 1. If the target is within range of an objective marker, re-roll the Wound roll instead." },
      { name: "Gheistskull", rule: "Once per battle, when this unit is selected as the target of the Explosives Stratagem, you may target one enemy unit visible to and within 18\" of this unit that is not within Engagement Range of your army, instead of one within 8\"." },
      { name: "CAT Unit", rule: "Once per battle, when selected to shoot, ranged weapons gain Ignores Cover until the end of the phase." },
      { name: "Endurant shield", rule: "The bearer has a 4+ invulnerable save." },
    ],
  },
  vigilants: {
    stats: { m: '6"', t: "3", sv: "4+", w: "1", ld: "7+", oc: "2" },
    ranged: [
      gun("Arbites combat shotgun", "Assault", '18"', "2", "4+", "4", "0", "1"),
      gun("Arbites shotpistol", "Pistol", '12"', "1", "4+", "4", "0", "1"),
      gun("Executioner shotgun", "Ignores Cover, Precision", '24"', "1", "4+", "5", "−1", "1"),
      gun("Arbites grenade launcher, frag", "Blast", '24"', "D3", "4+", "4", "0", "1"),
      gun("Arbites grenade launcher, krak", "", '24"', "1", "4+", "9", "−2", "D3"),
      gun("Heavy stubber", "Rapid Fire 3", '36"', "3", "4+", "4", "0", "1"),
      gun("Webber", "Assault, Devastating Wounds, Torrent", '12"', "D6", "—", "2", "0", "1"),
    ],
    melee: [
      blade("Close combat weapon", "", "2", "4+", "3", "0", "1"),
      blade("Mechanical bite", "", "3", "4+", "4", "0", "1"),
    ],
    fixed: "1 Proctor-Vigilant, 9 Vigilants, and 1 Cyber-mastiff. Every Proctor and Vigilant starts with a combat shotgun, shotpistol, and close combat weapon. The mastiff has a mechanical bite. Base 28.5mm, mastiff 25mm.",
    swaps: "Up to 2 Vigilants can replace their combat shotgun with an executioner shotgun, Arbites grenade launcher, heavy stubber, or webber. Duplicates are not allowed. The Proctor can take a nuncio-aquila.",
    abilities: [
      { name: "Merciless Judgement", rule: "Ranged attacks against a unit Below Half-strength get +1 to wound." },
      { name: "Nuncio Aquila", rule: NUNCIO },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  exaction: {
    stats: { m: '6"', t: "3", sv: "4+", w: "1", ld: "7+", oc: "1" },
    ranged: [
      gun("Arbites combat shotgun", "Assault", '18"', "2", "4+", "4", "0", "1"),
      gun("Arbites shotpistol", "Pistol", '12"', "1", "4+", "4", "0", "1"),
      gun("Executioner shotgun", "Ignores Cover, Precision", '24"', "1", "4+", "5", "−1", "1"),
      gun("Arbites grenade launcher, frag", "Blast", '24"', "D3", "4+", "4", "0", "1"),
      gun("Arbites grenade launcher, krak", "", '24"', "1", "4+", "9", "−2", "D3"),
      gun("Heavy stubber", "Rapid Fire 3", '36"', "3", "4+", "4", "0", "1"),
      gun("Webber", "Assault, Devastating Wounds, Torrent", '12"', "D6", "—", "2", "0", "1"),
    ],
    melee: [
      blade("Close combat weapon", "", "2", "4+", "3", "0", "1"),
      blade("Excruciator maul", "", "2", "3+", "4", "−1", "2"),
      blade("Mechanical bite", "", "3", "4+", "4", "0", "1"),
    ],
    fixed: "1 Proctor-Exactant, 9 Exaction Vigilants, and 1 Cyber-mastiff. Every Proctor and Exaction Vigilant starts with a combat shotgun, shotpistol, and close combat weapon. The mastiff has a mechanical bite. Base 28.5mm, mastiff 25mm.",
    swaps: "Up to 2 Exaction Vigilants can replace their combat shotgun with an executioner shotgun, Arbites grenade launcher, heavy stubber, or webber. Duplicates are not allowed. Three other shotgun Vigilants can take an excruciator maul, an Arbites medi-kit, and a soulguilt scanner, and those shotguns cannot be replaced. The Proctor can take a nuncio-aquila.",
    abilities: [
      { name: "Imperial Law", rule: "At the start of the battle, select one enemy unit. Attacks against that unit have Lethal Hits and Precision." },
      { name: "Arbites Medi-kit", rule: "At the start of your Command phase, if the bearer’s unit is below Starting Strength, return up to D3 destroyed Exaction Vigilants." },
      { name: "Nuncio Aquila", rule: NUNCIO },
      { name: "Soulguilt Scanner", rule: "Ranged weapons equipped by models in the bearer’s unit have Ignores Cover." },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  "inquisitorial-agents": {
    stats: { m: '6"', t: "3", sv: "5+", w: "1", ld: "7+", oc: "1" },
    ranged: [
      gun("Agent firearm", "Pistol", '12"', "1", "3+", "4", "−1", "1"),
      gun("Plasma pistol", "Pistol", '12"', "1", "3+", "7", "−1", "1"),
      gun("Plasma pistol, supercharge", "Hazardous, Pistol", '12"', "1", "3+", "8", "−2", "2"),
      gun("Heavy bolter", "Heavy, Sustained Hits 1", '36"', "3", "4+", "5", "−1", "2"),
      gun("Multi-melta", "Heavy, Melta 2", '18"', "2", "4+", "9", "−4", "D6"),
      gun("Plasma cannon", "Blast, Heavy", '36"', "D3", "4+", "7", "−1", "1"),
      gun("Plasma cannon, supercharge", "Blast, Hazardous, Heavy", '36"', "D3", "4+", "8", "−2", "2"),
    ],
    melee: [
      blade("Agent melee weapon", "", "3", "3+", "3", "0", "1"),
      blade("Eviscerator", "Devastating Wounds", "2", "3+", "6", "−2", "2"),
      blade("Mystic stave", "Anti-Infantry 4+, Psychic", "2", "3+", "5", "−1", "D3"),
    ],
    fixed: "6 models are 5 Inquisitorial Agents and 1 Gun Servitor. 12 models are 10 Agents and 2 Gun Servitors. Agents start with an agent firearm and an agent melee weapon. Gun Servitors start with a heavy bolter and an agent melee weapon. Base 25mm, Gun Servitors 32mm.",
    swaps: "For every 5 Agents: 1 tome-skull, and one Agent each may take a plasma pistol, an eviscerator, or a mystic stave. The same Agent cannot take more than one of those three. A Gun Servitor’s heavy bolter can be a multi-melta or a plasma cannon.",
    abilities: [
      { name: "Loyal Henchmen", rule: "While an Inquisitor is leading this unit, attacks targeting it are −1 to wound." },
      { name: "Tome-skull", rule: "Once per battle for each tome-skull, at the start of any phase, select one friendly Agents of the Imperium unit within 6\" that is Battle-shocked, or one enemy unit within 6\". A friendly unit is no longer Battle-shocked. An enemy unit takes a Battle-shock test." },
      { name: "Inquisitorial Henchmen", rule: "If your Army Faction is not Agents of the Imperium, each Inquisitor lets you include one Inquisitorial Agents unit that does not count toward the number of Retinue units your army can include." },
    ],
  },
  sanctifiers: {
    stats: { m: '6"', t: "3", sv: "6+", w: "1", ld: "7+", oc: "1", inv: "5+" },
    ranged: [
      gun("Plasma gun", "Rapid Fire 1", '24"', "1", "4+", "7", "−2", "1"),
      gun("Plasma gun, supercharge", "Hazardous, Rapid Fire 1", '24"', "1", "4+", "8", "−3", "2"),
      gun("Meltagun", "Melta 2", '12"', "1", "4+", "9", "−4", "D6"),
      gun("Ministorum hand flamer", "Ignores Cover, Pistol, Torrent", '12"', "D6", "—", "4", "0", "1"),
      gun("Holy fire", "Ignores Cover, One Shot, Torrent", '12"', "D6", "—", "6", "−1", "2"),
      gun("Ministorum flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "0", "1"),
    ],
    melee: [
      blade("Sanctifier melee weapon", "", "3", "3+", "3", "0", "1"),
      blade("Burning hands", "Devastating Wounds", "1", "2+", "6", "−2", "3"),
      blade("Death Cult blades", "Precision", "4", "2+", "4", "−2", "1"),
      blade("Close combat weapon", "", "2", "3+", "3", "0", "1"),
    ],
    fixed: "1 Miraculist (holy fire, burning hands), 1 Salvationist (close combat weapon, medikit), 1 Death Cult Assassin (Death Cult blades), 1 Missionary (plasma gun, Sanctifier melee weapon), 1 Missionary (Ministorum flamer, Sanctifier melee weapon), and 4 Sanctifiers (hand flamer, Sanctifier melee weapon). Base 25mm.",
    swaps: "The plasma gun can be a meltagun. The Missionary who still has a plasma gun can also take holy fire, and then that plasma gun cannot be replaced. One Sanctifier can replace its melee weapon with a second hand flamer and a close combat weapon. One Sanctifier can replace its melee weapon with a close combat weapon and a simulacrum imperialis.",
    abilities: [
      { name: "Ministorum Sermon", rule: "While this unit contains a Ministorum Priest, melee attacks get +1 to wound." },
      { name: "Cherub", rule: "Once per battle, you can target this unit with Command Re-roll for 0 CP, even if another unit was already targeted with it this phase." },
      { name: "Attached Unit", rule: "A Ministorum Priest or Inquisitor that can join a Sisters of Battle Squad can join this unit instead. If attached during Declare Battle Formations, that model gains Scouts 6\"." },
      { name: "Salvationist Medikit", rule: "In your Command phase, if the bearer is on the battlefield, return up to D3 destroyed non-Character models." },
      { name: "Simulacrum Imperialis", rule: "Improve the Leadership characteristic of models in the bearer’s unit by 1." },
      { name: "Rules", rule: "Scouts 6\", Assigned Agents." },
    ],
  },
  subductors: {
    stats: { m: '6"', t: "3", sv: "3+", w: "1", ld: "7+", oc: "1", inv: "4+" },
    profileName: "Proctor-Subductor and Subductors",
    ranged: [gun("Arbites shotpistol", "Pistol", '12"', "1", "4+", "4", "0", "1")],
    melee: [
      blade("Shock maul", "", "2", "4+", "4", "−1", "1"),
      blade("Mechanical bite", "", "3", "4+", "4", "0", "1"),
    ],
    fixed: "1 Proctor-Subductor, 9 Subductors, and 1 Cyber-mastiff. Every Proctor and Subductor has an Arbites shotpistol and a shock maul. The mastiff has a mechanical bite. The 4+ invulnerable save does not apply to the Cyber-mastiff. Base 28.5mm, mastiff 25mm.",
    swaps: "The Proctor-Subductor can take a nuncio-aquila.",
    abilities: [
      { name: "Dedication to Duty", rule: "Each time a model is destroyed by a melee attack, if it has not fought this phase, roll one D6. On a 4+, do not remove it. It can fight after the attacking unit finishes, then is removed." },
      { name: "Nuncio Aquila", rule: NUNCIO },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  voidsmen: {
    stats: { m: '6"', t: "3", sv: "4+", w: "1", ld: "7+", oc: "2" },
    ranged: [
      gun("Artificer shotgun", "Assault", '12"', "2", "4+", "4", "0", "2"),
      gun("Laspistol", "Pistol", '12"', "1", "4+", "3", "0", "1"),
      gun("Lasgun", "Rapid Fire 1", '24"', "1", "4+", "3", "0", "1"),
      gun("Voidsman rotor cannon", "Heavy, Sustained Hits 1", '24"', "6", "5+", "6", "0", "1"),
    ],
    melee: [
      blade("Close combat weapon", "", "1", "4+", "3", "0", "1"),
      blade("Vicious bite", "", "3", "4+", "4", "0", "1"),
    ],
    fixed: "Base 25mm. Voidmaster: artificer shotgun, laspistol, close combat weapon. One Voidsman: laspistol, rotor cannon, and close combat weapon. Other Voidsmen: lasgun, laspistol, and close combat weapon. One Canid with a vicious bite. No swaps.",
    abilities: [
      { name: "Masters of Close Confines", rule: "A ranged attack that targets the closest eligible target has Lethal Hits." },
      { name: "Navy Bodyguards", rule: "If your Army Faction is not Agents of the Imperium, each Voidfarers Character lets you include one Voidsmen-at-Arms unit that does not count toward the Retinue limit." },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  corvus: {
    stats: { m: '14"', t: "10", sv: "3+", w: "14", ld: "6+", oc: "0", damaged: "5" },
    ranged: [
      gun("Hurricane bolter", "Rapid Fire 6, Twin-linked", '24"', "6", "3+", "4", "0", "1"),
      gun("Twin assault cannon", "Devastating Wounds, Twin-linked", '24"', "6", "3+", "6", "0", "1"),
      gun("Twin lascannon", "Twin-linked", '48"', "1", "3+", "12", "−3", "D6+1"),
      gun("Blackstar rocket launcher", "Blast", '30"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormstrike missile launcher", "", '48"', "1", "3+", "10", "−2", "3"),
    ],
    melee: [blade("Armoured hull", "", "3", "4+", "6", "0", "1")],
    fixed: "Flying base 120x92mm. Starts with 2 Blackstar rocket launchers, a twin assault cannon, and an armoured hull.",
    swaps: "The twin assault cannon can be a twin lascannon. The 2 Blackstar rocket launchers can be 2 stormstrike missile launchers. It can take a hurricane bolter. It can take an auspex array or an infernum halo-launcher.",
    abilities: [
      { name: "Blackstar Cluster Launcher", rule: "Each time this model ends a Normal move, you can select one enemy unit it moved over and roll six D6. For each 5+, that unit suffers 1 mortal wound." },
      { name: "Auspex Array", rule: "Ranged weapons equipped by the bearer have Ignores Cover." },
      { name: "Infernum Halo-launcher", rule: "The bearer has the Smoke keyword." },
      { name: "Transport", rule: "This model can transport 12 Deathwatch Infantry models." },
      { name: "Rules", rule: "Deadly Demise D6, Hover, Stealth, Assigned Agents. While damaged, −1 to hit." },
    ],
  },
  "grey-knights-terminators": {
    stats: { m: '5"', t: "5", sv: "2+", w: "3", ld: "6+", oc: "2", inv: "4+" },
    ranged: [
      gun("Storm bolter", "Rapid Fire 2", '24"', "2", "3+", "4", "0", "1"),
      gun("Incinerator", "Ignores Cover, Torrent", '12"', "D6", "—", "6", "−1", "1"),
      gun("Psilencer", "Psychic, Sustained Hits 1", '24"', "6", "3+", "5", "0", "1"),
      gun("Psycannon", "Psychic", '24"', "3", "3+", "8", "−1", "2"),
    ],
    melee: [blade("Nemesis force weapon", "Psychic", "4", "3+", "6", "−2", "2")],
    fixed: "1 Terminator Justicar and 4 Grey Knights Terminators. Every model has a Nemesis force weapon and a storm bolter. Base 40mm.",
    swaps: "For every 5 models, one storm bolter can be an incinerator, a psilencer, or a psycannon for 5 pts. One model that still has a storm bolter can take an Ancient’s banner. One model can replace its storm bolter with a narthecium. The banner and the narthecium cannot be on the same model.",
    abilities: [
      { name: "Hammerhand", rule: "Psychic. After a model in this unit makes a Charge move, until the end of the turn melee weapons in this unit have Lethal Hits." },
      { name: "Ancient’s Banner", rule: "Add 1 to the Objective Control characteristic of models in the bearer’s unit." },
      { name: "Narthecium", rule: "In your Command phase, you can return 1 destroyed model, excluding Characters, to the bearer’s unit." },
      { name: "Rites of Teleportation", rule: "If one or more Inquisitor units are attached during Declare Battle Formations, models in those units have Deep Strike." },
      { name: "Rules", rule: "Deep Strike, Assigned Agents." },
    ],
  },
  "sisters-squad": {
    stats: { m: '6"', t: "3", sv: "3+", w: "1", ld: "7+", oc: "2", inv: "6+" },
    ranged: [
      gun("Bolt pistol", "Pistol", '12"', "1", "3+", "4", "0", "1"),
      gun("Boltgun", "Rapid Fire 1", '24"', "1", "3+", "4", "0", "1"),
      gun("Artificer-crafted storm bolter", "Rapid Fire 2", '24"', "2", "3+", "4", "0", "2"),
      gun("Combi-weapon", "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1", '24"', "1", "4+", "4", "0", "1"),
      gun("Condemnor boltgun", "Anti-Psyker 2+, Devastating Wounds, Precision, Rapid Fire 1", '24"', "1", "3+", "4", "0", "1"),
      gun("Heavy bolter", "Heavy, Sustained Hits 1", '36"', "3", "4+", "5", "−1", "2"),
      gun("Inferno pistol", "Melta 2, Pistol", '6"', "1", "3+", "8", "−4", "D3"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ministorum flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "0", "1"),
      gun("Ministorum hand flamer", "Ignores Cover, Pistol, Torrent", '12"', "D6", "—", "4", "0", "1"),
      gun("Ministorum heavy flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "6", "−1", "1"),
      gun("Multi-melta", "Heavy, Melta 2", '18"', "2", "4+", "9", "−4", "D6"),
      gun("Plasma pistol", "Pistol", '12"', "1", "3+", "7", "−2", "1"),
      gun("Plasma pistol, supercharge", "Hazardous, Pistol", '12"', "1", "3+", "8", "−3", "2"),
    ],
    melee: [
      blade("Close combat weapon", "", "1", "4+", "3", "−1", "1"),
      blade("Chainsword", "", "3", "4+", "3", "−1", "1"),
      blade("Power weapon", "", "2", "4+", "4", "−2", "1"),
    ],
    fixed: "1 Sister Superior and 9 Battle Sisters. Every model starts with a bolt pistol, a boltgun, and a close combat weapon. Base 32mm.",
    swaps: "The Superior’s boltgun can be a bolt pistol, combi-weapon, condemnor boltgun, inferno pistol, Ministorum hand flamer, or plasma pistol. She can also take a chainsword or a power weapon. One Battle Sister’s boltgun can be an artificer-crafted storm bolter, meltagun, or Ministorum flamer. One Battle Sister’s boltgun can be an artificer-crafted storm bolter, heavy bolter, meltagun, Ministorum flamer, Ministorum heavy flamer, or multi-melta. One Battle Sister who still has a boltgun can take a simulacrum imperialis.",
    abilities: [
      { name: "Defenders of the Faith", rule: "If you control an objective marker at the end of your Command phase and this unit is within range of it, that marker stays under your control, even with no models in range, until your opponent controls it at the start or end of any turn." },
      { name: "Incensor Cherub", rule: "Once per battle, you can target this unit with Command Re-roll for 0CP, even if another unit was already targeted with that Stratagem this phase." },
      { name: "Simulacrum Imperialis", rule: "Improve the Leadership characteristic of models in the bearer’s unit by 1." },
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  "imperial-rhino": {
    stats: { m: '12"', t: "9", sv: "3+", w: "10", ld: "6+", oc: "2" },
    ranged: [
      gun("Storm bolter", "Rapid Fire 2", '24"', "2", "3+", "4", "0", "1"),
      gun("Hunter-killer missile", "One Shot", '48"', "1", "2+", "14", "−3", "D6"),
    ],
    melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
    fixed: "Armoured tracks and a storm bolter.",
    swaps: "Hunter-killer missile 0–1.",
    abilities: [
      { name: "Self Repair", rule: "At the end of your Command phase, this model regains 1 lost wound." },
      { name: "Transport", rule: "This model can transport 12 Agents of the Imperium Infantry models. It cannot transport Terminators or Officio Assassinorum models." },
      { name: "Firing Deck", rule: FIRING_DECK },
      demise("D3"),
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  "inquisitorial-chimera": {
    stats: { m: '10"', t: "9", sv: "3+", w: "11", ld: "7+", oc: "2" },
    ranged: [
      gun("Lasgun array", "Rapid Fire 6", '24"', "6", "4+", "3", "0", "1"),
      gun("Heavy bolter", "Sustained Hits 1", '36"', "3", "4+", "5", "−1", "2"),
      gun("Heavy flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "−1", "1"),
      gun("Heavy stubber", "Rapid Fire 3", '36"', "3", "4+", "4", "0", "1"),
      gun("Storm bolter", "Rapid Fire 2", '24"', "2", "4+", "4", "0", "1"),
      gun("Multi-laser", "", '36"', "4", "4+", "6", "0", "1"),
      gun("Hunter-killer missile", "One Shot", '48"', "1", "4+", "14", "−3", "D6"),
    ],
    melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
    fixed: "Starts with a multi-laser, a heavy bolter, a lasgun array, and armoured tracks.",
    swaps: "The heavy bolter can be a heavy flamer. The multi-laser can be a heavy bolter or a heavy flamer. It can take a heavy stubber or a storm bolter, and a hunter-killer missile.",
    abilities: [
      { name: "Rapid Deployment", rule: "Units can disembark after this transport has Advanced. They make a shock disembark move." },
      { name: "Transport", rule: "This model can transport 13 Inquisitor Infantry and Inquisitorial Agent models. It cannot transport Terminators." },
      { name: "Firing Deck", rule: FIRING_DECK },
      demise("D3"),
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  immolator: {
    stats: { m: '12"', t: "10", sv: "3+", w: "11", ld: "7+", oc: "2", inv: "6+" },
    ranged: [
      gun("Heavy bolter", "Sustained Hits 1", '36"', "3", "3+", "5", "−1", "2"),
      gun("Immolation flamers", "Ignores Cover, Torrent", '18"', "2D6", "—", "6", "−1", "1"),
      gun("Twin heavy bolter", "Sustained Hits 2, Twin-linked", '36"', "3", "3+", "5", "−1", "2"),
      gun("Twin multi-melta", "Melta 2, Twin-linked", '18"', "2", "3+", "9", "−4", "D6"),
      gun("Hunter-killer missile", "One Shot", '48"', "1", "2+", "14", "−3", "D6"),
    ],
    melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
    fixed: "Starts with a heavy bolter, immolation flamers, and armoured tracks.",
    swaps: "The immolation flamers can be a twin heavy bolter or a twin multi-melta for 15 pts. Hunter-killer missile is optional.",
    abilities: [
      { name: "Purge and Cleanse", rule: "After this model has shot, select one enemy unit hit by those attacks. Until the end of the phase, that unit cannot have the Benefit of Cover." },
      { name: "Transport", rule: "This model can transport 6 Ordo Hereticus Infantry models. At the start of Declare Battle Formations, one Sisters of Battle Squad can be split into two units as evenly as possible. One half must start embarked in this transport." },
      demise("D3"),
      { name: "Rules", rule: "Assigned Agents." },
    ],
  },
  warhound: {
    stats: { m: '14"', t: "13", sv: "2+", w: "40", ld: "6+", oc: "16", inv: "5+ ranged", damaged: "13" },
    ranged: [
      gun("Warhound inferno gun", "Ignores Cover, Torrent", '24"', "2D6", "—", "6", "−2", "2"),
      gun("Warhound plasma blastgun", "Blast", '72"', "2D6+3", "3+", "9", "−3", "3"),
      gun("Warhound plasma blastgun, supercharge", "Blast, Hazardous", '72"', "2D6+3", "3+", "10", "−3", "6"),
      gun("Warhound turbo-laser destructor", "Blast", '72"', "D3+3", "3+", "20", "−3", "2D6"),
      gun("Warhound vulcan mega-bolter", "Sustained Hits 1", '48"', "20", "3+", "6", "−1", "2"),
    ],
    melee: [blade("Warhound feet", "", "6", "4+", "12", "−1", "2")],
    fixed: "Warhound plasma blastgun, Warhound vulcan mega-bolter, and Warhound feet.",
    swaps: "Either arm weapon can be a Warhound inferno gun, plasma blastgun, turbo-laser destructor, or vulcan mega-bolter.",
    abilities: [
      { name: "Deadly Demise", rule: "Deadly Demise 2D6." },
      { name: "Super-heavy Walker", rule: "Faction ability." },
      { name: "Striding Colossus", rule: "Each time you target this model with a Stratagem, you must spend twice that Stratagem's stated CP cost to do so." },
      { name: "Flank Speed", rule: "Each time this model Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 8\" to the Move characteristic of this model." },
      { name: "Damaged", rule: "While this model has 1–13 wounds remaining, subtract 8 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack." },
    ],
  },
  reaver: {
    stats: { m: '12"', t: "14", sv: "2+", w: "60", ld: "6+", oc: "20", inv: "5+ ranged", damaged: "20" },
    ranged: [
      gun("Reaver apocalypse launcher", "Blast, Heavy", '200"', "3D6", "3+", "7", "−1", "2"),
      gun("Reaver gatling blaster", "Sustained Hits 1", '72"', "12", "3+", "8", "−2", "3"),
      gun("Reaver laser blaster", "Blast", '72"', "8", "3+", "20", "−3", "D6+2"),
      gun("Reaver melta cannon", "Blast, Melta 4", '48"', "D6+2", "3+", "14", "−4", "6"),
      gun("Reaver volcano cannon", "Blast, Heavy", '120"', "D3+3", "3+", "24", "−5", "14"),
    ],
    melee: [
      blade("Reaver feet", "", "8", "4+", "12", "−2", "4"),
      blade("Reaver power fist, strike", "", "6", "4+", "20", "−4", "14"),
      blade("Reaver power fist, sweep", "", "12", "4+", "12", "−3", "6"),
    ],
    fixed: "Reaver apocalypse launcher, Reaver gatling blaster, Reaver laser blaster, and Reaver feet.",
    swaps: "The gatling blaster can be a laser blaster, melta cannon, volcano cannon, or power fist. The laser blaster can be a gatling blaster, melta cannon, or volcano cannon.",
    abilities: [
      { name: "Deadly Demise", rule: "Deadly Demise D6+6." },
      { name: "Super-heavy Walker", rule: "Faction ability." },
      { name: "Striding Colossus", rule: "Each time you target this model with a Stratagem, you must spend twice that Stratagem's stated CP cost to do so." },
      { name: "God-machine", rule: "This model is eligible to shoot and declare a charge in a turn in which it Fell Back." },
      { name: "Damaged", rule: "While this model has 1–20 wounds remaining, subtract 10 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack." },
    ],
  },
  warbringer: {
    stats: { m: '12"', t: "14", sv: "2+", w: "80", ld: "6+", oc: "20", inv: "5+ ranged", damaged: "26" },
    ranged: [
      gun("Anvilus defence battery", "Anti-Fly 4+", '72"', "8", "3+", "8", "−1", "2"),
      gun("Ardex-defensor mauler", "", '36"', "6", "3+", "6", "−2", "2"),
      gun("Nemesis quake cannon", "Blast", '480"', "D6+6", "3+", "16", "−4", "4"),
      gun("Nemesis volcano cannon", "Blast", '120"', "D3+3", "3+", "24", "−5", "14"),
      gun("Reaver gatling blaster", "Sustained Hits 1", '72"', "12", "3+", "8", "−2", "3"),
      gun("Reaver laser blaster", "Blast", '72"', "8", "3+", "20", "−3", "D6+2"),
      gun("Reaver melta cannon", "Blast, Melta 4", '48"', "D6+2", "3+", "14", "−4", "6"),
      gun("Reaver volcano cannon", "Blast, Heavy", '120"', "D3+3", "3+", "24", "−5", "14"),
    ],
    melee: [blade("Nemesis feet", "", "6", "4+", "12", "−2", "6")],
    fixed: "2 Anvilus defence batteries, 3 Ardex-defensor maulers, Nemesis quake cannon, Reaver gatling blaster, Reaver laser blaster, and Nemesis feet.",
    swaps: "The quake cannon can be a Nemesis volcano cannon. Either arm can be a Reaver gatling blaster, laser blaster, melta cannon, or volcano cannon.",
    abilities: [
      { name: "Deadly Demise", rule: "Deadly Demise D6+6." },
      { name: "Super-heavy Walker", rule: "Faction ability." },
      { name: "Striding Colossus", rule: "Each time you target this model with a Stratagem, you must spend twice that Stratagem's stated CP cost to do so." },
      { name: "Titanic Fire Support", rule: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly Imperium model makes an attack that targets that enemy unit, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1." },
      { name: "Damaged", rule: "While this model has 1–26 wounds remaining, subtract 10 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack." },
    ],
  },
  "warlord-titan": {
    stats: { m: '10"', t: "16", sv: "2+", w: "100", ld: "6+", oc: "30", inv: "5+ ranged", damaged: "33" },
    ranged: [
      gun("Apocalypse launcher", "Blast, Indirect Fire", '200"', "20", "3+", "8", "−2", "2"),
      gun("Ardex-defensor lascannon", "", '48"', "1", "3+", "12", "−3", "D6+1"),
      gun("Ardex-defensor mauler", "", '36"', "6", "3+", "6", "−2", "2"),
      gun("Arioch power claw", "Sustained Hits 1", '48"', "20", "3+", "6", "−1", "2"),
      gun("Belicosa volcano cannon", "Blast", '120"', "D3+3", "3+", "32", "−5", "18"),
      gun("Laser blaster", "Blast", '72"', "6", "3+", "16", "−4", "D6+3"),
      gun("Macro gatling blaster", "Sustained Hits 1", '100"', "30", "3+", "9", "−2", "3"),
      gun("Mori quake cannon", "Blast, Ignores Cover", '280"', "3D6", "3+", "16", "−4", "6"),
      gun("Sunfury plasma annihilator", "Blast", '72"', "2D6+6", "3+", "10", "−3", "5"),
      gun("Sunfury plasma annihilator, supercharge", "Blast, Hazardous", '72"', "2D6+6", "3+", "12", "−3", "8"),
    ],
    melee: [
      blade("Arioch power claw, strike", "", "6", "4+", "20", "−4", "24"),
      blade("Arioch power claw, sweep", "", "12", "4+", "12", "−3", "8"),
      blade("Warlord feet", "", "6", "4+", "12", "−2", "4"),
    ],
    fixed: "2 apocalypse launchers, 2 Ardex-defensor lascannons, 2 Ardex-defensor maulers, macro gatling blaster, arioch power claw, and Warlord feet.",
    swaps: "Both apocalypse launchers can be replaced with 2 laser blasters. The power claw can be a belicosa volcano cannon, macro gatling blaster, mori quake cannon, or sunfury plasma annihilator. The gatling blaster can be an arioch power claw, belicosa volcano cannon, mori quake cannon, or sunfury plasma annihilator. Pick one power claw profile before selecting targets.",
    abilities: [
      { name: "Deadly Demise", rule: "Deadly Demise 2D6+6." },
      { name: "Super-heavy Walker", rule: "Faction ability." },
      { name: "Striding Colossus", rule: "Each time you target this model with a Stratagem, you must spend four times that Stratagem's stated CP cost to do so." },
      { name: "Wrath of the Omnissiah", rule: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test." },
      { name: "Damaged", rule: "While this model has 1–33 wounds remaining, subtract 15 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack." },
    ],
  },
  "canis-rex": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    profiles: [{ name: "Sir Hekhtur", stats: { m: '6"', t: "3", sv: "4+", w: "3", ld: "5+", oc: "1" } }],
    ranged: [
      gun("Las-impulsor, high intensity", "Blast, Sustained Hits 1", '24"', "D6", "2+", "14", "−3", "4"),
      gun("Las-impulsor, low intensity", "Blast, Sustained Hits 1", '36"', "2D6", "2+", "7", "−1", "2"),
      gun("Questoris multi-laser", "Sustained Hits 1", '36"', "4", "2+", "6", "0", "1"),
      gun("Hekhtur's pistol", "Pistol", '12"', "1", "2+", "5", "−1", "2"),
    ],
    melee: [
      blade("Freedom's Hand, strike", "Sustained Hits 1", "5", "2+", "20", "−3", "9"),
      blade("Freedom's Hand, sweep", "Sustained Hits 1", "10", "2+", "10", "−2", "3"),
      blade("Close combat weapon", "", "2", "2+", "3", "0", "1"),
    ],
    fixed: "Canis Rex has a las-impulsor, Freedom's Hand, and a Questoris multi-laser. Sir Hekhtur has a close combat weapon and Hekhtur's pistol. No swaps.",
    swaps: "Pick one las-impulsor profile and one Freedom's Hand profile before selecting targets.",
    abilities: [
      damagedBracket("1–9", "5"),
      
      { name: "Legendary Freeblade", rule: "Once per turn, a Stratagem used on this model costs 1 less CP." },
      { name: "Chainbreaker", rule: "Once per battle, at the start of any phase, one friendly Imperium unit within 12\" that is Battle-shocked is no longer Battle-shocked." },
      { name: "Sir Hekhtur", rule: "When Canis Rex is destroyed, Sir Hekhtur emergency disembarks. The unit is not destroyed until he is. He cannot be the target of any of your Stratagems except Core Stratagems, and he has Lone Operative. Keywords: Infantry, Character, Epic Hero, Imperium, Sir Hekhtur." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-paladin": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    ranged: [
      gun("Rapid-fire battle cannon", "Blast, Rapid Fire D6+3", '72"', "D6+3", "3+", "10", "−1", "3"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ironstorm missile pod", "Blast, Indirect Fire", '48"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormspear rocket pod", "", '48"', "3", "3+", "8", "−2", "D6"),
      gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", '48"', "3", "3+", "7", "−1", "2"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
      blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
      blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3"),
    ],
    fixed: "Starts with a meltagun, a Questoris heavy stubber, a rapid-fire battle cannon, and a reaper chainsword.",
    swaps: "The meltagun can be a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1: ironstorm missile pod, stormspear rocket pod, or twin Icarus autocannon.",
    abilities: [
      { name: "Paladin’s Duty", rule: "Bondsman. While a model is affected, its weapons have Lethal Hits, and its melee weapons also have Lance." },
      damagedBracket("1–9", "5"),
      
      { name: "Seasoned Noble", rule: "A ranged attack that targets the closest eligible target improves AP by 1." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-errant": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    ranged: [
      gun("Thermal cannon", "Blast, Melta 6", '24"', "2D3", "3+", "12", "−4", "D6"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ironstorm missile pod", "Blast, Indirect Fire", '48"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormspear rocket pod", "", '48"', "3", "3+", "8", "−2", "D6"),
      gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", '48"', "3", "3+", "7", "−1", "2"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
      blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
      blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3"),
    ],
    fixed: "Starts with a meltagun, a thermal cannon, and a reaper chainsword.",
    swaps: "The meltagun can be a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1, as the Paladin.",
    abilities: [
      { name: "Errant’s Duty", rule: "Bondsman. While a model is affected, re-roll Advance rolls made for it, and its ranged weapons have Assault." },
      damagedBracket("1–9", "5"),
      
      { name: "Aggressive Assault", rule: "A ranged attack that targets the closest eligible target is +1 to hit." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-gallant": {
    stats: { m: '12"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    ranged: [
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ironstorm missile pod", "Blast, Indirect Fire", '48"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormspear rocket pod", "", '48"', "3", "3+", "8", "−2", "D6"),
      gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", '48"', "3", "3+", "7", "−1", "2"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "Devastating Wounds", "6", "2+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "Lethal Hits", "18", "2+", "9", "−3", "2"),
      blade("Thunderstrike gauntlet, strike", "Devastating Wounds", "6", "2+", "20", "−3", "8"),
      blade("Thunderstrike gauntlet, sweep", "Lethal Hits", "12", "2+", "10", "−2", "3"),
    ],
    fixed: "Starts with a meltagun, a thunderstrike gauntlet, and a reaper chainsword. Its melee weapons are WS 2+.",
    swaps: "Only the meltagun and the carapace weapon can change.",
    abilities: [
      { name: "Gallant’s Duty", rule: "Bondsman. While a model is affected, re-roll Charge rolls made for it and re-roll its melee Hit rolls." },
      damagedBracket("1–9", "5"),
      
      { name: "Martial Pride", rule: "When this model Consolidates, it can move an extra 3\" if it ends within Engagement Range." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-warden": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    ranged: [
      gun("Avenger gatling cannon", "", '36"', "18", "3+", "6", "−2", "2"),
      gun("Heavy flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "−1", "1"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ironstorm missile pod", "Blast, Indirect Fire", '48"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormspear rocket pod", "", '48"', "3", "3+", "8", "−2", "D6"),
      gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", '48"', "3", "3+", "7", "−1", "2"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
      blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
      blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3"),
    ],
    fixed: "Starts with an avenger gatling cannon, a heavy flamer, a meltagun, and a reaper chainsword.",
    swaps: "The meltagun can be a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1, as the Paladin.",
    abilities: [
      { name: "Warden’s Duty", rule: "Bondsman. While a model is affected, its weapons have Sustained Hits 1, and its ranged weapons also have Ignores Cover." },
      damagedBracket("1–9", "5"),
      
      { name: "Thin Their Ranks", rule: "A ranged attack against a unit that is not a Monster or Vehicle has Devastating Wounds." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-crusader": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    ranged: [
      gun("Avenger gatling cannon", "", '36"', "18", "3+", "6", "−2", "2"),
      gun("Heavy flamer", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "−1", "1"),
      gun("Thermal cannon", "Blast, Melta 6", '24"', "2D3", "3+", "12", "−4", "D6"),
      gun("Rapid-fire battle cannon", "Blast, Rapid Fire D6+3", '72"', "D6+3", "3+", "10", "−1", "3"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ironstorm missile pod", "Blast, Indirect Fire", '48"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormspear rocket pod", "", '48"', "3", "3+", "8", "−2", "D6"),
      gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", '48"', "3", "3+", "7", "−1", "2"),
    ],
    melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
    fixed: "Starts with an avenger gatling cannon, a heavy flamer, a meltagun, a thermal cannon, and titanic feet.",
    swaps: "The meltagun can be a Questoris heavy stubber. The thermal cannon can be a rapid-fire battle cannon and a Questoris heavy stubber for 15 pts. Carapace 0–1.",
    abilities: [
      { name: "Crusader’s Duty", rule: "Bondsman. While a model is affected, its ranged attacks are +1 to hit." },
      { name: "Punishing Salvoes", rule: "If this model Remains Stationary, its ranged weapons have Sustained Hits 1 until the end of the turn." },
      damagedBracket("1–9", "5"),
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-preceptor": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "9" },
    ranged: [
      gun("Las-impulsor, high intensity", "Blast", '24"', "D6", "3+", "14", "−3", "4"),
      gun("Las-impulsor, low intensity", "Blast", '36"', "2D6", "3+", "7", "−1", "2"),
      gun("Questoris multi-laser", "", '36"', "4", "3+", "6", "0", "1"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Ironstorm missile pod", "Blast, Indirect Fire", '48"', "D6+1", "3+", "5", "0", "1"),
      gun("Stormspear rocket pod", "", '48"', "3", "3+", "8", "−2", "D6"),
      gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", '48"', "3", "3+", "7", "−1", "2"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
      blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
      blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3"),
    ],
    fixed: "Starts with a las-impulsor, a Questoris multi-laser, and a reaper chainsword. The las-impulsor is BS 3+.",
    swaps: "The multi-laser can be a meltagun or a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1.",
    abilities: [
      { name: "Mentor", rule: "Bondsman. While a model is affected, re-roll Wound rolls against this model’s quarry." },
      damagedBracket("1–9", "5"),
      
      { name: "Exemplar of the Code", rule: "At the start of the battle, select one enemy unit as this model’s quarry. Re-roll the Wound roll against that quarry. When it is destroyed, select a new one." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-castellan": {
    stats: { m: '8"', t: "12", sv: "3+", w: "28", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "10" },
    ranged: [
      gun("Plasma decimator", "Blast", '48"', "D6+3", "3+", "8", "−3", "2"),
      gun("Plasma decimator, supercharge", "Blast, Hazardous", '48"', "D6+3", "3+", "9", "−4", "3"),
      gun("Volcano lance", "Blast", '72"', "D3", "3+", "18", "−5", "D6+8"),
      gun("Twin meltagun", "Melta 2, Twin-linked", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Shieldbreaker missile launcher", "Anti-Titanic 4+, Devastating Wounds", '72"', "1", "3+", "12", "−6", "D6+1"),
      gun("Twin siegebreaker cannon", "Blast, Twin-linked", '36"', "D6", "3+", "6", "0", "1"),
    ],
    melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
    fixed: "Plasma decimator, volcano lance, 2 twin meltaguns, and titanic feet.",
    swaps: "Carapace: 2 shieldbreaker missile launchers and a twin siegebreaker cannon, or 1 shieldbreaker missile launcher and 2 twin siegebreaker cannons.",
    abilities: [
      damagedBracket("1–10", "5"),
      
      { name: "Ion Aegis", rule: "While a friendly Armiger is within 6\", it has the Benefit of Cover against ranged attacks." },
      { name: "Titan Hunter", rule: "Re-roll the Damage roll of a ranged attack allocated to a Monster or Vehicle model." },
      demise("D6+2"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-valiant": {
    stats: { m: '8"', t: "12", sv: "3+", w: "28", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "10" },
    ranged: [
      gun("Conflagration cannon", "Ignores Cover, Torrent", '18"', "3D6", "—", "8", "−1", "2"),
      gun("Thundercoil harpoon", "Blast, Devastating Wounds", '12"', "D3", "3+", "24", "−6", "10"),
      gun("Twin meltagun", "Melta 2, Twin-linked", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Shieldbreaker missile launcher", "Anti-Titanic 4+, Devastating Wounds", '72"', "1", "3+", "12", "−6", "D6+1"),
      gun("Twin siegebreaker cannon", "Blast, Twin-linked", '36"', "D6", "3+", "6", "0", "1"),
    ],
    melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
    fixed: "Conflagration cannon, thundercoil harpoon, 2 twin meltaguns, and titanic feet.",
    swaps: "Same carapace choice as the Castellan.",
    abilities: [
      damagedBracket("1–10", "5"),
      
      { name: "Thundershock", rule: "When you select a target for the thundercoil harpoon, roll one D6 for the target and one D6 for each other enemy unit within 6\". On a 4+, after this model’s attacks, that unit suffers D3 mortal wounds." },
      { name: "Ion Aegis", rule: "While a friendly Armiger is within 6\", it has the Benefit of Cover against ranged attacks." },
      demise("D6+2"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-defender": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "4+ ranged", damaged: "9" },
    ranged: [
      gun("Twin incendine combustor", "Ignores Cover, Torrent, Twin-linked", '12"', "D6", "—", "6", "−1", "1"),
      gun("Conversion beam obliterator", "Conversion, Sustained Hits D3", '36"', "3", "3+", "12", "−2", "4"),
      gun("Plasma executor", "Blast", '36"', "D6+3", "3+", "8", "−2", "2"),
      gun("Plasma executor, supercharge", "Blast, Hazardous", '36"', "D6+3", "3+", "9", "−3", "3"),
      gun("Phosphor blaster", "Ignores Cover, Rapid Fire 1", '24"', "1", "3+", "5", "0", "1"),
    ],
    melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
    fixed: "Twin incendine combustor, conversion beam obliterator, plasma executor, phosphor blaster, and titanic feet. No swaps. A conversion beam attack against a target more than 18\" away scores a Critical Hit on an unmodified Hit roll of 4+.",
    swaps: "",
    abilities: [
      { name: "Defender’s Duty", rule: "Bondsman. While a model is affected, subtract 1 from the Damage characteristic of an attack allocated to it." },
      damagedBracket("1–9", "5"),
      
      { name: "Selfless Protector", rule: "Each time a ranged attack is allocated to a friendly Imperial Knights model that is not fully visible to every model in the attacking unit because of this Defender, that model has the Benefit of Cover and a 4+ invulnerable save against that attack." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "knight-destrier": {
    stats: { m: '12"', t: "10", sv: "3+", w: "18", ld: "6+", oc: "8", inv: "5+ ranged", damaged: "6" },
    ranged: [
      gun("Chastiser gatling cannon", "Assault", '24"', "12", "3+", "6", "−1", "2"),
      gun("Frag bombard", "Assault, Blast, Rapid Fire D6+3", '24"', "D6+3", "3+", "7", "−1", "2"),
      gun("Questoris heavy stubber", "Assault, Rapid Fire 3", '36"', "6", "3+", "4", "−1", "1"),
    ],
    melee: [
      blade("Bellatus reaper chainsword, strike", "", "5", "3+", "12", "−3", "D3+3"),
      blade("Bellatus reaper chainsword, sweep", "", "10", "3+", "8", "−2", "2"),
      blade("Thundershock spear, strike", "Lance", "4", "3+", "12", "−3", "D3+3"),
      blade("Thundershock spear, sweep", "Lance", "8", "3+", "6", "−3", "2"),
      blade("Titanic feet", "", "4", "4+", "7", "−1", "2"),
    ],
    fixed: "Starts with a chastiser gatling cannon, a frag bombard, a Questoris heavy stubber, and titanic feet.",
    swaps: "Each gun can be replaced with a Bellatus reaper chainsword or a thundershock spear. It cannot have more than one of either melee weapon.",
    abilities: [
      damagedBracket("1–6", "4"),
      
      { name: "Ram Jets", rule: "When this model is selected for a Normal or Advance move, add D3\" to its Move characteristic." },
      { name: "Thundercharge", rule: "If this model has both a Bellatus reaper chainsword and a thundershock spear, add 2 Attacks to its melee weapons." },
      { name: "Saturation Fire", rule: "A ranged attack against a unit within range of an objective has Ignores Cover." },
      demise("D6"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "cerastus-lancer": {
    stats: { m: '14"', t: "11", sv: "3+", w: "28", ld: "6+", oc: "10", inv: "4+", damaged: "10" },
    ranged: [gun("Cerastus shock lance", "Assault, Sustained Hits 2", '12"', "6", "3+", "6", "0", "2")],
    melee: [
      blade("Cerastus shock lance, strike", "Lance", "5", "2+", "20", "−3", "8"),
      blade("Cerastus shock lance, sweep", "", "10", "2+", "10", "−2", "3"),
    ],
    fixed: "Cerastus shock lance, with ranged and melee profiles. No swaps.",
    swaps: "Pick one melee profile before selecting targets.",
    abilities: [
      { name: "Lancer’s Duty", rule: "Bondsman. While a model is affected, it can declare a charge in a turn in which it Advanced." },
      { name: "Shock Charge", rule: "You can target this model with the Crushing Impact Stratagem for 0CP, even if another unit was already targeted with that Stratagem this phase." },
      damagedBracket("1–10", "5"),
      demise("D6+2"), SUPER_HEAVY, CODE_CHIVALRIC],
  },
  "cerastus-castigator": {
    stats: { m: '12"', t: "11", sv: "3+", w: "28", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "10" },
    ranged: [gun("Castigator bolt cannon", "Twin-linked", '36"', "18", "3+", "6", "−2", "2")],
    melee: [
      blade("Tempest warblade, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Tempest warblade, sweep", "", "12", "3+", "9", "−3", "2"),
    ],
    fixed: "Castigator bolt cannon and tempest warblade. No swaps.",
    swaps: "",
    abilities: [
      { name: "Castigator’s Duty", rule: "Bondsman. While a model is affected, its ranged weapons have Sustained Hits 1 and improve AP by 1." },
      damagedBracket("1–10", "5"),
      
      { name: "Storm of Bolts", rule: "After this model shoots, select one unit that is not a Monster or Vehicle and was hit. Until your next turn, while this model is on the battlefield, that unit is suppressed and is −1 to hit." },
      demise("D6+2"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "cerastus-acheron": {
    stats: { m: '12"', t: "11", sv: "3+", w: "28", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "10" },
    ranged: [
      gun("Twin heavy bolter", "Sustained Hits 1, Twin-linked", '36"', "3", "3+", "5", "−1", "2"),
      gun("Acheron flame cannon", "Torrent, Ignores Cover", '18"', "2D6", "—", "8", "−1", "2"),
    ],
    melee: [
      blade("Reaper chainfist, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainfist, sweep", "", "12", "3+", "9", "−3", "2"),
    ],
    fixed: "Twin heavy bolter, Acheron flame cannon, and reaper chainfist. No swaps.",
    swaps: "",
    abilities: [
      { name: "Acheron’s Duty", rule: "Bondsman. At the start of the Fight phase, each enemy unit within Engagement Range of an affected unit takes a Battle-shock test at −1." },
      damagedBracket("1–10", "5"),
      
      { name: "Searing Flames", rule: "After this model shoots, select one enemy unit hit by the Acheron flame cannon. Until the end of the phase, that unit cannot have the Benefit of Cover." },
      demise("D6+2"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "cerastus-atrapos": {
    stats: { m: '12"', t: "11", sv: "3+", w: "28", ld: "6+", oc: "10", inv: "5+", damaged: "10" },
    ranged: [
      gun("Atrapos lascutter, high intensity", "Sustained Hits 1", '24"', "D6", "3+", "14", "−3", "4"),
      gun("Atrapos lascutter, low intensity", "Sustained Hits 1", '36"', "2D6", "3+", "7", "−1", "2"),
      gun("Graviton singularity cannon, contained", "Blast", '24"', "D3", "3+", "16", "−4", "D6+1"),
      gun("Graviton singularity cannon, singularity", "Blast, Devastating Wounds, Hazardous", '24"', "D3", "3+", "16", "−4", "D6+1"),
    ],
    melee: [
      blade("Atrapos lascutter, high intensity melee", "Sustained Hits 1", "6", "3+", "14", "−3", "4"),
      blade("Atrapos lascutter, low intensity melee", "Sustained Hits 1", "12", "3+", "7", "−1", "2"),
    ],
    fixed: "Atrapos lascutter and graviton singularity cannon. No swaps.",
    swaps: "The lascutter has ranged and melee profiles. Pick one of each pair before selecting targets.",
    abilities: [
      { name: "Atrapos’ Duty", rule: "Bondsman. While a model is affected, its attacks against a Titanic or Towering model can re-roll the Hit roll and the Wound roll." },
      damagedBracket("1–10", "5"),
      
      { name: "Macro-extinction Protocols", rule: "Add 1 to hit against a Monster or Vehicle. If the target is Titanic or Towering, also add 1 to wound." },
      demise("D6+2"),
      SUPER_HEAVY,
      CODE_CHIVALRIC,
    ],
  },
  "questoris-magaera": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+", damaged: "9" },
    ranged: [
      gun("Lightning cannon", "Sustained Hits 2", '48"', "12", "3+", "9", "0", "2"),
      gun("Phased plasma-fusil", "Rapid Fire 2", '24"', "2", "3+", "8", "−3", "2"),
      gun("Twin rad cleanser", "Torrent, Ignores Cover, Anti-Infantry 2+, Twin-linked", '12"', "D6", "—", "2", "0", "1"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
      blade("Hekaton siege claw, strike", "", "4", "3+", "20", "−3", "8"),
      blade("Hekaton siege claw, sweep", "", "8", "3+", "10", "−2", "3"),
    ],
    fixed: "Lightning cannon and phased plasma-fusil.",
    swaps: "Melee: reaper chainsword, or a hekaton siege claw and twin rad cleanser.",
    abilities: [
      { name: "Magaera’s Duty", rule: "Bondsman. While a model is affected, a ranged attack that targets the closest eligible target improves Strength and AP by 1." },
      { name: "Repair Auto-simulacra", rule: "At the end of your Command phase, this model regains up to D3 lost wounds." },
      damagedBracket("1–9", "5"),
      demise("D6"), SUPER_HEAVY, CODE_CHIVALRIC],
  },
  "questoris-styrix": {
    stats: { m: '10"', t: "11", sv: "3+", w: "26", ld: "6+", oc: "10", inv: "5+", damaged: "9" },
    ranged: [
      gun("Graviton crusher", "Anti-Vehicle 2+, Blast", '18"', "3", "3+", "6", "−1", "2"),
      gun("Volkite chierovile", "Devastating Wounds", '30"', "12", "3+", "12", "0", "3"),
      gun("Twin rad cleanser", "Torrent, Ignores Cover, Anti-Infantry 2+, Twin-linked", '12"', "D6", "—", "2", "0", "1"),
    ],
    melee: [
      blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
      blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
      blade("Hekaton siege claw, strike", "", "4", "3+", "20", "−3", "8"),
      blade("Hekaton siege claw, sweep", "", "8", "3+", "10", "−2", "3"),
    ],
    fixed: "Graviton crusher and volkite chierovile.",
    swaps: "Same melee choice as the Magaera.",
    abilities: [
      { name: "Styrix’s Duty", rule: "Bondsman. After an affected model shoots or fights, one enemy unit hit by those attacks takes a Battle-shock test at −1." },
      { name: "Grav-pinned", rule: "If an enemy Infantry unit is hit by this model’s graviton crusher, until the end of your opponent’s next turn subtract 2 from its Move characteristic and from Charge rolls made for it." },
      damagedBracket("1–9", "5"),
      demise("D6"), SUPER_HEAVY, CODE_CHIVALRIC],
  },
  "acastus-asterius": {
    stats: { m: '8"', t: "13", sv: "2+", w: "30", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "10" },
    ranged: [
      gun("Twin conversion beam cannon", "Conversion, Twin-linked, Sustained Hits D3", '48"', "3", "3+", "16", "−2", "6"),
      gun("Asterius volkite culverin", "Devastating Wounds", '24"', "6", "3+", "6", "0", "2"),
      gun("Karacnos mortar battery", "Anti-Infantry 2+, Blast, Ignores Cover, Indirect Fire", '48"', "D6+3", "3+", "6", "−1", "1"),
    ],
    melee: [blade("Titanic feet", "", "6", "4+", "10", "−1", "2")],
    fixed: "2 twin conversion beam cannons, 2 Asterius volkite culverins, a Karacnos mortar battery, and titanic feet. No swaps. A conversion beam attack against a target more than 24\" away scores a Critical Hit on an unmodified Hit roll of 4+.",
    swaps: "",
    abilities: [
      { name: "Sunderer of Fortresses", rule: "Each time this model attacks a Vehicle, improve Strength and Damage by 1. Against a Fortification, improve them by 2." },
      damagedBracket("1–10", "5"),
      demise("2D6"), SUPER_HEAVY, CODE_CHIVALRIC],
  },
  "acastus-porphyrion": {
    stats: { m: '8"', t: "13", sv: "2+", w: "30", ld: "6+", oc: "10", inv: "5+ ranged", damaged: "10" },
    ranged: [
      gun("Twin magna lascannon", "Blast, Twin-linked", '72"', "D6", "3+", "18", "−4", "D6+6"),
      gun("Acastus autocannon", "", '48"', "2", "3+", "9", "−1", "3"),
      gun("Lascannon", "", '48"', "1", "3+", "12", "−3", "D6+1"),
      gun("Acastus ironstorm missile pod", "Blast, Heavy, Indirect Fire", '48"', "D6+6", "3+", "5", "0", "1"),
      gun("Helios defence missiles", "Anti-Fly 2+, Heavy", '48"', "3", "3+", "10", "−2", "D6"),
    ],
    melee: [blade("Titanic feet", "", "6", "4+", "10", "−1", "2")],
    fixed: "2 twin magna lascannons, 2 Acastus autocannons, and titanic feet.",
    swaps: "The side guns can be replaced with 1 Acastus autocannon and 1 lascannon, or 2 lascannons. Second mount: Acastus ironstorm missile pod or Helios defence missiles.",
    abilities: [
      { name: "Bastion of Firepower", rule: "If this model Remains Stationary, its ranged weapons have Lethal Hits until the end of the turn." },
      damagedBracket("1–10", "5"),
      demise("2D6"), SUPER_HEAVY, CODE_CHIVALRIC],
  },
  "armiger-helverin": {
    stats: { m: '12"', t: "9", sv: "3+", w: "14", ld: "7+", oc: "6", inv: "5+ ranged", damaged: "5" },
    ranged: [
      gun("Armiger autocannon", "", '48"', "4", "3+", "9", "−1", "3"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
    ],
    melee: [blade("Armoured feet", "", "4", "3+", "6", "0", "1")],
    fixed: "Starts with 2 Armiger autocannons, a Questoris heavy stubber, and armoured feet.",
    swaps: "The stubber can be replaced with a meltagun.",
    abilities: [
      { name: "Suppression Protocols", rule: "After this model shoots, select one unit that is not a Monster or Vehicle and was hit by an Armiger autocannon. Until your next turn, that unit is −1 to hit." },
      damagedBracket("1–5", "3"),
      demise("D3"),
      CODE_CHIVALRIC,
    ],
  },
  "armiger-warglaive": {
    stats: { m: '12"', t: "9", sv: "3+", w: "14", ld: "7+", oc: "6", inv: "5+ ranged", damaged: "5" },
    ranged: [
      gun("Thermal spear", "Melta 4", '18"', "2", "3+", "12", "−4", "D6"),
      gun("Meltagun", "Melta 2", '12"', "1", "3+", "9", "−4", "D6"),
      gun("Questoris heavy stubber", "Rapid Fire 3", '36"', "3", "3+", "4", "−1", "1"),
    ],
    melee: [
      blade("Reaper chain-cleaver, strike", "", "4", "3+", "10", "−3", "3"),
      blade("Reaper chain-cleaver, sweep", "", "8", "3+", "8", "−2", "1"),
    ],
    fixed: "Starts with a Questoris heavy stubber, a thermal spear, and a reaper chain-cleaver.",
    swaps: "The stubber can be replaced with a meltagun.",
    abilities: [
      { name: "Impetuous Glory", rule: "After a Charge move, until the end of the turn the strike profile is +1 Attack and the sweep profile is +2 Attacks." },
      damagedBracket("1–5", "3"),
      demise("D3"),
      CODE_CHIVALRIC,
    ],
  },
  "armiger-moirax": {
    stats: { m: '12"', t: "9", sv: "3+", w: "14", ld: "7+", oc: "6", inv: "5+ ranged", damaged: "5" },
    ranged: [
      gun("Conversion beam cannon", "Conversion, Sustained Hits D3", '24"', "1", "3+", "10", "−2", "3"),
      gun("Graviton pulsar", "Anti-Vehicle 2+, Blast", '24"', "D6", "3+", "7", "−1", "2"),
      gun("Lightning lock", "Sustained Hits 2", '36"', "6", "3+", "8", "0", "1"),
      gun("Volkite veuglaire", "Devastating Wounds", '36"', "4", "3+", "8", "0", "2"),
      gun("Rad cleanser", "Anti-Infantry 2+, Ignores Cover, Torrent", '12"', "D6", "—", "2", "0", "1"),
    ],
    melee: [
      blade("Siege claw", "", "4", "3+", "12", "−3", "D6+2"),
      blade("Armoured feet", "", "4", "3+", "6", "0", "1"),
    ],
    fixed: "Starts with a graviton pulsar, a volkite veuglaire, and armoured feet.",
    swaps: "The veuglaire can be a siege claw and rad cleanser, a graviton pulsar, a lightning lock, or a conversion beam cannon. The pulsar can be a siege claw and rad cleanser, a lightning lock, a conversion beam cannon, or a volkite veuglaire. A conversion beam cannon scores a Critical Hit on an unmodified Hit roll of 4+ against a unit more than 12\" away.",
    abilities: [
      { name: "Protection Protocols", rule: "You can target this unit with the Heroic Intervention Stratagem for 1 CP less, and that use does not prevent other uses of Heroic Intervention this phase." },
      damagedBracket("1–5", "3"),
      demise("D3"),
      CODE_CHIVALRIC,
    ],
  },
};

export function datasheetById(unitId: string): Datasheet | undefined {
  return DATASHEETS[unitId];
}

export function keywordsOf(unitId: string): string[] {
  const row = KEYWORDS[unitId];
  if (!row) return [];
  return [...row.keywords.split(","), row.faction].map((word) => word.trim()).filter(Boolean);
}

export const KEYWORDS: Record<string, { keywords: string; faction: string }> = {
  "aquilon-gauntlets": { keywords: "Infantry, Imperium, Terminator", faction: "Adeptus Custodes" },
  "aquilon-talons": { keywords: "Infantry, Imperium, Terminator", faction: "Adeptus Custodes" },
  "blade-champion": { keywords: "Infantry, Character, Imperium", faction: "Adeptus Custodes" },
  "sentinel-guard": { keywords: "Infantry, Battleline, Imperium, Trusted Sentinel", faction: "Adeptus Custodes" },
  trajann: { keywords: "Infantry, Character, Epic Hero, Imperium", faction: "Adeptus Custodes" },
  "shield-captain": { keywords: "Infantry, Character, Imperium, Shield-Captain", faction: "Adeptus Custodes" },
  "venatari-kinetic": { keywords: "Infantry, Explosives, Fly, Imperium, Jump Pack", faction: "Adeptus Custodes" },
  "venatari-lances": { keywords: "Infantry, Explosives, Fly, Imperium, Jump Pack", faction: "Adeptus Custodes" },
  galatus: { keywords: "Vehicle, Dreadnought, Imperium, Walker", faction: "Adeptus Custodes" },
  achillus: { keywords: "Vehicle, Dreadnought, Imperium, Walker", faction: "Adeptus Custodes" },
  "shield-captain-allarus": {
    keywords: "Infantry, Character, Imperium, Shield-Captain, Terminator",
    faction: "Adeptus Custodes",
  },
  "shield-captain-jetbike": { keywords: "Mounted, Character, Fly, Imperium, Shield-Captain", faction: "Adeptus Custodes" },
  "custodian-guard": { keywords: "Infantry, Battleline, Imperium, Trusted Sentinel", faction: "Adeptus Custodes" },
  wardens: { keywords: "Infantry, Imperium, Trusted Sentinel", faction: "Adeptus Custodes" },
  allarus: { keywords: "Infantry, Imperium, Terminator", faction: "Adeptus Custodes" },
  vertus: { keywords: "Mounted, Fly, Imperium", faction: "Adeptus Custodes" },
  gyrfalcon: { keywords: "Mounted, Fly, Imperium", faction: "Adeptus Custodes" },
  pallas: { keywords: "Vehicle, Fly, Frame, Grav-Assault, Imperium", faction: "Adeptus Custodes" },
  coronus: { keywords: "Vehicle, Fly, Frame, Grav-Assault, Imperium, Transport", faction: "Adeptus Custodes" },
  caladius: { keywords: "Vehicle, Caladius, Fly, Frame, Grav-Assault, Imperium", faction: "Adeptus Custodes" },
  "caladius-annihilator": {
    keywords: "Vehicle, Caladius, Fly, Frame, Grav-Assault, Imperium",
    faction: "Adeptus Custodes",
  },
  telemon: { keywords: "Vehicle, Dreadnought, Imperium, Walker", faction: "Adeptus Custodes" },
  "knight-centura": { keywords: "Infantry, Anathema Psykana, Character, Imperium", faction: "Anathema Psykana" },
  prosecutors: { keywords: "Infantry, Anathema Psykana, Imperium", faction: "Anathema Psykana" },
  witchseekers: { keywords: "Infantry, Anathema Psykana, Imperium", faction: "Anathema Psykana" },
  rhino: {
    keywords: "Vehicle, Anathema Psykana, Dedicated Transport, Frame, Imperium, Smoke, Transport",
    faction: "Anathema Psykana",
  },
  vigilators: { keywords: "Infantry, Anathema Psykana, Imperium", faction: "Anathema Psykana" },
  callidus: { keywords: "Infantry, Character, Epic Hero, Imperium, Callidus Assassin, Officio Assassinorum", faction: "Agents of the Imperium" },
  culexus: { keywords: "Infantry, Character, Epic Hero, Grenades, Imperium, Culexus Assassin, Officio Assassinorum", faction: "Agents of the Imperium" },
  eversor: { keywords: "Infantry, Character, Epic Hero, Grenades, Imperium, Eversor Assassin, Officio Assassinorum", faction: "Agents of the Imperium" },
  coteaz: { keywords: "Infantry, Character, Epic Hero, Psyker, Imperium, Inquisitor, Coteaz, Ordo Malleus", faction: "Agents of the Imperium" },
  draxus: { keywords: "Infantry, Character, Epic Hero, Psyker, Grenades, Imperium, Inquisitor, Draxus, Ordo Xenos", faction: "Agents of the Imperium" },
  greyfax: { keywords: "Infantry, Character, Epic Hero, Psyker, Grenades, Imperium, Inquisitor, Greyfax, Ordo Hereticus", faction: "Agents of the Imperium" },
  kroyle: { keywords: "Mounted, Character, Epic Hero, Imperium, Grenades, Ordo Xenos, Inquisitor, Kroyle", faction: "Agents of the Imperium" },
  vindicare: { keywords: "Infantry, Character, Epic Hero, Smoke, Imperium, Vindicare Assassin, Officio Assassinorum", faction: "Agents of the Imperium" },
  artemis: { keywords: "Epic Hero, Character, Infantry, Grenades, Imperium, Deathwatch, Watch Captain Artemis, Ordo Xenos", faction: "Agents of the Imperium" },
  inquisitor: { keywords: "Infantry, Character, Grenades, Imperium, Inquisitor", faction: "Agents of the Imperium" },
  "ministorum-priest": { keywords: "Infantry, Character, Imperium, Ordo Hereticus, Ministorum Priest", faction: "Agents of the Imperium" },
  navigator: { keywords: "Infantry, Character, Psyker, Imperium, Voidfarers, Navigator", faction: "Agents of the Imperium" },
  "rogue-trader": { keywords: "Infantry, Grenades, Imperium, Voidfarers, Rogue Trader Entourage. Rogue Trader: Character", faction: "Agents of the Imperium" },
  "watch-master": { keywords: "Infantry, Character, Grenades, Imperium, Ordo Xenos, Deathwatch, Watch Master", faction: "Agents of the Imperium" },
  aquila: { keywords: "Infantry, Battleline, Grenades, Imperium, Ordo Xenos, Retinue, Deathwatch, Aquila Kill Team. Sergeant and Veterans: Tacticus. Gravis Veterans: Gravis", faction: "Agents of the Imperium" },
  "deathwatch-kt": { keywords: "Infantry, Battleline, Grenades, Imperium, Retinue, Ordo Xenos, Deathwatch, Kill Team", faction: "Agents of the Imperium" },
  breachers: { keywords: "Infantry, Grenades, Imperium, Retinue, Imperial Navy Breachers, Battleline, Smoke, Voidfarers", faction: "Agents of the Imperium" },
  vigilants: { keywords: "Infantry, Battleline, Grenades, Imperium, Retinue, Vigilant Squad, Adeptus Arbites", faction: "Agents of the Imperium" },
  exaction: { keywords: "Infantry, Grenades, Imperium, Retinue, Exaction Squad, Adeptus Arbites", faction: "Agents of the Imperium" },
  "inquisitorial-agents": { keywords: "Infantry, Grenades, Imperium, Retinue, Inquisitorial Agents", faction: "Agents of the Imperium" },
  sanctifiers: { keywords: "Infantry, Grenades, Imperium, Sanctifiers, Retinue", faction: "Agents of the Imperium" },
  subductors: { keywords: "Infantry, Grenades, Imperium, Retinue, Subductor Squad, Adeptus Arbites", faction: "Agents of the Imperium" },
  voidsmen: { keywords: "Infantry, Grenades, Imperium, Retinue, Voidsmen-at-Arms, Voidfarers", faction: "Agents of the Imperium" },
  corvus: { keywords: "Vehicle, Fly, Transport, Imperium, Ordo Xenos, Retinue, Deathwatch, Corvus Blackstar", faction: "Agents of the Imperium" },
  "grey-knights-terminators": { keywords: "Infantry, Psyker, Terminator, Grenades, Imperium, Ordo Malleus, Requisitioned, Grey Knights Terminator Squad", faction: "Agents of the Imperium" },
  "sisters-squad": { keywords: "Infantry, Grenades, Imperium, Ordo Hereticus, Requisitioned, Sisters of Battle Squad", faction: "Agents of the Imperium" },
  "imperial-rhino": { keywords: "Vehicle, Smoke, Transport, Frame, Dedicated Transport, Imperium, Imperial Rhino", faction: "Agents of the Imperium" },
  "inquisitorial-chimera": { keywords: "Vehicle, Smoke, Transport, Frame, Dedicated Transport, Imperium, Inquisitorial Chimera", faction: "Agents of the Imperium" },
  immolator: { keywords: "Vehicle, Smoke, Transport, Frame, Dedicated Transport, Imperium, Ordo Hereticus, Immolator", faction: "Agents of the Imperium" },
  warhound: { keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Warhound Titan", faction: "Adeptus Titanicus" },
  reaver: { keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Reaver Titan", faction: "Adeptus Titanicus" },
  warbringer: { keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Warbringer Nemesis Titan", faction: "Adeptus Titanicus" },
  "warlord-titan": { keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Warlord Titan", faction: "Adeptus Titanicus" },
  "canis-rex": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Epic Hero, Imperium, Questoris, Canis Rex", faction: "Imperial Knights" },
  "knight-paladin": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Paladin", faction: "Imperial Knights" },
  "knight-errant": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Errant", faction: "Imperial Knights" },
  "knight-gallant": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Gallant", faction: "Imperial Knights" },
  "knight-warden": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Warden", faction: "Imperial Knights" },
  "knight-crusader": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Crusader", faction: "Imperial Knights" },
  "knight-preceptor": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Preceptor", faction: "Imperial Knights" },
  "knight-castellan": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Dominus, Knight Castellan", faction: "Imperial Knights" },
  "knight-valiant": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Dominus, Knight Valiant", faction: "Imperial Knights" },
  "knight-defender": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Defender", faction: "Imperial Knights" },
  "knight-destrier": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Bellatus, Knight Destrier", faction: "Imperial Knights" },
  "cerastus-lancer": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Lancer", faction: "Imperial Knights" },
  "cerastus-castigator": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Castigator", faction: "Imperial Knights" },
  "cerastus-acheron": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Acheron", faction: "Imperial Knights" },
  "cerastus-atrapos": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Atrapos", faction: "Imperial Knights" },
  "questoris-magaera": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Magaera", faction: "Imperial Knights" },
  "questoris-styrix": { keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Styrix", faction: "Imperial Knights" },
  "acastus-asterius": { keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Acastus, Knight Asterius", faction: "Imperial Knights" },
  "acastus-porphyrion": { keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Acastus, Knight Porphyrion", faction: "Imperial Knights" },
  "armiger-helverin": { keywords: "Vehicle, Walker, Imperium, Armiger, Helverin", faction: "Imperial Knights" },
  "armiger-warglaive": { keywords: "Vehicle, Walker, Imperium, Armiger, Warglaive", faction: "Imperial Knights" },
  "armiger-moirax": { keywords: "Vehicle, Walker, Imperium, Armiger, Moirax", faction: "Imperial Knights" },
};
