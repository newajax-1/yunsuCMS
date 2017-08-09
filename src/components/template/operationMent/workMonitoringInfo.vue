<template>
	<div class="work-mon-info">
	    <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>未下发工单详情</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item>
                            <el-button @click="moreOperationWeek()" class="btn btn-small btn-orange">下发</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="24">
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <el-table
                        border
                        :data="detail_data"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column width="30" prop="type" label="类型"></el-table-column>
                        <el-table-column width="45" prop="lv" label="优先级"></el-table-column>
                        <el-table-column width="60" prop="custName" label="客户"></el-table-column>
                        <el-table-column width="60" prop="ordrNo" label="订单编号"></el-table-column>
                        <el-table-column width="60" prop="itemNo" label="产品型号"></el-table-column>
                        <el-table-column width="60" prop="itemName" label="产品名称"></el-table-column>
                        <el-table-column width="60" prop="productNo" label="生产批号"></el-table-column>
                        <el-table-column width="60" prop="machine" label="机台归属"></el-table-column>
                        <el-table-column width="60" prop="moldingCycle" label="单件周期"></el-table-column>
                        <el-table-column width="60" prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column width="45" prop="materialGrade" label="原材料"></el-table-column>
                        <el-table-column width="60" prop="scndProc" label="二次加工"></el-table-column>

                        <el-table-column prop="weekday" :label="week_detail.week">
                            <el-table-column  :label="week_detail.mondayDate">
                                <el-table-column label="白班" width="30" >
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.monday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column  :label="week_detail.tuesdayDate">
                                <el-table-column label="白班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.tuesday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column  :label="week_detail.wednesdayDate">
                                <el-table-column label="白班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.wednesday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.wednesday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.wednesday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">    
                                        <span>{{scope.row.planBill.wednesday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column  :label="week_detail.thursdayDate">
                                <el-table-column label="白班" width="30">
                                    <template scope="scope">    
                                        <span>{{scope.row.planBill.thursday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.thursday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.thursday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.thursday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column  :label="week_detail.fridayDate">
                                <el-table-column label="白班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.friday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column  :label="week_detail.saturdayDate">
                                <el-table-column label="白班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.saturday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column  :label="week_detail.sundayDate">
                                <el-table-column label="白班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.day.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.day.worker}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.night.quantity}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="工人" width="30">
                                    <template scope="scope">
                                        <span>{{scope.row.planBill.sunday.night.worker}}</span>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table-column>

                        <el-table-column width="60" prop="sum" label="生产合计">
                        </el-table-column>
                        <el-table-column width="60" prop="picking" label="领料需求(kg)">
                        </el-table-column>
                        <el-table-column width="60" prop="delivery" label="本周交货量">
                        </el-table-column>
                        <el-table-column width="45" prop="inv" label="库存数">
                        </el-table-column>
                        <el-table-column width="60" prop="secInv" label="安全库存">
                        </el-table-column>
                        <el-table-column label="操作" width="60">
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
            class="default-dialog dialog-large"
            title="修改排班"
            :before-close="handleClose"
            :visible.sync="update_custom">
            <div class="table-wrap">
                <el-row>
                    <el-col :span="24">
                        <el-table
                            border
                            :data="update_data">
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
            <div class="message fr">
                <el-button class="btn btn-small btn-green" @click="saveUpdateInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-orange" @click="operationWeek()" v-if="show_operation">下 发</el-button>
                <el-button class="btn btn-small btn-gray" @click="handleClose">关 闭</el-button>
            </div>
        </el-dialog>
        <!-- 修改排班弹框 end -->
	</div>
</template>
<script src="./workmonitoringinfos.js"></script>
<style lang="stylus">
.work-mon-info
    .table-wrap
        .el-table
            width: 1431px
            th,
            td
                height: 30px
                font-size: 12px
            td                
                padding: 0 2px
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