/**
 * Game subscribes to gameId events and handles game events posting moves.
 *  
 */
class Game {

  /**
   * Initialise with interface to lichess.
   */
  constructor(lichessApi) {
    this.lichessApi = lichessApi;
  }

  accept(challengeId) {
    
  }

}

module.exports = Game;





