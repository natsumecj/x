const mongoose=require("mongoose")
const Schema=mongoose.Schema

const UserSchema=new Schema({
    //用户名
    username:{
      type:String,
      required:true
    },
    //密码
    password:{
      type:String,
      required:true
    },
    //注册时间
    createDate:{
        type:Date,
        default:Date.now
    },
    //手机号码
    // phone:{
    //     type:String,
    //     required:true
    // },
    //邮箱
    // email:{
    //     type:String,
    //     required:true
    // }
})
module.exports=mongoose.model('users',UserSchema)