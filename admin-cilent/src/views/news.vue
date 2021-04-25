<template>
    <div class="news">

        <div class="news-list">
            <div class="title">
                <span class="icon"></span>
                资讯列表
            </div>

            <div class="search-page">
                <div class="item">
                    <div>文章来源</div>
                    <el-input v-model="searchInfo.n_source" placeholder="请输入文章来源" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>作者</div>
                    <el-input v-model="searchInfo.n_author" placeholder="请输入文章作者" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>文章标题</div>
                    <el-input v-model="searchInfo.n_title" placeholder="请输入文章标题" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>栏目</div>
                    <el-select v-model="searchInfo.sort_id" placeholder="请选择栏目" clearable @clear="searchData" @focus="getSort">
                        <el-option v-for="item in sort" :key="item.sort_id"
                          :label="item.sort_name" :value="item.sort_id"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div>排序</div>
                    <el-select v-model="searchInfo.reorder" placeholder="请选择排序方式" @change="searchData">
                        <el-option label="按收藏量排序" value="1"></el-option>
                        <el-option label="按阅读量排序" value="2"></el-option>
                        <el-option label="按时间排序" value="3"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div style="opacity: 0">占位</div>
                    <el-button type="primary" icon="el-icon-search" @click="searchData" :loading="loading">搜索</el-button>
                </div>
            </div>

            <div class="content-page" v-for="(item, index) in newsInfo" :key="index">
                <div class="content">
                    <div class="image" v-if="item.n_image" @click="newsInfoPage(item.n_id)">
                        <img :src="link+item.n_image" >
                    </div>

                    <div class="writing">
                        <div class="title" @click="newsInfoPage(item.n_id)">{{item.n_title}}</div>
                        <div class="icon">
                            <div><i class="el-icon-time"></i><span>{{item.n_date}}</span></div>
                            <div><i class="el-icon-star-on"></i><span>{{handleText(item.n_enshrine)}}</span></div>
                            <div><i class="el-icon-view"></i><span>{{handleText(item.n_view)}}</span></div>
                            <div><i class="el-icon-edit"></i><span @click="getNewsInfo(item.n_id)" style="cursor: pointer">编辑</span></div>
                            <div><i class="el-icon-delete-solid"></i><span @click="openDeleteNews(item.n_id)" style="cursor: pointer">删除</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="noData" v-if="noData">
                <div class="item">
                    <img src="../assets/noData.png" />
                    <div class="text">暂无数据</div>
                </div>
            </div>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchInfo.currentPage" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>

            <div class="edit-page">
                <el-dialog title="编辑文章" :visible.sync="dialogVisible" @close="handleClose">
                    <el-form :model="newsEditForm" :rules="rules" ref="newsEditForm" label-width="81px">
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="栏 目" prop="sort_id">
                                    <el-select v-model="newsEditForm.sort_id">
                                        <el-option v-for="item in sort" :key="item.sort_id"
                                          :label="item.sort_name" :value="item.sort_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="作 者" prop="n_author">
                                    <el-input clearable type="text" v-model="newsEditForm.n_author" ></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="文章来源" prop="n_source">
                                    <el-input clearable type="text" v-model="newsEditForm.n_source" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="标 题" prop="n_title">
                            <el-input clearable type="text" v-model="newsEditForm.n_title" ></el-input>
                        </el-form-item>

                        <el-form-item label="正 文" prop="n_article">
                            <tinymce v-if="dialogVisible" v-model="newsEditForm.n_article" :height="300" />
                        </el-form-item>
                    </el-form>

                    <div slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="next('newsEditForm')">下一步</el-button>
                    </div>
                </el-dialog>
            </div>

            <div class="imageEdit-page">
                <el-dialog title="编辑封面图片" center :visible.sync="dialogImageVisible" @close="dialogImageVisible = false">
                    <el-upload ref="upload" action="" :auto-upload="false" :show-file-list="false" accept="image/*" :on-change="changeImage">
                        <img v-if="imageUrl" :src="imageUrl">
                        <img v-else-if="newsEditForm.n_image" :src="link+newsEditForm.n_image">
                        <i v-else class="el-icon-plus"></i>
                    </el-upload>

                    <div slot="footer">
                        <el-button type="danger" :disabled="(imageUrl === '') && (newsEditForm.n_image === null)" @click="handleImage">删 除</el-button>
                        <el-button type="primary" @click="putNews">完 成</el-button>
                    </div>
                </el-dialog>
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
                link: this.$link.linkURL,
                loading: true,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 5, //每页的数据
                    n_source: '',
                    n_author: '',
                    n_title: '',
                    sort_id: '',
                    reorder: '3'
                },
                sort: [],
                newsInfo: [],
                total: 0,
                noData: false,
                dialogVisible: false,
                newsEditForm: {},
                rules: {
                    n_title: [
                        { required: true, message: '请填写文章标题', trigger: 'change' }
                    ]
                },
                dialogImageVisible: false,
                imageUrl: ''
            }
        },
        created () {
            this.postAllNews();
        },
        methods: {
            showMessage(type, message) {
                this.$message({
                    type: type,
                    message: message
                });
            },
            handleCurrentChange: function(currentPage) {
                this.searchInfo.currentPage = currentPage;   //点击第几页
                this.postAllNews();
            },
            handleText(val) {
                if (val >= 100000) {
                    return '10万+'
                } else {
                    return val
                }
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
            postAllNews() {
                let params = this.searchInfo;
                this.$api.news.postAllNews(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        this.newsInfo = res.data.newsList
                        this.total = res.data.total
                        if(res.data.total <=0){
                            this.noData = true
                        } else {
                            this.noData = false
                        }
                        // console.log(this.newsInfo)
                        // console.log(res.data.total)
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            searchData() {
                this.searchInfo.currentPage = 1
                this.postAllNews()
            },
            newsInfoPage(id){
                this.$router.push('/newsInfo/' + id)
            },
            // 删
            deleteNews(val) {
                this.$api.news.deleteNews(val).then(res =>{
                    if(res.code === 1){
                        this.showMessage('success', res.message)
                        this.postAllNews()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            openDeleteNews(val) {
                this.$msgbox.confirm('此操作将删除该文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteNews.bind(this)(val);
                }).catch(() => {});
            },
            // 编辑文章
            handleClose(){
                this.newsEditForm.n_title = ' '
            },
            getNewsInfo(value) {
                this.getSort()
                this.dialogVisible = true
                this.$api.news.getNewsInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.newsEditForm = res.data
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            // 下一步
            next(newsEditForm){
                this.$refs[newsEditForm].validate((valid) => {
                    if (valid) {
                        this.dialogImageVisible = true
                    } else {
                        this.$message("请填写文章标题")
                    }
                })            
            },
            changeImage(file){
                this.imageUrl =  URL.createObjectURL(file.raw);
            },
            handleImage(){
                this.imageUrl = '',
                this.newsEditForm.n_image = null
                this.$refs.upload.clearFiles()
            },
            putNews() {
                let formData = new FormData();  //用formData传递数据
                const imageFiles = this.$refs.upload.uploadFiles
                const file = imageFiles[imageFiles.length-1]  //上传图片

                formData.append('n_source', this.newsEditForm.n_source);
                formData.append('n_author', this.newsEditForm.n_author);
                formData.append('n_title', this.newsEditForm.n_title);
                formData.append('n_article', this.newsEditForm.n_article);
                formData.append('sort_id', this.newsEditForm.sort_id);
                if(file !== undefined){
                    formData.append('n_image', file.raw);
                } else {
                    formData.append('n_image', this.newsEditForm.n_image);
                }

                this.$api.news.putNews(formData, this.newsEditForm.n_id).then(res => {
                    // console.log(res.data)
                    if(res.code === 1){
                        this.dialogImageVisible = false
                        this.dialogVisible = false
                        this.showMessage('success', res.message)
                        this.postAllNews()
                    } else {
                        this.$message.error("未知错误")
                    }
                })
            },
        },
    }
</script>

<style lang="less" scoped>

.news{
    width: 100%;
}

.news-list{
    padding: 10px;
    
    .title {
        padding: 12px 0 18px 0;
        font-size: 22px;
        color: #3f4466;
        display: flex;
        align-items: center;
        background: #ffffff;
        border-radius: 10px 10px 0 0;

        .icon {
            display: block;
            height: 24px;
            margin-right: 25px;
            border-left: 2px solid #304156;
        }
    }

    .search-page{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        background: #ffffff;
        padding: 14px;
        border-bottom: 1px solid #E4E4EB;

        .item{
            margin-right: 12px;

            &:last-child{
                margin-right: 0px;
            }

            div{
                font-size: 13px;
                color: #717781;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }
        }

        /deep/ .el-input__inner{
            height: 35px;
            width: 185px;
            font-size: 8px;
            padding-left: 8px;
        }
        /deep/ .el-select__caret{
            line-height: 35px
        }
        /deep/ .el-button--primary{
            height: 35px;
            font-size: 10px;
        }
    }

    .content-page{
        margin-top: 18px;
        padding: 40px;
        background: #ffffff;

        .content{
            display: flex;
            flex-direction: row;

            .image{
                width: 25%;
                margin-right: 50px;
                flex-shrink: 0;
                cursor: pointer;

                img{
                    width: 100%;
                    height: 100%;
                }
            }

            .writing{
                width: 72%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .title{
                    font-size: 16px;
                    cursor: pointer;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .icon{
                    display: flex;
                    flex-direction: row;

                    div{
                        margin-right: 25px;

                        &:last-child{
                            margin-right: 0px;
                        }

                        span{
                            margin-left: 10px;
                            font-size: 15px;
                            color: #777676; 
                        }
                    }
                }
            }
        }
    }

    .noData{
        padding: 100px 0;  
        background: #ffffff;
        border-radius: 0 0 10px 10px;
        
        .item{
            display: flex;
            flex-direction: column;
            align-items: center;

            .img{
                width: 100%;
                height: 100%;
            }

            .text{
                margin-top: 20px;
                font-size: 15px;
                color: #9a9db1;
            }
        }
    }

    .pagination{
        padding-top: 10px;

        /deep/.btn-prev, /deep/.btn-next{
            background-color: transparent;
        }
        /deep/.el-pager{
            /deep/ li {
                background-color: transparent;
                // color: #717781;
            }
        }
    }

    .edit-page{
        /deep/.el-form-item__label:before{
            opacity: 0;
        }
    }

    .imageEdit-page{
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

</style>