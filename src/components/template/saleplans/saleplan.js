import Qs from 'qs'

export default {
    name: 'saleplan',
    created() {
        this.init();
    },
    data() {

        // 新建计划 Form校验
        var validateplanType = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择计划类型'));
            }
            callback();
        };
        var validatecustName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择客户名称'));
            }
            callback();
        };
        var validateorderNo = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入订单编号'));
            }
            callback();
        };
        var validateorderDate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择订单日期'));
            }
            callback();
        };
        var validateitemNo = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入产品型号'));
            }
            callback();
        };
        var validateproductName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入产品名称'));
            }
            callback();
        };
        var validateaccount = (rule, value, callback) => {
            if (!value || value < 0) {
                callback(new Error('请输入需求数量'));
            }
            callback();
        };
        var validatepublishDate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择交货日期'));
            }
            callback();
        };

        // Vue Data
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

            // 销售计划 表格下发或详情显示

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
            saleChangeTips: undefined,

            // 销售计划 当前Tab页面name
            saleChangeName: "all",

            // 新增或修改 显示隐藏
            modal_show_tips: false,
            modal_title: undefined,

            // 新增或修改 表单数据
            modal_form_data: {
                planType: undefined,
                custName: undefined,
                orderNo: undefined,
                orderDate: undefined,
                itemNo: undefined,
                itemName: undefined,
                quantity: undefined,
                deliveryDate: undefined,
                unit: 'pcs'
            },

            // 新增或修改 表格数据
            modal_table_data: [],

            // 修改计划 表格可编辑
            modal_table_edit: false,

            // 新增或修改 客户名称
            guest_name_data: null,

            // 合计表格数量
            modal_plan_length: undefined,

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
            this.getSalePlanData();
            this.reset();
        },

        reset() {
            let that = this;
            that.$clearObject(that.search_form_data);
        },

        refresh() {
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
                loadTableData = data.page.list;
            that.saleplan_push_tips = null; // 释放内存
            that.saleplan_push_tips = [];

            loadTableData.every(function(el) {
                let isTips = el.operation === "01" ? true : false;
                return that.saleplan_push_tips.push({ show: isTips });
            });

            that.saleplan_table_data = null;
            that.saleplan_table_data = loadTableData;
            that.sale_page_list.pageNum = data.page.pageNum;
            that.sale_page_list.pageSize = data.page.pageSize;
            that.sale_page_list.total = data.page.total;
        },

        searchFormData(pageval) {
            let that = this,
                searchData = that.search_form_data;
            searchData.operation = that.saleChangeTips;
            searchData.pageNum = pageval || that.sale_page_list.pageNum;
            searchData.pageSize = that.sale_page_list.pageSize;

            for (let key in searchData) {
                if (typeof searchData[key] === "object") {
                    searchData[key] = (searchData[key].toLocaleDateString()).replace(/\//g, "-");
                }
            }
            that.$ajaxWrap({
                url: "plan/loadTable",
                data: searchData,
                success(res) {
                    that.loadSaleTable(res.data);
                }
            });
        },

        changeTableActive(changeTab) {
            switch (changeTab.name) {
                case "all":
                    this.saleChangeTips = "";
                    this.searchFormData();
                    break;
                case "unIssue":
                    this.saleChangeTips = "01";
                    this.searchFormData();
                    break;
                case "issued":
                    this.saleChangeTips = "02";
                    this.searchFormData();
                    break;
            }
        },

        currentPageChange(val) {
            if (this.saleplan_table_data.length) {
                this.searchFormData(val);
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
            that.$confirm(`确认${tipsText}吗`, "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.operationSalePlan(planId, planIndex);
            }).catch(function() {});
        },

        clearModalForm() {
            this.modal_show_tips = false;
            this.modal_table_data = [];
            this.$clearObject(this.modal_form_data);
        },

        confirmCloseModal() {
            let that = this;
            if (that.modal_table_data.length) {
                that.$confirm("确定关闭吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    that.clearModalForm();
                }).catch(function() {});
            } else {
                that.clearModalForm();
            }

        },

        openSalePlanModal(tipsText, PlanId) {
            this.modal_title = tipsText;
            this.modal_show_tips = true;
            this.getModalData(PlanId);
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
                        that.modal_table_data = null;
                        that.modal_table_data = res.data.data.planDetailList;
                    }
                })
            }
        },

        addNewPlan() {

        },

        handleModalData(tableData) {

            let len = tableData.length,
                i, key;

            for (i = 0; i < len; i++) {
                for (key in tableData[i]) {

                }
            }
        }
        /*

        //新建计划 客户名称
        addGuestInfo() {
            var that = this;
            that.$ajax.get('plan/addPlanOnclick').then(function(res) {
                that.guestInfo = res.data.data.dataList;
            })
        },

        // 新增计划 编辑
        editTable() {
            this.editFlag = false;
        },

        // 新增计划 完成
        addPlan() {
            var that = this,
                _data = {};
            that.ruleForm.unit = "pcs";

            for (var key in that.ruleForm) {
                if (!that.ruleForm[key]) {
                    alert("请完整填写信息");
                    return
                }
                _data[key] = that.ruleForm[key];
            }

            that.detailMath++;
            that.newListData.push(_data);
            that.$clearObject(that.ruleForm);
        },

        handleCustName() {

        },

        // 新建窗口关闭
        closePlan() {
            var that = this;
            if (that.newListData.length) {
                that.$confirm("确定关闭吗？", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    that.newCustom = false;
                    that.modifysaleplan = false
                    that.$clearObject(that.ruleForm)
                    that.newListData = [];
                }).catch(function() {});
            } else {
                that.newCustom = false;
                that.modifysaleplan = false
            }
        },

        // 新增计划 保存与下发
        saveList() {
            this.handleTableData("01", "plan/addPlan");
        },

        publishList() {
            this.handleTableData("02", "plan/addPlan");
        },

        // 新建计划 表格数据处理
        handleTableData(id, url) {
            var that = this;
            var i, len = that.newListData.length,
                j, lens = that.guestInfo.length,
                _temp, el,
                _dataList = [];
            if (!len) {
                alert("暂无数据，请添加计划");
                return;
            }
            for (i = 0; i < len; i++) {
                var _tempData = {};
                el = that.newListData[i];
                if (lens) {

                    // 添加客户姓名与ID
                    for (j = 0; j < lens; j++) {
                        _temp = that.guestInfo[j];
                        if (el.custName === _temp.custNo) {
                            el.custName = _temp.custName;
                            el.custNo = _temp.custNo;
                        }
                    };
                }


                for (var key in el) {
                    for (var keys in that.ruleForm) {
                        if (key === keys || key === "custNo") {
                            _tempData[key] = el[key]
                        }
                    }
                };
                _tempData.planType = _tempData.planType === "库存" || _tempData.planType === "02" ? "02" : "01";

                if (typeof _tempData.orderDate === "object") {
                    var d = _tempData.orderDate,
                        e = _tempData.deliveryDate;
                    _tempData.orderDate = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate());
                    _tempData.deliveryDate = e.getFullYear() + '-' + ((e.getMonth() + 1) < 10 ? ('0' + (e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + (e.getDate() < 10 ? ('0' + e.getDate()) : e.getDate());
                }

                if (el.detailId) {
                    _tempData.detailId = el.detailId;
                } else {
                    _tempData.detailId = "";
                }

                _dataList.push(_tempData);
                console.log(_tempData.detailId);
            }

            console.log(_dataList)
            var tempObj = {
                operation: id,
                planDetailList: _dataList
            }

            if (that.tempID) tempObj.planId = that.tempID;
            that.$ajaxWrap({
                type: "post",
                url: url,
                data: tempObj,
                success(data) {
                    that.getData();
                    that.newListData = [];
                }
            })
        },

        // 新建计划 关闭提示
        handleClose(done) {
            var that = this;
            that.$confirm("确定关闭吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                done();
                that.$clearObject(that.ruleForm)
                that.newListData = [];
            }).catch(function() {});
        },

        ensureSave() {
            var that = this,
                flag = true;
            that.newListData.every(function(el) {
                for (var key in el) {
                    if (!el[key]) {
                        alert("请完善数据！");
                        flag = false;
                    }
                }
            });
            if (flag) {
                that.$confirm("确定保存吗", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    that.saveList();
                    that.newCustom = false;
                    that.getData()
                }).catch(function() {});
            }
        },

        ensurePublish() {
            var that = this;
            that.$confirm("确认下发吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.publishList();
                that.newCustom = false;
            }).catch(function() {})
        },

        // 修改模态框
        openmodify(ids) {
            var that = this;
            that.modifysaleplan = true;
            that.tempID = ids.row.planId;
            that.editFlag = false;
            that.lodeModifyInfo();
        },

        //修改计划
        lodeModifyInfo() {
            var that = this;
            that.$ajaxWrap({
                type: "get",
                url: "plan/updatePlanOnclick",
                data: {
                    planId: that.tempID
                },
                success(data) {
                    that.ModifyGuestInfo = data.data.dataList;
                    that.ModifyFormData = data.data.data;
                    that.newListData = that.ModifyFormData.planDetailList;
                    that.detailMath = that.newListData.length;
                }
            });
        },

        // 修改计划 确定下发与保存
        modifyEnsureSave() {
            var that = this,
                flag = true;
            that.newListData.every(function(el) {
                for (var key in el) {
                    if (el[key] === "") {
                        alert("请完善数据！");
                        flag = false;
                    }
                }
            });
            if (flag) {
                that.$confirm("确认保存吗", "提示", {
                    confirmButtonText: "确认",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(function() {
                    that.saveModifyList();
                    that.modifysaleplan = false;
                })
            }
        },

        modifyEnsurePublish() {
            var that = this;
            that.$confirm("确认下发吗", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.publishModifyList();
                that.modifysaleplan = false;
            })
        },

        // 修改计划保存
        saveModifyList() {
            this.handleTableData("01", "plan/updatePlan");
        },

        publishModifyList() {
            this.handleTableData("02", "plan/updatePlan");
        },

        // 计划详情
        detailplan(id) {
            var that = this;
            that.$ajaxWrap({
                type: "get",
                url: "plan/detailPlan",
                data: {
                    planId: id
                },
                success(data) {
                    that.$goRoute("saleplaninfo");
                    that.EventData = {
                        data: data.data.data,
                        list: data.data.dataList
                    };
                }
            });
        }*/
    },

    destroyed() {
        // EventBus.$emit("setInfoData", this.EventData);
    }
}