<template>
	<div class="equipment_info">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>设备信息</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="设备编号：">
                            <el-input placeholder="输入设备编号" v-model="search_info.eqp_no"></el-input>
                        </el-form-item>
                        <el-form-item label="设备代码：">
                            <el-input placeholder="输入设备代码" v-model="search_info.eqp_code"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="searchTableData()" class="btn btn-blue btn-small"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-orange btn-small"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                       
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
                <el-button @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-refresh "></i> 刷 新</el-button>
                <el-button @click="deleteIds()" class="btn btn-blue btn-small"><i class="fa fa-trash-o"></i> 删 除</el-button>
                <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 增加设备</el-button>
            </el-col>

            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="注塑机" name="first" ></el-tab-pane>
                    <el-tab-pane label="集中供料" name="second"></el-tab-pane>
                    <el-tab-pane label="辅机" name="third"></el-tab-pane>
                    <el-tab-pane label="5T行车" name="fourth"></el-tab-pane>
                    <el-tab-pane label="循环水系统" name="fifth"></el-tab-pane>
                    <el-tab-pane label="高低压开关柜" name="other"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="table_data" 
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="eqpNo" label="设备编号"></el-table-column>
                        <el-table-column prop="eqpCode" label="设备代码"></el-table-column>
                        <el-table-column prop="ton" label="吨位" v-if="show_other"></el-table-column>
                        <el-table-column prop="type" label="类型" v-if="show_other"></el-table-column>
                        <el-table-column prop="eqpBrand" label="设备品牌"></el-table-column>
                        <el-table-column prop="eqpIp" label="设备IP" v-if="show_other"></el-table-column>
                        <el-table-column prop="padIp" label="padIp" v-if="show_other"></el-table-column>
                        <el-table-column prop="eqpStsName" label="状态"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="toAdd(scope.row.equipmentId)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="showDetail(scope.row.equipmentId,scope.row.eqpNo)">详情</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="deleteId(scope.row.equipmentId)">删除</el-button>
                                <el-button  
                                    type="text"
                                    v-if="show_other"
                                    size="small"
                                    @click="toBinding(scope.row.eqpNo)">绑定</el-button>
                            </template>
                        </el-table-column>
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

        <!--新增弹框-->
        <el-dialog
            :title="diag_title"
            :visible.sync="new_custom"
            size="small"
            class="default-dialog dialog-small"
            :before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <div class="pub-mask-wrap el-dialog-right">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="设备类别：" class="text-align-left">
                                        <el-select 
                                            placeholder="注塑机" 
                                            :disabled="is_disabled" 
                                            class="required" 
                                            v-model="add_info.eqpTyp" 
                                            @change="changeType(add_info.eqpTyp)">
                                            <el-option 
                                            v-for="item in select_op"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            
                            <div v-if="show_type">
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="设备品牌：">
                                            <el-input placeholder="请输入设备品牌" class="required" v-model="add_info.eqpBrand"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="设备类型：">
                                            <el-select 
                                                placeholder="请选择设备类型" 
                                                class="required" 
                                                v-model="add_info.type">
                                                <el-option 
                                                v-for="item in select_type"
                                                :label="item.dicName"
                                                :value="item.dicName"
                                                :key="item.dicName"
                                                ></el-option>
                                            </el-select>
                                            <!-- <el-input placeholder="请输入设备类型" class="required" v-model="add_info.type"></el-input> -->
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="设备代码：">
                                            <el-input placeholder="请输入设备代码" class="required" v-model="add_info.eqpCode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="设备吨位：">
                                            <el-input placeholder="请输入设备吨位" class="required" v-model="add_info.ton"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="设　备 IP：">
                                            <el-input placeholder="请输入设备IP" class="required" v-model="add_info.eqpIp"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="看　板 IP：">
                                            <el-input placeholder="请输入看板IP" class="required" v-model="add_info.padIp"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <div v-if="!show_type">
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="设备品牌：">
                                            <el-input placeholder="请输入设备品牌" class="required" v-model="add_info.eqpBrand"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="设备代码：">
                                            <el-input placeholder="请输入设备代码" class="required" v-model="add_info.eqpCode"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="设备状态：">
                                            <el-select 
                                                placeholder="请选择设备状态" 
                                                class="required" 
                                                v-model="add_info.eqpSts">
                                                    <el-option
                                                        v-for=" item in eqp_sts_list"
                                                        :value="item.dicValue"
                                                        :label="item.dicName"
                                                        :key="item.dicValue"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="初始保养时间：" class="required">
                                            <el-date-picker
                                                type="date"
                                                class="date-picker-other"
                                                :editable=false
                                                v-model="add_info.startMaintTm"
                                                placeholder="选择日期"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

        <!--新增弹框-->
        <el-dialog
            title="绑定设备"
            :visible.sync="binding_custom"
            size="small"
            class="default-dialog dialog-small"
            :before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <div class="pub-mask-wrap">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="">
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="设备代码：">
                                        <el-input placeholder="请输入设备代码" class="required" v-model="binding_info.pad_code"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="IMEI码：">
                                        <el-input placeholder="请输入IMEI码" class="required" v-model="binding_info.pad_imei"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="saveBindingInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script src="./equipmentinfos.js"></script>
<style lang="stylus" scoped>
.el-dialog-right
    .el-form-item
        width 90%
        text-align right
    .date-picker-other
        width 100% !important
        text-align right !important

</style>