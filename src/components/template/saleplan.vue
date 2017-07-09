<template>
    <div class="saleplan">
        <div class="content">
            <el-row>
                <!-- 销售管理 start -->
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
                                        size="small">修改</el-button>
                                    <el-button  
                                        v-show = "showInfo[scope.$index].show"
                                        type="text"
                                        size="small"
                                        @click="operationPlan(scope.row.planId,scope.$index)">下发</el-button>
                                    <el-button 
                                        type="text"
                                        size="small"@click="detailPlan(scope)">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <!-- 数据表格 end -->
            </el-row>

            <!--新增弹框 start-->
            <el-dialog
                size="tiny"
                title="新增客户信息"
                custom-class="pub-dialog"
                :visible.sync="newCustom">
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
                                                type="date"
                                                placeholder="选择日期"
                                                v-model='newFormData.publishDate'
                                                :picker-options="pickerOptions">
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

                <!-- 新增计划 可编辑table start-->
                <div class="table">
                    <el-table
                        width="100%"
                        height="250"
                        :data="newListData">
                        <el-table-column
                            fixed
                            type="selection" 
                            width="50"></el-table-column>
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
                            fixed="right"
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
        </div>
    </div>
</template>

<script>
    /**
     * doing
     *      数据表格查询 search
     *      数据表格删除 deleted
     *      数据表格 已下发或未下发 判断 {showInfo}
     *      数据表格修改 edit {没有原型图}
     *      数据表格详情 {详情页面}
     *      新建计划下发 btn-publish {新建计划中，新增已勾选的计划点击确定下发，保存在数据表格中已下发}
     *      新建计划保存 btn-save {新建计划中，新增但未下发的数据，点击保存，保存在数据表格中的未下发，并在新建计划中表格}
     *      新建计划编辑 btn-edit {新建计划中，新增但未下发的数据，点击编辑，新建计划表格所有数据都可以编辑}
     * done
     *      新建计划 表格可编辑
     *      新建计划数据 同步表格
     *      项目前端 部署与压缩打包 上线
     *      登录页
     */ 

    import Qs from 'qs'

    export default {
        name:'salplan',
        data () {
            return {

                //时间选择器
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },

                // ？？
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

                // 下发 or 详情显示
                showInfo : [
                    {
                        show : true
                    }
                ],

                //表格修改下发按钮
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
                }],

                //可编辑表格
                editFlag : true,

                //新增页面表格的数据增页面表单的数据
                newFormData:{
                    planType:'',
                    custName:'',
                    orderNo:'',
                    orderDate:'',
                    itemNo:'',
                    productName:'',
                    account:'',
                    pic:'pic',
                    publishDate:''
                },

                //新增页面表格数据组
                newListData:[],
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 数据表格 加载
            loadTable(){
                var that = this;
                that.$ajax.get('http://192.168.168.66:8080/ybs_mes/plan/index')
                .then(function(res){
                    var loadData = res.data.data.page.list;
                    that.showInfo = [];
                    loadData.every(function(el){

                        // 需要在此判断 el 中 是否下发，如果已下发，则show赋值为false,未下发show赋值为true
                        return that.showInfo.push({show : true})
                    })
                    that.tableData = loadData;
                })
                .catch(function(error){
                    console.log(error);
                });
            },

            // tabController Event 
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

            // tabController Event
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

            // 数据表格 下发Event
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

            // 数据表格 详情Event
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

            // 新增计划 btn-save
            addPlan(){
                var that = this;
                // if(typeof that.newFormData.orderDate === "object"){
                //     that.newFormData.orderDate = that.newFormData.orderDate.toLocaleDateString()
                //     that.newFormData.publishDate = that.newFormData.publishDate.toLocaleDateString()
                // }
                var  _data = {}
                for(var key in that.newFormData){
                    _data[key] = that.newFormData[key]
                }
                that.newListData.push(_data);
            },

            // 新增计划 btn-edit
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
    .message
        margin-top 30px
        padding 5px 0
        border-top 1px solid #e1e1e1
    .el-table__row 
        td
            padding 10px 0
</style>
