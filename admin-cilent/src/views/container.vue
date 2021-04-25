<template>
    <div class="nav">

        <el-container class="layout">
            <el-aside width="16%">
                <el-menu :default-active="$route.path" :router="true" class="menu" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
                    <h3 class="name">后 台 管 理 系 统</h3>

                    <el-menu-item index="/">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title">数据总览</span>
                    </el-menu-item>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-reading"></i>
                            <span>非遗管理</span>
                        </template>
                        <el-menu-item index="/convention">收录数据</el-menu-item>
                        <el-menu-item index="/conventionAdd">添加数据</el-menu-item>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>资讯管理</span>
                        </template>
                        <el-menu-item index="/news">资讯列表</el-menu-item>
                        <el-menu-item index="/newsAdd">添加资讯</el-menu-item>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-bangzhu"></i>
                            <span>动态管理</span>
                        </template>
                        <el-menu-item index="/trend">动态列表</el-menu-item>
                        <el-menu-item index="/trendAdd">发布动态</el-menu-item>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-user"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="/user">用户列表</el-menu-item>
                        <el-menu-item index="/userAdd">添加用户</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container class="right">
                <el-header class="info" v-if="show">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <div class="top">
                                <img :src="link+u_image" >
                                <p><span>{{u_name}}</span> 欢迎您！<i class="el-icon-arrow-down el-icon--right"></i></p>
                            </div>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="passWord()" >修改密码</el-dropdown-item>
                            <el-dropdown-item divided @click.native="LogOut()" >退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>

                <el-main class="content"><router-view /></el-main>

                <el-footer height="35px" v-if="show">ICP 证粤 B2-2-100257 Copyright © 非遗百科管理后台</el-footer>
            </el-container>
        </el-container>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapState } = createNamespacedHelpers('user')

    export default {
        data(){
            return{
                link: this.$link.linkURL,
                show: false
            }
        },
        created () {
            this.changeRoute();
        },
        methods: {
            passWord(){
                this.$router.push({ path:'/passWord' })
            },
            ...mapActions(
                ['LogOut']  // 语法糖 相当于this.$store.dispatch('LogOut')这个方法
            ),
            changeRoute() {
                // console.log(this.$route.path)
                if(this.$route.path === '/'){
                    this.show = false
                } else {
                    this.show = true
                }
            }
        },
        computed:{
            ...mapState({
                u_name: state=>state.u_name,
                u_image: state=>state.u_image
            })
        },
        watch: {
            '$route':'changeRoute'
        }
    }

</script>

<style lang="less" scoped>

.nav{
    height: 100%;
}

.layout{
    height: 100%;

    .menu{
        height: 100%;
        background-color: #304156;

        .name{
            text-align: center;
            color: #fff;
        }
    }

    .right{
        display: flex;
        flex-direction: column;

        .info{
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .el-dropdown-link{
                cursor: pointer;
                color: rgb(75, 75, 75);

                .top{
                    display: flex;
                    align-items: center;
                    flex-direction: row;
                    flex-wrap: nowrap;
                    padding: 0 2px;

                    img{
                        width: 40px;
                        height: 40px;
                        border-radius: 50px 50px 50px 50px;
                    }

                    p{
                        display: flex;
                        flex-direction: row;
                        align-items: baseline;

                        span{
                            font-weight: bold;
                            margin: 0 5px 0 8px
                        }
                    }
                }
            }
        }

        .content{
            padding: 0;
        }
    }
}


/deep/ .el-main {
    background-color: #f0f2f5;
}

/deep/ .el-footer {
    font-size: 12px;
    color: #333;
    display:flex;
    align-items:center;
    align-self:center;
}

/deep/ .el-icon-arrow-down{
    font-size: 12px;
}

</style>