# bot-o-tron [![Build Status](https://travis-ci.org/tailuge/bot-o-tron.svg?branch=master)](https://travis-ci.org/tailuge/bot-o-tron/) [![Coverage Status](https://coveralls.io/repos/github/tailuge/bot-o-tron/badge.svg?branch=master)](https://coveralls.io/github/tailuge/bot-o-tron?branch=master) [![Dependency Status](https://david-dm.org/tailuge/bot-o-tron.svg)](https://david-dm.org/tailuge/bot-o-tron) [![devDependency Status](https://david-dm.org/tailuge/bot-o-tron/dev-status.svg)](https://david-dm.org/tailuge/bot-o-tron#info=devDependencies)

Try out lichess' bot interface https://lichess.org/api#tag/Chess-Bot

1. `nvm use v9.11.1`
2. `yarn install`
3. `yarn test`
4. `nyc yarn test`
5. `export API_TOKEN=xxxxxxxxxx`
6. `yarn start`


To implement your chess bot you only need to create one class that implements the method:

```
  getNextMove(moves) {
      return uciMove;
  }
```

Where moves is a string of moves so far in uci format e.g. `"e2e4 b8c6 f2f4"`

See `LegalMovePlayer` for minimal implementation using [chess.js](https://github.com/jhlywa/chess.js/blob/master/README.md)

