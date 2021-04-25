<template>
    <div class="newsInfo">

        <div class="newsInfo-page">
            <van-dropdown-menu active-color="#1989fa">
                <van-dropdown-item get-container="body" v-model="searchInfo.reorder" :options="option" @change="search" />
            </van-dropdown-menu>

            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <div class="bg" v-for="(item, index) in newsInfo" :key="index" @click="newsInfoItem(item.n_id, item.sort.sort_name)">
                    <div class="content">
                        <div class="writing">
                            <div class="title">{{item.n_title}}</div>

                            <div class="icon">
                                <div><van-icon class="item" name="underway-o" size="10"/><span>{{item.n_date}}</span></div>
                                <div><van-icon class="item" name="eye-o" size="10" /><span>{{handleText(item.n_view)}}</span></div>
                            </div>
                        </div>

                        <div class="image" v-if="item.n_image" >
                            <img :src="link+item.n_image" >
                        </div>
                    </div>
                </div>
            </van-list>
        </div>

    </div>
</template>

<script>
import { setLocalStorage } from '@/utils/localStorage'

    export default {
        props: {
            sortId: Number,
        },
        data() {
            return {
                link: this.$link.linkURL,
                loading: true,
                finished: false,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 5, //每页的数据
                    sort_id: this.sortId,
                    reorder: '3'
                },
                newsInfo: [],
                total: 0,
                option: [
                    { text: '按收藏量排序', value: '1' },
                    { text: '按阅读量排序', value: '2' },
                    { text: '按时间排序', value: '3' },
                ],
            }
        },
        created () {
            this.postAllNews();
        },
        methods: {
            handleText(val) {
                if (val >= 100000) {
                    return '10万+' 
                } else {
                    return val
                }
            },
            postAllNews() {
                let params = this.searchInfo;
                this.$api.news.postAllNews(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        let arr = res.data.newsList
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
                this.postAllNews();
            },
            search(){
                this.loading = true,
                this.finished = false,
                this.searchInfo.currentPage = 1
                this.postAllNews();
            },
            newsInfoItem(id, value){
                this.$router.push('/newsInfoItem/' + id)
                setLocalStorage("sortName", value)
            },
        },

    }
</script>

<style lang="less" scoped>

.newsInfo{
    width: 100%
}

.newsInfo-page{
    padding: 15px;
    background: #F7F8FA;

    .bg{
        padding: 20px;
        margin-top: 18px;
        background: #ffffff;

        .content{
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .writing{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                .title{
                    margin-bottom: 10px;
                    font-size: 25px;
                    color: #333333;
                    font-weight: 400;
                    line-height: 43px;
                    letter-spacing: 1px;
                }

                .icon{
                    display: flex;
                    flex-direction: row;
                    
                    div{
                        margin-right: 30px;

                        &:last-child{
                            margin-right: 0px;
                        }

                        .item{
                            vertical-align: text-bottom;
                        }

                        span{
                            margin-left: 12px;
                            font-size: 16px;
                            color: #777676;
                            vertical-align: bottom;
                        }
                    }
                }
            }

            .image{
                width: 30%;
                height: 125px;
                margin-left: 30px;
                flex-shrink: 0;

                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    /deep/.van-ellipsis{
        font-size: 13px;
    }
}

</style>