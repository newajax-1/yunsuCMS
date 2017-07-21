<template>
    <div class="sale-plan-info">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>详情</span>
                </div>
            </el-col>
      
            <el-col :span="24">
                <div class="list-table">
                    <el-table  style="width: 100%"
                    :data = "infoTableList">
                        <el-table-column prop="type" label="计划类型">
                        </el-table-column>
                        <el-table-column prop="lv" label="优先级">
                        </el-table-column>
                        <el-table-column prop="custName" label="客户">
                        </el-table-column>
                        <el-table-column prop="ordrNo" label="订单编号">
                        </el-table-column>
                        <el-table-column prop="itemNo" label="产品型号">
                        </el-table-column>
                        <el-table-column prop="itemName" label="产品名称">
                        </el-table-column>
                        <el-table-column prop="productNo" label="生产批号">
                        </el-table-column>
                        <el-table-column prop="machine" label="机台归属">
                        </el-table-column>
                        <el-table-column prop="moldingCycle" label="单件周期">
                        </el-table-column>
                        <el-table-column prop="mouldNo"  label="模具编号">
                        </el-table-column>
                        <el-table-column prop="materialGrade"  label="原材料">
                        </el-table-column>
                        <el-table-column prop="scndProc" label="二次加工">
                        </el-table-column>

                        <el-table-column :label="weekday">
                            <el-table-column label="06-10">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-11">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-12">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-13">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-14">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-15">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-16">
                                <el-table-column label="白班"> </el-table-column>
                                <el-table-column label="夜班"> </el-table-column>
                            </el-table-column>
                        </el-table-column>


                        <el-table-column prop="sum" label="生产合计"> 
                        </el-table-column>
                        <el-table-column prop="picking" label="领料需求(kg)"> 
                        </el-table-column>
                        <el-table-column prop="delivery" label="本周交货量"> 
                        </el-table-column>
                        <el-table-column prop="inv" label="库存数"> 
                        </el-table-column>
                        <el-table-column prop="secInv" label="安全库存"> 
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons" @click="$goRoute('weekProdPlans')"><i class="fa fa-repeat" ></i> 返回</el-button>
                </el-col>
            </div>


        </el-row>
    </div>
</template>


<style lang="stylus" rel="stylesheet/stylus">
th
    border-top 1px solid #ccc
    border-left 1px solid #ccc
</style>

<script>
    export default{
        name : 'weekProdPlaninfo',
        data(){
            return {
                infoform : {},
                infoTableList : []
            }
        },
        created() {
            var that = this;
            EventBus.$on("setInfoData",function(data){
                console.log(data);
                that.infoform = data.data;
                that.infoTableList = data.list;

                that.infoTableList.every(function(el){
                    return el.finishrate = (el.finishProcess/el.quantity) + "%"
                })
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
