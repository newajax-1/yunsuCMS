export default {
    name: 'proMonitoring',
    data() {
        return {
            table_data: [],
            new_custom: false,
            bad_table_data: [],
            search_pageNum: undefined,
            search_pageSize: undefined,

            // 搜索条件
            seach_info: {
                product_no: undefined,
                item_no: undefined,
                start_time: undefined,
                end_time: undefined,
            },
            page_list: {
                page_num: 1,
                page_size: 15,
                total: 0
            }
        }
    },
    methods: {
        // 页面加载
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type: "post",
                url: "/workPlanContrl/queryList",
                data: {
                    productNo: that.seach_info.product_no,
                    itemNo: that.seach_info.item_no,
                    startTime: that.seach_info.start_time && that.$handleDateObject(that.seach_info.start_time),
                    endTime: that.seach_info.end_time && that.$handleDateObject(that.seach_info.end_time),
                    pageSize: that.search_pageSize || 15,
                    pageNum: that.search_pageNum || 1
                },
                callback: function(data) {
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

        // 重置
        reset() {
            this.$clearObject(this.seach_info);
        },

        showDetail(obj) {
            var that = this;
            this.new_custom = true;
            this.$ajaxWrap({
                type: "post",
                url: "/workPlanContrl/queryRjctList",
                data: {
                    productNo: obj.productNo,
                    billNo: obj.billNo
                },
                callback: function(data) {
                    that.bad_table_data = data.data.data;
                },
                error(res) {
                    //do error function
                }
            })
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
    },
    mounted() {
        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    },
}