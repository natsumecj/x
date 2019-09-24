<template>
    <div>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <el-menu-item index="1" @click="goHome">
                    <i class="el-icon-location"></i>
                    <img src="../assets/点.png" alt="" class="img" v-show="isCollapse && bool1.new">
                    <span slot="title">首页</span>
                    <span class="news" v-show="bool1.new">New</span>
            </el-menu-item>
            <el-menu-item index="2" @click="gocalendar">
                <i class="el-icon-date"></i>
                <img src="../assets/点.png" alt="" class="img" v-show="isCollapse && bool2.new">
                <span slot="title">日程管理</span>
                <span class="news" v-show="bool2.new">New</span>
            </el-menu-item>
            <el-menu-item index="3" @click="goMail">
                <i class="el-icon-document"></i>
                <img src="../assets/点.png" alt="" class="img" v-show="isCollapse && bool3.new">
                <span slot="title">通讯录</span>
                <span class="news" v-show="bool3.new">New</span>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">
                <i class="el-icon-user"></i>
                    <img src="../assets/点.png" alt="" class="img" v-show="isCollapse && bool4.new">
                    <span slot="title">组织员工</span>
                    <span class="news" v-show="bool4.new">New</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="gooffer">offer管理</el-menu-item>
                    <el-menu-item index="1-2" @click="goPersonnel">人员信息</el-menu-item>
                    <el-menu-item index="1-3" @click="gopay">薪酬管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                <i class="el-icon-files"></i>
                    <img src="../assets/点.png" alt="" class="img" v-show="isCollapse && bool5.new">
                    <span slot="title">表单页</span>
                    <span class="news" v-show="bool5.new">New</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" @click="goform">分布表单</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Nav",
        data(){
            return{
                bool1:{},
                bool2:{},
                bool3:{},
                bool4:{},
                bool5:{},
            }
        },
        methods:{
            handleOpen(key,keyPath){
                if(key==='4'){
                    if(this.bool4.new===true){
                        this.$message(this.bool4.cpar)
                    }
                }
                if(key==='5'){
                    if(this.bool5.new===true){
                        this.$message(this.bool5.cpar)
                    }
                }
            },
            handleClose(key,keyPath){
                // console.log(key,keyPath);
            },
            goHome(){
                if(this.bool1.new===true){
                    this.$message(this.bool1.cpar)
                }
                this.$router.push('/')
            },
            goMail(){
                if(this.bool3.new===true){
                    this.$message(this.bool3.cpar)
                }
                this.$router.push("/maillist")
            },
            gocalendar(){
                if(this.bool2.new===true){
                    this.$message(this.bool2.cpar)
                }
                this.$router.push('/calendar')
            },
            goPersonnel(){
                this.$router.push('/personnel')
            },
            goform(){
                this.$router.push('/form')
            },
            gopay(){
                this.$router.push('/pay')
            },
            gooffer(){
                this.$router.push('/offer')
            }
        },
        mounted(){
          this.$axios.req('api/new')
              .then(res=>{
                  console.log(res);
                  this.bool1=res.data.data[0]
                  this.bool2=res.data.data[1]
                  this.bool3=res.data.data[2]
                  this.bool4=res.data.data[3]
                  this.bool5=res.data.data[4]
              })
              .catch(err=>{
                  console.log(err);
              })
        },
        computed:{
            isCollapse(){
              return this.$store.state.show
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-menu{
        height: 100%;
        border-top: 1px solid #ebebeb;
    }
    .news{
        color: red;
        float: right;
        margin:0px 18px;
        font-size: 12px;
    }
    .img{
        height: 26px;
        width: 26px;
    }
</style>