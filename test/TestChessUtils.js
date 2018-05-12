const tap = require("tap");

const ChessUtils = require("../src/utils/ChessUtils");
const chess = new ChessUtils();

const a1 = chess.coordinates("a1");
const a8 = chess.coordinates("a8");
const b8 = chess.coordinates("b8");

const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";


tap.beforeEach(function(t) {
  chess.reset();
  t();
});

tap.test("uci", function(t) {
  t.equal(chess.uci({ from: "e2", to: "e4" }), "e2e4", "pawn to e4");
  t.equal(chess.uci({ from: "a7", to: "a8", flags: "p", piece: "q" }), "a7a8q", "promote to queen on a8");
  t.end();
});

tap.test("fen", function(t) {
  chess.applyMoves([]);
  t.equal(chess.fen(), initialPosition, "no moves gives initial position");
  t.end();
});

tap.test("legalMoves", function(t) {
  t.equal(chess.legalMoves().length, 20, "20 legal moves at start of game");
  t.end();
});

tap.test("squaresOfColour", function(t) {
  t.equal(chess.squaresOf("w").length, 16, "16 white squares");
  t.equal(chess.squaresOf("b").length, 16, "16 black squares");
  t.end();
});

tap.test("squareOfKing", function(t) {
  t.equal(chess.squareOfKing(), "e1", "white king on e1");
  t.equal(chess.squareOfOpponentsKing(), "e8", "black king on e8");
  t.end();
});

tap.test("coordinates", function(t) {
  t.deepEqual(chess.coordinates("a1"), { x: 1, y: 1 }, "at at 1,1");
  t.end();
});

tap.test("distance", function(t) {
  t.equal(chess.distance(a1, a1), 0, "0 distance same square");
  t.equal(chess.distance(a1, a8), 7, "7 distance between a1 a8");
  t.equal(chess.distance(a1, b8), 7, "7 distance between a1 b8");
  t.end();
});

tap.test("manhattanDistance", function(t) {
  t.equal(chess.manhattanDistance(a1, a1), 0, "0 manhattanDistance same square");
  t.equal(chess.manhattanDistance(a1, a8), 7, "7 manhattanDistance between a1 a8");
  t.equal(chess.manhattanDistance(a1, b8), 8, "8 manhattanDistance between a1 a8");
  t.end();
});

tap.test("euclideanDistance", function(t) {
  t.equal(chess.euclideanDistance(a1, a1), 0, "0 euclideanDistance same square");
  t.equal(chess.euclideanDistance(a1, a8), 7, "7 euclideanDistance between a1 a8");
  t.equal(chess.euclideanDistance(a1, b8), Math.sqrt(7 * 7 + 1), "7.071 euclideanDistance between a1 a8");
  t.end();
});

tap.test("otherPlayer", function(t) {
  t.equal(chess.otherPlayer("w"), "b", "w -> b");
  t.equal(chess.otherPlayer("b"), "w", "b -> w");
  t.end();
});

tap.test("material", function(t) {
  t.equal(chess.material("w"), chess.material("b"), "material equal at start");
  t.end();
});

tap.test("materialEval", function(t) {
  t.equal(chess.materialEval(), 0, "eval 0 at start");
  t.end();
});
