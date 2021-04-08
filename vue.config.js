const config = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Masters 2021',
    themeColor: '#006746',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    //workboxPluginMode: 'InjectManifest',
    iconPaths: {
      favicon32: 'assets/favicon-32x32.png',
      favicon16: 'assets/favicon-16x16.png'
    },
    //workboxOptions: {
    //  swSrc: 'dev/sw.js'
    //}
  }
}
if (process.env.NODE_ENV == 'production') {
  config.publicPath = "https://zachjharris.github.io/masters2021/";
}
module.exports = config;