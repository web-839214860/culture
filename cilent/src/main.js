import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { NavBar, Form, Field, Button, Toast, Checkbox, Uploader, Tabbar, TabbarItem, Icon, Col, Row, PullRefresh, List, Divider, Dialog, Cell, Picker, Popup, Swipe, SwipeItem, Tab, Tabs, Search, DropdownMenu, DropdownItem } from 'vant';

import api from './api/install'
import '@/permission'
import 'amfe-flexible'
import factUrl from '@/store/facturl.js'


Vue.use(api)
Vue.use(NavBar).use(Form).use(Field).use(Button).use(Toast).use(Checkbox).use(Uploader).use(Tabbar).use(TabbarItem).use(Icon).use(Col).use(Row).use(PullRefresh).use(List).use(Divider).use(Dialog).use(Cell).use(Picker).use(Popup).use(Swipe).use(SwipeItem).use(Tab).use(Tabs).use(Search).use(DropdownMenu).use(DropdownItem)

Vue.config.productionTip = false
Vue.prototype.$link = factUrl;


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')


function setRem () {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    let htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = (htmlWidth / 10) > 75 ? "75px" : htmlWidth / 10 + 'px'; // 设置1rem最大不超过75px
    // htmlDom.style.fontSize = htmlWidth / 10 + 'px'; // 原先1rem等于屏幕宽度除以10
}
setRem(); // 初始化

// 改变窗口大小时触发
window.onresize = function () {
    setRem();
}