<template>
    <div class="sale-plan">
        <el-row>

            <!-- sale_plan_form start  -->
            <el-col :span="24">
                <div class="content-title">
                    <span>销售计划管理</span>
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
                                placeholder="选择日期"
                                v-model="search_form_data.createTimeStart">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="search_form_data.createTimeEnd">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="下发时间：">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model=" search_form_data.operTimeStart">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="search_form_data.operTimeEnd ">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item><el-button class="btn btn-blue" @click="searchFormData()">查询</el-button></el-form-item>
                        <el-form-item><el-button class="btn btn-yellow" @click="reset">重置</el-button></el-form-item>

                    </el-form>
                </div>
            </el-col>
            <el-col :span="24" class="content-buttons">
                <el-button class="list-buttons" @click="refresh"><i class="fa fa-repeat"></i> 刷新</el-button>
                <el-button class="list-buttons" @click="openSalePlanModal('新建计划')"><i class="fa fa-user-plus"></i> 新建计划</el-button>
            </el-col>
            <!-- sale_plan_form end  -->

            <el-col :span="24">

                <el-tabs v-model="saleChangeName" type="card" class="list-tab" @tab-click="changeTableActive">
                    <el-tab-pane label="全部" name="all" ></el-tab-pane>
                    <el-tab-pane label="未下发" name="unIssue" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="issued"></el-tab-pane>
                </el-tabs>

                <div class="list-table">
                    <el-table
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
                                    @click="openSalePlanModal('修改计划',scope.row.planId)"
                                    v-show = "saleplan_push_tips[scope.$index].show">修改</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="confirmOperation(scope.row.planId,scope.$index,'下发')"
                                    v-show = "saleplan_push_tips[scope.$index].show">下发</el-button>
                                <el-button 
                                    type="text"
                                    size="small">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>

            <div class="list-page fr">
                <el-pagination
                    layout="total, sizes, prev, pager, next"
                    :current-page.sync="sale_page_list.pageNum"
                    :page-sizes="[10]"
                    :page-size="sale_page_list.pageSize"
                    :total="sale_page_list.total"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>

            <el-dialog
                size="large"
                custom-class="pub-dialog"
                :title="modal_title"
                :before-close="confirmCloseModal"
                :visible.sync="modal_show_tips">
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">
                            <el-form 
                                ref="modal_form_data"
                                :inline="true"
                                :model="modal_form_data" 
                                :rules="modal_form_rules">
                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="客户名称：" prop="custName">
                                            <el-select placeholder="选择客户" v-model="modal_form_data.custName">
                                                 <el-option v-for="item in guest_name_data" :label="item.custName" :value="item.custNo" :key="item.custNo"></el-option>  
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item label='订单编号：' prop="orderNo">
                                            <el-input  v-model='modal_form_data.orderNo'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="8">
                                        <el-form-item label="订单日期：" prop="orderDate">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model="modal_form_data.orderDate">
                                            </el-date-picker>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    
                                </el-row>

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="产品型号：" prop="itemNo">
                                            <el-input v-model='modal_form_data.itemNo'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品名称：" prop="itemName">
                                            <el-input v-model='modal_form_data.itemName'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="需求数量：" prop="quantity">
                                            <el-input v-model='modal_form_data.quantity'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="交货日期：" prop="deliveryDate">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model='modal_form_data.deliveryDate'>
                                            </el-date-picker>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划类型：" prop="planType">
                                            <el-select placeholder="选择客户" v-model='modal_form_data.planType'>
                                                <el-option label="生产" value="01"></el-option>
                                                <el-option label="库存" value="02"></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col >
                                        <div class="mid-btn">
                                            <el-button class="btn btn-green" @click="addPlan()">完 成</el-button>
                                            <el-button class="btn btn-red" @click="closePlan()">关 闭</el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </div>
                    </el-col>
                </el-row>

                <div class="message clearfix">
                    <div class="fl">
                        <el-button class="btn btn-yellow">编 辑</el-button>
                        <el-button class="btn btn-green">保 存</el-button>
                        <el-button class="btn btn-blue">下 发</el-button>
                    </div>
                    <div class="fr">共有<span class="detailMsg"></span>条下发计划</div>
                </div>

                <div class="modal-table">
                    <el-table
                        width="100%"
                        height="250"
                        :data="modal_table_data">
                        <el-table-column
                            prop="planType"
                            label="计划类型">
                            <template scope="scope">
                                <el-select 
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.planType">
                                    <el-option label="生产" value="01"></el-option>
                                    <el-option label="库存" value="02"></el-option>
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="custName"
                            label="客户名称">
                            <template scope="scope">
                                <el-select 
                                    v-model="scope.row.custName"
                                    :disabled="modal_table_edit">
                                      <el-option v-for="item in guest_name_data" :label="item.custName" :value="item.custNo" :key="item.custNo"></el-option>  
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="orderNo"
                            label="订单编号">
                            <template scope="scope">
                                <el-input 
                                    type="text" 
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.orderNo" >
                                </el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="orderDate"
                            label="订单日期">
                            <template scope="scope">
                                <el-date-picker 
                                    type="date" 
                                    style="width: 100%;"
                                    placeholder="选择日期" 
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.orderDate"></el-date-picker>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="itemNo"
                            label="产品编号">
                            <template scope="scope">
                                <el-input 
                                    type="text" 
                                    v-model="scope.row.itemNo" 
                                    :disabled="modal_table_edit">
                                </el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="itemName"
                            label="产品名称">
                            <template scope="scope">
                                <el-input
                                    type="text" 
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.itemName">
                                </el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="quantity"
                            label="数量">
                            <template scope="scope">
                                <el-input 
                                    type="text"
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.quantity" >
                                </el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="unit"
                            label="单位">
                            <template scope="scope">
                                <el-input 
                                    type="text" 
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.unit">
                                </el-input>
                            </template>
                        </el-table-column>

                        <el-table-column
                            prop="deliveryDate"
                            label="交货日期">
                            <template scope="scope">
                                <el-date-picker 
                                    type="date" 
                                    style="width: 100%;"
                                    placeholder="选择日期" 
                                    :disabled="modal_table_edit"
                                    v-model="scope.row.deliveryDate"></el-date-picker>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-dialog>
        <!--新增弹框 end-->

        </el-row>
    </div>
</template>

<script src="./saleplan.js">
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .message
        margin-top 30px
        padding 5px 0
        border-top 1px solid #e1e1e1
    .el-table__row 
        td
            padding 10px 0
</style>
