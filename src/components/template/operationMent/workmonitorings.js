export default {
    name: 'proMonitoring',
    data() {
        return {
            first_table_data : [],
            second_table_data : [],
            other_table_data : [],
            search_pageNum : undefined,
            search_pageSize : undefined,
            seach_info : {
                product_no : undefined,
                item_no : undefined,
                bill_sts : 1,
                end_time : undefined,
                workplan_no : undefined,
                week : undefined,
                issStartTime : undefined,
                issEndTime : undefined,
            },
            page_list : {
                page_size : 10,
                page_num : 1,
                total : 0,
            },
            stop_data : [],
            stop_data_info : {
                radio : "01",
                comment : undefined
            },
            new_custom : false,
            stop_custom : false,
            first_table_show : true,
            second_table_show : false,
            second_table_text_show : false,
            other_table_show : false,
            stop_show : false,
            sale_change_name : "first",
            iss_sts : "02",
        }
    },
    methods: {
        // 加载
        loadTable() {
            this.sale_change_name == "first" ? this.loadTableFirst() : this.loadTableOther();
        },

        // 查询
        search() {
            this.sale_change_name == "first" ? this.searchFirst() : this.loadTableOther();
            if(this.sale_change_name == "second") {
                this.second_table_text_show = false;
                this.second_table_show = true;
            }else{
                this.second_table_show = false;
                this.second_table_text_show = true;
            }
        },
        searchFirst() {
            var that = this;
            this.other_table_data = [];
            this.second_table_data = [];
            this.first_table_data = [];
            this.$ajaxWrap({
                type : "get",
                url : "/week/loadTable",
                data : {
                    issSts : that.iss_sts,
                    planIssSts : "100",
                    workplanNo : that.seach_info.workplan_no,
                    week : that.seach_info.week,
                    issStartTime : that.seach_info.issStartTime && this.$handleDateObject(that.seach_info.issStartTime),
                    issEndTime : that.seach_info.issEndTime && this.$handleDateObject(that.seach_info.issEndTime),
                    pageSize : that.search_pageSize || 10,
                    pageNum : that.search_pageNum || 1
                } ,
                callback : function(data){
                    that.first_table_data = data.data.page.list;
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                },
                error() {
                    //do error function
                }
            })
        },
        loadTableFirst() {
            var that = this;
            this.other_table_data = [];
            this.second_table_data = [];
            this.first_table_data = [];
            this.$ajaxWrap({
                type : "post",
                url : "/week/index",
                data : {
                    issSts : "02",
                    planIssSts : "100",
                    pageSize : that.search_pageSize || 10,
                    pageNum : that.search_pageNum || 1
                } ,
                callback : function(data){
                    that.first_table_data = data.data.page.list;
                    that.first_table_data.every(function(el) {
                    	return el.planIssSts = el.planIssSts + "%"
                    })
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                },
                error() {
                    //do error function
                }
            }) 
        },
        loadTableOther() {
            var that = this;
            this.other_table_data = [];
            this.second_table_data = [];
            this.first_table_data = [];
            this.$ajaxWrap({
                type : "get",
                url : "/bill/loadTable",
                data : {
                    productNo : that.seach_info.product_no ,
                    itemNo : that.seach_info.item_no,
                    billSts : that.seach_info.bill_sts,
                    creStartTime : that.seach_info.start_time && this.$handleDateObject(that.seach_info.start_time),
                    creEndTime : that.seach_info.end_time && this.$handleDateObject(that.seach_info.end_time),
                    pageSize : that.search_pageSize || 10,
                    pageNum : that.search_pageNum || 1
                } ,
                callback : function(data){
                    if(that.seach_info.bill_sts == 1) {
                        that.second_table_data = data.data.page.list;
                    }else {
                        that.other_table_data = data.data.page.list;
                    }
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                },
                error() {
                    //do error function
                }
            }) 
        },
        // 重置
        reset() {
            var _seach_info_bill_sts = this.this.seach_info.bill_sts;
            this.$clearObject(this.seach_info);
            this.seach_info.bill_sts = _seach_info_bill_sts;
        },
        // 刷新
        refresh() {
            this.reset();
            this.loadTable();
        },

        // 终止
        stopWorkInfo(id) {
            var that = this;
            this.stop_data = [];
            this.stop_custom = true;
            this.$ajaxWrap({
                type : "post",
                url : "/bill/billDetail",
                data : {
                    workplanBillId : id
                } ,
                callback : function(data){
                    that.stop_data.push(data.data.data);
                },
                error() {
                    //do error function
                }
            }) 
        },

        // 终止提交
        stopWork() {
            var that = this;
            if(this.stop_data_info.radio === "06") {
                if(!this.stop_data_info.comment) {
                    this.$message({
                        message: "请填写其他原因",
                        type: "warning"
                    });
                    return;
                }
            }
            this.$ajaxWrap({
                type : "post",
                url : "/bill/operationWorkOrderBill",
                data : {
                    workplanBillId : that.stop_data[0].workplanBillId,
                    billNo : that.stop_data[0].billNo,
                    clas : that.stop_data[0].clas,
                    actQuantity : that.stop_data[0].quantity,
                    date : that.stop_data[0].weekDate,
                    worker : that.stop_data[0].worker,
                    trmtTyp : that.stop_data_info.radio,
                    comment : that.stop_data_info.comment
                } ,
                callback : function(data){
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.stop_custom = false;
                    that.that = [];
                    that.loadTable();
                },
                error(data) {
                    
                }
            })
        },

        showDetail(id) {
            console.log(id)
            this.$goRoute("/home/workmonitoringinfo")
            this.EventId = {
                id : id
            };
        },

        showTable() {
            switch (this.seach_info.bill_sts) {
                case 0:
                    this.first_table_show = true;
                    this.second_table_show = false;
                    this.second_table_text_show = false;
                    this.other_table_show = false;
                    this.loadTable();
                    break;
                case 1:
                    this.first_table_show = false;
                    this.second_table_show = false;
                    this.second_table_text_show = true;
                    this.other_table_show = false;
                    this.loadTable();
                    break;
                case 2:
                    this.first_table_show = false;
                    this.second_table_show = false;
                    this.second_table_text_show = false;
                    this.other_table_show = true;
                    this.loadTable();
                    break;
            }
        },

        // table切换
        changeTableActive(val) {
            switch (val.name) {
                case "first":
                    this.seach_info.bill_sts = 0;
                    this.showTable();
                    this.loadTable();
                    break;
                case "second":
                    this.seach_info.bill_sts = 1;
                    this.showTable();
                    this.loadTable();
                    break;
                case "other":
                    this.seach_info.bill_sts = 2;
                    this.showTable();
                    this.loadTable();
                    break;
            }
        },

        handleClose(done) {
            var that = this;
            this.$confirm("确定关闭吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                that.stop_custom = false;
                that.$clearObject(that.ruleForm);
                that.newListData = [];
                that.stop_data = [];
                done();
            }).catch(function() {});
        },

        searchFormData(pageval, pagesize) {
            var that = this;
            if (pagesize === "num") {
                that.search_pageNum = pageval || that.page_list.page_num;
                that.search_pageSize = that.page_list.page_size;
            } else {
                that.search_pageNum = that.page_list.page_num;
                that.search_pageSize = pageval || that.page_list.page_size;
            }
            that.loadTable();
        },
        // 分页
        handleSizeChange(val) {
            this.searchFormData(val, "size");
        },
        // -----------------------------------------------------------------------------------------------------------------------------------      
        handleCurrentChange(val) {
            this.searchFormData(val, "num");
        },
    },
    mounted(){
        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    },
    destroyed() {
        EventBus.$emit("setInfoId", this.EventId);
    }
}
