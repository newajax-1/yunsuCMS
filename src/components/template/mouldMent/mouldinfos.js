export default {
    name: 'mouldInfo',
    created() {
        this.init();
    },
    data() {
        return {
            first_data : [],
            second_data : [],
            third_data : [],
            check_data : [],

            page_list : {
                page_num : 1,
                page_size : 10,
                total : 0
            },

            check_result : [
                {
                    name : "通过",
                    value : "01"
                }
            ],

            show_table : {
                first_show : true,
                second_show : false,
                third_show : false,
            },

            search_info : {
                mould_no : undefined,
                mould_factory : undefined,
                cust_factory : undefined,
            },

            add_info : {
                
            },

            mould_typ : "01",
            sale_change_name : "first",
            new_custom : false,
            old_id : undefined,
            batch_ids : undefined,
            search_pageNum : undefined,
            search_pageSize : undefined,
        }
    },
    methods: {
        init() {
            this.reset();
            this.getTableData();
        },

        getTableData() {
            let that = this;
            
            this.$ajaxWrap({
                type: "post",
                url: "/mould/queryList",
                data: {
                    mouldTyp : that.mould_typ,
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

            this.$ajaxWrap({
                type: "post",
                url: "/mould/queryList",
                data: {
                    mouldTyp : that.mould_typ,
                    mouldNo : that.search_info.mould_no,
                    mouldFactory : that.search_info.mould_factory,
                    custFactory : that.search_info.cust_factory,
                    pageNum: that.search_pageNum || "1",
                    pageSize: that.search_pageSize || "10"
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            that.first_data = [];
            that.second_data = [];
            that.third_data = [];
            switch (that.mould_typ) {
                case "01":
                    that.first_data = data.page.list;
                    break;
                case "02":
                    that.second_data = data.page.list;
                    break;
                case "03":
                    that.third_data = data.page.list;
                    break;
                default :
                    that.first_data = data.page.list;
                    break;
            };
            that.page_list.page_num = data.page.pageNum;
            that.page_list.page_list = data.page.pageList;
            that.page_list.total = data.page.total;
            
        },

        // 重置
        reset() {
            this.$clearObject(this.search_info);
        },

        // 刷新  
        refresh() {
            this.$clearObject(this.search_info);
            this.getTableData();
        },

        deleteIds(id) {
            let that = this;
            if (!this.batch_ids) {
                this.$message({
                    message: "请选择删除的数据",
                    type: "warning"
                });
                return;
            };
            var _data = {};
            if(id) {
                _data = { id : id }
            }else{
                _data = { ids : this.batch_ids}
            };

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "/mould/deleteMould",
                    data: _data,
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.searchTableData();
                    }
                })
            }).catch(function() {});
        },

        // 弹框
        toAdd(id) {
            let that = this;
            this.old_id = id;

            this.$ajaxWrap({
                type: "post",
                url: "/mould/acptMouldDetail",
                data: {
                    mouldId : id
                },
                success(res) {
                    var _data = res.data.acptItemList
                    that.check_data = res.data.acptList;
                    for(var i = 0; i <  that.check_data.length; i++) {
                        var _name = _data[i].dicName;
                        var _value = _data[i].dicValue;
                        that.check_data[i].acptItm = _name;
                        that.check_data[i].dicOrder = _value;
                    }
                }
            })
            this.new_custom = true;
        },

        // 保存
        saveInfo(val) {
            let that = this;
            var _operationType = val;
            for(var i = 0; i < that.check_data.length; i++) {
                if(that.check_data.length == 0) {
                    return;
                }
                if(typeof(that.check_data[i].endTm) === "object") {
                    that.check_data[i].endTm = that.$handleDateObject(that.check_data[i].endTm);
                }
                if(typeof(that.check_data[i].startTm) === "object") {
                    that.check_data[i].startTm = that.$handleDateObject(that.check_data[i].startTm);
                }
            }
            if(_operationType == 2) {
                if(this.checkSussess() == 0) {
                    return;
                };
            };
            this.$ajaxWrap({
                type: "post",
                url: "/mould/acptMould",
                data: {
                    mouldId : that.old_id,
                    acptList : that.check_data,
                    operationType : _operationType
                },
                success(res) {
                    
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.new_custom = false;
                    that.getTableData();
                },
                error(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "warning"
                    });
                }
            })
        },

        // 转成品验证
        checkSussess() {
            if(this.check_data.length == 0) {
                return 0;
            };
            for(var i = 0; i < this.check_data.length; i++) {
                if(!this.check_data[i].acptRslt) {
                    this.$message({
                        message: "请将信息填写完整后转成品",
                        type: "warning"
                    });
                    return 0;
                };
                if(!this.check_data[i].acceptor) {
                    this.$message({
                        message: "请将信息填写完整后转成品",
                        type: "warning"
                    });
                    return 0;
                };
                if(!this.check_data[i].startTm) {
                    this.$message({
                        message: "请将信息填写完整后转成品",
                        type: "warning" 
                    });
                    return;
                };
                if(!this.check_data[i].endTm) {
                    this.$message({
                        message: "请将信息填写完整后转成品",
                        type: "warning"
                    });
                    return 0;
                };
            };
        },

        // 删除
        deleteId(id) {

        },

        // 详情
        showDetail(id, val) {
            var _url = (val == "new" ? "/home/mouldinfonewdetail" : "/home/mouldinfosuccessdetail");
            this.$goRoute(_url, {
                mould_id : id
            })
        },

        // 增加
        addMouldDetail(id) {
            this.$goRoute("/home/addmouldinfo", {
                mould_id : id
            });
        },

        // 改变事件
        changeAcptRslt(id,acpt_rslt) {
            for(var i = 0; i < this.check_data.length; i++) {
                if(this.check_data[i].dicOrder == id) {
                    this.check_data[i].acptRslt = acpt_rslt;
                }
            }
        },

        changeAcceptor(id,_acceptor) {
            for(var i = 0; i < this.check_data.length; i++) {
                if(this.check_data[i].dicOrder == id) {
                    this.check_data[i].acceptor = _acceptor;
                }
            }
        },
        changeStartTm(id,_start_tm) {
            for(var i = 0; i < this.check_data.length; i++) {
                if(this.check_data[i].dicOrder == id) {
                    this.check_data[i].startTm = _start_tm;
                }
            }
        },
        changeEndTm(id,_end_tm) {
            for(var i = 0; i < this.check_data.length; i++) {
                if(this.check_data[i].dicOrder == id) {
                    this.check_data[i].endTm = _end_tm;
                }
            }
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            if(val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].mouldId);
                }
                this.batch_ids = batch_ids.join(",");
            }else{
                this.batch_ids = undefined;
            }
        },

        changeShow(obj) {
            if(obj.length == 0 ) {
                return;
            };
            for(var key in obj) {
                obj[key] = false;
            }
        },

        // table切换
        changeTableActive(val) {
            this.changeShow(this.show_table);
            switch (val.name) {
                case "first":
                    this.mould_typ = "01";
                    this.show_table.first_show = true;
                    this.getTableData();
                    break;
                case "second":
                    this.mould_typ = "02";
                    this.show_table.second_show = true;
                    this.getTableData();
                    break;
                case "third":
                    this.mould_typ = "03";
                    this.show_table.third_show = true;
                    this.getTableData();
                    break;
                default :
                    this.mould_typ = "01";
                    this.show_table.first_show = true;
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
