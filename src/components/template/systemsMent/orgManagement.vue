<template>
	<div class="org-management">
	    <el-row>
	         <el-col :span="24">
	            	<div class="content-title">
	                    <span>组织架构</span>
	                </div>
	                <div class="content-search">
		                <el-form :inline="true" class="">
			                <el-form-item>
			                    <el-button @click='toAdd()' class="btn btn-blue btn-large">新增</el-button>
			                </el-form-item>
			            </el-form>
			        </div>
			    </el-col>
	        <!-- 下拉部门 -->
	        <el-col :span="3">
	            <el-menu 
					default-active="2" 
					class="el-menu-vertical-demo" 
					@open="handleOpen" 
					@close="handleClose" 
					v-for="item in sys_organization"  
					:key="item.orgName">
						<div v-on:click.stop="isDeleteParent(item)">
							<el-submenu  index="">
								<template slot="title">{{item.orgName}}</template>
								<div   v-for="it in item.childs" :key="it.orgId" v-if="it.orgId != null"  v-on:click.stop="getObject(it)">
									<el-menu-item index="">
										<a class="left-item">{{it.orgName}}</a>
										<i class="item.class"></i>
									</el-menu-item>
								</div>
								
							</el-submenu> 
						</div>
				</el-menu>
	        </el-col> 
	        
	        <!-- 表格数据 -->
	        <el-col :span="20" class="fr">
	            <div class="table-wrap">
	                <el-table 
	                	border
						:data="table_data">
	                    <el-table-column :span="15" prop="planNo" label="部门名称"></el-table-column>
	                    <el-table-column :span="15" prop="remarks" label="备注"></el-table-column>
	                    <el-table-column　label="操作" width="200">
	                    	<input type="hidden" v-html="commonorg_id" id="curIns">
	                        <template scope="scope">
	                            <el-button  
	                                type="text"
	                                size="small"
	                                @click="lookDetail()">查看人员详情</el-button>
	                            <el-button 
	                                type="text"
	                                size="small"
	                                @click="deletetab()">删除</el-button>
	                        </template>
	                    </el-table-column>
	                </el-table>
	            </div>
	        </el-col>
	        <el-col :span="20" class="fr">
				<div class="table-wrap">
					<el-table 
						border
						:data="staff_table_data">
						<el-table-column prop="memberName" label="会员名称"></el-table-column>
						<el-table-column prop="jobName" label="会员职务"></el-table-column>
						<el-table-column prop="jobNumber" label="会员工号"></el-table-column>
						<el-table-column label="操作" width="200">
							<template scope="scope">
								<el-button type="text" size="small" @click="deleteStaff(scope.row.accountOrgid)"> 删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				
				<!--分页-->
				<div class="table-page fr">
				    <el-pagination
			            @size-change="handleSizeChange"
			            @current-change="handleCurrentChange"
			            :current-page.sync=page.pageNum
			            :page-size=page.pageSize
			            layout="total, prev, pager, next"
			            :total="page.total">
				    </el-pagination>
				</div>
			</el-col>
	    </el-row>
	   
	    
	    <!--    新增弹框 -->
        <el-dialog
            title="新增组织架构"
			:visible.sync="new_organization"
			size="small"
			class="default-dialog dialog-small"
			:before-close="closeDialog">
            <el-form :inline="true" class="formClass">
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="组织名称：">
							<el-input v-model="add_info.org_name" class="asterisk"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="上级组织：">
							<el-select v-model="sel_val" class="asterisk">
								<el-option
								v-for="item in select_op"
								:key="item.orgId"
								:label="item.orgName"
								:value="item.orgId">
								</el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="12">
						<el-form-item label="备　　注：">
							<el-input v-model="add_info.remark"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
            </el-form>
            <div class="message center">
				<el-button class="btn-small btn-green btn" @click="addNewOrganization()">提交</el-button>
				<el-button class="btn-small btn-gray btn" @click="closeDialog">取 消</el-button>
			</div>
        </el-dialog> 
	        
         <!-- 删除提示信息 -->
        <el-dialog
			title="提示"
			:visible.sync="dialog_visible" 
			size="tiny">
				<span v-text="delete_msg"></span>
				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="deleteObject()">确 定</el-button>
					<el-button @click="dialog_visible = false">
						<input type="hidden" v-html='tip_msg' id="deleteId">取 消
					</el-button>
				</span>
		</el-dialog>  
	</div>
</template>
<!-- 引入js -->
<script src="./orgmanagements.js"></script>