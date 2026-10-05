import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { MISSIONS, matchedPair } from "./missions.ts";

const DISPOSITIONS = [
  "Take and Hold",
  "Purge the Foe",
  "Disruption",
  "Reconnaissance",
  "Priority Assets",
] as const;

describe("mission pairing reciprocity", () => {
  it("uses the opponent's number for your card and yours for theirs", () => {
    assert.deepEqual(
      MISSIONS.map((mission) => mission.name),
      [...DISPOSITIONS],
    );

    for (const [yourNumber, yours] of DISPOSITIONS.entries()) {
      for (const [theirNumber, theirs] of DISPOSITIONS.entries()) {
        const pair = matchedPair(yours, theirs);
        const yourDeck = MISSIONS[yourNumber];
        const theirDeck = MISSIONS[theirNumber];
        assert.ok(pair, `${yours} vs ${theirs}`);
        assert.equal(pair.yours.id, yourDeck.cards[theirNumber]?.id);
        assert.equal(pair.theirs.id, theirDeck.cards[yourNumber]?.id);
      }
    }
  });

  it("matches each pair from both sides", () => {
    for (const yours of DISPOSITIONS) {
      for (const theirs of DISPOSITIONS) {
        const forward = matchedPair(yours, theirs);
        const back = matchedPair(theirs, yours);
        assert.ok(forward);
        assert.ok(back);
        assert.equal(forward.yours.id, back.theirs.id);
        assert.equal(forward.theirs.id, back.yours.id);
      }
    }
  });

  it("pairs Priority Assets with the reciprocal cards", () => {
    const expected = [
      ["Take and Hold", "Secure Asset", "Inescapable Dominion"],
      ["Purge the Foe", "Vital Link", "Destroyer's Wrath"],
      ["Disruption", "Extract Relic", "Locate and Deny"],
      ["Reconnaissance", "Vanguard Operation", "Search and Scour"],
      ["Priority Assets", "Sabotage", "Sabotage"],
    ] as const;

    for (const [opponent, yourCard, theirCard] of expected) {
      const pair = matchedPair("Priority Assets", opponent);
      assert.ok(pair);
      assert.equal(pair.yours.name, yourCard);
      assert.equal(pair.theirs.name, theirCard);
    }
  });
});
