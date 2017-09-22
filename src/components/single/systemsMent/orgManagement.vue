<template>
	<el-row class="org-management">
		<div class="content-title">
			<span>员工管理-组织架构</span>
		</div>
		<div class="content-search">
            <el-form :inline="true">

                <el-form-item label="员工工号：">
                    <el-input 
                        placeholder="输入工号" 
						v-model="form_data.empNo">
                    </el-input>
                </el-form-item>

                <el-form-item label="员工姓名：">
                    <el-input 
                        placeholder="输入姓名" 
						v-model="form_data.empNm">
                    </el-input>
                </el-form-item>

                <el-form-item label="职位：">
                    <el-input 
                        placeholder="输入职位" 
						v-model="form_data.jobTitle">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="btn btn-small btn-blue" @click="searchFormData()"> <i class="fa fa-search"></i> 查 询</el-button>
                    <el-button class="btn btn-small btn-orange" @click="reset()" > <i class="fa fa-window-restore"></i>重 置</el-button>
                </el-form-item>
            </el-form>
        </div> 
		<el-col :span="24" class="content-buttons">
            <el-button class="btn btn-blue btn-small" @click="refresh()"><i class="fa fa-refresh "></i> 刷 新</el-button>
            <el-button class="btn btn-blue btn-small" @click="goAddDepartment()"> 增加部门</el-button>
			<el-button class="btn btn-blue btn-small" @click="openStaff()"> 增加员工</el-button>
			<el-button class="btn btn-blue btn-small"> 导入员工</el-button>
        </el-col>
		<!-- 下拉部门 -->
		<el-col :span="3">
			<el-menu 
				default-active="2" 
				class="el-menu-vertical-demo" 
				@open="handleOpen" 
				@close="handleClose" 
				>
				<el-menu-item 
					v-for="item in sys_organization"  
					:key="item.orgName"
					index="item.id"
					@click="changeDepm(item.id)">
					{{item.orgName}}</el-menu-item>
				<el-menu-item @click="goAddDep()"
					index = 0>维护部门结构</el-menu-item>
			</el-menu>
		</el-col> 
		
		<!-- @table-wrap {必须存在} 正文表格父类 属性border必选 -->
		<el-col :span="20" :offset="1">
			<div class="table-wrap">
				<el-table
					:data="table_data"
					border>
					<el-table-column prop="index" label="员工序号"></el-table-column>
					<el-table-column prop="empNm" label="姓名"></el-table-column>
					<el-table-column prop="empNo" label="工号"></el-table-column>
					<el-table-column prop="gender" label="性别"></el-table-column>
					<el-table-column prop="jobTitle" label="职位"></el-table-column>
					<el-table-column prop="emailNo" label="邮箱"></el-table-column>
					<el-table-column prop="telephone" label="电话"></el-table-column>
					<el-table-column label="操作" width="140">
						<template scope="scope">
							<el-button
								type="text"
								size="small"
								class="r-bd"
								@click="openStaff(scope.row.id)">修改</el-button>
							<el-button
								type="text"
								size="small"
								class="r-bd"
								@click="deleteStaff(scope.row.id)">删除</el-button>
							<el-button
								type="text"
								size="small"
								@click="frozen(scope.row.id)"
								v-show="table_btn_right[scope.$index].show">冻结</el-button>
								<el-button
								type="text"
								size="small"
								@click="restart(scope.row.id)"
								v-show="!table_btn_right[scope.$index].show">启用</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- @table-page {必须存在} 正文表格分页 -->
				<div class="table-page">
					<el-pagination
						layout="total, sizes, prev, pager, next, jumper"
						:page-sizes="[10, 20, 30, 40]"
						:current-page.sync="page_list.pageNum"
						:page-size="page_list.pageSize"
						:total="page_list.total"
						@size-change="currentSizeChange"
						@current-change="currentPageChange">
					</el-pagination>
				</div>
			</div>
		</el-col>
		<el-dialog
            size="small"
            class="default-dialog dialog-large model_info"
			:visible.sync="staff_vision"
			:title="model_title"
			:before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" >
                                <el-row>
									<el-col :span="12">
										<el-form-item label="所属部门：" prop="orgName" class="required">
											<el-select placeholder="选择客户" v-model="modal_form_data.sysOrgId" >
												<el-option v-for="item in staff_org_data" 
												:label="item.orgName" 
												:value="item.id" 
												:key="item.orgName"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
                                </el-row>
								<el-row :gutter="24">
									<el-col :span="24">
										<el-form-item label="　　分组：">
											<p class="role-text">{{batch_names}}</p>
										</el-form-item>
										<el-button class="btn btn-middle btn-blue" @click="toAddRole()" style="margin-top: 4px;">分组</el-button>
									</el-col>
								</el-row>
								<el-row>
                                    <el-col :span="12">
                                        <el-form-item label="员工姓名：" class="required">
                                            <el-input v-model="modal_form_data.empNm" placeholder="输入员工姓名"></el-input>
                                        </el-form-item>
                                    </el-col>
									<el-col :span="12">
                                        <el-form-item label="性别：" >
											<el-radio-group v-model="modal_form_data.gender">
												<el-radio :label="0" >男</el-radio>
												<el-radio :label="1" >女</el-radio>
											</el-radio-group>
                                        </el-form-item>
                                    </el-col>
								</el-row>
								<el-row>
                                    <el-col :span="12">
                                        <el-form-item label="　　工号：" class="required">
                                            <el-input v-model="modal_form_data.empNo" placeholder="输入员工工号"></el-input>
                                        </el-form-item>
                                    </el-col>
									<el-col :span="12">
                                        <el-form-item label="职位：" >
                                            <el-input v-model="modal_form_data.jobTitle" placeholder="输入职位"></el-input>
                                        </el-form-item>
                                    </el-col>
								</el-row>
								<el-row>
                                    <el-col :span="12">
                                        <el-form-item label="　　电话：" class="required">
                                            <el-input v-model="modal_form_data.telephone" placeholder="输入电话号码"></el-input>
                                        </el-form-item>
                                    </el-col>
									<el-col :span="12">
                                        <el-form-item label="密码："class="required" >
                                            <el-input v-model="modal_form_data.password" placeholder="输入密码" type="password"></el-input>
                                        </el-form-item>
                                    </el-col>
								</el-row>
								<el-row>
                                    <el-col :span="12">
                                        <el-form-item label="　　邮箱：" >
                                            <el-input v-model="modal_form_data.emailNo" placeholder="输入邮箱地址"></el-input>
                                        </el-form-item>
                                    </el-col>
								</el-row>
								<el-row>
                                    <el-col :span="16">
                                        <el-form-item label="登录权限：" >
                                            <el-checkbox label="PC" v-model="modal_form_data.autorityPc"></el-checkbox>
											<el-checkbox label="PDA" v-model="modal_form_data.autorityPda"></el-checkbox>
											<el-checkbox label="PAD" v-model="modal_form_data.autorityPad"></el-checkbox>
                                        </el-form-item>
                                    </el-col>
								</el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="saveModelData()" >保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog()">关 闭</el-button>
            </div>
			<!--分组弹框-->
			<el-dialog
				title="分组"
				:visible.sync="role_vision"
				:modal="false"
				size="tiny"
				class="default-dialog dialog-tiny">
				<el-row>
					<el-col :span="24">
						<div class="table-wrap">
							<!-- 校验规则必须写在 el-form 标签中 -->
							<el-table 
								border
								:data="staff_role_data" @selection-change="handleSelectionChange">
								<el-table-column type="selection" width="45"></el-table-column>
								<el-table-column prop="roleName" label="分组"></el-table-column>
							</el-table>
						</div>
					</el-col>
				</el-row>
				<div class="message center mt-10">
					<el-button class="btn btn-small btn-green" @click="saveRoleInfo()" style="margin-left:-12px;">确 定</el-button>
				</div>
			</el-dialog>
        </el-dialog>
	</el-row>
</template>
<!-- 引入js -->
<script src="./orgmanagements.js"></script>
<style lang="stylus">
.org-management
	.el-menu-vertical-demo
		left: 10px
	.model_info
		.role-text
			width 300px
			height 22px
			border 1px solid #e5e5e5
			background-color #fff
			padding 3px 6px
			font-size 12px
			line-height 22px
			color #97a8be
			margin-top 4px
	.el-col-offset-1
		margin-left:2.16667%
	.el-menu
		background-color:#e4f3ff
	.el-menu-item
		&:hover
			background-color:#1f8ae9
			color:#fff
		
		
</style>
