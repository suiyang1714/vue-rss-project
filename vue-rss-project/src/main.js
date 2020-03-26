import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router/router'
import store from './store'
// import 'lib-flexible/flexible'
import 'amfe-flexible'
require('./assets/base.css')

Vue.use(Vuex)

// import moment from 'dayjs'
// Vue.prototype.$moment = moment;

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
