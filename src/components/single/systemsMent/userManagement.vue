<template>
    <div class="user-manage">
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
                            <el-button @click="loadTable()" class="btn btn-blue btn-small"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-orange btn-small"><i class="fa fa-window-restore"></i> 重 置</el-button>
                            <el-button @click="toAdd()" class="btn btn-blue btn-small"><i class="fa fa-file-text-o"></i> 新 增</el-button>
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
                                    v-if="scope.row.isAdmin != '0'"
                                    @click="deleteInfo(scope.row.accountId)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--分页 start-->
                    <div class="table-page">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page.sync="page_list.page_num"
                            :page-size="page_list.page_size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :page-sizes="[10, 20, 30, 40]"
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
            :title="table_data_name"
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
                                    <el-form-item label="用户名称：" class="required">
                                        <el-input v-model="add_info.name" placeholder="请输入用户名称" class="asterisk"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="工　　号：" class="required">
                                        <el-input v-model="add_info.jobNumber" placeholder="请输入工号" class="asterisk"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="手　　机：" class="required">
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
                                    <el-form-item label="用户角色：" class="required">
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
                                    <el-form-item label="所属部门：" class="required">
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

            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="createNewCustom(is_scope_id)">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog()">关 闭</el-button>
            </div>
        </el-dialog>
        <!--新增弹框 end-->
    </div>
</template>
<style lang="stylus">
.user-manage
    .content-buttons
        padding 5px 0 3px 0
    .el-input__inner
        padding-right : 0 !important
</style>
<script src="./usermanagements.js"></script>