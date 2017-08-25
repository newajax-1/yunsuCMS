<template>
	<div class="standby_ment">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>备件管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="备件名称：">
                            <el-input placeholder="输入备件名称" v-model="search_info.spare_nm"></el-input>
                        </el-form-item>
                        <el-form-item label="库存状态：">
                            <el-input placeholder="输入库存状态"></el-input>
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
                <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 新增备件</el-button>
            </el-col>

            <el-col :span="24">
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :data="table_data"  
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column prop="spareNo" label="备件编号"></el-table-column>
                        <el-table-column prop="spareNm" label="备件名称"></el-table-column>
                        <el-table-column prop="curInv" label="当前库存量"></el-table-column>
                        <el-table-column prop="secInv" label="安全库存量"></el-table-column>
                        <el-table-column prop="invSts" label="库存状态"></el-table-column>
                        <el-table-column prop="unit" label="单位"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="">备库存</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="toAdd(scope.row.spareId)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="deleteId(scope.row.spareId)">删除</el-button>
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
                                layout="total, sizes, prev, pager, next, jumper"
                                :page-sizes="[10, 20, 30, 40]"
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
                                <el-col :span="12">
                                    <el-form-item label="备件名称：">
                                        <el-input placeholder="请输入备件名称" class="asterisk" v-model="add_info.spareNm"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="备件单位：">
                                        <el-select 
                                            placeholder="选择设备类型" 
                                            v-model="add_info.unit" 
                                            class="asterisk">
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
                                <el-col :span="12">
                                    <el-form-item label="安全库存：">
                                        <el-input placeholder="请输入安全库存" class="asterisk" v-model="add_info.secInv" @change="changeSecInv(add_info.secInv)"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="库存预警：低于">
                                        <el-input placeholder="库存预警" class="asterisk" disabled="disabled" v-model="add_info.invAlarm"></el-input>
                                    </el-form-item>
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
<script src="./standbyments.js"></script>
<style lang="stylus" scoped>
.standby_ment  
    .content-buttons
        padding-bottom 10px

</style>