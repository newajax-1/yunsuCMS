export default {
    name: 'userManagement',
    data() {
        return {
            new_custom: false,
            is_disabled: true,
            is_scope_id: undefined,
            table_data: [],
            table_data_name: undefined,

            // 条件查询
            info: {
                info_phone: undefined,
                info_num: undefined,
            },

            // 分页
            page_list: {
                page_num: 1,
                page_size: 10,
                total: 1
            },
            current_page: 1,

            // 添加数据
            add_info: {
                addName: undefined, 
                jobNumber: undefined,  
                addPassword: undefined,
                account: undefined,  
                roleId: undefined,  
                orgId: undefined,  
            },

            // 角色下拉框
            role_list: [{
                roleName : undefined,
                roleId : undefined
            }],

            // 部门下拉
            ogr_list: [{
                orgName : undefined,
                orgId : undefined
            }],
        }
    },
    methods: {

        test(val){
            console.log(val)
        },

        // 数据加载和搜索
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type : "post",
                url : "/memberAccount/index",
                data : {
                    jobNumber: that.info.info_num,
                    account: that.info.info_phone,
                    pageNum: that.page_list.page_num,
                    pageSize: that.page_list.page_size,
                } ,
                callback : function(data){
                    that.table_data = data.data.page.list;
                    that.page_list.total = data.data.page.total;
                    that.table_data.every(function(el){
                        return el.status = el.status === 0 ? "正常" : "不正常";
                    })
                }
            })
        },

        // 重置
        reset() {
            this.$clearObject(this.info);
        },

        // 新增弹框显示
        toAdd() {
            var that = this;
            this.new_custom = true;
            this.is_scopeId = "";
            this.table_data_name = "新增用户",
            this.$clearObject(this.add_info);
            this.add_info.addPassword = "123456";
            this.$ajaxWrap({
                type : "get",
                url : "/memberAccount/onClick",
                data : {} ,
                callback : function(data){
                    that.role_list = data.data.roleList;
                    that.ogr_list = data.data.ogrList ;
                },
                error(error) {
                    console.log(error);
                }
            })
        },

        // 修改信息
        updateCustom(id) {
            var that = this;
            this.new_custom = true;
            this.is_scope_id = id;
            this.is_disabled = false;
            this.table_data_name = "修改用户",
            this.$ajaxWrap({
                type : "get",
                url : "/memberAccount/onClick",
                data : {
                    accountId : id
                } ,
                callback : function(res){
                    that.add_info = res.data.data;
                    that.role_list = res.data.roleList
                    that.ogr_list = res.data.ogrList 
                },
                error(error) {
                    console.log(error);
                }
            })
        },

        // 保存
        createNewCustom(id) {
            var that = this;
            if( this.add_info.name == "" || 
                this.add_info.jobNumber == "" || 
                this.add_info.roleId == "" || 
                this.add_info.orgId == "") {
                this.$message({
                    message: "请将信息填写完整",
                    type: "warning"
                });
                return;
            }else if(!/^1[34578]\d{9}$/.test((this.add_info.account))) {
                this.$message({
                    message: "手机格式错误",
                    type: "warning"
                });
                return;
            }else {
                var falg = undefined;
                falg = (id ? "/memberAccount/updateMemberAccount" : "/memberAccount/addMemberAccount");
                this.$ajaxWrap({
                    type : "post",
                    url : falg,
                    data : {
                        name : that.add_info.name,
                        jobNumber: that.add_info.jobNumber,
                        password: that.add_info.addPassword,
                        account : that.add_info.account,
                        roleId : that.add_info.roleId,
                        orgId : that.add_info.orgId,
                        accountId: that.is_scope_id,
                    } ,
                    callback(data) {
                        that.loadTable();
                        that.new_custom = false;
                        that.$message({
                          message: data.tipMsg,
                          type: 'success'
                        });
                        this.$clearObject(this.add_info);
                    },
                    error(data) {
                        that.$message({
                          message: data.tipMsg,
                          type: 'warning'
                        });
                    }
                })
            }
        },
        // 删除信息
        deleteInfo(id) {
            var that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type : "get",
                    url : "/memberAccount/deleteAccount",
                    data : {
                        accountId : id
                    } ,
                    callback : function(data){
                        that.$message({
                            message: "删除成功！",
                            type: "success"
                        });
                        that.loadTable();
                    }
                })
            }).catch(function() {});
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_custom = false;
            }).catch(function() {});
        },
        // 分页
        handleSizeChange(val) {
            this.page_list.page_size = val;
            this.loadTable();
        },
        // -----------------------------------------------------------------------------------------------------------------------------------      
        handleCurrentChange(val) {
            this.page_list.page_num = val;
            this.loadTable();
        },

    },
    mounted(){
        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    },
}
