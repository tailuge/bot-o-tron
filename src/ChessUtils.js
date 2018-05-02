const Chess = require("chess.js").Chess;

const chess = new Chess();
const allSquares = chess.SQUARES;

/**
 * Utility functions for creating simple chess bots.
 */
class ChessUtils {

  /**
   * Convert a chess.js move to a uci move
   */
  uci(move) {
    return move.from + move.to + (move.flags === "p" ? move.piece : "");
  }

  /**
   * Legal moves after array of uci moves played from initial position.
   */
  legalMoves(moves) {
    chess.reset();
    moves.forEach(move => chess.move(move, { sloppy: true }));
    return chess.moves({ verbose: true });
  }  

  piecesForColour(fen, colour) {
    var chess = new Chess(fen);
    return allSquares.filter(square => {
      var r = chess.get(square);
      return r && r.color == colour;
    });
  }

}

module.exports = ChessUtils;
