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
                issUsr: undefined,
                creStartTime: undefined,
                creEndTime: undefined,
                issStartTime: undefined,
                issEndTime: undefined
            },

            // 周计划 表格数据
            weekplan_table_data: [],

            weekplan_push_tips: [{
                show: true
            }],
            // // 加载表格
            // tableData: [{}],

            // // 新增对话框
            // newCustom: false,

            // // 下发 与 详情显示
            // showInfo: [{
            //     show: true
            // }],

            // // 设置tab默认显示
            // activeTab: 'first',

            // // 修改对话框
            // modifysaleplan: false,

            // // 可编辑表格
            // isDisabled: false,

            // // 新增按钮显示 
            // isAddPlanBtn : true,
            // isSaveNewPlan : true,

            // // 新增页面表格数据组
            // newListData: null,

            // // 新增页排產計劃 周信息
            // weekDate: [],
            // saveWeekId : undefined,
            // // 修改id
            // tempId: undefined,

            // // 数据表格的title
            // titleValue: undefined,

            // // 表格渲染对象
            // SysDicListInfo: {
            //     processList : [],
            //     typeList : [],
            //     priorityList : [],
            //     custList : []
            // },

            // // 周计划时间
            // planBill : {
            // },

            // // 修改客户计划
            // ModifyGuestInfo: null,
            // ModifyFormData: null,

            // deleteArray : [],
            // detailDataInfo : null,
            // //全选框获取ID
            // batchIds: '',

            // //弹框是否关闭
            // dialogVisible: false,
            // deleteMsg:'',
            // tipMsg:'',

            // // 
            // watchFlag : false

        }
    },

    methods: {

        init() {
            this.getWeekPlanData();
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
                // let isTips = el.operation === "01" ? true : false;
                // return that.weekplan_push_tips.push({ show: isTips });
            });

            // that.saleplan_table_data = load_table_data;
            // that.sale_page_list.pageNum = data.page.pageNum;
            // that.sale_page_list.pageSize = data.page.pageSize;
            // that.sale_page_list.total = data.page.total;
        },

        // 获取数据数据表格
        // getData() {
        //     var that = this;
        //     that.$ajax({
        //         method: 'post',
        //         url: 'week/index',
        //         transformRequest: [function(data) {　　
        //             data = JSON.stringify({
        //                 pageNum: "1",
        //                 pageSize: "10"
        //             });
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(results) {
        //         var data = results.data;
        //         if (data.success === true) {
        //             that.loadTable(data);
        //         }
        //     }).catch(function(error) {});
        // },

        // // 加载数据
        // loadTable(data) {
        //     var that = this,
        //         loadData = data.data.page;
        //     that.showInfo = [];

        //     loadData.list.every(function(el) {
        //         var flag = el.issSts === "01" ? true : false;
        //         el.issSts = el.issSts === "01" ? '未下发' : '已下发';
        //         return that.showInfo.push({ show: flag });
        //     })
        //     that.tableData = loadData.list;
        // },

        // // 查询
        // search(type) {
        //     var that = this,
        //         searchData = that.searchForm;

        //     searchData.pageSize = '10';
        //     searchData.pageNum = '1';
        //     searchData.issSts = type;

        //     for (var key in searchData) {
        //         if (typeof searchData[key] === "object") {
        //             searchData[key] = (searchData[key].toLocaleDateString()).replace(/\//g, "-");
        //         }
        //     }

        //     that.$ajax.get('week/loadTable', {
        //         params: searchData
        //     }).then(function(res) {
        //         var data = res.data;
        //         if (data.success) {
        //             that.loadTable(data);
        //         }
        //     }).catch(function(err) {});
        // },

        // // 重置
        // reset() {
        //     var that = this;
        //     that.$clearObject(that.searchForm);
        // },

        // // 刷新
        // refresh() {
        //     var that = this;
        //     that.$clearObject(that.searchForm);
        //     that.getData();
        // },

        // // 新增周计划页面
        // openAddWeekPlan() {
        //     var that = this;
        //     that.newCustom = true;
        //     that.titleValue = "新增周计划";
        //     that.$ajax.get('week/queryWeekList').then(function(res) {
        //         if (res.data.success) {
        //             that.loadWeekPlanTable(res.data.data)
        //         }
        //     })
        // },

        // handleClose(done) {
        //     var that = this;
        //     that.$confirm("确定关闭吗？", "提示", {
        //         confirmButtonText: "确定",
        //         cancelButtonText: "取消",
        //         type: "warning"
        //     }).then(function() {
        //         that.getData();
        //         done();
        //     }).catch(function() {});
        // },

        // // 新增周计划 加载表格
        // loadWeekPlanTable(data) {
        //     this.weekDate = data.data || data.dataList[0].weekday;
        //     this.SysDicListInfo = data;
        //     this.isAddPlanBtn = true;
        //     this.isSaveNewPlan = false;
        //     if (data.dataList) {
        //         this.newListData = data.dataList || [];
        //     } else {
        //         this.newListData = [];
        //         this.addWorkplan();
        //     }
        // },

        // // 保存新增周计划
        // saveWeekNewPlan() {
        //     var week,
        //         data = [],
        //         sendData = null;
        //     this.isAddPlanBtn = false;
        //     this.isSaveNewPlan = true;
        //     this.isDisabled = true;
        //     this.newListData.every(function(el) {
        //         for (var key in el) {
        //             if (el.tempOrder && el.tempItem) {
        //                 delete el.tempItem;
        //                 delete el.tempOrder;
        //             }
        //         }
        //         return data.push(el);
        //     })
        //     if (this.tempId) {
        //         sendData = {
        //             workplanWeekId: this.tempId,
        //             operationType: "update",
        //             detailList: data
        //         }
        //         this.sendWeekPlan(sendData);
        //     } else {
        //         week = this.weekDate.week.match(/[^\(\)]+(?=\))/g)[0];
        //         sendData = {
        //             week: week,
        //             operationType: "add",
        //             detailList: data
        //         }
        //         this.sendWeekPlan(sendData);
        //     }
        // },

        // // 发送新增周计划
        // sendWeekPlan(datas) {
        //     var that = this;
        //     that.$ajaxWrap({
        //         type: "post",
        //         url: 'week/saveWorkplan',
        //         data: datas,
        //         callback: function(data) {
        //             that.saveWeekId = data.data.weekId;

        //         }
        //     });
        // },

        // // 获取订单编号
        // getOrderList(val, index) {
        //     var that = this;
        //     that.$ajax({
        //         method: 'post',
        //         url: 'week/getWeekDetail',
        //         transformRequest: [function(data) {　　
        //             data = JSON.stringify({
        //                 custNo: val
        //             });
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(res) {
        //         if (res.data.success) {
        //             that.handleOrderData(res.data.data, index)
        //         }
        //     }).catch(function() {});
        // },

        // // 处理订单编号
        // handleOrderData(data, index) {
        //     var that = this,
        //         tempListData = that.newListData[index];
        //     tempListData.tempOrder = data.orderList;
        //     Vue.set(that.newListData, index, tempListData);
        // },

        // // 获取产品型号
        // getProductData(val, index) {
        //     var that = this;
        //     that.$ajax({
        //         method: 'post',
        //         url: 'week/getWeekDetail',
        //         transformRequest: [function(data) {　　
        //             data = JSON.stringify({
        //                 orderNo: val
        //             });
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(res) {
        //         if (res.data.success) {
        //             that.handleProductData(res.data.data, index);
        //         }
        //     }).catch(function() {});
        // },

        // // 产品型号
        // handleProductData(data, index) {
        //     var that = this,
        //         tempListData = that.newListData[index];
        //     tempListData.tempItem = data.bomList;
        //     Vue.set(that.newListData, index, tempListData);
        // },

        // // 产品名称
        // setProductName(val, index) {
        //     var that = this,
        //         tempListData = that.newListData[index];
        //     tempListData.tempItem.every(function(el) {
        //         if (el.itemNo === val) {
        //             tempListData.itemName = el.itemName;
        //         }
        //     })
        //     Vue.set(that.newListData, index, tempListData);
        // },

        // // 修改模态框
        // updateWeek(id) {
        //     var that = this;
        //     that.tempId = id;
        //     that.titleValue = "修改周计划";
        //     that.isDisabled = false;
        //     that.$ajax.get('week/queryWeekList', {
        //         params: {
        //             workplanWeekId: id
        //         }
        //     }).then(function(res) {
        //         if (res.data.success) {
        //             that.newCustom = true;
        //             that.loadWeekPlanTable(res.data.data)
        //         }
        //     });
        // },

        // // 刪除周計劃
        // deletelWeek(id) {
        //     var that = this;
        //     that.$ajax({
        //         method: 'post',
        //         url: 'week/deleteById',
        //         transformRequest: [function(data) {　　
        //             data = JSON.stringify({
        //                 workplanWeekId: id,
        //             });
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(results) {
        //         var data = results.data;
        //         if (data.success === true) {
        //             that.search();
        //         }
        //     })
        // },

        // // 根据下发类型展示数据
        // changeTableEffective(tab) {
        //     switch (tab.name) {
        //         case 'first':
        //             this.search();
        //             break;
        //         case 'second':
        //             this.search("01");
        //             break;
        //         case 'third':
        //             this.search("02");
        //             break;
        //     }
        // },

        // // 数据表格 下发Event
        // operationWeek(id, index) {
        //     var that = this;
        //     that.$ajax({
        //         method: 'post',
        //         url: 'week/operationWeekStatus',
        //         transformRequest: [function(data) {　　
        //             data = JSON.stringify({
        //                 workplanWeekId: id,
        //             });
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(results) {
        //         var data = results.data;
        //         if (data.success) {
        //             that.showInfo[index].show = false
        //             that.search();
        //         }
        //     })
        // },



        // // 详情
        // detailplan(id) {
        //     var that = this;
        //     that.$ajax.get('week/queryWeekList', {
        //         params: {
        //             workplanWeekId: id
        //         }
        //     }).then(function(res) {
        //         if (res.data.success) {
        //             that.detailDataInfo = {
        //                 weekDate: res.data.data.dataList[0].weekday,
        //                 SysDicListInfo: res.data.data
        //             }
        //             that.$goRoute("weekProdPlansInfo");
        //         }
        //     })
        // },

        // // 下发周计划
        // opearationWeekplan() {
        //     var that = this;
        //     that.$ajax({
        //         method: 'post',
        //         url: 'week/operationWeekStatus',
        //         transformRequest: [function(data) {　　
        //             data = JSON.stringify({
        //                 workplanWeekId: that.saveWeekId
        //             });
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(res) {
        //         console.log(res)
        //     })
        // },

        // deleteObject() {
        //     var that = this;
        //     var dataList = that.dataList;
        //     var tempObj = {
        //         idList: dataList
        //     }
        //     that.$ajax({
        //         method: 'post',
        //         url: "/week/operationWeek",
        //         transformRequest: [function(data) {　
        //             data = JSON.stringify(tempObj);
        //             return data;
        //         }],
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(function(data) {
        //         if (data.data.success) {
        //             alert("删除成功");
        //             that.dialogVisible = false;
        //         } else {
        //             alert("删除失败");
        //             that.dialogVisible = false;
        //         }
        //     })
        // },

        // //删除排产计划、排产班次
        // batchDeleteWorkplanData() {
        //     var that = this;
        //     if (!that.deleteArray.length) {
        //         alert("请选择您要删除的数据");
        //         return;
        //     }
        //     that.deleteMsg = "您确定要删除这些数据吗？";
        //     that.dataList = that.deleteArray;
        //     that.dialogVisible = true;
        // },

        // // 批量删除 获取被选中的排产计划id
        // handleSelectionChange(item) {
        //     var that = this;
        //     item.every(function(el) {
        //         return that.deleteArray.push(el.workplanDetailId);
        //     })
        // },

        // // 新增 排产计划
        // addWorkplan() {
        //     var that = this;
        //     that.newListData.push({
        //         type: undefined,
        //         lv: undefined,
        //         custName: undefined,
        //         ordrNo: undefined,
        //         tempOrder: undefined,
        //         tempItem: undefined,
        //         itemNo: undefined,
        //         itemName: undefined,
        //         productNo: undefined,
        //         machine: undefined,
        //         moldingCycle: undefined,
        //         mouldNo: undefined,
        //         materialGrade: undefined,
        //         scndProc: undefined,
        //         sum: undefined,
        //         picking: undefined,
        //         delivery: undefined,
        //         inv: undefined,
        //         secInv: undefined,
        //         planBill: {
        //             monday: {
        //                 day: {
        //                     weekDate: that.weekDate.mondayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.mondayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             },
        //             tuesday: {
        //                 day: {
        //                     weekDate: that.weekDate.tuesdayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.tuesdayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             },
        //             wednesday: {
        //                 day: {
        //                     weekDate: that.weekDate.wednesdayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.wednesdayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             },
        //             thursday: {
        //                 day: {
        //                     weekDate: that.weekDate.thursdayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.thursdayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             },
        //             friday: {
        //                 day: {
        //                     weekDate: that.weekDate.fridayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.fridayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             },
        //             saturday: {
        //                 day: {
        //                     weekDate: that.weekDate.saturdayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.saturdayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             },
        //             sunday: {
        //                 day: {
        //                     weekDate: that.weekDate.sundayDate,
        //                     clas: "01",
        //                     quantity: ""
        //                 },
        //                 night: {
        //                     weekDate: that.weekDate.sundayDate,
        //                     clas: "02",
        //                     quantity: ""
        //                 }
        //             }
        //         }
        //     });
        // }
    },
    watch: {
        // newListData: function(newValue, oldValue) {
        //     var that = this;
        //     if (that.watchFlag) {
        //         return;
        //     }
        //     newValue.every(function(el, i) {
        //         if (el.custName) {
        //             that.getOrderList(el.custName, i);
        //             that.watchFlag = true;
        //             return
        //         }
        //     })
        // }
    },
    mounted() {
        // this.getData();
    },
    destroyed() {
        // EventBus.$emit("setWeekDetailInfo", this.detailDataInfo);
    }
}