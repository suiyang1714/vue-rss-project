import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import NotFoundComponent from '../pages/NotFoundComponent'
export default new Router({
    // mode: 'history',
    // base: '/wishingwell',
    routes: [
        {
          path: "/",
          component: () => import("../pages/index.vue")
        },
        {
          path: "/rssList",
          component: () => import("../pages/rssList/list.vue")
        },
        {
          path: "/rssList/detail",
          component: () => import("../pages/rssList/detail.vue")
        },
        {
          path: "/rssList/custom",
          component: () => import("../pages/rssList/custom.vue")
        },
        { path: '*', component: NotFoundComponent }
    ]
});