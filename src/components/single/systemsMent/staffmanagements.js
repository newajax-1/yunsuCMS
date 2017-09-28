import Qs from 'qs'
export default {
    name: 'orgManagement',
    data() {

        return {
            table_data: [{}],
            work_table_data: [],
            search_pageNum: undefined,
            search_pageSize: undefined,

            // 弹框标题
            dialog_name: undefined,
            batch_ids: undefined,

            // 搜索信息
            search_info: {
                emp_no: undefined,
                emp_nm: undefined,
            },

            // 增加信息/修改时原始数据和详情数据存放
            initial_info: {
                empId: undefined,
                empNo: undefined,
                empNm: undefined,
                password: undefined,
            },

            // 分页数据
            page: {
                page_num: 1,
                page_size: 10,
                total: 0,
            },
            show_emp_id: false,
            new_custom: false,
            details_custom: false,
        }
    },
    methods: {

        // 加载数据
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type: "post",
                url: "/emp/queryList",
                data: {
                    pageNum: that.search_pageNum || 1,
                    pageSize: that.search_pageSize || 10,
                    empNo: that.search_info.emp_no,
                    empNm: that.search_info.emp_nm,
                },
                success: function(data) {
                    that.table_data = data.data.page.list;
                    that.page.total = data.data.page.total;
                    that.page.page_num = data.data.page.pageNum;
                    that.page.page_size = data.data.page.pageSize;

                    for (let i = 0; i < that.table_data.length; i++) {
                        let el = that.table_data[i];
                        el.index = (that.page.page_size * (that.page.page_num - 1)) + i + 1
                    }

                },
                error() {
                    //do error function
                }
            })
        },

        // 新增弹框显示
        showDialog(id) {
            var that = this;
            this.new_custom = true;
            this.show_emp_id = false;
            this.$clearObject(this.add_info);
            this.$clearObject(this.initial_info);
            id ? (this.dialog_name = "修改员工") : (this.dialog_name = "增加员工");
            if (id) {
                this.show_emp_id = true,
                    this.$ajaxWrap({
                        type: "get",
                        url: "/emp/getObject",
                        data: {
                            empId: id
                        },
                        callback: function(data) {
                            that.initial_info = data.data.data;
                            that.initial_info.password = undefined;
                        },
                        error() {
                            //do error function
                        }
                    })
            }
        },

        // 查询
        search() {
            this.loadTable()
        },

        // 重置
        reset() {
            this.$clearObject(this.search_info);
        },

        // 刷新
        refresh() {
            this.$clearObject(this.search_info);
            this.loadTable();
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var that = this;
            if (val.length != 0) {
                var arr = [];
                val.every(function(el) {
                    return arr.push(el.empId)
                })
                that.batch_ids = arr.join(",")
            } else {
                that.batch_ids = undefined;
            }
            console.log(that.batch_ids)
        },
        // 删除多条
        deleteInfo() {

        },

        // 删除单条
        deleteOneInfo(id) {
            var that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "/emp/deleteById",
                    data: {
                        empId: id
                    },
                    callback: function(data) {
                        that.loadTable();
                        that.$message({
                            message: data.tipMsg,
                            type: "success"
                        });
                    },
                    error() {

                    }
                })
            }).catch(function() {});
        },

        // 保存信息
        saveInfo() {
            var that = this;
            var _flag = undefined;
            if (this.show_emp_id) {
                _flag = !that.initial_info.empNo || !that.initial_info.empNm;
            } else {
                _flag = !that.initial_info.empNo || !that.initial_info.empNm || !that.initial_info.password
            }
            if (_flag) {
                this.$message({
                    message: "请将信息填写完整",
                    type: "warning"
                });
                return;
            }

            this.$ajaxWrap({
                type: "post",
                url: "/emp/save",
                data: {
                    empId: that.initial_info.empId || "",
                    empNo: that.initial_info.empNo,
                    empNm: that.initial_info.empNm,
                    password: that.initial_info.password,
                },
                callback: function(data) {
                    that.new_custom = false;
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.loadTable();
                },
                error(data) {

                }
            })
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

        // 详情查询
        detailSearch(id) {
            let that =  this;
            that.$goRoute('/home/workLoadInfo',{ empNo: id });
        },

        // 详情刷新
        detailrefresh() {

        },

        // 导出
        detailExport() {

        },

        searchFormData(pageval, pagesize) {
            var that = this;
            if (pagesize === "num") {
                that.search_pageNum = pageval || that.page.page_num;
                that.search_pageSize = that.page.page_size;
            } else {
                that.search_pageNum = that.page.page_num;
                that.search_pageSize = pageval || that.page.page_size;
            }
            that.loadTable();
        },

        // 改变分页数目的时候调用
        handleSizeChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "size");
            };
        },

        //改变页码的时候调用
        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
        },

    },
    //当加载页面的时候调用
    mounted() {
        this.loadTable();
    }
}