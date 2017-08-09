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
            <el-col :span="24" class="box"> 
                <p class="prod-title">注塑机</p>
                <div class="prod-table">
                    <el-tooltip class="text" effect="dark" content="全部：10" placement="top-start">
                        <p class="prod-text">
                            <span>全部：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="生产：10" placement="top">
                        <p class="prod-text">
                            <span>生产：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="空闲：10" placement="top-end">
                        <p class="prod-text">
                            <span>空闲：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="故障：10" placement="top-end">
                        <p class="prod-text">
                            <span>故障：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="24" class="box"> 
                <p class="prod-title">模具</p>
                <div class="prod-table">
                    <el-tooltip class="text" effect="dark" content="全部：10" placement="top-start">
                        <p class="prod-text">
                            <span>全部：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="生产中：10" placement="top">
                        <p class="prod-text">
                            <span>生产中：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="维修保养中：10" placement="top-end">
                        <p class="prod-text">
                            <span>维修保养中：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                </div>
            </el-col>
            <el-col :span="24" class="box"> 
                <p class="prod-title">原材料</p>
                <div class="prod-table">
                    <el-tooltip class="text" effect="dark" content="种类：10" placement="top-start">
                        <p class="prod-text">
                            <span>种类：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="正常库存：10" placement="top">
                        <p class="prod-text">
                            <span>正常库存：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                    <el-tooltip class="text" effect="dark" content="库存告警：10" placement="top-end">
                        <p class="prod-text">
                            <span>库存告警：</span>
                            <strong>10</strong>
                        </p>
                    </el-tooltip>
                </div>
            </el-col>
            <!-- 数据表格 end -->
        </el-row>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
.box
    margin 0
.prod-title 
    margin-top 20px
    margin-bottom 10px
    padding-left 10px
.text
    width 200px
    height 78px
    color #333743
    border 1px solid  #e1e1e1
.prod-text
    display inline-block
    line-height 78px
    padding 10px
strong
    padding-left 40px
    font-size 30px
    font-weight 100
</style>
