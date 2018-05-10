const tap = require("tap");
const moxios = require("moxios");
const LichessApi = require("../src/LichessApi");

const gameId = "gid001";
const challengeId = "cid001";
const secret = "secret api token";
const api = new LichessApi(secret);

const accountResponse = {
  status: 200,
  response: {
    "id": "bot-o-tron",
    "username": "bot-o-tron",
    "online": false,
    "perfs": {
      "blitz": { "games": 0, "rating": 1500, "rd": 350, "prog": 0, "prov": true },
      "bullet": { "games": 0, "rating": 1500, "rd": 350, "prog": 0, "prov": true },
      "correspondence": { "games": 0, "rating": 1500, "rd": 350, "prog": 0, "prov": true },
      "classical": { "games": 0, "rating": 1500, "rd": 350, "prog": 0, "prov": true },
      "rapid": { "games": 0, "rating": 1500, "rd": 350, "prog": 0, "prov": true }
    },
    "createdAt": 1523969032456,
    "profile": {
      "country": "GB",
      "location": "Cloud",
      "bio": "I only accept unrated challenges",
      "firstName": "bot",
      "lastName": "o-tron",
      "links": ""
    },
    "seenAt": 1525437350441,
    "playTime": { "total": 15530, "tv": 523 },
    "title": "BOT",
    "url": "https://lichess.org/@/bot-o-tron",
    "nbFollowing": 2,
    "nbFollowers": 25,
    "count": { "all": 236, "rated": 0, "ai": 0, "draw": 13, "drawH": 13, "loss": 150, "lossH": 150, "win": 73, "winH": 73, "bookmark": 0, "playing": 0, "import": 0, "me": 0 },
    "followable": true,
    "following": false,
    "blocking": false,
    "followsYou": false
  }
};

const okResponse = {
  status: 200,
  response: { "ok": true }
};

function assertRequest(t, method, pathregexp, response) {
  moxios.wait(function() {
    let request = moxios.requests.mostRecent();
    t.equal(request.config.method, method, "correct method");
    t.ok(pathregexp.test(request.config.url), "correct path");
    t.equal(request.headers.Authorization, "Bearer " + secret, "credentials are correct");
    request.respondWith(response);
  });
}

tap.beforeEach(function(t) {
  moxios.install();
  t();
});

tap.afterEach(function(t) {
  moxios.uninstall();
  t();
});

tap.test("acceptChallenge", async function(t) {
  assertRequest(t, "post", new RegExp(`api/challenge/${challengeId}/accept`), okResponse);
  const response = await api.acceptChallenge(challengeId);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

tap.test("declineChallenge", async function(t) {
  assertRequest(t, "post", new RegExp(`api/challenge/${challengeId}/decline`), okResponse);
  const response = await api.declineChallenge(challengeId);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

tap.test("upgrade", async function(t) {
  assertRequest(t, "post", new RegExp("api/bot/accounts/upgrade"), okResponse);
  const response = await api.upgrade();
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

tap.test("accountInfo", async function(t) {
  assertRequest(t, "get", new RegExp("api/account"), accountResponse);
  const response = await api.accountInfo();
  t.equal(response.data.id, "bot-o-tron", "user id returned");
  t.end();
});

tap.test("makeMove", async function(t) {
  const move = "e2e4";
  assertRequest(t, "post", new RegExp(`api/bot/game/${gameId}/move/${move}`), okResponse);
  const response = await api.makeMove(gameId, move);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

tap.test("abortGame", async function(t) {
  assertRequest(t, "post", new RegExp(`api/bot/game/${gameId}/abort`), okResponse);
  const response = await api.abortGame(gameId);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

tap.test("resignGame", async function(t) {
  assertRequest(t, "post", new RegExp(`api/bot/game/${gameId}/resign`), okResponse);
  const response = await api.resignGame(gameId);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

tap.test("chat", async function(t) {
  assertRequest(t, "post", new RegExp(`api/bot/game/${gameId}/chat`), okResponse);
  const response = await api.chat(gameId, "lobby", "hi");
  t.equal(response.data.ok, true, "response correct");
  t.end();
});
