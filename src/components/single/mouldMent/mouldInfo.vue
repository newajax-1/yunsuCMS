<template>
	<div class="mould-info">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具管理-模具基础信息</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="模具编号：">
                            <el-input placeholder="输入模具编号" v-model="search_info.mould_no"></el-input>
                        </el-form-item>
                        <el-form-item label="模具制造厂：">
                            <el-input placeholder="输入模具制造厂" v-model="search_info.mould_factory"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input placeholder="输入客户名称" v-model="search_info.cust_factory"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchTableData()" class="btn btn-blue btn-small"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-orange btn-small"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
                <el-button @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-refresh"></i> 刷 新</el-button>
                <el-button @click="deleteIds()" class="btn btn-blue btn-small"><i class="fa fa-trash-o"></i> 删 除</el-button>
                <el-button @click="addMouldDetail()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 增加模具</el-button>
            </el-col>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="新模具" name="first" ></el-tab-pane>
                    <el-tab-pane label="成品模具" name="second"></el-tab-pane>
                    <el-tab-pane label="报废模具" name="third"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="first_data"
                        v-show="show_table.first_show"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
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
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small" 
                                    class="r-bd"
                                    @click="addMouldDetail(scope.row.id,scope.row.sourceType)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    class="r-bd"
                                    @click="toAdd(scope.row.id)">验收</el-button>
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="showDetail(scope.row.id, 'new')">详情</el-button>
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="deleteIds(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 表格二 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        v-show="show_table.second_show"
                        :data="second_data"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
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
                        <el-table-column prop="mouldPlay" label="已打模数"></el-table-column>
                        <el-table-column prop="maintNum" label="保养次数"></el-table-column>
                        <el-table-column prop="repairNum" label="维修次数"></el-table-column>
                        <el-table-column prop="mouldSts" label="模具状态"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    class="r-bd"
                                    @click="addMouldDetail(scope.row.id,scope.row.sourceType)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"  
                                    @click="showDetail(scope.row.id)">详情</el-button>
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="deleteIds(scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!-- 表格三 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="third_data"
                        v-show="show_table.third_show"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
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
                        <el-table-column prop="mouldPlay" label="已打模数"></el-table-column>
                        <el-table-column prop="maintNum" label="保养次数"></el-table-column>
                        <el-table-column prop="repairNum" label="维修次数"></el-table-column>
                        <el-table-column prop="mouldSts" label="模具状态"></el-table-column>
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

        <!--验收弹框-->
        <el-dialog
            title="验收"
            :visible.sync="new_custom"
            size="small"
            class="default-dialog dialog-small"
            :before-close="closeDialog">
            <div class="table-wrap">
                <el-table 
                    border
                    :data="check_data">
                    <el-table-column prop="acptItm" label="验收项目"></el-table-column>
                    <el-table-column prop="acptRslt" label="验收结果">
                        <template scope="scope">
                            <!-- <el-select 
                            v-model="scope.row.worker" 
                            @change="changeCheck(scope.row.workplanBillId, scope.row.worker)" 
                            class="required"> -->
                            <el-select 
                                v-model="scope.row.acptRslt" 
                                @change="changeAcptRslt(scope.row.dicOrder,scope.row.acptRslt)">
                                <el-option
                                    v-for="item in check_result"
                                    :label="item.name"
                                    :value="item.value"
                                    :key="item.value">
                                </el-option>
                            </el-select>
                            <!-- <select  @change="changeAcptRslt(scope.row.dicOrder,scope.row.acptRslt)">
                                <option v-for="item in check_result" :value="item.value" :label="item.name"></option> -->
                            </select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="acceptor" label="验收人">
                        <template scope="scope">
                            <el-input placeholder="输入验收人" v-model="scope.row.acceptor" @change="changeAcceptor(scope.row.dicOrder,scope.row.acceptor)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="startTm" label="验收开始时间">
                        <template scope="scope">
                            <el-date-picker
                                type="date"
                                :editable=false
                                placeholder="选择日期"
                                v-model="scope.row.startTm" @change="changeStartTm(scope.row.dicOrder,scope.row.startTm)">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                    <el-table-column prop="endTm" label="验收结束时间">
                        <template scope="scope">
                            <el-date-picker
                                type="date"
                                :editable=false
                                placeholder="选择日期"
                                 v-model="scope.row.endTm" @change="changeEndTm(scope.row.dicOrder,scope.row.endTm)">
                            </el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="message center btn-foot">
                <el-button class="btn btn-small btn-green" @click="saveInfo(1)">保 存</el-button>
                 <el-button class="btn btn-small btn-blue" @click="saveInfo(2)">转成品</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script src="./mouldinfos.js"></script>
<style lang="stylus">
.mould-info
    .btn-foot
        margin-top 10px
</style>