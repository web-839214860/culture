<template>
    <div class="trend">

        <div class="trendList">
            <div class="title">
                <span class="icon"></span>
                动态管理
            </div>

            <div class="search-page">
                <div class="item">
                    <div>发布账号</div>
                    <el-input v-model="searchInfo.u_userId" placeholder="请输入账号" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>媒体分类</div>
                    <el-select v-model="searchInfo.t_type" placeholder="请选择分类" clearable @clear="searchData" >
                        <el-option label="图片" value="1"></el-option>
                        <el-option label="视频" value="2"></el-option>
                        <el-option label="其它" value="3"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div>获赞数</div>
                    <el-input v-model="searchInfo.t_like" placeholder="请输入获赞数" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div style="opacity: 0">占位</div>
                    <el-button type="primary" icon="el-icon-search" @click="searchData" :loading="loading">搜索</el-button>
                </div>
            </div>

            <div class="table-page">
                <el-table class="table" :data="trendInfo">
                    <el-table-column label="编号" type="index" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="动态内容" prop="t_content" min-width="20%" align="center" show-overflow-tooltip>
                        <template slot-scope="scope" >
                            <div>{{scope.row.t_content || '-'}}</div>
                        </template>
                    </el-table-column>
                    
                    <el-table-column label="发布时间" prop="t_date" min-width="10%" align="center" show-overflow-tooltip></el-table-column>

                    <el-table-column label="媒体" prop="t_media, t_type" min-width="20%" align="center">
                        <template slot-scope="scope">
                            <p v-if="scope.row.t_media === null"> - </p>
                            <p v-if="scope.row.t_media !== null" class="media-column">
                                <a :href="link+scope.row.t_media" target="_blank">
                                    <div v-if="scope.row.t_type === 1">
                                        <img :src="link+scope.row.t_media">
                                    </div>
                                    <div v-else-if="scope.row.t_type === 2">
                                        <video :src="link+scope.row.t_media" controls="controls"></video>
                                    </div>
                                    <div v-else class="type-else">其它</div>
                                </a>
                            </p>   
                        </template>
                    </el-table-column>

                    <el-table-column label="发布人账号" min-width="10%" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top-start">
                                <p>头像： <img :src="link+scope.row.user.u_image" style="width: 50px; height: 50px"></p>
                                <p>昵称： {{scope.row.user.u_name || '-'}}</p>
                                <span slot="reference" style="cursor: pointer">{{scope.row.u_userId}}</span>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column label="获赞数" prop="t_like" min-width="10%" align="center" :formatter="handleText"></el-table-column>

                    <el-table-column label="操作" prop="operate" min-width="20%" align="center">
                        <template slot-scope="scope">
                            <div class="operate-button">
                                <el-button size="small" type="primary" @click="discussPage(scope.row.t_id)" ><i class="el-icon-chat-line-round"></i> 评论( {{scope.row.discusses.length}} 条)</el-button>
                                <el-button size="small" type="danger" @click="openDeleteTrend(scope.row.t_id)" ><i class="el-icon-delete"></i> 删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchInfo.currentPage" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
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
                    u_userId: '',
                    t_type: '',
                    t_like: ''
                },
                trendInfo: [],
                total: 0
            }
        },
        created () {
            this.postAllTrend();
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
                this.postAllTrend();
            },
            handleText(row, column) {
                let val = row[column.property]
                if (val >= 10000) {
                    return '1万+'
                } else {
                    return val
                }
            },
            //查
            postAllTrend() {
                let params = this.searchInfo;
                this.$api.trend.postAllTrend(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        this.trendInfo = res.data.trendList
                        this.total = res.data.total
                        // console.log(this.trendInfo)
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            searchData() {
                this.searchInfo.currentPage = 1
                this.postAllTrend()
            },
            // 删
            deleteTrend(val) {
                this.$api.trend.deleteTrend(val).then(res =>{
                    if(res.code === 1){
                        this.showMessage('success', res.message)
                        this.postAllTrend()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            openDeleteTrend(val) {
                this.$msgbox.confirm('此操作将删除该动态, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteTrend.bind(this)(val);
                }).catch(() => {});
            },
            //评论页面
            discussPage(val){
                this.$router.push('/discuss/' + val)
            }
        },
        
    }
</script>

<style lang="less" scoped>

.trend{
    width: 100%;
}

.trendList{
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
            width: 160px;
            font-size: 8px;
            padding-left: 8px;
        }
        /deep/ .el-select__caret{
            line-height: 35px;
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

        .operate-button{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-end;
        }

        .media-column{
            a{
                text-decoration:none
            }

            img{
                width: 80%;
                height: 80%
            }

            video{
                width: 100%;
                height: 100%
            }

            .type-else{
                color: #606266;
                text-decoration: underline
            }
        }

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
}

</style>