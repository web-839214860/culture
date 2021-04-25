<template>
    <div class="user">

        <div class="userList">
            <div class="title">
                <div class="top">
                    <span class="icon"></span>
                    用户管理
                </div>

                <el-button type="primary" icon="el-icon-folder-opened" :loading="excelLoading" @click="exportData">导出数据</el-button>
            </div>

            <div class="search-page">
                <div class="item">
                    <div>账号</div>
                    <el-input v-model="searchInfo.u_userId" placeholder="请输入账号" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>昵称</div>
                    <el-input v-model="searchInfo.u_name" placeholder="请输入昵称" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>性别</div>
                    <el-select v-model="searchInfo.u_sex" placeholder="请选择性别" clearable @clear="searchData" >
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div>注册日期</div>
                    <el-date-picker type="date" v-model="searchInfo.u_date" placeholder="请选择日期" clearable @change="handleDateChange" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div class="item">
                    <div>星星数</div>
                    <el-input v-model="searchInfo.u_star" placeholder="请输入星星数" clearable @clear="searchData" ></el-input>
                </div>
                <div class="item">
                    <div>地区</div>
                    <el-select v-model="searchInfo.province_id" @change="handleProvinceChange" placeholder="请选择地区" clearable @clear="searchData" >
                        <el-option v-for="provinceInfo in province" :key="provinceInfo.province_id"
                          :label="provinceInfo.province_name" :value="provinceInfo.province_id"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div style="opacity: 0">城市</div>
                    <el-select v-model="searchInfo.city_id" placeholder="请选择城市" clearable @clear="searchData">
                        <el-option v-for="cityInfo in city" :key="cityInfo.city_id"
                          :label="cityInfo.city_name" :value="cityInfo.city_id"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div>身份</div>
                    <el-select v-model="searchInfo.role" placeholder="请选择身份" clearable @clear="searchData" >
                        <el-option label="高级管理员" value="1"></el-option>
                        <el-option label="管理员" value="2"></el-option>
                        <el-option label="普通用户" value="3"></el-option>
                    </el-select>
                </div>
                <div class="item">
                    <div style="opacity: 0">占位</div>
                    <el-button type="primary" icon="el-icon-search" @click="searchData" :loading="loading">搜索</el-button>
                </div>
            </div>

            <div class="table-page">
                <el-table class="table" :data="userInfo">
                    <el-table-column label="编号" type="index" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="用户昵称" prop="u_name" min-width="10%" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-popover trigger="click" placement="top-start" >
                                <p>用户头像： <img :src="link+scope.row.u_image" style="width: 50px; height: 50px"></p>
                                <p>个性签名： {{scope.row.u_sign || '-'}}</p>
                                <span slot="reference" style="cursor: pointer">{{scope.row.u_name || '-'}}</span>
                            </el-popover>
                        </template>
                    </el-table-column>

                    <el-table-column label="登录账号" prop="u_userId" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="性别" prop="u_sex" min-width="10%" align="center">
                        <template slot-scope="scope" >
                            <div>{{scope.row.u_sex || '-'}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="注册时间" prop="u_date" min-width="10%" align="center"></el-table-column>

                    <el-table-column label="地区" prop="province_id, city_id" min-width="15%" align="center" show-overflow-tooltip>
                        <template slot-scope="scope" >
                            <div v-if="scope.row.province_id === null">{{'-'}}</div>
                            <div v-else-if="scope.row.city_id === null">{{scope.row.province.province_name}}</div>
                            <div v-else-if="scope.row.province_id <= 4 || scope.row.province_id >= 33">{{scope.row.province.province_name}}</div>
                            <div v-else>{{scope.row.province.province_name}} - {{scope.row.city.city_name}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="身份" prop="role" min-width="10%" align="center">
                        <template slot-scope="scope">
                            <p v-if="scope.row.role=='1'">高级管理员</p>
                            <p v-if="scope.row.role=='2'">管理员</p>
                            <p v-if="scope.row.role=='3'">普通用户</p>
                        </template>
                    </el-table-column>

                    <el-table-column label="星星数" prop="u_star" min-width="10%" align="center" :formatter="handleText" ></el-table-column>

                    <el-table-column label="操作" prop="operate" min-width="15%" align="center">
                        <template slot-scope="scope">
                            <div class="operate-button">
                                <el-button size="small" type="primary" @click="getUserInfo(scope.row.u_userId, scope.row.province_id)" ><i class="el-icon-edit"></i> 编辑</el-button>
                                <el-button size="small" type="danger" @click="openDeleteUser(scope.row.u_userId)" ><i class="el-icon-delete"></i> 删除</el-button>  
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="searchInfo.currentPage" :page-size="searchInfo.pageSize" layout="total, prev, pager, next" :total="total"></el-pagination>
            </div>

            <div class="edit-page">
                <el-dialog :title="`用户账号：${userEditForm.u_userId}`" :visible.sync="dialogVisible" @close="handleClose">
                    <el-form :model="userEditForm" :rules="rules" ref="userEditForm" label-width="55px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="昵 称" prop="u_name">
                                    <el-input clearable type="text" v-model="userEditForm.u_name" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="性 别" prop="u_sex">
                                    <el-select clearable v-model="userEditForm.u_sex">
                                        <el-option label="男" value="男"></el-option>
                                        <el-option label="女" value="女"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="身 份" prop="role">
                                    <el-select v-model="userEditForm.role">
                                        <el-option label="高级管理员" :value="1"></el-option>
                                        <el-option label="管理员" :value="2"></el-option>
                                        <el-option label="普通用户" :value="3"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="星 数" prop="u_star">
                                    <el-input clearable type="text" v-model.number="userEditForm.u_star" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="地 区" prop="province_id">
                                    <el-select clearable v-model="userEditForm.province_id"  @change="handleUserEditProvinceChange" >
                                        <el-option v-for="userEditProvinceInfo in province" :key="userEditProvinceInfo.province_id"
                                          :label="userEditProvinceInfo.province_name" :value="userEditProvinceInfo.province_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="" prop="city_id">
                                    <el-select clearable v-model="userEditForm.city_id" >
                                        <el-option v-for="userEditCityInfo in userEditCity" :key="userEditCityInfo.city_id"
                                          :label="userEditCityInfo.city_name" :value="userEditCityInfo.city_id"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="标 签" prop="u_sign">
                            <el-input clearable type="text" v-model="userEditForm.u_sign" ></el-input>
                        </el-form-item>

                        <el-form-item label="头 像" class="avatar">
                            <el-upload ref="upload" action="" :auto-upload="false" :show-file-list="false" :on-change="handleChange">
                                <img v-if="imageUrl" :src="imageUrl">
                                <div v-else>
                                    <img v-if="userEditForm.u_image" :src="link+userEditForm.u_image">
                                </div>
                            </el-upload>
                        </el-form-item>
                    </el-form>

                    <div slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="putUser('userEditForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        data() {
            const validateAcquaintance = (rule, value, callback) => {
                if (value < 0) {
                    callback(new Error('数值必须大于或等于0'))
                } else {
                    callback()
                }
            }
            return {
                link: this.$link.linkURL,
                loading: true,
                searchInfo: {
                    currentPage: 1,  //初始页
                    pageSize: 5, //每页的数据
                    u_userId: '',
                    u_name: '',
                    u_sex: '',
                    u_date: '',
                    u_star: '',
                    province_id: '',
                    city_id: '',
                    role: ''
                },
                userInfo: [],
                total: 0,
                province: [],
                city: [],
                dialogVisible: false,
                userEditForm: {},
                imageUrl: '',
                userEditCity: [],
                rules: {  
                    u_star: [
                        { required: true, message: '请填写用户星星数', trigger: 'change' },
                        { type: "number", message: '只允许数字格式', trigger: 'change' },
                        { validator: validateAcquaintance, trigger: 'change' }
                    ]
                },
                excelLoading: false,
            }
        },
        created () {
            this.postAllUser();
            this.getProvince();
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
                this.postAllUser();
            },
            handleText(row, column) {
                let val = row[column.property]
                if (val >= 1000) {
                    val = val / 1000
                    return val + 'k'
                } else {
                    return val
                }
            },
            // 查
            postAllUser() {
                let params = this.searchInfo;
                this.$api.user.postAllUser(params).then(res =>{
                    if(res.code === 1){
                        this.loading = false
                        this.userInfo = res.data.userList
                        this.total = res.data.total
                        // console.log(this.userInfo)
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
            handleProvinceChange(value) {
                // console.log(value)
                this.searchInfo.city_id = ''
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
            handleDateChange(value) {
                // console.log(value)
                if(value === '' || value === null || value === undefined){
                    this.searchData()
                }
            },
            searchData() {
                this.searchInfo.currentPage = 1
                this.postAllUser()
            },
            // 改
            getUserInfo(value, provinceId) {
                this.dialogVisible = true
                this.imageUrl = ''
                this.getUserEditCity(provinceId)
                this.$api.user.getUserInfo(value).then(res =>{
                    // console.log(res.data)
                    if(res.code === 1){
                        this.userEditForm = res.data
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            getUserEditCity(value) {
                this.$api.city.getCity(value).then(res =>{
                    if(res.code === 1){
                        this.userEditCity = res.data;
                        // console.log(this.userEditCity)
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            handleUserEditProvinceChange(value) {
                // console.log(value)
                this.userEditForm.city_id = ''
                this.userEditCity = []
                if(value !== ''){
                    this.$api.city.getCity(value).then(res =>{
                        if(res.code === 1){
                            this.userEditCity = res.data;
                            // console.log(this.userEditCity)
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
                // console.log(this.imageUrl)
            },
            putUser(userEditForm) {
                this.$refs[userEditForm].validate((valid) => {
                    if (valid) {

                        let formData = new FormData();  //用formData传递数据
                        const imageFiles = this.$refs.upload.uploadFiles
                        const file = imageFiles[imageFiles.length-1]  //上传图片

                        formData.append('u_name', this.userEditForm.u_name);
                        formData.append('u_sex', this.userEditForm.u_sex);
                        formData.append('role', this.userEditForm.role);
                        formData.append('u_star', this.userEditForm.u_star);
                        formData.append('province_id', this.userEditForm.province_id);
                        formData.append('city_id', this.userEditForm.city_id);
                        formData.append('u_sign', this.userEditForm.u_sign);
                        if(file !== undefined){
                            formData.append('u_image', file.raw);
                        } else {
                            formData.append('u_image', this.userEditForm.u_image);
                        }

                        this.$api.user.putUser(formData, this.userEditForm.u_userId).then(res => {
                            // console.log(res.data)
                            if(res.code === 1){
                                this.dialogVisible = false
                                this.showMessage('success', res.message)
                                this.postAllUser()
                            } else {
                                this.$message.error("未知错误")
                            }
                        })
                    }
                });
            },
            handleClose() {
                this.$refs.upload.uploadFiles = []
            },
            // 删
            deleteUser(val) {
                this.$api.user.deleteUser(val).then(res =>{
                    if(res.code === 1){
                        this.showMessage('success', res.message)
                        this.postAllUser()
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            openDeleteUser(val) {
                this.$msgbox.confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$options.methods.deleteUser.bind(this)(val);
                }).catch(() => {});
            },
            // 导出
            exportData(){
                this.excelLoading = true
                this.$api.user.getAllUser().then(res =>{
                    if(res.code === 1){
                        const { export_json_to_excel } = require('@/utils/Export2Excel');
                        const tHeader = ['序号', '用户账号', '用户名', '性别', '个性签名', '注册日期', '星星数', '用户角色', '地区', '城市'];
                        const filterVal = ['u_id', 'u_userId', 'u_name', 'u_sex', 'u_sign', 'u_date', 'u_star', 'role', 'province.province_name', 'city.city_name'];
                        let arr = res.data;
                        arr = arr.map((item) => {
                            if(item.role === 1){
                                item.role = "高级管理员"
                            } else if(item.role === 2){
                                item.role = "管理员"
                            } else {
                                item.role = "普通用户"
                            }
                            return item
                        })
                        const list = arr;
                        const data = this.formatJson(filterVal, list);
                        export_json_to_excel(tHeader, data, '用户列表');
                        this.excelLoading = false
                    }else{
                        this.$message.error("未知错误")
                    }
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
        }

    }
</script>

<style lang="less" scoped>

.user{
    width: 100%;
}

.userList{
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
            width: 115px;
            font-size: 8px;
            padding-left: 8px;
        }
        /deep/ .el-select__caret{
            line-height: 35px;
        }
        /deep/ .el-date-editor{
            width: 115px;

            /deep/.el-icon-date:before {
                opacity: 0;
            }
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
        .avatar{
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
        }

        /deep/.el-upload:hover {
            border-color: #409EFF;
        }
    }

    /deep/.el-form-item__label:before{
        opacity: 0;
    }
}

</style>