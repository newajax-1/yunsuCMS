export default {
    name: "list-table",
    data() {

        return {

            warning: {
                item_name: undefined,
                inv_sts: undefined
            },
            search_pageNum: undefined,
            search_pageSize: undefined,
            select_inv_sts: [],

            active_name: "first",

            table_data: [{
                item_no: undefined,
                item_name: undefined,
                material_factory: undefined,
                cur_inv: undefined,
                inv_sts_name: undefined,
                sec_inv: undefined,
            }],

            dialog_visible: false,
            delete_msg: undefined,
            tip_msg: undefined,

            page: {
                page_num: 1,
                page_size: 15,
                total: 0
            },
            current_page: 1,

            batch_ids: undefined,
            items: undefined,

            new_warning: false,
            select_op: [],
            add_info: {
                sel_val: undefined,
                item_no: undefined,
                item_name: undefined,
                material_factory: undefined,
                sec_inv: undefined
            },
            select_item_op: [],

            eselect_item_op: [],
            eselect_op: [],
            edit_warning: false,
            edit_table: {
                invWarningId: undefined,
                warningType: undefined,
                warningName: undefined,
                itemNo: undefined,
                itemName: undefined,
                materialFactory: undefined,
                secInv: undefined,
                curInv: undefined
            },
            select_op: [],

            show_info: [{}],

            show_factory: true,

            show_factory_update: true,
            show_factory_detail: true,
            detail_warning: false,
            detail_info: {
                warning_name: undefined,
                item_no: undefined,
                item_name: undefined,
                material_factory: undefined,
                sec_inv: undefined,
                cur_ins: undefined
            },
        }
    },
    methods: {

        loadSearchSelect() {
            var that = this;
            this.$ajaxWrap({
                type: "get",
                url: "/invWarning/getAllInvStsInfo",
                data: {
                    key: "inv_sts",
                },
                callback(data) {
                    that.select_inv_sts = data.data.dicData;
                }
            })
        },
        //是否显示
        showOpt(id) {
            console.info(id + "@@@");
            /* if(invStsName=="安全"){
                 return false;
               }else if(invStsName=="预警"){
                 return true;
               }*/
            return true;
        },
        // 单条删除
        deletetab(id) {
            this.delete_msg = "你确定要删除该条数据？";
            this.tip_msg = id;
            this.dialog_visible = true;
        },
        detailtab(ids) {
            let that = this;
            this.detail_warning = true;

            this.$ajaxWrap({
                type: "get",
                url: "invWarning/toAddOrEditInvWarning",
                data: {
                    invWarningId: ids,
                },
                callback(data) {
                    that.eselect_op = data.data.dicData;
                    that.eselect_item_op = data.data.dataList;
                    that.edit_table = data.data.data;
                    (that.edit_table.warningName == "原材料") ? (that.show_factory_detail = true) : (that.show_factory_detail = false);
                }
            });
        },
        deleteObject() {
            var that = this;
            this.$ajaxWrap({
                type: "get",
                url: "/invWarning/deleteByIds",
                data: {
                    id: that.tip_msg,
                },
                callback(data) {
                    that.$message({
                        message: '删除成功!',
                        type: 'success',
                    });
                    that.dialog_visible = false
                    that.loadTable();
                },
                error(data) {

                }
            })
        },
        // tabController Event
        changeTableEffective(tab) {
            switch (tab.name) {
                case 'first':
                    this.active_name = tab.name;
                    this.loadTable();
                    break;
                case 'second':
                    this.active_name = tab.name;
                    this.loadTable();
                    break;
            }
        },
        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].invWarningId);
                }
                this.batch_ids = batch_ids.join(",");
            }
            console.log(this.batch_ids)
        },
        // 批量删除
        batchDelete() {
            if (!this.batch_ids) {
                this.$message({
                    message: '请选择要删除的记录',
                    type: 'warning'
                });
                return;
            }
            this.delete_msg = "你确定要删除这些数据？";
            this.tip_msg = this.batch_ids;
            this.dialog_visible = true;
        },

        // 重置
        reset() {
            this.warning.item_name = undefined;
            this.warning.inv_sts = undefined;
        },
        //加载表格
        loadTable() {
            var that = this;
            var _warning_name = "";
            (this.active_name == "first") ? (_warning_name = "原材料") : (_warning_name = "成品");
            this.$ajaxWrap({
                type: "post",
                url: "/invWarning/loadTable",
                data: {
                    pageNum: that.search_pageNum || 1,
                    pageSize: that.search_pageSize || 15,
                    warningName: _warning_name,
                    itemName: that.warning.item_name,
                    invSts: that.warning.inv_sts,
                },
                callback(data) {
                    that.table_data = data.data.page.list;
                    that.show_info = [];
                    for (var i = 0; i < that.table_data.length; i++) {
                        if (that.table_data[i].invStsName === "预警") {
                            that.show_info.push({ show: true });
                        } else {
                            that.show_info.push({ show: false });
                        }
                    }
                    that.table_data.every(function(el) {
                        return el.materialFactory = el.materialFactory.length > 16 ? el.materialFactory.substring(0, 16) + "..." : el.materialFactory;
                    })
                    that.page.total = data.data.page.total;
                    that.page.page_num = data.data.page.pageNum;
                    that.page.page_size = data.data.page.pageSize;
                }
            })
        },

        // 刷新
        refresh() {
            this.warning.item_name = undefined;
            this.warning.inv_sts = undefined;
            this.loadTable();
        },

        // 预添加
        toAdd() {
            var that = this;
            this.new_warning = true;
            this.add_info.sel_val = "01";
            this.add_info.item_no = undefined;
            this.add_info.item_name = undefined;
            this.add_info.material_factory = undefined;
            this.add_info.sec_inv = undefined;
            that.$ajaxWrap({
                type: "get",
                url: "invWarning/toAddOrEditInvWarning",
                data: {},
                callback(data) {
                    that.select_op = data.data.dicData;
                    that.select_item_op = data.data.dataList;
                }
            });
        },

        // 预修改
        edittab(ids) {
            var that = this;
            this.edit_warning = true;
            this.$ajaxWrap({
                type: "get",
                url: "invWarning/toAddOrEditInvWarning",
                data: {
                    invWarningId: ids,
                },
                callback(data) {
                    that.eselect_op = data.data.dicData;
                    that.eselect_item_op = data.data.dataList;
                    that.edit_table = data.data.data;
                    console.info(that.edit_table.curInv);
                    (that.edit_table.warningName == "成品") ? (that.show_factory_update = false) : (that.show_factory_update = true);
                }
            });
        },
        //当改变库品编号的时候调用
        changeItemNo(id) {
            if (id == 1) {
                for (var i = 0; i < this.select_item_op.length; i++) {
                    if (this.select_item_op[i].itemNo == this.add_info.item_no) {
                        this.add_info.item_name = this.select_item_op[i].itemName;
                        this.add_info.material_factory = this.select_item_op[i].itemProvider;
                        this.add_info.cur_ins = this.select_item_op[i].curInv;
                        break;
                    }
                }
            } else {
                for (var i = 0; i < this.eselect_item_op.length; i++) {
                    if (this.eselect_item_op[i].itemNo == this.edit_table.itemNo) {
                        this.edit_table.itemName = this.eselect_item_op[i].itemName;
                        this.edit_table.materialFactory = this.eselect_item_op[i].itemProvider;
                        this.edit_table.curIns = this.eselect_item_op[i].curInv;
                        break;
                    }
                }
            }
        },
        //改变警告类型的时候，当为成品就没有供应商
        changeSelValue() {
            var that = this;
            var _warning_type = (this.add_info.sel_val ? this.add_info.sel_val : this.select_op[0].dicValue);
            if (_warning_type == "01") {
                //原材料
                that.show_factory = true;
            } else if (_warning_type == "02") {
                //成品
                that.show_factory = false;
            }
        },
        // 修改信息提交
        updateInvWarning() {
            var that = this;
            if (this.edit_table.secInv == "") {
                this.$message({
                    message: '请填写安全库存',
                    type: 'warning'
                });
                return;
            } else {
                if (!/^[1-9]\d*$/.test(this.edit_table.secInv)) {
                    this.$message({
                        message: '安全库存只能为正整数',
                        type: 'warning'
                    });
                    return;
                }
            }
            this.$ajaxWrap({
                type: "post",
                url: "/invWarning/addOrEditInvWarning",
                data: {
                    warningType: that.edit_table.warningType,
                    invWarningId: that.edit_table.invWarningId,
                    itemNo: that.edit_table.itemNo,
                    itemName: that.edit_table.itemName,
                    materialFactory: that.edit_table.materialFactory,
                    secInv: that.edit_table.secInv,
                    curInv: that.edit_table.curInv,
                },
                callback(data) {
                    that.$message({
                        message: '更新成功！',
                        type: 'success'
                    });
                    that.edit_warning = false;
                    that.page.page_num = 1;
                    that.refresh();
                    that.$clearObject(that.edit_table)
                },
                error(data) {

                }
            });
        },
        // 保存提交预警信息
        addNewWarning() {
            var that = this;
            if (this.add_info.item_no == "") {
                this.$message({
                    message: '请选择库品编码',
                    type: 'warning'
                });
                return;
            }
            if (this.add_info.sec_inv == "") {
                this.$message({
                    message: '请填写安全库存',
                    type: 'warning'
                });
                return;
            } else {
                if (!/^[1-9]\d*$/.test(this.add_info.sec_inv)) {
                    this.$message({
                        message: '安全库存只能为正整数',
                        type: 'warning'
                    });
                    return;
                }
            }
            this.$ajaxWrap({
                type: "post",
                url: "/invWarning/addOrEditInvWarning",
                data: {
                    warningType: that.add_info.sel_val,
                    itemNo: that.add_info.item_no,
                    itemName: that.add_info.item_name,
                    materialFactory: that.add_info.material_factory,
                    curInv: that.add_info.cur_ins,
                    secInv: that.add_info.sec_inv,
                },
                callback(data) {
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    that.new_warning = false;
                    that.page.page_num = 1;
                    that.refresh(0);
                    that.$clearObject(that.add_info);
                },
                error(data) {

                }
            });
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_warning = false;
                that.edit_warning = false;
            }).catch(function() {});
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
        this.loadSearchSelect();
        this.loadTable();
    },
}