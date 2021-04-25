<template>
    <div class="myInfoEdit">

        <van-nav-bar title="个人信息完善" left-arrow @click-left="onClickLeft" right-text="确定"  @click-right="putUser" />

        <div id="myInfoEdit-page">
            <van-form>
                <div class="form">
                    <van-field center name="头像" label="头像">
                        <template #input>
                            <van-uploader ref="upload" v-model="fileList" :max-count="1" accept="image/*" />
                        </template>
                    </van-field>

                    <van-field clearable v-model="userEditForm.u_name" label="昵称" name="昵称" autocomplete="off" />

                    <van-field clickable v-model="userEditForm.u_sex" @click="showSexPicker = true" label="性别" name="性别"  />
                    <van-popup v-model="showSexPicker" position="bottom">
                        <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showSexPicker = false" />
                    </van-popup>

                    <van-field clickable v-model="provinceInfo" @click="showProvincePicker = true" label="地区" name="地区"  />
                    <van-popup v-model="showProvincePicker" position="bottom" >
                        <van-picker show-toolbar :columns="province" @confirm="onConfirmProvince" @cancel="showProvincePicker = false" />
                    </van-popup>

                    <van-field clickable v-model="cityInfo" @click="cityChange" label=" " name="城市"  />
                    <van-popup v-model="showCityPicker" position="bottom" >
                        <van-picker show-toolbar :columns="city" @confirm="onConfirmCity" @cancel="showCityPicker = false" />
                    </van-popup>

                    <van-field center clearable autosize type="textarea" rows="1" v-model="userEditForm.u_sign" label="个性签名" name="个性签名" />
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
let _ = require('lodash') //数组处理

    export default {
        data() {
            return {
                userEditForm: {},
                fileList: [
                    { url: '' },
                ],
                columns: ['男', '女'],
                showSexPicker: false,
                provinceInfo: '',
                province: [],
                showProvincePicker: false,
                cityInfo: '',
                city: [],
                showCityPicker: false,
                allCity:[]
            }
        },
        created () {
            this.getUserInfo(this.$store.state.user.u_userId);
            this.getProvince();
        },
        mounted () {
            let winHeight = document.documentElement.clientHeight
            document.getElementById('myInfoEdit-page').style.height = winHeight-46 +'px'
        },
        methods: {
            onClickLeft(){
                this.$router.go(-1)
            },
            getUserInfo(value) {
                this.$api.user.getUserInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.userEditForm = res.data
                        this.fileList[0].url = this.$link.linkURL+this.userEditForm.u_image

                        if(this.userEditForm.province !==null){
                            this.provinceInfo = this.userEditForm.province.province_name
                        } else{
                            this.provinceInfo = '-'
                        }

                        if(this.userEditForm.city !==null){
                            this.cityInfo = this.userEditForm.city.city_name
                        } else{
                            this.cityInfo = '-'
                        }

                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            getProvince() {
                this.$api.province.getProvince().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        for(let i= 0; i< res.data.length; i++){
                            this.province.push(res.data[i].province_name);
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            getCity(value){
                this.$api.city.getCity(value).then(res =>{
                    if(res.code === 1){
                        this.allCity = res.data
                        for(let i= 0; i< res.data.length; i++){
                            this.city.push(res.data[i].city_name);
                        }
                    }else{
                        this.$toast.fail("未知错误")
                    }
                })
            },
            onConfirm(value) {
                this.userEditForm.u_sex = value;
                this.showSexPicker = false;
            },
            onConfirmProvince(value, index){
                this.provinceInfo = value
                this.userEditForm.province_id = index+1;
                this.cityInfo = '-'
                this.getCity(this.userEditForm.province_id)
                this.showProvincePicker = false;
            },
            cityChange(){
                this.city = []
                this.getCity(this.userEditForm.province_id)
                this.showCityPicker = true
            },

            onConfirmCity(value){
                this.cityInfo = value
                const index = _.findIndex(this.allCity, { city_name: value })
                this.userEditForm.city_id = this.allCity[index].city_id;
                this.showCityPicker = false;
            },
            putUser() {
                let formData = new FormData();  //用formData传递数据
                const file = this.$refs.upload.value[0]  //上传图片

                formData.append('u_name', this.userEditForm.u_name);
                formData.append('u_sex', this.userEditForm.u_sex);      
                formData.append('province_id', this.userEditForm.province_id);
                formData.append('city_id', this.userEditForm.city_id);
                formData.append('u_sign', this.userEditForm.u_sign);
                if(file.file !== undefined){
                    formData.append('u_image', file.file);
                } else {
                    formData.append('u_image', this.userEditForm.u_image);
                }

                this.$api.user.putUser(formData, this.userEditForm.u_userId).then(res => {
                    // console.log(res.data)
                    if(res.code === 1){
                        this.$toast.success(res.message)
                        this.$router.go(-1)
                    } else {
                        this.$toast.fail("未知错误")
                    }
                })
            }
        },
    }
</script>

<style lang="less" scoped>

.myInfoEdit{
    width: 100%;
}

#myInfoEdit-page{
    background: #F7F8FA;
}

</style>