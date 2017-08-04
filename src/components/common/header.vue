<template>
    <div class="layout-header">
        <el-row>
            <el-col :span="24" class="header">
                <div class="top-nav-content clearfix">

                    <div class="top-nav-left fl">
                        <h1 class="logo fl"><img :src="img" /></h1>
                        <p class="nav-title fl border-right">管理控制台</p>
                    </div>

                    <ul class="top-nav-right fr">
                        <li class="right-nav-items">
                            <i class="fa fa-bell bell "></i>
                            <span class="num">0</span>
                        </li>
                        <li class="right-nav-items" @click="show_member = !show_member">
                            <span>{{name}}</span>
                            <span class="work-id">工号：{{jobNumber}}</span>
                            <transition name="fade">
                                <div class="member-list" v-show="show_member">
                                    <a @click="editPassword">修改密码</a>
                                    <a @click="logout">退出登录</a>
                                </div> 
                            </transition>
                            <i class="el-icon-setting" style="margin: 0 6px;"></i>
                        </li>
                        <li class="right-nav-items">
                            <span>任务单</span>
                            <span class="num">0</span>
                        </li>
                    </ul>
                </div>

                <!--修改密码-->
                <el-dialog
                    title="修改密码"
                    custom-class="pub-dialog edit-password-dialog"
                    :visible.sync="edit_password"
                    @close="inhertIndex()">
                    <div class="login-form-base edit-password">
                        <el-row>
                            <el-col :span="24">
                                <el-form :inline="true"                                
                                        :model="edit_form" 
                                        :rules="login_rules"
                                        ref="edit_form">
                                    <div class="login-form-shadow">
                                    <el-form-item prop='username'>
                                        <el-input 
                                            type="text" 
                                            placeholder="原始密码"
                                            auto-complete="off" 
                                            v-model="edit_form.oldPassword"></el-input>
                                    </el-form-item>

                                    <el-form-item prop='password' class="password" >
                                        <el-input 
                                            type="password" 
                                            placeholder="新密码"
                                            auto-complete="off"
                                            v-model="edit_form.password" ></el-input>
                                    </el-form-item>

                                    <el-form-item prop='password' class="password" >
                                        <el-input 
                                            type="password" 
                                            placeholder="确认密码"
                                            auto-complete="off"
                                            v-model="edit_form.confirmPassword"></el-input>
                                    </el-form-item>
                                    </div>
                                    <el-form-item class="btn-wrap ">
                                        <el-button class="btn-login" @click="surePassword()">确认修改</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </el-row>
                    </div>
                </el-dialog>
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
            var validateOldPass = (rule, value, callback) => {
                if (!value) callback(new Error('请输入旧密码'));
                callback();
            };

            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.edit_form.oldPassword) {
                        this.$refs.edit_form.validateField('oldPassword');
                    }
                    callback();
                }
            };

            var validateConfirmPass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请确认密码'));
                } else {
                    if (this.edit_form.confirmPassword) {
                        this.$refs.edit_form.validateField('password');
                    }
                    callback();
                }
            };

            return {
                img :require( '../../assets/images/logo.png'),
                jobNumber : undefined,
                name : undefined,
                show_member : false,
                edit_password : false,
                z_index : 2001,
                edit_form : {
                    oldPassword : undefined,
                    password : undefined,
                    confirmPassword : undefined
                },
                login_rules: {
                    oldPassword: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { validator: validateConfirmPass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            logout(){
                let that = this;
                that.$ajaxWrap({
                    url : "memberAccount/logout",
                    success(res){
                        if(res.success){
                            that.$baseWarn("退出成功！",function(){
                                that.$goRoute("/");
                            })
                        }
                    }
                })
            },

            editPassword(){
                let header = document.querySelectorAll(".layout-header")[0],
                    that = this,
                    z_index = that.z_index;
                    z_index+=100
                    that.z_index = z_index;
                header.style.zIndex = z_index;
                that.edit_password = true;
            },

            surePassword(){
                let that = this,
                    send_data = that.edit_form;
                that.$ajaxWrap({
                    type : "post",
                    url : "memberAccount/changePassword",
                    data : send_data,
                    success(res){
                        if(res.success){
                            that.$baseWarn("修改成功，返回登录页重新登录！",function(){
                                that.$goRoute("/");
                                that.$clearObject(that.edit_form);
                            })
                        }
                    }
                })
            },

            inhertIndex(){
                let header = document.querySelectorAll(".layout-header")[0];
                header.style.zIndex = 100;
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

.layout-header
    position fixed
    top 0
    left 0
    z-index 2000
    width 100%

.top-nav-content
    font-size:14px
    line-height:50px
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
                font-size:12px
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
    .member-list
        position fixed
        top 60px
        right 220px
        margin-left -50px
        width 100px
        z-index 200
        padding 10px 0
        background-color #383d41
        a
            display block
            line-height 2
            text-indent 1em
            &:hover
                color #158cff
        &::before{
            content ""
            position absolute
            top -10px
            left 50%
            margin-left -5px;
            width 0px
            height 0px;
            border-bottom 10px #383d41 solid
            border-left 5px transparent solid
            border-right 5px transparent solid

        }

.edit-password-dialog
    width 300px !important
    .el-dialog__body
        padding-bottom 20px
    .login-form-base
        margin-top 0
        .el-form-item
            display block
            margin-right 0
            &:last-child
                .el-form-item__content
                    top -2px
            .el-form-item__content
                width 100%
        .el-input__inner
                &:hover
                    border-color #158cff
    .btn-wrap
        margin-top 20px


@media screen and (max-width:1366px)
    .layout-header
        .top-nav-content
            line-height:50px 
            .top-nav-left
                .logo,
                .nav-title
                    padding:0 5px 
</style>
