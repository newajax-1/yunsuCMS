<template>
	<div class="staff-manage">
	    <el-row>
	    	<el-col :span="24">
				<div class="content-title">
                    <span>员工管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="员工工号：">
                            <el-input placeholder="输入员工工号" v-model="search_info.emp_no"></el-input>
                        </el-form-item>
                        <el-form-item label="员工姓名：">
                            <el-input placeholder="输入员工姓名" v-model="search_info.emp_nm"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="search()" class="btn btn-small btn-blue">查询</el-button>
                            <el-button @click="reset()" class="btn btn-small btn-orange">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
                <el-button @click="refresh()" class="btn btn-blue btn-small"><i class="fa fa-repeat"></i> 刷新</el-button>
                <el-button @click="deleteInfo()" class="btn btn-small btn-gray "><i class="el-icon-delete"></i> 删除</el-button>
                <el-button @click="showDialog()" class="btn btn-large btn-blue"><i class="fa fa-user-plus"></i>增加员工</el-button>
            </el-col>

            <el-col :span="24" class="table-wrap">
	            <!-- 列表开始  start -->
                <el-table 
                    border
                    :data="table_data"
                    @selection-change="handleSelectionChange">
                	<el-table-column type="selection" width="45"></el-table-column>
                    <el-table-column prop="empId" label="NO"></el-table-column>
                    <el-table-column prop="empNo" label="员工工号"></el-table-column>
                    <el-table-column prop="empNm" label="员工姓名"></el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button  
                                type="text"
                                size="small"
                                @click="showDialog(scope.row.empId)"
                                >修改</el-button>
                            <el-button  
                                type="text"
                                size="small"
                                @click="deleteOneInfo(scope.row.empId)"
                                >删除</el-button>
                            <el-button  
                                type="text"
                                size="small"
                                @click="detailSearch(scope.row.empId)"
                                >详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <!-- 列表开始  end -->
	    </el-row> 

	    <!--增加/修改员工弹框 start-->
        <el-dialog
            size="small"
            :title="dialog_name"
            class="default-dialog dialog-small"
            :visible.sync="new_custom"
            :before-close="closeDialog">
            <div>
	            <el-form :inline="true" class="">
	                <el-row :gutter="24">
	                    <el-col :span="12">
		                    <el-form-item label="员工工号：">
	                            <el-input placeholder='请输入员工工号' v-model="initial_info.empNo" class="asterisk"></el-input>
	                        </el-form-item>
	                    </el-col>
	                    <el-col :span="12">
		                    <el-form-item label="员工姓名：">
	                            <el-input v-model="initial_info.empNm" placeholder="请输入员工姓名" class="asterisk"></el-input>
	                        </el-form-item>
	                    </el-col>
	                </el-row>
                </el-form>
            </div>
			<div class="message fr">
                <el-button class="btn btn-green btn-small" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-gray btn-small" @click="closeDialog()">关 闭</el-button>
            </div>
        </el-dialog>
        <!--增加/修改员工弹框 end-->

	    <!--详情弹框 start-->
        <el-dialog
            size="large"
            title="员工详情"
            class="default-dialog dialog-small"
            :visible.sync="details_custom"
            :before-close="closeDialog">
            <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="工单号：">
                            <el-input placeholder="输入工单号"></el-input>
                        </el-form-item>
                        <el-form-item label="周：">
                            <el-input placeholder="输入周"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="detailSearch()" class="btn btn-blue">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset()" class="btn btn-orange">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="detailrefresh()" class="btn btn-blue">刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="detailExport()" class="btn btn-blue">导出</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="list-table">
		                    <el-table
		                        style="width: 100% "
		                        :data="work_table_data">
		                        <el-table-column prop="name" label="工单号"></el-table-column>
		                        <el-table-column prop="account" label="周"></el-table-column>
		                        <el-table-column prop="account" label="班次"></el-table-column>
		                        <el-table-column prop="account" label="产品BOM编号"></el-table-column>
		                        <el-table-column prop="account" label="机台号"></el-table-column>
		                        <el-table-column prop="account" label="计划产量"></el-table-column>
		                        <el-table-column prop="account" label="上工时间"></el-table-column>
		                        <el-table-column prop="account" label="实际产量"></el-table-column>
		                        <el-table-column prop="account" label="下工时间"></el-table-column>
		                    </el-table>
		                </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
        <!--详情弹框 end-->
        
        <!--分页 start-->
        <div class="table-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.page_num"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page.page_size
                    layout="total, sizes, prev, pager, next"
                    :total="page.total">
            </el-pagination>
        </div>
        <!-- 分页 end -->
	</div>
</template>
<!-- 引入js -->
<script src="./staffmanagements.js"></script>