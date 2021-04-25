<template>
    <div class="newsAdd">

        <div class="newsAdd-page">
            <div class="newsAdd-page-content">
                <div class="title">
                    <span class="icon"></span>
                    添加资讯
                </div>

                <div class="newsAdd-form">
                    <el-form :model="newsAddForm" :rules="rules" ref="newsAddForm" label-width="79px">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="栏 目" prop="sort_id">
                                    <el-select clearable v-model="newsAddForm.sort_id" @focus="getSort">
                                        <el-option v-for="item in sort" :key="item.sort_id"
                                          :label="item.sort_name" :value="item.sort_id"></el-option>
                                        <div style="padding: 10px 20px; font-size: 14px; font-weight: bold; color: #606266; cursor: pointer" @click="dialogVisible = true">添加栏目</div>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="文章来源" prop="n_source">
                                    <el-input clearable type="text" v-model="newsAddForm.n_source" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="作 者" prop="n_author">
                                    <el-input clearable type="text" v-model="newsAddForm.n_author" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="标 题" prop="n_title">
                            <el-input clearable type="text" v-model="newsAddForm.n_title" ></el-input>
                        </el-form-item>

                        <el-form-item label="正 文" prop="n_article">
                            <tinymce v-model="newsAddForm.n_article" :height="400" />
                        </el-form-item>

                        <div class="button">
                            <el-button type="primary" :disabled="(newsAddForm.n_title === '') || (newsAddForm.sort_id === '')" @click="dialogImageVisible = true" >下一步</el-button>
                        </div>
                    </el-form>
                </div>

                <div class="sortAdd-page">
                    <el-dialog title="添加栏目名称" :visible.sync="dialogVisible" @close="handleClose">
                        <el-form :model="sortAddForm" :rules="rules" ref="sortAddForm" label-width="55px">
                            <el-form-item label="名 称" prop="sort_name">
                                <el-input clearable type="text" v-model="sortAddForm.sort_name" placeholder="格式示例：新闻" ></el-input>
                            </el-form-item>
                        </el-form>

                        <div slot="footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="postSort('sortAddForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>

                <div class="imageAdd-page">
                    <el-dialog title="添加封面图片" center :visible.sync="dialogImageVisible" @close="dialogImageVisible = false">
                        <el-upload ref="upload" action="" :auto-upload="false" :show-file-list="false" accept="image/*" :on-change="changeImage">
                            <img v-if="imageUrl" :src="imageUrl">
                            <i v-else class="el-icon-plus"></i>
                        </el-upload>

                        <div slot="footer">
                            <el-button type="danger" @click="handleImage">删 除</el-button>
                            <el-button type="primary" @click="postNews('newsAddForm')">完 成</el-button>
                        </div>
                    </el-dialog>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

    export default {
        components: { Tinymce },
        data() {
            return {
                sort: [],
                dialogVisible: false,
                sortAddForm: {
                    sort_name: '新闻'
                },
                newsAddForm: {
                    sort_id: '',
                    n_source: '',
                    n_author: '',
                    n_title: '',
                    n_article: ''
                },
                dialogImageVisible: false,
                imageUrl: '',
                rules: {
                    sort_id: [
                        { required: true, message: '请选择文章栏目', trigger: 'change' }
                    ],
                    n_title: [
                        { required: true, message: '请填写文章标题', trigger: 'blur' }
                    ],
                    sort_name: [
                        { required: true, message: '请按格式填写栏目名称', trigger: 'change' }
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
            getSort() {
                this.$api.sort.getSort().then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.sort = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            // 添加栏目名称
            postSort(sortAddForm) {
                this.$refs[sortAddForm].validate((valid) => {
                    if (valid) {
                        this.$msgbox.confirm('确定添加栏目名称：'+ this.sortAddForm.sort_name + ' ? (确定后不可修改)', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let parames = this.sortAddForm;
                            this.$api.sort.postSort(parames).then(res => {
                                //console.log(res)
                                if(res.code === 1){
                                    this.showMessage('success', res.message)
                                    this.dialogVisible = false
                                    this.getSort()
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
                this.sortAddForm.sort_name = '新闻'
            },
            // 封面图片处理
            changeImage(file) {
                this.imageUrl =  URL.createObjectURL(file.raw);
            },
            handleImage() {
                this.imageUrl = '',
                this.$refs.upload.clearFiles()
            },
            // 添加文章
            postNews(newsAddForm){
                this.$refs[newsAddForm].validate((valid) => {
                    if (valid) {
                        let formData = new FormData();  //用formData传递数据
                        const imageFiles = this.$refs.upload.uploadFiles
                        const file = imageFiles[imageFiles.length-1]  //上传封面图片

                        formData.append('sort_id', this.newsAddForm.sort_id);
                        formData.append('n_source', this.newsAddForm.n_source);
                        formData.append('n_author', this.newsAddForm.n_author);
                        formData.append('n_title', this.newsAddForm.n_title);
                        formData.append('n_article', this.newsAddForm.n_article);
                        if(file !== undefined){
                            formData.append('n_image', file.raw);
                        }else{
                            formData.append('n_image', null);
                        }

                        this.$api.news.postNews(formData).then(res => {
                            // console.log(res)
                            if(res.code === 1){
                                this.showMessage('success', res.message)
                                this.$router.push({ path: '/news' })
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

.newsAdd{
    width: 100%;
}

.newsAdd-page{
    padding: 10px;

    .newsAdd-page-content{
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

        .newsAdd-form{
            margin: 40px 28px 5px 28px;

            .button{
                margin-top: 25px;
                display: flex;
                justify-content: flex-end;
            }

            /deep/.el-form-item__label:before{
                opacity: 0;
            }   
        }

        .imageAdd-page{
            /deep/.el-dialog__body{
                text-align: center;
            }

            /deep/.el-upload {
                width: 30%;
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                overflow: hidden;

                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }

                /deep/.el-icon-plus{
                    font-size: 20px;
                    color: #8c939d;
                    line-height: 122px;
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