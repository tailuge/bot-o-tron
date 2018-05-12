const test = require("tape");
const RandomPlayer = require("../src/bots/RandomPlayer");

const player = new RandomPlayer();

"use strict";

test("getReply", function(t) {
  t.equal(player.getReply({}), "hi", "says hi");
  t.end();
});

test("getNextMove", function(t) {
  t.ok(player.getNextMove([]), "move played from initial position");
  t.notOk(player.getNextMove(["e2e4", "a7a6", "f1c4", "a8a7", "d1h5", "a7a8", "c4f7"]), "no moves available");
  t.end();
});
