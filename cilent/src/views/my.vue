<template>
    <div class="my">

        <van-nav-bar title="个人中心"/>

        <div id="my-page">
            <div>
                <van-cell title="" size="large"  url="/myInfo">
                    <template #title >
                        <div class="userInfo">
                            <div class="avatar"><img :src="link+u_image"></div>
                            <div>
                                <div class="name">{{u_name}}</div>
                                <div class="user">账号： {{u_userId}}</div>
                            </div>
                        </div>
                    </template>

                    <template #right-icon>
                        <div class="icon">
                            <van-icon name="arrow" />
                        </div>
                    </template>
                </van-cell>
            </div>

            <div class="item">
                <van-cell title="我的动态" icon="chat-o" is-link  url="/myTrend" />
                <van-cell title="我的收藏" icon="star-o" is-link  url="/myEnshrine" />
            </div>

            <div class="item">
                <van-cell title="设置" icon="setting-o" is-link  url="/mySetting" />
            </div>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('user')

    export default {
        data() {
            return {
                link: this.$link.linkURL,
            }
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('my-page').style.height = winHeight-46-50 +'px'
        },
        computed:{
            ...mapState({
                u_image: state=> state.u_image,
                u_name: state=> state.u_name,
                u_userId: state=> state.u_userId
            })
        }
    }
</script>

<style lang="less" scoped>

.my{
    width: 100%;
}

#my-page{
    background: #F7F8FA;
    
    .userInfo{
        display: flex;
        flex-direction: row;

        .avatar{
            width: 120px;
            height: 120px;
            margin-right: 20px;
            flex-shrink: 0;

            img{
                width: 100%;
                height: 100%;
                border-radius: 8px;
            }
        }

        .name{
            font-size: 30px;
            color: #333333;
            font-weight: bold;
            letter-spacing: 1px;
            margin: 8px 0 16px 0  
        }
        .user{
            font-size: 25px;
            color: #817f7f;
        }  
    }

    .icon{
        display: flex;
        align-items: center;
        color: #969799;
    }

    .item{
        margin-top: 20px;
    }
}

</style>