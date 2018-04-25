const axios = require('axios');

/**
 * Mirrors the web API to lichess https://lichess.org/api#tag/Chess-Bot
 *  
 */
class LichessApi {

  baseURL = 'https://lichess.org/';

  /**
   * Initialise with token.
   */
  constructor(token) {
    this.token = token;
  }

  acceptChallenge(challengeId) {
    return this.post('/challenge/' + challengeId + '/accept');
  }

  declineChallenge(challengeId) {
    return this.post('/challenge/' + challengeId + '/decline');
  }

  upgrade() {
    return this.post('/bot/accounts/upgrade');
  }

  makeMove(gameId, move) {
    return this.post('/bot/game/' + gameId + '/move/' + move);
  }

  abortGame(gameId) {
    return this.post('/bot/game/' + gameId + '/abort');
  }

  streamEvents(handler) {
    return this.stream('/api/stream/event/', handler);
  }

  streamGame(gameId, handler) {
    return this.stream('/bot/stream/game/' + gameId, handler);
  }

  chat(gameId, room, text) {
    return this.post('/bot/game/' + gameId + '/chat', {
      room: room,
      text: text
    });
  }

  post(URL, body) {
    return axios.get(URL, body ? body : {}, {
      baseURL: this.baseURL,
      headers: { 'Authorization': 'Bearer ' + this.token }
    });
  }


  /**
   * Connect to stream with handler.
   */
  stream(URL, handler) {
    axios({
        method: 'get',
        url: this.baseURL + URL,
        headers: { 'Authorization': 'Bearer ' + this.token },
        responseType: 'stream'
      })
      .then(stream => stream.data.on('data', data => {
        data = data.toString('ascii').trim();
        if (data) {
          handler(JSON.parse(data));
        }
      }))
      .catch(err => console.log(err));
  }

}

module.exports = LichessApi;
