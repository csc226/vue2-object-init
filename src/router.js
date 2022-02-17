import Vue from 'vue'
import Router from 'vue-router'
import login from './components/index/index.vue'
Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        name: '首页',
        meta: {
            requireAuth: false,
            keepAlive: false
        },
        component: login
    }
        // , {
        //     path: '/',
        //     name: '',
        //     meta: {
        //         keepAlive: false,
        //         requireAuth: true
        //     },
        //     component: () =>
        //         import('./components/')
        // }
    ]
})