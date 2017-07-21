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
                            <el-input placeholder="输入人员姓名" v-model='searchForm.issUsr'></el-input>
                        </el-form-item>

                        <el-form-item label="生成时间：">
                            <el-date-picker
                                v-model="searchForm.creStartTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                v-model="searchForm.creEndTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="下发时间：">
                            <el-date-picker
                                v-model="searchForm.issStartTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                v-model="searchForm.issEndTime"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click='search()' class="search-btn">查询</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click='reset()' class="reset-btn">重置</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click='refresh()' class="search-btn">刷新</el-button>
                        </el-form-item>

                        <el-form-item>
                            <el-button @click="openAddWeekPlan()" class="search-btn">新增周计划</el-button>
                        </el-form-item>

                    </el-form>
                </div>
            </el-col>
            <!-- 周生产计划 end -->

            <!-- 数据表格 start -->
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
                        <el-table-column prop="issUsr" label="下发人"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="200">
                            <template scope="scope">
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="">详情</el-button>
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
                
            <!--新增弹框 start-->
            <el-dialog
                size="full"
                title="新增周计划"
                custom-class="pub-dialog"
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
                                :data="newListData">
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
                                        <el-select placeholder="选择客户" :disabled="isDisabled" v-model="scope.row.custName">
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
                                        <el-select :disabled="isDisabled"  v-model="scope.row.ordrNo">
                                            <el-option value="122">asd</el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="itemNo" label="产品型号">
                                    <template  scope="scope" >
                                        <el-select :disabled="isDisabled" v-model="scope.row.itemNo">
                                            <el-option value=""></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150" prop="itemName" label="产品名称">
                                    <template  scope="scope">
                                        <el-select :disabled="isDisabled" v-model="scope.row.itemName">
                                            <el-option value=""></el-option>
                                        </el-select>
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
                                            <el-option  
                                                v-for="item in SysDicListInfo.processList" 
                                                :label="item.dicName" 
                                                :value="item.dicValue"></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="PlanBill" :label="weekDate.week">
                                    <el-table-column width="150" :label="weekDate.mondayDate">
                                        <el-table-column label="白班">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.PlanBill.monday.day.quantity"
                                                    :disabled="isDisabled"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    v-model="scope.row.PlanBill.monday.night.quantity"
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
                                                    v-model="scope.row.PlanBill.tuesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input :disabled="isDisabled"
                                                    v-model="scope.row.PlanBill.tuesday.night.quantity"
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
                                                    v-model="scope.row.PlanBill.wednesday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.PlanBill.wednesday.night.quantity"
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
                                                    v-model="scope.row.PlanBill.thursday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.PlanBill.thursday.night.quantity"
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
                                                    v-model="scope.row.PlanBill.friday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.PlanBill.friday.night.quantity"
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
                                                    v-model="scope.row.PlanBill.saturday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.PlanBill.saturday.night.quantity"
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
                                                    v-model="scope.row.PlanBill.sunday.day.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="夜班">
                                            <template scope="scope">
                                                <el-input 
                                                    :disabled="isDisabled"
                                                    v-model="scope.row.PlanBill.sunday.night.quantity"
                                                    type="text">
                                                </el-input>
                                            </template>
                                        </el-table-column>
                                    </el-table-column>
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
            </el-dialog>
        
             <!--编辑弹框 start-->
            <el-dialog
                size="full"
                :title="titleValue"
                custom-class="pub-dialog"
                @close="clearData(ruleForm)"
                :visible.sync="modifysaleplan">
                <el-row>
                    <div class="list-table sched-table">
                        <el-table
                            style="width: 100% "
                            :data="ModifyGuestInfo"
                            @selection-change="">
                            <el-table-column prop="issUsr" label="类型">
                                <template>
                                    <el-select :disabled="isDisabled">
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="lv" label="优先级">
                                <template>
                                    <el-select :disabled="isDisabled">
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="custName" label="客户">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="ordrNo" label="订单编号">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="itemNo" label="产品型号">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="itemName" label="产品名称">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="productNo" label="生产批号">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="machine" label="机台归属">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="moldingCycle" label="单件周期">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="mouldNo" label="模具编号">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="materialGrade" label="原材料">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="scndProc" label="二次加工">
                                <template>
                                    <el-select :disabled="isDisabled" >
                                        <el-option value=""></el-option>
                                    </el-select>
                                </template>
                            </el-table-column>

                            <el-table-column prop="issUsr" label="111">
                                <el-table-column prop="issUsr" label="06-10">
                                    <el-table-column label="白班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="夜班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="issUsr" label="06-11">
                                    <el-table-column label="白班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="夜班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="issUsr" label="06-12">
                                    <el-table-column label="白班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="夜班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="issUsr" label="06-13">
                                    <el-table-column label="白班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="夜班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="issUsr" label="06-14">
                                    <el-table-column label="白班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="夜班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column prop="issUsr" label="06-15">
                                    <el-table-column label="白班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="夜班">
                                        <template scope="scope">
                                            <el-input 
                                                :disabled="isDisabled"
                                                type="text">
                                            </el-input>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                            </el-table-column>

                            <el-table-column prop="sum" label="生产合计">
                                <template>
                                    <el-input 
                                        :disabled="isDisabled"
                                        type="text">
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="picking" label="领料需求(kg)">
                                <template>
                                    <el-input 
                                        :disabled="isDisabled"
                                        type="text">
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="delivery" label="本周交货量">
                                <template>
                                    <el-input 
                                        :disabled="isDisabled"
                                        type="text">
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inv" label="库存数">
                                <template>
                                    <el-input 
                                        :disabled="isDisabled"
                                        type="text">
                                    </el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secInv" label="安全库存">
                                <template>
                                    <el-input 
                                        :disabled="isDisabled"
                                        type="text">
                                    </el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-row>
            </el-dialog>

            <!-- 删除提示信息 start-->
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
            </el-dialog> 
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

</style>
