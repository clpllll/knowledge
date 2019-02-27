const proxy = require('./proxy');
// const conf = require('./webpack.core')
const path = require('path');
const resolve = (dir)=>{
  return path.join(__dirname,'.',dir)
}
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
    const svgRule = config.module.rule('svg')
    svgRule
    .uses.clear()
    .end()
    .include.add(resolve('src/views'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({ symbolId: 'icon-[name]' })

    config
      .resolve
      .alias
        .set('util', './src/uitl')
        .set('api', './src/api')
        .end()
    
  },
  devServer: {
    proxy
  }
}