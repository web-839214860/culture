<template>
    <div class="userAdd">

        <div class="userAdd-page">
            <div class="userAdd-page-content">
                <div class="title">
                    <span class="icon"></span>
                    添加用户
                </div>

                <div class="userAdd-form">
                    <el-form :model="userAddForm" :rules="rules" ref="userAddForm" label-width="91px">
                        <el-form-item label="账 号" prop="u_userId">
                            <el-input clearable type="text" placeholder="请设置登录账号" v-model="userAddForm.u_userId" ></el-input>
                        </el-form-item>

                        <el-form-item label="密 码" prop="u_password">
                            <el-input clearable show-password type="password" placeholder="请设置登录密码" v-model="userAddForm.u_password" ></el-input>
                        </el-form-item>

                        <el-form-item label="密 码 确 认" prop="u_password_check">
                            <el-input clearable show-password type="password" placeholder="请确认登录密码" v-model="userAddForm.u_password_check" ></el-input>
                        </el-form-item>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="身 份" prop="role">
                                    <el-select clearable v-model="userAddForm.role" placeholder="请选择身份">
                                        <el-option label="高级管理员" value="1"></el-option>
                                        <el-option label="管理员" value="2"></el-option>
                                        <el-option label="普通用户" value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="性 别" prop="u_sex">
                                    <el-select clearable v-model="userAddForm.u_sex" placeholder="请选择性别">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        
                        <el-form-item label="昵 称" prop="u_name">
                            <el-input clearable type="text" placeholder="请填写昵称" v-model="userAddForm.u_name" ></el-input>
                        </el-form-item>

                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="地 区" prop="province_id">
                                    <el-select clearable v-model="userAddForm.province_id"  @change="handleProvinceChange" >
                                        <el-option v-for="provinceInfo in province" :key="provinceInfo.province_id"
                                          :label="provinceInfo.province_name" :value="provinceInfo.province_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="" prop="city_id">
                                    <el-select clearable v-model="userAddForm.city_id" >
                                        <el-option v-for="cityInfo in city" :key="cityInfo.city_id"
                                          :label="cityInfo.city_name" :value="cityInfo.city_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="标 签" prop="u_sign">
                            <el-input clearable type="text" placeholder="请填写标签" v-model="userAddForm.u_sign" ></el-input>
                        </el-form-item>

                        <el-form-item label="头 像" class="avatar">
                            <el-upload ref="upload" action="" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                                <img v-if="imageUrl" :src="imageUrl">
                                <i v-else class="el-icon-plus"></i>
                            </el-upload>
                        </el-form-item>

                        <div class="button">
                            <el-button type="danger" @click="reset" >重置</el-button>
                            <el-button type="primary" @click="postUser('userAddForm')" >确认</el-button>
                        </div>

                    </el-form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            let validatePassword = (rule, value, callback) => {
                if (value !== this.userAddForm.u_password) {
                    callback(new Error('与设置的密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                imageUrl: '',
                userAddForm: {
                    u_userId: '',
                    u_password: '',
                    u_password_check: '',
                    role: '',
                    u_sex: '',
                    u_name: '',
                    province_id: '',
                    city_id: '',
                    u_sign: '',
                },
                province: [],
                city: [],
                rules: {
                    u_userId: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { min: 4, max: 10, message: '长度在 4 到 10 位数字或字母', trigger: 'blur' }
                    ],
                    u_password: [
                        { required: true, message: '请设置密码', trigger: 'blur' }
                    ],
                    u_password_check: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '请选择身份', trigger: 'change' }
                    ],        
                } 
            }
        },
        created () {
            this.getProvince();
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            getProvince() {
                this.$api.province.getProvince().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.province = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            handleProvinceChange(value) {
                // console.log(value)
                this.userAddForm.city_id = ''
                this.city = []
                if(value !== ''){
                    this.$api.city.getCity(value).then(res =>{
                        if(res.code === 1){
                            this.city = res.data;
                            // console.log(this.city)
                        }else{
                            this.$message.error("未知错误")
                        }
                    })
                }
            },
            handleChange(file) {
                // console.log(URL.createObjectURL(file.raw))
                const type = (file.raw.type).split("/")
                if(type[0] === 'image'){
                    this.imageUrl =  URL.createObjectURL(file.raw);
                } else {
                    this.showMessage('warning', "不支持该格式的头像")
                    file = {}
                }
            },
            // 重置
            reset() {
                this.$refs.userAddForm.resetFields()
                this.imageUrl = '',
                this.$refs.upload.clearFiles()
            },
            postUser(userAddForm){
                this.$refs[userAddForm].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();  //用formData传递数据
                        const imageFiles = this.$refs.upload.uploadFiles
                        const file = imageFiles[imageFiles.length-1]  //上传图片

                        formData.append('u_userId', this.userAddForm.u_userId);
                        formData.append('u_password', this.userAddForm.u_password);
                        formData.append('role', this.userAddForm.role);
                        formData.append('u_sex', this.userAddForm.u_sex);
                        formData.append('u_name', this.userAddForm.u_name);
                        formData.append('province_id', this.userAddForm.province_id);
                        formData.append('city_id', this.userAddForm.city_id);
                        formData.append('u_sign', this.userAddForm.u_sign);
                        if(file !== undefined){
                            formData.append('u_image', file.raw);
                        }else{
                            formData.append('u_image', null);
                        }

                        this.$api.user.postUser(formData).then(res => {
                            // console.log(res)
                            if(res.code === 1){
                                this.showMessage('success', res.message)
                                this.$router.push({ path: '/user' })
                            }else if(res.code === -1){
                                this.showMessage('warning', res.message)
                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            }
        },
        
    }
</script>

<style lang="less" scoped>

.userAdd{
    width: 100%
}

.userAdd-page{
    padding: 10px;

    .userAdd-page-content{
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

        .userAdd-form{
            margin: 40px 28px 5px 28px;
            width: 38%;

            .button{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin-top: 25px;
            }

            .avatar{
                /deep/.el-form-item__label{
                    line-height: 120px;
                }
            }

            /deep/.el-form-item__label:before{
                opacity: 0;
            }

            /deep/.el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                overflow: hidden;

                img{
                    width: 120px;
                    height: 120px;
                    display: block;
                }

                /deep/.el-icon-plus{
                    font-size: 20px;
                    color: #8c939d;
                    width: 120px;
                    height: 120px;
                    line-height: 120px;
                    text-align: center;
                }
            }

            /deep/.el-upload:hover {
                border-color: #409EFF;
            }
        }
    }  
}

</style>