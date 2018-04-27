/**
 * RobotUser listens for challenges and spawns Games on accepting.
 *  
 */
class RobotUser {

  /**
   * Initialise with interface to lichess and a handler for new games.
   */
  constructor(api, handleGameStart) {
    this.api = api;
    this.handleGameStart = handleGameStart;
  }


  subscribe() {
    this.api.streamEvents((event) => this.eventHandler(event));
  }

  async handleChallenge(challenge) {
    if (challenge.rated) {
      console.log("Declining rated challenge from " + challenge.challenger.id);
      this.api.declineChallenge(challenge.id);
    }
    else {
      console.log("Accepting unrated challenge from " + challenge.challenger.id);
      var accept = await this.api.acceptChallenge(challenge.id);
      console.log("status : " + accept.statusText);
    }
  }

  eventHandler(event) {
    if (event.type === "challenge") {
      this.handleChallenge(event.challenge);
      return;
    }
    if (event.type === "gameStart") {
      this.handleGameStart(event.game.id);
      return;
    }
    console.log("Unhandled event : " + JSON.stringify(event));
  }
}

module.exports = RobotUser;
