<template>
   <div class="week-prod-plans">
        <el-row>
            <!-- 周计划 数据表格 start -->
            <el-col :span="24">
                <div class="content-title">
                    <span>生产计划管理-周生产计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true">
                        <el-form-item 
                            label="下发人：">
                            <el-input 
                                placeholder="输入人员姓名" 
                                v-model='search_form_data.issUsrName'></el-input>
                        </el-form-item>

                        <el-form-item 
                            label="生成时间：">
                            <el-date-picker
                                v-model="search_form_data.creStartTime"
                                type="date"
                                :editable=false
                                placeholder="选择日期">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                v-model="search_form_data.creEndTime"
                                type="date"
                                :editable=false
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item 
                            label="下发时间：">
                            <el-date-picker
                                v-model="search_form_data.issStartTime"
                                type="date"
                                :editable=false
                                placeholder="选择日期">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                v-model="search_form_data.issEndTime"
                                type="date"
                                :editable=false
                                placeholder="选择日期">
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
                <el-button class="btn btn-blue btn-samll" @click="refresh"><i class="fa fa-refresh "></i> 刷 新</el-button>
                <el-button class="btn btn-blue btn-large" @click="openWeekplanModal('新建周计划')"><i class="fa fa-file-text-o"></i> 新建周计划</el-button>
            </el-col>

            <el-col :span="24">
                <el-tabs v-model="weekplan_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="全部" name="all" ></el-tab-pane>
                    <el-tab-pane label="未下发" name="unIssue" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="issued"></el-tab-pane>
                </el-tabs>

                <div class="table-wrap">
                    <el-table
                        border
                        style="width: 100% "
                        :data="weekplan_table_data">
                        <el-table-column prop="workplanNo" label="排产计划编号"></el-table-column>
                        <el-table-column prop="week" label="周"></el-table-column>
                        <el-table-column prop="creTm" label="计划生成时间"></el-table-column>
                        <el-table-column prop="issSts" label="下发状态"></el-table-column>
                        <el-table-column prop="issTm" label="下发时间"></el-table-column>
                        <el-table-column prop="issUsrName" label="下发人"></el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button 
                                    @click="openWeekplanModal('修改周计划',scope.row.workplanWeekId,scope.row.week)"
                                    v-show="weekplan_push_tips[scope.$index].show"
                                    type="text"
                                    size="small">修改</el-button>
                                <el-button 
                                    @click="confirmOperation(scope.row.workplanWeekId,scope.$index,'下发')"
                                    v-show="weekplan_push_tips[scope.$index].show"
                                    type="text"
                                    size="small">下发</el-button>
                                <el-button 
                                    @click="confirmOperation(scope.row.workplanWeekId,'','删除')"
                                    v-show="weekplan_push_tips[scope.$index].show"
                                    type="text"
                                    size="small">删除</el-button>
                                <el-button
                                    @click="openWeekplanInfo(scope.row.workplanWeekId,scope.row.week,'周计划详情')"
                                    v-show="!weekplan_push_tips[scope.$index].show"
                                    type="text"
                                    size="small">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table-page">
                        <el-pagination
                            layout="total, prev, pager, next"
                            :current-page.sync="weekplan_page_list.pageNum"
                            :page-size="weekplan_page_list.pageSize"
                            :total="weekplan_page_list.total"
                            @size-change="currentSizeChange"
                            @current-change="currentPageChange">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
            <!-- 周计划 数据表格 end -->

            <!-- 周计划 新建或修改 start -->
            <el-dialog
                size="full"
                class="default-dialog"
                :title="modal_title"
                :before-close="confirmCloseModal"
                :visible.sync="modal_show_tips">
                    <el-row>
                        <div class="table-wrap">
                            <el-table
                                border
                                width="auto"
                                :data="modal_weekplan_table_data"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="60"></el-table-column>

                                <el-table-column width="60" prop="type" label="类型">
                                    <template  scope="scope">
                                        <el-select  placeholder="请选择"  :disabled="modal_table_edit" v-model="scope.row.type">
                                            <el-option 
                                                v-for="item in modal_sync_data.typeList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"
                                                :key="item.dicValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="lv" label="优先级">
                                    <template  scope="scope">
                                        <el-select  placeholder="请选择" :disabled="modal_table_edit" v-model="scope.row.lv">
                                            <el-option 
                                                v-for="item in modal_sync_data.priorityList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"
                                                :key="item.dicValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="custNo" label="客户">
                                    <template scope="scope">
                                        <!-- 联动效果 勿删
                                        <el-select 
                                            placeholder="请选择" 
                                            :disabled="modal_table_edit" 
                                            v-model="scope.row.custNo" 
                                            @change="getOrderDataList(scope.row.custNo,scope.$index)"> -->
                                        <el-select 
                                            placeholder="请选择" 
                                            :disabled="modal_table_edit" 
                                            v-model="scope.row.custNo" >
                                            <el-option  
                                                v-for="item in modal_sync_data.custList" 
                                                :label="item.custName" 
                                                :value="item.custNo"
                                                :key="item.custNo">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="ordrNo" label="订单编号">
                                    <template  scope="scope">
                                        <el-tooltip class="item" effect="light" :disabled="!scope.row.machine" :content="scope.row.ordrNo" placement="bottom-start">
                                            <!-- 联动效果 勿删
                                            <el-select 
                                                :disabled="modal_table_edit" 
                                                v-model="scope.row.ordrNo"
                                                @change="getProductData(scope.row.ordrNo,scope.$index)">
                                                <el-option 
                                                    v-for="item in scope.row.tempOrder"
                                                    :label="item.orderNo"
                                                    :value="item.orderNo"
                                                    :key="item.orderNo"></el-option>
                                            </el-select> -->
                                            <el-input
                                                :disabled="modal_table_edit" 
                                                v-model="scope.row.ordrNo"
                                                @blur="getProductData(scope.row.ordrNo,scope.$index)">
                                            </el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="itemNo" label="产品型号">
                                    <template  scope="scope" >
                                        <el-tooltip class="item" effect="light" :disabled="!scope.row.machine" :content="scope.row.itemNo" placement="bottom-start">
                                            <!-- 联动效果 勿删
                                            <el-select 
                                                :disabled="modal_table_edit" 
                                                v-model="scope.row.itemNo"
                                                @change="setProductName(scope.row.itemNo,scope.$index)">
                                                <el-option 
                                                    v-for="item in scope.row.tempItem"
                                                    :label="item.itemNo"
                                                    :value="item.itemNo"
                                                    :key="item.itemNo"></el-option>
                                            </el-select> -->
                                            <el-input
                                                :disabled="modal_table_edit" 
                                                v-model="scope.row.itemNo">
                                            </el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="itemName" label="产品名称">
                                    <template  scope="scope">
                                        <el-tooltip class="item" effect="light" :disabled="!scope.row.itemName" :content="scope.row.itemName" placement="bottom-start">
                                            <el-input :disabled="modal_table_edit" v-model="scope.row.itemName"></el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="69" prop="productNo" label="生产批号">
                                    <template  scope="scope">
                                        <el-tooltip class="item" effect="light" :disabled="!scope.row.productNo" :content="scope.row.productNo" placement="bottom-start">
                                            <el-input disabled v-model="scope.row.productNo"></el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="machine" label="机台归属">
                                    <template  scope="scope">
                                        <el-tooltip class="item" effect="light"  :disabled="!scope.row.machine" :content="scope.row.machine" placement="bottom-start">
                                            <el-input :disabled="modal_table_edit" v-model="scope.row.machine"></el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="moldingCycle" label="单件周期">
                                    <template  scope="scope">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.moldingCycle"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="mouldNo" label="模具编号">
                                    <template  scope="scope">
                                        <el-tooltip class="item" effect="light" :disabled="!scope.row.mouldNo" :content="scope.row.mouldNo" placement="bottom-start">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.mouldNo"></el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="materialGrade" label="原材料">
                                    <template  scope="scope">
                                        <el-tooltip class="item" effect="light" :disabled="!scope.row.materialGrade" :content="scope.row.materialGrade" placement="bottom-start">
                                            <el-input :disabled="modal_table_edit" v-model="scope.row.materialGrade"></el-input>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="scndProc" label="二次加工">
                                    <template  scope="scope">
                                        <el-select :disabled="modal_table_edit" placeholder="请选择" v-model="scope.row.scndProc">
                                            <el-option value="">请选择</el-option>
                                            <el-option  
                                                v-for="item in modal_sync_data.processList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"
                                                :key="item.dicValue"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column  prop="planBill" :label="modal_week_date.week">
                                    <el-table-column :label="modal_week_date.mondayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.planBill.monday.day.quantity"
                                                    :disabled="modal_table_edit"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.planBill.monday.night.quantity"
                                                    :disabled="modal_table_edit"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column  prop="issUsr" :label="modal_week_date.tuesdayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.tuesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.tuesday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column  prop="issUsr" :label="modal_week_date.wednesdayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.wednesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.wednesday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column  prop="issUsr" :label="modal_week_date.thursdayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.thursday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.thursday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column  prop="issUsr" :label="modal_week_date.fridayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.friday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.friday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column prop="issUsr" :label="modal_week_date.saturdayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.saturday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.saturday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column prop="issUsr" :label="modal_week_date.sundayDate">
                                         <el-table-column label="白班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.sunday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班" width="55">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.sunday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column width="60" prop="sum" label="生产合计">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.sum"
                                            :disabled="modal_table_edit"
                                            v-html="((scope.row.planBill.monday.day.quantity-0) + 
                                                    (scope.row.planBill.monday.night.quantity-0)+ 
                                                    (scope.row.planBill.tuesday.day.quantity-0)+ 
                                                    (scope.row.planBill.tuesday.night.quantity-0)+ 
                                                    (scope.row.planBill.wednesday.day.quantity-0)+ 
                                                    (scope.row.planBill.wednesday.night.quantity-0)+ 
                                                    (scope.row.planBill.thursday.day.quantity-0)+ 
                                                    (scope.row.planBill.thursday.night.quantity-0)+ 
                                                    (scope.row.planBill.friday.day.quantity-0)+ 
                                                    (scope.row.planBill.friday.night.quantity-0)+ 
                                                    (scope.row.planBill.saturday.day.quantity-0)+ 
                                                    (scope.row.planBill.saturday.night.quantity-0)+ 
                                                    (scope.row.planBill.sunday.day.quantity-0)+ 
                                                    (scope.row.planBill.sunday.night.quantity-0)
                                                    )"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="picking" label="领料需求(kg)">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.picking"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="70" prop="delivery" label="本周交货量">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.delivery"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="inv" label="库存数量">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.inv"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="60" prop="secInv" label="安全库存">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.secInv"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-row>
                    <div class="message clearfix" style=" margin-top: 10px;">
                        <div v-show="!weekplan_info_show">
                            <el-button class="btn btn-small btn-blue" @click="confirmSendPlan('save')"><i class="fa fa-check-square-o"></i> 保 存</el-button>
                            <el-button class="btn btn-small btn-blue" @click="confirmSendPlan('push')" v-show="!modal_btn_show"><i class="fa fa-sign-in"></i> 下 发</el-button>
                            <el-button class="btn btn-small btn-blue" @click="deleteWorkArray"><i class="fa fa-trash-o"></i> 删 除</el-button>
                            <el-button class="btn btn-large btn-blue" @click="createWorkplan"><i class="fa fa-file-text-o"></i> 新增计划</el-button>
                            <el-button class="btn btn-small btn-blue"  v-show="edit_next_show_week" v-if="new_week_date" @click="nextWeekplan('pre')" ><i class="fa fa-caret-left" ></i>上一周</el-button>  
                            <el-button class="btn btn-small btn-blue"  v-show="edit_next_show_week" v-else @click="nextWeekplan('next')" ><i class="fa fa-caret-right" ></i>下一周</el-button>
                        </div>
                    </div>

            </el-dialog>
        </el-row>
    </div>
</template>

<script src="./weekProdPlan.js"></script>
<style lang="stylus">
.week-prod-plans
    .el-dialog__body
        padding: 15px
        .table-wrap
            margin: 0
            padding: 0
        .el-table
            th,
            td
                height: 30px
                font-size: 12px !important
            td                
                padding: 0 2px !important
                text-align: center
            .cell            
                padding: 0 2px    
                line-height: 1
            .el-input__inner
                width: 100%
                padding: 0
                text-align: center
            .el-input__icon
                &::before
                    content: ""
                &::after
                    content: ""
</style>
