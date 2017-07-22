import Qs from 'qs'
export default {
        name: 'test',
        data() {
        	
            return {
                tableData: [],
                sysOrganization:[],
                childOrganization:[],
                commonorgId:'',
                newOrganization :false,
                addInfo:{
                	orgName:'',
                	remark:'',
                },
                selectOp:[],
                sel_val:'',
              //删除提示框start
                dialogVisible: false,
                deleteMsg:'',
                tipMsg:'',
               //列表信息
                staffList:false,
                
                // 分页
               page: {
                  pageNum: '',
                  pageSize: '',
                  total: ''
                },
                //表单数据开始start
                staffTableData:[{
                	memberName:'',
                	jobName:'',
                	jobNumber:'',
                }],
            }
        },
        methods: {
            toAdd() {
                var that = this;
                that.newCustom = true;
            },
            loadTable(){
            	var that = this;
            	that.$ajax({
            		method:"post",
            		url:'sysOrganization/queryList',
            		headers:{
            			'Content-Type':'application/json'
            		}
            	}).then(function(data){
            		if(data.data.success){
            			that.sysOrganization=data.data.data.data;
            			console.log(that.sysOrganization)
            		}
            	})
            },
            loadStaffTable(){
            	var that = this;
            	that.$ajax({
            		method:"post",
            		url:'sysOrganization/queryStaffList',
            		transformRequest: [function (data) {
                        data = JSON.stringify({
                          pageNum: that.page.pageNum,
                          pageSize: that.page.pageSize,
                          orgId:that.commonorgId,
                        });
                        return data;
                      }],
            		headers:{
            			'Content-Type':'application/json'
            		}
            	}) .then(function (data) {
                    that.staffTableData = data.data.data.page.list,
                    that.page.total = data.data.data.page.total
                })
            },
            getObject(objectChild){
            	var that=this;
            	var data=[];
            	data.push({planNo:objectChild.orgName});
            	that.commonorgId=objectChild.orgId;
            	that.tableData=data;
            },
            isDeleteParent(object){
            	var that=this;
            	var objectChilds=object.childs;
            	var data=[];
            	if(objectChilds.length==1){
            		if(objectChilds[0].orgId==null){
            			data.push({planNo:object.orgName});
            			that.commonorgId=object.orgId;
            		}
            	}
            	that.tableData=data;
            	return false;
            },
            toAdd(){
            	var that=this;
            	that.addInfo.orgName="";
            	that.sel_val="";
            	that.addInfo.remark="";
            	that.newOrganization =true;
            	that.$ajax({
            		method:"post",
            		url:'sysOrganization/toAddOrganization',
            		headers:{
            			'Content-Type':'application/json'
            		}
            	}).then(function(data){
            		if(data.data.success){
            			that.selectOp=data.data.data.dataList;
            		}
            	})
            },
            addNewOrganization(){
            	var that=this;
            	if(that.addInfo.orgName==''){
            		alert("请填写组织名称");
            		return;
            	}
            	if(that.sel_val==''){
            		alert("请选择父级组织");
            		return ;
            	}
            	that.$ajax({
            		method:"post",
            		url:'sysOrganization/addOrganization',
            		transformRequest: [function (data) {
            	            data = JSON.stringify({
            	              orgName:that.addInfo.orgName,
            	              parentId:that.sel_val,
            	              remarks:that.addInfo.remark,
            	            });
            	            return data;
            	          }],
            		headers:{
            			'Content-Type':'application/json'
            		}
            	}).then(function(data){
            		if(data.data.success){
            			alert("添加成功成功");
            			that.newOrganization=false;
                    	that.loadTable();
            		}else{
            			if(data.data.tipMsg.indexOf("重复")!=-1){
            				alert("信息重复");
            			}else{
            				alert("添加失败");
            			}
            			
            		}
            	})
            },
            deleteStaff(accountOrgid){
            	 var that = this;
                 that.deleteMsg="你确定要删除该会员？";
                 that.tipMsg=accountOrgid;
                 that.dialogVisible=true;
            },
         // 单条删除
            deletetab(id){
               var that = this;
               that.deleteMsg="你确定要删除该条数据？";
               console.info(that.commonorgId);
               that.tipMsg=that.commonorgId;
               that.dialogVisible=true;
            },
            
      	   deleteObject(){
          	  var that=this;
          	  var id=that.tipMsg;
          	  	if(that.deleteMsg.indexOf("会员")==-1){
          	  	 that.$ajax({
         	          method: 'get',
         	          url: '/sysOrganization/deleteById?orgId=' + id
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
          	  	}else{
          	  	 that.$ajax({
        	          method: 'get',
        	          url: '/sysOrganization/deleteStaffById?accountOrgid=' + id
        	          /* baseURL: 'http://192.168.168.219:8080/' */
        	        }).then(function (data) {
        	        	if(data.data.success){
        	          	  alert("删除成功");
        	          	  that.dialogVisible = false
        	          	  that.loadStaffTable();
        	            }else{
        	          	 alert("删除失败");
        	          	 that.dialogVisible = false
        	          	 that.loadStaffTable();
        	            }
        	        })
          	  	}
          		 
            },
            lookDetail(){
            	this.staffList=true;
            	this.loadStaffTable();
            },
            // 改变分页数目的时候调用
            handleSizeChange(val) {
              var that = this;
              that.page.pageSize = val;
              that.loadStaffTable();
            },
            //改变页码的时候调用
            handleCurrentChange(val) {
              var that = this;
              that.page.pageNum = val;
              that.loadStaffTable();
            },


            handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            },

        },
        //当加载页面的时候调用
        mounted(){
          this.loadTable();
        }
    }