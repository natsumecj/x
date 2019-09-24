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
                    <el-form-item label="请输入密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="请输入电话" prop="phone">
                        <el-input v-model="ruleForm.phone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="请输入邮箱" prop="mail">
                        <el-input v-model="ruleForm.mail" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="请输入验证码" prop="code">
                        <el-input v-model="ruleForm.code" clearable></el-input>
                        <el-button type="success" class="btn" @click="send" :loading="ruleForm.load">发送验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="btn2" @click="login">立即登录</el-button>
                        <el-button type="primary" @click="register" :loading="ruleForm.loadreg">立即注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
            return{
                ruleForm: {
                    username: '',//用户名
                    password: '',//密码
                    phone: '',//手机号
                    mail: '',//邮箱
                    code: '',//验证码
                    load:false,//发送短信的按钮加载条件
                    loadreg:false,//注册按钮的加载条件
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ],
                    mail: [
                        {type:'email', message: '请输入正确的邮箱地址', trigger: ['blur','change']},
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    code:[
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            send(){
                this.ruleForm.load=true
                let code=/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
                if(this.ruleForm.phone.match(code)){
                    this.$axios.req('api/users/sendMsg',{
                        phone:this.ruleForm.phone
                    })
                        .then(res=>{
                            console.log(res);
                            this.$message({
                                type:'success',
                                message:res.data.msg
                            })
                            this.ruleForm.load=false
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                }else {
                    this.$message({
                        message: '你的手机号不正确，请重新输入',
                        type: 'warning'
                    })
                    this.ruleForm.phone=''
                    this.ruleForm.load=false
                }
            },
            login(){
              this.$router.push('./login')
            },
            register(){
                this.ruleForm.loadreg=true
                let email=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                let phone=/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
                if(this.ruleForm.username!==''&&this.ruleForm.password!==''&&this.ruleForm.phone.match(phone)&&this.ruleForm.mail.match(email)){
                    this.$axios.req('api/users/register',{
                        username:this.ruleForm.username,
                        password:this.ruleForm.password,
                        code:this.ruleForm.code
                    })
                        .then(res=>{
                            console.log(res);
                            if(res.data.code===200){
                                this.$message({
                                    type:'success',
                                    message:res.data.msg
                                })
                                this.ruleForm.loadreg=false
                                this.$router.push('./Login')
                            }
                            if(res.data.code===500){
                                this.$message({
                                    type:'error',
                                    message:res.data.msg
                                })
                                this.ruleForm.loadreg=false
                                this.ruleForm.code=""
                            }
                        })
                        .catch(err=>{
                            console.log(err);
                        })
                }else {
                    this.$message({
                        type:'error',
                        message:'手机号或邮箱错误'
                    })
                    this.ruleForm.loadreg=false
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
        width: 600px;
        margin: auto;
        margin-top: 100px;
    }
    .el-input{
        width: 300px;
    }
    .btn{
        margin-left: 10px;
    }
    .btn2{
        margin-right: 100px;
    }
</style>