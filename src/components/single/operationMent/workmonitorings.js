export default {
    name: 'proMonitoring',
    data() {
        return {
            first_table_data: [],
            second_table_data: [],
            other_table_data: [],
            search_pageNum: undefined,
            search_pageSize: undefined,
            seach_info: {
                product_no: undefined,
                item_no: undefined,
                bill_sts: 1,
                workplan_no: undefined,
                week: undefined,
                issStartTime: undefined,
                issEndTime: undefined,
            },
            page_list: {
                page_size: 15,
                page_num: 1,
                total: 0,
            },
            stop_data: [],
            stop_data_info: {
                radio: "01",
                comment: undefined
            },
            new_custom: false,
            stop_custom: false,
            first_table_show: true,
            second_table_show: false,
            second_table_text_show: false,
            other_table_show: false,
            stop_show: false,
            sale_change_name: "first",
            iss_sts: "02",
            buttonsRightList: []
        }
    },
    methods: {
        // 加载
        loadTable() {
            this.sale_change_name == "first" ? this.loadTableFirst() : this.loadTableOther();
        },

        // 查询
        search() {
            this.sale_change_name == "first" ? this.searchFirst() : this.loadTableOther();
            if (this.sale_change_name == "second") {
                this.second_table_text_show = false;
                this.second_table_show = true;
            } else {
                this.second_table_show = false;
            }
        },
        searchFirst() {
            var that = this;
            this.other_table_data = [];
            this.second_table_data = [];
            this.first_table_data = [];
            this.$ajaxWrap({
                type: "get",
                url: "/workOrder/loadTable",
                data: {
                    issSts: that.iss_sts,
                    planIssSts: "100",
                    workplanNo: that.seach_info.workplan_no,
                    week: that.seach_info.week,
                    issStartTime: that.seach_info.issStartTime && this.$handleDateObject(that.seach_info.issStartTime),
                    issEndTime: that.seach_info.issEndTime && this.$handleDateObject(that.seach_info.issEndTime),
                    pageSize: that.search_pageSize || 15,
                    pageNum: that.search_pageNum || 1
                },
                callback: function(data) {
                    that.first_table_data = data.data.page.list;
                    that.first_table_data.every(function(el) {
                        return el.planIssSts = el.planIssSts + "%"
                    })
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                },
                error() {
                    //do error function
                }
            })
        },
        loadTableFirst() {
            var that = this;
            this.other_table_data = [];
            this.second_table_data = [];
            this.first_table_data = [];
            this.$ajaxWrap({
                url: "/workOrder/loadTable",
                data: {
                    issSts: "02",
                    planIssSts: "100",
                    pageSize: that.search_pageSize || 15,
                    pageNum: that.search_pageNum || 1
                },
                callback: function(data) {
                    that.first_table_data = data.data.page.list;
                    that.first_table_data.every(function(el) {
                        return el.planIssSts = el.planIssSts + "%"
                    })
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                    that.buttonsRightList = data.data.button;
                },
                error() {
                    //do error function
                }
            })
        },
        loadTableOther() {
            var that = this;
            this.other_table_data = [];
            this.second_table_data = [];
            this.first_table_data = [];
            this.$ajaxWrap({
                type: "get",
                url: "/bill/loadTable",
                data: {
                    productNo: that.seach_info.product_no,
                    itemNo: that.seach_info.item_no,
                    billSts: that.seach_info.bill_sts,
                    creStartTime: that.seach_info.issStartTime && this.$handleDateObject(that.seach_info.issStartTime),
                    creEndTime: that.seach_info.issEndTime && this.$handleDateObject(that.seach_info.issEndTime),
                    pageSize: that.search_pageSize || 15,
                    pageNum: that.search_pageNum || 1
                },
                success(data) {
                    if (that.seach_info.bill_sts == 1) {
                        that.second_table_data = data.data.page.list;

                        // for (let i = 0; i < that.second_table_data.length; i++) {
                        //     let el = that.second_table_data[i];
                        //     if (el.updateTime) {
                        //         el.updateTime = el.updateTime.slice(0, 5) + el.weekDate;
                        //     }
                        // }
                    } else {
                        that.other_table_data = data.data.page.list;
                        // for (let i = 0; i < that.other_table_data.length; i++) {
                        //     let el = that.other_table_data[i];
                        //     if (el.updateTime) {
                        //         el.updateTime = el.updateTime.slice(0, 5) + el.weekDate;
                        //     }
                        // }
                    }
                    that.page_list.total = data.data.page.total || 0;
                    that.page_list.page_num = data.data.page.pageNum || 1;
                    that.page_list.page_size = data.data.page.pageSize || search_pageSize;
                }
            })
        },
        // 重置
        reset() {
            let that = this;
            var _seach_info_bill_sts = this.seach_info.bill_sts;
            that.$clearObject(that.seach_info);
            this.seach_info.bill_sts = _seach_info_bill_sts;
        },
        // 刷新
        refresh() {
            this.reset();
            this.loadTable();
        },

        // 终止
        stopWorkInfo(id) {
            var that = this;
            this.stop_data_info.radio = "01";
            this.stop_data_info.comment = undefined;
            this.stop_data = [];
            this.stop_custom = true;
            this.$ajaxWrap({
                type: "post",
                url: "/bill/billDetail",
                data: {
                    id: id
                },
                callback: function(data) {
                    that.stop_data.push(data.data.data);
                },
                error() {
                    //do error function
                }
            })
        },

        // 终止提交
        stopWork() {
            var that = this;
            if (this.stop_data_info.radio === "06") {
                if (!this.stop_data_info.comment) {
                    this.$message({
                        message: "请填写其他原因",
                        type: "warning"
                    });
                    return;
                }
            }
            this.$ajaxWrap({
                type: "post",
                url: "/bill/operationWorkOrderBill",
                data: {
                    workplanBillId: that.stop_data[0].id,
                    billNo: that.stop_data[0].billNo,
                    clas: that.stop_data[0].clas,
                    actQuantity: that.stop_data[0].quantity,
                    date: that.stop_data[0].weekDate,
                    worker: that.stop_data[0].worker,
                    trmtTyp: that.stop_data_info.radio,
                    comment: that.stop_data_info.comment
                },
                callback: function(data) {
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.stop_custom = false;
                    that.loadTable();
                },
                error(data) {

                }
            })
        },

        showDetail(id, val) {
            this.$goRoute("/home/workmonitoringinfo", {
                workplan_week_id: id,
                week: val
            })
        },

        showTable() {
            switch (this.seach_info.bill_sts) {
                case 0:
                    this.first_table_show = true;
                    this.second_table_show = false;
                    this.second_table_text_show = false;
                    this.other_table_show = false;
                    this.loadTable();
                    break;
                case 1:
                    this.first_table_show = false;
                    this.second_table_show = false;
                    this.second_table_text_show = true;
                    this.other_table_show = false;
                    this.loadTable();
                    break;
                case 2:
                    this.first_table_show = false;
                    this.second_table_show = false;
                    this.second_table_text_show = false;
                    this.other_table_show = true;
                    this.loadTable();
                    break;
            }
        },

        // table切换
        changeTableActive(val) {
            switch (val.name) {
                case "first":
                    this.seach_info.bill_sts = 0;
                    this.showTable();
                    break;
                case "second":
                    this.seach_info.bill_sts = 1;
                    this.showTable();
                    break;
                case "other":
                    this.seach_info.bill_sts = 2;
                    this.showTable();
                    break;
            }
        },

        handleClose(done) {
            var that = this;
            this.$confirm("确定关闭吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.stop_custom = false;
                that.$clearObject(that.ruleForm);
                that.newListData = [];
                that.stop_data = [];
                done();
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
            if (this.first_table_data.length || this.second_table_data.length || this.other_table_data.length) {
                this.searchFormData(val, "size");
            }
        },

        handleCurrentChange(val) {
            if (this.first_table_data.length || this.second_table_data.length || this.other_table_data.length) {
                this.searchFormData(val, "num");
            }
        },
    },
    mounted() {

        this.loadTable();
    },
    destroyed() {
        EventBus.$emit("setInfoId", this.EventId);
    }
}