export default {
    name: "createsaleplan",
    created() {
        this.init();
    },
    data() {
        return {
            tab_name: undefined,
            plan_id: undefined,
            sale_plan_data: [],
            guest_name_data: null,
            modify_detail_id: undefined,
            table_data_length: 0,
            create_title: undefined,
            create_newplan: undefined,
            new_saleplan_data: {
                planType: undefined,
                custName: undefined,
                orderNo: undefined,
                orderDate: undefined,
                itemNo: undefined,
                itemName: undefined,
                quantity: undefined,
                unit: "pcs",
                deliveryDate: undefined
            },
            delete_array_index: [],
            delete_array_detail: []
        }
    },
    methods: {
        init() {
            let that = this;

            that.tab_name = that.$route.query.tab_name;
            that.plan_id = that.$route.query.plan_id || "";
            if (that.plan_id) {
                that.getSalePlanData(that.plan_id);
            } else {
                that.getGuestNameData();
                that.create_newplan = "create";
            }
        },

        getGuestNameData() {
            let that = this;
            that.create_title = "销售管理-销售计划管理-新增计划";
            that.$ajaxWrap({
                url: "plan/addPlanOnclick",
                success(res) {
                    that.guest_name_data = res.data.dataList;
                    that.createNewSalePlan();
                }
            })
        },

        createNewSalePlan() {
            let that = this,
                new_data = that.$cloneObject(that.new_saleplan_data);
            new_data.index = that.sale_plan_data.length;
            that.sale_plan_data.push(new_data);
            that.table_data_length = that.sale_plan_data.length;

        },

        getSalePlanData(plan_id) {
            let that = this;

            that.create_title = "销售管理-销售计划管理-修改计划"
            that.$ajaxWrap({
                url: "plan/updatePlanOnclick",
                data: {
                    planId: plan_id
                },
                success(res) {
                    that.sale_plan_data = res.data.data.planDetailList;
                    if (!that.guest_name_data) {
                        that.guest_name_data = res.data.dataList;
                        that.table_data_length = that.sale_plan_data.length;
                        that.modify_detail_id = plan_id;
                    }
                }
            })
        },

        confirmSendPlan(tips) {
            let that = this,
                sure_text = tips === "save" ? "保存" : "下发";

            let table_data = that.sale_plan_data,
                len = table_data.length;

            for (let i = 0; i < len; i++) {
                let el = table_data[i]
                for (let key in el) {
                    if (el[key] === "" || el[key] === undefined) {
                        that.$baseWarn('请完善表单信息');
                        return;
                    }
                }
            }

            that.$baseConfirm(`确定${sure_text}吗？`, function() {
                that.handleSendData(tips);
            })

        },

        handleSendData(tips) {
            let that = this,
                table_data = that.sale_plan_data,
                len = table_data.length,
                guest_len = that.guest_name_data.length;

            for (let i = 0; i < len; i++) {
                let el = table_data[i];
                if (!el.detailId) {
                    for (let j = 0; j < guest_len; j++) {
                        if (el.custName === that.guest_name_data[j].custNo) {
                            el.custName = that.guest_name_data[j].custName;
                            el.custNo = that.guest_name_data[j].custNo;
                        }
                    }

                    if (typeof el.orderDate === "object" && typeof el.deliveryDate === "object") {
                        if (el.orderDate.toLocaleDateString && el.deliveryDate.toLocaleDateString) {
                            el.orderDate = that.$handleDateObject(el.orderDate);
                            el.deliveryDate = that.$handleDateObject(el.deliveryDate);
                        }
                    }
                } else {
                    el.planType = el.planType === "库存" ? "02" : "01";
                }
            }

            that.sendNewSalePlan(tips);
        },

        sendNewSalePlan(tips) {
            let that = this,
                url = undefined,
                send_data = {
                    operation: undefined,
                    planDetailList: that.sale_plan_data
                }

            let sure_text = tips === "save" ? "保存" : "下发";
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
                    that.$baseWarn(`${sure_text}成功`, function() {
                        that.clearTableData();
                        that.comebackSalePlan();
                    })

                }
            });
        },

        clearTableData() {
            let that = this;
            that.modify_detail_id = undefined;
            that.create_newplan = undefined;

            that.$clearObject(that.new_saleplan_data);
        },

        comebackSalePlan() {
            let that = this;
            that.$goRoute("/home/saleplan/", { tab_name: that.tab_name });
        },

        confirmDeleteSalePlan(opt) {
            let that = this;
            that.$baseConfirm("是否删除？", function() {
                that.deleteSalePlanDetail(opt);
            })
        },

        deleteSalePlanDetail(opt) {
            let that = this,
                plan_id;
            if (opt.detailId) {
                plan_id = opt.detailId
                that.$ajaxWrap({
                    url: "/plan/deletePlanDetail",
                    data: {
                        planDetailId: plan_id
                    },
                    success(res) {
                        that.$baseWarn("删除成功！", function() {
                            that.spliceArrayItem(opt.detailId);
                        })
                    }
                })
            } else {
                that.spliceArrayItem(opt.index);
            }
        },

        spliceArrayItem(opt) {
            let that = this,
                data = that.sale_plan_data,
                len = data.length;
            for (let i = 0; i < len; i++) {
                let el = data[i];
                if ((el.index === opt && el.index !== undefined) ||
                    (el.detailId === opt) && el.detailId !== undefined) {

                    data.splice(i, 1);
                    i = i - 1;
                    len = data.length;
                }
            }
        },

        handleSelectionChange(item) {
            let temp_delete_array = [],
                temp_delete_index = [];

            for (let i = 0; i < item.length; i++) {
                let el = item[i];
                if (el.detailId) {
                    temp_delete_array.push(el.detailId);
                }

                if (!isNaN(el.index)) {
                    temp_delete_index.push(el.index);
                }
            }

            this.delete_array_index = temp_delete_index.sort((a, b) => a < b ? 1 : -1);
            this.delete_array_detail = temp_delete_array;
        },

        deleteDetailArray() {
            let that = this;
            if (that.delete_array_index.length || that.delete_array_detail.length) {

                that.$baseConfirm("是否删除？", function() {
                    let temp = that.delete_array_index.concat(that.delete_array_detail),
                        len = temp.length;
                    if (len) {
                        for (let i = 0; i < len; i++) {
                            let opt = temp[i];
                            that.spliceArrayItem(opt);
                        }
                    }

                    that.$ajaxWrap({
                        url: "/plan/batchDeletePlanDetail",
                        data: {
                            planDetailIds: that.delete_array_detail.join(",")
                        },
                        success() {
                            that.$baseWarn("删除成功！");
                        }
                    })
                });

            } else {
                that.$baseWarn("请选择要删除的数据！");
            }
        }
    }
}