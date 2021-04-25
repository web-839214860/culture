<template>
    <div class="mySetting">

        <van-nav-bar title="设置" left-arrow @click-left="onClickLeft"/>

        <div id="mySetting-page">
            <div>
                <van-cell title="修改密码" is-link url="/myPassWord" />
            </div>

            <div class="item">
                <van-cell title="退出登录" @click="open" />
            </div>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

    export default {
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('mySetting-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            ...mapActions(
                ['LogOut']  // 语法糖,相当于this.$store.dispatch('modifyName'),提交这个方法
            ),
            open(){
                this.$dialog.alert({
                    title: "是否退出登录？", //标题
                    message: "退出登录后不改变用户的信息", //弹出框的内容
                    showCancelButton: true //展示取消按钮
                })
                .then(() => { //点击确认按钮后的调用
                    this.$options.methods.LogOut.bind(this)();
                })
                .catch(() => {}) //点击取消按钮后的调用
            },
        },
        
    }
</script>

<style lang="less" scoped>

.mySetting{
    width: 100%;
}

#mySetting-page{
    background: #F7F8FA;

    .item{
        margin-top: 20px;
        text-align: center;
    }
}

</style>