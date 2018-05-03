const test = require("tape");
const SwarmKingPlayer = require("../src/SwarmKingPlayer");
const ChessUtils = require("../src/ChessUtils");

const player = new SwarmKingPlayer();
const chess = new ChessUtils();

test("getReply", function(t) {
  t.equal(player.getReply({}), "swarm the king!", "chat says swarm the king!");
  t.end();
});

test("getNextMove", function(t) {
  const mate = player.getNextMove(["e2e4", "a7a6", "f1c4", "a8a7", "d1h5", "a7a8"]);
  t.ok(mate === "h5f7" || mate === "c4f7", "mate is played when available");
  t.ok(player.getNextMove([]), "a move is played when available");
  t.notOk(player.getNextMove(["e2e4", "a7a6", "f1c4", "a8a7", "d1h5", "a7a8", "c4f7"]), "no moves available");
  t.end();
});

test("distanceMetric", function(t) {
  chess.reset();
  const colour = chess.turn();
  const opponentsKingSquare = chess.squareOfOpponentsKing();
  t.equals(player.distanceMetric(chess, opponentsKingSquare, colour), 24, "distance to king metric is 24");
  chess.applyMoves(["e2e4"]);
  t.equals(player.distanceMetric(chess, opponentsKingSquare, colour), 26, "distance to king metric is 26");
  chess.applyMoves(["a7a6"]);
  t.equals(player.distanceMetric(chess, opponentsKingSquare, colour), 26, "distance to king metric is 26");
  t.end();
});
