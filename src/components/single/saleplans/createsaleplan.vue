<template>
    <div class="create-sale-plan">
        <div class="content-title">
            <span>{{create_title}}</span>
        </div>        
        <div class="table-wrap">
            <el-table
                border
                :height="$tableHeight"
                :data="sale_plan_data"
                @selection-change="handleSelectionChange">                
                <el-table-column type="selection" width="60"></el-table-column>

                <el-table-column
                    prop="planType"
                    label="计划类型">
                    <template scope="scope">
                        <el-select 
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
                            v-model="scope.row.custName">
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
                            placeholder="选择日期" 
                            :editable="false"
                            v-model="scope.row.orderDate"></el-date-picker>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="itemNo"
                    label="产品编号">
                    <template scope="scope">
                        <el-input 
                            type="text"                                 
                            v-model="scope.row.itemNo" >
                        </el-input>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="itemName"
                    label="产品名称">
                    <template scope="scope">
                        <el-input
                            type="text" 
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
                            disabled
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
                            placeholder="选择日期" 
                            :editable="false"
                            v-model="scope.row.deliveryDate"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button 
                            @click="confirmDeleteSalePlan(scope.row)"
                            type="text"
                            size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="message mt-10 ">
                <el-button class="btn btn-blue btn-small" @click="deleteDetailArray">
                    <i class="fa fa-trash-o"></i> 删 除
                </el-button>
                    
                <el-button class="btn btn-blue btn-small" @click="createNewSalePlan">
                    <i class="fa fa-file-text-o"></i> 增 加
                </el-button>

                <el-button class="btn btn-blue btn-small" @click="confirmSendPlan('save')">
                    <i class="fa fa-check-square-o"></i> 保 存
                </el-button>

                <el-button class="btn btn-blue btn-small" @click="confirmSendPlan('push')">
                    <i class="fa fa-sign-in"></i> 下 发
                </el-button>

                <el-button class="btn btn-small btn-blue" @click="comebackSalePlan()">
                    <i class="fa fa-undo"></i> 返 回
                </el-button>                
            </div>
        </div>
    </div>
</template>
<script src="./createsaleplans.js"></script>
<style lang="stylus">
.create-sale-plan
    .table-wrap
        margin-top: 10px
        .el-input__inner
            border : 0 none
            padding-right: 6px
        .message
            padding-bottom: 8px
    .el-table__row
        td
            padding: 0 2px !important
        .is-disabled
            .el-input__inner
                background : #fff
        .el-date-editor
            width: 105px      
</style>

