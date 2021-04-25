<template>
    <div class="conventionAdd">

        <div class="conventionAdd-page">
            <div class="conventionAdd-page-content">
                <div class="title">
                    <span class="icon"></span>
                    添加数据
                </div>

                <div class="conventionAdd-form">
                    <el-form :model="conventionAddForm" :rules="rules" ref="conventionAddForm" label-width="79px">
                        <el-form-item label="名 称" prop="c_name">
                            <el-input clearable type="text" v-model="conventionAddForm.c_name" ></el-input>
                        </el-form-item>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="公布时间" prop="publish_id">
                                    <el-select clearable v-model="conventionAddForm.publish_id" @focus="getPublish">
                                        <el-option v-for="conventionAddPublishInfo in publish" :key="conventionAddPublishInfo.publish_id"
                                          :label="conventionAddPublishInfo.publish_date" :value="conventionAddPublishInfo.publish_id"></el-option>
                                        <div style="padding: 10px 20px; font-size: 14px; font-weight: bold; color: #606266; cursor: pointer" @click="dialogVisible = true">添加时间</div>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="类 别" prop="type_id">
                                    <el-select clearable v-model="conventionAddForm.type_id" @focus="getType">
                                        <el-option v-for="conventionAddTypeInfo in type" :key="conventionAddTypeInfo.type_id"
                                          :label="conventionAddTypeInfo.type_name" :value="conventionAddTypeInfo.type_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="地 区" prop="province_id">
                                    <el-select clearable v-model="conventionAddForm.province_id" @focus="getProvince">
                                        <el-option v-for="conventionAddProvinceInfo in province" :key="conventionAddProvinceInfo.province_id"
                                          :label="conventionAddProvinceInfo.province_name" :value="conventionAddProvinceInfo.province_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="保护单位" prop="c_company">
                            <el-input clearable type="text" v-model="conventionAddForm.c_company" ></el-input>
                        </el-form-item>

                        <el-form-item label="简 介" prop="c_synopsis">
                            <el-input autosize type="textarea" v-model="conventionAddForm.c_synopsis" :placeholder="synopsisPlaceholder"></el-input>
                        </el-form-item>

                        <div class="button">
                            <el-button type="danger" @click="$refs['conventionAddForm'].resetFields()" >重置</el-button>
                            <el-button type="primary" @click="postConvention('conventionAddForm')" >确认</el-button>
                        </div>
                    </el-form>
                </div>

                <div class="publishAdd-page">
                    <el-dialog title="添加公布时间" :visible.sync="dialogVisible" @close="handleClose">
                        <el-form :model="publishAddForm" :rules="rules" ref="publishAddForm" label-width="55px">
                            <el-form-item label="时 间" prop="publish_date">
                                <el-input clearable type="text" v-model="publishAddForm.publish_date" placeholder="格式示例：2006(第一批)" ></el-input>
                            </el-form-item>
                        </el-form>

                        <div slot="footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="postPublish('publishAddForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                synopsisPlaceholder: '申报地区或单位：xx省xx市\n\n    ...',
                publish: [],
                type: [],
                province: [],
                dialogVisible: false,
                publishAddForm: {
                    publish_date: '2006(第一批)'
                },
                conventionAddForm: {
                    c_name: '',
                    publish_id: '',
                    type_id: '',
                    province_id: '',
                    c_company: '',
                    c_synopsis: ''
                },
                rules: {
                    c_name: [
                        { required: true, message: '请填写项目名称', trigger: 'blur' }
                    ],
                    publish_id: [
                        { required: true, message: '请选择公布时间', trigger: 'change' }
                    ],
                    type_id: [
                        { required: true, message: '请选择项目分类', trigger: 'change' }
                    ],
                    province_id: [
                        { required: true, message: '请选择所属地区', trigger: 'change' }
                    ],
                    c_synopsis: [
                        { required: true, message: '请按格式填写项目简介', trigger: 'blur' },
                        { min: 8, message: '至少包含"申报地区或单位："', trigger: 'blur' }
                    ],
                    publish_date: [
                        { required: true, message: '请按格式填写时间', trigger: 'change' }
                    ]
                },
            }
        },
        methods: {
            showMessage(type, message) {
                this.$message({
                    type: type,
                    message: message
                });
            },
            getPublish() {
                this.$api.publish.getPublish().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.publish = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            getType() {
                this.$api.type.getType().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.type = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
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
            postConvention(conventionAddForm) {
                this.$refs[conventionAddForm].validate((valid) => {
                    if (valid) {
                        let params = this.conventionAddForm;
                        this.$api.convention.postConvention(params).then(res => {
                            // console.log(res.data)
                            if(res.code === 1){
                                this.showMessage('success', res.message)
                                this.$router.push({ path: '/convention' })
                            }else if(res.code === -1){
                                this.showMessage('warning', res.message)
                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            },
            // 添加公布时间
            postPublish(publishAddForm) {
                this.$refs[publishAddForm].validate((valid) => {
                    if (valid) {
                        this.$msgbox.confirm('确定添加时间：'+ this.publishAddForm.publish_date + ' ? (确定后不可修改)', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let parames = this.publishAddForm;
                            this.$api.publish.postPublish(parames).then(res => {
                                //console.log(res)
                                if(res.code === 1){
                                    this.showMessage('success', res.message)
                                    this.dialogVisible = false
                                    this.getPublish()
                                }else if(res.code === -1){
                                    this.showMessage('warning', res.message)
                                }else{
                                    this.$message.error("未知错误")
                                }
                            })
                        }).catch(() => {});
                    }
                });
            },
            handleClose() {
                this.publishAddForm.publish_date = '2006(第一批)'
            }
        },

    }
</script>

<style lang="less" scoped>

.conventionAdd{
    width: 100%
}

.conventionAdd-page{
    padding: 10px;

    .conventionAdd-page-content{
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

        .conventionAdd-form{
            margin: 40px 28px 5px 28px;
            width: 60%;

            .button{
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: space-between;
                margin-top: 25px;
            }

            /deep/.el-form-item__label:before{
                opacity: 0;
            }
            /deep/.el-textarea__inner{
                min-height: 75px !important
            }
        }
    }
}

</style>