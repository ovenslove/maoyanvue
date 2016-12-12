'use strict';

var path = require('path');

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,

    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://api.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/ad': {
        target: 'http://advert.mobile.meituan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/ad': ''
        }
      }
    },

    cssSourceMap: false
  }
};

//# sourceMappingURL=index-compiled.js.map