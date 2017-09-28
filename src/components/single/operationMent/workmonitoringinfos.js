export default {
    name: 'workmonitoringinfos',
    data() {
        return {
            detail_data: [],
            week_detail: {},
            worker_list: [],
            batch_ids: undefined,
            update_data: [],

            seach_info: {
                issUsrName: undefined,
                creStartTime: undefined,
                creEndTime: undefined,
                issStartTime: undefined,
                issEndTime: undefined,
            },

            update_custom: false,
            show_operation: false,
            workplan_week_id: undefined,
            update_title: undefined,
            show_update_title: undefined,
            worker: [],
            workplan_id: undefined,
            iss_sts: "01",
        }
    },
    created() {
        this.workplan_week_id = this.$route.query.workplan_week_id;
        this.week = this.$route.query.week;
        this.init();
    },
    methods: {
        init() {
            this.loadTable();
        },

        // 加载
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type: "get",
                url: "/week/queryWeekList",
                data: {
                    id: that.workplan_week_id,
                    billIssSts: 0,
                    indexOfWeek: that.week.match(/[1-9][0-9]*/g)[0]
                },
                success: function(data) {
                    that.week_detail = data.data.data;
                    that.detail_data = data.data.dataList;

                    for (var i = 0; i < that.detail_data.length; i++) {
                        switch (that.detail_data[i].type) {
                            case "01":
                                that.detail_data[i].type = "生产";
                                break;
                            case "02":
                                that.detail_data[i].type = "库存";
                                break;
                        };
                        switch (that.detail_data[i].lv) {
                            case "01":
                                that.detail_data[i].lv = "高";
                                break;
                            case "02":
                                that.detail_data[i].lv = "中";
                                break;
                            case "03":
                                that.detail_data[i].lv = "低";
                                break;
                        };
                        switch (that.detail_data[i].scndProc) {
                            case "01":
                                that.detail_data[i].scndProc = "印刷";
                                break;
                            case "02":
                                that.detail_data[i].scndProc = "喷涂";
                                break;
                            case "03":
                                that.detail_data[i].scndProc = "焊接";
                                break;
                            case "04":
                                that.detail_data[i].scndProc = "贴膜";
                                break;
                            case "05":
                                that.detail_data[i].scndProc = "包覆";
                                break;
                            case "06":
                                that.detail_data[i].scndProc = "其他";
                                break;
                            default:
                                that.detail_data[i].scndProc = "";
                                break;
                        };

                        that.detail_data[i].eqpCode = that.detail_data[i].machinelist[0].machineName;
                    }

                    if (that.detail_data.length === 0) {
                        that.$goRoute("/home/workmonitoring");
                    }
                }
            })
        },

        // 修改的默认数据
        showUpdateInfo(id, index) {
            var that = this;
            this.workplan_id = id;
            this.update_custom = true;

            this.$ajaxWrap({
                type: "post",
                url: "/bill/queryBillListByBillId",
                data: {
                    workplanDetailId: id
                },
                success(data) {
                    that.update_data = data.data.dataList;
                    that.update_data.every(function(el) {
                        return el.clas = el.clas == "01" ? "白班" : "夜班";
                    });

                    that.worker_list = data.data.empList;
                    that.update_data.every(function(el) {
                        return that.worker.push({
                            id: el.id,
                            worker: el.worker || "",
                            quantity: el.quantity
                        });
                    });
                }
            })
        },

        // 保存
        saveUpdateInfo(id, tips) {
            var that = this;
            this.show_operation = true;

            this.$ajaxWrap({
                type: "post",
                url: "/bill/updateBillListByBillId",
                data: {
                    billList: that.worker,
                },
                callback: function(data) {
                    if (!id && !tips) {
                        that.$baseWarn("保存成功！");
                    }
                    that.loadTable();
                }
            })
        },

        // 多条下发
        moreOperationWeek() {
            var that = this;

            if (!this.batch_ids || this.batch_ids == "") {
                that.$baseWarn("请选择下发数据!");
                return;
            }

            this.$ajaxWrap({
                type: "post",
                url: "/bill/operationBillByIds",
                data: {
                    idList: that.batch_ids.split(",")
                },
                success(data) {
                    that.$baseWarn("下发成功！", function() {
                        that.loadTable();
                    });
                }
            })
        },

        // 单条下发
        operationWeek(id) {
            var that = this;

            that.$baseConfirm("确定下发吗？", function() {
                if (!id) {
                    that.saveUpdateInfo(id, true);
                }
                var _id = that.workplan_id || id;

                that.$ajaxWrap({
                    type: "post",
                    url: "/bill/operationBillListByDetailId",
                    data: {
                        id: _id
                    },
                    success(data) {

                        that.$baseWarn("下发成功！", function() {
                            that.loadTable();
                            that.update_custom = false;
                        });
                    }
                })

            })
        },

        // 改变事件
        changeWeeker(id, workerName) {
            for (var i = 0; i < this.worker.length; i++) {
                if (this.worker[i].id == id) {
                    this.worker[i].worker = workerName;
                }
            }
        },

        // table切换
        changeTableActive(val) {
            switch (val.name) {
                case "first":
                    this.loadTable();
                    break;
                case "second":
                    this.loadTable();
                    break;
                case "other":
                    this.loadTable();
                    break;
            }
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var _batch_ids = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    _batch_ids.push(val[i].id);
                }
                this.batch_ids = _batch_ids.join(",");
            } else {
                this.batch_ids = "";
            }
        },

        handleClose(done) {
            var that = this;
            that.$baseConfirm("确定关闭吗？", function() {
                that.update_custom = false;
            });
        },
    },
}