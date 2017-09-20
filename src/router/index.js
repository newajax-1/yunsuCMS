/**
 * coding by Alex of 2017-07-24
 */

import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login'
import index from '@/components/index'

// 首页
import home from '@/components/single/home/home'

// 销售计划
import saleplan from '@/components/single/saleplans/salePlans'
import salersInfo from '@/components/single/saleplans/salersInfo'
import createsaleplan from "@/components/single/saleplans/createsaleplan"
import saleplancontent from "@/components/single/saleplans/saleplancontent"
import saleplaninfo from "@/components/single/saleplans/saleplaninfobyid"

// 周计划
import prodPlansInfo from '@/components/single/productionplans/prodPlansInfo'
import weekProdPlans from '@/components/single/productionplans/weekProdPlans'
import invWarning from '@/components/single/productionplans/invWarning'

// 用户管理
import userManagement from '@/components/single/systemsMent/userManagement'
import roleManagement from '@/components/single/systemsMent/roleManagement'
import orgManagement from '@/components/single/systemsMent/orgManagement'
import staffManagement from '@/components/single/systemsMent/staffManagement'
import workLoadInfo from '@/components/single/systemsMent/workLoadInfo'
import addDepartment from '@/components/single/systemsMent/addDepartment'

// 生产作业管理
import proMonitoring from '@/components/single/operationMent/proMonitoring'
import workMonitoring from '@/components/single/operationMent/workMonitoring'
import workMonitoringInfo from '@/components/single/operationMent/workMonitoringInfo'
import warningFacMonitoring from '@/components/single/operationMent/warningFacMonitoring'
import warningQuaMonitoring from '@/components/single/operationMent/warningQuaMonitoring'
import modelMonitoring from '@/components/single/operationMent/modelMonitoring'

// 工程管理
import statusMonitor from '@/components/single/engineeringMent/statusMonitor'
import equipmentInfo from '@/components/single/engineeringMent/equipmentInfo'
import equipmentInfoDetail from '@/components/single/engineeringMent/equipmentInfoDetail'
import equipmentMaintain from '@/components/single/engineeringMent/equipmentMaintain'
import standbyMent from '@/components/single/engineeringMent/standbyMent'
import productSop from '@/components/single/engineeringMent/productSop'
import productBom from '@/components/single/engineeringMent/productBom'

// 模具管理
import mouldMonitor from '@/components/single/mouldMent/mouldMonitor'
import mouldInfo from '@/components/single/mouldMent/mouldInfo'
import mouldInfoNewDetail from '@/components/single/mouldMent/mouldInfoNewDetail'
import mouldInfoSuccessDetail from '@/components/single/mouldMent/mouldInfoSuccessDetail'
import maintainPlan from '@/components/single/mouldMent/maintainPlan'
import mouldTestPlan from '@/components/single/mouldMent/mouldTestPlan'
import addMouldInfo from '@/components/single/mouldMent/addMouldInfo'

//任务单管理
// import taskSheet from '@/components/single/taskSheetMent/taskSheet'
// import message from '@/components/single/taskSheetMent/message'

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
                    path: 'addDepartment',
                    component: addDepartment
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
                }, {
                    path: 'adddepartment',
                    component: addDepartment
                },
                // {
                //     path: 'tasksheet',
                //     component: taskSheet
                // }, {
                //     path: 'message',
                //     component: message
                // }
            ]
        },
    ]
})