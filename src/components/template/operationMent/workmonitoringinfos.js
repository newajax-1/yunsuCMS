export default {
    name: 'proMonitoring',
    data() {
        return {
            detail_data : [
            ],
            week_detail :{

            },

            worker_list : [],

            batch_ids : undefined,

            update_data : [],
            seach_info : {
                issUsrName : undefined,
                creStartTime : undefined,
                creEndTime : undefined,
                issStartTime : undefined,
                issEndTime : undefined,
            },
            update_custom : false,
            show_operation : false,
            workplan_week_id : undefined,
            update_title : undefined,
            show_update_title : undefined,
            worker : [],
            workplan_id : undefined,
            iss_sts : "01",
        }
    },
    created() {
        this.workplan_week_id = this.$route.query.workplan_week_id;
        this.week = this.$route.query.week;
        this.init();
    },
    methods: {
        init() {
            this.loadTable();
        },

        // 加载
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type : "get",
                url : "/week/queryWeekList",
                data : {
                    workplanWeekId : that.workplan_week_id,
                    billIssSts : 0,
                    indexOfWeek : that.week.match(/[1-9][0-9]*/g)[0]
                } ,
                success : function(data){
                    that.week_detail = data.data.data;
                    that.detail_data = data.data.dataList;
                    for(var i = 0; i < that.detail_data.length; i++) {
                        switch(that.detail_data[i].type) {
                            case "01" :
                                that.detail_data[i].type = "生产";
                                break;
                            case "02" :
                                that.detail_data[i].type = "库存";
                                break;
                        };
                        switch(that.detail_data[i].lv) {
                            case "01" :
                                that.detail_data[i].lv = "高";
                                break;
                            case "02" :
                                that.detail_data[i].lv = "中";
                                break;
                            case "03" :
                                that.detail_data[i].lv = "低";
                                break;
                        };
                        switch(that.detail_data[i].scndProc) {
                            case "01" :
                                that.detail_data[i].scndProc = "印刷";
                                break;
                            case "02" :
                                that.detail_data[i].scndProc = "喷涂";
                                break;
                            case "03" :
                                that.detail_data[i].scndProc = "焊接";
                                break;
                            case "04" :
                                that.detail_data[i].scndProc = "贴膜";
                                break;
                            case "05" :
                                that.detail_data[i].scndProc = "包覆";
                                break;
                            default :
                                that.detail_data[i].scndProc = "其他";
                                break;
                        };
                    }
                }
            }) 
        },

        // 修改的默认数据
        showUpdateInfo(id,index) {
            var that = this;
            this.workplan_id = id;
            this.update_custom = true;
            this.$ajaxWrap({
                type : "post",
                url : "/bill/queryBillListByBillId",
                data : {
                    workplanDetailId : id
                },
                callback : function(data) {
                    that.update_data = data.data.dataList;
                    that.update_data.every(function(el) {
                        return el.clas = el.clas == "01" ? "白班" : "夜班";
                    });
                    that.worker_list = data.data.empList;
                    that.update_data.every(function(el) {
                        return that.worker.push({
                            workplanBillId : el.workplanBillId,
                            worker : el.worker || "",
                            quantity : el.quantity
                        });
                    });
                }
            }) 
        },

        // 保存
        saveUpdateInfo() {
            var that = this;
            this.show_operation = true;
            this.$ajaxWrap({
                type : "post",
                url : "/bill/updateBillListByBillId",
                data : {
                    billList : that.worker,
                } ,
                callback : function(data){
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    // that.update_custom = false;
                    that.loadTable();
                }
            })
        },

        // 多条下发
        moreOperationWeek() {
            var that = this;
            if(!this.batch_ids || this.batch_ids == "") {
                this.$message({
                    message: "请选择下发数据",
                    type: "warning"
                });
                return;
            }
            this.$ajaxWrap({
                type : "post",
                url : "/bill/operationBillByIds",
                data : {
                    idList : that.batch_ids.split(",")
                } ,
                callback : function(data){
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.loadTable();
                }
            })
        },

        // 单条下发
        operationWeek(id) {
            var that = this;
            this.$confirm("确定下发吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                if(!id) {
                    that.saveUpdateInfo();
                }
                var _id = that.workplan_id || id;
                that.$ajaxWrap({
                    type : "post",
                    url : "/bill/operationBillListByDetailId",
                    data : {
                        workplanDetailId : _id
                    } ,
                    callback : function(data){
                        that.$message({
                            message: data.tipMsg,
                            type: "success"
                        });
                        that.loadTable();
                        that.update_custom = false;
                    }
                })
            }).catch(function() {});
                  
        },

        // 改变事件
        changeWeeker(id,workerName) {
            for(var i = 0; i < this.worker.length; i++) {
                if(this.worker[i].workplanBillId == id) {
                    this.worker[i].worker = workerName;
                }
            }
        },

        // table切换
        changeTableActive(val) {
            switch (val.name) {
                case "first":
                    this.loadTable();
                    break;
                case "second":
                    this.loadTable();
                    break;
                case "other":
                    this.loadTable();
                    break;
            }
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var _batch_ids = [];
            if(val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    _batch_ids.push(val[i].workplanDetailId);
                }
                this.batch_ids = _batch_ids.join(",");
            }else{
                this.batch_ids = "";
            }
        },

        handleClose(done) {
            var that = this;
            that.$confirm("确定关闭吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.update_custom = false;
            }).catch(function() {});
        },
    },
}
