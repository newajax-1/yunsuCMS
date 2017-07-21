<template>
	<div>
        <el-row>
            <el-col :span="24">
            	<div class="content-title">
                    <span>用户管理</span>
                </div>
                <div class="content-search">
	                <el-form :inline="true" class="">
		                <el-form-item>
		                    <el-button @click='toAdd()' class="btn btn-close">新增</el-button>
		                </el-form-item>
		            </el-form>
		        </div>
		    </el-col>
	        <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="list-table">
                    <el-table
                        style="width: 100% "
                        :data="tableData">
                        <el-table-column prop="planNo" label="权限名称"></el-table-column>
                        <el-table-column prop="planStatus" label="权限描述"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="200">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="">修改</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
    	</el-row>
    	<!--分页 start-->
        <!-- <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageList.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=pageList.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total="pageList.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->

		<!--新增弹框 start-->
        <el-dialog
            size="large"
            title="新增用户"
            custom-class="pub-dialog"
            :visible.sync="newCustom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">

                            <!-- 校验规则必须写在 el-form 标签中 -->
                            <el-form :inline="true" class="" >

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="权限名称：">
                                            <el-input></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="权限分配：">
                                            <el-select placeholder="选择权限">
                                                <el-option label="权限" value="01"></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="权限描述：">
                                            <el-input></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="message clearfix">
                <div class="fl">
                    <el-button class="btn-edit btn" @click="">保存</el-button>
                    <el-button class="btn-save btn" @click="">取消</el-button>
                </div>
                <div class="fr">共有<span class="detailMsg">{{}}</span>条下发计划</div>
            </div>
        </el-dialog>
        <!--新增弹框 end-->
    </div>
</template>

<script>
	export default {
		name: 'adsadad',
		data() {
			return {
				newCustom: false,
			}
		},
		methods: {
			toAdd() {
				var that = this;
				that.newCustom = true;
			}
		}
	}
</script>