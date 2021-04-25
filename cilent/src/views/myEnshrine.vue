<template>
    <div class="myEnshrine">

        <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft" />

        <div id="myEnshrine-page">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <div class="news" v-for="(item, index) in newsInfo" :key="index" @click="newsInfoItem(item.n_id, item.news.sort.sort_name)">
                    <div class="image" v-if="item.news.n_image">
                        <img :src="link+item.news.n_image">
                    </div>

                    <div class="title" v-if="item.news">{{item.news.n_title}}</div>
                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
import { setLocalStorage } from '@/utils/localStorage'

    export default {
        data() {
            return {
                link: this.$link.linkURL,
                loading: true,
                finished: false,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 5, //每页的数据
                    u_userId: this.$store.state.user.u_userId,
                },
                newsInfo: [],
                total: 0
            }
        },
        created () {
            this.postAllEnshrine();
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('myEnshrine-page').style.height = winHeight-46-30 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            postAllEnshrine() {
                let params = this.searchInfo;
                this.$api.enshrine.postAllEnshrine(params).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.loading = false
                        let arr = res.data.enshrineList
                        this.total = res.data.total

                        if (arr.length === 0) {
                            this.finished = true;
                            return;
                        }

                        // 数据合并
                        if(this.searchInfo.currentPage === 1){
                            this.newsInfo = arr;
                        } else {
                            this.newsInfo = this.newsInfo.concat(arr);
                        }
                        if (this.newsInfo.length >= this.total) {
                            this.finished = true;
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            onLoad() {
                this.searchInfo.currentPage ++;
                this.postAllEnshrine();
            },
            newsInfoItem(id, value){
                this.$router.push('/newsInfoItem/' + id)
                setLocalStorage("sortName", value)
            },
        },
        
    }
</script>

<style lang="less" scoped>

.myEnshrine{
    width: 100%
}

#myEnshrine-page{
    overflow: scroll;
    padding: 30px;
    background: #F7F8FA;

    .news{
        padding: 40px 35px;
        background: #ffffff;
        border-radius: 10px;
        margin-bottom: 35px;

        &:last-child{
            margin-bottom: 0px;
        }

        .image{
            width: 100%;
            height: auto;
            margin: 0 auto;
            margin-bottom: 20px;

            img{
                width: 100%;
                height: 100%;
            }
        }

        .title{
            font-size: 26px;
            color: #333333;
            text-align: justify;
            font-weight: 400;
            line-height: 42px;
            letter-spacing: 0.04em;
        }
    }
}

</style>