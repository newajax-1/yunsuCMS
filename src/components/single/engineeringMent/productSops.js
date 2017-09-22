export default {
    name: 'productSop',
    created() {
        this.init();
    },
    data() {
        return {

            //产品SOP表格数据
            product_sop_table_data: [],
            //产品SOP查询条件
            product_sop_form_data: {
                productBomName: undefined,
            },

            //产品SOP分页
            product_sop_page_list: {
                pageNum: 1,
                pageSize: 15,
                total: 0
            },

            batch_ids: undefined,

            //新增
            product_sop_add: false,

            product_sop_add_data_get: {
                product_bom_select: [],
                product_sop_select: [],
                productBomId: undefined
            },

            product_sop_add_data_send: {
                sopTyp: undefined,
                sopTitl: undefined,
                productBomId: undefined
            },

            modal_title: "",

            download_sop: "javascript:void(0);"
        }
    },
    methods: {
        init() {
            this.reset();
            this.getProductSopData();
        },

        reset() {
            let that = this;
            that.$clearObject(that.product_sop_form_data);
        },

        refresh() {
            this.reset();
            this.searchFormData();
        },

        getProductSopData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "productsop/queryList",
                success(res) {
                    that.loadProductSopTable(res.data);
                }
            })
        },

        loadProductSopTable(data) {
            let that = this,
                load_table_data = data.page.list;

            that.product_sop_table_data = load_table_data;
            that.product_sop_page_list.pageNum = data.page.pageNum;
            that.product_sop_page_list.pageSize = data.page.pageSize;
            that.product_sop_page_list.total = data.page.total;
        },

        handleSelectionChange(val) {
            var batch_ids = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].id);
                }
                this.batch_ids = batch_ids.join(",");
            } else {
                this.batch_ids = undefined;
            }
        },

        currentPageChange(val) {
            if (this.product_sop_table_data.length) {
                this.searchFormData(val, "num");
            }
        },

        currentSizeChange(val) {
            if (this.product_sop_table_data.length) {
                this.searchFormData(val, "size");
            }
        },

        searchFormData(pageval, pagesize) {
            let that = this,
                search_data = that.product_sop_form_data;

            if (pagesize === "num") {
                search_data.pageNum = pageval || that.product_sop_page_list.pageNum;
                search_data.pageSize = that.product_sop_page_list.pageSize;
            } else {
                search_data.pageNum = that.product_sop_page_list.pageNum;
                search_data.pageSize = pageval || that.product_sop_page_list.pageSize;
            }

            that.$ajaxWrap({
                type: "post",
                url: "productsop/queryList",
                data: search_data,
                success(res) {
                    that.loadProductSopTable(res.data);
                }
            });
        },

        deleteIds() {
            let that = this;

            if (!that.batch_ids) {
                that.$message({
                    message: "请选择删除的数据",
                    type: "warning"
                });
                return;
            };

            that.$baseConfirm("你确定删除么？", function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "productsop/deleteProductSop",
                    data: {
                        ids: that.batch_ids
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.refresh();
                    }
                })
            });
        },

        // 删除
        deleteId(id) {
            let that = this;

            that.$baseConfirm("你确定删除么？", function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "productsop/deleteProductSop",
                    data: {
                        ids: id
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.refresh();
                    }
                })
            });
        },

        clearData() {
            let that = this;

            that.product_sop_add = false;
            that.$clearObject(that.product_sop_add_data_send);
            that.refresh();
        },

        closeModal() {
            let that = this;
            that.$baseConfirm("确定关闭？", function() {
                that.clearData();
            })
        },

        openProductSopModal(id) {
            let that = this;
            that.product_sop_add = true;
            if (!id) {
                that.modal_title = "新增产品SOP";
                that.$ajaxWrap({
                    url: "productsop/toInsertOrEditProductSop",
                    success(res) {
                        that.product_sop_add_data_get.product_bom_select = res.data.dataList;
                        that.product_sop_add_data_get.product_sop_select = res.data.dicData;
                    }
                });

            } else {
                that.modal_title = "编辑产品SOP";
                that.$ajaxWrap({
                    url: "productsop/toInsertOrEditProductSop",
                    data: {
                        id: id
                    },
                    success(res) {
                        that.product_sop_add_data_send = res.data.data;
                        that.product_sop_add_data_get.product_bom_select = res.data.dataList;
                        that.product_sop_add_data_get.product_sop_select = res.data.dicData;
                    }
                });
            }
        },

        addSop() {
            let that = this,
                send_data = that.product_sop_add_data_send;
            that.$ajaxWrap({
                type: "post",
                url: "productsop/insertOrEditProductSop",
                data: send_data,
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.clearData();
                }
            })
        },

        // 重新上传
        upload(id, $event) {
            let that = this,
                event = event || $event,
                file = event.target.files[0];

            if (file && file.type === "application/pdf") {
                if (file.size > 512000) {
                    that.$baseWarn("文件大小不得超过500KB!");
                } else {
                    if (typeof FileReader === "undefined") {
                        that.$baseWarn("您的浏览器不支持FileReader对象，请使用谷歌浏览器打开！")
                    } else {
                        let fileRead = new FileReader();

                        fileRead.readAsDataURL(file);

                        fileRead.onload = function(e) {
                            let result = {};

                            result.fileInfo = e.target.result || e.srcElement.result
                            result.fileName = file.name;
                            result.id = id;

                            that.submitFile(result);
                        }

                    }
                }

            } else {
                that.$baseWarn('文件格式只支持pdf!');
            }
        },

        submitFile(opt) {
            let that = this;
            that.$ajaxWrap({
                url: "/productsop/reUpload",
                type: "post",
                data: opt,
                success(res) {
                    that.$baseWarn("上传成功！");
                    that.refresh();
                }
            })
        },

        setRowProductSop(id) {
            if (BaseUrl === "/") {
                this.download_sop = "/productsop/download?productSopId=" + id
            } else {
                this.download_sop = BaseUrl + "/productsop/download?productSopId=" + id
            }
        }
    }
}