<template>
   <div class="week-prod-plans">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>生产计划管理-周生产计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item 
                            label="下发人：">
                            <el-input 
                                placeholder="输入人员姓名" 
                                v-model='search_form_data.issUsr'></el-input>
                        </el-form-item>
                        <el-form-item 
                            label="生成时间：">
                            <el-date-picker
                                v-model="search_form_data.creStartTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                v-model="search_form_data.creEndTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item 
                            label="下发时间：">
                            <el-date-picker
                                v-model="search_form_data.issStartTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span class="pad-line-default">至</span>
                            <el-date-picker
                                v-model="search_form_data.issEndTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item><el-button class="btn btn-blue">查询</el-button></el-form-item>
                        <el-form-item><el-button class="btn btn-yellow">重置</el-button></el-form-item>
                    </el-form>
                </div>
            </el-col>
            
            <el-col :span="24" class="content-buttons">
                <el-button class="list-buttons" ><i class="fa fa-repeat"></i> 刷新</el-button>
                <el-button class="list-buttons" ><i class="fa fa-user-plus"></i> 新建周计划</el-button>
            </el-col>

            <!-- 数据表格 start 
            <el-col :span="24">
                <el-tabs  type="card" class="list-tab" @tab-click="changeTableEffective" v-model="activeTab">
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
                        <el-table-column prop="issUsrName" label="下发人"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="200">
                            <template scope="scope">
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.workplanWeekId)">详情</el-button>
                                <el-button 
                                    v-show = "showInfo[scope.$index].show"
                                    type="text"
                                    size="small"
                                    @click="operationWeek(scope.row.workplanWeekId,scope.$index)">下发</el-button>
                                <el-button 
                                    v-show = "showInfo[scope.$index].show"
                                    type="text"
                                    size="small"
                                    @click="updateWeek(scope.row.workplanWeekId)">修改</el-button>
                                <el-button 
                                    v-show = "showInfo[scope.$index].show"
                                    type="text"
                                    size="small"
                                    @click="deletelWeek(scope.row.workplanWeekId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
                
            <!--新增弹框 start
            <el-dialog
                size="full"
                custom-class="pub-dialog"
                :title="titleValue"
                :before-close="handleClose"
                :visible.sync="newCustom">
                <div class="add-week-plan">
                    <el-row>
                        <div class="list-table sched-table">
                            <div class="message clearfix">
                                <div class="fl">
                                    <el-button class="btn-edit btn" @click="" v-show="isAddPlanBtn">编 辑</el-button>
                                    <el-button class="btn-save btn" @click="saveWeekNewPlan()" v-show="isAddPlanBtn">保 存</el-button>
                                    <el-button class="btn-reset btn" @click="opearationWeekplan()" v-show="isSaveNewPlan">下 发</el-button>
                                    <el-button class="btn-close btn" @click="batchDeleteWorkplanData()" v-show="isSaveNewPlan">删除</el-button>
                                    <el-button class="btn-publish btn" @click="addWorkplan()" v-show="isAddPlanBtn">新增计划</el-button>
                                </div>
                            </div>
                            <el-table
                                style="width: 100% "
                                :data="newListData"
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                    type="selection"
                                    width="55">
                                </el-table-column>

                                <el-table-column width="150" prop="type" label="类型">
                                    <template  scope="scope">
                                        <el-select  placeholder="选择类型"  :disabled="isDisabled" v-model="scope.row.type">
                                            <el-option 
                                                v-for="item in SysDicListInfo.typeList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="lv" label="优先级">
                                    <template  scope="scope">
                                        <el-select  placeholder="选择优先级" :disabled="isDisabled" v-model="scope.row.lv">
                                            <el-option 
                                                v-for="item in SysDicListInfo.priorityList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="custName" label="客户">
                                    <template scope="scope">
                                        <el-select 
                                            placeholder="选择客户" 
                                            :disabled="isDisabled" 
                                            v-model="scope.row.custName" 
                                            @change="getOrderList(scope.row.custName,scope.$index)">
                                            <el-option  
                                                v-for="item in SysDicListInfo.custList" 
                                                :label="item.custName" 
                                                :value="item.custNo">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="ordrNo" label="订单编号">
                                    <template  scope="scope">
                                        <el-select 
                                            :disabled="isDisabled" 
                                            v-model="scope.row.ordrNo"
                                            @change="getProductData(scope.row.ordrNo,scope.$index)">
                                            <el-option 
                                                v-for="item in scope.row.tempOrder"
                                                :label="item.orderNo"
                                                :value="item.orderNo"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="itemNo" label="产品型号">
                                    <template  scope="scope" >
                                        <el-select :disabled="isDisabled" v-model="scope.row.itemNo" @change="setProductName(scope.row.itemNo,scope.$index)">
                                            <el-option 
                                                v-for="item in scope.row.tempItem"
                                                :label="item.itemNo"
                                                :value="item.itemNo"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="itemName" label="产品名称">
                                    <template  scope="scope">
                                        <el-input disabled v-model="scope.row.itemName"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="productNo" label="生产批号">
                                    <template  scope="scope">
                                        <el-input :disabled="isDisabled" v-model="scope.row.productNo"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="machine" label="机台归属">
                                    <template  scope="scope">
                                        <el-input :disabled="isDisabled" v-model="scope.row.machine"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="moldingCycle" label="单件周期">
                                    <template  scope="scope">
                                        <el-input :disabled="isDisabled" v-model="scope.row.moldingCycle"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="mouldNo" label="模具编号">
                                    <template  scope="scope">
                                        <el-input :disabled="isDisabled" v-model="scope.row.mouldNo"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="materialGrade" label="原材料">
                                    <template  scope="scope">
                                        <el-input :disabled="isDisabled" v-model="scope.row.materialGrade"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="scndProc" label="二次加工">
                                    <template  scope="scope">
                                        <el-select :disabled="isDisabled" placeholder="选择二次加工" v-model="scope.row.scndProc">
                                            <el-option value="">请选择</el-option>
                                            <el-option  
                                                v-for="item in SysDicListInfo.processList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="100" label="<<">
                                </el-table-column>
                                <el-table-column prop="planBill" :label="weekDate.week || weekDate.titel">
                                    <el-table-column width="150" :label="weekDate.mondayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.planBill.monday.day.quantity"
                                                    :disabled="isDisabled"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.planBill.monday.night.quantity"
                                                    :disabled="isDisabled"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="weekDate.tuesdayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.tuesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input :disabled="isDisabled"
                                                    v-model="scope.row.planBill.tuesday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="weekDate.wednesdayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.wednesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.wednesday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="weekDate.thursdayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.thursday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.thursday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="weekDate.fridayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.friday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.friday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="weekDate.saturdayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.saturday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.saturday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>

                                    <el-table-column width="150" prop="issUsr" :label="weekDate.sundayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.sunday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.planBill.sunday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
                                </el-table-column>

                                <el-table-column width="100" label=">>">
                                </el-table-column>
                                <el-table-column width="150" prop="sum" label="生产合计">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.sum"
                                            :disabled="isDisabled"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="picking" label="领料需求(kg)">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.picking"
                                            :disabled="isDisabled"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="delivery" label="本周交货量">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.delivery"
                                            :disabled="isDisabled"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column width="150" prop="inv" label="库存数">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.inv"
                                            :disabled="isDisabled"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="secInv" label="安全库存">
                                    <template  scope="scope">
                                        <el-input 
                                            v-model="scope.row.secInv"
                                            :disabled="isDisabled"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-row>
                </div>

                <div class="message clearfix">
                    <div class="fl">
                        <el-button class="btn-edit btn" @click="" v-show="isAddPlanBtn">编 辑</el-button>
                        <el-button class="btn-save btn" @click="saveWeekNewPlan()" v-show="isAddPlanBtn">保 存</el-button>
                        <el-button class="btn-reset btn" @click="opearationWeekplan()" v-show="isSaveNewPlan">下 发</el-button>
                        <el-button class="btn-close btn" @click="batchDeleteWorkplanData()" v-show="isSaveNewPlan">删除</el-button>
                        <el-button class="btn-publish btn" @click="addWorkplan()" v-show="isAddPlanBtn">新增计划</el-button>
                    </div>
                    <div class="fr">共有<span class="detailMsg">条下发计划</span></div>
                </div>
            </el-dialog>-->

            <!-- 删除提示信息 start
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible" 
                size="tiny">
                <span v-text="deleteMsg"></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteObject()">确 定</el-button>
                    <el-button @click="dialogVisible = false">
                        <input type="hidden" v-html='tipMsg' id="deleteId">取 消
                    </el-button>
                </span>
            </el-dialog> -->
        </el-row>
    </div>
</template>

<script src="./weekProdPlan.js"></script>
<style lang="stylus">
    .message 
        margin 10px 0
    .sched-table
        td
            padding 6px 0
    .new-line
        margin-bottom 10px

</style>
