<template>
    <div class="saler-info">
        <el-row>
            <!-- 查询条件开始  start-->
            <el-col :span="24">
                <div class="content-title">
                    <span>库存预警</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="库品名称：">
                            <el-input placeholder="输入库品名称" v-model='warning.itemName' prop="itemName"></el-input>
                        </el-form-item>
                        <el-form-item label="备货状态：">
                            <el-select v-model="warning.invSts">
                                        <el-option
                                                v-for="item in selectInvSts"
                                                :label="item.dicName"
                                                :value="item.dicValue">
                                        </el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='loadTable(1)' class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='reset()' class="reset-btn">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 查询条件结束 end -->
            
            <!-- 刷新  删除  添加操作开始  start -->
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons" @click="refresh"><i class="fa fa-repeat"></i> 刷新</el-button>
                    <el-button class="list-buttons" @click="batchDelete"><i class="fa fa-trash-o"></i> 批量删除</el-button>
                    <el-button class="list-buttons" @click="toAdd()"><i class="fa fa-user-plus"></i> 新建库存预警</el-button>
                </el-col>
            </div>

            <!-- 刷新  删除  添加操作结束 end -->
            <el-col :span="24">
                <!-- 原料库存  成品库存  选择开始start -->
                <el-tabs v-model="activeName" type="card" class="list-tab" @tab-click="changeTableEffective">
                    <el-tab-pane label="原材料库存" name="first" ></el-tab-pane>
                    <el-tab-pane label="成品库存" name="second"></el-tab-pane>
                </el-tabs>              
                <!-- 原料库存  成品库存  选择开始end -->
                <!-- 列表开始  start -->
                <div class="list-table">
                    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="itemNo" label="库品编号"></el-table-column>
                        <el-table-column prop="itemName" label="库品名称"></el-table-column>
                        <el-table-column prop="materialFactory" label="供应商"></el-table-column>
                        <el-table-column prop="curInv" label="当前库存量"></el-table-column>
                        <el-table-column prop="secInv" label="安全库存量"></el-table-column>
                        <el-table-column prop="invStsName" label="库存状态"></el-table-column>
                        <el-table-column fixed="right" label="操作" width="140">
                            <template scope="scope">
                                <el-button type="text" size="small" v-show="showInfo[scope.$index].show">备库存</el-button>
                                <el-button type="text" size="small" @click="detailtab(scope.row)">详情</el-button>
                                <el-button type="text" size="small" @click="edittab(scope.row.invWarningId)">修改</el-button>
                                <el-button type="text" size="small" @click="deletetab(scope.row.invWarningId)"> 删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                 <!-- 列表开始  end -->
            </el-col>
        </el-row>

        <!--分页-->
        <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total="page.total">
            </el-pagination>
        </div>

        <!--新增弹框-->
        <el-dialog
                title="新增库存预警"
                :visible.sync="newWarning"
                size="tiny"
                custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品类型：">
                                    <el-select :placeholder="selectOp[0] && selectOp[0].dicName" v-model="sel_val" @change="changeSelValue()">
                                        <el-option
                                                v-for="item in selectOp"
                                                :label="item.dicName"
                                                :value="item.dicValue">
                                        </el-option>
                                    </el-select>
                                     <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                       <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品编号：">
                                <input type="hidden" v-html='addInfo.curIns' id=curIns>
                                    <el-select v-model="addInfo.itemNo" @change="changeItemNo(1)">
                                        <el-option
                                                v-for="item in selectItemOp"
                                                :label="item.itemNo"
                                                :value="item.itemNo">
                                        </el-option>
                                    </el-select>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品名称：">
                                     <p v-html="addInfo.itemName"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" v-show="showFactory">
                                <el-form-item label="供应商：">
                                    <p v-html="addInfo.materialFactory"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="安全库存：">
                                    <el-input v-model="addInfo.secInv"></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库存预警：低于">
                                    <el-input v-model="addInfo.secInv" :disabled="true"></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-save btn" @click="addNewWarning()">提交</el-button>
                <el-button class="btn-close btn" @click="newWarning = false">取 消</el-button>
            </span>
        </el-dialog>

      <!--修改弹框-->
      <el-dialog
        title="修改库存预警"
        :visible.sync="editWarning"
        size="tiny"
        custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品类型：">
                                    <!-- id -->
                                     <input type="hidden" v-html='editTable.invWarningId' id="invWarningId">
                                     <!-- 默认的预警编号 -->
                                     <input type="hidden" v-html='editTable.warningType' id="warningType">
                                     <p v-html="editTable.warningName"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                       <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品编号：">
                                <input type="hidden" v-html='editTable.curInv' id=curIns>
                                    <el-select v-model="editTable.itemNo" @change="changeItemNo(2)">
                                        <el-option
                                                v-for="item in eselectItemOp"
                                                :label="item.itemNo"
                                                :value="item.itemNo">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品名称：">
                                     <p v-html="editTable.itemName"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="供应商：" v-show="showFactoryUpdate">
                                    <p v-html="editTable.materialFactory"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="安全库存：">
                                    <el-input v-model="editTable.secInv"></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库存预警：低于">
                                    <el-input v-model="editTable.secInv" :disabled="true"></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-save btn" @click="UpdateInvWarning()">提交</el-button>
                <el-button class="btn-close btn" @click="editWarning = false">取 消</el-button>
            </span>
      </el-dialog>

        <!-- 删除提示信息 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible" 
          size="tiny">
              <span v-text="deleteMsg">
                
              </span>
              <span slot="footer" class="dialog-footer">
                   <el-button type="primary" @click="deleteObject()">确 定</el-button>
                  <el-button @click="dialogVisible = false">
                    <input type="hidden" v-html='tipMsg' id="deleteId">
                    取 消
                  </el-button>
                 
              </span>
       </el-dialog> 
       
       
       
       <!--新增弹框-->
        <el-dialog
                title="新增库存预警"
                :visible.sync="detailWarning"
                size="tiny"
                custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品类型：">
                                    <p v-html="detailInfo.warningName"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                       <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品编号：">
                                     <p v-html="detailInfo.itemNo"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库品名称：">
                                     <p v-html="detailInfo.itemName"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" v-show="showFactoryDetail">
                                <el-form-item label="供应商：">
                                    <p v-html="detailInfo.materialFactory"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="安全库存：">
                                     <p v-html="detailInfo.secInv"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="库存预警：低于">
                                    <p v-html="detailInfo.secInv"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-close btn" @click="detailWarning = false">返回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<!-- 引入js -->
<script src="./invWarningJs.js"></script>

<!-- 样式 -->
<style lang="stylus" rel="stylesheet/stylus">

</style>
