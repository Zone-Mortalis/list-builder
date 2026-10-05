import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { enhancementById } from "./enhancements.ts";
import { APP_VERSION_LABEL } from "../lib/app-version.ts";
import {
  LEGACY_ROSTER_KEY,
  LIBRARY_BACKUP_KEY,
  LIBRARY_KEY,
  LIBRARY_VERSION,
  LIBRARY_VERSION_KEY,
  loadSavedLibrary,
  retargetAttachment,
  rosterFrom,
  settle,
  withoutEntry,
  type Entry,
  type KeyValueStore,
  type Roster,
} from "./saved-library.ts";
import { canLead, gearPoints, isSupport, squadCost, unitById } from "./units.ts";

const libraryFixture = readFileSync(new URL("./fixtures/shield-host-library-v1.json", import.meta.url), "utf8");
const legacyFixture = readFileSync(new URL("./fixtures/shield-host-roster-v1.json", import.meta.url), "utf8");

function memory(initial: Record<string, string> = {}): KeyValueStore & { data: Record<string, string> } {
  const data = { ...initial };
  return {
    data,
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key]! : null;
    },
    setItem(key, value) {
      data[key] = value;
    },
  };
}

function roster(entries: Entry[], extra: Partial<Roster> = {}): Roster {
  return {
    name: "Test",
    limit: 2000,
    detachments: [],
    building: true,
    entries,
    ...extra,
  };
}

function costOf(entries: Entry[]): number {
  const seen = new Map<string, number>();
  let total = 0;
  const ordered = [...entries].sort((left, right) => (left.addedAt ?? 0) - (right.addedAt ?? 0) || left.id.localeCompare(right.id));
  for (const entry of ordered) {
    const unit = unitById(entry.unitId);
    if (!unit) continue;
    const copy = seen.get(entry.unitId) ?? 0;
    seen.set(entry.unitId, copy + 1);
    const enhancement = entry.enhancementId ? (enhancementById(entry.enhancementId)?.points ?? 0) : 0;
    total += squadCost(unit, entry.models, copy) + enhancement + gearPoints(entry.unitId, entry.gear, entry.models);
  }
  return total;
}

describe("saved library storage", () => {
  it("keeps the historical storage keys", () => {
    assert.equal(LIBRARY_KEY, "shield-host-library-v1");
    assert.equal(LEGACY_ROSTER_KEY, "shield-host-roster-v1");
    assert.equal(LIBRARY_VERSION, 2);
  });

  it("loads a pre-Support library intact, including a Knight-Centura who was attached as a Leader", () => {
    const storage = memory({ [LIBRARY_KEY]: libraryFixture });
    const loaded = loadSavedLibrary(storage);
    assert.equal(loaded.persist, true);
    assert.equal(storage.getItem(LIBRARY_BACKUP_KEY), libraryFixture);
    assert.equal(storage.getItem(LIBRARY_KEY), libraryFixture);
    assert.equal(storage.getItem(LIBRARY_VERSION_KEY), "2");
    assert.equal(loaded.lists.length, 2);

    const vigil = loaded.lists.find((list) => list.id === "list-vigil");
    const flock = loaded.lists.find((list) => list.id === "list-sisters");
    assert.ok(vigil);
    assert.ok(flock);
    assert.equal(vigil.name, "Null Vigil");
    assert.equal(vigil.warlordId, "centura");
    assert.deepEqual(vigil.detachments, ["vigil"]);
    assert.equal(vigil.mainDisposition, "Disruption");
    assert.deepEqual(
      vigil.entries.map((entry) => entry.id),
      ["centura", "squad", "captain", "wardens"],
    );
    const centura = vigil.entries.find((entry) => entry.id === "centura");
    const squad = vigil.entries.find((entry) => entry.id === "squad");
    const captain = vigil.entries.find((entry) => entry.id === "captain");
    const wardens = vigil.entries.find((entry) => entry.id === "wardens");
    assert.equal(centura?.unitId, "knight-centura");
    assert.equal(centura?.attachedTo, "squad");
    assert.equal(centura?.enhancementId, "huntress");
    assert.deepEqual(centura?.gear, { weapon: "blade" });
    assert.equal(isSupport("knight-centura"), true);
    assert.equal(canLead("knight-centura", "vigilators"), false);
    assert.equal(squad?.unitId, "vigilators");
    assert.equal(squad?.models, 4);
    assert.equal(captain?.attachedTo, "wardens");
    assert.deepEqual(captain?.gear, { weapon: "spear" });
    assert.deepEqual(wardens?.gear, { vexilla: "vexilla" });
    assert.equal(costOf(vigil.entries), 590);

    assert.equal(flock.name, "Priest's Flock");
    assert.equal(flock.warlordId, "priest");
    assert.equal(flock.mainDisposition, "Purge the Foe");
    assert.equal(flock.entries.find((entry) => entry.id === "priest")?.attachedTo, "sisters");
    assert.equal(flock.entries.find((entry) => entry.id === "sisters")?.models, 10);
    assert.deepEqual(flock.entries.find((entry) => entry.id === "priest")?.gear, { armament: "vindictor" });
    assert.equal(costOf(flock.entries), 150);
  });

  it("does not overwrite the backup on a later load", () => {
    const storage = memory({
      [LIBRARY_KEY]: libraryFixture,
      [LIBRARY_BACKUP_KEY]: "first-snapshot",
      [LIBRARY_VERSION_KEY]: "2",
    });
    const loaded = loadSavedLibrary(storage);
    assert.equal(loaded.persist, true);
    assert.equal(storage.getItem(LIBRARY_BACKUP_KEY), "first-snapshot");
    assert.equal(loaded.lists.length, 2);
  });

  it("migrates the legacy single-roster key without deleting it", () => {
    const storage = memory({ [LEGACY_ROSTER_KEY]: legacyFixture });
    const loaded = loadSavedLibrary(storage);
    assert.equal(loaded.persist, true);
    assert.equal(storage.getItem(LIBRARY_BACKUP_KEY), legacyFixture);
    assert.equal(storage.getItem(LEGACY_ROSTER_KEY), legacyFixture);
    assert.equal(storage.getItem(LIBRARY_KEY), null);
    assert.equal(loaded.lists.length, 1);
    const list = loaded.lists[0]!;
    assert.equal(list.name, "Old Roster");
    assert.equal(list.warlordId, "centura");
    assert.equal(list.entries.find((entry) => entry.id === "centura")?.attachedTo, "squad");
    assert.deepEqual(list.entries.find((entry) => entry.id === "centura")?.gear, { weapon: "flamer" });
    assert.equal(list.entries.find((entry) => entry.id === "squad")?.models, 5);
  });

  it("refuses to replace a library that cannot be parsed", () => {
    const storage = memory({ [LIBRARY_KEY]: "{not json" });
    const loaded = loadSavedLibrary(storage);
    assert.equal(loaded.persist, false);
    assert.deepEqual(loaded.lists, []);
    assert.equal(storage.getItem(LIBRARY_KEY), "{not json");
    assert.equal(storage.getItem(LIBRARY_BACKUP_KEY), "{not json");
    assert.equal(storage.getItem(LIBRARY_VERSION_KEY), null);
  });

  it("does not invent a backup for an empty library", () => {
    const storage = memory();
    const loaded = loadSavedLibrary(storage);
    assert.equal(loaded.persist, true);
    assert.deepEqual(loaded.lists, []);
    assert.equal(storage.getItem(LIBRARY_BACKUP_KEY), null);
    assert.equal(storage.getItem(LIBRARY_VERSION_KEY), "2");
  });
});

describe("attachment changes", () => {
  const sisters: Entry = { id: "sisters", unitId: "sisters-squad", models: 10, addedAt: 1 };
  const exaction: Entry = { id: "exaction", unitId: "exaction", models: 11, addedAt: 2 };
  const leader: Entry = { id: "leader", unitId: "inquisitor", models: 1, addedAt: 3 };
  const priest: Entry = { id: "priest", unitId: "ministorum-priest", models: 1, addedAt: 4, enhancementId: "castellan" };

  function settled(entries: Entry[], detachments: string[] = ["guardians"]) {
    return settle(roster(entries, { detachments }));
  }

  it("lets Support join before or after a Leader, and keeps Support when the Leader leaves", () => {
    const supportFirst = settled(retargetAttachment(retargetAttachment([sisters, priest, leader], "priest", "sisters"), "leader", "sisters"));
    assert.equal(supportFirst.entries.find((entry) => entry.id === "priest")?.attachedTo, "sisters");
    assert.equal(supportFirst.entries.find((entry) => entry.id === "leader")?.attachedTo, "sisters");

    const leaderFirst = settled(retargetAttachment(retargetAttachment([sisters, leader, priest], "leader", "sisters"), "priest", "sisters"));
    assert.equal(leaderFirst.entries.find((entry) => entry.id === "priest")?.attachedTo, "sisters");
    assert.equal(leaderFirst.entries.find((entry) => entry.id === "leader")?.attachedTo, "sisters");

    const leaderGone = settled(withoutEntry(leaderFirst.entries, "leader"));
    assert.equal(leaderGone.entries.find((entry) => entry.id === "priest")?.attachedTo, "sisters");
    assert.equal(leaderGone.entries.some((entry) => entry.id === "leader"), false);

    const supportGone = settled(withoutEntry(leaderFirst.entries, "priest"));
    assert.equal(supportGone.entries.find((entry) => entry.id === "leader")?.attachedTo, "sisters");
    assert.equal(supportGone.entries.some((entry) => entry.id === "priest"), false);
  });

  it("keeps every model when a second Support or Leader is refused, or the bodyguard is deleted", () => {
    const twoSupports = settled([
      sisters,
      { ...priest, id: "priest-a", addedAt: 4 },
      { ...priest, id: "priest-b", addedAt: 5, attachedTo: "sisters" },
    ].map((entry, index) => (index === 1 ? { ...entry, attachedTo: "sisters" } : entry)));
    assert.deepEqual(
      twoSupports.entries.map((entry) => entry.id).sort(),
      ["priest-a", "priest-b", "sisters"],
    );
    assert.deepEqual(
      twoSupports.entries.filter((entry) => entry.attachedTo === "sisters").map((entry) => entry.id),
      ["priest-a"],
    );

    const twoLeaders = settled([
      sisters,
      { ...leader, id: "inq-a", attachedTo: "sisters" },
      { id: "inq-b", unitId: "greyfax", models: 1, addedAt: 6, attachedTo: "sisters" },
    ]);
    assert.equal(twoLeaders.entries.length, 3);
    assert.deepEqual(
      twoLeaders.entries.filter((entry) => entry.attachedTo === "sisters").map((entry) => entry.id),
      ["inq-a"],
    );

    const bodyGone = settled(withoutEntry([sisters, { ...priest, attachedTo: "sisters" }, { ...leader, attachedTo: "sisters" }], "sisters"));
    assert.equal(bodyGone.entries.length, 2);
    assert.equal(bodyGone.entries.every((entry) => entry.attachedTo == null), true);
  });

  it("moves Support to another legal squad and will not join an ineligible one", () => {
    const joined = retargetAttachment([sisters, exaction, priest], "priest", "sisters");
    const moved = settled(retargetAttachment(joined, "priest", "exaction"));
    assert.equal(moved.entries.find((entry) => entry.id === "priest")?.attachedTo, "exaction");
    assert.equal(moved.entries.filter((entry) => entry.attachedTo === "sisters").length, 0);

    const illegal = rosterFrom({
      name: "Illegal",
      limit: 2000,
      detachments: ["guardians"],
      building: true,
      entries: [
        { id: "priest", unitId: "ministorum-priest", models: 1, attachedTo: "wardens" },
        { id: "wardens", unitId: "wardens", models: 3 },
      ],
    });
    assert.equal(illegal.entries.length, 2);
    assert.equal(illegal.entries.find((entry) => entry.id === "priest")?.attachedTo, undefined);
  });

  it("drops the joining character's enhancement when the group already has one", () => {
    const body: Entry = { id: "sisters", unitId: "sisters-squad", models: 10, enhancementId: "castellan" };
    const next = retargetAttachment([body, { ...priest, enhancementId: "huntress" }], "priest", "sisters");
    assert.equal(next.find((entry) => entry.id === "priest")?.enhancementId, undefined);
    assert.equal(next.find((entry) => entry.id === "sisters")?.enhancementId, "castellan");
  });
});

describe("release label", () => {
  it("is the home-screen string", () => {
    assert.equal(APP_VERSION_LABEL, "Mortal's Version 1.4.5");
  });
});
