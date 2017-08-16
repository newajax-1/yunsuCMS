export default {
    name: 'maintainPlan',
    created() {
        this.init();
    },
    data() {
        return {
            table_data : [],

            search_info : {
                maint_itm : undefined,
            },

            page_list : {
                page_num : 1,
                page_size : 10,
                total : 0
            },

            dynamicValidateForm: {
                domains: [{
                    value: ''
                }],
            },

            select_op : [],

            add_info : {
                maintItm : undefined,
                maintAcct : undefined,
            },

            search_pageNum : undefined,
            search_pageSize : undefined,
            batch_ids : undefined,
            plan_id : undefined,
            new_custom : false,
            diag_title : undefined,
        }
    },
    methods: {
        init() {
            this.reset();
            this.getTableData();
        },

        getTableData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "/mouldMaintPlan/queryList",
                data: {
                    pageNum: "1",
                    pageSize: "10"
                },
                success(res) {
                    console.log(res)
                    that.loadTable(res.data);
                }
            })
        },

        searchTableData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "/mouldMaintPlan/queryList",
                data: {
                    maintItm : that.search_info.maint_itm,
                    pageNum: that.search_pageNum || "1",
                    pageSize: that.search_pageSize || "10"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            that.table_data = data.page.list;
            that.page_list.page_num =  data.page.pageNum;
            that.page_list.page_list =  data.page.pageList;
            that.page_list.total =  data.page.total;
        },

        // 重置
        reset() {
            this.$clearObject(this.search_info);
        },

        // 刷新  
        refresh() {
            this.$clearObject(this.search_info);
            this.getTableData();
        },

        // 弹框
        toAdd(id) {
            let that = this;
            this.$clearObject(this.add_info);
            this.plan_id = id;
            if(id) {
                this.diag_title = "修改保养计划";
                this.dynamicValidateForm.domains = [];
            }else{
                this.diag_title = "新增保养计划";
                this.dynamicValidateForm.domains = [{
                    value: ""
                }];
            };
            if(id) {
                this.$ajaxWrap({
                    type: "post",
                    url: "/mouldMaintPlan/detailMouldMaintPlan",
                    data: {
                        mouldMaintPlanId : id
                    },
                    success(res) {
                        that.add_info = res.data.data;
                        var _main_acct_list = that.add_info.maintAcct.split(",");
                        for(var i = 0; i < _main_acct_list.length; i++) {
                            that.dynamicValidateForm.domains.push({
                                value : _main_acct_list[i]
                            })
                        }
                    }
                })
            }
            this.new_custom = true;
        },

        // 保存
        saveInfo() {
            let that = this;
            var _save_maint_acct = [];
            for(var i = 0; i < this.dynamicValidateForm.domains.length; i++) {
                _save_maint_acct.push(this.dynamicValidateForm.domains[i].value);
            }
            console.log(_save_maint_acct)
            this.$ajaxWrap({
                type: "post",
                url: "/mouldMaintPlan/saveMouldMaintPlan",
                data: {
                    mouldMaintPlanId : that.plan_id,
                    maintItm : that.add_info.maintItm,
                    maintAcct : _save_maint_acct.join(",")
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.new_custom = false;
                    that.getTableData();
                }
            })
        },

        // 删除
        deleteId(id) {
            let that = this;
            var _data = undefined;
            if(id) {
                _data = {
                    mouldMaintPlanId : id
                }
            }else{
                _data = {
                    mouldMaintPlanIdList : this.batch_ids
                }
            };

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "post",
                    url: "/mouldMaintPlan/deleteMaintPlan",
                    data: _data,
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.refresh();
                    }
                })
            }).catch(function() {});
        },

        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: '',
                key: Date.now()
            });
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            if(val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].mouldMaintPlanId);
                }
                this.batch_ids = batch_ids.join(",");
            }else{
                this.batch_ids = undefined;
            }
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
            that.searchTableData();
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
    },
    destroyed() {
        EventBus.$emit("equipmentId", this.EventId);
    }
}
