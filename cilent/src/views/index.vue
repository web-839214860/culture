<template>
    <div class="index">

        <van-nav-bar title="资料馆"/>

        <div id="index-page" :style="backgroundDiv">
            <div class="book-page" v-for="(item, index) in type" :key="index" @click="indexInfo(item.type_id, item.type_name)">
                <div class="book" :style="bookDiv">
                    <van-row>
                        <van-col span="17">
                            <div class="image">
                                <img :src="imgUrl[index]" />
                            </div>
                        </van-col>
                        <van-col span="7">
                            <div class="title">
                                <div class="item">{{item.type_name}}</div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { setLocalStorage } from '@/utils/localStorage'

    export default {
        data() {
            return {
                backgroundDiv: {
                    backgroundImage: 'url(' + require('../assets/index.jpg') + ')'
                },
                bookDiv: {
                    backgroundImage: 'url(' + require('../assets/book.png') + ')'
                },
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
                type: []
            }
        },
        created () {
            this.getType();
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('index-page').style.height = winHeight-46-50 +'px'
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
        },
    }
</script>

<style lang="less" scoped>

.index{
    width: 100%;
}

#index-page{
    overflow: scroll;
    background: no-repeat center top;
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    
    .book-page{
        width: 40%;
        height: 435px;
        padding: 30px 20px;

        .book{
            width: 100%;
            height: 100%;
            background: no-repeat center top;
            background-size: 100% 100%;
            position: relative;

            .image{
                width: 150px;
                height: 170px;
                padding: 15px;
                position: absolute;
                left: 35px;
                bottom: 35px;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .title{
                padding: 6px;
                font-size: 17px;
                font-family: 'KaiTi', Times, serif;;
                letter-spacing: 8px;
                writing-mode: vertical-lr;
                background: #ffffff;
                position: absolute;
                right: 30px;
                top: 25px;
                
                .item{
                    padding: 5px;
                    border: 1px solid #bbbbbb;
                }
            }
        }
    }
}

</style>