<template>
	<div>
	    <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>未下发工单详情</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <!-- <el-form-item label="生产批号：">
                            <el-input placeholder="输入生产批号"></el-input>
                        </el-form-item>
                        <el-form-item label="产品型号：">
                            <el-input placeholder="输入产品型号"></el-input>
                        </el-form-item>
                        <el-form-item label="计划生产时间：">
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
                            <el-button @click="loadTable()" class="btn btn-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset()" class="btn btn-reset">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset()" class="btn btn-close">刷新</el-button>
                        </el-form-item> -->
                        <el-form-item>
                            <el-button @click="moreOperationWeek()" class="btn btn-blue">下发</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="24">
                <!-- 列表开始  start -->
                <div>
                    <el-table
                    style="width: 100% "
                    :data="detail_data"
                    @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column width="150" prop="type" label="类型">
                        </el-table-column>
                        <el-table-column width="150" prop="lv" label="优先级">
                        </el-table-column>
                        <el-table-column width="150" prop="custName" label="客户">
                        </el-table-column>
                        <el-table-column width="150" prop="ordrNo" label="订单编号">
                        </el-table-column>
                        <el-table-column width="150" prop="itemNo" label="产品型号">
                        </el-table-column>
                        <el-table-column width="150" prop="itemName" label="产品名称">
                        </el-table-column>
                        <el-table-column width="150" prop="productNo" label="生产批号">
                        </el-table-column>
                        <el-table-column width="150" prop="machine" label="机台归属">
                        </el-table-column>
                        <el-table-column width="150" prop="moldingCycle" label="单件周期">
                        </el-table-column>
                        <el-table-column width="150" prop="mouldNo" label="模具编号">
                        </el-table-column>
                        <el-table-column width="150" prop="materialGrade" label="原材料">
                        </el-table-column>
                        <el-table-column width="150" prop="scndProc" label="二次加工">
                        </el-table-column>

                        <el-table-column prop="weekday" :label="week_detail.week">
                            <el-table-column width="150" :label="week_detail.mondayDate">
                                <el-table-column label="白班" >
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="150" :label="week_detail.tuesdayDate">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="150" :label="week_detail.wednesdayDate">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.wednesday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.wednesday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.wednesday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">    
                                        <span>{{scope.row.planBill.wednesday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="150" :label="week_detail.thursdayDate">
                                <el-table-column label="白班">
                                    <template scope="scope">    
                                        <span>{{scope.row.planBill.thursday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.thursday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.thursday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.thursday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="150" :label="week_detail.fridayDate">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="150" :label="week_detail.saturdayDate">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="150" :label="week_detail.sundayDate">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table-column>

                        <el-table-column width="150" prop="sum" label="生产合计">
                        </el-table-column>
                        <el-table-column width="150" prop="picking" label="领料需求(kg)">
                        </el-table-column>
                        <el-table-column width="150" prop="delivery" label="本周交货量">
                        </el-table-column>
                        <el-table-column width="150" prop="inv" label="库存数">
                        </el-table-column>
                        <el-table-column width="150" prop="secInv" label="安全库存">
                        </el-table-column>
                        <el-table-column label="操作" width="150">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="showUpdateInfo(scope.row.workplanDetailId)">排班</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="operationWeek(scope.row.workplanDetailId)">下发</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 列表开始  end -->
            </el-col>

            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-blue" @click="$goRoute('workmonitoring')"><i class="fa fa-repeat" ></i> 返回</el-button>
                </el-col>
            </div>
	    </el-row>
        <!-- 修改排班弹框 start -->
        <el-dialog
            size="large"
            :title="update_title"
            custom-class="pub-dialog"
            :before-close="handleClose"
            :visible.sync="update_custom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <el-table
                            :data="update_data"
                            style="width: 100%">
                            <el-table-column
                                    prop="weekDate"
                                    label="日期">
                            </el-table-column>
                            <el-table-column
                                    prop="clas"
                                    label="班次">
                            </el-table-column>
                            <el-table-column
                                    prop="billNo"
                                    label="工单号">
                            </el-table-column>
                            <el-table-column
                                    prop="quantity"
                                    label="计件量">
                            </el-table-column>
                            <el-table-column label="工人姓名" prop="worker">
                                <template scope="scope">
                                    <el-select :disabled="!scope.row.quantity" v-model="scope.row.worker" @change="changeWeeker(scope.row.workplanBillId, scope.row.worker)" class="asterisk">
                                        <el-option
                                            v-for="item in worker_list"
                                            :label="item.empNm"
                                            :value="item.empNo"
                                            :key="item.empNo"
                                            >
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>.
                </el-row>
            </div>
            <div class="message clearfix">
                <div>
                    <el-button class="btn btn-save" @click="saveUpdateInfo()">保 存</el-button>
                    <el-button class="btn btn-edit" @click="operationWeek()" v-if="show_operation">下 发</el-button>
                    <el-button class="btn btn-publish" @click="handleClose">关 闭</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 修改排班弹框 end -->
	</div>
</template>
<style lang="stylus">
</style>
<script src="./workmonitoringinfos.js"></script>