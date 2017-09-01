<template>
	<div class="role-management">
        <el-row>
            <el-col :span="24">
            	<div class="content-title">
                    <span>系统管理-角色管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-user-plus"></i> 新建角色</el-button>
                        </el-form-item>
                    </el-form>
                </div>
		    </el-col>
	        <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="table-wrap">
                    <el-table
                        border
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
                    <!--分页 start-->
                    <div class="table-page" v-if="page_list.total === 0 ? false : true">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page_list.page_num"
                            :page-size=page_list.page_size
                            :page-sizes="[15, 20, 30, 40]"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page_list.total">
                        </el-pagination>
                    </div>
                    <!--分页 end-->
                </div>
            </el-col>
            <!-- 数据表格 end -->
    	</el-row>
		<!--新增弹框 start-->
        <el-dialog
            size="small"
            :title="title_name"
            class="default-dialog dialog-small"
            :visible.sync="new_custom"
            :before-close="closeDialog">
            <div>
                <el-row>
                    <el-col :span="24">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="" >

                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="角色名称：" class="required">
                                        <el-input v-model="add_info.roleName" placeholder="请输入角色名称" class="asterisk"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="角色描述：" class="required">
                                        <el-input v-model="add_info.remark" placeholder="请输入角色描述" class=""></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="权限分配：" class="only-role">
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

                            <div class="message center">
                                <el-button class="btn btn-small btn-green" @click="showAdd(adfasdasd)">完 成</el-button>
                                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
                            </div>
                        </el-form>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!--新增弹框 end-->
    </div>
</template>

<script src="./rolemanagements.js"></script>

<style lang="stylus">
.bigTree
    width: 200px;
.role-management
    .only-role
        height: 200px;
        .el-form-item__content
            width: 240px;
            height: 200px !important;
            overflow-y: scroll
</style>