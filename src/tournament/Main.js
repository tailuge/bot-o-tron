const Tournament = require("./Tournament");
const LegalMovePlayer = require("../bots/LegalMovePlayer");
const SwarmKingPlayer = require("../bots/SwarmKingPlayer");
const RandomPlayer = require("../bots/RandomPlayer");

const players = [
  new LegalMovePlayer(),
  new SwarmKingPlayer(),
  new RandomPlayer()
];

/**
 * Run tournament and report results to console.
 */

const tournament = new Tournament(players, 16);

console.log("Start");

var rounds = 10;
var round = 1;

console.log(players);

while (round++ <= rounds) {
  tournament.playRound();
  console.log(tournament.getScores());
}

function zip(arr, ...arrs) {
  return arr.map((val, i) => arrs.reduce((a, arr) => [...a, arr[i]], [val]));
}


console.log("Results");
console.log(zip(players, tournament.getScores()));
