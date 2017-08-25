export default {
    name: 'home',
    data() {
        return {
            machine_item: [{
                    title: "待处理任务",
                    math: 30
                },
                {
                    title: "未抄送我的任务",
                    math: 17
                },
                {
                    title: "未阅读消息",
                    math: 23
                }
            ],
            manage_item: [{
                    title: "销售管理",
                    path: "/home/saleplan"
                },
                {
                    title: "生产计划管理",
                    path: "/home/weekprodplans"
                },
                {
                    title: "生产作业管理",
                    path: "/home/workmonitoring"
                },
                {
                    title: "工程管理",
                    path: "/home/statusmonitor"
                },
                {
                    title: "品质管理",
                    path: "/home/mouldinfo"
                }
            ],
            manage_item_2: [{
                    title: "员工管理",
                    path: "/home/staffmanagement"
                },
                {
                    title: "库存管理",
                    path: "/home"
                },
                {
                    title: "模具管理",
                    path: "/home/mouldinfo"
                },
                {
                    title: "看板管理",
                    path: "/home"
                },
                {
                    title: "采购管理",
                    path: "/home"
                }
            ],
        }
    }
}