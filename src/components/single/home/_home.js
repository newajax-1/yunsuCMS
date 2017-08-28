// 引入 ECharts 主模块
var echarts = require('echarts');

// 引入饼状图
require('echarts/lib/chart/pie');

// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

export default {
    name: 'home',
    mounted() {
        this.echartsCreate();
    },
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

            option_1: {
                title: {
                    x: "center",
                    bottom: "0",
                    text: "昨日设备开机率 70%",
                    textStyle: {
                        fontSize: '14',
                        fontWeight: '400',
                        color: '#333'
                    }
                },

                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    data: ['正常 7台', '保养 2台', '维修 1台']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    color: ["#4dc4df", "#e86a5b", "#fbac33"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 7, name: '正常 7台' },
                        { value: 2, name: '保养 2台' },
                        { value: 1, name: '维修 1台' },
                    ]
                }]
            },
            option_2: {
                title: {
                    text: "昨日员工排班率 70%",
                    textStyle: {
                        fontSize: '14',
                        fontWeight: '400',
                        color: '#333',
                    },
                    bottom: "0",
                    x: "center"
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    data: ['上工 70人', '休息 30人']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    color: ["#4dc4df", "#e86a5b", "#fbac33"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 70, name: '上工 70人' },
                        { value: 30, name: '休息 30人' }
                    ]
                }]
            },
            option_3: {
                title: {
                    text: "昨日成品入库率 50%",
                    textStyle: {
                        fontSize: '14',
                        fontWeight: '400',
                        color: '#333',
                    },
                    bottom: "0",
                    x: "center"
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'horizontal',
                    x: 'center',
                    data: ['入库 10000件', '出库 5000件']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    color: ["#4dc4df", "#e86a5b", "#fbac33"],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        { value: 5000, name: '入库 10000件' },
                        { value: 5000, name: '出库 5000件' }
                    ]
                }]
            }
        }
    },
    methods: {
        echartsCreate() {
            let that = this;
            let wrap_1 = document.getElementById("echartsWrap_1");
            let wrap_2 = document.getElementById("echartsWrap_2");
            let wrap_3 = document.getElementById("echartsWrap_3");

            let myChart_1 = echarts.init(wrap_1);
            let myChart_2 = echarts.init(wrap_2);
            let myChart_3 = echarts.init(wrap_3);

            myChart_1.setOption(that.option_1);
            myChart_2.setOption(that.option_2);
            myChart_3.setOption(that.option_3);
        }
    }
}