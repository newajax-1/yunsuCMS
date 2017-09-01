<template>
	<div class="pro-monitoring">
   		<el-row>
    		<el-col :span="24">
                <div class="content-title">
                    <span>生产作业-生产进度监控</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="生产批号：">
                            <el-input placeholder="输入生产批号" v-model="seach_info.product_no"></el-input>
                        </el-form-item>
                        <el-form-item label="生产型号：">
                            <el-input placeholder="输入生产型号" v-model="seach_info.item_no"></el-input>
                        </el-form-item>
                        <el-form-item label="计划生产时间：">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                 v-model="seach_info.start_time">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                 v-model="seach_info.end_time">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="btn btn-small btn-blue"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click="reset()" class="btn btn-small btn-orange"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 数据表格 start -->
            <el-col :span="24">
                <div class="table-wrap">
                    <el-table
                        border
                        :height="$tableHeight"
                        :data="table_data">
                        <el-table-column prop="itemNo" label="产品型号"></el-table-column>
                        <el-table-column prop="itemName" label="产品名称"></el-table-column>
                        <el-table-column prop="productNo" label="生产批号"></el-table-column>
                        <el-table-column prop="billNo" label="工单号"></el-table-column>
                        <el-table-column prop="machine" label="机台归属"></el-table-column>
                        <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column prop="materialGrade" label="原材料"></el-table-column>
                        <el-table-column prop="scndProc" label="二次加工"></el-table-column>
                        <el-table-column prop="productTime" label="计划生产日期"></el-table-column>
                        <el-table-column prop="prodSts" label="生产状态"></el-table-column>
                        <el-table-column prop="quantity" label="计划产量"></el-table-column>
                        <el-table-column prop="actQuantity" label="实际产量"></el-table-column>
                        <el-table-column prop="finishRatio" label="完成率"></el-table-column>
                        <el-table-column prop="rjctNum" label="不良品数量"></el-table-column>
                        <el-table-column prop="rjctRatio" label="不良率"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="showDetail(scope.row)">不良记录</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页 start-->
                    <div class="table-page" v-if="page_list.total === 0 ? false : true">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="page_list.page_num"
                                :page-size=page_list.page_size
                                layout="total, sizes, prev, pager, next, jumper"
                                :page-sizes="[15, 20, 30, 40]"
                                :total="page_list.total">
                        </el-pagination>
                    </div>
                    <!--分页 end-->
                </div>
            </el-col>
            <!-- 数据表格 end -->
    	</el-row>

		<!--详情弹框 start-->
        <el-dialog
            size="small"
            title="不良记录"
            class="default-dialog dialog-small"
            :visible.sync="new_custom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="table-wrap">
		                    <el-table
		                        border
		                        :data="bad_table_data">
                                <el-table-column prop="createTime" label="提交时间"></el-table-column>
                                <el-table-column prop="rjctType" label="不良类型"></el-table-column>
		                    </el-table>
		                </div>
                    </el-col>
                </el-row>
            </div>
            <div class="message mt-10 center">
                <el-button class="btn btn-small btn-gray" @click="new_custom = false">关 闭</el-button>
            </div>
        </el-dialog>
        <!--详情弹框 end-->
	</div>
</template>
<script src="./promonitorings.js"></script>