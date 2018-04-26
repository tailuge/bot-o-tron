const Chess = require("chess.js").Chess;

var chess = new Chess();

class LegalMovePlayer {

  getNextMove(moves) {
    chess.reset();
    moves.split(" ").forEach(move => chess.move(move, { sloppy: true }));
    var legalMoves = chess.moves({ verbose: true });
    if (legalMoves.length === 0) {
      return undefined;
    }
    var move = legalMoves[0];
    var uciMove = move.from + move.to + (move.flags === "p" ? move.piece : "");
    return uciMove;
  }

}

module.exports = LegalMovePlayer;
