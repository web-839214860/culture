<template>
    <div class="discuss">

        <div class="discussList">
            <div class="title">
                <span class="icon"></span>
                评论管理
            </div>

            <div class="trend-info">
                <div class="item">
                    <div class="avatar" v-if="trendInfo.user">
                        <img :src="link+trendInfo.user.u_image">
                    </div>

                    <div class="info">
                        <div class="userInfo" v-if="trendInfo.user">{{trendInfo.user.u_name}}</div>
                        <div class="content" v-if="trendInfo.t_content">{{trendInfo.t_content}}</div>
                        <div class="media">
                            <div v-if="trendInfo.t_media">
                                <div v-if="trendInfo.t_type === 1">
                                    <img :src="link+trendInfo.t_media">
                                </div>
                                <div v-else-if="trendInfo.t_type === 2">
                                    <video :src="link+trendInfo.t_media" controls="controls"></video>
                                </div>
                                <div v-else></div>
                            </div>   
                        </div>
                        <div class="bottom">
                            <div class="time">{{trendInfo.t_date}}</div>
                            <div @click="dialogVisible = true"><i class="el-icon-chat-dot-square"></i></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="search-page">
                <div class="item">
                    <div>发布账号</div>
                    <el-input v-model="searchInfo.u_userId" placeholder="请输入账号" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div style="opacity: 0">占位</div>
                    <el-button type="primary" icon="el-icon-search" @click="searchData" :loading="loading">搜索</el-button>
                </div>
            </div>

            <div class="table-page">
                <el-table class="table" :data="discussInfo">
                    <el-table-column label="编号" type="index" min-width="20%" align="center"></el-table-column>

                    <el-table-column label="评论内容" prop="d_content" min-width="25%" align="center" show-overflow-tooltip></el-table-column>
                    
                    <el-table-column label="发布时间" prop="d_date" min-width="20%" align="center" show-overflow-tooltip></el-table-column>

                    <el-table-column label="用户账号" min-width="15%" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top-start">
                                <p>头像： <img :src="link+scope.row.user.u_image" style="width: 50px; height: 50px"></p>
                                <p>昵称： {{scope.row.user.u_name || '-'}}</p>
                                <span slot="reference" style="cursor: pointer">{{scope.row.u_userId}}</span>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" prop="operate" min-width="20%" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="danger" @click="openDeleteDiscuss(scope.row.d_id)" ><i class="el-icon-delete"></i> 删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchInfo.currentPage" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>

            <div class="discuss-add-page">
                <el-dialog title="发布评论" :visible.sync="dialogVisible" @close="handleClose">
                    <el-form :model="discussAddForm" :rules="rules" ref="discussAddForm" label-width="55px">
                        <el-form-item label="内 容" prop="d_content">
                            <el-input type="textarea" :rows="2" v-model="discussAddForm.d_content" ></el-input>
                        </el-form-item>
                    </el-form>

                    <div slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="postDiscuss('discussAddForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                link: this.$link.linkURL,
                loading: true,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 5, //每页的数据
                    t_id: this.$route.params.id,
                    u_userId: '',
                },
                trendInfo: {},
                discussInfo: [],
                total: 0,
                dialogVisible: false,
                discussAddForm: {
                    d_content: '',
                    t_id: this.$route.params.id,
                    u_userId: this.$store.state.user.u_userId
                },
                rules: {  
                    d_content: [
                        { required: true, message: '请输入评论内容', trigger: 'blur' }
                    ]
                }  
            }
        },
        created () {
            this.getTrendInfo()
            this.postAllDiscuss() 
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
                this.postAllDiscuss();
            },
            // 查
            getTrendInfo() {
                let param = this.searchInfo.t_id
                this.$api.trend.getTrendInfo(param).then(res =>{
                    if(res.code === 1){
                        // console.log(res.data)
                        this.trendInfo = res.data;
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            postAllDiscuss() {
                let params = this.searchInfo;
                this.$api.discuss.postAllDiscuss(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        this.discussInfo = res.data.discussList
                        this.total = res.data.total
                        // console.log(this.discussInfo)
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            searchData() {
                this.searchInfo.currentPage = 1
                this.postAllDiscuss()
            },
            // 删
            deleteDiscuss(val) {
                this.$api.discuss.deleteDiscuss(val).then(res =>{
                    if(res.code === 1){
                        this.showMessage('success', res.message)
                        this.postAllDiscuss()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            openDeleteDiscuss(val) {
                this.$msgbox.confirm('此操作将删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteDiscuss.bind(this)(val);
                }).catch(() => {});
            },
            // 增
            postDiscuss(discussAddForm) {
                this.$refs[discussAddForm].validate((valid) => {
                    if (valid) {
                        let parames = this.discussAddForm;
                        this.$api.discuss.postDiscuss(parames).then(res => {
                            //console.log(res)
                            if(res.code === 1){
                                this.showMessage('success', res.message)
                                this.dialogVisible = false
                                this.postAllDiscuss()
                            }else{
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            },
            handleClose() {
                this.discussAddForm.d_content = ''
            }
        },
        
    }
</script>

<style lang="less" scoped>

.discuss{
    width: 100%;
}

.discussList{
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

    .trend-info{
        background: #ffffff;
        padding: 14px;
        border-bottom: 1px solid #E4E4EB;

        .item{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;

            .avatar{
                display: flex;
                margin-right: 10px;

                img{
                    width: 45px; 
                    height: 45px;
                    border-radius: 5px;
                }
            }

            .info{
                width: 25%;
                display: flex;
                flex-direction: column;

                .userInfo{
                    font-size: 13px;
                    color: #282872;
                    font-weight: bold;
                    letter-spacing: 1px;
                    margin-bottom: 8px  
                }

                .content{
                    font-size: 15px;
                    margin-bottom: 12px;
                }

                .media{
                    margin-bottom: 8px; 

                    img{
                        width: 100%;
                        height: 100%
                    }

                    video{
                        width: 99%;
                        height: 99%;
                    }
                }

                .bottom{
                    display: flex;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    justify-content: space-between;
                    align-items: baseline;

                    .time{
                        font-size: 12px;
                        color: #a8a8a8;
                    }
                }
            }
        }
    }

    .search-page{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
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
            width: 160px;
            font-size: 8px;
            padding-left: 8px;
        }
        /deep/ .el-button--primary{
            height: 35px;
            font-size: 10px;
        }
    }

    .table{
        width: 100%;
        padding-top: 18px;
        border-radius: 0 0 10px 10px;

        /deep/.cell{
            white-space: nowrap;
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

    .discuss-add-page{
        /deep/.el-form-item__label{
            line-height: 54px;
        }
    }
}

</style>