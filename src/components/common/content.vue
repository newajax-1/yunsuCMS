<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>
<script>

  import saleplan from '../template/saleplans/salePlans'
  import salersInfo from '../template/salersInfo'

  import prodPlansInfo from '../template/productionplans/prodPlansInfo'
  import weekProdPlans from '../template/productionplans/weekProdPlans'
  import weekProdPlansInfo from '../template/productionplans/weekProdPlansInfo'

  import invWarning from '../template/invwarning/invWarning'

  // 用户
  import userManagement from '../template/systemsMent/userManagement'
  import roleManagement from '../template/systemsMent/roleManagement'
  import orgManagement from '../template/systemsMent/orgManagement'

  export default {
      name : "content",
      components : {
          saleplan,
          salersInfo,
          prodPlansInfo,
          weekProdPlans,
          weekProdPlansInfo,
          invWarning,
          userManagement,
          orgManagement,
      }
  }
</script>