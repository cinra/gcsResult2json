const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack/config/vue.webpack.config');
console.log('Starting the dev web server...');
const __root = process.env.PWD;

module.exports = (gulp, PATH, $, option = {}) => {

  const options = {
    publicPath: `${ __root }/${ PATH.dist }/`,
    hot: true,
    inline: true,
    contentBase: `${ __root }/${ PATH.dist }/`,
    stats: { colors: true }
  };

  const server = new WebpackDevServer(webpack(config), options);

  return () => {
    return server.listen(6003, 'localhost', function (err) {
      if (err) {
        console.log(err);
      }
      console.log('WebpackDevServer listening at localhost:', port);
    });
  }
}