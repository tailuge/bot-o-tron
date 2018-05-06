const test = require("tape");

const PlayOff = require("../src/PlayOff");
const LegalMovePlayer = require("../src/LegalMovePlayer");

const player1 = new LegalMovePlayer();
const player2 = new LegalMovePlayer();

test("playOff", function(t) {
  const playOff = new PlayOff(player1, player2);
  t.equal(playOff.score(player1), 0.5, "score starts at 0.5");
  t.equal(playOff.score(player2), 0.5, "score starts at 0.5");
  playOff.play(1);
  t.equal(playOff.score(player1), 0.5, "draw after 1 move each");
  t.equal(playOff.score(player2), 0.5, "draw after 1 move each");
  t.end();
});

test("makeMove", function(t) {
  const playOff = new PlayOff(player1, player2);
  t.equal(playOff.makeMove(player1, player2, []), true, "move is played at start");
  t.end();
});
