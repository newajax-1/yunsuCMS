import Qs from 'qs'

export default {
    name: 'weekProdPlan',
    data() {
        return {

            // 查询条件 
            searchForm : {
                issUsr: '',
                creStartTime: '',
                creEndTime: '',
                issStartTime: '',
                issEndTime: '',
            },

            // 加载表格
            tableData: [{}],

            // 新增对话框
            newCustom: false,

            // 下发 与 详情显示
            showInfo: [{
                show: true
            }],

            // 设置tab默认显示
            activeTab: 'first',

            // 修改对话框
            modifysaleplan: false,

            // 可编辑表格
            isDisabled: false,

            // 新增按钮显示 
            isAddPlanBtn : true,
            isSaveNewPlan : true,

            // 新增页面表格数据组
            newListData: [],

            // 新增页排產計劃 周信息
            weekDate: [],

            // 数据表格的id
            tempID: '',
            
            // 数据表格的title
            titleValue: '新增',
            
            // 表格渲染对象
            SysDicListInfo: {
                processList : [],
                typeList : [],
                priorityList : [],
                custList : []
            },

            // 周计划时间
            PlanBill : {
            },

            // 修改客户计划
            ModifyGuestInfo: null,
            ModifyFormData: null,
            
            //全选框获取ID
            batchIds: '',

            //弹框是否关闭
            dialogVisible: false,
            deleteMsg:'',
            tipMsg:''
        }
    },

    methods: {

        // 获取数据数据表格
        getData() {
            var that = this;
            that.$ajax({
                method: 'post',
                url: 'week/index',
                transformRequest: [function(data) {　　
                    data = JSON.stringify({
                        pageNum:"1",
                        pageSize:"10"
                    });
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(results) {
                var data = results.data;
                if (data.success === true) {
                    that.loadTable(data);
                }
            }).catch(function(error) {
                console.log(error);
            });
        },

        // 加载数据
        loadTable(data) {
            var that = this,
                loadData = data.data.page;
            that.showInfo = [];

            loadData.list.every(function(el) {
                var flag = el.issSts === "01" ? true : false;
                el.issSts = el.issSts === "01" ? '未下发' : '已下发';
                return that.showInfo.push({ show: flag });
            })
            that.tableData = loadData.list;
        },

        // 查询
        search(type) {
            var that = this,
                searchData = that.searchForm;

            searchData.pageSize = '10';
            searchData.pageNum = '1';
            searchData.issSts = type;

            for (var key in searchData) {
                if (typeof searchData[key] === "object") {
                    searchData[key] = (searchData[key].toLocaleDateString()).replace(/\//g, "-");
                }
            }

            that.$ajax.get('week/loadTable', {
                params: searchData
            }).then(function(res) {
                var data = res.data;
                if (data.success) {
                    that.loadTable(data);
                }
            }).catch(function(err) {
                console.log(err);
            });
        },

        // 重置
        reset() {
            var that = this;
            that.$clearObject(that.searchForm);
        },

        // 刷新
        refresh() {
            var that = this;
            that.$clearObject(that.searchForm);
            that.getData();
        },

        // 新增周计划页面
        openAddWeekPlan() {
            var that = this;
            that.newCustom = true;
            that.$ajax.get('week/queryWeekList').then(function(res) {
                 if(res.data.success){
                    that.loadWeekPlanTable(res.data.data)
                 }
            })
        },

        loadWeekPlanTable(data){
            this.weekDate = data.data;
            this.SysDicListInfo = data;
            this.isAddPlanBtn = true;
            this.isSaveNewPlan = false;
            this.newListData = [];
            this.addWorkplan();
        },

        saveWeekNewPlan(){
            this.isAddPlanBtn = false;
            this.isSaveNewPlan = true;
            this.isDisabled = true;
            console.log(this.newListData)
        },

        // 根据下发类型展示数据
        changeTableEffective(tab) {
            switch (tab.name) {
                case 'first':
                    this.search();
                    break;
                case 'second':
                    this.search("01");
                    break;
                case 'third':
                    this.search("02");
                    break;
            }
        },

        // 数据表格 下发Event
        operationWeek(id, index) {
            var that = this;
            that.$ajax({
                    method: 'post',
                    url: 'week/operationWeekStatus',
                    transformRequest: [function(data) {　　
                        data = JSON.stringify({
                            workplanWeekId: id,
                        });
                        return data;
                    }],
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(function(results) {
                    var data = results.data;
                    if (data.success) {
                        that.showInfo[index].show = false
                        that.search();
                    }
                })
        },

        // 修改模态框
        updateWeek(id) {
            var that = this;
            that.$ajax.get('week/queryWeekList',{
                params: {
                    workplanWeekId: id
                }
            }).then(function(res) {
                that.titleValue = "编辑";
                that.modifysaleplan = true;
                that.tempID = id;
                that.ModifyGuestInfo = res.data.data.dataList;
                that.SysDicListInfo = null;
                that.SysDicListInfo = res.data.data;
            });            
        },



        // 刪除周計劃
        deletelWeek(id) {
            var that = this;
            that.$ajax({
                method: 'post',
                url: 'week/deleteById',
                transformRequest: [function(data) {　　
                    data = JSON.stringify({
                        workplanWeekId: id,
                    });
                    return data;
                }],
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(results) {
                var data = results.data;
                if (data.success === true) {
                    that.search();
                }
            })
        },
        
        // 修改
        lodeModifyInfo() {
            var that = this;
            that.$ajax.get('plan/updatePlanOnclick', {
                params: {
                    planId: that.tempID
                }
            }).then(function(res) {
                that.ModifyGuestInfo = res.data.data.dataList;
                that.ModifyFormData = res.data.data.data;
                that.newListData = that.ModifyFormData.planDetailList;
            })
        },

        // 详情
        detailplan(id) {
            var that = this;
            that.$ajax.get('plan/detailPlan', {
                params: {
                    planId: id
                }
            }).then(function(res) {
                that.$goRoute("saleplaninfo")
                that.EventData = {
                    data: res.data.data.data,
                    list: res.data.data.dataList
                }
            })
        },

        // 下发周计划
        opearationWeekplan(){
          var that = this;
          var tempObj = {
                  workplanWeekId:"1"
                }
               that.$ajax({
                   method: 'post',
                   url: 'week/operationWeekStatus',
                   transformRequest: [function(data) {　　
                       data = JSON.stringify(tempObj);
                       return data;
                   }],
                   headers: {
                       'Content-Type': 'application/json'
                   }
               }).then(function(results) {
                   that.newListData = [];
               })
        },

        deleteObject(){
            var that = this;
            var dataList = that.dataList;
            var tempObj = {
                idList: dataList
            }
            that.$ajax({
                method: 'post',
                url: "/week/operationWeek",
                transformRequest: [function(data) {　
                    data = JSON.stringify(tempObj);
                    return data;
                }] ,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (data) {
                console.log(data);
                if(data.data.success){
                  alert("删除成功");
                  that.dialogVisible = false;
                }else{
                 alert("删除失败");
                 that.dialogVisible = false;
                }
            })
        },

        //删除排产计划、排产班次
        batchDeleteWorkplanData(){
          var that = this;
            if (that.batchIds == "") {
              alert("请选择您要删除的数据");
              return;
            }
            that.deleteMsg="您确定要删除这些数据吗？";
            that.dataList=that.batchIds;
            that.dialogVisible=true;          
        },

        // 批量删除 获取被选中的排产计划id
        handleSelectionChange(id,index) {
            var val = [];
            val.push(id);
            val.push(index);
            this.batchIds = val;
        },

        // 新增 排产计划
        addWorkplan(){
            var that = this;
            that.newListData.push({
                type        :null,
                lv          :null,
                custName    :null,
                ordrNo      :"",
                itemNo      :"",
                itemName    :"",
                productNo   :"",
                machine     :"",
                moldingCycle:"",
                mouldNo     :"",
                materialGrade:"",
                scndProc    :null,
                PlanBill    :{
                    monday : {
                        day:{
                            weekDate: that.weekDate.mondayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.mondayDate,
                            clas: "02",
                            quantity: ""
                        }
                    },
                    tuesday : {
                        day:{
                            weekDate: that.weekDate.tuesdayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.tuesdayDate,
                            clas: "02",
                            quantity: ""
                        }
                    },
                    wednesday : {
                        day:{
                            weekDate: that.weekDate.wednesdayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.wednesdayDate,
                            clas: "02",
                            quantity: ""
                        }
                    },
                    thursday : {
                        day:{
                            weekDate: that.weekDate.thursdayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.thursdayDate,
                            clas: "02",
                            quantity: ""
                        }
                    },
                    friday : {
                        day:{
                            weekDate: that.weekDate.fridayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.fridayDate,
                            clas: "02",
                            quantity: ""
                        }
                    },
                    saturday : {
                        day:{
                            weekDate: that.weekDate.saturdayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.saturdayDate,
                            clas: "02",
                            quantity: ""
                        }
                    },
                    sunday : {
                        day:{
                            weekDate: that.weekDate.sundayDate,
                            clas: "01",
                            quantity: ""
                        },
                        night:{
                            weekDate: that.weekDate.sundayDate,
                            clas: "02",
                            quantity: ""
                        }
                    }
                },
                sum         :"",
                picking     :"",
                delivery    :"",
                inv         :"",
                secInv      :""
            });
        }
    },
    mounted() {
        this.getData();
    }
}