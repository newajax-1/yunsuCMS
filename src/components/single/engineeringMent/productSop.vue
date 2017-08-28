<template>
    <el-row class="template-name">
        <div class="content-title">
            <span>工程管理-产品管理-产品SOP</span>
        </div>
        <div class="content-search">
            <el-form :inline="true">

                <el-form-item label="产品名称：">
                    <el-input 
                        placeholder="输入参数编号" 
                         v-model="product_sop_form_data.productBomName">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="btn btn-small btn-blue"@click="searchFormData()"> <i class="fa fa-search"></i>查 询</el-button>
                    <el-button class="btn btn-small btn-orange" @click="reset"><i class="fa fa-window-restore"></i> 重 置</el-button>
                </el-form-item>
            </el-form>
        </div> 

        <el-col :span="24" class="content-buttons">
            <el-button class="btn btn-blue btn-small" @click="refresh" ><i class="fa fa-refresh "></i> 刷 新</el-button>
            <el-button class="btn btn-blue btn-small" @click="deleteIds()" ><i class="fa fa-trash-o"></i> 删除</el-button>
            <el-button class="btn btn-blue btn-small" @click="toAddSop()"><i class="fa fa-file-text-o"></i> 新增</el-button>
        </el-col>
        
        <!-- @table-wrap {必须存在} 正文表格父类 属性border必选 -->
        <div class="table-wrap">
            <el-table
                border
                :height="$tableHeight"
                :data="product_sop_table_data"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column prop="sopNo" label="SOP编号"></el-table-column>
                <el-table-column prop="sopTypName" label="类型"></el-table-column>
                <el-table-column prop="sopTitl" label="标题"></el-table-column>
                <el-table-column prop="productBomName" label="产品名称"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="toModifySop(scope)">修改</el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="deleteId(scope.row.productSopId)">删除</el-button>
                        <a class="link-normal" :href="download_sop" @click.stop="setRowProductSop(scope.row.productSopId)">下载</a>
                        <a class="link-normal">
                            <label>重新上传
                                <input type="file" class="hidden abs" @change="upload(scope.row.productSopId,$event)" accept=".pdf">
                            </label>
                        </a>
                    </template>
                </el-table-column>
            </el-table>
            <!-- @table-page {必须存在} 正文表格分页 -->
            <div class="table-page" v-if="product_sop_page_list.total === 0 ? false : true">
                <el-pagination
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 40]"
                    :current-page.sync="product_sop_page_list.pageNum"
                    :page-size="product_sop_page_list.pageSize"
                    :total="product_sop_page_list.total"
                    @size-change="currentSizeChange"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>
        </div>



        <!--新增弹窗-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            title="新增产品SOP"
            :visible.sync="product_sop_add">
            <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" >
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="产品SOP类型：">
                                            <el-select
                                                v-model="product_sop_add_data_send.sopTyp">
                                                <el-option 
                                                    v-for=" item in product_sop_add_data_get.product_sop_select"                                                    
                                                    :label="item.dicName"
                                                    :value="item.dicValue"
                                                    :key="item.dicValue">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品BOM名称：" >
                                            <el-select
                                                v-model="product_sop_add_data_send.productBomId">
                                                <el-option 
                                                    v-for=" item in product_sop_add_data_get.product_bom_select"
                                                    :label="item.productNm"
                                                    :value="item.productId"
                                                    :key="item.productId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品SOP标题：" >
                                            <el-input 
                                                v-model="product_sop_add_data_send.sopTitl"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="addSop()">提交</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeModal">关 闭</el-button>
            </div>
        </el-dialog>
         <!--修改弹窗-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            title="修改产品SOP"
            :visible.sync="product_sop_modify">
            <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" >
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="产品SOP类型：">
                                            <el-select
                                                v-model="product_sop_add_data_send.sopTyp">
                                                <el-option 
                                                    v-for=" item in modify.SopSelect"
                                                    
                                                    :label="item.dicName"
                                                    :value="item.dicValue"
                                                    :key="item.dicValue">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品BOM名称：" >
                                            <el-select
                                                v-model="product_sop_add_data_send.productBomId">
                                                <el-option 
                                                    v-for=" item in modify.BomSelect"
                                                    :label="item.productNm"
                                                    :value="item.productId"
                                                    :key="item.productId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品SOP标题：" >
                                            <el-input 
                                                v-model="product_sop_add_data_send.sopTitl"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="modifySop()">提交</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeModal">关 闭</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>
<script src="./productSops.js"></script>
<style lang="stylus">
    .link-normal
        font-style: normal;
        text-decoration: none;
        color: #20a0ff;
</style>
