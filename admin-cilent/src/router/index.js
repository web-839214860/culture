import Vue from 'vue'
import VueRouter from 'vue-router'


const Login = resolve => require(['@/views/login.vue'], resolve)    //登录页面
const Container = resolve => require(['@/views/container.vue'], resolve)  //中间布局页面
const NotFound = resolve => require(['@/views/404.vue'], resolve)   //404页面

// 修改密码
const PassWord = resolve => require(['@/views/passWord.vue'], resolve)   //修改密码页面

// 数据总览
const Data = resolve => require(['@/views/data.vue'], resolve)   //数据总览页面

// 非遗管理
const Convention = resolve => require(['@/views/convention.vue'], resolve)   //收录数据页面
const ConventionAdd = resolve => require(['@/views/conventionAdd.vue'], resolve)   //添加数据页面

// 资讯管理
const News = resolve => require(['@/views/news.vue'], resolve)   //资讯管理页面
const NewsInfo = resolve => require(['@/views/newsInfo.vue'], resolve)   //资讯信息页面
const NewsAdd = resolve => require(['@/views/newsAdd.vue'], resolve)   //添加资讯页面

// 动态管理
const Trend = resolve => require(['@/views/trend.vue'], resolve)   //动态管理页面
const TrendAdd = resolve => require(['@/views/trendAdd.vue'], resolve)   //添加动态页面
//评论管理
const Discuss = resolve => require(['@/views/discuss.vue'], resolve)   //评论管理页面

// 用户管理
const User = resolve => require(['@/views/user.vue'], resolve)   //用户管理页面
const UserAdd = resolve => require(['@/views/userAdd.vue'], resolve)   //添加用户页面


Vue.use(VueRouter)

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '*', name: 'NotFound', component: NotFound },

    { path: '/', component: Container,
        children:[

            // 修改密码
            { path: '/passWord', name: 'PassWord', component: PassWord },

            // 数据总览
            { path: '/', name: 'Data', component: Data },

            // 非遗管理
            { path: '/convention', name: 'Convention', component: Convention },
            { path: '/conventionAdd', name: 'ConventionAdd', component: ConventionAdd },

            // 资讯管理
            { path: '/news', name: 'News', component: News },
            { path: '/newsInfo/:id', name: 'NewsInfo', component: NewsInfo },
            { path: '/newsAdd', name: 'NewsAdd', component: NewsAdd },

            // 动态管理
            { path: '/trend', name: 'Trend', component: Trend },
            { path: '/trendAdd', name: 'TrendAdd', component: TrendAdd },
            { path: '/discuss/:id', name: 'Discuss', component: Discuss },

            // 用户管理
            { path: '/user', name: 'User', component: User },
            { path: '/userAdd', name: 'UserAdd', component: UserAdd },

        ]
    },

]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router