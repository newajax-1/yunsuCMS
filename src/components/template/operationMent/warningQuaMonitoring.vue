<template>
    <div class="warning-qua">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>质量报警</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="机台归属：">
                            <el-input placeholder="输入机台归属" v-model="seach_info.machine"></el-input>
                        </el-form-item>
                        <el-form-item label="工单号：">
                            <el-input placeholder="输入工单号" v-model="seach_info.bill_no"></el-input>
                        </el-form-item>
                        <el-form-item label="报警人：">
                            <el-input placeholder="输入报警人" v-model="seach_info.rpter"></el-input>
                        </el-form-item>
                        <el-form-item label="报警时间：">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="seach_info.start_time">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="seach_info.end_time">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="btn btn-small btn-blue">查询</el-button>
                            <el-button @click="reset()" class="btn btn-small btn-orange">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                    
                <el-col :span="24" class="content-buttons">
                    <el-button class="btn btn-blue btn-small" @click="refresh"><i class="fa fa-repeat"></i> 刷 新</el-button>
                </el-col>
            </el-col>
            <el-col :span="24">

                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="未解除" name="first" ></el-tab-pane>
                    <el-tab-pane label="已处理" name="second"></el-tab-pane>
                </el-tabs>              

                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <el-table :data="table_data" border>
                        <el-table-column prop="alarmNo" label="质量报警编号"></el-table-column>
                        <el-table-column prop="machine" label="机台归属"></el-table-column>
                        <el-table-column prop="billNo" label="工单号"></el-table-column>
                        <el-table-column prop="alarmTyp" label="报警类型"></el-table-column>
                        <el-table-column prop="alarmTm" label="报警时间"></el-table-column>
                        <el-table-column prop="rpter" label="报警人"></el-table-column>
                        <el-table-column prop="oprTm" label="解除时间"></el-table-column>
                        <el-table-column prop="opr" label="解除人"></el-table-column>>
                        <el-table-column prop="handleTime" label="处理时长"></el-table-column>>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>
        </el-row>
        <!--分页 start-->
        <div class="table-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next"
                    :total="page_list.total">
            </el-pagination>
        </div>
        <!--分页 end-->
    </div>
</template>
<script src="./warningquamonitorings.js"></script>