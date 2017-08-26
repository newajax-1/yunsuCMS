export default {
    name: 'roleManagement',
    data() {
        return {
            new_custom: false,

            // 分页
            page_list: {
                page_num: 1,
                page_size: 10,
                total: 0
            },
            current_page: 1,
            search_pageNum: undefined,
            search_pageSize: undefined,
            adfasdasd: undefined,
            title_name: undefined,

            // 查询
            info: {
                info_name: undefined,
            },

            table_data: [],

            add_info: {
                roleName: undefined,
                remark: undefined,
            },


            data2: [],
            defaultProps: {
                children: 'menuList',
                label: 'name'
            },
            checked_arr: [],
            addAdmin: false
        }
    },
    methods: {

        setCheckedKeys() {
            let temp = this.role_check_arr;

            this.$refs.tree.setCheckedKeys(temp);
        },

        // 数据加载和搜索
        loadTable() {
            var that = this;

            this.$ajaxWrap({
                type: "post",
                url: "/role/loadTable",
                data: {
                    pageNum: that.search_pageNum || 1,
                    pageSize: that.search_pageSize || 10
                },
                callback: function(data) {
                    that.table_data = data.data.page.list;
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                }
            })
        },

        // 重置
        reset() {
            this.$clearObject(that.info);
        },

        // 新增弹框显示
        toAdd() {
            let that = this;
            that.adfasdasd = undefined;
            that.title_name = "新增";
            that.new_custom = true;
            that.addAdmin = false;
            that.checked_arr = [];

            that.$clearObject(that.add_info);
            that.$ajaxWrap({
                type: "post",
                url: "/role/queryById",
                data: { roleId: "" },
                success(data) {
                    that.data2 = data.data.menuList;
                    that.new_custom = true;
                }
            })
        },

        // 新增或修改保存
        showAdd(id) {
            var that = this;
            var flag = undefined;
            id ? flag = ("/role/update") : (flag = "/role/addRole");

            this.$ajaxWrap({
                type: "post",
                url: flag,
                data: {
                    roleName: that.add_info.roleName,
                    remark: that.add_info.remark,
                    roleId: id,
                    menuIds: that.$refs.tree.getCheckedKeys().join(","),
                },
                success(data) {
                    that.new_custom = false;
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.loadTable();
                }
            })
        },

        // 修改信息
        updateCustom(id) {
            this.adfasdasd = id;
            this.title_name = "修改";
            var that = this;
            that.addAdmin = true;
            that.role_check_arr = [];

            this.$ajaxWrap({
                type: "post",
                url: "/role/queryById",
                data: { roleId: id },
                success(data) {
                    that.add_info.roleName = data.data.data.roleName
                    that.add_info.remark = data.data.data.remark
                    that.data2 = data.data.menuList;

                    that.checkedMenu(that.data2);
                    that.new_custom = true;
                }
            })
        },

        checkedMenu(data) {
            let temp = [],
                parents_arr = [];

            for (let i = 0; i < data.length; i++) {
                let el = data[i];
                if (el.selected) {
                    temp.push(el.menuId);
                }
                if (el.menuList.length) {
                    let child = el.menuList,
                        tips = 0,
                        flag = true;
                    for (let j = 0; j < child.length; j++) {
                        if (child[j].selected) {
                            tips++;
                            temp.push(child[j].menuId);
                        }
                    }

                    if (tips > 0) {
                        parents_arr.push(el.menuId);
                    }
                }
            }


            for (let k = 0; k < temp.length; k++) {
                let only = temp[k];
                for (let l = 0; l < parents_arr.length; l++) {
                    let father_id = parents_arr[l];
                    if (only === father_id) {
                        temp.splice(k, 1);
                    }
                }
            }

            console.log(temp);


            this.checked_arr = temp;
        },

        // 删除信息
        deleteInfo(id) {
            var that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "post",
                    url: "/role/deleteById",
                    data: {
                        roleId: id,
                        isDel: 1
                    },
                    success(data) {
                        that.loadTable();
                        that.$message({
                            message: "删除成功！",
                            type: 'success'
                        });
                    }
                })
            }).catch(function() {});
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
            that.loadTable();
        },

        // 分页
        handleSizeChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "size");
            };
        },

        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
        },

        // 设置默认权限项
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes(
                [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 9,
                    label: '三级 1-1-1'
                }]
            );
        },
    },
    mounted() {

        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    }
}