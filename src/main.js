import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import { longClickDirective } from 'vue-long-click';
Vue.use(Vuex);
Vue.directive('longclick', longClickDirective({delay: 400, interval: 50}));
Vue.config.productionTip = false
import store from './store';
import vuetify from './plugins/vuetify';
new Vue({
  render: h => h(App),
  vuetify,
  store
}).$mount('#app')
