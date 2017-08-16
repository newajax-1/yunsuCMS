export default {
    name: 'mouldTestPlan',
    created() {
        this.init();
    },
    data() {
        return {
            table_data : [],

            search_info : {
                mould_no : undefined,
                mould_code : undefined,
                start_time : undefined,
                end_time : undefined,
            },

            page_list : {
                page_num : 1,
                page_size : 10,
                total : 0
            },
            table_show : true,
            save_id : undefined,

            select_op_one : [],
            select_op_second : [],
            select_op_third : [],

            add_info : {
                dicName : undefined,
                dicValue : undefined,
                testMouldTyp : undefined,
                manager : undefined,
                mouldCode : undefined,
                mouldNo : undefined,
                testTm : undefined,
            },

            search_pageNum : undefined,
            search_pageSize : undefined,
            diag_title : undefined,

            plan_sts : "2",

            sale_change_name : "first",
            new_custom : false,
        }
    },
    methods: {
        init() {
            this.reset();
            this.getTableData();
        },

        getTableData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "/testMouldPlan/queryList",
                data: {
                    planSts : that.plan_sts,
                    pageNum: "1",
                    pageSize: "10"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        searchTableData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "/testMouldPlan/queryList",
                data: {
                    planSts : that.plan_sts,
                    mouldNo : that.search_info.mould_no,
                    mouldCode : that.search_info.mould_code,
                    startTime : that.search_info.start_time && that.$handleDateObject(that.search_info.start_time),
                    endTime : that.search_info.end_time && that.$handleDateObject(that.search_info.end_time),
                    pageNum: that.search_pageNum || "1",
                    pageSize: that.search_pageNum || "10"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            that.table_data = data.page.list;
            that.page_list.page_num =  data.page.pageNum;
            that.page_list.page_list =  data.page.pageList;
            that.page_list.total =  data.page.total;
        },

        // 重置
        reset() {
            this.$clearObject(this.search_info);
        },

        // 重置  
        refresh() {
            this.$clearObject(this.search_info);
            this.getTableData();
        },

        deleteIds() {

        },

        // 弹框
        toAdd(id) {
            let that = this;
            this.diag_title = (id ? "修改试模计划" : "新增试模计划")
            this.$clearObject(this.add_info);
            this.save_id = id;

            this.$ajaxWrap({
                type: "get",
                url: "/testMouldPlan/toInsertOrEdit",
                data: {
                    id : id
                },
                success(res) {
                    that.select_op_one = res.data.dataList;
                    that.select_op_second = res.data.managers;
                    that.select_op_third = res.data.moulds;
                    if(id) {
                        that.add_info = res.data.data;
                    }
                }
            })
            this.new_custom = true;
        },

        // 保存
        saveInfo() {
            let that = this;
            var _test_tm = (typeof(that.add_info.testTm) == "object" ? that.$handleDateObjectTime(that.add_info.testTm) : that.add_info.testTm)
            
            this.$ajaxWrap({
                type: "post",
                url: "/testMouldPlan/insertOrEdit",
                data: {
                    testMouldPlanId : that.save_id,
                    testMouldTyp : that.add_info.testMouldTyp,
                    manager : that.add_info.manager,
                    mouldNo : that.add_info.mouldNo,
                    mouldCode : that.add_info.mouldCode,
                    testTm : _test_tm,
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.new_custom = false;
                    that.getTableData();
                }
            })
        },

        // 删除
        deleteId(id, val) {
            let that = this;
            var _name = (id == 1 ? "下发" : "删除")
            var _ids = (val ? val : that.batch_ids);

            this.$confirm("你确定" + _name + "吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "/testMouldPlan/deleteOrOprOption",
                    data: {
                        type : id,
                        ids : _ids
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.getTableData();
                    }
                })
            }).catch(function() {});
            
        },

        // 完成
        successMould(id) {
            let that = this;

            that.$ajaxWrap({
                type: "get",
                url: "/testMouldPlan/finishOpt",
                data: {
                    id : id
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.getTableData();
                }
            })
        },

        // 切换类型
        changeType(val) {
            if(this.select_op_third.length == 0) {
                return;
            }
            for(var i = 0; i < this.select_op_third.length; i++) {
                if(this.select_op_third[i].mould_no == val) {
                    this.add_info.mouldCode = this.select_op_third[i].mould_code;
                };
            };
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            if(val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].testMouldPlanId);
                }
                this.batch_ids = batch_ids.join(",");
            }else{
                this.batch_ids = undefined;
            }
        },

        // table切换
        changeTableActive(val) {
            this.show_other = (val.name == "first" || !val ? true : false);
            switch (val.name) {
                case "first":
                    this.plan_sts = "2";
                    this.table_show = true;
                    this.getTableData();
                    break;
                case "second":
                    this.plan_sts = "1";
                    this.table_show = false;
                    this.getTableData();
                    break;
                default : 
                    this.plan_sts = "2";
                    this.table_show = true;
                    this.getTableData();
                    break;
            }
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_custom = false;
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
            that.searchTableData();
        },

        // 分页
        handleSizeChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "size");
            };
        },
        // -----------------------------------------------------------------------------------------------------------------------------------      
        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
        },
    },
}
