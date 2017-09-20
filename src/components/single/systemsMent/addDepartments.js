import Vue from "vue"
export default {
    name: 'addDepartment',
    created() {
        this.init();
    },
    data() {
        return {
            table_data:[{
                orgName:undefined
            }],
            show_tips : [{
                show : true
            }],
            form_data :[
            ],
            department_obj : {
                id : 0,
                orgName : "",
                parentId : ""
            },
            main_title : undefined,
        }
    },
    methods:{
        backToOrg(){
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
                data:{
                    orgId:0
                },
                success(res) {
                    let dataList = res.data.dataList;
                    that.show_tips = [];
                    for(var i = 0;i<dataList.length;i++){
                        that.show_tips.push({show : dataList[i].orgName==='精益达' ? false : true});
                    }
                    that.table_data = dataList;
                }
            })
        },

        orgDetali(row,col,cell){
            let that = this;
            that.department_obj.parentId = row.id;
            if(cell.children[0].textContent !== "编辑 删除"){
                that.main_title ="-" + cell.children[0].textContent;
                if(cell.children[0].textContent=="精益达"){
                    that.main_title =""; 
                }
                that.$ajaxWrap({
                    type: "get",
                    url: "/sysOrganization/updatecClick",
                    data:{
                        orgId:row.id
                    },
                    success(res) {
                        that.form_data = [];
                        that.form_data = res.data.data.childList
                        
                    }
                })
            }
        },
        editorgDetali(id){
            let that = this; 
            that.$ajaxWrap({
                type: "get",
                url: "/sysOrganization/updatecClick",
                data:{
                    orgId:id
                },
                success(res) {
                    that.form_data = res.data.data.childList
                    
                }
            })
        },
        addNewDepart(){
            let that = this ;
            if(that.form_data.length < 9){
                let temp = that.$deepCloneObject(that.department_obj);
                that.form_data.push(temp);
            }
        },
        updataDepartment(){
            let that = this;
            that.$ajaxWrap({
                type: "POST",
                url: "sysOrganization/addOrganization",
                data:{
                    childList:that.form_data},
                success(res) {
                    that.getPageData() 
                }
            })
        },
        deleteStaff(id){
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
    }
}