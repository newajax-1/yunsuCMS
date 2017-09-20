<template>
    <div class="equipment_info_detail">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>模具管理-模具基础信息-增加模具</span>
                </div>
            </el-col>

            <div class="content-buttons">
                <el-col :span="24">
                    <el-button class="btn btn-blue btn-small" @click="saveTableData"><i class="fa fa-check-square-o"></i> 提交</el-button>
                    <el-button class="btn btn-blue btn-small" @click="goBack()"><i class="fa fa-undo"></i> 返回</el-button>
                    <el-button @click="openMouldInfoModal('add')" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 增加产品</el-button>
                </el-col>
            </div>

            <el-col :span="24">
                <!-- 校验规则必须写在 el-form 标签中 -->
                <el-form :inline="true" class="add-mould-form">
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="模具类型：">
                                <el-select 
                                    :disabled="mould_type_tips"
                                    placeholder="选择设备类型" 
                                    class="required" 
                                    v-model="add_info.mouldTyp">
                                    <el-option 
                                        v-for="item in mould_type_list"
                                        :label="item.dicName"
                                        :value="item.dicValue"
                                        :key="item.dicValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="模具代码：">
                                <el-input placeholder="请输入保模具代码" :disabled="source_type" class="required" v-model="add_info.mouldCode"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="设计模数：">
                                <el-input placeholder="请输入设计模数" :disabled="source_type" class="required" v-model="add_info.dsgnCnt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="　模穴数：">
                                <el-select 
                                    placeholder="选择模穴数" 
                                    class="required" 
                                    :disabled="source_type"
                                    v-model="add_info.cavityCnt">
                                    <el-option 
                                        v-for="item in cavity_cnt_list"
                                        :label="item.dicName"
                                        :value="item.dicValue"
                                        :key="item.dicValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="初始模数：">
                                <el-input placeholder="请输入初始模数" :disabled="source_type" class="required" v-model="add_info.initCnt"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="成型周期：">
                                <el-input placeholder="请输入成型周期" :disabled="source_type" class="required" v-model="add_info.moldingCycl"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="模具状态：">
                                <el-select 
                                    placeholder="选择模具状态" 
                                    class="required"
                                    :disabled="source_type" 
                                    v-model="add_info.mouldSts">
                                    <el-option 
                                        v-for="item in mould_status_list"
                                        :label="item.dicName"
                                        :value="item.dicValue"
                                        :key="item.dicValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="模具归属：">
                                <el-select 
                                    placeholder="选择模具归属" 
                                    class="required"
                                    :disabled="source_type" 
                                    v-model="add_info.mouldAscription">
                                    <el-option 
                                        v-for="item in mould_asc_list"
                                        :label="item.dicName"
                                        :value="item.dicValue"
                                        :key="item.dicValue"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="模具制造：">
                                <el-input placeholder="请输入模具制造工厂" :disabled="source_type" class="required width-other" v-model="add_info.mouldFactory"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="客户名称：">
                                <el-select 
                                    placeholder="选择客户名称" 
                                    class="required width-other"
                                    :disabled="source_type" 
                                    v-model="add_info.custFactory">
                                    <el-option 
                                        v-for="item in cust_info_list"
                                        :label="item.custName"
                                        :value="item.custNo"
                                        :key="item.custNo"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="可用机台：" class="required">
                                <p class="machineName-text">{{ add_info.machineName }}</p>
                            </el-form-item>
                            <el-button class="btn btn-large btn-blue" @click="toAddProduct()" style="margin-top: 4px;">添加可用机台</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>

            <el-col :span="24">
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :height="$tableHeight"
                        :data="table_data" >
                        <el-table-column prop="productNm" label="产品BOM编号"></el-table-column>
                        <el-table-column prop="custProductNo" label="客户BOM编号"></el-table-column>
                        <el-table-column prop="number" label="穴号"></el-table-column>
                        <el-table-column prop="materialGrade" label="材质&牌号"></el-table-column>
                        <el-table-column prop="color" label="色号&颜色"></el-table-column>
                        <el-table-column prop="productWeight" label="产品重量"></el-table-column>
                        <el-table-column prop="gapWeight" label="水口重量"></el-table-column>
                        <el-table-column prop="secdProcName" label="二次加工"></el-table-column>
                        <el-table-column prop="packingTypName" label="包装类型"></el-table-column>
                        <el-table-column prop="packingCount" label="包装数量"></el-table-column>
                        <el-table-column prop="packingDetl" label="包装详情"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="openMouldInfoModal(scope.row)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"
                                    v-show="(scope.row.count - 0) > 0 ? false : true"    
                                    @click="deleteId(scope.row.index,scope.row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>

        </el-row>

        <!--新增弹框-->
        <el-dialog
            :title="diag_title"
            :visible.sync="new_custom"
            size="small"
            class="default-dialog dialog-small"
            :before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <div class="pub-mask-wrap">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-form :inline="true" class="">
                            <el-row>
                                <el-col :span="24">
                                    <span class="dialog-title">基础信息</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="产品BOM名称：">
                                        <el-input placeholder="请输入产品BOM名称" class="required" v-model="dialog_form_data.productNm"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="客户BOM编号：">
                                        <el-input placeholder="请输入客户BOM编号" class="required" v-model="dialog_form_data.custProductNo"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="　　　　穴 号：">
                                        <el-input placeholder="请输入穴号" class="required" v-model="dialog_form_data.number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="dashed"></div>
                            <el-row>
                                <el-col :span="24">
                                    <span class="dialog-title">更多信息</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="材质&牌号：">
                                        <el-input placeholder="请输入材质&牌号" class="required" v-model="dialog_form_data.materialGrade"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="　产品重量(g)：">
                                        <el-input placeholder="请输入产品重量" v-model="dialog_form_data.productWeight"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="色号&颜色：">
                                        <el-input placeholder="请输入色号&颜色" class="required" v-model="dialog_form_data.color"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="　水口重量(g)：">
                                        <el-input placeholder="请输入水口重量" v-model="dialog_form_data.gapWeight"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="　二次加工：">
                                        <el-select 
                                            placeholder="选择二次加工" 
                                            v-model="dialog_form_data.secdProc" >
                                            <el-option 
                                            v-for="item in secd_proc_list"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="　包装类型：" >
                                        <el-select 
                                            placeholder="选择包装类型" 
                                            v-model="dialog_form_data.packingTyp">
                                            <el-option 
                                            v-for="item in packing_typ_list"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue"
                                            ></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="包装数量(pcs)：">
                                        <el-input placeholder="请输入包装数量" v-model="dialog_form_data.packingCount"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="　包装详情：">
                                        <el-input
                                            type="textarea"
                                            :rows="2"
                                            placeholder="请输入内容"
                                            v-model="dialog_form_data.packingDetl">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="saveModalDataInitTable()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

        <!--新增弹框-->
        <el-dialog
            title="可用机台"
            :visible.sync="product_custom"
            size="tiny"
            class="default-dialog dialog-tiny"
            :before-close="closeDialog">
            <el-row>
                <el-col :span="24">
                    <div class="table-wrap">
                        <!-- 校验规则必须写在 el-form 标签中 -->
                        <el-table 
                            border
                            :data="product_data" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="45"></el-table-column>
                            <el-table-column prop="eqpCode" label="可用机台"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            <div class="message center mt-10">
                <el-button class="btn btn-small btn-green" @click="saveProductInfo()" style="margin-left:-12px;">确 定</el-button>
            </div>
        </el-dialog>
        

        <!--分页 start-->
        <!-- <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[15, 20, 30, 40]"
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
    .add-mould-form
        padding: 20px 0 0 20px
    .width-other
        .el-input__inner
            width 200px !important
    .machineName-text
        width 400px
        height 22px
        border 1px solid #e5e5e5
        background-color #fff
        padding 3px 6px
        font-size 12px
        line-height 22px
        color #97a8be
        margin-top 4px
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
    .el-textarea__inner
        resize: none
        font-size 12px
        font-family "Microsoft Yahei"
</style>