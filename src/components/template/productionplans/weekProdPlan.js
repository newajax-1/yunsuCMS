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

            // 周计划 新建
            create_new_plan: undefined,

            // 周计划 模态框显示
            modal_show_tips: false,
            modal_title: undefined,

            // 周计划 模态框表格数据
            modal_weekplan_table_data: [],

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
            modal_table_edit: false
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
                let is_tips = el.issSts === "01" ? true : false;
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

        openWeekplanPlanModal(modal_title, plan_id) {
            this.modal_title = modal_title;
            this.modal_show_tips = true;
            this.create_new_plan = modal_title === "新建周计划" ? "create" : "modify";

            this.getModalData(plan_id);
        },

        aboutWeekplanWarn(tips, done) {
            let that = this;

            that.$alert(tips, '提示', {
                confirmButtonText: '确定',
                callback() {
                    if (typeof done === "function") done();
                    that.refresh();
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
                    that.aboutWeekplanWarn("删除成功！")
                }
            });
        },

        // 周计划表格 下发
        operationWeekplan(plan_id, index) {
            var that = this;

            that.$ajaxWrap({
                type: "post",
                url: "week/operationWeekStatus",
                data: {
                    workplanWeekId: plan_id
                },
                success(res) {
                    that.aboutWeekplanWarn("下发成功！", function() {
                        that.weekplan_push_tips[index].show = false;
                    })
                }
            })
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
                that.$ajaxWrap({
                    url: "week/queryWeekList",
                    data: {
                        workplanWeekId: plan_id
                    },
                    success(res) {
                        that.loadModalTableData(res.data);
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
                this.createWorkPlan();
            }
        },

        createWorkPlan() {
            let that = this,
                plan_bill = that.modal_plan_bill,
                table_row_data = {};
            that.modal_table_row_data.planBill = plan_bill;

            for (let key in that.modal_table_row_data) {
                table_row_data[key] = that.modal_table_row_data[key];
            }

            that.modal_weekplan_table_data.push(table_row_data);
        },

        confirmCloseModal() {
            let that = this;

            if (that.modal_weekplan_table_data.length) {
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

        clearModalForm() {
            let that = this;
            that.modal_show_tips = false;
            that.modal_weekplan_table_data = [];

            that.refresh();
        },

        weekplanModalData(data) {
            console.log(data);
        },

        handleSelectionChange() {

        },

        openWeekplanInfo(weekplan_id) {
            console.log(weekplan_id);
        }
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