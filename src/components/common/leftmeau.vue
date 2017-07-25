<template>
<div class="left-nav">
    <el-row class="tac">
        <el-col :span="3" >
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
                <el-submenu v-for="item in link" :index="item.index">
                    <template slot="title">{{item.textName}}</template>
                        <el-menu-item v-for="it in item.child" :index="it.index">
                            <a class="left-item" @click="$goRoute(it.route)">{{it.text}}</a>
                            <i class="item.class"></i>
                        </el-menu-item>
                </el-submenu>
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
<style lang="stylus">
@media screen and (max-width:1366px)
    .left-nav
        width:180px !important
        top 50px !important

.left-nav
    position:fixed
    left 0px
    top 70px
    height:100%
    width:203px
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
