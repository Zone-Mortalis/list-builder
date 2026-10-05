import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  configFile: new URL("../vite.config.ts", import.meta.url).pathname,
});
const { characteristicMarks, keywordMarked, playSheet, weaponMarkKey } =
  await server.ssrLoadModule("/src/data/sheet-mods.ts");

after(async () => {
  await server.close();
});

function statsOf(marks, profile = "primary") {
  return [...(marks.unit.get(profile) ?? [])].sort();
}

function weaponStats(marks, scope, name) {
  const mark = marks.weapons.get(weaponMarkKey(scope, name));
  return {
    name: Boolean(mark?.name),
    stats: [...(mark?.stats ?? [])].sort(),
    keywords: mark?.keywords == null && mark ? null : [...(mark?.keywords ?? [])].sort(),
  };
}

describe("characteristic highlighting", () => {
  it("does not highlight a datasheet that has no relevant selection", () => {
    const marks = characteristicMarks({ unitId: "custodian-guard", models: 4 });
    assert.deepEqual(statsOf(marks), []);
    assert.equal(marks.weapons.size, 0);
    assert.equal(marks.unitKeywords.size, 0);
    const sheet = playSheet({ unitId: "shield-captain" });
    const spear = sheet.ranged.find((weapon) => weapon.name === "Guardian spear");
    const melee = sheet.melee.find((weapon) => weapon.name === "Guardian spear");
    assert.equal(spear.a, "2");
    assert.equal(melee.a, "8");
    assert.equal(characteristicMarks({ unitId: "shield-captain" }).weapons.size, 0);
  });

  it("highlights only OC when a vexilla is taken, and drops it when removed", () => {
    const on = characteristicMarks({
      unitId: "custodian-guard",
      models: 4,
      gear: { vexilla: "vexilla" },
    });
    assert.deepEqual(statsOf(on), ["oc"]);
    assert.equal(on.weapons.size, 0);
    assert.equal(
      playSheet({ unitId: "custodian-guard", models: 4, gear: { vexilla: "vexilla" } }).stats.oc,
      "4",
    );
    const off = characteristicMarks({ unitId: "custodian-guard", models: 4, gear: {} });
    assert.deepEqual(statsOf(off), []);
    assert.equal(playSheet({ unitId: "custodian-guard", models: 4, gear: {} }).stats.oc, "3");
  });

  it("highlights only the chosen ranged weapon's Attacks, not the melee profile of the same name", () => {
    const marks = characteristicMarks({
      unitId: "shield-captain-allarus",
      enhancementId: "not-a-shell",
      enhancementWeapon: "Guardian spear",
    });
    assert.deepEqual(statsOf(marks), []);
    assert.deepEqual(weaponStats(marks, "ranged", "Guardian spear"), {
      name: false,
      stats: ["a"],
      keywords: [],
    });
    assert.deepEqual(weaponStats(marks, "melee", "Guardian spear"), {
      name: false,
      stats: [],
      keywords: [],
    });
    assert.deepEqual(weaponStats(marks, "ranged", "Balistus grenade launcher"), {
      name: false,
      stats: [],
      keywords: [],
    });
    const sheet = playSheet({
      unitId: "shield-captain-allarus",
      enhancementId: "not-a-shell",
      enhancementWeapon: "Guardian spear",
    });
    assert.equal(sheet.ranged.find((weapon) => weapon.name === "Guardian spear").a, "3");
    assert.equal(sheet.melee.find((weapon) => weapon.name === "Guardian spear").a, "8");
    assert.equal(sheet.ranged.find((weapon) => weapon.name === "Balistus grenade launcher").a, "3");
  });

  it("highlights only the keyword an enhancement adds", () => {
    const marks = characteristicMarks({ unitId: "galatus", enhancementId: "flawless" });
    const melee = marks.weapons.get(weaponMarkKey("melee", "Warblade"));
    assert.deepEqual(weaponStats(marks, "melee", "Warblade"), {
      name: false,
      stats: ["keywords"],
      keywords: ["sustained hits 1"],
    });
    assert.equal(keywordMarked(melee, "Sustained Hits 1"), true);
    assert.equal(keywordMarked(melee, "Sustained Hits 1: non-Monster/Vehicle"), false);
    assert.equal(keywordMarked(melee, "Cleave 1"), false);
    assert.equal(marks.weapons.has(weaponMarkKey("ranged", "Warblade")), false);
    const sheet = playSheet({ unitId: "galatus", enhancementId: "flawless" });
    assert.match(sheet.melee[0].tags, /Sustained Hits 1/);
    assert.equal(sheet.ranged[0].tags, "Blast 2, Torrent, Twin-linked");
  });

  it("highlights Attacks, Strength, and Damage on the melee profile a dreadnought upgrade changes", () => {
    const marks = characteristicMarks({ unitId: "galatus", enhancementId: "memento" });
    assert.deepEqual(weaponStats(marks, "melee", "Warblade"), {
      name: false,
      stats: ["a", "d", "s"],
      keywords: [],
    });
    assert.equal(marks.weapons.has(weaponMarkKey("ranged", "Warblade")), false);
    const sheet = playSheet({ unitId: "galatus", enhancementId: "memento" });
    assert.equal(sheet.melee[0].a, "9");
    assert.equal(sheet.melee[0].s, "11");
    assert.equal(sheet.melee[0].d, "4");
    assert.equal(sheet.ranged[0].a, "4");
  });

  it("highlights every characteristic of a weapon the enhancement grants, and nothing else", () => {
    const marks = characteristicMarks({
      unitId: "blade-champion",
      enhancementId: "emperors-light",
    });
    assert.deepEqual(weaponStats(marks, "melee", "Emperor's Light"), {
      name: true,
      stats: ["a", "ap", "d", "keywords", "range", "s", "skill"],
      keywords: null,
    });
    assert.equal(marks.weapons.has(weaponMarkKey("melee", "Vaultswords — Behemor")), false);
    assert.equal(
      playSheet({ unitId: "blade-champion", enhancementId: "emperors-light" }).melee.at(-1).name,
      "Emperor's Light",
    );
  });

  it("highlights Wounds for Eagle's Eye and leaves the once-per-battle invulnerable save alone", () => {
    const marks = characteristicMarks({ unitId: "shield-captain", enhancementId: "eagles-eye" });
    assert.deepEqual(statsOf(marks), ["w"]);
    assert.equal(playSheet({ unitId: "shield-captain", enhancementId: "eagles-eye" }).stats.w, "9");
    assert.equal(
      playSheet({ unitId: "shield-captain", enhancementId: "eagles-eye" }).stats.inv,
      "4+",
    );
  });

  it("highlights unit keywords an enhancement grants", () => {
    const marks = characteristicMarks({ unitId: "shield-captain", enhancementId: "hidden-blade" });
    assert.deepEqual(statsOf(marks), []);
    assert.deepEqual([...marks.unitKeywords].sort(), ["Lone Operative", "Stealth"]);
  });

  it("highlights Leadership for a simulacrum and Objective Control for an Ancient's banner", () => {
    const sisters = characteristicMarks({
      unitId: "sisters-squad",
      models: 10,
      gear: { simulacrum: "sim" },
    });
    assert.deepEqual(statsOf(sisters), ["ld"]);
    assert.equal(
      playSheet({ unitId: "sisters-squad", models: 10, gear: { simulacrum: "sim" } }).stats.ld,
      "6+",
    );
    const bare = characteristicMarks({
      unitId: "sisters-squad",
      models: 10,
      gear: { simulacrum: "none" },
    });
    assert.deepEqual(statsOf(bare), []);
    const knights = characteristicMarks({
      unitId: "grey-knights-terminators",
      models: 5,
      gear: { banner: "1" },
    });
    assert.deepEqual(statsOf(knights), ["oc"]);
    assert.equal(
      playSheet({ unitId: "grey-knights-terminators", models: 5, gear: { banner: "1" } }).stats.oc,
      "3",
    );
  });

  it("highlights Ignores Cover only on equipped ranged weapons", () => {
    const marks = characteristicMarks({
      unitId: "corvus",
      gear: { extra: "auspex", centre: "cannon", missiles: "rockets" },
    });
    const cannon = marks.weapons.get(weaponMarkKey("ranged", "Twin assault cannon"));
    assert.equal(keywordMarked(cannon, "Ignores Cover"), true);
    assert.equal(keywordMarked(cannon, "Devastating Wounds"), false);
    assert.equal(marks.weapons.has(weaponMarkKey("melee", "Armoured hull")), false);
    assert.equal(marks.weapons.has(weaponMarkKey("ranged", "Hurricane bolter")), false);
    const sheet = playSheet({
      unitId: "corvus",
      gear: { extra: "auspex", centre: "cannon", missiles: "rockets" },
    });
    assert.match(
      sheet.ranged.find((weapon) => weapon.name === "Twin assault cannon").tags,
      /Ignores Cover/,
    );
    assert.equal(sheet.melee[0].tags, undefined);
    const off = characteristicMarks({ unitId: "corvus", gear: { extra: "none" } });
    assert.equal(off.weapons.size, 0);
  });

  it("highlights the bearer's invulnerable save only while an Astartes shield is selected", () => {
    const on = characteristicMarks({
      unitId: "deathwatch-kt",
      models: 5,
      gear: { sergeant: "shield-bolt" },
    });
    assert.deepEqual(statsOf(on), ["inv"]);
    assert.equal(
      playSheet({ unitId: "deathwatch-kt", models: 5, gear: { sergeant: "shield-bolt" } }).stats
        .inv,
      "4+",
    );
    const off = characteristicMarks({
      unitId: "deathwatch-kt",
      models: 5,
      gear: { sergeant: "bolt-power" },
    });
    assert.deepEqual(statsOf(off), []);
    assert.equal(
      playSheet({ unitId: "deathwatch-kt", models: 5, gear: { sergeant: "bolt-power" } }).stats.inv,
      undefined,
    );
    const aquila = characteristicMarks({
      unitId: "aquila",
      models: 5,
      gear: { "hammer-1": "shield" },
    });
    assert.deepEqual(statsOf(aquila), ["inv"]);
    assert.deepEqual(statsOf(aquila, "Gravis Veteran"), []);
  });

  it("gives an attached leader the squad Vexilla's +1 OC and highlights only that", () => {
    const bodyguard = { unitId: "custodian-guard", gear: { vexilla: "vexilla" } };
    const sheet = playSheet({ unitId: "shield-captain", gear: { weapon: "spear" }, bodyguard });
    assert.equal(sheet.stats.oc, "3");
    assert.equal(sheet.stats.ld, "5+");
    assert.equal(sheet.stats.w, "8");
    const spear = sheet.ranged.find((weapon) => weapon.name === "Guardian spear");
    const melee = sheet.melee.find((weapon) => weapon.name === "Guardian spear");
    assert.equal(spear.a, "2");
    assert.equal(melee.a, "8");
    assert.equal(sheet.melee.some((weapon) => weapon.name === "Castellan axe"), false);
    const marks = characteristicMarks({ unitId: "shield-captain", gear: { weapon: "spear" }, bodyguard });
    assert.deepEqual(statsOf(marks), ["oc"]);
    assert.equal(marks.weapons.size, 0);
    assert.equal(marks.unitKeywords.size, 0);

    const allarus = playSheet({
      unitId: "shield-captain-allarus",
      bodyguard: { unitId: "allarus", gear: { weapon: "spear", vexilla: "vexilla" } },
    });
    assert.equal(allarus.stats.oc, "3");
    assert.equal(allarus.melee.find((weapon) => weapon.name === "Guardian spear").a, "8");
    assert.deepEqual(
      statsOf(
        characteristicMarks({
          unitId: "shield-captain-allarus",
          bodyguard: { unitId: "allarus", gear: { weapon: "spear", vexilla: "vexilla" } },
        }),
      ),
      ["oc"],
    );
  });

  it("clears the inherited OC when the Vexilla is removed or the leader detaches", () => {
    const removed = playSheet({
      unitId: "shield-captain",
      bodyguard: { unitId: "custodian-guard", gear: {} },
    });
    assert.equal(removed.stats.oc, "2");
    assert.deepEqual(
      statsOf(
        characteristicMarks({
          unitId: "shield-captain",
          bodyguard: { unitId: "custodian-guard", gear: {} },
        }),
      ),
      [],
    );
    const detached = playSheet({ unitId: "shield-captain" });
    assert.equal(detached.stats.oc, "2");
    assert.deepEqual(statsOf(characteristicMarks({ unitId: "shield-captain" })), []);
    assert.equal(
      playSheet({ unitId: "custodian-guard", models: 4, gear: { vexilla: "vexilla" } }).stats.oc,
      "4",
    );
  });

  it("does not copy squad weapon mods or bearer-only saves onto the attached leader", () => {
    const scanner = playSheet({
      unitId: "inquisitor",
      gear: { gifts: "wardings" },
      bodyguard: { unitId: "exaction", gear: { scanner: "scanner" } },
    });
    const pistol = scanner.ranged.find((weapon) => weapon.name === "Bolt pistol");
    assert.equal(pistol.tags, "Pistol");
    assert.equal(scanner.stats.oc, "1");
    const scannerMarks = characteristicMarks({
      unitId: "inquisitor",
      gear: { gifts: "wardings" },
      bodyguard: { unitId: "exaction", gear: { scanner: "scanner" } },
    });
    assert.equal(scannerMarks.weapons.size, 0);
    assert.deepEqual(statsOf(scannerMarks), []);
    assert.equal(scannerMarks.unitKeywords.size, 0);

    const watch = playSheet({
      unitId: "watch-master",
      bodyguard: { unitId: "deathwatch-kt", gear: { sergeant: "shield-bolt" } },
    });
    assert.equal(watch.stats.inv, "4+");
    assert.equal(watch.melee.find((weapon) => weapon.name === "Vigil spear").a, "6");
    assert.deepEqual(
      statsOf(
        characteristicMarks({
          unitId: "watch-master",
          bodyguard: { unitId: "deathwatch-kt", gear: { sergeant: "shield-bolt" } },
        }),
      ),
      [],
    );
  });

  it("improves an attached leader's Leadership for a simulacrum and OC for an Ancient's banner", () => {
    const leading = playSheet({
      unitId: "inquisitor",
      bodyguard: { unitId: "sisters-squad", gear: { simulacrum: "sim" } },
    });
    assert.equal(leading.stats.ld, "5+");
    assert.equal(leading.stats.oc, "1");
    assert.deepEqual(
      statsOf(
        characteristicMarks({
          unitId: "inquisitor",
          bodyguard: { unitId: "sisters-squad", gear: { simulacrum: "sim" } },
        }),
      ),
      ["ld"],
    );
    assert.equal(
      playSheet({
        unitId: "inquisitor",
        bodyguard: { unitId: "sisters-squad", gear: { simulacrum: "none" } },
      }).stats.ld,
      "6+",
    );
    const banner = playSheet({
      unitId: "shield-captain",
      bodyguard: { unitId: "grey-knights-terminators", gear: { banner: "1" } },
    });
    assert.equal(banner.stats.oc, "3");
    assert.deepEqual(
      statsOf(
        characteristicMarks({
          unitId: "shield-captain",
          bodyguard: { unitId: "grey-knights-terminators", gear: { banner: "1" } },
        }),
      ),
      ["oc"],
    );
    assert.equal(banner.melee.find((weapon) => weapon.name === "Guardian spear").a, "8");
  });

  it("keeps a leader's own enhancement highlight beside an inherited squad characteristic", () => {
    const bodyguard = { unitId: "wardens", gear: { weapon: "spear", vexilla: "vexilla" } };
    const sheet = playSheet({
      unitId: "shield-captain",
      enhancementId: "eagles-eye",
      bodyguard,
    });
    assert.equal(sheet.stats.w, "9");
    assert.equal(sheet.stats.oc, "3");
    assert.deepEqual(
      statsOf(characteristicMarks({ unitId: "shield-captain", enhancementId: "eagles-eye", bodyguard })),
      ["oc", "w"],
    );
    assert.equal(sheet.melee.find((weapon) => weapon.name === "Guardian spear").a, "8");
  });

  it("does not highlight roll modifiers or abilities that are not profile characteristics", () => {
    for (const enhancementId of [
      "bane",
      "castellan",
      "edge",
      "mantle",
      "auric-eagle",
      "augury",
      "warding",
      "oblivion",
    ]) {
      const marks = characteristicMarks({ unitId: "shield-captain", enhancementId });
      assert.equal(marks.unit.size, 0, enhancementId);
      assert.equal(marks.weapons.size, 0, enhancementId);
      assert.equal(marks.unitKeywords.size, 0, enhancementId);
    }
  });
});
