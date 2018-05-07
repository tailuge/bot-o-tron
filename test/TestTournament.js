const test = require("tape");

const Tournament = require("../src/tournament/Tournament");
const LegalMovePlayer = require("../src/bots/LegalMovePlayer");

const player1 = new LegalMovePlayer();
const player2 = new LegalMovePlayer();

test("Tournament starts at zero", function(t) {
  const tournament = new Tournament([player1, player2], 1, 2);
  t.deepEqual(tournament.getScores(), [0, 0], "scores starts at [0,0]");
  tournament.play();
  t.deepEqual(tournament.getScores(), [1, 1], "scores after 2 rounds of draws is [1,1]");
  t.end();
});
