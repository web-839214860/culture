<template>
    <div class="trendAdd">

        <div class="trendAdd-page">
            <div class="trendAdd-page-content">
                <div class="title">
                    <span class="icon"></span>
                    发布动态
                </div>

                <div class="trendAdd-form">
                    <el-form :model="trendAddForm" ref="trendAddForm" label-width="45px">

                        <el-form-item label="内 容" prop="t_content">
                            <el-input clearable type="text" placeholder="请添加动态内容" v-model="trendAddForm.t_content" ></el-input>
                        </el-form-item>

                        <el-form-item label="媒 体" class="media">
                            <el-upload ref="upload" action="" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                                <img v-if="imageUrl" :src="imageUrl">
                                <video v-else-if="videoUrl" :src="videoUrl" controls="controls"></video>
                                <i v-else class="el-icon-camera-solid"></i>
                            </el-upload>
                        </el-form-item>

                        <div class="button">
                            <el-button type="danger" @click="reset" >重置</el-button>
                            <el-button type="primary" @click="postTrend('trendAddForm')" >确认</el-button>
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
            return {
                imageUrl: '',
                videoUrl: '',
                trendAddForm: {
                    t_content: '',
                    u_userId: this.$store.state.user.u_userId
                },
            }
        },
        methods: {
            showMessage(type,message){
                this.$message({
                    type: type,
                    message: message
                });
            },
            handleChange(file) {
                // console.log(URL.createObjectURL(file.raw))
                const type = (file.raw.type).split("/")
                if(type[0] === 'image'){
                    this.videoUrl = ''
                    this.imageUrl =  URL.createObjectURL(file.raw);
                } else if(type[0] === 'video') {
                    this.imageUrl = ''
                    this.videoUrl =  URL.createObjectURL(file.raw);
                } else {
                    this.showMessage('warning', "不支持该格式的媒体")
                    file = {}
                }
            },
            // 重置
            reset() {
                this.$refs.trendAddForm.resetFields()
                this.imageUrl = '',
                this.videoUrl = ''
                this.$refs.upload.clearFiles()
            },
            postTrend(trendAddForm){
                this.$refs[trendAddForm].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();  //用formData传递数据
                        const mediaFiles = this.$refs.upload.uploadFiles
                        const file = mediaFiles[mediaFiles.length-1]  //上传媒体

                        formData.append('t_content', this.trendAddForm.t_content);
                        formData.append('u_userId', this.trendAddForm.u_userId);
                        if(file !== undefined){
                            formData.append('t_media', file.raw);
                        }else{
                            formData.append('t_media', null);
                        }

                        this.$api.trend.postTrend(formData).then(res => {
                            // console.log(res)
                            if(res.code === 1){
                                this.showMessage('success', res.message)
                                this.$router.push({ path: '/trend' })
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

.trendAdd{
    width: 100%; 
}

.trendAdd-page{
    padding: 10px;

    .trendAdd-page-content{
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

        .trendAdd-form{
            margin: 40px 28px 5px 28px;
            width: 38%;

            .button{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin-top: 25px;
            }

            .media{
                /deep/.el-form-item__label{
                    line-height: 120px;
                }
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

                video{
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                /deep/.el-icon-camera-solid{
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