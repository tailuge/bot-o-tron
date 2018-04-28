const RobotUser = require("./RobotUser");
const LichessApi = require("./LichessApi");
const LegalMovePlayer = require("./LegalMovePlayer");


/**
 * Start a RobotUser (lichess account defined by API_TOKEN) that listens for challenges
 * and spawns games for unrated challenges. A player object must be supplied that can
 * produce the next move to play given the previous moves.
 * 
 * Token can be created on BOT accounts at https://lichess.org/account/oauth/token/create
 * Put the token in the shell environment with
 * 
 * export API_TOKEN=xxxxxxxxxxxxxx
 * yarn install
 * yarn start
 * 
 */

const bearer = process.env.API_TOKEN;

const api = new LichessApi(bearer);
const player = new LegalMovePlayer();
const robot = new RobotUser(api, player);

robot.start();



// heroku stay alive server (not necessary otherwise)

const express = require('express');
const PORT = process.env.PORT || 5000;

express()
  .get('/', (req, res) => res.send(`<h1>Callenge <a href="https://lichess.org/@/${robot.account.data.username}">${robot.account.data.username}</a> on lichess</h1>`))
  .listen(PORT, () => console.log(`Keep alive server listening on ${PORT}`));
