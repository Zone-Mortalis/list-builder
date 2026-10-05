import { i as __toESM } from "../_runtime.mjs";
import { n as require_react, t as useAutoAnimate } from "../_libs/formkit__auto-animate+react.mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Minus, c as Check, i as Plus, o as Crown, r as Trash2, s as ChevronDown, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bdf8ePBy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Keep in sync with --motion-duration and --motion-ease in styles.css. */
var LIST_MOTION = {
	duration: 180,
	easing: "cubic-bezier(0.22, 1, 0.36, 1)",
	disrespectUserMotionPreference: true
};
function motionEnabled() {
	if (typeof document === "undefined") return false;
	const mode = document.documentElement.dataset.motion;
	if (mode === "on") return false;
	if (mode === "off") return true;
	return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function useListMotion() {
	const [parent, enable] = useAutoAnimate(LIST_MOTION);
	(0, import_react.useEffect)(() => {
		const sync = () => enable(motionEnabled());
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-motion"]
		});
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		media.addEventListener("change", sync);
		return () => {
			observer.disconnect();
			media.removeEventListener("change", sync);
		};
	}, [enable]);
	return parent;
}
function useSheetClose(onClose) {
	const [closing, setClosing] = (0, import_react.useState)(false);
	const onCloseRef = (0, import_react.useRef)(onClose);
	onCloseRef.current = onClose;
	const close = (0, import_react.useCallback)(() => {
		if (!motionEnabled()) {
			onCloseRef.current();
			return;
		}
		setClosing(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!closing) return;
		const timer = window.setTimeout(() => onCloseRef.current(), 320);
		return () => window.clearTimeout(timer);
	}, [closing]);
	const onTransitionEnd = (event) => {
		if (event.target !== event.currentTarget) return;
		if (event.propertyName !== "transform") return;
		if (closing) onCloseRef.current();
	};
	return {
		closing,
		close,
		onTransitionEnd
	};
}
function SheetFrame({ label, onClose, children }) {
	const { closing, close, onTransitionEnd } = useSheetClose(onClose);
	(0, import_react.useEffect)(() => {
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => {
			if (event.key === "Escape") close();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [close]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `sheet-backdrop fixed inset-0 z-50 flex items-end justify-center bg-black/70 ${closing ? "is-closing" : ""}`,
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "dialog",
			"aria-modal": "true",
			"aria-label": label,
			className: `sheet-panel max-h-[88vh] w-full max-w-lg overflow-auto rounded-t-xl border border-line bg-surface px-4 py-4 ${closing ? "is-closing" : ""}`,
			onClick: (event) => event.stopPropagation(),
			onTransitionEnd,
			children: children(close)
		})
	});
}
function Reveal({ cue, className, children }) {
	const ready = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		ready.current = true;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: [ready.current ? "section-open" : "", className].filter(Boolean).join(" "),
		children
	}, cue);
}
function Collapse({ open, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `collapse-panel ${open ? "is-open" : ""}`,
		inert: open ? void 0 : true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "collapse-inner",
			children
		})
	});
}
function MotionSwap({ cue, className, children }) {
	const ready = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		ready.current = true;
	}, []);
	const swap = ready.current ? "motion-swap" : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: [swap, className].filter(Boolean).join(" "),
		children
	}, cue);
}
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
var NUNCIO = "Once per battle, at the start of any Command phase, select one objective marker within 6\" of the bearer. Enemy units within range of that marker, except Monsters and Vehicles, take a Battle-shock test. Each objective marker can only be targeted by this ability once per turn.";
var FIRING_DECK = "Firing Deck 2. When this transport shoots, up to 2 embarked models each lend one ranged weapon that is not One Shot. Those units cannot shoot for the rest of the turn.";
var CODE_CHIVALRIC = {
	name: "Code Chivalric",
	rule: "If your Army Faction is Imperial Knights, choose or roll one Deed and one Quality at the end of Read Mission Objectives. Qualities: re-roll one Hit roll and one Wound roll when selected to shoot or fight; +2\" Move and +1 to Advance and Charge rolls; or +2 Objective Control and +1 Leadership. The first time the Deed is completed, the army is Honoured and you gain 2CP, or 3CP if the Deed or the Quality was rolled. Deeds: destroy a chosen enemy Character; control more objectives at the end of your opponent’s turn; or destroy more enemy units this battle round than the battle round number."
};
var SUPER_HEAVY = {
	name: "Super-heavy Walker",
	rule: "When this model makes a Normal, Advance, or Fall Back move, it can move through models, excluding Titanic models, and through terrain 4\" or less in height. It may move within Engagement Range of enemy models, but it cannot end that move there. If it moves through taller terrain, roll one D6 afterwards: on a 1, it is Battle-shocked."
};
var demise = (value) => ({
	name: "Deadly Demise",
	rule: `Deadly Demise ${value}.`
});
var damagedBracket = (band, oc) => ({
	name: "Damaged",
	rule: `While this model has ${band} wounds remaining, subtract ${oc} from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack.`
});
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
		ranged: [gun("Animus speculum", "Anti-Psyker 2+, Assault, Precision", "24\"", "3", "2+", "5", "−2", "D3")],
		melee: [blade("Life-draining touch", "Anti-Psyker 2+, Devastating Wounds, Precision", "4", "2+", "4", "−2", "2")],
		fixed: "Base 32mm. 1 Animus speculum, 1 Life-draining touch.",
		abilities: [
			{
				name: "Psychic Assassin",
				rule: "Each time you select a Psyker unit as the target of the animus speculum, until those attacks are resolved, that weapon’s Attacks characteristic is 6."
			},
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
				rule: "Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Spectrus Kill Team, Subductor Squad, Vigilant Squad."
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
				rule: "Aquila Kill Team, Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Spectrus Kill Team, Subductor Squad, Vigilant Squad."
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
				rule: "Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Sanctifiers, Sisters of Battle Squad, Spectrus Kill Team, Subductor Squad, Vigilant Squad."
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
		fixed: "Base 60mm. 1 Jindarii tox-cycler, 1 Stubcarbine, 1 Butcher blade, 1 Garralisk’s claws and teeth.",
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
		ranged: [gun("Exitus pistol", "Devastating Wounds, Ignores Cover, Pistol, Precision", "12\"", "3", "2+", "6", "−2", "3"), gun("Exitus rifle", "Devastating Wounds, Heavy, Ignores Cover, Precision", "48\"", "1", "2+", "8", "−3", "D3+3")],
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
		ranged: [
			gun("Bolt pistol", "Pistol", "12\"", "1", "3+", "4", "0", "1"),
			gun("Combi-weapon", "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1", "24\"", "1", "3+", "4", "−2", "1"),
			gun("Psychic Shock Wave", "Devastating Wounds, Psychic, Torrent", "18\"", "2D6", "—", "3", "−2", "1")
		],
		melee: [blade("Inquisitorial melee weapon", "", "5", "3+", "4", "−2", "1"), blade("Force weapon", "Psychic", "4", "3+", "5", "−2", "D3")],
		fixed: "Base 32mm. Starts with a bolt pistol, an Inquisitorial melee weapon, and blessed wardings.",
		swaps: "The pistol can be a combi-weapon. Blessed wardings can be replaced with psychic gifts and Psychic Shock Wave. If it has psychic gifts, the melee weapon can be a force weapon. Psychic gifts give the Psyker keyword.",
		abilities: [
			{
				name: "Leader",
				rule: "Aquila Kill Team, Imperium Battleline Infantry, Deathwatch Terminator Squad, Exaction Squad, Fortis Kill Team, Imperial Navy Breachers, Indomitor Kill Team, Inquisitorial Agents, Proteus Kill Team, Sanctifiers, Sisters of Battle Squad, Spectrus Kill Team, Subductor Squad, Vigilant Squad."
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
		ranged: [gun("Holy pistol", "Pistol", "12\"", "3", "4+", "4", "0", "1"), gun("Zealot’s vindictor", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "0", "1")],
		melee: [blade("Power weapon", "", "3", "4+", "4", "−2", "1"), blade("Zealot’s vindictor", "", "3", "4+", "5", "−1", "2")],
		fixed: "Base 32mm. Starts with a zealot’s vindictor, which can be replaced with a holy pistol and a power weapon. May support one allowed unit.",
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
				rule: "Support, Assigned Agents."
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
		melee: [blade("Force-orb cane", "Psychic", "3", "4+", "6", "−1", "D3")],
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
			gun("Dartmask", "Anti-Infantry 2+, Pistol, Precision", "12\"", "1", "4+", "2", "−1", "D3"),
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
				rule: "Leader, Assigned Agents."
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
		melee: [blade("Vigil spear", "Lance", "6", "2+", "6", "−2", "D3")],
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
	},
	aquila: {
		stats: {
			m: "6\"",
			t: "4",
			sv: "3+",
			w: "2",
			ld: "6+",
			oc: "2"
		},
		profileName: "Kill Team Sergeant, Deathwatch Veteran",
		profiles: [{
			name: "Gravis Veteran",
			stats: {
				m: "5\"",
				t: "6",
				sv: "3+",
				w: "3",
				ld: "6+",
				oc: "2"
			}
		}],
		ranged: [
			gun("Plasma pistol", "Pistol", "12\"", "1", "3+", "7", "−2", "1"),
			gun("Plasma pistol, supercharge", "Hazardous, Pistol", "12\"", "1", "3+", "8", "−3", "2"),
			gun("Bolt pistol", "Pistol, Lethal Hits", "12\"", "1", "3+", "4", "0", "1"),
			gun("Infernus heavy bolter", "Sustained Hits 1", "36\"", "3", "3+", "5", "−1", "2"),
			gun("Infernus heavy bolter, heavy flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "−1", "1"),
			gun("Frag cannon", "Blast, Heavy, Lethal Hits, Rapid Fire D3", "18\"", "D3", "3+", "7", "−2", "2"),
			gun("Hellstorm bolt rifle", "Assault, Heavy, Lethal Hits", "30\"", "2", "3+", "5", "−2", "2"),
			gun("Astartes grenade launcher, frag", "Blast", "24\"", "D3", "3+", "4", "0", "1"),
			gun("Astartes grenade launcher, krak", "", "24\"", "1", "3+", "9", "−2", "D3"),
			gun("Stalker bolt rifle", "Heavy, Lethal Hits, Precision", "30\"", "2", "3+", "5", "−2", "2"),
			gun("Plasma incinerator", "Assault, Heavy", "24\"", "2", "3+", "7", "−2", "1"),
			gun("Plasma incinerator, supercharge", "Assault, Hazardous, Heavy", "24\"", "2", "3+", "8", "−3", "2"),
			gun("Special-issue bolt pistol", "Pistol, Precision, Lethal Hits", "18\"", "1", "3+", "4", "−1", "1"),
			gun("Deathwatch marksman bolt carbine", "Heavy, Lethal Hits", "24\"", "2", "3+", "5", "−1", "1")
		],
		melee: [
			blade("Power weapon", "Sustained Hits 1", "4", "3+", "5", "−2", "2"),
			blade("Close combat weapon", "", "3", "3+", "4", "0", "1"),
			blade("Heavy thunder hammer", "Devastating Wounds", "3", "4+", "10", "−2", "3"),
			blade("Combat knife", "Precision", "4", "3+", "4", "−1", "1"),
			blade("Xenophase blade", "Devastating Wounds", "4", "3+", "5", "−2", "1")
		],
		fixed: "5: 1 Sergeant (plasma pistol and power weapon, 32mm), 1 Gravis Veteran (infernus heavy bolter, bolt pistol, and close combat weapon, 40mm), and 3 Veterans. 10: 1 Sergeant, 2 Gravis Veterans, and 7 Veterans. For every 5 models, one Veteran has a stalker bolt rifle, one a heavy thunder hammer, and one a marksman bolt carbine. A 10-model unit also has one Veteran with a xenophase blade.",
		swaps: "For every 5 models, one infernus heavy bolter can be a frag cannon, or a Hellstorm bolt rifle and Astartes grenade launcher. One thunder hammer can be a power weapon and Astartes shield. One stalker bolt rifle can be a plasma incinerator. One marksman bolt carbine can be a combat knife.",
		abilities: [
			{
				name: "Death to the Alien",
				rule: "Re-roll a Hit roll of 1. If the target has neither Imperium nor Chaos, re-roll the Hit roll instead."
			},
			{
				name: "Kill Team",
				rule: "If this unit has mixed Toughness, incoming attacks use the majority Toughness, or the highest if two values tie. A Gravis Veteran counts as 2 models for Transport, but can still embark in any Transport this unit can."
			},
			{
				name: "Astartes Shield",
				rule: "The bearer has a 4+ invulnerable save."
			},
			{
				name: "Attached Unit",
				rule: "A Character that can join a Deathwatch Kill Team can join this unit instead."
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	"deathwatch-kt": {
		stats: {
			m: "6\"",
			t: "4",
			sv: "3+",
			w: "2",
			ld: "6+",
			oc: "2"
		},
		ranged: [
			gun("Boltgun", "", "24\"", "2", "3+", "4", "0", "1"),
			gun("Combi-weapon", "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1", "24\"", "1", "4+", "4", "0", "1"),
			gun("Deathwatch shotgun", "Assault", "18\"", "2", "3+", "4", "0", "2"),
			gun("Stalker-pattern boltgun", "Heavy, Precision", "24\"", "1", "3+", "4", "−1", "2"),
			gun("Infernus heavy bolter", "Heavy, Sustained Hits 1", "36\"", "3", "4+", "5", "−1", "2"),
			gun("Infernus heavy bolter, heavy flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "−1", "1"),
			gun("Frag cannon", "Blast, Heavy, Rapid Fire D3", "18\"", "D3", "4+", "7", "−1", "2")
		],
		melee: [
			blade("Power weapon", "", "3", "3+", "5", "−2", "1"),
			blade("Xenophase blade", "Devastating Wounds", "4", "3+", "5", "−2", "1"),
			blade("Black Shield blades", "Twin-linked", "4", "3+", "5", "−2", "1"),
			blade("Deathwatch thunder hammer", "Devastating Wounds", "3", "4+", "10", "−2", "3"),
			blade("Close combat weapon", "", "3", "3+", "4", "0", "1")
		],
		fixed: "1 Watch Sergeant and 4–9 Deathwatch Veterans. Every model starts with a boltgun and a power weapon. Base 32mm.",
		swaps: "For every 5 models: up to 2 boltgun and Astartes shield, or power weapon and Astartes shield; up to 2 thunder hammers; 1 stalker-pattern boltgun; up to 2 shotguns; 1 frag cannon; 1 infernus heavy bolter. One model in the unit may take Black Shield blades. The Sergeant’s boltgun can be a combi-weapon, and the Sergeant’s power weapon can be a xenophase blade.",
		abilities: [
			{
				name: "Death to the Alien",
				rule: "Re-roll a Hit roll of 1. If the target has neither Imperium nor Chaos, re-roll the Hit roll instead."
			},
			{
				name: "Astartes Shield",
				rule: "The bearer has a 4+ invulnerable save."
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	breachers: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "4+",
			w: "1",
			ld: "7+",
			oc: "2"
		},
		ranged: [
			gun("Navis shotgun", "Assault", "12\"", "2", "4+", "4", "0", "1"),
			gun("Navis las-volley", "", "18\"", "4", "4+", "6", "0", "1"),
			gun("Navis heavy shotgun", "Assault", "12\"", "4", "4+", "4", "0", "1"),
			gun("Autopistol", "Pistol", "12\"", "1", "4+", "3", "0", "1"),
			gun("Bolt pistol", "Pistol", "12\"", "1", "4+", "4", "0", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "4+", "9", "−4", "D6"),
			gun("Plasma gun", "Rapid Fire 1", "24\"", "1", "4+", "7", "−1", "1"),
			gun("Plasma gun, supercharge", "Hazardous, Rapid Fire 1", "24\"", "1", "4+", "8", "−2", "2"),
			gun("Demolition charge", "Assault, Blast, Hazardous, One Shot", "6\"", "D6", "5+", "9", "−2", "2")
		],
		melee: [
			blade("Close combat weapon", "", "1", "4+", "3", "0", "1"),
			blade("Chainsword", "", "3", "4+", "3", "0", "1"),
			blade("Power weapon", "", "2", "4+", "4", "−2", "1"),
			blade("Chainfist", "Anti-Vehicle 3+", "1", "5+", "6", "−2", "2")
		],
		fixed: "Base 25mm, or 28mm if a meltagun or plasma gun. Sergeant starts with a Navis shotgun. One Armsman has a las-volley, one has a heavy shotgun and Endurant shield, and the rest have shotguns.",
		swaps: "The Sergeant’s shotgun can be an autopistol and chainsword, or a bolt pistol and power weapon. The las-volley can be a meltagun or a plasma gun. One shotgun can be an autopistol and power weapon. One shotgun can be an autopistol and chainfist. One Armsman can take a demolition charge.",
		abilities: [
			{
				name: "Breaching Team",
				rule: "Re-roll a Wound roll of 1. If the target is within range of an objective marker, re-roll the Wound roll instead."
			},
			{
				name: "Gheistskull",
				rule: "Once per battle, when this unit is selected as the target of the Explosives Stratagem, you may target one enemy unit visible to and within 18\" of this unit that is not within Engagement Range of your army, instead of one within 8\"."
			},
			{
				name: "CAT Unit",
				rule: "Once per battle, when selected to shoot, ranged weapons gain Ignores Cover until the end of the phase."
			},
			{
				name: "Endurant shield",
				rule: "The bearer has a 4+ invulnerable save."
			}
		]
	},
	vigilants: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "4+",
			w: "1",
			ld: "7+",
			oc: "2"
		},
		ranged: [
			gun("Arbites combat shotgun", "Assault", "18\"", "2", "4+", "4", "0", "1"),
			gun("Arbites shotpistol", "Pistol", "12\"", "1", "4+", "4", "0", "1"),
			gun("Executioner shotgun", "Ignores Cover, Precision", "24\"", "1", "4+", "5", "−1", "1"),
			gun("Arbites grenade launcher, frag", "Blast", "24\"", "D3", "4+", "4", "0", "1"),
			gun("Arbites grenade launcher, krak", "", "24\"", "1", "4+", "9", "−2", "D3"),
			gun("Heavy stubber", "Rapid Fire 3", "36\"", "3", "4+", "4", "0", "1"),
			gun("Webber", "Assault, Devastating Wounds, Torrent", "12\"", "D6", "—", "2", "0", "1")
		],
		melee: [blade("Close combat weapon", "", "2", "4+", "3", "0", "1"), blade("Mechanical bite", "", "3", "4+", "4", "0", "1")],
		fixed: "1 Proctor-Vigilant, 9 Vigilants, and 1 Cyber-mastiff. Every Proctor and Vigilant starts with a combat shotgun, shotpistol, and close combat weapon. The mastiff has a mechanical bite. Base 28.5mm, mastiff 25mm.",
		swaps: "Up to 2 Vigilants can replace their combat shotgun with an executioner shotgun, Arbites grenade launcher, heavy stubber, or webber. Duplicates are not allowed. The Proctor can take a nuncio-aquila.",
		abilities: [
			{
				name: "Merciless Judgement",
				rule: "Ranged attacks against a unit Below Half-strength get +1 to wound."
			},
			{
				name: "Nuncio Aquila",
				rule: NUNCIO
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	exaction: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "4+",
			w: "1",
			ld: "7+",
			oc: "1"
		},
		ranged: [
			gun("Arbites combat shotgun", "Assault", "18\"", "2", "4+", "4", "0", "1"),
			gun("Arbites shotpistol", "Pistol", "12\"", "1", "4+", "4", "0", "1"),
			gun("Executioner shotgun", "Ignores Cover, Precision", "24\"", "1", "4+", "5", "−1", "1"),
			gun("Arbites grenade launcher, frag", "Blast", "24\"", "D3", "4+", "4", "0", "1"),
			gun("Arbites grenade launcher, krak", "", "24\"", "1", "4+", "9", "−2", "D3"),
			gun("Heavy stubber", "Rapid Fire 3", "36\"", "3", "4+", "4", "0", "1"),
			gun("Webber", "Assault, Devastating Wounds, Torrent", "12\"", "D6", "—", "2", "0", "1")
		],
		melee: [
			blade("Close combat weapon", "", "2", "4+", "3", "0", "1"),
			blade("Excruciator maul", "", "2", "3+", "4", "−1", "2"),
			blade("Mechanical bite", "", "3", "4+", "4", "0", "1")
		],
		fixed: "1 Proctor-Exactant, 9 Exaction Vigilants, and 1 Cyber-mastiff. Every Proctor and Exaction Vigilant starts with a combat shotgun, shotpistol, and close combat weapon. The mastiff has a mechanical bite. Base 28.5mm, mastiff 25mm.",
		swaps: "Up to 2 Exaction Vigilants can replace their combat shotgun with an executioner shotgun, Arbites grenade launcher, heavy stubber, or webber. Duplicates are not allowed. Three other shotgun Vigilants can take an excruciator maul, an Arbites medi-kit, and a soulguilt scanner, and those shotguns cannot be replaced. The Proctor can take a nuncio-aquila.",
		abilities: [
			{
				name: "Imperial Law",
				rule: "At the start of the battle, select one enemy unit. Attacks against that unit have Lethal Hits and Precision."
			},
			{
				name: "Arbites Medi-kit",
				rule: "At the start of your Command phase, if the bearer’s unit is below Starting Strength, return up to D3 destroyed Exaction Vigilants."
			},
			{
				name: "Nuncio Aquila",
				rule: NUNCIO
			},
			{
				name: "Soulguilt Scanner",
				rule: "Ranged weapons equipped by models in the bearer’s unit have Ignores Cover."
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	"inquisitorial-agents": {
		stats: {
			m: "6\"",
			t: "3",
			sv: "5+",
			w: "1",
			ld: "7+",
			oc: "1"
		},
		ranged: [
			gun("Agent firearm", "Pistol", "12\"", "1", "3+", "4", "−1", "1"),
			gun("Plasma pistol", "Pistol", "12\"", "1", "3+", "7", "−1", "1"),
			gun("Plasma pistol, supercharge", "Hazardous, Pistol", "12\"", "1", "3+", "8", "−2", "2"),
			gun("Heavy bolter", "Heavy, Sustained Hits 1", "36\"", "3", "4+", "5", "−1", "2"),
			gun("Multi-melta", "Heavy, Melta 2", "18\"", "2", "4+", "9", "−4", "D6"),
			gun("Plasma cannon", "Blast, Heavy", "36\"", "D3", "4+", "7", "−1", "1"),
			gun("Plasma cannon, supercharge", "Blast, Hazardous, Heavy", "36\"", "D3", "4+", "8", "−2", "2")
		],
		melee: [
			blade("Agent melee weapon", "", "3", "3+", "3", "0", "1"),
			blade("Eviscerator", "Devastating Wounds", "2", "3+", "6", "−2", "2"),
			blade("Mystic stave", "Anti-Infantry 4+, Psychic", "2", "3+", "5", "−1", "D3")
		],
		fixed: "6 models are 5 Inquisitorial Agents and 1 Gun Servitor. 12 models are 10 Agents and 2 Gun Servitors. Agents start with an agent firearm and an agent melee weapon. Gun Servitors start with a heavy bolter and an agent melee weapon. Base 25mm, Gun Servitors 32mm.",
		swaps: "For every 5 Agents: 1 tome-skull, and one Agent each may take a plasma pistol, an eviscerator, or a mystic stave. The same Agent cannot take more than one of those three. A Gun Servitor’s heavy bolter can be a multi-melta or a plasma cannon.",
		abilities: [
			{
				name: "Loyal Henchmen",
				rule: "While an Inquisitor is leading this unit, attacks targeting it are −1 to wound."
			},
			{
				name: "Tome-skull",
				rule: "Once per battle for each tome-skull, at the start of any phase, select one friendly Agents of the Imperium unit within 6\" that is Battle-shocked, or one enemy unit within 6\". A friendly unit is no longer Battle-shocked. An enemy unit takes a Battle-shock test."
			},
			{
				name: "Inquisitorial Henchmen",
				rule: "If your Army Faction is not Agents of the Imperium, each Inquisitor lets you include one Inquisitorial Agents unit that does not count toward the number of Retinue units your army can include."
			}
		]
	},
	sanctifiers: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "6+",
			w: "1",
			ld: "7+",
			oc: "1",
			inv: "5+"
		},
		ranged: [
			gun("Plasma gun", "Rapid Fire 1", "24\"", "1", "4+", "7", "−2", "1"),
			gun("Plasma gun, supercharge", "Hazardous, Rapid Fire 1", "24\"", "1", "4+", "8", "−3", "2"),
			gun("Meltagun", "Melta 2", "12\"", "1", "4+", "9", "−4", "D6"),
			gun("Ministorum hand flamer", "Ignores Cover, Pistol, Torrent", "12\"", "D6", "—", "4", "0", "1"),
			gun("Holy fire", "Ignores Cover, One Shot, Torrent", "12\"", "D6", "—", "6", "−1", "2"),
			gun("Ministorum flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "0", "1")
		],
		melee: [
			blade("Sanctifier melee weapon", "", "3", "3+", "3", "0", "1"),
			blade("Burning hands", "Devastating Wounds", "1", "2+", "6", "−2", "3"),
			blade("Death Cult blades", "Precision", "4", "2+", "4", "−2", "1"),
			blade("Close combat weapon", "", "2", "3+", "3", "0", "1")
		],
		fixed: "1 Miraculist (holy fire, burning hands), 1 Salvationist (close combat weapon, medikit), 1 Death Cult Assassin (Death Cult blades), 1 Missionary (plasma gun, Sanctifier melee weapon), 1 Missionary (Ministorum flamer, Sanctifier melee weapon), and 4 Sanctifiers (hand flamer, Sanctifier melee weapon). Base 25mm.",
		swaps: "The plasma gun can be a meltagun. The Missionary who still has a plasma gun can also take holy fire, and then that plasma gun cannot be replaced. One Sanctifier can replace its melee weapon with a second hand flamer and a close combat weapon. One Sanctifier can replace its melee weapon with a close combat weapon and a simulacrum imperialis.",
		abilities: [
			{
				name: "Ministorum Sermon",
				rule: "While this unit contains a Ministorum Priest, melee attacks get +1 to wound."
			},
			{
				name: "Cherub",
				rule: "Once per battle, you can target this unit with Command Re-roll for 0 CP, even if another unit was already targeted with it this phase."
			},
			{
				name: "Attached Unit",
				rule: "A Ministorum Priest or Inquisitor that can join a Sisters of Battle Squad can join this unit instead. If attached during Declare Battle Formations, that model gains Scouts 6\"."
			},
			{
				name: "Salvationist Medikit",
				rule: "In your Command phase, if the bearer is on the battlefield, return up to D3 destroyed non-Character models."
			},
			{
				name: "Simulacrum Imperialis",
				rule: "Improve the Leadership characteristic of models in the bearer’s unit by 1."
			},
			{
				name: "Rules",
				rule: "Scouts 6\", Assigned Agents."
			}
		]
	},
	subductors: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "3+",
			w: "1",
			ld: "7+",
			oc: "1",
			inv: "4+"
		},
		profileName: "Proctor-Subductor and Subductors",
		ranged: [gun("Arbites shotpistol", "Pistol", "12\"", "1", "4+", "4", "0", "1")],
		melee: [blade("Shock maul", "", "2", "4+", "4", "−1", "1"), blade("Mechanical bite", "", "3", "4+", "4", "0", "1")],
		fixed: "1 Proctor-Subductor, 9 Subductors, and 1 Cyber-mastiff. Every Proctor and Subductor has an Arbites shotpistol and a shock maul. The mastiff has a mechanical bite. The 4+ invulnerable save does not apply to the Cyber-mastiff. Base 28.5mm, mastiff 25mm.",
		swaps: "The Proctor-Subductor can take a nuncio-aquila.",
		abilities: [
			{
				name: "Dedication to Duty",
				rule: "Each time a model is destroyed by a melee attack, if it has not fought this phase, roll one D6. On a 4+, do not remove it. It can fight after the attacking unit finishes, then is removed."
			},
			{
				name: "Nuncio Aquila",
				rule: NUNCIO
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	voidsmen: {
		stats: {
			m: "6\"",
			t: "3",
			sv: "4+",
			w: "1",
			ld: "7+",
			oc: "2"
		},
		ranged: [
			gun("Artificer shotgun", "Assault", "12\"", "2", "4+", "4", "0", "2"),
			gun("Laspistol", "Pistol", "12\"", "1", "4+", "3", "0", "1"),
			gun("Lasgun", "Rapid Fire 1", "24\"", "1", "4+", "3", "0", "1"),
			gun("Voidsman rotor cannon", "Heavy, Sustained Hits 1", "24\"", "6", "5+", "6", "0", "1")
		],
		melee: [blade("Close combat weapon", "", "1", "4+", "3", "0", "1"), blade("Vicious bite", "", "3", "4+", "4", "0", "1")],
		fixed: "Base 25mm. Voidmaster: artificer shotgun, laspistol, close combat weapon. One Voidsman: laspistol, rotor cannon, and close combat weapon. Other Voidsmen: lasgun, laspistol, and close combat weapon. One Canid with a vicious bite. No swaps.",
		abilities: [
			{
				name: "Masters of Close Confines",
				rule: "A ranged attack that targets the closest eligible target has Lethal Hits."
			},
			{
				name: "Navy Bodyguards",
				rule: "If your Army Faction is not Agents of the Imperium, each Voidfarers Character lets you include one Voidsmen-at-Arms unit that does not count toward the Retinue limit."
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	corvus: {
		stats: {
			m: "14\"",
			t: "10",
			sv: "3+",
			w: "14",
			ld: "6+",
			oc: "0",
			damaged: "5"
		},
		ranged: [
			gun("Hurricane bolter", "Rapid Fire 6, Twin-linked", "24\"", "6", "3+", "4", "0", "1"),
			gun("Twin assault cannon", "Devastating Wounds, Twin-linked", "24\"", "6", "3+", "6", "0", "1"),
			gun("Twin lascannon", "Twin-linked", "48\"", "1", "3+", "12", "−3", "D6+1"),
			gun("Blackstar rocket launcher", "Blast", "30\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormstrike missile launcher", "", "48\"", "1", "3+", "10", "−2", "3")
		],
		melee: [blade("Armoured hull", "", "3", "4+", "6", "0", "1")],
		fixed: "Flying base 120x92mm. Starts with 2 Blackstar rocket launchers, a twin assault cannon, and an armoured hull.",
		swaps: "The twin assault cannon can be a twin lascannon. The 2 Blackstar rocket launchers can be 2 stormstrike missile launchers. It can take a hurricane bolter. It can take an auspex array or an infernum halo-launcher.",
		abilities: [
			{
				name: "Blackstar Cluster Launcher",
				rule: "Each time this model ends a Normal move, you can select one enemy unit it moved over and roll six D6. For each 5+, that unit suffers 1 mortal wound."
			},
			{
				name: "Auspex Array",
				rule: "Ranged weapons equipped by the bearer have Ignores Cover."
			},
			{
				name: "Infernum Halo-launcher",
				rule: "The bearer has the Smoke keyword."
			},
			{
				name: "Transport",
				rule: "This model can transport 12 Deathwatch Infantry models."
			},
			{
				name: "Rules",
				rule: "Deadly Demise D6, Hover, Stealth, Assigned Agents. While damaged, −1 to hit."
			}
		]
	},
	"grey-knights-terminators": {
		stats: {
			m: "5\"",
			t: "5",
			sv: "2+",
			w: "3",
			ld: "6+",
			oc: "2",
			inv: "4+"
		},
		ranged: [
			gun("Storm bolter", "Rapid Fire 2", "24\"", "2", "3+", "4", "0", "1"),
			gun("Incinerator", "Ignores Cover, Torrent", "12\"", "D6", "—", "6", "−1", "1"),
			gun("Psilencer", "Psychic, Sustained Hits 1", "24\"", "6", "3+", "5", "0", "1"),
			gun("Psycannon", "Psychic", "24\"", "3", "3+", "8", "−1", "2")
		],
		melee: [blade("Nemesis force weapon", "Psychic", "4", "3+", "6", "−2", "2")],
		fixed: "1 Terminator Justicar and 4 Grey Knights Terminators. Every model has a Nemesis force weapon and a storm bolter. Base 40mm.",
		swaps: "For every 5 models, one storm bolter can be an incinerator, a psilencer, or a psycannon for 5 pts. One model that still has a storm bolter can take an Ancient’s banner. One model can replace its storm bolter with a narthecium. The banner and the narthecium cannot be on the same model.",
		abilities: [
			{
				name: "Hammerhand",
				rule: "Psychic. After a model in this unit makes a Charge move, until the end of the turn melee weapons in this unit have Lethal Hits."
			},
			{
				name: "Ancient’s Banner",
				rule: "Add 1 to the Objective Control characteristic of models in the bearer’s unit."
			},
			{
				name: "Narthecium",
				rule: "In your Command phase, you can return 1 destroyed model, excluding Characters, to the bearer’s unit."
			},
			{
				name: "Rites of Teleportation",
				rule: "If one or more Inquisitor units are attached during Declare Battle Formations, models in those units have Deep Strike."
			},
			{
				name: "Rules",
				rule: "Deep Strike, Assigned Agents."
			}
		]
	},
	"sisters-squad": {
		stats: {
			m: "6\"",
			t: "3",
			sv: "3+",
			w: "1",
			ld: "7+",
			oc: "2",
			inv: "6+"
		},
		ranged: [
			gun("Bolt pistol", "Pistol", "12\"", "1", "3+", "4", "0", "1"),
			gun("Boltgun", "Rapid Fire 1", "24\"", "1", "3+", "4", "0", "1"),
			gun("Artificer-crafted storm bolter", "Rapid Fire 2", "24\"", "2", "3+", "4", "0", "2"),
			gun("Combi-weapon", "Anti-Infantry 4+, Devastating Wounds, Rapid Fire 1", "24\"", "1", "4+", "4", "0", "1"),
			gun("Condemnor boltgun", "Anti-Psyker 2+, Devastating Wounds, Precision, Rapid Fire 1", "24\"", "1", "3+", "4", "0", "1"),
			gun("Heavy bolter", "Heavy, Sustained Hits 1", "36\"", "3", "4+", "5", "−1", "2"),
			gun("Inferno pistol", "Melta 2, Pistol", "6\"", "1", "3+", "8", "−4", "D3"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ministorum flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "0", "1"),
			gun("Ministorum hand flamer", "Ignores Cover, Pistol, Torrent", "12\"", "D6", "—", "4", "0", "1"),
			gun("Ministorum heavy flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "6", "−1", "1"),
			gun("Multi-melta", "Heavy, Melta 2", "18\"", "2", "4+", "9", "−4", "D6"),
			gun("Plasma pistol", "Pistol", "12\"", "1", "3+", "7", "−2", "1"),
			gun("Plasma pistol, supercharge", "Hazardous, Pistol", "12\"", "1", "3+", "8", "−3", "2")
		],
		melee: [
			blade("Close combat weapon", "", "1", "4+", "3", "−1", "1"),
			blade("Chainsword", "", "3", "4+", "3", "−1", "1"),
			blade("Power weapon", "", "2", "4+", "4", "−2", "1")
		],
		fixed: "1 Sister Superior and 9 Battle Sisters. Every model starts with a bolt pistol, a boltgun, and a close combat weapon. Base 32mm.",
		swaps: "The Superior’s boltgun can be a bolt pistol, combi-weapon, condemnor boltgun, inferno pistol, Ministorum hand flamer, or plasma pistol. She can also take a chainsword or a power weapon. One Battle Sister’s boltgun can be an artificer-crafted storm bolter, meltagun, or Ministorum flamer. One Battle Sister’s boltgun can be an artificer-crafted storm bolter, heavy bolter, meltagun, Ministorum flamer, Ministorum heavy flamer, or multi-melta. One Battle Sister who still has a boltgun can take a simulacrum imperialis.",
		abilities: [
			{
				name: "Defenders of the Faith",
				rule: "If you control an objective marker at the end of your Command phase and this unit is within range of it, that marker stays under your control, even with no models in range, until your opponent controls it at the start or end of any turn."
			},
			{
				name: "Incensor Cherub",
				rule: "Once per battle, you can target this unit with Command Re-roll for 0CP, even if another unit was already targeted with that Stratagem this phase."
			},
			{
				name: "Simulacrum Imperialis",
				rule: "Improve the Leadership characteristic of models in the bearer’s unit by 1."
			},
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	"imperial-rhino": {
		stats: {
			m: "12\"",
			t: "9",
			sv: "3+",
			w: "10",
			ld: "6+",
			oc: "2"
		},
		ranged: [gun("Storm bolter", "Rapid Fire 2", "24\"", "2", "3+", "4", "0", "1"), gun("Hunter-killer missile", "One Shot", "48\"", "1", "2+", "14", "−3", "D6")],
		melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
		fixed: "Armoured tracks and a storm bolter.",
		swaps: "Hunter-killer missile 0–1.",
		abilities: [
			{
				name: "Self Repair",
				rule: "At the end of your Command phase, this model regains 1 lost wound."
			},
			{
				name: "Transport",
				rule: "This model can transport 12 Agents of the Imperium Infantry models. It cannot transport Terminators or Officio Assassinorum models."
			},
			{
				name: "Firing Deck",
				rule: FIRING_DECK
			},
			demise("D3"),
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	"inquisitorial-chimera": {
		stats: {
			m: "10\"",
			t: "9",
			sv: "3+",
			w: "11",
			ld: "7+",
			oc: "2"
		},
		ranged: [
			gun("Lasgun array", "Rapid Fire 6", "24\"", "6", "4+", "3", "0", "1"),
			gun("Heavy bolter", "Sustained Hits 1", "36\"", "3", "4+", "5", "−1", "2"),
			gun("Heavy flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "−1", "1"),
			gun("Heavy stubber", "Rapid Fire 3", "36\"", "3", "4+", "4", "0", "1"),
			gun("Storm bolter", "Rapid Fire 2", "24\"", "2", "4+", "4", "0", "1"),
			gun("Multi-laser", "", "36\"", "4", "4+", "6", "0", "1"),
			gun("Hunter-killer missile", "One Shot", "48\"", "1", "4+", "14", "−3", "D6")
		],
		melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
		fixed: "Starts with a multi-laser, a heavy bolter, a lasgun array, and armoured tracks.",
		swaps: "The heavy bolter can be a heavy flamer. The multi-laser can be a heavy bolter or a heavy flamer. It can take a heavy stubber or a storm bolter, and a hunter-killer missile.",
		abilities: [
			{
				name: "Rapid Deployment",
				rule: "Units can disembark after this transport has Advanced. They make a shock disembark move."
			},
			{
				name: "Transport",
				rule: "This model can transport 13 Inquisitor Infantry and Inquisitorial Agent models. It cannot transport Terminators."
			},
			{
				name: "Firing Deck",
				rule: FIRING_DECK
			},
			demise("D3"),
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	immolator: {
		stats: {
			m: "12\"",
			t: "10",
			sv: "3+",
			w: "11",
			ld: "7+",
			oc: "2",
			inv: "6+"
		},
		ranged: [
			gun("Heavy bolter", "Sustained Hits 1", "36\"", "3", "3+", "5", "−1", "2"),
			gun("Immolation flamers", "Ignores Cover, Torrent", "18\"", "2D6", "—", "6", "−1", "1"),
			gun("Twin heavy bolter", "Sustained Hits 2, Twin-linked", "36\"", "3", "3+", "5", "−1", "2"),
			gun("Twin multi-melta", "Melta 2, Twin-linked", "18\"", "2", "3+", "9", "−4", "D6"),
			gun("Hunter-killer missile", "One Shot", "48\"", "1", "2+", "14", "−3", "D6")
		],
		melee: [blade("Armoured tracks", "", "3", "4+", "6", "0", "1")],
		fixed: "Starts with a heavy bolter, immolation flamers, and armoured tracks.",
		swaps: "The immolation flamers can be a twin heavy bolter or a twin multi-melta for 15 pts. Hunter-killer missile is optional.",
		abilities: [
			{
				name: "Purge and Cleanse",
				rule: "After this model has shot, select one enemy unit hit by those attacks. Until the end of the phase, that unit cannot have the Benefit of Cover."
			},
			{
				name: "Transport",
				rule: "This model can transport 6 Ordo Hereticus Infantry models. At the start of Declare Battle Formations, one Sisters of Battle Squad can be split into two units as evenly as possible. One half must start embarked in this transport."
			},
			demise("D3"),
			{
				name: "Rules",
				rule: "Assigned Agents."
			}
		]
	},
	warhound: {
		stats: {
			m: "14\"",
			t: "13",
			sv: "2+",
			w: "40",
			ld: "6+",
			oc: "16",
			inv: "5+ ranged",
			damaged: "13"
		},
		ranged: [
			gun("Warhound inferno gun", "Ignores Cover, Torrent", "24\"", "2D6", "—", "6", "−2", "2"),
			gun("Warhound plasma blastgun", "Blast", "72\"", "2D6+3", "3+", "9", "−3", "3"),
			gun("Warhound plasma blastgun, supercharge", "Blast, Hazardous", "72\"", "2D6+3", "3+", "10", "−3", "6"),
			gun("Warhound turbo-laser destructor", "Blast", "72\"", "D3+3", "3+", "20", "−3", "2D6"),
			gun("Warhound vulcan mega-bolter", "Sustained Hits 1", "48\"", "20", "3+", "6", "−1", "2")
		],
		melee: [blade("Warhound feet", "", "6", "4+", "12", "−1", "2")],
		fixed: "Warhound plasma blastgun, Warhound vulcan mega-bolter, and Warhound feet.",
		swaps: "Either arm weapon can be a Warhound inferno gun, plasma blastgun, turbo-laser destructor, or vulcan mega-bolter.",
		abilities: [
			{
				name: "Deadly Demise",
				rule: "Deadly Demise 2D6."
			},
			{
				name: "Super-heavy Walker",
				rule: "Faction ability."
			},
			{
				name: "Striding Colossus",
				rule: "Each time you target this model with a Stratagem, you must spend twice that Stratagem's stated CP cost to do so."
			},
			{
				name: "Flank Speed",
				rule: "Each time this model Advances, do not make an Advance roll for it. Instead, until the end of the phase, add 8\" to the Move characteristic of this model."
			},
			{
				name: "Damaged",
				rule: "While this model has 1–13 wounds remaining, subtract 8 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack."
			}
		]
	},
	reaver: {
		stats: {
			m: "12\"",
			t: "14",
			sv: "2+",
			w: "60",
			ld: "6+",
			oc: "20",
			inv: "5+ ranged",
			damaged: "20"
		},
		ranged: [
			gun("Reaver apocalypse launcher", "Blast, Heavy", "200\"", "3D6", "3+", "7", "−1", "2"),
			gun("Reaver gatling blaster", "Sustained Hits 1", "72\"", "12", "3+", "8", "−2", "3"),
			gun("Reaver laser blaster", "Blast", "72\"", "8", "3+", "20", "−3", "D6+2"),
			gun("Reaver melta cannon", "Blast, Melta 4", "48\"", "D6+2", "3+", "14", "−4", "6"),
			gun("Reaver volcano cannon", "Blast, Heavy", "120\"", "D3+3", "3+", "24", "−5", "14")
		],
		melee: [
			blade("Reaver feet", "", "8", "4+", "12", "−2", "4"),
			blade("Reaver power fist, strike", "", "6", "4+", "20", "−4", "14"),
			blade("Reaver power fist, sweep", "", "12", "4+", "12", "−3", "6")
		],
		fixed: "Reaver apocalypse launcher, Reaver gatling blaster, Reaver laser blaster, and Reaver feet.",
		swaps: "The gatling blaster can be a laser blaster, melta cannon, volcano cannon, or power fist. The laser blaster can be a gatling blaster, melta cannon, or volcano cannon.",
		abilities: [
			{
				name: "Deadly Demise",
				rule: "Deadly Demise D6+6."
			},
			{
				name: "Super-heavy Walker",
				rule: "Faction ability."
			},
			{
				name: "Striding Colossus",
				rule: "Each time you target this model with a Stratagem, you must spend twice that Stratagem's stated CP cost to do so."
			},
			{
				name: "God-machine",
				rule: "This model is eligible to shoot and declare a charge in a turn in which it Fell Back."
			},
			{
				name: "Damaged",
				rule: "While this model has 1–20 wounds remaining, subtract 10 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack."
			}
		]
	},
	warbringer: {
		stats: {
			m: "12\"",
			t: "14",
			sv: "2+",
			w: "80",
			ld: "6+",
			oc: "20",
			inv: "5+ ranged",
			damaged: "26"
		},
		ranged: [
			gun("Anvilus defence battery", "Anti-Fly 4+", "72\"", "8", "3+", "8", "−1", "2"),
			gun("Ardex-defensor mauler", "", "36\"", "6", "3+", "6", "−2", "2"),
			gun("Nemesis quake cannon", "Blast", "480\"", "D6+6", "3+", "16", "−4", "4"),
			gun("Nemesis volcano cannon", "Blast", "120\"", "D3+3", "3+", "24", "−5", "14"),
			gun("Reaver gatling blaster", "Sustained Hits 1", "72\"", "12", "3+", "8", "−2", "3"),
			gun("Reaver laser blaster", "Blast", "72\"", "8", "3+", "20", "−3", "D6+2"),
			gun("Reaver melta cannon", "Blast, Melta 4", "48\"", "D6+2", "3+", "14", "−4", "6"),
			gun("Reaver volcano cannon", "Blast, Heavy", "120\"", "D3+3", "3+", "24", "−5", "14")
		],
		melee: [blade("Nemesis feet", "", "6", "4+", "12", "−2", "6")],
		fixed: "2 Anvilus defence batteries, 3 Ardex-defensor maulers, Nemesis quake cannon, Reaver gatling blaster, Reaver laser blaster, and Nemesis feet.",
		swaps: "The quake cannon can be a Nemesis volcano cannon. Either arm can be a Reaver gatling blaster, laser blaster, melta cannon, or volcano cannon.",
		abilities: [
			{
				name: "Deadly Demise",
				rule: "Deadly Demise D6+6."
			},
			{
				name: "Super-heavy Walker",
				rule: "Faction ability."
			},
			{
				name: "Striding Colossus",
				rule: "Each time you target this model with a Stratagem, you must spend twice that Stratagem's stated CP cost to do so."
			},
			{
				name: "Titanic Fire Support",
				rule: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. Until the end of the phase, each time a friendly Imperium model makes an attack that targets that enemy unit, on a Critical Wound, improve the Armour Penetration characteristic of that attack by 1."
			},
			{
				name: "Damaged",
				rule: "While this model has 1–26 wounds remaining, subtract 10 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack."
			}
		]
	},
	"warlord-titan": {
		stats: {
			m: "10\"",
			t: "16",
			sv: "2+",
			w: "100",
			ld: "6+",
			oc: "30",
			inv: "5+ ranged",
			damaged: "33"
		},
		ranged: [
			gun("Apocalypse launcher", "Blast, Indirect Fire", "200\"", "20", "3+", "8", "−2", "2"),
			gun("Ardex-defensor lascannon", "", "48\"", "1", "3+", "12", "−3", "D6+1"),
			gun("Ardex-defensor mauler", "", "36\"", "6", "3+", "6", "−2", "2"),
			gun("Arioch power claw", "Sustained Hits 1", "48\"", "20", "3+", "6", "−1", "2"),
			gun("Belicosa volcano cannon", "Blast", "120\"", "D3+3", "3+", "32", "−5", "18"),
			gun("Laser blaster", "Blast", "72\"", "6", "3+", "16", "−4", "D6+3"),
			gun("Macro gatling blaster", "Sustained Hits 1", "100\"", "30", "3+", "9", "−2", "3"),
			gun("Mori quake cannon", "Blast, Ignores Cover", "280\"", "3D6", "3+", "16", "−4", "6"),
			gun("Sunfury plasma annihilator", "Blast", "72\"", "2D6+6", "3+", "10", "−3", "5"),
			gun("Sunfury plasma annihilator, supercharge", "Blast, Hazardous", "72\"", "2D6+6", "3+", "12", "−3", "8")
		],
		melee: [
			blade("Arioch power claw, strike", "", "6", "4+", "20", "−4", "24"),
			blade("Arioch power claw, sweep", "", "12", "4+", "12", "−3", "8"),
			blade("Warlord feet", "", "6", "4+", "12", "−2", "4")
		],
		fixed: "2 apocalypse launchers, 2 Ardex-defensor lascannons, 2 Ardex-defensor maulers, macro gatling blaster, arioch power claw, and Warlord feet.",
		swaps: "Both apocalypse launchers can be replaced with 2 laser blasters. The power claw can be a belicosa volcano cannon, macro gatling blaster, mori quake cannon, or sunfury plasma annihilator. The gatling blaster can be an arioch power claw, belicosa volcano cannon, mori quake cannon, or sunfury plasma annihilator. Pick one power claw profile before selecting targets.",
		abilities: [
			{
				name: "Deadly Demise",
				rule: "Deadly Demise 2D6+6."
			},
			{
				name: "Super-heavy Walker",
				rule: "Faction ability."
			},
			{
				name: "Striding Colossus",
				rule: "Each time you target this model with a Stratagem, you must spend four times that Stratagem's stated CP cost to do so."
			},
			{
				name: "Wrath of the Omnissiah",
				rule: "In your Shooting phase, after this model has shot, select one enemy unit hit by one or more of those attacks. That unit must take a Battle-shock test."
			},
			{
				name: "Damaged",
				rule: "While this model has 1–33 wounds remaining, subtract 15 from its Objective Control characteristic and subtract 1 from the Hit roll each time it makes an attack."
			}
		]
	},
	"canis-rex": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		profiles: [{
			name: "Sir Hekhtur",
			stats: {
				m: "6\"",
				t: "3",
				sv: "4+",
				w: "3",
				ld: "5+",
				oc: "1"
			}
		}],
		ranged: [
			gun("Las-impulsor, high intensity", "Blast, Sustained Hits 1", "24\"", "D6", "2+", "14", "−3", "4"),
			gun("Las-impulsor, low intensity", "Blast, Sustained Hits 1", "36\"", "2D6", "2+", "7", "−1", "2"),
			gun("Questoris multi-laser", "Sustained Hits 1", "36\"", "4", "2+", "6", "0", "1"),
			gun("Hekhtur's pistol", "Pistol", "12\"", "1", "2+", "5", "−1", "2")
		],
		melee: [
			blade("Freedom's Hand, strike", "Sustained Hits 1", "5", "2+", "20", "−3", "9"),
			blade("Freedom's Hand, sweep", "Sustained Hits 1", "10", "2+", "10", "−2", "3"),
			blade("Close combat weapon", "", "2", "2+", "3", "0", "1")
		],
		fixed: "Canis Rex has a las-impulsor, Freedom's Hand, and a Questoris multi-laser. Sir Hekhtur has a close combat weapon and Hekhtur's pistol. No swaps.",
		swaps: "Pick one las-impulsor profile and one Freedom's Hand profile before selecting targets.",
		abilities: [
			damagedBracket("1–9", "5"),
			{
				name: "Legendary Freeblade",
				rule: "Once per turn, a Stratagem used on this model costs 1 less CP."
			},
			{
				name: "Chainbreaker",
				rule: "Once per battle, at the start of any phase, one friendly Imperium unit within 12\" that is Battle-shocked is no longer Battle-shocked."
			},
			{
				name: "Sir Hekhtur",
				rule: "When Canis Rex is destroyed, Sir Hekhtur emergency disembarks. The unit is not destroyed until he is. He cannot be the target of any of your Stratagems except Core Stratagems, and he has Lone Operative. Keywords: Infantry, Character, Epic Hero, Imperium, Sir Hekhtur."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-paladin": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Rapid-fire battle cannon", "Blast, Rapid Fire D6+3", "72\"", "D6+3", "3+", "10", "−1", "3"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ironstorm missile pod", "Blast, Indirect Fire", "48\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormspear rocket pod", "", "48\"", "3", "3+", "8", "−2", "D6"),
			gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", "48\"", "3", "3+", "7", "−1", "2")
		],
		melee: [
			blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
			blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
			blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3")
		],
		fixed: "Starts with a meltagun, a Questoris heavy stubber, a rapid-fire battle cannon, and a reaper chainsword.",
		swaps: "The meltagun can be a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1: ironstorm missile pod, stormspear rocket pod, or twin Icarus autocannon.",
		abilities: [
			{
				name: "Paladin’s Duty",
				rule: "Bondsman. While a model is affected, its weapons have Lethal Hits, and its melee weapons also have Lance."
			},
			damagedBracket("1–9", "5"),
			{
				name: "Seasoned Noble",
				rule: "A ranged attack that targets the closest eligible target improves AP by 1."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-errant": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Thermal cannon", "Blast, Melta 6", "24\"", "2D3", "3+", "12", "−4", "D6"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ironstorm missile pod", "Blast, Indirect Fire", "48\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormspear rocket pod", "", "48\"", "3", "3+", "8", "−2", "D6"),
			gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", "48\"", "3", "3+", "7", "−1", "2")
		],
		melee: [
			blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
			blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
			blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3")
		],
		fixed: "Starts with a meltagun, a thermal cannon, and a reaper chainsword.",
		swaps: "The meltagun can be a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1, as the Paladin.",
		abilities: [
			{
				name: "Errant’s Duty",
				rule: "Bondsman. While a model is affected, re-roll Advance rolls made for it, and its ranged weapons have Assault."
			},
			damagedBracket("1–9", "5"),
			{
				name: "Aggressive Assault",
				rule: "A ranged attack that targets the closest eligible target is +1 to hit."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-gallant": {
		stats: {
			m: "12\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ironstorm missile pod", "Blast, Indirect Fire", "48\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormspear rocket pod", "", "48\"", "3", "3+", "8", "−2", "D6"),
			gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", "48\"", "3", "3+", "7", "−1", "2")
		],
		melee: [
			blade("Reaper chainsword, strike", "Devastating Wounds", "6", "2+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "Lethal Hits", "18", "2+", "9", "−3", "2"),
			blade("Thunderstrike gauntlet, strike", "Devastating Wounds", "6", "2+", "20", "−3", "8"),
			blade("Thunderstrike gauntlet, sweep", "Lethal Hits", "12", "2+", "10", "−2", "3")
		],
		fixed: "Starts with a meltagun, a thunderstrike gauntlet, and a reaper chainsword. Its melee weapons are WS 2+.",
		swaps: "Only the meltagun and the carapace weapon can change.",
		abilities: [
			{
				name: "Gallant’s Duty",
				rule: "Bondsman. While a model is affected, re-roll Charge rolls made for it and re-roll its melee Hit rolls."
			},
			damagedBracket("1–9", "5"),
			{
				name: "Martial Pride",
				rule: "When this model Consolidates, it can move an extra 3\" if it ends within Engagement Range."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-warden": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Avenger gatling cannon", "", "36\"", "18", "3+", "6", "−2", "2"),
			gun("Heavy flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "−1", "1"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ironstorm missile pod", "Blast, Indirect Fire", "48\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormspear rocket pod", "", "48\"", "3", "3+", "8", "−2", "D6"),
			gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", "48\"", "3", "3+", "7", "−1", "2")
		],
		melee: [
			blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
			blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
			blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3")
		],
		fixed: "Starts with an avenger gatling cannon, a heavy flamer, a meltagun, and a reaper chainsword.",
		swaps: "The meltagun can be a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1, as the Paladin.",
		abilities: [
			{
				name: "Warden’s Duty",
				rule: "Bondsman. While a model is affected, its weapons have Sustained Hits 1, and its ranged weapons also have Ignores Cover."
			},
			damagedBracket("1–9", "5"),
			{
				name: "Thin Their Ranks",
				rule: "A ranged attack against a unit that is not a Monster or Vehicle has Devastating Wounds."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-crusader": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Avenger gatling cannon", "", "36\"", "18", "3+", "6", "−2", "2"),
			gun("Heavy flamer", "Ignores Cover, Torrent", "12\"", "D6", "—", "5", "−1", "1"),
			gun("Thermal cannon", "Blast, Melta 6", "24\"", "2D3", "3+", "12", "−4", "D6"),
			gun("Rapid-fire battle cannon", "Blast, Rapid Fire D6+3", "72\"", "D6+3", "3+", "10", "−1", "3"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ironstorm missile pod", "Blast, Indirect Fire", "48\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormspear rocket pod", "", "48\"", "3", "3+", "8", "−2", "D6"),
			gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", "48\"", "3", "3+", "7", "−1", "2")
		],
		melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
		fixed: "Starts with an avenger gatling cannon, a heavy flamer, a meltagun, a thermal cannon, and titanic feet.",
		swaps: "The meltagun can be a Questoris heavy stubber. The thermal cannon can be a rapid-fire battle cannon and a Questoris heavy stubber for 15 pts. Carapace 0–1.",
		abilities: [
			{
				name: "Crusader’s Duty",
				rule: "Bondsman. While a model is affected, its ranged attacks are +1 to hit."
			},
			{
				name: "Punishing Salvoes",
				rule: "If this model Remains Stationary, its ranged weapons have Sustained Hits 1 until the end of the turn."
			},
			damagedBracket("1–9", "5"),
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-preceptor": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Las-impulsor, high intensity", "Blast", "24\"", "D6", "3+", "14", "−3", "4"),
			gun("Las-impulsor, low intensity", "Blast", "36\"", "2D6", "3+", "7", "−1", "2"),
			gun("Questoris multi-laser", "", "36\"", "4", "3+", "6", "0", "1"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Ironstorm missile pod", "Blast, Indirect Fire", "48\"", "D6+1", "3+", "5", "0", "1"),
			gun("Stormspear rocket pod", "", "48\"", "3", "3+", "8", "−2", "D6"),
			gun("Twin Icarus autocannon", "Anti-Fly 2+, Twin-linked", "48\"", "3", "3+", "7", "−1", "2")
		],
		melee: [
			blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
			blade("Thunderstrike gauntlet, strike", "", "4", "3+", "20", "−3", "8"),
			blade("Thunderstrike gauntlet, sweep", "", "8", "3+", "10", "−2", "3")
		],
		fixed: "Starts with a las-impulsor, a Questoris multi-laser, and a reaper chainsword. The las-impulsor is BS 3+.",
		swaps: "The multi-laser can be a meltagun or a Questoris heavy stubber. The chainsword can be a thunderstrike gauntlet. Carapace 0–1.",
		abilities: [
			{
				name: "Mentor",
				rule: "Bondsman. While a model is affected, re-roll Wound rolls against this model’s quarry."
			},
			damagedBracket("1–9", "5"),
			{
				name: "Exemplar of the Code",
				rule: "At the start of the battle, select one enemy unit as this model’s quarry. Re-roll the Wound roll against that quarry. When it is destroyed, select a new one."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-castellan": {
		stats: {
			m: "8\"",
			t: "12",
			sv: "3+",
			w: "28",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "10"
		},
		ranged: [
			gun("Plasma decimator", "Blast", "48\"", "D6+3", "3+", "8", "−3", "2"),
			gun("Plasma decimator, supercharge", "Blast, Hazardous", "48\"", "D6+3", "3+", "9", "−4", "3"),
			gun("Volcano lance", "Blast", "72\"", "D3", "3+", "18", "−5", "D6+8"),
			gun("Twin meltagun", "Melta 2, Twin-linked", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Shieldbreaker missile launcher", "Anti-Titanic 4+, Devastating Wounds", "72\"", "1", "3+", "12", "−6", "D6+1"),
			gun("Twin siegebreaker cannon", "Blast, Twin-linked", "36\"", "D6", "3+", "6", "0", "1")
		],
		melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
		fixed: "Plasma decimator, volcano lance, 2 twin meltaguns, and titanic feet.",
		swaps: "Carapace: 2 shieldbreaker missile launchers and a twin siegebreaker cannon, or 1 shieldbreaker missile launcher and 2 twin siegebreaker cannons.",
		abilities: [
			damagedBracket("1–10", "5"),
			{
				name: "Ion Aegis",
				rule: "While a friendly Armiger is within 6\", it has the Benefit of Cover against ranged attacks."
			},
			{
				name: "Titan Hunter",
				rule: "Re-roll the Damage roll of a ranged attack allocated to a Monster or Vehicle model."
			},
			demise("D6+2"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-valiant": {
		stats: {
			m: "8\"",
			t: "12",
			sv: "3+",
			w: "28",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "10"
		},
		ranged: [
			gun("Conflagration cannon", "Ignores Cover, Torrent", "18\"", "3D6", "—", "8", "−1", "2"),
			gun("Thundercoil harpoon", "Blast, Devastating Wounds", "12\"", "D3", "3+", "24", "−6", "10"),
			gun("Twin meltagun", "Melta 2, Twin-linked", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Shieldbreaker missile launcher", "Anti-Titanic 4+, Devastating Wounds", "72\"", "1", "3+", "12", "−6", "D6+1"),
			gun("Twin siegebreaker cannon", "Blast, Twin-linked", "36\"", "D6", "3+", "6", "0", "1")
		],
		melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
		fixed: "Conflagration cannon, thundercoil harpoon, 2 twin meltaguns, and titanic feet.",
		swaps: "Same carapace choice as the Castellan.",
		abilities: [
			damagedBracket("1–10", "5"),
			{
				name: "Thundershock",
				rule: "When you select a target for the thundercoil harpoon, roll one D6 for the target and one D6 for each other enemy unit within 6\". On a 4+, after this model’s attacks, that unit suffers D3 mortal wounds."
			},
			{
				name: "Ion Aegis",
				rule: "While a friendly Armiger is within 6\", it has the Benefit of Cover against ranged attacks."
			},
			demise("D6+2"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-defender": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "4+ ranged",
			damaged: "9"
		},
		ranged: [
			gun("Twin incendine combustor", "Ignores Cover, Torrent, Twin-linked", "12\"", "D6", "—", "6", "−1", "1"),
			gun("Conversion beam obliterator", "Conversion, Sustained Hits D3", "36\"", "3", "3+", "12", "−2", "4"),
			gun("Plasma executor", "Blast", "36\"", "D6+3", "3+", "8", "−2", "2"),
			gun("Plasma executor, supercharge", "Blast, Hazardous", "36\"", "D6+3", "3+", "9", "−3", "3"),
			gun("Phosphor blaster", "Ignores Cover, Rapid Fire 1", "24\"", "1", "3+", "5", "0", "1")
		],
		melee: [blade("Titanic feet", "", "4", "4+", "8", "−1", "2")],
		fixed: "Twin incendine combustor, conversion beam obliterator, plasma executor, phosphor blaster, and titanic feet. No swaps. A conversion beam attack against a target more than 18\" away scores a Critical Hit on an unmodified Hit roll of 4+.",
		swaps: "",
		abilities: [
			{
				name: "Defender’s Duty",
				rule: "Bondsman. While a model is affected, subtract 1 from the Damage characteristic of an attack allocated to it."
			},
			damagedBracket("1–9", "5"),
			{
				name: "Selfless Protector",
				rule: "Each time a ranged attack is allocated to a friendly Imperial Knights model that is not fully visible to every model in the attacking unit because of this Defender, that model has the Benefit of Cover and a 4+ invulnerable save against that attack."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"knight-destrier": {
		stats: {
			m: "12\"",
			t: "10",
			sv: "3+",
			w: "18",
			ld: "6+",
			oc: "8",
			inv: "5+ ranged",
			damaged: "6"
		},
		ranged: [
			gun("Chastiser gatling cannon", "Assault", "24\"", "12", "3+", "6", "−1", "2"),
			gun("Frag bombard", "Assault, Blast, Rapid Fire D6+3", "24\"", "D6+3", "3+", "7", "−1", "2"),
			gun("Questoris heavy stubber", "Assault, Rapid Fire 3", "36\"", "6", "3+", "4", "−1", "1")
		],
		melee: [
			blade("Bellatus reaper chainsword, strike", "", "5", "3+", "12", "−3", "D3+3"),
			blade("Bellatus reaper chainsword, sweep", "", "10", "3+", "8", "−2", "2"),
			blade("Thundershock spear, strike", "Lance", "4", "3+", "12", "−3", "D3+3"),
			blade("Thundershock spear, sweep", "Lance", "8", "3+", "6", "−3", "2"),
			blade("Titanic feet", "", "4", "4+", "7", "−1", "2")
		],
		fixed: "Starts with a chastiser gatling cannon, a frag bombard, a Questoris heavy stubber, and titanic feet.",
		swaps: "Each gun can be replaced with a Bellatus reaper chainsword or a thundershock spear. It cannot have more than one of either melee weapon.",
		abilities: [
			damagedBracket("1–6", "4"),
			{
				name: "Ram Jets",
				rule: "When this model is selected for a Normal or Advance move, add D3\" to its Move characteristic."
			},
			{
				name: "Thundercharge",
				rule: "If this model has both a Bellatus reaper chainsword and a thundershock spear, add 2 Attacks to its melee weapons."
			},
			{
				name: "Saturation Fire",
				rule: "A ranged attack against a unit within range of an objective has Ignores Cover."
			},
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"cerastus-lancer": {
		stats: {
			m: "14\"",
			t: "11",
			sv: "3+",
			w: "28",
			ld: "6+",
			oc: "10",
			inv: "4+",
			damaged: "10"
		},
		ranged: [gun("Cerastus shock lance", "Assault, Sustained Hits 2", "12\"", "6", "3+", "6", "0", "2")],
		melee: [blade("Cerastus shock lance, strike", "Lance", "5", "2+", "20", "−3", "8"), blade("Cerastus shock lance, sweep", "", "10", "2+", "10", "−2", "3")],
		fixed: "Cerastus shock lance, with ranged and melee profiles. No swaps.",
		swaps: "Pick one melee profile before selecting targets.",
		abilities: [
			{
				name: "Lancer’s Duty",
				rule: "Bondsman. While a model is affected, it can declare a charge in a turn in which it Advanced."
			},
			{
				name: "Shock Charge",
				rule: "You can target this model with the Crushing Impact Stratagem for 0CP, even if another unit was already targeted with that Stratagem this phase."
			},
			damagedBracket("1–10", "5"),
			demise("D6+2"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"cerastus-castigator": {
		stats: {
			m: "12\"",
			t: "11",
			sv: "3+",
			w: "28",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "10"
		},
		ranged: [gun("Castigator bolt cannon", "Twin-linked", "36\"", "18", "3+", "6", "−2", "2")],
		melee: [blade("Tempest warblade, strike", "", "4", "3+", "14", "−4", "6"), blade("Tempest warblade, sweep", "", "12", "3+", "9", "−3", "2")],
		fixed: "Castigator bolt cannon and tempest warblade. No swaps.",
		swaps: "",
		abilities: [
			{
				name: "Castigator’s Duty",
				rule: "Bondsman. While a model is affected, its ranged weapons have Sustained Hits 1 and improve AP by 1."
			},
			damagedBracket("1–10", "5"),
			{
				name: "Storm of Bolts",
				rule: "After this model shoots, select one unit that is not a Monster or Vehicle and was hit. Until your next turn, while this model is on the battlefield, that unit is suppressed and is −1 to hit."
			},
			demise("D6+2"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"cerastus-acheron": {
		stats: {
			m: "12\"",
			t: "11",
			sv: "3+",
			w: "28",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "10"
		},
		ranged: [gun("Twin heavy bolter", "Sustained Hits 1, Twin-linked", "36\"", "3", "3+", "5", "−1", "2"), gun("Acheron flame cannon", "Torrent, Ignores Cover", "18\"", "2D6", "—", "8", "−1", "2")],
		melee: [blade("Reaper chainfist, strike", "", "4", "3+", "14", "−4", "6"), blade("Reaper chainfist, sweep", "", "12", "3+", "9", "−3", "2")],
		fixed: "Twin heavy bolter, Acheron flame cannon, and reaper chainfist. No swaps.",
		swaps: "",
		abilities: [
			{
				name: "Acheron’s Duty",
				rule: "Bondsman. At the start of the Fight phase, each enemy unit within Engagement Range of an affected unit takes a Battle-shock test at −1."
			},
			damagedBracket("1–10", "5"),
			{
				name: "Searing Flames",
				rule: "After this model shoots, select one enemy unit hit by the Acheron flame cannon. Until the end of the phase, that unit cannot have the Benefit of Cover."
			},
			demise("D6+2"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"cerastus-atrapos": {
		stats: {
			m: "12\"",
			t: "11",
			sv: "3+",
			w: "28",
			ld: "6+",
			oc: "10",
			inv: "5+",
			damaged: "10"
		},
		ranged: [
			gun("Atrapos lascutter, high intensity", "Sustained Hits 1", "24\"", "D6", "3+", "14", "−3", "4"),
			gun("Atrapos lascutter, low intensity", "Sustained Hits 1", "36\"", "2D6", "3+", "7", "−1", "2"),
			gun("Graviton singularity cannon, contained", "Blast", "24\"", "D3", "3+", "16", "−4", "D6+1"),
			gun("Graviton singularity cannon, singularity", "Blast, Devastating Wounds, Hazardous", "24\"", "D3", "3+", "16", "−4", "D6+1")
		],
		melee: [blade("Atrapos lascutter, high intensity melee", "Sustained Hits 1", "6", "3+", "14", "−3", "4"), blade("Atrapos lascutter, low intensity melee", "Sustained Hits 1", "12", "3+", "7", "−1", "2")],
		fixed: "Atrapos lascutter and graviton singularity cannon. No swaps.",
		swaps: "The lascutter has ranged and melee profiles. Pick one of each pair before selecting targets.",
		abilities: [
			{
				name: "Atrapos’ Duty",
				rule: "Bondsman. While a model is affected, its attacks against a Titanic or Towering model can re-roll the Hit roll and the Wound roll."
			},
			damagedBracket("1–10", "5"),
			{
				name: "Macro-extinction Protocols",
				rule: "Add 1 to hit against a Monster or Vehicle. If the target is Titanic or Towering, also add 1 to wound."
			},
			demise("D6+2"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"questoris-magaera": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+",
			damaged: "9"
		},
		ranged: [
			gun("Lightning cannon", "Sustained Hits 2", "48\"", "12", "3+", "9", "0", "2"),
			gun("Phased plasma-fusil", "Rapid Fire 2", "24\"", "2", "3+", "8", "−3", "2"),
			gun("Twin rad cleanser", "Torrent, Ignores Cover, Anti-Infantry 2+, Twin-linked", "12\"", "D6", "—", "2", "0", "1")
		],
		melee: [
			blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
			blade("Hekaton siege claw, strike", "", "4", "3+", "20", "−3", "8"),
			blade("Hekaton siege claw, sweep", "", "8", "3+", "10", "−2", "3")
		],
		fixed: "Lightning cannon and phased plasma-fusil.",
		swaps: "Melee: reaper chainsword, or a hekaton siege claw and twin rad cleanser.",
		abilities: [
			{
				name: "Magaera’s Duty",
				rule: "Bondsman. While a model is affected, a ranged attack that targets the closest eligible target improves Strength and AP by 1."
			},
			{
				name: "Repair Auto-simulacra",
				rule: "At the end of your Command phase, this model regains up to D3 lost wounds."
			},
			damagedBracket("1–9", "5"),
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"questoris-styrix": {
		stats: {
			m: "10\"",
			t: "11",
			sv: "3+",
			w: "26",
			ld: "6+",
			oc: "10",
			inv: "5+",
			damaged: "9"
		},
		ranged: [
			gun("Graviton crusher", "Anti-Vehicle 2+, Blast", "18\"", "3", "3+", "6", "−1", "2"),
			gun("Volkite chierovile", "Devastating Wounds", "30\"", "12", "3+", "12", "0", "3"),
			gun("Twin rad cleanser", "Torrent, Ignores Cover, Anti-Infantry 2+, Twin-linked", "12\"", "D6", "—", "2", "0", "1")
		],
		melee: [
			blade("Reaper chainsword, strike", "", "4", "3+", "14", "−4", "6"),
			blade("Reaper chainsword, sweep", "", "12", "3+", "9", "−3", "2"),
			blade("Hekaton siege claw, strike", "", "4", "3+", "20", "−3", "8"),
			blade("Hekaton siege claw, sweep", "", "8", "3+", "10", "−2", "3")
		],
		fixed: "Graviton crusher and volkite chierovile.",
		swaps: "Same melee choice as the Magaera.",
		abilities: [
			{
				name: "Styrix’s Duty",
				rule: "Bondsman. After an affected model shoots or fights, one enemy unit hit by those attacks takes a Battle-shock test at −1."
			},
			{
				name: "Grav-pinned",
				rule: "If an enemy Infantry unit is hit by this model’s graviton crusher, until the end of your opponent’s next turn subtract 2 from its Move characteristic and from Charge rolls made for it."
			},
			damagedBracket("1–9", "5"),
			demise("D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"acastus-asterius": {
		stats: {
			m: "8\"",
			t: "13",
			sv: "2+",
			w: "30",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "10"
		},
		ranged: [
			gun("Twin conversion beam cannon", "Conversion, Twin-linked, Sustained Hits D3", "48\"", "3", "3+", "16", "−2", "6"),
			gun("Asterius volkite culverin", "Devastating Wounds", "24\"", "6", "3+", "6", "0", "2"),
			gun("Karacnos mortar battery", "Anti-Infantry 2+, Blast, Ignores Cover, Indirect Fire", "48\"", "D6+3", "3+", "6", "−1", "1")
		],
		melee: [blade("Titanic feet", "", "6", "4+", "10", "−1", "2")],
		fixed: "2 twin conversion beam cannons, 2 Asterius volkite culverins, a Karacnos mortar battery, and titanic feet. No swaps. A conversion beam attack against a target more than 24\" away scores a Critical Hit on an unmodified Hit roll of 4+.",
		swaps: "",
		abilities: [
			{
				name: "Sunderer of Fortresses",
				rule: "Each time this model attacks a Vehicle, improve Strength and Damage by 1. Against a Fortification, improve them by 2."
			},
			damagedBracket("1–10", "5"),
			demise("2D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"acastus-porphyrion": {
		stats: {
			m: "8\"",
			t: "13",
			sv: "2+",
			w: "30",
			ld: "6+",
			oc: "10",
			inv: "5+ ranged",
			damaged: "10"
		},
		ranged: [
			gun("Twin magna lascannon", "Blast, Twin-linked", "72\"", "D6", "3+", "18", "−4", "D6+6"),
			gun("Acastus autocannon", "", "48\"", "2", "3+", "9", "−1", "3"),
			gun("Lascannon", "", "48\"", "1", "3+", "12", "−3", "D6+1"),
			gun("Acastus ironstorm missile pod", "Blast, Heavy, Indirect Fire", "48\"", "D6+6", "3+", "5", "0", "1"),
			gun("Helios defence missiles", "Anti-Fly 2+, Heavy", "48\"", "3", "3+", "10", "−2", "D6")
		],
		melee: [blade("Titanic feet", "", "6", "4+", "10", "−1", "2")],
		fixed: "2 twin magna lascannons, 2 Acastus autocannons, and titanic feet.",
		swaps: "The side guns can be replaced with 1 Acastus autocannon and 1 lascannon, or 2 lascannons. Second mount: Acastus ironstorm missile pod or Helios defence missiles.",
		abilities: [
			{
				name: "Bastion of Firepower",
				rule: "If this model Remains Stationary, its ranged weapons have Lethal Hits until the end of the turn."
			},
			damagedBracket("1–10", "5"),
			demise("2D6"),
			SUPER_HEAVY,
			CODE_CHIVALRIC
		]
	},
	"armiger-helverin": {
		stats: {
			m: "12\"",
			t: "9",
			sv: "3+",
			w: "14",
			ld: "7+",
			oc: "6",
			inv: "5+ ranged",
			damaged: "5"
		},
		ranged: [
			gun("Armiger autocannon", "", "48\"", "4", "3+", "9", "−1", "3"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1")
		],
		melee: [blade("Armoured feet", "", "4", "3+", "6", "0", "1")],
		fixed: "Starts with 2 Armiger autocannons, a Questoris heavy stubber, and armoured feet.",
		swaps: "The stubber can be replaced with a meltagun.",
		abilities: [
			{
				name: "Suppression Protocols",
				rule: "After this model shoots, select one unit that is not a Monster or Vehicle and was hit by an Armiger autocannon. Until your next turn, that unit is −1 to hit."
			},
			damagedBracket("1–5", "3"),
			demise("D3"),
			CODE_CHIVALRIC
		]
	},
	"armiger-warglaive": {
		stats: {
			m: "12\"",
			t: "9",
			sv: "3+",
			w: "14",
			ld: "7+",
			oc: "6",
			inv: "5+ ranged",
			damaged: "5"
		},
		ranged: [
			gun("Thermal spear", "Melta 4", "18\"", "2", "3+", "12", "−4", "D6"),
			gun("Meltagun", "Melta 2", "12\"", "1", "3+", "9", "−4", "D6"),
			gun("Questoris heavy stubber", "Rapid Fire 3", "36\"", "3", "3+", "4", "−1", "1")
		],
		melee: [blade("Reaper chain-cleaver, strike", "", "4", "3+", "10", "−3", "3"), blade("Reaper chain-cleaver, sweep", "", "8", "3+", "8", "−2", "1")],
		fixed: "Starts with a Questoris heavy stubber, a thermal spear, and a reaper chain-cleaver.",
		swaps: "The stubber can be replaced with a meltagun.",
		abilities: [
			{
				name: "Impetuous Glory",
				rule: "After a Charge move, until the end of the turn the strike profile is +1 Attack and the sweep profile is +2 Attacks."
			},
			damagedBracket("1–5", "3"),
			demise("D3"),
			CODE_CHIVALRIC
		]
	},
	"armiger-moirax": {
		stats: {
			m: "12\"",
			t: "9",
			sv: "3+",
			w: "14",
			ld: "7+",
			oc: "6",
			inv: "5+ ranged",
			damaged: "5"
		},
		ranged: [
			gun("Conversion beam cannon", "Conversion, Sustained Hits D3", "24\"", "1", "3+", "10", "−2", "3"),
			gun("Graviton pulsar", "Anti-Vehicle 2+, Blast", "24\"", "D6", "3+", "7", "−1", "2"),
			gun("Lightning lock", "Sustained Hits 2", "36\"", "6", "3+", "8", "0", "1"),
			gun("Volkite veuglaire", "Devastating Wounds", "36\"", "4", "3+", "8", "0", "2"),
			gun("Rad cleanser", "Anti-Infantry 2+, Ignores Cover, Torrent", "12\"", "D6", "—", "2", "0", "1")
		],
		melee: [blade("Siege claw", "", "4", "3+", "12", "−3", "D6+2"), blade("Armoured feet", "", "4", "3+", "6", "0", "1")],
		fixed: "Starts with a graviton pulsar, a volkite veuglaire, and armoured feet.",
		swaps: "The veuglaire can be a siege claw and rad cleanser, a graviton pulsar, a lightning lock, or a conversion beam cannon. The pulsar can be a siege claw and rad cleanser, a lightning lock, a conversion beam cannon, or a volkite veuglaire. A conversion beam cannon scores a Critical Hit on an unmodified Hit roll of 4+ against a unit more than 12\" away.",
		abilities: [
			{
				name: "Protection Protocols",
				rule: "You can target this unit with the Heroic Intervention Stratagem for 1 CP less, and that use does not prevent other uses of Heroic Intervention this phase."
			},
			damagedBracket("1–5", "3"),
			demise("D3"),
			CODE_CHIVALRIC
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
		keywords: "Infantry, Grenades, Imperium, Voidfarers, Rogue Trader Entourage. Rogue Trader: Character",
		faction: "Agents of the Imperium"
	},
	"watch-master": {
		keywords: "Infantry, Character, Grenades, Imperium, Ordo Xenos, Deathwatch, Watch Master",
		faction: "Agents of the Imperium"
	},
	aquila: {
		keywords: "Infantry, Battleline, Grenades, Imperium, Ordo Xenos, Retinue, Deathwatch, Aquila Kill Team. Sergeant and Veterans: Tacticus. Gravis Veterans: Gravis",
		faction: "Agents of the Imperium"
	},
	"deathwatch-kt": {
		keywords: "Infantry, Battleline, Grenades, Imperium, Retinue, Ordo Xenos, Deathwatch, Kill Team",
		faction: "Agents of the Imperium"
	},
	breachers: {
		keywords: "Infantry, Grenades, Imperium, Retinue, Imperial Navy Breachers, Battleline, Smoke, Voidfarers",
		faction: "Agents of the Imperium"
	},
	vigilants: {
		keywords: "Infantry, Battleline, Grenades, Imperium, Retinue, Vigilant Squad, Adeptus Arbites",
		faction: "Agents of the Imperium"
	},
	exaction: {
		keywords: "Infantry, Grenades, Imperium, Retinue, Exaction Squad, Adeptus Arbites",
		faction: "Agents of the Imperium"
	},
	"inquisitorial-agents": {
		keywords: "Infantry, Grenades, Imperium, Retinue, Inquisitorial Agents",
		faction: "Agents of the Imperium"
	},
	sanctifiers: {
		keywords: "Infantry, Grenades, Imperium, Sanctifiers, Retinue",
		faction: "Agents of the Imperium"
	},
	subductors: {
		keywords: "Infantry, Grenades, Imperium, Retinue, Subductor Squad, Adeptus Arbites",
		faction: "Agents of the Imperium"
	},
	voidsmen: {
		keywords: "Infantry, Grenades, Imperium, Retinue, Voidsmen-at-Arms, Voidfarers",
		faction: "Agents of the Imperium"
	},
	corvus: {
		keywords: "Vehicle, Fly, Transport, Imperium, Ordo Xenos, Retinue, Deathwatch, Corvus Blackstar",
		faction: "Agents of the Imperium"
	},
	"grey-knights-terminators": {
		keywords: "Infantry, Psyker, Terminator, Grenades, Imperium, Ordo Malleus, Requisitioned, Grey Knights Terminator Squad",
		faction: "Agents of the Imperium"
	},
	"sisters-squad": {
		keywords: "Infantry, Grenades, Imperium, Ordo Hereticus, Requisitioned, Sisters of Battle Squad",
		faction: "Agents of the Imperium"
	},
	"imperial-rhino": {
		keywords: "Vehicle, Smoke, Transport, Frame, Dedicated Transport, Imperium, Imperial Rhino",
		faction: "Agents of the Imperium"
	},
	"inquisitorial-chimera": {
		keywords: "Vehicle, Smoke, Transport, Frame, Dedicated Transport, Imperium, Inquisitorial Chimera",
		faction: "Agents of the Imperium"
	},
	immolator: {
		keywords: "Vehicle, Smoke, Transport, Frame, Dedicated Transport, Imperium, Ordo Hereticus, Immolator",
		faction: "Agents of the Imperium"
	},
	warhound: {
		keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Warhound Titan",
		faction: "Adeptus Titanicus"
	},
	reaver: {
		keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Reaver Titan",
		faction: "Adeptus Titanicus"
	},
	warbringer: {
		keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Warbringer Nemesis Titan",
		faction: "Adeptus Titanicus"
	},
	"warlord-titan": {
		keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Warlord Titan",
		faction: "Adeptus Titanicus"
	},
	"canis-rex": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Epic Hero, Imperium, Questoris, Canis Rex",
		faction: "Imperial Knights"
	},
	"knight-paladin": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Paladin",
		faction: "Imperial Knights"
	},
	"knight-errant": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Errant",
		faction: "Imperial Knights"
	},
	"knight-gallant": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Gallant",
		faction: "Imperial Knights"
	},
	"knight-warden": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Warden",
		faction: "Imperial Knights"
	},
	"knight-crusader": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Crusader",
		faction: "Imperial Knights"
	},
	"knight-preceptor": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Preceptor",
		faction: "Imperial Knights"
	},
	"knight-castellan": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Dominus, Knight Castellan",
		faction: "Imperial Knights"
	},
	"knight-valiant": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Dominus, Knight Valiant",
		faction: "Imperial Knights"
	},
	"knight-defender": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Defender",
		faction: "Imperial Knights"
	},
	"knight-destrier": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Bellatus, Knight Destrier",
		faction: "Imperial Knights"
	},
	"cerastus-lancer": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Lancer",
		faction: "Imperial Knights"
	},
	"cerastus-castigator": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Castigator",
		faction: "Imperial Knights"
	},
	"cerastus-acheron": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Acheron",
		faction: "Imperial Knights"
	},
	"cerastus-atrapos": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Cerastus, Knight Atrapos",
		faction: "Imperial Knights"
	},
	"questoris-magaera": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Magaera",
		faction: "Imperial Knights"
	},
	"questoris-styrix": {
		keywords: "Vehicle, Walker, Titanic, Towering, Character, Imperium, Questoris, Knight Styrix",
		faction: "Imperial Knights"
	},
	"acastus-asterius": {
		keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Acastus, Knight Asterius",
		faction: "Imperial Knights"
	},
	"acastus-porphyrion": {
		keywords: "Vehicle, Walker, Titanic, Towering, Frame, Imperium, Acastus, Knight Porphyrion",
		faction: "Imperial Knights"
	},
	"armiger-helverin": {
		keywords: "Vehicle, Walker, Imperium, Armiger, Helverin",
		faction: "Imperial Knights"
	},
	"armiger-warglaive": {
		keywords: "Vehicle, Walker, Imperium, Armiger, Warglaive",
		faction: "Imperial Knights"
	},
	"armiger-moirax": {
		keywords: "Vehicle, Walker, Imperium, Armiger, Moirax",
		faction: "Imperial Knights"
	}
};
var kit = (id, name, profiles, points) => ({
	id,
	name,
	profiles,
	points
});
function hasLoadout(unitId) {
	return LOADOUT_UNITS.has(unitId);
}
var LOADOUT_UNITS = /* @__PURE__ */ new Set([
	"aquila",
	"deathwatch-kt",
	"breachers",
	"vigilants",
	"exaction",
	"inquisitorial-agents",
	"sanctifiers",
	"grey-knights-terminators",
	"sisters-squad"
]);
function copies(count, slot, label) {
	return Array.from({ length: count }, (_, index) => ({
		...slot,
		id: `${slot.id}-${index + 1}`,
		label: count > 1 ? `${label} ${index + 1}` : label
	}));
}
function loadoutFor(unitId, models, gear) {
	switch (unitId) {
		case "aquila": return aquila(models);
		case "deathwatch-kt": return deathwatch(models, gear);
		case "breachers": return breachers();
		case "vigilants": return vigilants();
		case "exaction": return exaction();
		case "inquisitorial-agents": return agents(models);
		case "sanctifiers": return sanctifiers();
		case "grey-knights-terminators": return greyKnights();
		case "sisters-squad": return sisters();
		default: return null;
	}
}
function aquila(models) {
	const n = models >= 10 ? 2 : 1;
	const gravis = {
		kind: "choice",
		id: "gravis",
		label: "Gravis Veteran",
		options: [
			kit("infernus", "Infernus heavy bolter", [
				"Bolt pistol",
				"Close combat weapon",
				"Infernus heavy bolter",
				"Infernus heavy bolter, heavy flamer"
			]),
			kit("frag", "Frag cannon", [
				"Bolt pistol",
				"Close combat weapon",
				"Frag cannon"
			]),
			kit("hellstorm", "Hellstorm bolt rifle and Astartes grenade launcher", [
				"Bolt pistol",
				"Close combat weapon",
				"Hellstorm bolt rifle",
				"Astartes grenade launcher, frag",
				"Astartes grenade launcher, krak"
			])
		]
	};
	const gun = {
		kind: "choice",
		id: "gun",
		label: "Veteran gun",
		options: [kit("stalker", "Stalker bolt rifle", [
			"Bolt pistol",
			"Close combat weapon",
			"Stalker bolt rifle"
		]), kit("plasma", "Plasma incinerator", [
			"Bolt pistol",
			"Close combat weapon",
			"Plasma incinerator",
			"Plasma incinerator, supercharge"
		])]
	};
	const hammer = {
		kind: "choice",
		id: "hammer",
		label: "Veteran weapon",
		options: [kit("hammer", "Heavy thunder hammer", ["Bolt pistol", "Heavy thunder hammer"]), kit("shield", "Power weapon and Astartes shield", [
			"Bolt pistol",
			"Power weapon",
			"Astartes shield"
		])]
	};
	const knife = {
		kind: "choice",
		id: "knife",
		label: "Phobos Veteran",
		options: [kit("carbine", "Deathwatch marksman bolt carbine", [
			"Close combat weapon",
			"Special-issue bolt pistol",
			"Deathwatch marksman bolt carbine"
		]), kit("knife", "Combat knife", [
			"Close combat weapon",
			"Special-issue bolt pistol",
			"Combat knife"
		])]
	};
	return {
		fixed: [
			{
				name: "Plasma pistol",
				count: 1
			},
			{
				name: "Plasma pistol, supercharge",
				count: 1
			},
			{
				name: "Power weapon",
				count: 1
			}
		],
		slots: [
			...copies(n, gravis, "Gravis Veteran"),
			...copies(n, gun, "Veteran gun"),
			...copies(n, hammer, "Veteran weapon"),
			...copies(n, knife, "Phobos Veteran"),
			...models >= 10 ? [{
				kind: "choice",
				id: "xenophase",
				label: "Veteran",
				options: [kit("xeno", "Xenophase blade", ["Special-issue bolt pistol", "Xenophase blade"])]
			}] : []
		]
	};
}
function deathwatch(models, gear) {
	const per = models >= 10 ? 2 : 1;
	const sergeant = gear?.sergeant ?? "bolt-power";
	const took = (id) => sergeant === id ? 1 : 0;
	const shieldTook = sergeant === "shield-bolt" || sergeant === "shield-power" ? 1 : 0;
	const veterans = Math.max(0, models - 1);
	const room = (max, taken = 0) => Math.max(0, Math.min(veterans, max - taken));
	return {
		fixed: [],
		total: veterans,
		caps: [{
			ids: ["shield-bolt", "shield-power"],
			max: room(2 * per, shieldTook)
		}],
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
					kit("infernus", "Infernus heavy bolter", [
						"Infernus heavy bolter",
						"Infernus heavy bolter, heavy flamer",
						"Close combat weapon"
					]),
					kit("stalker", "Stalker-pattern boltgun", ["Stalker-pattern boltgun", "Close combat weapon"])
				]
			},
			{
				kind: "count",
				id: "shield-bolt",
				label: "Astartes shield and boltgun",
				kit: kit("shield-bolt", "Astartes shield and boltgun", ["Boltgun", "Astartes shield"]),
				min: 0,
				max: room(2 * per, shieldTook)
			},
			{
				kind: "count",
				id: "shield-power",
				label: "Astartes shield and power weapon",
				kit: kit("shield-power", "Astartes shield and power weapon", ["Power weapon", "Astartes shield"]),
				min: 0,
				max: room(2 * per, shieldTook)
			},
			{
				kind: "count",
				id: "black",
				label: "Black Shield blades",
				kit: kit("black", "Black Shield blades", ["Black Shield blades"]),
				min: 0,
				max: room(1, took("black"))
			},
			{
				kind: "count",
				id: "shotgun",
				label: "Deathwatch shotgun",
				kit: kit("shotgun", "Deathwatch shotgun", ["Deathwatch shotgun", "Close combat weapon"]),
				min: 0,
				max: room(2 * per, took("shotgun"))
			},
			{
				kind: "count",
				id: "hammer",
				label: "Thunder hammer",
				kit: kit("hammer", "Deathwatch thunder hammer", ["Deathwatch thunder hammer"]),
				min: 0,
				max: room(2 * per, took("hammer"))
			},
			{
				kind: "count",
				id: "frag",
				label: "Frag cannon",
				kit: kit("frag", "Frag cannon", ["Frag cannon", "Close combat weapon"]),
				min: 0,
				max: room(per, took("frag"))
			},
			{
				kind: "count",
				id: "infernus",
				label: "Infernus heavy bolter",
				kit: kit("infernus", "Infernus heavy bolter", [
					"Infernus heavy bolter",
					"Infernus heavy bolter, heavy flamer",
					"Close combat weapon"
				]),
				min: 0,
				max: room(per, took("infernus"))
			},
			{
				kind: "count",
				id: "stalker",
				label: "Stalker-pattern boltgun",
				kit: kit("stalker", "Stalker-pattern boltgun", ["Stalker-pattern boltgun", "Close combat weapon"]),
				min: 0,
				max: room(per, took("stalker"))
			},
			{
				kind: "count",
				id: "bolt-power",
				label: "Boltgun and power weapon",
				kit: kit("bolt-power", "Boltgun and power weapon", ["Boltgun", "Power weapon"]),
				min: 0,
				max: veterans,
				fill: true
			}
		]
	};
}
function breachers() {
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
					kit("auto", "Autopistol and chainsword", [
						"Autopistol",
						"Chainsword",
						"Close combat weapon"
					]),
					kit("bolt", "Bolt pistol and power weapon", [
						"Bolt pistol",
						"Power weapon",
						"Close combat weapon"
					])
				]
			},
			{
				kind: "choice",
				id: "special",
				label: "Special weapon",
				options: [
					kit("volley", "Navis las-volley", ["Navis las-volley", "Close combat weapon"]),
					kit("melta", "Meltagun", ["Meltagun", "Close combat weapon"]),
					kit("plasma", "Plasma gun", [
						"Plasma gun",
						"Plasma gun, supercharge",
						"Close combat weapon"
					])
				]
			},
			{
				kind: "count",
				id: "chainfist",
				label: "Autopistol and chainfist",
				kit: kit("chainfist", "Autopistol and chainfist", [
					"Autopistol",
					"Chainfist",
					"Close combat weapon"
				]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "power",
				label: "Autopistol and power weapon",
				kit: kit("power", "Autopistol and power weapon", [
					"Autopistol",
					"Power weapon",
					"Close combat weapon"
				]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "heavy",
				label: "Heavy shotgun and Endurant shield",
				kit: kit("heavy", "Navis heavy shotgun", ["Navis heavy shotgun", "Close combat weapon"]),
				min: 1,
				max: 1
			},
			{
				kind: "count",
				id: "shotgun",
				label: "Navis shotgun",
				kit: kit("shotgun", "Navis shotgun", ["Navis shotgun", "Close combat weapon"]),
				min: 5,
				max: 7,
				fill: true
			},
			{
				kind: "choice",
				id: "demo",
				label: "Demolition charge",
				options: [kit("none", "No demolition charge"), kit("charge", "Demolition charge", ["Demolition charge"])]
			}
		]
	};
}
function vigilants() {
	return {
		fixed: [
			{
				name: "Arbites combat shotgun",
				count: 1
			},
			{
				name: "Arbites shotpistol",
				count: 10
			},
			{
				name: "Close combat weapon",
				count: 10
			},
			{
				name: "Mechanical bite",
				count: 1
			}
		],
		total: 9,
		caps: [{
			ids: [
				"executioner",
				"launcher",
				"stubber",
				"webber"
			],
			max: 2
		}],
		slots: [
			{
				kind: "choice",
				id: "nuncio",
				label: "Nuncio-aquila",
				options: [kit("none", "No nuncio-aquila"), kit("nuncio", "Nuncio-aquila", ["Nuncio-aquila"])]
			},
			{
				kind: "count",
				id: "executioner",
				label: "Executioner shotgun",
				kit: kit("executioner", "Executioner shotgun", ["Executioner shotgun"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "launcher",
				label: "Arbites grenade launcher",
				kit: kit("launcher", "Arbites grenade launcher", ["Arbites grenade launcher, frag", "Arbites grenade launcher, krak"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "stubber",
				label: "Heavy stubber",
				kit: kit("stubber", "Heavy stubber", ["Heavy stubber"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "webber",
				label: "Webber",
				kit: kit("webber", "Webber", ["Webber"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "shotgun",
				label: "Combat shotgun",
				kit: kit("shotgun", "Arbites combat shotgun", ["Arbites combat shotgun"]),
				min: 7,
				max: 9,
				fill: true
			}
		]
	};
}
function exaction() {
	return {
		fixed: [
			{
				name: "Arbites combat shotgun",
				count: 1
			},
			{
				name: "Arbites shotpistol",
				count: 10
			},
			{
				name: "Close combat weapon",
				count: 10
			},
			{
				name: "Mechanical bite",
				count: 1
			}
		],
		total: 9,
		caps: [{
			ids: [
				"executioner",
				"launcher",
				"stubber",
				"webber"
			],
			max: 2
		}],
		slots: [
			{
				kind: "choice",
				id: "maul",
				label: "Excruciator maul",
				options: [kit("none", "No excruciator maul"), kit("maul", "Excruciator maul", ["Excruciator maul"])]
			},
			{
				kind: "choice",
				id: "medikit",
				label: "Arbites medi-kit",
				options: [kit("none", "No medi-kit"), kit("medikit", "Arbites medi-kit", ["Arbites medi-kit"])]
			},
			{
				kind: "choice",
				id: "scanner",
				label: "Soulguilt scanner",
				options: [kit("none", "No soulguilt scanner"), kit("scanner", "Soulguilt scanner", ["Soulguilt scanner"])]
			},
			{
				kind: "count",
				id: "executioner",
				label: "Executioner shotgun",
				kit: kit("executioner", "Executioner shotgun", ["Executioner shotgun"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "launcher",
				label: "Arbites grenade launcher",
				kit: kit("launcher", "Arbites grenade launcher", ["Arbites grenade launcher, frag", "Arbites grenade launcher, krak"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "stubber",
				label: "Heavy stubber",
				kit: kit("stubber", "Heavy stubber", ["Heavy stubber"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "webber",
				label: "Webber",
				kit: kit("webber", "Webber", ["Webber"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "shotgun",
				label: "Combat shotgun",
				kit: kit("shotgun", "Arbites combat shotgun", ["Arbites combat shotgun"]),
				min: 7,
				max: 9,
				fill: true
			}
		]
	};
}
function agents(models) {
	const big = models >= 12;
	const servitors = big ? 2 : 1;
	const body = big ? 10 : 5;
	const per = big ? 2 : 1;
	return {
		fixed: [],
		total: body,
		caps: [{
			ids: [
				"melta",
				"cannon",
				"bolter"
			],
			max: servitors
		}],
		floors: [{
			ids: [
				"bolter",
				"melta",
				"cannon"
			],
			min: servitors
		}],
		slots: [
			{
				kind: "count",
				id: "bolter",
				label: "Gun Servitor, heavy bolter",
				kit: kit("bolter", "Heavy bolter", ["Heavy bolter", "Agent melee weapon"]),
				min: 0,
				max: servitors,
				base: servitors,
				extra: true
			},
			{
				kind: "count",
				id: "melta",
				label: "Gun Servitor, multi-melta",
				kit: kit("melta", "Multi-melta", ["Multi-melta", "Agent melee weapon"]),
				min: 0,
				max: servitors,
				extra: true
			},
			{
				kind: "count",
				id: "cannon",
				label: "Gun Servitor, plasma cannon",
				kit: kit("cannon", "Plasma cannon", [
					"Plasma cannon",
					"Plasma cannon, supercharge",
					"Agent melee weapon"
				]),
				min: 0,
				max: servitors,
				extra: true
			},
			{
				kind: "count",
				id: "tome",
				label: "Tome-skull",
				kit: kit("tome", "Tome-skull", ["Tome-skull"]),
				min: 0,
				max: per,
				extra: true
			},
			{
				kind: "count",
				id: "eviscerator",
				label: "Eviscerator",
				kit: kit("eviscerator", "Eviscerator", [
					"Agent firearm",
					"Agent melee weapon",
					"Eviscerator"
				]),
				min: 0,
				max: per
			},
			{
				kind: "count",
				id: "stave",
				label: "Mystic stave",
				kit: kit("stave", "Mystic stave", [
					"Agent firearm",
					"Agent melee weapon",
					"Mystic stave"
				]),
				min: 0,
				max: per
			},
			{
				kind: "count",
				id: "plasma",
				label: "Plasma pistol",
				kit: kit("plasma", "Plasma pistol", [
					"Agent firearm",
					"Agent melee weapon",
					"Plasma pistol",
					"Plasma pistol, supercharge"
				]),
				min: 0,
				max: per
			},
			{
				kind: "count",
				id: "agent",
				label: "Agent",
				kit: kit("agent", "Agent firearm and melee weapon", ["Agent firearm", "Agent melee weapon"]),
				min: body - per * 3,
				max: body,
				fill: true
			}
		]
	};
}
function sanctifiers() {
	return {
		fixed: [
			{
				name: "Holy fire",
				count: 1
			},
			{
				name: "Burning hands",
				count: 1
			},
			{
				name: "Death Cult blades",
				count: 1
			},
			{
				name: "Close combat weapon",
				count: 1
			},
			{
				name: "Ministorum flamer",
				count: 1
			},
			{
				name: "Sanctifier melee weapon",
				count: 2
			}
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
					kit("fire", "Plasma gun and holy fire", [
						"Plasma gun",
						"Plasma gun, supercharge",
						"Holy fire"
					])
				]
			},
			{
				kind: "count",
				id: "flamer",
				label: "Second hand flamer",
				kit: kit("flamer", "Hand flamer and close combat weapon", [
					"Ministorum hand flamer",
					"Ministorum hand flamer",
					"Close combat weapon"
				]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "simulacrum",
				label: "Simulacrum Imperialis",
				kit: kit("simulacrum", "Simulacrum Imperialis", [
					"Ministorum hand flamer",
					"Close combat weapon",
					"Simulacrum Imperialis"
				]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "sanctifier",
				label: "Sanctifier",
				kit: kit("sanctifier", "Hand flamer", ["Ministorum hand flamer", "Sanctifier melee weapon"]),
				min: 2,
				max: 4,
				fill: true
			}
		]
	};
}
function greyKnights() {
	return {
		fixed: [{
			name: "Nemesis force weapon",
			count: 5
		}, {
			name: "Storm bolter",
			count: 1
		}],
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
					kit("psycannon", "Psycannon", ["Psycannon"], 5)
				]
			},
			{
				kind: "count",
				id: "banner",
				label: "Ancient's banner",
				kit: kit("banner", "Ancient's banner", ["Ancient's banner"]),
				min: 0,
				max: 1,
				extra: true
			},
			{
				kind: "count",
				id: "narthecium",
				label: "Narthecium",
				kit: kit("narthecium", "Narthecium", ["Narthecium"]),
				min: 0,
				max: 1
			},
			{
				kind: "count",
				id: "bolter",
				label: "Storm bolter",
				kit: kit("bolter", "Storm bolter", ["Storm bolter"]),
				min: 1,
				max: 3,
				fill: true
			}
		]
	};
}
function sisters() {
	return {
		fixed: [{
			name: "Bolt pistol",
			count: 10
		}, {
			name: "Close combat weapon",
			count: 10
		}],
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
					kit("plasma", "Plasma pistol", ["Plasma pistol", "Plasma pistol, supercharge"])
				]
			},
			{
				kind: "choice",
				id: "superior-melee",
				label: "Superior melee",
				options: [
					kit("none", "No extra melee"),
					kit("chain", "Chainsword", ["Chainsword"]),
					kit("power", "Power weapon", ["Power weapon"])
				]
			},
			{
				kind: "choice",
				id: "special",
				label: "Special weapon",
				options: [
					kit("boltgun", "Boltgun", ["Boltgun"]),
					kit("storm", "Artificer-crafted storm bolter", ["Artificer-crafted storm bolter"]),
					kit("melta", "Meltagun", ["Meltagun"]),
					kit("flamer", "Ministorum flamer", ["Ministorum flamer"])
				]
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
					kit("multi", "Multi-melta", ["Multi-melta"])
				]
			},
			{
				kind: "choice",
				id: "simulacrum",
				label: "Simulacrum Imperialis",
				options: [kit("none", "No simulacrum"), kit("sim", "Simulacrum Imperialis", ["Simulacrum Imperialis"])]
			},
			{
				kind: "count",
				id: "sister",
				label: "Battle Sister",
				kit: kit("sister", "Boltgun", ["Boltgun"]),
				min: 7,
				max: 7,
				fill: true
			}
		]
	};
}
function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}
function resolvedLoadout(unitId, models, gear) {
	const spec = loadoutFor(unitId, models, gear);
	if (!spec) return null;
	const choices = {};
	const counts = {};
	for (const slot of spec.slots) if (slot.kind === "choice") choices[slot.id] = slot.options.some((option) => option.id === gear?.[slot.id]) ? gear[slot.id] : slot.options[0].id;
	const counted = spec.slots.filter((slot) => slot.kind === "count" && !slot.fill);
	for (const slot of counted) {
		const raw = Number(gear?.[slot.id]);
		counts[slot.id] = clamp(Number.isFinite(raw) ? raw : slot.base ?? slot.min, slot.min, slot.max);
	}
	const pullDown = (ids, overflow) => {
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
		const slot = counted.find((item) => item.id === id);
		counts[id] = clamp((counts[id] ?? 0) + (floor.min - have), slot.min, slot.max);
	}
	const fill = spec.slots.find((slot) => slot.kind === "count" && Boolean(slot.fill));
	if (fill && spec.total != null) {
		const modelIds = counted.filter((slot) => !slot.extra).map((slot) => slot.id);
		const usedModels = () => modelIds.reduce((sum, id) => sum + (counts[id] ?? 0), 0);
		let used = usedModels();
		if (spec.total - used < fill.min) pullDown(modelIds, fill.min - (spec.total - used));
		used = usedModels();
		counts[fill.id] = clamp(spec.total - used, fill.min, fill.max);
	}
	return {
		spec,
		choices,
		counts
	};
}
function loadoutGear(unitId, models, gear) {
	const resolved = resolvedLoadout(unitId, models, gear);
	if (!resolved) return void 0;
	const next = {};
	for (const [id, value] of Object.entries(resolved.choices)) next[id] = value;
	for (const [id, value] of Object.entries(resolved.counts)) next[id] = String(value);
	return next;
}
function loadoutPoints(unitId, models, gear) {
	const resolved = resolvedLoadout(unitId, models, gear);
	if (!resolved) return 0;
	let total = 0;
	for (const slot of resolved.spec.slots) {
		if (slot.kind === "choice") total += slot.options.find((option) => option.id === resolved.choices[slot.id])?.points ?? 0;
		if (slot.kind === "count") total += (slot.kit.points ?? 0) * (resolved.counts[slot.id] ?? 0);
	}
	return total;
}
function loadoutProfiles(unitId, models, gear) {
	const resolved = resolvedLoadout(unitId, models, gear);
	if (!resolved) return [];
	const totals = /* @__PURE__ */ new Map();
	const add = (name, count) => {
		if (count <= 0) return;
		totals.set(name, (totals.get(name) ?? 0) + count);
	};
	for (const item of resolved.spec.fixed) add(item.name, item.count);
	for (const slot of resolved.spec.slots) if (slot.kind === "choice") slot.options.find((option) => option.id === resolved.choices[slot.id])?.profiles?.forEach((name) => add(name, 1));
	else {
		const count = resolved.counts[slot.id] ?? 0;
		slot.kit.profiles?.forEach((name) => add(name, count));
	}
	return [...totals.entries()].map(([name, count]) => ({
		name,
		count
	}));
}
function loadoutLine(unitId, models, gear) {
	return loadoutProfiles(unitId, models, gear).filter((item) => !item.name.toLowerCase().includes("supercharge")).map((item) => `${item.name} x${item.count}`).join(", ");
}
function loadoutMentions(unitId, weaponName, models) {
	const spec = loadoutFor(unitId, models);
	if (!spec) return false;
	const wanted = weaponName.toLowerCase();
	if (spec.fixed.some((item) => item.name.toLowerCase() === wanted)) return true;
	return spec.slots.some((slot) => {
		return (slot.kind === "choice" ? slot.options.flatMap((option) => option.profiles ?? []) : slot.kit.profiles ?? []).some((name) => name.toLowerCase() === wanted);
	});
}
function loadoutHas(unitId, weaponName, models, gear) {
	const wanted = weaponName.toLowerCase();
	return loadoutProfiles(unitId, models, gear).some((item) => item.name.toLowerCase() === wanted && item.count > 0);
}
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
function katahByName(name) {
	return ARMY_RULES.find((rule) => rule.name === "Martial Ka’tah")?.parts?.find((part) => part.name === name);
}
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
			costs: [65]
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
			costs: flat(95)
		}]
	},
	{
		id: "aquila",
		name: "Aquila Kill Team",
		category: "Imperial Retinue",
		sizes: [{
			models: 5,
			costs: flat(100)
		}, {
			models: 10,
			costs: flat(200)
		}]
	},
	{
		id: "deathwatch-kt",
		name: "Deathwatch Kill Team",
		category: "Imperial Retinue",
		sizes: [{
			models: 5,
			costs: flat(100)
		}, {
			models: 10,
			costs: flat(190)
		}]
	},
	{
		id: "breachers",
		name: "Imperial Navy Breachers",
		category: "Imperial Retinue",
		sizes: [{
			models: 10,
			costs: flat(90)
		}]
	},
	{
		id: "vigilants",
		name: "Vigilant Squad",
		category: "Imperial Retinue",
		sizes: [{
			models: 11,
			costs: flat(85)
		}]
	},
	{
		id: "exaction",
		name: "Exaction Squad",
		category: "Imperial Retinue",
		sizes: [{
			models: 11,
			costs: flat(85)
		}]
	},
	{
		id: "inquisitorial-agents",
		name: "Inquisitorial Agents",
		category: "Imperial Retinue",
		sizes: [{
			models: 6,
			costs: flat(60)
		}, {
			models: 12,
			costs: flat(120)
		}]
	},
	{
		id: "sanctifiers",
		name: "Sanctifiers",
		category: "Imperial Retinue",
		sizes: [{
			models: 9,
			costs: flat(100)
		}]
	},
	{
		id: "subductors",
		name: "Subductor Squad",
		category: "Imperial Retinue",
		sizes: [{
			models: 11,
			costs: flat(100)
		}]
	},
	{
		id: "voidsmen",
		name: "Voidsmen-at-Arms",
		category: "Imperial Retinue",
		sizes: [{
			models: 6,
			costs: flat(70)
		}]
	},
	{
		id: "corvus",
		name: "Corvus Blackstar",
		category: "Imperial Retinue",
		sizes: [{
			models: 1,
			costs: flat(180)
		}]
	},
	{
		id: "grey-knights-terminators",
		name: "Grey Knights Terminator Squad",
		category: "Requisitioned",
		sizes: [{
			models: 5,
			costs: flat(190)
		}]
	},
	{
		id: "sisters-squad",
		name: "Sisters of Battle Squad",
		category: "Requisitioned",
		sizes: [{
			models: 10,
			costs: flat(110)
		}]
	},
	{
		id: "imperial-rhino",
		name: "Imperial Rhino",
		category: "Requisitioned",
		sizes: [{
			models: 1,
			costs: [
				65,
				65,
				65
			],
			fourthPlus: 75
		}]
	},
	{
		id: "inquisitorial-chimera",
		name: "Inquisitorial Chimera",
		category: "Requisitioned",
		sizes: [{
			models: 1,
			costs: [
				60,
				60,
				60
			],
			fourthPlus: 70
		}]
	},
	{
		id: "immolator",
		name: "Sisters of Battle Immolator",
		category: "Requisitioned",
		sizes: [{
			models: 1,
			costs: [
				105,
				105,
				105
			],
			fourthPlus: 115
		}]
	},
	{
		id: "warhound",
		name: "Warhound Titan",
		category: "Titans",
		sizes: [{
			models: 1,
			costs: flat(1100)
		}]
	},
	{
		id: "reaver",
		name: "Reaver Titan",
		category: "Titans",
		sizes: [{
			models: 1,
			costs: flat(2200)
		}]
	},
	{
		id: "warbringer",
		name: "Warbringer Nemesis Titan",
		category: "Titans",
		sizes: [{
			models: 1,
			costs: flat(2600)
		}]
	},
	{
		id: "warlord-titan",
		name: "Warlord Titan",
		category: "Titans",
		sizes: [{
			models: 1,
			costs: flat(3500)
		}]
	},
	{
		id: "canis-rex",
		name: "Canis Rex",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: flat(415)
		}]
	},
	{
		id: "knight-paladin",
		name: "Knight Paladin",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				375,
				375,
				390
			]
		}]
	},
	{
		id: "knight-errant",
		name: "Knight Errant",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				355,
				355,
				370
			]
		}]
	},
	{
		id: "knight-gallant",
		name: "Knight Gallant",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				355,
				355,
				370
			]
		}]
	},
	{
		id: "knight-warden",
		name: "Knight Warden",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				375,
				375,
				390
			]
		}]
	},
	{
		id: "knight-crusader",
		name: "Knight Crusader",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				395,
				415,
				415
			]
		}]
	},
	{
		id: "knight-preceptor",
		name: "Knight Preceptor",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				365,
				365,
				380
			]
		}]
	},
	{
		id: "knight-castellan",
		name: "Knight Castellan",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				425,
				450,
				450
			]
		}]
	},
	{
		id: "knight-valiant",
		name: "Knight Valiant",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				400,
				400,
				415
			]
		}]
	},
	{
		id: "knight-defender",
		name: "Knight Defender",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				400,
				420,
				420
			]
		}]
	},
	{
		id: "knight-destrier",
		name: "Knight Destrier",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				265,
				265,
				280
			]
		}]
	},
	{
		id: "cerastus-lancer",
		name: "Cerastus Knight Lancer",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				415,
				435,
				435
			]
		}]
	},
	{
		id: "cerastus-castigator",
		name: "Cerastus Knight Castigator",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				380,
				395,
				395
			]
		}]
	},
	{
		id: "cerastus-acheron",
		name: "Cerastus Knight Acheron",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				380,
				395,
				395
			]
		}]
	},
	{
		id: "cerastus-atrapos",
		name: "Cerastus Knight Atrapos",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				405,
				425,
				425
			]
		}]
	},
	{
		id: "questoris-magaera",
		name: "Questoris Knight Magaera",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				385,
				400,
				400
			]
		}]
	},
	{
		id: "questoris-styrix",
		name: "Questoris Knight Styrix",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				375,
				390,
				390
			]
		}]
	},
	{
		id: "acastus-asterius",
		name: "Acastus Knight Asterius",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				785,
				860,
				860
			]
		}]
	},
	{
		id: "acastus-porphyrion",
		name: "Acastus Knight Porphyrion",
		category: "Knights",
		sizes: [{
			models: 1,
			costs: [
				725,
				800,
				800
			]
		}]
	},
	{
		id: "armiger-helverin",
		name: "Armiger Helverin",
		category: "Armigers",
		sizes: [{
			models: 1,
			costs: flat(140)
		}]
	},
	{
		id: "armiger-warglaive",
		name: "Armiger Warglaive",
		category: "Armigers",
		sizes: [{
			models: 1,
			costs: flat(140)
		}]
	},
	{
		id: "armiger-moirax",
		name: "Armiger Moirax",
		category: "Armigers",
		sizes: [{
			models: 1,
			costs: [
				150,
				150,
				160
			]
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
var INQUISITOR_IDS = [
	"coteaz",
	"draxus",
	"greyfax",
	"inquisitor"
];
var VOIDFARER_IDS = ["navigator", "rogue-trader"];
function countOf(entries, ids) {
	return entries.filter((entry) => ids.includes(entry.unitId)).length;
}
/** Retinue units that use the 2-unit cap. An Inquisitor sponsors one Inquisitorial Agents unit, and a Voidfarers character sponsors one Voidsmen-at-Arms unit. */
function retinueCounting(entries) {
	return entries.filter((entry) => {
		return unitById(entry.unitId)?.category === "Imperial Retinue" && entry.unitId !== "inquisitorial-agents" && entry.unitId !== "voidsmen";
	}).length + Math.max(0, countOf(entries, ["inquisitorial-agents"]) - countOf(entries, INQUISITOR_IDS)) + Math.max(0, countOf(entries, ["voidsmen"]) - countOf(entries, VOIDFARER_IDS));
}
function withinCategoryCap(unit, entries, detachments) {
	const category = unitCategory(unit, detachments);
	const cap = categoryLimit(category);
	if (cap == null) return true;
	if (category === "Imperial Retinue") {
		if (unit.id === "inquisitorial-agents" && countOf(entries, ["inquisitorial-agents"]) < countOf(entries, INQUISITOR_IDS)) return true;
		if (unit.id === "voidsmen" && countOf(entries, ["voidsmen"]) < countOf(entries, VOIDFARER_IDS)) return true;
		return retinueCounting(entries) < cap;
	}
	return entries.filter((entry) => {
		const other = unitById(entry.unitId);
		return other != null && unitCategory(other, detachments) === category;
	}).length < cap;
}
function copyLimit(unit, detachments = []) {
	if (unit.maxCopies != null) return unit.maxCopies;
	if (unit.battleline || unit.id === "prosecutors" && detachments.includes("vigil")) return 6;
	if (unit.sizes.some((size) => size.fourthPlus != null)) return 6;
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
var NAMED_BODIES = {
	coteaz: [
		"exaction",
		"breachers",
		"inquisitorial-agents",
		"subductors",
		"vigilants"
	],
	draxus: [
		"aquila",
		"exaction",
		"breachers",
		"inquisitorial-agents",
		"subductors",
		"vigilants"
	],
	greyfax: [
		"exaction",
		"breachers",
		"inquisitorial-agents",
		"sanctifiers",
		"subductors",
		"vigilants",
		"sisters-squad"
	],
	inquisitor: [
		"aquila",
		"exaction",
		"breachers",
		"inquisitorial-agents",
		"sanctifiers",
		"subductors",
		"vigilants",
		"sisters-squad"
	],
	navigator: ["breachers", "voidsmen"],
	"rogue-trader": ["breachers", "voidsmen"],
	"ministorum-priest": [
		"exaction",
		"breachers",
		"inquisitorial-agents",
		"sanctifiers",
		"subductors",
		"vigilants",
		"sisters-squad"
	],
	artemis: ["aquila", "deathwatch-kt"],
	"watch-master": ["aquila", "deathwatch-kt"]
};
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
	return unitId in LEADER_TARGETS || unitId in NAMED_BODIES;
}
var KNIGHT_WARLORDS = /* @__PURE__ */ new Set([
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
	"questoris-styrix"
]);
/** Characters, plus Knights whose sheet says they can be the Warlord. Acastus Knights and Armigers cannot. */
function canBeWarlord(unitId) {
	return isCharacter(unitId) || KNIGHT_WARLORDS.has(unitId);
}
function canLead(leaderUnitId, bodyUnitId, detachments = []) {
	if (LEADER_TARGETS[leaderUnitId]?.includes(bodyUnitId)) return true;
	if (NAMED_BODIES[leaderUnitId]?.includes(bodyUnitId)) return true;
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
		case "inquisitor": return "Attaches to Battleline and the Retinue units on its sheet.";
		case "navigator":
		case "rogue-trader": return "Attaches to Imperial Navy Breachers or Voidsmen-at-Arms.";
		case "ministorum-priest": return "Must support one of the units on its sheet.";
		case "artemis":
		case "watch-master": return "Attaches to an Aquila Kill Team or a Deathwatch Kill Team.";
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
var knightCarapace = pick("carapace", [
	choice("none", "None"),
	choice("ironstorm", "Ironstorm missile pod", void 0, ["Ironstorm missile pod"]),
	choice("stormspear", "Stormspear rocket pod", void 0, ["Stormspear rocket pod"]),
	choice("icarus", "Twin Icarus autocannon", void 0, ["Twin Icarus autocannon"])
]);
var knightChest = pick("chest", [choice("melta", "Meltagun", void 0, ["Meltagun"]), choice("stubber", "Questoris heavy stubber", void 0, ["Questoris heavy stubber"])]);
var knightMelee = pick("melee", [choice("chainsword", "Reaper chainsword", void 0, ["Reaper chainsword, strike", "Reaper chainsword, sweep"]), choice("gauntlet", "Thunderstrike gauntlet", void 0, ["Thunderstrike gauntlet, strike", "Thunderstrike gauntlet, sweep"])]);
var dominusCarapace = pick("carapace", [choice("two-shield", "2 Shieldbreaker missile launchers, Twin siegebreaker cannon", void 0, ["Shieldbreaker missile launcher", "Twin siegebreaker cannon"]), choice("two-siege", "Shieldbreaker missile launcher, 2 Twin siegebreaker cannons", void 0, ["Shieldbreaker missile launcher", "Twin siegebreaker cannon"])]);
var forgeMelee = pick("melee", [choice("chainsword", "Reaper chainsword", void 0, ["Reaper chainsword, strike", "Reaper chainsword, sweep"]), choice("claw", "Hekaton siege claw and twin rad cleanser", void 0, [
	"Hekaton siege claw, strike",
	"Hekaton siege claw, sweep",
	"Twin rad cleanser"
])]);
var armigerChest = pick("chest", [choice("stubber", "Questoris heavy stubber", void 0, ["Questoris heavy stubber"]), choice("melta", "Meltagun", void 0, ["Meltagun"])]);
var destrierMount = (id, gunId, gunName, profiles) => pick(id, [
	choice(gunId, gunName, void 0, profiles),
	choice("chainsword", "Bellatus reaper chainsword", void 0, ["Bellatus reaper chainsword, strike", "Bellatus reaper chainsword, sweep"]),
	choice("spear", "Thundershock spear", void 0, ["Thundershock spear, strike", "Thundershock spear, sweep"])
]);
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
	rhino: [pick("missile", [choice("hunter", "Hunter-killer Missile", void 0, ["Hunter-killer missile"])], true)],
	corvus: [
		pick("centre", [choice("cannon", "Twin assault cannon", void 0, ["Twin assault cannon"]), choice("lascannon", "Twin lascannon", void 0, ["Twin lascannon"])]),
		pick("missiles", [choice("rockets", "Blackstar rocket launchers", void 0, ["Blackstar rocket launcher"]), choice("stormstrike", "Stormstrike missile launchers", void 0, ["Stormstrike missile launcher"])]),
		pick("hurricane", [choice("hurricane", "Hurricane bolter", void 0, ["Hurricane bolter"])], true),
		pick("extra", [
			choice("none", "No array or halo-launcher"),
			choice("auspex", "Auspex array"),
			choice("halo", "Infernum halo-launcher")
		])
	],
	"imperial-rhino": [pick("missile", [choice("hunter", "Hunter-killer missile", void 0, ["Hunter-killer missile"])], true)],
	"inquisitorial-chimera": [
		pick("hull", [choice("bolter", "Hull heavy bolter", void 0, ["Heavy bolter"]), choice("flamer", "Hull heavy flamer", void 0, ["Heavy flamer"])]),
		pick("turret", [
			choice("laser", "Multi-laser", void 0, ["Multi-laser"]),
			choice("bolter", "Turret heavy bolter", void 0, ["Heavy bolter"]),
			choice("flamer", "Turret heavy flamer", void 0, ["Heavy flamer"])
		]),
		pick("pintle", [
			choice("none", "No pintle"),
			choice("stubber", "Heavy stubber", void 0, ["Heavy stubber"]),
			choice("storm", "Storm bolter", void 0, ["Storm bolter"])
		]),
		pick("missile", [choice("hunter", "Hunter-killer missile", void 0, ["Hunter-killer missile"])], true)
	],
	immolator: [pick("turret", [
		choice("flamers", "Immolation flamers", void 0, ["Immolation flamers"]),
		choice("bolter", "Twin heavy bolter", void 0, ["Twin heavy bolter"]),
		choice("melta", "Twin multi-melta", 15, ["Twin multi-melta"])
	]), pick("missile", [choice("hunter", "Hunter-killer missile", void 0, ["Hunter-killer missile"])], true)],
	subductors: [pick("nuncio", [choice("nuncio", "Nuncio-aquila")], true)],
	inquisitor: [
		pick("pistol", [choice("bolt", "Bolt pistol", void 0, ["Bolt pistol"]), choice("combi", "Combi-weapon", void 0, ["Combi-weapon"])]),
		pick("gifts", [choice("wardings", "Blessed wardings"), choice("gifts", "Psychic gifts and Psychic Shock Wave", void 0, ["Psychic Shock Wave"])]),
		pick("melee", [choice("melee", "Inquisitorial melee weapon", void 0, ["Inquisitorial melee weapon"]), choice("force", "Force weapon", void 0, ["Force weapon"])])
	],
	"ministorum-priest": [pick("armament", [choice("vindictor", "Zealot’s vindictor", void 0, ["Zealot’s vindictor"]), choice("pistol", "Holy pistol and power weapon", void 0, ["Holy pistol", "Power weapon"])])],
	warhound: [pick("arm-a", [
		choice("plasma", "Warhound plasma blastgun", void 0, ["Warhound plasma blastgun", "Warhound plasma blastgun, supercharge"]),
		choice("inferno", "Warhound inferno gun", void 0, ["Warhound inferno gun"]),
		choice("turbo", "Warhound turbo-laser destructor", void 0, ["Warhound turbo-laser destructor"]),
		choice("vulcan", "Warhound vulcan mega-bolter", void 0, ["Warhound vulcan mega-bolter"])
	]), pick("arm-b", [
		choice("vulcan", "Warhound vulcan mega-bolter", void 0, ["Warhound vulcan mega-bolter"]),
		choice("inferno", "Warhound inferno gun", void 0, ["Warhound inferno gun"]),
		choice("plasma", "Warhound plasma blastgun", void 0, ["Warhound plasma blastgun", "Warhound plasma blastgun, supercharge"]),
		choice("turbo", "Warhound turbo-laser destructor", void 0, ["Warhound turbo-laser destructor"])
	])],
	reaver: [pick("gatling-arm", [
		choice("gatling", "Reaver gatling blaster", void 0, ["Reaver gatling blaster"]),
		choice("laser", "Reaver laser blaster", void 0, ["Reaver laser blaster"]),
		choice("melta", "Reaver melta cannon", void 0, ["Reaver melta cannon"]),
		choice("volcano", "Reaver volcano cannon", void 0, ["Reaver volcano cannon"]),
		choice("fist", "Reaver power fist", void 0, ["Reaver power fist, strike", "Reaver power fist, sweep"])
	]), pick("laser-arm", [
		choice("laser", "Reaver laser blaster", void 0, ["Reaver laser blaster"]),
		choice("gatling", "Reaver gatling blaster", void 0, ["Reaver gatling blaster"]),
		choice("melta", "Reaver melta cannon", void 0, ["Reaver melta cannon"]),
		choice("volcano", "Reaver volcano cannon", void 0, ["Reaver volcano cannon"])
	])],
	warbringer: [
		pick("carapace", [choice("quake", "Nemesis quake cannon", void 0, ["Nemesis quake cannon"]), choice("volcano", "Nemesis volcano cannon", void 0, ["Nemesis volcano cannon"])]),
		pick("gatling-arm", [
			choice("gatling", "Reaver gatling blaster", void 0, ["Reaver gatling blaster"]),
			choice("laser", "Reaver laser blaster", void 0, ["Reaver laser blaster"]),
			choice("melta", "Reaver melta cannon", void 0, ["Reaver melta cannon"]),
			choice("volcano", "Reaver volcano cannon", void 0, ["Reaver volcano cannon"])
		]),
		pick("laser-arm", [
			choice("laser", "Reaver laser blaster", void 0, ["Reaver laser blaster"]),
			choice("gatling", "Reaver gatling blaster", void 0, ["Reaver gatling blaster"]),
			choice("melta", "Reaver melta cannon", void 0, ["Reaver melta cannon"]),
			choice("volcano", "Reaver volcano cannon", void 0, ["Reaver volcano cannon"])
		])
	],
	"warlord-titan": [
		pick("carapace", [choice("apocalypse", "Apocalypse launchers", void 0, ["Apocalypse launcher"]), choice("lasers", "Laser blasters", void 0, ["Laser blaster"])]),
		pick("claw-arm", [
			choice("claw", "Arioch power claw", void 0, [
				"Arioch power claw",
				"Arioch power claw, strike",
				"Arioch power claw, sweep"
			]),
			choice("belicosa", "Belicosa volcano cannon", void 0, ["Belicosa volcano cannon"]),
			choice("gatling", "Macro gatling blaster", void 0, ["Macro gatling blaster"]),
			choice("quake", "Mori quake cannon", void 0, ["Mori quake cannon"]),
			choice("sunfury", "Sunfury plasma annihilator", void 0, ["Sunfury plasma annihilator", "Sunfury plasma annihilator, supercharge"])
		]),
		pick("gatling-arm", [
			choice("gatling", "Macro gatling blaster", void 0, ["Macro gatling blaster"]),
			choice("claw", "Arioch power claw", void 0, [
				"Arioch power claw",
				"Arioch power claw, strike",
				"Arioch power claw, sweep"
			]),
			choice("belicosa", "Belicosa volcano cannon", void 0, ["Belicosa volcano cannon"]),
			choice("quake", "Mori quake cannon", void 0, ["Mori quake cannon"]),
			choice("sunfury", "Sunfury plasma annihilator", void 0, ["Sunfury plasma annihilator", "Sunfury plasma annihilator, supercharge"])
		])
	],
	"knight-paladin": [
		knightCarapace,
		knightChest,
		knightMelee
	],
	"knight-errant": [
		knightCarapace,
		knightChest,
		knightMelee
	],
	"knight-gallant": [knightCarapace, knightChest],
	"knight-warden": [
		knightCarapace,
		knightChest,
		knightMelee
	],
	"knight-crusader": [
		knightCarapace,
		knightChest,
		pick("arm", [choice("thermal", "Thermal cannon", void 0, ["Thermal cannon"]), choice("battle", "Rapid-fire battle cannon and Questoris heavy stubber", 15, ["Rapid-fire battle cannon", "Questoris heavy stubber"])])
	],
	"knight-preceptor": [
		knightCarapace,
		pick("chest", [
			choice("laser", "Questoris multi-laser", void 0, ["Questoris multi-laser"]),
			choice("melta", "Meltagun", void 0, ["Meltagun"]),
			choice("stubber", "Questoris heavy stubber", void 0, ["Questoris heavy stubber"])
		]),
		knightMelee
	],
	"knight-castellan": [dominusCarapace],
	"knight-valiant": [dominusCarapace],
	"knight-destrier": [destrierMount("mount-a", "gatling", "Chastiser gatling cannon", ["Chastiser gatling cannon"]), destrierMount("mount-b", "bombard", "Frag bombard", ["Frag bombard"])],
	"questoris-magaera": [forgeMelee],
	"questoris-styrix": [forgeMelee],
	"acastus-porphyrion": [pick("sides", [
		choice("cannons", "2 Acastus autocannons", void 0, ["Acastus autocannon"]),
		choice("mixed", "Acastus autocannon and lascannon", void 0, ["Acastus autocannon", "Lascannon"]),
		choice("las", "2 Lascannons", void 0, ["Lascannon"])
	]), pick("mount", [choice("ironstorm", "Acastus ironstorm missile pod", void 0, ["Acastus ironstorm missile pod"]), choice("helios", "Helios defence missiles", void 0, ["Helios defence missiles"])])],
	"armiger-helverin": [armigerChest],
	"armiger-warglaive": [armigerChest],
	"armiger-moirax": [pick("arm-a", [
		choice("graviton", "Graviton pulsar", void 0, ["Graviton pulsar"]),
		choice("claw", "Siege claw and rad cleanser", void 0, ["Siege claw", "Rad cleanser"]),
		choice("lightning", "Lightning lock", void 0, ["Lightning lock"]),
		choice("conversion", "Conversion beam cannon", void 0, ["Conversion beam cannon"]),
		choice("volkite", "Volkite veuglaire", void 0, ["Volkite veuglaire"])
	]), pick("arm-b", [
		choice("volkite", "Volkite veuglaire", void 0, ["Volkite veuglaire"]),
		choice("claw", "Siege claw and rad cleanser", void 0, ["Siege claw", "Rad cleanser"]),
		choice("graviton", "Graviton pulsar", void 0, ["Graviton pulsar"]),
		choice("lightning", "Lightning lock", void 0, ["Lightning lock"]),
		choice("conversion", "Conversion beam cannon", void 0, ["Conversion beam cannon"])
	])]
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
	"armiger-moirax": "Armoured feet"
};
function gearGroups(unitId) {
	return GEAR[unitId] ?? [];
}
function armedWith(unitId) {
	return ARMED[unitId];
}
function gearPoints(unitId, gear, models) {
	let total = loadoutPoints(unitId, models ?? unitById(unitId)?.sizes[0]?.models ?? 1, gear);
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
	if (hasLoadout(unitId)) names.push(loadoutLine(unitId, models, gear));
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id];
		const choice = group.optional ? picked ? group.choices.find((item) => item.id === picked) : void 0 : group.choices.find((item) => item.id === picked) ?? group.choices[0];
		if (!choice || choice.id === "none") continue;
		names.push(group.optional ? `${choice.name} x1` : counted(choice.name, models));
	}
	const fixed = armedWith(unitId);
	if (fixed && !hasLoadout(unitId)) names.push(counted(fixed, models));
	return names.filter(Boolean).join(", ");
}
function gearLine(unitId, gear, includeFixed = true, models) {
	const names = [];
	const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
	if (hasLoadout(unitId)) names.push(loadoutLine(unitId, size, gear));
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id];
		const choice = group.optional ? picked ? group.choices.find((item) => item.id === picked) : void 0 : group.choices.find((item) => item.id === picked) ?? group.choices[0];
		if (choice && choice.id !== "none") names.push(choice.name);
	}
	if (includeFixed && !hasLoadout(unitId)) {
		const fixed = armedWith(unitId);
		if (fixed) names.push(fixed);
	}
	return names.join(", ");
}
function weaponTaken(unitId, weaponName, gear, models) {
	const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
	if (hasLoadout(unitId) && loadoutMentions(unitId, weaponName, size)) return loadoutHas(unitId, weaponName, size, gear);
	if (!new Set(gearGroups(unitId).flatMap((group) => group.choices.flatMap((item) => item.profiles ?? []).map((name) => name.toLowerCase()))).has(weaponName.toLowerCase())) return true;
	const active = /* @__PURE__ */ new Set();
	for (const group of gearGroups(unitId)) {
		const picked = gear?.[group.id] ?? (group.optional ? void 0 : group.choices[0]?.id);
		group.choices.find((item) => item.id === picked)?.profiles?.forEach((name) => active.add(name.toLowerCase()));
	}
	return active.has(weaponName.toLowerCase());
}
function cleanGear(unitId, gear, models) {
	const size = models ?? unitById(unitId)?.sizes[0]?.models ?? 1;
	const source = gear && typeof gear === "object" ? gear : {};
	const next = {};
	const composed = loadoutGear(unitId, size, Object.fromEntries(Object.entries(source).filter((entry) => typeof entry[1] === "string")));
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
	return Object.keys(next).length ? next : void 0;
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
		flavor: "Plays a more defensive game, focused on occupying objectives and whittling down the enemy as they’re forced to come to you.",
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
		flavor: "Charges forwards as fast as possible to brutalise their foes in close combat.",
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
		flavor: "Prioritise the mission, fight first, and ignore modifiers to hit and wound.",
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
		flavor: "Make your units more flexible and reliable, and ready a ka’tah mid-round too.",
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
		flavor: "Brawl in close combat and overwhelm your enemy.",
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
		flavor: "Move even quicker than usual, and flow into and out of engagement like water.",
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
		wounds: 1,
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
		weaponMod: {
			scope: "ranged",
			attacks: 1
		},
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
		weaponMod: {
			scope: "melee",
			tags: "Cleave 1"
		},
		targets: CUSTODES
	},
	{
		id: "flawless",
		name: "Flawless Bladework",
		detachment: "dread-host",
		points: 15,
		rule: "Adeptus Custodes model only. Its melee attacks have [Sustained Hits 1].",
		weaponMod: {
			scope: "melee",
			tags: "Sustained Hits 1"
		},
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
		weaponMod: {
			scope: "melee",
			tags: "Devastating Wounds"
		},
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
		weaponMod: {
			scope: "melee",
			attacks: 1,
			strength: 1,
			damage: 1
		},
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
var GRANTED = {
	"emperors-light": [{
		name: "Emperor's Light",
		tags: "Extra Attacks",
		range: "Melee",
		a: "3",
		skill: "WS 2+",
		s: "5",
		ap: "−2",
		d: "2"
	}],
	orb: [{
		name: "Auriferous Orb",
		tags: "Anti-non-Monster/Vehicle 2+, Blinding Light, Devastating Wounds",
		range: "12\"",
		a: "3",
		skill: "BS 2+",
		s: "1",
		ap: "0",
		d: "1"
	}]
};
function weaponKey(name) {
	return name.split(" — ")[0].replace(/, supercharge$/i, "");
}
function weaponChoices(unitId, models, gear, scope) {
	const sheet = datasheetById(unitId);
	if (!sheet) return [];
	const groups = /* @__PURE__ */ new Map();
	for (const weapon of scope === "ranged" ? sheet.ranged : sheet.melee) {
		if (!weaponTaken(unitId, weapon.name, gear, models)) continue;
		const id = weaponKey(weapon.name);
		const existing = groups.get(id);
		if (existing) existing.names.push(weapon.name);
		else groups.set(id, {
			id,
			label: id,
			names: [weapon.name]
		});
	}
	return [...groups.values()];
}
function chosenWeapon(choices, selected) {
	return choices.find((choice) => choice.id === selected) ?? choices[0];
}
function addStat(value, delta) {
	if (!delta) return value;
	const dice = value.match(/^(.*[Dd]\d*)\+(\d+)$/);
	if (dice) return `${dice[1]}+${Number(dice[2]) + delta}`;
	const split = value.match(/^(\d+)\+(\d+)$/);
	if (split) return `${split[1]}+${Number(split[2]) + delta}`;
	const plain = value.match(/^(\d+)(.*)$/);
	if (plain && !/[Dd]/.test(value)) return `${Number(plain[1]) + delta}${plain[2]}`;
	if (/[Dd]/.test(value)) return `${value}+${delta}`;
	return value;
}
function betterLeadership(value, steps) {
	const match = value.match(/^(\d+)\+$/);
	if (!match) return value;
	return `${Math.max(2, Number(match[1]) - steps)}+`;
}
function addTags(existing, tags) {
	const have = (existing ?? "").split(",").map((tag) => tag.trim()).filter(Boolean);
	for (const tag of tags.split(",").map((item) => item.trim()).filter(Boolean)) if (!have.some((item) => item.toLowerCase() === tag.toLowerCase())) have.push(tag);
	return have.join(", ");
}
function applyWeapon(weapon, mod) {
	return {
		...weapon,
		a: mod.attacks ? addStat(weapon.a, mod.attacks) : weapon.a,
		s: mod.strength ? addStat(weapon.s, mod.strength) : weapon.s,
		d: mod.damage ? addStat(weapon.d, mod.damage) : weapon.d,
		tags: mod.tags ? addTags(weapon.tags, mod.tags) : weapon.tags
	};
}
function taken(gear, id) {
	return Number(gear?.[id]) > 0;
}
function hasAstartesShield(unitId, gear) {
	if (!gear) return false;
	if (unitId === "aquila") return Object.entries(gear).some(([key, value]) => key.startsWith("hammer") && value === "shield");
	if (unitId === "deathwatch-kt") return gear.sergeant === "shield-bolt" || gear.sergeant === "shield-power" || taken(gear, "shield-bolt") || taken(gear, "shield-power");
	return false;
}
function hasSimulacrum(unitId, gear) {
	if (unitId === "sisters-squad") return gear?.simulacrum === "sim";
	if (unitId === "sanctifiers") return taken(gear, "simulacrum");
	return false;
}
/** Optional datasheet abilities that only exist when that wargear is equipped. */
function wargearAbility(name, unitId, gear) {
	switch (name.replace(/’/g, "'")) {
		case "Vexilla": return gear?.vexilla === "vexilla";
		case "Praesidium Shield": return unitId === "sentinel-guard" || unitId === "shield-captain" && (gear?.weapon ?? "").startsWith("shield");
		case "Ancient's Banner": return taken(gear, "banner");
		case "Narthecium": return taken(gear, "narthecium");
		case "Astartes Shield": return hasAstartesShield(unitId, gear);
		case "Endurant shield": return unitId === "breachers";
		case "Nuncio Aquila": return gear?.nuncio === "nuncio";
		case "Simulacrum Imperialis": return hasSimulacrum(unitId, gear);
		case "Auspex Array": return gear?.extra === "auspex";
		case "Infernum Halo-launcher": return gear?.extra === "halo";
		case "Blessed Wardings": return unitId === "inquisitor" && (gear?.gifts ?? "wardings") !== "gifts";
		case "Tome-skull": return taken(gear, "tome");
		default: return;
	}
}
function patchStats(stats, wounds, oc, leadership) {
	return {
		...stats,
		w: wounds ? addStat(stats.w, wounds) : stats.w,
		oc: oc ? addStat(stats.oc, oc) : stats.oc,
		ld: leadership ? betterLeadership(stats.ld, leadership) : stats.ld
	};
}
function playSheet({ unitId, models = 1, gear, enhancementId, enhancementWeapon }) {
	const sheet = datasheetById(unitId);
	if (!sheet) return null;
	const enhancement = enhancementId ? enhancementById(enhancementId) : void 0;
	const auspex = gear?.extra === "auspex";
	const oc = (gear?.vexilla === "vexilla" ? 1 : 0) + (taken(gear, "banner") ? 1 : 0);
	const leadership = hasSimulacrum(unitId, gear) ? 1 : 0;
	const wounds = enhancement?.wounds ?? 0;
	const mod = enhancement?.weaponMod;
	const target = mod ? chosenWeapon(weaponChoices(unitId, models, gear, mod.scope), enhancementWeapon) : void 0;
	const adjust = (weapon, scope) => {
		let next = weapon;
		if (scope === "ranged" && auspex) next = {
			...next,
			tags: addTags(next.tags, "Ignores Cover")
		};
		if (mod && target && mod.scope === scope && target.names.includes(weapon.name)) next = applyWeapon(next, mod);
		return next;
	};
	const ranged = sheet.ranged.filter((weapon) => weaponTaken(unitId, weapon.name, gear, models)).map((weapon) => adjust(weapon, "ranged"));
	const melee = sheet.melee.filter((weapon) => weaponTaken(unitId, weapon.name, gear, models)).map((weapon) => adjust(weapon, "melee"));
	for (const weapon of enhancement ? GRANTED[enhancement.id] ?? [] : []) if (weapon.range === "Melee") melee.push(weapon);
	else ranged.push(weapon);
	const abilities = sheet.abilities.filter((ability) => wargearAbility(ability.name, unitId, gear) !== false);
	if (enhancement) abilities.push({
		name: enhancement.name,
		rule: enhancement.rule
	});
	return {
		stats: patchStats(sheet.stats, wounds, oc, leadership),
		profiles: (sheet.profiles ?? []).map((profile) => ({
			...profile,
			stats: patchStats(profile.stats, 0, oc, leadership)
		})),
		ranged,
		melee,
		abilities
	};
}
function WeaponLine({ weapon, original, granted }) {
	const melee = weapon.range === "Melee";
	const skill = weapon.skill.replace(/^BS |^WS /, "");
	const previousSkill = original?.skill.replace(/^BS |^WS /, "");
	const tags = weapon.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) ?? [];
	const oldTags = new Set(original?.tags?.split(",").map((tag) => tag.trim()) ?? []);
	const [open, setOpen] = (0, import_react.useState)(null);
	const explained = open ? explainTag(open) : void 0;
	const cells = [
		[
			"R",
			weapon.range,
			Boolean(granted || original && weapon.range !== original.range)
		],
		[
			melee ? "WS" : "BS",
			skill,
			Boolean(granted || original && skill !== previousSkill)
		],
		[
			"A",
			weapon.a,
			Boolean(granted || original && weapon.a !== original.a)
		],
		[
			"S",
			weapon.s,
			Boolean(granted || original && weapon.s !== original.s)
		],
		[
			"AP",
			weapon.ap,
			Boolean(granted || original && weapon.ap !== original.ap)
		],
		[
			"D",
			weapon.d,
			Boolean(granted || original && weapon.d !== original.d)
		]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "rounded-lg border border-line bg-bg px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `text-sm font-medium ${granted ? "text-modified" : ""}`,
				children: weapon.name
			}),
			tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 flex flex-wrap gap-1",
				children: tags.map((tag) => {
					const added = Boolean(granted || original && !oldTags.has(tag));
					return explainTag(tag) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setOpen(open === tag ? null : tag),
						className: `rounded-lg border px-2 py-1 text-xs ${added ? "mark-modified" : open === tag ? "border-gold text-gold" : "border-line text-muted"}`,
						children: tag
					}, tag) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `inline-flex items-center text-xs ${added ? "text-modified" : "text-muted"}`,
						children: tag
					}, tag);
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
				open: Boolean(explained),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [explained?.only ? `Only against ${explained.only}. ` : "", explained?.rule]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-2 grid grid-cols-6 gap-1 text-center",
				children: cells.map(([label, value, marked]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-[10px] tracking-wide text-gold uppercase",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: `text-xs break-words ${marked ? "text-modified" : ""}`,
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
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
			open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: FLY_RULE
			})
		})]
	});
}
function WeaponBlock({ title, weapons, originals }) {
	if (weapons.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "text-xs tracking-wide text-gold uppercase",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 flex flex-col gap-2",
		children: weapons.map((weapon) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponLine, {
			weapon,
			original: originals?.get(weapon.name),
			granted: originals != null && !originals.has(weapon.name)
		}, `${title}-${weapon.name}`))
	})] });
}
function WargearPicker({ unitId, models, gear, onGear }) {
	const resolved = resolvedLoadout(unitId, models, gear);
	const groups = gearGroups(unitId);
	if (!resolved && groups.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex max-w-full min-w-0 flex-col items-start gap-1.5",
		children: [resolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadoutControls, {
			unitId,
			models,
			gear,
			resolved,
			onGear
		}) : null, groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GearGroupControl, {
			group,
			gear,
			onGear
		}, group.id))]
	});
}
function LoadoutControls({ unitId, models, gear, resolved, onGear }) {
	const canCount = (id, value) => resolvedLoadout(unitId, models, {
		...gear,
		[id]: String(value)
	})?.counts[id] === value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: resolved.spec.slots.map((slot) => {
		if (slot.kind === "choice") {
			const selected = resolved.choices[slot.id] ?? slot.options[0]?.id ?? "";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex w-full min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] tracking-wide text-muted uppercase",
					children: slot.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponMenu, {
					group: {
						id: slot.id,
						choices: slot.options.map((option) => ({
							id: option.id,
							name: option.name,
							points: option.points
						}))
					},
					gear: { [slot.id]: selected },
					onGear
				})]
			}, slot.id);
		}
		const count = resolved.counts[slot.id] ?? 0;
		if (slot.fill) return count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				slot.kit.name,
				" x",
				count
			]
		}, slot.id) : null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Fewer ${slot.label}`,
					disabled: !canCount(slot.id, count - 1),
					onClick: () => onGear(slot.id, String(count - 1)),
					className: "inline-flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
						className: "size-3.5",
						"aria-hidden": "true"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "min-w-0 flex-1 text-xs",
					children: [
						slot.label,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-1 tabular-nums text-muted",
							children: ["x", count]
						}),
						slot.kit.points ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-1 text-muted",
							children: [
								"+",
								slot.kit.points,
								" pts"
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `More ${slot.label}`,
					disabled: !canCount(slot.id, count + 1),
					onClick: () => onGear(slot.id, String(count + 1)),
					className: "inline-flex size-8 items-center justify-center rounded-lg border border-line disabled:opacity-40",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: "size-3.5",
						"aria-hidden": "true"
					})
				})
			]
		}, slot.id);
	}) });
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `motion-dot relative grid size-6 shrink-0 place-items-center rounded-full border ${on ? "border-gold bg-gold text-bg" : "border-line bg-bg text-muted"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: `motion-icon size-3.5 ${on ? "motion-icon-on" : "motion-icon-off"}`,
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
						className: `motion-icon size-3.5 ${on ? "motion-icon-off" : "motion-icon-on"}`,
						"aria-hidden": "true"
					})]
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
function DatasheetView({ unitId, unitName, models, gear, enhancementId, enhancementWeapon, listOnly = false, onClose }) {
	const sheet = datasheetById(unitId);
	const keywords = KEYWORDS[unitId];
	if (!sheet) return null;
	const presented = listOnly ? playSheet({
		unitId,
		models,
		gear,
		enhancementId,
		enhancementWeapon
	}) : null;
	const statsSource = presented?.stats ?? sheet.stats;
	const extraProfiles = presented?.profiles ?? sheet.profiles ?? [];
	const blocks = [{
		name: extraProfiles.length ? sheet.profileName ?? unitName : "",
		stats: statsSource,
		base: sheet.stats
	}, ...extraProfiles.map((profile, index) => ({
		name: profile.name,
		stats: profile.stats,
		base: sheet.profiles?.[index]?.stats ?? profile.stats
	}))];
	const originals = new Map([...sheet.ranged, ...sheet.melee].map((weapon) => [weapon.name, weapon]));
	const ranged = presented ? presented.ranged : sheet.ranged;
	const melee = presented ? presented.melee : sheet.melee;
	const abilities = presented ? presented.abilities : sheet.abilities;
	const selectedKit = gearLine(unitId, gear, true, models);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFrame, {
		label: `${unitName} datasheet`,
		onClose,
		children: (close) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: unitName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close datasheet",
					onClick: close,
					className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				})]
			}),
			blocks.map((block) => {
				const rows = [
					[
						"M",
						block.stats.m,
						block.base.m
					],
					[
						"T",
						block.stats.t,
						block.base.t
					],
					[
						"Sv",
						block.stats.sv,
						block.base.sv
					],
					[
						"W",
						block.stats.w,
						block.base.w
					],
					[
						"Ld",
						block.stats.ld,
						block.base.ld
					],
					[
						"OC",
						block.stats.oc,
						block.base.oc
					],
					block.stats.inv || block.base.inv ? [
						"Inv",
						block.stats.inv ?? "—",
						block.base.inv ?? "—"
					] : null,
					block.stats.damaged || block.base.damaged ? [
						"Damaged",
						block.stats.damaged ?? "—",
						block.base.damaged ?? "—"
					] : null
				].filter((item) => item != null);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3",
					children: [block.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-xs tracking-wide text-muted uppercase",
						children: block.name
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "flex flex-wrap gap-2",
						children: rows.map(([label, value, base]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-line bg-bg px-2 py-1 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[10px] tracking-wide text-muted uppercase",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: `text-sm ${presented && value !== base ? "text-modified" : ""}`,
								children: value
							})]
						}, label))
					})]
				}, block.name || "profile");
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
						weapons: ranged,
						originals: presented ? originals : void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeaponBlock, {
						title: "Melee",
						weapons: melee,
						originals: presented ? originals : void 0
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 flex flex-col gap-3",
						children: abilities.map((ability) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: ability.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: ability.rule
						})] }, ability.name))
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
		] })
	});
}
function DetachmentSheet({ ids, onClose }) {
	const detachments = ids.map((id) => detachmentById(id)).filter((item) => item != null);
	if (detachments.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFrame, {
		label: "Detachment rules",
		onClose,
		children: (close) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: detachments.length === 1 ? detachments[0].name : "Detachments"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Close detachment rules",
				onClick: close,
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
								detachment.unique ? ` · Shield Host${detachment.flavor ? ` — ${detachment.flavor}` : ""}` : ""
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
						detachment.katah ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-xs tracking-wide text-gold uppercase",
								children: ["Favoured Ka’tah · ", detachment.katah.name]
							}),
							katahByName(detachment.katah.name) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: katahByName(detachment.katah.name).rule
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm",
								children: ["Additional effect: ", detachment.katah.effect]
							})
						] }) : null,
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
		})] })
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
function CoreRules({ onClose, army = false }) {
	const abilities = WEAPON_ABILITIES.filter((ability) => ability.key !== "pistol");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFrame, {
		label: army ? "Army rules" : "Core rules",
		onClose,
		children: (close) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: army ? "Army rules" : "Core rules"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": army ? "Close army rules" : "Close core rules",
					onClick: close,
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
			army ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
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
			] })
		] })
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
		id: "monochrome",
		name: "Monochrome",
		swatch: "#d4d4d4"
	}
];
var THEME_KEY = "ttt-theme";
var MOTION_KEY = "ttt-motion";
function loadTheme() {
	const saved = localStorage.getItem(THEME_KEY);
	if (saved === "amethyst") return "monochrome";
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFrame, {
		label: "Settings",
		onClose,
		children: (close) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close settings",
					onClick: close,
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
						children: "Turn this off to keep interface transitions."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `motion-color text-xs ${reduceMotion ? "text-gold" : "text-muted"}`,
							children: reduceMotion ? "On" : "Off"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `motion-switch ${reduceMotion ? "is-on" : ""}`,
							"aria-hidden": "true",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						})]
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
						className: `motion-card flex min-h-11 items-center gap-2 rounded-lg border px-3 text-left text-sm ${theme === item.id ? "border-gold text-fg" : "border-line text-muted"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-4 shrink-0 rounded-full border border-line",
							style: { background: item.swatch }
						}), item.name]
					}, item.id))
				})]
			})
		] })
	});
}
var MISSIONS = [
	{
		name: "Take and Hold",
		summary: "Pays for holding and flipping ground.",
		cards: [
			{
				id: "battlefield-dominance",
				name: "Battlefield Dominance",
				flavor: "This battlefield holds great significance for the wider war effort. You must seize control of it. Let nothing stand in your way.",
				windows: [{
					round: "First and second battle round",
					when: "End of your turn.",
					scores: [{
						pays: "You control more objectives than your opponent.",
						points: "2VP"
					}]
				}, {
					round: "Second battle round onwards",
					when: "End of your Command phase, or the end of your turn in the fifth battle round.",
					scores: [{
						pays: "For each objective you control.",
						points: "3VP"
					}, {
						pays: "For each of those objectives, excluding your home objective, if you control your home objective.",
						points: "+2VP",
						cumulative: true
					}]
				}]
			},
			{
				id: "immovable-object",
				name: "Immovable Object",
				flavor: "Obstinance is often the key to victory. Weather everything the enemy throws at you. If your opponent is to take any ground, they will have to wade through their own dead to do so.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more central objectives.",
							points: "3VP"
						}]
					},
					{
						round: "Second to fourth battle round",
						when: "End of your Command phase.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "5VP"
						}]
					},
					{
						round: "Fifth battle round",
						when: "End of your turn.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "5VP"
						}]
					}
				]
			},
			{
				id: "determined-acquisition",
				name: "Determined Acquisition",
				flavor: "The resistance arrayed against you is formidable indeed, yet your orders are clear; take and hold the ground ahead, heedless of the cost.",
				windows: [{
					round: "Any battle round",
					when: "End of your turn.",
					scores: [{
						pays: "For each objective you control that you did not control at the start of the turn, excluding your home objective.",
						points: "2VP"
					}]
				}, {
					round: "Second battle round onwards",
					when: "End of your Command phase, or the end of your turn in the fifth battle round.",
					scores: [{
						pays: "For each objective you control.",
						points: "3VP"
					}, {
						pays: "For each of those objectives that is within your opponent’s territory.",
						points: "+3VP",
						cumulative: true
					}]
				}]
			},
			{
				id: "purge-and-secure",
				name: "Purge and Secure",
				flavor: "Enemy pickets and reconnaissance have engaged your vanguard. Move forward, seize defensive positions and repel the assault at all costs.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units were destroyed this turn by a friendly unit that was within range of one or more objectives.",
							points: "3VP"
						}, {
							pays: "One or more enemy units that started the turn within range of one or more objectives were destroyed this turn.",
							points: "3VP",
							alt: true
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more objectives you did not control at the start of the turn, excluding your home objective.",
							points: "3VP"
						}]
					}
				]
			},
			{
				id: "inescapable-dominion",
				name: "Inescapable Dominion",
				flavor: "Your first priority must be to dominate the battlefield. Seize strongpoints and dig in. Only then may you turn your full attention to slaughtering the foe.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "You control three or more objectives.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control two or more objectives.",
							points: "5VP"
						}, {
							pays: "You control more objectives than your opponent.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "You control your opponent’s home objective.",
							points: "5VP"
						}]
					}
				]
			}
		]
	},
	{
		name: "Purge the Foe",
		summary: "Pays for destruction, then a smaller holding line.",
		cards: [
			{
				id: "unstoppable-force",
				name: "Unstoppable Force",
				flavor: "The enemy are arrayed before you in number, and well prepared for the coming assault. Smash through their defences. Grind them to dust.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units were destroyed this turn.",
							points: "3VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more objectives you did not control at the start of the turn, excluding your home objective.",
							points: "3VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "You control one or more central objectives.",
							points: "5VP"
						}]
					}
				]
			},
			{
				id: "meatgrinder",
				name: "Meatgrinder",
				flavor: "Vicious and without relent, this battle has descended into base savagery. Only one path to victory remains: kill more of the enemy than they can kill of you.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units were destroyed this turn.",
							points: "3VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "More enemy units were destroyed this turn than friendly units were destroyed in the previous turn.",
							points: "5VP"
						}, {
							pays: "You control your opponent’s home objective.",
							points: "5VP"
						}]
					}
				]
			},
			{
				id: "punishment",
				name: "Punishment",
				flavor: "Those who resist must be punished. Make a bloody example of them, and leave none in doubt as to your mastery.",
				windows: [
					{
						round: "Any battle round",
						when: "End of a turn.",
						scores: [{
							pays: "One or more condemned enemy units left the battlefield this turn.",
							points: "5VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}, {
							pays: "You control more objectives than your opponent.",
							points: "5VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "You control your opponent’s home objective.",
							points: "8VP"
						}]
					}
				],
				rule: "Start of your turn: select one to three enemy units that are on the battlefield and within range of objectives and/or that destroyed one or more friendly units in the previous turn. If you cannot, select one enemy unit that is on the battlefield. Until the start of your next turn, those units are condemned."
			},
			{
				id: "consecrate",
				name: "Consecrate",
				flavor: "Whether in the name of grand ideals or simply to satisfy the thirst of their terrible gods, your warriors must consecrate this battlefield with the blood of their foes.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or two objectives are consecrated.",
							points: "3VP"
						}, {
							pays: "Three or more objectives are consecrated.",
							points: "6VP",
							alt: true
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}, {
							pays: "You control more objectives than your opponent.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "Your opponent’s home objective is consecrated.",
							points: "5VP"
						}]
					}
				],
				rule: "Each time a friendly unit destroys a unit, that friendly unit becomes a consecration unit. At the end of your turn, for each of your consecration units, you can select one objective it is within range of, excluding your home objective, that has not been consecrated. If you do, place one of your operation markers within range of that objective. That objective is consecrated and that unit is no longer a consecration unit."
			},
			{
				id: "destroyers-wrath",
				name: "Destroyer's Wrath",
				flavor: "Victory here shall not be measured in ground taken or plunder seized, but in the mangled corpses of your foes and the grisly trophies hewn from their bodies.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units were destroyed this turn.",
							points: "3VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}, {
							pays: "You control more objectives than your opponent.",
							points: "6VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "More enemy units were destroyed this turn than friendly units were destroyed in the previous turn.",
							points: "4VP"
						}]
					}
				]
			}
		]
	},
	{
		name: "Disruption",
		summary: "Pays for spoiling the plan. Traps, decoys, and markers are the extra line.",
		cards: [
			{
				id: "death-trap",
				name: "Death Trap",
				flavor: "Even the most potent enemy force can be undone with sufficient preparation. Lay minefields, dig trenches and draw the enemy into pre-prepared killing zones.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "For each terrain area trapped this turn.",
							points: "2VP"
						}, {
							pays: "For each of those terrain areas that is an objective.",
							points: "+3VP",
							cumulative: true
						}]
					},
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units that started the turn within a terrain area were destroyed, if that terrain area is trapped.",
							points: "3VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					}
				],
				action: {
					name: "Booby Trap",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within range of one objective, excluding your home objective, or within one terrain area that is not within your deployment zone, that you have not yet trapped.",
					limit: "Unlimited. Each unit that starts this action this phase must be within a different terrain area.",
					completes: "Immediately.",
					effect: "That terrain area is trapped: place one of your operation markers within that terrain area."
				}
			},
			{
				id: "delaying-action",
				name: "Delaying Action",
				flavor: "Your enemies are on the march. Commit your warriors to battle and make the foe pay a bloody price for every foot of ground.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "For each enemy unit destroyed this turn.",
							points: "2VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more central objectives and one or more expansion objectives.",
							points: "3VP"
						}]
					}
				]
			},
			{
				id: "outmanoeuvre",
				name: "Outmanoeuvre",
				flavor: "Speed and positioning are key in any battle. Outflank the enemy, seize high ground and routes of resupply. Choke them to death.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "You control your opponent’s home objective.",
							points: "10VP"
						}]
					},
					{
						round: "First battle round",
						when: "End of your turn.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second and third battle round",
						when: "End of your Command phase.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "5VP"
						}]
					},
					{
						round: "Fourth battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "6VP"
						}]
					}
				]
			},
			{
				id: "smoke-and-mirrors",
				name: "Smoke and Mirrors",
				flavor: "Cunning is as potent a weapon as overwhelming force. Outnumbered or outgunned, you must make use of subterfuge and misdirection to pick the enemy apart.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "For each objective that is decoyed.",
							points: "2VP"
						}, {
							pays: "For each of those objectives that is within your opponent’s territory.",
							points: "+2VP",
							cumulative: true
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "Four or more objectives are decoyed.",
							points: "10VP"
						}]
					}
				],
				action: {
					name: "Decoy",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within range of one objective, excluding your home objective, that is not decoyed.",
					limit: "Unlimited. Each unit that starts this action this phase must be within range of a different objective.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "That objective is decoyed: place one of your operation markers within range of that objective."
				}
			},
			{
				id: "locate-and-deny",
				name: "Locate and Deny",
				flavor: "The enemy is searching for an asset of value. By cunning or by force of arms, prevent its retrieval.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units that started the turn within range of one or more objectives are destroyed.",
							points: "4VP"
						}, {
							pays: "Only one of your operation markers is on the battlefield, if one or more of your units are within the same terrain area as that marker, and no enemy units are within that terrain area.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "Only one of your operation markers is on the battlefield, if one or more of your units are within the same terrain area as that marker, and no enemy units are within that terrain area.",
							points: "5VP"
						}]
					}
				],
				rule: "Start of the battle: select five terrain areas not within your deployment zone. For each one, place one of your operation markers within it. If you cannot, do so for each terrain area that is not within your deployment zone.",
				action: {
					name: "Sensor Sweep",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within range of one central objective.",
					limit: "Once per turn.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "Your unit performs a sensor sweep: remove one operation marker from the battlefield.",
					restrictions: "A unit cannot start this action if there is only one operation marker on the battlefield."
				}
			}
		]
	},
	{
		name: "Reconnaissance",
		summary: "Pays for spread, information, and actions.",
		cards: [
			{
				id: "reconnaissance-sweep",
				name: "Reconnaissance Sweep",
				flavor: "Enemy movements have aroused suspicion. Disperse your forces, probe their lines and decipher their intentions.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "Three or more friendly units are wholly within three different table quarters and not within 6\" of the centre of the battlefield.",
							points: "3VP"
						}, {
							pays: "Four or more friendly units are wholly within four different table quarters and not within 6\" of the centre of the battlefield.",
							points: "6VP",
							alt: true
						}]
					},
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "For each enemy unit destroyed this turn.",
							points: "1VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "3VP"
						}]
					}
				]
			},
			{
				id: "triangulation",
				name: "Triangulation",
				flavor: "By acquiring and transmitting precise coordinates, your forces will be able to summon reinforcements, saturate the battlefield with artillery fire or call in other means of support.",
				windows: [
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [
							{
								pays: "One objective is triangulated.",
								points: "3VP"
							},
							{
								pays: "Two objectives are triangulated.",
								points: "6VP",
								alt: true
							},
							{
								pays: "Three or more objectives are triangulated.",
								points: "10VP",
								alt: true
							}
						]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "You control four or more objectives.",
							points: "10VP"
						}]
					}
				],
				action: {
					name: "Triangulate",
					kind: "Objective action",
					starts: "Your Shooting phase, from the second battle round onwards.",
					units: "One friendly unit within range of one objective, excluding your home objective.",
					limit: "Once per turn.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "That objective is triangulated: place one of your operation markers within range of that objective."
				}
			},
			{
				id: "surveil-the-foe",
				name: "Surveil the Foe",
				flavor: "Information is power. Evaluate the strengths and weaknesses of the enemy and feed this crucial information back to your superiors.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "One or more enemy units were surveilled this turn, unless each of those units is within range of one or more objectives that have one or more operation markers within range of them.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}, {
							pays: "You control more objectives than your opponent.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "None of your opponent’s operation markers are on the battlefield.",
							points: "5VP"
						}]
					}
				],
				rule: "Each time a friendly unit ends a move within range of one objective that has any of your opponent’s operation markers within range of it, remove those operation markers from the battlefield.",
				action: {
					name: "Surveil the Foe",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit.",
					limit: "Unlimited.",
					completes: "Immediately.",
					effect: "Select one enemy unit within 18\" of and visible to your unit that has not been surveilled this turn. Until the end of the turn, that enemy unit is surveilled."
				}
			},
			{
				id: "gather-intel",
				name: "Gather Intel",
				flavor: "The nature and motivation of the foe remains unclear. Test their mettle and seize pertinent intelligence from the field of battle.",
				windows: [
					{
						round: "First battle round",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more central objectives.",
							points: "6VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your turn.",
						scores: [{
							pays: "For each friendly unit that completed the Extract Intelligence action this turn.",
							points: "7VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "Three or more of your operation markers are on the battlefield.",
							points: "5VP"
						}, {
							pays: "One of your operation markers is within range of your opponent’s home objective.",
							points: "5VP"
						}]
					}
				],
				action: {
					name: "Extract Intelligence",
					kind: "Objective action",
					starts: "Your Shooting phase, from the second battle round onwards.",
					units: "One unit within range of one objective, excluding your home objective, that does not have any of your operation markers within range of it.",
					limit: "Unlimited. Each unit that starts this action this phase must be within range of a different objective.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "Place one of your operation markers within range of that objective."
				}
			},
			{
				id: "search-and-scour",
				name: "Search and Scour",
				flavor: "Forward elements report enemy movement in this sector. Move out, locate the foes and halt their operation before it gathers momentum.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more central objectives.",
							points: "3VP"
						}, {
							pays: "One or more enemy units that started the turn within a terrain area are destroyed.",
							points: "2VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "For each objective you control, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "No enemy units are wholly within your territory.",
							points: "5VP"
						}]
					}
				]
			}
		]
	},
	{
		name: "Priority Assets",
		summary: "Pays for the asset action, then holding.",
		cards: [
			{
				id: "secure-asset",
				name: "Secure Asset",
				flavor: "A vital asset has been lost amidst the chaos of battle. You must secure the item at all costs.",
				windows: [{
					round: "Any battle round",
					when: "End of your turn.",
					scores: [{
						pays: "A friendly unit secured the asset this turn.",
						points: "4VP"
					}, {
						pays: "One or more enemy units that started the turn within range of one or more central objectives are destroyed.",
						points: "2VP"
					}]
				}, {
					round: "Second battle round onwards",
					when: "End of your Command phase, or the end of your turn in the fifth battle round.",
					scores: [{
						pays: "You control one or more objectives, excluding your home objective.",
						points: "4VP"
					}, {
						pays: "You control three or more objectives.",
						points: "4VP"
					}]
				}],
				action: {
					name: "Secure Asset",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within range of one objective, excluding your home objective.",
					limit: "Once per turn.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "Your unit secures the asset."
				}
			},
			{
				id: "vital-link",
				name: "Vital Link",
				flavor: "A key communications node is located in the midst of this battlefield. Control of this node is crucial to the continued success of your armies. Ensure it does not fall into enemy hands.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "You control one or more central objectives.",
							points: "2VP"
						}, {
							pays: "For each of your operation markers within range of one of those objectives.",
							points: "+1VP",
							cumulative: true
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}, {
							pays: "One or more of those objectives is a central objective.",
							points: "+4VP",
							cumulative: true
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "You control your opponent’s home objective.",
							points: "10VP"
						}]
					}
				],
				action: {
					name: "Maintain Control",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within range of one central objective.",
					limit: "Once per turn.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "Place one of your operation markers within range of that objective."
				}
			},
			{
				id: "extract-relic",
				name: "Extract Relic",
				flavor: "A priceless relic saturated with eldritch power lies somewhere on the field of battle. Secure the sensor array at the heart of the battlefield and direct its energies to locating the prize.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [
							{
								pays: "A friendly unit performed a sensor sweep this turn.",
								points: "4VP"
							},
							{
								pays: "One or more enemy units that started the turn within range of one or more objectives are destroyed.",
								points: "3VP"
							},
							{
								pays: "Only one of your opponent’s operation markers is on the battlefield, if one or more of your units are within the same terrain area as that operation marker, and no enemy units are within that terrain area.",
								points: "4VP"
							}
						]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "Only one of your opponent’s operation markers is on the battlefield, if one or more of your units are within the same terrain area as that operation marker, and no enemy units are within that terrain area.",
							points: "5VP"
						}]
					}
				],
				action: {
					name: "Sensor Sweep",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within range of one central objective.",
					limit: "Once per turn.",
					completes: "End of your turn, if your unit controls that objective.",
					effect: "Your unit performs a sensor sweep: remove one operation marker from the battlefield.",
					restrictions: "A unit cannot start this action if there is only one operation marker on the battlefield."
				}
			},
			{
				id: "vanguard-operation",
				name: "Vanguard Operation",
				flavor: "Striking deep beyond the front lines, your forces must employ speed and cunning to secure their objectives before the enemy responds.",
				windows: [
					{
						round: "Any battle round",
						when: "End of your turn.",
						scores: [{
							pays: "A friendly unit performed a vanguard operation this turn.",
							points: "4VP"
						}, {
							pays: "One or more enemy units were destroyed this turn.",
							points: "2VP"
						}]
					},
					{
						round: "Second battle round onwards",
						when: "End of your Command phase, or the end of your turn in the fifth battle round.",
						scores: [{
							pays: "You control one or more objectives, excluding your home objective.",
							points: "4VP"
						}]
					},
					{
						round: "End of the battle",
						when: null,
						scores: [{
							pays: "You control your opponent’s home objective.",
							points: "10VP"
						}]
					}
				],
				action: {
					name: "Vanguard Operation",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One friendly unit within one terrain area that is within your opponent’s territory.",
					limit: "Once per turn.",
					completes: "End of your turn, if no enemy units are within that terrain area.",
					effect: "Your unit performs a vanguard operation."
				}
			},
			{
				id: "sabotage",
				name: "Sabotage",
				flavor: "Strike deep behind enemy lines, sabotage supply routes, fortifications and heavy weapons. By doing so you may lay the groundwork for future offensives.",
				windows: [{
					round: "Any battle round",
					when: "End of your turn.",
					scores: [{
						pays: "For each friendly unit that committed sabotage this turn.",
						points: "3VP"
					}, {
						pays: "For each of those units that is within range of one or more objectives in your opponent’s territory.",
						points: "+2VP",
						cumulative: true
					}]
				}, {
					round: "Second battle round onwards",
					when: "End of your Command phase, or the end of your turn in the fifth battle round.",
					scores: [{
						pays: "You control one or more objectives, excluding your home objective.",
						points: "4VP"
					}]
				}],
				action: {
					name: "Sabotage",
					kind: "Objective action",
					starts: "Your Shooting phase.",
					units: "One unit within range of one objective, excluding your home objective.",
					limit: "Unlimited. Each unit that starts this action this phase must be within range of a different objective.",
					completes: "End of your turn, if that unit controls that objective.",
					effect: "Your unit commits sabotage."
				}
			}
		]
	}
];
var MATCHUPS = {
	"Take and Hold|Purge the Foe": "Take and Hold against Purge the Foe is ground against kills. Dominance, Immovable Object, and Determined Acquisition do not pay for their destroyed units. Purge and Secure does. Their Unstoppable Force, Meatgrinder, and Destroyer’s Wrath pay 3 every turn a unit dies, then add a holding line from round 2.",
	"Purge the Foe|Take and Hold": "Purge the Foe against Take and Hold is kills against ground. Unstoppable Force, Meatgrinder, and Destroyer’s Wrath pay 3 every turn a unit dies, then add a holding line from round 2. Their Dominance, Immovable Object, and Determined Acquisition do not pay for your destroyed units. Purge and Secure does.",
	"Take and Hold|Disruption": "Take and Hold against Disruption is ground against sabotage. Your holding lines do not stop their Booby Trap, Decoy, or Sensor Sweep. Outmanoeuvre is the one that races you on raw objectives, and their home is 10 any round.",
	"Disruption|Take and Hold": "Disruption against Take and Hold is sabotage against ground. Their holding lines do not stop your Booby Trap, Decoy, or Sensor Sweep. Outmanoeuvre is the one that races them on raw objectives, and their home is 10 any round.",
	"Take and Hold|Reconnaissance": "Take and Hold against Reconnaissance is objectives against spread and actions. Quarters, triangulation, and intel markers can pay them without matching your objective count. Gather Intel and Triangulation are the cards that can pass a pure holding card.",
	"Reconnaissance|Take and Hold": "Reconnaissance against Take and Hold is spread and actions against objectives. Quarters, triangulation, and intel markers can pay you without matching their objective count. Gather Intel and Triangulation are the cards that can pass a pure holding card.",
	"Take and Hold|Priority Assets": "Take and Hold against Priority Assets is both on objectives, but they add an action. Secure Asset, Vital Link, Extract Relic, Vanguard Operation, and Sabotage sit on top of a holding line. Vital Link and Vanguard Operation pay 10 for your home at the end.",
	"Priority Assets|Take and Hold": "Priority Assets against Take and Hold is both on objectives, but you add an action. Secure Asset, Vital Link, Extract Relic, Vanguard Operation, and Sabotage sit on top of a holding line. Vital Link and Vanguard Operation pay 10 for their home at the end.",
	"Purge the Foe|Disruption": "Purge the Foe against Disruption shares kills. Death Trap pays them if the unit dies in trapped terrain. Delaying Action pays 2 per unit. Locate and Deny pays 4 if it started on an objective. Smoke and Mirrors and Outmanoeuvre ignore your kill count.",
	"Disruption|Purge the Foe": "Disruption against Purge the Foe shares kills. Death Trap pays you if the unit dies in trapped terrain. Delaying Action pays 2 per unit. Locate and Deny pays 4 if it started on an objective. Smoke and Mirrors and Outmanoeuvre ignore their kill count.",
	"Purge the Foe|Reconnaissance": "Purge the Foe against Reconnaissance is bodies against actions. Reconnaissance Sweep also pays them 1 per kill. Triangulation and Gather Intel ignore the kill count if the action finishes.",
	"Reconnaissance|Purge the Foe": "Reconnaissance against Purge the Foe is actions against bodies. Reconnaissance Sweep also pays you 1 per kill. Triangulation and Gather Intel ignore the kill count if the action finishes.",
	"Purge the Foe|Priority Assets": "Purge the Foe against Priority Assets can pay both players. Secure Asset, Extract Relic, and Vanguard Operation all have a smaller kill line on top of the action.",
	"Priority Assets|Purge the Foe": "Priority Assets against Purge the Foe can pay both players. Secure Asset, Extract Relic, and Vanguard Operation all have a smaller kill line on top of the action.",
	"Disruption|Reconnaissance": "Disruption against Reconnaissance is action against action. Traps and decoys sit on the objectives they need to triangulate or extract from. Surveil the Foe removes their markers when you end a move on that objective. Locate and Deny and Extract Relic are the same last-marker fight from opposite sides.",
	"Reconnaissance|Disruption": "Reconnaissance against Disruption is action against action. Their traps and decoys sit on the objectives you need to triangulate or extract from. Surveil the Foe removes their markers when they end a move on that objective. Locate and Deny and Extract Relic are the same last-marker fight from opposite sides.",
	"Disruption|Priority Assets": "Disruption against Priority Assets is the same objective fight. Booby Trap and Decoy compete with Secure Asset, Maintain Control, and Sabotage. Vanguard Operation is the one that happens in a terrain area in your territory instead of on an objective.",
	"Priority Assets|Disruption": "Priority Assets against Disruption is the same objective fight. Secure Asset, Maintain Control, and Sabotage compete with their Booby Trap and Decoy. Vanguard Operation is the one that happens in a terrain area in their territory instead of on an objective.",
	"Reconnaissance|Priority Assets": "Reconnaissance against Priority Assets is intel against the asset. Extract Intelligence and Triangulate want a controlled objective and your marker. Secure Asset, Sabotage, and Sensor Sweep want those same objectives. Search and Scour is the kill-in-terrain card against their vanguard units.",
	"Priority Assets|Reconnaissance": "Priority Assets against Reconnaissance is the asset against intel. Their Extract Intelligence and Triangulate want a controlled objective and their marker. Secure Asset, Sabotage, and Sensor Sweep want those same objectives. Their Search and Scour is the kill-in-terrain card against your vanguard units."
};
function missionByName(name) {
	return MISSIONS.find((mission) => mission.name === name);
}
/** Your mission index, then their mission index, for each opponent disposition. */
var MISSION_PAIRS = {
	"Take and Hold": {
		"Take and Hold": [0, 0],
		"Purge the Foe": [1, 0],
		Disruption: [2, 0],
		Reconnaissance: [3, 0],
		"Priority Assets": [4, 0]
	},
	"Purge the Foe": {
		"Take and Hold": [0, 1],
		"Purge the Foe": [1, 1],
		Disruption: [2, 1],
		Reconnaissance: [3, 1],
		"Priority Assets": [4, 1]
	},
	Disruption: {
		"Take and Hold": [0, 2],
		"Purge the Foe": [1, 2],
		Disruption: [2, 2],
		Reconnaissance: [3, 2],
		"Priority Assets": [4, 2]
	},
	Reconnaissance: {
		"Take and Hold": [0, 3],
		"Purge the Foe": [1, 3],
		Disruption: [2, 3],
		Reconnaissance: [3, 3],
		"Priority Assets": [4, 3]
	},
	"Priority Assets": {
		"Take and Hold": [0, 0],
		"Purge the Foe": [1, 1],
		Disruption: [2, 2],
		Reconnaissance: [3, 3],
		"Priority Assets": [4, 4]
	}
};
function matchedPair(yours, theirs) {
	const indexes = MISSION_PAIRS[yours]?.[theirs];
	const yourDeck = missionByName(yours);
	const theirDeck = missionByName(theirs);
	if (!indexes || !yourDeck || !theirDeck) return void 0;
	const yourCard = yourDeck.cards[indexes[0]];
	const theirCard = theirDeck.cards[indexes[1]];
	if (!yourCard || !theirCard) return void 0;
	return {
		yours: yourCard,
		theirs: theirCard
	};
}
function matchupText(yours, theirs) {
	if (yours === theirs) return "Same disposition. You both score the matched card.";
	return MATCHUPS[`${yours}|${theirs}`] ?? "";
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
		id: "mission",
		label: "Mission"
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
	const playListRef = useListMotion();
	const stratagemRef = useListMotion();
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
							}),
							shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No enhancements selected."
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								ref: playListRef,
								className: "flex flex-col gap-2",
								children: shown.map((entry) => {
									const enhancement = entry.enhancement ? ENHANCEMENTS.find((item) => item.name === entry.enhancement) : void 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: `motion-card rounded-lg border border-line bg-surface px-3 py-3 ${attachedBodies.has(entry.id) ? "ml-4 border-l-gold" : ""}`,
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
							})
						]
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
											sheet.unique ? ` · Shield Host${sheet.flavor ? ` — ${sheet.flavor}` : ""}` : ""
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
									sheet.katah ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-xs tracking-wide text-gold uppercase",
											children: ["Favoured Ka’tah · ", sheet.katah.name]
										}),
										katahByName(sheet.katah.name) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm",
											children: katahByName(sheet.katah.name).rule
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-sm",
											children: ["Additional effect: ", sheet.katah.effect]
										})
									] }) : null,
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
					tab === "mission" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionTab, { main }) : null,
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
								ref: stratagemRef,
								className: "flex flex-col gap-3",
								children: stratagems.map((stratagem) => {
									const matches = units.filter((unit) => canTarget(stratagem, unit));
									const phaseLabels = stratagem.phases.map((id) => PHASES.find((item) => item.id === id)?.label ?? id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "motion-card rounded-lg border border-line bg-surface px-3 py-3",
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
				models: openEntry.models,
				gear: openEntry.gear,
				enhancementId: openEntry.enhancementId,
				enhancementWeapon: openEntry.enhancementWeapon,
				listOnly: true,
				onClose: () => setSheetEntry(null)
			}) : null
		]
	});
}
function MissionTab({ main }) {
	const [theirName, setTheirName] = (0, import_react.useState)(null);
	const yourName = main ?? "";
	const opponent = theirName ?? MISSIONS.find((mission) => mission.name !== yourName)?.name ?? yourName;
	const yours = missionByName(yourName);
	const theirs = missionByName(opponent);
	const pair = matchedPair(yourName, opponent);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Each player scores only their own card."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Your disposition"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block",
						children: yourName || "Choose a main disposition on the list."
					})]
				}), yours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: yours.summary
				}) : null]
			}),
			yours && theirs && pair ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				cue: `${yours.name}-${theirs.name}`,
				className: "flex min-w-0 flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DispositionPick, {
						label: "Their disposition",
						value: opponent,
						options: MISSIONS.map((mission) => mission.name),
						onChange: setTheirName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: theirs.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: "Disposition"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: matchupText(yours.name, theirs.name)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "flex min-w-0 flex-col gap-4 border-t border-line pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-sm text-gold",
							children: [
								pair.yours.name,
								" vs ",
								pair.theirs.name
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-w-0 gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionCardView, {
								side: "You",
								disposition: yours.name,
								card: pair.yours
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionCardView, {
								side: "Them",
								disposition: theirs.name,
								card: pair.theirs
							})]
						})]
					})
				]
			}) : null
		]
	});
}
function DispositionPick({ label, value, options, onChange }) {
	if (options.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs tracking-wide text-gold uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mt-1 block",
			children: value
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex w-fit max-w-full flex-col items-start text-xs text-muted",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			"aria-label": label,
			value,
			onChange: (event) => onChange(event.target.value),
			className: "weapon-select mt-1 h-8 max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
			children: options.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
				value: name,
				children: name
			}, name))
		})]
	});
}
function MissionActionView({ action }) {
	const rows = [
		["Starts", action.starts],
		["Units", action.units],
		["Use limit", action.limit],
		["Completes", action.completes],
		["Effect", action.effect],
		action.restrictions ? ["Restrictions", action.restrictions] : null
	].filter((row) => row != null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm font-medium",
			children: [
				action.name,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-gold",
					children: action.kind
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1 flex flex-col gap-1",
			children: rows.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "min-w-0 text-sm break-words",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-gold",
					children: [label, ". "]
				}), value]
			}, label))
		})]
	});
}
function MissionCardView({ side, disposition, card }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "motion-card min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs tracking-wide text-gold uppercase",
				children: [
					side,
					" · ",
					disposition
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-xl",
				children: card.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: card.flavor
			}),
			card.rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: card.rule
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-3",
				children: card.windows.map((window, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-gold uppercase",
							children: window.round
						}),
						window.when ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: window.when
						}) : null,
						window.scores.map((score) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm break-words",
							children: [
								score.alt ? "Or " : "",
								score.pays,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold",
									children: score.points
								}),
								score.cumulative ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gold",
									children: " cumulative"
								}) : null
							]
						}, `${score.pays}-${score.points}`))
					]
				}, `${window.round}-${window.when}-${index}`))
			}),
			card.action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionActionView, { action: card.action }) : null
		]
	});
}
var CUSTODES_FILTERS = [
	"Characters",
	"Battleline",
	"Infantry",
	"Elites",
	"Fast Attack",
	"Heavy Support",
	"Transports"
];
var ALLIED_FILTERS = [
	"Imperial Agents",
	"Imperial Retinue",
	"Requisitioned",
	"Knights",
	"Armigers",
	"Titans"
];
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
			cost: squadCost(unit, entry.models, copyIndex) + bonus + gearPoints(entry.unitId, entry.gear, entry.models)
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
	if (!withinCategoryCap(unit, entries, detachments)) return null;
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
	if (warlord && canBeWarlord(warlord.unitId)) {
		if (isCharacter(warlord.unitId)) pushCharacter(warlord);
		else {
			result.push(warlord);
			used.add(warlord.id);
		}
	}
	for (const entry of entries) if (isCharacter(entry.unitId)) pushCharacter(entry);
	for (const entry of entries) if (!used.has(entry.id)) result.push(entry);
	return result;
}
function settle(roster) {
	const ordered = [...roster.entries].sort((left, right) => (left.addedAt ?? 0) - (right.addedAt ?? 0) || left.id.localeCompare(right.id));
	const counts = /* @__PURE__ */ new Map();
	const categoryCounts = /* @__PURE__ */ new Map();
	const keepIds = /* @__PURE__ */ new Set();
	const retinue = [];
	for (const entry of ordered) {
		const unit = unitById(entry.unitId);
		if (!unit) continue;
		const count = counts.get(entry.unitId) ?? 0;
		if (count >= copyLimit(unit, roster.detachments)) continue;
		const category = unitCategory(unit, roster.detachments);
		if (category === "Imperial Retinue") {
			counts.set(entry.unitId, count + 1);
			retinue.push(entry);
			continue;
		}
		const cap = categoryLimit(category);
		const inCategory = categoryCounts.get(category) ?? 0;
		if (cap != null && inCategory >= cap) continue;
		counts.set(entry.unitId, count + 1);
		categoryCounts.set(category, inCategory + 1);
		keepIds.add(entry.id);
	}
	const sponsors = ordered.filter((entry) => keepIds.has(entry.id));
	let freeAgents = sponsors.filter((entry) => [
		"coteaz",
		"draxus",
		"greyfax",
		"inquisitor"
	].includes(entry.unitId)).length;
	let freeVoidsmen = sponsors.filter((entry) => entry.unitId === "navigator" || entry.unitId === "rogue-trader").length;
	let retinueRoom = categoryLimit("Imperial Retinue") ?? 2;
	for (const entry of retinue) {
		if (entry.unitId === "inquisitorial-agents" && freeAgents > 0) {
			freeAgents -= 1;
			keepIds.add(entry.id);
			continue;
		}
		if (entry.unitId === "voidsmen" && freeVoidsmen > 0) {
			freeVoidsmen -= 1;
			keepIds.add(entry.id);
			continue;
		}
		if (retinueRoom <= 0) continue;
		retinueRoom -= 1;
		keepIds.add(entry.id);
	}
	const kept = roster.entries.filter((entry) => keepIds.has(entry.id));
	const ids = new Set(kept.map((entry) => entry.id));
	const entries = kept.map((entry) => entry.attachedTo && !ids.has(entry.attachedTo) ? {
		...entry,
		attachedTo: void 0
	} : entry);
	const eligible = entries.filter((entry) => canBeWarlord(entry.unitId));
	const warlordId = eligible.some((entry) => entry.id === roster.warlordId) ? roster.warlordId : eligible.length === 1 ? eligible[0].id : void 0;
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
		if (typeof entry.enhancementWeapon === "string") next.enhancementWeapon = entry.enhancementWeapon;
		const gear = cleanGear(next.unitId, next.gear ?? entry.gear, next.models);
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
			delete entry.enhancementWeapon;
			continue;
		}
		if (enhancement.weaponMod) {
			const choices = weaponChoices(entry.unitId, entry.models, entry.gear, enhancement.weaponMod.scope);
			entry.enhancementWeapon = choices.some((choice) => choice.id === entry.enhancementWeapon) ? entry.enhancementWeapon : choices[0]?.id;
		} else delete entry.enhancementWeapon;
		seenEnhancements.add(enhancement.id);
	}
	const stored = parsed;
	const legacyMain = stored.mainDispositions ? Object.values(stored.mainDispositions).find((value) => typeof value === "string") : void 0;
	const warlordId = typeof parsed.warlordId === "string" ? parsed.warlordId : void 0;
	return settle({
		name: typeof parsed.name === "string" ? parsed.name : EMPTY.name,
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
						className: `motion-card rounded-lg border px-4 py-3 ${on ? "border-gold bg-surface" : "border-line bg-bg"} ${blocked ? "opacity-40" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: blocked,
							onClick: () => onToggle(detachment.id),
							className: "flex min-h-11 w-full min-w-0 flex-col items-start text-left disabled:cursor-not-allowed",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base font-medium",
									children: detachment.name
								}),
								detachment.unique ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mt-1 min-w-0 text-xs break-words text-muted",
									children: ["Shield Host", detachment.flavor ? ` — ${detachment.flavor}` : ""]
								}) : null,
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
function DetachmentLibrary({ onHome }) {
	const groups = [{
		title: "Shield Hosts",
		items: orderedDetachments(true)
	}, {
		title: "Other detachments",
		items: orderedDetachments(false)
	}];
	const [id, setId] = (0, import_react.useState)(groups[0]?.items[0]?.id ?? "");
	const detachment = detachmentById(id) ?? groups[0]?.items[0];
	const katah = detachment?.katah ? katahByName(detachment.katah.name) : void 0;
	const enhancements = detachment ? enhancementsFor(detachment.id) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-4 py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-col gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeButton, { onClick: onHome }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-wide text-gold uppercase",
						children: "Adeptus Custodes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl leading-tight",
						children: "Detachments"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm text-muted",
						children: "Pick one detachment. The rest stay in the menu."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex w-full max-w-sm flex-col items-start text-xs text-muted",
					children: ["Detachment", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						"aria-label": "Detachment",
						value: detachment?.id ?? "",
						onChange: (event) => setId(event.target.value),
						className: "weapon-select mt-1 h-8 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
						children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("optgroup", {
							label: group.title,
							children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.name
							}, item.id))
						}, group.title))
					})]
				})
			]
		}), detachment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "section-open flex min-w-0 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: detachment.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							detachment.dp,
							" DP",
							detachment.unique ? ` · Shield Host${detachment.flavor ? ` — ${detachment.flavor}` : ""}` : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: ["Force disposition: ", detachment.dispositions.join(", ")]
					})
				] }),
				detachment.rule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs tracking-wide text-gold uppercase",
					children: detachment.rule.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: detachment.rule.text
				})] }) : null,
				detachment.katah ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-xs tracking-wide text-gold uppercase",
						children: ["Favoured Ka’tah · ", detachment.katah.name]
					}),
					katah ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: katah.rule
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm",
						children: ["Additional effect: ", detachment.katah.effect]
					})
				] }) : null,
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
		}, detachment.id) : null]
	});
}
function EnhancementPick({ unitId, unitName, models, gear, value, weapon, choices, onChange, onWeapon }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const selected = choices.find((enhancement) => enhancement.id === value);
	const weapons = selected?.weaponMod ? weaponChoices(unitId, models, gear, selected.weaponMod.scope) : [];
	const picked = chosenWeapon(weapons, weapon);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex w-full min-w-0 flex-col items-start",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-muted",
				children: "Enhancement"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-expanded": open,
				"aria-label": `Enhancement for ${unitName}`,
				onClick: () => setOpen((current) => !current),
				className: "mt-1 inline-flex h-8 max-w-full min-w-0 items-center gap-1.5 rounded-lg border border-line bg-bg px-2 text-xs text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionSwap, {
					cue: selected?.id ?? "none",
					className: "min-w-0 truncate",
					children: selected ? `${selected.name} +${selected.points} pts` : "None"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: `motion-rotate size-3.5 shrink-0 text-gold ${open ? "rotate-180" : ""}`,
					"aria-hidden": "true"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
				open: Boolean(selected) && !open,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-full text-xs break-words text-muted",
					children: selected?.rule
				})
			}),
			selected?.weaponMod ? weapons.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-2 flex w-fit max-w-full flex-col items-start text-xs text-muted",
				children: [selected.weaponMod.scope === "ranged" ? "Ranged weapon" : "Melee weapon", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					"aria-label": `Weapon modified by ${selected.name}`,
					value: picked?.id ?? "",
					onChange: (event) => onWeapon(event.target.value),
					className: "wargear-select mt-1 h-8 w-fit max-w-full rounded-lg border border-line bg-bg px-2 text-xs text-fg",
					children: weapons.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: choice.id,
						children: choice.label
					}, choice.id))
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: weapons.length === 1 ? `Modifies ${weapons[0].label}` : `No equipped ${selected.weaponMod.scope} weapon.`
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse, {
				open,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex w-full min-w-0 flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							onChange("");
							setOpen(false);
						},
						className: `border-b border-line py-2 text-left text-xs ${value ? "text-muted" : "text-gold"}`,
						children: "None"
					}), choices.map((enhancement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							onChange(enhancement.id);
							setOpen(false);
						},
						className: "border-b border-line py-2 text-left last:border-b-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `min-w-0 text-xs break-words ${enhancement.id === value ? "text-gold" : ""}`,
								children: [enhancement.name, enhancement.once ? " · one per army" : enhancement.upgrade ? " · upgrade" : ""]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "shrink-0 text-xs text-gold",
								children: [
									"+",
									enhancement.points,
									" pts"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-xs break-words text-muted",
							children: enhancement.rule
						})]
					}, enhancement.id))]
				})
			})
		]
	});
}
function ListBuilder() {
	const savedListRef = useListMotion();
	const rosterRef = useListMotion();
	const [lists, setLists] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [screen, setScreen] = (0, import_react.useState)("home");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [category, setCategory] = (0, import_react.useState)("Characters");
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
					gear: cleanGear(unit.id, draftGear[unit.id], models)
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
			if (unitId === "knight-destrier") {
				const left = next["mount-a"];
				const right = next["mount-b"];
				if (left && left === right && (left === "chainsword" || left === "spear")) return current;
			}
			if (unitId === "inquisitor" && next.melee === "force" && next.gifts !== "gifts") {
				if (groupId === "melee") return current;
				next.melee = "melee";
			}
			return {
				...current,
				[unitId]: next
			};
		});
	}
	function setEnhancementWeapon(entryId, weaponId) {
		setRoster((current) => ({
			...current,
			entries: current.entries.map((entry) => entry.id === entryId ? {
				...entry,
				enhancementWeapon: weaponId
			} : entry)
		}));
	}
	function setEnhancement(entryId, enhancementId) {
		setRoster((current) => ({
			...current,
			entries: current.entries.map((entry) => {
				if (entry.id !== entryId) return entry;
				if (!enhancementId) return {
					...entry,
					enhancementId: void 0,
					enhancementWeapon: void 0
				};
				if (!choicesFor(entry, current).some((enhancement) => enhancement.id === enhancementId)) return entry;
				const mod = enhancementById(enhancementId)?.weaponMod;
				if (!mod) return {
					...entry,
					enhancementId,
					enhancementWeapon: void 0
				};
				const weapons = weaponChoices(entry.unitId, entry.models, entry.gear, mod.scope);
				const keep = weapons.some((choice) => choice.id === entry.enhancementWeapon);
				return {
					...entry,
					enhancementId,
					enhancementWeapon: keep ? entry.enhancementWeapon : weapons[0]?.id
				};
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
	const visible = UNITS.filter((unit) => unitCategory(unit, roster.detachments) === category);
	function createList() {
		const id = crypto.randomUUID();
		const list = {
			...EMPTY,
			name: "",
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
		setScreen(list.name.trim() && list.detachments.length ? "units" : "detachments");
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
	if (screen === "library") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetachmentLibrary, { onHome: () => setScreen("home") });
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
						onClick: () => setScreen("library"),
						className: "min-h-11 rounded-lg border border-line bg-surface px-4 py-4 text-left text-base font-medium",
						children: "Detachments"
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
				ref: savedListRef,
				className: "flex flex-col gap-2",
				children: saved.map((list) => {
					const points = price(list.entries).reduce((sum, entry) => sum + entry.cost, 0);
					const names = list.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ");
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-stretch gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openList(list.id),
							className: "motion-card min-w-0 flex-1 rounded-lg border border-line bg-surface px-4 py-4 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-base font-medium",
									children: list.name.trim() || "Unnamed"
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
									children: "Army rules"
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
							children: !roster.name.trim() ? "Name the list" : dispositionChoices(roster.detachments).length > 1 && !roster.mainDisposition ? "Choose a main disposition" : `${spentDp(roster.detachments)} / 3 DP`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: !roster.name.trim() || roster.detachments.length === 0 || dispositionChoices(roster.detachments).length > 1 && !roster.mainDisposition,
							onClick: () => {
								setRoster((current) => ({
									...current,
									name: current.name.trim(),
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
		coreOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreRules, {
			army: true,
			onClose: () => setCoreOpen(false)
		}) : null,
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
			enhancementId: entry.enhancementId,
			enhancementWeapon: entry.enhancementWeapon,
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
		className: "page-enter mx-auto flex min-h-screen w-full max-w-3xl min-w-0 flex-col gap-4 px-4 py-5",
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
							disabled: !cleanMainDisposition(roster.detachments, roster.mainDisposition),
							onClick: () => setScreen("play"),
							className: "min-h-11 rounded-lg bg-gold px-3 py-2 text-sm font-medium text-bg disabled:opacity-40",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm break-words",
									children: roster.detachments.map((id) => detachmentById(id)?.name).filter(Boolean).join(", ") || "No detachments"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
								}),
								dispositionChoices(roster.detachments).length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-3 block min-w-0 text-xs text-muted",
									children: ["Main disposition", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										"aria-label": "Main disposition",
										value: roster.mainDisposition && dispositionChoices(roster.detachments).includes(roster.mainDisposition) ? roster.mainDisposition : "",
										onChange: (event) => setMainDisposition(event.target.value),
										className: "mt-1 h-11 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg normal-case",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											disabled: true,
											children: "Choose"
										}), dispositionChoices(roster.detachments).map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: name,
											children: name
										}, name))]
									})]
								}) : null
							]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sticky top-0 z-20 -mx-4 border-b border-line bg-bg px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `motion-color font-display text-3xl tabular-nums ${over ? "text-danger" : "text-fg"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionSwap, {
									cue: total,
									children: total
								}),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-sans text-base font-normal tracking-normal",
									children: "pts"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `motion-color text-sm ${over ? "text-danger" : "text-muted"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionSwap, {
								cue: `${over ? "over" : "under"}-${remaining}`,
								children: [
									over ? `${Math.abs(remaining)} pts over` : `${remaining} pts left`,
									" of ",
									roster.limit,
									" pts"
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 overflow-hidden rounded-full bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `points-fill h-full ${over ? "bg-danger" : "bg-gold"}`,
							style: { transform: `scaleX(${fill / 100})` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: ["units", "list"].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPanel(key),
							className: `min-h-11 rounded-lg border px-3 text-sm ${panel === key ? "border-gold bg-gold text-bg" : "border-line bg-surface text-fg"}`,
							children: key === "units" ? "Units" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"List (",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionSwap, {
									cue: priced.length,
									children: priced.length
								}),
								")"
							] })
						}, key))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-0 gap-4 overflow-x-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: `min-w-0 ${panel === "list" ? "hidden" : "section-open"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid min-w-0 gap-2 border-b border-line py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block min-w-0 text-xs text-muted",
								children: ["Custodes", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Custodes",
									value: CUSTODES_FILTERS.includes(category) ? category : "",
									onChange: (event) => setCategory(event.target.value),
									className: "mt-1 h-11 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Custodes"
									}), CUSTODES_FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item,
										children: item
									}, item))]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block min-w-0 text-xs text-muted",
								children: ["Allies", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									"aria-label": "Allies",
									value: ALLIED_FILTERS.includes(category) ? category : "",
									onChange: (event) => setCategory(event.target.value),
									className: "mt-1 h-11 w-full max-w-full rounded-lg border border-line bg-bg px-2 text-sm text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										disabled: true,
										children: "Allies"
									}), ALLIED_FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item,
										children: item
									}, item))]
								})]
							})]
						}),
						categoryLimit(category) != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pt-2 text-xs text-muted",
							children: [
								category === "Imperial Retinue" ? retinueCounting(roster.entries) : categoryCount(category, roster.entries, roster.detachments),
								" of ",
								categoryLimit(category),
								" ",
								category
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
							cue: category,
							className: "min-w-0",
							children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-6 text-sm text-muted",
								children: "Nothing matches."
							}) : visible.map((unit) => {
								const models = chosenModels(unit);
								sizeOf(unit, models);
								const upcoming = nextCost(unit, models, roster.entries, roster.detachments);
								const gearCost = gearPoints(unit.id, draftGear[unit.id], models);
								const shown = upcoming == null ? null : upcoming + gearCost;
								const taken = roster.entries.filter((entry) => entry.unitId === unit.id).length;
								const nextLine = upcoming == null ? null : priceLine(unit, models, taken, { wargear: gearCost });
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "motion-surface min-w-0 border-b border-line py-4 last:border-b-0",
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
											models,
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MotionSwap, {
									cue: copied ? "copied" : "copy",
									children: copied ? "Copied" : "Copy"
								})
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
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [priced.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-6 text-sm text-muted",
						children: "Add a unit."
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						ref: rosterRef,
						children: [priced.length > 0 && priced.some((entry) => canBeWarlord(entry.unitId)) && !roster.warlordId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "border-b border-line py-3 text-sm text-danger",
							children: "Choose a warlord."
						}) : null, priced.map((entry) => {
							const targets = priced.filter((candidate) => candidate.id !== entry.id && canLead(entry.unitId, candidate.unitId, roster.detachments) && (!priced.some((leader) => leader.attachedTo === candidate.id) || entry.attachedTo === candidate.id));
							const leader = priced.find((candidate) => candidate.attachedTo === entry.id);
							const character = canBeWarlord(entry.unitId);
							const warlord = entry.id === roster.warlordId;
							const kit = gearLineCounted(entry.unitId, entry.gear, entry.models);
							const line = priceLine(entry.unit, entry.models, entry.copy - 1, {
								wargear: gearPoints(entry.unitId, entry.gear, entry.models),
								enhancement: entry.enhancementId ? enhancementById(entry.enhancementId)?.points ?? 0 : 0
							});
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: `motion-surface border-b border-line py-3 last:border-b-0 ${leader ? "border-l-2 border-l-gold pl-4" : ""}`,
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
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "shrink-0 text-sm text-gold tabular-nums",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MotionSwap, {
												cue: entry.cost,
												children: [entry.cost, " pts"]
											})
										})]
									}),
									kit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs break-words text-muted",
										children: kit
									}) : null,
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
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnhancementPick, {
											unitId: entry.unitId,
											unitName: entry.unit.name,
											models: entry.models,
											gear: entry.gear,
											value: entry.enhancementId ?? "",
											weapon: entry.enhancementWeapon,
											choices,
											onChange: (enhancementId) => setEnhancement(entry.id, enhancementId),
											onWeapon: (weaponId) => setEnhancementWeapon(entry.id, weaponId)
										});
									})()
								]
							}, entry.id);
						})]
					})] })]
				}, panel === "list" ? "list" : "list-hidden")]
			}),
			sheet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatasheetView, {
				unitId: sheet.unitId,
				unitName: unitById(sheet.unitId)?.name ?? "Datasheet",
				models: roster.entries.find((entry) => entry.id === sheet.entryId)?.models,
				gear: roster.entries.find((entry) => entry.id === sheet.entryId)?.gear,
				enhancementId: sheet.entryId ? roster.entries.find((entry) => entry.id === sheet.entryId)?.enhancementId : void 0,
				enhancementWeapon: sheet.entryId ? roster.entries.find((entry) => entry.id === sheet.entryId)?.enhancementWeapon : void 0,
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
