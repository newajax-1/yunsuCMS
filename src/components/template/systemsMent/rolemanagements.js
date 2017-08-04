export default {
    name: 'roleManagement',
    data() {
        return {
            new_custom: false,
            // 分页
            page_list: {
              page_num: 1,
              page_size: 10,
              total: 0
            },
            current_page: 1,
            search_pageNum : undefined,
            search_pageSize : undefined,
            adfasdasd: undefined,
            title_name: undefined,
            // 查询
            info: {
                info_name: undefined,
            },

            table_data: [],

            add_info: {
                roleName: undefined,
                remark: undefined,
            },


            /////////////////////////////////////////////////////////////////////////////////////////////////////
            data2: [
                {
                    id: "1",
                    label: '销售管理',
                    children: [
                        {
                            id: "1-1",
                            label: '销售计划管理',
                        },
                        {
                            id: "1-2",
                            label: '客户信息管理',
                        },
                    ]
                }, {
                    id: "2",
                    label: '生产计划',
                    children: [
                        {
                            id: "2-1",
                            label: '生产资源状态监控'
                        }, 
                        {
                            id: "2-2",
                            label: '周生产计划'
                        },
                        {
                            id: "2-3",
                            label: '库存预警'
                        },
                    ]
                }, {
                    id: "3",
                    label: '系统管理',
                    children: [
                        {
                            id: "3-1",
                            label: '用户管理'
                        }, 
                        {
                            id: "3-2",
                            label: '角色管理'
                        },
                        {
                            id: "3-3",
                            label: '组织管理'
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        // 数据加载和搜索
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type : "post",
                url : "/role/loadTable",
                data : {
                    pageNum: that.search_pageNum || 1,
                    pageSize: that.search_pageSize || 10
                } ,
                callback : function(data){
                    that.table_data = data.data.page.list;
                    that.page_list.total = data.data.page.total; 
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                }
            })
        },
        // 重置
        reset() {
            this.$clearObject(that.info);
        },
        // 新增弹框显示
        toAdd() {
            this.adfasdasd = undefined;
            this.title_name = "新增";
            this.new_custom = true;
            this.$clearObject(this.add_info);
        },
        // 新增或修改保存
        showAdd(id) {
            var that = this;
            var flag = undefined;
            id ? flag = ("/role/update") : (flag = "/role/addRole");
            this.$ajaxWrap({
                type : "post",
                url : flag,
                data : {
                    roleName: that.add_info.roleName,
                    remark: that.add_info.remark,
                    roleId: id,
                    stringId: that.$refs.tree.getCheckedKeys().join(","),
                } ,
                callback : function(data){
                    that.new_custom = false;
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.loadTable(); 
                },
                error(data) {
                    
                }
            })
        },
        // 修改信息
        updateCustom(id) {
            this.adfasdasd = id;
            this.title_name = "修改";
            var that = this;
            this.$ajaxWrap({
                type : "post",
                url : "/role/queryById",
                data : { roleId: id } ,
                callback : function(data){
                    that.add_info.roleName = data.data.data.roleName
                    that.add_info.remark = data.data.data.remark
                    that.new_custom = true;
                    that.loadTable();
                },
                error() {
                    
                }
            })
        },
        // 删除信息
        deleteInfo(id) {
            var that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type : "post",
                    url : "/role/deleteById",
                    data : {
                        roleId: id,
                        isDel: 1
                    } ,
                    callback : function(data){
                        that.loadTable();
                        that.$message({
                          message: "删除成功！",
                          type: 'success'
                        }); 
                    },
                    error() {
                        
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

        searchFormData(pageval, pagesize) {
            var that = this;
            if (pagesize === "num") {
                that.search_pageNum = pageval || that.page_list.page_num;
                that.search_pageSize = that.page_list.page_size;
            } else {
                that.search_pageNum = that.page_list.page_num;
                that.search_pageSize = pageval || that.page_list.page_size;
            }
            that.loadTable();
        },
        
        // 分页
        handleSizeChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "size");
            };
        },
        // -----------------------------------------------------------------------------------------------------------------------------------      
        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
        },
        // 设置默认权限项
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes(
                [
                    {
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 9,
                        label: '三级 1-1-1'
                    }
                ]
            );
        },
    },
    mounted(){
        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    },
}