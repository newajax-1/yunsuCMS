<template>
	<div class="work-monitoring">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>工单管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="排产计划编号：" v-if="first_table_show">
                            <el-input placeholder="输入排产计划编号" v-model="seach_info.workplan_no"></el-input>
                        </el-form-item>
                        <el-form-item label="周：" v-if="first_table_show">
                            <el-input placeholder="输入周" v-model="seach_info.week"></el-input>
                        </el-form-item>
                        <el-form-item label="生产批号：" v-if="second_table_show || second_table_text_show || other_table_show">
                            <el-input placeholder="输入生产批号" v-model="seach_info.product_no"></el-input>
                        </el-form-item>
                        <el-form-item label="产品型号：" v-if="second_table_show || second_table_text_show || other_table_show">
                            <el-input placeholder="输入产品型号" v-model="seach_info.item_no"></el-input>
                        </el-form-item>
                        <el-form-item label="计划生产时间：">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="seach_info.issStartTime">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="seach_info.issEndTime">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="search()" class="btn btn-blue btn-small">查询</el-button>
                            <el-button @click="reset()" class="btn btn-orange btn-small">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-repeat"></i> 刷新</el-button>
                </el-col>
            </div>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="未下发" name="first" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="second"></el-tab-pane>
                    <el-tab-pane label="已停止" name="other"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <el-table 
                        border
                        :data="first_table_data" 
                        style="width: 100%" 
                        v-if="first_table_show">
                        <el-table-column prop="workplanNo" label="排产计划编号"></el-table-column>
                        <el-table-column prop="week" label="周"></el-table-column>
                        <el-table-column prop="planIssSts" label="下发进度"></el-table-column>
                        <el-table-column prop="issTm" label="下发时间"></el-table-column>
                        <el-table-column prop="issUsrName" label="下发人"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="showDetail(scope.row.workplanWeekId)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="table-wrap">
                    <h1 v-if="second_table_text_show" style="font-weight: 400; font-size: 14px;">请输入检索条件查询已下发工单内容</h1>
                    <el-table 
                        border
                        :data="second_table_data" 
                        style="width: 100%" 
                        v-if="second_table_show">
                        <el-table-column prop="itemNo" label="产品型号"></el-table-column>
                        <el-table-column prop="itemName" label="产品名称"></el-table-column>
                        <el-table-column prop="productNo" label="生产批号"></el-table-column>
                        <el-table-column prop="billNo" label="工单号"></el-table-column>
                        <el-table-column prop="machine" label="机台归属"></el-table-column>
                        <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column prop="materialGrade" label="原材料"></el-table-column>
                        <el-table-column prop="scndProc" label="二次加工"></el-table-column>
                        <el-table-column prop="createTime" label="计划生产日期"></el-table-column>
                        <el-table-column prop="week" label="周"></el-table-column>
                        <el-table-column prop="clas" label="班次"></el-table-column>
                        <el-table-column prop="empName" label="班次工人"></el-table-column>
                        <el-table-column prop="quantity" label="计划产量"></el-table-column>
                        <el-table-column prop="prodSts" label="生产状态"></el-table-column>
                        <el-table-column prop="operTime" label="下发时间"></el-table-column>
                        <el-table-column prop="operUserName" label="下发人"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="stopWorkInfo(scope.row.workplanBillId)">终止</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="table-wrap">
                    <el-table 
                        border
                        :data="other_table_data" 
                        v-if="other_table_show">
                        <el-table-column prop="itemNo" label="产品型号"></el-table-column>
                        <el-table-column prop="itemName" label="产品名称"></el-table-column>
                        <el-table-column prop="productNo" label="生产批号"></el-table-column>
                        <el-table-column prop="billNo" label="工单号"></el-table-column>
                        <el-table-column prop="machine" label="机台归属"></el-table-column>
                        <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column prop="materialGrade" label="原材料"></el-table-column>
                        <el-table-column prop="scndProc" label="二次加工"></el-table-column>
                        <el-table-column prop="createTime" label="计划生产日期"></el-table-column>
                        <el-table-column prop="week" label="周"></el-table-column>
                        <el-table-column prop="clas" label="班次"></el-table-column>
                        <el-table-column prop="empName" label="班次工人"></el-table-column>
                        <el-table-column prop="quantity" label="计划产量"></el-table-column>
                        <el-table-column prop="prodSts" label="生产状态"></el-table-column>
                        <el-table-column prop="operTime" label="下发时间"></el-table-column>
                        <el-table-column prop="trmtTm" label="停止时间"></el-table-column>
                        <el-table-column prop="operUserName" label="下发人"></el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>
	    </el-row>
        <!--分页 start-->
        <div class="table-page fr" v-if="!second_table_text_show">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-size=page_list.page_size
                    layout="total, prev, pager, next"
                    :total="page_list.total">
            </el-pagination>
        </div>
        <!--分页 end-->
	    <!-- 终止工单弹框 start -->
	    <el-dialog
            size="small"
            title="终止工单"
            class="default-dialog dialog-small"
            :before-close="handleClose"
            :visible.sync="stop_custom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="other-table table-wrap">
		                    <el-table 
                                border
                                :data="stop_data" 
                                style="width: 100%">
		                        <el-table-column prop="weekDate" label="日期"></el-table-column>
		                        <el-table-column prop="clas" label="班次"></el-table-column>
		                        <el-table-column prop="billNo" label="工单号"></el-table-column>
		                        <el-table-column prop="quantity" label="计件量"></el-table-column>
		                        <el-table-column prop="empName" label="工人姓名"></el-table-column>
		                    </el-table>
		                </div>
                    </el-col>
                </el-row>
            </div>
            <div class="stop-message">
            	<p class="stop-message">请选择终止原因并提交</p>
                <el-radio class="radio" v-model="stop_data_info.radio" label="01">注塑机故障</el-radio>
                <el-radio class="radio" v-model="stop_data_info.radio" label="02">其他设备故障</el-radio>
                <el-radio class="radio" v-model="stop_data_info.radio" label="03">模具故障</el-radio>
                <el-radio class="radio" v-model="stop_data_info.radio" label="04">原材料短缺</el-radio>
                <el-radio class="radio" v-model="stop_data_info.radio" label="05">人员调整</el-radio>
            </div>
            <div class="stop-message">
                <el-radio class="radio" v-model="stop_data_info.radio" label="06">其他</el-radio>
                <el-input placeholder="请简单描述终止原因" class="radio-input change-inline" :disabled="stop_data_info.radio === '06' ? false : true" v-model="stop_data_info.comment" :class="stop_data_info.radio === '06' ? 'asterisk' : ''"></el-input>
            </div>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="stopWork()">完 成</el-button>
                <el-button class="btn btn-small btn-gray" @click="handleClose()">关 闭</el-button>
            </div>
        </el-dialog>
	    <!-- 终止工单弹框 end -->
	</div>
</template>
<script src="./workmonitorings.js"></script>
<style lang="stylus">
.work-monitoring
    .stop-message
        margin 20px 0
        .el-input__inner
            width 400px
    .change-inline
        width 420px
        display inline-block

</style>