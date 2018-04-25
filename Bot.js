
const axios = require('axios');
const Game = require('./Game');


/**
 * Get token from https://lichess.org/account/oauth/token/create
 * 
 * Put the token in the shell environment with
 * 
 * export API_TOKEN=xxxxxxxxxxxxxx
 * 
 * 
 */

const bearer = process.env.API_TOKEN;


/**
 * List of scopes: https://lichess.org/api#section/Authentication
 */

const scopes = [
  'game:read',
  'preference:read',
  'bot:play'
];

function getUserInfo(token) {
  return axios.get('/account/me', {
    baseURL: 'https://lichess.org/',
    headers: { 'Authorization': 'Bearer ' + bearer }
  });
}

function registerHandler(response) {
  response.data.on('data', x => {
    var data = x.toString('ascii');
    if (data.trim()) {
      eventHandler(JSON.parse(x.toString('ascii')));
    }
  });
}

function eventHandler(event) {
  console.log("event: " + event);
  if (event.challenge.rated == false) {
    console.log("Unrated challenge with gameId:" + event.challenge.id);
    var g = new Game(bearer);
  }
}


function handleEventError(err) {
  console.log("handleEventError:");
  console.log(err);
}

function startEventListener(token) {
  axios({
    method: 'get',
    url: 'https://lichess.org/api/stream/event',
    headers: { 'Authorization': 'Bearer ' + bearer },
    responseType: 'stream'
  }).then(registerHandler).catch(handleEventError);
}

async function start() {
  //  var userInfo = await getUserInfo(bearer);
  //  console.log(userInfo);
  console.log("Starting using API_TOKEN:" + bearer);
  startEventListener(bearer);

}

start();
