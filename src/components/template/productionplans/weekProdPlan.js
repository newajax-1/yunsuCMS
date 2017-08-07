/**
 * coding by Alex of 2017-07-20
 */
import Vue from "vue"
export default {
    name: 'weekProdPlan',
    created() {
        this.init();
    },
    data() {
        return {

            // 周计划 查询条件 
            search_form_data: {
                issUsrName: undefined,
                creStartTime: undefined,
                creEndTime: undefined,
                issStartTime: undefined,
                issEndTime: undefined
            },

            // 周计划 表格数据
            weekplan_table_data: [],

            // 周计划 修改下发详情按钮显示
            weekplan_push_tips: [{
                show: true
            }],

            // 周计划 表格分页
            weekplan_page_list: {
                pageNum: 0,
                pageSize: 10,
                total: undefined
            },

            // 周计划 当前Tab页面id
            weekplan_change_tips: undefined,
            weekplan_change_name: "all",

            // 周计划 模态框显示
            modal_show_tips: false,
            modal_title: undefined,
            modal_table_row_data: {
                type: undefined,
                lv: undefined,
                custNo: undefined,
                ordrNo: undefined,
                tempOrder: undefined,
                tempItem: undefined,
                itemNo: undefined,
                itemName: undefined,
                productNo: undefined,
                machine: undefined,
                moldingCycle: undefined,
                mouldNo: undefined,
                materialGrade: undefined,
                scndProc: undefined,
                sum: undefined,
                picking: undefined,
                delivery: undefined,
                inv: undefined,
                secInv: undefined,
                planBill: null
            },

            // 周计划 模态框表格数据
            modal_weekplan_table_data: [],
            modal_table_edit: false,
            work_plan_id: undefined,
            new_week_date: true,
            modal_plan_bill: {
                monday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                },
                tuesday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                },
                wednesday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                },
                thursday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                },
                friday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                },
                saturday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                },
                sunday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: ""
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: ""
                    }
                }
            },
            modal_sync_data: {},
            modal_week_date: {},
            modal_btn_show: false,
            // 周计划 新建
            create_new_plan: undefined,
            delete_work_array: [],
            weekplan_info_show: false,
            new_workplan_index: []
        }
    },

    methods: {
        init() {
            this.reset();
            this.getWeekPlanData();
        },

        reset() {
            let that = this;
            that.$clearObject(that.search_form_data);
        },

        refresh() {
            this.reset();
            this.searchFormData();
        },

        getWeekPlanData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "week/index",
                data: {
                    pageNum: "1",
                    pageSize: "10"
                },
                success(res) {
                    that.loadWeekPlanTable(res.data);
                }
            })
        },

        loadWeekPlanTable(data) {
            let that = this,
                load_table_data = data.page.list;
            that.weekplan_push_tips = [];

            load_table_data.every(function(el) {
                let is_tips;
                if (el.issSts === "01") {
                    is_tips = true;
                    el.issSts = "未下发";
                } else {
                    is_tips = false;
                    el.issSts = "已下发";
                }
                return that.weekplan_push_tips.push({ show: is_tips });
            });

            that.weekplan_table_data = load_table_data;
            that.weekplan_page_list.pageNum = data.page.pageNum;
            that.weekplan_page_list.pageSize = data.page.pageSize;
            that.weekplan_page_list.total = data.page.total;
        },

        searchFormData(pageval, pagesize) {
            let that = this,
                search_data = that.search_form_data;

            for (let key in search_data) {
                if (typeof search_data[key] === "object") {
                    let temp_date = that.$handleDateObject(search_data[key]);
                    search_data[key] = temp_date;
                }
            }

            search_data.issSts = that.weekplan_change_tips;

            if (pagesize === "num") {
                search_data.pageNum = pageval || that.weekplan_page_list.pageNum;
                search_data.pageSize = that.weekplan_page_list.pageSize;
            } else {
                search_data.pageNum = that.weekplan_page_list.pageNum;
                search_data.pageSize = pageval || that.weekplan_page_list.pageSize;
            }

            that.$ajaxWrap({
                url: "week/loadTable",
                data: search_data,
                success(res) {
                    that.loadWeekPlanTable(res.data);
                }
            });
        },

        changeTableActive(changeTab) {
            switch (changeTab.name) {
                case "all":
                    this.weekplan_change_tips = "";
                    this.searchFormData();
                    break;
                case "unIssue":
                    this.weekplan_change_tips = "01";
                    this.searchFormData();
                    break;
                case "issued":
                    this.weekplan_change_tips = "02";
                    this.searchFormData();
                    break;
            }
        },

        currentPageChange(val) {
            if (this.weekplan_table_data.length) {
                this.searchFormData(val, "num");
            }
        },

        currentSizeChange(val) {
            if (this.weekplan_table_data.length) {
                this.searchFormData(val, "size");
            }
        },

        operationWeekplan(plan_id, index) {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "week/operationWeekStatus",
                data: {
                    workplanWeekId: plan_id
                },
                success(res) {
                    that.$baseWarn("下发成功！", function() {
                        that.weekplan_push_tips[index].show = false;
                        that.refresh();
                    })
                }
            })
        },

        deleteWeekplan(plan_id) {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "week/deleteById",
                data: {
                    workplanWeekId: plan_id,
                },
                success(res) {
                    that.$baseWarn("删除成功！")
                }
            });
        },

        confirmOperation(plan_id, plan_index, tips_text) {
            let that = this;

            that.$baseConfirm(`确认${tips_text}吗`, function() {
                if (tips_text === "下发") {
                    that.operationWeekplan(plan_id, plan_index);
                } else {
                    that.deleteWeekplan(plan_id);
                }
            });
        },

        clearModalForm() {
            this.modal_show_tips = false;
            this.modal_weekplan_table_data = [];
            this.modal_table_edit = false;
            this.weekplan_info_show = false;
            this.modal_btn_show = false;
            this.modal_title = undefined;
            this.work_plan_id = undefined;
            this.new_week_date = true;
            this.refresh();
        },

        confirmCloseModal() {
            let that = this;
            if (that.modal_title === "周计划详情") {
                that.clearModalForm();
            } else {
                if (that.modal_weekplan_table_data.length) {
                    that.$baseConfirm("确定关闭吗？", function() {
                        that.clearModalForm();
                    });
                } else {
                    that.clearModalForm();
                }
            }
        },

        openWeekplanModal(modal_title, plan_id) {
            this.modal_title = modal_title;
            this.modal_show_tips = true;
            this.create_new_plan = modal_title === "新建周计划" ? "create" : "modify";
            this.modal_btn_show = modal_title === "新建周计划" ? true : false;

            this.getModalData(plan_id);
        },

        getModalData(plan_id) {
            let that = this;

            if (!plan_id) {
                that.$ajaxWrap({
                    url: "week/queryWeekList",
                    success(res) {
                        that.loadModalTableData(res.data);
                    }
                })
            } else {
                that.work_plan_id = plan_id;

                that.$ajaxWrap({
                    url: "week/queryWeekList",
                    data: {
                        workplanWeekId: plan_id
                    },
                    success(res) {
                        that.loadModalTableData(res.data);
                        that.modal_table_edit = false;
                    }
                })
            }
        },

        loadModalTableData(data) {
            this.modal_week_date = data.data;
            this.modal_sync_data = data;

            if (data.dataList.length) {
                this.modal_weekplan_table_data = [];
                this.getProductInfoData(data.dataList);
            } else {
                this.createWorkplan();
            }
        },

        getProductInfoData(data) {
            let that = this;
            for (let i = 0; i < data.length; i++) {
                let temp_data = data[i];
                that.getOrderDataList(temp_data.custNo, i, function(res) {
                    temp_data.tempOrder = res.orderList;
                    that.getProductData(temp_data.ordrNo, i, function(res) {
                        temp_data.tempItem = res.bomList;
                        Vue.set(that.modal_weekplan_table_data, i, temp_data);
                    });
                });
            }
        },

        getProductData(val, index, done) {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "week/getWeekDetail",
                data: {
                    orderNo: val
                },
                success(res) {
                    if (typeof done === "function") {
                        done(res.data, index);
                    } else {
                        that.handleProductData(res.data, index);
                    }
                }
            });
        },

        handleProductData(data, index) {
            let that = this,
                temp_workplan_data = that.modal_weekplan_table_data[index];

            temp_workplan_data.tempItem = data.bomList;
            temp_workplan_data.productNo = data.productNo;
            temp_workplan_data.itemNo = "";
            temp_workplan_data.itemName = "";

            Vue.set(that.modal_weekplan_table_data, index, temp_workplan_data);
        },

        setProductName(val, index) {
            let that = this,
                temp_workplan_data = that.modal_weekplan_table_data[index];

            if (temp_workplan_data.tempItem && temp_workplan_data.tempItem.length) {
                temp_workplan_data.tempItem.every(function(el) {
                    if (el.itemNo === val) {
                        temp_workplan_data.itemName = el.itemName;
                    }
                })
            }

            Vue.set(that.modal_weekplan_table_data, index, temp_workplan_data);
        },


        confirmSendPlan(tips) {
            let that = this,
                sure_text = tips === "save" ? "保存" : "下发";


            let new_table_data = that.modal_weekplan_table_data,
                len = new_table_data.length;


            for (let i = 0; i < len; i++) {
                let el = new_table_data[i]
                for (let key in el) {

                    el.sum = (el.planBill.monday.day.quantity - 0) +
                        (el.planBill.monday.night.quantity - 0) +
                        (el.planBill.tuesday.day.quantity - 0) +
                        (el.planBill.tuesday.night.quantity - 0) +
                        (el.planBill.wednesday.day.quantity - 0) +
                        (el.planBill.wednesday.night.quantity - 0) +
                        (el.planBill.thursday.day.quantity - 0) +
                        (el.planBill.thursday.night.quantity - 0) +
                        (el.planBill.friday.day.quantity - 0) +
                        (el.planBill.friday.night.quantity - 0) +
                        (el.planBill.saturday.day.quantity - 0) +
                        (el.planBill.saturday.night.quantity - 0) +
                        (el.planBill.sunday.day.quantity - 0) +
                        (el.planBill.sunday.night.quantity - 0)

                    if (key === "scndProc") {
                        continue
                    }
                    if ((el[key] === "" || el[key] === undefined) && el[key] !== null) {
                        console.log(key);
                        that.$alert('请完善表单信息', '提示', {
                            confirmButtonText: '确定',
                            callback() {}
                        })
                        return;
                    }

                    delete el.tempItem;
                    delete el.tempOrder;
                }
            }

            that.$baseConfirm(`确定${sure_text}吗？`, function() {
                that.sendWorkplanData(tips);
            });
        },

        sendWorkplanData(tips) {
            let that = this,
                url = undefined,
                week = undefined,
                send_data = {};

            if (that.work_plan_id) {
                send_data.workplanWeekId = that.work_plan_id;
                send_data.operationType = "update";
            } else {
                week = that.modal_week_date.week.match(/[^\(\)]+(?=\))/g)[0];
                send_data.week = week;
                send_data.operationType = "add";
            }

            send_data.detailList = that.modal_weekplan_table_data;

            if (tips === "save") {
                that.sendWorkplanAjax("/week/saveWorkplan", send_data);
            } else {
                that.sendWorkplanAjax("/week/saveWorkplan", send_data, function() {
                    that.sendWorkplanAjax("/week/operationWeekStatus", send_data);
                })
            }
        },

        sendWorkplanAjax(url, data, done) {
            let that = this;
            that.$ajaxWrap({
                type: "post",
                url: url,
                data: data,
                success(res) {
                    if (typeof done === "function") done();
                    that.clearModalForm();
                    that.work_plan_id = undefined;
                },
                error() {
                    that.modal_table_edit = false;
                }
            });
        },

        setModalWeekDate() {
            let that = this;
            that.modal_plan_bill.monday.day.weekDate = that.modal_week_date.mondayDate
            that.modal_plan_bill.monday.night.weekDate = that.modal_week_date.mondayDate
            that.modal_plan_bill.tuesday.day.weekDate = that.modal_week_date.tuesdayDate
            that.modal_plan_bill.tuesday.night.weekDate = that.modal_week_date.tuesdayDate
            that.modal_plan_bill.wednesday.day.weekDate = that.modal_week_date.wednesdayDate
            that.modal_plan_bill.wednesday.night.weekDate = that.modal_week_date.wednesdayDate
            that.modal_plan_bill.thursday.day.weekDate = that.modal_week_date.thursdayDate
            that.modal_plan_bill.thursday.night.weekDate = that.modal_week_date.thursdayDate
            that.modal_plan_bill.friday.day.weekDate = that.modal_week_date.fridayDate
            that.modal_plan_bill.friday.night.weekDate = that.modal_week_date.fridayDate
            that.modal_plan_bill.saturday.day.weekDate = that.modal_week_date.saturdayDate
            that.modal_plan_bill.saturday.night.weekDate = that.modal_week_date.saturdayDate
            that.modal_plan_bill.sunday.day.weekDate = that.modal_week_date.sundayDate
            that.modal_plan_bill.sunday.night.weekDate = that.modal_week_date.sundayDate
        },

        createWorkplan() {
            let that = this,
                plan_bill = null,
                table_row_data = {};

            that.setModalWeekDate();

            let index = that.modal_weekplan_table_data.length;
            table_row_data.index = index;

            plan_bill = JSON.parse(JSON.stringify(that.modal_plan_bill));
            that.modal_table_row_data.planBill = plan_bill;

            for (let key in that.modal_table_row_data) {
                table_row_data[key] = that.modal_table_row_data[key];
            }

            that.modal_weekplan_table_data.push(table_row_data);
        },

        getOrderDataList(val, index, done) {
            let that = this;
            that.$ajaxWrap({
                type: "post",
                url: "week/getWeekDetail",
                data: {
                    custNo: val
                },
                success(res) {
                    if (typeof done === "function") {
                        done(res.data, index);
                    } else {
                        that.handleOrderData(res.data, index);
                    }
                }
            })
        },

        handleOrderData(data, index) {
            var that = this,
                temp_modal_data = that.modal_weekplan_table_data[index];

            temp_modal_data.tempOrder = data.orderList;
            temp_modal_data.ordrNo = "";
            Vue.set(that.modal_weekplan_table_data, index, temp_modal_data);
        },

        handleSelectionChange(item) {
            let temp_delete_array = [],
                temp_delete_index = [];

            for (let i = 0; i < item.length; i++) {
                let el = item[i];
                if (el.workplanDetailId) {
                    temp_delete_array.push(el.workplanDetailId);
                }

                if (!isNaN(el.index)) {
                    temp_delete_index.push(el.index);
                }
            }

            this.new_workplan_index = temp_delete_index.sort((a, b) => a < b ? 1 : -1);
            this.delete_work_array = temp_delete_array;
        },

        deleteWorkArray() {
            let that = this;

            if (that.delete_work_array.length || that.new_workplan_index.length) {

                that.$baseConfirm("您确定要删除这些数据吗？", function() {
                    if (that.delete_work_array.length) {
                        that.deleteWorkplanArray();
                    }
                    that.reloadModalTableData();
                });
            } else {
                that.$alert("请选择要删除的数据！", '提示', {
                    confirmButtonText: '确定',
                    callback() {
                        return
                    }
                });
            }
        },

        deleteWorkplanArray() {
            let that = this,
                send_data = that.delete_work_array;
            that.$ajaxWrap({
                type: 'post',
                url: "/week/operationWeek",
                data: {
                    idList: send_data
                },
                success(res) {
                    that.$baseWarn("删除成功！");
                }
            });
        },

        reloadModalTableData() {
            let len_work_id = this.delete_work_array.length,
                len_new_id = this.new_workplan_index.length,
                len_modal_data = this.modal_weekplan_table_data.length;

            let res = this.modal_weekplan_table_data,
                temp_data = [];

            for (let i = 0; i < len_modal_data; i++) {
                let opt = res[i];

                if (opt.workplanDetailId) {
                    for (let j = 0; j < len_work_id; j++) {
                        if (this.delete_work_array[j] === opt.workplanDetailId) {
                            res.splice(i, 1, "");
                        }
                    }
                }
            }

            for (let i = 0; i < len_modal_data; i++) {
                let opt = res[i];

                if (!isNaN(opt.index)) {
                    for (let k = 0; k < len_new_id; k++) {
                        if (this.new_workplan_index[k] === opt.index) {
                            res.splice(i, 1, "");
                        }
                    }
                }
            }

            for (let i = 0; i < res.length; i++) {
                if (res[i]) {
                    temp_data.push(res[i])
                }
            }

            this.modal_weekplan_table_data = temp_data;
        },

        openWeekplanInfo(weekplan_id, title) {
            let that = this;
            that.modal_title = title;
            that.$ajaxWrap({
                url: "week/queryWeekList",
                data: {
                    workplanWeekId: weekplan_id
                },
                success(res) {
                    that.loadModalTableData(res.data);

                    that.modal_show_tips = true;
                    that.modal_table_edit = true;
                    that.weekplan_info_show = true;
                }
            })
        },

        nextWeekplan(val) {
            let that = this,
                temp_data = that.modal_week_date.indexOfWeek;

            if (val === "next") {
                temp_data++
            } else {
                temp_data--
            }

            that.new_week_date = !that.new_week_date;

            console.log(temp_data);
            that.$ajaxWrap({
                url: "week/queryWeekList",
                data: {
                    indexOfWeek: temp_data
                },
                success(res) {
                    console.log(res.data);
                    that.modal_week_date = res.data.data
                }
            })

        }
    }
}