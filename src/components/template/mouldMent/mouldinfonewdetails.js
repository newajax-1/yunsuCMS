export default {
    name: 'mouldInfoNewDetail',
    created() {
        this.mould_id = this.$route.query.mould_id
        this.init();
    },
    data() {
        return {
            first_data : [],
            second_data : [],

            show_table : {
                first_show : true,
                second_show : false,
            },

            mould_id : undefined,
            operation_type : "1",
            sale_change_name : "first",
        }
    },
    methods: {
        init() {
            this.getTableData();
        },

        getTableData() {
            let that = this;

            this.$ajaxWrap({
                type: "post",
                url: "/mould/detailMould",
                data: {
                    mouldId : that.mould_id,
                    operationType : that.operation_type
                },
                success(res) {
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            that.first_data = [];
            that.second_data = [];
            switch (that.operation_type) {
                case "1":
                    that.first_data.push(data.mould);
                    break;
                case "6":
                    that.second_data = data.acptList;
                    var _data = data.acptItemList
                    for(var i = 0; i <  that.second_data.length; i++) {
                        var _name = _data[i].dicName;
                        var _value = _data[i].dicValue;
                        that.second_data[i].acptItm = _name;
                        that.second_data[i].dicOrder = _value;
                    }
                    break;
                default :
                    that.first_data = data.page.list;
                    break;
            }
        },

        changeShow(obj) {
            if(obj.length == 0 ) {
                return;
            };
            for(var key in obj) {
                obj[key] = false;
            }
        },

        // table切换
        changeTableActive(val) {
            this.changeShow(this.show_table);
            switch (val.name) {
                case "first":
                    this.operation_type = "1";
                    this.show_table.first_show = true;
                    this.getTableData();
                    break;
                case "second":
                    this.operation_type = "6";
                    this.show_table.second_show = true;
                    this.getTableData();
                    break;
                default :
                    this.operation_type = "1";
                    this.show_table.first_show = true;
                    this.getTableData();
                    break;
            }
        },
    },
}
