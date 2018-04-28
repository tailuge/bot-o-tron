const path = require('path');

module.exports = {
  entry: './src/RobotUser.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
