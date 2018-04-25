const Game = require('./Game');

/**
 * Player subscribes to challenges and spawns Games on accepting.
 *  
 */
class Player {

  /**
   * Initialise with interface to lichess.
   */
  constructor(lichessApi) {
    this.lichessApi = lichessApi;
  }


  subscribe() {
    this.lichessApi.streamEvents((event) => this.eventHandler(this, event));
  }

  async handleChallenge(challenge) {
    if (challenge.rated) {
      console.log("declining rated challenge:" + challenge.id);
      var declineStatus = await this.lichessApi.declineChallenge(challenge.id);
      console.log("status : " + declineStatus.statusText);
    }
    else {
      console.log("accepting unrated challenge:" + challenge.id);
      var accept = await this.lichessApi.acceptChallenge(challenge.id);
      console.log(accept);
    }
  }

  async handleGameStart(gameId) {
    const game = new Game(this.lichessApi);
    game.start(gameId);
  }

  eventHandler(self, event) {
    console.log("event.type : " + event.type);
    if (event.type === "challenge") {
      self.handleChallenge(event.challenge);
      return;
    }
    if (event.type === "gameStart") {
      self.handleGameStart(event.game.id);
      return;
    }
    console.log("Unhandled event : "+ JSON.stringify(event));
  }
}

module.exports = Player;
