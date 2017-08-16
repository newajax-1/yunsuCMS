<template>
	<div class="equipment_info_detail">
	    <el-row>
	    	<el-col :span="24" class="content-top">
                <div class="content-title">
                    <span>新增模具</span>
                </div>
            </el-col>
            <el-col :span="24">
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :data="table_data" >
                        <el-table-column prop="eqpNo" label="产品BOM编号"></el-table-column>
                        <el-table-column prop="eqpNm" label="产品BOM名称"></el-table-column>
                        <el-table-column prop="ton" label="客户BOM编号"></el-table-column>
                        <el-table-column prop="type" label="穴号"></el-table-column>
                        <el-table-column prop="eqpBrand" label="材质&牌号"></el-table-column>
                        <el-table-column prop="eqpIp" label="色号&颜色"></el-table-column>
                        <el-table-column prop="padIp" label="单位重量"></el-table-column>
                        <el-table-column prop="eqpSts" label="水口重量"></el-table-column>
                        <el-table-column prop="eqpSts" label="二次加工"></el-table-column>
                        <el-table-column prop="eqpSts" label="包装类型"></el-table-column>
                        <el-table-column prop="eqpSts" label="包装数量"></el-table-column>
                        <el-table-column prop="eqpSts" label="包装详情"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>

            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-blue btn-small" @click="$goRoute('equipmentinfo')"><i class="fa fa-repeat" ></i> 返回</el-button>
                </el-col>
            </div>

        </el-row>
        <!--分页 start-->
        <!-- <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next"
                    :total="page_list.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->
    </div>
</template>
<script src="./addmouldinfos.js"></script>
<style lang="stylus">
.equipment_info_detail
    .content-top
        margin-bottom 10px
</style>