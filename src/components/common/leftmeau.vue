<template>
    <div class="template">        
        <div class="layout-menu fixed">
            <el-menu 
                unique-opened
                theme="dark">
                <el-submenu 
                    v-for="item in link" 
                    :index="item.index" 
                    :key="item.index">
                    <template slot="title">
                        <i :class="item.icon" class="fa"></i>{{item.textName}}
                    </template>
                    <el-menu-item 
                        v-for="route in item.child" 
                        :index="route.index" 
                        :key="route.route" 
                        @click="$goRoute(route.route)">
                        <a class="left-item" >{{route.text}}</a>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
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
        }
    }
</script>
<style lang="stylus">

$menu_hover_bgcolor = #1f8ae9;
$gf = #fff;

.layout-menu
    top 50px !important
    height 100%
    width 180px
    color $gf
    .el-submenu__title
    .el-menu
        height 100%
        border-radius 0 
        color $gf
        .left-item
            font-size 12px
            color $gf
        .fa
            margin-right: 7px
            font-size: 16px
        .el-submenu
            &.is-active
                .el-submenu__title
                    background: #48576a       
        .el-menu-item
            padding-left 45px !important /* 替换 ele-ui js 样式 */
            min-width 150px
            font-size 12px
            &:hover,
            &.is-active
                color $gf
                background-color $menu_hover_bgcolor
</style>
