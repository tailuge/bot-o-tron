const test = require("tape");

const Tournament = require("../src/tournament/Tournament");
const RandomPlayer = require("../src/bots/RandomPlayer");

const player1 = new RandomPlayer();
const player2 = new RandomPlayer();

"use strict";

test("Tournament starts at zero", function(t) {
  const tournament = new Tournament([player1, player2], 2);
  t.deepEqual(tournament.getScores(), [0, 0], "scores starts at [0,0]");
  tournament.playRound();
  t.deepEqual(tournament.getScores(), [1, 1], "scores after 2 rounds of draws is [1,1]");
  t.equal(tournament.getRank().length, 2, "two players ranked");
  t.end();
});
