<template>
	<div class="equipment-maintain">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>工程管理-设备保养</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="保养内容：">
                            <el-input placeholder="输入保养内容" v-model="search_info.maint_itm"></el-input>
                        </el-form-item>
                        <el-form-item label="保养周期：">
                            <el-input placeholder="输入保养周期" v-model="search_info.maint_cycle"></el-input>
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
                <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 新建计划</el-button>
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
                        <el-table-column prop="maintItm" label="保养内容"></el-table-column>
                        <el-table-column prop="maintCycle" label="保养周期（月）"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="toAdd(scope.row.equipmentMaintPalnId)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="deleteId(scope.row.equipmentMaintPalnId)">删除</el-button>
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
                    <div class="pub-mask-wrap">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="">
                            <el-row :gutter="24">
                                <el-col :span="24">
                                    <el-form-item label="设备类型：">
                                        <el-select 
                                            placeholder="注塑机" 
                                            :disabled="is_disabled" 
                                            class="required"
                                            v-model="add_info.type">
                                            <el-option
                                            v-for="item in select_op"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="24">
                                    <el-form-item label="保养内容：">
                                        <el-input placeholder="请输入保养内容" class="required" v-model="add_info.maintItm"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="保养周期：">
                                        <el-input placeholder="请输入保养周期" class="required" v-model="add_info.maintCycle"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>

            <div class="message center">
                <el-button class="btn btn-green" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./equipmentmaintains.js"></script>
<style lang="stylus" scoped>
</style>