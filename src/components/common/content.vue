<template>
    <div class="template">
        <div class="layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>
    <script>

    import saleplan from '../template/saleplans/salePlans'
    import salersInfo from '../template/saleplans/salersInfo'

    import prodPlansInfo from '../template/productionplans/prodPlansInfo'
    import weekProdPlans from '../template/productionplans/weekProdPlans'
    import invWarning from '../template/productionplans/invWarning'

    // 用户
    import userManagement from '../template/systemsMent/userManagement'
    import roleManagement from '../template/systemsMent/roleManagement'
    import orgManagement from '../template/systemsMent/orgManagement'
    import staffManagement from '../template/systemsMent/staffManagement'

    import proMonitoring from '../template/operationMent/proMonitoring'
    import workMonitoring from '../template/operationMent/workMonitoring'
    import workMonitoringInfo from '../template/operationMent/workMonitoringInfo'
    import warningFacMonitoring from '../template/operationMent/warningFacMonitoring'
    import warningQuaMonitoring from '../template/operationMent/warningQuaMonitoring'
    import modelMonitoring from '../template/operationMent/modelMonitoring'
    
    import workLoadInfo from "../template/systemsMent/workLoadInfo"

    // 工程管理
    import statusMonitor from '../template/engineeringMent/statusMonitor'
    import equipmentInfo from '../template/engineeringMent/equipmentInfo'
    import equipmentInfoDetail from '../template/engineeringMent/equipmentInfoDetail'
    import equipmentMaintain from '../template/engineeringMent/equipmentMaintain'
    import standbyMent from '../template/engineeringMent/standbyMent'
    import productSop from '../template/engineeringMent/productSop'
    import productBom from '../template/engineeringMent/productBom'

    // 模具管理
    import mouldMonitor from '../template/mouldMent/mouldMonitor'
    import mouldInfo from '../template/mouldMent/mouldInfo'
    import mouldInfoNewDetail from '../template/mouldMent/mouldInfoNewDetail'
    import mouldInfoSuccessDetail from '../template/mouldMent/mouldInfoSuccessDetail'
    import maintainPlan from '../template/mouldMent/maintainPlan'
    import mouldTestPlan from '../template/mouldMent/mouldTestPlan'
    import addMouldInfo from '../template/mouldMent/addMouldInfo'

  

    export default {
        name : "content",
        components : {
            saleplan,
            salersInfo,
            prodPlansInfo,
            weekProdPlans,
            invWarning,
            userManagement,
            orgManagement,
            staffManagement,
            workLoadInfo,
            proMonitoring,
            workMonitoring,
            workMonitoringInfo,
            warningFacMonitoring,
            warningQuaMonitoring,
            modelMonitoring,
            statusMonitor,
            equipmentInfo,
            equipmentInfoDetail,
            equipmentMaintain,
            standbyMent,
            mouldMonitor,
            mouldInfo,
            mouldInfoNewDetail,
            mouldInfoSuccessDetail,
            maintainPlan,
            mouldTestPlan,
            addMouldInfo,
            productSop,
            productBom,
        }
    }
</script>