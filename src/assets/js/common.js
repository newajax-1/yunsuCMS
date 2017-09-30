//const BaseUrl = window.BaseUrl = 'http://192.168.3.96:8080/ybs_mes_01';
// const BaseUrl = window.BaseUrl = 'http://192.168.3.148:8080/ybs_mes';
// const BaseUrl = window.BaseUrl = 'http://192.168.3.51:8080/';
const BaseUrl = window.BaseUrl = "http://localhost:8080/"

/**
 * on-line code
 */

import Vue from 'vue';
import axios from 'axios';

const EventBus = window.EventBus = new Vue();

// axios base url

if (typeof BaseUrl === "undefined") {
    window.BaseUrl = "/";
}

axios.defaults.baseURL = BaseUrl;

/**
 * Element-UI and axios is important
 * if not , throw error
 */

let height = window.screen.height,
    tableHeight;

tableHeight = height >= 770 ? 580 : 380;

// tools
const _toString = Object.prototype.toString;

const isReference = val => typeof val === "object" && val !== null;

const isObject = val => _toString.call(val).slice(8, 14) === "Object";

const isArray = val => _toString.call(val).slice(8, 13) === "Array";

const isDate = val => _toString.call(val).slice(8, 12) === "Date";

const extend = (val, from) => {
    let ret = val || {};
    if (isObject(ret) && isObject(from)) {
        for (let key in from) {
            ret[key] = from[key];
        }
        return ret
    }
}

const clearObject = val => {
    if (isReference(val)) {
        if (isObject(val)) {
            for (let key in val) {
                if (isReference(val[key]) && !isDate(val[key])) {
                    clearObject(val[key])
                } else {
                    val[key] = undefined
                }
            }
        } else if (isArray(val)) {
            val.splice(0, val.length);
        }
    }
}

const deepCloneObject = (val, new_val) => {
    let ret = new_val || (isObject(val) ? {} : []);
    for (let key in val) {
        let el = val[key];
        if (isReference(el)) {
            ret[key] = isObject(el) ? {} : [];
            deepCloneObject(el, ret[key]);
        } else {
            ret[key] = el
        }
    }
    return ret
}

// Vue prototype methods
const VueProto = Vue.prototype;

VueProto.$vueExtend = function(option) {
    if (option && isObject(option)) {
        extend(VueProto, option);
    }
}

VueProto.$vueExtend({
    AUTHOR: "Alex",
    TIME: "2017.07 - Today",
    Version: "Y-MES 1.2",

    // Request
    $ajax: axios,

    $tableHeight: tableHeight,

    $isReference(val) {
        return isReference(val)
    },

    $isObject(val) {
        return isObject(val)
    },

    $isArray(val) {
        return isArray(val)
    },

    $clearObject(val) {
        clearObject(val);
    },

    $typeofArray(arr) {
        return isArray(arr)
    },

    $cloneObject(obj) {
        return extend(undefined, obj)
    },

    // replace JSON.parse(JSON.stringify(object))
    $deepCloneObject(val, new_val) {
        return deepCloneObject(val, new_val)
    },

    $goRoute(index, query) {
        if (isObject(query)) {
            this.$router.push({ path: index, query: query })
        } else {
            this.$router.push(index);
        }
    },

    $baseWarn(tips, done, sign) {
        let that = this;

        that.$alert(tips, '提示', {
            confirmButtonText: '确定',
            callback() {
                if (typeof done === "function") done();
                if (sign && that.refresh) that.refresh();
            }
        });
    },

    $baseConfirm(tips, done, sign) {
        let that = this;

        that.$confirm(tips, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        }).then(function() {
            if (typeof done === "function") done();
            if (sign && that.refresh) that.refresh();
        }).catch(function() {});
    },

    $ajaxWrap(option) {
        let opt = option || {},
            that = this,

            type = opt.type || "get",
            url = opt.url || "",
            datas = opt.data || {},
            success = opt.success || opt.callback || function() {},
            error = opt.error || function() {},
            fail = opt.fail || function() {};

        const callback = function(res) {
            if (res.status === 200) {
                switch (res.data.status) {
                    case "0":
                        if (res.data.success) {
                            if (res.data.data.page && typeof res.data.data.page.total === "string") res.data.data.page.total = res.data.data.page.total - 0;
                            success(res.data);
                        } else {
                            that.$baseWarn(res.data.tipMsg || "操作失败！", function() {
                                error(res.data);
                                throw res.data;
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
            }).catch(function(res) {
                throw res;
                that.$baseWarn("请输入正确信息！");

                if (typeof fail === "function") fail();
            });
        }
    },

    // YY-MM-DD
    $handleDateObject(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            date_str;

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        date_str = year + "-" + month + "-" + day;
        return date_str
    },

    // YY-MM-DD-HH-MM-SS
    $handleDateObjectTime(date) {
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds(),
            date_str;

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        if (hour < 10) hour = "0" + hour;
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;

        date_str = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        return date_str;
    }
})