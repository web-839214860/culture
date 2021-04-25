<template>
    <div class="myTrend">

        <van-nav-bar title="我的动态" left-arrow @click-left="onClickLeft" />

        <div id="myTrend-page">
            <div class="trendAdd">
                <div class="item" @click="trendAdd">
                    <van-icon name="photograph" class="photograph" />
                </div>
            </div>

            <van-divider>共 {{total}} 条</van-divider>

            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <div class="trendInfo" v-for="(item, index) in trendInfo" :key="index" @click="trendInfoPage(item.t_id)">
                    <div :class="[ item.t_media ? 'nobg': 'bg']">
                        <div class="media" v-if="item.t_media">
                            <div v-if="item.t_type === 1">
                                <img :src="link+item.t_media">
                            </div>
                            <div v-else-if="item.t_type === 2">
                                <video :src="link+item.t_media" controls="controls"></video>
                            </div>
                            <div v-else></div> 
                        </div>

                        <div class="content" v-if="item.t_content">{{item.t_content}}</div>
                    </div>
                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                finished: false,
                link: this.$link.linkURL,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 10, //每页的数据
                    u_userId: this.$store.state.user.u_userId
                },
                trendInfo: [],
                total: 0,
            }
        },
        created () {
            this.postAllTrend();
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('myTrend-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
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
            onLoad() {
                this.searchInfo.currentPage ++;
                this.postAllTrend();
            },
            trendAdd(){
                this.$router.push('/trendAdd')
            },
            trendInfoPage(id){
                this.$router.push('/trendInfo/' + id)
            },
        },
        
    }
</script>

<style lang="less" scoped>

.myTrend{
    width: 100%
}

#myTrend-page{
    overflow: scroll;

    .trendAdd{
        padding: 25px 25px 0 25px;

        .item{
            width: 160px;
            height: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #F7F8FA;

            .photograph{
                color: #dcdee0; 
            }
        }
    }

    .trendInfo{
        padding: 25px;

        .nobg{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            .content{
                max-height: 180px;
                margin-left: 13px;
                line-height: 45px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
            }
        }

        .bg{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            background: #F7F8FA;
        }

        .media{
            width: 45%;
            flex-shrink: 0;

            img{
                width: 100%;
                height: 100%
            }

            video{
                width: 100%;
                height: 100%;
            }
        }

        .content{
            padding: 5px;
            width: 55%;
            font-size: 25px;
        }
    }
}

</style>