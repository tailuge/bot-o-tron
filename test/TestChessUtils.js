const test = require("tape");

const ChessUtils = require("../src/ChessUtils");
const chessUtils = new ChessUtils();

const initial_position = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

test("uci", function(t) {
  t.equal(chessUtils.uci({from:"e2", to:"e4"}), "e2e4", "pawn to e4");
  t.equal(chessUtils.uci({from:"a7", to:"a8", flags:"p", piece:"q"}), "a7a8q", "promote to queen on a8");
  t.end();
});

test("piecesForColour", function(t) {
  t.equal(chessUtils.piecesForColour(initial_position, "w").length, 16, "16 white pieces");
  t.equal(chessUtils.piecesForColour(initial_position, "b").length, 16, "16 black pieces");
  t.end();
});

test("legalMoves", function(t) {
  t.equal(chessUtils.legalMoves([]).length, 20, "20 legal moves at start of game");
  t.end();
});

