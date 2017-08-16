export default {
    name: 'mouldInfoSuccessDetail',
    created() {
        var that = this;
        EventBus.$on("mouldId",function(data){
            that.mould_id = data.mouldId;
            that.init();
        })
    },
    data() {
        return {
            first_data : [],
            second_data : [],
            third_data : [],
            fourth_data : [],
            fifth_data : [],
            other_data : [],

            show_table : {
                first_show : true,
                second_show : false,
                third_show : false,
                fourth_show : false,
                fifth_show : false,
                other_show : false,
            },

            add_info : {
                oldMouldNo : undefined,
                newMouldNo : undefined,
            },

            mould_no : [
                {
                    name : "11111",
                    value : "01", 
                },
                {
                    name : "22222",
                    value : "02", 
                },
                {
                    name : "33333",
                    value : "03", 
                }
            ],

            mould_id : undefined,
            change_rec_id : undefined,
            new_custom : false,
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
                    console.log(res)
                    that.loadTable(res.data);
                }
            })
        },

        loadTable(data) {
            let that = this;
            that.first_data = [];
            that.second_data = [];
            that.third_data = [];
            that.fourth_data = [];
            that.fifth_data = [];
            that.other_data = [];
            switch (that.operation_type) {
                case "1":
                    that.first_data.push(data.mould);
                    break;
                case "2":
                    that.second_data = data.bomList;
                    break;
                case "3":
                    that.third_data = data.maintList;
                    break;
                case "4":
                    that.fourth_data = data.repairList;
                    break;
                case "5":
                    that.fifth_data = data.recList;
                    break;
                case "6":
                    that.other_data = data.acptList;
                    var _data = data.acptItemList
                    for(var i = 0; i <  that.other_data.length; i++) {
                        var _name = _data[i].dicName;
                        var _value = _data[i].dicValue;
                        that.other_data[i].acptItm = _name;
                        that.other_data[i].dicOrder = _value;
                    }
                    break;
                default :
                    that.first_data = data.page.list;
                    break;
            }
        },

        toAdd(id) {
            let that = this;
            this.change_rec_id = id;
            this.$clearObject(this.add_info)
            this.new_custom = true;

            if(id) {
                this.$ajaxWrap({
                    type: "post",
                    url: "/change/initData",
                    data: {
                        changeRecId : that.change_rec_id,
                        mouldId : that.mould_id,
                    },
                    success(res) {
                        that.add_info = res.data.data
                    }
                })
            }
        },

        saveInfo() {
            let that = this;

            this.$ajaxWrap({
                type: "post",
                url: "/change/saveChange",
                data: {
                    changeRecId : that.change_rec_id,
                    mouldId : that.mould_id,
                    oldMouldNo : that.add_info.oldMouldNo,
                    oldMouldCode : that.add_info.oldMouldCode,
                    chgCnt : that.add_info.chgCnt,
                    chgItm : that.add_info.chgItm,
                },
                success(res) {
                    that.$message({
                        message: res.tipMsg,
                        type: "success" 
                    });
                    that.new_custom = false;
                    that.getTableData();
                }
            })
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
                    this.operation_type = "2";
                    this.show_table.second_show = true;
                    this.getTableData();
                    break;
                case "third":
                    this.operation_type = "3";
                    this.show_table.third_show = true;
                    this.getTableData();
                    break;
                case "fourth":
                    this.operation_type = "4";
                    this.show_table.fourth_show = true;
                    this.getTableData();
                    break;
                case "fifth":
                    this.operation_type = "5";
                    this.show_table.fifth_show = true;
                    this.getTableData();
                    break;
                case "other":
                    this.operation_type = "6";
                    this.show_table.other_show = true;
                    this.getTableData();
                    break;
                default :
                    this.operation_type = "1";
                    this.show_table.first_show = true;
                    this.getTableData();
                    break;
            }
        },

        changeOldRecId(val) {
            let that = this;
            console.log(val)

            // this.$ajaxWrap({
            //     type: "post",
            //     url: "/change/getOldMouldCode",
            //     data: {
            //         oldMouldNo : id,
            //         mouldId : that.mould_id,
            //     },
            //     success(res) {
            //         console.log(res)
            //     }
            // })
        },

        // 点击关闭
        closeDialog() {
            var that = this;
            this.$confirm("你确定关闭么？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
            }).then(function() {
                that.new_custom = false;
            }).catch(function() {});
        },
    },
}
