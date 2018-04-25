/**
 * RobotUser subscribes to challenges and spawns Games on accepting.
 *  
 */
class RobotUser {

  /**
   * Initialise with interface to lichess and a handler for new games.
   */
  constructor(api, gameStart) {
    this.api = api;
    this.gameStart = gameStart;
  }


  subscribe() {
    this.api.streamEvents((event) => this.eventHandler(this, event));
  }

  async handleChallenge(challenge) {
    if (challenge.rated) {
      console.log("declining rated challenge:" + challenge.id);
      var declineStatus = await this.api.declineChallenge(challenge.id);
      console.log("status : " + declineStatus.statusText);
    }
    else {
      console.log("accepting unrated challenge:" + challenge.id);
      var accept = await this.api.acceptChallenge(challenge.id);
      console.log("status : " + accept.statusText);
    }
  }

  eventHandler(self, event) {
    console.log("event.type : " + event.type);
    if (event.type === "challenge") {
      self.handleChallenge(event.challenge);
      return;
    }
    if (event.type === "gameStart") {
      self.gameStart(event.game.id);
      return;
    }
    console.log("Unhandled event : " + JSON.stringify(event));
  }
}

module.exports = RobotUser;
