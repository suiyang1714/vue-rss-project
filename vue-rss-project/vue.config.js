let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    publicPath: './',
    outputDir: 'rssproject',
    configureWebpack: {
        plugins: [
           new BundleAnalyzerPlugin()
         ]
       },
    devServer: {
        port: 8080,
        disableHostCheck: true
    },

}
