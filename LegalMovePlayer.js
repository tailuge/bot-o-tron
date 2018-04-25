const Chess = require('chess.js').Chess;

var chess = new Chess();

class LegalMovePlayer {

  getNextMove(moves) {
    chess.reset();
    moves.split(' ').forEach(move => chess.move(move, { sloppy: true }));
    var legalMoves = chess.moves({ verbose: true });
    if (legalMoves.length == 0) {
      return undefined;
    }
    console.log("legal moves : " + legalMoves.map(move => move.san));
    var move = legalMoves[0].from + legalMoves[0].to;
    return move;
  }

}

module.exports = LegalMovePlayer
