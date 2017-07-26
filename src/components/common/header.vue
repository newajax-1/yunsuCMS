<template>
    <div class="top-nav">
        <el-row>
            <el-col :span="24" class="header">
                <div class="top-nav-content clearfix">

                    <div class="top-nav-left fl">
                        <h1 class="logo fl"><img :src="img" /></h1>
                        <p class="nav-title fl border-right">管理控制台</p>
                    </div>

                    <div class="top-nav-right fr">
                        <a href="" class="right-nav-items">
                            <i class="fa fa-bell bell "></i>
                            <span class="num">0</span>
                        </a>
                        <a href="" class="right-nav-items">
                            <span>{{name}}</span>
                            <span class="work-id">工号：{{jobNumber}}</span>
                        </a>
                        <a href="" class="right-nav-items">
                            <span>任务单</span>
                            <span class="num">0</span>
                        </a>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {
        name:"header",
        created() {
            this.name = sessionStorage.getItem("name");
            this.jobNumber = sessionStorage.getItem("jobNumber");
        },
        data() {
            return {
                img :require( '../../assets/images/logo.png'),
                jobNumber : undefined,
                name : undefined
            };
        },
        methods: {
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@media screen and (max-width:1366px)
    .top-nav
        .top-nav-content
            line-height:50px 
            .top-nav-left
                .logo,
                .nav-title
                    padding:0 5px 
  
.top-nav-content
    line-height:80px
    background-color:#383d41
    .border-right
        border-left:1px solid #2c2d2f
        border-right:1px solid #2c2d2f
    .top-nav-left
        .logo,.nav-title
            margin:0 
            padding:0 12px
            color: #fff
    .top-nav-right
        .right-nav-items
            float:left
            padding:0 45px
            text-decoration:none
            font-style:normal
            color:#fff
            border-left:1px solid #2c2d2f
            .num
                display:inline-block
                width:22px
                height:22px 
                margin:0 10px
                font-size:14px
                line-height:22px
                text-align:center
                border-radius:10%
                background:#fd9a01
        .work-id
            position:relative
            margin-left:20px
        .work-id::before
            content:""
            position:absolute
            top:3px
            left:-11px
            width:2px
            height:16px
            background-color:#fff
</style>
