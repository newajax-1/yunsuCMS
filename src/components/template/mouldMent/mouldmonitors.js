export default {
    name: 'proMonitoring',
    data() {
        return {
            table_data: {
                JZGL: {
                    whole: 0,
                    normal: 0,
                    maintain: 0,
                    repair: 0
                },
                    GDYKGG: {
                    whole: 0,
                    normal: 0,
                    maintain: 0,
                    repair: 0
                },
                TXC: {
                    whole: 0,
                    normal: 0,
                    maintain: 0,
                    repair: 0
                },
                FJ: {
                    whole: 0,
                    normal: 0,
                    maintain: 0,
                    repair: 0
                },
                XHXT: {
                    whole: 0,
                    normal: 0,
                    maintain: 0,
                    repair: 0
                },
                ZSJ: {
                    whole: 0,
                    normal: 0,
                    maintain: 0,
                    repair: 0
                }
            }
        }
    },
    methods: {
        loadTable() {
            var that = this;
            this.$ajaxWrap({
                type : "get",
                url : "/equipment/queryCountByType",
                data : {} ,
                success : function(data){
                    that.table_data = data.data.data;
                },
                error() {
                    //do error function
                }
            })
        },
    },
    mounted(){
        //当组件模板挂载时数据显示到上面去。
        this.loadTable()
    },
}
