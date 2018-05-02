const test = require("tape");

const ChessUtils = require("../src/ChessUtils");
const chess = new ChessUtils();

const initialPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

test("uci", function(t) {
  t.equal(chess.uci({from:"e2", to:"e4"}), "e2e4", "pawn to e4");
  t.equal(chess.uci({from:"a7", to:"a8", flags:"p", piece:"q"}), "a7a8q", "promote to queen on a8");
  t.end();
});

test("fen", function(t) {
  chess.reset();
  chess.applyMoves([]);
  t.equal(chess.fen(), initialPosition, "no moves gives initial position");
  t.end();
});

test("legalMoves", function(t) {
  chess.reset();
  t.equal(chess.legalMoves().length, 20, "20 legal moves at start of game");
  t.end();
});

test("squaresOfColour", function(t) {
  chess.reset();
  t.equal(chess.squaresOf("w").length, 16, "16 white squares");
  t.equal(chess.squaresOf("b").length, 16, "16 black squares");
  t.end();
});

test("squareOfKing", function(t) {
  chess.reset();
  t.equal(chess.squareOfKing(), "e1", "white king on e1");
  t.equal(chess.squareOfOpponentsKing(), "e8", "black king on e8");
  t.end();
});

test("coordinates", function(t) {
  t.deepEqual(chess.coordinates("a1"), {x:1,y:1}, "at at 1,1");
  t.end();
});

test("distance", function(t) {
  const a1 = chess.coordinates("a1");
  const a8 = chess.coordinates("a8");
  t.equal(chess.distance(a1,a1), 0, "0 distance same square");
  t.equal(chess.distance(a1,a8), 7, "7 distance between a1 a8");
  t.end();
});
