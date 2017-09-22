<template>
  <el-row class="add_department">
		<div class="content-title">
			<span>员工管理-组织架构</span>
		</div>
		<el-col :span="24" class="content-buttons">
            <el-button class="btn btn-blue btn-small" @click="init()" ><i class="fa fa-refresh "></i> 刷 新</el-button>
			<el-button class="btn btn-blue btn-small" @click="openStaff()"> 增 加 员 工</el-button>
        </el-col>
		<!-- 左侧部门 -->
		<el-col :span="6">
			<div class="table-wrap menu_table">
				<el-table
                    @cell-click="orgDetali"
                    :data="table_data">
                        <el-table-column prop="orgName"></el-table-column>
                        <el-table-column>
                            <template scope="scope">
                                <div v-show="show_tips[scope.$index].show">
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="editorgDetali(scope.row.id)">编辑</el-button>
                                    <el-button
                                        type="text"
                                        size="small"
                                        @click="deleteStaff(scope.row.id)">删除</el-button>                                    
                                </div>
                            </template>
                        </el-table-column>
				</el-table>
			</div>
		</el-col> 
		
		<!--右侧 -->
		<el-col :span="18" >
			<div class="sub_org">
                <div class="title">
                    <span>下级部门</span>
                </div>
                <div class="detail">
                    <span>{{main_title}}</span>
                </div>
                <el-form>
                    <el-row>
                        <el-col :span="6" v-for="item in form_data" :key="item.id">
                            <el-form-item >
                                <el-input 
                                placeholder="子部门" 
                                v-model="item.orgName"></el-input>
                            </el-form-item>
                        </el-col>               
                    </el-row>
                </el-form>
                <div class="message center mt-10">
                <el-button class="btn btn-blue btn-large" @click="addNewDepart">新增部门</el-button>
                <el-button class="btn btn-small btn-green"@click="updataDepartment()" >保 存</el-button>
                <el-button class="btn btn-small btn-gray"@click="backToOrg()" >返 回</el-button>
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
                <el-button class="btn btn-small btn-green" @click="saveModelData" >保 存</el-button>
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
<script src="./addDepartments.js"></script>
<style lang="stylus">

.add_department 
    .el-form-item__content
        .el-input
            .el-input__inner
                width 180px
    .table-wrap
        margin-top 10px
        padding-bottom 10px
        text-align center
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
    .sub_org
        background #fff
        padding-bottom 20px
        margin-right:10px
        margin-left:10px
        margin-top:10px
        .title
            width 100%
            height 40px
            text-align center
            border-bottom:1px solid #e5e5e5
            background:#e4f3ff
            span 
                font-size 16px
                color #666
                line-height 40px
        .detail
            width 100%
            height 40px
            text-indent 2em
            border-bottom:1px solid #e5e5e5
            margin-bottom 12px
            span 
                font-size 16px
                color #666
                line-height 40px
        .el-form-item__content
            .el-input
                padding-left 18%
        .message
            margin-left:50%
            transform translateX(-22%)
    .menu_table
        .el-table__header 
            th
                color #fff
                height 0
                line-height 0
                border 0 solid #fff  
    
</style>

