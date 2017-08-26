<template>
    <div class="warning-inv">
        <el-row>
            <!-- 查询条件开始  start-->
            <el-col :span="24">
                <div class="content-title">
                    <span>库存预警</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="库品名称：">
                            <el-input placeholder="输入库品名称" v-model='warning.item_name' prop="itemName"></el-input>
                        </el-form-item>
                        <el-form-item label="备货状态：">
                            <el-select v-model="warning.inv_sts">
                                <el-option
                                    v-for="item in select_inv_sts"
                                    :label="item.dicName"
                                    :value="item.dicValue"
                                    :key="item.dicValue"
                                    >
                                </el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='loadTable(1)' class="btn btn-small btn-blue"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click='reset()' class="btn btn-small btn-orange"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 查询条件结束 end -->
            
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-small btn-blue" @click="refresh()"><i class="fa fa-refresh"></i> 刷新</el-button>
                    <el-button class="btn btn-large btn-blue" @click="batchDelete()"><i class="fa fa-trash-o"></i> 批量删除</el-button>
                    <el-button class="btn btn-large btn-blue" @click="toAdd()"><i class="fa fa-file-text-o"></i> 新建预警</el-button>
                </el-col>
            </div>

            <el-col :span="24">
                <el-tabs v-model="active_name" type="card" class="tab-title" @tab-click="changeTableEffective">
                    <el-tab-pane label="原材料库存" name="first" ></el-tab-pane>
                    <el-tab-pane label="成品库存" name="second"></el-tab-pane>
                </el-tabs>

                <!-- 列表开始  start -->
                <div class="table-wrap">
                    <el-table
                        border
                        :height="$tableHeight"
                        :data="table_data" 
                         @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column prop="itemNo" label="库品编号"></el-table-column>
                        <el-table-column prop="itemName" label="库品名称"></el-table-column>
                        <el-table-column prop="materialFactory" label="供应商"></el-table-column>
                        <el-table-column prop="curInv" label="当前库存量"></el-table-column>
                        <el-table-column prop="secInv" label="安全库存量"></el-table-column>
                        <el-table-column prop="invStsName" label="库存状态"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button type="text" size="small" @click="detailtab(scope.row.invWarningId)">详情</el-button>
                                <el-button type="text" size="small" @click="edittab(scope.row.invWarningId)">修改</el-button>
                                <el-button type="text" size="small" @click="deletetab(scope.row.invWarningId)"> 删除</el-button>
                                <el-button type="text" size="small" v-show="show_info[scope.$index].show">备库存</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--分页-->
                    <div class="table-page" v-if="page.total === 0 ? false : true">
                        <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page.sync="page.page_num"
                                :page-size="page.page_size"
                                layout="total, sizes, prev, pager, next, jumper"
                                :page-sizes="[10, 20, 30, 40]"
                                :total="page.total">
                        </el-pagination>
                    </div>
                </div>
                 <!-- 列表开始  end -->
            </el-col>
        </el-row>


        <!--新增弹框-->
        <el-dialog
                title="新增库存预警"
                :visible.sync="new_warning"
                size="small"
                class="default-dialog dialog-small"
                :before-close="closeDialog">
                <el-form :inline="true" class="">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="库品类型：" class="required">
                                <el-select placeholder="原材料" v-model="add_info.sel_val" @change="changeSelValue()" class="asterisk">
                                    <el-option
                                            v-for="item in select_op"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue"
                                            >
                                    </el-option>
                                </el-select>
                                    
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="库品编号：" class="required">
                                <input type="hidden" v-html='add_info.cur_ins' id="curIns">
                                <el-select v-model="add_info.item_no" @change="changeItemNo(1)" class="asterisk">
                                    <el-option
                                            v-for="item in select_item_op"
                                            :label="item.itemNo"
                                            :value="item.itemNo"
                                            :key="item.itemNo"
                                            >
                                    </el-option>
                                </el-select>
                                
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="库品名称：" >
                                    <p>{{ add_info.item_name }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-show="show_factory">
                            <el-form-item label="　供应商：" class="text-ellipsis">{{ add_info.material_factory }}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-form-item label="安全库存：" class="required">
                                <el-input v-model="add_info.sec_inv" class="asterisk"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="库存预警：低于">
                                <el-input v-model="add_info.sec_inv" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div class="message center clearfix">
                    <el-button class="btn btn-small btn-green" @click="addNewWarning()">保 存</el-button>
                    <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
                </div>
        </el-dialog>

        <!--修改弹框-->
        <el-dialog
            title="修改库存预警"
            :visible.sync="edit_warning"
            size="small"
            class="default-dialog dialog-small"
            :before-close="closeDialog">
            <el-form :inline="true" class="">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="库品类型：">
                            <!-- id -->
                                <input type="hidden" v-html='edit_table.invWarningId' id="invWarningId">
                                <!-- 默认的预警编号 -->
                                <input type="hidden" v-html='edit_table.warningType' id="warningType">
                                <p>{{ edit_table.warningName }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库品编号：" class="required">
                            <input type="hidden" v-html='edit_table.curInv' id="curIns">
                            <el-select v-model="edit_table.itemNo" @change="changeItemNo(2)" class="asterisk">
                                <el-option
                                        v-for="item in eselect_item_op"
                                        :label="item.itemNo"
                                        :value="item.itemNo"
                                        :key="item.itemNo"
                                        >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="库品名称：">
                                <p>{{ edit_table.itemName }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="　供应商：" v-show="show_factory_update">
                            <p>{{ edit_table.materialFactory }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="安全库存：" class="required">
                            <el-input v-model="edit_table.secInv" class="asterisk"></el-input>
                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存预警：低于">
                            <el-input v-model="edit_table.secInv" :disabled="true"></el-input>
                            
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div class="message center clearfix">
                <el-button class="btn btn-small btn-green" @click="updateInvWarning()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

        <!-- 删除提示信息 -->
        <el-dialog
            title="提示"
            :visible.sync="dialog_visible" 
            size="small">
                <span v-text="delete_msg"></span>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="deleteObject()">确 定</el-button>
                    <el-button @click="dialog_visible = false">
                        <input type="hidden" v-html='tip_msg' id="deleteId">取 消
                    </el-button>
              </span>
        </el-dialog> 
       
       
       
        <!--详情弹框-->
        <el-dialog
            title="库存预警详情"
            :visible.sync="detail_warning"
            size="small"
            class="default-dialog dialog-small">
            <el-form :inline="true" class="">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="库品类型：">
                            <p>{{ edit_table.warningName }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库品编号：">
                            <p>{{ edit_table.itemNo }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="库品名称：">
                                <p>{{ edit_table.itemName }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-show="show_factory_detail">
                        <el-form-item label="　供应商：">
                            <p>{{ edit_table.materialFactory }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="安全库存：">
                                <p>{{ edit_table.secInv }}</p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存预警：低于">
                            <p>{{ edit_table.secInv }}</p>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="message center clearfix">
                <el-button class="btn-gray btn btn-small" @click="detail_warning = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<!-- 引入js -->
<script src="./invwarnings.js"></script>
<style lang="stylus">

.text-ellipsis
    .el-form-item__content
        max-width: 225px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
</style>
