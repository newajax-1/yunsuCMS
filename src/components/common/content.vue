<template>
    <router-view></router-view>
</template>
<script>
  import saleplan from '../template/saleplan'
  import salersInfo from '../template/salersInfo'

    export default{
        name : "content",
        components : {
            saleplan,
            salersInfo
        }
    }
</script>