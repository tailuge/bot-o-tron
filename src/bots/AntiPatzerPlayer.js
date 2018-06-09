const ChessUtils = require("../utils/ChessUtils");


/**
 * Do not play moves that leave opponent with mate in one or checks or captures.
 * else random.
 * 
 */
class AntiPatzerPlayer {

  getNextMove(moves) {
    const chess = new ChessUtils();
    chess.applyMoves(moves);
    var legalMoves = chess.legalMoves();

    if (legalMoves.length) {

      legalMoves.forEach(m => {
        chess.move(m);
        const opponentsMoves = chess.legalMoves();
        const opponentsMates = opponentsMoves.filter(move => /#/.test(move.san));
        const opponentsChecks = opponentsMoves.filter(move => /\+/.test(move.san));
        const opponentsCaptures = opponentsMoves.filter(move => /x/.test(move.san));
        m.metric = -opponentsMoves.length;
        m.metric += -opponentsCaptures.length * 10;
        m.metric += -opponentsChecks.length * 100;
        m.metric += -opponentsMates.length * 1000;
        chess.undo();
      });

      // choose move that maximises metric
      return chess.uci(legalMoves.reduce(this.randomMax));
    }
  }
  
  randomMax(a, b) {
    return (a.metric + Math.random() > b.metric + Math.random()) ? a : b;
  }

  getReply(chat) {
    return "AntiPatzerPlayer";
  }

}

module.exports = AntiPatzerPlayer;
