<template>
    <div class="add-week-plan" :data="queryProductData">
        <el-row>
            <div class="list-table sched-table">
                <el-table
                    style="width: 100% "
                    :data="newWeekProductTable">
                    <el-table-column type="selection" width="55"></el-table-column>

                    <el-table-column prop="" label="类型">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option ></el-option>
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
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="ordrNo" label="订单编号">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="itemNo" label="产品型号">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="itemName" label="产品名称">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="productNo" label="生产批号">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="machine" label="机台归属">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="moldingCycle" label="单件周期">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="mouldNo" label="模具编号">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option ></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="materialGrade" label="原材料">
                        <template>
                            <el-select :disabled="isDisabled">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="scndProc" label="二次加工">
                        <template>
                            <el-select :disabled="isDisabled">
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
    </div>
</template>
<script>
    export default {
        name : "addWeekPlan",
        data(){
            return {
                isDisabled : false,
                newWeekProductTable : [{}],
                queryProductData : null
            }
        },
        methods : {
            getData (){
                var that = this;
                that.$ajax.get('week/queryWeekList').then(function(res) {
                    if(res.data.success){
                        that.queryProductData = res.data.data;
                    }
                });
                that.loadTable();
            },
            loadTable (){
                var that = this;
                console.log(that.queryProductData);
            }
        },
        created(){
            this.getData();
        }
    }
</script>