<template>
    <div class="status_monitor">
        <el-row>
            <el-col :span="24">
                <div class="content-title">
                    <span>生产计划-生产资源状态监控</span>
                </div>
            </el-col>
        </el-row>

        <el-row class="prod-plans-wrap">
            <el-col :span="24">
                <div class="content-boder ml-10 fl" :span="4">
                    <p class="content-p">注塑机：</p>
                    <div class="content-table clearfix">
                        <div class="content-top text right-border fl">
                            <span class="fl">全部</span>
                            <strong class="fl">10</strong>
                        </div>
                        <div class="content-bottom content-bottom-one fl">
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-green"></i>
                                </span>
                                <span class="fl">生产</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-orange"></i>
                                </span>
                                <span class="fl">空闲</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-cyen"></i>
                                </span>
                                <span class="fl">保养</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-pink"></i>
                                </span>
                                <span class="fl">维修</span>
                                <strong class="fl">10</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="content-boder fl" :span="4">
                    <p class="content-p">模具：</p>
                    <div class="content-table clearfix">
                        <div class="content-top right-border fl">
                            <span class="fl">全部</span>
                            <strong class="fl">10</strong>
                        </div>
                        <div class="content-bottom fl">
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-green"></i>
                                </span>
                                <span class="fl">生产</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-cyen"></i>
                                </span>
                                <span class="fl">保养</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-pink"></i>
                                </span>
                                <span class="fl">维修</span>
                                <strong class="fl">10</strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="content-boder fl" :span="4">
                    <p class="content-p">原材料：</p>
                    <div class="content-table clearfix">
                        <div class="content-top right-border fl">
                            <span class="fl">全部</span>
                            <strong class="fl">10</strong>
                        </div>
                        <div class="content-bottom content-bottom-other fl">
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-green"></i>
                                </span>
                                <span class="fl">正常</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-purple"></i>
                                </span>
                                <span class="fl">告警</span>
                                <strong class="fl">10</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!--分页 start-->
        <!-- <div class="block list-page fr">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page_list.page_num"
                    :page-sizes="[15, 20, 30, 40]"
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page_list.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->
    </div>
</template>
<script>
    export default {
        name: 'prodPlansInfo',
        data() {
            return {

            }
        },
        methods: {
            
        },
        mounted(){
            //当组件模板挂载时数据显示到上面去。
        },
    }
</script>
<style lang="stylus">
    $gf = #fff
    .status_monitor
        .content-boder
            width 492px
            margin-top 15px
            margin-right 15px
            border 1px solid #dcdcdc
            &.ml-10
                margin-left: 15px

        .left-border
            border-left 1px dotted #dcdcdc

        .right-border
            border-right 1px dotted #dcdcdc

        .top-border
            border-top 1px dotted #dcdcdc

        .bottom-border
            border-bottom 1px dotted #dcdcdc

        .content-p
            background-color #f9f9f9
            height 40px
            line-height 40px
            padding-left 10px

        .content-table
            padding 40px 0px
        
        .content-top
            padding-left 34px
            width 40%
            height 200px
            line-height 200px
            span
                font-size 16px
            strong
                padding-left 34px
                font-size 48px
                font-weight 100
                color #148aed

        .content-bottom
            padding 0 20px
            width 40%
            padding-top 20px
            span
                font-size 14px
            strong
                padding-left 34px
                font-weight 100
                font-size 16px
            .right-p
                height 50px
                line-height 50px
            .right-span
                position relative
                height 50px
                width 21px
                padding-right 12px
            .right-i
                position absolute
                left 0
                top 50%
                transform translateY(-50%)
                width 13px
                height 13px
                border-radius 50%
        
        .content-bottom-one
            padding-top 0px

        .content-bottom-other
            padding-top 50px

        .border-green
            background-color #a4d43e
            border 4px solid #dbeeb2

        .border-cyen
            background-color #04bcf8
            border 4px solid #9be4fc

        .border-pink
            background-color #fd6363
            border 4px solid #fec1c1

        .border-orange
            background-color #f8cd04
            border 4px solid #fceb9b

        .border-purple
            background-color #e679f6
            border 4px solid #f5c9fb
</style>
