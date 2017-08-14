import Qs from 'qs'
import citydata from "../../../assets/js/data";
export default {
    name: 'orgManagement',
    created: function() {
        this.pro = this.data;
        this.city = this.pro[0]['child'];
        this.county = this.city[0]['child'];
        this.result();
    },
    data() {


        return {
            search_pageNum: undefined,
            search_pageSize: undefined,
            show_detailed: true,

            // 设置城市三级联动参数
            dialog_visible: false,
            delete_msg: undefined,
            tip_msg: undefined,
            data: citydata,
            addr: undefined,
            pro: undefined,
            city: undefined,
            county: undefined,
            f: {
                p: "请选择省",
                c: "请选择市",
                cc: "请选择地区",
            },

            // 条件查询
            info: {
                cust_no: undefined,
                cust_name: undefined,
                contacts: undefined
            },

            // 存放日期值
            value1: undefined,
            value2: undefined,
            value3: undefined,
            value4: undefined,

            // 对话框
            new_custom: false,
            custom_detail: false,
            edit_custom: false,

            table_data: [],

            // 分页
            page: {
                page_num: 1,
                page_size: 10,
                total: 0
            },
            current_page: 1,

            // 批量删除ids
            batch_ids: undefined,

            // 新增数据
            sel_val: undefined,
            select_op: [],
            editsel_val: undefined,
            edit_select_op: [],
            add_info: {
                sel_value: undefined,
                sel_name: undefined,
                sel_contact: undefined,
                sel_phone: undefined,
                address: undefined
            },

            // 修改数据存放
            edit_table: {
                custValue: undefined,
                memberType: undefined,
                custId: undefined,
                custName: undefined,
                contacts: undefined,
                phone: undefined,
                province: undefined,
                city: undefined,
                area: undefined,
                address: undefined,
                custType: undefined
            }
        }
    },
    methods: {
        // 单条删除
        deletetab(id) {
            this.delete_msg = "你确定要删除该条数据？";
            this.tip_msg = id;
            this.dialog_visible = true;
        },
        deleteObject() {
            var that = this;
            var _flag = undefined;
            var _data = undefined;
            var _flag_id = this.tip_msg.indexOf(",") != -1;
            if (_flag_id) {
                _flag = "/cust/deleteByIds";
                _data = { ids: that.tip_msg }
            } else {
                _flag = "/cust/deleteById"
                _data = { id: that.tip_msg }
            }
            this.$ajaxWrap({
                type: "get",
                url: _flag,
                data: _data,
                success: function(data) {
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    that.dialog_visible = false
                    that.loadTable();
                },
                error() {

                }
            })
        },
        // 批量删除
        batchDelete() {
            if (this.batch_ids == "") {
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
            this.$clearObject(this.info);
        },

        // 复选框勾选
        handleSelectionChange(val) {
            if (val.length > 0) {
                var ids = [];
                for (var i = 0; i < val.length; i++) {
                    ids.push(val[i].custId);
                }
                this.batch_ids = ids.join(',')
            } else {
                this.batch_ids = '';
            }
        },

        //加载表格
        loadTable() {
            var that = this;
            var send_data = {
                pageNum: that.search_pageNum || 1,
                pageSize: that.search_pageSize || 10,
                custNo: that.info.cust_no,
                custName: that.info.cust_name,
                contacts: that.info.contacts
            }
            this.$ajaxWrap({
                type: "post",
                url: "/cust/queryList",
                data: send_data,
                success: function(data) {
                    that.table_data = data.data.page.list;
                    that.page.total = data.data.page.total;
                    that.table_data.every(function(el) {
                        // return el.delivery.substring(0,16)
                        return el.delivery = el.delivery.length > 16 ? el.delivery.substring(0, 16) + "..." : el.delivery;
                    });
                    that.page.page_num = data.data.page.pageNum;
                    that.page.page_size = data.data.page.pageSize;
                },
                error() {
                    //do error function
                }
            })
        },

        // 刷新
        refresh() {
            this.$clearObject(this.info);
            this.loadTable();
        },

        // 新增客户信息
        toAdd() {
            var that = this;
            this.f.p = "请选择省";
            this.f.c = "请选择市";
            this.f.cc = "请选择地区";
            this.city = undefined;
            this.county = undefined;
            this.new_custom = true;
            this.sel_val = undefined;
            this.$clearObject(this.add_info);
            this.$ajaxWrap({
                type: "get",
                url: "cust/getSelects",
                data: {
                    key: "cust_type"
                },
                success: function(data) {
                    that.select_op = data.data.dicData;
                },
                error() {
                    //do error function
                }
            })
        },

        // 详情
        showDetailed(ids) {
            var that = this;
            if (this.show_detailed) {
                this.custom_detail = true;
            }
            this.$ajaxWrap({
                type: "get",
                url: "cust/getObject",
                data: {
                    id: ids
                },
                success: function(data) {
                    var _data_arr = data.data.data;
                    that.edit_table = _data_arr;
                    that.f.p = _data_arr.province;
                    that.f.c = _data_arr.city;
                    that.f.cc = _data_arr.area;
                }
            })
        },

        // 修改客户信息
        edittab(ids) {
            var that = this;
            this.show_detailed = false;
            this.edit_custom = true;
            this.$ajaxWrap({
                type: "get",
                url: "cust/getSelects",
                data: {
                    key: "cust_type"
                },
                success: function(data) {
                    that.edit_select_op = data.data.dicData;
                }
            })
            this.showDetailed(ids);
            this.show_detailed = true;
        },


        // 修改信息提交
        updateCustom() {
            var that = this;
            var s_province, s_city, s_area;
            if (isNaN(Number(this.f.p))) {
                s_province = this.f.p;
            } else {
                s_province = this.pro[this.f.p].name;
            }
            if (isNaN(Number(this.f.c))) {
                s_city = this.f.c;
            } else {
                s_city = this.city[this.f.c].name;
            }
            if (isNaN(Number(this.f.cc))) {
                s_area = this.f.cc;
            } else {
                s_area = this.county[this.f.cc].name;
            }
            if (custType == "" || this.edit_table.custName == "" || this.edit_table.contacts == "" ||
                this.edit_table.phone == "" || s_province == "" ||
                s_city == "" || s_area == "" ||
                this.edit_table.address == "") {
                this.$message({
                    message: '请将信息填写完整',
                    type: 'warning'
                });
                return;
            } else if (!/^1[34578]\d{9}$/.test(this.edit_table.phone)) {
                this.$message({
                    message: '手机格式错误',
                    type: 'warning'
                });
                return;
            } else {
                this.$ajaxWrap({
                    type: "post",
                    url: "/cust/save",
                    data: {
                        custType: that.edit_table.custType,
                        custId: that.edit_table.custId,
                        memberType: that.edit_table.memberType,
                        custName: that.edit_table.custName,
                        contacts: that.edit_table.contacts,
                        phone: that.edit_table.phone,
                        province: s_province,
                        city: s_city,
                        area: s_area,
                        address: that.edit_table.address
                    },
                    success: function(data) {
                        that.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        that.$clearObject(that.info);
                        that.loadTable();
                        that.edit_custom = false;
                        that.sel_val = undefined;
                        that.$clearObject(that.add_info);
                        that.$clearObject(that.f);
                    },
                    error(data) {

                    }
                })
            }
        },


        // 保存提交客户信息
        addNewCustom() {
            var that = this;
            console.log(this.f)
            var custType = (!this.sel_val ? this.select_op[0].dicValue : this.sel_val);
            var flag3 = false;
            if (this.f.p != 0 && !this.f.p) {
                flag3 = true;
            }
            if (this.f.p == "请选择省") {
                flag3 = true;
            }
            console.log(!this.f.p)
            if (!this.add_info.sel_name || !custType || !this.add_info.sel_contact ||
                !this.add_info.sel_phone || flag3 || !this.add_info.address) {
                this.$message({
                    message: '请将信息填写完整',
                    type: 'warning'
                });
                return;
            } else {
                if (!/^1[34578]\d{9}$/.test(this.add_info.sel_phone)) {
                    this.$message({
                        message: '手机格式错误',
                        type: 'warning'
                    });
                    return;
                } else {
                    this.$ajaxWrap({
                        type: "post",
                        url: "/cust/save",
                        data: {
                            custType: custType,
                            custName: that.add_info.sel_name,
                            contacts: that.add_info.sel_contact,
                            phone: that.add_info.sel_phone,
                            province: that.pro[that.f.p].name,
                            city: that.city[that.f.c].name,
                            area: that.county[that.f.cc].name,
                            address: that.add_info.address
                        },
                        success: function(data) {
                            that.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            that.new_custom = false;
                            that.$clearObject(that.info);
                            that.loadTable();
                            that.sel_val = undefined;
                            that.$clearObject(that.add_info);
                            that.$clearObject(that.f);
                        },
                        error(data) {

                        }
                    })
                }
            }
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.edit_custom = false;
                that.new_custom = false;
            }).catch(function() {});
        },

        // 城市三级联动
        selpro: function() {
            this.city = this.pro[this.f.p]['child'];
            this.county = this.city[0]['child'];
            this.f.c = 0;
            this.f.cc = 0;
            this.result();
        },
        selcity: function() {
            this.county = this.city[this.f.c]['child'];
            this.f.cc = 0;
            this.result();
        },
        result: function() {
            var re = {
                pro: {
                    id: "" || this.pro[this.f.p].id,
                    name: this.pro[this.f.p].name
                },
                city: {
                    id: this.city[this.f.c].id || "",
                    name: this.city[this.f.c].name
                },
                county: {
                    id: this.county[this.f.cc].id || "",
                    name: this.county[this.f.cc].name
                }
            };
            this.$emit("select", re);
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