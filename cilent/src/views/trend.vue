<template>
    <div class="trend">

        <van-nav-bar title="广场">
            <template>  
                <div slot="right">
                    <van-icon name="ellipsis"  size="16" @click="trendAddPage"/>
                </div>
            </template>
        </van-nav-bar>

        <div id="trend-page">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                    <div class="item" v-for="(item, index) in trendInfo" :key="index">
                        <van-row>
                            <van-col span="3">
                                <div class="avatar" v-if="item.user">
                                    <img :src="link+item.user.u_image">
                                </div>
                            </van-col>

                            <van-col span="21"> 
                                <div class="userInfo" v-if="item.user">{{item.user.u_name}}</div>

                                <div class="content" v-if="item.t_content">{{item.t_content}}</div>

                                <div class="media">
                                    <div v-if="item.t_media">
                                        <div v-if="item.t_type === 1">
                                            <img :src="link+item.t_media">
                                        </div>
                                        <div v-else-if="item.t_type === 2">
                                            <video :src="link+item.t_media" controls="controls"></video>
                                        </div>
                                        <div v-else></div>
                                    </div>   
                                </div>

                                <div class="bottom">
                                    <div class="time">{{item.t_date}}</div>
                                    <van-icon name="delete-o" size="8" v-if="item.user.u_userId === uid" @click="open(item.t_id)"/>
                                </div>
                            </van-col>
                        </van-row>

                        <div class="function">
                            <van-col span="8">
                                <div>
                                    <van-icon class="icon" name="share-o" size="14"  @click="share"/>
                                </div>
                            </van-col>

                            <van-col span="8">
                                <div @click="trendInfoPage(item.t_id)">
                                    <van-icon class="icon" name="comment-o" size="14" /> <span>{{handleText(item.discusses.length)}}</span>
                                </div>
                            </van-col>

                            <van-col span="8">
                                <div>
                                    <div v-if="item.userLike === false">
                                        <van-icon class="icon" name="good-job-o" size="14" @click="putLike(item.t_id)" /> <span>{{handleText(item.t_like)}}</span>
                                    </div>
                                    <div v-if="item.userLike === true">
                                        <van-icon  class="icon" name="good-job" size="14" @click="putLikeCancel(item.t_id)"/> <span>{{handleText(item.t_like)}}</span>
                                    </div>
                                </div>
                            </van-col>
                        </div>
                    </div>
                </van-pull-refresh>
            </van-list>

            <div class="backTop" v-show="backTop" @click="back">
                <van-icon name="back-top"  size="28"/>
            </div>
        </div>

    </div>
</template>

<script>
let _ = require('lodash') //数组处理

    export default {
        data() {
            return {
                isRefresh: false,
                loading: true,
                finished: false,
                backTop: false,
                link: this.$link.linkURL,
                uid: this.$store.state.user.u_userId,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 10, //每页的数据
                    // sort: true
                },
                trendInfo: [],
                total: 0
            }
        },
        created () {
            this.postAllTrend();
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('trend-page').style.height = winHeight-46-50 +'px'
            window.addEventListener('scroll', this.handleScroll, true)
        },
        beforeRouteLeave(to, form, next){ //离开当前路由 解绑scroll事件
            window.removeEventListener('scroll', this.handleScroll, true);
            next();
        },
        methods: {
            handleText(val) {
                if (val >= 10000) {
                    return '1万+'
                } else {
                    return val || 0
                }
            },
            //查
            postAllTrend() {
                let params = this.searchInfo;
                this.$api.trend.postAllTrend(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        let arr = res.data.trendList
                        this.total = res.data.total

                        if (arr.length === 0) {
                            this.finished = true;
                            return;
                        }

                        arr = arr.map((item) => {
                            const otherIndex = _.findIndex(item.likes, { u_userId: this.$store.state.user.u_userId })
                            if(otherIndex <0){
                                item.userLike = false
                            } else {
                                item.userLike = true
                            }
                            return item
                        })

                        // 数据合并
                        if(this.searchInfo.currentPage === 1){
                            this.trendInfo = arr;
                        } else {
                            this.trendInfo = this.trendInfo.concat(arr);
                        }
                        if (this.trendInfo.length >= this.total) {
                            this.finished = true;
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false
                    this.searchInfo.currentPage = 1
                    this.postAllTrend();
                }, 500)
            },
            // 上拉加载
            onLoad() {
                this.searchInfo.currentPage ++;
                this.postAllTrend();
            },
            // 回到顶部
            back() {
                document.getElementById('trend-page').scrollTop = 0
            },
            handleScroll(){
                let scrollTop = document.getElementById('trend-page').scrollTop
                if(scrollTop > 1500){
                    this.backTop = true
                } else {
                    this.backTop = false
                }
            },
            // 删
            deleteTrend(val){
                this.finished = false;
                this.$api.trend.deleteTrend(val).then(res => {
                    if(res.code === 1){
                        this.searchInfo.currentPage = 1
                        this.postAllTrend();
                        this.$toast.success(res.message)
                    }else{
                        this.$toast.fail("未知错误")
                    } 
                })
            },
            open(val){
                this.$dialog.alert({
                    title: "提示", //标题
                    message: "是否删除此动态", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.deleteTrend.bind(this)(val);
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
            // 分享
            share(){
                this.$toast("暂不支持该功能")
            },
            // 评论
            trendInfoPage(id){
                this.$router.push('/trendInfo/' + id)
            },
            trendAddPage(){
                this.$router.push('/trendAdd')
            },
            // 点赞
            putLike(value){
                let parmas = {
                    t_id: value,
                    u_userId: this.$store.state.user.u_userId,
                    like: true
                }
                this.$api.like.putLike(parmas).then(res => {
                    // console.log(res.data)
                    if(res.code === 1){
                        this.loading = true,
                        this.trendInfo = []
                        document.getElementById('trend-page').scrollTop = 0
                        this.finished = false,
                        this.searchInfo.currentPage = 1
                        this.postAllTrend();
                    }else if(res.code === -1){
                        this.$toast.fail(res.message)
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 取消点赞
            putLikeCancel(value){
                let parmas = {
                    t_id: value,
                    u_userId: this.$store.state.user.u_userId,
                    like: false
                }
                this.$api.like.putLike(parmas).then(res => {
                    // console.log(res.data)
                    if(res.code === 1){
                        this.loading = true,
                        this.trendInfo = []
                        document.getElementById('trend-page').scrollTop = 0
                        this.finished = false,
                        this.searchInfo.currentPage = 1
                        this.postAllTrend();
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

.trend{
    width: 100%
}

#trend-page{
    overflow: scroll;

    .item{
        padding: 25px 15px 0px 15px;
        border-bottom: 1px solid #eeeeee;

        &:last-child{
            padding: 25px 15px 10px 15px;
            border-bottom: none
        }

        .avatar{
            width: 70px; 
            height: 70px;

            img{
                width: 100%; 
                height: 100%;
                border-radius: 5px;
            }
        }

        .userInfo{
            font-size: 19px;
            color: #282872;
            font-weight: bold;
            letter-spacing: 1px;
            margin-bottom: 13px  
        }

        .content{
            font-size: 21px;
            margin-bottom: 15px;
        }

        .media{
            margin-bottom: 15px; 

            img{
                width: 80%;
                height: 80%
            }

            video{
                width: 80%;
                height: 80%;
            }
        }

        .bottom{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: baseline;
            margin-bottom: 3px;

            .time{
                font-size: 12px;
                color: #a8a8a8;
                margin-right: 150px;
            }
        }
        
        .function{
            display: flex;
            text-align: center;

            .icon{
                vertical-align: middle;
            }
            
            span{
                font-size: 16px;
                color: #a8a8a8;
                vertical-align: middle;
            }
        }
    }

    .backTop{
        display: flex;
        align-items: center;
        padding: 10px;
        background: #eeeeee;
        border-radius: 8px;
        position: fixed;
        bottom: 160px;
        right: 20px;
    }
}

</style>