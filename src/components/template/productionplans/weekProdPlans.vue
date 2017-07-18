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
                        <el-table-column prop="workplanNo" label="排产计划编号"></el-table-column>
                        <el-table-column prop="week" label="周"></el-table-column>
                        <el-table-column prop="creTm" label="计划生成时间"></el-table-column>
                        <el-table-column prop="issSts" label="下发状态"></el-table-column>
                        <el-table-column prop="issTm" label="下发时间"></el-table-column>
                        <el-table-column prop="issUsr" label="下发人"></el-table-column>
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
                                    @click="detailplan(scope.row.planId)">修改</el-button>
                                    <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.planId)">删除</el-button>
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

<script src="./weekProdPlan.js">
    /**
     * doing
     * done
     *      数据表格查询 search （报错没找出原因）
     *      新建计划 表格可编辑
     *      新建计划数据 同步表格
     *      数据表格 已下发或未下发 判断 {showInfo}
     *      项目前端 部署与压缩打包 上线
     *      登录页
     *      新建计划下发 btn-publish {新建计划中，新增已勾选的计划点击确定下发，保存在数据表格中已下发}
     *      新建计划保存 btn-save {新建计划中，新增但未下发的数据，点击保存，保存在数据表格中的未下发完成 ，并在新建计划中表格}
     *      dialog弹出时，请求获取 客户名称 与 计划类型
     *      分页
     *      重置按钮
     *      数据表格修改 edit （以新增为模板，保存和下发功能分别有新接口）
     *      数据表格详情 {详情页面}
     *      校验
     */  
</script>
<style lang="stylus" rel="stylesheet/stylus">
.prod-table-td
    width 200px
    height 78px
    border 1px solid  #e1e1e1
</style>
