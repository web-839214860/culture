<template>
    <div class="register">

        <van-nav-bar left-text="返回" title="用户注册" left-arrow @click-left="onClickLeft"/>

        <div id="register-page">
            <div class="content">
                <div class="title">请填写基本信息</div>

                <div class="info">信息填写完成后您将成为我们的用户</div>

                <div class="register-form">
                    <van-form ref="registerForm">
                        <div class="form">
                            <van-field clearable v-model="registerForm.u_userId" label="账号" name="账号" :rules="rules.u_userId" :error-message="u_userId_error_message" autocomplete="off" />

                            <van-field clearable v-model="registerForm.u_name" label="昵称" name="昵称" />

                            <van-field clearable v-model="registerForm.u_password" label="密码" name="密码" type="password" :rules="rules.u_password" />

                            <van-field clearable v-model="registerForm.u_password_check" label="确认密码" name="确认密码" type="password" :rules="rules.u_password_check" :error-message="u_password_check_error_message" />

                            <van-field name="头像" label="头像" class="avatar">
                                <template #input>
                                    <van-uploader ref="upload" v-model="fileList" :max-count="1" accept="image/*" />
                                </template>
                            </van-field>
                        </div>
                    </van-form>

                    <div class="check">
                        <van-checkbox v-model="checked" icon-size="15px"></van-checkbox>
                        <div class="agree">
                            我已阅读并同意<router-link to="/rule">《用户条例》</router-link>
                        </div>
                    </div>

                    <div class="register-button">
                        <van-button round block type="info" @click="postUser">马上注册</van-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            let validateUserId = (value) => {
                // this.registerForm.u_userId = value.replace(/\s*/g,"")
                this.u_userId_error_message = ''
                if(value.indexOf(" ") !== -1){
                    this.u_userId_error_message = '账号不能出现空格'
                    return false
                }
                if (value.length< 4 || value.length> 10) {
                    this.u_userId_error_message = '长度在 4 到 10 位数字或字母'
                    return false
                }
            }
            let validatePassword = (value) => {
                this.u_password_check_error_message = ''
                if (value !== this.registerForm.u_password) {
                    this.u_password_check_error_message = '与设置的密码不一致!'
                    return false
                }
            }
            return {
                checked: false, 
                fileList: [], 
                registerForm: {
                    u_userId: '',
                    u_name: '',
                    u_password: '',
                    u_password_check: '',
                    role: 3
                },
                u_userId_error_message: '',
                u_password_check_error_message: '',
                rules: {
                    u_userId: [
                        { required: true, message: '请填写账号', trigger: 'onBlur' },
                        { validator: validateUserId, trigger: 'onBlur' }
                    ],
                    u_password: [
                        { required: true, message: '请填写密码', trigger: 'onBlur' }
                    ],
                    u_password_check: [
                        { required: true, message: '请确认密码', trigger: 'onBlur' },
                        { required: true, validator: validatePassword, trigger: 'onBlur' }
                    ]
                },
            }
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('register-page').style.minHeight = winHeight-46 +'px'
        }, 
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            postUser() {
                this.$refs.registerForm.validate().then(() => {
                    if(this.checked === false){
                        this.$toast.fail("请先同意《用户条例》")
                    } else {
                        let formData = new FormData();  //用formData传递数据
                        const file = this.$refs.upload.value[0]

                        formData.append('u_userId', this.registerForm.u_userId);
                        formData.append('u_name', this.registerForm.u_name);
                        formData.append('u_password', this.registerForm.u_password);
                        formData.append('role', this.registerForm.role);
                        if(file !== undefined){
                            formData.append('u_image', file.file);
                        }else{
                            formData.append('u_image', null);
                        }

                        this.$api.user.postUser(formData).then(res => {
                            // console.log(res)
                            if(res.code === 1){
                                this.$toast.success(res.message)
                                this.$router.push({ path: '/login' })
                            }else if(res.code === -1){
                                this.$toast.fail(res.message) 
                            }else{
                                this.$toast.fail("未知错误") 
                            }
                        })
                    }
                }).catch(() => {})
            }
        },
        
    }
</script>

<style lang="less" scoped>

.register{
    width: 100%;
}

#register-page{
    padding: 0 12px;
    background: #F7F8FA;

    .content{
        padding: 55px 0;
        font-family: 'Times New Roman', Times, serif;

        .title{
            font-size: 45px;
            font-weight: bold;
            color: #333333;
            letter-spacing: 2px;
            text-align: center;
            margin-bottom: 20px;
        }

        .info{
            font-size: 30px;
            color: #555555;
            text-align: center;
            margin-bottom: 60px;
        }

        .register-form{
            .form{
                background: #ffffff;
                border-radius: 10px;

                .avatar{
                    /deep/.van-field__label{
                        line-height: 88px;
                    }
                }
            }

            .check{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                margin: 30px 0;

                .agree{
                    font-size: 28px;
                    font-family: 'Times New Roman', Times, serif;
                    margin-left: 20px;

                    a{
                        color: #555555;
                    }
                }
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