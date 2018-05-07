# bot-o-tron [![Build Status](https://travis-ci.org/tailuge/bot-o-tron.svg?branch=master)](https://travis-ci.org/tailuge/bot-o-tron/) [![Coverage Status](https://coveralls.io/repos/github/tailuge/bot-o-tron/badge.svg?branch=master)](https://coveralls.io/github/tailuge/bot-o-tron?branch=master) [![Dependency Status](https://david-dm.org/tailuge/bot-o-tron.svg)](https://david-dm.org/tailuge/bot-o-tron) [![devDependency Status](https://david-dm.org/tailuge/bot-o-tron/dev-status.svg)](https://david-dm.org/tailuge/bot-o-tron#info=devDependencies) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/48d3ed73eeaa4e0fb33e512f906c3215)](https://www.codacy.com/app/tailuge/bot-o-tron?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=tailuge/bot-o-tron&amp;utm_campaign=Badge_Grade)

Try out [lichess'](https://lichess.org) bot interface https://lichess.org/api#tag/Chess-Bot

### Setup

- Get an [API token](https://lichess.org/account/oauth/token) from lichess.org.

```bash
$ nvm use v9.11.1
$ yarn install

# Linux
$ export API_TOKEN=xxxxxxxxxx

# Windows
$ setx API_TOKEN xxxxxxxxxx
```

### Test

```bash
$ yarn test
$ nyc yarn test
```

### Run

```bash
$ yarn start
```

To implement your chess bot you only need to create one class that implements the method:

```js
  getNextMove(moves) {
      return uciMove;
  }
```

Where moves is a string of moves so far in uci format e.g. `"e2e4 b8c6 f2f4"`

See [`LegalMovePlayer`](src/bots/RandomPlayer.js) for minimal implementation using [chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md)

### Hosting

If you register a free heroku account you can host a BOT like this one as is - just add your `API_TOKEN` to the environment property configuration. 
This code auto deploys and is live at https://test-o-a.herokuapp.com/

### Hostless
 
You do not need to own a server to host a BOT, this code also runs in a browser. Watch how a BOT communicates with the server https://tailuge.github.io/bot-o-tron/dist/testBot.html

### Tounaments

Compare bots locally - and the winner of the 16 round tournament is...

```bash
$ yarn tournament

Results
[ { player: 'PatzerPlayer        ', score: 41.5 },
  { player: 'RandomPlayer        ', score: 28 },
  { player: 'SwarmKingPlayer     ', score: 26.5 } ]
```
