import Vue from "vue"
import Vuex from "vuex"
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      userInfo: {
          _id: '5e8ee5ef352afcf977e90938',
          userid: 'LinDongJiangZhi',
          name: '隋阳',
          position: '前端开发工程师',
          avatar: 'http://wework.qpic.cn/bizmail/0Hbx9icAVicyjbUHj2MK9fOvibxOGRD2scg0mic3ory6JYmcWGveTbQoBA/0'
      },
      current: 0
    },
    getters,
    actions,
    mutations
  })
}

export default createStore()
