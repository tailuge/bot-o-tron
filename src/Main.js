const RobotUser = require("./RobotUser");
const LichessApi = require("./LichessApi");
const Game = require("./Game");
const LegalMovePlayer = require("./LegalMovePlayer");


/**
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

// Load nodejs environment variables from `.env` file
require('dotenv').config();

const bearer = process.env.API_TOKEN;

const api = new LichessApi(bearer);

var account;

const player = new LegalMovePlayer();

function handleGameStart(gameId) {
  const game = new Game(api, account.data.username, player);
  game.start(gameId);
}

async function start() {
  console.log("Using API_TOKEN : " + bearer);
  account = await api.accountInfo();
  console.log("Playing as      : " + account.data.username);
  const player = new RobotUser(api, handleGameStart);
  player.subscribe();
}


start();

// heroku stay alive server

const express = require('express');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.send('Running as ' + account.data.username))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
  



