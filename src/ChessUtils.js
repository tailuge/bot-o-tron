const Chess = require("chess.js").Chess;


/**
 * Wraps chess.js with useful extras.
 */
class ChessUtils {

  constructor() {
    this.chess = new Chess();
  }

  reset() {
    this.chess.reset();
  }

  applyMoves(moves) {
    moves.forEach(move => this.chess.move(move, { sloppy: true }));
  }

  /**
   * Convert a chess.js move to a uci move
   */
  uci(move) {
    return move.from + move.to + (move.flags === "p" ? move.piece : "");
  }

  /**
   * Legal moves from current position.
   */
  legalMoves() {
    return this.chess.moves({ verbose: true });
  }

  fen() {
    return this.chess.fen();
  }

  move(move) {
    this.chess.move(move);
  }

  undo() {
    this.chess.undo();
  }

  turn() {
    return this.chess.turn();
  }

  squaresOf(colour) {
    return this.chess.SQUARES.filter(square => {
      const r = this.chess.get(square);
      return r && r.color === colour;
    });
  }

  squareOfKing() {
    return this.squaresOfPiece(this.chess.turn(), "k");
  }

  squareOfOpponentsKing() {
    return this.squaresOfPiece(this.otherPlayer(this.chess.turn()), "k");
  }

  squaresOfPiece(colour, pieceType) {
    return this.squaresOf(colour).find(square => this.chess.get(square).type.toLowerCase() === pieceType);
  }

  coordinates(square) {
    return { x: square.charCodeAt(0) - "a".charCodeAt(0) + 1, y: Number(square.substring(1, 2)) };
  }

  distance(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  }

  otherPlayer(colour) {
    return colour === "w" ? "b" : "w";
  }
}

module.exports = ChessUtils;
