import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/login'
import index from '../components/index'

/**
 * @saleplan : 销售计划管理
 * @salersInfo : 客户信息管理
 * @saleplaninfo : 销售计划详情
 */

import saleplan from '../components/template/saleplans/salePlans'
import saleplaninfo from '../components/template/saleplans/saleplaninfo'
import salersInfo from '../components/template/salersInfo'

import prodPlansInfo from '../components/template/productionplans/prodPlansInfo'
import weekProdPlans from '../components/template/productionplans/weekProdPlans'
import weekProdPlansInfo from '../components/template/productionplans/weekProdPlansInfo'

import invWarning from '../components/template/invwarning/invWarning'

//用户管理
import userManagement from '../components/template/systemsMent/userManagement'
import roleManagement from '../components/template/systemsMent/roleManagement'

import test from '../components/template/test'

Vue.use(Router)

let YusuRouter = new Router({
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
            meta: {
                requireAuth: true,
            },
            children: [{
                    path: 'saleplan',
                    component: saleplan,
                    meta: {
                        requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
                    },
                },
                {
                    path: 'salersInfo',
                    component: salersInfo,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'saleplaninfo',
                    component: saleplaninfo,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'prodplansinfo',
                    component: prodPlansInfo,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'weekprodplans',
                    component: weekProdPlans,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'weekprodplansinfo',
                    component: weekProdPlansInfo,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'invwarning',
                    component: invWarning,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'usermanagement',
                    component: userManagement,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'rolemanagement',
                    component: roleManagement,
                    meta: {
                        requireAuth: true,
                    },
                },
                {
                    path: 'test',
                    component: test,
                    meta: {
                        requireAuth: true,
                    },
                },
            ]
        },
    ]
});

//  判断是否需要登录权限 以及是否登录
YusuRouter.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) { // 判断是否需要登录权限
        if (localStorage.getItem('username')) { // 判断是否登录
            next()
        } else { // 没登录则跳转到登录界面
            next({
                path: '/',
                query: { redirect: login }
            })
        }
    } else {
        next()
    }
})

export default YusuRouter;