<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>
<script>

  import saleplan from '../template/saleplans/salePlans'
  import saleplaninfo from '../template/saleplans/saleplaninfo'
  import salersInfo from '../template/salersInfo'

    export default {
        name : "content",
        components : {
            saleplan,
            salersInfo,
            saleplaninfo
        }
    }
</script>