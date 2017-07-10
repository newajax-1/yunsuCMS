/**
 * Created by Administrator on 2017/7/10 0010.
 */
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
            errorMsg: '',
            activeName: 'login',
            winSize: {
                width: '',
                height: ''
            },
            ruleForm: {
                username: '',
                password: '',
                identify: ''
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
        handleClick(tab, event) {},
        setSize() {
            this.winSize.width = $(window).width() + "px";
            this.winSize.height = $(window).height() + "px";

            this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
            this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
        },
        login() {
            var that = this;
            that.$ajax({
                    method: 'post',
                    url: 'ybs_mes/memberAccount/toLogin',
                    transformRequest: [function(data) {
                        data = JSON.stringify({
                            account: that.ruleForm.username,
                            password: that.ruleForm.password,
                            // verifyCode:that.ruleForm.identify
                        });
                        return data;
                    }],
                    baseURL: 'http://192.168.168.66:8080/',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(function(results) {
                    var data = results.data;
                    if (data.success === true) {
                        that.$goRoute("/home");
                    } else {
                        // 弹出 data.data.tipMsg;
                        that.dialogVisible = true;
                        that.errorMsg = data.tipMsg;
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