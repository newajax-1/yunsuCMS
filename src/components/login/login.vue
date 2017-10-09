<template>
    <div class="login-page">
        <div class="login-form-wrap">
            <h1>
                <img :src="img_url.title" alt="Y-mes">
            </h1>
            <el-form 
                class="login-form-base">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="登 录" name="login" class="login">
                        <div class="login-form-shadow">
                            <el-form-item prop='username'>
                                <el-input 
                                    type="text" 
                                    placeholder="账号"
                                    auto-complete="off" 
                                    v-model="login_form.username" ></el-input>
                            </el-form-item>

                            <el-form-item prop='password' class="password" >
                                <el-input 
                                    type="password" 
                                    placeholder="密码"
                                    auto-complete="off" 
                                    @keyup.enter.native="login()" 
                                    v-model="login_form.password" ></el-input>
                            </el-form-item>
                        </div>

                        <!--
                        <el-form-item
                            prop='identify'>
                            <el-row>
                                <el-col :span="16"><el-input type="text" v-on:keyup.enter="login"  v-model="login_form.identify" auto-complete="off" placeholder="验证码"></el-input></el-col>
                                <el-col :span="8"><img class="identify-img" :src="loginURL" @click="reImg()"></el-col>
                            </el-row>
                        </el-form-item>
                        <el-checkbox style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>-->
                        
                        <el-form-item class="btn-wrap">
                            <el-button class="btn-login" @click="login()">登 录</el-button>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="下载APP" name="app" class="app">
                        <div class="clearfix">
                            <div class="fl">
                                <div class="line">
                                    <span class="name">iPhone版:</span>
                                    <span class="app-img"></span>
                                </div>
                                <div class="line">
                                    <span class="name">Android版:</span>
                                    <span class="app-img"></span>
                                </div>
                                <div class="line">
                                    <span class="name">Pad版:</span>
                                    <span class="app-img"></span>
                                </div>
                            </div>
                            <div class="fr">
                                <img :src="img_url.ewm" alt="二维码">
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {

        name: "login",

        data() {

            var validateName = (rule, value, callback) => {
                if (!value) callback(new Error('请输入用户名'));
                callback();
            };

            var validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.login_form.username) {
                        this.$refs.login_form.validateField('username');
                    }
                    callback();
                }
            };

            return {
                img_url: {
                    title : require( '../../assets/images/login_logo.png'),
                    ewm : require( '../../assets/images/erweima.png')
                },

                login_rules: {
                    username: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                },

                identify_url: BaseUrl + "memberAccount/AuthImg",

                activeName : "login",

                login_form:{
                    username:'',
                    password:'',
                    identify:''
                },

                menu_list : []
            }
        },
        methods: {
            
            handleClick() {
            },

            handleLink(data){
                let link_arr = [];

                for(let i = 0 ; i < data.length ; i++){
                    let el = data[i],
                        opt = {};
                    opt.textName = el.menuName;
                    opt.index = i+"";
                    opt.icon = el.icon
                    if(el.menuList.length){
                        opt.child = [];
                        for(let j = 0 ; j < el.menuList.length ; j++){
                            let ret = el.menuList[j],
                                opt_child = {};
                                opt_child.text = ret.menuName;
                                opt_child.route = ret.url;
                                opt_child.index = i+"-"+(j+1);
                            opt.child.push(opt_child);
                        }
                    }
                    link_arr.push(opt);
                }
                return link_arr;
            },

            login(){

                let that = this;

                that.$ajaxWrap({
                    type : "post",
                    url : "memberAccount/toLogin",
                    data : {
                        account:that.login_form.username,
                        password:that.login_form.password
                    },
                    success(data){
                        var _name = data.data.data.name || " ";
                        var _jobNumber = data.data.data.jobNumber || " ";
                        sessionStorage.setItem("name",_name);
                        sessionStorage.setItem("jobNumber",_jobNumber);

                        if(data.success === true){
                            var _useName = that.login_form.username || " ";
                            sessionStorage.setItem("useName",_useName);
                            that.$goRoute("/home");
                        }

                        let menu_list = that.handleLink(data.data.menuList),
                            JSON_link = JSON.stringify(menu_list);
                        
                        that.menu_list = menu_list;

                        sessionStorage.setItem("menuList",JSON_link);
                    }
                })
            },
        },

        destroyed() {
            EventBus.$emit("MenuList", this.menu_list);
        }
    }
</script>
<style lang="stylus">
.login-page{
    position  absolute
    top 0
    left 0
    width 100%
    height 100%
    background url("../../assets/images/login-bg.jpg") no-repeat center center
    background-size  cover
    
    .login-form-wrap{
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        margin auto
        width 450px
        height 440px
        line-height 1
        h1{
            font-weight normal
            font-size 72px
        }
        p{
            font-size 24px
            padding 20px 0
            letter-spacing 12px
            text-indent 1em
        }
        h1,p{
            text-align center
            color #fff
        }
    }
    .login-form-base{
        margin-top 24px
        font-size 0;

        .login{
            padding 42px 46px
            background-color #fff
        }

        /* 清除ele-ui 默认样式 */ 
        .el-tabs__header{
            margin 0
            border-bottom 0
        }
        .el-tabs__nav{
            width 100%
            .el-tabs__active-bar{
                background transparent
            }
            .el-tabs__item{
                width 50%
                height 56px
                color #a4a4a4
                font-size 18px
                line-height 56px
                text-align center
                background rgba(0,0,0,0.3);
                &.is-active{
                    color #444
                    background-color #fff
                }
            }
        }

        .el-form-item{
            margin-bottom 0
            &.is-error{
                margin-bottom 0
            }
            .el-input{
                width 100%
                input{
                    padding 12px 20px
                    height 100%
                    line-height 1
                    border-radius 0
                    background-color #fff !important
                }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
                }
            }
            .el-form-item__content{
                &:hover{
                    z-index 2;
                }
            }
            &.password{
                .el-form-item__content{
                    top -1px
                }
            }
        }
        
        .login-form-shadow{
            box-shadow 0 0 8px #e1e1e1
        }

        .btn-wrap{
            margin-top 24px
            .btn-login{
                width 100%
                font-size 16px
                color #fff 
                background-color #158cff
                border-radius 2px
                transition all 0.3s
                &:hover{
                    transition all 0.3s
                    background-color #00c0ff
                }
            }
        }
        .app{
            padding: 33px 20px
            background: #fff
            .line{
                overflow :hidden
                font-size: 14px
                color: #666
                line-height: 40px
                margin-bottom: 20px
                &:last-child{
                    margin-bottom:0
                }
                .name{
                    float:left
                    width: 72px
                    margin-right: 20px
                    text-align :right
                }
                .app-img{
                    float:right;
                    width: 135px
                    height: 40px
                    background: url("../../assets/images/login.png") no-repeat -61px -60px
                }
                &:first-child{
                    .app-img{
                        background-position: -61px 0
                    }
                }
            }
        }
    }
}
</style>
