export default {
    name: 'roleManagement',
    created() {
        this.getTableData();
    },
    data() {
        return {
            add_group: false,
            model_title: undefined,
            change_status: undefined,

            role_management: false,

            checkAll: true,
            isIndeterminate: true,
            isCheckedList: [],
            allEmpList: [],

            isSelected: true,
            selectedAll: true,
            selectedChecked: [],
            selectedEmpList: [],

            // 分页
            page_list: {
                page_num: 1,
                page_size: 10,
                total: 0
            },
            search_data: {
                pageNum: undefined,
                pageSize: undefined,
            },
            title_name: undefined,

            table_data: [],

            add_info: {
                roleName: undefined,
                remarks: undefined,
                id: undefined
            },
            org_info: [{
                orgName: undefined,
                id: undefined
            }],

            //组内
            selected: [{}],

            //组外
            Emp: [{}],

            //成员维护
            out_row_id: undefined,
            //成员维护保存数据
            saveData: {
                id: undefined,
                empIds: []
            }

            // 权限
            ,
            jurisdiction: false,
            button_list: [],
            cache_list: null
        }
    },
    methods: {
        handleOpen(key, keyPath) {},
        handleClose(key, keyPath) {},
        //刷新
        refresh() {
            this.getTableData();
        },
        // 数据加载和搜索
        getTableData() {
            var that = this;

            that.$ajaxWrap({
                type: "post",
                url: "role/index",
                success(res) {
                    that.loadPageDate(res.data.page);
                }
            })
        },
        loadPageDate(data) {
            let that = this,
                load_table_data = data.list;

            for (var i = 0; i < load_table_data.length; i++) {
                let el = load_table_data[i];
                load_table_data[i].index = data.pageSize * (data.pageNum - 1) + i + 1;
            };

            that.table_data = load_table_data;
            that.page_list.pageNum = data.pageNum;
            that.page_list.pageSize = data.pageSize;
            that.page_list.total = data.total - 0;
        },

        //删除
        deleteRole(id) {
            let that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "role/deleteById",
                    data: {
                        roleId: id
                    },
                    callback: function(data) {
                        that.$message({
                            message: "删除成功！",
                            type: "success"
                        });
                        that.getTableData();
                    }
                })
            }).catch(function() {});
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$clearObject(this.add_info);
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.add_group = false;
            }).catch(function() {});
        },

        searchFormData(pageval, pagesize) {
            var that = this;
            if (pagesize === "num") {
                that.search_data.pageNum = pageval || that.page_list.page_num;
                that.search_data.pageSize = that.page_list.page_size;
            } else {
                that.search_data.pageNum = that.page_list.page_num;
                that.search_data.pageSize = pageval || that.page_list.page_size;
            }
            that.$ajaxWrap({
                type: "post",
                url: "role/index",
                data: that.search_data,
                success(res) {
                    that.loadPageDate(res.data.page);
                }
            })
        },

        // 分页
        currentPageChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            }
        },

        currentSizeChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "size");
            }
        },
        addGroup(id) {
            let that = this;
            that.add_group = true;
            if (!id) {
                that.model_title = "增加分组";
                that.change_status = false;
            } else {
                that.model_title = "修改分组";
                that.change_status = true;
                that.$ajaxWrap({
                    type: "get",
                    url: "role/queryById",
                    data: {
                        roleId: id
                    },
                    success(res) {
                        that.add_info = res.data.data;
                    }
                });
            }
        },
        saveModelData() {
            let that = this;
            if (that.change_status == false) {
                that.add_info.id = 0;
            };
            that.$ajaxWrap({
                type: "post",
                url: "role/addRole",
                data: that.add_info,
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: 'success'
                    });
                    that.add_group = false;
                    that.getTableData();
                }
            });
        },

        //组内多选框
        selectedMian(event) {
            let that = this;
            this.selectedChecked = event.target.checked ? this.selectedEmpList : [];
            this.isSelected = false;
            if (!event.target.checked) {
                that.selectedChecked = [];
                that.selectedEmpList = [];
                that.isCheckedList = [];
                that.isIndeterminate = false;
            } else {
                that.isIndeterminate = true;
            }
        },
        selecteList(value, event) {
            let selectedCount = value.length;
            this.selectedAll = selectedCount === this.selectedEmpList.length;
            this.isSelected = selectedCount > 0 && selectedCount < this.selectedEmpList.length;
        },

        //组外多选框
        AllMian(event) {
            let that = this;
            this.isCheckedList = event.target.checked ? this.allEmpList : [];
            this.isIndeterminate = false;
            if (!event.target.checked) {
                that.selectedChecked = [];
                that.selectedEmpList = [];
                that.isCheckedList = [];
                that.isSelected = false;
            } else {
                that.selectedChecked = that.allEmpList;
                that.selectedEmpList = that.allEmpList;
                that.isCheckedList = that.allEmpList;
                that.isSelected = true;
            }
        },
        AllList(value, event) {
            let selectedCount = value.length;
            this.checkAll = selectedCount === this.allEmpList.length;
            this.isIndeterminate = selectedCount > 0 && selectedCount < this.allEmpList.length;

        },

        other(event) {
            let that = this;
            if (event.target.checked) {
                for (let i = 0; i < that.Emp.length; i++) {
                    if (that.Emp[i].empNm === event.target.value) {
                        that.selected.push(that.Emp[i]);
                        that.selectedEmpList.push(that.Emp[i].empNm);
                        that.selectedChecked.push(that.Emp[i].empNm);
                    }
                }
            } else {
                that.selectedEmpList.splice(that.selectedEmpList.indexOf(event.target.value), 1);
            }
        },
        anther(event) {
            let that = this;
            if (!event.target.checked) {
                that.selectedEmpList.splice(that.selectedEmpList.indexOf(event.target.value), 1);
                that.isCheckedList.splice(that.isCheckedList.indexOf(event.target.value), 1);
            }
        },
        roleManage(id) {
            let that = this;
            that.out_row_id = id;
            that.role_management = true;
            that.$ajaxWrap({
                type: "get",
                url: "role/maintainEmpByRoleId",
                data: {
                    roleId: id
                },
                success(res) {
                    that.org_info = res.data.dataList;

                    //取值两组多选

                    //组内
                    that.selected = res.data.selectedEmpList;

                    //组外
                    that.Emp = res.data.allEmpList;
                    //每组多选的全选效果
                    let temp_arr = res.data.allEmpList
                    for (let i = 0; i < temp_arr.length; i++) {
                        let ret = temp_arr[i];
                        that.allEmpList.push(ret.empNm);
                    }
                    let seleted_arr = res.data.selectedEmpList;
                    for (let i = 0; i < seleted_arr.length; i++) {
                        let rec = seleted_arr[i];
                        that.selectedEmpList.push(rec.empNm);
                        that.isCheckedList.push(rec.empNm);
                        that.selectedChecked.push(rec.empNm);
                    }
                }
            });
        },
        saveMaintain() {
            let that = this;
            for (let i = 0; i < that.selectedChecked.length; i++) {
                for (let j = 0; j < that.Emp.length; j++) {
                    if (that.selectedChecked[i] === that.Emp[j].empNm) {
                        that.saveData.empIds.push(that.Emp[j].id);
                        that.saveData.id = that.out_row_id;

                    }
                }
            }
            that.saveData.empIds = that.saveData.empIds.join(",");
            that.$ajaxWrap({
                type: "post",
                url: "/role/saveMaintain",
                data: that.saveData,
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: 'success'
                    });
                    that.role_management = false;
                    that.refresh();
                    that.saveData.empIds = [];
                    that.saveData.id = undefined;
                    that.allEmpList = [];
                    that.selectedEmpList = [];
                    that.isCheckedList = [];
                    that.selectedChecked = [];
                }
            });
        },
        //组外选中数组isCheckedList ，渲染数组allEmpList
        //组内选中数组selectedChecked，渲染数组selectedEmpList
        changeDepm(id) {
            let that = this;
            that.allEmpList = [];
            that.isCheckedList = [];
            for (let i = 0; i < that.Emp.length; i++) {
                if (id === that.org_info[0].id) {
                    that.allEmpList.push(that.Emp[i].empNm);
                } else if (that.Emp[i].sysOrgId === id) {
                    that.allEmpList.push(that.Emp[i].empNm);
                }
            };
            for (let k = 0; k < that.selectedEmpList.length; k++) {
                for (let j = 0; j < that.allEmpList.length; j++) {
                    if (that.allEmpList[j] === that.selectedEmpList[k]) {
                        that.isCheckedList.push(that.allEmpList[j]);
                    }
                }
            };
        },
        closeModal() {
            let that = this;
            that.$baseConfirm("确定关闭？", function() {
                that.role_management = false;
                that.selectedEmpList = [];
                that.selectedChecked = [];
                that.isCheckedList = [];
                that.allEmpList = [];
                that.refresh();
            })
        },

        /**
         * 权限管理 coding by Alex 2017-09-05
         */
        openModal(id) {
            let that = this;

            that.jurisdiction = true;
            that.roleId = id;

            that.$ajaxWrap({
                url: "sysbutton/getMenus",
                data: {
                    roleId: id
                },
                success(res) {
                    // that.button_list = res.data.dicData;
                    that.cache_list = res.data.dicData;
                    that.createdButtonTree(res.data);
                }
            })
        },

        createdButtonTree(data) {
            let that = this,
                res = data.dicData,
                temp = [],
                ret = [],
                res_len = res.length;

            for (let i = 0; i < res_len; i++) {
                let el = res[i],
                    el_len = el.secondMenuList.length;

                temp[i] = {
                    id: el.id,
                    menuName: el.menuName,
                    chooseType: el.chooseType
                }
                ret[i] = {
                    id: el.id,
                    menuName: el.menuName,
                    chooseType: el.chooseType
                }

                if (el_len) {

                    temp[i].secondMenuList = [];
                    ret[i].secondMenuList = [];

                    for (let j = 0; j < el_len; j++) {
                        let els = el.secondMenuList[j],
                            els_len = els.sysButtonList.length;

                        temp[i].secondMenuList[j] = {
                            menuId: els.id,
                            menuName: els.menuName,
                            chooseType: els.chooseType,
                            isChecked: []
                        }
                        ret[i].secondMenuList[j] = {
                            menuId: els.id,
                            menuName: els.menuName,
                            chooseType: els.chooseType,
                            isChecked: []
                        }

                        if (els_len) {

                            temp[i].secondMenuList[j].sysButtonList = [];
                            ret[i].secondMenuList[j].sysButtonList = [];

                            for (let k = 0; k < els_len; k++) {
                                let bel = els.sysButtonList[k];

                                ret[i].secondMenuList[j].sysButtonList[k] = {
                                    buttonId: bel.id,
                                    buttonName: bel.buttonName,
                                    chooseType: bel.chooseType
                                }

                                temp[i].secondMenuList[j].sysButtonList[k] = bel.buttonName;

                                if (bel.chooseType === "1") {
                                    temp[i].secondMenuList[j].isChecked.push(bel.buttonName);
                                    ret[i].secondMenuList[j].isChecked.push(bel.id);
                                }
                            }
                        }
                    }
                }
            }
            that.button_list = temp;
            that.cache_list = ret;
        },


        confirmSendData() {
            let that = this,
                send_data = that.handleDataTree();

            that.$baseConfirm("请确定是否提交？", function() {
                that.$ajaxWrap({
                    type: "post",
                    url: "sysbutton/saveMenus",
                    data: {
                        id: that.roleId,
                        menuIds: send_data
                    },
                    success(res) {
                        that.$baseWarn("保存成功！", function() {
                            that.clearModal();
                        })
                    }
                })
            })
        },

        confirmCloseModal() {
            let that = this;
            that.$baseConfirm("请确定是否关闭！", function() {
                that.clearModal();
            })
        },

        clearModal() {
            this.jurisdiction = false;
            this.button_list = [];
            this.cache_list = [];
        },

        handleDataTree() {
            let that = this,
                list = that.button_list,
                cache_list = that.cache_list,
                list_len = list.length,
                temp = [];

            let num = 0;

            for (let i = 0; i < list_len; i++) {
                let el = list[i],
                    el_list = el.secondMenuList,
                    el_len = el_list.length;

                let cache_el = cache_list[i],
                    cache_el_list = cache_el.secondMenuList;

                if (el_list && el_len) {
                    for (let j = 0; j < el_len; j++) {
                        let els = el_list[j],
                            els_list = els.sysButtonList || [],
                            els_len = els_list.length,
                            check = els.isChecked,
                            check_len = check.length;

                        let cache_els = cache_el_list[j],
                            cache_els_list = cache_els.sysButtonList || [];

                        if (check_len) {
                            temp.push({
                                id: els.menuId,
                                buttonIds: []
                            })
                            num++;

                            for (let k = 0; k < els_len; k++) {
                                for (let l = 0; l < check_len; l++) {
                                    if (els_list[k] === check[l]) {
                                        temp[num - 1].buttonIds[l] = {
                                            id: cache_els_list[k].buttonId
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return temp;

        }
    }
}