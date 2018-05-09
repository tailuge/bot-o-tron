const tap = require("tap");
const moxios = require("moxios");

const LichessApi = require("../src/LichessApi");

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

function assertRequest(t, method, pathregexp, response) {
  moxios.wait(function() {
    let request = moxios.requests.mostRecent();
    t.equal(request.config.method, method, "correct method");
    t.ok(pathregexp.test(request.config.url), "correct path");
    t.equal(request.headers.Authorization, "Bearer " + secret, "credentials are correct");
    request.respondWith(response);
  });
}

function httpTest(title, ftest) {
  tap.test(title, function(t) {
    moxios.install();
    moxios.withMock(async function() {
      ftest(t);
    });
    moxios.uninstall();
  });
}

tap.test("accountInfo", function(t) {

  moxios.install();
  moxios.withMock(async function() {

    moxios.wait(function() {
      let request = moxios.requests.mostRecent();
      t.equal(request.config.method, "get", "correct method");
      t.ok(/.*api\/account.*/.test(request.config.url), "correct path");
      t.equal(request.headers.Authorization, "Bearer " + secret, "credentials are correct");
      request.respondWith(accountResponse);
    });

    const response = await api.accountInfo();
    t.equal(response.data.id, "bot-o-tron", "user id returned");
    t.end();

  });

  moxios.uninstall();

});

const challengeId = "abc123";

httpTest("acceptChallenge", async function(t) {
  assertRequest(t, "post", new RegExp("api/challenge/" + challengeId + "/accept"), {
    status: 200,
    response: { "ok": true }
  });
  const response = await api.acceptChallenge(challengeId);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});

httpTest("declineChallenge", async function(t) {
  assertRequest(t, "post", new RegExp("api/challenge/" + challengeId + "/decline"), {
    status: 200,
    response: { "ok": true }
  });
  const response = await api.declineChallenge(challengeId);
  t.equal(response.data.ok, true, "response correct");
  t.end();
});
