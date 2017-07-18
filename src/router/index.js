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
import schedulingPlans from '../components/template/productionplans/schedulingPlans'

import invWarning from '../components/template/invwarning/invWarning'
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
                    path: 'saleplaninfo',
                    component: saleplaninfo
                },
                {
                    path: 'prodplansinfo',
                    component: prodPlansInfo
                },
                {
                    path: 'weekprodplans',
                    component: weekProdPlans
                },{
                	path:'invwarning',
                	component: invWarning
                },
                {
                    path: 'schedulingplans',
                    component: schedulingPlans
                }
            ]
        },
    ]
})