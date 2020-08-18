const Timestamp = new Date().getTime();
process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/weixin': {
        target: 'https://api.weixin.qq.com/', // 微信接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/weixin': '/',
        },
      },
    },
    overlay: {
      warnings: true,
      errors: true,
    }, // 浏览器 overlay 同时显示警告和错误：
  },

  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      chunkFilename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
    },
  },
}