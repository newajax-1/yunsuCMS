export default {
    name: 'productBom',
    created() {
        this.init();
    },
    data() {
        return {
            //产品BOM表格数据
            product_bom_table_data: [{}],
            //产品BOM查询条件
            product_bom_form_data: {
                productNo: undefined,
                productNm: undefined,
                custProductNo: undefined,
            },
            //产品BOM分页
            product_bom_page_list: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },

            //详情
            product_bom_info: false,
            product_bom_info_form: {
                productNm: "",
                custProductNo: "",
                number: "",
                materialGradeName: "",
                productWeightName: "",
                colorName: "",
                gapWeightName: "",
                secdProcName: "",
                packingTypName: "",
                packingCount: "",
                packingDetl: "",
                materialGrade: "",
                gapWeight: "",
                secdProc: "",
                packingTyp: "",
            },
            //修改
            product_bom_modify: false,
            product_sop_modify_data: {},
            //
            batch_ids: undefined,

            // 
            bom_edit: false,
            dialog_title: "",

            sync_product_data: {},
            bom_id: undefined
        }
    },
    methods: {
        init() {
            this.reset();
            this.getProductBomData();
        },
        reset() {
            let that = this;
            that.$clearObject(that.product_bom_form_data);
        },
        refresh() {
            this.reset();
            this.searchFormData();
        },
        getProductBomData() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "product/queryList",
                success(res) {
                    that.loadProductBomTable(res.data);
                }
            })
        },

        loadProductBomTable(data) {
            let that = this,
                load_table_data = data.page.list;

            that.product_bom_table_data = load_table_data;
            that.product_bom_page_list.pageNum = data.page.pageNum;
            that.product_bom_page_list.pageSize = data.page.pageSize;
            that.product_bom_page_list.total = data.page.total;
        },
        currentPageChange(val) {
            if (this.product_bom_table_data.length) {
                this.searchFormData(val, "num");
            }
        },

        currentSizeChange(val) {
            if (this.product_bom_table_data.length) {
                this.searchFormData(val, "size");
            }
        },

        searchFormData(pageval, pagesize) {
            let that = this,
                search_data = that.product_bom_form_data;

            if (pagesize === "num") {
                search_data.pageNum = pageval || that.product_bom_page_list.pageNum;
                search_data.pageSize = that.product_bom_page_list.pageSize;
            } else {
                search_data.pageNum = that.product_bom_page_list.pageNum;
                search_data.pageSize = pageval || that.product_bom_page_list.pageSize;
            }

            that.$ajaxWrap({
                type: "post",
                url: "product/queryList",
                data: search_data,
                success(res) {
                    that.loadProductBomTable(res.data);
                }
            });
        },

        handleSelectionChange(val) {
            console.log(val);
            var batch_ids = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].productId);
                }
                this.batch_ids = batch_ids.join(",");
            } else {
                this.batch_ids = undefined;
            }
        },

        closeModal() {
            let that = this;
            that.$baseConfirm("确定关闭？", function() {
                that.product_bom_info = false;
                that.product_bom_modify = false;
                that.bom_edit = false;
                that.refresh();
            })
        },

        deleteIds() {
            let that = this;
            if (!this.batch_ids) {
                this.$message({
                    message: "请选择删除的数据",
                    type: "warning"
                });
                return;
            };

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "product/deleteProduct",
                    data: {
                        ids: that.batch_ids
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.getProductBomData();
                    }
                })
            }).catch(function() {});
        },

        // 删除
        deleteId(id) {
            let that = this;
            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "product/deleteProduct",
                    data: {
                        ids: id
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.getProductBomData();
                    }
                })
            }).catch(function() {});
        },

        openProductBomInfo(planId, types) {
            let that = this;
            that.product_bom_info = true;
            that.bom_id = planId;
            that.$ajaxWrap({
                type: "get",
                url: "product/selectById",
                data: {
                    productId: planId,
                    type: types
                },
                success(res) {
                    that.showProductBomInfo();
                    that.sync_product_data = res.data;
                    that.product_bom_info_form = that.sync_product_data.data;

                }
            })
        },
        openProductBomModify(planId, types) {
            let that = this;
            that.product_bom_modify = true;
            that.bom_id = planId;
            that.$ajaxWrap({
                type: "get",
                url: "product/selectById",
                data: {
                    productId: planId,
                    type: types
                },
                success(res) {
                    that.modifyProductBom();
                    that.sync_product_data = res.data;
                    that.product_bom_info_form = that.sync_product_data.data;

                }
            })
        },


        modifyProductBom() {
            this.bom_edit = false;
            this.dialog_title = "修改产品BOM"
        },

        showProductBomInfo() {
            let that = this;
            that.bom_edit = true;
            that.dialog_title = "产品BOM详情"

        },

        updateProductBom() {
            let that = this,
                send_data = that.product_bom_info_form;

            send_data.productId = that.bom_id;
            that.$ajaxWrap({
                type: "post",
                url: "product/editProduct",
                data: send_data,
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success"
                    });
                    that.product_bom_modify = false;
                    that.refresh();
                },
            });
        },
        gotoAddpage() {
            this.$goRoute("/home/addmouldinfo", {
                mould_path: "02"
            });
        }
    }
}