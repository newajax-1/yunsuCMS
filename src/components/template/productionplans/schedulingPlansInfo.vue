<template>
   <div class="sale-plan">
        <el-row>
            <!-- 排产计划 start -->
            <el-col :span="24">
                <div class="content-title">
                    <span>排产计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="客户名称：">
                            <el-input placeholder="输入客户名称"></el-input>
                        </el-form-item>
                        <el-form-item label="订单编号：">
                            <el-input placeholder="输入编号"></el-input>
                        </el-form-item>
                        <el-form-item label="产品型号：">
                            <el-input placeholder="输入型号"></el-input>
                        </el-form-item>
                        <el-form-item label="模具编号：">
                            <el-input placeholder="输入编号"></el-input>
                        </el-form-item>

                        <el-form-item label="计划日期：">
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
                            <el-button class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">编辑</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">新增计划</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="search-btn">下发计划</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 排产计划 end -->

            <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="list-table sched-table">
                    <el-table
                        style="width: 100% "
                        :data="tableData"
                        @selection-change="">
                        <el-table-column label="选择">
                            <template>
                                <el-radio class="radio">备选项</el-radio>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="优先级">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="客户">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="订单编号">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="产品型号">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="产品名称">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="生产批号">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="机台归属">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="单件周期">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="模具编号">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="原材料">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="二次加工">
                            <template>
                                <el-select
                                    :disabled="true"
                                >
                                    <el-option value=""></el-option>
                                </el-select>
                            </template>
                        </el-table-column>

                        <el-table-column label="2017-06-10 - 2017-06-16 (第十周)">
                            <el-table-column label="06-10">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-11">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-12">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-13">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-14">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column label="06-15">
                                <el-table-column label="白班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="夜班">
                                    <template scope="scope">
                                        <el-input 
                                            :disabled="true"
                                            type="text">
                                        </el-input>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                        </el-table-column>

                        <el-table-column label="生产合计">
                            <template>
                                <el-input 
                                    :disabled="true"
                                    type="text">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="领料需求(kg)">
                            <template>
                                <el-input 
                                    :disabled="true"
                                    type="text">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="本周交货量">
                            <template>
                                <el-input 
                                    :disabled="true"
                                    type="text">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="库存数">
                            <template>
                                <el-input 
                                    :disabled="true"
                                    type="text">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="安全库存">
                            <template>
                                <el-input 
                                    :disabled="true"
                                    type="text">
                                </el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
        </el-row>
        <!--分页 start-->
       <!--  <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageList.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=pageList.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total="pageList.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
el-table-column
    border 1px solid  #000
</style>