import Qs from 'qs'
  export default {
    name: "list-table",
    data () {
      //所有的数据v-html设置的值都得在return先设置一下  这样就可以直接通过that.获取或者设值
      return {
    	  
    	// 条件查询 start
    	warning:{
    		itemName:'',
    		invSts:''
    	},
    	selectInvSts:[],
    	//end 
    	
    	//选择开始 start
        activeName: "first",
        //end
        
        //表单数据开始start
        tableData:{
        	itemNo:'',
        	itemName:'',
        	materialFactory:'',
        	curInv:'',
        	invSts:''
        },
        
    	//删除提示框start
        dialogVisible: false,
        deleteMsg:'',
        tipMsg:'',
        //end
        
        
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

        // 批量删除ids
        batch_ids: '',

        // 新增数据
        newWarning:false,
        sel_val: '',
        selectOp: [],
        addInfo: {
        	itemNo: '',
        	itemName: '',
        	materialFactory: '',
        	secInv: ''
        },

        // 修改数据存放
        editWarning:false,
        editTable: {
          id:'',
          warningNo:'',  
          sel_val:'',
          itemNo:'',
          itemName:'',
          materialFactory:'',
          secInv:''
        },
        selectOp:[]
      }
    },
    methods: {
       //获取查询条件的下拉框
       loadSearchSelect(){
    	   var that=this;
    	   that.$ajax({
 	          method: 'get',
 	          url: '/invWarning/getAllInvStsInfo?key=inv_sts'
 	        }).then(function (data) {
 	        	that.selectInvSts = data.data.data.dicData;
 	        })
       },
      // 单条删除
      showOpt(invSts){
    	  if(invSts=="安全"){
    		  return false;
    	  }else if(invSts="预警"){
    		  return true;
    	  }
      },
      deletetab(id){
         var that = this;
         that.deleteMsg="你确定要删除该条数据？";
         that.tipMsg=id;
         that.dialogVisible=true;
      },
	   deleteObject(){
    	  var that=this;
    	  var id=that.tipMsg;
    		  that.$ajax({
    	          method: 'get',
    	          url: '/invWarning/deleteByIds?id=' + id
    	          /* baseURL: 'http://192.168.168.219:8080/' */
    	        }).then(function (data) {
    	        	if(data.data.success){
    	          	  alert("删除成功");
    	          	  that.dialogVisible = false
    	          	  that.loadTable(0);
    	            }else{
    	          	 alert("删除失败");
    	          	 that.dialogVisible = false
    	          	 that.loadTable(0);
    	            }
    	        })
      },
      // 批量删除
      batchDelete() {
        var that = this;
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
        that.warning.itemName = '';
        that.warning.invSts = '';
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
      loadTable(id){
        var that = this;
        var pageNum=0;
        var warningName = "";
        if(id==1){
        	pageNum=1;
        }else{
        	pageNum=that.page.pageNum;
        }
        
        if(that.activeName=="first"){
        	warningName="原材料";
        }else{
        	warningName="成品";
        }
        that.$ajax({
          method: 'post',
          url: '/invWarning/queryList',
          transformRequest: [function (data) {
            data = JSON.stringify({
              pageNum: pageNum,
              pageSize: that.page.pageSize,
              warningName:warningName,
              itemName: $.trim(that.warning.itemName),
              invSts: that.warning.invSts,
            });
            console.info(data);
            return data;
          }],
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (data) {
        	  console.info(data+"@");
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
        that.warning.itemName= '';
        that.warning.invSts= '';
        loadTable(1);
      },

      // 新增客户信息
      toAdd() {
        var that = this;
        that.newWarning = true;
        that.sel_val='';
        that.addInfo.itemNo='';
        that.addInfo.itemName='';
        that.addInfo.materialFactory='';
        that.addInfo.secInv='';
        that.$ajax({
          method: 'get',
          url: 'cust/getAllInvStsInfo?key=warning_type',
        }).then(function (data) {
          that.selectOp = data.data.data.dicData;
          that.loadTable(0);
        });
      },

      // 修改客户信息
      edittab(ids){
        var that = this;
        that.editCustom = true;
        that.$ajax({
          method: 'get',
          url: 'invWarning/toAddOrEditInvWarning?id='+ ids,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (res) {
        	that.selectOp = data.data.data.dicData;
            var dataArr = res.data.data.data;
            that.editTable =  dataArr;
          })
      },


      // 修改信息提交
      UpdateInvWarning(){
		var that = this;
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
      addNewWarning(){
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
      handleCurrentChange(val) {
        var that = this;
        that.page.pageNum = val;
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
      //获取查询条件的下拉框的值
      this.loadSearchSelect();
      this.loadTable(0);
    },
  }