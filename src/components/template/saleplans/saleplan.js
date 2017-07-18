import Qs from 'qs'

export default {
    name: 'saleplan',
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

            // 查询 数据表单部分
            formData: {
                operUser: '',
                operTimeStart: '',
                operTimeEnd: '',
                createTimeStart: '',
                createTimeEnd: ''
            },

            // 分页
            pageList: {
                pageNum: 1,
                pageSize: 1,
                total: 1
            },

            // 新建 时间选择器
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            deliveryPicker: {
                disabledDate(time) {
                    console.log(window.deliveryDate);
                }
            },

            // 下发 或 详情显示
            showInfo: [{
                show: true
            }],

            // 表格修改下发按钮
            activeName: "first",

            // 设置tab默认显示
            activeName2: 'first',

            // 对话框
            newCustom: false,
            modifysaleplan: false,

            // 加载表格
            tableData: [{}],

            // 可编辑表格
            editFlag: true,

            // 新增页面表格的数据
            newFormData: {
                planType: '',
                custName: '',
                orderNo: '',
                orderDate: '',
                itemNo: '',
                itemName: '',
                quantity: '',
                unit: 'pcs',
                deliveryDate: ''
            },

            // 新增页面表格数据组
            newListData: [],

            // 新增页客户信息
            guestInfo: [],

            // 新增校验
            ruleForm: {
                planType: '',
                custName: '',
                orderNo: '',
                orderDate: '',
                itemNo: '',
                itemName: '',
                quantity: '',
                deliveryDate: '',
                unit: 'pcs'
            },

            rules: {
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
            },
            detailMath: 0,

            //修改页面表格数据
            modifyFormDate: {
                planType: '',
                custName: '',
                orderNo: '',
                orderDate: '',
                itemNo: '',
                itemName: '',
                quantity: '',
                unit: '',
                orderStatus: '',
                finishProcess: '',
                finishrate: '',
                deliveryDate: ''
            },

            // 数据表格ID
            tempID: '',

            // 修改客户计划
            ModifyGuestInfo: null,
            ModifyFormData: null,
            ModifyListData: null,

            //详情表单数据
            infoform: {
                planNo: '',
                createTime: '',
                operationName: '',
                operTime: '',
                operUser: ''
            },

            //详情列表数据
            infolist: [{
                planType: '',
                custName: '',
                orderNo: '',
                orderDate: '',
                itemNo: '',
                itemName: '',
                quantity: '',
                unit: '',
                orderStatus: '',
                finishProcess: '',
                finishrate: '',
                deliveryDate: ''
            }],

            // 保存提示
            tipsVision: false,
            tipsContent: '确认保存？',
        }
    },

    methods: {

        // 清空数据 
        clearData(dataObj) {
            var obj = Object.prototype.toString.call(dataObj);
            if (obj !== "[object Array]") {
                for (var key in dataObj) {
                    dataObj[key] = "";
                };
            };
        },

        // 查询条件
        search() {
            var that = this,
                _searchData = that.formData;
            _searchData.pageSize = '10';
            _searchData.pageNum = '1';
            for (var key in _searchData) {
                if (typeof _searchData[key] === "object") {
                    _searchData[key] = (_searchData[key].toLocaleDateString()).replace(/\//g, "-");

                }
            }

            that.$ajax.get('plan/loadTable', {
                params: _searchData
            }).then(function(res) {
                if (res.data.success) that.loadTable(res.data.data);
            }).catch(function(err) {
                console.log(err);
            });
        },

        // 重置查询信息
        reset() {
            var that = this;
            that.clearData(that.formData);
        },

        // Tab切换请求数据
        loadTableStatus(id) {
            var that = this;
            that.$ajax.get('plan/index?operation=' + id).then(function(res) {
                if (res.data.success) that.loadTable(res.data.data);
            }).catch(function(error) {
                console.log(error);
            });
        },

        // Tab切换事件
        changeTableEffective(tab) {
            switch (tab.name) {
                case 'first':
                    this.getData();
                    break;
                case 'second':
                    this.loadTableStatus("01");
                    break;
                case 'third':
                    this.loadTableStatus("02");
                    break;
            }
        },

        // 数据表格 下发
        operationPlan(ids, index) {
            var that = this;
            that.$ajax({
                method: 'post',
                url: 'plan/operationPlan',
                transformRequest: [function(data) {　　
                    data = JSON.stringify({
                        operationType: "issued",
                        planId: ids,
                    });
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(results) {
                var data = results.data;
                if (data.success === true) {
                    that.showInfo[index].show = false
                };
            });
        },

        // 数据表格 下发提示
        tipsOperationPlan(ids, index) {
            var that = this;
            that.$confirm("确认下发吗", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.operationPlan(ids, index);
            })
        },

        // 数据表格 分页
        handleSizeChange(val) {
            var that = this;
            that.pageList.pageSize = val;
            console.log(that.pageList.pageSize)
        },

        handleCurrentChange(val) {
            var that = this;
            that.pageList.pageNum = val;
        },


        // 数据表格 获取
        getData() {
            var that = this;
            that.tableData = null;
            that.$ajax.get('plan/index').then(function(res) {
                if (res.data.success) that.loadTable(res.data.data);
            }).catch(function(error) {
                console.log(error);
            });
        },

        // 数据表格 加载 
        loadTable(data) {
            var that = this,
                loadData = data.page;
            that.pageList.pageNum = loadData.pageNum;
            that.pageList.pageSize = loadData.pageSize;
            that.pageList.total = loadData.total;
            that.showInfo = [];
            loadData.list.every(function(el) {
                var flag = el.operation === "01" ? true : false;
                return that.showInfo.push({ show: flag });
            })
            that.tableData = loadData.list;
        },

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

        // 新建计划 发货时间
        deliveryDatePicker() {
            window.deliveryDate = this.ruleForm.orderDate;

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
            that.clearData(that.ruleForm);
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
            var i, len = that.newListData.length;
            if (!len) {
                alert("暂无数据，请添加计划");
                return;
            }
            for (i = 0; i < len; i++) {
                var el = that.newListData[i],
                    custNo = el.custName.custNo;
                el.custNo = custNo;
                el.custName = el.custName.custName;
                if (typeof el.orderDate === "object") {
                    var d = el.orderDate;
                    el.orderDate = d.getFullYear() + '-' + ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '-' + (d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate());
                    var e = el.deliveryDate;
                    el.deliveryDate = e.getFullYear() + '-' + ((e.getMonth() + 1) < 10 ? ('0' + (e.getMonth() + 1)) : (e.getMonth() + 1)) + '-' + (e.getDate() < 10 ? ('0' + e.getDate()) : e.getDate());
                }
            }
            var tempObj = {
                operation: id,
                planDetailList: that.newListData
            }

            if (that.tempID) tempObj.planId = that.tempID;
            that.$ajax({
                method: 'post',
                url: url,
                transformRequest: [function(data) {　　
                    data = JSON.stringify(tempObj);
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(res) {
                // if (res.data.success) that.newListData = [];
            });
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
                // that.ruleForm = [];
                // that.newListData = [];
            }).catch(function() {});
        },

        ensureSave() {
            var that = this;
            that.$confirm("确定保存吗", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.saveList();
                that.newCustom = false;
                that.getData()
            }).catch(function() {});
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
        },

        //修改计划
        lodeModifyInfo() {
            var that = this;
            that.$ajax.get('plan/updatePlanOnclick', {
                params: {
                    planId: that.tempID
                }
            }).then(function(res) {
                if (res.data.success) {

                    // 客户列表 res.data.dataList;
                    // 客户信息 res.data.data;
                    that.ModifyGuestInfo = res.data.data.dataList;
                    that.ModifyFormData = res.data.data.data;
                    that.newListData = that.ModifyFormData.planDetailList;
                }
            })
        },

        // 修改计划 确定下发与保存
        modifyEnsureSave() {
            var that = this;
            that.$confirm("确认保存吗", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.saveModifyList();
                that.modifysaleplan = false;
            })
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
            that.$ajax.get('plan/detailPlan', {
                params: {
                    planId: id
                }
            }).then(function(res) {
                that.$goRoute("saleplaninfo");
                that.EventData = {
                    data: res.data.data.data,
                    list: res.data.data.dataList
                };
            });
        }
    },

    created() {
        this.getData();
    },
    destroyed() {
        EventBus.$emit("setInfoData", this.EventData);
    }
}