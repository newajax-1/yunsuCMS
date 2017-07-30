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

                        <el-form-item><el-button class="btn btn-blue" @click="searchFormData()">查询</el-button></el-form-item>
                        <el-form-item><el-button class="btn btn-orange" @click="reset">重置</el-button></el-form-item>
                    </el-form>
                </div>
            </el-col>
            
            <el-col :span="24" class="content-buttons">
                <el-button class="btn btn-blue" @click="refresh"><i class="fa fa-repeat"></i> 刷新</el-button>
                <el-button class="btn btn-blue" @click="openWeekplanModal('新建周计划')"><i class="fa fa-user-plus"></i> 新建周计划</el-button>
            </el-col>

            <el-col :span="24">
                <el-tabs v-model="weekplan_change_name" type="card" class="list-tab" @tab-click="changeTableActive">
                    <el-tab-pane label="全部" name="all" ></el-tab-pane>
                    <el-tab-pane label="未下发" name="unIssue" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="issued"></el-tab-pane>
                </el-tabs>

                <div class="list-table">
                    <el-table
                        style="width: 100% "
                        :data="weekplan_table_data">
                        <el-table-column prop="workplanNo" label="排产计划编号"></el-table-column>
                        <el-table-column prop="week" label="周"></el-table-column>
                        <el-table-column prop="creTm" label="计划生成时间"></el-table-column>
                        <el-table-column prop="issSts" label="下发状态"></el-table-column>
                        <el-table-column prop="issTm" label="下发时间"></el-table-column>
                        <el-table-column prop="issUsrName" label="下发人"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button 
                                    @click="openWeekplanModal('修改周计划',scope.row.workplanWeekId)"
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
                                    @click="openWeekplanInfo(scope.row.workplanWeekId)"
                                    v-show="!weekplan_push_tips[scope.$index].show"
                                    type="text"
                                    size="small">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 周计划 数据表格 end -->

            <div class="list-page fr">
                <el-pagination
                    layout="total, sizes, prev, pager, next"
                    :current-page.sync="weekplan_page_list.pageNum"
                    :page-sizes="[10,20,30,40]"
                    :page-size="weekplan_page_list.pageSize"
                    :total="weekplan_page_list.total"
                    @size-change="currentSizeChange"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>

            <!-- 周计划 新建或修改 start -->
            <el-dialog
                size="full"
                custom-class="pub-dialog"
                :title="modal_title"
                :before-close="confirmCloseModal"
                :visible.sync="modal_show_tips">
                    <el-row>
                        <div class="list-table sched-table">
                            <div class="pad-middle-default clearfix">
                                <div class="fl"  v-show="!weekplan_info_show">
                                    <el-button class="btn btn-yellow" @click="editWorkplan">编 辑</el-button>
                                    <el-button class="btn btn-green" @click="confirmSendPlan('save')">保 存</el-button>
                                    <el-button class="btn btn-orange" @click="confirmSendPlan('push')">下 发</el-button>
                                    <el-button class="btn btn-red" @click="deleteWorkArray">删除</el-button>
                                    <el-button class="btn btn-blue" @click="createWorkplan">新增计划</el-button>
                                </div>
                            </div>
                            <el-table
                                style="width: 100% "
                                :data="modal_weekplan_table_data"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55"> </el-table-column>

                                <el-table-column width="150" prop="type" label="类型">
                                    <template  scope="scope">
                                        <el-select  placeholder="选择类型"  :disabled="modal_table_edit" v-model="scope.row.type">
                                            <el-option 
                                                v-for="item in modal_sync_data.typeList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"
                                                :key="item.dicValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="lv" label="优先级">
                                    <template  scope="scope">
                                        <el-select  placeholder="选择优先级" :disabled="modal_table_edit" v-model="scope.row.lv">
                                            <el-option 
                                                v-for="item in modal_sync_data.priorityList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"
                                                :key="item.dicValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="custName" label="客户">
                                    <template scope="scope">
                                        <el-select 
                                            placeholder="选择客户" 
                                            :disabled="modal_table_edit" 
                                            v-model="scope.row.custName" 
                                            @change="getOrderDataList(scope.row.custName,scope.$index)">
                                            <el-option  
                                                v-for="item in modal_sync_data.custList" 
                                                :label="item.custName" 
                                                :value="item.custNo"
                                                :key="item.custNo">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="ordrNo" label="订单编号">
                                    <template  scope="scope">
                                        <el-select 
                                            :disabled="modal_table_edit" 
                                            v-model="scope.row.ordrNo"
                                            @change="getProductData(scope.row.ordrNo,scope.$index)">
                                            <el-option 
                                                v-for="item in scope.row.tempOrder"
                                                :label="item.orderNo"
                                                :value="item.orderNo"
                                                :key="item.orderNo"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="itemNo" label="产品型号">
                                    <template  scope="scope" >
                                        <el-select 
                                            :disabled="modal_table_edit" 
                                            v-model="scope.row.itemNo"
                                            @change="setProductName(scope.row.itemNo,scope.$index)">
                                            <el-option 
                                                v-for="item in scope.row.tempItem"
                                                :label="item.itemNo"
                                                :value="item.itemNo"
                                                :key="item.itemNo"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="itemName" label="产品名称">
                                    <template  scope="scope">
                                        <el-input disabled v-model="scope.row.itemName"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="productNo" label="生产批号">
                                    <template  scope="scope">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.productNo"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="machine" label="机台归属">
                                    <template  scope="scope">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.machine"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="moldingCycle" label="单件周期">
                                    <template  scope="scope">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.moldingCycle"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="mouldNo" label="模具编号">
                                    <template  scope="scope">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.mouldNo"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="80" prop="materialGrade" label="原材料">
                                    <template  scope="scope">
                                        <el-input :disabled="modal_table_edit" v-model="scope.row.materialGrade"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="120" prop="scndProc" label="二次加工">
                                    <template  scope="scope">
                                        <el-select :disabled="modal_table_edit" placeholder="选择二次加工" v-model="scope.row.scndProc">
                                            <el-option value="">请选择</el-option>
                                            <el-option  
                                                v-for="item in modal_sync_data.processList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"
                                                :key="item.dicValue"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="50" label="<<">
                                </el-table-column>

                                <el-table-column prop="planBill" :label="modal_week_date.week">
                                    <el-table-column width="150" :label="modal_week_date.mondayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.planBill.monday.day.quantity"
                                                    :disabled="modal_table_edit"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.planBill.monday.night.quantity"
                                                    :disabled="modal_table_edit"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="modal_week_date.tuesdayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.tuesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.tuesday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="modal_week_date.wednesdayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.wednesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.wednesday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="modal_week_date.thursdayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.thursday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.thursday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="modal_week_date.fridayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.friday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.friday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="modal_week_date.saturdayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.saturday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.saturday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column> 
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="modal_week_date.sundayDate">
                                         <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="modal_table_edit"
                                                    v-model="scope.row.planBill.sunday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
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

                                <el-table-column width="60" label=">>">
                                </el-table-column>

                                <el-table-column width="150" prop="sum" label="生产合计">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.sum"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="100" prop="picking" label="领料需求(kg)">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.picking"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="100" prop="delivery" label="本周交货量">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.delivery"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="100" prop="inv" label="库存数">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.inv"
                                            :disabled="modal_table_edit"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="100" prop="secInv" label="安全库存">
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
                    <div class="pad-middle-default clearfix">
                        <div class="fl"  v-show="!weekplan_info_show">
                            <el-button class="btn btn-yellow" @click="editWorkplan">编 辑</el-button>
                            <el-button class="btn btn-green" @click="confirmSendPlan('save')">保 存</el-button>
                            <el-button class="btn btn-orange" @click="confirmSendPlan('push')">下 发</el-button>
                            <el-button class="btn btn-red">删除</el-button>
                            <el-button class="btn btn-blue" @click="createWorkplan">新增计划</el-button>
                        </div>
                    </div>

            </el-dialog>
        </el-row>
    </div>
</template>

<script src="./weekProdPlan.js"></script>
<style lang="stylus">
    .week-prod-plans
        .el-table 
            th
                text-align center
            .cell
                text-align center
                padding-left 6px
                padding-right 6px
        .el-dialog__wrapper
            .el-input
                width 100%
            th>.cell
                line-height 1
</style>
