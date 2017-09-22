<template>
	<div class="mould_info_success_detail">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具管理-模具基础信息-成品模具详情</span>
                </div>
            </el-col>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="模具信息" name="first" ></el-tab-pane>
                    <el-tab-pane label="产品BOM信息" name="second"></el-tab-pane>
                    <el-tab-pane label="保养记录" name="third"></el-tab-pane>
                    <el-tab-pane label="维修记录" name="fourth"></el-tab-pane>
                    <el-tab-pane label="变更记录" name="fifth"></el-tab-pane>
                    <el-tab-pane label="验收记录" name="other"></el-tab-pane>
                </el-tabs> 


                <el-col :span="24" class="content-buttons" >
                    <el-button v-if="show_table.fifth_show" @click="toAdd()" class="btn btn-blue btn-large btn-other"><i class="fa fa-user-plus"></i> 增加变更记录</el-button>
                    <el-button class="btn btn-blue btn-small" @click="comeBack()"><i class="fa fa-repeat" ></i> 返回</el-button>
                </el-col>             
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
                        <el-table-column prop="cavityCntName" label="模穴数"></el-table-column>
                        <el-table-column prop="moldingCycl" label="成型周期"></el-table-column>
                        <el-table-column prop="mouldAscriptionName" label="模具归属"></el-table-column>
                        <el-table-column prop="mouldFactoryName" label="模具制造"></el-table-column>
                        <el-table-column prop="custFactoryName" label="客户名称"></el-table-column>
                        <el-table-column prop="machineName" label="可用机台"></el-table-column>
                        <el-table-column prop="acptStsName" label="验收状态"></el-table-column>
                    </el-table>

                    <!-- 表格二 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="second_data"
                        v-show="show_table.second_show">
                        <el-table-column prop="productNo" label="产品BOM编号"></el-table-column>
                        <el-table-column prop="productNm" label="产品BOM名称"></el-table-column>
                        <el-table-column prop="custProductNo" label="客户BOM编号"></el-table-column>
                        <el-table-column prop="mouldCode" label="模具代码"></el-table-column>
                        <el-table-column prop="number" label="穴号"></el-table-column>
                        <el-table-column prop="materialGrade" label="材质&牌号"></el-table-column>
                        <el-table-column prop="color" label="色号&颜色"></el-table-column>
                        <el-table-column prop="productWeight" label="单位重量"></el-table-column>
                        <el-table-column prop="gapWeight" label="水口重量"></el-table-column>
                    </el-table>

                    <!-- 表格三 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="third_data"
                        v-show="show_table.third_show">
                        <el-table-column prop="startMaintTm" label="保养开始时间"></el-table-column>
                        <el-table-column prop="endMaintTm" label="保养结束时间"></el-table-column>
                        <el-table-column prop="planMaintNum" label="计划保养模次"></el-table-column>
                        <el-table-column prop="actualMaintNum" label="实际保养模次"></el-table-column>
                        <el-table-column prop="maintItm" label="保养内容"></el-table-column>
                        <el-table-column prop="maintOpr" label="保养人"></el-table-column>
                        <el-table-column prop="updtTm" label="确认时间"></el-table-column>
                        <el-table-column prop="updtOpr" label="确认人"></el-table-column>
                        <el-table-column prop="maintSts" label="结果"></el-table-column>
                    </el-table>

                    <!-- 表格四 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="fourth_data"
                        v-show="show_table.fourth_show">
                        <el-table-column prop="warnTm" label="报警时间"></el-table-column>
                        <el-table-column prop="warnOpr" label="报警人"></el-table-column>
                        <el-table-column prop="repairTm" label="维修时间"></el-table-column>
                        <el-table-column prop="repairItm" label="维修内容"></el-table-column>
                        <el-table-column prop="repairOpr" label="维修人"></el-table-column>
                        <el-table-column prop="updtTm" label="确认时间"></el-table-column>
                        <el-table-column prop="updtOpr" label="确认人"></el-table-column>
                        <el-table-column prop="repairSts" label="结果"></el-table-column>
                    </el-table>

                    <!-- 表格五 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="fifth_data"
                        v-show="show_table.fifth_show">
                        <el-table-column prop="chgTm" label="变更时间"></el-table-column>
                        <el-table-column prop="oldMouldNo" label="变更前模具编号"></el-table-column>
                        <el-table-column prop="oldMouldCode" label="变更前模具代号"></el-table-column>
                        <el-table-column prop="chgCnt" label="变更模次"></el-table-column>
                        <el-table-column prop="chgItm" label="变更描述"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="toAdd(scope.row.changeRecId)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 表格六 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="other_data"
                        v-show="show_table.other_show">
                        <el-table-column prop="acptItm" label="验收项目"></el-table-column>
                        <el-table-column prop="acptRslt" label="验收结果"></el-table-column>
                        <el-table-column prop="acceptor" label="验收人"></el-table-column>
                        <el-table-column prop="startTm" label="验收开始时间"></el-table-column>
                        <el-table-column prop="endTm" label="验收结束时间"></el-table-column>
                    </el-table>

                    <!--分页 start-->
                    <!-- <div class="table-page" v-if="page_list.total === 0 ? false : true">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page_list.page_num"
                            :page-size=page_list.page_size
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[15, 20, 30, 40]"
                            :total="page_list.total">
                        </el-pagination>
                    </div> -->
                    <!--分页 end-->
                </div>
                 <!-- 列表开始  end -->
            </el-col>
        </el-row>

        <!--新增弹框 start-->
        <el-dialog
            size="small"
            title="增加变更"
            class="default-dialog dialog-small"
            :visible.sync="new_custom"
            :before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <div class="pub-mask-wrap">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="">

                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="变更前模具代码：">
                                        <el-select 
                                            placeholder="选择变更前模具代码" class="required"
                                            v-model="add_info.oldMouldCode"
                                            @change="changeOldRecId(add_info.oldMouldCode)">
                                            <el-option
                                            v-for="item in mould_no"
                                            :label="item.mouldCode"
                                            :value="item.mouldCode"
                                            :key="item.mouldCode" 
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="变更前模具编号：">
                                        <p>{{ add_info.oldMouldNo }}</p>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="24">
                                    <el-form-item label="　　　变更模次：">
                                        <el-input placeholder="请输入变更模次" class="required" v-model="add_info.chgCnt"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="24">
                                    <el-form-item label="　　　变更描述：">
                                        <el-input type="textarea" class="required" v-model="add_info.chgItm"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>

            <div class="message center other—top">
                <el-button class="btn btn-small btn-green" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog()">关 闭</el-button>
            </div>
        </el-dialog>
        <!--新增弹框 end-->

        
    </div>
</template>
<script src="./mouldinfosuccessdetails.js"></script>
<style lang="stylus" scoped>
.mould_info_success_detail
    .tab-title
        margin-top 10px
    .btn-other
        120px !important
    .other—top
        margin-top 20px
</style>