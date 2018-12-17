const proxy = require('./proxy');
const conf = require ('./webpack.core')
module.exports = {
  configureWebpack:config=>{
    config.resolve.extensions.push('.css')
    // config.resolve.alias.util = './src/util'
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...

    } else {
      // 为开发环境修改配置...
    }
    // config = conf
  },
  chainWebpack: config => {
    config.resolve
      .alias
      .set('util', './src/uitl')
      .set('api','./src/api')
      .end()
  },
  devServer: {
    proxy
  }
}