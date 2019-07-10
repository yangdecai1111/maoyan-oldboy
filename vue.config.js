module.exports = {
  //   baseUrl: '/',
  //   devServer: {
  //       proxy: {
  //           '/api': {
  //               target: 'http://m.maoyan.com',
  //               changeOrigin: true,
  //               ws: true,
  //               pathRewrite: {
  //                 '^/api': ''
  //               }
  //           }
  //       }
  //   }
  publicPath:'/maoy/',
  devServer: {
    proxy: {
      // key - 请求前缀
      // value - 代理选项设置
      // http://localhost:8080/maoyan/api/find => http://m.maoyan.com/api/find
      '/maoyan': {
        target: 'http://m.maoyan.com/',
        pathRewrite: {
          '^/maoyan': ''
        }
      }
    }
  }
}
