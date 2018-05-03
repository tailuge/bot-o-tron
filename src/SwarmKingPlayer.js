const ChessUtils = require("./ChessUtils");

const chess = new ChessUtils();

/**
 * Move pieces closer to king slowly - mate if possible.
 */
class SwarmKingPlayer {

  getNextMove(moves) {
    chess.reset();
    chess.applyMoves(moves);
    var legalMoves = chess.legalMoves();
    var mates = legalMoves.filter(move => /\#/.test(move.san));

    if (mates.length) {
      return this.getRandomMove(mates);
    }

    if (legalMoves.length) {
      const colour = chess.turn();
      const opponentsKingSquare = chess.squareOfOpponentsKing();

      // get distance to opponents king in all successor states
      legalMoves.forEach(m => {
        chess.move(m);
        m.metric = this.distanceMetric(chess, opponentsKingSquare, colour);
        chess.undo();
      });

      // choose move that maximises metric
      return chess.uci(legalMoves.reduce(this.randomMax));
    }
  }

  randomMax(a, b) {
    if (a.metric > b.metric) {
      return a;
    }
    else if (a.metric < b.metric) {
      return b;
    }
    return Math.random() > 0.5 ? a : b;
  }

  /**
   * Sum of (8-distance to king) for each piece of given colour.
   */
  distanceMetric(c, square, colour) {
    const target = chess.coordinates(square);
    const distances = c.squaresOf(colour).map(square => 8 - chess.distance(target, chess.coordinates(square)));
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
