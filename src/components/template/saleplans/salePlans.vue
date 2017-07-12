<template>
    <div class="sale-plan">
        <el-row>
            <!-- 销售管理 start -->
            <el-col :span="24">
                <div class="content-title">
                    <span>销售管理-业务订单-确认的计划</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="下发人：">
                            <el-input placeholder="输入人员姓名" v-model='formData.operUser'></el-input>
                        </el-form-item>
                        <el-form-item label="生成时间：">
                            <el-date-picker
                                v-model="formData.operTimeStart"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                v-model="formData.operTimeEnd"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="下发时间：">
                            <el-date-picker
                                v-model="formData.createTimeStart"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                            <span style="padding: 0 10px">至</span>
                            <el-date-picker
                                v-model="formData.createTimeEnd"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='search()' class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='' class="reset-btn">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 销售管理end -->

            <!-- 刷新 or 新建 start -->
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons">
                        <i class="fa fa-repeat"></i> 刷新
                    </el-button>
                    <el-button class="list-buttons" @click="newCustom = true">
                        <i class="fa fa-user-plus"></i> 新建计划
                    </el-button>
                </el-col>
            </div>
            <!-- 刷新 or 新建 end -->

            <!-- 数据表格 start -->
            <el-col :span="24">
                <el-tabs v-model="activeName" type="card" class="list-tab" @tab-click="changeTableEffective">
                    <el-tab-pane label="全部" name="first" ></el-tab-pane>
                    <el-tab-pane label="未下发" name="second" ></el-tab-pane>
                    <el-tab-pane label="已下发" name="third"></el-tab-pane>
                </el-tabs>

                <div class="list-table">
                    <el-table
                        style="width: 100% "
                        :data="tableData"
                        @selection-change="handleSelectionChange">
                        <el-table-column prop="planNo" label="计划编号"></el-table-column>
                        <el-table-column prop="createTime" label="生产时间"></el-table-column>
                        <el-table-column prop="operTime" label="下发时间"></el-table-column>
                        <el-table-column prop="operUser" label="下发人"></el-table-column>
                        <el-table-column prop="operation" label="下发状态"></el-table-column>
                        <el-table-column prop="planStatus" label="排产状态"></el-table-column>
                        <el-table-column fixed="right"label="操作" width="150">
                            <template scope="scope">
                                <el-button  
                                    v-show = "showInfo[scope.$index].show"
                                    type="text"
                                    size="small"
                                    @click="openmodify(scope)">修改</el-button>
                                <el-button  
                                    v-show = "showInfo[scope.$index].show"
                                    type="text"
                                    size="small"
                                    @click="operationPlan(scope.row.planId,scope.$index)">下发</el-button>
                                <el-button 
                                    type="text"
                                    size="small"
                                    @click="detailplan(scope.row.planId)">详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <!-- 数据表格 end -->
        </el-row>
        <!--分页 start-->
        <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageList.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=pageList.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total="pageList.total">
            </el-pagination>
        </div>
        <!--分页 end-->

        <!--新增弹框 start-->
        <el-dialog
            size="tiny"
            title="新增客户信息"
            custom-class="pub-dialog"
            @close="clearData()"
            @open="addGuestInfo()"
            :visible.sync="newCustom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">
                            <!-- 校验规则必须写在 el-form 标签中 -- >
                            <el-form :inline="true" class="" 
                                :model="ruleForm" 
                                :rules="rules"
                                ref="ruleForm">
                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <!-- 校验提示必须加上 prop 属性 -->
                                        <el-form-item label="客户名称: " prop="custName">
                                            <el-select placeholder="选择客户" v-model="ruleForm.custName" >
                                                <el-option v-for="item in guestInfo" :label="item.custName" :value="item.custNo"></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                         <el-col :span="8">
                                    </el-col>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label='订单编号：' prop="orderNo">
                                            <el-input  v-model='ruleForm.orderNo'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="订单日期：" prop="orderDate">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model="ruleForm.orderDate"
                                                :picker-options="pickerOptions">
                                            </el-date-picker>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="产品名称：" prop="productName">
                                            <el-input v-model='ruleForm.productName'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品编号：" prop="itemNo">
                                            <el-input v-model='ruleForm.itemNo'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="需求数量：" prop="account">
                                            <el-input v-model='ruleForm.account'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="交货日期：" prop="publishDate">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model='ruleForm.publishDate'
                                                :picker-options="pickerOptions">
                                            </el-date-picker>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划类型：" prop="planType">
                                            <el-select placeholder="选择客户" v-model='ruleForm.planType'>
                                                <el-option label="确认" value="01"></el-option>
                                                <el-option label="预测" value="02"></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col >
                                        <div class="mid-btn">
                                            <el-button class="btn-save btn" @click="addPlan()">完 成</el-button>
                                        </div>
                                    </el-col>
                                </el-row>

                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <div class="message clearfix">
                <div class="fl">
                    <el-button class="btn-edit btn" @click="editTable()">编 辑</el-button>
                    <el-button class="btn-save btn" @click="saveList()">保 存</el-button>
                    <el-button class="btn-publish btn" @click="publishList()" >下 发</el-button>
                </div>
                <div class="fr">共有<span class="detailMsg">条下发计划</span></div>
            </div>

            <!-- 新增计划 可编辑table start-->
            <div class="table">
                <el-table
                    width="100%"
                    height="250"
                    :data="newListData">
                    <el-table-column
                        width="120"
                        prop="planType"
                        label="计划类型">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.planType">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="120"
                        prop="custName"
                        label="客户名称">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.custName">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="120"
                        prop="orderNo"
                        label="订单编号">
                        <template scope="scope">
                            <el-input 
                                type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.orderNo" >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="160"
                        prop="orderDate"
                        label="订单日期">
                        <template scope="scope">
                            <el-date-picker 
                                type="date" 
                                style="width: 100%;"
                                placeholder="选择日期" 
                                :disabled="editFlag"
                                v-model="scope.row.orderDate"></el-date-picker>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="itemNo"
                        label="产品编号">
                        <template scope="scope">
                            <el-input type="text" 
                                v-model="scope.row.itemNo" 
                                :disabled="editFlag">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="productName"
                        label="产品名称">
                        <template scope="scope">
                            <el-input
                                type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.productName">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="account"
                        label="数量">
                        <template scope="scope">
                            <el-input 
                                type="text"
                                :disabled="editFlag"
                                v-model="scope.row.account" >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="pic"
                        label="单位">
                        <template scope="scope">
                            <el-input type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.pic">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="160"
                        prop="publishDate"
                        label="交货日期">
                        <template scope="scope">
                            <el-date-picker 
                                type="date" 
                                style="width: 100%;"
                                placeholder="选择日期" 
                                :disabled="editFlag"
                                v-model="scope.row.publishDate"></el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 新增计划 可编辑table end-->
        </el-dialog>
        <!--新增弹框 end-->

        <!--修改弹框 start-->
        <el-dialog
            size="tiny"
            title="修改客户信息"
            custom-class="pub-dialog"
            @open = "lodeModifyInfo()"
            :visible.sync="modifysaleplan">
            <div>
                <el-row>
                    <el-col :span="24">
                        <el-form :inline="true" class="">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="客户名称:">
                                        <el-select placeholder="选择客户" v-model="newFormData.custName" >
                                            <el-option v-for="item in guestInfo" :label="item.custName" :value="item.custNo"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label='订单编号：'>
                                        <el-input  v-model='newFormData.orderNo'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="订单日期：">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model="newFormData.orderDate"
                                            :picker-options="pickerOptions">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="产品名称：" >
                                        <el-input v-model='newFormData.productName'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="产品编号：" >
                                        <el-input v-model='newFormData.itemNo'></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="需求数量：">
                                        <el-input v-model='newFormData.account'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="交货日期：">
                                        <el-date-picker
                                            type="date"
                                            placeholder="选择日期"
                                            v-model='newFormData.publishDate'
                                            :picker-options="pickerOptions">
                                        </el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="计划类型：">
                                        <el-select placeholder="选择客户" v-model='newFormData.planType'>
                                            <el-option label="确认" value="01"></el-option>
                                            <el-option label="预测" value="02"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-row>
                                <el-col >
                                    <div class="mid-btn">
                                        <el-button class="btn-save btn" @click="addPlan()">完 成</el-button>
                                    </div>
                                </el-col>
                            </el-row>

                        </el-form>
                    </el-col>
                </el-row>
            </div>

            <div class="message clearfix">
                <div class="fl">
                    <el-button class="btn-edit btn" @click="editTable()">编 辑</el-button>
                    <el-button class="btn-save btn" @click="saveModifyList()">保 存</el-button>
                    <el-button class="btn-publish btn" @click="publishModifyList()" >下 发</el-button>
                </div>
                <div class="fr">共有<span class="detailMsg">条下发计划</span></div>
            </div>

            <!-- 修改计划 可编辑table start-->
            <div class="table">
                <el-table
                    width="100%"
                    height="250"
                    :data="newListData">
                    <el-table-column
                        width="120"
                        prop="planType"
                        label="计划类型">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.planType">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="120"
                        prop="custName"
                        label="客户名称">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.custName">
                                <el-option value=""></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        width="120"
                        prop="orderNo"
                        label="订单编号">
                        <template scope="scope">
                            <el-input 
                                type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.orderNo" >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="160"
                        prop="orderDate"
                        label="订单日期">
                        <template scope="scope">
                            <el-date-picker 
                                type="date" 
                                style="width: 100%;"
                                placeholder="选择日期" 
                                :disabled="editFlag"
                                v-model="scope.row.orderDate"></el-date-picker>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="itemNo"
                        label="产品编号">
                        <template scope="scope">
                            <el-input type="text" 
                                v-model="scope.row.itemNo" 
                                :disabled="editFlag">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="productName"
                        label="产品名称">
                        <template scope="scope">
                            <el-input
                                type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.productName">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="account"
                        label="数量">
                        <template scope="scope">
                            <el-input 
                                type="text"
                                :disabled="editFlag"
                                v-model="scope.row.account" >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="120"
                        prop="pic"
                        label="单位">
                        <template scope="scope">
                            <el-input type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.pic">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        width="160"
                        prop="publishDate"
                        label="交货日期">
                        <template scope="scope">
                            <el-date-picker 
                                type="date" 
                                style="width: 100%;"
                                placeholder="选择日期" 
                                :disabled="editFlag"
                                v-model="scope.row.publishDate"></el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 修改计划 可编辑table end-->

        </el-dialog>
        <!--修改弹框 end-->
    </div>
</template>

<script src="./saleplan.js">
    /**
     * doing
     *      数据表格修改 edit （以新增为模板，保存和下发功能分别有新接口）
     *      数据表格详情 {详情页面}（不是以模态框，而是组件形式展现，所以静态页面写了，但是路由没搞好了，看不到，所以没有继续些功能）
     *      校验
     * done
     *      数据表格查询 search （报错没找出原因）
     *      新建计划 表格可编辑
     *      新建计划数据 同步表格
     *      数据表格 已下发或未下发 判断 {showInfo}
     *      项目前端 部署与压缩打包 上线
     *      登录页
     *      新建计划下发 btn-publish {新建计划中，新增已勾选的计划点击确定下发，保存在数据表格中已下发}
     *      新建计划保存 btn-save {新建计划中，新增但未下发的数据，点击保存，保存在数据表格中的未下发完成 ，并在新建计划中表格}
     *      dialog弹出时，请求获取 客户名称 与 计划类型
     *      分页
     *      重置按钮
     */  
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .message
        margin-top 30px
        padding 5px 0
        border-top 1px solid #e1e1e1
    .el-table__row 
        td
            padding 10px 0
</style>
