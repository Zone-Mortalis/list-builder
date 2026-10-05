import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatShareList, type ShareEntry, type ShareList } from "./list-export.ts";
import { canLead, canSupport, isSupport, reconcileAttachments, type AttachmentLink } from "./units.ts";

function entry(partial: ShareEntry): ShareEntry {
  return partial;
}

function list(entries: ShareEntry[], extra: Partial<ShareList> = {}): ShareList {
  const total = entries.reduce((sum, item) => sum + item.cost, 0);
  return {
    name: "The Ten Thousand",
    total,
    limit: 2000,
    detachmentNames: "Guardians of the Throne",
    entries,
    ...extra,
  };
}

describe("support attachment", () => {
  it("lets Support characters join eligible units without leading them", () => {
    assert.equal(isSupport("ministorum-priest"), true);
    assert.equal(isSupport("knight-centura"), true);
    assert.equal(isSupport("inquisitor"), false);
    assert.equal(canLead("ministorum-priest", "sisters-squad"), false);
    assert.equal(canLead("knight-centura", "vigilators"), false);
    assert.equal(canSupport("ministorum-priest", "sisters-squad"), true);
    assert.equal(canSupport("ministorum-priest", "exaction"), true);
    assert.equal(canSupport("ministorum-priest", "wardens"), false);
    assert.equal(canSupport("knight-centura", "prosecutors"), true);
    assert.equal(canSupport("knight-centura", "vigilators"), true);
    assert.equal(canSupport("knight-centura", "witchseekers"), true);
    assert.equal(canSupport("knight-centura", "sisters-squad"), false);
    assert.equal(canSupport("knight-centura", "rhino"), false);
    assert.equal(canLead("inquisitor", "sisters-squad"), true);
  });

  it("keeps Support attached when the unit has no Leader", () => {
    const body: AttachmentLink = { id: "body", unitId: "sisters-squad" };
    const leader: AttachmentLink = { id: "leader", unitId: "inquisitor", attachedTo: "body" };
    const priest: AttachmentLink = { id: "priest", unitId: "ministorum-priest", attachedTo: "body" };
    const kept = reconcileAttachments([leader, priest, body]);
    assert.equal(kept.find((item) => item.id === "priest")?.attachedTo, "body");
    assert.equal(kept.find((item) => item.id === "leader")?.attachedTo, "body");

    const leaderGone = reconcileAttachments([priest, body]);
    assert.equal(leaderGone.find((item) => item.id === "priest")?.attachedTo, "body");

    const leaderMoved = reconcileAttachments([
      { ...leader, attachedTo: "other" },
      priest,
      body,
      { id: "other", unitId: "exaction" },
    ]);
    assert.equal(leaderMoved.find((item) => item.id === "priest")?.attachedTo, "body");
    assert.equal(leaderMoved.find((item) => item.id === "leader")?.attachedTo, "other");

    const sisters: AttachmentLink = { id: "squad", unitId: "vigilators" };
    const centura: AttachmentLink = { id: "centura", unitId: "knight-centura", attachedTo: "squad" };
    const alone = reconcileAttachments([centura, sisters]);
    assert.equal(alone.find((item) => item.id === "centura")?.attachedTo, "squad");

    const tank: AttachmentLink = { id: "tank", unitId: "rhino" };
    const wrongBody = reconcileAttachments([{ ...centura, attachedTo: "tank" }, tank]);
    assert.equal(wrongBody.find((item) => item.id === "centura")?.attachedTo, undefined);
  });
});

describe("formatShareList", () => {
  it("prints a leader, support, and multi-model bodyguard with warlord and enhancement", () => {
    const text = formatShareList(
      list([
        entry({
          id: "inq",
          unitId: "inquisitor",
          name: "Inquisitor",
          models: 1,
          cost: 65,
          attachedTo: "sisters",
          warlord: true,
          gear: { pistol: "combi", gifts: "wardings", melee: "melee" },
        }),
        entry({
          id: "priest",
          unitId: "ministorum-priest",
          name: "Ministorum Priest",
          models: 1,
          cost: 50,
          attachedTo: "sisters",
          gear: { armament: "pistol" },
          enhancement: { name: "Castellan's Mark" },
        }),
        entry({
          id: "sisters",
          unitId: "sisters-squad",
          name: "Sisters of Battle Squad",
          models: 10,
          cost: 110,
          gear: { superior: "combi", "superior-melee": "power", special: "melta", heavy: "heavy", simulacrum: "sim", sister: "7" },
        }),
      ]),
    );

    assert.match(text, /^The Ten Thousand\n225 pts \/ 2000 pts\nGuardians of the Throne\n\n/);
    assert.match(
      text,
      /Inquisitor \(65 points\) — Warlord\n• Attached as: Leader \(Character\)\n {2}• 1x Combi-weapon\n {4}1x Blessed wardings\n {4}1x Inquisitorial melee weapon\n\n/,
    );
    assert.match(
      text,
      /Ministorum Priest \(50 points\)\n• Attached as: Support \(Character\)\n {2}• 1x Holy pistol\n {4}1x Power weapon\n {2}• Enhancement: Castellan's Mark/,
    );
    assert.match(text, /Sisters of Battle Squad \(110 points\)\n• Attached as: Bodyguard\n {2}• 1x Sister Superior/);
    assert.match(text, / {4}• 1x Bolt pistol\n {6}1x Combi-weapon\n {6}1x Close combat weapon\n {6}1x Power weapon/);
    assert.match(text, / {2}• 1x Battle Sister\n {4}• 1x Bolt pistol\n {6}1x Meltagun\n {6}1x Close combat weapon/);
    assert.match(text, / {2}• 1x Battle Sister\n {4}• 1x Bolt pistol\n {6}1x Heavy bolter\n {6}1x Close combat weapon/);
    assert.match(text, /Simulacrum Imperialis/);
    assert.match(text, / {2}• \d+x Battle Sister\n {4}• \d+x Bolt pistol/);
    const inquisitorAt = text.indexOf("Inquisitor");
    const priestAt = text.indexOf("Ministorum Priest");
    const sistersAt = text.indexOf("Sisters of Battle Squad");
    assert.ok(inquisitorAt < priestAt && priestAt < sistersAt);
  });

  it("prints a single character and a vehicle, including an upgrade", () => {
    const text = formatShareList(
      list(
        [
          entry({
            id: "cap",
            unitId: "shield-captain",
            name: "Shield-Captain",
            models: 1,
            cost: 205,
            warlord: true,
            gear: { weapon: "shield-pyrithite" },
            enhancement: { id: "castellan", name: "Castellan's Mark" },
          }),
          entry({
            id: "tank",
            unitId: "caladius",
            name: "Caladius Grav-Tank",
            models: 1,
            cost: 245,
            gear: { sponson: "lastrum" },
            enhancement: { id: "anti-grav", name: "Anti-gravitic Mobility", upgrade: true },
          }),
        ],
        { detachmentNames: "Grav-carrier Host", total: 450 },
      ),
    );

    assert.equal(
      text,
      [
        "The Ten Thousand",
        "450 pts / 2000 pts",
        "Grav-carrier Host",
        "",
        [
          "Shield-Captain (205 points) — Warlord",
          "  • 1x Praesidium shield",
          "    1x Pyrithite spear",
          "  • Enhancement: Castellan's Mark",
        ].join("\n"),
        "",
        [
          "Caladius Grav-Tank (245 points)",
          "  • 1x Armoured hull",
          "    1x Twin Lastrum bolt cannon",
          "    1x Iliastus accelerator cannon",
          "  • Enhancement: Anti-gravitic Mobility (Upgrade)",
        ].join("\n"),
      ].join("\n"),
    );
  });

  it("prints Support then Bodyguard when no Leader is attached", () => {
    const text = formatShareList(
      list(
        [
          entry({
            id: "centura",
            unitId: "knight-centura",
            name: "Knight Centura",
            models: 1,
            cost: 55,
            attachedTo: "squad",
            gear: { weapon: "blade" },
          }),
          entry({
            id: "squad",
            unitId: "vigilators",
            name: "Vigilators",
            models: 4,
            cost: 50,
          }),
        ],
        { detachmentNames: undefined, total: 105 },
      ),
    );
    assert.equal(
      text,
      [
        "The Ten Thousand",
        "105 pts / 2000 pts",
        "",
        [
          "Knight Centura (55 points)",
          "• Attached as: Support (Character)",
          "  • 1x Executioner greatblade",
          "",
          "Vigilators (50 points)",
          "• Attached as: Bodyguard",
          "  • 4x Vigilator",
          "    • 4x Executioner greatblade",
        ].join("\n"),
      ].join("\n"),
    );
    const supportAt = text.indexOf("Attached as: Support");
    const bodyAt = text.indexOf("Attached as: Bodyguard");
    assert.ok(supportAt !== -1 && supportAt < bodyAt);
    assert.equal(text.includes("Attached as: Leader"), false);
  });

  it("splits a multi-model squad when one model takes extra wargear", () => {
    const text = formatShareList(
      list(
        [
          entry({
            id: "guard",
            unitId: "custodian-guard",
            name: "Custodian Guard Sodality",
            models: 3,
            cost: 240,
            gear: { vexilla: "vexilla" },
          }),
        ],
        { detachmentNames: undefined, total: 240 },
      ),
    );
    assert.equal(
      text,
      [
        "The Ten Thousand",
        "240 pts / 2000 pts",
        "",
        [
          "Custodian Guard Sodality (240 points)",
          "  • 1x Custodian Guard",
          "    • 1x Guardian spear",
          "      1x Vexilla",
          "  • 2x Custodian Guard",
          "    • 2x Guardian spear",
        ].join("\n"),
      ].join("\n"),
    );
  });
});
