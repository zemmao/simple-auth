require('dotenv').load();
const config = require('./server/config');
const path = require('path');

const aliases = {
  '@': path.resolve(__dirname, './client')
};

module.exports = () => ({
  presets: [
    require('poi-preset-eslint')({ mode: '*' })
  ],
  entry: './client/main.js',
  generateStats: true,
  port: 8081,
  extendWebpack(config) {
    config.resolve.alias.merge(aliases);
  },
  devServer: {
    headers: {
      'X-Powered-By': 'Webpack DevSever'
    },
    proxy: {
      '/api': {
        target: `http://${config.ip}:${config.port}`
      }
    }
  }
});
