module.exports = {
  baseUrl: '/',
  devServer: {
      proxy: {
          '/api': {
              target: 'http://m.maoyan.com',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                '^/api': ''
              }
          }
      }
  }
}
