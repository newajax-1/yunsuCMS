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