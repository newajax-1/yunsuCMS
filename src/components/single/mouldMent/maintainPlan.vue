<template>
	<div class="maintain_info">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具管理-模具保养计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="保养内容：">
                            <el-input placeholder="输入保养内容" v-model.trim="search_info.maint_itm"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="buttonsRightList[3]" @click="searchTableData()" class="btn btn-blue btn-small"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button v-if="buttonsRightList[4]" @click="reset()" class="btn btn-orange btn-small"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                       
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
                <el-button v-if="buttonsRightList[0]" @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-refresh"></i> 刷 新</el-button>
                <el-button v-if="buttonsRightList[1]" @click="deleteIds()" class="btn btn-blue btn-small"><i class="fa fa-trash-o"></i> 删 除</el-button>
                <el-button v-if="buttonsRightList[2]" @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 新增计划</el-button>
            </el-col>

            <el-col :span="24">
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
                        <el-table-column prop="maintAcct" label="保养模次"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    class="r-bd"
                                    size="small"
                                    v-if="buttonsRightList[5]"
                                    @click="toAdd(scope.row.id)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    v-if="buttonsRightList[6]"
                                    @click="deleteId(scope.row.id)">删除</el-button>
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
                                    <el-form-item label="保养内容：">
                                        <el-input placeholder="请输入保养内容" class="required" v-model="add_info.maintItm"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <div class="clearfix pd-12">                                    
                                    <label class="fl  pdr-12">保养模次：</label>
                                    <div class="wrap fl">
                                        <el-form-item
                                            v-for="(domain, index) in dynamicValidateForm.domains"
                                            :key="domain.key"
                                            :prop="'domains.' + index + '.value'">
                                            <el-input v-model="domain.value"  class="required increase-input"></el-input>
                                        </el-form-item>
                                    </div>
                                    <el-button class="btn btn-small btn-blue increase" @click="addDomain()">增加模次</el-button>
                                </div>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./maintainplans.js"></script>
<style lang="stylus">
.maintain_info
    .pd-12
        padding: 0 12px
    .pdr-12
        padding: 11px 12px 10px 0
        line-height: 1
    .wrap
        width: 87%
    .el-form-item
        margin-right 15px !important
        &::after
            right 10px
    .increase
        margin-top 4px
</style>