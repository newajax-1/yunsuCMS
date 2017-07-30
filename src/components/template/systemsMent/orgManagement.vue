<template>
<div>
    <el-row>
         <el-col :span="24">
            	<div class="content-title">
                    <span>组织架构</span>
                </div>
                <div class="content-search">
	                <el-form :inline="true" class="">
		                <el-form-item>
		                    <el-button @click='toAdd()' class="btn btn-yellow">新增</el-button>
		                </el-form-item>
		            </el-form>
		        </div>
		    </el-col>
        <!-- 下拉部门 -->
        <el-col :span="3">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-for="item in sys_organization">
               		<div v-on:click.stop="isDeleteParent(item)">
	 					<el-submenu  index="">
	                    	<template slot="title">{{item.orgName}}</template>
	                    	<div   v-for="it in item.childs" v-if="it.orgId != null"  v-on:click.stop="getObject(it)">
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
            <div class="list-table">
                <el-table :data="table_data">
                    <el-table-column :span="15" prop="planNo" label="部门名称"></el-table-column>
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
			 <div class="pub-mask-wrap">
				<div class="list-table">
					<el-table :data="staff_table_data">
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
				<!-- <div class="block list-page fr">
				    <el-pagination
				            @size-change="handleSizeChange"
				            @current-change="handleCurrentChange"
				            :current-page.sync=page.pageNum
				            :page-sizes="[10, 20, 30, 40]"
				            :page-size=page.pageSize
				            layout="total, sizes, prev, pager, next"
				            :total=page.total>
				    </el-pagination>
				</div> -->
			</div>
		</el-col>

    </el-row>
   
    
  <!--    新增弹框 -->
        <el-dialog
                title="新增组织架构"
                :visible.sync="new_organization"
                size="small"
                custom-class="pub-dialog"
                :before-close="closeDialog">
            <span>
                <div class="pub-mask-wrap">
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

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-green btn" @click="addNewOrganization()">提交</el-button>
                <el-button class="btn-red btn" @click="closeDialog">取 消</el-button>
            </span>
        </el-dialog> 
        
         <!-- 删除提示信息 -->
        <el-dialog
          title="提示"
          :visible.sync="dialog_visible" 
          size="tiny">
              <span v-text="delete_msg">
              	
              </span>
              <span slot="footer" class="dialog-footer">
              	    <el-button type="primary" @click="deleteObject()">确 定</el-button>
                    <el-button @click="dialog_visible = false">
                  		<input type="hidden" v-html='tip_msg' id="deleteId">
                  		取 消
                  	</el-button>
                 
              </span>
       </el-dialog> 
       
       
       <!--    查看员工信息 -->
	<!-- <el-dialog
	        title="员工列表"
	        :visible.sync="staffList"
	        size="tiny"
	        custom-class="pub-dialog">
	<span> -->
		
	</span>
	</el-dialog> 
</div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
.pub-mask-wrap
	margin-top 40px
</style>
<!-- 引入js -->
<script src="./orgmanagements.js"></script>