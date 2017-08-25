export default {
    name: 'equipmentInfo',
    created() {
        this.init();
    },
    data() {
        return {
            table_data: [],

            search_info: {
                eqp_no: undefined,
                eqp_code: undefined,
            },

            page_list: {
                page_num: 1,
                page_size: 10,
                total: 0
            },

            select_op: [],
            eqp_sts_list : [],

            add_info: {
                dicName: undefined,
                dicValue: undefined,
                eqpTyp: undefined,
                eqpBrand: undefined,
                type: undefined,
                eqpNm: undefined,
                ton: undefined,
                eqpIp: undefined,
                padIp: undefined,
                eqpSts: undefined,
                startMaintTm: undefined,
            },

            binding_info: {
                pad_code: undefined,
                pad_imei: undefined,
            },

            select_type : [
                {
                    dicName : "单色"
                },
                {
                    dicName : "双色"
                }
            ],

            search_pageNum: undefined,
            search_pageSize: undefined,

            show_type: true,
            show_other: true,
            eqp_typ: "01",
            batch_ids: undefined,
            is_has_id: undefined,
            save_binding_id: undefined,
            diag_title: undefined,
            is_disabled: false,
            sale_change_name: "first",      
            details_custom: false,
            new_custom: false,
            binding_custom: false,

            eqp_sts_list: null,
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
                url: "/equipment/queryList",
                data: {
                    eqpTyp: that.eqp_typ,
                    pageNum: "1",
                    pageSize: "10"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        searchTableData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "/equipment/queryList",
                data: {
                    eqpTyp: that.eqp_typ,
                    eqpNo: that.search_info.eqp_no,
                    eqpCode: that.search_info.eqp_code,
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
            that.page_list.page_num = data.page.pageNum;
            that.page_list.page_size = data.page.pageSize;
            that.page_list.page_list = data.page.pageList;
            that.page_list.total = data.page.total;

            for (let i = 0; i < that.table_data.length; i++) {
                let el = that.table_data[i];
                switch (el.eqpSts) {
                    case "01":
                        el.eqpStsName = "正常";
                        break;
                    case "02":
                        el.eqpStsName = "保养";
                        break;
                    case "03":
                        el.eqpStsName = "维修"
                        break;
                }
            }
        },

        // 重置
        reset() {
            this.$clearObject(this.search_info);
        },

        // 重置  
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
                    url: "/equipment/deleteByIds",
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
            this.diag_title = "新增设备"
            this.is_disabled = (id ? true : false);
            this.is_has_id = id;

            this.$clearObject(this.add_info);
            this.$ajaxWrap({
                type: "get",
                url: "/equipment/getSelects",
                data: {
                    key: "eqp_typ"
                },
                success(res) {
                    that.select_op = res.data.dicData;
                    that.getEqpSts();
                }
            })
            if (id) {
                this.diag_title = "修改设备"

                this.$ajaxWrap({
                    type: "get",
                    url: "/equipment/getObject",
                    data: {
                        equipmentId: id
                    },
                    success(res) {
                        that.add_info = res.data.data
                    }
                })
            }
            this.new_custom = true;
        },

        // 保存
        saveInfo() {
            let that = this;
            var _operationType = (this.is_has_id ? "update" : "add");
            if (that.add_info.eqpTyp == "01" || that.add_info.eqpTyp == "注塑机") {
                that.add_info.eqpTyp = "01";
            } else if (that.add_info.eqpTyp == "02" || that.add_info.eqpTyp == "集中供料") {
                that.add_info.eqpTyp = "02";
            } else if (that.add_info.eqpTyp == "03" || that.add_info.eqpTyp == "辅机") {
                that.add_info.eqpTyp = "03";
            } else if (that.add_info.eqpTyp == "04" || that.add_info.eqpTyp == "5T行车") {
                that.add_info.eqpTyp = "04";
            } else if (that.add_info.eqpTyp == "05" || that.add_info.eqpTyp == "循环水系统") {
                that.add_info.eqpTyp = "05";
            } else if (that.add_info.eqpTyp == "06" || that.add_info.eqpTyp == "高低压开关柜") {
                that.add_info.eqpTyp = "06";
            } else {
                that.add_info.eqpTyp = "01";
            }
            this.new_custom = true;
            var _flag = (this.add_info.eqpTyp != "01" ?
                !that.add_info.eqpTyp ||
                !that.add_info.eqpBrand ||
                !that.add_info.eqpCode ||
                !that.add_info.eqpSts ||
                !that.add_info.startMaintTm :
                !that.add_info.eqpTyp ||
                !that.add_info.eqpBrand ||
                !that.add_info.type ||
                !that.add_info.eqpCode ||
                !that.add_info.ton ||
                !that.add_info.eqpSts ||
                !that.add_info.padIp ||
                !that.add_info.startMaintTm);
            if (_flag) {
                this.$message({
                    message: "请将信息填写完整",
                    type: "warning"
                });
                return;
            };
            var _start_saint_tm = typeof(this.add_info.startMaintTm) == "object" ? this.$handleDateObject(this.add_info.startMaintTm) : this.add_info.startMaintTm

            that.$ajaxWrap({
                type: "post",
                url: "/equipment/save",
                data: {
                    operationType: _operationType,
                    equipmentId: that.is_has_id,
                    eqpTyp: that.add_info.eqpTyp,
                    eqpBrand: that.add_info.eqpBrand,
                    type: that.add_info.type,
                    eqpCode: that.add_info.eqpCode,
                    ton: that.add_info.ton,
                    eqpIp: that.add_info.eqpIp,
                    padIp: that.add_info.padIp,
                    eqpSts: that.add_info.eqpSts,
                    startMaintTm: _start_saint_tm,
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.new_custom = false;
                    that.refresh();
                }
            })
        },

        // 详情
        showDetail(id, val) {
            this.$goRoute("/home/equipmentinfodetail", {
                whole_id: id,
                whole_eqp_typ: this.eqp_typ,
                whole_no: val
            });
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
                    url: "/equipment/deleteById",
                    data: {
                        id: id
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.searchTableData();
                    }
                })
            }).catch(function() {});
        },

        toBinding(id) {
            this.save_binding_id = id;
            this.binding_custom = true;
        },

        saveBindingInfo() {
            let that = this;
            if (!this.binding_info.pad_code || !this.binding_info.pad_imei) {
                this.$message({
                    message: "请将设备信息填写完整",
                    type: "warning"
                });
                return;
            };

            that.$ajaxWrap({
                type: "post",
                url: "/equipment/operationBind",
                data: {
                    eqpNo: that.save_binding_id,
                    padCode: that.binding_info.pad_code,
                    padImei: that.binding_info.pad_imei,
                    operationType: "binding",
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.binding_custom = false;
                    that.$clearObject(that.binding_info);
                }
            })
        },

        // 切换类型
        changeType(val) {
            if (val == "01" || !val || val == "注塑机") {
                this.show_type = true;
            } else {
                this.show_type = false;
            }
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].equipmentId);
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
                    this.eqp_typ = "01";
                    this.getTableData();
                    break;
                case "second":
                    this.eqp_typ = "02";
                    this.getTableData();
                    break;
                case "third":
                    this.eqp_typ = "03";
                    this.getTableData();
                    break;
                case "fourth":
                    this.eqp_typ = "04";
                    this.getTableData();
                    break;
                case "fifth":
                    this.eqp_typ = "05";
                    this.getTableData();
                    break;
                case "other":
                    this.eqp_typ = "06";
                    this.getTableData();
                    break;
            }
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$clearObject(this.binding_info);
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_custom = false;
                that.binding_custom = false;
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

        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
        },

        getEqpSts() {
            let that = this;

            this.$ajaxWrap({
                type: "get",
                url: "/equipment/getSelects",
                data: {
                    key: "eqp_sts"
                },
                success(res) {
                    that.eqp_sts_list = res.data.dicData;
                }
            })

        }
    },
}