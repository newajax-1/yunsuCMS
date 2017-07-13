// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Qs from 'qs'
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-default/index.css'
import '../src/assets/css/common.styl'
import 'font-awesome/css/font-awesome.css'

//axios配置请求根目录
axios.defaults.baseURL = 'http://192.168.168.66:8080/ybs_mes/'

// axios添加给Vue的原型方法
Vue.prototype.$ajax = axios


// 非父子组件通信
var EventBus = window.EventBus = new Vue();

// 路由跳转
Vue.prototype.$goRoute = function(index) {
    this.$router.push(index);
}

// Vue.config.productionTip = false;

Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})