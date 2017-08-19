<template>
	<div class="maintain_info">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具保养计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="保养内容：">
                            <el-input placeholder="输入保养内容" v-model="search_info.maint_itm"></el-input>
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
                <el-button @click="deleteId()" class="btn btn-blue btn-small"><i class="fa fa-trash-o"></i> 删 除</el-button>
                <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 新增计划</el-button>
            </el-col>

            <el-col :span="24">
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :data="table_data" 
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="maintItm" label="保养内容"></el-table-column>
                        <el-table-column prop="maintAcct" label="保养模次"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="toAdd(scope.row.mouldMaintPlanId)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="deleteId(scope.row.mouldMaintPlanId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页 start-->
                    <div class="table-page">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page_list.page_num"
                            :page-size=page_list.page_size
                            layout="total, prev, pager, next"
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
                                <el-col :span="24">
                                    <el-form-item
                                        v-for="(domain, index) in dynamicValidateForm.domains"
                                        label="保养模次："
                                        :key="domain.key"
                                        :prop="'domains.' + index + '.value'">
                                        <el-input v-model="domain.value"></el-input>
                                    </el-form-item>
                                    <span @click="addDomain()">+</span>
                                </el-col>
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
<style lang="stylus" scoped>
</style>