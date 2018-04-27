const axios = require("axios");

/**
 * Programatic interface to the web API of lichess https://lichess.org/api#tag/Chess-Bot
 *  
 */
class LichessApi {

  /**
   * Initialise with access token from https://lichess.org/account/oauth/token/create.
   */
  constructor(token) {
    this.token = token;
    this.baseURL = "https://lichess.org/";
  }

  acceptChallenge(challengeId) {
    return this.post("api/challenge/" + challengeId + "/accept");
  }

  declineChallenge(challengeId) {
    return this.post("api/challenge/" + challengeId + "/decline");
  }

  upgrade() {
    return this.post("api/bot/accounts/upgrade");
  }

  accountInfo() {
    return this.get("api/account");
  }

  makeMove(gameId, move) {
    return this.post("api/bot/game/" + gameId + "/move/" + move);
  }

  abortGame(gameId) {
    return this.post("api/bot/game/" + gameId + "/abort");
  }

  streamEvents(handler) {
    return this.stream("api/stream/event", handler);
  }

  streamGame(gameId, handler) {
    return this.stream("api/bot/game/stream/" + gameId, handler);
  }

  chat(gameId, room, text) {
    return this.post("api/bot/game/" + gameId + "/chat", {
      room,
      text
    });
  }

  get(URL) {
    return axios.get(URL, {
      baseURL: this.baseURL,
      headers: { "Authorization": "Bearer " + this.token }
    });
  }

  post(URL, body) {
    return axios.post(URL, body ? body : {}, {
      baseURL: this.baseURL,
      headers: { "Authorization": "Bearer " + this.token }
    });
  }

  /**
   * Connect to stream with handler.
   */
  stream(url, handler) {
    axios({
        method: "get",
        url: this.baseURL + url,
        headers: { "Authorization": "Bearer " + this.token },
        responseType: "stream"
      })
      .then(stream => stream.data.on("data", data => {
        data = data.toString("ascii").trim();
        if (data) {
          handler(JSON.parse(data));
        }
      }))
      .catch(err => console.log(err));
  }

}

module.exports = LichessApi;
