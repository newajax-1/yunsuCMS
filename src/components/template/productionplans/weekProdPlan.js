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
                custName: undefined,
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

            modal_plan_bill: {
                monday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: undefined
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: undefined
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
                        quantity: undefined
                    }
                },
                wednesday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: undefined
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
                        quantity: undefined
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: undefined
                    }
                },
                friday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: undefined
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: undefined
                    }
                },
                saturday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: undefined
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: undefined
                    }
                },
                sunday: {
                    day: {
                        weekDate: undefined,
                        clas: "01",
                        quantity: undefined
                    },
                    night: {
                        weekDate: undefined,
                        clas: "02",
                        quantity: undefined
                    }
                }
            },
            modal_sync_data: {},
            modal_week_date: {},
            modal_btn_show: false,
            // 周计划 新建
            create_new_plan: undefined,
            delete_work_array: [],
            weekplan_info_show: false
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
            this.refresh();
        },

        confirmCloseModal() {
            let that = this;

            if (that.modal_weekplan_table_data.length) {
                that.$baseConfirm("确定关闭吗？", function() {
                    that.clearModalForm();
                });
            } else {
                that.clearModalForm();
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
                        that.editWorkplan()
                    }
                })
            }
        },

        loadModalTableData(data) {
            this.modal_week_date = data.data;
            this.modal_sync_data = data;
            if (data.dataList.length) {
                this.modal_weekplan_table_data = data.dataList;
            } else {
                this.createWorkplan();
            }
        },

        editWorkplan() {
            this.modal_table_edit = false;
        },

        getProductData(val, index) {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "week/getWeekDetail",
                data: {
                    orderNo: val
                },
                success(res) {
                    that.handleProductData(res.data, index);
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

        handleWorkplanData() {
            let that = this,
                old_workplan_data = that.modal_weekplan_table_data,
                len = old_workplan_data.length,
                send_data = [];
            for (let i = 0; i < len; i++) {
                let el = old_workplan_data[i];
                for (let key in el) {
                    delete el.tempItem;
                    delete el.tempOrder;
                }
            }
        },

        confirmSendPlan(tips) {
            let that = this,
                sure_text = tips === "save" ? "保存" : "下发";

            that.handleWorkplanData();

            let new_table_data = that.modal_weekplan_table_data,
                len = new_table_data.length;

            for (let i = 0; i < len; i++) {
                let el = new_table_data[i]
                for (let key in el) {
                    if (el[key] === "") {
                        that.$alert('请完善表单信息', '提示', {
                            confirmButtonText: '确定',
                            callback() {}
                        })
                        return;
                    }
                }
            }

            that.$baseConfirm(`确定${sure_text}吗？`, function() {
                that.modal_table_edit = true;
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

            plan_bill = JSON.parse(JSON.stringify(that.modal_plan_bill));
            that.modal_table_row_data.planBill = plan_bill;

            for (let key in that.modal_table_row_data) {
                table_row_data[key] = that.modal_table_row_data[key];
            }
            that.modal_weekplan_table_data.push(table_row_data);
        },

        getOrderDataList(val, index) {
            let that = this;
            that.$ajaxWrap({
                type: "post",
                url: "week/getWeekDetail",
                data: {
                    custNo: val
                },
                success(res) {
                    that.handleOrderData(res.data, index);
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
            let temp_delete_array = [];

            item.every(function(el, i) {
                return temp_delete_array[i] = el.workplanDetailId;
            });

            this.delete_work_array = temp_delete_array;
        },

        deleteWorkArray() {
            let that = this;
            if (!that.delete_work_array.length) {
                that.$alert("请选择要删除的数据！", '提示', {
                    confirmButtonText: '确定',
                    callback() {
                        return
                    }
                });
            } else {
                that.$alert("您确定要删除这些数据吗？", '提示', {
                    confirmButtonText: '确定',
                    callback() {
                        that.deleteWorkplanArray();
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

            temp_data = val === "next" ? temp_data++ : temp_data--;

            that.$ajaxWrap({
                url: "week/queryWeekList",
                data: {
                    indexOfWeek: temp_data
                },
                success(res) {
                    that.loadModalTableData(res.data);
                }
            })

        }
    }
}