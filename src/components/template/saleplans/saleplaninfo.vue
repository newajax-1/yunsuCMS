<template>
    <div class="sale-plan-info">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>销售计划-计划详情</span>
                </div>
                <div class="content-search">
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" class="">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划编号:">
                                            <span v-html='infoform.planNo'></span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="计划生成时间：">
                                            <span v-html='infoform.createTime'></span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划状态：" >
                                            <span v-html='infoform.operationName'></span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="计划下发时间：" >
                                            <span v-html='infoform.operTime'></span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="计划下发人：">
                                            <span v-html='infoform.operUserName'></span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="24">
                <div class="list-table">
                    <el-table  style="width: 100%"
                    :data = "infoTableList">
                        <el-table-column
                            prop="planType"
                            label="计划类型">
                        </el-table-column>
                        <el-table-column
                            prop="custName"
                            label="客户名称">
                        </el-table-column>
                        <el-table-column
                            prop="orderNo"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="orderDate"
                            label="订单日期">
                        </el-table-column>
                        <el-table-column
                            prop="itemNo"
                            label="产品型号">
                        </el-table-column>
                        <el-table-column
                            prop="itemName" 
                            label="产品名称">
                        </el-table-column>
                        <el-table-column
                            prop="quantity"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="unit"
                            label="单位">
                        </el-table-column>
                        <el-table-column
                            prop="orderStatus"
                            label="订单状态">
                        </el-table-column>
                        <el-table-column
                            prop="finishProcessText"
                            label="完成进度">
                        </el-table-column>
                        <el-table-column
                            prop="finishrate"
                            label="完成率">
                        </el-table-column>
                        <el-table-column
                            prop="deliveryDate"
                            label="交货日期">
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons" @click="$goRoute('saleplan')"><i class="fa fa-repeat" ></i> 返回</el-button>
                </el-col>
            </div>
        </el-row>
    </div>
</template>
<script>
    export default{
        name : 'saleplaninfo',
        data(){
            return {
                infoform : {},
                infoTableList : []
            }
        },
        created() {
            var that = this;
            EventBus.$on("setInfoData",function(data){
                that.infoform = data.data;
                that.infoTableList = data.list;
                var i , len = that.infoTableList.length;
                for( i = 0 ; i < len ; i++ ){
                    var el = that.infoTableList[i];
                    el.finishrate = (100*el.finishProcess/el.quantity)+"%";
                    el.finishProcessText = el.finishProcess+"/"+el.quantity;
                }
            })
        },
        methods : {
            compute(){
            }
        },
        mounted() {
            this.compute();
        }
    }
</script>