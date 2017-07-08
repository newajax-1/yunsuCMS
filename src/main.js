// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Qs from 'qs'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import '../src/assets/css/common.styl'
import 'font-awesome/css/font-awesome.css'
Vue.prototype.$ajax = axios

// 路由跳转
Vue.prototype.$goRoute = function(index) {
    this.$router.push(index);
}

Vue.prototype.setCookies = function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.info(document.cookie);
}
Vue.prototype.getCookies = function(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
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