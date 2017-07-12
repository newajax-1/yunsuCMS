import Qs from 'qs'

export default {
    name: 'saleplan',
    data() {
        var validateplanType = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择计划类型'));
            }
            callback();
        };
        var validatecustName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择客户名称'));
            }
            callback();
        };
        var validateorderNo = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入订单编号'));
            }
            callback();
        };
        var validateorderDate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择订单日期'));
            }
            callback();
        };
        var validateitemNo = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入产品型号'));
            }
            callback();
        };
        var validateproductName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入产品名称'));
            }
            callback();
        };
        var validateaccount = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入需求数量'));
            }
            callback();
        };
        var validatepublishDate = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择交货日期'));
            }
            callback();
        };
        return {

            //时间选择器
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },

            // ？？
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },

            // 下发 or 详情显示
            showInfo: [{
                show: true
            }],

            //表格修改下发按钮
            activeName: "first",

            // 存放日期值
            value1: '',
            value2: '',
            value3: '',
            value4: '',

            // 设置tab默认显示
            activeName2: 'first',

            // 对话框
            newCustom: false,
            modifysaleplan: false,

            // 加载表格
            tableData: [{}],

            //可编辑表格
            editFlag: true,

            //新增页面表格的数据
            newFormData: {
                planType: '',
                custName: '',
                orderNo: '',
                orderDate: '',
                itemNo: '',
                productName: '',
                account: '',
                pic: 'pic',
                publishDate: ''
            },

            //新增页面表格数据组
            newListData: [],

            //表格数据表单部分
            formData: {
                operUser: '',
                operTimeStart: '',
                operTimeEnd: '',
                createTimeStart: '',
                createTimeEnd: '',
            },

            // 分页
            pageList: {
                pageNum: 1,
                pageSize: 1,
                total: 1
            },

            //新增页客户信息
            guestInfo: [],

            //数据表格的id
            tempID: '',

            // 修改客户计划
            ModifyGuestInfo: null,
            ModifyFormData: null,
            ModifyListData: null,

            //详情表单数据
            infoform: {
                planNo: '',
                createTime: '',
                operation: '',
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
                deliveryDate: '',
            }],

            //新增校验
            ruleForm: {
                planType: '',
                custName: '',
                orderNo: '',
                orderDate: '',
                itemNo: '',
                productName: '',
                account: '',
                publishDate: '',
            },

            rules: {
                planType: [
                    { validator: validateplanType, trigger: 'change' }
                ],
                custName: [
                    { validator: validatecustName, trigger: 'blur' }
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
                productName: [
                    { validator: validateproductName, trigger: 'blur' }
                ],
                account: [
                    { validator: validateaccount, trigger: 'blur' }
                ],
                publishDate: [
                    { validator: validatepublishDate, trigger: 'blur' }
                ],
            }
        }
    },

    methods: {
        test() {
            console.log(1)
        },

        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 清空数据 
        clearData(dataObj) {
            var obj = Object.prototype.toString.call(dataObj);
            if (obj === "[object Array]") {
                dataObj = [];
            } else {
                for (var key in dataObj) {
                    dataObj[key] = ""
                }
            }
        },

        getEditData(id) {
            var that = this;
            that.$ajax.get('plan/updatePlanOnclick', {
                    params: {
                        planId: id
                    }
                })
                .then(function(res) {
                    console.log(res)
                })
                .catch(function(err) {
                    console.log(err);
                });
        },

        // 获取数据数据表格
        getData() {
            var that = this;
            that.$ajax.get('plan/index')
                .then(function(res) {
                    that.loadTable(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        // 数据表格 加载 {备注：这段数据请求loadTable 可以与 loadTableStatus函数合并} 
        loadTable(data) {
            var that = this;
            var loadData = data.data.data.page;
            that.pageList.pageNum = loadData.pageNum;
            that.pageList.pageSize = loadData.pageSize;
            that.pageList.total = loadData.total;
            that.showInfo = [];
            loadData.list.every(function(el) {
                var flag = el.operation === "01" ? true : false

                // 需要在此判断 el 中 是否下发，如果已下发，则show赋值为false,未下发show赋值为true
                return that.showInfo.push({ show: flag });
            })
            that.tableData = loadData.list;
        },

        // tabController Event 
        loadTableStatus(id) {
            var that = this;
            that.$ajax.get('plan/index?operation=' + id)
                .then(function(res) {
                    that.loadTable(res);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },

        // tabController Event
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

        // 数据表格 下发Event
        operationPlan(ids, index) {
            var that = this;
            that.$ajax({
                    method: 'post',
                    url: '/plan/operationPlan',
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
                })
                .then(function(results) {
                    var data = results.data;
                    if (data.success === true) {
                        that.showInfo[index].show = false
                    }
                })
        },

        // 数据表格 详情Event
        detailPlan(id) {
            var that = this;
            that.$ajax.get('plan/index?operation=' + id).then(function(res) {
                console.log(res);
            }).catch(function(error) {
                console.log(error);
            });
        },

        // 新增计划表单保存 btn-save
        addPlan() {
            var that = this;
            var _data = {}
            for (var key in that.ruleForm) {
                _data[key] = that.ruleForm[key];
            }
            that.newListData.push(_data);
            that.clearData(that.ruleForm);

        },

        // 新增计划表格编辑 btn-edit
        editTable() {
            this.editFlag = false;
        },

        // 处理新建计划表格数据
        handleTableData(id, url) {
            var that = this;
            var i, len = that.newListData.length;
            if (!len) {
                alert("暂无数据，请添加计划");
                return;
            }
            for (i = 0; i < len; i++) {
                var el = that.newListData[i];
                el.operation = id;

                // 1.判断数据是否 Obj 类型
                // 2.判断新建计划中的日期是否改变，已改变，则重复第一步骤，并同步展示在新建计划表格[newList]
                // 3.如果保存后清空新建计划表格的话，则忽略第二步骤
                if (typeof el.orderDate === "object") {
                    el.orderDate = (el.orderDate.toLocaleDateString()).replace(/\//g, "-");
                    el.publishDate = (el.publishDate.toLocaleDateString()).replace(/\//g, "-");
                }
            }

            that.$ajax({
                method: 'post',
                url: url,
                transformRequest: [function(data) {　　
                    data = JSON.stringify(that.newListData);
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(results) {
                that.clearData(that.newListData);
            })

        },

        // 新增计划保存 btn-save
        saveList() {
            this.handleTableData("01", "plan/addPlan");
        },
        publishList() {
            this.handleTableData("02", "plan/addPlan");
        },

        saveModifyList() {
            this.handleTableData("01", "plan/updatePlan");
        },


        publishModifyList() {
            this.handleTableData("02", "plan/updatePlan");
        },

        //分页
        handleSizeChange(val) {
            var that = this;
            that.pageList.pageSize = val;
        },
        handleCurrentChange(val) {
            var that = this;
            that.pageList.pageNum = val;
        },

        //查询
        search() {
            var that = this;
            var _searchData = that.formData;
            _searchData.pageSize = '10';
            _searchData.pageNum = '1';

            for (var key in _searchData) {
                if (typeof _searchData[key] === "object") {
                    _searchData[key] = (_searchData[key].toLocaleDateString()).replace(/\//g, "-");
                }
            }

            that.$ajax.get('plan/loadTable', {
                params: _searchData
            }).then(function(response) {
                that.loadTable(response);
                that.clearData(that.formData);
            }).catch(function(err) {
                console.log(err);
            });
        },

        //新增页面客户名称
        addGuestInfo() {
            var that = this;
            that.$ajax.get('plan/addPlanOnclick').then(function(res) {
                that.guestInfo = res.data.data.dataList;
            })
        },

        // 修改模态框
        openmodify(ids) {
            var that = this;
            that.modifysaleplan = true;
            that.tempID = ids.row.planId;
        },

        //重置
        reset() {
            var that = this;
            that.clearData(that.formData);
        },

        //修改
        lodeModifyInfo() {
            var that = this;
            that.$ajax.get('plan/updatePlanOnclick', {
                params: {
                    planId: that.tempID
                }
            }).then(function(res) {
                // 客户列表 res.data.dataList
                // 客户信息 res.data.data
                that.ModifyGuestInfo = res.data.data.dataList;
                that.ModifyFormData = res.data.data.data;
                that.newListData = that.ModifyFormData.planDetailList;
            })
        },

        //详情
        detailplan(id) {
            var that = this;
            that.$ajax.get('plan/detailPlan', {
                params: {
                    planId: id
                }
            }).then(function(res) {
                console.log(res.data.data.data);
                console.log(res.data.data.dataList);
            })
        }
    },

    mounted() {
        this.getData();
    }
}