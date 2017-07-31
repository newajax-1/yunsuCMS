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
          invWarning,
          userManagement,
          orgManagement,
      }
  }
</script>