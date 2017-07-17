<template>
   <div class="sale-plan">
        <el-row>
            <!-- 周生产计划 start -->
            <el-col :span="24">
                <div class="content-title">
                    <span>生产计划管理-周生产计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="下发人：">
                            <el-input placeholder="输入人员姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="生成时间：">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="下发时间：">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="reset-btn">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">新增周计划</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 周生产计划 end -->

            <!-- 数据表格 start -->
            <el-col :span="24">
                <el-tabs  type="card" class="list-tab" @tab-click="">
                    <el-tab-pane label="全部" name="first" ></el-tab-pane>
                    <el-tab-pane label="未下发" name="second" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="third"></el-tab-pane>
                </el-tabs>

                <div class="list-table">
                    <el-table
                        style="width: 100% "
                        :data="tableData"
                        @selection-change="">
                        <el-table-column prop="planNo" label="排产计划编号"></el-table-column>
                        <el-table-column prop="createTime" label="周"></el-table-column>
                        <el-table-column prop="operTime" label="计划生成时间"></el-table-column>
                        <el-table-column prop="operUser" label="下发状态"></el-table-column>
                        <el-table-column prop="operation" label="下发时间"></el-table-column>
                        <el-table-column prop="planStatus" label="下发人"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="150">
                            <template scope="scope">
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.planId)">详情</el-button>
                                    <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.planId)">下发</el-button>
                                    <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.planId)">123</el-button>
                                    <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.planId)">321</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
        </el-row>
        <!--分页 start-->
       <!--  <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageList.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=pageList.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total="pageList.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
.prod-table-td
    width 200px
    height 78px
    border 1px solid  #e1e1e1
</style>
