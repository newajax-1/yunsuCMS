<template>
    <div class="sale-plan-info">
        <div class="content-title">
            <span>销售管理-销售计划管理-计划详情</span>
        </div>
        <el-form :inline="true" >
            <el-row>
                <el-col :span="8">
                    <el-form-item label="计划编号："><span>{{sale_info_form.planNo}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计划生成时间："><span>{{sale_info_form.createTime}}</span></el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="计划状态：" ><span>{{sale_info_form.operationName}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="计划下发时间：" ><span>{{sale_info_form.operTime || "无"}}</span></el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="　计划下发人："><span>{{sale_info_form.operUserName || "无"}}</span></el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <div class="table-wrap">
            <el-table 
                border
                :height="$tableHeight"
                style="width: 100%"
                :data="sale_info_table">
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
            <div class="message mt-10">
                <el-button class="btn btn-small btn-blue" @click="comeBack"><i class="fa fa-undo"></i> 返 回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name : "saleplaninfo",
    created(){
        this.init();
    },
    data(){
        return {
            tab_name : undefined,
            plan_id : undefined,
            sale_info_table : null,
            sale_info_form:{
                planNo:undefined,
                createTime :undefined,
                operationName:undefined,
                operTime:undefined,
                operUserName:undefined
            }
        }
    },
    methods : {
        init(){
            this.tab_name = this.$route.query.tab_name;
            this.plan_id = this.$route.query.plan_id;
            this.getSalePlanInfo();
        },

        getSalePlanInfo(){
            let that = this;

            that.$ajaxWrap({
                url: "plan/detailPlan",
                data: {
                    planId: that.plan_id
                },
                success(res) {
                    let len;
                    that.sale_info_form = res.data.data;
                    that.sale_info_table = res.data.dataList;
                    len = that.sale_info_table.length;

                    for (let i = 0; i < len; i++) {
                        let el = that.sale_info_table[i];
                        el.finishrate = (100 * el.finishProcess / el.quantity) + "%";
                        el.finishProcessText = el.finishProcess + "/" + el.quantity;
                    }
                }
            })
        },
        comeBack(){            
            let that = this;
            that.$goRoute("/home/saleplan/", { tab_name: that.tab_name });
        }
    }
}
</script>
<style lang="stylus">
.layout-content
    .sale-plan-info
        .el-form
            margin: 10px 10px 0 10px;
            padding: 8px 10px 0 10px;
            background-color: #fff
        .table-wrap
            padding-bottom: 10px
</style>

