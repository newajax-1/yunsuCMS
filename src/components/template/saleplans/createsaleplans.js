export default {
    name: "createsaleplan",
    created() {
        this.init();
    },
    data() {
        return {
            tab_name: undefined,
            plan_id: undefined,
            guest_name_data: null,
            sale_plan_data: null,
            modify_detail_id: undefined,
            table_data_length: 0,

        }
    },
    methods: {
        init() {
            this.tab_name = this.$route.query.tab_name;
            this.plan_id = this.$route.query.plan_id || "";
            if (this.plan_id) {
                this.getSalePlanData(this.plan_id);
            }
        },

        getSalePlanData(plan_id) {
            let that = this;

            if (!plan_id) {
                that.$ajaxWrap({
                    url: "plan/addPlanOnclick",
                    success(res) {
                        that.guest_name_data = res.data.dataList;
                    }
                })
            } else {
                that.$ajaxWrap({
                    url: "plan/updatePlanOnclick",
                    data: {
                        planId: plan_id
                    },
                    success(res) {
                        that.guest_name_data = res.data.dataList;
                        that.sale_plan_data = res.data.data.planDetailList;
                        that.table_data_length = that.sale_plan_data.length;
                        that.modify_detail_id = plan_id;
                    }
                })
            }
        },

        comebackSalePlan() {
            let that = this;
            that.$goRoute("/home/saleplan/", { tab_name: that.tab_name });
        }
    }
}