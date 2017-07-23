<template>
    <div class="sale-plan">
        <el-row>
            <!-- 销售管理 start -->
            <el-col :span="24">
                <div class="content-title">
                    <span>销售计划管理</span>
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
                            <el-button @click='search()' class="btn btn-close">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='reset()' class="btn btn-reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <!-- 销售管理end -->

            <!-- 刷新 or 新建 start -->
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons" @click="getData()">
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
                        :data="tableData">
                        <el-table-column prop="planNo" label="销售计划编号"></el-table-column>
                        <el-table-column prop="createTime" label="计划生产时间"></el-table-column>
                        <el-table-column prop="operTime" label="下发时间"></el-table-column>
                        <el-table-column prop="operUserName" label="下发人"></el-table-column>
                        <el-table-column prop="operationName" label="下发状态"></el-table-column>
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
                                    @click="tipsOperationPlan(scope.row.planId,scope.$index)">下发</el-button>
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
            size="large"
            title="新增计划"
            custom-class="pub-dialog"
            :before-close="handleClose"
            @open="addGuestInfo()"
            :visible.sync="newCustom">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">

                            <!-- 校验规则必须写在 el-form 标签中 -->
                            <el-form :inline="true" class="" 
                                :model="ruleForm" 
                                :rules="rules"
                                ref="ruleForm">
                                <el-row :gutter="24">
                                    <el-col :span="8">
                                    
                                        <!-- 校验提示必须加上 prop 属性 -->
                                        <el-form-item label="客户名称：" prop="custName">
                                            <input type="hidden" value="guestInfo">
                                            <el-select placeholder="选择客户" v-model="ruleForm.custName">
                                                <el-option v-for="item in guestInfo" :label="item.custName" :value="item.custNo"></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
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
                                                v-model="ruleForm.orderDate">
                                            </el-date-picker>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="产品型号：" prop="itemNo">
                                            <el-input v-model='ruleForm.itemNo'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品名称：" prop="itemName">
                                            <el-input v-model='ruleForm.itemName'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="24">
                                    <el-col :span="8">
                                        <el-form-item label="需求数量：" prop="quantity">
                                            <el-input v-model='ruleForm.quantity'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="交货日期：" prop="deliveryDate">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model='ruleForm.deliveryDate'>
                                            </el-date-picker>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划类型：" prop="planType">
                                            <el-select placeholder="选择客户" v-model='ruleForm.planType'>
                                                <el-option label="生产" value="01"></el-option>
                                                <el-option label="库存" value="02"></el-option>
                                            </el-select>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col >
                                        <div class="mid-btn">
                                            <el-button class="btn-save btn" @click="addPlan()">完 成</el-button>
                                            <el-button class="btn-close btn" @click="closePlan()">关 闭</el-button>
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
                    <el-button class="btn-save btn" @click="ensureSave()">保 存</el-button>
                    <el-button class="btn-publish btn" @click="ensurePublish()" >下 发</el-button>
                </div>
                <div class="fr">共有<span class="detailMsg">{{detailMath}}</span>条下发计划</div>
            </div>

            <!-- 新增计划 可编辑table start-->
            <div class="table">
                <el-table
                    width="100%"
                    height="250"
                    :data="newListData">
                    <el-table-column
                        prop="planType"
                        label="计划类型">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.planType">
                                <el-option label="生产" value="01"></el-option>
                                <el-option label="库存" value="02"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="custName"
                        label="客户名称">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.custName">
                                <el-option v-for = "item in guestInfo" :label="item.custName" :value="item.custNo"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
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
                        prop="itemName"
                        label="产品名称">
                        <template scope="scope">
                            <el-input
                                type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.itemName">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="quantity"
                        label="数量">
                        <template scope="scope">
                            <el-input 
                                type="text"
                                :disabled="editFlag"
                                v-model="scope.row.quantity" >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="unit"
                        label="单位">
                        <template scope="scope">
                            <el-input type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.unit">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="deliveryDate"
                        label="交货日期">
                        <template scope="scope">
                            <el-date-picker 
                                type="date" 
                                style="width: 100%;"
                                placeholder="选择日期" 
                                :disabled="editFlag"
                                v-model="scope.row.deliveryDate"></el-date-picker>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 新增计划 可编辑table end-->
        </el-dialog>
        <!--新增弹框 end-->

        <!--修改弹框 start-->
        <el-dialog
            size="large"
            title="修改计划"
            custom-class="pub-dialog"
            :before-close="handleClose"
            :visible.sync="modifysaleplan">
            <div>
                <el-row>
                    <el-col :span="24">
                        <div class="pub-mask-wrap">   
                            <el-form :inline="true" class="" 
                                :model="ruleForm" 
                                :rules="rules"
                                ref="ruleForm">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="客户名称：">
                                            <el-select placeholder="选择客户" v-model="ruleForm.custName" >
                                                <el-option v-for="item in ModifyGuestInfo" :label="item.custName" :value="item.custNo"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label='订单编号：'>
                                            <el-input  v-model='ruleForm.orderNo'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="订单日期：">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model="ruleForm.orderDate">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="产品名称：" >
                                            <el-input v-model='ruleForm.itemName'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品编号：" >
                                            <el-input v-model='ruleForm.itemNo'></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="需求数量：">
                                            <el-input v-model='ruleForm.quantity'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="交货日期：">
                                            <el-date-picker
                                                type="date"
                                                placeholder="选择日期"
                                                v-model='ruleForm.deliveryDate'>
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划类型：">
                                            <el-select placeholder="选择客户" v-model='ruleForm.planType'>
                                                <el-option label="生产" value="01"></el-option>
                                                <el-option label="库存" value="02"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>

                                <el-row>
                                    <el-col >
                                        <div class="mid-btn">
                                            <el-button class="btn-save btn" @click="addPlan()">完 成</el-button>
                                            <el-button class="btn-close btn" @click="closePlan()">关 闭</el-button>
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
                    <el-button class="btn-save btn" @click="modifyEnsureSave()">保 存</el-button>
                    <el-button class="btn-publish btn" @click="modifyEnsurePublish()" >下 发</el-button>
                </div>
                <div class="fr">共有<span class="detailMsg" >{{detailMath}}</span>条下发计划</div>
            </div>

            <!-- 修改计划 可编辑table start-->
            <div class="table">
                <el-table
                    height="250"
                    :data="newListData">
                    <el-table-column
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
                        prop="custName"
                        label="客户名称">
                        <template scope="scope">
                            <el-select 
                                :disabled="editFlag"
                                v-model="scope.row.custName">
                                <el-option v-for = "item in ModifyGuestInfo" :label="item.custName" :value="item.custNo "></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column
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
                        prop="itemName"
                        label="产品名称">
                        <template scope="scope">
                            <el-input
                                type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.itemName">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="quantity"
                        label="数量">
                        <template scope="scope">
                            <el-input 
                                type="text"
                                :disabled="editFlag"
                                v-model="scope.row.quantity" >
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="unit"
                        label="单位">
                        <template scope="scope">
                            <el-input type="text" 
                                :disabled="editFlag"
                                v-model="scope.row.unit">
                            </el-input>
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="deliveryDate"
                        label="交货日期">
                        <template scope="scope">
                            <el-date-picker 
                                type="date" 
                                style="width: 100%;"
                                placeholder="选择日期" 
                                :disabled="editFlag"
                                v-model="scope.row.deliveryDate"></el-date-picker>
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
