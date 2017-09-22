import Vue from "vue"
export default {
    name: 'addDepartment',
    created() {
        this.init();
    },
    data() {
        return {
            table_data: [{
                orgName: undefined
            }],
            show_tips: [{
                show: true
            }],
            form_data: [],
            department_obj: {
                id: 0,
                orgName: "",
                parentId: ""
            },
            main_title: undefined,
            staff_org_data: undefined,
            staff_role_data: undefined,
            modal_form_data: {
                orgName: undefined,
                roleName: undefined,
                empNm: undefined,
                gender: undefined,
                empNo: undefined,
                jobTitle: undefined,
                telephone: undefined,
                password: undefined,
                emailNo: undefined,
                autorityPad: '',
                autorityPda: '',
                autorityPc: '',
                id: undefined,
                sysOrgId: undefined
            },
            name_arr: [],
            batch_ids: [],
            batch_names: undefined,
            staff_vision: false,
            change_status: undefined,
            role_vision: undefined,
            model_title: undefined,
            batch_names: undefined,
            dataList: [],
            company_title: ""
        }
    },
    methods: {
        backToOrg() {
            this.$goRoute("/home/orgManagement");
        },
        init() {
            this.getPageData();
        },
        getPageData() {
            let that = this;
            that.$ajaxWrap({
                type: "get",
                url: "/sysOrganization/maintainOrg",
                data: {
                    orgId: 0
                },
                success(res) {
                    let fist_data = res.data.dataList[0];

                    that.dataList = res.data.dataList;
                    that.show_tips = [];
                    for (var i = 0; i < that.dataList.length; i++) {
                        that.show_tips.push({ show: that.dataList[i].orgName === fist_data.orgName ? false : true });
                    }
                    that.table_data = that.dataList;
                    that.company_title = that.dataList[0].orgName;
                    that.main_title = that.company_title;

                    that.$ajaxWrap({
                        url: "/sysOrganization/updatecClick",
                        data: {
                            orgId: fist_data.id
                        },
                        success(res) {
                            that.form_data = [];
                            that.form_data = res.data.data.childList;
                        }
                    })
                }
            })
        },

        orgDetali(row, col, cell) {
            let that = this;
            that.department_obj.parentId = row.id;
            if (cell.children[0].textContent !== "编辑 删除") {
                that.main_title = that.company_title + "-" + cell.children[0].textContent;
                if (cell.nextSibling.children[0].children[0].style.display === "none") {
                    that.main_title = that.company_title;
                }
                that.$ajaxWrap({
                    url: "/sysOrganization/updatecClick",
                    data: {
                        orgId: row.id
                    },
                    success(res) {
                        that.form_data = [];
                        that.form_data = res.data.data.childList

                    }
                })
            }
        },
        editorgDetali(id) {
            let that = this;
            that.$ajaxWrap({
                type: "get",
                url: "/sysOrganization/updatecClick",
                data: {
                    orgId: id
                },
                success(res) {
                    that.form_data = res.data.data.childList

                }
            })
        },
        addNewDepart() {
            let that = this;
            if (that.form_data.length < 9) {
                let temp = that.$deepCloneObject(that.department_obj);
                that.form_data.push(temp);
            }
        },
        updataDepartment() {
            let that = this;
            that.$ajaxWrap({
                type: "POST",
                url: "sysOrganization/addOrganization",
                data: {
                    childList: that.form_data
                },
                success(res) {
                    that.$baseWarn("保存成功！");
                    that.getPageData();
                }
            })
        },
        deleteStaff(id) {
            let that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "sysOrganization/deleteById",
                    data: {
                        orgId: id
                    },
                    callback: function(data) {
                        that.$message({
                            message: "删除成功！",
                            type: "success"
                        });
                        that.getPageData();
                    }
                })
            }).catch(function() {});
        },
        openStaff(id) {

            let that = this;
            that.staff_vision = true;
            that.$ajaxWrap({
                type: "get",
                url: "emp/addOrUpdateClick",
                data: {
                    empId: 0
                },
                success(res) {
                    that.staff_org_data = res.data.ORG_LIST;
                    that.staff_role_data = res.data.ROLE_LIST;
                }
            });

            if (!id) {
                that.model_title = "增加员工";
                that.change_status = false;
            }
        },
        saveModelData() {
            let that = this;
            that.modal_form_data.autorityPad = that.modal_form_data.autorityPad === true ? 0 : 1;
            that.modal_form_data.autorityPda = that.modal_form_data.autorityPda === true ? 0 : 1;
            that.modal_form_data.autorityPc = that.modal_form_data.autorityPc === true ? 0 : 1;
            if (that.change_status == false) {
                that.modal_form_data.id = 0;
            };
            if (that.modal_form_data.password == "******") {
                that.modal_form_data.password = undefined;
            };
            that.modal_form_data.roleIds = that.batch_ids;
            that.$ajaxWrap({
                type: "post",
                url: "emp/save",
                data: that.modal_form_data,
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: 'success'
                    });
                    that.staff_vision = false;
                    that.getPageData();
                }
            });
        },
        // 点击关闭
        closeDialog() {
            var that = this;

            that.$baseConfirm("你确定关闭么？", function() {

                that.$clearObject(that.modal_form_data);
                that.staff_vision = false;
                that.batch_names = "";
                that.batch_ids = "";
            })
        },
        //分组弹窗
        toAddRole() {
            let that = this;

            // that.role_data = that.form_res.sysRoleList;
            // for( let i = 0; i<that.role_data.length; i++){
            //     that.name_arr.push(that.role_data[i].roleName)
            // }

            this.role_vision = true;
        },
        // 复选框勾选
        handleSelectionChange(val) {
            let that = this;
            that.batch_ids = [];
            that.batch_names = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    that.batch_ids.push(val[i].id);
                    that.batch_names.push(val[i].roleName);
                }
                that.batch_names = that.batch_names.join(",");
                that.batch_ids = that.batch_ids.join(",");
            }
        },
        saveRoleInfo() {
            this.modal_form_data.roleName = this.batch_names;
            this.modal_form_data.roleIds = this.batch_ids;
            this.role_vision = false;
        },

    }
}