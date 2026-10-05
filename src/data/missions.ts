export type ScoreLine = {
  pays: string;
  points: string;
  cumulative?: boolean;
  alt?: boolean;
};

export type ScoreWindow = {
  round: string;
  when: string | null;
  scores: ScoreLine[];
};

export type MissionAction = {
  name: string;
  kind: string;
  starts: string;
  units: string;
  limit: string;
  completes: string;
  effect: string;
  restrictions?: string;
};

export type MissionCard = {
  id: string;
  name: string;
  flavor: string;
  rule?: string;
  windows: ScoreWindow[];
  action?: MissionAction;
};

export type MissionDisposition = {
  name: string;
  summary: string;
  cards: MissionCard[];
};

export const MISSIONS: MissionDisposition[] = [
  {
    name: "Take and Hold",
    summary: "Pays for holding and flipping ground.",
    cards: [
    {
      id: "battlefield-dominance",
      name: "Battlefield Dominance",
      flavor: "This battlefield holds great significance for the wider war effort. You must seize control of it. Let nothing stand in your way.",
      windows: [
        { round: "First and second battle round", when: "End of your turn.", scores: [{ pays: "You control more objectives than your opponent.", points: "2VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "For each objective you control.", points: "3VP" }, { pays: "For each of those objectives, excluding your home objective, if you control your home objective.", points: "+2VP", cumulative: true }] },
      ],
    },
    {
      id: "immovable-object",
      name: "Immovable Object",
      flavor: "Obstinance is often the key to victory. Weather everything the enemy throws at you. If your opponent is to take any ground, they will have to wade through their own dead to do so.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "You control one or more central objectives.", points: "3VP" }] },
        { round: "Second to fourth battle round", when: "End of your Command phase.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "5VP" }] },
        { round: "Fifth battle round", when: "End of your turn.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "5VP" }] },
      ],
    },
    {
      id: "determined-acquisition",
      name: "Determined Acquisition",
      flavor: "The resistance arrayed against you is formidable indeed, yet your orders are clear; take and hold the ground ahead, heedless of the cost.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "For each objective you control that you did not control at the start of the turn, excluding your home objective.", points: "2VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "For each objective you control.", points: "3VP" }, { pays: "For each of those objectives that is within your opponent’s territory.", points: "+3VP", cumulative: true }] },
      ],
    },
    {
      id: "purge-and-secure",
      name: "Purge and Secure",
      flavor: "Enemy pickets and reconnaissance have engaged your vanguard. Move forward, seize defensive positions and repel the assault at all costs.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units were destroyed this turn by a friendly unit that was within range of one or more objectives.", points: "3VP" }, { pays: "One or more enemy units that started the turn within range of one or more objectives were destroyed this turn.", points: "3VP", alt: true }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "You control one or more objectives you did not control at the start of the turn, excluding your home objective.", points: "3VP" }] },
      ],
    },
    {
      id: "inescapable-dominion",
      name: "Inescapable Dominion",
      flavor: "Your first priority must be to dominate the battlefield. Seize strongpoints and dig in. Only then may you turn your full attention to slaughtering the foe.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "You control three or more objectives.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control two or more objectives.", points: "5VP" }, { pays: "You control more objectives than your opponent.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "You control your opponent’s home objective.", points: "5VP" }] },
      ],
    }
    ],
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
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units were destroyed this turn.", points: "3VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "You control one or more objectives you did not control at the start of the turn, excluding your home objective.", points: "3VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "You control one or more central objectives.", points: "5VP" }] },
      ],
    },
    {
      id: "meatgrinder",
      name: "Meatgrinder",
      flavor: "Vicious and without relent, this battle has descended into base savagery. Only one path to victory remains: kill more of the enemy than they can kill of you.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units were destroyed this turn.", points: "3VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "More enemy units were destroyed this turn than friendly units were destroyed in the previous turn.", points: "5VP" }, { pays: "You control your opponent’s home objective.", points: "5VP" }] },
      ],
    },
    {
      id: "punishment",
      name: "Punishment",
      flavor: "Those who resist must be punished. Make a bloody example of them, and leave none in doubt as to your mastery.",
      windows: [
        { round: "Any battle round", when: "End of a turn.", scores: [{ pays: "One or more condemned enemy units left the battlefield this turn.", points: "5VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }, { pays: "You control more objectives than your opponent.", points: "5VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "You control your opponent’s home objective.", points: "8VP" }] },
      ],
      rule: "Start of your turn: select one to three enemy units that are on the battlefield and within range of objectives and/or that destroyed one or more friendly units in the previous turn. If you cannot, select one enemy unit that is on the battlefield. Until the start of your next turn, those units are condemned.",
    },
    {
      id: "consecrate",
      name: "Consecrate",
      flavor: "Whether in the name of grand ideals or simply to satisfy the thirst of their terrible gods, your warriors must consecrate this battlefield with the blood of their foes.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or two objectives are consecrated.", points: "3VP" }, { pays: "Three or more objectives are consecrated.", points: "6VP", alt: true }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }, { pays: "You control more objectives than your opponent.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "Your opponent’s home objective is consecrated.", points: "5VP" }] },
      ],
      rule: "Each time a friendly unit destroys a unit, that friendly unit becomes a consecration unit. At the end of your turn, for each of your consecration units, you can select one objective it is within range of, excluding your home objective, that has not been consecrated. If you do, place one of your operation markers within range of that objective. That objective is consecrated and that unit is no longer a consecration unit.",
    },
    {
      id: "destroyers-wrath",
      name: "Destroyer's Wrath",
      flavor: "Victory here shall not be measured in ground taken or plunder seized, but in the mangled corpses of your foes and the grisly trophies hewn from their bodies.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units were destroyed this turn.", points: "3VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }, { pays: "You control more objectives than your opponent.", points: "6VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "More enemy units were destroyed this turn than friendly units were destroyed in the previous turn.", points: "4VP" }] },
      ],
    }
    ],
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
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "For each terrain area trapped this turn.", points: "2VP" }, { pays: "For each of those terrain areas that is an objective.", points: "+3VP", cumulative: true }] },
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units that started the turn within a terrain area were destroyed, if that terrain area is trapped.", points: "3VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
      ],
      action: {
        name: "Booby Trap",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit within range of one objective, excluding your home objective, or within one terrain area that is not within your deployment zone, that you have not yet trapped.",
        limit: "Unlimited. Each unit that starts this action this phase must be within a different terrain area.",
        completes: "Immediately.",
        effect: "That terrain area is trapped: place one of your operation markers within that terrain area.",
      },
    },
    {
      id: "delaying-action",
      name: "Delaying Action",
      flavor: "Your enemies are on the march. Commit your warriors to battle and make the foe pay a bloody price for every foot of ground.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "For each enemy unit destroyed this turn.", points: "2VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "You control one or more central objectives and one or more expansion objectives.", points: "3VP" }] },
      ],
    },
    {
      id: "outmanoeuvre",
      name: "Outmanoeuvre",
      flavor: "Speed and positioning are key in any battle. Outflank the enemy, seize high ground and routes of resupply. Choke them to death.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "You control your opponent’s home objective.", points: "10VP" }] },
        { round: "First battle round", when: "End of your turn.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "4VP" }] },
        { round: "Second and third battle round", when: "End of your Command phase.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "5VP" }] },
        { round: "Fourth battle round onwards", when: "End of your turn.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "6VP" }] },
      ],
    },
    {
      id: "smoke-and-mirrors",
      name: "Smoke and Mirrors",
      flavor: "Cunning is as potent a weapon as overwhelming force. Outnumbered or outgunned, you must make use of subterfuge and misdirection to pick the enemy apart.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "For each objective that is decoyed.", points: "2VP" }, { pays: "For each of those objectives that is within your opponent’s territory.", points: "+2VP", cumulative: true }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "Four or more objectives are decoyed.", points: "10VP" }] },
      ],
      action: {
        name: "Decoy",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit within range of one objective, excluding your home objective, that is not decoyed.",
        limit: "Unlimited. Each unit that starts this action this phase must be within range of a different objective.",
        completes: "End of your turn, if your unit controls that objective.",
        effect: "That objective is decoyed: place one of your operation markers within range of that objective.",
      },
    },
    {
      id: "locate-and-deny",
      name: "Locate and Deny",
      flavor: "The enemy is searching for an asset of value. By cunning or by force of arms, prevent its retrieval.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units that started the turn within range of one or more objectives are destroyed.", points: "4VP" }, { pays: "Only one of your operation markers is on the battlefield, if one or more of your units are within the same terrain area as that marker, and no enemy units are within that terrain area.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "Only one of your operation markers is on the battlefield, if one or more of your units are within the same terrain area as that marker, and no enemy units are within that terrain area.", points: "5VP" }] },
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
        restrictions: "A unit cannot start this action if there is only one operation marker on the battlefield.",
      },
    }
    ],
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
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "Three or more friendly units are wholly within three different table quarters and not within 6\" of the centre of the battlefield.", points: "3VP" }, { pays: "Four or more friendly units are wholly within four different table quarters and not within 6\" of the centre of the battlefield.", points: "6VP", alt: true }] },
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "For each enemy unit destroyed this turn.", points: "1VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "3VP" }] },
      ],
    },
    {
      id: "triangulation",
      name: "Triangulation",
      flavor: "By acquiring and transmitting precise coordinates, your forces will be able to summon reinforcements, saturate the battlefield with artillery fire or call in other means of support.",
      windows: [
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "One objective is triangulated.", points: "3VP" }, { pays: "Two objectives are triangulated.", points: "6VP", alt: true }, { pays: "Three or more objectives are triangulated.", points: "10VP", alt: true }] },
        { round: "End of the battle", when: null, scores: [{ pays: "You control four or more objectives.", points: "10VP" }] },
      ],
      action: {
        name: "Triangulate",
        kind: "Objective action",
        starts: "Your Shooting phase, from the second battle round onwards.",
        units: "One friendly unit within range of one objective, excluding your home objective.",
        limit: "Once per turn.",
        completes: "End of your turn, if your unit controls that objective.",
        effect: "That objective is triangulated: place one of your operation markers within range of that objective.",
      },
    },
    {
      id: "surveil-the-foe",
      name: "Surveil the Foe",
      flavor: "Information is power. Evaluate the strengths and weaknesses of the enemy and feed this crucial information back to your superiors.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "One or more enemy units were surveilled this turn, unless each of those units is within range of one or more objectives that have one or more operation markers within range of them.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }, { pays: "You control more objectives than your opponent.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "None of your opponent’s operation markers are on the battlefield.", points: "5VP" }] },
      ],
      rule: "Each time a friendly unit ends a move within range of one objective that has any of your opponent’s operation markers within range of it, remove those operation markers from the battlefield.",
      action: {
        name: "Surveil the Foe",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit.",
        limit: "Unlimited.",
        completes: "Immediately.",
        effect: "Select one enemy unit within 18\" of and visible to your unit that has not been surveilled this turn. Until the end of the turn, that enemy unit is surveilled.",
      },
    },
    {
      id: "gather-intel",
      name: "Gather Intel",
      flavor: "The nature and motivation of the foe remains unclear. Test their mettle and seize pertinent intelligence from the field of battle.",
      windows: [
        { round: "First battle round", when: "End of your turn.", scores: [{ pays: "You control one or more central objectives.", points: "6VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your turn.", scores: [{ pays: "For each friendly unit that completed the Extract Intelligence action this turn.", points: "7VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "Three or more of your operation markers are on the battlefield.", points: "5VP" }, { pays: "One of your operation markers is within range of your opponent’s home objective.", points: "5VP" }] },
      ],
      action: {
        name: "Extract Intelligence",
        kind: "Objective action",
        starts: "Your Shooting phase, from the second battle round onwards.",
        units: "One unit within range of one objective, excluding your home objective, that does not have any of your operation markers within range of it.",
        limit: "Unlimited. Each unit that starts this action this phase must be within range of a different objective.",
        completes: "End of your turn, if your unit controls that objective.",
        effect: "Place one of your operation markers within range of that objective.",
      },
    },
    {
      id: "search-and-scour",
      name: "Search and Scour",
      flavor: "Forward elements report enemy movement in this sector. Move out, locate the foes and halt their operation before it gathers momentum.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "You control one or more central objectives.", points: "3VP" }, { pays: "One or more enemy units that started the turn within a terrain area are destroyed.", points: "2VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "For each objective you control, excluding your home objective.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "No enemy units are wholly within your territory.", points: "5VP" }] },
      ],
    }
    ],
  },
  {
    name: "Priority Assets",
    summary: "Pays for the asset action, then holding.",
    cards: [
    {
      id: "secure-asset",
      name: "Secure Asset",
      flavor: "A vital asset has been lost amidst the chaos of battle. You must secure the item at all costs.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "A friendly unit secured the asset this turn.", points: "4VP" }, { pays: "One or more enemy units that started the turn within range of one or more central objectives are destroyed.", points: "2VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }, { pays: "You control three or more objectives.", points: "4VP" }] },
      ],
      action: {
        name: "Secure Asset",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit within range of one objective, excluding your home objective.",
        limit: "Once per turn.",
        completes: "End of your turn, if your unit controls that objective.",
        effect: "Your unit secures the asset.",
      },
    },
    {
      id: "vital-link",
      name: "Vital Link",
      flavor: "A key communications node is located in the midst of this battlefield. Control of this node is crucial to the continued success of your armies. Ensure it does not fall into enemy hands.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "You control one or more central objectives.", points: "2VP" }, { pays: "For each of your operation markers within range of one of those objectives.", points: "+1VP", cumulative: true }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }, { pays: "One or more of those objectives is a central objective.", points: "+4VP", cumulative: true }] },
        { round: "End of the battle", when: null, scores: [{ pays: "You control your opponent’s home objective.", points: "10VP" }] },
      ],
      action: {
        name: "Maintain Control",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit within range of one central objective.",
        limit: "Once per turn.",
        completes: "End of your turn, if your unit controls that objective.",
        effect: "Place one of your operation markers within range of that objective.",
      },
    },
    {
      id: "extract-relic",
      name: "Extract Relic",
      flavor: "A priceless relic saturated with eldritch power lies somewhere on the field of battle. Secure the sensor array at the heart of the battlefield and direct its energies to locating the prize.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "A friendly unit performed a sensor sweep this turn.", points: "4VP" }, { pays: "One or more enemy units that started the turn within range of one or more objectives are destroyed.", points: "3VP" }, { pays: "Only one of your opponent’s operation markers is on the battlefield, if one or more of your units are within the same terrain area as that operation marker, and no enemy units are within that terrain area.", points: "4VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "Only one of your opponent’s operation markers is on the battlefield, if one or more of your units are within the same terrain area as that operation marker, and no enemy units are within that terrain area.", points: "5VP" }] },
      ],
      action: {
        name: "Sensor Sweep",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit within range of one central objective.",
        limit: "Once per turn.",
        completes: "End of your turn, if your unit controls that objective.",
        effect: "Your unit performs a sensor sweep: remove one operation marker from the battlefield.",
        restrictions: "A unit cannot start this action if there is only one operation marker on the battlefield.",
      },
    },
    {
      id: "vanguard-operation",
      name: "Vanguard Operation",
      flavor: "Striking deep beyond the front lines, your forces must employ speed and cunning to secure their objectives before the enemy responds.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "A friendly unit performed a vanguard operation this turn.", points: "4VP" }, { pays: "One or more enemy units were destroyed this turn.", points: "2VP" }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
        { round: "End of the battle", when: null, scores: [{ pays: "You control your opponent’s home objective.", points: "10VP" }] },
      ],
      action: {
        name: "Vanguard Operation",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One friendly unit within one terrain area that is within your opponent’s territory.",
        limit: "Once per turn.",
        completes: "End of your turn, if no enemy units are within that terrain area.",
        effect: "Your unit performs a vanguard operation.",
      },
    },
    {
      id: "sabotage",
      name: "Sabotage",
      flavor: "Strike deep behind enemy lines, sabotage supply routes, fortifications and heavy weapons. By doing so you may lay the groundwork for future offensives.",
      windows: [
        { round: "Any battle round", when: "End of your turn.", scores: [{ pays: "For each friendly unit that committed sabotage this turn.", points: "3VP" }, { pays: "For each of those units that is within range of one or more objectives in your opponent’s territory.", points: "+2VP", cumulative: true }] },
        { round: "Second battle round onwards", when: "End of your Command phase, or the end of your turn in the fifth battle round.", scores: [{ pays: "You control one or more objectives, excluding your home objective.", points: "4VP" }] },
      ],
      action: {
        name: "Sabotage",
        kind: "Objective action",
        starts: "Your Shooting phase.",
        units: "One unit within range of one objective, excluding your home objective.",
        limit: "Unlimited. Each unit that starts this action this phase must be within range of a different objective.",
        completes: "End of your turn, if that unit controls that objective.",
        effect: "Your unit commits sabotage.",
      },
    }
    ],
  }
];

const MATCHUPS: Record<string, string> = {
  "Take and Hold|Purge the Foe":
    "Take and Hold against Purge the Foe is ground against kills. Dominance, Immovable Object, and Determined Acquisition do not pay for their destroyed units. Purge and Secure does. Their Unstoppable Force, Meatgrinder, and Destroyer’s Wrath pay 3 every turn a unit dies, then add a holding line from round 2.",
  "Purge the Foe|Take and Hold":
    "Purge the Foe against Take and Hold is kills against ground. Unstoppable Force, Meatgrinder, and Destroyer’s Wrath pay 3 every turn a unit dies, then add a holding line from round 2. Their Dominance, Immovable Object, and Determined Acquisition do not pay for your destroyed units. Purge and Secure does.",
  "Take and Hold|Disruption":
    "Take and Hold against Disruption is ground against sabotage. Your holding lines do not stop their Booby Trap, Decoy, or Sensor Sweep. Outmanoeuvre is the one that races you on raw objectives, and their home is 10 any round.",
  "Disruption|Take and Hold":
    "Disruption against Take and Hold is sabotage against ground. Their holding lines do not stop your Booby Trap, Decoy, or Sensor Sweep. Outmanoeuvre is the one that races them on raw objectives, and their home is 10 any round.",
  "Take and Hold|Reconnaissance":
    "Take and Hold against Reconnaissance is objectives against spread and actions. Quarters, triangulation, and intel markers can pay them without matching your objective count. Gather Intel and Triangulation are the cards that can pass a pure holding card.",
  "Reconnaissance|Take and Hold":
    "Reconnaissance against Take and Hold is spread and actions against objectives. Quarters, triangulation, and intel markers can pay you without matching their objective count. Gather Intel and Triangulation are the cards that can pass a pure holding card.",
  "Take and Hold|Priority Assets":
    "Take and Hold against Priority Assets is both on objectives, but they add an action. Secure Asset, Vital Link, Extract Relic, Vanguard Operation, and Sabotage sit on top of a holding line. Vital Link and Vanguard Operation pay 10 for your home at the end.",
  "Priority Assets|Take and Hold":
    "Priority Assets against Take and Hold is both on objectives, but you add an action. Secure Asset, Vital Link, Extract Relic, Vanguard Operation, and Sabotage sit on top of a holding line. Vital Link and Vanguard Operation pay 10 for their home at the end.",
  "Purge the Foe|Disruption":
    "Purge the Foe against Disruption shares kills. Death Trap pays them if the unit dies in trapped terrain. Delaying Action pays 2 per unit. Locate and Deny pays 4 if it started on an objective. Smoke and Mirrors and Outmanoeuvre ignore your kill count.",
  "Disruption|Purge the Foe":
    "Disruption against Purge the Foe shares kills. Death Trap pays you if the unit dies in trapped terrain. Delaying Action pays 2 per unit. Locate and Deny pays 4 if it started on an objective. Smoke and Mirrors and Outmanoeuvre ignore their kill count.",
  "Purge the Foe|Reconnaissance":
    "Purge the Foe against Reconnaissance is bodies against actions. Reconnaissance Sweep also pays them 1 per kill. Triangulation and Gather Intel ignore the kill count if the action finishes.",
  "Reconnaissance|Purge the Foe":
    "Reconnaissance against Purge the Foe is actions against bodies. Reconnaissance Sweep also pays you 1 per kill. Triangulation and Gather Intel ignore the kill count if the action finishes.",
  "Purge the Foe|Priority Assets":
    "Purge the Foe against Priority Assets can pay both players. Secure Asset, Extract Relic, and Vanguard Operation all have a smaller kill line on top of the action.",
  "Priority Assets|Purge the Foe":
    "Priority Assets against Purge the Foe can pay both players. Secure Asset, Extract Relic, and Vanguard Operation all have a smaller kill line on top of the action.",
  "Disruption|Reconnaissance":
    "Disruption against Reconnaissance is action against action. Traps and decoys sit on the objectives they need to triangulate or extract from. Surveil the Foe removes their markers when you end a move on that objective. Locate and Deny and Extract Relic are the same last-marker fight from opposite sides.",
  "Reconnaissance|Disruption":
    "Reconnaissance against Disruption is action against action. Their traps and decoys sit on the objectives you need to triangulate or extract from. Surveil the Foe removes their markers when they end a move on that objective. Locate and Deny and Extract Relic are the same last-marker fight from opposite sides.",
  "Disruption|Priority Assets":
    "Disruption against Priority Assets is the same objective fight. Booby Trap and Decoy compete with Secure Asset, Maintain Control, and Sabotage. Vanguard Operation is the one that happens in a terrain area in your territory instead of on an objective.",
  "Priority Assets|Disruption":
    "Priority Assets against Disruption is the same objective fight. Secure Asset, Maintain Control, and Sabotage compete with their Booby Trap and Decoy. Vanguard Operation is the one that happens in a terrain area in their territory instead of on an objective.",
  "Reconnaissance|Priority Assets":
    "Reconnaissance against Priority Assets is intel against the asset. Extract Intelligence and Triangulate want a controlled objective and your marker. Secure Asset, Sabotage, and Sensor Sweep want those same objectives. Search and Scour is the kill-in-terrain card against their vanguard units.",
  "Priority Assets|Reconnaissance":
    "Priority Assets against Reconnaissance is the asset against intel. Their Extract Intelligence and Triangulate want a controlled objective and their marker. Secure Asset, Sabotage, and Sensor Sweep want those same objectives. Their Search and Scour is the kill-in-terrain card against your vanguard units.",
};

export function missionByName(name: string): MissionDisposition | undefined {
  return MISSIONS.find((mission) => mission.name === name);
}

/** Your mission index, then their mission index, for each opponent disposition. */
const MISSION_PAIRS: Record<string, Record<string, readonly [number, number]>> = {
  "Take and Hold": {
    "Take and Hold": [0, 0],
    "Purge the Foe": [1, 0],
    Disruption: [2, 0],
    Reconnaissance: [3, 0],
    "Priority Assets": [4, 0],
  },
  "Purge the Foe": {
    "Take and Hold": [0, 1],
    "Purge the Foe": [1, 1],
    Disruption: [2, 1],
    Reconnaissance: [3, 1],
    "Priority Assets": [4, 1],
  },
  Disruption: {
    "Take and Hold": [0, 2],
    "Purge the Foe": [1, 2],
    Disruption: [2, 2],
    Reconnaissance: [3, 2],
    "Priority Assets": [4, 2],
  },
  Reconnaissance: {
    "Take and Hold": [0, 3],
    "Purge the Foe": [1, 3],
    Disruption: [2, 3],
    Reconnaissance: [3, 3],
    "Priority Assets": [4, 3],
  },
  "Priority Assets": {
    "Take and Hold": [0, 4],
    "Purge the Foe": [1, 4],
    Disruption: [2, 4],
    Reconnaissance: [3, 4],
    "Priority Assets": [4, 4],
  },
};

export function matchedPair(yours: string, theirs: string): { yours: MissionCard; theirs: MissionCard } | undefined {
  const indexes = MISSION_PAIRS[yours]?.[theirs];
  const yourDeck = missionByName(yours);
  const theirDeck = missionByName(theirs);
  if (!indexes || !yourDeck || !theirDeck) return undefined;
  const yourCard = yourDeck.cards[indexes[0]];
  const theirCard = theirDeck.cards[indexes[1]];
  if (!yourCard || !theirCard) return undefined;
  return { yours: yourCard, theirs: theirCard };
}

export function matchupText(yours: string, theirs: string): string {
  if (yours === theirs) {
    return "Same disposition. You both score the matched card.";
  }
  return MATCHUPS[`${yours}|${theirs}`] ?? "";
}
