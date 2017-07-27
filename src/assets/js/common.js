import Vue from 'vue'
import axios from 'axios'

// axios 配置请求根目录
axios.defaults.baseURL = 'http://localhost:8080/ybs_mes/'

// 非父子组件通信 [慎用-可考虑Vuex代替]
const EventBus = window.EventBus = new Vue();

// 路由跳转
const $goRoute = Vue.prototype.$goRoute = function(index) {
    this.$router.push(index);
}

// 置空对象
const $clearObject = Vue.prototype.$clearObject = function(object) {
    if (object && typeof object === "object") {
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                object[key] = undefined;
            }
        }
    }
}

// axios 添加给Vue原型
const $ajax = Vue.prototype.$ajax = axios;

// 公共AJAX请求
const $ajaxWrap = Vue.prototype.$ajaxWrap = function(option) {

    let opt = option || {},
        that = this,

        type = opt.type || "get",
        url = opt.url || "",
        datas = opt.data || {},
        success = opt.success || el.callback || function() {},
        error = opt.error || function() {};

    if (type.toLowerCase() === "get") {
        that.$ajax.get(url, {
            params: datas
        }).then(function(res) {
            if (res.data.success && res.status === 200) {
                success(res.data);
            } else {
                error(res.data);
                console.log(res.data.tipMsp);
            };
        });
    } else if (type.toLowerCase() === "post") {
        that.$ajax({
            method: "post",
            url: url,
            transformRequest: [function(data) {
                data = JSON.stringify(datas);
                return data;
            }],
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function(res) {
            if (res.data.success && res.status === 200) {
                success(res.data);
            } else {
                error(res.data);
                alert(res.data.tipMsp + "前往控制台查看失败原因");
                console.log(res.data);
            };
        });
    };
};