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

  squaresOfColour(fen, colour) {
    var chess = new Chess(fen);
    return allSquares.filter(square => {
      var r = chess.get(square);
      return r && r.color === colour;
    });
  }

  squareOfKing(fen, colour) {
    return this.squaresOfPiece(fen, colour, "k");
  }

  squaresOfPiece(fen, colour, pieceType) {
    return this.squaresOfColour(fen, colour).find(square => chess.get(square).type.toLowerCase() === pieceType);
  }

  coordinates(square) {
    return { x: square.charCodeAt(0) - "a".charCodeAt(0) + 1, y: Number(square.substring(1, 2)) };
  }

  distance(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  }

}

module.exports = ChessUtils;
