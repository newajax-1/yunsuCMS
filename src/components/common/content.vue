<template>
    <div class="template">
        <div class="layout-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

    // 销售计划
    import saleplan from '../template/saleplans/salePlans'
    import salersInfo from '../template/saleplans/salersInfo'

    // 周计划
    import prodPlansInfo from '../template/productionplans/prodPlansInfo'
    import weekProdPlans from '../template/productionplans/weekProdPlans'
    import invWarning from '../template/productionplans/invWarning'

    // 用户管理
    import userManagement from '../template/systemsMent/userManagement'
    import roleManagement from '../template/systemsMent/roleManagement'
    import orgManagement from '../template/systemsMent/orgManagement'
    import staffManagement from '../template/systemsMent/staffManagement'

    // 生产作业
    import proMonitoring from '../template/operationMent/proMonitoring'
    import workMonitoring from '../template/operationMent/workMonitoring'
    import workMonitoringInfo from '../template/operationMent/workMonitoringInfo'
    import warningFacMonitoring from '../template/operationMent/warningFacMonitoring'
    import warningQuaMonitoring from '../template/operationMent/warningQuaMonitoring'
    import modelMonitoring from '../template/operationMent/modelMonitoring'


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
            proMonitoring,
            workMonitoring,
            workMonitoringInfo,
            warningFacMonitoring,
            warningQuaMonitoring,
            modelMonitoring,
        }
    }
</script>