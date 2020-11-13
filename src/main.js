import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.config.productionTip = false
import store from './store';
import vuetify from './plugins/vuetify';
new Vue({
  render: h => h(App),
  vuetify,
  store
}).$mount('#app')
