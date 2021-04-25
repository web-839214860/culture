import { removeLocalStorage } from '@/utils/localStorage'
import router from '../../router'

/*vuex：

disPatch：异步操作
存储：this.$store.disPatch('action 方法名'，值)
取值：this.$store.getters.方法名

commit：同步操作
存储：this.$store.commit('mutations 方法名'，值)
取值：this.$store.state.方法名*/

const user  = {
    namespaced: true,

    state: {  //数据源，保存的数据放在这里，在页面通过 this.$store.state来获取数据
        u_userId: '',
        u_name: '',
        u_sex: '',
        u_sign: '',
        u_image: '',
        u_date: '',
        u_star: '',
        role: '',
        province_id: '',
        city_id: ''
    },

    getters: {  //监听state中的值的变化，返回结果
        u_userId: state => state.u_userId,
        u_name: state => state.u_name,
        u_sex: state => state.u_sex,
        u_sign: state => state.u_sign,
        u_image: state => state.u_image,
        u_date: state => state.u_date,
        u_star: state => state.u_star,
        role: state => state.role,
        province_id: state => state.province_id,
        city_id: state => state.city_id
    },

    mutations: { //修改state中的值
        SET_U_USERID: (state, u_userId) => {
            state.u_userId = u_userId
        },
        SET_U_NAME: (state, u_name) => {
            state.u_name = u_name
        },
        SET_U_SEX: (state, u_sex) => {
            state.u_sex = u_sex
        },
        SET_U_SIGN: (state, u_sign) => {
            state.u_sign = u_sign
        },
        SET_U_IMAGE: (state, u_image) => {
            state.u_image = u_image
        },
        SET_U_DATE: (state, u_date) => {
            state.u_date = u_date
        },
        SET_U_STAR: (state, u_star) => {
            state.u_star = u_star
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
        SET_PROVINCE_ID: (state, province_id) => {
            state.province_id = province_id
        },
        SET_CITY_ID: (state, city_id) => {
            state.city_id = city_id
        }
    },

    actions: {  //通过store.disPatch 方法触发
        //退出登录
        LogOut() {
            return new Promise((resolve) => {
                removeLocalStorage('Token')
                router.push({ path: '/login' })
                resolve()
            })
        },
    }
}

export default user;