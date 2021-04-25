<template>
    <div class="convention">

        <div class="convention-list">
            <div class="title">
                <div class="top">
                    <span class="icon"></span>
                    收录数据
                </div>

                <el-button type="primary" icon="el-icon-folder-opened" :loading="excelLoading" @click="exportData">导出数据</el-button>
            </div>

            <div class="search-page">
                <div class="item">
                    <div>项目名称</div>
                    <el-input v-model="searchInfo.c_name" placeholder="请输入项目名称" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>保护单位</div>
                    <el-input v-model="searchInfo.c_company" placeholder="请输入保护单位" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>公布时间</div>
                    <el-select v-model="searchInfo.publish_id" placeholder="请选择公布时间" clearable @clear="searchData" @focus="getPublish">
                        <el-option v-for="publishInfo in publish" :key="publishInfo.publish_id"
                          :label="publishInfo.publish_date" :value="publishInfo.publish_id"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div>类别</div>
                    <el-select v-model="searchInfo.type_id" placeholder="请选择项目类别" clearable @clear="searchData" @focus="getType">
                        <el-option v-for="typeInfo in type" :key="typeInfo.type_id"
                          :label="typeInfo.type_name" :value="typeInfo.type_id"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div>所属地区</div>
                    <el-select v-model="searchInfo.province_id" placeholder="请选择地区" clearable @clear="searchData" @focus="getProvince">
                        <el-option v-for="provinceInfo in province" :key="provinceInfo.province_id"
                          :label="provinceInfo.province_name" :value="provinceInfo.province_id"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div style="opacity: 0">占位</div>
                    <el-button type="primary" icon="el-icon-search" @click="searchData" :loading="loading">搜索</el-button>
                </div>
            </div>

            <div class="table-page">
                <el-table class="table" :data="conventionInfo">
                    <el-table-column label="编号" type="index" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="项目名称" prop="c_name" min-width="15%" align="center" show-overflow-tooltip></el-table-column>

                    <el-table-column label="保护单位" prop="c_company" min-width="10%" align="center" show-overflow-tooltip>
                        <template slot-scope="scope" >
                            <p>{{scope.row.c_company || '-'}}</p>
                        </template>
                    </el-table-column>

                    <el-table-column label="介绍" prop="c_synopsis" min-width="20%" align="center" show-overflow-tooltip></el-table-column>

                    <el-table-column label="公布时间" prop="publish.publish_date" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="类别" prop="type.type_name" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="所属地区" prop="province.province_name" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="操作" prop="operate" min-width="15%" align="center">
                        <template slot-scope="scope">
                            <div class="operate-button">
                                <el-button size="small" type="primary" @click="getConventionInfo(scope.row.c_id)" ><i class="el-icon-edit"></i> 编辑</el-button>
                                <el-button size="small" type="danger" @click="openDeleteConvention(scope.row.c_id)" ><i class="el-icon-delete"></i> 删除</el-button>  
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchInfo.currentPage" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>

            <div class="edit-page">
                <el-dialog title="编辑信息" :visible.sync="dialogVisible" @close="handleClose">
                    <el-form :model="conventionEditForm" :rules="rules" ref="conventionEditForm" label-width="69px">
                        <el-form-item label="名 称" prop="c_name">
                            <el-input clearable type="text" v-model="conventionEditForm.c_name" ></el-input>
                        </el-form-item>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="公布时间" prop="publish_id">
                                    <el-select v-model="conventionEditForm.publish_id">
                                        <el-option v-for="conventionEditPublishInfo in publish" :key="conventionEditPublishInfo.publish_id"
                                          :label="conventionEditPublishInfo.publish_date" :value="conventionEditPublishInfo.publish_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="类 别" prop="type_id">
                                    <el-select v-model="conventionEditForm.type_id">
                                        <el-option v-for="conventionEditTypeInfo in type" :key="conventionEditTypeInfo.type_id"
                                          :label="conventionEditTypeInfo.type_name" :value="conventionEditTypeInfo.type_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="地 区" prop="province_id">
                                    <el-select v-model="conventionEditForm.province_id">
                                        <el-option v-for="conventionEditProvinceInfo in province" :key="conventionEditProvinceInfo.province_id"
                                          :label="conventionEditProvinceInfo.province_name" :value="conventionEditProvinceInfo.province_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="保护单位" prop="c_company">
                            <el-input clearable type="text" v-model="conventionEditForm.c_company" ></el-input>
                        </el-form-item>

                        <el-form-item label="简 介" prop="c_synopsis">
                            <el-input autosize type="textarea" v-model="conventionEditForm.c_synopsis" ></el-input>
                        </el-form-item>
                    </el-form>

                    <div slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="putConvention('conventionEditForm')">确 定</el-button>
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
                loading: true,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 5, //每页的数据
                    c_name: '',
                    c_company: '',
                    publish_id: '',
                    type_id: '',
                    province_id: ''
                },
                publish: [],
                type: [],
                province: [],
                conventionInfo: [],
                total: 0,
                dialogVisible: false,
                conventionEditForm: {},
                rules: {
                    c_name: [
                        { required: true, message: '请填写项目名称', trigger: 'change' }
                    ],
                    c_synopsis: [
                        { required: true, message: '请填写项目简介(至少包含"申报地区或单位")', trigger: 'change' }
                    ]
                },
                excelLoading: false,
            }
        },
        created () {
            this.postAllConvention();
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
                this.postAllConvention();
            },
            // 查
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
            postAllConvention() {
                let params = this.searchInfo;
                this.$api.convention.postAllConvention(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        this.conventionInfo = res.data.conventionList
                        this.total = res.data.total
                        // console.log(this.conventionInfo)
                        // console.log(res.data.total)
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            searchData() {
                this.searchInfo.currentPage = 1
                this.postAllConvention()
            },
            // 改
            getConventionInfo(value) {
                this.getPublish()
                this.getType()
                this.getProvince()
                this.dialogVisible = true
                this.$api.convention.getConventionInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.conventionEditForm = res.data
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            putConvention(conventionEditForm) {
                this.$refs[conventionEditForm].validate((valid) => {
                    if (valid) {
                        let param = this.conventionEditForm;
                        this.$api.convention.putConvention(param, this.conventionEditForm.c_id).then(res => {
                            //console.log(res)
                            if(res.code === 1){
                                this.dialogVisible = false
                                this.showMessage('success', res.message)
                                this.postAllConvention()
                            } else {
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            },
            handleClose() {
                this.conventionEditForm = {}
                this.conventionEditForm.c_name = ' '
                this.conventionEditForm.c_synopsis = ' '
            },
            // 删
            deleteConvention(val) {
                this.$api.convention.deleteConvention(val).then(res =>{
                    if(res.code === 1){
                        this.showMessage('success', res.message)
                        this.postAllConvention()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            openDeleteConvention(val) {
                this.$msgbox.confirm('此操作将删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteConvention.bind(this)(val);
                }).catch(() => {});
            },
            // 导出
            exportData(){
                this.excelLoading = true
                this.$api.convention.getAllConvention().then(res =>{
                    if(res.code === 1){
                        const { export_json_to_excel } = require('@/utils/Export2Excel');
                        const tHeader = ['序号', '项目名称', '保护单位', '项目介绍', '公布时间', '类别', '所属地区'];
                        const filterVal = ['c_id', 'c_name', 'c_company', 'c_synopsis', 'publish.publish_date', 'type.type_name', 'province.province_name'];
                        const list = res.data;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '收录数据');
                        this.excelLoading = false
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        },
    }
</script>

<style lang="less" scoped>

.convention{
    width: 100%
}

.convention-list{
    padding: 10px;

    .title {
        padding: 12px 10px 18px 0;
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        border-radius: 10px 10px 0 0;

        .top{
            display: flex;
            align-items: center;
            font-size: 22px;
            color: #3f4466;

            .icon {
                display: block;
                height: 24px;
                margin-right: 25px;
                border-left: 2px solid #304156;
            }
        }

        /deep/ .el-button--primary{
            height: 35px;
            font-size: 10px;
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

    .edit-page{
        /deep/.el-textarea__inner{
            min-height: 75px !important
        }
    }

    /deep/.el-form-item__label:before{
        opacity: 0;
    }
}

</style>