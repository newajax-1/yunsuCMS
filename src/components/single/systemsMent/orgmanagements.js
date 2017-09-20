import Qs from 'qs'
export default {
    name: 'orgManagement',
    created() {
        this.init();
    },
    data() {

        return {
            sys_organization:[
                {
                    orgName:undefined,
                    id:undefined
                }
            ],
            //查询条件
            form_data: {
                empNo: undefined,
                empNm: undefined,
                jobTitle: undefined,
            },
            //员工改动弹窗
            staff_vision:false,

            //分页
            page_list: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            search_pageNum: undefined,
            search_pageSize: undefined,
            table_data: [{
                empNm: undefined,
                empNo: undefined,
                gender: undefined,
                jobTitle: undefined,
                emailNo: undefined,
                telephone: undefined,
                roleName: undefined,
            }],
            modal_form_data:{
                orgName:undefined,
                roleName:undefined,
                empNm:undefined,
                gender:undefined,
                empNo:undefined,
                jobTitle:undefined,
                telephone:undefined,
                password:undefined,
                emailNo:undefined,
                autorityPad:'',
                autorityPda:'',
                autorityPc:'',
                id:undefined,
                sysOrgId:undefined
            },

            table_btn_right : [{
                show : true
            }],

            staff_org_data:undefined,
            staff_role_data:undefined,
            model_title:undefined,
            role_data:[],
            role_vision:undefined,
            add_info:[],
            change_status:true,
            frozen_statue:false,
            restart_status:false,

        }
    },
    methods: {
        handleOpen(key, keyPath) {},

        handleClose(key, keyPath) {},
        init() {
            this.reset();
            this.getPageData();
        },
        reset() {
            let that = this;
            that.$clearObject(that.form_data);
        },
        refresh() {
            this.reset();
            this.searchFormData();
        },
        getPageData() {
            let that = this;
            that.$ajaxWrap({
                type: "post",
                url: "sysOrganization/index",
                success(res) {
                    console.log(res);
                    that.loadPageDate(res.data);
                }
            })
        },
        loadPageDate(data) {
            let that = this,
                load_table_data = data.page.list,
                load_orgData = data.dataList;

                that.table_btn_right = [];
                for(var i = 0; i<load_table_data.length;i++){
                    load_table_data[i].gender = load_table_data[i].gender === 1 ? "女":"男";
                    let el = load_table_data[i];
                    load_table_data[i].index = that.page_list.pageSize*(that.page_list.pageNum - 1) + i + 1;
                    // if(el.empStatus === 11){
                    //     that.table_btn_right.push()
                    //     that.frozen_statue = true;
                    //     that.restart_status = false;
                    // }else if(el.empStatus === 10){
                    //     that.frozen_statue = false;
                    //     that.restart_status = true;
                    // }
                    
                    that.table_btn_right.push({show: el.empStatus === 11 ? true : false})
                };

            that.table_data = load_table_data;
            that.sys_organization = load_orgData;
            that.page_list.pageNum = data.page.pageNum;
            that.page_list.pageSize = data.page.pageSize;
            that.page_list.total = data.page.total - 0;
        },
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
        searchFormData(pageval, pagesize) {
            let that = this,
                search_data = that.form_data;
            if (pagesize === "num") {
                search_data.pageNum = pageval || that.page_list.pageNum;
                search_data.pageSize = that.page_list.pageSize;
            } else {
                search_data.pageNum = that.page_list.pageNum;
                search_data.pageSize = pageval || that.page_list.pageSize;
            }

            that.$ajaxWrap({
                type: "post",
                url: "sysOrganization/index",
                data: search_data,
                success(res) {
                    that.loadPageDate(res.data);
                }
            });
        },
        openStaff(id){
            console.log(id);
            let that = this;
            that.staff_vision= true;
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
            if(!id){
                that.model_title = "增加员工";
                that.change_status = false;
            }else{
                that.model_title = "修改员工";
                that.change_status = true;
                that.$ajaxWrap({
                    type: "get",
                    url: "emp/addOrUpdateClick",
                    data: {
                        empId: id
                    },
                    success(res) {
                        let form_res = res.data.data;
                        form_res.autorityPc = form_res.autorityPc == 0 ? false :true;
                        form_res.autorityPda = form_res.autorityPda == 0 ? false :true;
                        form_res.autorityPad = form_res.autorityPad == 0 ? false :true;
                        that.modal_form_data = form_res;
                        that.modal_form_data.password = "******"
                    }
                });
            }
        },
        saveModelData(){
            let that = this;
            console.log(that.modal_form_data);
            that.modal_form_data.autorityPad = that.modal_form_data.autorityPad === true ? 0 : 1;
            that.modal_form_data.autorityPda = that.modal_form_data.autorityPda === true ? 0 : 1;
            that.modal_form_data.autorityPc = that.modal_form_data.autorityPc === true ? 0 : 1;
            if(that.change_status == false){
                that.modal_form_data.id=0;};
            if(that.modal_form_data.password == "******"){
                that.modal_form_data.password = undefined;
            }
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
            this.$clearObject(this.modal_form_data);
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.staff_vision = false;
            }).catch(function() {});
        },
        deleteStaff(id){
            let that = this;
            this.$confirm("你确定删除这条数据吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "get",
                    url: "emp/deleteById",
                    data: {
                        empId: id
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
        goAddDepartment(){
            this.$goRoute("/home/addDepartment");
        },
        changeDepm(id){
            console.log(id);
            let that = this;
            that.$ajaxWrap({
                type: "post",
                url: "sysOrganization/index",
                data: {
                    sysOrgId: id
                },
                success(res){

                    that.loadPageDate(res.data);
                }
            })

        },
        //分组弹窗
        toAddRole() {
            let that = this;
            that.$ajaxWrap({
                type: "get",
                url: "emp/addOrUpdateClick",
                data: {
                    empId: 0
                },
                success(res) {
                    that.role_data = res.data.ROLE_LIST;
                }
            })
            this.role_vision = true;
        },
        // 复选框勾选
        handleSelectionChange(val) {
            var batch_ids = [];
            var batch_names = [];
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    batch_ids.push(val[i].id);
                    batch_names.push(val[i].roleName);
                }
                this.batch_names = batch_names.join(",");
                this.batch_ids = batch_ids.join(",");
            }
        },
        saveRoleInfo(){
            this.modal_form_data.roleName = this.batch_names;
            this.modal_form_data.roleIds = this.batch_ids;
            this.role_vision = false;
        },
        goAddDep(){
            this.$goRoute("/home/addDepartment");
        },
        frozen(id){
            let that = this;
            that.$ajaxWrap({
                type: "get",
                url: "emp/frozenEmp",
                data: {
                    empId: id
                },
                success(res) {
                    that.getPageData();
                }
            })
        },
        restart(id){
            let that = this;
            that.$ajaxWrap({
                type: "get",
                url: "memberAccount/addMemberAccount",
                data: {
                    empId: id
                },
                success(res) {
                    that.getPageData();
                }
            })
        },
    },
    //当加载页面的时候调用
    mounted() {
    }
}