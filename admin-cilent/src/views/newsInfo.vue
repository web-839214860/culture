<template>
    <div class="newsInfo">

        <div class="newsInfo-page">
            <div class="sort-name">
                <span class="icon"></span>
                <div v-if="news.sort">{{news.sort.sort_name}}</div>
            </div>

            <div class="content">
                <div class="item">
                    <div class="title">{{news.n_title}}</div>

                    <div class="tip">
                        <div v-if="news.n_source"><i class="el-icon-document"></i><span>来源：{{news.n_source}}</span></div>
                        <div v-if="news.n_author"><i class="el-icon-user-solid"></i><span>作者：{{news.n_author}}</span></div>
                        <div v-if="news.n_date"><i class="el-icon-time"></i><span>创建时间：{{news.n_date}}</span></div>
                    </div>

                    <el-divider v-if="bottom"></el-divider>
                </div>

                <div class="article" v-html="news.n_article"></div>

                <div class="bottom" v-if="bottom">
                    <div><i class="el-icon-star-on"></i><span>{{handleText(news.n_enshrine)}}</span></div>
                    <div><i class="el-icon-view"></i><span>{{handleText(news.n_view)}}</span></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                news: {},
                bottom: false
            }
        },
        created () {
            this.getNewsInfo(this.$route.params.id);
        },
        methods: {
            showMessage(type, message) {
                this.$message({
                    type: type,
                    message: message
                });
            },
            handleText(val) {
                if (val >= 1000) {
                    val = val / 1000
                    return val + 'k'
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
                        this.news.n_article = content.replace(regex, `<img style="width: 40%; height: auto; margin: 0 auto; display: block"`)
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
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

.newsInfo{
    width: 100%;
}

.newsInfo-page{
    padding: 10px;

    .sort-name {
        padding: 12px 0 18px 0;
        font-size: 22px;
        color: #3f4466;
        display: flex;
        align-items: center;
        background: #ffffff;
        border-radius: 10px 10px 0 0;

        .icon {
            display: block;
            height: 24px;
            margin-right: 25px;
            border-left: 2px solid #304156;
        }
    }

    .content {
        padding: 20px 0;
        background: #ffffff;
        border-radius: 0 0 10px 10px;
        
        .item{
            width: 90%;
            margin: 0 auto;
            text-align: center;

            .title{
                font-size: 20px;
                color: #333333;
                letter-spacing: 1px;
                margin-bottom: 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .tip{
                display: flex;
                flex-direction: row;
                justify-content: center;

                div{
                    margin-right: 60px;

                    &:last-child{
                        margin-right: 0px;
                    }

                    span{
                        margin-left: 10px;
                        font-size: 14px;
                        color: #333333;
                    }
                }
            }
        }

        .article{
            width: 90%;
            margin: 0 auto;
            font-size: 15px;
            color: #333333;
            text-align: justify;
            line-height: 40px;
            text-indent: 2em;
        }

        .bottom{
            width: 90%;
            margin: 0 auto;
            margin-top: 30px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;

            div{
                margin-right: 60px;

                &:last-child{
                    margin-right: 0px;
                }

                span{
                    margin-left: 10px;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }
    }
}

</style>