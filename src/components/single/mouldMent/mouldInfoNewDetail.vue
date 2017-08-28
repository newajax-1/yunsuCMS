<template>
	<div class="mould-info-new-detail">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>新模具详情</span>
                </div>
            </el-col>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="模具信息" name="first" ></el-tab-pane>
                    <el-tab-pane label="验收记录" name="second"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="first_data"
                        v-show="show_table.first_show">
                        <el-table-column prop="acptNo" label="验收单编号"></el-table-column>
                        <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column prop="mouldCode" label="模具代码"></el-table-column>
                        <el-table-column prop="dsgnCnt" label="设计模数"></el-table-column>
                        <el-table-column prop="initCnt" label="初始模数"></el-table-column>
                        <el-table-column prop="cavityCnt" label="模穴数"></el-table-column>
                        <el-table-column prop="moldingCycl" label="成型周期"></el-table-column>
                        <el-table-column prop="mouldAscription" label="模具归属"></el-table-column>
                        <el-table-column prop="mouldFactory" label="模具制造"></el-table-column>
                        <el-table-column prop="custFactory" label="客户名称"></el-table-column>
                        <el-table-column prop="machineName" label="可用机台"></el-table-column>
                        <el-table-column prop="acptSts" label="验收状态"></el-table-column>
                    </el-table>

                    <!-- 表格二 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="second_data"
                        v-show="show_table.second_show">
                        <el-table-column prop="acptItm" label="验收项目"></el-table-column>
                        <el-table-column prop="acptRslt" label="验收结果"></el-table-column>
                        <el-table-column prop="acceptor" label="验收人"></el-table-column>
                        <el-table-column prop="startTm" label="验收开始时间"></el-table-column>
                        <el-table-column prop="endTm" label="验收结束时间"></el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>

            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-blue btn-small" @click="$goRoute('mouldinfo')"><i class="fa fa-repeat" ></i> 返回</el-button>
                </el-col>
            </div>
            
        </el-row>
        <!--分页 start-->
        <!-- <div class="table-page fr">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page_list.page_num"
                :page-size=page_list.page_size
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 30, 40]"
                :total="page_list.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->
    </div>
</template>
<script src="./mouldinfonewdetails.js"></script>
<style lang="stylus" scoped>
.mould-info-new-detail
    .tab-title
        margin-top 10px
</style>