<template>
    <div class="sale-plan-content">
        <el-col :span="24">
            <div class="content-title">
                <span>销售管理-销售计划管理</span>
            </div>
            <div class="content-search">
                <el-form :inline="true">

                    <el-form-item label="下发人：">
                        <el-input 
                            placeholder="输入人员姓名" 
                            v-model='search_form_data.operUserName'></el-input>
                    </el-form-item>

                    <el-form-item label="生成时间：">
                        <el-date-picker
                            type="date"
                            :editable="false"
                            placeholder="选择日期"
                            v-model="search_form_data.createTimeStart">
                        </el-date-picker>
                        <span class="pad-line-default">至</span>
                        <el-date-picker
                            type="date"
                            :editable="false"
                            placeholder="选择日期"
                            v-model="search_form_data.createTimeEnd">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="下发时间：">
                        <el-date-picker
                            type="date"
                            :editable="false"
                            placeholder="选择日期"
                            v-model=" search_form_data.operTimeStart">
                        </el-date-picker>
                        <span class="pad-line-default">至</span>
                        <el-date-picker
                            type="date"
                            :editable="false"
                            placeholder="选择日期"
                            v-model="search_form_data.operTimeEnd ">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="btn btn-small btn-blue" @click="searchFormData()"><i class="fa fa-search"></i> 查 询</el-button>
                        <el-button class="btn btn-small btn-orange" @click="reset"><i class="fa fa-window-restore"></i> 重 置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <el-col :span="24" class="content-buttons">
            <el-button class="btn btn-small" @click="refresh"><i class="fa fa-refresh "></i> 刷 新</el-button>
            <el-button class="btn btn-large" @click="gotoCreateSalePlan()"><i class="fa fa-file-text-o"></i> 新建计划</el-button>
        </el-col>
        <!-- sale_plan_form end  -->

        <el-col :span="24">

            <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                <el-tab-pane label="全部" name="all" ></el-tab-pane>
                <el-tab-pane label="未下发" name="unIssue" ></el-tab-pane>
                <el-tab-pane label="已下发" name="issued"></el-tab-pane>
            </el-tabs>

            <div class="table-wrap">
                <el-table
                    border
                    :height="$tableHeight"
                    style="width: 100% "
                    :data="saleplan_table_data">
                    <el-table-column prop="planNo" label="销售计划编号"></el-table-column>
                    <el-table-column prop="createTime" label="计划生成时间"></el-table-column>
                    <el-table-column prop="operTime" label="下发时间"></el-table-column>
                    <el-table-column prop="operUserName" label="下发人"></el-table-column>
                    <el-table-column prop="operationName" label="下发状态"></el-table-column>
                    <el-table-column prop="planStatus" label="排产状态"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button
                                type="text"
                                size="small"
                                @click="gotoCreateSalePlan(scope.row.planId)"
                                v-show = "saleplan_push_tips[scope.$index].show">修改</el-button> 
                            <el-button
                                type="text"
                                size="small"
                                @click="confirmOperation(scope.row.planId,scope.$index,'下发')"
                                v-show = "saleplan_push_tips[scope.$index].show">下发</el-button> 
                            <el-button 
                                type="text"
                                size="small"
                                v-show="!saleplan_push_tips[scope.$index].show"
                                @click="gotoCreateSalePlan(scope.row.planId,true)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div class="table-page">
                    <el-pagination
                        layout="total, sizes, prev, pager, next, jumper"
                        :current-page.sync="sale_page_list.pageNum"
                        :page-size="sale_page_list.pageSize"
                        :page-sizes="[15, 20, 30, 40]"
                        :total="sale_page_list.total"
                        @size-change="currentSizeChange"
                        @current-change="currentPageChange">
                    </el-pagination>
                </div>
            </div>
        </el-col>
    </div>
</template>
<script src="./saleplancontents.js"></script>
