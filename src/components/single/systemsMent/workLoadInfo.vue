<template>
    <el-row class="template-name">
        <div class="content-title">
            <span>员工管理-蓝领工作量记录</span>
        </div>
        <div class="content-search">
             <el-form :inline="true">

                <el-form-item label="工单号：">
                    <el-input 
                        v-model.trim="form_data.billNo"
                        placeholder="输入工号" 
                        >
                    </el-input>
                </el-form-item>

                <el-form-item label="周：">
                    <el-input 
                        v-model.trim="form_data.week"
                        placeholder="输入周" >
                    </el-input>
                </el-form-item>


                <el-form-item>
                    <el-button class="btn btn-small btn-blue"@click="searchFormData()" v-if="buttonsRightList[2]"><i class="fa fa-search"></i> 查 询</el-button>
                    <el-button class="btn btn-small btn-orange"@click="reset()" v-if="buttonsRightList[3]"> <i class="fa fa-window-restore"></i> 重 置</el-button>
                </el-form-item>
            </el-form>
        </div> 
        <el-col :span="24" class="content-buttons">
            <el-button class="btn btn-blue btn-small" @click="refresh()" v-if="buttonsRightList[0]"><i class="fa fa-refresh "></i> 刷 新</el-button>
            <a class="btn btn-blue btn-small link-normal" target="_blank" :href="download_url" @click="_export" v-if="buttonsRightList[1]"><i class="fa fa-external-link"></i> 导出</a>
        </el-col>
        
        <!-- @table-wrap {必须存在} 正文表格父类 属性border必选 -->
        <div class="table-wrap">
            <el-table
                :data="table_data"
                :height="$tableHeight"
                border>
                <el-table-column prop="empNo" label="工号"></el-table-column>
                <el-table-column prop="empNm" label="姓名"></el-table-column>
                <el-table-column prop="billNo" label="工单号"></el-table-column>
                <el-table-column prop="week" label="周"></el-table-column>
                <el-table-column prop="clas" label="班次"></el-table-column>
                <el-table-column prop="itemNo" label="产品BOM编号"></el-table-column>
                <el-table-column prop="machine" label="机台号"></el-table-column>
                <el-table-column prop="quantity" label="计划产量"></el-table-column>
                <el-table-column prop="startTm" label="上工时间"></el-table-column>
                <el-table-column prop="actQuantity" label="实际产量"></el-table-column>
                <el-table-column prop="endTm" label="下工时间"></el-table-column>
            </el-table>
            <div class="table-page" v-if="page_list.total === 0 ? false : true">
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[15, 20, 30, 40]"
                    :current-page.sync="page_list.pageNum"
                    :page-size="page_list.pageSize"
                    :total="page_list.total"
                    @size-change="currentSizeChange"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>
        </div>
    </el-row>
</template>
<script src="./workLoadInfos.js"></script>
<style lang="stylus">
    .link-normal
        font-style: normal;
        text-decoration: none;
        color: #20a0ff;
</style>