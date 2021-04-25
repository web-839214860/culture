<template>
    <div class="newsInfoItem">

        <van-nav-bar :title="sortName" left-arrow @click-left="onClickLeft"/>

        <div id="newsInfoItem-page">
            <div class="item">
                <div class="content">
                    <div class="title">{{news.n_title}}</div>

                    <div class="tip" v-if="news.n_source"><van-icon class="icon" name="orders-o" size="10" /><span>来源：{{news.n_source}}</span></div>

                    <div class="tip" v-if="news.n_author"><van-icon class="icon" name="manager" size="10" /><span>作者：{{news.n_author}}</span></div>

                    <div class="tip" v-if="news.n_date"><van-icon class="icon" name="clock-o" size="10" /><span>创建时间：{{news.n_date}}</span></div>

                    <van-divider v-if="bottom" />

                    <div class="article" v-html="news.n_article"></div>

                    <van-divider v-if="bottom" style="margin: 16px 0 0 0" />

                    <div class="bottom" v-if="bottom">
                        <div v-if="showEnshrine"><van-icon @click="putEnshrine" class="bottom-icon" name="star-o" size="18" /><span>收藏 {{handleText(news.n_enshrine)}}</span></div>
                        <div v-if="!showEnshrine"><van-icon @click="putEnshrineCancel" class="bottom-icon" name="star" size="18" color="#ffd01e" /><span>取消收藏 {{handleText(news.n_enshrine)}}</span></div>
                        <div><span>阅读 {{handleText(news.n_view)}}</span></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        data() {
            return {
                sortName: getLocalStorage('sortName'),
                news: {},
                bottom: false,
                searchInfo: {
                    n_id: this.$route.params.id,
                    u_userId: this.$store.state.user.u_userId,
                },
                showEnshrine: true,
                enshrineId: 0
            }
        },
        created () {
            this.putNewsView(this.$route.params.id);
            this.postAllEnshrine()
            this.getNewsInfo(this.$route.params.id);
        },
        mounted () {
            let winHeight = document.documentElement.clientHeight
            document.getElementById('newsInfoItem-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            handleText(val) {
                if (val >= 100000) {
                    return '10万+' 
                } else {
                    return val
                }
            },
            getNewsInfo(value) {
                this.$api.news.getNewsInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.news = res.data
                        let content = this.news.n_article
                        const regex = new RegExp('<img', 'gi')
                        this.news.n_article = content.replace(regex, `<img style="width: 90%; height: auto; margin: 0 auto; display: block"`)
                        // console.log(this.news)
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            putNewsView(value) {
                this.$api.news.putNewsView(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        return
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 查看收藏
            postAllEnshrine() {
                let params = this.searchInfo;
                this.$api.enshrine.postAllEnshrine(params).then(res =>{
                    if(res.code === 1){
                        // console.log(res.data.total)
                        let total = res.data.total
                        if(total >0){
                            this.showEnshrine = false
                            this.enshrineId = res.data.enshrineList[total-1].e_id
                        } else{
                            this.showEnshrine = true
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 收藏
            putEnshrine(){
                this.searchInfo.enshrine = true
                this.$api.enshrine.putEnshrine(this.searchInfo, this.enshrineId).then(res => {
                    // console.log(res.data)
                    if(res.code === 1){
                        this.postAllEnshrine()
                        this.getNewsInfo(this.$route.params.id);
                        this.$toast.success(res.message)
                    }else if(res.code === -1){
                        this.$toast.fail(res.message)
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 取消收藏
            putEnshrineCancel(){
                this.searchInfo.enshrine = false
                this.$api.enshrine.putEnshrine(this.searchInfo, this.enshrineId).then(res => {
                    // console.log(res.data)
                    if(res.code === 1){
                        this.postAllEnshrine()
                        this.getNewsInfo(this.$route.params.id);
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            }
        },
        watch: {
            news: {
                handler: function () {
                    this.bottom = true
                },
                deep: true
            }
        } 
    }
</script>

<style lang="less" scoped>

.newsInfoItem{
    width: 100%;
}

#newsInfoItem-page{
    overflow: scroll;
    background: #F7F8FA;

    .item{
        padding: 15px 8px;

        .content{
            width: 94%;
            margin: 0 auto;

            .title{
                margin-bottom: 8px;
                font-size: 30px;
                color: #333333;
                text-align: center;
                font-weight: 400;
                line-height: 60px;
                letter-spacing: 1px;
            }
            
            .tip{
                margin-bottom: 10px;

                .icon{
                    vertical-align: text-bottom;
                }

                span{
                    margin-left: 10px;
                    font-size: 19px;
                    color: #333333;
                    vertical-align: bottom;
                }
            }

            .article{
                margin: 0 auto;
                font-size: 24px;
                color: #333333;
                text-align: justify;
                line-height: 60px;
                text-indent: 2em;
            }

            .bottom{
                display: flex;
                flex-direction: row;
                justify-content: flex-end;

                div{
                    margin-right: 80px;

                    &:last-child{
                        margin-right: 0px;
                    }

                    .bottom-icon{
                        vertical-align: bottom;
                    }

                    span{
                        margin-left: 13px;
                        font-size: 24px;
                        color: #333333;
                        vertical-align: bottom;
                    }
                }
            }
        }
    }
}

</style>