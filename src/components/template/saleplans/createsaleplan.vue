<template>
    <div class="create-sale-plan">
        <div class="content-title">
            <span>新增销售计划</span>
        </div>
        
        <div class="table-wrap">
            <el-table
                border
                :data="sale_plan_data">
                
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
                            :editable=false
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
                            :editable=false
                            v-model="scope.row.deliveryDate"></el-date-picker>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="content-buttons">

                <el-button class="btn btn-blue btn-small">
                    <i class="fa fa-trash-o"></i> 删 除
                </el-button>
                    
                <el-button class="btn btn-blue btn-small">
                    <i class="fa fa-file-text-o"></i> 增 加
                </el-button>

                <el-button class="btn btn-blue btn-small">
                    <i class="fa fa-check-square-o"></i> 保 存
                </el-button>

                <el-button class="btn btn-blue btn-small">
                    <i class="fa fa-sign-in"></i> 下 发
                </el-button>

                <el-button class="btn btn-small btn-blue" @click="comebackSalePlan()">
                    <i class="fa fa-undo"></i> 返 回
                </el-button>                
                
            </el-col>
        </div>
    </div>
</template>
<script src="./createsaleplans.js"></script>
