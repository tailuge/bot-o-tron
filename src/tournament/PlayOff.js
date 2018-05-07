const ChessUtils = require("../utils/ChessUtils");

/**
 * Play off two players and capture result after maximum number of moves.
 */
class PlayOff {

  constructor(player1, player2, moves = []) {
    this.player1 = player1;
    this.player2 = player2;
    this.moves = moves;
    this.result = 0.5;
  }

  play(max) {
    while (this.moves.length < max) {
      if (!this.makeMove(this.moves.length % 2 === 0 ? this.player1 : this.player2)) {
        return;
      }
    }
    this.adjudicate();
  }

  makeMove(player) {
    this.moves.push(player.getNextMove(this.moves));
    const chess = new ChessUtils();
    chess.applyMoves(this.moves);
    if (chess.inCheckmate()) {
      this.setScore(player, 1);
      return false;
    }
    else if (chess.inStalemate()) {
      this.setScore(player, 0.5);
      return false;
    }
    return true;
  }

  score(player) {
    return player === this.player1 ? this.result : 1 - this.result;
  }

  setScore(player, value) {
    this.result = player === this.player1 ? value : 1 - value;
  }

  adjudicate() {
    const chess = new ChessUtils();
    chess.applyMoves(this.moves);
    const materialEval = chess.materialEval();
    if (Math.abs(materialEval) < 2) {
      this.result = 0.5;
    }
    else if (materialEval > 0) {
      this.result = 1;
    }
    else {
      this.result = 0;
    }
  }
}

module.exports = PlayOff;
