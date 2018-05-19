const LichessApi = require("./LichessApi");

const RobotUser = require("./RobotUser");
const PatzerPlayer = require("./bots/PatzerPlayer");
const AntiPatzerPlayer = require("./bots/AntiPatzerPlayer");


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


async function startBot(token, player) {
  if (token) {
    const robot = new RobotUser(new LichessApi(token), player);
    const username = (await robot.start()).data.username;
    return `<a href="https://lichess.org/@/${username}">${username}</a> on lichess.</h1><br/>`;
  }
}

async function begin() {
  var links = "<h1>Challenge:</h1><br/>";

  links += await startBot(process.env.API_TOKEN, new PatzerPlayer());
  links += await startBot(process.env.API_TOKEN_SWARM, new AntiPatzerPlayer());

  // heroku wakeup server (not necessary otherwise)

  const express = require("express");
  const PORT = process.env.PORT || 5000;

  express()
    .get("/", (req, res) => res.send(links))
    .listen(PORT, () => console.log(`Wake up server listening on ${PORT}`));
}

begin();
