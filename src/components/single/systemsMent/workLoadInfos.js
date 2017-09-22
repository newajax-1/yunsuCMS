import Vue from "vue"
export default {
    name: 'workLoadInfo',
    data() {
        return{
            empNo:undefined,
            table_data:[{
                billNo:undefined,
                week:undefined,
                clas:undefined,
                itemNo:undefined,
                machine:undefined,
                quantity:undefined,
                startTm:undefined,
                actQuantity:undefined,
                endTm:undefined, 
            }],
            form_data:{
                billNo:"",
                week:""
            },
            //分页
            page_list: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            download_url:""
        }
    },
    methods: {
        init() {
            this.reset();
            this.getTableData();
        },
        reset() {
            let that = this;
            that.$clearObject(that.form_data);
        },
        refresh() {
            let that = this;
            that.reset();
            that.searchFormData();
        },

        getTableData(){
            let that = this;
            that.$ajaxWrap({
                type:"post",
                url: "emp/queryEmpWorkDetail",
                success(res){
                    that.loadTable(res);
                }
            })
        },
        _export(){
            let that = this;
            this.download_url = BaseUrl +"/emp/downloadEmpWorkDetail?empNo="+that.empNo+"&billNo="+that.table_data[0].billNo+"&week="+that.table_data[0].week
        },
        loadTable(data) {
            let that = this,
                load_table_data = data.data.page.list;

            that.table_data = load_table_data;
            that.page_list.pageNum = data.data.page.pageNum;
            that.page_list.pageSize = data.data.page.pageSize;
            that.page_list.total = data.data.page.total;
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
            
                search_data.empNo = that.empNo;
            if(!search_data.billNo&&!search_data.week){
                search_data = {};
                search_data.empNo = that.empNo;
            } 

            if (pagesize === "num") {
                search_data.pageNum = pageval || that.page_list.pageNum;
                search_data.pageSize = that.page_list.pageSize;
            } else {
                search_data.pageNum = that.page_list.pageNum;
                search_data.pageSize = pageval || that.page_list.pageSize;
            }
            that.$ajaxWrap({
                type :"post",
                url: "emp/queryEmpWorkDetail",
                data: search_data,
                success(res) {
                    console.log(res);
                    that.loadTable(res);
                }
            });
        },
    },
    created() {
        let that = this;
        this.init();
    }
}