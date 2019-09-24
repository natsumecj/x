<template>
    <div>
        <div class="bg">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    欢迎来到小金刚后台管理系统
                </div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" label-position="left" class="demo-ruleForm">
                    <el-form-item label="请输入用户名" prop="username">
                        <el-input v-model="ruleForm.username" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="请输入邮箱" prop="mail">
                        <el-input v-model="ruleForm.mail" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="btn2" @click="login">立即登录</el-button>
                        <el-button type="primary" :loading="ruleForm.load" @click="find">找回密码</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Forget",
        data(){
            return{
                ruleForm: {
                    username: '',//用户名
                    mail: '',//邮箱
                    load:false,//找回密码的按钮加载条件
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    mail: [
                        {type:'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']},
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            login(){
                this.$router.push('./login')
            },
            find(){
                let email=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                this.ruleForm.load=true
                if(this.ruleForm.mail.match(email)){
                    this.$axios.req('api/users/findPwd',{
                        username:this.ruleForm.username,
                        email:this.ruleForm.mail
                    })
                        .then(res=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.$message({
                                    type:'success',
                                    message:res.data.msg
                                })
                            }
                            if(res.data.code===500){
                                this.$message({
                                    type:'error',
                                    message:res.data.msg
                                })
                            }
                            this.ruleForm.load=false
                        }).catch(err=>{
                        console.log(err);
                    })
                }else {
                    this.$message({
                        type:'error',
                        message:'邮箱错误'
                    })
                    this.ruleForm.load=false
                    this.ruleForm.mail=''
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg{
        background-image: url("../assets/8718367adab44aed29d58cb7b21c8701a08bfbcd.jpg");
        width: 100%;
        height: 100%;
        /*background-size:100%;*/
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .clearfix{
        text-align: center;
    }
    .box-card{
        width: 460px;
        margin: auto;
        margin-top: 200px;
    }
    .btn2{
        margin-right: 60px;
    }
</style>