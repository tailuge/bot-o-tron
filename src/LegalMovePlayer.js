const ChessUtils = require("./ChessUtils");

const chessUtils = new ChessUtils();

/**
 * Pick a random legal move but prefer checks and mates.
 */
class LegalMovePlayer {

  getNextMove(moves) {
    var legalMoves = chessUtils.legalMoves(moves);
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

  getRandomMove(moves) {
    return chessUtils.uci(moves[Math.floor(Math.random() * moves.length)]);
  }
}

module.exports = LegalMovePlayer;
