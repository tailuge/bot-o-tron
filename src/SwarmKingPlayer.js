const ChessUtils = require("./ChessUtils");

const chess = new ChessUtils();

/**
 * Move pieces closer to own king - mate and capture if possible.
 */
class SwarmKingPlayer {

  getNextMove(moves) {
    chess.reset();
    chess.applyMoves(moves);
    var legalMoves = chess.legalMoves();
    const mates = legalMoves.filter(move => /\#/.test(move.san));
    const captures = legalMoves.filter(move => /x/.test(move.san));

    if (mates.length) {
      return this.getRandomMove(mates);
    }

    if (captures.length) {
      return this.getRandomMove(captures);
    }

    legalMoves = this.removeReverseMoves(moves, legalMoves);

    if (legalMoves.length) {
      const colour = chess.turn();
      const squareOfKing = chess.squareOfKing();

      // get distance to king in all successor states
      legalMoves.forEach(m => {
        chess.move(m);
        m.metric = this.distanceMetric(chess, squareOfKing, colour);
        chess.undo();
      });

      // choose move that maximises metric
      return chess.uci(legalMoves.reduce(this.randomMax));
    }
  }

  randomMax(a, b) {
    return (a.metric + Math.random() > b.metric + Math.random()) ? a : b;
  }

  removeReverseMoves(previousUciMoves, legalMoves) {
    const filtered = legalMoves.filter(move => !previousUciMoves.includes(move.to + move.from));
    return filtered.length === 0 ? legalMoves : filtered;
  }

  /**
   * Sum of (16 - manhattan distance to king) for each piece of given colour.
   */
  distanceMetric(c, targetSquare, colour) {
    const target = chess.coordinates(targetSquare);
    const distances = c.squaresOf(colour).map(square => 16 - chess.manhattanDistance(target, chess.coordinates(square)));
    return distances.reduce((a, b) => a + b, 0);
  }

  getReply(chat) {
    return "swarm the king!";
  }

  getRandomMove(moves) {
    return chess.uci(moves[Math.floor(Math.random() * moves.length)]);
  }
}

module.exports = SwarmKingPlayer;
