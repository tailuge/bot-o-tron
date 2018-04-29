const Chess = require("chess.js").Chess;

var chess = new Chess();

/**
 * Pick a random legal move but prefer checks and mates.
 */
class LegalMovePlayer {

  getNextMove(moves) {
    var legalMoves = this.getLegalMoves(moves);
    var mates = legalMoves.filter(move => /\#/.test(move.san));
    var checks = legalMoves.filter(move => /\+/.test(move.san));

    if (mates.length) {
      return this.getRandomMove(mates);
    }

    if (checks.length) {
      return this.getRandomMove(checks);
    }

    if (legalMoves.length) {
      return this.getRandomMove(legalMoves);
    }
  }

  getReply(chat) {
    return "hi";
  }

  getLegalMoves(moves) {
    chess.reset();
    moves.forEach(move => chess.move(move, { sloppy: true }));
    return chess.moves({ verbose: true });
  }  
  
  getRandomMove(moves) {
    var move = moves[Math.floor(Math.random() * moves.length)];
    return move.from + move.to + (move.flags === "p" ? move.piece : "");
  }
}

module.exports = LegalMovePlayer;
