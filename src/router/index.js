import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/login'
import index from '../components/index'

/**
 * @saleplan : 销售计划管理
 * @salersInfo : 客户信息管理
 */

import saleplan from '../components/template/saleplans/salePlans'
import salersInfo from '../components/template/salersInfo'

import prodPlansInfo from '../components/template/productionplans/prodPlansInfo'
import weekProdPlans from '../components/template/productionplans/weekProdPlans'
import weekProdPlansInfo from '../components/template/productionplans/weekProdPlansInfo'

import invWarning from '../components/template/invwarning/invWarning'

//用户管理
import userManagement from '../components/template/systemsMent/userManagement'
import roleManagement from '../components/template/systemsMent/roleManagement'
import orgManagement from '../components/template/systemsMent/orgManagement'

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
                },
                {
                    path: 'prodplansinfo',
                    component: prodPlansInfo
                },
                {
                    path: 'weekprodplans',
                    component: weekProdPlans
                },
                {
                    path: 'weekprodplansinfo',
                    component: weekProdPlansInfo
                },
                {
                    path: 'invwarning',
                    component: invWarning
                },
                {
                    path: 'usermanagement',
                    component: userManagement
                },
                {
                    path: 'rolemanagement',
                    component: roleManagement
                },
                {
                    path: 'orgManagement',
                    component: orgManagement
                },
            ]
        },
    ]
})