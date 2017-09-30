export default {
    name: 'proMonitoring',
    data() {
        return {
            table_data: [],
            new_custom: false,
            search_pageNum: undefined,
            search_pageSize: undefined,

            // 搜索条件
            seach_info: {
                oprt_type: 0,
                machine: undefined,
                bill_no: undefined,
                rpter: undefined,
                start_time: undefined,
                end_time: undefined,
            },
            page_list: {
                page_num: 1,
                page_size: 15,
                total: 0
            },
            alarm_source: "01",
            sale_change_name: "first",
            buttonsRightList: []
        }
    },
    methods: {
        // 页面加载
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type: "post",
                url: "/machineAlarm/loadTable",
                data: {
                    alarmSource: that.alarm_source,
                    oprtType: that.seach_info.oprt_type,
                    machine: that.seach_info.machine,
                    billNo: that.seach_info.bill_no,
                    rpter: that.seach_info.rpter,
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
                    that.buttonsRightList = data.data.button;
                },
                error() {
                    //do error function
                }
            })
        },

        // 重置
        reset() {
            var _oprt_type = this.seach_info.oprt_type;
            this.$clearObject(this.seach_info);
            this.seach_info.oprt_type = _oprt_type;
        },

        // 刷新
        refresh() {
            this.reset();
            this.loadTable()
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
                    this.seach_info.oprt_type = 0;
                    this.refresh();
                    break;
                case "second":
                    this.seach_info.oprt_type = 1;
                    this.refresh();
                    break;
                default:
                    this.seach_info.oprt_type = 0;
                    this.refresh();
                    break;
            }
        },
    },
    mounted() {
        //当组件模板挂载时数据显示到上面去。
        this.loadTable();
    },
}