import Qs from 'qs'
export default {
    name: 'orgManagement',
    data() {
        
        return {
            table_data : [],
            sys_organization : [],
            child_organization : [],
            commonorg_id : undefined,
            search_pageNum : undefined,
            search_pageSize : undefined,
            new_organization : false,
            add_info:{
                org_name : undefined,
                remark : undefined,
            },
            select_op:[],
            sel_val : undefined,

            // 删除提示框start
            dialog_visible : false,
            delete_msg  : undefined,
            tip_msg : undefined,
            // 列表信息
           
            // 分页
            page: {
                page_num : 1,
                page_size : 10,
                total : 0
            },

            //表单数据开始start
            staff_table_data:[],
        }
    },
    methods: {
        // 弹框显示
        toAdd() {
            this.new_custom = true;
        },

        // 加载部门架构数据
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type : "post",
                url : "sysOrganization/queryList",
                data : {} ,
                callback : function(data){
                    that.sys_organization = data.data.data;
                }
            })
        },

        // 加载部门员工数据
        loadStaffTable() {
            var that = this;
            this.page.total = 0;
            this.$ajaxWrap({
                type : "post",
                url : "sysOrganization/queryStaffList",
                data : {
                    pageNum: that.search_pageNum || 1,
                    pageSize: that.search_pageSize || 10,
                    orgId:that.commonorg_id,
                } ,
                callback : function(data){
                    that.staff_table_data = data.data.page.list,
                    that.page.total = data.data.page.total
                    that.page.page_num = data.data.page.pageNum;
                    that.page.page_size = data.data.page.pageSize; 
                }
            })
        },

        // 点击子元素显示
        getObject(objectChild){
            var _data = [];
            _data.push({
                planNo : objectChild.orgName
            });
            this.commonorg_id = objectChild.orgId;
            this.table_data = _data;
            this.staff_table_data = null;
        },

        // 点击父元素显示
        isDeleteParent(object){
            var objectChilds = object.childs;
            var _data = [];
            if(objectChilds.length == 1) {
                if(objectChilds[0].orgId == null){
                    _data.push({
                        planNo : object.orgName
                    });
                    this.commonorg_id = object.orgId;
                    this.staff_table_data = null;
                }
            }
            this.table_data = _data;
            return false;
        },

        // 预添加
        toAdd(){
            var that = this;
            this.add_info.org_name = "";
            this.sel_val = "";
            this.add_info.remark = "";
            this.new_organization = true;
            this.$ajaxWrap({
                type : "post",
                url : "/sysOrganization/toAddOrganization",
                data : {} ,
                callback : function(data){
                    that.select_op = data.data.dataList; 
                }
            })
        },

        // 添加新数据
        addNewOrganization(){
            var that = this;
            if(this.add_info.org_name == ""){
                that.$message({
                      message: '请填写组织名称',
                      type: 'warning'
                    });
                return;
            }
            if(this.sel_val == ""){
                that.$message({
                      message: '请选择父级组织',
                      type: 'warning'
                    });
                return ;
            }
            this.$ajaxWrap({
                type : "post",
                url : "/sysOrganization/addOrganization",
                data : {
                    orgName : that.add_info.org_name,
                    parentId : that.sel_val,
                    remarks : that.add_info.remark,
                } ,
                callback : function(data){
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    that.new_organization=false;
                    that.loadTable(); 
                },
                error(data) {
                    
                }
            })
        },

        // 删除员工弹框
        deleteStaff(accountOrgid){
             this.delete_msg = "你确定要删除该会员？";
             this.tip_msg = accountOrgid;
             this.dialog_visible = true;
        },

        // 单条删除部门弹框
        deletetab(){
           this.delete_msg = "你确定要删除该条数据？";
           this.tip_msg = this.commonorg_id;
           this.dialog_visible = true;
        },
        
        // 删除
        deleteObject(){
            var that=this;
            var flag = undefined;
            (this.delete_msg.indexOf("会员") == -1) ? (flag = "/sysOrganization/deleteById?orgId=") : (flag = "/sysOrganization/deleteStaffById?accountOrgid=");
            this.$ajaxWrap({
                type : "get",
                url : flag + that.tip_msg,
                data : {} ,
                callback : function(data){
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    that.dialog_visible = false;
                    that.table_data = null;
                    that.staff_table_data = null;
                    that.loadTable();
                },
                error(data) {
                    
                }
            })
             
        },
        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_organization = false;
            }).catch(function() {});
        },

        // 查看员工信息
        lookDetail(){
            this.staff_list = true;
            this.loadStaffTable();
        },

        searchFormData(pageval, pagesize) {
            var that = this;
            if (pagesize === "num") {
                that.search_pageNum = pageval || that.page.page_num;
                that.search_pageSize = that.page.page_size;
            } else {
                that.search_pageNum = that.page.page_num;
                that.search_pageSize = pageval || that.page.page_size;
            }
            that.loadStaffTable();
        },

        // 改变分页数目的时候调用
        handleSizeChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "size");
            };
        },

        //改变页码的时候调用
        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
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
        this.staffTableData = null;
        this.loadTable();
    }
}