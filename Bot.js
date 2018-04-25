const Game = require('./Game');
const Player = require('./Player');
const LichessApi = require('./LichessApi');


/**
 * Get token from https://lichess.org/account/oauth/token/create
 * 
 * Put the token in the shell environment with
 * 
 * export API_TOKEN=xxxxxxxxxxxxxx
 * 
 */

const bearer = process.env.API_TOKEN;

const lichessApi = new LichessApi(bearer);

async function start() {
  console.log("Using API_TOKEN : " + bearer);
  var account = await lichessApi.accountInfo();
  console.log("Playing as      : " + account.data.username);
  const player = new Player(lichessApi);
  player.subscribe();
}


start();
