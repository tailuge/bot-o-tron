const ChessUtils = require("./ChessUtils");


/**
 * Pick a random legal move but prefer mates, checks and captures.
 */
class PlayOff {

  constructor(player1, player2, moves) {
    this.player1 = player1;
    this.player2 = player2;
    this.moves = moves ? moves : [];
    this.result = {};
    this.result[player1] = 0;
    this.result[player2] = 0;
  }

  play(max) {
    while (this.moves.length < max) {
      if (!this.makeMove(this.player1, this.player2)) {
        return;
      }
      if (!this.makeMove(this.player2, this.player1)) {
        return;
      }
    }
    this.scorePosition();
  }

  makeMove(player, opponent) {
    const move = this.player1.getNextMove(this.moves);
    if (!move) {
      this.result[player] = 0;
      this.result[opponent] = 1;
      return false;
    }
    this.moves.push(move);
    const chess = new ChessUtils();
    chess.reset();
    chess.applyMoves(this.moves);
    if (chess.in_checkmate()) {
      this.result[player] = 0;
      this.result[opponent] = 1;
      return false;
    }
    return true;
  }

  score(player) {
    return this.result[player];
  }

  scorePosition() {
    const chess = new ChessUtils();
    chess.reset();
    chess.applyMoves(this.moves);
    const materialEval = chess.materialEval();
    if (Math.abs(materialEval) < 2) {
      this.result[this.player1] = 0.5;
      this.result[this.player2] = 0.5;
    }
    else if (materialEval > 0) {
      this.result[this.player1] = 1;
      this.result[this.player2] = 0;
    }
    else {
      this.result[this.player1] = 0;
      this.result[this.player2] = 1;
    }
  }
}

module.exports = PlayOff;
