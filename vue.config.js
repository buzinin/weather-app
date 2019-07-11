const webpack = require('webpack');
module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {

    }
  },
  configureWebpack: {

    plugins: [
      new webpack.NormalModuleReplacementPlugin(/element-ui\/lib\/locale\/lang\/zh-CN\.js/, 'element-ui/lib/locale/lang/ru')
    ]
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/weather-app/' : '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    sourceMap: true
  }
};