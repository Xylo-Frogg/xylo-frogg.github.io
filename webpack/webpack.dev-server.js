var path = require('path');
var writeFilePlugin = require('write-file-webpack-plugin');
var packagejson = require('../package.json');
var config = require("./webpack.config.js");
var WebpackDevServer  = require('webpack-dev-server');
var webpack = require('webpack');


function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

var hostname = 'http://127.0.0.1';
var port = 8080;


config.entry.unshift('webpack-dev-server/client?' + hostname + ':' + port + '/');
config.plugins.push(new writeFilePlugin())
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
  headers: {'Access-Control-Allow-Origin': '*'},
  contentBase: resolve(packagejson.config.distfolder),
  clientLogLevel: 'warning',
  compress: false,
  port: port,
  inline: false,
  historyApiFallback: true,
  stats: {
    colors: true
  }
});
server.listen(port, '127.0.0.1', () => {
  console.log('Starting server on ' + hostname + ':' + port);
});
