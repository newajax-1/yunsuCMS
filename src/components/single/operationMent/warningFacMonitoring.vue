<template>
	<div class="warning_fac_mon">
	    <el-row>
    		<el-col :span="24">
                <div class="content-title">
                    <span>设备报警</span>
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
                            <el-button @click="loadTable()" class="btn btn-blue btn-small"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-orange btn-small"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

            <div class="content-buttons fl">
                <el-button @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-refresh"></i> 刷新</el-button>
            </div>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="未解除" name="first" ></el-tab-pane>
                    <el-tab-pane label="已处理" name="second"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <el-table 
                        :data="table_data"
                        :height="$tableHeight"
                        border>
                        <el-table-column prop="alarmNo" label="设备报警编号"></el-table-column>
                        <el-table-column prop="machine" label="机台归属"></el-table-column>
                        <el-table-column prop="billNo" label="工单号"></el-table-column>
                        <el-table-column prop="alarmTyp" label="报警类型"></el-table-column>
                        <el-table-column prop="alarmTm" label="报警时间"></el-table-column>
                        <el-table-column prop="rpter" label="报警人"></el-table-column>
                        <el-table-column prop="oprTm" label="解除时间"></el-table-column>
                        <el-table-column prop="opr" label="解除人"></el-table-column>>
                        <el-table-column prop="handleTime" label="处理时长"></el-table-column>>
                    </el-table>
                    <!--分页 start-->
                    <div class="table-page" v-if="page_list.total === 0 ? false : true">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page_list.page_num"
                            :page-size=page_list.page_size
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[15, 20, 30, 40]"
                            :total="page_list.total">
                        </el-pagination>
                    </div>
                    <!--分页 end-->
                </div>
                 <!-- 列表开始  end -->
            </el-col>
	    </el-row>
	</div>
</template>
<style lang="stylus">
</style>
<script src="./warningfacmonitorings.js"></script>