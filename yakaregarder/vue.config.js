const proxy_target = "http://" + (process.env.API_HOST || "localhost")
  + ":" + (process.env.API_PORT || "3080");

module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  devServer: {
    proxy: {
      '^/api': {
        target: proxy_target,
        changeOrigin: true,
        secure:false,
        pathRewrite: {'^/api': ''},
        logLevel: 'debug'
      }
    }
  }
}