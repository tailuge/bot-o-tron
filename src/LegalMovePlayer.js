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
      return chess.pickRandomMove(mates);
    }

    if (checks.length) {
      return chess.pickRandomMove(checks);
    }

    if (captures.length) {
      return chess.pickRandomMove(captures);
    }

    if (legalMoves.length) {
      return chess.pickRandomMove(legalMoves);
    }
  }

  getReply(chat) {
    return "hi";
  }

}

module.exports = LegalMovePlayer;
