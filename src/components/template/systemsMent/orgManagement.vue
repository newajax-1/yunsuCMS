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
		                    <el-button @click='toAdd()' class="btn btn-close">新增</el-button>
		                </el-form-item>
		            </el-form>
		        </div>
		    </el-col>
        <!-- 下拉部门 -->
        <el-col :span="3">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" v-for="item in sysOrganization">
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
                <el-table :data="tableData">
                    <el-table-column prop="planNo" label="部门名称"></el-table-column>
                    <el-table-column fixed="right"label="操作">
                    	<input type="hidden" v-html="commonorgId" id=curIns>
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



    </el-row>
  <!--    新增弹框 -->
        <el-dialog
                title="新增组织架构"
                :visible.sync="newOrganization"
                size="tiny"
                custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="formClass">
						<el-row :gutter="24">
							<el-col :span="16">
								<el-form-item label="组织名称：">
									<el-input v-model="addInfo.orgName"></el-input>
									<span class="must-tips">*</span>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="父级组织：">
								<el-select v-model="sel_val">
									<el-option
									v-for="item in selectOp"
									:label="item.orgName"
									:value="item.orgId">
									</el-option>
								</el-select>
								<span class="must-tips">*</span>
							</el-form-item>
						</el-row>
						<el-row :gutter="24">
							<el-col :span="16">
								<el-form-item label="备注：">
									<el-input v-model="addInfo.remark"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-save btn" @click="addNewOrganization()">提交</el-button>
                <el-button class="btn-close btn" @click="newOrganization = false">取 消</el-button>
            </span>
        </el-dialog> 
        
         <!-- 删除提示信息 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible" 
          size="tiny">
              <span v-text="deleteMsg">
              	
              </span>
              <span slot="footer" class="dialog-footer">
              	   <el-button type="primary" @click="deleteObject()">确 定</el-button>
                  <el-button @click="dialogVisible = false">
                  	<input type="hidden" v-html='tipMsg' id="deleteId">
                  	取 消
                  </el-button>
                 
              </span>
       </el-dialog> 
       
       
       <!--    查看员工信息 -->
	<el-dialog
	        title="员工列表"
	        :visible.sync="staffList"
	        size="tiny"
	        custom-class="pub-dialog">
	<span>
		<div class="pub-mask-wrap">
			<el-row>
				<el-col :span="24">
					<div class="list-table">
						<el-table :data="staffTableData" style="width: 100%">
							<el-table-column prop="memberName" label="会员名称"></el-table-column>
							<el-table-column prop="jobName" label="会员职务"></el-table-column>
							<el-table-column prop="jobNumber" label="会员工号"></el-table-column>
							<el-table-column fixed="right" label="操作" width="140">
								<template scope="scope">
									<el-button type="text" size="small" @click="deleteStaff(scope.row.accountOrgid)"> 删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</el-col>
			</el-row>
			
						 
			
			
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
	</span>
	</el-dialog> 
</div>
</template>
<!-- 引入js -->
<script src="./orgManagementOpt.js"></script>