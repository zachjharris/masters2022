const config = {
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Masters 2022',
    themeColor: '#006746',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    //workboxPluginMode: 'InjectManifest',
    iconPaths: {
      favicon32: 'favicon-32x32.png',
      favicon16: 'favicon-16x16.png',
      appleTouchIcon: 'apple-touch-icon-152x152.jpg'
    },
    //workboxOptions: {
    //  swSrc: 'dev/sw.js'
    //}
  }
}
if (process.env.NODE_ENV == 'production') {
  config.publicPath = "https://zachjharris.github.io/masters2022/";
}
module.exports = config;