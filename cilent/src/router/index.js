import Vue from 'vue'
import VueRouter from 'vue-router'


const Login = resolve => require(['@/views/login.vue'], resolve)    //登录页面
const Register = resolve => require(['@/views/register.vue'], resolve)    //注册页面
const Rule = resolve => require(['@/views/rule.vue'], resolve)    //用户条例页面
const Container = resolve => require(['@/views/container.vue'], resolve)  //中间布局页面

const Index = resolve => require(['@/views/index.vue'], resolve)  //资料馆页面
const IndexInfo = resolve => require(['@/views/indexInfo.vue'], resolve)  //资料馆信息页面
const IndexInfoItem = resolve => require(['@/views/indexInfoItem.vue'], resolve)  //资料馆详情页面

const News = resolve => require(['@/views/news.vue'], resolve)  //资讯页面
const NewsInfoItem = resolve => require(['@/views/newsInfoItem.vue'], resolve)  //资讯详情页面

const Trend = resolve => require(['@/views/trend.vue'], resolve)  //广场页面
const TrendInfo = resolve => require(['@/views/trendInfo.vue'], resolve)  //广场详情页面
const TrendAdd = resolve => require(['@/views/trendAdd.vue'], resolve)  //发表动态页面

const My = resolve => require(['@/views/my.vue'], resolve)  //我的页面
const MyInfo = resolve => require(['@/views/myInfo.vue'], resolve)  //个人信息页面
const MyInfoEdit = resolve => require(['@/views/myInfoEdit.vue'], resolve)  //完善个人信息页面
const MyTrend = resolve => require(['@/views/myTrend.vue'], resolve)  //我的动态页面
const MyEnshrine = resolve => require(['@/views/myEnshrine.vue'], resolve)  //我的收藏页面
const MySetting = resolve => require(['@/views/mySetting.vue'], resolve)  //设置页面
const MyPassWord = resolve => require(['@/views/myPassWord.vue'], resolve)  //修改密码页面


Vue.use(VueRouter)


const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/register', name: 'Register', component: Register },
    { path: '/rule', name:'Rule', component: Rule },

    { path: '/', component: Container,
        children: [
            // 资料馆
            { path: '/', name: 'Index', component: Index },

            // 资讯
            { path: '/news', name: 'News', component: News },

            // 广场
            { path: '/trend', name: 'Trend', component: Trend },

            // 我的
            { path: '/my', name: 'My', component: My },
        ]
    },

    // 资料馆
    { path: '/indexInfo/:id', name: 'IndexInfo', component: IndexInfo },
    { path: '/indexInfoItem/:id', name: 'IndexInfoItem', component: IndexInfoItem },

    // 资讯
    { path: '/newsInfoItem/:id', name: 'NewsInfoItem', component: NewsInfoItem },

    // 广场
    { path: '/trendInfo/:id', name: 'TrendInfo', component: TrendInfo },
    { path: '/trendAdd', name: 'TrendAdd', component: TrendAdd },

    // 我的
    { path: '/myInfo', name: 'MyInfo', component: MyInfo },
    { path: '/myInfoEdit', name: 'MyInfoEdit', component: MyInfoEdit },
    { path: '/myTrend', name: 'MyTrend', component: MyTrend },
    { path: '/myEnshrine', name: 'MyEnshrine', component: MyEnshrine },
    { path: '/mySetting', name: 'MySetting', component: MySetting },
    { path: '/myPassWord', name: 'MyPassWord', component: MyPassWord },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => err)
// }

export default router