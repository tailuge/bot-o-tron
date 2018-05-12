const tap = require("tap");
const moxios = require("moxios");
const nock = require("nock");
const ndjson = require("ndjson");
const LichessApi = require("../src/LichessApi");

const gameId = "gid001";
const challengeId = "cid001";
const secret = "secret api token";
const accountResponse = { status: 200, response: { "id": "bot-o-tron", "username": "bot-o-tron" } };
const okResponse = { status: 200, response: { "ok": true } };
const eventResponse = { id: "1", type: "event" };
const gameEventResponse = { id: "2", type: "move" };

const api = new LichessApi(secret);

"use strict";

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

tap.test("streamEvents", function(t) {
  const serialize = ndjson.serialize();
  nock("https://lichess.org")
    .get("/api/stream/event")
    .reply((uri, requestBody) => serialize);
  serialize.write(eventResponse);
  api.streamEvents(x => {
    console.log("Callback");
    t.ok(true, "callback called");
    t.end();
  });
});

tap.test("streamEventsEnd", function(t) {
  t.end();
});

tap.test("streamGame", function(t) {
  const serialize = ndjson.serialize();
  nock("https://lichess.org")
    .get(`/api/bot/game/stream/${gameId}`)
    .reply((uri, requestBody) => serialize);
  serialize.write(gameEventResponse);
  api.streamGame(gameId, x => {
    console.log("Callback");
    t.ok(true, "callback called");
    t.end();
  });
});

tap.test("streamGameEnd", function(t) {
  t.end();
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
