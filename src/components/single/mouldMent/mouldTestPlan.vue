<template>
	<div class="test-plan">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具管理-模具试模计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="模具编号：">
                            <el-input placeholder="输入模具编号" v-model="search_info.mould_no"></el-input>
                        </el-form-item>
                        <el-form-item label="模具代码：">
                            <el-input placeholder="输入模具代码" v-model="search_info.mould_code"></el-input>
                        </el-form-item>
                        <el-form-item label="生成时间：">
                            <el-date-picker
                                type="date"
                                :editable=false
                                v-model="search_info.start_time"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                type="date"
                                :editable=false
                                v-model="search_info.end_time"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click="searchTableData()" class="btn btn-blue btn-small"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-orange btn-small"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                       
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
                <el-button @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-repeat"></i> 刷 新</el-button>
                <el-button @click="deleteId(2)" class="btn btn-blue btn-small"><i class="fa fa-trash-o"></i> 删 除</el-button>
                <el-button @click="deleteId(1)" class="btn btn-blue btn-small"><i class="fa fa-sign-in"></i> 下 发</el-button>
                <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 新建计划</el-button>
            </el-col>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="未下发" name="first" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="second"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="table_data" 
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="testMouldPlanNo" label="试模计划编号"></el-table-column>
                        <el-table-column prop="createTime" label="计划生成时间"></el-table-column>
                        <el-table-column prop="oprTm" label="计划下发时间" v-if="!table_show"></el-table-column>
                        <el-table-column prop="oprNm" label="下发人" v-if="!table_show"></el-table-column>
                        <el-table-column prop="testMouldTyp" label="试模类型"></el-table-column>
                        <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column prop="mouldCode" label="模具代码"></el-table-column>
                        <el-table-column prop="machine" label="归属机台" v-if="!table_show"></el-table-column>
                        <el-table-column prop="testStartTm" label="试模开始时间" v-if="!table_show"></el-table-column>
                        <el-table-column prop="testEndTm" label="试模结束时间" v-if="!table_show"></el-table-column>
                        <el-table-column prop="manager" label="负责人"></el-table-column>
                        <el-table-column prop="testResultName" label="试模结果" v-if="!table_show"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    v-if="table_show"
                                    @click="toAdd(scope.row.testMouldPlanId)">编辑</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    v-if="table_show"
                                    @click="deleteId(1, scope.row.testMouldPlanId)">下发</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    v-if="table_show"
                                    @click="deleteId(2, scope.row.testMouldPlanId)">删除</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    v-if="!table_show && scope.row.testResult == '03'"
                                    @click="successMould(scope.row.testMouldPlanId)">完成</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页 start-->
                    <div class="table-page" v-if="page_list.total === 0 ? false : true">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page_list.page_num"
                            :page-size=page_list.page_size
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[15, 20, 30, 40]"
                            :total="page_list.total">
                        </el-pagination>
                    </div>
                    <!--分页 end-->
                </div>
                 <!-- 列表开始  end -->
            </el-col>
        </el-row>

        <!--新增弹框-->
        <el-dialog
            :title="diag_title"
            :visible.sync="new_custom"
            size="small"
            class="default-dialog dialog-small"
            :before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <div class="pub-mask-wrap">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="设备类型：">
                                        <el-select 
                                            placeholder="选择设备类型" 
                                            class="required" 
                                            v-model="add_info.testMouldTyp">
                                            <el-option 
                                            v-for="item in select_op_one"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="　负责人：">
                                        <el-input placeholder="请输入负责人姓名" class="required" v-model="add_info.manager"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="模具代码：">
                                        <el-select 
                                            placeholder="请输入模具代码" 
                                            class="required" 
                                            v-model="add_info.mouldCode" 
                                            @change="changeType(add_info.mouldCode)">
                                            <el-option 
                                            v-for="item in select_op_second"
                                            :label="item.mould_code"
                                            :value="item.mould_code"
                                            :key="item.mould_code"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="预计时间：">
                                        <el-date-picker
                                            type="datetime"
                                            :editable=false
                                            v-model="add_info.testTm"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./mouldtestplans.js"></script>
<style lang="stylus" scoped>
</style>