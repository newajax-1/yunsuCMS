<template>
   <div class="sale-plan">
        <el-row>
            <!-- 生产计划管理 start -->
            <el-col :span="24">
                <div class="content-title">
                    <span>生产计划管理-生产资源计划监控</span>
                </div>
            </el-col>
            <!-- 生产计划管理 end -->
            <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="prod-table">
                    <span>注塑机</span>
                    <table>
                        <tr>
                            <td class="prod-table-td">
                                <span>全部</span>
                                <span>10</span>
                            </td>
                            <td class="prod-table-td">
                                <span>生产</span>
                                <span>10</span>
                            </td> 
                            <td class="prod-table-td">
                                <span>空闲</span>
                                <span>10</span>
                            </td> 
                            <td class="prod-table-td">
                                <span>故障</span>
                                <span>10</span>
                            </td> 
                        </tr>
                    </table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
        </el-row>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
.prod-table-td
    width 200px
    height 78px
    border 1px solid  #e1e1e1
</style>
