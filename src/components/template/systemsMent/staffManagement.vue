<template>
	<div>
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
                            <el-button @click="search()" class="btn btn-blue">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="reset()" class="btn btn-orange">重置</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="refresh()" class="btn btn-blue">刷新</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="deleteInfo()" class="btn btn-red">删除</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="showDialog()" class="btn btn-yellow">增加员工</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="24">
	            <!-- 列表开始  start -->
                <el-table :data="table_data" style="width: 100%" @selection-change="handleSelectionChange">
                	<el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="empId" label="NO"></el-table-column>
                    <el-table-column prop="empNo" label="员工工号"></el-table-column>
                    <el-table-column prop="empNm" label="员工姓名"></el-table-column>
                    <el-table-column fixed="right"label="操作">
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
            custom-class="pub-dialog"
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
            <span slot="footer" class="dialog-footer">
                <el-button class="btn btn-blue" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-red" @click="closeDialog()">关 闭</el-button>
            </span>
        </el-dialog>
        <!--增加/修改员工弹框 end-->
	    <!--详情弹框 start-->
        <el-dialog
            size="large"
            title="员工详情"
            custom-class="pub-dialog"
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
        <div class="block list-page fr">
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

<style lang="stylus" rel="stylesheet/stylus">
</style>
<!-- 引入js -->
<script src="./staffmanagements.js"></script>