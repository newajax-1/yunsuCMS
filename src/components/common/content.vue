<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>
<script>

  import saleplan from '../template/saleplans/salePlans'
  import saleplaninfo from '../template/saleplans/saleplaninfo'
  import salersInfo from '../template/salersInfo'

  import prodPlansInfo from '../template/productionplans/prodPlansInfo'
  import weekProdPlans from '../template/productionplans/weekProdPlans'
  import schedulingPlans from '../template/productionplans/schedulingPlans'

    export default {
        name : "content",
        components : {
            saleplan,
            salersInfo,
            saleplaninfo,
            prodPlansInfo,
            weekProdPlans,
            schedulingPlans,
        }
    }
</script>