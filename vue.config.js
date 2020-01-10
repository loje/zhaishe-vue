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
}