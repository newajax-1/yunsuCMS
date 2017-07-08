<template>
    <div class="left-nav">
      <el-row class="tac">
        <el-col :span="3" >
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark"style="border-radius:0;">
            <el-menu-item v-for="item in link" index="item.index" ><a class="left-item" @click="$goRoute(item.route)">{{item.text}}</a><i class="item.class"></i></el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>
<script>
  export default {
    name:"leftmeau",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        link:[
          {
            text:'销售计划管理',
            route:'/home/saleplan',
            index:'1',
            class:'',
          },
          {
            text:'客户信息管理',
            route:'/home/salersInfo',
            index:'2',
            class:'',
          },
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      }
    }
  }
</script>
<style lang="stylus">
  @media screen and (max-width:1366px)
    .left-nav
      width:203px !important
      top 70px !important

  .left-nav
    position:fixed
    left 0px
    top 80px
    height:100%
    width:236px
    .tac.el-row,
    .el-col.el-col-3,
    .el-menu
      height:100%
    .el-col-3
      width:100%
    .el-menu--dark
      background-color: #333743;
    .left-item
      display:block


</style>
