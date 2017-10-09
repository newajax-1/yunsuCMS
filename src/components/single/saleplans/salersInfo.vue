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
                            <el-input placeholder="输入编号" v-model.trim='info.cust_no'></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input placeholder="输入名称" v-model.trim='info.cust_name'></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input placeholder="输入联系人" v-model.trim='info.contacts'></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable()" class="btn btn-blue" v-if="buttonsRightList[3]"><i class="fa fa-search"></i> 查 询</el-button>
                            <el-button @click='reset()' class="btn btn-orange" v-if="buttonsRightList[4]"><i class="fa fa-window-restore"></i> 重 置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="btn btn-small" @click="refresh()" v-if="buttonsRightList[0]"><i class="fa fa-refresh "></i> 刷 新</el-button>
                    <el-button class="btn btn-large" @click="batchDelete()" v-if="buttonsRightList[1]"><i class="fa fa-trash-o"></i> 批量删除</el-button>
                    <el-button class="btn btn-large" @click="toAdd()" v-if="buttonsRightList[2]"><i class="fa fa-file-text-o"></i> 新建客户</el-button>
                </el-col>
            </div>

            <el-col :span="24">
                <div class="table-wrap">
                    <el-table
                        border
                        :height="$tableHeight"
                        :data="table_data"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="45"></el-table-column>
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
                                    class="r-bd"
                                    v-show="scope.row.custType !== '平台'"
                                    v-if="buttonsRightList[6]"
                                    @click="edittab(scope.row.id)"
                                    >修改</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    class="r-bd"
                                    v-show="scope.row.custType !== '平台'"
                                    v-if="buttonsRightList[7]"
                                    @click="deletetab(scope.row.id)">删除</el-button>
                                <el-button
                                    type="text"
                                    size="small"
                                    v-if="buttonsRightList[5]"
                                    @click="showDetailed(scope.row.id)">详情</el-button>
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
                            :page-sizes="[15, 20, 30, 40]"
                            :total="page.total">
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>

        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            title="新增客户信息"
            :visible.sync="new_custom"
            :before-close="closeDialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="客户类型：" class="required">
                                    <el-select :placeholder="select_op[0] && select_op[0].dicName" v-model="sel_val" >
                                        <el-option
                                            v-for="item in select_op"
                                            :label="item.dicName"
                                            :value="item.dicValue"
                                            :key="item.dicValue">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="客户名称：" class="required">
                                    <el-input v-model="add_info.sel_name" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="　联系人：" class="required">
                                    <el-input v-model="add_info.sel_contact" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="　手机号：" class="required">
                                    <el-input v-model="add_info.sel_phone" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col　:span="24">
                                <el-form-item label="送货地址：">
                                    <el-select placeholder="选择省份" v-model="f.p" @change="selpro" >
                                        <el-option
                                            v-for="(v,i) in pro"
                                            :label="v.name"
                                            :value="i"
                                            prop="pro"
                                            :key="i">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item >
                                    <el-select placeholder="选择市" v-model="f.c" @change="selcity" >
                                        <el-option
                                            v-for="(v,i) in city"
                                            :label="v.name"
                                            :value="i"
                                            prop="city"
                                            :key="i">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item>
                                    <el-select 
                                        placeholder="选择区" 
                                        v-model="f.cc"
                                        @change="result" >
                                        <el-option
                                            v-for="(v,i) in county"
                                            :label="v.name"
                                            :value="i"
                                            prop="county"
                                            :key ="i">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="input-large required" >
                                    <el-input v-model="add_info.address" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <div class="message center">
                <el-button class="btn btn-small btn-green" @click="addNewCustom()">保 存</el-button>
                <el-button class="btn btn-small btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
        </el-dialog>

        <!--修改弹框-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            title="修改客户信息"
            :visible.sync="edit_custom"
            :before-close="closeDialog">
            <el-form :inline="true" class="">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="客户类型：" class="required">
                            <input type="hidden" v-html='edit_table.custType' id="custType">
                            <el-select v-model="edit_table.custType" >
                                <el-option
                                    v-for="item in edit_select_op"
                                    :label="item.dicName"
                                    :value="item.dicValue"
                                    :key="item.dicValue">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户编号：" class="required">
                            <p v-html="edit_table.custNo"></p>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称：" class="required">
                            <el-input v-model="edit_table.custName" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <el-form-item label="　联系人：" class="required">
                            <el-input v-model="edit_table.contacts" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="　手机号：" class="required">
                            <el-input v-model="edit_table.phone" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="送货地址：">
                            <el-select placeholder="选择省份" v-model="f.p" @change="selpro" >
                                <el-option
                                    :label="v.name"
                                    v-for="(v,i) in pro"
                                    :value="i"
                                    :key="i"
                                    prop="pro">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select placeholder="选择市" v-model="f.c" @change="selcity" >
                                <el-option
                                    :label="v.name"
                                    v-for="(v,i) in city"
                                    :value="i"
                                    :key="i"
                                    prop="city">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select 
                                placeholder="选择区" 
                                v-model="f.cc"
                                @change="result" >
                                <el-option
                                    :label="v.name"
                                    v-for="(v,i) in county"
                                    :value="i"
                                    :key="i"
                                    prop="county">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="input-large required">
                            <el-input v-model="edit_table.address" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="message center">
                <el-button class="btn btn-green" @click="updateCustom()">保 存</el-button>
                <el-button class="btn btn-gray" @click="closeDialog">关 闭</el-button>
            </div>
      </el-dialog>

        <!--详情弹框-->
        <el-dialog
            size="large"
            class="default-dialog dialog-large"
            title="客户信息详情"
            :visible.sync="custom_detail">
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
                        <el-form-item label="　联系人：" prop="">
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
            <div class="message center">
                <el-button class="btn btn-small btn-gray" @click="custom_detail = false">关 闭</el-button>
            </div>
        </el-dialog>
        
        <!-- 删除提示信息 -->
        <el-dialog
            title="提示"
            :visible.sync="dialog_visible" 
            size="tiny">
            <span v-text="delete_msg"></span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteObject()">确 定</el-button>
                <el-button @click="dialog_visible = false">
                <input type="hidden" v-html='tip_msg' id="deleteId">取 消</el-button>
            </span>
       </el-dialog> 
    </div>
</template>

<script src="./salersinfos.js"></script>
<style lang="stylus">
    .saler-info
        .layout-content 
            .default-dialog 
                .el-form-item
                    width: auto
                .el-form-item__content
                    width: auto
        .el-form-item
            margin-right 5px
        .input-large
            .el-input__inner
                width: 210px
</style>
