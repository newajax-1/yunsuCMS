/**
 * coding by Alex of 2017-07-24
 */

import Vue from 'vue'
import Router from 'vue-router'

import login from '../components/login/login'
import index from '../components/index'

/**
 * @saleplan : 销售计划管理
 * @salersInfo : 客户信息管理
 */

import saleplan from '../components/template/saleplans/salePlans'
import salersInfo from '../components/template/saleplans/salersInfo'
import createsaleplan from "@/components/template/saleplans/createsaleplan"
import saleplancontent from "@/components/template/saleplans/saleplancontent"

import prodPlansInfo from '../components/template/productionplans/prodPlansInfo'
import weekProdPlans from '../components/template/productionplans/weekProdPlans'
import invWarning from '../components/template/productionplans/invWarning'

//用户管理
import userManagement from '../components/template/systemsMent/userManagement'
import roleManagement from '../components/template/systemsMent/roleManagement'
import orgManagement from '../components/template/systemsMent/orgManagement'
import staffManagement from '../components/template/systemsMent/staffManagement'

// 生产作业管理
import proMonitoring from '../components/template/operationMent/proMonitoring'
import workMonitoring from '../components/template/operationMent/workMonitoring'
import workMonitoringInfo from '../components/template/operationMent/workMonitoringInfo'
import warningFacMonitoring from '../components/template/operationMent/warningFacMonitoring'
import warningQuaMonitoring from '../components/template/operationMent/warningQuaMonitoring'
import modelMonitoring from '../components/template/operationMent/modelMonitoring'

Vue.use(Router)

export default new Router({
    mode: "hash",

    routes: [{
            path: '/',
            redirect: "/login"
        },
        {
            path: "/login",
            component: login
        },
        {
            path: '/home',
            component: index,
            children: [{
                    path: 'saleplan',
                    component: saleplan,
                    children: [{
                            path: "/",
                            component: saleplancontent
                        },
                        {
                            path: "createsaleplan",
                            component: createsaleplan
                        }
                    ]
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
                    path: 'invwarning',
                    component: invWarning
                },
                {
                    path: 'weekprodplans',
                    component: weekProdPlans
                },
                {
                    path: 'invWarning',
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
                    path: 'orgmanagement',
                    component: orgManagement
                },
                {
                    path: 'staffmanagement',
                    component: staffManagement
                },
                {
                    path: 'promonitoring',
                    component: proMonitoring
                },
                {
                    path: 'workmonitoring',
                    component: workMonitoring
                },
                {
                    path: 'workmonitoringinfo',
                    component: workMonitoringInfo
                },
                {
                    path: 'warningfacmonitoring',
                    component: warningFacMonitoring
                },
                {
                    path: 'warningquamonitoring',
                    component: warningQuaMonitoring
                },
                {
                    path: 'modelmonitoring',
                    component: modelMonitoring
                },
            ]
        },
    ]
})