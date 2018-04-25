const axios = require('axios');

/**
 * Game subscribes to gameId events and handles game events posting moves.
 *  
 */
class Game {

  /**
   * Initialise with token.
   */
  constructor(token) {
    this.token = token;
  }

  handleGameEvent(event) {
    console.log(event);
  }

  handleData(data) {
    data = data.toString('ascii').trim();
    if (data) {
      this.handleGameEvent(JSON.parse(data));
    }
  }

  /**
   * Subscribe to game events and play.
   */  
  startGameEventListener(gameId) {
    axios({
        method: 'get',
        url: 'https://lichess.org/bot/game/stream/'+gameId,
        headers: { 'Authorization': 'Bearer ' + this.token },
        responseType: 'stream'
      })
      .then(stream => stream.data.on('data', this.handleData))
      .catch(err => console.log(err));
  }


//const userInfo = await getUserInfo(token.token);
 acceptChallenge(token) {
  return axios.get('/account/me', {
    baseURL: 'https://lichess.org/',
    headers: { 'Authorization': 'Bearer ' + token.access_token }
  });
}


}

module.exports = Game;





