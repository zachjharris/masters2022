const config = {
  "transpileDependencies": [
    "vuetify"
  ]
}
if (process.env.NODE_ENV == 'production') {
  config.publicPath = "https://zachjharris.github.io/masters/dist/";
}
module.exports = config;