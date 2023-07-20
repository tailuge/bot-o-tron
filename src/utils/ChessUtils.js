const Chess = require("chess.js").Chess

/**
 * Wraps chess.js with useful extras.
 */
class ChessUtils {
  constructor(
    fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
  ) {
    this.chess = new Chess(fen)
    // prettier-ignore
    this.SQUARES = [
          'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
          'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
          'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
          'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
          'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
          'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
          'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
          'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'
    ]
  }

  reset() {
    this.chess.reset()
  }

  applyMoves(moves) {
    moves.forEach((move) => this.chess.move(move, { sloppy: true }))
  }

  /**
   * Convert a chess.js move to a uci move
   */
  uci(move) {
    return move.from + move.to + (move.flags === "p" ? move.piece : "")
  }

  /**
   * Legal moves from current position.
   */
  legalMoves() {
    return this.chess.moves({ verbose: true })
  }

  fen() {
    return this.chess.fen()
  }

  move(move) {
    this.chess.move(move)
  }

  undo() {
    this.chess.undo()
  }

  turn() {
    return this.chess.turn()
  }

  squaresOf(colour) {
    return this.SQUARES.filter((square) => {
      const r = this.chess.get(square)
      return r && r.color === colour
    })
  }

  squareOfKing() {
    return this.squaresOfPiece(this.chess.turn(), "k")
  }

  squareOfOpponentsKing() {
    return this.squaresOfPiece(this.otherPlayer(this.chess.turn()), "k")
  }

  squaresOfPiece(colour, pieceType) {
    return this.squaresOf(colour).find(
      (square) => this.chess.get(square).type.toLowerCase() === pieceType
    )
  }

  coordinates(square) {
    return {
      x: square.charCodeAt(0) - "a".charCodeAt(0) + 1,
      y: Number(square.substring(1, 2)),
    }
  }

  distance(a, b) {
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
  }

  manhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
  }

  euclideanDistance(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y
    return Math.sqrt(dx * dx + dy * dy)
  }

  otherPlayer(colour) {
    return colour === "w" ? "b" : "w"
  }

  pickRandomMove(moves) {
    return this.uci(moves[Math.floor(Math.random() * moves.length)])
  }

  filterForcing(legalMoves) {
    const mates = legalMoves.filter((move) => /#/.test(move.san))
    return mates.length
      ? mates
      : legalMoves.filter((move) => /\+/.test(move.san))
  }

  inCheckmate() {
    return this.chess.isCheckmate()
  }

  inStalemate() {
    return this.chess.isStalemate()
  }

  materialEval() {
    return this.material("w") - this.material("b")
  }

  material(colour) {
    const valueOf = { p: 1, n: 3, b: 3, r: 6, q: 9, k: 0 }
    return this.squaresOf(colour)
      .map((square) => valueOf[this.chess.get(square).type])
      .reduce((a, b) => a + b)
  }
}

module.exports = ChessUtils
