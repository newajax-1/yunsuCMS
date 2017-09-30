/**
 * coding by Alex of 2017-08-08
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
                pageSize: 15,
                total: undefined
            },

            // 周计划 当前Tab页面id
            weekplan_change_tips: undefined,
            weekplan_change_name: "all",

            // 周计划 模态框显示
            modal_show_tips: false,
            modal_title: undefined,
            modal_table_row_data: {
                lv: "",
                custNo: "",
                scndProc: "",
                ordrNo: "",
                itemNo: "",
                itemName: "",
                productNo: "",
                machine: "",
                moldingCycle: "",
                mouldNo: "",
                materialGrade: "",
                sum: "",
                picking: "",
                delivery: "",
                inv: "",
                secInv: "",
                planBill: "",
                mouldCode: "",
                sign: false,
                async_bom_number: [],
                productWeight: "",
                gapWeight: "",
                machinelist: [],
                custProductNo: "",
                ModalList: []
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
            new_workplan_index: [],
            edit_next_show_week: true,

            temp_week_year: {},
            BomChangeFlag: false,

            buttonsRightList: [true, true, true, true, true, true, true, true, ]
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
                url: "week/loadTable",
                data: {
                    pageNum: "1",
                    pageSize: "15"
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
                    // that.buttonsRightList = res.data.button;
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
                    id: plan_id
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
                    id: plan_id,
                },
                success(res) {
                    that.$baseWarn("删除成功！", function() {
                        that.refresh();
                    });
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

        /* Modal Event Start*/

        clearModalForm() {
            let that = this;

            this.modal_show_tips = false;
            this.modal_table_edit = false;
            this.weekplan_info_show = false;
            this.modal_btn_show = false;
            this.modal_title = undefined;
            this.work_plan_id = undefined;
            this.new_week_date = true;
            this.edit_next_show_week = true;

            this.$clearObject(that.modal_weekplan_table_data);
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

        openWeekplanModal(modal_title, plan_id, index_of_week) {
            let send_data = {};

            if (index_of_week) {
                let week = index_of_week.match(/[1-9][0-9]*/g);
                send_data.id = plan_id;
                send_data.indexOfWeek = week[0];
            }

            this.modal_title = modal_title;
            this.modal_show_tips = true;

            this.create_new_plan = modal_title === "新建周计划" ? "create" : "modify";
            this.modal_btn_show = modal_title === "新建周计划" ? true : false;
            this.edit_next_show_week = modal_title === "新建周计划" ? true : false;

            this.getModalData(send_data);
        },

        getModalData(datas) {
            let that = this;

            if (!datas.id) {
                that.$ajaxWrap({
                    url: "week/queryWeekList",
                    success(res) {
                        that.loadModalTableData(res.data);
                    }
                })
            } else {
                that.work_plan_id = datas.id;

                that.$ajaxWrap({
                    url: "week/queryWeekList",
                    data: datas,
                    success(res) {
                        that.loadModalTableData(res.data, "modify");
                        that.modal_table_edit = false;
                    }
                })
            }
        },

        loadModalTableData(data, tips) {
            let week_data = data.data,
                that = this;

            for (let key in week_data) {
                let el = week_data[key];

                if (el && typeof el === "string" && key != "week") {
                    week_data[key] = el.substring(5, el.length);
                    this.temp_week_year[key] = el.substring(0, 5);
                }
            }

            this.modal_week_date = week_data;
            this.modal_sync_data = data;

            if (data.dataList.length && tips !== "modify") {
                this.modal_weekplan_table_data = data.dataList;

            } else {
                this.createWorkplan();
            }

            if (tips === "modify") {
                let temp = data.dataList,
                    len = temp.length;
                this.getProductValue(data.dataList[0].custNo, 0, function(res) {
                    that.getAsyncBomData(data.dataList[0].itemNo, 0, function(ret) {
                        for (let i = 0; i < len; i++) {
                            let el = temp[i];

                            el.async_bom_number = res.dataList;
                            el.ModalList = ret.dataList;
                        }
                        console.log(temp);
                        that.modal_weekplan_table_data = temp;
                    })
                });


            }
        },

        handleProductData(data, index) {
            let that = this,
                temp_workplan_data = that.modal_weekplan_table_data[index];

            temp_workplan_data.productNo = data.data;
            that.modal_weekplan_table_data.splice(index, 1, temp_workplan_data);
        },

        /* modal verify */
        confirmSendPlan(tips) {
            let that = this,
                sure_text = tips === "save" ? "保存" : "下发";

            if (that.isCompletion()) {
                that.$baseConfirm(`确定${sure_text}吗？`, function() {
                    that.sendWorkplanData(tips);
                });
            }
        },

        isCompletion() {
            let that = this,
                new_table_data = that.modal_weekplan_table_data,
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

                    el.picking = ((el.gapWeight - 0) + (el.productWeight - 0)) * el.sum / 1000;

                    if (key === "scndProc") {
                        continue
                    }
                    if ((el[key] === "" || el[key] === undefined) && el[key] !== null) {
                        if (key === "itemNo" && el.sign) {
                            continue
                        }

                        // 显示 未填写数据
                        console.error(key + " is undefined!");
                        that.$baseWarn("请完善表单信息!");
                        return false;
                    }
                }
            }
            return true
        },

        sendWorkplanData(tips) {
            let that = this,
                url = undefined,
                week = undefined,
                send_data = {};

            if (that.work_plan_id) {
                send_data.id = that.work_plan_id;
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

            for (let i = 0; i < data.detailList.length; i++) {
                delete data.detailList[i].async_bom_number;
            }

            for (let i = 0; i < data.detailList.length; i++) {
                delete data.detailList[i].machinelist;
            }

            for (let i = 0; i < data.detailList.length; i++) {
                delete data.detailList[i].ModalList;
            }

            for (let i = 0; i < data.detailList.length; i++) {
                let el = data.detailList[i];

                el.planBill.monday.day.weekDate = that.temp_week_year.mondayDate + that.modal_week_date.mondayDate;
                el.planBill.monday.night.weekDate = that.temp_week_year.mondayDate + that.modal_week_date.mondayDate;
                el.planBill.tuesday.day.weekDate = that.temp_week_year.thursdayDate + that.modal_week_date.tuesdayDate;
                el.planBill.tuesday.night.weekDate = that.temp_week_year.thursdayDate + that.modal_week_date.tuesdayDate;
                el.planBill.wednesday.day.weekDate = that.temp_week_year.wednesdayDate + that.modal_week_date.wednesdayDate;
                el.planBill.wednesday.night.weekDate = that.temp_week_year.wednesdayDate + that.modal_week_date.wednesdayDate;
                el.planBill.thursday.day.weekDate = that.temp_week_year.thursdayDate + that.modal_week_date.thursdayDate;
                el.planBill.thursday.night.weekDate = that.temp_week_year.thursdayDate + that.modal_week_date.thursdayDate;
                el.planBill.friday.day.weekDate = that.temp_week_year.fridayDate + that.modal_week_date.fridayDate;
                el.planBill.friday.night.weekDate = that.temp_week_year.fridayDate + that.modal_week_date.fridayDate;
                el.planBill.saturday.day.weekDate = that.temp_week_year.saturdayDate + that.modal_week_date.saturdayDate;
                el.planBill.saturday.night.weekDate = that.temp_week_year.saturdayDate + that.modal_week_date.saturdayDate;
                el.planBill.sunday.day.weekDate = that.temp_week_year.sundayDate + that.modal_week_date.sundayDate;
                el.planBill.sunday.night.weekDate = that.temp_week_year.sundayDate + that.modal_week_date.sundayDate;
            }

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

        createWorkplan() {
            let that = this,
                plan_bill = null,
                table_row_data = {};

            if (that.isCompletion()) {
                let index = that.modal_weekplan_table_data.length;

                table_row_data.index = index;

                plan_bill = JSON.parse(JSON.stringify(that.modal_plan_bill));
                that.modal_table_row_data.planBill = plan_bill;

                for (let key in that.modal_table_row_data) {
                    table_row_data[key] = that.modal_table_row_data[key];
                }

                that.modal_weekplan_table_data.push(table_row_data);
            }
        },

        /* delete modal data */
        handleSelectionChange(item) {
            let temp_delete_array = [],
                temp_delete_index = [];

            for (let i = 0; i < item.length; i++) {
                let el = item[i];

                if (el.id) {
                    temp_delete_array.push(el.id);
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
                that.$baseWarn("请选择要删除的数据！");
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

                if (opt.id) {
                    for (let j = 0; j < len_work_id; j++) {
                        if (this.delete_work_array[j] === opt.id) {
                            res.splice(i, 1, "");
                        }
                    }
                }
            }

            for (let i = 0; i < len_modal_data; i++) {
                let opt = res[i];

                if (opt.index !== null) {
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

        openWeekplanInfo(weekplan_id, index_of_week, title) {
            let that = this;
            let week = index_of_week.match(/[1-9][0-9]*/g);

            week = week[0];
            that.modal_title = title;

            that.$ajaxWrap({
                url: "week/queryWeekList",
                data: {
                    id: weekplan_id,
                    indexOfWeek: week
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

            that.$ajaxWrap({
                url: "week/queryWeekList",
                data: {
                    indexOfWeek: temp_data
                },
                success(res) {
                    let ret = that.modal_sync_data;

                    ret.dataList = that.modal_weekplan_table_data;
                    ret.data = res.data.data;

                    let temp = JSON.parse(JSON.stringify(ret));
                    let send_data = that.changeNextWeekdate(temp);
                    that.loadModalTableData(send_data);
                }
            })
        },

        changeNextWeekdate(data) {
            let arr = data,
                list = arr.dataList;

            for (let i = 0; i < list.length; i++) {
                let data = list[i];
                data.planBill.monday.day.weekDate = arr.data.mondayDate
                data.planBill.monday.night.weekDate = arr.data.mondayDate
                data.planBill.tuesday.day.weekDate = arr.data.tuesdayDate
                data.planBill.tuesday.night.weekDate = arr.data.tuesdayDate
                data.planBill.wednesday.day.weekDate = arr.data.wednesdayDate
                data.planBill.wednesday.night.weekDate = arr.data.wednesdayDate
                data.planBill.thursday.day.weekDate = arr.data.thursdayDate
                data.planBill.thursday.night.weekDate = arr.data.thursdayDate
                data.planBill.friday.day.weekDate = arr.data.fridayDate
                data.planBill.friday.night.weekDate = arr.data.fridayDate
                data.planBill.saturday.day.weekDate = arr.data.saturdayDate
                data.planBill.saturday.night.weekDate = arr.data.saturdayDate
                data.planBill.sunday.day.weekDate = arr.data.sundayDate
                data.planBill.sunday.night.weekDate = arr.data.sundayDate
            }
            return arr;
        },

        /* BOM feature 2017-09-12 */


        /* product number */
        getProductData(index, sign, productNo) {

            let that = this;

            if (!that.BomChangeFlag && that.create_new_plan === "create") {

                that.$ajaxWrap({
                    url: "sequenceNo/getSequenceNo",
                    success(res) {
                        that.BomChangeFlag = true;
                        that.handleProductData(res.data, index);
                    }
                });
            }

            if (productNo) {
                that.getAsyncBomData(productNo, index);
            }
        },

        getProductValue(id, index, done) {
            let that = this;

            if (id) {
                that.$ajaxWrap({
                    url: "week/getProductValue",
                    data: {
                        id: id
                    },
                    success(res) {
                        if (typeof done === "function") {
                            done(res.data);
                        } else {

                            that.modal_weekplan_table_data[index].async_bom_number = res.data.dataList

                            that.modal_weekplan_table_data.splice(index, 1, that.modal_weekplan_table_data[index]);

                        }

                    }
                })
            }
        },

        getAsyncBomData(num, index, done) {
            let that = this;

            that.$ajaxWrap({
                url: "week/getMouldNoByProductNo",
                data: {
                    itemNo: num
                },
                success(res) {
                    if (typeof done === "function") {
                        done(res.data);
                    } else {
                        let temp = that.modal_weekplan_table_data[index];

                        temp.ModalList = res.data.dataList;
                        that.modal_weekplan_table_data.splice(index, 1, temp);
                    }
                }
            })
        },

        getAsyncModalNo(num, index, productNo) {
            let that = this;

            if (num) {
                that.$ajaxWrap({
                    url: "week/getProductValueByMouldNo",
                    data: {
                        mouldNo: num
                    },
                    success(res) {
                        that.handleModalNo(res.data.dataList, productNo, index);
                    }
                })
            }
        },


        handleModalNo(data, num, index) {

            let that = this;

            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                if (el.itemNo === num) {
                    that.setAsyncBomData(el, index, num);
                }
            }
        },

        setAsyncBomData(data, index, id) {
            let that = this,
                temp = that.modal_weekplan_table_data[index],
                len = that.modal_weekplan_table_data.length;

            let datas = temp.async_bom_number,
                lens = datas.length;

            temp.machinelist = data.machinelist;
            temp.custProductNo = data.custProductNo;
            temp.itemNo = data.itemNo;
            temp.itemName = data.itemName;
            temp.secInv = data.secInv;
            temp.mouldCode = data.mouldCode;
            temp.mouldNo = data.mouldNo;
            temp.materialGrade = data.materialGrade;
            temp.moldingCycle = data.moldingCycl;
            temp.scndProc = data.secdProc;

            temp.gapWeight = data.gapWeight || 0;
            temp.productWeight = data.productWeight || 0;

            for (let i = 0; i < lens; i++) {

                if (id !== datas[i].itemNo) {

                    let ret = that.$deepCloneObject(temp);
                    that.$clearObject(ret);
                    ret.async_bom_number.push(datas[i]);

                    ret.machinelist = datas[i].machinelist;

                    ret.custProductNo = datas[i].custProductNo;
                    ret.itemNo = datas[i].itemNo;
                    ret.itemName = datas[i].itemName;
                    ret.secInv = datas[i].secInv;

                    ret.mouldCode = datas[i].mouldCode;
                    ret.mouldNo = datas[i].mouldNo;

                    ret.materialGrade = datas[i].materialGrade;
                    ret.moldingCycle = datas[i].moldingCycl;
                    ret.scndProc = datas[i].secdProc;

                    ret.gapWeight = datas[i].gapWeight || 0;
                    ret.productWeight = datas[i].productWeight || 0;

                    ret.sign = true;

                    ret.ModalList = temp.ModalList;

                    ret.index = temp.index++;
                    ret.lv = temp.lv;
                    ret.custNo = temp.custNo;
                    ret.productNo = temp.productNo;

                    ret.planBill = that.$deepCloneObject(that.modal_plan_bill);
                    ret.sum = 0;

                    that.modal_weekplan_table_data.push(ret);
                }
            }
        }
    }
}