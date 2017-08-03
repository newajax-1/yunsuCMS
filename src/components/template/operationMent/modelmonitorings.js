export default {
    name: 'proMonitoring',
    data() {
        return {
            table_data : [],
            search_pageNum : undefined,
            search_pageSize : undefined,
            is_show : true,
            sale_change_name : "first",
            seach_info : {
                oprt_typ : "01",
                product_no : undefined,
                machine : undefined,
                mould_code : undefined,
            },
            page_list : {
                page_size : 10,
                page_num : 1,
                total : 0
            },
        }
    },
    methods: {
        // 页面加载
        loadTable() {
            var that = this;
            that.page_list.total = 0;
            this.$ajaxWrap({
                type : "post",
                url : "/mouldopt/loadTable",
                data : {
                    oprtTyp : that.seach_info.oprt_typ,
                    productNo : that.seach_info.product_no,
                    machine : that.seach_info.machine,
                    mouldCode : that.seach_info.mould_code,
                    pageSize : that.search_pageSize || 10,
                    pageNum : that.search_pageNum || 1
                } ,
                success : function(data){
                    that.table_data = data.data.page.list;
                    that.page_list.total = data.data.page.total;
                    that.page_list.page_num = data.data.page.pageNum;
                    that.page_list.page_size = data.data.page.pageSize;
                },
                error(res) {
                    //do error function
                }
            }) 
        },

        // 上模
        changeMould(id, type) {
            var _oprtTyp = (type == "01" ? "02" : "03");
            var that = this;
            this.$ajaxWrap({
                type : "post",
                url : "/mouldopt/operationMouldOpt",
                data : {
                    mouldOptId : id,
                    oprtTyp : _oprtTyp,
                } ,
                success : function(data){
                    that.$message({
                        message: data.tipMsg,
                        type: "success"
                    });
                    that.loadTable();
                },
                error(res) {
                    //do error function
                }
            }) 
        },

        // 重置
        reset() {
            this.$clearObject(this.seach_info)
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
        // -----------------------------------------------------------------------------------------------------------------------------------      
        handleCurrentChange(val) {
            if (this.table_data.length) {
                this.searchFormData(val, "num");
            };
        },

        // table切换
        changeTableActive(val) {
            switch (val.name) {
                case "first":
                    this.seach_info.oprt_typ = "01";
                    this.is_show = true;
                    this.loadTable();
                    break;
                case "second":
                    this.seach_info.oprt_typ = "02";
                    this.is_show = true;
                    this.loadTable();
                    break;
                case "other":
                    this.seach_info.oprt_typ = "03";
                    this.is_show = false;
                    this.loadTable();
                    break;
            }
        },

        handleClose(done) {
            var that = this;
            that.$confirm("确定关闭吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function() {
                done();
                that.$clearObject(that.ruleForm)
                that.newListData = [];
            }).catch(function() {});
        },
    },
    mounted(){
        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    },
}
