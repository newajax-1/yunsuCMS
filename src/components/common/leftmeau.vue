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
                            },
                            {
                                text: "客户信息管理",
                                route: "/home/salersInfo",
                                index: "1-2",
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
                            },
                            {
                                text: "周生产计划",
                                route: "/home/weekprodplans",
                                index: "2-2",
                            },
                            {
                                text: "库存预警",
                                route: "/home/invwarning",
                                index: "2-3",
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
                            },
                            {
                                text: "角色管理",
                                route: "/home/rolemanagement",
                                index: "3-2",
                            },
                            {
                                text: "组织管理",
                                route: "/home/orgmanagement",
                                index: "3-3",
                            },
                            {
                                text: "员工管理",
                                route: "/home/staffmanagement",
                                index: "3-4",
                            },
                        ],
                    },
                    {
                        textName: "生产作业",
                        index: "4",
                        child: [
                            {
                                text: "生产进度监控",
                                route: "/home/promonitoring",
                                index: "4-1",
                            },
                            {
                                text: "工单管理",
                                route: "/home/workmonitoring",
                                index: "4-2",
                            },
                            {
                                text: "设备报警",
                                route: "/home/warningfacmonitoring",
                                index: "4-3",
                            },
                            {
                                text: "质量报警",
                                route: "/home/warningquamonitoring",
                                index: "4-4",
                            },
                            {
                                text: "模具作业管理",
                                route: "/home/modelmonitoring",
                                index: "4-5",
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
