const Chess = require("chess.js").Chess;

var chess = new Chess();

/**
 * Pick a random legal move but prefers checks and mates.
 */
class LegalMovePlayer {

  getNextMove(moves) {

    chess.reset();
    moves.split(" ").forEach(move => chess.move(move, { sloppy: true }));

    var legalMoves = chess.moves({ verbose: true });
    
    var mates = legalMoves.filter(move => /\#/.test(move.san));
    var checks = legalMoves.filter(move => /\+/.test(move.san));

    if (checks.length) {
      legalMoves = checks;
    }

    if (mates.length) {
      legalMoves = mates;
    }

    var move = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    console.log(JSON.stringify(move));
    var uciMove = move.from + move.to + (move.flags === "p" ? move.piece : "");
    return uciMove;

  }

}

module.exports = LegalMovePlayer;
