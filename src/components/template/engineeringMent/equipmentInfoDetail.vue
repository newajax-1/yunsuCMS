<template>
	<div class="equipment_info_detail">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>设备详情</span>
                </div>
            </el-col>
            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="设备信息" name="first" ></el-tab-pane>
                    <el-tab-pane label="保养记录" name="second"></el-tab-pane>
                    <el-tab-pane label="维修记录" name="third"></el-tab-pane>
                    <el-tab-pane label="绑定服务记录" name="other"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :data="first_data" 
                        v-show="table_show.first_show">
                        <el-table-column prop="eqpNo" label="设备编号"></el-table-column>
                        <el-table-column prop="type" label="类型" v-if="table_is_show"></el-table-column>
                        <el-table-column prop="eqpBrand" label="设备品牌"></el-table-column>
                        <el-table-column prop="eqpCode" label="设备代码"></el-table-column>
                        <el-table-column prop="ton" label="吨位" v-if="table_is_show"></el-table-column>
                        <el-table-column prop="eqpIp" label="设备IP" v-if="table_is_show"></el-table-column>
                        <el-table-column prop="padIp" label="看板IP" v-if="table_is_show"></el-table-column>
                        <el-table-column prop="eqpSts" label="状态"></el-table-column>
                    </el-table>
                    <!-- 表格三 -->
                    <el-table 
                        border 
                        :data="second_data" 
                        v-show="table_show.second_show">
                        <el-table-column prop="planMaintTm" label="计划保养时间"></el-table-column>
                        <el-table-column prop="realMaintTm" label="实际保养时间"></el-table-column>
                        <el-table-column prop="maintItm" label="保养内容"></el-table-column>
                        <el-table-column prop="maintOpr" label="保养人"></el-table-column>
                        <el-table-column prop="updtTm" label="确认时间"></el-table-column>
                        <el-table-column prop="updtOpr" label="确认人"></el-table-column>
                        <el-table-column prop="maintSts" label="结果"></el-table-column>
                    </el-table>
                    <!-- 表格三 -->
                    <el-table 
                        border
                        :data="third_data" 
                        v-show="table_show.third_show">
                        <el-table-column prop="warnTm" label="报警时间"></el-table-column>
                        <el-table-column prop="warnOpr" label="报警人"></el-table-column>
                        <el-table-column prop="repairTm" label="维修时间"></el-table-column>
                        <el-table-column prop="repairItm" label="维修内容"></el-table-column>
                        <el-table-column prop="repairOpr" label="维修人"></el-table-column>
                        <el-table-column prop="updtTm" label="确认时间"></el-table-column>
                        <el-table-column prop="updtOpr" label="确认人"></el-table-column>
                        <el-table-column prop="repairSts" label="结果"></el-table-column>
                    </el-table>

                    <!-- 表格四 -->
                    <el-table 
                        border
                        :data="other_data" 
                        v-show="table_show.other_show && first_table_show">
                        <el-table-column prop="serNm" label="服务名称"></el-table-column>
                        <el-table-column prop="deviceNo" label="设备编号"></el-table-column>
                    </el-table>
                    <el-table 
                        border
                        :data="other_data" 
                        v-show="table_show.other_show && !first_table_show">
                        <el-table-column prop="padCode" label="设备代码"></el-table-column>
                        <el-table-column prop="padImei" label="IMIE码"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="binding(scope.row.id)">解绑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                 <!-- 列表开始  end -->
            </el-col>

            <div class="content-buttons">
                <el-col :span="24">
                    <el-button class="btn btn-blue btn-small" @click="$goRoute('equipmentinfo')"><i class="fa fa-undo"></i> 返 回</el-button>
                </el-col>
            </div>

        </el-row>
        
    </div>
</template>
<script src="./equipmentinfodetails.js"></script>
<style lang="stylus">
</style>