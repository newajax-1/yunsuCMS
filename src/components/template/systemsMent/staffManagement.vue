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
                            <el-button @click="search()" class="btn btn-small btn-blue"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-small btn-orange"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
                <el-button @click="refresh()" class="btn btn-blue btn-small"> <i class="fa fa-refresh "></i> 刷 新</el-button>
                <el-button @click="deleteInfo()" class="btn btn-small btn-blue "><i class="fa fa-trash-o"></i> 删 除</el-button>
                <el-button @click="showDialog()" class="btn btn-large btn-blue"><i class="fa fa-file-text-o"></i> 增加员工</el-button>
            </el-col>

            <el-col :span="24" class="table-wrap">
	            <!-- 列表开始  start -->
                <el-table 
                    border
                    :data="table_data"
                    @selection-change="handleSelectionChange">
                	<el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="index" label="NO"></el-table-column>
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
                <!--分页 start-->
                <div class="table-page">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="page.page_num"
                        :page-size=page.page_size
                        layout="total, prev, pager, next"
                        :total="page.total">
                    </el-pagination>
                </div>
                <!-- 分页 end -->
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
		                    <el-form-item label="员工工号：" class="required">
	                            <el-input placeholder='请输入员工工号' v-model="initial_info.empNo" ></el-input>
	                        </el-form-item>
	                    </el-col>
	                    <el-col :span="12">
		                    <el-form-item label="员工密码：" class="required">
	                            <el-input v-model="initial_info.password" placeholder="请输入员工密码"></el-input>
	                        </el-form-item>
	                    </el-col>
	                </el-row>
	                <el-row :gutter="24">
	                	<el-col :span="12">
		                    <el-form-item label="员工姓名：" class="required">
	                            <el-input v-model="initial_info.empNm" placeholder="请输入员工姓名"></el-input>
	                        </el-form-item>
	                    </el-col>
	                </el-row>
                </el-form>
            </div>
            <div class="message center">
                <el-button class="btn btn-green btn-small" @click="saveInfo()">保 存</el-button>
                <el-button class="btn btn-gray btn-small" @click="closeDialog()">关 闭</el-button>
            </div>
        </el-dialog>
        <!--增加/修改员工弹框 end-->
	</div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
</style>
<!-- 引入js -->
<script src="./staffmanagements.js"></script>