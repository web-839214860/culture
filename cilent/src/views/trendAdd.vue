<template>
    <div class="trendAdd">

        <van-nav-bar title="发表动态" left-arrow @click-left="onClickLeft">
            <template>  
                <div slot="right">
                    <van-button type="info" size="small" @click="postTrend" :disabled="(trendAddForm.t_content === '') && (fileList.length === 0)">发表</van-button>
                </div>
            </template>
        </van-nav-bar>

        <div class="trendAdd-form">
            <van-form>
                <van-field autosize type="textarea" v-model="trendAddForm.t_content" label="" name="内容" placeholder="这一刻的想法..." />

                <van-field name="媒体" label="" v-if="show">
                    <template #input>
                        <van-uploader ref="upload" v-model="fileList" :max-count="1" accept="image/*, video/*" :after-read="afterRead" />
                    </template>
                </van-field>

                <div class="videoDiv" v-if="!show">
                    <video :src="videoUrl" controls="controls"></video>
                    <van-icon name="delete-o" size="16" @click="out"/>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                show: true,
                fileList: [],
                videoUrl: '',
                uploadFile: {},
                trendAddForm: {
                    t_content: '',
                    u_userId: this.$store.state.user.u_userId
                }
            }
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            postTrend(){
                let formData = new FormData();  //用formData传递数据
                const file = this.uploadFile

                formData.append('t_content', this.trendAddForm.t_content);
                formData.append('u_userId', this.trendAddForm.u_userId);
                if(file !== undefined){
                    formData.append('t_media', file.file);
                }else{
                    formData.append('t_media', null);
                }

                this.$api.trend.postTrend(formData).then(res => {
                    // console.log(res)
                    if(res.code === 1){
                        this.$toast.success(res.message)
                        this.$router.push({ path: '/trend' })
                    }else{
                        this.$toast.fail("未知错误") 
                    }
                })
            },
            afterRead(file){
                // console.log(file.file.type)
                this.uploadFile = file
                const type = (file.file.type).split("/")
                if(type[0] === 'video'){
                    this.videoUrl = URL.createObjectURL(file.file)
                    this.show = false
                }
            },
            out(){
                this.show = true
                this.fileList = [],
                this.videoUrl = ''
            }
        },
        
    }
</script>

<style lang="less" scoped>

.trendAdd{
    width: 100%;
}

.trendAdd-form{
    .videoDiv{
        padding: 8px;
        margin-top: 15px;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: baseline;

        video{
            width: 80%;
            height: 80%;
        }
    }

    /deep/ .van-cell{
        min-height: 150px;
    }

}

</style>