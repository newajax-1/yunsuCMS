<template>
    <div class="content">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>销售管理-客户信息管理</span>
                </div>
                <div class="content-search">
                    <el-form :inline="true" class="">
                        <el-form-item label="客户编号：">
                            <el-input placeholder="输入编号" v-model='info.custNo' prop="custNo"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input placeholder="输入名称" v-model='info.custName' prop="custName"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input placeholder="输入联系人" v-model='info.contacts' prop="contacts"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable" class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='reset' class="reset-btn">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons" @click="refresh"><i class="fa fa-repeat"></i> 刷新</el-button>
                    <el-button class="list-buttons" @click="batchDelete"><i class="fa fa-trash-o"></i> 批量删除</el-button>
                    <el-button class="list-buttons" @click="toAdd()"><i class="fa fa-user-plus"></i> 新建客户</el-button>
                </el-col>
            </div>

            <el-col :span="24">
                <div class="list-table">
                    <el-table
                            :data="tableData"
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
                                fixed="right"
                                label="操作"
                                width="140">
                            <template scope="scope">
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="{lookInfo(scope.row)}">
                                    详情
                                </el-button>
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="{edittab(scope.row.custId)}">
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
                    :current-page.sync=page.pageNum
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size=page.pageSize
                    layout="total, sizes, prev, pager, next"
                    :total=page.total>
            </el-pagination>
        </div>

        <!--新增弹框-->
        <el-dialog
                title="新增客户信息"
                :visible.sync="newCustom"
                size="tiny"
                custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户类型：">
                                    <el-select placeholder="选择客户类型" v-model="sel_val">
                                        <el-option
                                                v-for="item in selectOp"
                                                :label="item.dicName"
                                                :value="item.dicValue">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户名称：">
                                    <el-input v-model="addInfo.selName"></el-input>
                                    <!--<span class="must-tips">*</span>-->
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联系人：">
                                    <el-input v-model="addInfo.selContact"></el-input>
                                    <!--<span class="must-tips">*</span>-->
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="手机号：">
                                    <el-input v-model="addInfo.selPhone"></el-input>
                                    <!--<span class="must-tips">*</span>-->
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="24">
                                <el-form-item label="送货地址：">
                                    <el-select placeholder="选择省份" v-model="f.p" @change="selpro">
                                        <el-option
                                                :label="v.name"
                                                v-for="(v,i) in pro"
                                                :value="i"
                                                prop="pro">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择市" v-model="f.c" @change="selcity">
                                        <el-option
                                                :label="v.name"
                                                v-for="(v,i) in city"
                                                :value="i"
                                                prop="city">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择区" v-model="f.cc" v-show="county.length>0"
                                               @change="result">
                                        <el-option
                                                :label="v.name"
                                                v-for="(v,i) in county"
                                                :value="i"
                                                prop="county">
                                        </el-option>
                                    </el-select>
                                    <div style="margin-top: 15px;">
                                        <el-input style="width: 300px" v-model="addInfo.address"></el-input>
                                        <!--<span class="must-tips">*</span>-->
                                    </div>

                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-green btn" @click="addNewCustom()">提交</el-button>
                <el-button class="btn-close btn" @click="newCustom = false">取 消</el-button>
            </span>
        </el-dialog>

      <!--修改弹框-->
      <el-dialog
        title="修改客户信息"
        :visible.sync="editCustom"
        size="tiny"
        custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户类型：">
                                    <p v-html="editTable.custType"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户编号：">
                                    <p v-html="editTable.custNo"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户名称：">
                                    <el-input v-model="editTable.custName"></el-input>
                                  <!--<span class="must-tips">*</span>-->
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联系人：">
                                    <el-input v-model="editTable.contacts"></el-input>
                                  <!--<span class="must-tips">*</span>-->
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="手机号：">
                                    <el-input v-model="editTable.phone"></el-input>
                                  <!--<span class="must-tips">*</span>-->
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="24">
                                <el-form-item label="送货地址：">
                                    <el-select placeholder="选择省份" v-model="f.p" @change="selpro">
                                        <el-option
                                          :label="v.name"
                                          v-for="(v,i) in pro"
                                          :value="i"
                                          prop="pro">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择市" v-model="f.c" @change="selcity">
                                        <el-option
                                          :label="v.name"
                                          v-for="(v,i) in city"
                                          :value="i"
                                          prop="city">
                                        </el-option>
                                    </el-select>
                                    <el-select placeholder="选择区" v-model="f.cc" v-show="county.length>0"
                                               @change="result">
                                        <el-option
                                          :label="v.name"
                                          v-for="(v,i) in county"
                                          :value="i"
                                          prop="county">
                                        </el-option>
                                    </el-select>
                                    <div style="margin-top: 15px;">
                                        <el-input style="width: 300px" v-model="editTable.address"></el-input>
                                      <!--<span class="must-tips">*</span>-->
                                    </div>

                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-save btn" @click="UpdateCustom()">提交</el-button>
                <el-button class="btn-close btn" @click="editCustom = false">取 消</el-button>
            </span>
      </el-dialog>

        <!--详情弹框-->
        <el-dialog
                title="客户信息详情"
                :visible.sync="customDetail"
                size="tiny"
                custom-class="pub-dialog">
            <span>
                <div class="pub-mask-wrap">
                    <el-form :inline="true" class="">
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户类型：" prop="">
                                    <p v-html="tableData.custType"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="客户编号：" prop="">
                                    <p v-html="tableData.custNo"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="8">
                                <el-form-item label="客户名称：" prop="">
                                    <p v-html="tableData.custName"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联系人：" prop="">
                                    <p v-html="tableData.contacts"></p>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="手机号：" prop="">
                                    <p v-html="tableData.phone"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="24">
                                <el-form-item label="送货地址：" prop="addr">
                                    <p v-html="tableData.delivery"></p>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-close btn" @click="customDetail = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import Qs from 'qs'
  import citydata from "../../assets/js/data";
  export default {
    name: "list-table",
    data () {
      return {
        // 设置城市三级联动参数
        data: citydata,
        pro: "",
        city: "",
        county: "",
        addr: "",
        f: {
          p: "请选择",
          c: "请选择",
          cc: "请选择",
        },

        // 条件查询
        info: {
          custNo: '',
          custName: '',
          contacts: ''
        },

        // 存放日期值
        value1: '',
        value2: '',
        value3: '',
        value4: '',

        // 对话框
        newCustom: false,
        customDetail: false,
        editCustom: false,

        // 表格当前页数据
        tableData: [{
          custId: '',
          custType: '',
          custNo: '',
          custName: '',
          contacts: '',
          phone: '',
          delivery: '',
        }],

        // 分页
        page: {
          pageNum: '',
          pageSize: '',
          total: ''
        },
        currentPage: 1,

        // 弹框的放大按钮
        // dialogAmp: '<span class="dialogAmp"  @click="btnClick()">放大</span>',

        // 批量删除ids
        batch_ids: '',

        // 新增数据
        sel_val: '',
        selectOp: [],
        addInfo: {
          selValue: '',
          selName: '',
          selContact: '',
          selPhone: '',
          address: ''
        },

        // 修改数据存放
        editTable: {
          custType:'',
          memberType:'',
          custId:'',
          custName:'',
          contacts:'',
          phone:'',
          province:'',
          city:'',
          area:'',
          address:''
        }
      }
    },
    methods: {

      // 单条删除
      deletetab(id){
        var that = this;
        that.$ajax({
          method: 'get',
          url: 'ybs_mes/cust/deleteById?id=' + id,
          baseURL: 'http://192.168.168.66:8080/',
        }).then(function () {
          that.loadTable();
        })
      },

      // 批量删除
      batchDelete() {
        var that = this;
        if (that.batch_ids == "") {
          alert("请选择要删除的记录");
          return;
        }
        that.$ajax({
          method: 'get',
          url: 'ybs_mes/cust/deleteByIds?ids=' + that.batch_ids,
          baseURL: 'http://192.168.168.66:8080/'
        }).then(function () {
          that.loadTable();
        })
      },

      // 重置
      reset() {
        var that = this;
        that.info.custNo = '';
        that.info.custName = '';
        that.info.contacts = '';
        that.loadTable();
      },

      // 复选框勾选
      handleSelectionChange(val) {
        for (var i = 0; i < val.length; i++) {
          if (val.length) {
            var ids = [];
            for (var i = 0; i < val.length; i++) {
              ids.push(val[i].custId);
            }
            this.batch_ids = ids.join(',')
          } else {
            this.batch_ids = '';
          }
        }
      },

      //加载表格
      loadTable(){
        var that = this;
        that.$ajax({
          method: 'post',
          url: 'ybs_mes/cust/queryList',
          transformRequest: [function (data) {
            data = JSON.stringify({
              pageNum: that.page.pageNum,
              pageSize: that.page.pageSize,
              custNo: that.info.custNo,
              custName: that.info.custName,
              contacts: that.info.contacts
            });
            return data;
          }],
          baseURL: 'http://192.168.168.66:8080/',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (data) {
            that.tableData = data.data.data.page.list,
              that.page.pageNum = data.data.data.page.pageNum,
              that.page.pageSize = data.data.data.page.pageSize,
              that.page.total = data.data.data.page.total
          })
      },

      // 刷新
      refresh() {
        var that = this;
        that.page.pageNum = '1';
        that.page.pageSize = '10';
        loadTable();
      },

      // 新增客户信息
      toAdd() {
        var that = this;
        that.newCustom = true;
        that.$ajax({
          method: 'get',
          url: 'ybs_mes/cust/getSelects?key=cust_type',
          baseURL: 'http://192.168.168.66:8080/'
        }).then(function (data) {
          that.selectOp = data.data.data.dicData;
          that.loadTable();
        });
      },

      // 修改客户信息
      edittab(ids){
        var that = this;
        that.editCustom = true;
        that.$ajax({
          method: 'get',
          url: 'ybs_mes/cust/getObject?id='+ ids,
          transformRequest: [function (data) {
            data = JSON.stringify({
              id : ids
            });
            return data;
          }],
          baseURL: 'http://192.168.168.66:8080/',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (res) {
            var dataArr = res.data.data.data;
            that.editTable =  dataArr;
            that.f.p = dataArr.province;
            that.f.c = dataArr.city;
            that.f.cc = dataArr.area;
            that.loadTable();
          })
      },


      // 修改信息提交
      UpdateCustom(ids){
        var that = this;
        that.$ajax({
          method: 'post',
          url: 'ybs_mes/cust/save',
          transformRequest: [function (data) {
            data = JSON.stringify({
              custId : that.editTable.custId,
              memberType: that.editTable.memberType,
              custName : that.editTable.custName,
              contacts : that.editTable.contacts,
              phone : that.editTable.phone,
              province : that.pro[that.f.p].name,
              city : that.city[that.f.c].name,
              area : that.county[that.f.cc].name,
              address : that.editTable.address,
            });
            return data;
          }],
          baseURL: 'http://192.168.168.66:8080/',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function(results){
            that.loadTable();
            that.editCustom = false;
            that.sel_val = '';
            that.addInfo = '';
            that.f.p = '';
            that.f.c = '';
            that.f.cc = '';
          })
      },


      // 保存提交客户信息
      addNewCustom(){
        var that = this;
        that.newCustom = false;
        that.$ajax({
          method: 'post',
          url: 'ybs_mes/cust/save',
          transformRequest: [function (data) {
            data = JSON.stringify({
              custType : that.sel_val,
              custName  : that.addInfo.selName,
              contacts   : that.addInfo.selContact,
              phone  : that.addInfo.selPhone,
              province: that.pro[that.f.p].name,
              city: that.city[that.f.c].name,
              area: that.county[that.f.cc].name,
              address : that.addInfo.address
            });
            return data;
          }],
          baseURL: 'http://192.168.168.66:8080/',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function () {
            that.loadTable();
            that.sel_val = '';
            that.addInfo.selName = '';
            that.addInfo.selContact = '';
            that.addInfo.selPhone = '';
//            that.addInfo.address = '';
            that.f.p = '';
            that.f.c = '';
            that.f.cc = ''
          })
      },

      //查看详情
      lookInfo(obj){
        this.customDetail = true;
        this.tableData = obj;
      },

      // 分页
      handleSizeChange(val) {
        var that = this;
        that.page.pageSize = val;
        that.loadTable();
      },
      handleCurrentChange(val) {
        var that = this;
        that.page.pageNum = val;
        that.loadTable();
      },

      // 城市三级联动
      selpro: function () {
        this.city = this.pro[this.f.p]['child'];
        this.county = this.city[0]['child'];
        this.f.c = 0;
        this.f.cc = 0;
        this.result();
      },
      selcity: function () {
        this.county = this.city[this.f.c]['child'];
        this.f.cc = 0;
        this.result();
      },
      result: function () {
        var re = {
          pro: {id: this.pro[this.f.p].id, name: this.pro[this.f.p].name},
          city: {id: this.city[this.f.c].id, name: this.city[this.f.c].name},
          county: {id: this.county[this.f.cc].id, name: this.county[this.f.cc].name}
        };
        this.$emit("select", re);
      },


    },
    mounted(){
      //当组件模板挂载时数据显示到上面去。
      this.loadTable();
    },
    created: function () {
      this.pro = this.data;
      this.city = this.pro[0]['child'];
      this.county = this.city[0]['child'];
      this.result();
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
