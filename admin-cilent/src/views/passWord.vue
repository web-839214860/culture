<template>
    <div class="passWord">

        <div class="passWord-page">
            <div class="passWord-page-content">
                <div class="title">
                    <span class="icon"></span>
                    修改密码
                </div>

                <div class="passWord-form">
                    <el-form :model="passWordForm" :rules="rules" ref="passWordForm" label-width="91px">
                        <el-form-item label="原 始 密 码" prop="old_password">
                            <el-input show-password type="password" placeholder="请输入原始密码" v-model="passWordForm.old_password" ></el-input>
                        </el-form-item>

                        <el-form-item label="更 新 密 码" prop="new_password">
                            <el-input show-password type="password" placeholder="请设置新密码" v-model="passWordForm.new_password" ></el-input>
                        </el-form-item>

                        <el-form-item label="确 认 密 码" prop="new_password1">
                            <el-input show-password type="password" placeholder="请确认新密码" v-model="passWordForm.new_password1" ></el-input>
                        </el-form-item>

                        <div class="button">
                            <el-button type="danger" @click="$refs['passWordForm'].resetFields()" >重置</el-button>
                            <el-button type="primary" @click="putPassword('passWordForm')" >修改</el-button>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

    export default {
        data() {
            let validateNewPassword = (rule, value, callback) => {
                if (value === this.passWordForm.old_password) {
                    callback(new Error('新密码不能与原始密码相同!'))
                } else {
                    callback()
                }
            }
            let validateNewPassword1 = (rule, value, callback) => {
                if (value !== this.passWordForm.new_password) {
                    callback(new Error('与设置的新密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                passWordForm: {
                    u_userId: this.$store.state.user.u_userId,
                    old_password: '',
                    new_password: '',
                    new_password1: ''
                },
                rules: {
                    old_password: [
                        { required: true, message: '请输入原始密码', trigger: 'blur' }
                    ],
                    new_password: [
                        { required: true, message: '请设置新密码', trigger: 'blur' },
                        { validator: validateNewPassword, trigger: 'blur' }
                    ],
                    new_password1: [
                        { required: true, message: '请确认新密码', trigger: 'blur' },
                        { validator: validateNewPassword1, trigger: 'blur' }
                    ]
                }   
            }
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            putPassword(passWordForm){
                this.$refs[passWordForm].validate((valid) => {
                    if (valid) {
                        let params = this.passWordForm;
                        this.$api.user.putPassword(params).then(res =>{
                            if(res.code === 1){
                                this.showMessage('success', res.message)
                                this.$options.methods.LogOut.bind(this)()
                            } else if(res.code === -1){
                                this.showMessage('warning', res.message)
                            } else {
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            },
            ...mapActions(
                ['LogOut']  // 语法糖 相当于this.$store.dispatch('LogOut')这个方法
            )
        }
    }
</script>

<style lang="less" scoped>

.passWord{
    width: 100%
}

.passWord-page{
    padding: 10px;

    .passWord-page-content{
        padding: 10px 10px 10px 0;
        background: #ffffff;
        border-radius: 10px;

        .title{
            font-size: 22px;
            color: #3f4466;
            display: flex;
            align-items: center;

            .icon {
                display: block;
                height: 24px;
                margin-right: 25px;
                border-left: 2px solid #304156;
            }
        }

        .passWord-form{
            margin: 40px 28px 5px 28px;
            width: 30%;

            .button{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin-top: 25px;
            }
        }
    }  
}

</style>