<template>
	<div>
        <el-row>
            <el-col :span="24">
            	<div class="content-title">
                    <span>角色管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item>
                            <el-button @click="toAdd()" class="btn btn-blue">新增</el-button>
                        </el-form-item>
                    </el-form>
                </div>
		    </el-col>
	        <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="list-table">
                    <el-table
                        style="width: 100% "
                        :data="table_data">
                        <el-table-column prop="roleName" label="角色名称"></el-table-column>
                        <el-table-column prop="remark" label="角色描述"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="updateCustom(scope.row.roleId)">修改</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="deleteInfo(scope.row.roleId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
    	</el-row>
    	<!--分页 start-->
        <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next"
                    :total="page_list.total">
            </el-pagination>
        </div>
        <!--分页 end-->

		<!--新增弹框 start-->
        <el-dialog
            size="small"
            :title="title_name"
            custom-class="pub-dialog"
            :visible.sync="new_custom"
            :before-close="closeDialog">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">

                            <!-- 校验规则必须写在 el-form 标签中 -->
                            <el-form :inline="true" class="" >

                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="角色名称：">
                                            <el-input v-model="add_info.roleName" placeholder="请输入角色名称" class="asterisk"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="角色描述：">
                                            <el-input v-model="add_info.remark" placeholder="请输入角色描述" class="asterisk"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="权限分配：">
                                            <el-tree
                                                :data="data2"
                                                show-checkbox
                                                node-key="menuId"
                                                ref="tree"
                                                :default-checked-keys="checked_arr"
                                                highlight-current
                                                :props="defaultProps"
                                                class="bigTree">
                                            </el-tree>
                                            <!-- <el-button @click="setCheckedKeys" v-if = "addAdmin" style="margin-top: 10px;">显示已有权限</el-button> -->
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button class="btn btn-green" @click="showAdd(adfasdasd)">保存</el-button>
                <el-button class="btn btn-red" @click="closeDialog">取消</el-button>
            </span>
        </el-dialog>
        <!--新增弹框 end-->
    </div>
</template>

<script src="./rolemanagements.js"></script>

<style lang="stylus">
.bigTree
    width 340px
</style>