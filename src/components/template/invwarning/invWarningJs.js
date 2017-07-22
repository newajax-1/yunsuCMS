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
        tableData:[{
        	itemNo:'',
        	itemName:'',
        	materialFactory:'',
        	curInv:'',
        	invStsName:''
        }],
        
    	//删除提示框start
        dialogVisible: false,
        deleteMsg:'',
        tipMsg:'',
        //end
        
        

        // 表格当前页数据

        // 分页
        page: {
          pageNum: 1,
          pageSize: 10,
          total: 1
        },
        currentPage: 1,

        // 批量删除ids
        batch_ids: '',
        items:'',
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
        selectItemOp:[],
        // 修改数据存放
        eselectItemOp:[],
        eselectOp:[],
        editWarning:false,
        editTable: {
        	invWarningId:'',
        	warningType:'',  
        	warningName:'',
        	itemNo:'',
        	itemName:'',
        	materialFactory:'',
        	secInv:'',
        	curIns:''
        },
        selectOp:[],
        //是否显示  备库存这个 
        showInfo: [{
        }],
        //新增是否显示供应商
        showFactory:true,
        //更新是否显示供应商
        showFactoryUpdate:true,
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
       //是否显示
      showOpt(id){
    	  console.info(id+"@@@");
    	 /* if(invStsName=="安全"){
    		  return false;
    	  }else if(invStsName=="预警"){
    		  return true;
    	  }*/
    	  return true;
      },
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
    		  that.$ajax({
    	          method: 'get',
    	          url: '/invWarning/deleteByIds?id=' + id
    	          /* baseURL: 'http://192.168.168.219:8080/' */
    	        }).then(function (data) {
    	        	if(data.data.success){
    	          	  alert("删除成功");
    	          	  that.dialogVisible = false
    	          	  that.loadTable();
    	            }else{
    	          	 alert("删除失败");
    	          	 that.dialogVisible = false
    	          	 that.loadTable();
    	            }
    	        })
      },
      // tabController Event
      changeTableEffective(tab) {
          switch (tab.name) {
              case 'first':
            	  this.activeName=tab.name;
                  this.loadTable();
                  break;
              case 'second':
            	  this.activeName=tab.name;
                  this.loadTable();
                  break;
          }
      },
      // 复选框勾选
      handleSelectionChange(val) {
    	var batchIds="";
        for (var i = 0; i < val.length; i++) {
            batchIds =  batchIds + val[i].invWarningId+",";
        }
        this.batch_ids = batchIds.substring(0,batchIds.lastIndexOf(","));
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
      //加载表格
      loadTable(){
        var that = this;
        var warningName = "";
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
              pageNum: that.page.pageNum,
              pageSize: that.page.pageSize,
              warningName: warningName,
              itemName: $.trim(that.warning.itemName),
              invSts: that.warning.invSts,
            });
            return data;
          }],
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (data) {
              that.tableData = data.data.data.page.list,
              that.page.total = data.data.data.page.total
              that.showInfo=[];
              for(var i=0;i<that.tableData.length;i++){
            	  console.info(that.tableData[i].invStsName+"@@");
            	  if(that.tableData[i].invStsName==="预警"){
            		  that.showInfo.push({show:true});
            	  }else{
            		  that.showInfo.push({show:false});
            	  }
              }
          })
      },

      // 刷新
      refresh() {
        var that = this;
        that.page.pageNum = '1';
        that.page.pageSize = '10';
        that.warning.itemName= '';
        that.warning.invSts= '';
        that.loadTable();
      },

      // 预添加
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
          url: 'invWarning/toAddOrEditInvWarning',
        }).then(function (data) {
          that.selectOp = data.data.data.dicData;
          that.selectItemOp = data.data.data.dataList;
        });
      },

      // 预修改
      edittab(ids){
        var that = this;
        that.editWarning = true;
        that.$ajax({
          method: 'get',
          url: 'invWarning/toAddOrEditInvWarning?invWarningId='+ ids,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(function (data) {
        	  that.eselectOp = data.data.data.dicData;
              that.eselectItemOp = data.data.data.dataList;
              that.editTable =  data.data.data.data;
              if(that.editTable.warningName=="成品"){
            	  that.showFactoryUpdate=false;
              }else{
            	  that.showFactoryUpdate=true;
              }
          })
      },
      //当改变库品编号的时候调用
      changeItemNo(id){
    	  var that=this;
    	  if(id==1){
	    	  for(var i=0;i<that.selectItemOp.length;i++){
	    			  if(that.selectItemOp[i].itemNo==that.addInfo.itemNo){
	        			  that.addInfo.itemName=that.selectItemOp[i].itemName;
	        			  that.addInfo.materialFactory=that.selectItemOp[i].itemProvider;
	        			  that.addInfo.curIns=that.selectItemOp[i].curInv;
	        			  break;
	    		  
	    			  }
	    	  }
    	  }else{
    		  for(var i=0;i<that.eselectItemOp.length;i++){
	    		  if(that.eselectItemOp[i].itemNo==that.editTable.itemNo){
	    			  that.editTable.itemName=that.eselectItemOp[i].itemName;
	    			  that.editTable.materialFactory=that.eselectItemOp[i].itemProvider;
	    			  that.editTable.curIns=that.eselectItemOp[i].curInv;
	    			  break;
	    		  }
    		  }
    	  }
    	  
    	  
      },
      //改变警告类型的时候，当为成品就没有供应商
      changeSelValue(){
    	  var that=this;
    	  var warningType =that.sel_val == "" ? that.selectOp[0].dicValue : that.sel_val;
    	  if(warningType=="01"){
    		  //原材料
    		  that.showFactory=true;
    	  }else if(warningType=="02"){
    		  //成品
    		  that.showFactory=false;
    	  }
      },
      // 修改信息提交
      UpdateInvWarning(){
    	  var that=this;
          if($.trim(that.editTable.secInv) == ""){
          	alert("请填写安全库存");
          	return;
          }else{
          	if( !/^[1-9]\d*$/.test($.trim(that.editTable.secInv))){
          		alert("安全库存只能为正整数");
              	return;
          	}
          }
          that.$ajax({
              method: 'post',
              url: '/invWarning/addOrEditInvWarning',
              transformRequest: [function (data) {
              	console.info(that.addInfo.curIns);
                data = JSON.stringify({
                  invWarningId:that.editTable.invWarningId,
              	  itemNo:that.editTable.itemNo,
              	  itemName:that.editTable.itemName,
              	  materialFactory:that.editTable.materialFactory,
              	  secInv:that.editTable.secInv,
              	  curInv:$.trim(that.editTable.curIns),
                });
                console.info(data);
                return data;
              }],
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(function (data) {
              	if(data.data.success){
        				that.editWarning = false;
        				that.page.pageNum = 1;
        	            that.loadTable();
        	            that.editTable.invWarningId='';
        	            that.editTable.warningType='';
        	            that.editTable.itemNo = '';
        	            that.editTable.itemName = '';
        	            that.editTable.materialFactory = '';
        	            that.editTable.secInv = '';
        	            that.editTable.secInv = '';
        	            that.addInfo.secInv = '';
        			}else{
        				if(data.data.tipMsg.indexOf("重复")!=-1){
        					alert("用户信息重复");
        					that.editWarning = true;
        				}else{
        					that.editWarning = false;
            	            that.loadTable();
        				}
        				
        			}
              	
                  
              })
      },
      // 保存提交预警信息
      addNewWarning(){
    	var that=this;
    	var warningType =that.sel_val == "" ? that.selectOp[0].dicValue : that.sel_val;
        if(that.addInfo.itemNo == ""){
        	alert("请选择库品编码");
        	return;
        }
        if($.trim(that.addInfo.secInv) == ""){
        	alert("请填写安全库存");
        	return;
        }else{
        	if( !/^[1-9]\d*$/.test($.trim(that.addInfo.secInv))){
        		alert("安全库存只能为正整数");
            	return;
        	}
        }
        that.$ajax({
            method: 'post',
            url: '/invWarning/addOrEditInvWarning',
            transformRequest: [function (data) {
            	console.info(that.addInfo.curIns);
                data = JSON.stringify({
            	  warningType:warningType,
            	  itemNo:that.addInfo.itemNo,
            	  itemName:that.addInfo.itemName,
            	  materialFactory:that.addInfo.materialFactory,
            	  curInv:that.addInfo.curIns,
            	  secInv:$.trim(that.addInfo.secInv),
              });
              console.info(data);
              return data;
            }],
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function (data) {
            	if(data.data.success){
      				that.newWarning = false;
      				that.page.pageNum = 1;
      	            that.loadTable(0);
      	            that.sel_val = '';
      	            that.addInfo.curIns = '';
      	            that.addInfo.itemNo = '';
      	            that.addInfo.itemName = '';
      	            that.addInfo.materialFactory = '';
      	            that.addInfo.secInv = '';
      			}else{
      				if(data.data.tipMsg.indexOf("重复")!=-1){
      					alert("用户信息重复");
      					that.newWarning = true;
      				}else{
      					that.newWarning = false;
      					that.page.pageNum = 1;
          	            that.loadTable();
      				}
      				
      			}
            	
                
            })
      },

      // 改变分页数目的时候调用
      handleSizeChange(val) {
        var that = this;
        that.page.pageSize = val;
        that.loadTable();
      },
      //改变页码的时候调用
      handleCurrentChange(val) {
        var that = this;
        that.page.pageNum = val;
        that.loadTable();
      },
    },
    //当加载页面的时候调用
    mounted(){
      console.info("2222");
      this.loadSearchSelect();
      this.loadTable();
    },
  }