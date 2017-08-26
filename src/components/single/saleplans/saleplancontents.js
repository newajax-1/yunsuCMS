/**
 * coding by Alex of 2017-08-08
 */
export default {
    name: 'saleplancontent',
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
                pageSize: 15,
                total: 0
            },

            // 销售计划 当前Tab页面id
            sale_change_tips: undefined,
            sale_change_name: "",

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
            let that = this,
                temp = {};

            that.reset();

            that.sale_change_name = that.$route.query.tab_name;
            temp.name = that.sale_change_name;
            temp.name ? that.changeTableActive(temp) : that.getSalePlanData();
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
            that.sale_change_name = "all";
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

        gotoCreateSalePlan(plan_id, info) {
            let that = this,
                path = info ? "/home/saleplan/saleplaninfo" : "/home/saleplan/createsaleplan";
            that.$goRoute(path, { tab_name: that.sale_change_name, plan_id: plan_id || "" });
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
    }
}