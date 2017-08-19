<template>
    <el-row class="product-boms">
        <div class="content-title">
            <span>工程管理-产品管理-产品BOM</span>
        </div>
        <div class="content-search">
            <el-form :inline="true">

                <el-form-item label="产品BOM编号：">
                    <el-input 
                        placeholder="输入参数编号" 
                        v-model="product_bom_form_data.productNo">
                    </el-input>
                </el-form-item>

                <el-form-item label="产品BOM名称：">
                    <el-input 
                        placeholder="输入参数编号" 
                            v-model="product_bom_form_data.productNm">
                    </el-input>
                </el-form-item>

                <el-form-item label="客户BOM编号：">
                    <el-input 
                        placeholder="输入参数编号" 
                            v-model="product_bom_form_data.custProductNo">
                    </el-input>
                </el-form-item>


                <el-form-item>
                    <el-button class="btn btn-small btn-blue" @click="searchFormData()"> <i class="fa fa-search"></i> 查 询</el-button>
                    <el-button class="btn btn-small btn-orange" @click="reset"> <i class="fa fa-window-restore"></i>重 置</el-button>
                </el-form-item>
            </el-form>
        </div> 

        <!-- 
            @content-buttons {必须存在} 正文操作按钮，带icon按钮
            @btn-small {必须存在} 两字带icon 按钮，默认颜色为 btn-blue
            @btn-large {必须存在} 四字带icon 按钮，默认颜色为 btn-blue
        -->
        <el-col :span="24" class="content-buttons">
            <el-button class="btn btn-blue btn-small" @click="refresh" ><i class="fa fa-refresh "></i> 刷 新</el-button>
            <el-button class="btn btn-blue btn-small" @click="deleteIds()" ><i class="fa fa-trash-o"></i> 删除</el-button>
            <el-button class="btn btn-blue btn-small" @click="gotoAddpage()"><i class="fa fa-file-text-o"></i> 新增</el-button>
        </el-col>
        
        <!-- @table-wrap {必须存在} 正文表格父类 属性border必选 -->
        <div class="table-wrap">
            <el-table
             border
             :data="product_bom_table_data"
             @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45"></el-table-column>
                <el-table-column prop="productNo" label="产品BOM编号"></el-table-column>
                <el-table-column prop="productNm" label="产品BOM名称"></el-table-column>
                <el-table-column prop="custProductNo" label="客户BOM编号"></el-table-column>
                <el-table-column prop="mouldNo" label="模具编号"></el-table-column>
                <el-table-column prop="number" label="穴号"></el-table-column>
                <el-table-column prop="materialGrade" label="材质&牌号"></el-table-column>
                <el-table-column prop="color" label="色号&颜色"></el-table-column>
                <el-table-column prop="productWeight" label="单位重量"></el-table-column>
                <el-table-column prop="gapWeight" label="水口重量"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="openProductBomModify(scope.row.productId,2)">
                            修改
                        </el-button>
                        <el-button
                            type="text"
                            size="small"
                            @click="deleteId(scope.row.productId)">
                            删除
                        </el-button>
                        <el-button 
                            type="text"
                            size="small"
                            @click="openProductBomInfo(scope.row.productId,2)">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- @table-page {必须存在} 正文表格分页 -->
            <div class="table-page">
                <el-pagination
                    layout="total, prev, pager, next"
                    :current-page.sync="product_bom_page_list.pageNum"
                    :page-size="product_bom_page_list.pageSize"
                    :total="product_bom_page_list.total"
                    @size-change="currentSizeChange"
                    @current-change="currentPageChange">
                </el-pagination>
            </div>
        </div>

        <!-- 
            @default-dialog {必须存在} 初始化弹窗样式 
            @dialog-large {必须存在#与size='large'同时存在} 弹窗large尺寸定义 
        -->

        <!--详情弹窗-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            :title="dialog_title"
            :visible.sync="product_bom_info">
            <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" >
                                <el-row>
                                    <el-col :span="24">
                                        <span class="dialog-title">基础信息</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="产品BOM名称：">
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.productNm"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="客户BOM编号：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.custProductNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="穴号：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.number"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="dashed"></div>
                                <el-row>
                                    <el-col :span="24">
                                        <span class="dialog-title">更多信息</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="材质 & 牌号：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.materialGrade"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品重量（g）：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.productWeight"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="色号&颜色：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.color"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="水口重量（g）：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.gapWeight"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="二次加工：" >
                                            <el-select
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.secdProc">
                                                <el-option 
                                                    v-for=" item in sync_product_data.dicList5"
                                                    :label="item.dicName"
                                                    :value="item.dicValue"
                                                    :key="item.dicValue">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="包装类型：" >
                                            <el-select
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.packingTyp">
                                                <el-option 
                                                    v-for=" item in sync_product_data.dicList6"
                                                    :label="item.dicName"
                                                    :value="item.dicValue"
                                                    :key="item.dicValue">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    
                                    <el-col :span="8">
                                        <el-form-item label="包装数量：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.packingCount"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="包装详情：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                type="textarea"
                                                v-model="product_bom_info_form.packingDetl"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div class="message center mt-10">
                <el-button class="btn btn-small btn-gray" @click="product_bom_info= false">关 闭</el-button>
            </div>
        </el-dialog>

        <!--修改弹窗-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            :title="dialog_title"
            :visible.sync="product_bom_modify">
            <el-row>
                <el-col :span="24">
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" >
                                <el-row>
                                    <el-col :span="24">
                                        <span class="dialog-title">基础信息</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="产品BOM名称：">
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.productNm"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="客户BOM编号：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.custProductNo"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="穴号：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.number"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <div class="dashed"></div>
                                <el-row>
                                    <el-col :span="24">
                                        <span class="dialog-title">更多信息</span>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="材质 & 牌号：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.materialGrade"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品重量（g）：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.productWeight"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="色号&颜色：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.color"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="水口重量（g）：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.gapWeight"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="二次加工：" >
                                            <el-select
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.secdProc">
                                                <el-option 
                                                    v-for=" item in sync_product_data.dicList5"
                                                    :label="item.dicName"
                                                    :value="item.dicValue"
                                                    :key="item.dicValue">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="包装类型：" >
                                            <el-select
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.packingTyp">
                                                <el-option 
                                                    v-for=" item in sync_product_data.dicList6"
                                                    :label="item.dicName"
                                                    :value="item.dicValue"
                                                    :key="item.dicValue">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    
                                    <el-col :span="8">
                                        <el-form-item label="包装数量：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                v-model="product_bom_info_form.packingCount"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="包装详情：" >
                                            <el-input 
                                                :disabled="bom_edit" 
                                                type="textarea"
                                                v-model="product_bom_info_form.packingDetl"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="updateProductBom()">提交</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeModal">关 闭</el-button>
            </div>
        </el-dialog>

    </el-row>
</template>

<script src="./productBoms.js"></script>
<style lang="stylus">
.product-boms
    .dialog-title
        font-weight 700
        display:block
        margin-bottom 20px
    .dashed
        display block
        height 1px
        width 100%
        border-bottom 1px dashed #666
        margin 10px 0 36px
    .default-dialog
        .el-form-item
            width: 100% !important 
        .el-form-item__label
            width: 40%

</style>
