<template>
	<div class="model-monitoring">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具作业管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="生产批号：">
                            <el-input placeholder="输入生产批号" v-model="seach_info.product_no"></el-input>
                        </el-form-item>
                        <el-form-item label="机台归属：">
                            <el-input placeholder="输入机台归属" v-model="seach_info.machine"></el-input>
                        </el-form-item>
                        <el-form-item label="模具代码：">
                            <el-input placeholder="输入模具代码" v-model="seach_info.mould_code"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="btn btn-small btn-blue">查询</el-button>
                            <el-button @click="reset()" class="btn btn-small btn-orange">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="24">

                <el-tabs v-model="sale_change_name" type="card" class="tab-title" @tab-click="changeTableActive">
                    <el-tab-pane label="待上模" name="first" ></el-tab-pane>
                    <el-tab-pane label="待下模" name="second"></el-tab-pane>
                    <el-tab-pane label="完成作业" name="other"></el-tab-pane>
                </el-tabs>

                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <el-table
                        border
                        :data="table_data">
                        <el-table-column prop="workplanNo" label="生产计划编号"></el-table-column>
                        <el-table-column prop="productNo" label="生产批号"></el-table-column>
                        <el-table-column prop="machine" label="机台归属"></el-table-column>
                        <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                        <el-table-column prop="mouldCode" label="模具代码"></el-table-column>
                        <el-table-column prop="installTm" label="上模时间"></el-table-column>
                        <el-table-column prop="instllOpr" label="上模人"></el-table-column>
                        <el-table-column prop="uninstalTm" label="下模时间"></el-table-column>
                        <el-table-column prop="uninstalOpr" label="下模人"></el-table-column>
                        <el-table-column label="操作" v-if="is_show">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="changeMould(scope.row.mouldOptId, scope.row.oprtTyp)"
                                    v-if="scope.row.oprtTyp == '01'">上模</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    @click="changeMould(scope.row.mouldOptId, scope.row.oprtTyp)"
                                    v-if="scope.row.oprtTyp == '02'">下模</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>
        </el-row>
        <!--分页 start-->
        <div class=" table-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next"
                    :total="page_list.total">
            </el-pagination>
        </div>
        <!--分页 end-->
	</div>
</template>
<script src="./modelmonitorings.js"></script>
<style lang="stylus">
    .model-monitoring
        .content-search
            border-bottom 0 none
</style>
