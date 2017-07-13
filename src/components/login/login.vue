<template>
    <div class="login" :style="winSize">
        <el-row>
            <el-col :span='24'>
                <div class="content">
                    <el-form label-position="left" 
                        label-width="0px"
                        class="demo-ruleForm card-box loginform"
                        :style="formOffset"
                        :model="ruleForm" 
                        :rules="rules"
                        ref="ruleForm">
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="登录" name="login">
                                <el-form-item
                                    prop='username'>
                                    <el-input type="text" auto-complete="off" v-model="ruleForm.username" placeholder="账号"></el-input>
                                </el-form-item>

                                <el-form-item
                                    prop='password'>
                                    <el-input type="password" auto-complete="off" @keyup.enter.native="login()" v-model="ruleForm.password" placeholder="密码"></el-input>
                                </el-form-item>
                                <!--
                                <el-form-item
                                    prop='identify'>
                                    <el-row>
                                        <el-col :span="16"><el-input type="text" v-on:keyup.enter="login"  v-model="ruleForm.identify" auto-complete="off" placeholder="验证码"></el-input></el-col>
                                        <el-col :span="8"><img class="identify-img"src="http://192.168.168.66:8080/ybs_mes/memberAccount/AuthImg"></el-col>
                                    </el-row>
                                </el-form-item>
                                -->
                                <el-checkbox style="margin:0px 0px 35px 0px;">
                                    记住密码
                                </el-checkbox>
                                <el-form-item style="width:100%;">
                                    <el-button type="primary" @click="login()">登录
                                    </el-button>
                                    <el-button>重置</el-button>
                                </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="APP" name="app">
                                APP
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                    <!--登陆错误提示 -->
                    <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible" 
                    size="tiny">
                        <span v-text="errorMsg"></span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog> 
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {

        name: "login",
        data() {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                }
                callback();
            };

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.username !== '') {
                        this.$refs.ruleForm.validateField('username');
                    }
                    callback();
                }
            };

            return {
                dialogVisible: false,
                errorMsg:'',
                activeName: 'login',
                winSize: {
                    width: '',
                    height: ''
                },
                ruleForm:{
                    username:'',
                    password:'',
                    identify:''
                },
                rules: {
                    username: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                },
                formOffset: {
                    position: 'absolute',
                    left: '',
                    top: ''
                }
            }
        },
        methods: {
            handleClick(tab, event) {
            },
            setSize() {
                this.winSize.width = $(window).width() + "px";
                this.winSize.height = $(window).height() + "px";

                this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
                this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
            },
            login(){
                var that = this;
                that.$ajax({
                    method: 'post',
                    url: 'memberAccount/toLogin',
                    transformRequest: [function (data) {
                    　　data = JSON.stringify({
                            account:that.ruleForm.username,
                            password:that.ruleForm.password,
                            // verifyCode:that.ruleForm.identify
                        });
                        return data;
                    }],
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(results){
                    var data = results.data;
                    if(data.success === true){
                        that.$goRoute("/home");
                    }else{
                        // 弹出 data.data.tipMsg;
                        that.dialogVisible=true;
                        that.errorMsg=data.tipMsg;
                    }
                })
            }
        },
        created() {
            this.setSize();
            $(window).resize(() => {
                this.setSize();
            });
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .login
        background: #1F2D3D
        .card-box
            box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02)
            -webkit-border-radius: 5px
            border-radius: 5px
            -moz-border-radius: 5px
            background-clip: padding-box
            margin-bottom: 20px
            background-color: #F9FAFC
            border: 2px solid #8492A6
        .title
            margin: 0px auto 40px auto
            text-align: center
            color: #505458
            font-weight: normal
            font-size: 16px
            span
                cursor: pointer
                &.active
                    font-weight: bold
                    font-size: 18px

        .loginform
            width: 290px
            padding: 35px 35px 15px 35px
            .identify-img
                height:35px
</style>
