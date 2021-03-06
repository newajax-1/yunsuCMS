export default {
    name: 'mouldInfo',
    created() {
        this.init();
    },
    data() {
        return {
            first_data: [],
            second_data: [],
            third_data: [],
            check_data: [],

            page_list: {
                page_num: 1,
                page_size: 15,
                total: 0
            },

            check_result: [{
                name: "通过",
                value: "01"
            }],

            show_table: {
                first_show: true,
                second_show: false,
                third_show: false,
            },

            search_info: {
                mould_no: undefined,
                mould_factory: undefined,
                cust_factory: undefined,
            },

            add_info: {

            },

            mould_typ: "01",
            sale_change_name: undefined,
            new_custom: false,
            old_id: undefined,
            batch_ids: undefined,
            search_pageNum: undefined,
            search_pageSize: undefined,

            show_list: [{
                show: true
            }],

            buttonsRightList : []
        }
    },
    methods: {
        init() {
            let temp = {}
            this.reset();
            this.sale_change_name = this.$route.query.tab_name;
            temp.name = this.sale_change_name || "first";
            temp.name !== "first" ? this.changeTableActive(temp) : this.getTableData(temp.name);
        },

        getTableData(tab_name) {
            if (tab_name) this.sale_change_name = tab_name;
            let that = this;
            this.$ajaxWrap({
                type: "post",
                url: "/mould/loadTable",
                data: {
                    mouldTyp: that.mould_typ,
                    pageNum: "1",
                    pageSize: "15"
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
                url: "/mould/loadTable",
                data: {
                    mouldTyp: that.mould_typ,
                    mouldNo: that.search_info.mould_no,
                    mouldFactory: that.search_info.mould_factory,
                    custFactory: that.search_info.cust_factory,
                    pageNum: that.search_pageNum || "1",
                    pageSize: that.search_pageSize || "15"
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

                    that.show_list = [];
                    for (let i = 0; i < data.page.list.length; i++) {
                        let el = data.page.list[i];

                        that.show_list.push({
                            show: el.sourceType === "20" ? true : false
                        });
                    }

                    that.second_data = data.page.list;
                    break;
                case "03":
                    that.third_data = data.page.list;
                    break;
                default:
                    that.first_data = data.page.list;
                    break;
            };
            that.page_list.page_num = data.page.pageNum;
            that.page_list.page_list = data.page.pageList;
            that.page_list.total = data.page.total;
            that.buttonsRightList = data.button;
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

        deleteIds() {
            let that = this;
            if (!this.batch_ids.length) {
                this.$message({
                    message: "请选择删除的数据",
                    type: "warning"
                });
                return;
            };

            this.$ajaxWrap({
                type: "get",
                url: "/mould/queryProductByMouldId",
                data: {
                    ids : that.batch_ids
                },
                success(res) {
                    var _dataListTitle = "";
                    if(res.data.dataList && res.data.dataList.length > 0) {
                        _dataListTitle = "模具已经关联产品";
                    }
                    that.$confirm(_dataListTitle + "你确定删除吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                    }).then(function() {
                        that.$ajaxWrap({
                            type: "get",
                            url: "/mould/batchDeleteMould",
                            data: {
                                ids : that.batch_ids
                            },
                            success(res) {
                                that.$message({
                                    message: res.tipMsg,
                                    type: "success"
                                });
                                that.searchTableData();
                            }
                        })
                    }).catch(function() {});
                }
            })     
        },

        // 弹框
        toAdd(id) {
            let that = this;
            this.old_id = id;

            this.$ajaxWrap({
                type: "post",
                url: "/mould/acptMouldDetail",
                data: {
                    id: id
                },
                success(res) {
                    var _data = res.data.acptItemList
                    that.check_data = res.data.acptList;
                    for (var i = 0; i < that.check_data.length; i++) {
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
            for (var i = 0; i < that.check_data.length; i++) {
                if (that.check_data.length == 0) {
                    return;
                }
                if (typeof(that.check_data[i].endTm) === "object") {
                    that.check_data[i].endTm = that.$handleDateObject(that.check_data[i].endTm);
                }
                if (typeof(that.check_data[i].startTm) === "object") {
                    that.check_data[i].startTm = that.$handleDateObject(that.check_data[i].startTm);
                }
            }
            // if (_operationType == 2) {
            //     if (this.checkSussess() == 0) {
            //         return;
            //     };
            // };
            this.$ajaxWrap({
                type: "post",
                url: "/mould/acptMould",
                data: {
                    id: that.old_id,
                    acptList: that.check_data,
                    operationType: _operationType
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
        deleteId(id) {
            let that = this;

            this.$ajaxWrap({
                type: "get",
                url: "/mould/queryProductByMouldId",
                data: {
                    id : id
                },
                success(res) {
                    var _dataListTitle = "";
                    if(res.data.dataList && res.data.dataList.length > 0) {
                        _dataListTitle = "模具已经关联产品";
                    }
                    that.$confirm(_dataListTitle + "你确定删除吗？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                    }).then(function() {
                        that.$ajaxWrap({
                            type: "get",
                            url: "/mould/deleteMould",
                            data: {id : id},
                            success(res) {
                                that.$message({
                                    message: res.tipMsg,
                                    type: "success"
                                });
                                that.searchTableData();
                            }
                        })
                    }).catch(function() {});
                }
            })
        },

        // 详情
        showDetail(id, val) {
            var _url = (val == "new" ? "/home/mouldinfonewdetail" : "/home/mouldinfosuccessdetail");
            this.$goRoute(_url, {
                mould_id: id,
                tab_name: this.sale_change_name
            })
        },

        // 增加
        addMouldDetail(id, val) {
            this.$goRoute("/home/addmouldinfo", {
                mould_id: id,
                source_type: val,
                mould_path: "01"
            });
        },

        // 改变事件
        changeAcptRslt(id, acpt_rslt) {
            for (var i = 0; i < this.check_data.length; i++) {
                if (this.check_data[i].dicOrder == id) {
                    this.check_data[i].acptRslt = acpt_rslt;
                }
            }
        },

        changeAcceptor(id, _acceptor) {
            for (var i = 0; i < this.check_data.length; i++) {
                if (this.check_data[i].dicOrder == id) {
                    this.check_data[i].acceptor = _acceptor;
                }
            }
        },
        changeStartTm(id, _start_tm) {
            for (var i = 0; i < this.check_data.length; i++) {
                if (this.check_data[i].dicOrder == id) {
                    this.check_data[i].startTm = _start_tm;
                }
            }
        },
        changeEndTm(id, _end_tm) {
            for (var i = 0; i < this.check_data.length; i++) {
                if (this.check_data[i].dicOrder == id) {
                    this.check_data[i].endTm = _end_tm;
                }
            }
        },

        // 复选框勾选
        handleSelectionChange(val) {
            this.batch_ids = undefined;
            if (val.length > 0) {
                var _batch_ids = [];
                for (var i = 0; i < val.length; i++) {
                    _batch_ids.push(val[i].id);
                }
                this.batch_ids = _batch_ids.join(",")
            } else {
                this.batch_ids = undefined;
            }
        },

        changeShow(obj) {
            if (obj.length == 0) {
                return;
            };
            for (var key in obj) {
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
                default:
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