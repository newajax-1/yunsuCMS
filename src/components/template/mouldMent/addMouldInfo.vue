<template>
    <div class="equipment_info_detail">
        <el-row>
            <el-col :span="24" class="content-top">
                <div class="content-title">
                    <span>增加模具</span>
                </div>
            </el-col>

            <el-col :span="24">
                <div class="pub-mask-wrap">
                    <!-- 校验规则必须写在 el-form 标签中 -->
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="模具类型：">
                                    <el-select 
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
                            <el-col :span="8">
                                <el-form-item label="模具代码：">
                                    <el-input placeholder="请输入保模具代码" class="required" v-model="add_info.mouldCode"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设计模数：">
                                    <el-input placeholder="请输入设计模数" class="required" v-model="add_info.dsgnCnt"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="　模穴数：">
                                    <el-select 
                                        placeholder="选择模穴数" 
                                        class="required" 
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
                            <el-col :span="8">
                                <el-form-item label="成型周期：">
                                    <el-input placeholder="请输入成型周期" class="required" v-model="add_info.moldingCycl"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="模具状态：">
                                    <el-select 
                                        placeholder="选择模具状态" 
                                        class="required" 
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
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="模具归属：">
                                    <el-select 
                                        placeholder="选择模具归属" 
                                        class="required" 
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
                            <el-col :span="8">
                                <el-form-item label="模具制造：">
                                    <el-input placeholder="请输入模具制造" class="required" v-model="add_info.mouldFactory"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户名称：">
                                    <el-select 
                                        placeholder="选择客户名称" 
                                        class="required" 
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
                            <el-col :span="8">
                                <el-form-item label="可用机台：">
                                    <el-input placeholder="请输入可用机台" class="required" v-model="add_info.machine"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-col>

            <el-col :span="24" class="content-buttons">
            </el-col>

            <el-col :span="24">
                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <!-- 表格一 -->
                    <el-table 
                        border
                        :data="table_data" >
                        <el-table-column prop="productNm" label="产品BOM编号"></el-table-column>
                        <el-table-column prop="custProductNo" label="客户BOM编号"></el-table-column>
                        <el-table-column prop="number" label="穴号"></el-table-column>
                        <el-table-column prop="materialGrade" label="材质&牌号"></el-table-column>
                        <el-table-column prop="color" label="色号&颜色"></el-table-column>
                        <el-table-column prop="productWeight" label="单位重量"></el-table-column>
                        <el-table-column prop="gapWeight" label="水口重量"></el-table-column>
                        <el-table-column prop="packingTypName" label="二次加工"></el-table-column>
                        <el-table-column prop="secdProcName" label="包装类型"></el-table-column>
                        <el-table-column prop="packingCount" label="包装数量"></el-table-column>
                        <el-table-column prop="packingDetl" label="包装详情"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="toAdd(scope.row.index)">修改</el-button>
                                <el-button  
                                    type="text"
                                    size="small"    
                                    @click="deleteId(scope.row.index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>

            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-blue btn-small" @click="saveTableData"><i class="fa fa-check-square-o"></i> 提 交</el-button>
                    <el-button class="btn btn-blue btn-small" @click="$goRoute('mouldinfo')"><i class="fa fa-undo"></i> 返 回</el-button>
                    <el-button @click="toAdd()" class="btn btn-blue btn-large"><i class="fa fa-file-text-o"></i> 增加产品</el-button>
                </el-col>
            </div>

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
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="产品BOM名称：">
                                        <el-input placeholder="请输入产品BOM名称" class="required" v-model="table_data_son.productNm"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="客户BOM编号：">
                                        <el-input placeholder="请输入客户BOM编号" class="required" v-model="table_data_son.custProductNo"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="　　　　穴 号：">
                                        <el-input placeholder="请输入穴号" class="required" v-model="table_data_son.number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="24">
                                    <p>更多信息</p>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="材质&牌号：">
                                        <el-input placeholder="请输入材质&牌号" class="required" v-model="table_data_son.materialGrade"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="　产品重量（g）：">
                                        <el-input placeholder="请输入产品重量" class="required" v-model="table_data_son.productWeight"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="色号&颜色：">
                                        <el-input placeholder="请输入色号&颜色" class="required" v-model="table_data_son.color"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="　水口重量（g）：">
                                        <el-input placeholder="请输入水口重量" class="required" v-model="table_data_son.gapWeight"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="12">
                                    <el-form-item label="　二次加工：">
                                        <el-select 
                                            placeholder="选择二次加工" 
                                            class="required" 
                                            v-model="table_data_son.secdProc">

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
                                    <el-form-item label="　包装类型：">
                                        <el-select 
                                            placeholder="选择包装类型" 
                                            class="required" 
                                            v-model="table_data_son.packingTyp">
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
                                    <el-form-item label="包装数量（pcs）：">
                                        <el-input placeholder="请输入包装数量" class="required" v-model="table_data_son.packingCount"></el-input>
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
                                            v-model="table_data_son.packingDetl">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="saveAddInfo()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>


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