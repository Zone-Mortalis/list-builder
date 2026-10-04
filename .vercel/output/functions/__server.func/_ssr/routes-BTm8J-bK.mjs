import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Minus, c as Check, i as Plus, o as Crown, r as Trash2, s as ChevronDown, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BTm8J-bK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var gun = (name, tags, range, a, bs, s, ap, d) => ({
	name,
	tags: tags || void 0,
	range,
	a,
	skill: bs === "—" ? "BS —" : `BS ${bs}`,
	s,
	ap,
	d
});
var blade = (name, tags, a, ws, s, ap, d) => ({
	name,
	tags: tags || void 0,
	range: "Melee",
	a,
	skill: `WS ${ws}`,
	s,
	ap,
	d
});
var TAKE_WING = "At the end of the opponent’s Fight phase, if unengaged, place this unit in Strategic Reserves.";
var CASCADE_MINE = "Once per battle, per unit. At the start of a phase, pick an enemy unit within 3\" and roll a D6. On a 2+, that unit suffers D3 mortal wounds, or 2D3 if it is a Vehicle or Monster.";
var KATAHS = "Once per battle round, per unit. If this unit is not readied, you may ready it.";
var UNYIELDING = "Attacks with Strength greater than this unit’s Toughness have −1 to wound.";
var VEXILLA = "+1 OC. This unit can ignore modifiers to its Leadership.";
var SHADOW = "Cannot be your Warlord. If your faction is Agents of the Imperium, during Declare Battle Formations you may replace this model with a different Officio Assassinorum model of equal or lower points. After the swap you cannot have more than one of any assassin.";
var AUTHORITY = "While leading, this model can embark in any Transport its Bodyguard unit can embark in.";
var DATASHEETS = {
	"aquilon-gauntlets": {
		stats: {
			m: "7\"",
			t: "8",
			sv: "2+",
			w: "6",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Adrathic combi-destructor", "", "12\"", "2", "2+", "5", "−2", "3")],
		melee: [blade("Solarite power gauntlet", "", "5", "2+", "10", "−2", "3")],
		fixed: "1 Adrathic combi-destructor, 1 Solarite power gauntlet.",
		abilities: [{
			name: "Dread Foe",
			rule: "Melee attacks against a unit that is not a Monster or Vehicle have +1 AP."
		}]
	},
	"aquilon-talons": {
		stats: {
			m: "7\"",
			t: "8",
			sv: "2+",
			w: "6",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Infernus firepike", "Blast 2, Torrent", "12\"", "3", "—", "5", "−1", "1"), gun("Lastrum storm bolter", "Rapid Fire 3", "24\"", "3", "2+", "5", "−1", "1")],
		melee: [blade("Solarite power talon", "Sustained Hits 2", "6", "2+", "6", "−2", "1")],
		fixed: "1 Lastrum storm bolter, 1 Solarite power talon.",
		swaps: "Each model may swap the bolter for 1 Infernus firepike.",
		abilities: [{
			name: "Reap a Terrible Tally",
			rule: "Against Infantry, re-roll hit rolls of 1 and wound rolls of 1."
		}]
	},
	"blade-champion": {
		stats: {
			m: "8\"",
			t: "7",
			sv: "2+",
			w: "7",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [],
		melee: [
			blade("Vaultswords — Behemor", "Devastating Wounds", "5", "2+", "10", "−3", "3"),
			blade("Vaultswords — Hurricanis", "Cleave 1, Sustained Hits 1", "10", "2+", "6", "−2", "1"),
			blade("Vaultswords — Victus", "Precision", "8", "2+", "8", "−3", "2")
		],
		fixed: "1 Vaultswords. Pick one profile before selecting targets.",
		abilities: [{
			name: "Swift Onslaught",
			rule: "Re-roll advance rolls and charge rolls."
		}, {
			name: "Sword of the Throne",
			rule: "At the start of the first battle round, mark one enemy unit. Attacks against the mark have +1 to wound. When the mark is destroyed, choose a new one."
		}]
	},
	"sentinel-guard": {
		stats: {
			m: "8\"",
			t: "7",
			sv: "2+",
			w: "5",
			ld: "5+",
			oc: "3",
			inv: "4+"
		},
		ranged: [gun("Sentinel blade", "Assault, Close-quarters", "12\"", "4", "2+", "5", "−1", "2")],
		melee: [blade("Sentinel blade", "", "5", "2+", "6", "−2", "2")],
		fixed: "1 Praesidium shield, 1 Sentinel blade.",
		swaps: "One model may take a Vexilla.",
		abilities: [
			{
				name: "Stand Vigil",
				rule: "Attacks have Lethal Hits against units that are not Monsters or Vehicles if this unit or the target is within range of an objective."
			},
			{
				name: "Praesidium Shield",
				rule: "Attacks with Strength greater than this unit’s Toughness have −1 to wound."
			},
			{
				name: "Vexilla",
				rule: VEXILLA
			}
		]
	},
	trajann: {
		stats: {
			m: "8\"",
			t: "7",
			sv: "2+",
			w: "10",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Eagle’s Scream", "Assault, Rapid Fire 2", "24\"", "2", "2+", "6", "−2", "2")],
		melee: [blade("Watcher’s Axe", "Cleave 1", "6", "2+", "12", "−3", "4")],
		fixed: "1 Eagle’s Scream, 1 Watcher’s Axe. If he is in the army, he is the Warlord.",
		abilities: [{
			name: "Captain-General (Aura)",
			rule: "Friendly Adeptus Custodes units, excluding Monsters and Vehicles, within 6\" re-roll hit rolls of 1 and wound rolls of 1."
		}, {
			name: "Moment Shackle",
			rule: "Once per battle, per army. At the start of a phase, until the end of that phase, either the Watcher’s Axe has +3 Attacks or this model has a 3+ invulnerable save."
		}]
	},
	"shield-captain": {
		stats: {
			m: "8\"",
			t: "7",
			sv: "2+",
			w: "8",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [
			gun("Castellan axe", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2"),
			gun("Guardian spear", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2"),
			gun("Pyrithite spear", "Assault, Melta 2", "12\"", "1", "2+", "10", "−3", "3+2")
		],
		melee: [
			blade("Castellan axe", "", "5", "2+", "10", "−2", "4"),
			blade("Eternity-pattern paragon blade", "Precision", "6", "2+", "10", "−3", "3"),
			blade("Guardian spear", "Cleave 1", "8", "2+", "8", "−2", "2"),
			blade("Pyrithite spear", "Cleave 1", "8", "2+", "8", "−2", "2")
		],
		fixed: "1 Praesidium shield, 1 Pyrithite spear.",
		swaps: "The spear may be swapped for an Eternity-pattern paragon blade. Spear and shield may instead be swapped for a Castellan axe or a Guardian spear. The shield is +25.",
		abilities: [
			{
				name: "Master of Ka’tahs",
				rule: KATAHS
			},
			{
				name: "Vengeful Surge",
				rule: "Once per battle, per unit. In the opponent’s Shooting phase, after an enemy unit shoots, if a model here lost a wound, this unit may surge up to D6+2\"."
			},
			{
				name: "Praesidium Shield",
				rule: "Attacks allocated to this model have −1 Damage."
			}
		]
	},
	"venatari-kinetic": {
		stats: {
			m: "12\"",
			t: "7",
			sv: "2+",
			w: "5",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Kinetic destroyer", "Assault, Close-quarters, Sustained Hits 1", "18\"", "4", "2+", "6", "−2", "1")],
		melee: [blade("Tarsus buckler", "Sustained Hits 1", "5", "2+", "6", "−2", "1")],
		fixed: "1 Kinetic destroyer, 1 Tarsus buckler.",
		abilities: [
			{
				name: "Take Wing",
				rule: TAKE_WING
			},
			{
				name: "Neutronium Cascade Mine",
				rule: CASCADE_MINE
			},
			{
				name: "Strike from the Skies",
				rule: "If this unit ingresses this turn, its ranged attacks re-roll hits."
			}
		]
	},
	"venatari-lances": {
		stats: {
			m: "12\"",
			t: "7",
			sv: "2+",
			w: "5",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Verutum lance", "Assault", "18\"", "1", "2+", "10", "−2", "3")],
		melee: [blade("Verutum lance", "Lance, Precision", "5", "2+", "7", "−2", "2")],
		fixed: "1 Verutum lance.",
		abilities: [
			{
				name: "Take Wing",
				rule: TAKE_WING
			},
			{
				name: "Neutronium Cascade Mine",
				rule: CASCADE_MINE
			},
			{
				name: "Swift Ruin",
				rule: "Once per phase, per army. Rapid Ingress on this unit costs 1 fewer CP and does not stop other uses of that Stratagem this phase."
			}
		]
	},
	galatus: {
		stats: {
			m: "9\"",
			t: "10",
			sv: "2+",
			w: "12",
			ld: "5+",
			oc: "3",
			inv: "4+",
			damaged: "4"
		},
		ranged: [gun("Warblade", "Blast 2, Torrent, Twin-linked", "12\"", "4", "—", "6", "−1", "2")],
		melee: [blade("Warblade", "Cleave 1, Sustained Hits 1: non-Monster/Vehicle", "8", "2+", "10", "−2", "3")],
		fixed: "1 Warblade.",
		abilities: [{
			name: "Unyielding Ancient",
			rule: UNYIELDING
		}]
	},
	achillus: {
		stats: {
			m: "9\"",
			t: "10",
			sv: "2+",
			w: "12",
			ld: "5+",
			oc: "3",
			inv: "5+",
			damaged: "4"
		},
		ranged: [
			gun("Adrathic combi-destructor", "", "12\"", "2", "2+", "5", "−2", "3"),
			gun("Dreadspear", "", "18\"", "2", "2+", "10", "−3", "3+2"),
			gun("Lastrum storm bolter", "Rapid Fire 3", "24\"", "3", "2+", "5", "−1", "1"),
			gun("Twin Infernus incinerator", "Blast 2, Torrent, Twin-linked", "12\"", "3", "—", "6", "−1", "1")
		],
		melee: [blade("Dreadspear", "Lance", "5", "2+", "12", "−3", "3+3")],
		fixed: "1 Dreadspear, 2 Lastrum storm bolters.",
		swaps: "The bolters may be swapped for 2 Adrathic combi-destructors or 2 Twin Infernus incinerators.",
		abilities: [{
			name: "Unyielding Ancient",
			rule: UNYIELDING
		}]
	},
	"shield-captain-allarus": {
		stats: {
			m: "7\"",
			t: "8",
			sv: "2+",
			w: "9",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [
			gun("Balistus grenade launcher", "Assault, Blast 1", "18\"", "3", "2+", "5", "−1", "1"),
			gun("Castellan axe", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "1"),
			gun("Guardian spear", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2")
		],
		melee: [blade("Castellan axe", "", "5", "2+", "10", "−2", "4"), blade("Guardian spear", "Cleave 1", "8", "2+", "8", "−2", "2")],
		fixed: "1 Balistus grenade launcher, 1 Guardian spear.",
		swaps: "The spear may be swapped for 1 Castellan axe.",
		abilities: [{
			name: "Master of Ka’tahs",
			rule: KATAHS
		}, {
			name: "Archeotech Teleport-shunter",
			rule: "Once per battle, per unit. In your Movement phase, if unengaged and not yet selected to move, place this unit in Strategic Reserves. It must ingress this phase."
		}]
	},
	"shield-captain-jetbike": {
		stats: {
			m: "12\"",
			t: "8",
			sv: "2+",
			w: "10",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Hurricane bolter", "Rapid Fire 3, Twin-linked", "18\"", "3", "2+", "5", "−1", "2"), gun("Salvo launcher", "", "24\"", "2", "2+", "10", "−2", "3+2")],
		melee: [blade("Interceptor lance", "Lance", "8", "2+", "8", "−2", "2")],
		fixed: "1 Interceptor lance, 1 Salvo launcher.",
		swaps: "The launcher may be swapped for 1 Hurricane bolter.",
		abilities: [{
			name: "Master of Ka’tahs",
			rule: KATAHS
		}, {
			name: "Sweeping Advance",
			rule: "Once per battle, per unit. At the end of the Fight phase, if it was eligible to fight, it may make a Normal move if unengaged, or Fall Back if engaged."
		}]
	},
	"custodian-guard": {
		stats: {
			m: "8\"",
			t: "7",
			sv: "2+",
			w: "5",
			ld: "5+",
			oc: "3",
			inv: "4+"
		},
		ranged: [gun("Guardian spear", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2")],
		melee: [blade("Guardian spear", "", "6", "2+", "8", "−2", "2")],
		fixed: "1 Guardian spear.",
		swaps: "One model may take a Vexilla.",
		abilities: [{
			name: "Impenetrable Defence",
			rule: "Attacks have Sustained Hits 1 against units that are not Monsters or Vehicles if this unit or the target is within range of an objective."
		}, {
			name: "Vexilla",
			rule: VEXILLA
		}]
	},
	wardens: {
		stats: {
			m: "8\"",
			t: "7",
			sv: "2+",
			w: "6",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Castellan axe", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2"), gun("Guardian spear", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2")],
		melee: [blade("Castellan axe", "", "3", "2+", "10", "−2", "4"), blade("Guardian spear", "", "6", "2+", "8", "−2", "2")],
		fixed: "1 Guardian spear.",
		swaps: "Each model may swap it for a Castellan axe. One model may take a Vexilla.",
		abilities: [{
			name: "Living Fortress",
			rule: "Attacks that target this unit have −1 AP."
		}, {
			name: "Vexilla",
			rule: VEXILLA
		}]
	},
	allarus: {
		stats: {
			m: "7\"",
			t: "8",
			sv: "2+",
			w: "6",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [
			gun("Balistus grenade launcher", "Assault, Blast 1", "18\"", "3", "2+", "5", "−1", "1"),
			gun("Castellan axe", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2"),
			gun("Guardian spear", "Assault, Rapid Fire 2", "24\"", "2", "2+", "5", "−1", "2")
		],
		melee: [blade("Castellan axe", "", "3", "2+", "10", "−2", "4"), blade("Guardian spear", "", "6", "2+", "8", "−2", "2")],
		fixed: "1 Balistus grenade launcher, 1 Guardian spear.",
		swaps: "Each model may swap the spear for a Castellan axe. One model may take a Vexilla.",
		abilities: [{
			name: "Slayer of Tyrants",
			rule: "Melee attacks against a unit with higher Toughness have +1 to wound."
		}, {
			name: "Vexilla",
			rule: VEXILLA
		}]
	},
	vertus: {
		stats: {
			m: "12\"",
			t: "8",
			sv: "2+",
			w: "7",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Hurricane bolter", "Rapid Fire 3, Twin-linked", "18\"", "3", "2+", "5", "−1", "2"), gun("Salvo launcher", "", "24\"", "2", "2+", "10", "−2", "3+2")],
		melee: [blade("Interceptor lance", "Lance", "6", "2+", "8", "−2", "2")],
		fixed: "1 Interceptor lance, 1 Salvo launcher.",
		swaps: "Each model may swap the launcher for a Hurricane bolter.",
		abilities: [{
			name: "Quicksilver Execution",
			rule: "If this unit charged this turn, its melee attacks have Sustained Hits 1."
		}]
	},
	gyrfalcon: {
		stats: {
			m: "12\"",
			t: "8",
			sv: "2+",
			w: "9",
			ld: "5+",
			oc: "2",
			inv: "4+"
		},
		ranged: [
			gun("Adrathic devastator", "", "18\"", "3", "2+", "8", "−2", "3"),
			gun("Arachnus volley cannon", "Devastating Wounds, Sustained Hits 1", "24\"", "8", "2+", "5", "−1", "1"),
			gun("Lastrum bolt cannon", "Sustained Hits 1", "36\"", "3", "2+", "6", "−2", "2"),
			gun("Twin Corvae las-pulser", "Twin-linked", "18\"", "1", "2+", "10", "−3", "3+2")
		],
		melee: [blade("Solarite power lance", "Lance", "5", "2+", "8", "−2", "3")],
		fixed: "1 Lastrum bolt cannon, 1 Solarite power lance.",
		swaps: "Each model may swap the cannon for an Adrathic devastator, an Arachnus volley cannon, or a Twin Corvae las-pulser.",
		abilities: [{
			name: "Death Blow",
			rule: "If this unit charged this turn, its melee attacks have +1 AP."
		}]
	},
	pallas: {
		stats: {
			m: "12\"",
			t: "9",
			sv: "2+",
			w: "10",
			ld: "5+",
			oc: "2",
			inv: "5+"
		},
		ranged: [gun("Twin Arachnus blaze cannon", "Twin-linked", "24\"", "2", "2+", "10", "−3", "3+2"), gun("Twin Iliastus accelerator fusil", "Rapid Fire 2, Twin-linked", "48\"", "2", "2+", "10", "−1", "3")],
		melee: [blade("Armoured hull", "", "3", "4+", "6", "0", "1")],
		fixed: "1 Armoured hull, 1 Twin Arachnus blaze cannon.",
		swaps: "The blaze cannon may be swapped for a Twin Iliastus accelerator fusil.",
		abilities: [{
			name: "Mobile Hunter",
			rule: "After this unit shoots, it may make a Normal move of up to D6\" and cannot charge this turn."
		}]
	},
	coronus: {
		stats: {
			m: "12\"",
			t: "12",
			sv: "2+",
			w: "16",
			ld: "5+",
			oc: "5",
			inv: "5+",
			damaged: "6"
		},
		ranged: [
			gun("Twin Arachnus blaze cannon", "Twin-linked", "24\"", "2", "2+", "10", "−3", "3+2"),
			gun("Twin Lastrum bolt cannon", "Sustained Hits 1, Twin-linked", "36\"", "3", "2+", "6", "−2", "2"),
			gun("Twin Neutronium cascade projectors", "Blast 1, Torrent, Twin-linked", "12\"", "3", "—", "7", "−2", "1")
		],
		melee: [blade("Armoured hull", "", "6", "4+", "8", "0", "1")],
		fixed: "1 Armoured hull, 1 Twin Arachnus blaze cannon, 1 Twin Lastrum bolt cannon.",
		swaps: "The bolt cannon may be swapped for Twin Neutronium cascade projectors.",
		abilities: [{
			name: "Repulsor Suspensor Technology",
			rule: "Once per phase, per unit. In the opponent’s Shooting phase, if this unit lost a wound and is unengaged, it may move up to D6\"."
		}, {
			name: "Assault Vehicle",
			rule: "After an Advance, embarked units may Shock Disembark."
		}]
	},
	caladius: {
		stats: {
			m: "10\"",
			t: "11",
			sv: "2+",
			w: "14",
			ld: "5+",
			oc: "4",
			inv: "5+",
			damaged: "5"
		},
		ranged: [
			gun("Iliastus accelerator cannon", "Rapid Fire 4, Sustained Hits 1: non-Monster/Vehicle", "48\"", "4", "2+", "10", "−1", "3"),
			gun("Twin Lastrum bolt cannon", "Sustained Hits 1, Twin-linked", "36\"", "3", "2+", "6", "−2", "2"),
			gun("Twin Neutronium cascade projectors", "Blast 1, Torrent, Twin-linked", "12\"", "3", "—", "7", "−2", "1")
		],
		melee: [blade("Armoured hull", "", "4", "4+", "6", "0", "1")],
		fixed: "1 Armoured hull, 1 Iliastus accelerator cannon, 1 Twin Lastrum bolt cannon.",
		swaps: "The bolt cannon may be swapped for Twin Neutronium cascade projectors.",
		abilities: [{
			name: "Destructor Optics",
			rule: "Ranged attacks against a unit that is not a Monster or Vehicle have +1 AP."
		}]
	},
	"caladius-annihilator": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "2+",
			w: "14",
			ld: "5+",
			oc: "4",
			inv: "5+",
			damaged: "5"
		},
		ranged: [
			gun("Arachnus blaze carronade", "Lethal Hits: Monster/Vehicle", "48\"", "4", "2+", "12", "−3", "6+2"),
			gun("Twin Lastrum bolt cannon", "Sustained Hits 1, Twin-linked", "36\"", "3", "2+", "6", "−2", "2"),
			gun("Twin Neutronium cascade projectors", "Blast 1, Torrent, Twin-linked", "12\"", "3", "—", "7", "−2", "1")
		],
		melee: [blade("Armoured hull", "", "4", "4+", "6", "0", "1")],
		fixed: "1 Arachnus blaze carronade, 1 Armoured hull, 1 Twin Lastrum bolt cannon.",
		swaps: "The bolt cannon may be swapped for Twin Neutronium cascade projectors.",
		abilities: [{
			name: "Advanced Firepower",
			rule: "Against a Monster or Vehicle, re-roll one hit roll, one wound roll, and one damage roll."
		}]
	},
	telemon: {
		stats: {
			m: "10\"",
			t: "11",
			sv: "2+",
			w: "14",
			ld: "5+",
			oc: "4",
			inv: "4+",
			damaged: "5"
		},
		ranged: [
			gun("Adrathic Desolator", "", "24\"", "4", "2+", "10", "−2", "4"),
			gun("Arachnus Storm Cannon", "Devastating Wounds, Sustained Hits 1", "24\"", "12", "2+", "6", "−1", "1"),
			gun("Iliastus Accelerator Culverin", "Rapid Fire 3", "48\"", "3", "2+", "10", "−1", "3"),
			gun("Spiculus Bolt Launcher", "Blast 2", "36\"", "6", "2+", "5", "−1", "1"),
			gun("Twin Neutronium Cascade Projectors", "Blast 1, Torrent, Twin-linked", "12\"", "3", "—", "7", "−2", "1")
		],
		melee: [blade("Caestus Fist", "", "5", "2+", "14", "−3", "4"), blade("Dual Caestus Fists", "Twin-linked", "7", "2+", "14", "−3", "4")],
		fixed: "1 Dual Caestus Fists, 1 Spiculus Bolt Launcher, 2 Twin Neutronium Cascade Projectors.",
		swaps: "The fists and both projector sets may be replaced with one of these: 1 Adrathic Desolator, 1 Caestus Fist, and 1 Twin Neutronium Cascade Projectors; 1 Arachnus Storm Cannon, 1 Caestus Fist, and 1 Twin Neutronium Cascade Projectors; or 1 Caestus Fist, 1 Iliastus Accelerator Culverin, and 1 Twin Neutronium Cascade Projectors. The Spiculus Bolt Launcher stays in every loadout.",
		abilities: [{
			name: "Guardian Eternal",
			rule: "Ranged attacks that target this unit have −1 Damage."
		}]
	},
	"knight-centura": {
		stats: {
			m: "7\"",
			t: "3",
			sv: "3+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "5+"
		},
		ranged: [gun("Master-crafted boltgun", "Anti-Psyker 4+, Assault, Rapid Fire 1", "24\"", "2", "2+", "5", "−1", "2"), gun("Master-crafted flamer", "Anti-Psyker 4+, Assault, Blast 2, Torrent", "12\"", "4", "—", "4", "−1", "1")],
		melee: [blade("Executioner greatblade", "Anti-Psyker 5+, Cleave 1, Devastating Wounds: Psyker", "4", "2+", "5", "−2", "2"), blade("Gun stock", "", "3", "2+", "3", "0", "1")],
		fixed: "1 Executioner greatblade.",
		swaps: "It may be swapped for a master-crafted boltgun and gun stock, or a master-crafted flamer and gun stock.",
		abilities: [{
			name: "Seeker’s Instincts",
			rule: "+2\" Movement. Re-roll advance rolls and charge rolls."
		}, {
			name: "Corner the Quarry",
			rule: "A unit that is not a Monster or Vehicle and Falls Back while engaged must use Desperate Escape. If it is battle-shocked, −1 to those Hazard rolls."
		}]
	},
	prosecutors: {
		stats: {
			m: "7\"",
			t: "3",
			sv: "3+",
			w: "1",
			ld: "6+",
			oc: "2"
		},
		ranged: [gun("Boltgun", "Anti-Psyker 4+, Assault, Rapid Fire 1", "24\"", "1", "3+", "5", "−1", "1")],
		melee: [blade("Gun stock", "", "2", "3+", "3", "0", "1")],
		fixed: "1 Boltgun, 1 gun stock.",
		abilities: [{
			name: "Purity of Execution",
			rule: "In your Shooting phase, one visible enemy unit within 18\" is detected and has +3\" detection range while detected."
		}]
	},
	witchseekers: {
		stats: {
			m: "7\"",
			t: "3",
			sv: "3+",
			w: "1",
			ld: "6+",
			oc: "1"
		},
		ranged: [gun("Flamer", "Anti-Psyker 4+, Assault, Blast 1, Torrent", "12\"", "3", "—", "4", "−1", "1")],
		melee: [blade("Gun stock", "", "2", "3+", "3", "0", "1")],
		fixed: "1 Flamer, 1 gun stock.",
		abilities: [{
			name: "Sanctified Flames",
			rule: "After this unit shoots, one enemy unit hit by those attacks takes a Battle-shock test, at −1 if it is a Psyker."
		}]
	},
	rhino: {
		stats: {
			m: "12\"",
			t: "9",
			sv: "3+",
			w: "10",
			ld: "6+",
			oc: "2"
		},
		ranged: [gun("Hunter-killer missile", "One Shot", "48\"", "1", "2+", "14", "−3", "3+3"), gun("Storm bolter", "Rapid Fire 2", "24\"", "2", "3+", "5", "−1", "1")],
		melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
		fixed: "1 Armoured tracks, 1 storm bolter.",
		swaps: "May take 1 hunter-killer missile.",
		abilities: [{
			name: "Assault Vehicle",
			rule: "After an Advance, embarked units may Shock Disembark."
		}]
	},
	vigilators: {
		stats: {
			m: "7\"",
			t: "3",
			sv: "3+",
			w: "1",
			ld: "6+",
			oc: "1"
		},
		ranged: [],
		melee: [blade("Executioner greatblade", "Anti-Psyker 5+, Devastating Wounds: Psyker", "3", "3+", "5", "−2", "2")],
		fixed: "1 Executioner greatblade.",
		abilities: [{
			name: "Deft Parry",
			rule: "Melee attacks that target this unit have −1 to hit."
		}]
	},
	callidus: {
		stats: {
			m: "7\"",
			t: "4",
			sv: "6+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Neural shredder", "Anti-Infantry 2+, Precision, Torrent", "12\"", "D6", "—", "5", "−2", "1")],
		melee: [blade("Phase sword and poison blades", "Lethal Hits, Precision", "5", "2+", "5", "−4", "2")],
		fixed: "Base 32mm. 1 Neural shredder, 1 Phase sword and poison blades.",
		abilities: [
			{
				name: "Reign of Confusion",
				rule: "Once per turn, when your opponent targets a unit from their army within 12\" of this model with a Stratagem, increase that use by 1 CP."
			},
			{
				name: "Acrobatic Escape",
				rule: "At the end of the Fight phase, if engaged, Fall Back up to D6\". At the end of your opponent’s turn, if more than 3\" from all enemy units, place this unit in Strategic Reserves. It must ingress in your next Movement phase, including turn 1."
			},
			{
				name: "Shadow Assignment",
				rule: SHADOW
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Deep Strike, Lone Operative, Fights First, Infiltrators."
			}
		]
	},
	culexus: {
		stats: {
			m: "7\"",
			t: "4",
			sv: "6+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Animus speculum", "Anti-Psyker 2+, Assault, Precision, Psychic Assassin", "24\"", "3", "2+", "5", "−2", "3")],
		melee: [blade("Life-draining touch", "Anti-Psyker 2+, Devastating Wounds, Precision", "4", "2+", "4", "−2", "2")],
		fixed: "Base 32mm. 1 Animus speculum, 1 Life-draining touch.",
		abilities: [
			{
				name: "Abomination",
				rule: "Feel No Pain 2+ against psychic attacks."
			},
			{
				name: "Soulless Horror",
				rule: "Once per battle, at the start of any Command phase. Each enemy unit within 9\" takes a Battle-shock test at −1, or −2 if it is a Psyker."
			},
			{
				name: "Etheric Emergence",
				rule: "When set up with Deep Strike, it may be set up more than 6\" horizontally from all enemy units, but it cannot declare a charge that turn."
			},
			{
				name: "Shadow Assignment",
				rule: SHADOW
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Lone Operative, Stealth, Deep Strike."
			}
		]
	},
	eversor: {
		stats: {
			m: "9\"",
			t: "4",
			sv: "6+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Executioner pistol", "Anti-Infantry 3+, Pistol, Precision, Sustained Hits 3", "12\"", "4", "2+", "4", "0", "1")],
		melee: [blade("Power sword and neuro gauntlet", "Anti-Infantry 3+, Precision, Sustained Hits 3", "6", "2+", "5", "−2", "2")],
		fixed: "Base 32mm. 1 Executioner pistol, 1 Power sword and neuro gauntlet.",
		abilities: [
			{
				name: "Frenzon",
				rule: "Eligible to shoot and declare a charge in a turn it Advanced."
			},
			{
				name: "Overkill",
				rule: "Once per battle, in your Movement phase before a Normal move. Until the end of the turn, +6\" Move and +3 Attacks on its melee weapons."
			},
			{
				name: "Shadow Assignment",
				rule: SHADOW
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Lone Operative, Deadly Demise D3, Scouts 9\"."
			}
		]
	},
	coteaz: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "2+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Bolt pistol", "Pistol", "12\"", "1", "3+", "4", "0", "1"), gun("Psychic Blast", "Anti-Daemon 4+, Anti-Infantry 5+, Devastating Wounds, Psychic", "18\"", "D6", "3+", "3", "−1", "1")],
		melee: [blade("Nemesis daemon hammer", "Psychic", "3", "3+", "9", "−3", "3")],
		fixed: "Base 40mm. 1 Bolt pistol, 1 Glovodan Psyber-eagle, 1 Nemesis daemon hammer, 1 Psychic Blast.",
		abilities: [
			{
				name: "Malefic Wardings",
				rule: "Psychic. While leading, the unit has a 6+ invulnerable save, and a 4+ invulnerable save against psychic attacks and attacks made by Daemon models."
			},
			{
				name: "Spy Network",
				rule: "Each time your opponent gains a CP from an ability, roll one D6: on a 2+, you also gain 1 CP."
			},
			{
				name: "Glovodan Psyber-eagle",
				rule: "In your Command phase, select one enemy unit within 18\". Until your next Command phase, that unit cannot have the Benefit of Cover."
			},
			{
				name: "Leader",
				rule: "Battleline Imperium Infantry, Exaction Squad, Grey Knights Terminator Squad, Imperial Navy Breachers, Inquisitorial Agents, Subductor Squad, Vigilant Squad."
			},
			{
				name: "Authority of the Inquisition",
				rule: AUTHORITY
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Leader."
			}
		]
	},
	draxus: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "3+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "5+"
		},
		ranged: [gun("Dirgesinger", "Anti-Infantry 4+, Assault, Devastating Wounds", "18\"", "4", "3+", "4", "0", "2"), gun("Psychic Tempest", "Psychic, Sustained Hits 2", "18\"", "6", "3+", "6", "0", "2")],
		melee: [blade("Power fist", "", "3", "3+", "6", "−2", "2")],
		fixed: "Base 32mm. 1 Dirgesinger, 1 Power fist, 1 Psychic Tempest.",
		abilities: [
			{
				name: "Xenos Hunter",
				rule: "While leading, attacks against a unit without Imperium or Chaos get +1 to hit."
			},
			{
				name: "Psychic Veil",
				rule: "Psychic. In your Command phase, roll one D6. On a 1, the unit suffers D3 mortal wounds. On a 2+, until your next Command phase the unit can only be selected as the target of a ranged attack if the attacking model is within 18\"."
			},
			{
				name: "Leader",
				rule: "Aquila Kill Team, Battleline Imperium Infantry, Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Subductor Squad, Vigilant Squad."
			},
			{
				name: "Authority of the Inquisition",
				rule: AUTHORITY
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Leader."
			}
		]
	},
	greyfax: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "3+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "5+"
		},
		ranged: [gun("Castigation", "Anti-Character 4+, Devastating Wounds, Precision, Psychic", "18\"", "1", "3+", "8", "−2", "3"), gun("Condemnor stake", "Anti-Psyker 2+, Devastating Wounds, Precision, Rapid Fire 1", "24\"", "1", "3+", "4", "0", "1")],
		melee: [blade("Master-crafted power sword", "", "4", "3+", "4", "−2", "2")],
		fixed: "Base 32mm. 1 Castigation, 1 Condemnor stake, 1 Master-crafted power sword.",
		abilities: [
			{
				name: "Psyoculum",
				rule: "While leading, ranged weapons in the unit have Anti-Psyker 4+."
			},
			{
				name: "No Mercy",
				rule: "While leading, attacks against a unit Below Half-strength get +1 to hit."
			},
			{
				name: "Leader",
				rule: "Battleline Imperium Infantry, Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad."
			},
			{
				name: "Authority of the Inquisition",
				rule: AUTHORITY
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Leader."
			}
		]
	},
	kroyle: {
		stats: {
			m: "12\"",
			t: "4",
			sv: "3+",
			w: "6",
			ld: "6+",
			oc: "2",
			inv: "4+"
		},
		ranged: [gun("Jindarii tox-cycler", "Anti-Monster 2+, Heavy, Precision", "36\"", "1", "2+", "6", "−2", "2"), gun("Stubcarbine", "Pistol", "12\"", "2", "2+", "5", "−2", "2")],
		melee: [blade("Butcher blade", "", "5", "3+", "4", "−2", "1"), blade("Garralisk’s claws and teeth", "Extra Attacks", "4", "4+", "5", "−1", "1")],
		fixed: "Base 32mm. 1 Jindarii tox-cycler, 1 Stubcarbine, 1 Butcher blade, 1 Garralisk’s claws and teeth.",
		abilities: [
			{
				name: "On My Signal, Fire!",
				rule: "After this unit has shot, select one enemy unit hit. Until the end of the phase, Agents of the Imperium or Imperium Infantry Battleline models from your army can re-roll the Hit roll against that unit."
			},
			{
				name: "Tox-cycler",
				rule: "In your Shooting phase, after shooting, if this model scored a hit with the tox-cycler, add 2 to that weapon’s Strength and Damage until the end of the battle, to a maximum Damage of 6."
			},
			{
				name: "Rules",
				rule: "Lone Operative, Scouts 6\", Assigned Agents."
			}
		]
	},
	vindicare: {
		stats: {
			m: "7\"",
			t: "4",
			sv: "6+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Exitus pistol", "Devastating Wounds, Ignores Cover, Pistol, Precision", "12\"", "3", "2+", "6", "−2", "3"), gun("Exitus rifle", "Devastating Wounds, Heavy, Ignores Cover, Precision", "48\"", "1", "2+", "8", "−3", "3+3")],
		melee: [blade("Vindicare combat knife", "", "4", "2+", "4", "−1", "1")],
		fixed: "Base 32mm. 1 Exitus pistol, 1 Exitus rifle, 1 Vindicare combat knife.",
		abilities: [
			{
				name: "Shieldbreaker",
				rule: "Once per battle, when selecting targets for the exitus rifle, fire a shieldbreaker round. Until the end of the phase, +1 to wound, and any successful wound is a Critical Wound."
			},
			{
				name: "Dead-shot",
				rule: "When selected to shoot, until it has shot, enemy units do not have Lone Operative, and hidden enemy units have +15\" detection range."
			},
			{
				name: "Shadow Assignment",
				rule: SHADOW
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Lone Operative, Stealth, Infiltrators."
			}
		]
	},
	artemis: {
		stats: {
			m: "6\"",
			t: "4",
			sv: "3+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Hellfire Extremis", "Anti-Infantry 4+, Devastating Wounds, Ignores Cover, Torrent", "12\"", "D6", "—", "4", "−1", "1")],
		melee: [blade("Master-crafted power weapon", "", "6", "2+", "5", "−2", "2")],
		fixed: "Base 32mm. 1 Hellfire Extremis, 1 Master-crafted power weapon.",
		abilities: [
			{
				name: "Tactical Instinct",
				rule: "While leading, weapons in the unit have Lethal Hits."
			},
			{
				name: "Unstoppable Champion",
				rule: "The first time this model is destroyed, at the end of the phase roll one D6. On a 2+, set it back up as close as possible, not engaged, with 1 wound remaining."
			},
			{
				name: "Leader",
				rule: "Aquila Kill Team, Deathwatch Kill Team, Deathwatch Terminator Squad, Fortis Kill Team, Indomitor Kill Team, Proteus Kill Team, Spectrus Kill Team."
			},
			{
				name: "Rules",
				rule: "Leader, Feel No Pain 6+, Assigned Agents."
			}
		]
	},
	inquisitor: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "4+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "5+"
		},
		ranged: [gun("Bolt pistol", "Pistol", "12\"", "1", "3+", "4", "0", "1")],
		melee: [blade("Inquisitorial melee weapon", "", "5", "3+", "4", "−2", "1")],
		fixed: "Base 32mm. 1 Inquisitorial melee weapon, 1 Bolt pistol, Blessed wardings.",
		abilities: [
			{
				name: "Leader",
				rule: "Aquila Kill Team, Battleline Imperium Infantry, Exaction Squad, Grey Knights Terminator Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad."
			},
			{
				name: "Authority of the Inquisition",
				rule: AUTHORITY
			},
			{
				name: "Power of the Rosette",
				rule: "Each time you target this model’s unit with a Stratagem, roll one D6: on a 3+, you gain 1 CP."
			},
			{
				name: "Blessed Wardings",
				rule: "While leading, models in the unit have a 6+ invulnerable save."
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Leader."
			}
		]
	},
	"ministorum-priest": {
		stats: {
			m: "6\"",
			t: "3",
			sv: "6+",
			w: "3",
			ld: "7+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Zealot’s vindictor", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "0", "1")],
		melee: [blade("Zealot’s vindictor", "Sustained Hits 1", "3", "4+", "5", "−1", "2")],
		fixed: "Base 32mm. 1 Zealot’s vindictor. Supporting: Imperial Navy Breachers.",
		abilities: [
			{
				name: "Zealot",
				rule: "Once per battle, in the Fight phase. Until the end of the phase, +3 Strength and Attacks on this model’s melee weapons."
			},
			{
				name: "Holy Hatred",
				rule: "While leading, melee weapons in the unit have Sustained Hits 1."
			},
			{
				name: "Support",
				rule: "Exaction Squad, Imperial Navy Breachers, Inquisitorial Agents, Sanctifiers, Sisters of Battle Squad, Subductor Squad, Vigilant Squad."
			},
			{
				name: "Rules",
				rule: "Support."
			}
		]
	},
	navigator: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "5+",
			w: "3",
			ld: "7+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Laspistol", "Pistol", "12\"", "1", "4+", "3", "0", "1")],
		melee: [blade("Force-orb cane", "Psychic", "3", "4+", "6", "−1", "3")],
		fixed: "Base 32mm. 1 Force-orb cane, 1 Laspistol.",
		abilities: [
			{
				name: "Third Eye",
				rule: "Psychic. At the start of your Shooting phase, select one visible enemy unit within 12\". It takes a Battle-shock test, at −2 if it is Infantry. If failed, it suffers 3 mortal wounds."
			},
			{
				name: "Gaze into the Empyrean",
				rule: "Psychic. Reinforcements cannot be set up within 12\" of this model."
			},
			{
				name: "Leader",
				rule: "Imperial Navy Breachers, Voidsmen-at-Arms."
			},
			{
				name: "Rules",
				rule: "Assigned Agents, Leader."
			}
		]
	},
	"rogue-trader": {
		stats: {
			m: "6\"",
			t: "3",
			sv: "4+",
			w: "4",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [
			gun("Household pistol", "Pistol, Devastating Wounds", "12\"", "2", "3+", "5", "−2", "2"),
			gun("Dartmask", "Anti-Infantry 2+, Pistol, Precision", "12\"", "1", "4+", "2", "−1", "3"),
			gun("Voltaic pistol", "Pistol, Sustained Hits 2", "12\"", "3", "3+", "4", "−2", "1"),
			gun("Laspistol", "Pistol", "12\"", "1", "4+", "3", "0", "1")
		],
		melee: [
			blade("Monomolecular cane-rapier", "", "4", "3+", "4", "−1", "1"),
			blade("Death Cult power blade", "Precision", "5", "2+", "4", "−2", "1"),
			blade("Close combat weapon", "", "1", "4+", "3", "0", "1")
		],
		fixed: "Rogue Trader 25mm: Household pistol, Monomolecular cane-rapier. Death Cult Assassin 25mm, W2 Ld 7+: Dartmask, Death Cult power blade. Lectro-maester 25mm, W2 Ld 7+: Voltaic pistol, Close combat weapon. Rejuvenant Adept 25mm, W2 Ld 7+: Laspistol, Healing Serum, Close combat weapon.",
		abilities: [
			{
				name: "Backroom Deals",
				rule: "If your army has one or more units with this ability, during Declare Battle Formations select one. While that unit is leading, models in it have Infiltrators."
			},
			{
				name: "Leader",
				rule: "Imperial Navy Breachers, Voidsmen-at-Arms."
			},
			{
				name: "Warrant of Trade",
				rule: "After both players have deployed, select up to D3 Imperium Battleline units and redeploy them. You may set them up in Strategic Reserves regardless of how many units are already there."
			},
			{
				name: "Healing Serum",
				rule: "At the start of your Command phase, if the bearer’s unit is below Starting Strength, return up to D3 destroyed non-Character models."
			},
			{
				name: "Rules",
				rule: "Leader."
			}
		]
	},
	"watch-master": {
		stats: {
			m: "6\"",
			t: "4",
			sv: "2+",
			w: "5",
			ld: "6+",
			oc: "1",
			inv: "4+"
		},
		ranged: [gun("Vigil spear", "", "24\"", "2", "2+", "4", "−1", "2")],
		melee: [blade("Vigil spear", "Lance", "6", "2+", "6", "−2", "3")],
		fixed: "Base 32mm. 1 Vigil spear. The spear has both profiles.",
		abilities: [
			{
				name: "Strategic Knowledge",
				rule: "While leading, the unit is eligible to shoot and declare a charge in a turn it Advanced or Fell Back."
			},
			{
				name: "Rites of Battle",
				rule: "Once per battle round, one unit from your army with this ability, when targeted with a Stratagem, reduces that use by 1 CP."
			},
			{
				name: "Leader",
				rule: "Aquila Kill Team, Deathwatch Kill Team, Deathwatch Terminator Squad, Fortis Kill Team, Indomitor Kill Team, Proteus Kill Team, Spectrus Kill Team."
			},
			{
				name: "Rules",
				rule: "Leader, Assigned Agents."
			}
		]
	}
};
function datasheetById(unitId) {
	return DATASHEETS[unitId];
}
function keywordsOf(unitId) {
	const row = KEYWORDS[unitId];
	if (!row) return [];
	return [...row.keywords.split(","), row.faction].map((word) => word.trim()).filter(Boolean);
}
var KEYWORDS = {
	"aquilon-gauntlets": {
		keywords: "Infantry, Imperium, Terminator",
		faction: "Adeptus Custodes"
	},
	"aquilon-talons": {
		keywords: "Infantry, Imperium, Terminator",
		faction: "Adeptus Custodes"
	},
	"blade-champion": {
		keywords: "Infantry, Character, Imperium",
		faction: "Adeptus Custodes"
	},
	"sentinel-guard": {
		keywords: "Infantry, Battleline, Imperium, Trusted Sentinel",
		faction: "Adeptus Custodes"
	},
	trajann: {
		keywords: "Infantry, Character, Epic Hero, Imperium",
		faction: "Adeptus Custodes"
	},
	"shield-captain": {
		keywords: "Infantry, Character, Imperium, Shield-Captain",
		faction: "Adeptus Custodes"
	},
	"venatari-kinetic": {
		keywords: "Infantry, Explosives, Fly, Imperium, Jump Pack",
		faction: "Adeptus Custodes"
	},
	"venatari-lances": {
		keywords: "Infantry, Explosives, Fly, Imperium, Jump Pack",
		faction: "Adeptus Custodes"
	},
	galatus: {
		keywords: "Vehicle, Dreadnought, Imperium, Walker",
		faction: "Adeptus Custodes"
	},
	achillus: {
		keywords: "Vehicle, Dreadnought, Imperium, Walker",
		faction: "Adeptus Custodes"
	},
	"shield-captain-allarus": {
		keywords: "Infantry, Character, Imperium, Shield-Captain, Terminator",
		faction: "Adeptus Custodes"
	},
	"shield-captain-jetbike": {
		keywords: "Mounted, Character, Fly, Imperium, Shield-Captain",
		faction: "Adeptus Custodes"
	},
	"custodian-guard": {
		keywords: "Infantry, Battleline, Imperium, Trusted Sentinel",
		faction: "Adeptus Custodes"
	},
	wardens: {
		keywords: "Infantry, Imperium, Trusted Sentinel",
		faction: "Adeptus Custodes"
	},
	allarus: {
		keywords: "Infantry, Imperium, Terminator",
		faction: "Adeptus Custodes"
	},
	vertus: {
		keywords: "Mounted, Fly, Imperium",
		faction: "Adeptus Custodes"
	},
	gyrfalcon: {
		keywords: "Mounted, Fly, Imperium",
		faction: "Adeptus Custodes"
	},
	pallas: {
		keywords: "Vehicle, Fly, Frame, Grav-Assault, Imperium",
		faction: "Adeptus Custodes"
	},
	coronus: {
		keywords: "Vehicle, Fly, Frame, Grav-Assault, Imperium, Transport",
		faction: "Adeptus Custodes"
	},
	caladius: {
		keywords: "Vehicle, Caladius, Fly, Frame, Grav-Assault, Imperium",
		faction: "Adeptus Custodes"
	},
	"caladius-annihilator": {
		keywords: "Vehicle, Caladius, Fly, Frame, Grav-Assault, Imperium",
		faction: "Adeptus Custodes"
	},
	telemon: {
		keywords: "Vehicle, Dreadnought, Imperium, Walker",
		faction: "Adeptus Custodes"
	},
	"knight-centura": {
		keywords: "Infantry, Anathema Psykana, Character, Imperium",
		faction: "Anathema Psykana"
	},
	prosecutors: {
		keywords: "Infantry, Anathema Psykana, Imperium",
		faction: "Anathema Psykana"
	},
	witchseekers: {
		keywords: "Infantry, Anathema Psykana, Imperium",
		faction: "Anathema Psykana"
	},
	rhino: {
		keywords: "Vehicle, Anathema Psykana, Dedicated Transport, Frame, Imperium, Smoke, Transport",
		faction: "Anathema Psykana"
	},
	vigilators: {
		keywords: "Infantry, Anathema Psykana, Imperium",
		faction: "Anathema Psykana"
	},
	callidus: {
		keywords: "Infantry, Character, Epic Hero, Imperium, Callidus Assassin, Officio Assassinorum",
		faction: "Agents of the Imperium"
	},
	culexus: {
		keywords: "Infantry, Character, Epic Hero, Grenades, Imperium, Culexus Assassin, Officio Assassinorum",
		faction: "Agents of the Imperium"
	},
	eversor: {
		keywords: "Infantry, Character, Epic Hero, Grenades, Imperium, Eversor Assassin, Officio Assassinorum",
		faction: "Agents of the Imperium"
	},
	coteaz: {
		keywords: "Infantry, Character, Epic Hero, Psyker, Imperium, Inquisitor, Coteaz, Ordo Malleus",
		faction: "Agents of the Imperium"
	},
	draxus: {
		keywords: "Infantry, Character, Epic Hero, Psyker, Grenades, Imperium, Inquisitor, Draxus, Ordo Xenos",
		faction: "Agents of the Imperium"
	},
	greyfax: {
		keywords: "Infantry, Character, Epic Hero, Psyker, Grenades, Imperium, Inquisitor, Greyfax, Ordo Hereticus",
		faction: "Agents of the Imperium"
	},
	kroyle: {
		keywords: "Mounted, Character, Epic Hero, Imperium, Grenades, Ordo Xenos, Inquisitor, Kroyle",
		faction: "Agents of the Imperium"
	},
	vindicare: {
		keywords: "Infantry, Character, Epic Hero, Smoke, Imperium, Vindicare Assassin, Officio Assassinorum",
		faction: "Agents of the Imperium"
	},
	artemis: {
		keywords: "Epic Hero, Character, Infantry, Grenades, Imperium, Deathwatch, Watch Captain Artemis, Ordo Xenos",
		faction: "Agents of the Imperium"
	},
	inquisitor: {
		keywords: "Infantry, Character, Grenades, Imperium, Inquisitor",
		faction: "Agents of the Imperium"
	},
	"ministorum-priest": {
		keywords: "Infantry, Character, Imperium, Ordo Hereticus, Ministorum Priest",
		faction: "Agents of the Imperium"
	},
	navigator: {
		keywords: "Infantry, Character, Psyker, Imperium, Voidfarers, Navigator",
		faction: "Agents of the Imperium"
	},
	"rogue-trader": {
		keywords: "Infantry, Character, Grenades, Imperium, Rogue Trader Entourage, Voidfarers",
		faction: "Agents of the Imperium"
	},
	"watch-master": {
		keywords: "Character, Infantry, Captain, Grenades, Imperium, Watch Master, Deathwatch, Ordo Xenos",
		faction: "Agents of the Imperium"
	}
};
var ARMY_RULES = [
	{
		name: "Martial Ka’tah",
		rule: "At the start of your Command phase, each unit with this ability becomes readied. While a unit is readied, it can use one ka’tah when that ka’tah’s timing window opens. You choose it then, not at the start of the turn. After the ability resolves, the unit is no longer readied, so it cannot use a second ka’tah that turn unless a Stratagem or other rule readies it again. A Shield Host’s favoured ka’tah adds an extra effect when that ka’tah is activated. It does not stop the unit using a different one.",
		parts: [
			{
				name: "Conservai",
				rule: "Your Command phase, one friendly readied unit. Until the end of the turn, being engaged or battle-shocked does not stop it being eligible to start an action, and starting an action does not stop it being eligible to shoot."
			},
			{
				name: "Calistus",
				rule: "Your Movement phase, when a friendly readied unit is selected to move. When it makes a Normal, Advance, or Fall Back move, it can move through all types of model."
			},
			{
				name: "Salvus",
				rule: "Your Shooting phase, when a friendly readied unit is selected to shoot. It can ignore modifiers to its Ballistic Skill, hit rolls, and wound rolls."
			},
			{
				name: "Dacatarai",
				rule: "Start of the Fight phase, one friendly readied unit. Its melee attacks against a non-Monster/Vehicle unit can re-roll hit rolls of 1."
			},
			{
				name: "Kaptaris",
				rule: "Start of the Fight phase, one friendly readied unit. Melee attacks that target your unit have −1 to hit."
			},
			{
				name: "Rendax",
				rule: "Fight phase, when a friendly readied unit is selected to fight. Its melee attacks have [Lethal Hits: Monster/Vehicle]."
			}
		]
	},
	{
		name: "Aegis of the Emperor",
		rule: "Friendly Adeptus Custodes units with this ability have Feel No Pain 5+ against mortal wounds."
	},
	{
		name: "Aquila Commander",
		rule: "On several Character units. Grants an extra Command Point at the start of every battle round."
	},
	{
		name: "Daughters of the Abyss",
		rule: "Friendly Anathema Psykana units with this ability have Feel No Pain 3+ against psychic attacks.",
		parts: [{
			name: "Psychic Null (Aura)",
			rule: "Friendly Adeptus Custodes units within 6\" have Feel No Pain 5+ against psychic attacks."
		}]
	}
];
var KEYWORD_RULES = [
	"Keywords are tags, not a glossary. A rule that names a keyword only applies to units that have it.",
	"Singular and plural are the same.",
	"Faction keywords and other keywords work the same in play. Faction keywords also decide what can go in the army.",
	"If a weapon ability is followed by a keyword, it only applies when the target has that keyword. [Lethal Hits: Vehicle] only triggers against a Vehicle.",
	"Duplicated abilities are not cumulative. Pick one instance each time the unit attacks.",
	"An attached unit has every keyword of its component units, but models do not gain each other’s keywords.",
	"Attacks target the unit. [Anti-Psyker 4+] works against the whole unit if any model in it is a Psyker.",
	"A unit with mixed keywords has all of them. Its models do not."
];
var FLY_RULE = "Models with Fly, and their units, can fly. When selected to make a Normal, Advance, Fall Back, or charge move, you may declare it takes to the skies. If you do, subtract 2\" from the maximum distance. While moving, ignore vertical distance, move through all models including Monsters and Vehicles, and move through all terrain.";
var WEAPON_ABILITIES = [
	{
		key: "anti",
		name: "Anti-X Y+",
		rule: "Against a target with keyword X, an unmodified wound roll of Y+ is a critical wound."
	},
	{
		key: "assault",
		name: "Assault",
		rule: "The unit can use assault shooting."
	},
	{
		key: "blast",
		name: "Blast",
		rule: "When gathering attack dice, add 1 extra dice for every 5 models in the target in the Select Targets step, rounding down. [Blast X] adds X dice per 5 models instead."
	},
	{
		key: "cleave",
		name: "Cleave X",
		rule: "If you selected only one target for all of that weapon’s attacks, add X extra attack dice for every 5 models in that target, rounding down."
	},
	{
		key: "close-quarters",
		name: "Close-quarters",
		rule: "The unit can use close-quarters shooting. With any other shooting type, each non-Monster/Vehicle model can use either its [Close-quarters] weapons or its other ranged weapons, not both. [Pistol] is identical."
	},
	{
		key: "pistol",
		name: "Pistol",
		rule: "Identical to [Close-quarters]. The unit can use close-quarters shooting. With any other shooting type, each non-Monster/Vehicle model can use either its [Pistol] weapons or its other ranged weapons, not both."
	},
	{
		key: "devastating wounds",
		name: "Devastating Wounds",
		rule: "A critical wound ends that attack’s sequence and inflicts mortal wounds equal to the weapon’s Damage, after normal damage. Those mortal wounds can damage only one model per critical wound. Leftovers are lost."
	},
	{
		key: "extra attacks",
		name: "Extra Attacks",
		rule: "Those models fight with every [Extra Attacks] weapon in addition to one other melee weapon, if they have one."
	},
	{
		key: "hazardous",
		name: "Hazardous",
		rule: "After the unit resolves its attacks, make one hazard roll for each [Hazardous] weapon you selected."
	},
	{
		key: "heavy",
		name: "Heavy",
		rule: "In your Shooting phase, +1 to the hit roll if the unit is unengaged, was not set up this turn, and no model in it has moved more than 3\" this turn."
	},
	{
		key: "ignores cover",
		name: "Ignores Cover",
		rule: "The target cannot have the benefit of cover against that attack, including from Stealth."
	},
	{
		key: "indirect fire",
		name: "Indirect Fire",
		rule: "The unit can use indirect shooting."
	},
	{
		key: "lance",
		name: "Lance",
		rule: "If the unit charged this turn, +1 to the wound roll."
	},
	{
		key: "lethal hits",
		name: "Lethal Hits",
		rule: "On a critical hit, you may choose for that attack to automatically wound. No wound roll is made, so it cannot be a critical wound."
	},
	{
		key: "melta",
		name: "Melta X",
		rule: "If the target was within half range in the Select Targets step, add X to Damage until those attacks are resolved."
	},
	{
		key: "one shot",
		name: "One Shot",
		rule: "Each such weapon can be selected once per battle. A returned model cannot use [One Shot] weapons it already fired. A new unit added to the army can use its [One Shot] weapons once."
	},
	{
		key: "precision",
		name: "Precision",
		rule: "If a visible Character is in the target, you may make that Character’s allocation group the current one until those attacks are resolved or that group is destroyed."
	},
	{
		key: "psychic",
		name: "Psychic",
		rule: "You can ignore any or all modifiers to that attack’s BS or WS and to the hit roll. These are psychic attacks."
	},
	{
		key: "rapid fire",
		name: "Rapid Fire X",
		rule: "Add X attack dice if the target was within half range in the Select Targets step."
	},
	{
		key: "sustained hits",
		name: "Sustained Hits X",
		rule: "A critical hit scores X additional hits."
	},
	{
		key: "torrent",
		name: "Torrent",
		rule: "The attack automatically hits."
	},
	{
		key: "twin-linked",
		name: "Twin-linked",
		rule: "You can re-roll the wound roll."
	}
];
var BY_LENGTH = [...WEAPON_ABILITIES].sort((a, b) => b.key.length - a.key.length);
function explainTag(tag) {
	const [head, qualifier] = tag.trim().replace(/^\[/, "").replace(/\]$/, "").split(":").map((part) => part.trim());
	if (!head) return void 0;
	const found = BY_LENGTH.find((ability) => {
		const text = head.toLowerCase();
		return text === ability.key || text.startsWith(`${ability.key} `) || text.startsWith(`${ability.key}-`);
	});
	if (!found) return void 0;
	return {
		name: found.name,
		rule: found.rule,
		only: qualifier || void 0
	};
}
var CATEGORIES = [
	"Characters",
	"Battleline",
	"Infantry",
	"Elites",
	"Fast Attack",
	"Heavy Support",
	"Transports",
	"Imperial Agents",
	"Imperial Retinue",
	"Knights",
	"Armigers",
	"Titans"
];
var flat = (points) => [
	points,
	points,
	points
];
var UNITS = [
	{
		id: "trajann",
		name: "Trajann Valoris",
		category: "Characters",
		sizes: [{
			models: 1,
			costs: [265]
		}],
		maxCopies: 1
	},
	{
		id: "shield-captain",
		name: "Shield-Captain",
		category: "Characters",
		sizes: [{
			models: 1,
			costs: [
				180,
				200,
				200
			]
		}]
	},
	{
		id: "shield-captain-allarus",
		name: "Shield-Captain Allarus",
		category: "Characters",
		sizes: [{
			models: 1,
			costs: [
				185,
				205,
				205
			]
		}]
	},
	{
		id: "shield-captain-jetbike",
		name: "Shield-Captain jetbike",
		category: "Characters",
		sizes: [{
			models: 1,
			costs: [
				205,
				225,
				225
			]
		}]
	},
	{
		id: "blade-champion",
		name: "Blade Champion",
		category: "Characters",
		sizes: [{
			models: 1,
			costs: [
				175,
				175,
				195
			]
		}]
	},
	{
		id: "sentinel-guard",
		name: "Sentinel Guard Sodality",
		category: "Battleline",
		battleline: true,
		sizes: [{
			models: 3,
			costs: [
				240,
				240,
				270
			]
		}],
		note: "Sheet marks Spears beside the third cost."
	},
	{
		id: "custodian-guard",
		name: "Custodian Guard Sodality",
		category: "Battleline",
		battleline: true,
		sizes: [{
			models: 3,
			costs: [
				240,
				240,
				270
			]
		}]
	},
	{
		id: "wardens",
		name: "Custodian Wardens",
		category: "Elites",
		sizes: [{
			models: 2,
			costs: [
				200,
				230,
				230
			]
		}, {
			models: 3,
			costs: [
				295,
				325,
				325
			]
		}]
	},
	{
		id: "allarus",
		name: "Allarus Custodians",
		category: "Elites",
		sizes: [{
			models: 2,
			costs: [
				180,
				180,
				210
			]
		}, {
			models: 3,
			costs: [
				270,
				270,
				300
			]
		}]
	},
	{
		id: "aquilon-gauntlets",
		name: "Aquilon Gauntlets",
		category: "Elites",
		sizes: [{
			models: 3,
			costs: [
				285,
				285,
				315
			]
		}]
	},
	{
		id: "aquilon-talons",
		name: "Aquilon Talons",
		category: "Elites",
		sizes: [{
			models: 3,
			costs: [
				275,
				275,
				305
			]
		}]
	},
	{
		id: "venatari-kinetic",
		name: "Venatari (Kinetic Destroyers)",
		category: "Fast Attack",
		sizes: [{
			models: 3,
			costs: [
				255,
				255,
				280
			]
		}],
		note: "Sheet marks Pistols beside the third cost."
	},
	{
		id: "venatari-lances",
		name: "Venatari (Verutum Lances)",
		category: "Fast Attack",
		sizes: [{
			models: 3,
			costs: [
				270,
				270,
				300
			]
		}],
		note: "Sheet marks Spears beside the third cost."
	},
	{
		id: "vertus",
		name: "Vertus Praetors",
		category: "Fast Attack",
		sizes: [{
			models: 2,
			costs: [
				220,
				240,
				240
			]
		}, {
			models: 3,
			costs: [
				330,
				350,
				350
			]
		}]
	},
	{
		id: "gyrfalcon",
		name: "Gyrfalcon jetbike Sodality",
		category: "Fast Attack",
		sizes: [{
			models: 2,
			costs: [
				260,
				280,
				280
			]
		}]
	},
	{
		id: "telemon",
		name: "Telemon",
		category: "Heavy Support",
		sizes: [{
			models: 1,
			costs: [
				280,
				310,
				310
			]
		}]
	},
	{
		id: "galatus",
		name: "Contemptor-Galatus",
		category: "Elites",
		sizes: [{
			models: 1,
			costs: [
				220,
				220,
				250
			]
		}]
	},
	{
		id: "achillus",
		name: "Contemptor-Achillus",
		category: "Elites",
		sizes: [{
			models: 1,
			costs: [
				230,
				230,
				260
			]
		}]
	},
	{
		id: "pallas",
		name: "Pallas Grav-Attack",
		category: "Fast Attack",
		sizes: [{
			models: 1,
			costs: flat(135)
		}]
	},
	{
		id: "coronus",
		name: "Coronus Grav-Carrier",
		category: "Transports",
		sizes: [{
			models: 1,
			costs: [
				225,
				225,
				245
			]
		}]
	},
	{
		id: "caladius",
		name: "Caladius Grav-Tank",
		category: "Heavy Support",
		sizes: [{
			models: 1,
			costs: [
				230,
				230,
				260
			]
		}]
	},
	{
		id: "caladius-annihilator",
		name: "Caladius Annihilator",
		category: "Heavy Support",
		sizes: [{
			models: 1,
			costs: [
				250,
				250,
				280
			]
		}]
	},
	{
		id: "knight-centura",
		name: "Knight Centura",
		category: "Characters",
		sizes: [{
			models: 1,
			costs: flat(55)
		}]
	},
	{
		id: "prosecutors",
		name: "Prosecutors",
		category: "Infantry",
		sizes: [
			{
				models: 4,
				costs: flat(45)
			},
			{
				models: 5,
				costs: flat(50)
			},
			{
				models: 9,
				costs: flat(80)
			},
			{
				models: 10,
				costs: flat(90)
			}
		]
	},
	{
		id: "vigilators",
		name: "Vigilators",
		category: "Infantry",
		sizes: [
			{
				models: 4,
				costs: flat(50)
			},
			{
				models: 5,
				costs: flat(55)
			},
			{
				models: 9,
				costs: flat(90)
			},
			{
				models: 10,
				costs: flat(100)
			}
		]
	},
	{
		id: "witchseekers",
		name: "Witchseekers",
		category: "Infantry",
		sizes: [
			{
				models: 4,
				costs: flat(55)
			},
			{
				models: 5,
				costs: flat(60)
			},
			{
				models: 9,
				costs: flat(100)
			},
			{
				models: 10,
				costs: flat(110)
			}
		]
	},
	{
		id: "rhino",
		name: "Psykana Rhino",
		category: "Transports",
		sizes: [{
			models: 1,
			costs: [
				70,
				70,
				70
			],
			fourthPlus: 80
		}]
	},
	{
		id: "callidus",
		name: "Callidus Assassin",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [100]
		}],
		maxCopies: 1
	},
	{
		id: "culexus",
		name: "Culexus Assassin",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [85]
		}],
		maxCopies: 1
	},
	{
		id: "eversor",
		name: "Eversor Assassin",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [110]
		}],
		maxCopies: 1
	},
	{
		id: "coteaz",
		name: "Inquisitor Coteaz",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [95]
		}],
		maxCopies: 1
	},
	{
		id: "draxus",
		name: "Inquisitor Draxus",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [110]
		}],
		maxCopies: 1
	},
	{
		id: "greyfax",
		name: "Inquisitor Greyfax",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [65]
		}],
		maxCopies: 1
	},
	{
		id: "kroyle",
		name: "Inquisitor Kroyle",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [100]
		}],
		maxCopies: 1
	},
	{
		id: "vindicare",
		name: "Vindicare Assassin",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [125]
		}],
		maxCopies: 1
	},
	{
		id: "artemis",
		name: "Watch Captain Artemis",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: [75]
		}],
		maxCopies: 1
	},
	{
		id: "inquisitor",
		name: "Inquisitor",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: flat(65)
		}]
	},
	{
		id: "ministorum-priest",
		name: "Ministorum Priest",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: flat(40)
		}]
	},
	{
		id: "navigator",
		name: "Navigator",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: flat(75)
		}]
	},
	{
		id: "rogue-trader",
		name: "Rogue Trader Entourage",
		category: "Imperial Agents",
		sizes: [{
			models: 4,
			costs: flat(105)
		}]
	},
	{
		id: "watch-master",
		name: "Watch Master",
		category: "Imperial Agents",
		sizes: [{
			models: 1,
			costs: flat(105)
		}]
	}
];
function unitCategory(unit, detachments) {
	if (unit.id === "prosecutors" && detachments.includes("vigil")) return "Battleline";
	return unit.category;
}
/** How many units from a filter can be in one army. Unlisted filters use the per-unit copy rules only. */
var CATEGORY_LIMITS = {
	"Imperial Agents": 2,
	"Imperial Retinue": 2,
	Knights: 1,
	Armigers: 3,
	Titans: 1
};
function categoryLimit(category) {
	return CATEGORY_LIMITS[category];
}
function copyLimit(unit, detachments = []) {
	if (unit.maxCopies != null) return unit.maxCopies;
	if (unit.battleline || unit.id === "prosecutors" && detachments.includes("vigil")) return 6;
	return 3;
}
function unitById(id) {
	return UNITS.find((unit) => unit.id === id);
}
function sizeOf(unit, models) {
	return unit.sizes.find((size) => size.models === models);
}
function costAt(size, copyIndex) {
	if (copyIndex < size.costs.length) return size.costs[copyIndex];
	return size.fourthPlus ?? size.costs[size.costs.length - 1];
}
/** One version ladder for the datasheet, then the extra cost of the chosen model count. */
function squadCost(unit, models, copyIndex) {
	const parts = costParts(unit, models, copyIndex);
	if (!parts) return 0;
	return parts.unit + parts.additionalUnit + parts.additionalModels;
}
function costParts(unit, models, copyIndex) {
	const base = unit.sizes[0];
	const size = sizeOf(unit, models);
	if (!base || !size) return null;
	const unitCost = base.costs[0] ?? 0;
	return {
		unit: unitCost,
		additionalUnit: costAt(base, copyIndex) - unitCost,
		additionalModels: (size.costs[0] ?? unitCost) - unitCost
	};
}
function priceLine(unit, models, copyIndex, extras) {
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
function costNote(unit, models, copies) {
	const base = unit.sizes[0];
	if (!base || copies < 1) return "";
	const unitCost = base.costs[0] ?? 0;
	const prices = Array.from({ length: copies }, (_, index) => costAt(base, index));
	const parts = [];
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
function ordinal(n) {
	const teen = n % 100;
	if (teen >= 11 && teen <= 13) return `${n}th`;
	switch (n % 10) {
		case 1: return `${n}st`;
		case 2: return `${n}nd`;
		case 3: return `${n}rd`;
		default: return `${n}th`;
	}
}
var INFANTRY = [
	"sentinel-guard",
	"custodian-guard",
	"wardens"
];
var TERMINATORS = [
	"allarus",
	"aquilon-gauntlets",
	"aquilon-talons"
];
var JETBIKES = ["vertus", "gyrfalcon"];
var SISTERS = [
	"prosecutors",
	"vigilators",
	"witchseekers"
];
var AGENT_BATTLELINE_LEADERS = /* @__PURE__ */ new Set([
	"coteaz",
	"draxus",
	"greyfax",
	"inquisitor"
]);
/** Body datasheets a character may join. Venatari are jump packs, so neither Trajann nor the jetbike captain can join them. */
var LEADER_TARGETS = {
	trajann: [...INFANTRY, ...TERMINATORS],
	"shield-captain": INFANTRY,
	"blade-champion": INFANTRY,
	"shield-captain-allarus": TERMINATORS,
	"shield-captain-jetbike": JETBIKES,
	"knight-centura": SISTERS
};
function isCharacter(unitId) {
	return unitId in LEADER_TARGETS;
}
function canLead(leaderUnitId, bodyUnitId, detachments = []) {
	if (LEADER_TARGETS[leaderUnitId]?.includes(bodyUnitId)) return true;
	if (!AGENT_BATTLELINE_LEADERS.has(leaderUnitId)) return false;
	const body = unitById(bodyUnitId);
	return body != null && unitCategory(body, detachments) === "Battleline";
}
function attachSummary(unitId) {
	switch (unitId) {
		case "trajann": return "Attaches to infantry and terminators. Not jump packs.";
		case "shield-captain":
		case "blade-champion": return "Attaches to infantry.";
		case "shield-captain-allarus": return "Attaches to terminators.";
		case "shield-captain-jetbike": return "Attaches to jetbikes. Not Venatari.";
		case "knight-centura": return "Attaches to Sisters squads. Not the Rhino.";
		case "coteaz":
		case "draxus":
		case "greyfax":
		case "inquisitor": return "Attaches to Battleline.";
		default: return null;
	}
}
var pick = (id, choices, optional) => ({
	id,
	choices,
	optional
});
var choice = (id, name, points, profiles) => ({
	id,
	name,
	points,
	profiles
});
var GEAR = {
	"shield-captain": [pick("weapon", [
		choice("spear", "Guardian Spear", void 0, ["Guardian spear"]),
		choice("axe", "Castellan Axe", void 0, ["Castellan axe"]),
		choice("shield-pyrithite", "Shield + Pyrithite Spear", 25, ["Pyrithite spear"]),
		choice("shield-eternity", "Shield + Eternity Blade", 25, ["Eternity-pattern paragon blade"])
	])],
	"shield-captain-allarus": [pick("weapon", [choice("spear", "Guardian Spear", void 0, ["Guardian spear"]), choice("axe", "Castellan Axe", void 0, ["Castellan axe"])])],
	"shield-captain-jetbike": [pick("gun", [choice("salvo", "Salvo Launcher", void 0, ["Salvo launcher"]), choice("hurricane", "Hurricane Bolter", void 0, ["Hurricane bolter"])])],
	"sentinel-guard": [pick("vexilla", [choice("vexilla", "Vexilla")], true)],
	"custodian-guard": [pick("vexilla", [choice("vexilla", "Vexilla")], true)],
	wardens: [pick("weapon", [choice("spear", "Guardian Spears", void 0, ["Guardian spear"]), choice("axe", "Castellan Axes", void 0, ["Castellan axe"])]), pick("vexilla", [choice("vexilla", "Vexilla")], true)],
	allarus: [pick("weapon", [choice("spear", "Guardian Spears", void 0, ["Guardian spear"]), choice("axe", "Castellan Axes", void 0, ["Castellan axe"])]), pick("vexilla", [choice("vexilla", "Vexilla")], true)],
	"aquilon-talons": [pick("gun", [choice("bolter", "Lastrum Storm Bolters", void 0, ["Lastrum storm bolter"]), choice("firepike", "Infernus Firepikes", void 0, ["Infernus firepike"])])],
	vertus: [pick("gun", [choice("salvo", "Salvo Launchers", void 0, ["Salvo launcher"]), choice("hurricane", "Hurricane Bolters", void 0, ["Hurricane bolter"])])],
	gyrfalcon: [pick("gun", [
		choice("lastrum", "Lastrum Bolt Cannons", void 0, ["Lastrum bolt cannon"]),
		choice("adrathic", "Adrathic Devastators", void 0, ["Adrathic devastator"]),
		choice("arachnus", "Arachnus Volley Cannons", void 0, ["Arachnus volley cannon"]),
		choice("corvae", "Twin Corvae Las-pulsers", void 0, ["Twin Corvae las-pulser"])
	])],
	telemon: [pick("arm", [
		choice("fists", "Dual Caestus Fists, 2 Twin Cascade Projectors", void 0, ["Dual Caestus Fists", "Twin Neutronium Cascade Projectors"]),
		choice("adrathic", "Adrathic Desolator, Caestus Fist, Twin Cascade Projector", void 0, [
			"Adrathic Desolator",
			"Caestus Fist",
			"Twin Neutronium Cascade Projectors"
		]),
		choice("arachnus", "Arachnus Storm Cannon, Caestus Fist, Twin Cascade Projector", void 0, [
			"Arachnus Storm Cannon",
			"Caestus Fist",
			"Twin Neutronium Cascade Projectors"
		]),
		choice("iliastus", "Iliastus Accelerator Culverin, Caestus Fist, Twin Cascade Projector", void 0, [
			"Iliastus Accelerator Culverin",
			"Caestus Fist",
			"Twin Neutronium Cascade Projectors"
		])
	])],
	achillus: [pick("guns", [
		choice("bolter", "2 Lastrum Storm Bolters", void 0, ["Lastrum storm bolter"]),
		choice("adrathic", "2 Adrathic Combi-destructors", void 0, ["Adrathic combi-destructor"]),
		choice("infernus", "2 Twin Infernus Incinerators", void 0, ["Twin Infernus incinerator"])
	])],
	pallas: [pick("gun", [choice("blaze", "Twin Arachnus Blaze Cannon", void 0, ["Twin Arachnus blaze cannon"]), choice("fusil", "Twin Iliastus Accelerator Fusil", void 0, ["Twin Iliastus accelerator fusil"])])],
	coronus: [pick("sponson", [choice("lastrum", "Twin Lastrum Bolt Cannon", void 0, ["Twin Lastrum bolt cannon"]), choice("cascade", "Twin Neutronium Cascade Projectors", void 0, ["Twin Neutronium cascade projectors"])])],
	caladius: [pick("sponson", [choice("lastrum", "Twin Lastrum Bolt Cannon", void 0, ["Twin Lastrum bolt cannon"]), choice("cascade", "Twin Neutronium Cascade Projectors", void 0, ["Twin Neutronium cascade projectors"])])],
	"caladius-annihilator": [pick("sponson", [choice("lastrum", "Twin Lastrum Bolt Cannon", void 0, ["Twin Lastrum bolt cannon"]), choice("cascade", "Twin Neutronium Cascade Projectors", void 0, ["Twin Neutronium cascade projectors"])])],
	"knight-centura": [pick("weapon", [
		choice("blade", "Executioner Greatblade", void 0, ["Executioner greatblade"]),
		choice("boltgun", "Master-crafted Boltgun", void 0, ["Master-crafted boltgun", "Gun stock"]),
		choice("flamer", "Master-crafted Flamer", void 0, ["Master-crafted flamer", "Gun stock"])
	])],
	rhino: [pick("missile", [choice("hunter", "Hunter-killer Missile", void 0, ["Hunter-killer missile"])], true)]
};
var ARMED = {
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
	"ministorum-priest": "Zealot’s Vindictor",
	navigator: "Laspistol, Force-orb Cane",
	"watch-master": "Vigil Spear"
};
function gearGroups(unitId) {
	return GEAR[unitId] ?? [];
}
function armedWith(unitId) {
	return ARMED[unitId];
}
function gearPoints(unitId, gear) {
	let total = 0;
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id];
		if (group.optional) {
			if (!picked) continue;
		}
		const choice = group.choices.find((item) => item.id === picked) ?? (group.optional ? void 0 : group.choices[0]);
		total += choice?.points ?? 0;
	}
	return total;
}
function counted(label, models) {
	return label.split(",").map((part) => {
		const trimmed = part.trim();
		const leading = /^(\d+)\s+(.+)$/.exec(trimmed);
		const each = leading ? Number(leading[1]) : 1;
		return `${leading ? leading[2] : trimmed} x${each * models}`;
	}).join(", ");
}
function gearLineCounted(unitId, gear, models) {
	const names = [];
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id];
		const choice = group.optional ? picked ? group.choices.find((item) => item.id === picked) : void 0 : group.choices.find((item) => item.id === picked) ?? group.choices[0];
		if (!choice) continue;
		names.push(group.optional ? `${choice.name} x1` : counted(choice.name, models));
	}
	const fixed = armedWith(unitId);
	if (fixed) names.push(counted(fixed, models));
	return names.join(", ");
}
function gearLine(unitId, gear, includeFixed = true) {
	const names = [];
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id];
		const choice = group.optional ? picked ? group.choices.find((item) => item.id === picked) : void 0 : group.choices.find((item) => item.id === picked) ?? group.choices[0];
		if (choice) names.push(choice.name);
	}
	if (includeFixed) {
		const fixed = armedWith(unitId);
		if (fixed) names.push(fixed);
	}
	return names.join(", ");
}
function weaponTaken(unitId, weaponName, gear) {
	if (!new Set(gearGroups(unitId).flatMap((group) => group.choices.flatMap((item) => item.profiles ?? []).map((name) => name.toLowerCase()))).has(weaponName.toLowerCase())) return true;
	const active = /* @__PURE__ */ new Set();
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id] ?? (group.optional ? void 0 : group.choices[0]?.id);
		group.choices.find((item) => item.id === picked)?.profiles?.forEach((name) => active.add(name.toLowerCase()));
	}
	return active.has(weaponName.toLowerCase());
}
function cleanGear(unitId, gear) {
	if (!gear || typeof gear !== "object") return void 0;
	const source = gear;
	const next = {};
	for (const group of gearGroups(unitId)) {
		const value = source[group.id];
		if (typeof value !== "string" || !group.choices.some((item) => item.id === value)) continue;
		next[group.id] = value;
	}
	return Object.keys(next).length ? next : void 0;
}
function WeaponLine({ weapon }) {
	const melee = weapon.range === "Melee";
	const skill = weapon.skill.replace(/^BS |^WS /, "");
	const tags = weapon.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [];
	const [open, setOpen] = (0, import_react.useState)(null);
	const explained = open ? explainTag(open) : void 0;
	const cells = [
		["R", weapon.range],
		[melee ? "WS" : "BS", skill],
		["A", weapon.a],
		["S", weapon.s],
		["AP", weapon.ap],
		["D", weapon.d]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-lg border border-line bg-bg px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: weapon.name
			}),
			tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 flex flex-wrap gap-1",
				children: tags.map((tag) => explainTag(tag) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(open === tag ? null : tag),
					className: `rounded-lg border px-2 py-1 text-xs ${open === tag ? "border-gold text-gold" : "border-line text-muted"}`,
					children: tag
				}, tag) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center text-xs text-muted",
					children: tag
				}, tag))
			}) : null,
			explained ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [explained.only ? `Only against ${explained.only}. ` : "", explained.rule]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-2 grid grid-cols-6 gap-1 text-center",
				children: cells.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] tracking-wide text-gold uppercase",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "text-xs break-words",
						children: value
					})]
				}, label))
			})
		]
	});
}
function KeywordLine({ text }) {
	const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: parts.map((part, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [index > 0 ? ", " : "", part === "Fly" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen((current) => !current),
				className: "text-gold underline",
				children: "Fly"
			}) : part] }, `${part}-${index}`))
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: FLY_RULE
		}) : null]
	});
}
function WeaponBlock({ title, weapons }) {
	if (weapons.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-xs tracking-wide text-gold uppercase",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 flex flex-col gap-2",
		children: weapons.map((weapon) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponLine, { weapon }, `${title}-${weapon.name}`))
	})] });
}
function WargearPicker({ unitId, gear, onGear }) {
	const groups = gearGroups(unitId);
	if (groups.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex max-w-full min-w-0 flex-col items-start gap-1.5",
		children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearGroupControl, {
			group,
			gear,
			onGear
		}, group.id))
	});
}
function GearGroupControl({ group, gear, onGear }) {
	if (group.optional) {
		const item = group.choices[0];
		if (!item) return null;
		const on = gear?.[group.id] === item.id;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-pressed": on,
			onClick: () => onGear(group.id, on ? "" : item.id),
			className: `inline-flex max-w-full items-center gap-2 rounded-full border px-1 py-1 pr-3 text-left text-xs ${on ? "border-gold bg-gold/15 text-fg" : "border-dashed border-line text-muted"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `grid size-6 shrink-0 place-items-center rounded-full border ${on ? "border-gold bg-gold text-bg" : "border-line bg-bg text-muted"}`,
					children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3.5",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-3.5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `shrink-0 rounded-full px-1.5 py-0.5 text-[10px] tracking-wide uppercase ${on ? "bg-gold text-bg" : "bg-raised text-muted"}`,
					children: item.points ? `+${item.points} pts` : "Optional"
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponMenu, {
		group,
		gear,
		onGear
	});
}
function WeaponMenu({ group, gear, onGear }) {
	const selected = gear?.[group.id] ?? group.choices[0]?.id ?? "";
	const current = group.choices.find((item) => item.id === selected) ?? group.choices[0];
	const label = current ? `${current.name}${current.points ? ` +${current.points} pts` : ""}` : "Weapon";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-flex max-w-full min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-gold/50 bg-bg px-2 text-xs text-fg shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-0 truncate",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
				className: "size-3.5 shrink-0 text-gold",
				"aria-hidden": "true"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			"aria-label": "Weapon",
			value: selected,
			onChange: (event) => onGear(group.id, event.target.value),
			className: "absolute inset-0 h-full w-full cursor-pointer opacity-0",
			children: group.choices.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
				value: item.id,
				children: [item.name, item.points ? ` +${item.points} pts` : ""]
			}, item.id))
		})]
	});
}
function DatasheetView({ unitId, unitName, gear, enhancement, listOnly = false, onClose }) {
	const sheet = datasheetById(unitId);
	const keywords = KEYWORDS[unitId];
	(0, import_react.useEffect)(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	if (!sheet) return null;
	const stats = [
		["M", sheet.stats.m],
		["T", sheet.stats.t],
		["Sv", sheet.stats.sv],
		["W", sheet.stats.w],
		["Ld", sheet.stats.ld],
		["OC", sheet.stats.oc],
		sheet.stats.inv ? ["Inv", sheet.stats.inv] : null,
		sheet.stats.damaged ? ["Damaged", sheet.stats.damaged] : null
	].filter((item) => item != null);
	const ranged = listOnly ? sheet.ranged.filter((weapon) => weaponTaken(unitId, weapon.name, gear)) : sheet.ranged;
	const melee = listOnly ? sheet.melee.filter((weapon) => weaponTaken(unitId, weapon.name, gear)) : sheet.melee;
	const selectedKit = gearLine(unitId, gear);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": `${unitName} datasheet`,
			className: "sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: unitName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close datasheet",
						onClick: onClose,
						className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-3 flex flex-wrap gap-2",
					children: stats.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-line bg-bg px-2 py-1 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-[10px] tracking-wide text-muted uppercase",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-sm",
							children: value
						})]
					}, label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-4",
					children: [
						listOnly && selectedKit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: selectedKit
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponBlock, {
							title: "Ranged",
							weapons: ranged
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponBlock, {
							title: "Melee",
							weapons: melee
						}),
						listOnly ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: "Equipped"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: sheet.fixed
							}),
							sheet.swaps ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted",
								children: sheet.swaps
							}) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs tracking-wide text-gold uppercase",
							children: "Abilities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 flex flex-col gap-3",
							children: [sheet.abilities.map((ability) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: ability.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: ability.rule
							})] }, ability.name)), enhancement ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: enhancement.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: enhancement.rule
							})] }) : null]
						})] }),
						keywords ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: "Keywords"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeywordLine, { text: keywords.keywords }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: ["Faction: ", keywords.faction]
							})
						] }) : null
					]
				})
			]
		})
	});
}
var CUSTODES = [
	"shield-captain",
	"shield-captain-allarus",
	"shield-captain-jetbike",
	"blade-champion"
];
var INFANTRY_CHARACTERS = CUSTODES.filter((id) => id !== "shield-captain-jetbike");
var CAPTAINS = [
	"shield-captain",
	"shield-captain-allarus",
	"shield-captain-jetbike"
];
var DREADS = [
	"telemon",
	"galatus",
	"achillus"
];
var GRAV = [
	"pallas",
	"caladius",
	"caladius-annihilator",
	"coronus"
];
var SENTINELS = [
	"sentinel-guard",
	"custodian-guard",
	"wardens"
];
var EAGLE = [
	"shield-captain",
	"blade-champion",
	"sentinel-guard",
	"custodian-guard",
	"wardens",
	"venatari-kinetic",
	"venatari-lances",
	"vertus",
	"gyrfalcon",
	"shield-captain-jetbike"
];
var DETACHMENTS = [
	{
		id: "guardians",
		name: "Guardians of the Throne",
		dispositions: ["Priority Assets", "Purge the Foe"],
		dp: 3,
		rule: {
			name: "Martial Mastery",
			text: "In the Fight phase, when a friendly Adeptus Custodes unit is selected to fight, its melee attacks have [Sustained Hits 1] or [Lethal Hits]."
		},
		stratagems: [
			{
				name: "Superhuman Focus",
				cp: 1,
				when: "The end of any phase, on one friendly Adeptus Custodes unit that is not readied.",
				rule: "It is readied. You cannot select the same unit more than once per battle round."
			},
			{
				name: "Unlimited Endurance",
				cp: 1,
				when: "Your Movement phase, when a friendly Adeptus Custodes unit ends an Advance.",
				rule: "Until the end of the turn its ranged attacks have [Assault], and that Advance does not stop it declaring a charge."
			},
			{
				name: "Shield of Honour",
				cp: 1,
				when: "The start of the Fight phase, on one friendly Adeptus Custodes Infantry or Mounted unit.",
				rule: "When an enemy model engaged with your unit selects targets, if it does not select your unit as the target of all of its attacks, that model’s attacks have −1 to hit and −1 to wound."
			},
			{
				name: "Prime Target",
				cp: 1,
				when: "Your Shooting phase, when a friendly Adeptus Custodes unit is selected to shoot.",
				rule: "Its ranged attacks can re-roll one hit roll, one wound roll, and one damage roll."
			},
			{
				name: "In Auramite Clad",
				cp: 1,
				when: "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes unit, excluding Custodian Wardens.",
				rule: "Attacks that target your unit have −1 AP until that enemy unit has attacked."
			},
			{
				name: "Swift as the Eagle",
				cp: 1,
				when: "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Trusted Sentinel unit.",
				rule: "That Trusted Sentinel unit can make a Normal move of up to D3+3\"."
			}
		]
	},
	{
		id: "aquilan",
		name: "Aquilan Shield",
		dispositions: ["Take and Hold"],
		dp: 1,
		unique: true,
		rule: {
			name: "Gilded Guardians",
			text: "While a friendly Adeptus Custodes unit, excluding Monster and Vehicle units, is within range of an objective, ranged attacks that target it with Strength greater than its Toughness have −1 to wound."
		},
		katah: {
			name: "Salvus",
			effect: "This unit’s ranged attacks have +6\" Range."
		},
		stratagems: [
			{
				name: "Manoeuvre and Fire",
				cp: 1,
				when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to Fall Back.",
				rule: "That move does not stop it shooting or declaring a charge."
			},
			{
				name: "Tip of the Talon",
				cp: 1,
				when: "Your Shooting phase, when a friendly Adeptus Custodes unit is selected to shoot.",
				rule: "Its ranged attacks against an enemy unit within 9\" have +1 Strength."
			},
			{
				name: "Rapid Reactions",
				cp: 1,
				when: "Your opponent’s Movement phase, when an enemy unit ends a Fall Back.",
				rule: "Target one friendly Adeptus Custodes Infantry unit that was engaged with that enemy unit at the start of the phase. Your unit shoots as normal, but can only target that enemy unit."
			}
		]
	},
	{
		id: "auric",
		name: "Auric Champions",
		dispositions: ["Purge the Foe"],
		dp: 1,
		rule: {
			name: "Assemblage of Might",
			text: "In your Command phase, select one enemy unit to be a dreadful foe until the start of your next Command phase. Friendly Adeptus Custodes Character models’ attacks against a dreadful foe have +1 to wound."
		},
		stratagems: [{
			name: "Gilded Champion",
			cp: 1,
			when: "Any phase, when a friendly Adeptus Custodes Character has used a once-per-battle, per-unit datasheet ability.",
			rule: "It can use that ability one additional time, but not in the same phase. You cannot use this Stratagem on the same Character more than once per battle."
		}, {
			name: "Duty Unto Death",
			cp: 1,
			when: "The Fight phase, when an enemy unit targets a friendly Adeptus Custodes unit.",
			rule: "When a model in your unit is destroyed, if your unit has not been selected to fight this phase, roll one D6, adding 1 if that model is a Character. On a 3+, do not remove it. When your unit has fought, or at the end of the phase, remove it."
		}]
	},
	{
		id: "dread-host",
		name: "Dread Host",
		dispositions: ["Purge the Foe"],
		dp: 1,
		unique: true,
		rule: {
			name: "Instruments of the Emperor’s Wrath",
			text: "Friendly Adeptus Custodes units can re-roll charge rolls."
		},
		katah: {
			name: "Dacatarai",
			effect: "When an enemy unit engaged with your unit piles in or consolidates, subtract 2\" from that move."
		},
		stratagems: [
			{
				name: "Lightning Wrath",
				cp: 1,
				when: "The Fight phase, when a friendly Adeptus Custodes unit is selected to pile in.",
				rule: "That pile-in can be up to D3+3\"."
			},
			{
				name: "Golden Light of the Moiraides",
				cp: 2,
				when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to ingress.",
				rule: "Until the start of your next turn, attacks that target it have −1 to hit, and enemy units cannot target it with snap shooting attacks."
			},
			{
				name: "Preternatural Rapidity",
				cp: 1,
				when: "Your Movement phase, when a friendly Adeptus Custodes unit ends an Advance.",
				rule: "That Advance does not stop it declaring a charge."
			}
		]
	},
	{
		id: "emissaries",
		name: "Emissaries Imperatus",
		dispositions: ["Priority Assets"],
		dp: 1,
		unique: true,
		rule: {
			name: "Heralds of the Throne",
			text: "Friendly Adeptus Custodes units have Fights First."
		},
		katah: {
			name: "Conservai",
			effect: "Until the end of the turn, being selected to Advance or Fall Back does not stop your unit being eligible to start an action."
		},
		stratagems: [
			{
				name: "Bearers of His Light",
				cp: 1,
				when: "The Fight phase, when a friendly Adeptus Custodes unit is selected to fight.",
				rule: "Its melee attacks can ignore modifiers to hit rolls and wound rolls."
			},
			{
				name: "Slayers of Nightmares",
				cp: 1,
				when: "The Fight phase, when a friendly Adeptus Custodes unit is selected to fight.",
				rule: "Its melee attacks against a unit with higher Toughness have +1 to wound."
			},
			{
				name: "Selfless Service",
				cp: 1,
				when: "The end of your opponent’s Charge phase, on one friendly unengaged Adeptus Custodes unit within 6\" of an enemy unit.",
				rule: "A Vehicle can only be selected if it is a Character or Walker. Declare a charge. If the charge roll is greater than 6 after modifiers, change it to 6. Charge targets can only be enemy units within 6\" and within the maximum distance."
			}
		]
	},
	{
		id: "chosen",
		name: "Emperor's Chosen",
		dispositions: ["Priority Assets"],
		dp: 1,
		unique: true,
		rule: {
			name: "Magna Imperator",
			text: "When a friendly Adeptus Custodes unit is selected to attack, it can re-roll one hit roll and one wound roll."
		},
		katah: {
			name: "Rendax",
			effect: "Select one enemy Monster or Vehicle engaged with your unit and roll one D6. On 1–2 it suffers 1 mortal wound, on 3–5 it suffers D3 mortal wounds, and on a 6 it suffers 3 mortal wounds."
		},
		stratagems: [
			{
				name: "Superhuman Focus",
				cp: 1,
				when: "The end of any phase, on one friendly Adeptus Custodes unit that is not readied.",
				rule: "It is readied. You cannot select the same unit more than once per battle round."
			},
			{
				name: "In Auramite Clad",
				cp: 1,
				when: "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes unit, excluding Custodian Wardens.",
				rule: "Attacks that target your unit have −1 AP until that enemy unit has attacked."
			},
			{
				name: "Impenetrable Bastion",
				cp: 1,
				when: "The end of your Movement phase, on one friendly Adeptus Custodes unit, excluding Monster and Vehicle units.",
				rule: "Select one objective it is controlling. That objective is secured."
			}
		]
	},
	{
		id: "grav",
		name: "Grav-Assault Force",
		dispositions: ["Reconnaissance"],
		dp: 1,
		rule: {
			name: "Flare Shields",
			text: "Friendly Grav-Assault units have a 4+ invulnerable save against ranged attacks."
		},
		stratagems: [
			{
				name: "Victory Before Death",
				cp: 1,
				when: "Any phase, when a friendly Grav-Assault unit within range of an objective is destroyed.",
				rule: "You can target it even though it is destroyed. Select one objective it was controlling that has no enemy units, excluding Aircraft, within range. That objective is secured."
			},
			{
				name: "Advanced Stabilisers",
				cp: 1,
				when: "Your Shooting phase, when a friendly Grav-Assault unit is selected to shoot.",
				rule: "Its ranged attacks have [Assault]."
			},
			{
				name: "Inevitable Annihilation",
				cp: 1,
				when: "Your Shooting phase, when a friendly Grav-Assault unit is selected to shoot.",
				rule: "It can ignore modifiers to Ballistic Skill and hit rolls."
			}
		]
	},
	{
		id: "companions",
		name: "Honoured Companions",
		dispositions: ["Take and Hold"],
		dp: 1,
		rule: {
			name: "Companion’s Watch",
			text: "While a friendly Trusted Sentinel unit is within range of an objective, that unit’s attacks can re-roll wound rolls of 1."
		},
		stratagems: [
			{
				name: "Emperor’s Domain",
				cp: 1,
				when: "The Fight phase, when a friendly Trusted Sentinel unit is selected to consolidate.",
				rule: "You can choose the objective consolidation mode regardless of that move’s Before Moving restrictions, so the unit can leave engagement range if it meets that mode’s conditions."
			},
			{
				name: "Avenge the Fallen",
				cp: 1,
				when: "The Fight phase, when a friendly Trusted Sentinel unit below starting strength is selected to fight.",
				rule: "Its melee attacks, excluding those made by Character models, have +2 Attacks."
			},
			{
				name: "Swift as the Eagle",
				cp: 1,
				when: "Your opponent’s Movement phase, when an enemy unit ends a move within 8\" of a friendly unengaged Trusted Sentinel unit.",
				rule: "That Trusted Sentinel unit can make a Normal move of up to D3+3\"."
			}
		]
	},
	{
		id: "lions",
		name: "Lions of the Emperor",
		dispositions: ["Disruption"],
		dp: 1,
		rule: {
			name: "On Gilded Wings",
			text: "At the end of your opponent’s Fight phase, if a friendly Adeptus Custodes Terminator unit is unengaged, you can place it in Strategic Reserves."
		},
		stratagems: [
			{
				name: "Vigil Unending",
				cp: 2,
				when: "Your opponent’s Shooting phase or the Fight phase, when an enemy unit targets a friendly Adeptus Custodes Terminator unit.",
				rule: "Attacks that target your unit have −1 Damage until that enemy unit has attacked."
			},
			{
				name: "Unleash the Lions",
				cp: 1,
				when: "Your Command phase, on one friendly Adeptus Custodes Terminator unit with 2 or more models.",
				rule: "Split it into separate units of one model each. Each new unit has a starting strength of 1."
			},
			{
				name: "Fury of the Emperor",
				cp: 1,
				when: "Your Charge phase, when a friendly Adeptus Custodes Terminator unit that made an ingress move this turn is selected to declare a charge.",
				rule: "It has +2 to charge rolls."
			}
		]
	},
	{
		id: "moritoi",
		name: "Might of the Moritoi",
		dispositions: ["Take and Hold"],
		dp: 1,
		rule: {
			name: "Moritoi Ancients",
			text: "A friendly Adeptus Custodes Dreadnought at starting strength has +2 OC. Below starting strength, its attacks can re-roll hit rolls of 1. Below half-strength, its attacks can re-roll hit rolls of 1 and wound rolls of 1."
		},
		stratagems: [
			{
				name: "Honoured Interred",
				cp: 1,
				when: "Your Shooting phase or the Fight phase, on one friendly Adeptus Custodes Dreadnought.",
				rule: "It gains Honoured Interred (Aura): friendly Adeptus Custodes units within 6\" can re-roll hit rolls of 1."
			},
			{
				name: "Unceasing Onslaught",
				cp: 1,
				when: "Your Movement phase, when a friendly Adeptus Custodes Dreadnought ends an Advance.",
				rule: "Until the end of the turn its ranged attacks have [Assault], and that move does not stop it declaring a charge."
			},
			{
				name: "Unstoppable Momentum",
				cp: 1,
				when: "Your Movement or Charge phase, when a friendly Adeptus Custodes Dreadnought is selected to move or declares a charge.",
				rule: "It has Mobile."
			}
		]
	},
	{
		id: "vigil",
		name: "Null Maiden Vigil",
		dispositions: ["Disruption"],
		dp: 1,
		rule: {
			name: "Silent Sisterhood",
			text: "When mustering, you can select a friendly Anathema Psykana Character to be your Warlord. Friendly Prosecutor Squad units have Battleline. Friendly Anathema Psykana units have Creeping Dread (Aura): in the Battle-shock step of your opponent’s Command phase, each enemy unit within 12\" that is a Psyker or below starting strength takes a Battle-shock test at −1."
		},
		stratagems: [
			{
				name: "Anathema Blademastery",
				cp: 1,
				when: "The Fight phase, when a friendly Vigilator Squad is selected to fight.",
				rule: "Its attacks have [Sustained Hits 1] or [Lethal Hits]."
			},
			{
				name: "Psy-chaff Volley",
				cp: 1,
				when: "Your Shooting phase, when a friendly Prosecutor Squad has shot.",
				rule: "Select one enemy unit hit by those attacks. It is prosecuted until the end of the turn, and attacks that target it have +1 AP."
			},
			{
				name: "Purgation Sweep",
				cp: 1,
				when: "Your Shooting phase, when a friendly Witchseeker Squad is selected to shoot.",
				rule: "Its [Torrent] attacks have +1 Attack, or +2 Attacks if they target a Psyker or battle-shocked unit."
			}
		]
	},
	{
		id: "shadowkeepers",
		name: "Shadowkeepers",
		dispositions: ["Purge the Foe"],
		dp: 1,
		unique: true,
		rule: {
			name: "Wardens of the Dark Cells",
			text: "While a friendly Adeptus Custodes unit, excluding Monster and Vehicle units, is within range of an objective, melee attacks that target it with Strength greater than its Toughness have −1 to wound."
		},
		katah: {
			name: "Kaptaris",
			effect: "Select one enemy unit engaged with your unit. It takes a Battle-shock test at −1. You cannot select the same enemy unit for this more than once per phase."
		},
		stratagems: [
			{
				name: "Grim Responsibility",
				cp: 1,
				when: "The Fight phase, when a friendly Adeptus Custodes Infantry unit is selected to fight.",
				rule: "Its melee attacks have [Lethal Hits: Character/Monster]."
			},
			{
				name: "No Escape",
				cp: 2,
				when: "Your opponent’s Movement phase, when an enemy unit ends a Fall Back.",
				rule: "Target one friendly unengaged Adeptus Custodes Infantry unit within 6\" of that enemy unit and declare a charge. Charge targets can only be enemy units that Fell Back this phase and are within the maximum distance."
			},
			{
				name: "Indomitable Guardians",
				cp: 1,
				when: "Your opponent’s Fight phase, when an enemy unit has fought.",
				rule: "Target one friendly Adeptus Custodes unit within range of an objective that is eligible to fight. It has Fights First and must be the next unit you select to fight."
			}
		]
	},
	{
		id: "solar",
		name: "Solar Watch",
		dispositions: ["Reconnaissance"],
		dp: 1,
		unique: true,
		rule: {
			name: "Talon Sortie",
			text: "When a friendly Adeptus Custodes unit Falls Back, that move does not stop it being eligible to charge."
		},
		katah: {
			name: "Calistus",
			effect: "Your unit has +2\" Movement."
		},
		stratagems: [
			{
				name: "Inexorable",
				cp: 1,
				when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to move.",
				rule: "Until the end of the turn it can ignore modifiers to Movement, advance rolls, and charge rolls."
			},
			{
				name: "At Spear’s Length",
				cp: 1,
				when: "Your Movement phase, when a friendly Adeptus Custodes unit is selected to Fall Back.",
				rule: "That move does not stop it being eligible to shoot."
			},
			{
				name: "Gravimetric Grenade",
				cp: 1,
				when: "The start of your opponent’s Charge phase, on one friendly unengaged Adeptus Custodes unit.",
				rule: "Select one visible enemy unit within 12\". When that enemy unit declares a charge, it has −1 to charge rolls."
			}
		]
	}
];
var ENHANCEMENTS = [
	{
		id: "bane",
		name: "Bane of Abominations",
		detachment: "guardians",
		points: 20,
		rule: "Adeptus Custodes model only. Its attacks against an enemy Character, Monster, or Vehicle have +1 to wound.",
		targets: CUSTODES
	},
	{
		id: "eagles-eye",
		name: "Eagle's Eye",
		detachment: "guardians",
		points: 30,
		rule: "Adeptus Custodes model only. This model has +1 Wound. Once per battle, per army, when attacks are allocated to this model, it can have a 3+ invulnerable save.",
		targets: CUSTODES
	},
	{
		id: "castellan",
		name: "Castellan's Mark",
		detachment: "guardians",
		points: 25,
		rule: "Adeptus Custodes model only. After both players have deployed, you can redeploy up to three friendly Adeptus Custodes units, including into Strategic Reserves, regardless of how many units are already in Strategic Reserves.",
		targets: CUSTODES
	},
	{
		id: "emperors-light",
		name: "Emperor's Light",
		detachment: "guardians",
		points: 15,
		rule: "Adeptus Custodes model only. Emperor’s Light [Extra Attacks]: Melee, A3, WS 2+, S5, AP −2, D2.",
		targets: CUSTODES
	},
	{
		id: "not-a-shell",
		name: "Not a Shell Wasted",
		detachment: "aquilan",
		points: 10,
		rule: "Adeptus Custodes Infantry model only. Its ranged attacks have +1 Attack.",
		targets: INFANTRY_CHARACTERS
	},
	{
		id: "caducatrix",
		name: "Pareldor's Caducatrix",
		detachment: "aquilan",
		points: 30,
		rule: "Adeptus Custodes model only, once per battle, per army. At the start of any phase, this model heals D3+3 wounds.",
		targets: CUSTODES
	},
	{
		id: "exemplar",
		name: "Inspirational Exemplar",
		detachment: "auric",
		points: 10,
		rule: "Adeptus Custodes Infantry model only, once per battle round, per army. At the start of any phase, select one friendly battle-shocked Adeptus Custodes unit within 9\". It is no longer battle-shocked.",
		targets: INFANTRY_CHARACTERS
	},
	{
		id: "superior",
		name: "Superior Creation",
		detachment: "auric",
		points: 30,
		rule: "Adeptus Custodes Infantry model only. At the end of a phase in which this model is destroyed, roll one D6. On a 2+, set it back up as close as possible to where it was destroyed, unengaged, with 3 wounds remaining.",
		targets: INFANTRY_CHARACTERS
	},
	{
		id: "hidden-blade",
		name: "Shroud of the Hidden Blade",
		detachment: "auric",
		points: 20,
		rule: "Adeptus Custodes model only. It has Stealth and Lone Operative.",
		targets: CUSTODES
	},
	{
		id: "auric-exemplar",
		name: "Auric Exemplar",
		detachment: "dread-host",
		points: 15,
		rule: "Adeptus Custodes model only. Its melee attacks have [Cleave 1].",
		targets: CUSTODES
	},
	{
		id: "flawless",
		name: "Flawless Bladework",
		detachment: "dread-host",
		points: 15,
		rule: "Adeptus Custodes model only. Its melee attacks have [Sustained Hits 1].",
		targets: CUSTODES
	},
	{
		id: "orb",
		name: "Auriferous Orb",
		detachment: "emissaries",
		points: 20,
		rule: "Adeptus Custodes model only. Auriferous Orb [Anti-non-Monster/Vehicle 2+, Blinding Light, Devastating Wounds]: 12\", A3, BS 2+, S1, AP 0, D1. After this unit has shot, select one enemy unit hit by the Orb. That unit’s attacks have −1 to hit until the start of your next turn.",
		targets: CUSTODES
	},
	{
		id: "edge",
		name: "Edge of the Blade",
		detachment: "emissaries",
		points: 15,
		rule: "Adeptus Custodes model only. If this unit charged this turn, this model’s attacks can re-roll hit rolls of 1 and wound rolls of 1.",
		targets: CUSTODES
	},
	{
		id: "armouries",
		name: "From the Hall of Armouries",
		detachment: "chosen",
		points: 15,
		rule: "Adeptus Custodes model only. Its melee attacks have [Devastating Wounds].",
		targets: CUSTODES
	},
	{
		id: "mantle",
		name: "Radiant Mantle",
		detachment: "chosen",
		points: 40,
		rule: "Adeptus Custodes Infantry model only. Attacks that target this unit have −1 to hit.",
		targets: INFANTRY_CHARACTERS
	},
	{
		id: "anti-grav",
		name: "Anti-gravitic Mobility",
		detachment: "grav",
		points: 15,
		upgrade: true,
		rule: "Upgrade for a Grav-Assault unit only. A Fall Back move does not stop this unit being eligible to shoot.",
		targets: GRAV
	},
	{
		id: "deployment",
		name: "Combat Deployment",
		detachment: "grav",
		points: 20,
		upgrade: true,
		rule: "Upgrade for a Grav-Assault Transport model only. When a friendly Adeptus Custodes unit disembarks from it, until the end of the turn that unit can re-roll charge rolls, and enemy units cannot target it with snap shooting attacks.",
		targets: ["coronus"]
	},
	{
		id: "arae",
		name: "Arae-Shrike",
		detachment: "companions",
		points: 20,
		rule: "Adeptus Custodes Infantry model only. Enemy units selected to make an ingress move cannot be set up within 12\" of this unit.",
		targets: INFANTRY_CHARACTERS
	},
	{
		id: "sentries",
		name: "Celeritous Sentries",
		detachment: "companions",
		points: 15,
		upgrade: true,
		rule: "Upgrade for a Trusted Sentinel unit only, once per phase, per unit. You can target this unit with Heroic Intervention regardless of other uses this phase. That use is −1 CP and does not stop other units using that Stratagem this phase.",
		targets: SENTINELS
	},
	{
		id: "conqueror",
		name: "Leonine Ferocity",
		detachment: "lions",
		points: 20,
		rule: "Shield-Captain in Allarus Terminator Armour only, once per phase, per army. You can target this unit with Rapid Ingress regardless of other uses this phase. That use is −1 CP and does not stop other units using that Stratagem this phase.",
		targets: ["shield-captain-allarus"]
	},
	{
		id: "descent",
		name: "Lightning Descent",
		detachment: "lions",
		points: 20,
		rule: "Shield-Captain in Allarus Terminator Armour only. In your first Movement phase, this unit can make an ingress move.",
		targets: ["shield-captain-allarus"]
	},
	{
		id: "augury",
		name: "Augury Uplink",
		detachment: "moritoi",
		points: 30,
		upgrade: true,
		once: true,
		rule: "Upgrade, one per army, for an Adeptus Custodes Dreadnought model only. It has Feel No Pain 5+.",
		targets: DREADS
	},
	{
		id: "memento",
		name: "Memento Moritoi",
		detachment: "moritoi",
		points: 30,
		upgrade: true,
		once: true,
		rule: "Upgrade, one per army, for an Adeptus Custodes Dreadnought model only. Its melee attacks have +1 Attack, Strength, and Damage.",
		targets: DREADS
	},
	{
		id: "huntress",
		name: "Huntress' Eye",
		detachment: "vigil",
		points: 10,
		rule: "Anathema Psykana model only. In your Movement phase, select one visible enemy unit within 12\". It takes a Battle-shock test at −1.",
		targets: ["knight-centura"]
	},
	{
		id: "oblivion",
		name: "Oblivion Knight",
		detachment: "vigil",
		points: 15,
		rule: "Anathema Psykana model only. This unit’s attacks have +1 to hit, or +1 to hit and wound if the target is a Psyker or battle-shocked.",
		targets: ["knight-centura"]
	},
	{
		id: "warding",
		name: "Genalchemic Warding",
		detachment: "shadowkeepers",
		points: 30,
		rule: "Adeptus Custodes model only. It has Feel No Pain 5+.",
		targets: CUSTODES
	},
	{
		id: "destroyer",
		name: "Unstoppable Destroyer",
		detachment: "shadowkeepers",
		points: 25,
		rule: "Adeptus Custodes Infantry model only. When selected to pile in or consolidate, it can move up to 4\", and you can choose any consolidation mode regardless of Before Moving restrictions.",
		targets: INFANTRY_CHARACTERS
	},
	{
		id: "auric-eagle",
		name: "Auric Eagle",
		detachment: "solar",
		points: 15,
		upgrade: true,
		rule: "Upgrade for an Adeptus Custodes Infantry or Mounted unit only, excluding Terminator units. It has +1 to advance rolls and charge rolls.",
		targets: EAGLE
	},
	{
		id: "sally",
		name: "Sally Forth",
		detachment: "solar",
		points: 30,
		rule: "Adeptus Custodes Shield-Captain model only. At the start of your Charge phase, select one friendly Adeptus Custodes Infantry unit within 6\". If it Advanced this turn, that Advance does not stop it declaring a charge.",
		targets: CAPTAINS
	}
];
function detachmentById(id) {
	return DETACHMENTS.find((detachment) => detachment.id === id);
}
function enhancementById(id) {
	return ENHANCEMENTS.find((enhancement) => enhancement.id === id);
}
function enhancementsFor(detachmentId) {
	return ENHANCEMENTS.filter((enhancement) => enhancement.detachment === detachmentId);
}
function spentDp(ids) {
	return ids.reduce((sum, id) => sum + (detachmentById(id)?.dp ?? 0), 0);
}
function bearerNames(targets) {
	return targets.map((id) => unitById(id)?.name ?? id).join(", ");
}
function repeatable(enhancement) {
	return Boolean(enhancement.upgrade && !enhancement.once);
}
function DetachmentSheet({ ids, onClose }) {
	const detachments = ids.map((id) => detachmentById(id)).filter((item) => item != null);
	(0, import_react.useEffect)(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	if (detachments.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Detachment rules",
			className: "sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4",
			onClick: (event) => event.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: detachments.length === 1 ? detachments[0].name : "Detachments"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close detachment rules",
					onClick: onClose,
					className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-8",
				children: detachments.map((detachment) => {
					const enhancements = enhancementsFor(detachment.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col gap-4",
						children: [
							detachments.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: detachment.name
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									detachment.dp,
									" DP",
									detachment.unique ? " · Shield Host" : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: ["Force disposition: ", detachment.dispositions.join(", ")]
							}),
							detachment.rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: detachment.rule.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: detachment.rule.text
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Detachment rule not entered yet."
							}),
							detachment.katah ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: ["Favoured Ka’tah · ", detachment.katah.name]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: detachment.katah.effect
							})] }) : null,
							enhancements.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: "Enhancements"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 flex flex-col gap-3",
								children: enhancements.map((enhancement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [
											enhancement.name,
											" · ",
											enhancement.points,
											" pts",
											enhancement.once ? " · one per army" : enhancement.upgrade ? " · upgrade" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: enhancement.rule
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: bearerNames(enhancement.targets)
									})
								] }, enhancement.id))
							})] }) : null,
							detachment.stratagems.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: "Stratagems"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 flex flex-col gap-3",
								children: detachment.stratagems.map((stratagem) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [
											stratagem.name,
											" · ",
											stratagem.cp,
											" CP"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-gold",
										children: stratagem.when
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: stratagem.rule
									})
								] }, stratagem.name))
							})] }) : null
						]
					}, detachment.id);
				})
			})]
		})
	});
}
var RULE_UPDATES = [
	"Universal Rules Updates, version 1.1, are legal for matched play from 26 August 2026.",
	"A rule that lets you target a friendly unit with a Stratagem for 0 CP, but does not name that Stratagem, instead reduces that use by 1 CP.",
	"A rule that lets you use a Stratagem even though you have already targeted another unit with it in the same phase only works if that rule names the Stratagem. The same limit applies if the Stratagem is limited to one use per player per turn, battle round, or battle.",
	"A Stratagem that says the target can only be selected as the target of a ranged attack if the attacking model is within 12\", or cannot be targeted by ranged attacks unless the attacking model is within 12\", is changed to 18\".",
	"A Stratagem that adds a new unit to your army identical to your destroyed unit can only be used once per battle.",
	"If a rule lets a unit declare a charge after disembarking from a Transport that made a Normal move that turn, that disembarkation is an assault disembark move instead of a disembark move. If a rule lets a unit disembark from a Transport that made an Advance that turn, that disembarkation is a shock disembark move instead of a disembark move."
];
var USING_STRATAGEMS = "Each Stratagem states its CP cost, WHEN, TARGET, EFFECT, and RESTRICTIONS. A player cannot use the same Stratagem more than once in the same phase. Unless otherwise stated, a player cannot target the same unit with more than one Stratagem in the same phase. Select targets, pay the CP cost, including any optional extra cost, then resolve the effect. If you cannot pay, you cannot use it.";
var PHASES = [
	{
		id: "command",
		label: "Command"
	},
	{
		id: "movement",
		label: "Movement"
	},
	{
		id: "shooting",
		label: "Shooting"
	},
	{
		id: "charge",
		label: "Charge"
	},
	{
		id: "fight",
		label: "Fight"
	},
	{
		id: "any",
		label: "Any phase"
	}
];
var KEYWORD_LIST = [
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
	"Titanic"
];
var NAMED_UNITS = [
	["Vigilator Squad", "vigilators"],
	["Prosecutor Squad", "prosecutors"],
	["Witchseeker Squad", "witchseekers"]
];
var sameKeyword = (left, right) => left.toLowerCase().replace(/s$/, "") === right.toLowerCase().replace(/s$/, "");
var hasKeyword = (unit, keyword) => unit.keywords.some((word) => sameKeyword(word, keyword));
function phasesOf(when) {
	const text = when.toLowerCase();
	if (text.includes("any phase")) return ["any"];
	const phases = [];
	if (text.includes("command")) phases.push("command");
	if (text.includes("movement")) phases.push("movement");
	if (text.includes("shooting")) phases.push("shooting");
	if (text.includes("charge")) phases.push("charge");
	if (text.includes("fight")) phases.push("fight");
	return phases.length ? phases : ["any"];
}
function friendlyClause(when, rule) {
	if (/friendly/i.test(when)) return when.slice(when.toLowerCase().indexOf("friendly"));
	if (/friendly/i.test(rule)) return rule.slice(rule.toLowerCase().indexOf("friendly"));
	return "";
}
function inferTarget(when, rule) {
	const full = `${when} ${rule}`;
	const clause = friendlyClause(when, rule).replace(/excluding [^.]*/gi, "");
	const excludeKeywords = [];
	const excludeUnitIds = [];
	if (/excluding titanics?/i.test(full)) excludeKeywords.push("Titanic");
	if (/excluding monsters?/i.test(full)) excludeKeywords.push("Monster", "Vehicle");
	if (/excluding custodian wardens/i.test(full)) excludeUnitIds.push("wardens");
	const unitIds = NAMED_UNITS.filter(([label]) => clause.includes(label)).map(([, id]) => id);
	const found = [];
	const lower = clause.toLowerCase();
	for (const keyword of KEYWORD_LIST) {
		const index = lower.indexOf(keyword.toLowerCase());
		if (index >= 0) found.push({
			name: keyword,
			index
		});
	}
	found.sort((left, right) => left.index - right.index);
	const groups = [];
	if (found.length > 0 && unitIds.length === 0) {
		let current = [found[0].name];
		for (let index = 1; index < found.length; index += 1) {
			const previous = found[index - 1];
			const next = found[index];
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
		groups: groups.length ? groups : void 0,
		unitIds: unitIds.length ? unitIds : void 0,
		excludeKeywords: excludeKeywords.length ? excludeKeywords : void 0,
		excludeUnitIds: excludeUnitIds.length ? excludeUnitIds : void 0,
		minModels: models ? Number(models[1]) : void 0
	};
}
var core = (name, cp, when, effect, target, restrictions) => ({
	id: `core-${name}`,
	name,
	cp,
	phases: phasesOf(when),
	when,
	effect,
	restrictions,
	source: "Core",
	target
});
var ANY = {};
var CORE_STRATAGEMS = [
	core("Command Re-roll", 1, "Any phase, just after you make an Advance roll, charge roll, Damage roll, hazard roll, hit roll, wound roll, or a roll to determine the number of attacks generated with a weapon, for a friendly unit or model.", "Re-roll that roll. If you are rolling more than one dice together, select one of those dice to re-roll. Charge rolls must be re-rolled in full.", ANY),
	core("Epic Challenge", 1, "Fight phase, just after a friendly Character unit is selected to fight.", "Select one Character model in your unit. Until the end of the phase, that model’s melee weapons have [Precision].", { groups: [["Character"]] }),
	core("Insane Bravery", 1, "Battle-shock step of your Command phase, just before you make a battle-shock roll for a friendly unit.", "That battle-shock roll is automatically successful.", ANY, "Once per battle."),
	core("Explosives", 1, "Your Shooting phase. One friendly unengaged Explosives/Grenades unit that is eligible to shoot and did not Advance this turn.", "Select one Explosives/Grenades model in your unit, then one unengaged enemy unit within 8\" of and visible to that model. Roll one D6: for each 4+, that enemy unit suffers 1 mortal wound.", { groups: [["Explosives", "Grenades"]] }),
	core("Crushing Impact", 1, "Your Charge phase, just after a friendly Monster/Vehicle unit ends a charge move.", "Select one enemy unit engaged with your unit, then one model in your unit engaged with that enemy unit. Roll a number of D6 equal to that model’s Toughness: for each 1, your unit suffers 1 mortal wound; for each 5+, that enemy unit suffers 1 mortal wound, to a maximum of 6 mortal wounds per unit.", { groups: [["Monster", "Vehicle"]] }),
	core("Rapid Ingress", 1, "End of your opponent’s Movement phase. One friendly unit in Strategic Reserves, including Aircraft.", "That unit makes an ingress move. Cannot be used in the first battle round.", ANY, "The unit must be in Strategic Reserves."),
	core("Fire Overwatch", 1, "End of your opponent’s Movement phase. One friendly unengaged unit, excluding Titanic units.", "That unit shoots using snap shooting. Snap shooting can only target one visible enemy unit within 24\", and only if that unit is an eligible target. Each attack hits only on an unmodified hit roll of 6, ignoring Ballistic Skill and modifiers, and hit rolls cannot be re-rolled. Until the end of the phase, your unit is not eligible to start an action.", { excludeKeywords: ["Titanic"] }, "The unit must be unengaged."),
	core("Smokescreen", 1, "Start of your opponent’s Shooting phase. One friendly Smoke unit.", "Until the end of the phase, each time an attack targets that Smoke unit, or a unit that is not fully visible to the attacking model because of one or more models in that Smoke unit, the target has the benefit of cover against that attack.", { groups: [["Smoke"]] }),
	core("Heroic Intervention", 1, "End of your opponent’s Charge phase. One friendly unengaged unit within 12\" of one or more enemy units.", "Resolve a charge with your unit. Before the charge roll, choose one mode. Leap to Defend: when selecting charge targets, you can only select enemy units that made a charge move this phase and are within the maximum distance. Into the Fray costs +1 CP: if the charge roll is greater than 6 after modifiers, change it to 6, and you can select any enemy units within 6\" of your unit and within the maximum distance.", { vehicleNeedsWalker: true }, "A Vehicle can only be selected if it is a Character or Walker. The unit must be unengaged."),
	core("Counteroffensive", 2, "Fight step of your opponent’s Fight phase, just after an enemy unit has resolved its attacks.", "Until the end of the phase, your unit has Fights First and must be the next unit you select to fight.", ANY, "The unit must be eligible to fight.")
];
function fromDetachment(stratagem, source) {
	return {
		id: `${source}-${stratagem.name}`,
		name: stratagem.name,
		cp: stratagem.cp,
		phases: phasesOf(stratagem.when),
		when: stratagem.when,
		effect: stratagem.rule,
		source,
		target: inferTarget(stratagem.when, stratagem.rule)
	};
}
function stratagemsFor(detachmentIds) {
	const detachment = detachmentIds.flatMap((id) => {
		const sheet = detachmentById(id);
		if (!sheet) return [];
		return sheet.stratagems.map((stratagem) => fromDetachment(stratagem, sheet.name));
	});
	return [...CORE_STRATAGEMS, ...detachment];
}
function canTarget(stratagem, unit) {
	const target = stratagem.target;
	if (target.unitIds?.length && !target.unitIds.some((id) => unit.unitIds.includes(id))) return false;
	if (target.excludeUnitIds?.some((id) => unit.unitIds.includes(id))) return false;
	if (target.excludeKeywords?.some((keyword) => hasKeyword(unit, keyword))) return false;
	if (target.minModels != null && unit.models < target.minModels) return false;
	if (target.vehicleNeedsWalker && hasKeyword(unit, "Vehicle") && !hasKeyword(unit, "Walker") && !hasKeyword(unit, "Character")) return false;
	if (target.groups?.some((group) => !group.some((keyword) => hasKeyword(unit, keyword)))) return false;
	return true;
}
function keywordsFor(unitIds) {
	return [...new Set(unitIds.flatMap((id) => keywordsOf(id)))];
}
function CoreRules({ onClose }) {
	(0, import_react.useEffect)(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	const abilities = WEAPON_ABILITIES.filter((ability) => ability.key !== "pistol");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Core rules",
			className: "sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Core rules"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close core rules",
						onClick: onClose,
						className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Army rules"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-4",
						children: ARMY_RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: rule.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: rule.rule
							}),
							rule.parts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 flex flex-col gap-2 border-l border-line pl-3",
								children: rule.parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: part.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: part.rule
								})] }, part.name))
							}) : null
						] }, rule.name))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs tracking-wide text-gold uppercase",
							children: "Rules updates"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-col gap-2",
							children: RULE_UPDATES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm text-muted",
								children: rule
							}, rule))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							children: "Using Stratagems"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: USING_STRATAGEMS
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs tracking-wide text-gold uppercase",
							children: "Keywords"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-col gap-2",
							children: KEYWORD_RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "text-sm",
								children: rule
							}, rule))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							children: "Fly"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: FLY_RULE
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Weapon abilities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-3",
						children: abilities.map((ability) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: ability.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: ability.rule
						})] }, ability.key))
					})]
				})
			]
		})
	});
}
var THEMES = [
	{
		id: "auramite",
		name: "Auramite",
		swatch: "#d4b36a"
	},
	{
		id: "marble",
		name: "Marble",
		swatch: "#8a6a2f"
	},
	{
		id: "night",
		name: "Night",
		swatch: "#7eb0d6"
	},
	{
		id: "amethyst",
		name: "Amethyst",
		swatch: "#c9a46a"
	}
];
var THEME_KEY = "ttt-theme";
var MOTION_KEY = "ttt-motion";
function loadTheme() {
	const saved = localStorage.getItem(THEME_KEY);
	return THEMES.some((theme) => theme.id === saved) ? saved : "auramite";
}
function loadReduceMotion() {
	const saved = localStorage.getItem(MOTION_KEY);
	if (saved === "on") return true;
	if (saved === "off") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function applySettings(theme, reduceMotion) {
	const root = document.documentElement;
	if (theme === "auramite") root.removeAttribute("data-theme");
	else root.dataset.theme = theme;
	root.dataset.motion = reduceMotion ? "on" : "off";
	localStorage.setItem(THEME_KEY, theme);
	localStorage.setItem(MOTION_KEY, reduceMotion ? "on" : "off");
}
function Settings({ theme, reduceMotion, onTheme, onMotion, onClose }) {
	(0, import_react.useEffect)(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Settings",
			className: "sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4",
			onClick: (event) => event.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Settings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Close settings",
						onClick: onClose,
						className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Motion"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "switch",
						"aria-checked": reduceMotion,
						onClick: () => onMotion(!reduceMotion),
						className: "mt-2 flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-line px-3 text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Reduce motion", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-xs text-muted",
							children: "Turn this off to keep button press animations."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `shrink-0 text-xs ${reduceMotion ? "text-gold" : "text-muted"}`,
							children: reduceMotion ? "On" : "Off"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Colors"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-2 gap-2",
						children: THEMES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"aria-pressed": theme === item.id,
							onClick: () => onTheme(item.id),
							className: `flex min-h-11 items-center gap-2 rounded-lg border px-3 text-left text-sm ${theme === item.id ? "border-gold text-fg" : "border-line text-muted"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-4 shrink-0 rounded-full border border-line",
								style: { background: item.swatch }
							}), item.name]
						}, item.id))
					})]
				})
			]
		})
	});
}
var TABS = [
	{
		id: "list",
		label: "List"
	},
	{
		id: "army",
		label: "Army"
	},
	{
		id: "core",
		label: "Core"
	},
	{
		id: "detachments",
		label: "Detachments"
	},
	{
		id: "stratagems",
		label: "Stratagems"
	}
];
function tableUnits(entries) {
	const leaders = /* @__PURE__ */ new Map();
	for (const entry of entries) if (entry.attachedTo) leaders.set(entry.attachedTo, entry);
	const attached = new Set([...leaders.values()].map((leader) => leader.id));
	return entries.filter((entry) => !attached.has(entry.id)).map((entry) => {
		const leader = leaders.get(entry.id);
		const unitIds = leader ? [leader.unitId, entry.unitId] : [entry.unitId];
		const label = leader ? `${leader.name}${leader.warlord ? " (Warlord)" : ""} — ${entry.name}${entry.models > 1 ? ` x${entry.models}` : ""}` : `${entry.name}${entry.models > 1 ? ` x${entry.models}` : ""}${entry.warlord ? " (Warlord)" : ""}`;
		return {
			key: entry.id,
			label,
			keywords: keywordsFor(unitIds),
			unitIds,
			models: entry.models + (leader ? 1 : 0)
		};
	});
}
function PlayView({ name, total, limit, detachments, mainDisposition, dispositionChoices, onMainDisposition, entries, onBack, onHome }) {
	const [tab, setTab] = (0, import_react.useState)("list");
	const [phase, setPhase] = (0, import_react.useState)("all");
	const [listFilter, setListFilter] = (0, import_react.useState)("all");
	const [sheetEntry, setSheetEntry] = (0, import_react.useState)(null);
	const units = tableUnits(entries);
	const sheets = detachments.map((id) => detachmentById(id)).filter((item) => item != null);
	const stratagems = stratagemsFor(detachments).filter((stratagem) => phase === "all" ? true : phase === "any" ? stratagem.phases.includes("any") : stratagem.phases.includes(phase) || stratagem.phases.includes("any"));
	const attachedBodies = new Set(entries.flatMap((entry) => entry.attachedTo ? [entry.attachedTo] : []));
	const shown = listFilter === "enhancements" ? entries.filter((entry) => entry.enhancement) : entries;
	const openEntry = entries.find((entry) => entry.id === sheetEntry);
	const openEnhancement = openEntry?.enhancement ? ENHANCEMENTS.find((enhancement) => enhancement.name === openEntry.enhancement) : void 0;
	const main = mainDisposition && dispositionChoices.includes(mainDisposition) ? mainDisposition : dispositionChoices.length === 1 ? dispositionChoices[0] : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-10 -mx-4 border-b border-line bg-bg px-4 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 pt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onHome,
							className: "min-h-11 shrink-0 rounded-lg border border-line px-3 py-2 text-sm",
							children: "Home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onBack,
							className: "min-h-11 shrink-0 rounded-lg border border-line px-3 py-2 text-sm",
							children: "Back"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 pt-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-gold uppercase",
								children: "Playing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate font-display text-2xl",
								children: name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									total,
									" pts / ",
									limit,
									" pts",
									sheets.length ? ` · ${sheets.map((sheet) => sheet.name).join(", ")}` : ""
								]
							}),
							main ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: ["Main disposition: ", main]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1",
						children: TABS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab(item.id),
							className: `min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm ${tab === item.id ? "border-gold bg-gold text-bg" : "border-line bg-surface"}`,
							children: item.label
						}, item.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-open",
				children: [
					tab === "list" ? entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Add a unit."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setListFilter("all"),
								className: `min-h-11 rounded-lg border px-3 text-sm ${listFilter === "all" ? "border-gold text-gold" : "border-line text-muted"}`,
								children: "All"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setListFilter("enhancements"),
								className: `min-h-11 rounded-lg border px-3 text-sm ${listFilter === "enhancements" ? "border-gold text-gold" : "border-line text-muted"}`,
								children: "Enhancements"
							})]
						}), shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No enhancements selected."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "flex flex-col gap-2",
							children: shown.map((entry) => {
								const enhancement = entry.enhancement ? ENHANCEMENTS.find((item) => item.name === entry.enhancement) : void 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: `rounded-lg border border-line bg-surface px-3 py-3 ${attachedBodies.has(entry.id) ? "ml-4 border-l-gold" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "min-w-0 text-sm font-medium break-words",
												children: [
													listFilter === "enhancements" && enhancement ? enhancement.name : entry.name,
													listFilter === "all" && entry.models > 1 ? ` x${entry.models}` : "",
													listFilter === "all" && entry.warlord ? " (Warlord)" : "",
													listFilter === "all" && entry.enhancement ? ` (${entry.enhancement})` : ""
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "shrink-0 text-sm text-gold",
												children: listFilter === "enhancements" && enhancement ? `+${enhancement.points} pts` : `${entry.cost} pts`
											})]
										}),
										listFilter === "enhancements" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm",
											children: [
												entry.name,
												entry.models > 1 ? ` x${entry.models}` : "",
												entry.warlord ? " (Warlord)" : ""
											]
										}), enhancement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted",
											children: enhancement.rule
										}) : null] }) : entry.gearText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted",
											children: entry.gearText
										}) : null,
										datasheetById(entry.unitId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSheetEntry(entry.id),
											className: "mt-1 inline-flex min-h-11 items-center text-xs text-gold",
											children: "Datasheet"
										}) : null
									]
								}, entry.id);
							})
						})]
					}) : null,
					tab === "army" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-4",
							children: ARMY_RULES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: rule.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: rule.rule
								}),
								rule.parts ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 flex flex-col gap-2 border-l border-line pl-3",
									children: rule.parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: part.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: part.rule
									})] }, part.name))
								}) : null
							] }, rule.name))
						})
					}) : null,
					tab === "core" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Rules updates"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-2",
						children: RULE_UPDATES.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: rule
						}, rule))
					})] }) : null,
					tab === "detachments" ? sheets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No detachments selected."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-8",
						children: [dispositionChoices.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex w-fit max-w-full flex-col items-start text-xs text-muted",
							children: ["Main disposition", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								"aria-label": "Main disposition",
								value: main ?? "",
								onChange: (event) => onMainDisposition(event.target.value),
								className: "weapon-select mt-1 h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									disabled: true,
									children: "Choose"
								}), dispositionChoices.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: name,
									children: name
								}, name))]
							})]
						}) : null, sheets.map((sheet) => {
							const taken = enhancementsFor(sheet.id).filter((enhancement) => entries.some((entry) => entry.enhancement === enhancement.name));
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "flex flex-col gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display text-2xl",
										children: sheet.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											sheet.dp,
											" DP",
											sheet.unique ? " · Shield Host" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs tracking-wide text-gold uppercase",
										children: "Force disposition"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: sheet.dispositions.map((name) => name === main ? `${name} (Main)` : name).join(", ")
									})] }),
									sheet.rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs tracking-wide text-gold uppercase",
										children: sheet.rule.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: sheet.rule.text
									})] }) : null,
									sheet.katah ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "text-xs tracking-wide text-gold uppercase",
										children: ["Favoured Ka’tah · ", sheet.katah.name]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm",
										children: sheet.katah.effect
									})] }) : null,
									taken.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xs tracking-wide text-gold uppercase",
										children: "In this list"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-2 flex flex-col gap-2",
										children: taken.map((enhancement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: enhancement.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: enhancement.rule
										})] }, enhancement.id))
									})] }) : null
								]
							}, sheet.id);
						})]
					}) : null,
					tab === "stratagems" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: USING_STRATAGEMS
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "-mx-4 flex gap-2 overflow-x-auto px-4 pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPhase("all"),
									className: `min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm ${phase === "all" ? "border-gold text-gold" : "border-line text-muted"}`,
									children: "All"
								}), PHASES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPhase(item.id),
									className: `min-h-11 shrink-0 rounded-lg border px-3 py-2 text-sm ${phase === item.id ? "border-gold text-gold" : "border-line text-muted"}`,
									children: item.label
								}, item.id))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-3",
								children: stratagems.map((stratagem) => {
									const matches = units.filter((unit) => canTarget(stratagem, unit));
									const phaseLabels = stratagem.phases.map((id) => PHASES.find((item) => item.id === id)?.label ?? id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-lg border border-line bg-surface px-3 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-baseline justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "min-w-0 text-sm font-medium break-words",
													children: stratagem.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "shrink-0 text-sm text-gold",
													children: [stratagem.cp, " CP"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-gold",
												children: [
													stratagem.source,
													" · ",
													phaseLabels.join(", ")
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm",
												children: stratagem.when
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted",
												children: stratagem.effect
											}),
											stratagem.restrictions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted",
												children: stratagem.restrictions
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-xs tracking-wide text-muted uppercase",
												children: "Can target"
											}),
											matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted",
												children: "No unit in this list."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-1",
												children: matches.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
													className: "text-sm",
													children: unit.label
												}, unit.key))
											})
										]
									}, stratagem.id);
								})
							})
						]
					}) : null
				]
			}, tab),
			openEntry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatasheetView, {
				unitId: openEntry.unitId,
				unitName: openEntry.name,
				gear: openEntry.gear,
				enhancement: openEnhancement ? {
					name: openEnhancement.name,
					rule: openEnhancement.rule
				} : void 0,
				listOnly: true,
				onClose: () => setSheetEntry(null)
			}) : null
		]
	});
}
var STORAGE_KEY = "shield-host-roster-v1";
var LIBRARY_KEY = "shield-host-library-v1";
var EMPTY = {
	name: "The Ten Thousand",
	limit: 2e3,
	detachments: [],
	building: false,
	entries: []
};
function price(entries) {
	const seen = /* @__PURE__ */ new Map();
	const costById = /* @__PURE__ */ new Map();
	const ordered = [...entries].sort((left, right) => (left.addedAt ?? 0) - (right.addedAt ?? 0) || left.id.localeCompare(right.id));
	for (const entry of ordered) {
		const unit = unitById(entry.unitId);
		const size = unit ? sizeOf(unit, entry.models) : void 0;
		if (!unit || !size) continue;
		const key = entry.unitId;
		const copyIndex = seen.get(key) ?? 0;
		seen.set(key, copyIndex + 1);
		const bonus = entry.enhancementId ? enhancementById(entry.enhancementId)?.points ?? 0 : 0;
		costById.set(entry.id, {
			copy: copyIndex + 1,
			cost: squadCost(unit, entry.models, copyIndex) + bonus + gearPoints(entry.unitId, entry.gear)
		});
	}
	return entries.flatMap((entry) => {
		const priced = costById.get(entry.id);
		const unit = unitById(entry.unitId);
		const size = unit ? sizeOf(unit, entry.models) : void 0;
		if (!priced || !unit || !size) return [];
		return [{
			...entry,
			...priced,
			unit,
			size
		}];
	});
}
function categoryCount(category, entries, detachments) {
	return entries.filter((entry) => {
		const unit = unitById(entry.unitId);
		return unit != null && unitCategory(unit, detachments) === category;
	}).length;
}
function nextCost(unit, models, entries, detachments) {
	const ofUnit = entries.filter((entry) => entry.unitId === unit.id).length;
	if (ofUnit >= copyLimit(unit, detachments)) return null;
	const category = unitCategory(unit, detachments);
	const cap = categoryLimit(category);
	if (cap != null && categoryCount(category, entries, detachments) >= cap) return null;
	if (!sizeOf(unit, models)) return null;
	return squadCost(unit, models, ofUnit);
}
function partnerEntry(entry, entries) {
	if (entry.attachedTo) return entries.find((candidate) => candidate.id === entry.attachedTo);
	return entries.find((candidate) => candidate.attachedTo === entry.id);
}
function arrange(entries, warlordId) {
	const byId = new Map(entries.map((entry) => [entry.id, entry]));
	const used = /* @__PURE__ */ new Set();
	const result = [];
	const pushCharacter = (character) => {
		if (used.has(character.id)) return;
		result.push(character);
		used.add(character.id);
		const body = character.attachedTo ? byId.get(character.attachedTo) : void 0;
		if (body && !used.has(body.id)) {
			result.push(body);
			used.add(body.id);
		}
	};
	const warlord = warlordId ? byId.get(warlordId) : void 0;
	if (warlord && isCharacter(warlord.unitId)) pushCharacter(warlord);
	for (const entry of entries) if (isCharacter(entry.unitId)) pushCharacter(entry);
	for (const entry of entries) if (!used.has(entry.id)) result.push(entry);
	return result;
}
function settle(roster) {
	const ordered = [...roster.entries].sort((left, right) => (left.addedAt ?? 0) - (right.addedAt ?? 0) || left.id.localeCompare(right.id));
	const counts = /* @__PURE__ */ new Map();
	const categoryCounts = /* @__PURE__ */ new Map();
	const keepIds = /* @__PURE__ */ new Set();
	for (const entry of ordered) {
		const unit = unitById(entry.unitId);
		if (!unit) continue;
		const count = counts.get(entry.unitId) ?? 0;
		if (count >= copyLimit(unit, roster.detachments)) continue;
		const category = unitCategory(unit, roster.detachments);
		const cap = categoryLimit(category);
		const inCategory = categoryCounts.get(category) ?? 0;
		if (cap != null && inCategory >= cap) continue;
		counts.set(entry.unitId, count + 1);
		categoryCounts.set(category, inCategory + 1);
		keepIds.add(entry.id);
	}
	const kept = roster.entries.filter((entry) => keepIds.has(entry.id));
	const ids = new Set(kept.map((entry) => entry.id));
	const entries = kept.map((entry) => entry.attachedTo && !ids.has(entry.attachedTo) ? {
		...entry,
		attachedTo: void 0
	} : entry);
	const characters = entries.filter((entry) => isCharacter(entry.unitId));
	const warlordId = characters.some((entry) => entry.id === roster.warlordId) ? roster.warlordId : characters.length === 1 ? characters[0].id : void 0;
	return {
		...roster,
		warlordId,
		mainDisposition: cleanMainDisposition(roster.detachments, roster.mainDisposition),
		entries: arrange(entries, warlordId)
	};
}
function dispositionChoices(detachments) {
	const choices = [];
	for (const id of detachments) for (const name of detachmentById(id)?.dispositions ?? []) if (!choices.includes(name)) choices.push(name);
	return choices;
}
function cleanMainDisposition(detachments, value) {
	const choices = dispositionChoices(detachments);
	if (value && choices.includes(value)) return value;
	return choices.length === 1 ? choices[0] : void 0;
}
function enhancementSlots(entries, exceptId) {
	return new Set(entries.filter((entry) => entry.id !== exceptId && entry.enhancementId).map((entry) => entry.enhancementId));
}
function choicesFor(entry, roster) {
	const slots = enhancementSlots(roster.entries, entry.id);
	return ENHANCEMENTS.filter((enhancement) => {
		if (!roster.detachments.includes(enhancement.detachment)) return false;
		if (!enhancement.targets.includes(entry.unitId)) return false;
		if (entry.enhancementId === enhancement.id) return true;
		if (partnerEntry(entry, roster.entries)?.enhancementId) return false;
		if (!repeatable(enhancement) && roster.entries.some((other) => other.enhancementId === enhancement.id)) return false;
		if (!slots.has(enhancement.id) && slots.size >= 4) return false;
		return true;
	});
}
function legalDetachments(ids) {
	if (ids.includes("guardians")) return ["guardians"];
	const kept = [];
	let uniqueTaken = false;
	for (const id of ids) {
		const detachment = detachmentById(id);
		if (!detachment) continue;
		if (detachment.unique && uniqueTaken) continue;
		if (spentDp([...kept, id]) > 3) continue;
		kept.push(id);
		if (detachment.unique) uniqueTaken = true;
	}
	return kept;
}
function rosterFrom(parsed) {
	if (!parsed) return EMPTY;
	const entries = Array.isArray(parsed.entries) ? parsed.entries.flatMap((entry, index) => {
		if (!entry || typeof entry.id !== "string" || typeof entry.unitId !== "string" || typeof entry.models !== "number") return [];
		const unitId = entry.unitId === "shield-captain-shield" ? "shield-captain" : entry.unitId;
		if (!unitById(unitId) || !sizeOf(unitById(unitId), entry.models)) return [];
		const next = {
			id: entry.id,
			unitId,
			models: entry.models,
			addedAt: typeof entry.addedAt === "number" ? entry.addedAt : index
		};
		if (entry.unitId === "shield-captain-shield") next.gear = { weapon: "shield-pyrithite" };
		if (typeof entry.attachedTo === "string") next.attachedTo = entry.attachedTo;
		if (typeof entry.enhancementId === "string") next.enhancementId = entry.enhancementId;
		const gear = cleanGear(next.unitId, next.gear ?? entry.gear);
		if (gear) next.gear = gear;
		return [next];
	}) : [];
	const detachments = legalDetachments(Array.isArray(parsed.detachments) ? parsed.detachments.filter((id) => typeof id === "string") : []);
	const ids = new Set(entries.map((entry) => entry.id));
	for (const entry of entries) {
		if (!entry.attachedTo || !ids.has(entry.attachedTo)) {
			delete entry.attachedTo;
			continue;
		}
		const body = entries.find((candidate) => candidate.id === entry.attachedTo);
		if (!body || !canLead(entry.unitId, body.unitId, detachments)) delete entry.attachedTo;
	}
	const taken = /* @__PURE__ */ new Set();
	for (const entry of entries) {
		if (!entry.attachedTo) continue;
		if (taken.has(entry.attachedTo)) delete entry.attachedTo;
		else taken.add(entry.attachedTo);
	}
	const seenEnhancements = /* @__PURE__ */ new Set();
	for (const entry of entries) {
		const enhancement = entry.enhancementId ? enhancementById(entry.enhancementId) : void 0;
		const partner = partnerEntry(entry, entries);
		const allowed = enhancement && detachments.includes(enhancement.detachment) && enhancement.targets.includes(entry.unitId) && !partner?.enhancementId && (repeatable(enhancement) || !seenEnhancements.has(enhancement.id)) && (seenEnhancements.has(enhancement.id) || seenEnhancements.size < 4);
		if (!enhancement || !allowed) {
			delete entry.enhancementId;
			continue;
		}
		seenEnhancements.add(enhancement.id);
	}
	const stored = parsed;
	const legacyMain = stored.mainDispositions ? Object.values(stored.mainDispositions).find((value) => typeof value === "string") : void 0;
	const warlordId = typeof parsed.warlordId === "string" ? parsed.warlordId : void 0;
	return settle({
		name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name : EMPTY.name,
		limit: typeof parsed.limit === "number" && parsed.limit > 0 ? parsed.limit : EMPTY.limit,
		detachments,
		mainDisposition: typeof parsed.mainDisposition === "string" ? parsed.mainDisposition : legacyMain,
		warlordId,
		building: parsed.building === true,
		entries
	});
}
function loadLibrary() {
	try {
		const raw = localStorage.getItem(LIBRARY_KEY);
		if (raw != null) {
			const parsed = JSON.parse(raw);
			if (Array.isArray(parsed)) return parsed.flatMap((item) => {
				if (!item || typeof item !== "object") return [];
				const source = item;
				return [{
					...rosterFrom(source),
					id: typeof source.id === "string" ? source.id : crypto.randomUUID(),
					updatedAt: typeof source.updatedAt === "number" ? source.updatedAt : Date.now()
				}];
			});
		}
	} catch {
		return [];
	}
	try {
		const legacy = localStorage.getItem(STORAGE_KEY);
		if (!legacy) return [];
		const roster = rosterFrom(JSON.parse(legacy));
		if (!roster.detachments.length && !roster.entries.length) return [];
		return [{
			...roster,
			id: crypto.randomUUID(),
			updatedAt: Date.now()
		}];
	} catch {
		return [];
	}
}
var UNIQUE_ORDER = [
	"shadowkeepers",
	"solar",
	"dread-host",
	"emissaries",
	"chosen",
	"aquilan"
];
function orderedDetachments(unique) {
	const items = DETACHMENTS.filter((detachment) => Boolean(detachment.unique) === unique);
	if (!unique) return items;
	return UNIQUE_ORDER.map((id) => items.find((detachment) => detachment.id === id)).filter((item) => item != null);
}
function DetachmentChoices({ selected, mainDisposition, onToggle, onMainDisposition, onRules }) {
	const guardians = selected.includes("guardians");
	const uniqueTaken = selected.some((id) => detachmentById(id)?.unique);
	const groups = [{
		title: "Shield Hosts",
		hint: "Only one of these can be taken.",
		items: orderedDetachments(true)
	}, {
		title: "Other detachments",
		hint: "These can be combined with each other, and with one unique.",
		items: orderedDetachments(false)
	}];
	const choices = dispositionChoices(selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [choices.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg",
			children: "Main disposition"
		}), choices.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted",
			children: ["Choose one from the detachments below", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				"aria-label": "Main disposition",
				value: mainDisposition && choices.includes(mainDisposition) ? mainDisposition : "",
				onChange: (event) => onMainDisposition(event.target.value),
				className: "weapon-select mt-1 h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					disabled: true,
					children: "Choose"
				}), choices.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: name,
					children: name
				}, name))]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm",
			children: choices[0]
		})] }) : null, groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: group.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: group.hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2",
				children: group.items.map((detachment) => {
					const on = selected.includes(detachment.id);
					const blocked = !on && (detachment.unique && uniqueTaken && !guardians || detachment.id !== "guardians" && !guardians && spentDp(selected) + detachment.dp > 3);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-lg border px-4 py-3 ${on ? "border-gold bg-surface" : "border-line bg-bg"} ${blocked ? "opacity-40" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: blocked,
							onClick: () => onToggle(detachment.id),
							className: "flex min-h-11 w-full flex-col items-start text-left disabled:cursor-not-allowed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex w-full items-baseline justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base font-medium",
										children: detachment.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-gold",
										children: [detachment.dp, " DP"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 text-xs text-muted",
									children: [detachment.unique ? "Shield Host" : "Detachment", detachment.rule ? ` · ${detachment.rule.name}` : ""]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 text-xs text-muted",
									children: ["Force disposition: ", detachment.dispositions.join(", ")]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								disabled: !on,
								onClick: () => onToggle(detachment.id),
								className: `min-h-11 rounded-lg border px-3 text-xs disabled:opacity-40 ${on ? "border-gold text-gold" : "border-line text-muted"}`,
								children: "Deselect"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => onRules(detachment.id),
								className: "min-h-11 rounded-lg border border-line px-3 text-xs text-muted",
								children: "Rules"
							})]
						})]
					}, detachment.id);
				})
			})
		] }, group.title))]
	});
}
function HomeButton({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "min-h-11 w-fit rounded-lg border border-line px-3 py-2 text-sm",
		children: "Home"
	});
}
function ListBuilder() {
	const [lists, setLists] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [screen, setScreen] = (0, import_react.useState)("home");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("All");
	const [panel, setPanel] = (0, import_react.useState)("units");
	const [sizes, setSizes] = (0, import_react.useState)({});
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [draftGear, setDraftGear] = (0, import_react.useState)({});
	const [sheet, setSheet] = (0, import_react.useState)(null);
	const [rulesIds, setRulesIds] = (0, import_react.useState)(null);
	const [coreOpen, setCoreOpen] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [theme, setTheme] = (0, import_react.useState)("auramite");
	const [reduceMotion, setReduceMotion] = (0, import_react.useState)(false);
	const roster = lists.find((list) => list.id === activeId) ?? EMPTY;
	function setRoster(update) {
		setLists((currentLists) => currentLists.map((list) => {
			if (list.id !== activeId) return list;
			return {
				...typeof update === "function" ? update(list) : update,
				id: list.id,
				updatedAt: Date.now()
			};
		}));
	}
	(0, import_react.useEffect)(() => {
		setLists(loadLibrary());
		const nextTheme = loadTheme();
		const nextMotion = loadReduceMotion();
		setTheme(nextTheme);
		setReduceMotion(nextMotion);
		applySettings(nextTheme, nextMotion);
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		localStorage.setItem(LIBRARY_KEY, JSON.stringify(lists));
	}, [lists, ready]);
	const priced = (0, import_react.useMemo)(() => price(roster.entries), [roster.entries]);
	const total = priced.reduce((sum, entry) => sum + entry.cost, 0);
	const remaining = roster.limit - total;
	const over = remaining < 0;
	const fill = roster.limit > 0 ? Math.min(100, Math.round(total / roster.limit * 100)) : 0;
	function chooseTheme(next) {
		setTheme(next);
		applySettings(next, reduceMotion);
	}
	function chooseMotion(next) {
		setReduceMotion(next);
		applySettings(theme, next);
	}
	const settings = settingsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
		theme,
		reduceMotion,
		onTheme: chooseTheme,
		onMotion: chooseMotion,
		onClose: () => setSettingsOpen(false)
	}) : null;
	function nextStamp(entries) {
		const latest = entries.reduce((max, entry) => Math.max(max, entry.addedAt ?? 0), 0);
		return Math.max(Date.now(), latest + 1);
	}
	function chosenModels(unit) {
		return sizes[unit.id] ?? unit.sizes[0].models;
	}
	function add(unit, models) {
		setRoster((current) => {
			if (nextCost(unit, models, current.entries, current.detachments) == null) return current;
			return settle({
				...current,
				entries: [...current.entries, {
					id: crypto.randomUUID(),
					unitId: unit.id,
					models,
					addedAt: nextStamp(current.entries),
					gear: cleanGear(unit.id, draftGear[unit.id])
				}]
			});
		});
	}
	function remove(id) {
		setRoster((current) => settle({
			...current,
			entries: current.entries.filter((entry) => entry.id !== id).map((entry) => entry.attachedTo === id ? {
				...entry,
				attachedTo: void 0
			} : entry)
		}));
	}
	function attach(leaderId, bodyId) {
		setRoster((current) => settle({
			...current,
			entries: current.entries.map((entry) => {
				if (entry.id === leaderId) {
					const body = current.entries.find((candidate) => candidate.id === bodyId);
					const drop = Boolean(bodyId && body?.enhancementId && entry.enhancementId);
					return {
						...entry,
						attachedTo: bodyId || void 0,
						enhancementId: drop ? void 0 : entry.enhancementId
					};
				}
				if (bodyId && entry.id !== leaderId && entry.attachedTo === bodyId) return {
					...entry,
					attachedTo: void 0
				};
				return entry;
			})
		}));
	}
	function setDraft(unitId, groupId, choiceId) {
		setDraftGear((current) => {
			const next = { ...current[unitId] ?? {} };
			if (!choiceId) delete next[groupId];
			else next[groupId] = choiceId;
			return {
				...current,
				[unitId]: next
			};
		});
	}
	function setEntryGear(entryId, groupId, choiceId) {
		setRoster((current) => ({
			...current,
			entries: current.entries.map((entry) => {
				if (entry.id !== entryId) return entry;
				const next = { ...entry.gear ?? {} };
				if (!choiceId) delete next[groupId];
				else next[groupId] = choiceId;
				return {
					...entry,
					gear: cleanGear(entry.unitId, next)
				};
			})
		}));
	}
	function setEnhancement(entryId, enhancementId) {
		setRoster((current) => ({
			...current,
			entries: current.entries.map((entry) => {
				if (entry.id !== entryId) return entry;
				if (!enhancementId) return {
					...entry,
					enhancementId: void 0
				};
				return choicesFor(entry, current).some((enhancement) => enhancement.id === enhancementId) ? {
					...entry,
					enhancementId
				} : entry;
			})
		}));
	}
	function toggleDetachment(id) {
		setRoster((current) => {
			const detachment = detachmentById(id);
			if (!detachment) return current;
			let detachments;
			if (current.detachments.includes(id)) detachments = current.detachments.filter((picked) => picked !== id);
			else if (detachment.dp === 3 || current.detachments.includes("guardians")) detachments = [id];
			else if (detachment.unique && current.detachments.some((picked) => detachmentById(picked)?.unique)) return current;
			else if (spentDp(current.detachments) + detachment.dp > 3) return current;
			else detachments = [...current.detachments, id];
			return settle({
				...current,
				detachments,
				entries: current.entries.map((entry) => {
					const enhancement = entry.enhancementId ? enhancementById(entry.enhancementId) : void 0;
					if (enhancement && !detachments.includes(enhancement.detachment)) return {
						...entry,
						enhancementId: void 0
					};
					return entry;
				})
			});
		});
	}
	function setMainDisposition(disposition) {
		setRoster((current) => settle({
			...current,
			mainDisposition: disposition
		}));
	}
	function setWarlord(id) {
		setRoster((current) => settle({
			...current,
			warlordId: id
		}));
	}
	function exportText() {
		const detachmentNames = roster.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ");
		const used = /* @__PURE__ */ new Set();
		const blocks = [];
		const line = (entry, nested) => {
			const notes = [];
			if (entry.id === roster.warlordId) notes.push("Warlord");
			const enhancement = entry.enhancementId ? enhancementById(entry.enhancementId) : void 0;
			if (enhancement) notes.push(enhancement.name);
			const detail = notes.length ? ` (${notes.join(", ")})` : "";
			const kit = gearLine(entry.unitId, entry.gear, false);
			return `${nested ? "- " : ""}${entry.unit.name} x${entry.models}${detail}${kit ? ` — ${kit}` : ""}`;
		};
		for (const entry of priced) {
			if (used.has(entry.id)) continue;
			const host = entry.attachedTo ? priced.find((candidate) => candidate.id === entry.attachedTo) : void 0;
			if (host) {
				used.add(entry.id);
				used.add(host.id);
				blocks.push(`${line(entry, false)}\n${line(host, true)}`);
				continue;
			}
			if (priced.some((leader) => leader.attachedTo === entry.id)) continue;
			used.add(entry.id);
			blocks.push(line(entry, false));
		}
		return [
			roster.name,
			`${total} pts / ${roster.limit} pts`,
			detachmentNames,
			"",
			blocks.join("\n\n")
		].filter((line, index) => index !== 2 || line).join("\n");
	}
	async function copyList() {
		const text = exportText();
		try {
			await navigator.clipboard.writeText(text);
		} catch {
			return;
		}
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	}
	const visible = UNITS.filter((unit) => category === "All" || unitCategory(unit, roster.detachments) === category);
	function createList() {
		const id = crypto.randomUUID();
		const list = {
			...EMPTY,
			name: "New list",
			id,
			updatedAt: Date.now()
		};
		setLists((current) => [list, ...current]);
		setActiveId(id);
		setScreen("detachments");
	}
	function openList(id) {
		const list = lists.find((item) => item.id === id);
		if (!list) return;
		setActiveId(id);
		setScreen(list.detachments.length ? "units" : "detachments");
	}
	function deleteList(id) {
		setLists((current) => current.filter((list) => list.id !== id));
		if (activeId === id) {
			setActiveId(null);
			setScreen("home");
		}
	}
	function leaveToHome() {
		setLists((current) => current.filter((list) => list.id !== activeId || list.detachments.length > 0 || list.entries.length > 0));
		setActiveId(null);
		setScreen("home");
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "min-h-screen" });
	if (screen === "home" || !activeId && screen !== "saved") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-gold uppercase",
					children: "Adeptus Custodes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl leading-tight",
					children: "The Ten Thousand's List Builder"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-sm text-muted",
					children: "Create a list, or open one you already saved."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: createList,
						className: "min-h-11 rounded-lg bg-gold px-4 py-4 text-left text-base font-medium text-bg",
						children: "Create a list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScreen("saved"),
						className: "min-h-11 rounded-lg border border-line bg-surface px-4 py-4 text-left text-base font-medium",
						children: "View a saved list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCoreOpen(true),
						className: "min-h-11 rounded-lg border border-line px-4 py-3 text-left text-sm",
						children: "Core rules"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSettingsOpen(true),
						className: "min-h-11 rounded-lg border border-line px-4 py-3 text-left text-sm",
						children: "Settings"
					})
				]
			}),
			coreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreRules, { onClose: () => setCoreOpen(false) }) : null,
			settings
		]
	});
	if (screen === "saved") {
		const saved = [...lists].sort((a, b) => b.updatedAt - a.updatedAt);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeButton, { onClick: () => setScreen("home") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-gold uppercase",
					children: "Adeptus Custodes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl leading-tight",
					children: "Saved lists"
				})] })]
			}), saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No saved lists."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: createList,
					className: "min-h-11 w-fit rounded-lg bg-gold px-4 py-3 text-sm font-medium text-bg",
					children: "Create a list"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: saved.map((list) => {
					const points = price(list.entries).reduce((sum, entry) => sum + entry.cost, 0);
					const names = list.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-stretch gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openList(list.id),
							className: "min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 py-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-base font-medium",
									children: list.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 text-sm text-gold",
									children: [
										points,
										" pts / ",
										list.limit,
										" pts"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-muted",
								children: [
									names || "No detachments",
									" · ",
									list.entries.length,
									" ",
									list.entries.length === 1 ? "unit" : "units"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Delete ${list.name}`,
							onClick: () => deleteList(list.id),
							className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
						})]
					}, list.id);
				})
			})]
		});
	}
	if (screen === "detachments") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6 pb-24",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeButton, { onClick: leaveToHome }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-gold uppercase",
								children: "Adeptus Custodes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-1 font-display text-3xl leading-tight",
								children: "Choose detachments"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCoreOpen(true),
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
									children: "Core rules"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSettingsOpen(true),
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
									children: "Settings"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-xl text-sm text-muted",
						children: [
							"Choose detachments before the list. You have ",
							3,
							" detachment points. Guardians of the Throne costs 3. Shield Hosts cannot be taken together. Use Deselect on a highlighted detachment to remove it."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm text-muted",
						children: [
							spentDp(roster.detachments),
							" / ",
							3,
							" DP"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 block text-xs tracking-wide text-muted uppercase",
						children: ["List name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							"aria-label": "List name",
							value: roster.name,
							onChange: (event) => setRoster((current) => ({
								...current,
								name: event.target.value
							})),
							className: "mt-1 w-full rounded-lg border border-line bg-surface px-3 py-3 text-base font-normal tracking-normal text-fg normal-case"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetachmentChoices, {
					selected: roster.detachments,
					mainDisposition: roster.mainDisposition,
					onToggle: toggleDetachment,
					onMainDisposition: setMainDisposition,
					onRules: (id) => setRulesIds([id])
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-x-0 bottom-0 border-t border-line bg-bg pb-[env(safe-area-inset-bottom)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: dispositionChoices(roster.detachments).length > 1 && !roster.mainDisposition ? "Choose a main disposition" : `${spentDp(roster.detachments)} / 3 DP`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: roster.detachments.length === 0 || dispositionChoices(roster.detachments).length > 1 && !roster.mainDisposition,
							onClick: () => {
								setRoster((current) => ({
									...current,
									building: true
								}));
								setScreen("units");
							},
							className: "min-h-11 rounded-lg bg-gold px-4 py-3 text-sm font-medium text-bg disabled:opacity-40",
							children: "Build list"
						})]
					})
				})
			]
		}),
		rulesIds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetachmentSheet, {
			ids: rulesIds,
			onClose: () => setRulesIds(null)
		}) : null,
		coreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreRules, { onClose: () => setCoreOpen(false) }) : null,
		settings
	] });
	if (screen === "play") {
		const playEntries = priced.map((entry) => ({
			id: entry.id,
			unitId: entry.unitId,
			name: entry.unit.name,
			models: entry.models,
			cost: entry.cost,
			warlord: entry.id === roster.warlordId,
			enhancement: entry.enhancementId ? enhancementById(entry.enhancementId)?.name : void 0,
			gearText: gearLine(entry.unitId, entry.gear) || void 0,
			gear: entry.gear,
			attachedTo: entry.attachedTo
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayView, {
			name: roster.name,
			total,
			limit: roster.limit,
			detachments: roster.detachments,
			mainDisposition: roster.mainDisposition,
			dispositionChoices: dispositionChoices(roster.detachments),
			onMainDisposition: setMainDisposition,
			entries: playEntries,
			onBack: () => setScreen("units"),
			onHome: leaveToHome
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl min-w-0 flex-col gap-4 overflow-x-hidden px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3 border-b border-line pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: leaveToHome,
							className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
							children: "Home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setScreen("play"),
							className: "min-h-11 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-bg",
							children: "Play"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-gold uppercase",
								children: "The Ten Thousand"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Army name",
								value: roster.name,
								onChange: (event) => setRoster((current) => ({
									...current,
									name: event.target.value
								})),
								className: "mt-1 w-full bg-transparent font-display text-2xl leading-tight text-fg outline-none"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex shrink-0 flex-col gap-1 text-xs tracking-wide text-muted uppercase",
							children: ["Limit", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 1,
								step: 50,
								value: roster.limit,
								onChange: (event) => setRoster((current) => ({
									...current,
									limit: Math.max(1, Number(event.target.value) || 0)
								})),
								className: "w-24 rounded-lg border border-line bg-surface px-3 py-2 text-base text-fg"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `font-display text-3xl tabular-nums ${over ? "text-danger" : "text-fg"}`,
							children: [
								total,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-sans text-base font-normal tracking-normal",
									children: "pts"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `text-sm ${over ? "text-danger" : "text-muted"}`,
							children: [
								over ? `${Math.abs(remaining)} pts over` : `${remaining} pts left`,
								" of ",
								roster.limit,
								" pts"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full ${over ? "bg-danger" : "bg-gold"}`,
							style: { width: `${fill}%` }
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm break-words",
								children: roster.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ") || "No detachments"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									spentDp(roster.detachments),
									" / ",
									3,
									" DP · ",
									enhancementSlots(roster.entries).size,
									" / ",
									4,
									" ",
									"enhancements"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setCoreOpen(true),
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
									children: "Core rules"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSettingsOpen(true),
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
									children: "Settings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRulesIds(roster.detachments),
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
									children: "Rules"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setScreen("detachments"),
									className: "min-h-11 rounded-lg border border-line px-3 py-2 text-sm",
									children: "Change"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: ["units", "list"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setPanel(key),
					className: `min-h-11 rounded-lg border px-3 text-sm ${panel === key ? "border-gold bg-gold text-bg" : "border-line bg-surface text-fg"}`,
					children: key === "units" ? "Units" : `List (${priced.length})`
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `min-w-0 ${panel === "list" ? "hidden" : "section-open"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex min-w-0 gap-2 overflow-x-auto border-b border-line py-3",
							children: ["All", ...CATEGORIES].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCategory(item),
								className: `min-h-11 shrink-0 rounded-full border px-3 text-sm ${category === item ? "border-gold bg-gold text-bg" : "border-line text-muted"}`,
								children: item
							}, item))
						}),
						category !== "All" && categoryLimit(category) != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pt-2 text-xs text-muted",
							children: [
								categoryCount(category, roster.entries, roster.detachments),
								" of ",
								categoryLimit(category),
								" ",
								category
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0",
							children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-6 text-sm text-muted",
								children: "Nothing matches."
							}) : visible.map((unit) => {
								const models = chosenModels(unit);
								sizeOf(unit, models);
								const upcoming = nextCost(unit, models, roster.entries, roster.detachments);
								const gearCost = gearPoints(unit.id, draftGear[unit.id]);
								const shown = upcoming == null ? null : upcoming + gearCost;
								const taken = roster.entries.filter((entry) => entry.unitId === unit.id).length;
								const nextLine = upcoming == null ? null : priceLine(unit, models, taken, { wargear: gearCost });
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "min-w-0 border-b border-line py-4 last:border-b-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-base leading-snug font-medium break-words",
													children: unit.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-0.5 text-xs text-muted",
													children: unitCategory(unit, roster.detachments)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												disabled: shown == null,
												onClick: () => add(unit, models),
												className: "inline-flex min-h-11 shrink-0 items-center gap-1 rounded-lg bg-gold px-3 text-sm font-medium text-bg disabled:opacity-40",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
													className: "size-4",
													"aria-hidden": "true"
												}), shown == null ? "Max" : `${shown} pts`]
											})]
										}),
										unit.sizes.length > 1 || unit.sizes[0].models > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-3 flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": `Fewer ${unit.name} models`,
													disabled: unit.sizes.findIndex((option) => option.models === models) <= 0,
													onClick: () => {
														const index = unit.sizes.findIndex((option) => option.models === models);
														const next = unit.sizes[index - 1];
														if (!next) return;
														setSizes((current) => ({
															...current,
															[unit.id]: next.models
														}));
													},
													className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-fg disabled:opacity-40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
														className: "size-4",
														"aria-hidden": "true"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "min-w-12 text-center text-sm tabular-nums",
													children: ["x", models]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": `More ${unit.name} models`,
													disabled: unit.sizes.findIndex((option) => option.models === models) >= unit.sizes.length - 1,
													onClick: () => {
														const index = unit.sizes.findIndex((option) => option.models === models);
														const next = unit.sizes[index + 1];
														if (!next) return;
														setSizes((current) => ({
															...current,
															[unit.id]: next.models
														}));
													},
													className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-fg disabled:opacity-40",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
														className: "size-4",
														"aria-hidden": "true"
													})
												})
											]
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs break-words text-muted",
											children: nextLine ?? costNote(unit, models, copyLimit(unit, roster.detachments))
										}),
										attachSummary(unit.id) || unit.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted",
											children: [attachSummary(unit.id), unit.note].filter(Boolean).join(" · ")
										}) : null,
										armedWith(unit.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs text-muted",
											children: armedWith(unit.id)
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WargearPicker, {
											unitId: unit.id,
											gear: draftGear[unit.id],
											onGear: (groupId, choiceId) => setDraft(unit.id, groupId, choiceId)
										}),
										datasheetById(unit.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSheet({ unitId: unit.id }),
											className: "mt-1 inline-flex min-h-11 items-center text-xs text-gold",
											children: "Datasheet"
										}) : null
									]
								}, unit.id);
							})
						})
					]
				}, panel === "units" ? "units" : "units-hidden"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: panel === "units" ? "hidden" : "section-open",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 border-b border-line py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg",
							children: "List"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: copyList,
								className: "min-h-11 rounded-lg border border-line px-3 text-sm text-fg",
								children: copied ? "Copied" : "Copy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setRoster((current) => settle({
									...current,
									entries: [],
									warlordId: void 0
								})),
								className: "min-h-11 rounded-lg border border-line px-3 text-sm text-muted",
								children: "Clear"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: priced.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-sm text-muted",
						children: "Add a unit."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [priced.some((entry) => isCharacter(entry.unitId)) && !roster.warlordId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "border-b border-line py-3 text-sm text-danger",
						children: "Choose a warlord."
					}) : null, priced.map((entry) => {
						const targets = priced.filter((candidate) => candidate.id !== entry.id && canLead(entry.unitId, candidate.unitId, roster.detachments) && (!priced.some((leader) => leader.attachedTo === candidate.id) || entry.attachedTo === candidate.id));
						const leader = priced.find((candidate) => candidate.attachedTo === entry.id);
						const character = isCharacter(entry.unitId);
						const warlord = entry.id === roster.warlordId;
						const kit = gearLineCounted(entry.unitId, entry.gear, entry.models);
						const line = priceLine(entry.unit, entry.models, entry.copy - 1, {
							wargear: gearPoints(entry.unitId, entry.gear),
							enhancement: entry.enhancementId ? enhancementById(entry.enhancementId)?.points ?? 0 : 0
						});
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: `border-b border-line py-3 last:border-b-0 ${leader ? "border-l-2 border-l-gold pl-4" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-medium break-words",
											children: [entry.unit.name, entry.models > 1 ? ` x${entry.models}` : ""]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs break-words text-muted",
											children: [
												line,
												entry.unit.maxCopies === 1 ? " · one only" : "",
												warlord ? " · Warlord" : "",
												leader ? ` · led by ${leader.unit.name}` : "",
												entry.enhancementId ? ` · ${enhancementById(entry.enhancementId)?.name ?? ""}` : ""
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "shrink-0 text-sm text-gold tabular-nums",
										children: [entry.cost, " pts"]
									})]
								}),
								kit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs break-words text-muted",
									children: kit
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WargearPicker, {
									unitId: entry.unitId,
									gear: entry.gear,
									onGear: (groupId, choiceId) => setEntryGear(entry.id, groupId, choiceId)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap items-center gap-2",
									children: [
										character ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": warlord,
											onClick: () => setWarlord(entry.id),
											className: `inline-flex min-h-11 items-center gap-1 rounded-lg border px-3 text-xs ${warlord ? "border-gold bg-gold text-bg" : "border-line text-muted"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {
												className: "size-4",
												"aria-hidden": "true"
											}), "Warlord"]
										}) : null,
										datasheetById(entry.unitId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSheet({
												unitId: entry.unitId,
												entryId: entry.id
											}),
											className: "inline-flex min-h-11 items-center rounded-lg border border-line px-3 text-xs text-gold",
											children: "Datasheet"
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Remove ${entry.unit.name}`,
											onClick: () => remove(entry.id),
											className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-line text-muted",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
										})
									]
								}),
								attachSummary(entry.unitId) && (targets.length > 0 || entry.attachedTo) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted",
									children: ["Attached to", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": `Attach ${entry.unit.name}`,
										value: entry.attachedTo ?? "",
										onChange: (event) => attach(entry.id, event.target.value),
										className: "wargear-select mt-1 h-8 w-fit max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Not attached"
										}), targets.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: candidate.id,
											children: [
												candidate.unit.name,
												candidate.models > 1 ? ` x${candidate.models}` : "",
												" · ",
												ordinal(candidate.copy)
											]
										}, candidate.id))]
									})]
								}) : null,
								(() => {
									const choices = choicesFor(entry, roster);
									const partnerHas = Boolean(partnerEntry(entry, roster.entries)?.enhancementId);
									if (!ENHANCEMENTS.some((enhancement) => roster.detachments.includes(enhancement.detachment) && enhancement.targets.includes(entry.unitId)) && !entry.enhancementId) return null;
									if (partnerHas && !entry.enhancementId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted",
										children: "This squad already has an enhancement."
									});
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted",
										children: ["Enhancement", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											"aria-label": `Enhancement for ${entry.unit.name}`,
											value: entry.enhancementId ?? "",
											onChange: (event) => setEnhancement(entry.id, event.target.value),
											className: "wargear-select mt-1 h-8 w-fit max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "None"
											}), choices.map((enhancement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
												value: enhancement.id,
												children: [
													enhancement.name,
													" +",
													enhancement.points,
													" pts",
													enhancement.once ? " · one per army" : enhancement.upgrade ? " · upgrade" : ""
												]
											}, enhancement.id))]
										})]
									});
								})()
							]
						}, entry.id);
					})] }) })]
				}, panel === "list" ? "list" : "list-hidden")]
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatasheetView, {
				unitId: sheet.unitId,
				unitName: unitById(sheet.unitId)?.name ?? "Datasheet",
				gear: sheet.entryId ? roster.entries.find((entry) => entry.id === sheet.entryId)?.gear : void 0,
				enhancement: (() => {
					const picked = sheet.entryId ? roster.entries.find((entry) => entry.id === sheet.entryId)?.enhancementId : void 0;
					const rule = picked ? enhancementById(picked) : void 0;
					return rule ? {
						name: rule.name,
						rule: rule.rule
					} : void 0;
				})(),
				listOnly: Boolean(sheet.entryId),
				onClose: () => setSheet(null)
			}) : null,
			rulesIds ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetachmentSheet, {
				ids: rulesIds,
				onClose: () => setRulesIds(null)
			}) : null,
			coreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreRules, { onClose: () => setCoreOpen(false) }) : null,
			settings
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListBuilder, {});
}
//#endregion
export { Home as component };
