const ChessUtils = require("../utils/ChessUtils");


/**
 * Move pieces closer to own king - mate and check if possible.
 */
class SwarmKingPlayer {

  getNextMove(moves) {
    const chess = new ChessUtils();
    chess.applyMoves(moves);
    var legalMoves = chess.legalMoves();
    const forcing = chess.filterForcing(legalMoves);

    if (forcing.length) {
      return chess.pickRandomMove(forcing);
    }

    legalMoves = this.removeReverseMoves(moves, legalMoves);

    if (legalMoves.length) {
      const colour = chess.turn();

      // get distance to king in all successor states
      legalMoves.forEach(m => {
        chess.move(m);
        const squareOfKing = chess.squareOfOpponentsKing();
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
  distanceMetric(chess, targetSquare, colour) {
    const target = chess.coordinates(targetSquare);
    const distances = chess.squaresOf(colour).map(square => 16 - chess.manhattanDistance(target, chess.coordinates(square)));
    return distances.reduce((a, b) => a + b, 0);
  }

  getReply(chat) {
    return "swarm the king!";
  }

}

module.exports = SwarmKingPlayer;
