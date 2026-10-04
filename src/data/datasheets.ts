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

export type Datasheet = {
  stats: {
    m: string;
    t: string;
    sv: string;
    w: string;
    ld: string;
    oc: string;
    inv?: string;
    damaged?: string;
  };
  ranged: WeaponProfile[];
  melee: WeaponProfile[];
  fixed: string;
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
      gun("Pyrithite spear", "Assault, Melta 2", '12"', "1", "2+", "10", "−3", "3+2"),
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
      gun("Dreadspear", "", '18"', "2", "2+", "10", "−3", "3+2"),
      gun("Lastrum storm bolter", "Rapid Fire 3", '24"', "3", "2+", "5", "−1", "1"),
      gun("Twin Infernus incinerator", "Blast 2, Torrent, Twin-linked", '12"', "3", "—", "6", "−1", "1"),
    ],
    melee: [blade("Dreadspear", "Lance", "5", "2+", "12", "−3", "3+3")],
    fixed: "1 Dreadspear, 2 Lastrum storm bolters.",
    swaps: "The bolters may be swapped for 2 Adrathic combi-destructors or 2 Twin Infernus incinerators.",
    abilities: [{ name: "Unyielding Ancient", rule: UNYIELDING }],
  },
  "shield-captain-allarus": {
    stats: { m: '7"', t: "8", sv: "2+", w: "9", ld: "5+", oc: "2", inv: "4+" },
    ranged: [
      gun("Balistus grenade launcher", "Assault, Blast 1", '18"', "3", "2+", "5", "−1", "1"),
      gun("Castellan axe", "Assault, Rapid Fire 2", '24"', "2", "2+", "5", "−1", "1"),
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
      gun("Salvo launcher", "", '24"', "2", "2+", "10", "−2", "3+2"),
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
      gun("Salvo launcher", "", '24"', "2", "2+", "10", "−2", "3+2"),
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
      gun("Twin Corvae las-pulser", "Twin-linked", '18"', "1", "2+", "10", "−3", "3+2"),
    ],
    melee: [blade("Solarite power lance", "Lance", "5", "2+", "8", "−2", "3")],
    fixed: "1 Lastrum bolt cannon, 1 Solarite power lance.",
    swaps: "Each model may swap the cannon for an Adrathic devastator, an Arachnus volley cannon, or a Twin Corvae las-pulser.",
    abilities: [{ name: "Death Blow", rule: "If this unit charged this turn, its melee attacks have +1 AP." }],
  },
  pallas: {
    stats: { m: '12"', t: "9", sv: "2+", w: "10", ld: "5+", oc: "2", inv: "5+" },
    ranged: [
      gun("Twin Arachnus blaze cannon", "Twin-linked", '24"', "2", "2+", "10", "−3", "3+2"),
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
      gun("Twin Arachnus blaze cannon", "Twin-linked", '24"', "2", "2+", "10", "−3", "3+2"),
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
      gun("Arachnus blaze carronade", "Lethal Hits: Monster/Vehicle", '48"', "4", "2+", "12", "−3", "6+2"),
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
      gun("Hunter-killer missile", "One Shot", '48"', "1", "2+", "14", "−3", "3+3"),
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
    ranged: [gun("Animus speculum", "Anti-Psyker 2+, Assault, Precision, Psychic Assassin", '24"', "3", "2+", "5", "−2", "3")],
    melee: [blade("Life-draining touch", "Anti-Psyker 2+, Devastating Wounds, Precision", "4", "2+", "4", "−2", "2")],
    fixed: "Base 32mm. 1 Animus speculum, 1 Life-draining touch.",
    abilities: [
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
      { name: "Leader", rule: "Battleline Imperium Infantry, Exaction Squad, Grey Knights Terminator Squad, Imperial Navy Breachers, Inquisitorial Agents, Subductor Squad, Vigilant Squad." },
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
      { name: "Leader", rule: "Aquila Kill Team, Battleline Imperium Infantry, Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Subductor Squad, Vigilant Squad." },
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
      { name: "Leader", rule: "Battleline Imperium Infantry, Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad." },
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
    fixed: "Base 32mm. 1 Jindarii tox-cycler, 1 Stubcarbine, 1 Butcher blade, 1 Garralisk’s claws and teeth.",
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
      gun("Exitus rifle", "Devastating Wounds, Heavy, Ignores Cover, Precision", '48"', "1", "2+", "8", "−3", "3+3"),
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
    ranged: [gun("Bolt pistol", "Pistol", '12"', "1", "3+", "4", "0", "1")],
    melee: [blade("Inquisitorial melee weapon", "", "5", "3+", "4", "−2", "1")],
    fixed: "Base 32mm. 1 Inquisitorial melee weapon, 1 Bolt pistol, Blessed wardings.",
    abilities: [
      { name: "Leader", rule: "Aquila Kill Team, Battleline Imperium Infantry, Exaction Squad, Grey Knights Terminator Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad." },
      { name: "Authority of the Inquisition", rule: AUTHORITY },
      { name: "Power of the Rosette", rule: "Each time you target this model’s unit with a Stratagem, roll one D6: on a 3+, you gain 1 CP." },
      { name: "Blessed Wardings", rule: "While leading, models in the unit have a 6+ invulnerable save." },
      { name: "Rules", rule: "Assigned Agents, Leader." },
    ],
  },
  "ministorum-priest": {
    stats: { m: '6"', t: "3", sv: "6+", w: "3", ld: "7+", oc: "1", inv: "4+" },
    ranged: [gun("Zealot’s vindictor", "Ignores Cover, Torrent", '12"', "D6", "—", "5", "0", "1")],
    melee: [blade("Zealot’s vindictor", "Sustained Hits 1", "3", "4+", "5", "−1", "2")],
    fixed: "Base 32mm. 1 Zealot’s vindictor. Supporting: Imperial Navy Breachers.",
    abilities: [
      { name: "Zealot", rule: "Once per battle, in the Fight phase. Until the end of the phase, +3 Strength and Attacks on this model’s melee weapons." },
      { name: "Holy Hatred", rule: "While leading, melee weapons in the unit have Sustained Hits 1." },
      { name: "Support", rule: "Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad." },
      { name: "Rules", rule: "Support." },
    ],
  },
  navigator: {
    stats: { m: '6"', t: "3", sv: "5+", w: "3", ld: "7+", oc: "1", inv: "4+" },
    ranged: [gun("Laspistol", "Pistol", '12"', "1", "4+", "3", "0", "1")],
    melee: [blade("Force-orb cane", "Psychic", "3", "4+", "6", "−1", "3")],
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
      gun("Dartmask", "Anti-Infantry 2+, Pistol, Precision", '12"', "1", "4+", "2", "−1", "3"),
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
      { name: "Rules", rule: "Leader." },
    ],
  },
  "watch-master": {
    stats: { m: '6"', t: "4", sv: "2+", w: "5", ld: "6+", oc: "1", inv: "4+" },
    ranged: [gun("Vigil spear", "", '24"', "2", "2+", "4", "−1", "2")],
    melee: [blade("Vigil spear", "Lance", "6", "2+", "6", "−2", "3")],
    fixed: "Base 32mm. 1 Vigil spear. The spear has both profiles.",
    abilities: [
      { name: "Strategic Knowledge", rule: "While leading, the unit is eligible to shoot and declare a charge in a turn it Advanced or Fell Back." },
      { name: "Rites of Battle", rule: "Once per battle round, one unit from your army with this ability, when targeted with a Stratagem, reduces that use by 1 CP." },
      { name: "Leader", rule: "Aquila Kill Team, Deathwatch Kill Team, Deathwatch Terminator Squad, Fortis Kill Team, Indomitor Kill Team, Proteus Kill Team, Spectrus Kill Team." },
      { name: "Rules", rule: "Leader, Assigned Agents." },
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
  "rogue-trader": { keywords: "Infantry, Character, Grenades, Imperium, Rogue Trader Entourage, Voidfarers", faction: "Agents of the Imperium" },
  "watch-master": { keywords: "Character, Infantry, Captain, Grenades, Imperium, Watch Master, Deathwatch, Ordo Xenos", faction: "Agents of the Imperium" },
};
