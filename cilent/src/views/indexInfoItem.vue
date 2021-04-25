<template>
    <div class="indexInfoItem">

        <van-nav-bar title="项目详情" left-arrow @click-left="onClickLeft"/>

        <div id="indexInfoItem-page" :style="backgroundDiv">
            <div class="title">
                <div class="icon"><img src="../assets/left.png" /></div>

                <div class="item-title" @click="toast">{{convention.c_name || '-'}}</div>

                <div class="icon"><img src="../assets/right.png" /></div>
            </div>

            <div class="page">
                <div class="item">
                    <div class="info">类别</div>
                    <div class="content" v-if="convention.type">{{convention.type.type_name || '-'}}</div>
                </div>

                <div class="item">
                    <div class="info">公布时间</div>
                    <div class="content" v-if="convention.publish">{{convention.publish.publish_date || '-'}}</div>
                </div>

                <div class="item">
                    <div class="info">所属地区</div>
                    <div class="content" v-if="convention.province">{{convention.province.province_name || '-'}}</div>
                </div>

                <div class="item">
                    <div class="info">保护单位</div>
                    <div class="content">{{convention.c_company || '-'}}</div>
                </div>
            </div>

            <div class="synopsis">{{convention.c_synopsis|| '-'}}</div>

            <van-divider v-show="tip">数据来源：国家级非物质文化遗产代表性项目名录</van-divider>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../assets/index.jpg') + ')'
                },
                convention: {},
                tip: false
            }
        },
        created () {
            this.getConventionInfo(this.$route.params.id);
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('indexInfoItem-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getConventionInfo(value) {
                this.$api.convention.getConventionInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.convention = res.data
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            toast() {
                this.$toast(this.convention.c_name);
            }
        },
        watch: {
            convention: {
                handler: function () {
                    this.tip = true
                },
                deep: true
            }
        }
    }
</script>

<style lang="less" scoped>

.indexInfoItem{
    width: 100%
}

#indexInfoItem-page{
    overflow: scroll;
    background: no-repeat center top;
    background-size: 100% 100%;
    
    .title{
        padding: 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: baseline;
        justify-content: space-between;

        .icon{
            width: 40px;
            height: 40px;

            img{
                width: 100%;
                height: 100%;
            }
        }

        .item-title{
            max-width: 550px;
            font-size: 31px;
            font-weight: bold;
            color: #333333;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .page{
        margin-top: 50px;

        .item{
            padding: 25px 20px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            border-bottom: 1px solid #7a7a7a;

            .info{
                min-width: 200px;
                font-size: 27px;
                font-weight: bold;
                color: rgb(112, 112, 112);
            }

            .content{
                font-size: 27px;
                color: rgb(48, 48, 48); 
            }
        }
    }

    .synopsis{
        margin-top: 20px;
        padding: 25px 20px;
        font-size: 27px;
        color: rgb(48, 48, 48);
        line-height: 45px;
        text-align: justify;
        white-space:pre-wrap;
    }

    /deep/.van-divider{
        font-size: 12px;
    }
}

</style>