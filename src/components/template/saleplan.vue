<template>
    <div class="saleplan">
        <div class="content">
            <el-row>
                <el-col :span="24">
                    <div class="content-title">
                        <span>销售管理-业务订单-确认的计划</span>
                    </div>
                    <div class="content-search">
                        <el-form :inline="true" class="">
                            <el-form-item label="下发人：">
                                <el-input placeholder="输入人员姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="生成时间：">
                                <el-date-picker
                                    v-model="value1"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <span style="padding: 0 10px">至</span>
                                <el-date-picker
                                    v-model="value2"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="下发时间：">
                                <el-date-picker
                                    v-model="value3"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <span style="padding: 0 10px">至</span>
                                <el-date-picker
                                    v-model="value4"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click='' class="search-btn">查询</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click='' class="reset-btn">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <div class="content-buttons fl">
                    <el-col :span="24">
                        <el-button class="list-buttons"><i class="fa fa-repeat"></i> 刷新</el-button>
                        <el-button class="list-buttons" @click="newCustom = true"><i class="fa fa-user-plus"></i> 新建计划</el-button>
                    </el-col>
                </div>
                <el-col :span="24">
                    <el-tabs v-model="activeName" type="card" class="list-tab" @tab-click="changeTableEffective">
                        <el-tab-pane label="全部" name="first" >
                        </el-tab-pane>
                        <el-tab-pane label="未下发" name="second" >
                        </el-tab-pane>
                        <el-tab-pane label="已下发" name="third">
                        </el-tab-pane>
                    </el-tabs>
                    <div class="list-table">
                        <el-table
                            :data="tableData"
                            style="width: 100% "
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                prop="planNo"
                                label="计划编号">
                            </el-table-column>
                            <el-table-column
                                prop="createTime"
                                label="生产时间">
                            </el-table-column>
                            <el-table-column
                                prop="operTime"
                                label="下发时间">
                            </el-table-column>
                            <el-table-column
                                prop="operUser"
                                label="下发人">
                            </el-table-column>
                            <el-table-column
                                prop="operation"
                                label="下发状态">
                            </el-table-column>
                            <el-table-column
                                prop="planStatus"
                                label="排产状态">
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="150">
                                <template scope="scope">
                                    <el-button 
                                        v-show = "showInfo[scope.$index].show"
                                        type="text"
                                        size="small">
                                        修改
                                    </el-button>
                                    <el-button 
                                        v-show = "showInfo[scope.$index].show"
                                        type="text"
                                        size="small"
                                        @click="operationPlan(scope.row.planId,scope.$index)">
                                        下发
                                    </el-button>
                                    <el-button 
                                        type="text"
                                        size="small"@click="detailPlan(scope)">
                                        详情
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            <!--分页-->
            <!--新增弹框-->
            <el-dialog
                title="新增客户信息"
                :visible.sync="newCustom"
                size="tiny"
                custom-class="pub-dialog">
                <div>
                    <el-row>
                        <el-col :span="24">
                            <el-form :inline="true" class="">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="计划类型：" >
                                            <el-input v-model='newFormData.planType'></el-input>
                                            <span class="must-tips">*</span>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="客户名称:">
                                            <el-select placeholder="选择客户" v-model='newFormData.custName'>
                                                <el-option label="客户一" value="shanghai"></el-option>
                                                <el-option label="客户二" value="beijing"></el-option>
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
                                                v-model="newFormData.orderDate"
                                                type="date"
                                                placeholder="选择日期"
                                                :picker-options="pickerOptions0">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="产品编号：">
                                            <el-input v-model='newFormData.itemNo'></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="产品名称：">
                                            <el-input v-model='newFormData.productName'></el-input>
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
                                                 v-model='newFormData.publishDate'
                                                type="date"
                                                placeholder="选择日期"
                                                :picker-options="pickerOptions0">
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col >
                                        <div class="mid-btn">
                                            <el-button class="btn-save btn" @click="addPlan()">保 存</el-button>
                                            <el-button class="btn-close btn" >关 闭</el-button>
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
                        <el-button class="btn-save btn" >保 存</el-button>
                        <el-button class="btn-publish btn" >下 发</el-button>
                    </div>
                    <div class="fr">共有<span class="detailMsg">条下发计划</span></div>
                </div>
                <div class="table">
                    <el-table
                        :data="newTableData"
                        style="width: 100%">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column
                            prop="planType"
                            label="计划类型">

                            <template scope="scope">
                                <input type="text" v-model="newTableData.planType" :disabled="editFlag">
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="custName"
                            label="客户名称">

                            <template scope="scope">
                                <select v-model="newTableData.custName">
                                    <option value=""></option>
                                </select>
                            </template>

                        </el-table-column>
                        <el-table-column
                            prop="orderNo"
                            label="订单编号">
                        </el-table-column>
                        <el-table-column
                            prop="orderDate"
                            label="订单日期">
                        </el-table-column>
                        <el-table-column
                            prop="itemNo"
                            label="产品编号">
                        </el-table-column>
                        <el-table-column
                            prop="productName"
                            label="产品名称">
                        </el-table-column>
                        <el-table-column
                            prop="account"
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="pic"
                            label="单位">
                        </el-table-column>
                        <el-table-column
                            prop="publishDate"
                            label="交货日期">
                        </el-table-column>
                    </el-table>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import Qs from 'qs'
    export default {
        name:'salplan',
        data () {
            return {
                //时间选择器
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                showInfo : [
                ],
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                        }
                    }]
                },
                value1: '',
                value2: '',
                //表格修改下发按钮
                double:'true',
                single:'true',
                activeName : "first",
                // 存放日期值
                value1: '',
                value2: '',
                value3: '',
                value4: '',

                // 设置tab默认显示
                activeName2: 'first',

                // 对话框
                newCustom: false,

                // 加载表格
                tableData: [{
                    planNo: '',
                    createTime: '',
                    operTime: '',
                    operUser: '',
                    operation: '',
                    planStatus: '',
                    showInfo : true
                }],
                editFlag : true,
                newTableData:[{
                    planType:'',
                    custName:'',
                    orderNo:'',
                    orderDate:'',
                    itemNo:'',
                    productName:'',
                    account:'',
                    pic:'',
                    publishDate:''
                }],
                newFormData:{
                    planType:'',
                    custName:'',
                    orderNo:'',
                    orderDate:'',
                    itemNo:'',
                    productName:'',
                    account:'',
                    pic:'',
                    publishDate:''
                }
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            loadTable(){
                var that = this;
                that.$ajax.get('http://192.168.168.66:8080/ybs_mes/plan/index')
                .then(function(res){
                    that.tableData = res.data.data.page.list;
                    that.tableData.every(function(el){
                        return that.showInfo.push({show : true})
                    })
                })
                .catch(function(error){
                    console.log(error);
                });
            },
            loadTableStatus(id){
                var that = this;
                that.$ajax.get('http://192.168.168.66:8080/ybs_mes/plan/index?operation='+id)
                .then(function(res){
                    that.tableData = res.data.data.page.list;
                })
                .catch(function(error){
                    console.log(error);
                });
            },
            changeTableEffective(tab){
                switch(tab.name){
                    case 'first':
                        this.loadTable();
                        break;
                    case 'second':
                        this.loadTableStatus("01");
                        break;
                    case 'third':
                        this.loadTableStatus("02");
                        break;
                }
            },
            operationPlan(ids,index){
                var that = this;
                that.$ajax({
                    method: 'post',
                    url: '/plan/operationPlan',
                    transformRequest: [function (data) {
                    　　data = JSON.stringify({
                            operationType:"issued",
                            planId:ids,
                        });
                        return data;
                    }],
                    baseURL: 'http://192.168.168.66:8080/ybs_mes',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(results){
                    var data = results.data;
                    if(data.success === true){
                        that.showInfo[index].show = false
                    }
                })
            },
            detailPlan(id){
               var that = this;
                that.$ajax.get('http://192.168.168.66:8080/ybs_mes/plan/index?operation='+id)
                .then(function(res){
                    console.log(res);
                })
                .catch(function(error){
                    console.log(error);
                }); 
            },
            addPlan(){
                var that = this;
                var _data = that.newFormData
                that.$ajax({
                    method: 'post',
                    url: '/plan/addPlan',
                    transformRequest: [function (data) {
                    　　data = JSON.stringify({
                            planType:_data.planType,
                            custName:_data.custName,
                            orderNo:_data.orderNo,
                            orderDate:_data.orderDate,
                            itemNo:_data.itemNo,
                            productName:_data.productName,
                            account:_data.account,
                            publishDate:_data.publishDate
                        });
                        return data;
                    }],
                    baseURL: 'http://192.168.168.66:8080/ybs_mes',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(res){
                    var newTableData = res.data;
                })  
            },
            editTable(){
                this.editFlag = false;
            }
        },
        mounted(){
            this.loadTable();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .content
        margin-left 235px
        padding 10px 20px 25px 25px
        .content-title
            font-size 16px
            color #333333
            line-height 40px
            border-bottom #e5e5e5 solid 1px
            span
                display inline-block
                height 100%
                position relative
                &:after
                    content ''
                    position absolute
                    left 0px
                    bottom -2px
                    width 100%
                    height 1px
                    border-bottom #148aed solid 2px
        .content-search
            margin-top 20px
            border-bottom #ddd solid 1px
            .el-input
                width 148px
        .content-buttons
            padding 20px 0
            width 100%
        .search-btn
            width 117px
            height 38px
            border #148aed solid 1px
            border-radius 0
            color #148aed
            &:hover
                color #fff
                background #148aed
        .reset-btn
            width 117px
            height 38px
            border #ff9900 solid 1px
            border-radius 0
            color #ff9900
            &:hover
                color #fff
                background #ff9900
        .list-buttons
            background #f7f7f7
            border #dcdcdc solid 1px
            border-radius 0
            color #696969
            &:hover
                border #93c7f7 solid 1px
                background: #e8f5ff
                color #148aed
        .list-tab
            .el-tabs__item
                color #333333
                width 132px
                text-align center
                border #e5e5e5 solid 1px
                background #f7f7f7
                border-top #e5e5e5 solid 2px!important
            .is-active
                background #ffffff
                border-radius 0!important
                border-top #148aed solid 2px!important
        .list-table
            .el-table
                border-left none
            th
                text-align center
                font-weight normal
            td
                text-align center
        .list-page
            padding-top 35px
        .mid-btn
            text-align:center
        .message
            margin-top 30px
            padding 5px 0
            border-top 1px solid #e1e1e1
</style>
