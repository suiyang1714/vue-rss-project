import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router/router'
import store from './store'
import 'amfe-flexible'
import moment from 'dayjs'
import 'vant/lib/toast/style';
import { Toast, Dialog } from 'vant'

require('./assets/base.css')
const relativeTime = require('dayjs/plugin/relativeTime')

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Dialog)
moment.extend(relativeTime)
Vue.prototype.$moment = moment;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
