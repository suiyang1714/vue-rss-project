import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import NotFoundComponent from '../pages/NotFoundComponent'
export default new Router({
    mode: 'history',
    base: '/rssproject/',
    routes: [
        {
            path: "/",
            component: () => import("../pages/index.vue")
        },
        {
            path: "/feed",
            component: () => import("../pages/feed/list.vue")
        },
        {
            path: "/feed/detail",
            component: () => import("../pages/feed/detail.vue")
        },
        {
            path: "/feed/custom",
            component: () => import("../pages/feed/custom.vue")
        },
        {
            path: "/personal/collect",
            component: () => import("../pages//personal/collect.vue")
        },
        {
            path: "/personal/push",
            component: () => import("../pages//personal/push.vue")
        },
        { path: '*', component: NotFoundComponent }
    ]
});
