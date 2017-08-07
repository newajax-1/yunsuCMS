<template>
    <div class="layout-menu">
        <el-menu default-active="2" 
            unique-opened
            @open="handleOpen" 
            @close="handleClose" 
            theme="dark">
            <el-submenu v-for="item in link" :index="item.index" :key="item.index">
                <template slot="title">{{item.textName}}</template>
                    <el-menu-item v-for="route in item.child" :index="route.index" :key="route.route" @click="$goRoute(route.route)">
                        <a class="left-item" >{{route.text}}</a>
                    </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>    
    export default {
        name:"leftmeau",
        created(){
            var that = this;

            let link = sessionStorage.getItem("menuList");
            if(!link){
                EventBus.$on("MenuList",function(data){
                    if(data){
                        for(let i = 0 ; i < data.length ; i++){
                            that.link.push(data[i]);
                        }
                    }
                })
            }else{
                let link_arr = JSON.parse(link);
                for(let i = 0 ; i < link_arr.length ; i++){
                    that.link.push(link_arr[i]);
                }
            }
        },
        destory(){
            EventBus.$off("MenuList");
        },
        data() {
            return {
                link : []
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
<style lang="stylus" scoped>
@media screen and (max-width:1366px)
    .layout-page
        .layout-menu
            width:180px 
            top 50px 

.layout-menu
    position fixed
    top 50px
    left 0
    height 100%
    width 180px
    .el-menu
        height 100%
        border-radius 0
.el-submenu .el-menu-item
    min-width 180px
</style>
