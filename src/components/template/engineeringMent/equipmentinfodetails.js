export default {
    name: 'equipmentInfoDetail',
    created() {
        this.whole_id = this.$route.query.whole_id;
        this.whole_eqp_typ = this.$route.query.whole_eqp_typ;
        this.whole_no = this.$route.query.whole_no;
        this.init();
    },
    data() {
        return {
            first_data : [],
            second_data : [],
            third_data : [],
            other_data : [],
            table_show : {
                first_show : true,
                second_show : false,
                third_show : false,
                other_show : false,
            },
            sale_change_name : "first",
            whole_id : undefined,
            whole_eqp_typ : undefined,
            first_table_show : false,
            whole_no : undefined,
            query_type : "01",
        }
    },
    methods: {
        init() {
            this.getTableData();
        },

        getTableData() {
            let that = this;
            this.first_data = [];
            this.second_data = [];
            this.third_data = [];
            this.other_data = [];

            that.$ajaxWrap({
                type: "get",
                url: "/equipment/queryDetail",
                data: {
                    id : that.whole_id,
                    queryType : that.query_type
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },
        searchTableData() {
            let that = this;
            this.first_data = [];
            this.second_data = [];
            this.third_data = [];
            this.other_data = [];

            that.$ajaxWrap({
                type: "get",
                url: "/equipment/queryDetail",
                data: {
                    id : that.whole_no,
                    queryType : that.query_type
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        getOtherTableData() {
            let that = this;
            this.first_data = [];
            this.second_data = [];
            this.third_data = [];
            this.other_data = [];

            that.$ajaxWrap({
                type: "get",
                url: "/equipment/queryMachinePad",
                data: {
                    id : that.whole_no,
                    queryType : that.query_type
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            if(that.table_show.first_show) {
                that.whole_eqp_no = data.data.eqpNo;
                for (var key in data.data) {
                    switch (data.data.eqpSts) {
                        case "01":
                        	data.data.eqpSts = "正常";
                            break;
                        case "02":
                        	data.data.eqpSts = "保养";
                            break;
                        case "03":
                        	data.data.eqpSts = "维修"
                            break;
                    }
                }
                that.first_data.push(data.data);
                return; 
            };
            if(that.table_show.second_show) {
                that.second_data = data.dataList;
                return;
            };
            if(that.table_show.third_show) {
                that.third_data = data.dataList;
                return;
            };
            if(that.table_show.other_show) {
                that.other_data = data.dataList;
                return;
            };
        },

        binding(id) {
            let that = this;
            this.$confirm("你确定接触绑定吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.$ajaxWrap({
                    type: "post",
                    url: "/equipment/operationBind",
                    data: {
                        id : id,
                        operationType : "unbundling"
                    },
                    success(res) {
                        that.$message({
                            message: res.tipMsg,
                            type: "success"
                        });
                        that.getOtherTableData();
                    }
                })
            }).catch(function() {});
        },

        clearTable(obj) {
            if(obj.length == 0) {
                return;
            };
            for(var key in obj) {
                obj[key] = [];
            }
        },

        changeFalse(obj) {
            if(obj.length == 0) {
                return;
            };
            for(var key in obj) {
                obj[key] = false;
            }
        },

        // table切换
        changeTableActive(val) {
            this.changeFalse(this.table_show);
            switch (val.name) {
                case "first":
                    this.table_show.first_show = true;
                    this.query_type = "01";
                    this.getTableData();
                    break;
                case "second":
                    this.table_show.second_show = true;
                    this.query_type = "02";
                    this.searchTableData();
                    break;
                case "third":
                    this.table_show.third_show = true;
                    this.query_type = "03";
                    this.searchTableData();
                    break;
                case "other":
                    this.table_show.other_show = true;
                    this.query_type = "04";
                    var _whole_eqp_typ = this.whole_eqp_typ;
                    if(_whole_eqp_typ == "01") {
                        this.first_table_show = false;
                        this.getOtherTableData();
                    }else{
                        this.first_table_show = true;
                        this.searchTableData();
                    }
                    break;
                default :
                    this.table_show.first_show = true;
                    this.query_type = "01";
                    this.getTableData();
            }
        },
    },
}
