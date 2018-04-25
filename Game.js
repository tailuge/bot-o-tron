/**
 * Game subscribes to gameId events and handles game events posting moves.
 *  
 */
class Game {

  /**
   * Initialise with interface to lichess.
   */
  constructor(api) {
    this.api = api;
  }

  start(gameId) {
    this.api.streamGame(gameId, this.handler);
  }

  handler(event) {
    console.log("game event:" + JSON.stringify(event));
  }

}

module.exports = Game;
