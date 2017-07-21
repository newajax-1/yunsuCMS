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
  import weekProdPlansInfo from '../template/productionplans/weekProdPlansInfo'

  import invWarning from '../template/invwarning/invWarning'

  // 用户
  import userManagement from '../template/systemsMent/userManagement'
  import roleManagement from '../template/systemsMent/roleManagement'

  import test from '../template/test'

  export default {
      name : "content",
      components : {
          saleplan,
          salersInfo,
          saleplaninfo,
          prodPlansInfo,
          weekProdPlans,
          weekProdPlansInfo,
          invWarning,
          userManagement,
          roleManagement,
          test,
      }
  }
</script>