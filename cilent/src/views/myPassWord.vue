<template>
    <div class="myPassWord">

        <van-nav-bar title="修改密码" left-arrow @click-left="onClickLeft" right-text="完成"  @click-right="putPassword" />

        <div id="myPassWord-page">
            <van-form ref="passWordForm">
                <div class="form">
                    <van-field clearable v-model="passWordForm.old_password" label="原密码" name="原密码" :rules="rules.old_password" type="password" />

                    <van-field clearable v-model="passWordForm.new_password" label="新密码" name="新密码" :rules="rules.new_password" :error-message="new_password_error_message" type="password" />

                    <van-field clearable v-model="passWordForm.new_password1" label="确认密码" name="确认密码" :rules="rules.new_password1" :error-message="new_password1_error_message" type="password" />
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

    export default {
        data() {
            let validateNewPassword = (value) => {
                this.new_password_error_message = ''
                if (value === this.passWordForm.old_password) {
                    this.new_password_error_message = '新密码不能与原始密码相同!'
                    return false
                }
            }
            let validateNewPassword1 = (value) => {
                this.new_password1_error_message = ''
                if (value !== this.passWordForm.new_password) {
                    this.new_password1_error_message = '与设置的新密码不一致!'
                    return false
                }
            }
            return {
                passWordForm: {
                    u_userId: this.$store.state.user.u_userId,
                    old_password: '',
                    new_password: '',
                    new_password1: ''
                },
                new_password_error_message: '',
                new_password1_error_message: '',
                rules: {
                    old_password: [
                        { required: true, message: '请输入原密码', trigger: 'onBlur' }
                    ],
                    new_password: [
                        { required: true, message: '请输入新密码', trigger: 'onBlur' },
                        { required: true, validator: validateNewPassword, trigger: 'onBlur' }
                    ],
                    new_password1: [
                        { required: true, message: '请确认新密码', trigger: 'onBlur' },
                        { required: true, validator: validateNewPassword1, trigger: 'onBlur' }
                    ]
                },
            }
        },
        mounted (){
            let winHeight = document.documentElement.clientHeight
            document.getElementById('myPassWord-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            putPassword(){
                this.$refs.passWordForm.validate().then(() => {
                    let params = this.passWordForm;
                    this.$api.user.putPassword(params).then(res =>{
                        if(res.code === 1){
                            this.$toast.success(res.message)
                            this.$options.methods.LogOut.bind(this)()
                        } else if(res.code === -1){
                            this.$toast.fail(res.message)
                        } else {
                            this.$toast.fail("未知错误") 
                        }
                    })  
                }).catch(() => {})
            },
            ...mapActions(
                ['LogOut']  // 语法糖 相当于this.$store.dispatch('LogOut')这个方法
            )
        },
        
    }
</script>

<style lang="less" scoped>

.myPassWord{
    width: 100%;
}

#myPassWord-page{
    background: #F7F8FA;
}

</style>