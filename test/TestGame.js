const assert = require("assert");
const test = require("tape");

const Game = require("../src/Game");
const token = "some_token";

test("Game tests", function(assert) {
  var game = new Game(token);
  assert.notEqual(game, null, "Game is not null");
  assert.end();
});
