<template>
    <div class="add-week-plan">
        <el-row>
            <div class="list-table sched-table">
                <el-table
                    style="width: 100% "
                    :data="newListData">

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
                                <el-option  
                                    v-for="item in SysDicListInfo.processList" 
                                    :label="item.dicName" 
                                    :value="item.dicValue"></el-option>
                            </el-select>
                        </template>
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
                isDisabled : true,
                newListData : null,
                SysDicListInfo : null,
                weekDate : {
                    week : ""
                }
            }
        },
        created() {
            var that = this;
            EventBus.$on("setWeekDetailInfo",function(data){
                that.SysDicListInfo = data.SysDicListInfo;
                that.weekDate = data.weekDate;
                that.newListData = that.SysDicListInfo.dataList;
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
