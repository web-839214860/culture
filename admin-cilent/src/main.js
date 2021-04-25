import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/install'
import '@/permission'
import factUrl from '@/store/facturl.js'

import { Form, FormItem, Input, Button, Row, Col, Progress, Menu, Submenu, MenuItem, Container, Header, Aside, Main, Footer, Dropdown, DropdownMenu, DropdownItem, DatePicker, Select, Option, Table, TableColumn, Pagination, Popover, Message, MessageBox, Dialog, Upload, Divider } from 'element-ui';
Vue.use(Form).use(FormItem).use(Input).use(Button).use(Row).use(Col).use(Progress).use(Menu).use(Submenu).use(MenuItem).use(Container).use(Header).use(Aside).use(Main).use(Footer).use(Dropdown).use(DropdownMenu).use(DropdownItem).use(DatePicker).use(Select).use(Option).use(Table).use(TableColumn).use(Pagination).use(Popover).use(Dialog).use(Upload).use(Divider)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$link = factUrl

Vue.use(api)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')