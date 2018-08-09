//es6加载模块
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import './assets/css/iconfont.css';
import './assets/css/common.less';
import router from './router';
import store from './store';
Vue.use(VueResource);
//创建一个vue实例,挂载在body上面
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});