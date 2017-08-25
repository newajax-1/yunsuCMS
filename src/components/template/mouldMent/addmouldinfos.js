import Vue from "vue";
export default {
    name: 'mouldInfoNewDetail',
    created() {
        this.mould_id = this.$route.query.mould_id;
        this.init();
    },
    data() {
        return {
            table_data: [],
            mould_type_list: [],
            cavity_cnt_list: [],
            mould_status_list: [],
            mould_asc_list: [],
            cust_info_list: [],
            secd_proc_list: [],
            packing_typ_list: [],
            product_data: [],

            add_info: {
                mouldTyp: undefined,
                mouldCode: undefined,
                dsgnCnt: undefined,
                mouldSts: undefined,
                cavityCnt: undefined,
                moldingCycl: undefined,
                mouldAscription: undefined,
                mouldFactory: undefined,
                custFactory: undefined,
                machine: undefined,
                machineName: "请添加可用机台",
                initCnt: undefined,
            },

            dialog_form_data: {
                productNm: undefined,
                custProductNo: undefined,
                number: undefined,
                materialGrade: undefined,
                productWeight: undefined,
                color: undefined,
                gapWeight: undefined,
                secdProc: undefined,
                secdProcName: undefined,
                packingTyp: undefined,
                packingCount: undefined,
                packingDetl: undefined,
                packingTypName: undefined,
            },

            mould_id: undefined,
            save_id: undefined,
            add_tips: undefined,
            diag_title: undefined,
            new_custom: false,
            product_custom: false,
            batch_names: undefined,
            batch_ids: undefined
        }
    },
    methods: {
        init() {
            this.getTableData();
        },

        getTableData() {
            let that = this;

            this.$ajaxWrap({
                type: "post",
                url: "/mould/initData",
                data: {
                    mouldId: that.mould_id
                },
                success: function(res) {
                    that.loadTable(res.data)
                }
            })
        },

        openMouldInfoModal(row) {
            let that = this,
                tips = row.index || row.productId || row;

            that.new_custom = true;
            that.add_tips = tips;

            if (tips === "add") {
                that.diag_title = "增加产品";
            } else {
                that.diag_title = "修改产品";
                that.loadMouldInfoModal(tips);
            }

            that.$ajaxWrap({
                type: "get",
                url: "product/selectById",
                data: {
                    type: "2",
                },
                success: function(res) {
                    that.secd_proc_list = res.data.dicList5;
                    that.secd_proc_list.unshift({
                        dicName : "无",
                        dicValue : ""
                    })
                    that.packing_typ_list = res.data.dicList6;
                    that.packing_typ_list.unshift({
                        dicName : "无",
                        dicValue : ""
                    })
                }
            })
        },

        loadMouldInfoModal(tips) {
            let that = this;

            for (let i = 0; i < that.table_data.length; i++) {
                let el = that.table_data[i];
                if (el.index === tips || el.productId === tips) {
                    let clone_el = that.$cloneObject(el);
                    return that.dialog_form_data = clone_el;
                }
            }
        },

        saveModalDataInitTable() {
            let that = this;

            if (!that.dialog_form_data.productNm ||
                !that.dialog_form_data.custProductNo ||
                !that.dialog_form_data.number ||
                !that.dialog_form_data.materialGrade || 
                !that.dialog_form_data.color) {

                that.$baseWarn("请完善必填信息");
                return
            } else {

                switch (that.dialog_form_data.packingTyp) {
                    case "01":
                        that.dialog_form_data.packingTypName = "精装";
                        break;
                    case "02":
                        that.dialog_form_data.packingTypName = "简装"
                        break;
                };

                switch (that.dialog_form_data.secdProc) {
                    case "01":
                        that.dialog_form_data.secdProcName = "印刷"
                        break;
                    case "02":
                        that.dialog_form_data.secdProcName = "镶嵌"
                        break;
                    case "03":
                        that.dialog_form_data.secdProcName = "组装"
                        break;
                    case "04":
                        that.dialog_form_data.secdProcName = "包装"
                        break;
                };

                that.pushTableData(that.dialog_form_data);
            }

        },

        pushTableData(modal_data) {
            let that = this,
                len = that.table_data.length,
                clone_modal_data = that.$cloneObject(modal_data);
            if (that.add_tips === "add") {
                clone_modal_data.index = len + 1;
                that.table_data.push(clone_modal_data);
                that.$baseWarn("添加成功！", function() {
                    that.clearFormData();
                })
            } else {
                if (that.add_tips === clone_modal_data.index) {
                    that.table_data.splice(clone_modal_data.index - 1, 1, clone_modal_data);
                    that.$baseWarn("修改成功！", function() {
                        that.clearFormData();
                    })
                } else {
                    for (let i = 0; i < len; i++) {
                        let el = that.table_data[i];
                        if (el.productId === clone_modal_data.productId) {
                            that.table_data.splice(i, 1, clone_modal_data);
                            that.$baseWarn("修改成功！", function() {
                                that.clearFormData();
                            })
                        }
                    }
                }
            }
        },


        spliceTableData(clone_data) {
            let that = this;
            for (let i = 0; i < that.table_data.length; i++) {
                let el = that.table_data[i];
                if (el.productId === clone_data.productId) {
                    Vue.set(that.table_data, i, clone_data);
                }
                if (el.index === clone_data.index) {
                    // Vue.set(that.table_data, i, clone_data);
                    console.log(that.table_data)
                }
            }
        },

        saveTableData() {
            let that = this;
            this.batch_ids = this.batch_ids || this.add_info.machine;
            if (!that.add_info.mouldTyp ||
                !that.add_info.mouldCode ||
                !that.add_info.dsgnCnt ||
                !that.add_info.cavityCnt ||
                !that.add_info.moldingCycl ||
                !that.add_info.mouldSts ||
                !that.add_info.mouldAscription ||
                !that.add_info.mouldFactory ||
                !that.add_info.custFactory ||
                !that.add_info.initCnt ||
                !that.batch_ids) {

                that.$baseWarn("请将信息填写完整");
                return;
            }

            this.$ajaxWrap({
                type: "post",
                url: "/mould/saveMould",
                data: {
                    mouldTyp: that.add_info.mouldTyp,
                    mouldCode: that.add_info.mouldCode,
                    dsgnCnt: that.add_info.dsgnCnt,
                    cavityCnt: that.add_info.cavityCnt,
                    moldingCycl: that.add_info.moldingCycl,
                    mouldSts: that.add_info.mouldSts,
                    mouldAscription: that.add_info.mouldAscription,
                    mouldFactory: that.add_info.mouldFactory,
                    custFactory: that.add_info.custFactory,
                    initCnt: that.add_info.initCnt,
                    machine: that.batch_ids,
                    machineName: that.batch_names,
                    productList: that.table_data,
                    mouldId: that.mould_id,
                    mouldNo: that.add_info.mouldNo
                },
                success: function(res) {
                    that.$baseWarn(res.tipMsg, function() {
                        that.$clearObject(that.add_info);
                    });
                    that.$goRoute("/home/mouldinfo");
                }
            })
        },

        toAddProduct() {
            let that = this;

            that.$ajaxWrap({
                type: "post",
                url: "/equipment/queryList",
                data: {
                    eqpTyp: "01",
                    pageNum: "1",
                    pageSize: "10"
                },
                success(res) {
                    that.product_data = res.data.page.list
                }
            })
            this.product_custom = true;
        },

        saveProductInfo() {
            this.add_info.machineName = this.batch_names;
            this.product_custom = false;
        },

        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            var batch_names = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].eqpNo);
                    batch_names.push(val[i].eqpBrand);
                }
                this.batch_names = batch_names.join(",");
                this.batch_ids = batch_ids.join(",");
            }
        },

        deleteId(id, val) {
            let that = this;

            this.$confirm("你确定删除么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                if (val) {
                    for (var i = 0; i < that.table_data.length; i++) {
                        if (that.table_data[i].productId === val) {
                            that.table_data.splice(i, i + 1);
                        }
                    }
                    that.$message({
                        message: "删除成功",
                        type: "success"
                    });
                } else {
                    for (var i = 0; i < that.table_data.length; i++) {
                        if (that.table_data[i].index === id) {
                            that.table_data.splice(i, i + 1);
                        }
                    }
                    that.$message({
                        message: "删除成功",
                        type: "success"
                    });
                }
            }).catch(function() {});
        },

        loadTable(data) {
            let that = this;

            that.mould_type_list = data.mouldTypeList;
            that.cavity_cnt_list = data.cavityCntList;
            that.mould_status_list = data.mouldStatusList;
            that.mould_asc_list = data.mouldAscList;
            that.cust_info_list = data.custInfoList;
            that.table_data = data.bomList || [];
            if (!!data.mould) {
                that.add_info = data.mould;
            }
        },

        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.clearFormData()
            }).catch(function() {});
        },

        clearFormData() {
            let that = this;
            that.new_custom = false;
            that.product_custom = false;
            that.add_tips = "";
            that.$clearObject(that.dialog_form_data);
        }
    },
}