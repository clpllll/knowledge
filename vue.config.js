module.exports = {
  configureWebpack:config=>{
    config.resolve.extensions.push('.css')
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  }
}