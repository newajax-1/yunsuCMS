/**
 * coding by Alex of 2017-07-24
 */

import Vue from 'vue'
import axios from 'axios'


/**
 * 请保留以下所有代码，勿修改
 */

const BaseUrl = window.BaseUrl = "http://localhost:8080/ybs_mes/";

// 非父子组件通信 [慎用-可考虑Vuex代替]
const EventBus = window.EventBus = new Vue();

/**
 * 确保项目正常加载 Element-UI 与 axios
 * 否则 VueProto 报错
 */

// axios 配置请求根目录
axios.defaults.baseURL = BaseUrl;

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
                if (typeof done === "function") {
                    done();
                    return;
                }
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
            let result = Object.prototype.toString.call(object).slice(8, 13);
            if (result !== "Array") {
                for (var key in object) {
                    if (object.hasOwnProperty(key)) {
                        object[key] = undefined;
                    }
                }
            } else {
                let arr = [];
                return arr;
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

        const callback = function(res) {
            if (res.status === 200) {
                switch (res.data.status) {
                    case "0":
                        if (res.data.success) {
                            success(res.data);
                        } else {
                            that.$baseWarn(res.data.tipMsg || "操作失败！", function() {
                                error(res.data);
                                console.log(res.data);
                            })
                        };
                        break;
                    case "1":
                        if (res.data.success) {
                            that.$baseWarn("登录超时,请重新登陆！", function() {
                                that.$goRoute("/");
                                return;
                            })
                        }
                        break;
                }
            }
        }

        if (type.toLowerCase() === "get") {
            that.$ajax.get(url, {
                params: datas
            }).then(function(res) {
                callback(res);
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
                callback(res);
            });
        }
    },

    // 日期截取
    $handleDateObject(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            date_str = undefined;
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        date = year + "-" + month + "-" + day;
        return date
    },

    // 字符串截取
    $trim(str) {
        return str.replace(/^\s*/, '').replace(/\s*$/, '');
    },

    $sort(arr) {
        return arr.sort((a, b) => a < b ? 1 : -1);
    }

})