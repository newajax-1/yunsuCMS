import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/login'
import index from '../components/index'

    /**
     * @saleplan : 销售计划管理
     * @salersInfo : 客户信息管理
     */ 
import saleplan from '../components/template/saleplan'
import salersInfo from '../components/template/salersInfo'

Vue.use(Router)

export default new Router({
    mode: "history",

    /**
     * @base : 服务器项目文件路径
     */ 
    base: '/ybs_mes/',
    routes: [{
            path: '/',
            component: login
        },
        {
            path: '/home',
            component: index,
            children: [{
                    path: 'saleplan',
                    component: saleplan
                },
                {
                    path: 'salersInfo',
                    component: salersInfo
                }
            ]
        },
    ]
})