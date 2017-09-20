export default {
    name: 'equipmentMaintain',
    created() {
        this.init();
    },
    data() {
        return {
            table_data: [],

            page_list: {
                page_num: 1,
                page_size: 15,
                total: 0
            },

            search_info: {
                maint_itm: undefined,
                maint_cycle: undefined
            },

            add_info: {
                dicName: undefined,
                dicValue: undefined,
                type: undefined,
                maintItm: undefined,
                maintCycle: undefined,
            },

            select_op: [],

            type: "01",
            batch_ids: undefined,
            search_pageNum: undefined,
            search_pageSize: undefined,
            is_has_id: undefined,
            diag_title: undefined,
            is_disabled: false,
            sale_change_name: "first",
            new_custom: false,
        }
    },
    methods: {
        init() {
            this.reset();
            this.getTableData();
        },

        getTableData() {
            let that = this;

            this.$ajaxWrap({
                type: "post",
                url: "/equipmentmaintpaln/queryList",
                data: {
                    type: that.type,
                    pageNum: "1",
                    pageSize: "15"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        searchTableData() {
            let that = this;

            this.$ajaxWrap({
                type: "post",
                url: "/equipmentmaintpaln/queryList",
                data: {
                    type: that.type,
                    maintItm: that.search_info.maint_itm,
                    maintCycle: that.search_info.maint_cycle,
                    pageNum: that.search_pageNum || "1",
                    pageSize: that.search_pageSize || "15"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            that.table_data = data.page.list;
            that.page_list.page_size = data.page.pageSize;
            that.page_list.page_num = data.page.pageNum;
            that.page_list.total = data.page.total;
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

        deleteIds() {
            let that = this;
            if (!this.batch_ids) {
                this.$message({
                    message: "请选择删除的数据",
                    type: "warning"
                });
                return;
            };

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "/equipmentmaintpaln/deleteByIds",
                    data: {
                        ids: that.batch_ids
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.new_custom = false;
                        that.searchTableData(res.data);
                    }
                })
            }).catch(function() {});
        },

        // 弹框
        toAdd(id) {
            let that = this;
            this.diag_title = "新增计划"
            this.is_disabled = (id ? true : false);
            this.is_has_id = id;

            this.$clearObject(this.add_info);

            if (id) {
                this.diag_title = "修改设备"
                this.$ajaxWrap({
                    type: "get",
                    url: "/equipmentmaintpaln/getObject",
                    data: {
                        id: id
                    },
                    success(res) {
                        that.add_info = res.data.data;
                    }
                })
            }
            this.$ajaxWrap({
                type: "get",
                url: "/equipment/getSelects",
                data: {
                    key: "eqp_typ"
                },
                success(res) {
                    that.select_op = res.data.dicData;
                }
            })
            this.new_custom = true;
        },

        // 保存
        saveInfo() {
            let that = this;
            var _operationType = (this.is_has_id ? "update" : "add");
            var _flag = !that.add_info.maintItm ||
                !that.add_info.maintCycle;
            if (_flag) {
                this.$message({
                    message: "请将信息填写完整",
                    type: "warning"
                });
                return;
            };
            if ((that.add_info.maintCycle - 0).isNaN) {

            };

            this.$ajaxWrap({
                type: "post",
                url: "/equipmentmaintpaln/save",
                data: {
                    operationType: _operationType,
                    id: that.is_has_id,
                    type: that.add_info.type || "01",
                    maintItm: that.add_info.maintItm,
                    maintCycle: that.add_info.maintCycle,
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.new_custom = false;
                    that.refresh(res.data);
                }
            })
        },

        // 删除
        deleteId(id) {
            let that = this;

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "/equipmentmaintpaln/deleteById",
                    data: {
                        id: id
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.new_custom = false;
                        that.searchTableData(res.data);
                    }
                })
            }).catch(function() {});
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].id);
                }
                this.batch_ids = batch_ids.join(",");
            } else {
                this.batch_ids = undefined;
            }
        },

        // table切换
        changeTableActive(val) {
            this.show_other = (val.name == "first" || !val ? true : false);
            switch (val.name) {
                case "first":
                    this.type = "01";
                    this.getTableData();
                    break;
                case "second":
                    this.type = "02";
                    this.getTableData();
                    break;
                case "third":
                    this.type = "03";
                    this.getTableData();
                    break;
                case "fourth":
                    this.type = "04";
                    this.getTableData();
                    break;
                case "fifth":
                    this.type = "05";
                    this.getTableData();
                    break;
                case "other":
                    this.type = "06";
                    this.getTableData();
                    break;
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
}