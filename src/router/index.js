import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/login/login"
import index from "../components/index"
import saleplan from "../components/template/saleplan"
import salersInfo from "../components/template/salersInfo"

Vue.use(Router)

export default new Router({
    mode: "history",
    base: '/ttms/',
    routes: [{
            path: '/',
            component: login
        },
        {
            path: '/home',
            name: "home",
            component: index,
            children: [{
                    path: 'saleplan',
                    name: "saleplan",
                    component: saleplan
                },
                {
                    path: 'salersInfo',
                    name: 'salersInfo',
                    component: salersInfo
                }
            ]
        },
    ]
})