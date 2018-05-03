const ChessUtils = require("./ChessUtils");

const chess = new ChessUtils();

/**
 * Pick a random legal move but prefer mates, checks and captures.
 */
class LegalMovePlayer {

  getNextMove(moves) {
    chess.reset();
    chess.applyMoves(moves);
    const legalMoves = chess.legalMoves();
    const mates = legalMoves.filter(move => /\#/.test(move.san));
    const checks = legalMoves.filter(move => /\+/.test(move.san));
    const captures = legalMoves.filter(move => /x/.test(move.san));

    if (mates.length) {
      return this.getRandomMove(mates);
    }

    if (checks.length) {
      return this.getRandomMove(checks);
    }

    if (captures.length) {
      return this.getRandomMove(captures);
    }

    if (legalMoves.length) {
      return this.getRandomMove(legalMoves);
    }
  }

  getReply(chat) {
    return "hi";
  }

  getRandomMove(moves) {
    return chess.uci(moves[Math.floor(Math.random() * moves.length)]);
  }
}

module.exports = LegalMovePlayer;
