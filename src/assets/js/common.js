/**
 * coding by Alex of 2017-07-24
 */

import Vue from 'vue'
import axios from 'axios'

// axios 配置请求根目录
axios.defaults.baseURL = 'http://localhost:8080/ybs_mes/'

// 非父子组件通信 [慎用-可考虑Vuex代替]
const EventBus = window.EventBus = new Vue();

/**
 * 确保项目正常加载 Element-UI 与 axios
 * 否则 VueProto 报错
 */

const VueProto = Vue.prototype;

const $vueExtend = VueProto.$vueExtend = function(option) {
    if (option && typeof option === "object") {
        for (let key in option) {
            Vue.prototype[key] = option[key];
        }
    }
}

VueProto.$vueExtend({
    AUTHOR: "Alex",

    // Request
    $ajax: axios,

    // 路由跳转
    $goRoute(index) {
        this.$router.push(index);
    },

    // 警示框
    $baseWarn(tips, done) {
        let that = this;

        that.$alert(tips, '提示', {
            confirmButtonText: '确定',
            callback() {
                if (typeof done === "function") done();
                if (that.refresh) that.refresh();
            }
        });
    },

    // 提示框
    $baseConfirm(tips, done, fail) {
        let that = this;

        that.$confirm(tips, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(function() {
            if (typeof done === "function") done();
            if (that.refresh) that.refresh();
        }).catch(function() {});
    },

    // 置空对象
    $clearObject(object) {
        if (object && typeof object === "object") {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    object[key] = undefined;
                }
            }
        }
    },

    // Ajax 请求
    $ajaxWrap(option) {
        let opt = option || {},
            that = this,

            type = opt.type || "get",
            url = opt.url || "",
            datas = opt.data || {},
            success = opt.success || opt.callback || function() {},
            error = opt.error || function() {};

        if (type.toLowerCase() === "get") {
            that.$ajax.get(url, {
                params: datas
            }).then(function(res) {
                if (res.data.success && res.status === 200) {
                    success(res.data);
                } else {
                    that.$baseWarn(res.data.tipMsg || "操作失败！", function() {
                        error(res.data);
                        console.log(res.data);
                    })
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
                    that.$baseWarn(res.data.tipMsg || "操作失败！", function() {
                        error(res.data);
                        console.log(res.data);
                    })
                };
            });
        }
    },

    $handleDateObject(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            date_str = undefined;
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        date = year + "-" + month + "-" + day;
        return date
    }
})