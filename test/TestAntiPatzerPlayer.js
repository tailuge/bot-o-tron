const tap = require("tap");
const AntiPatzerPlayer = require("../src/bots/AntiPatzerPlayer");

const player = new AntiPatzerPlayer();

"use strict";

tap.test("getReply", function(t) {
  t.equal(player.getReply({}), "AntiPatzerPlayer", "chat implemented");
  t.end();
});

tap.test("getNextMove", function(t) {
  t.ok(player.getNextMove([]), "uci move played from initial position");
  t.notOk(player.getNextMove(["e2e4", "a7a6", "f1c4", "a8a7", "d1h5", "a7a8", "c4f7"]), "no moves available");
  t.end();
});

tap.test("getNextMove mate blocked", function(t) {
  t.match(player.getNextMove(["e4", "e5", "Bc4", "Na6", "Qf3"]), /d8f6|g8f6/, "mate is blocked");
  t.end();
});
