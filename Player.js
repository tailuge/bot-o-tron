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
    const handler = (event) => this.eventHandler(this, event);
    this.lichessApi.streamEvents((event) => this.eventHandler(this, event));
  }

  async handleChallenge(challenge) {
    if (challenge.rated) {
      console.log("declining rated challenge:" + challenge.id);
      var declineStatus = await this.lichessApi.declineChallenge(challenge.id);
      console.log("status:" + declineStatus.statusText);
    }
    else {
      console.log("accepting unrated challenge:" + challenge.id);
      var acceptStatus = await this.lichessApi.acceptChallenge(challenge.id);
      console.log("status:" + acceptStatus.statusText);
    }
  }

  eventHandler(self, event) {
    console.log("event: " + JSON.stringify(event));
    if (event.type === "challenge") {
      console.log("challenge");
      self.handleChallenge(event.challenge);
    }
  }
}

module.exports = Player;
