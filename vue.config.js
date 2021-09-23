const path = require('path')
module.exports = {
  outputDir: path.resolve(__dirname,'docs'),
  publicPath:'/xzdj-b/',
  devServer: {
    proxy: {
      '/web': {
        target: "https://tcb-api.tencentcloudapi.com",
        changeOrigin: true,
      },
    }
  }
}