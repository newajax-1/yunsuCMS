<template>
    <div class="layout-menu">
        <el-menu default-active="2" @open="handleOpen" @close="handleClose" theme="dark">
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
        data() {
            return {
                activeIndex: '1',
                link:[
                    {
                        textName: "销售管理",
                        index: "1",
                        child: [
                            {
                                text: "销售计划管理",
                                route: "/home/saleplan",
                                index: "1-1",
                                class: "",
                            },
                            {
                                text: "客户信息管理",
                                route: "/home/salersInfo",
                                index: "1-2",
                                class: "",
                            },
                        ],
                    },
                    {
                        textName: "生产计划",
                        index: "2",
                        child: [
                            {
                                text: "生产资源状态监控",
                                route: "/home/prodplansinfo",
                                index: "2-1",
                                class: "",
                            },
                            {
                                text: "周生产计划",
                                route: "/home/weekprodplans",
                                index: "2-2",
                                class: "",
                            },
                            {
                                text: "库存预警",
                                route: "/home/invwarning",
                                index: "2-3",
                                class: "",
                            },
                        ],
                    },
                    {
                        textName: "系统管理",
                        index: "3",
                        child: [
                            {
                                text: "用户管理",
                                route: "/home/usermanagement",
                                index: "3-1",
                                class: "",
                            },
                            {
                                text: "角色管理",
                                route: "/home/rolemanagement",
                                index: "3-2",
                                class: "",
                            },
                            {
                                text: "组织管理",
                                route: "/home/orgmanagement",
                                index: "3-3",
                                class: "",
                            },
                        ],
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
