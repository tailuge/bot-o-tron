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

  start(gameId) {
    this.lichessApi.streamGame(gameId, this.handler);
  }

  handler(event) {
    console.log("game event:" + JSON.stringify(event));
  }

}

module.exports = Game;
