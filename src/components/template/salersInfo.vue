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
                            <el-input placeholder="输入编号" v-model='info.custNo' prop="custNo"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称：">
                            <el-input placeholder="输入名称" v-model='info.custName' prop="custName"></el-input>
                        </el-form-item>
                        <el-form-item label="联系人：">
                            <el-input placeholder="输入联系人" v-model='info.contacts' prop="contacts"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loadTable(1)" class="search-btn">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click='reset()' class="reset-btn">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <div class="content-buttons fl">
                <el-col :span="24">
                    <el-button class="list-buttons" @click="refresh()"><i class="fa fa-repeat"></i> 刷新</el-button>
                    <el-button class="list-buttons" @click="batchDelete()"><i class="fa fa-trash-o"></i> 批量删除</el-button>
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
                    :current-page.sync="page.pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="page.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="page.total">
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
                    <el-form :inline="true" class="subClass">
                        <el-row :gutter="24">
                            <el-col :span="16">
                                <el-form-item label="客户类型：">
                                    <el-select :placeholder="selectOp[0] && selectOp[0].dicName" v-model="sel_val">
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
                            <el-col :span="16">
                                <el-form-item label="客户名称：">
                                    <el-input v-model="addInfo.selName"></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                        	 <el-col :span="16">
                                <el-form-item label="联系人：">
                                    <el-input v-model="addInfo.selContact"></el-input>
                                    <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                        	<el-col :span="16">
                                <el-form-item label="手机号：">
                                    <el-input v-model="addInfo.selPhone"></el-input>
                                    <span class="must-tips">*</span>
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
                                        <span class="must-tips">*</span>
                                    </div>

                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>

                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-save btn" @click="addNewCustom()">提交</el-button>
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
                                   <input type="hidden" v-html='editTable.custType' id="custType">
                                    <el-select v-model="editsel_val"  :placeholder="editTable.custValue" >
                                        <el-option
                                                v-for="item in editSelectOp"
                                                :label="item.dicName"
                                                :value="item.dicValue">
                                        </el-option>
                                    </el-select>
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
                                  <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="联系人：">
                                    <el-input v-model="editTable.contacts"></el-input>
                                  <span class="must-tips">*</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="手机号：">
                                    <el-input v-model="editTable.phone"></el-input>
                                    <span class="must-tips">*</span>
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
                                      	<span class="must-tips">*</span>
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
    </div>
</template>

<script>
  import Qs from 'qs'
  import citydata from "../../assets/js/data";
  export default {
    name: "list-table",
    data () {
      //所有的数据v-html设置的值都得在return先设置一下  这样就可以直接通过that.获取或者设值
      return {
        // 设置城市三级联动参数
        dialogVisible: false,
        deleteMsg:'',
        tipMsg:'',
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
          pageNum: 1,
          pageSize: 10,
          total: 1
        },
        currentPage: 1,

        // 弹框的放大按钮
        // dialogAmp: '<span class="dialogAmp"  @click="btnClick()">放大</span>',

        // 批量删除ids
        batch_ids: '',

        // 新增数据
        sel_val: '',
        selectOp: [],
        editsel_val: '',
        editSelectOp: [],
        addInfo: {
          selValue: '',
          selName: '',
          selContact: '',
          selPhone: '',
          address: ''
        },

        // 修改数据存放
        editTable: {
          custValue:'',
          memberType:'',
          custId:'',
          custName:'',
          contacts:'',
          phone:'',
          province:'',
          city:'',
          area:'',
          address:'',
          custType:''
        }
      }
    },
    methods: {
      // 单条删除
      deletetab(id){
         var that = this;
         that.deleteMsg="你确定要删除该条数据？";
         that.tipMsg=id;
         that.dialogVisible=true;
      },
	   deleteObject(){
    	  var that=this;
    	  var id=that.tipMsg;
    	  if(id.indexOf(",")!= -1){
    		  that.$ajax({
    	          method: 'get',
    	          url: '/cust/deleteByIds?ids=' + id
    	          /* baseURL: 'http://192.168.168.219:8080/' */
    	        }).then(function (data) {
    	        	if(data.data.success){
    	          	  alert("删除成功");
    	          	  that.dialogVisible = false
    	          	  that.loadTable(0);
    	            }else{
    	          	 alert("删除失败");
    	          	 that.dialogVisible = false
    	            }
    	        })
    	  }else{
    		  that.$ajax({
                  method: 'get',
                  url: '/cust/deleteById?id=' + id
                 /*  baseURL: 'http://192.168.168.219:8080/', */
                }).then(function (data) {
                  if(data.data.success){
                	  alert("删除成功");
                	  that.dialogVisible=false;
                	  that.loadTable(0);
                  }else{
                	  alert("删除失败");
                	  that.dialogVisible=false;
                  }
                }) 
    	  }
      },
      // 批量删除
      batchDelete() {
        var that = this;
        console.log(that.batch_ids);
        if (that.batch_ids == "") {
          alert("请选择要删除的记录");
          return;
        }
        that.deleteMsg="你确定要删除这些数据？";
        that.tipMsg=that.batch_ids;
        that.dialogVisible=true;
      },

      // 重置
      reset() {
        var that = this;
        that.info.custNo = '';
        that.info.custName = '';
        that.info.contacts = '';
      },

      // 复选框勾选
      handleSelectionChange(val) {
        var batchIds="";
        for (var i = 0; i < val.length; i++) {
            batchIds =  batchIds + val[i].custId+",";
        }
        this.batch_ids = batchIds.substring(0,batchIds.lastIndexOf(","));
      },

      //加载表格
      loadTable(id){
        var that = this;
        var pageNum = 0;
        if(id==1){
        	pageNum=1;
        }else{
        	pageNum=that.page.pageNum;
        }
        that.$ajax({
          method: 'post',
          url: '/cust/queryList',
          transformRequest: [function (data) {
            data = JSON.stringify({
              pageNum: pageNum,
              pageSize: that.page.pageSize,
              custNo: that.info.custNo,
              custName: $.trim(that.info.custName),
              contacts: $.trim(that.info.contacts)
            });
            return data;
          }],
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (data) {
            that.tableData = data.data.data.page.list;
              that.page.total = data.data.data.page.total;
          })
      },

      // 刷新
      refresh() {
        var that = this;
        that.page.pageNum = '1';
        that.page.pageSize = '10';
        that.info.custName= '';
        that.info.custNo= '';
        that.info.contacts= '';
        loadTable(1);
      },

      // 新增客户信息
      toAdd() {
        var that = this;
        that.newCustom = true;
        that.sel_val='';
        that.addInfo.selName='';
        that.addInfo.selContact='';
        that.addInfo.selPhone='';
        that.f.p='';
        that.f.c='';
        that.f.cc='';
        that.addInfo.address='';
        that.$ajax({
          method: 'get',
          url: 'cust/getSelects?key=cust_type',
        }).then(function (data) {
          that.selectOp = data.data.data.dicData;
        });
      },

      // 修改客户信息
      edittab(ids){
        var that = this;
        that.editCustom = true;
        that.$ajax({
            method: 'get',
            url: 'cust/getSelects?key=cust_type',
          }).then(function (data) {
            that.editSelectOp = data.data.data.dicData;
            that.loadTable(0);
          });
        that.$ajax({
          method: 'get',
          url: 'cust/getObject?id='+ ids,
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
          })
      },


      // 修改信息提交
      UpdateCustom(){
		var that = this;
		var s_province,s_city,s_area;
		if (isNaN(Number(that.f.p))) {
			s_province = that.f.p;
		} else {
			s_province = that.pro[that.f.p].name;
		}
		if (isNaN(Number(that.f.c))) {
			s_city = that.f.c;
		} else {
			s_city = that.city[that.f.c].name;
		}
		if (isNaN(Number(that.f.cc))) {
			s_area = that.f.cc;
		} else {
			s_area = that.county[that.f.cc].name;
		}
		var custType=that.editsel_val=="" ? that.editTable.custType:that.editsel_val;
		console.info(custType);
		 if($.trim(custType)=="" || $.trim(that.editTable.custName) == "" || $.trim(that.editTable.contacts) == "" 
     		||$.trim(that.editTable.phone)==""||s_province==""
     		||s_city==""||s_area==""
     		||$.trim(that.editTable.address)==""){
     			alert("请将信息填写完整");
     			return;
	     }else if(!/^1[34578]\d{9}$/.test($.trim(that.editTable.phone))){
	     		alert("手机格式错误");
	     		return;
	     }else{
		        that.$ajax({
		            method: 'post',
		            url: '/cust/save',
		            transformRequest: [function (data) {
		              //console.log(s_province + "," + s_city + "," + s_area);
		              data = JSON.stringify({
		            	  custType : custType ,
			              custId : $.trim(that.editTable.custId),
			              memberType: $.trim(that.editTable.memberType),
			              custName : $.trim(that.editTable.custName),
			              contacts : $.trim(that.editTable.contacts),
			              phone : $.trim(that.editTable.phone),
			              province : s_province,
			              city : s_city, 
			              area : s_area,
			              address : $.trim(that.editTable.address)
		              });
		              console.info(data);
		            return data;
		          }],
		         /*  baseURL: 'http://192.168.168.219:8080/', */
		          headers: {
		            'Content-Type': 'application/json'
		          }
		        })
		          .then(function(results){
		        	if(results.data.success){
			        	that.loadTable(0);
			            that.editCustom = false;
			            that.sel_val = '';
			            that.addInfo = '';
			            that.f.p = '';
			            that.f.c = '';
			            that.f.cc = '';
		        	}else {
		        		if(results.data.tipMsg.indexOf("重复")!=-1){
      						alert("用户信息重复");
      						that.editCustom = true;
	      				}else{
	      					that.editCustom = false;
	          	            that.loadTable(0);
	      				}
		        	}
		          })
	     	}
      },


      // 保存提交客户信息
      addNewCustom(){
        var that = this;
        var custType =that.sel_val == "" ? that.selectOp[0].dicValue : that.sel_val;
        var flag1=false,flag2=false,flag3=false;
        if(typeof(that.f.c)=="string"){
        	if(that.f.c==""){
        		flag1=true;
        	}
        }
        if(typeof(that.f.c)=="number"){
        	if(that.f.c<0){
        		flag1=true;
        	}
        }
        if(typeof(that.f.cc)=="string"){
        	if(that.f.cc==""){
        		flag2=true;
        	}
        }
        if(typeof(that.f.cc)=="number"){
        	if(that.f.cc<0){
        		flag2=true;
        	}
        }
        if(typeof(that.f.p)=="string"){
        	if(that.f.p==""){
        		flag3=true;
        	}
        }
        if(typeof(that.f.p)=="number"){
        	if(that.f.cc<0){
        		flag3=true;
        	}
        }
        if($.trim(that.addInfo.selName) == ""|| custType == "" || $.trim(that.addInfo.selContact) == "" 
        		||$.trim(that.addInfo.selPhone)==""||flag3
        		||flag1||flag2
        		||$.trim(that.addInfo.address)==""){
        	alert("请将信息填写完整");
        	return;
        }else{
        	if(!/^1[34578]\d{9}$/.test($.trim(that.addInfo.selPhone))){
        		alert("手机格式错误");
        		return;
        	}else{
        		that.newCustom = false;
            	that.$ajax({
                    method: 'post',
                    url: '/cust/save',
                    transformRequest: [function (data) {
                      data = JSON.stringify({
                    	custType : custType,
                        custName  : $.trim(that.addInfo.selName),
                        contacts   : $.trim(that.addInfo.selContact),
                        phone  : $.trim(that.addInfo.selPhone),
                        province: that.pro[that.f.p].name,
                        city: that.city[that.f.c].name,
                        area: that.county[that.f.cc].name,
                        address : $.trim(that.addInfo.address)
                      });
                      return data;
                    }],
                    /* baseURL: 'http://192.168.168.219:8080/', */
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(function (data) {
          			if(data.data.success){
          				that.editCustom = false;
          	            that.loadTable(1);
          	            that.sel_val = '';
          	            that.addInfo.selName = '';
          	            that.addInfo.selContact = '';
          	            that.addInfo.selPhone = '';
//          	            that.addInfo.address = '';
          	            that.f.p = '';
          	            that.f.c = '';
          	            that.f.cc = ''
          			}else{
          				if(data.data.tipMsg.indexOf("重复")!=-1){
          					alert("用户信息重复");
          					that.newCustom = true;
          				}else{
          					that.newCustom = false;
              	            that.loadTable(0);
          				}
          				
          			}
                  	
                    })
        	}
        }
        
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
        that.loadTable(0);
      },
// -----------------------------------------------------------------------------------------------------------------------------------      
      handleCurrentChange(val) {
        var that = this;
        that.page.pageNum = val;
        console.log("pageNum", that.page.pageNum)
        console.log("pageSize",that.page.pageSize)
        that.loadTable(0);
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
      this.loadTable(0);
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
.subClass label
	width 100px
</style>
