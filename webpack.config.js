const path = require('path');

module.exports = {
  entry: './src/RobotUser.js',
  output: {
    filename: 'library.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'library'
  }
};
