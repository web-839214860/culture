<template>
    <div class="trendInfo">

        <van-nav-bar title="详情" left-arrow @click-left="onClickLeft" />

        <div id="trendInfo-page">
            <div class="item">
                <van-row>
                    <van-col span="3">
                        <div class="avatar" v-if="trendInfo.user">
                            <img :src="link+trendInfo.user.u_image">
                        </div>
                    </van-col>

                    <van-col span="21"> 
                        <div class="userInfo" v-if="trendInfo.user">{{trendInfo.user.u_name}}</div>

                        <div class="content" v-if="trendInfo.t_content">{{trendInfo.t_content}}</div>

                        <div class="media">
                            <div v-if="trendInfo.t_media">
                                <div v-if="trendInfo.t_type === 1">
                                    <img :src="link+trendInfo.t_media">
                                </div>
                                <div v-else-if="trendInfo.t_type === 2">
                                    <video :src="link+trendInfo.t_media" controls="controls"></video>
                                </div>
                                <div v-else></div>
                            </div>   
                        </div>

                        <div class="bottom" v-if="trendInfo.user">
                            <div class="time">{{trendInfo.t_date}}</div>
                            <van-icon name="delete-o" size="8" v-if="trendInfo.user.u_userId === uid" @click="open(trendInfo.t_id)"/>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="discuss">
                <div class="like" v-if="likeInfo.length >0">
                    <div class="icon-like">
                        <van-icon name="like-o" size="14" style="display: block" />
                    </div>
                    
                    <div class="user-like">
                        <div v-for="(item, index) in likeInfo" :key="index">
                            <div class="user-like-image">
                                <img :src="link+item.user.u_image">
                            </div>
                        </div>
                    </div>
                </div>

                <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                    <div class="discuss-page" v-if="discussInfo.length >0">
                        <div class="discuss-item" v-for="(item, index) in discussInfo" :key="index">
                            <van-row>
                                <van-col span="2">
                                    <div class="avatar">
                                        <img :src="link+item.user.u_image">
                                    </div>
                                </van-col>

                                <van-col span="22" >
                                    <div class="page">
                                        <div class="userInfo">{{item.user.u_name}}</div>

                                        <div class="time">{{item.d_date}}</div>
                                    </div>

                                    <div class="page">
                                        <div class="content">{{item.d_content}}</div>

                                        <van-icon name="delete-o" size="8" v-if="item.user.u_userId === uid" @click="deleteDiscuss(item.d_id)"/>
                                    </div>
                                </van-col>
                            </van-row>
                        </div>
                    </div>
                </van-list>
            </div>
        </div>

        <div class="discuss-form">
            <van-row>
                <van-col span="19">
                    <van-field v-model="discussAddForm.d_content" placeholder="评论" />
                </van-col>

                <van-col span="1"></van-col>

                <van-col span="4" class="right">
                    <van-button type="info" size="small" @click="postDiscuss" :disabled="(discussAddForm.d_content === '')" >发送</van-button>
                </van-col>
            </van-row>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                link: this.$link.linkURL,
                uid: this.$store.state.user.u_userId,
                trendInfo: {},
                loading: true,
                finished: false,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 8, //每页的数据
                    t_id: this.$route.params.id,
                },
                discussInfo: [],
                total: 0,
                discussAddForm: {
                    d_content: '',
                    t_id: this.$route.params.id,
                    u_userId: this.$store.state.user.u_userId
                },
                likeInfo: []
            }
        },
        created () {
            this.getTrendInfo();
            this.postAllDiscuss()
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('trendInfo-page').style.height = winHeight-46-51 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            // 查动态
            getTrendInfo() {
                let param = this.searchInfo.t_id
                this.$api.trend.getTrendInfo(param).then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.trendInfo = res.data;
                        this.likeInfo = res.data.likes
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 删动态
            deleteTrend(val){
                this.$api.trend.deleteTrend(val).then(res => {
                    if(res.code === 1){
                        this.$router.go(-1)
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
            // 查评论
            postAllDiscuss() {
                let params = this.searchInfo;
                this.$api.discuss.postAllDiscuss(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        let arr = res.data.discussList
                        this.total = res.data.total

                        if (arr.length === 0) {
                            this.finished = true;
                            return;
                        }

                        // 数据合并
                        if(this.searchInfo.currentPage === 1){
                            this.discussInfo = arr;
                        } else {
                            this.discussInfo = this.discussInfo.concat(arr);
                        }
                        if (this.discussInfo.length >= this.total) {
                            this.finished = true;
                        }

                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 删评论
            deleteDiscuss(val) {
                this.$api.discuss.deleteDiscuss(val).then(res =>{
                    if(res.code === 1){
                        this.loading = true,
                        this.discussInfo = []
                        document.getElementById('trendInfo-page').scrollTop = 0
                        this.finished = false,
                        this.searchInfo.currentPage = 1
                        this.$toast.success(res.message)
                        this.postAllDiscuss()
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 上拉加载
            onLoad() {
                this.searchInfo.currentPage ++;
                this.postAllDiscuss()
            },
            // 增评论
            postDiscuss() {
                let parames = this.discussAddForm;
                this.$api.discuss.postDiscuss(parames).then(res => {
                    //console.log(res)
                    if(res.code === 1){
                        this.discussAddForm.d_content = ''
                        this.loading = true,
                        this.discussInfo = []
                        document.getElementById('trendInfo-page').scrollTop = 0
                        this.finished = false,
                        this.searchInfo.currentPage = 1
                        this.postAllDiscuss()
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
        },
        
    }
</script>

<style lang="less" scoped>

.trendInfo{
    width: 100%;
}

#trendInfo-page{
    overflow: scroll;

    .item{
        padding: 25px 15px;

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
    }

    .discuss{
        padding: 5px 25px 20px 25px;

        .like{
            padding: 18px 18px 0 18px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            background: #F7F8FA;
            border-bottom: 1px solid #ffffff;
            border-radius: 5px 5px 0 0;

            .icon-like{
                padding-top: 15px;
                flex-shrink: 0
            }

            .user-like{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;

                .user-like-image{
                    display: flex;
                    width: 58px;
                    height: 58px;
                    margin: 0 0 10px 12px;

                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                    }
                }
            }
        }

        .discuss-page{
            padding: 18px 18px 8px 18px;
            background: #F7F8FA;
            border-radius: 0 0 5px 5px;

            .discuss-item{
                margin-bottom: 10px;
                border-bottom: 1px solid #f5f4f4;

                &:last-child{
                    margin-bottom: 0px;
                    border-bottom: none;
                }

                .avatar{
                    display: flex;
                    width: 45px; 
                    height: 45px;

                    img{
                        width: 100%; 
                        height: 100%;
                        border-radius: 5px;
                    }
                }

                .page{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    margin-bottom: 10px;

                    .userInfo{
                        font-size: 18px;
                        color: #282872;
                        font-weight: bold;
                        letter-spacing: 1px;
                    }

                    .time{
                        font-size: 12px;
                        color: #a8a8a8;
                    }

                    .content{
                        font-size: 20px;
                    }
                }
            }
        }
    }
}

.discuss-form{
    min-width: 750px;
    padding: 15px;
    background: #f5f4f4;
    position: fixed;
    bottom: 0;
    
    .right{
        line-height: 40px; 
    }

    /deep/ .van-cell{
        line-height: 0;
    }
    /deep/ .van-button--small{
        height: 28px;
    }
}

</style>