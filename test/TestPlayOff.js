const test = require("tape");

const PlayOff = require("../src/PlayOff");
const LegalMovePlayer = require("../src/LegalMovePlayer");

const player1 = new LegalMovePlayer();
const player2 = new LegalMovePlayer();

test("playOff draw", function(t) {
  const playOff = new PlayOff(player1, player2);
  t.equal(playOff.score(player1), 0.5, "score starts at 0.5");
  t.equal(playOff.score(player2), 0.5, "score starts at 0.5");
  playOff.play(1);
  t.equal(playOff.score(player1), 0.5, "draw after 1 move each");
  t.equal(playOff.score(player2), 0.5, "draw after 1 move each");
  t.end();
});

test("playOff white win", function(t) {
  const playOff = new PlayOff(player1, player2, ["e2e4", "a7a6", "f1c4", "a8a7", "d1h5", "a7a8"]);
  playOff.play(8);
  t.equal(playOff.score(player1), 1, "white win checkmate");
//  t.equal(playOff.score(player2), 0, "black loss checkmate");
  t.end();
});




test("makeMove", function(t) {
  const playOff = new PlayOff(player1, player2);
  t.equal(playOff.makeMove(player1, player2, []), true, "move is played at start");
  t.end();
});
