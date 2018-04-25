const RobotUser = require('./RobotUser');
const LichessApi = require('./LichessApi');
const Game = require('./Game');


/**
 * 
 * Starts a RobotUser (lichess account defined by API_TOKEN) that listens for challenges
 * and spawns games for unrated challenges.
 * 
 * Token created on BOT account from https://lichess.org/account/oauth/token/create
 * Put the token in the shell environment with
 * 
 * export API_TOKEN=xxxxxxxxxxxxxx
 * yarn install
 * yarn start
 */

//const Chess = require('chess.js').Chess;
//var chess = new Chess();
//chess.reset();
//console.log(chess.ascii());




const bearer = process.env.API_TOKEN;

const api = new LichessApi(bearer);

function handleGameStart(gameId) {
    const game = new Game(api);
    game.start(gameId);
}

async function start() {
  console.log("Using API_TOKEN : " + bearer);
  var account = await api.accountInfo();
  console.log("Playing as      : " + account.data.username);
  const player = new RobotUser(api, handleGameStart);
  player.subscribe();
}


start();
