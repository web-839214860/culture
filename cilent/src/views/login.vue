<template>
    <div class="login">

        <div class="login-page" :style="backgroundDiv">
            <div class="content">
                <div class="title">非遗百科</div>

                <div class="english">Encyclopedia of intangible cultural heritage</div>

                <div class="login-form">
                    <van-form ref="loginForm">
                        <div class="form">
                            <van-field clearable v-model="loginForm.u_userId" label="账号" name="账号" :rules="rules.u_userId" type="text" autocomplete="off" />

                            <van-field clearable v-model="loginForm.u_password" label="密码" name="密码" :rules="rules.u_password" type="password"/>
                        </div>
                    </van-form>

                    <div class="tip"><router-link to="/register">新用户请点击前往注册</router-link></div>

                    <div class="login-button">
                        <van-button round block type="info" @click="postLogin">登 录</van-button>
                    </div>
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
                    backgroundImage: 'url(' + require('../assets/login.png') + ')'
                },
                loginForm: {
                    u_userId: '',
                    u_password: '',
                    role: 3
                },
                rules: {
                    u_userId: [
                        { required: true, message: '请输入账号', trigger: 'onBlur' }
                    ],
                    u_password: [
                        { required: true, message: '请输入密码', trigger: 'onBlur' }
                    ]
                },
            }
        },
        methods: {
            postLogin() {
                this.$refs.loginForm.validate().then(() => {
                    let params = this.loginForm;
                    this.$api.user.postLogin(params).then(res => {
                        // console.log(res)
                        if(res.code === 1){
                            setLocalStorage("Token", res.data.token)
                            this.$toast.success(res.message)
                            this.$router.push({ path: '/' })
                        } else if(res.code === -1){
                            this.$toast.fail(res.message) 
                        } else if(res.code === 0){
                            this.$toast.fail(res.message) 
                        } else{
                            this.$toast.fail("未知错误")
                        }
                    })
                }).catch(() => {})
            }
        },
    }
</script>

<style lang="less" scoped>

.login{
    width: 100%;
}

.login-page {
    min-height: 1334px;
    background: no-repeat center top;
    background-size: 100% 100%;
    padding: 0 12px;
    background-color: rgb(238, 248, 248);

    .content{
        padding-top: 300px;
        font-family: 'Times New Roman', Times, serif;

        .title{
            font-size: 45px;
            font-weight: bold;
            color: #333333;
            letter-spacing: 2px;
            text-align: center;
            margin-bottom: 18px;
        }

        .english{
            font-size: 30px;
            color: #555555;
            text-align: center;
            margin-bottom: 40px;
        }

        .login-form{
            .form{
                background: #ffffff;
                border-radius: 10px
            }

            .tip{
                font-size: 25px;
                font-family: 'Times New Roman', Times, serif;
                margin: 35px 0;
            }

            a{
                color: #555555;
            }

            /deep/.van-cell{
                background-color: transparent;
            }
            /deep/.van-field__label{
                width: 70px;
            }
        }
    }
}

</style>