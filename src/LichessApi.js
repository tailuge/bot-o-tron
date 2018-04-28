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
    this.baseURL = "https://lichess.org/";
    this.headers = { "Authorization": `Bearer ${token}` };
  }

  acceptChallenge(challengeId) {
    return this.post(`api/challenge/${challengeId}/accept`);
  }

  declineChallenge(challengeId) {
    return this.post(`api/challenge/${challengeId}/decline`);
  }

  upgrade() {
    return this.post("api/bot/accounts/upgrade");
  }

  accountInfo() {
    return this.get("api/account");
  }

  makeMove(gameId, move) {
    return this.post(`api/bot/game/${gameId}/move/${move}`);
  }

  abortGame(gameId) {
    return this.post(`api/bot/game/${gameId}/abort`);
  }

  streamEvents(handler) {
    return this.stream("api/stream/event", handler);
  }

  streamGame(gameId, handler) {
    return this.stream(`api/bot/game/stream/${gameId}`, handler);
  }

  chat(gameId, room, text) {
    return this.post(`api/bot/game/${gameId}/chat`, {
      room,
      text
    });
  }

  get(URL) {
    console.log(`GET ${URL}`);
    console.log(JSON.stringify(this.headers));
    return axios.get(URL +"?v=" + Date.now(), {
        baseURL: this.baseURL,
        headers: this.headers
      }).then(data => { console.log(JSON.stringify(data.data)); return data; })
      .catch(err => console.log(err));
  }

  post(URL, body) {
    console.log(`POST ${URL} ` + JSON.stringify(body || {}));
    return axios.post(URL, body || {}, {
        baseURL: this.baseURL,
        headers: this.headers
      }).then(data => { console.log(JSON.stringify(data.data)); return data; })
      .catch(err => console.log(err.response.data));
  }

  /**
   * Connect to stream with handler.
   */
  stream(URL, handler) {
    console.log(`GET ${URL}`);
    axios({
        method: "get",
        url: this.baseURL + URL,
        headers: this.headers,
        responseType: "stream"
      })
      .then(stream => stream.data.on("data", data => {
        data = data.toString("ascii").trim();
        if (data) {
          console.log(`STREAM data : ${data}`);
          handler(JSON.parse(data));
        }
      }))
      .catch(err => console.log(err));
  }
}

module.exports = LichessApi;
