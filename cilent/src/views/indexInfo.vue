<template>
    <div class="indexInfo">

        <van-nav-bar :title="typeName" left-arrow @click-left="onClickLeft"/>

        <van-search v-model="searchInfo.c_name" placeholder="请输入搜索关键词" show-action  @clear="search"	>
            <template #action >
                <div v-if="searchInfo.c_name" @click="search">搜索</div>
            </template>
        </van-search>

        <div id="indexInfo-page" :style="backgroundDiv">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                    <div class="item" v-for="(item, index) in conventionInfo" :key="index" @click="indexInfoItem(item.c_id)">
                        <div class="content">
                            <div class="title">{{item.c_name || '-'}}</div>
                            <div class="company">保护单位：<span>{{item.c_company || '-'}}</span></div>
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
import { getLocalStorage } from '@/utils/localStorage'

    export default {
        data() {
            return {
                typeName: getLocalStorage('typeName'),
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../assets/index.jpg') + ')'
                },
                isRefresh: false,
                loading: true,
                finished: false,
                backTop: false,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 10, //每页的数据
                    type_id: this.$route.params.id,
                    c_name: ''
                },
                conventionInfo: [],
                total: 0,
            }
        },
        created () {
            this.postAllConvention();
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('indexInfo-page').style.height = winHeight-46-54 +'px'
            window.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            postAllConvention() {
                let params = this.searchInfo;
                this.$api.convention.postAllConvention(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        let arr = res.data.conventionList
                        this.total = res.data.total

                        if (arr.length === 0) {
                            this.finished = true;
                            return;
                        }

                        // 数据合并
                        if(this.searchInfo.currentPage === 1){
                            this.conventionInfo = arr;
                        } else {
                            this.conventionInfo = this.conventionInfo.concat(arr);
                        }
                        if (this.conventionInfo.length >= this.total) {
                            this.finished = true;
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            // 搜索
            search(){
                this.loading = true,
                this.conventionInfo = []
                document.getElementById('indexInfo-page').scrollTop = 0
                this.finished = false,
                this.searchInfo.currentPage = 1
                this.postAllConvention();
            },
            // 下拉刷新
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.finished = false
                    this.searchInfo.currentPage = 1
                    this.postAllConvention();
                }, 500)
            },
            // 上拉加载
            onLoad() {
                this.searchInfo.currentPage ++;
                this.postAllConvention();
            },
            // 回到顶部
            back() {
                document.getElementById('indexInfo-page').scrollTop = 0
            },
            handleScroll(){
                this.$nextTick(() => {
                    let scrollTop = document.getElementById('indexInfo-page').scrollTop
                    if(scrollTop > 1500){
                        this.backTop = true
                    } else {
                        this.backTop = false
                    }
                });
            },
            indexInfoItem(id){
                this.$router.push('/indexInfoItem/' + id)
            },
        },
    }
</script>

<style lang="less" scoped>

.indexInfo{
    width: 100%
}

#indexInfo-page{
    overflow: scroll;
    background: no-repeat center top;
    background-size: 100% 100%;

    .item{
        padding: 40px;

        .content{
            padding: 20px;
            text-align: center;
            border: 1px solid #7a7a7a;
            border-radius: 10px;

            .title{
                font-size: 31px;
                font-weight: bold;
                color: #333333;
                margin-bottom: 45px;
            }

            .company{
                font-size: 27px;
                color: rgb(112, 112, 112);

                span{
                   color: rgb(48, 48, 48); 
                }
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