<template>
    <div class="saler-info">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>销售管理-客户信息管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="客户编号：">
                            <el-input placeholder="输入编号" v-model='info.cust_no'></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input placeholder="输入名称" v-model='info.cust_name'></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input placeholder="输入联系人" v-model='info.contacts'></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="btn btn-blue">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='reset()' class="btn btn-orange">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-blue" @click="refresh()"><i class="fa fa-repeat"></i> 刷新</el-button>
                    <el-button class="btn btn-red" @click="batchDelete()"><i class="fa fa-trash-o"></i> 批量删除</el-button>
                    <el-button class="btn btn-blue" @click="toAdd()"><i class="fa fa-user-plus"></i> 新建客户</el-button>
                </el-col>
            </div>

            <el-col :span="24">
                <div class="list-table">
                    <el-table
                            :data="table_data"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column
                                prop="custType"
                                label="客户类型">
                        </el-table-column>
                        <el-table-column
                                prop="custNo"
                                label="客户编号">
                        </el-table-column>
                        <el-table-column
                                prop="custName"
                                label="客户名称">
                        </el-table-column>
                        <el-table-column
                                prop="contacts"
                                label="联系人">
                        </el-table-column>
                        <el-table-column
                                prop="phone"
                                label="手机号">
                        </el-table-column>
                        <el-table-column
                                prop="delivery"
                                label="送货地址">
                        </el-table-column>

                        <el-table-column
                                label="操作"
                                width="140">
                            <template scope="scope">
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="showDetailed(scope.row.custId)">
                                    详情
                                </el-button>
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="edittab(scope.row.custId)">
                                    修改
                                </el-button>
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="deletetab(scope.row.custId)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
        </el-row>

        <!--分页-->
        <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page.page_num"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.page_size"
                    layout="total, sizes, prev, pager, next"
                    :total="page.total">
            </el-pagination>
        </div>

        <!--新增弹框-->
        <el-dialog
                title="新增客户信息"
                :visible.sync="new_custom"
                size="small"
                custom-class="pub-dialog"
                :before-close="closeDialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="客户类型：">
                                    <el-select :placeholder="select_op[0] && select_op[0].dicName" v-model="sel_val" class="asterisk">
                                        <el-option
                                                v-for="item in select_op"
                                                :label="item.dicName"
                                                :value="item.dicValue">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="客户名称：">
                                    <el-input v-model="add_info.sel_name" class="asterisk"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="　联系人：">
                                    <el-input v-model="add_info.sel_contact" class="asterisk"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="　手机号：">
                                    <el-input v-model="add_info.sel_phone" class="asterisk"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col　:span="24">
                                <el-form-item label="送货地址：">
                                    <el-select placeholder="选择省份" v-model="f.p" @change="selpro" class="asterisk">
                                        <el-option
                                                v-for="(v,i) in pro"
                                                :label="v.name"
                                                :value="i"
                                                prop="pro">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择市" v-model="f.c" @change="selcity" class="asterisk">
                                        <el-option
                                                v-for="(v,i) in city"
                                                :label="v.name"
                                                :value="i"
                                                prop="city">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择区" v-model="f.cc"
                                               @change="result" class="asterisk">
                                        <el-option
                                                v-for="(v,i) in county"
                                                :label="v.name"
                                                :value="i"
                                                prop="county">
                                        </el-option>
                                    </el-select>
                                    <el-input style="width: 300px" v-model="add_info.address" class="asterisk"></el-input>

                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn btn-green" @click="addNewCustom()">提交</el-button>
                <el-button class="btn btn-red" @click="closeDialog">取 消</el-button>
            </span>
        </el-dialog>

      <!--修改弹框-->
      <el-dialog
        title="修改客户信息"
        :visible.sync="edit_custom"
        size="large"
        custom-class="pub-dialog"
        :before-close="closeDialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户类型：">
                                   <input type="hidden" v-html='edit_table.custType' id="custType">
                                    <el-select v-model="edit_table.custType" class="asterisk">
                                        <el-option
                                                v-for="item in edit_select_op"
                                                :label="item.dicName"
                                                :value="item.dicValue">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户编号：">
                                    <p v-html="edit_table.custNo"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户名称：">
                                    <el-input v-model="edit_table.custName" class="asterisk"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="　联系人：">
                                    <el-input v-model="edit_table.contacts" class="asterisk"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="　手机号：">
                                    <el-input v-model="edit_table.phone" class="asterisk"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="24">
                                <el-form-item label="送货地址：">
                                    <el-select placeholder="选择省份" v-model="f.p" @change="selpro" class="asterisk">
                                        <el-option
                                          :label="v.name"
                                          v-for="(v,i) in pro"
                                          :value="i"
                                          prop="pro">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择市" v-model="f.c" @change="selcity" class="asterisk">
                                        <el-option
                                          :label="v.name"
                                          v-for="(v,i) in city"
                                          :value="i"
                                          prop="city">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择区" v-model="f.cc"
                                               @change="result" class="asterisk">
                                        <el-option
                                          :label="v.name"
                                          v-for="(v,i) in county"
                                          :value="i"
                                          prop="county">
                                        </el-option>
                                    </el-select>
                                    <el-input style="width: 300px" v-model="edit_table.address" class="asterisk"></el-input>

                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn btn-green" @click="updateCustom()">提交</el-button>
                <el-button class="btn btn-red" @click="closeDialog">取 消</el-button>
            </span>
      </el-dialog>

        <!--详情弹框-->
        <el-dialog
                title="客户信息详情"
                :visible.sync="custom_detail"
                size="large"
                custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户类型：" prop="">
                                    <p v-html="edit_table.custType"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户编号：" prop="">
                                    <p v-html="edit_table.custNo"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户名称：" prop="">
                                    <p v-html="edit_table.custName"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联系人：" prop="">
                                    <p v-html="edit_table.contacts"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="手机号：" prop="">
                                    <p v-html="edit_table.phone"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="24">
                                <el-form-item label="送货地址：" prop="addr">
                                    <p v-html="edit_table.delivery"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn btn-red" @click="custom_detail = false">关 闭</el-button>
            </span>
        </el-dialog>
        
        <!-- 删除提示信息 -->
        <el-dialog
          title="提示"
          :visible.sync="dialog_visible" 
          size="tiny">
              <span v-text="delete_msg">
              	
              </span>
              <span slot="footer" class="dialog-footer">
              	   <el-button type="primary" @click="deleteObject()">确 定</el-button>
                  <el-button @click="dialog_visible = false">
                  	<input type="hidden" v-html='tip_msg' id="deleteId">
                  	取 消
                  </el-button>
                 
              </span>
       </el-dialog> 
    </div>
</template>

<script src="./salersinfos.js"></script>
