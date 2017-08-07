<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>用户管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="手机号：">
                            <el-input placeholder="输入手机号" v-model="info.info_phone"></el-input>
                        </el-form-item>
                        <el-form-item label="工号：">
                            <el-input placeholder="输入工号" v-model="info.info_num"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="btn btn-blue">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset()" class="btn btn-orange">重置</el-button>
                        </el-form-item>
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
                        <el-table-column prop="name" label="用户名称"></el-table-column>
                        <el-table-column prop="account" label="手机"></el-table-column>
                        <el-table-column prop="jobNumber" label="工号"></el-table-column>
                        <el-table-column prop="roleName" label="用户角色"></el-table-column>
                        <el-table-column prop="orgName" label="所属部门"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="updateCustom(scope.row.accountId)">修改</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="deleteInfo(scope.row.accountId)">删除</el-button>
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
            :title="table_data_name"
            custom-class="pub-dialog"
            :visible.sync="new_custom"
            :before-close="closeDialog">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">
                            <!-- 校验规则必须写在 el-form 标签中 -->
                            <el-form :inline="true" class="">

                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="用户名称：">
                                            <el-input v-model="add_info.name" placeholder="请输入用户名称" class="asterisk"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="工　　号：">
                                            <el-input v-model="add_info.jobNumber" placeholder="请输入工号" class="asterisk"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="手　　机：">
                                            <el-input v-model="add_info.account" placeholder="请输入手机号" class="asterisk"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12" v-if="!is_scope_id">
                                        <el-form-item label="默认密码：">
                                            <el-input disabled placeholder="123456"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="24">
                                    <el-col :span="12">
                                        <el-form-item label="用户角色：">
                                            <el-select 
                                                v-model="add_info.roleId" 
                                                :placeholder="add_info.roleName || '选择角色'" class="asterisk">
                                                <el-option 
                                                    v-for="item in role_list"
                                                    :key="item.roleId"
                                                    :label="item.roleName" 
                                                    :value="item.roleId" 
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="所属部门：">
                                            <el-select v-model="add_info.orgId" :placeholder="add_info.orgName || '选择部门'" class="asterisk">
                                                <el-option 
                                                    v-for="item in ogr_list"
                                                    :key="item.roleId"
                                                    :label="item.orgName" 
                                                    :value="item.orgId"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <span slot="footer" class="dialog-footer">
                <el-button class="btn btn-green" @click="createNewCustom(is_scope_id)">保存</el-button>
                <el-button class="btn btn-red" @click="closeDialog()">取消</el-button>
            </span>
        </el-dialog>
        <!--新增弹框 end-->
    </div>
</template>

<script src="./usermanagements.js"></script>