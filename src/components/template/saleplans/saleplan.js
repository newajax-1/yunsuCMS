/**
 * coding by Alex of 2017-07-24
 */
import Vue from "vue"
export default {
    name: 'saleplan',
    created() {
        this.init();
    },
    data() {

        // 新建计划 Form校验
        var validateplanType = (rule, value, callback) => {
            if (!value) { callback(new Error('请选择计划类型')); }
            callback();
        };
        var validatecustName = (rule, value, callback) => {
            if (!value) { callback(new Error('请选择客户名称')); }
            callback();
        };
        var validateorderNo = (rule, value, callback) => {
            if (!value) { callback(new Error('请输入订单编号')); }
            callback();
        };
        var validateorderDate = (rule, value, callback) => {
            if (!value) { callback(new Error('请选择订单日期')); }
            callback();
        };
        var validateitemNo = (rule, value, callback) => {
            if (!value) { callback(new Error('请输入产品型号')); }
            callback();
        };
        var validateproductName = (rule, value, callback) => {
            if (!value) { callback(new Error('请输入产品名称')); }
            callback();
        };
        var validateaccount = (rule, value, callback) => {
            if (!value || value < 0) { callback(new Error('请输入需求数量')); }
            callback();
        };
        var validatepublishDate = (rule, value, callback) => {
            if (!value) { callback(new Error('请选择交货日期')); }
            callback();
        };

        return {

            // 销售计划 查询条件
            search_form_data: {
                operUserName: undefined,
                operTimeStart: undefined,
                operTimeEnd: undefined,
                createTimeStart: undefined,
                createTimeEnd: undefined
            },

            // 销售计划 表格数据
            saleplan_table_data: [{}],
            saleplan_push_tips: [{
                show: true
            }],

            // 销售计划 分页属性
            sale_page_list: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },

            // 销售计划 当前Tab页面id
            sale_change_tips: undefined,
            sale_change_name: "all",

            // 新增或修改 显示隐藏
            modal_show_tips: false,
            modal_title: undefined,
            modal_form_data: {
                planType: undefined,
                custName: undefined,
                custNo: undefined,
                orderNo: undefined,
                orderDate: undefined,
                itemNo: undefined,
                itemName: undefined,
                quantity: undefined,
                deliveryDate: undefined,
                unit: undefined
            },

            // 新增或修改 表格数据
            modal_table_data: [],
            modal_table_edit: false,
            modal_plan_length: 0,
            modify_detail_id: undefined,

            // 新增或修改 客户名称
            guest_name_data: null,

            // 合计表格数量
            create_newplan: undefined,

            // 计划详情
            sale_plan_info: false,
            sale_info_form: {},
            sale_info_table: [],

            // 新增或修改 表单校验
            modal_form_rules: {
                planType: [
                    { validator: validateplanType, trigger: 'select' }
                ],
                custName: [
                    { validator: validatecustName, trigger: 'select' }
                ],
                orderNo: [
                    { validator: validateorderNo, trigger: 'blur' }
                ],
                orderDate: [
                    { validator: validateorderDate, trigger: 'blur' }
                ],
                itemNo: [
                    { validator: validateitemNo, trigger: 'blur' }
                ],
                itemName: [
                    { validator: validateproductName, trigger: 'blur' }
                ],
                quantity: [
                    { validator: validateaccount, trigger: 'blur' }
                ],
                deliveryDate: [
                    { validator: validatepublishDate, trigger: 'blur' }
                ],
            }
        }
    },

    methods: {
        init() {
            this.reset();
            this.getSalePlanData();
        },

        reset() {
            let that = this;
            that.$clearObject(that.search_form_data);
        },

        refresh() {
            this.reset();
            this.searchFormData();
        },

        getSalePlanData() {
            let that = this;

            that.$ajaxWrap({
                url: "plan/index",
                success(res) {
                    that.loadSaleTable(res.data);
                }
            })
        },

        loadSaleTable(data) {
            let that = this,
                load_table_data = data.page.list;
            that.saleplan_push_tips = [];

            load_table_data.every(function(el) {
                let is_tips = el.operation === "01" ? true : false;
                return that.saleplan_push_tips.push({ show: is_tips });
            });

            that.saleplan_table_data = load_table_data;
            that.sale_page_list.pageNum = data.page.pageNum;
            that.sale_page_list.pageSize = data.page.pageSize;
            that.sale_page_list.total = data.page.total;
        },

        searchFormData(pageval, pagesize) {
            let that = this,
                search_data = that.search_form_data;
            search_data.operation = that.sale_change_tips;

            if (pagesize === "num") {
                search_data.pageNum = pageval || that.sale_page_list.pageNum;
                search_data.pageSize = that.sale_page_list.pageSize;
            } else {
                search_data.pageNum = that.sale_page_list.pageNum;
                search_data.pageSize = pageval || that.sale_page_list.pageSize;
            }

            for (let key in search_data) {
                if (typeof search_data[key] === "object") {
                    search_data[key] = (search_data[key].toLocaleDateString()).replace(/\//g, "-");
                }
            }

            that.$ajaxWrap({
                url: "plan/loadTable",
                data: search_data,
                success(res) {
                    that.loadSaleTable(res.data);
                }
            });
        },

        changeTableActive(changeTab) {
            switch (changeTab.name) {
                case "all":
                    this.sale_change_tips = "";
                    this.searchFormData();
                    break;
                case "unIssue":
                    this.sale_change_tips = "01";
                    this.searchFormData();
                    break;
                case "issued":
                    this.sale_change_tips = "02";
                    this.searchFormData();
                    break;
            }
        },

        currentPageChange(val) {
            if (this.saleplan_table_data.length) {
                this.searchFormData(val, "num");
            }
        },

        currentSizeChange(val) {
            if (this.saleplan_table_data.length) {
                this.searchFormData(val, "size");
            }
        },

        operationSalePlan(planId, planIndex) {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "plan/operationPlan",
                data: {
                    operationType: "issued",
                    planId: planId
                },
                success() {
                    that.saleplan_push_tips[planIndex].show = false;
                    that.refresh();
                }
            })
        },

        confirmOperation(planId, planIndex, tipsText) {
            let that = this;

            that.$baseConfirm(`确认${tipsText}吗`, function() {
                that.operationSalePlan(planId, planIndex);
            });
        },

        clearModalForm() {
            let that = this;
            that.modal_show_tips = false;
            that.modal_table_edit = false;
            that.modify_detail_id = undefined;
            that.modal_plan_length = 0;
            that.modal_table_data = [];

            that.$clearObject(that.modal_form_data);
            that.refresh();
        },

        confirmCloseModal() {
            let that = this;
            that.$baseConfirm("确定关闭吗？", function() {
                that.clearModalForm();
            })
        },

        openSalePlanModal(tipsText, PlanId) {
            this.modal_title = tipsText;
            this.modal_show_tips = true;
            this.create_newplan = tipsText === "新建计划" ? "create" : "modify";

            this.getModalData(PlanId);
        },

        openSalePlanInfo(planId) {
            let that = this;
            that.sale_plan_info = true;
            that.$ajaxWrap({
                url: "plan/detailPlan",
                data: {
                    planId: planId
                },
                success(res) {
                    let len;
                    that.sale_info_form = res.data.data;
                    that.sale_info_table = res.data.dataList;
                    len = that.sale_info_table.length;

                    for (let i = 0; i < len; i++) {
                        let el = that.sale_info_table[i];
                        el.finishrate = (100 * el.finishProcess / el.quantity) + "%";
                        el.finishProcessText = el.finishProcess + "/" + el.quantity;
                    }
                }
            })
        },

        closeSalePlanInfo() {
            this.sale_plan_info = false;
            this.sale_info_form = {};
            this.sale_info_table = [];
        },

        editSalePlan() {
            this.modal_table_edit = false;
        },

        getModalData(PlanId) {
            let that = this;

            if (!PlanId) {
                that.$ajaxWrap({
                    url: "plan/addPlanOnclick",
                    success(res) {
                        that.guest_name_data = res.data.dataList;
                    }
                })
            } else {
                that.$ajaxWrap({
                    url: "plan/updatePlanOnclick",
                    data: {
                        planId: PlanId
                    },
                    success(res) {
                        that.guest_name_data = res.data.dataList;
                        that.modal_table_data = res.data.data.planDetailList;
                        that.modal_plan_length = that.modal_table_data.length;
                        that.modify_detail_id = PlanId;
                    }
                })
            }
        },

        addNewSalePlan() {
            let that = this,
                new_data = {},
                len = that.guest_name_data.length;
            that.modal_form_data.unit = "pcs";

            // 保存 modal_form_data 没存储到的CustName;
            for (let i = 0; i < len; i++) {
                if (that.modal_form_data.custName === that.guest_name_data[i].custNo) {
                    that.modal_form_data.custName = that.guest_name_data[i].custName;
                    that.modal_form_data.custNo = that.guest_name_data[i].custNo;
                }
            }

            for (let key in that.modal_form_data) {
                if (!that.modal_form_data[key]) {
                    this.$alert('请完善表单信息', '提示', {
                        confirmButtonText: '确定',
                        callback() {}
                    })
                    return;
                }
                new_data[key] = that.modal_form_data[key];
            }

            that.modal_table_edit = true;
            that.modal_table_data.push(new_data);
            that.modal_plan_length = that.modal_table_data.length;

            that.$clearObject(that.modal_form_data);
        },

        confirmSendPlan(tips) {
            let that = this,
                sure_text = tips === "save" ? "保存" : "下发";
            let old_table_data = that.modal_table_data;

            that.handleModalData(old_table_data);

            let new_table_data = that.modal_table_data,
                len = new_table_data.length;

            for (let i = 0; i < len; i++) {
                let el = new_table_data[i]
                for (let key in el) {
                    if (el[key] === "" || el[key] === null) {
                        that.$alert('请完善表单信息', '提示', {
                            confirmButtonText: '确定',
                            callback() {}
                        })
                        return;
                    }
                }
            }

            that.$confirm(`确定${sure_text}吗？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.sendNewSalePlan(tips);
            }).catch(function() {});
        },

        handleModalData(tableData) {
            let that = this,
                len = tableData.length,
                guest_len = that.guest_name_data.length;

            for (let i = 0; i < len; i++) {
                let el = tableData[i];
                for (let j = 0; j < guest_len; j++) {
                    if (el.custName === that.guest_name_data[j].custNo) {
                        el.custName = that.guest_name_data[j].custName;
                        el.custNo = that.guest_name_data[j].custNo;
                    }
                }

                if (typeof el.orderDate === "object" || typeof el.deliveryDate === "object") {
                    if (el.orderDate.toLocaleDateString) {
                        el.orderDate = that.$handleDateObject(el.orderDate);
                    }
                    if (el.deliveryDate.toLocaleDateString) {
                        el.deliveryDate = that.$handleDateObject(el.deliveryDate);
                    }
                }

                if (el.detailId) {
                    let tempObj = {};
                    tempObj.detailId = el.detailId;

                    for (let key in that.modal_form_data) {
                        tempObj[key] = el[key];
                    }

                    for (let j = 0; j < guest_len; j++) {
                        if (tempObj.custName === that.guest_name_data[j].custNo) {
                            tempObj.custName = that.guest_name_data[j].custName;
                            tempObj.custNo = that.guest_name_data[j].custNo;
                        }
                    }

                    tempObj.planType = tempObj.planType === "库存" || tempObj.planType === "02" ? "02" : "01";
                    Vue.set(that.modal_table_data, i, tempObj);
                }
            }
        },

        sendNewSalePlan(tips) {
            let that = this,
                url = undefined,
                send_data = {
                    operation: undefined,
                    planDetailList: that.modal_table_data
                }

            if (that.modify_detail_id) {
                send_data.planId = that.modify_detail_id;
            }

            send_data.operation = tips === "save" ? "01" : "02";
            url = that.create_newplan === "create" ? "plan/addPlan" : "plan/updatePlan";
            that.$ajaxWrap({
                type: "post",
                url: url,
                data: send_data,
                success(res) {
                    that.clearModalForm();
                }
            });

        }
    }
}