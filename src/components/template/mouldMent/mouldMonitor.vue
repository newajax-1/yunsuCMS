<template>
	<div class="mould_monitor">
	    <el-row>
	    	<el-col :span="24">
                <div class="content-title">
                    <span>模具状态监控</span>
                </div>
            </el-col>
        </el-row>

        <el-row class="prod-plans-wrap">
            <el-col :span="24">
                <div class="content-boder fl" :span="4">
                    <p class="content-p">模具：</p>
                    <div class="content-table clearfix">
                        <div class="content-top text right-border fl">
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
                                    <i class="right-i border-orange"></i>
                                </span>
                                <span class="fl">待机</span>
                                <strong class="fl">10</strong>
                            </p>
                            <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-pink"></i>
                                </span>
                                <span class="fl">维修</span>
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
                                    <i class="right-i border-gray"></i>
                                </span>
                                <span class="fl">停机</span>
                                <strong class="fl">10</strong>
                            </p>
                             <p class="right-p">
                                <span class="right-span fl">
                                    <i class="right-i border-purple"></i>
                                </span>
                                <span class="fl">异常</span>
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
                    :page-size=page_list.page_size
                    layout="total, sizes, prev, pager, next, jumper"
                    :page-sizes="[10, 20, 30, 40]"
                    :total="page_list.total">
            </el-pagination>
        </div> -->
        <!--分页 end-->
	</div>
</template>
<script src="./mouldmonitors.js"></script>
<style lang="stylus">
.mould_monitor
    .content-boder
        width 492px
        margin-top 15px
        margin-right 15px
        margin-left 15px
        border 1px solid #dcdcdc
        &.ml-10
            margin-left: 10px

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
        padding 20px 0px
    
    .content-top
        padding-left 34px
        width 40%
        height 245px
        line-height 245px
        span
            font-size 16px
        strong
            padding-left 34px
            font-size 48px
            font-weight 100
            color #148aed

    .content-bottom
        padding-left 40px
        width 40%
        span
            font-size 14px
        strong
            padding-left 34px
            font-weight 100
            font-size 16px
        .right-p
            height 40px
            line-height 40px
        .right-span
            position relative
            height 40px
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

    .border-gray
        background-color #989ca3
        border 4px solid #d6d7da
</style>