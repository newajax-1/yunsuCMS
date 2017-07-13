<template>
    <div class="sale-plan-form">
        <el-row>
            <el-col :span="24">
                <el-form :inline="true" class="">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称:">
                                <el-select placeholder="选择客户" v-model="newFormData.custName" >
                                    <el-option v-for="item in guestInfo" :label="item.custName" :value="item.custNo"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label='订单编号：'>
                                <el-input  v-model='newFormData.orderNo'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="订单日期：">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="newFormData.orderDate"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="产品名称：" >
                                <el-input v-model='newFormData.itemName'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品编号：" >
                                <el-input v-model='newFormData.itemNo'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="需求数量：">
                                <el-input v-model='newFormData.account'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="交货日期：">
                                <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model='newFormData.publishDate'
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="计划类型：">
                                <el-select placeholder="选择客户" v-model='newFormData.planType'>
                                    <el-option label="确认" value="01"></el-option>
                                    <el-option label="预测" value="02"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col >
                            <div class="mid-btn">
                                <el-button class="btn-save btn" @click="addPlan()">完 成</el-button>
                            </div>
                        </el-col>
                    </el-row>

                </el-form>
            </el-col>
        </el-row>
    </div>

    <div class="message clearfix">
        <div class="fl">
            <el-button class="btn-edit btn" @click="editTable()">编 辑</el-button>
            <el-button class="btn-save btn" @click="saveList()">保 存</el-button>
            <el-button class="btn-publish btn" @click="publishList()" >下 发</el-button>
        </div>
        <div class="fr">共有<span class="detailMsg">条下发计划</span></div>
    </div>

    <!-- 新增计划 可编辑table start-->
    <div class="table">
        <el-table
            width="100%"
            height="250"
            :data="newListData">
            <el-table-column
                width="120"
                prop="planType"
                label="计划类型">
                <template scope="scope">
                    <el-select 
                        :disabled="editFlag"
                        v-model="scope.row.planType">
                        <el-option value=""></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                prop="custName"
                label="客户名称">
                <template scope="scope">
                    <el-select 
                        :disabled="editFlag"
                        v-model="scope.row.custName">
                        <el-option value=""></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                width="120"
                prop="orderNo"
                label="订单编号">
                <template scope="scope">
                    <el-input 
                        type="text" 
                        :disabled="editFlag"
                        v-model="scope.row.orderNo" >
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                width="160"
                prop="orderDate"
                label="订单日期">
                <template scope="scope">
                    <el-date-picker 
                        type="date" 
                        style="width: 100%;"
                        placeholder="选择日期" 
                        :disabled="editFlag"
                        v-model="scope.row.orderDate"></el-date-picker>
                </template>
            </el-table-column>

            <el-table-column
                width="120"
                prop="itemNo"
                label="产品编号">
                <template scope="scope">
                    <el-input type="text" 
                        v-model="scope.row.itemNo" 
                        :disabled="editFlag">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                width="120"
                prop="itemName"
                label="产品名称">
                <template scope="scope">
                    <el-input
                        type="text" 
                        :disabled="editFlag"
                        v-model="scope.row.itemName">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                width="120"
                prop="account"
                label="数量">
                <template scope="scope">
                    <el-input 
                        type="text"
                        :disabled="editFlag"
                        v-model="scope.row.account" >
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                width="120"
                prop="pic"
                label="单位">
                <template scope="scope">
                    <el-input type="text" 
                        :disabled="editFlag"
                        v-model="scope.row.pic">
                    </el-input>
                </template>
            </el-table-column>

            <el-table-column
                width="160"
                prop="publishDate"
                label="交货日期">
                <template scope="scope">
                    <el-date-picker 
                        type="date" 
                        style="width: 100%;"
                        placeholder="选择日期" 
                        :disabled="editFlag"
                        v-model="scope.row.publishDate"></el-date-picker>
                </template>
            </el-table-column>
        </el-table>
    </div>
        <!-- 新增计划 可编辑table end-->
</template>
<script>
    export default {
        name : "salePlanTable",
        props: {
            pickerOptions :{
                type : Object,
                default : {}
            },
            guestInfo : {
                type : Array,
                default : {}
            },
            newFormData : {
                type : Object,
                default : {}
            },
            newListData :{
                type : Array,
                default : {}
            }
        }
    }
</script>