/**
 * coding by Alex of 2017-07-24
 */
//home:默认页面
import home from '../components/template/Home/home'

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
import saleplaninfo from "@/components/template/saleplans/saleplaninfobyid"

import prodPlansInfo from '../components/template/productionplans/prodPlansInfo'
import weekProdPlans from '../components/template/productionplans/weekProdPlans'
import invWarning from '../components/template/productionplans/invWarning'

//用户管理
import userManagement from '../components/template/systemsMent/userManagement'
import roleManagement from '../components/template/systemsMent/roleManagement'
import orgManagement from '../components/template/systemsMent/orgManagement'
import staffManagement from '../components/template/systemsMent/staffManagement'
import workLoadInfo from '../components/template/systemsMent/workLoadInfo'

// 生产作业管理
import proMonitoring from '../components/template/operationMent/proMonitoring'
import workMonitoring from '../components/template/operationMent/workMonitoring'
import workMonitoringInfo from '../components/template/operationMent/workMonitoringInfo'
import warningFacMonitoring from '../components/template/operationMent/warningFacMonitoring'
import warningQuaMonitoring from '../components/template/operationMent/warningQuaMonitoring'
import modelMonitoring from '../components/template/operationMent/modelMonitoring'

// 工程管理
import statusMonitor from '../components/template/engineeringMent/statusMonitor'
import equipmentInfo from '../components/template/engineeringMent/equipmentInfo'
import equipmentInfoDetail from '../components/template/engineeringMent/equipmentInfoDetail'
import equipmentMaintain from '../components/template/engineeringMent/equipmentMaintain'
import standbyMent from '../components/template/engineeringMent/standbyMent'
import productSop from '../components/template/engineeringMent/productSop'
import productBom from '../components/template/engineeringMent/productBom'

// 模具管理
import mouldMonitor from '../components/template/mouldMent/mouldMonitor'
import mouldInfo from '../components/template/mouldMent/mouldInfo'
import mouldInfoNewDetail from '../components/template/mouldMent/mouldInfoNewDetail'
import mouldInfoSuccessDetail from '../components/template/mouldMent/mouldInfoSuccessDetail'
import maintainPlan from '../components/template/mouldMent/maintainPlan'
import mouldTestPlan from '../components/template/mouldMent/mouldTestPlan'
import addMouldInfo from '../components/template/mouldMent/addMouldInfo'

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
                    path: '/',
                    component: home
                },
                {
                    path: 'saleplan',
                    component: saleplan,
                    children: [{
                            path: "/",
                            component: saleplancontent
                        },
                        {
                            path: "createsaleplan",
                            component: createsaleplan
                        },
                        {
                            path: "saleplaninfo",
                            component: saleplaninfo
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
                {
                    path: 'statusmonitor',
                    component: statusMonitor
                },
                {
                    path: 'equipmentinfo',
                    component: equipmentInfo
                },
                {
                    path: 'equipmentinfodetail',
                    component: equipmentInfoDetail 
                },
                {
                    path: 'workloadinfo',
                    component: workLoadInfo 
                },
                {
                    path: 'equipmentmaintain',
                    component: equipmentMaintain
                },
                {
                    path: 'standbyment',
                    component: standbyMent
                },
                {
                    path: 'mouldmonitor',
                    component: mouldMonitor
                },
                {
                    path: 'mouldinfo',
                    component: mouldInfo
                },
                {
                    path: 'mouldinfonewdetail',
                    component: mouldInfoNewDetail
                },
                {
                    path: 'mouldinfosuccessdetail',
                    component: mouldInfoSuccessDetail
                },
                {
                    path: 'maintainplan',
                    component: maintainPlan
                },
                {
                    path: 'mouldtestplan',
                    component: mouldTestPlan 
                },
                {
                    path: 'addmouldinfo',
                    component: addMouldInfo 
                },
                {
                    path: 'productsop',
                    component: productSop 
                },
                {
                    path: 'productbom',
                    component: productBom 
                },
            ]
        },
    ]
})