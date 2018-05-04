const RobotUser = require("./RobotUser");
const LegalMovePlayer = require("./LegalMovePlayer");
const SwarmKingPlayer = require("./SwarmKingPlayer");


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

var links = "<h1>Challenge:</h1><br/>";

links += start(process.env.API_TOKEN, new LegalMovePlayer());
links += start(process.env.API_TOKEN_SWARM, new SwarmKingPlayer());

console.log(links);

async function start(token, player) {
  if (token) {
    const robot = new RobotUser(token, player);
    await robot.start();
    return `<a href="https://lichess.org/@/${robot.account.data.username}">${robot.account.data.username}</a> on lichess.</h1><br/>`;
  }
}


// heroku wakeup server (not necessary otherwise)

const express = require("express");
const PORT = process.env.PORT || 5000;

express()
  .get("/", (req, res) => res.send(links))
  .listen(PORT, () => console.log(`Wake up server listening on ${PORT}`));
