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
        { path: '*', component: NotFoundComponent }
    ]
});
