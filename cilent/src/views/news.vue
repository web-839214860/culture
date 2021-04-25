<template>
    <div class="news">

        <van-nav-bar title="资讯"/>

        <div id="news-page">
            <div class="swiper-page">
                <van-swipe :autoplay="3000" indicator-color="white">
                    <van-swipe-item><img src="../assets/swiper1.jpg" ></van-swipe-item>
                    <van-swipe-item><img src="../assets/swiper2.jpg" ></van-swipe-item>
                    <van-swipe-item><img src="../assets/swiper3.jpg" ></van-swipe-item>
                    <van-swipe-item><img src="../assets/swiper4.jpg" ></van-swipe-item>
                    <van-swipe-item><img src="../assets/swiper5.jpg" ></van-swipe-item>
                    <van-swipe-item><img src="../assets/swiper6.jpg" ></van-swipe-item>
                </van-swipe>
            </div>

            <div class="index-page">
                <div class="title">
                    <van-icon name="description" size="18" /> 
                    <div>资料馆</div>
                </div>

                <div class="box">
                    <div class="content" v-for="(item, index) in type" :key="index" :style="{background: color[index]}" @click="indexInfo(item.type_id, item.type_name)">
                        <img :src="imgUrl[index]" />
                        <div>{{item.type_name}}</div>
                    </div>
                </div>
            </div>

            <div class="tabs-page">
                <van-tabs v-model="defaultActiveKey" sticky animated color="#1989fa" title-active-color="#1989fa" @change="changeActive">
                    <van-tab v-for="(item, index) in sort" :key="index" :title="item.sort_name">
                        <newsInfo :sortId="item.sort_id"></newsInfo>
                    </van-tab>
                </van-tabs>
            </div>
        </div>

    </div>
</template>

<script>
import { setLocalStorage, getLocalStorage } from '@/utils/localStorage'
import newsInfo from '../components/newsInfo.vue'

    export default {
        components: { newsInfo },
        data() {
            return {
                color: ['#996F65', '#84A790', '#B43737', '#AD8985', '#475281', '#B23434', '#8A302C', '#BDAF98', '#929BBB', '#717993'],
                imgUrl: [
                    require('../assets/1.png'),
                    require('../assets/2.png'),
                    require('../assets/3.png'),
                    require('../assets/4.png'),
                    require('../assets/5.png'),
                    require('../assets/6.png'),
                    require('../assets/7.png'),
                    require('../assets/8.png'),
                    require('../assets/9.png'),
                    require('../assets/10.png'),
                ],
                type: [],
                sort: []
            }
        },
        created () {
            this.getType();
            this.getSort();
        },
        mounted(){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('news-page').style.height=winHeight-46-50 +'px'
        },
        methods: {
            getType() {
                this.$api.type.getType().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.type = res.data;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            indexInfo(id, value){
                this.$router.push('/indexInfo/' + id)
                setLocalStorage("typeName", value)
            },
            getSort() {
                this.$api.sort.getSort().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.sort = res.data;
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            changeActive(active){
                setLocalStorage("tabActive", active)
            }
        }, 
        computed: {
            defaultActiveKey: {
                get(){
                    return getLocalStorage('tabActive') ? getLocalStorage('tabActive') : 0 
                },
                set(){}
            }
        }, 
    }
</script>

<style lang="less" scoped>

.news{
    width: 100%;
}

#news-page {
    overflow: scroll;

    .swiper-page{
        padding: 10px;

        img{
            width: 100%;
            height: 100%;
            border-radius: 30px;
        }
    }

    .index-page{
        overflow: hidden;

        .title{
            padding: 5px 15px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            div{
                margin-left: 13px;
                font-size: 28px;
            }
        }

        .box{
            padding: 8px 15px;
            white-space: nowrap;
            overflow-y: auto;

            .content{
                width: 28%;
                margin-right: 30px;
                text-align: center;
                display: inline-block;

                &:last-child{
                    margin-right: 0;
                }

                img{
                    margin-top: 5px;
                    width: 70%;
                    height: 70%;
                }

                div{
                    margin: 10px;
                    font-size: 18px;
                    color: #ffffff;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis; 
                }
            }
        }
    }
}

</style>