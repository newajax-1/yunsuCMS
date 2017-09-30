<template>
    <div class="template">
        <div class="layout-content">
            <router-view></router-view>
            <div class="bottom">
                <p>Copyright 2017 南京塑维网络科技有限公司. All rights reserved.  版本号1.2 </p>
            </div>
        </div>
    </div>
</template>
<script>
    import saleplan from '../single/saleplans/salePlans'
    import salersInfo from '../single/saleplans/salersInfo'
    import createsaleplan from '../single/saleplans/createsaleplan'
    import saleplancontent from '../single/saleplans/saleplancontent'
    import saleplaninfo from '../single/saleplans/saleplaninfobyid'

    import prodPlansInfo from '../single/productionplans/prodPlansInfo'
    import weekProdPlans from '../single/productionplans/weekProdPlans'
    import invWarning from '../single/productionplans/invWarning'

    import userManagement from '../single/systemsMent/userManagement'
    import roleManagement from '../single/systemsMent/roleManagement'
    import orgManagement from '../single/systemsMent/orgManagement'
    // import staffManagement from '../single/systemsMent/staffManagement'

    import proMonitoring from '../single/operationMent/proMonitoring'
    import workMonitoring from '../single/operationMent/workMonitoring'
    import workMonitoringInfo from '../single/operationMent/workMonitoringInfo'
    import warningFacMonitoring from '../single/operationMent/warningFacMonitoring'
    import warningQuaMonitoring from '../single/operationMent/warningQuaMonitoring'
    import modelMonitoring from '../single/operationMent/modelMonitoring'
    
    import workLoadInfo from "../single/systemsMent/workLoadInfo"

    import statusMonitor from '../single/engineeringMent/statusMonitor'
    import equipmentInfo from '../single/engineeringMent/equipmentInfo'
    import equipmentInfoDetail from '../single/engineeringMent/equipmentInfoDetail'
    import equipmentMaintain from '../single/engineeringMent/equipmentMaintain'
    import standbyMent from '../single/engineeringMent/standbyMent'
    import productSop from '../single/engineeringMent/productSop'
    import productBom from '../single/engineeringMent/productBom'

    import mouldMonitor from '../single/mouldMent/mouldMonitor'
    import mouldInfo from '../single/mouldMent/mouldInfo'
    import mouldInfoNewDetail from '../single/mouldMent/mouldInfoNewDetail'
    import mouldInfoSuccessDetail from '../single/mouldMent/mouldInfoSuccessDetail'
    import maintainPlan from '../single/mouldMent/maintainPlan'
    import mouldTestPlan from '../single/mouldMent/mouldTestPlan'
    import addMouldInfo from '../single/mouldMent/addMouldInfo'

    import addDepartment from '../single/systemsMent/addDepartment'

    export default {
        name : "content",
        components : {
            saleplan,
            salersInfo,
            createsaleplan,
            saleplancontent,
            saleplaninfo,

            prodPlansInfo,
            weekProdPlans,
            invWarning,
            userManagement,
            orgManagement,
            // staffManagement,
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
            addDepartment,
        }
    }
</script>
<style lang="stylus">
.template
    height 100%
    .layout-content
        height 100%
        .bottom
            height 40px
            width 100%
            text-align center
            line-height 40px
            background #c3c9d2
            position fixed
            bottom 0
            z-index 999
            p
                color #333
                font-size 14px
            
</style>
