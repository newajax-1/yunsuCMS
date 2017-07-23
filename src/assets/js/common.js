import Vue from 'vue'
import axios from 'axios'

// axios配置请求根目录
// axios.defaults.baseURL = 'http://192.168.168.66:8080/ybs_mes/'
axios.defaults.baseURL = 'http://localhost:8080/ybs_mes/'

// axios添加给Vue的原型方法
Vue.prototype.$ajax = axios

Vue.prototype.$ajaxWrap = function(option){
    let opt = option || {},
        that = this;
    if(opt.type.toLowerCase() === "get"){
        that.$ajax.get(opt.url, {
            params: opt.data
        }).then(function(res) {
            if (res.data.success) {
                opt.callback(res.data);
            }else{
                console.error(res);
                return
            }
        })
    }else if(opt.type.toLowerCase() === "post"){
        that.$ajax({
            method: "post",
            url: opt.url,
            transformRequest: [function(data) {　　
                data = JSON.stringify(opt.data);
                return data;
            }],
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(res) {
            if (res.data.success) {
                opt.callback(res.data);
            }else{
                console.error(res);
                return
            }
        })
    }else{
        console.error("参数错误！");
    }
}

// 非父子组件通信
var EventBus = window.EventBus = new Vue();

// 路由跳转
Vue.prototype.$goRoute = function(index) {
    this.$router.push(index);
}

// 清空对象
Vue.prototype.$clearObject = function(object){
    if(object && typeof object === "object"){
        for(var key in object){
            if(object.hasOwnProperty(key)){
                object[key] = ""
            }
        }
    }
}

// 清空数组
Vue.prototype.$clearData = function(Arrays){
    if(Arrays && Object.prototype.toString.call(Arrays) === "[object Array]"){
        Arrays = null;
        Arrays = [];
    }
}