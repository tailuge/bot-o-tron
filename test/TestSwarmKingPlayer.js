const test = require("tape");
const SwarmKingPlayer = require("../src/SwarmKingPlayer");

const player = new SwarmKingPlayer();

test("getReply", function(t) {
  t.equal(player.getReply({}), "swarm the king!", "chat says swarm the king!");
  t.end();
});

test("getNextMove", function(t) {
  const mate = player.getNextMove(["e2e4","a7a6","f1c4","a8a7","d1h5","a7a8"]);
  t.ok(mate === "h5f7" || mate === "c4f7", "mate is played when available");
  t.ok(player.getNextMove([]), "a move is played when available");
  t.end();
});


