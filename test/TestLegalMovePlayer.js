const test = require("tape");
const LegalMovePlayer = require("../src/LegalMovePlayer");

const player = new LegalMovePlayer();

test("getReply", function(t) {
  t.equal(player.getReply({}), "hi", "chat says hi");
  t.end();
});

test("getNextMove", function(t) {
  t.ok(player.getNextMove([]), "uci move from initial position");
  t.equal(player.getNextMove(["e2e4","a7a6","f1c4","a8a7"]), "c4f7", "check is played when available");
  t.notOk(player.getNextMove(["e2e4","a7a6","f1c4","a8a7","d1h5","a7a8","c4f7"]), "no moves available");
  const mate = player.getNextMove(["e2e4","a7a6","f1c4","a8a7","d1h5","a7a8"]);
  t.ok(mate === "h5f7" || mate === "c4f7", "mate is played when available");
  t.end();
});

