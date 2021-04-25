<template>
    <div class="myInfo">

        <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />

        <div id="myInfo-page">
            <van-cell center title="头像" >
                <template #right-icon>
                    <div class="avatar" >
                        <img :src="link+u_image" >
                    </div>
                </template>
            </van-cell>

            <van-cell center title="昵称" >
                <template #right-icon>
                    <div class="cell" >{{u_name}}</div>
                </template>
            </van-cell>

            <van-cell center title="账号" >
                <template #right-icon>
                    <div class="cell" >{{u_userId}}</div>
                </template>
            </van-cell>

            <van-cell center title="性别" >
                <template #right-icon>
                    <div class="cell" >{{u_sex}}</div>
                </template>
            </van-cell>

            <van-cell center title="地区" >
                <template #right-icon>
                    <div class="cell" >
                        <div v-if="province_id === null">{{'-'}}</div>
                        <div v-else-if="city_id === null">{{province_name}}</div>
                        <div v-else-if="province_id <= 4 || province_id >= 33">{{province_name}}</div>
                        <div v-else>{{handleText(province_name)}} {{city_name}}</div>
                    </div>
                </template>
            </van-cell>

            <van-cell center title="个性签名" >
                <template #right-icon>
                    <div class="cell">{{u_sign}}</div>
                </template>
            </van-cell>

            <van-cell center title="注册日期" >
                <template #right-icon>
                    <div class="cell">{{u_date}}</div>
                </template>
            </van-cell>

            <div class="item">
                <van-cell title="完善信息" @click="putUser" />
            </div>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

    export default {
        data() {
            return {
                link: this.$link.linkURL,
                province_name: '',
                city_name: '',
            }
        },
        created () {
            this.getProvinceInfo(this.$store.state.user.province_id);
            this.getCityInfo(this.$store.state.user.city_id)
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('myInfo-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            handleText(val) {
                if(val === '内蒙古自治区'){
                    val = '内蒙古'
                    return val
                }
                if (val.length > 4) {
                    val = val.slice(0,2)
                    return val
                } else {
                    return val
                }
            },
            getProvinceInfo(value) {
                this.$api.province.getProvinceInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        if(res.data !==null){
                            this.province_name = res.data.province_name
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            getCityInfo(value) {
                this.$api.city.getCityInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        if(res.data !==null){
                            this.city_name = res.data.city_name
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            putUser(){
                this.$router.push('/myInfoEdit')
            }
        },
        computed:{
            ...mapState({
                u_image: state=> state.u_image,
                u_name: state=> state.u_name,
                u_userId: state=> state.u_userId,
                u_sex: state=> state.u_sex,
                province_id: state=> state.province_id,
                city_id: state=> state.city_id,
                u_sign: state=> state.u_sign,
                u_date: state=> state.u_date
            })
        }
    }
</script>

<style lang="less" scoped>

.myInfo{
    width: 100%;
}

#myInfo-page{
    background: #F7F8FA;

    .avatar{
        width: 100px;
        height: 100px;

        img{
            width: 100%;
            height: 100%;
            border-radius: 5px
        }
    }

    .cell{
        max-width: 50%;
        color: #969799;
    }

    .item{
        margin-top: 20px;
        text-align: center;
    }
}

</style>