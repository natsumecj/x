const router = require('koa-router')()
const Users=require('../model/Users')
const jwt=require('jsonwebtoken')
const axios=require('axios')
const {tokenSecret,telId,apiKey,emailPass,clientId, clientSecret, scope}=require('../config')
const rp = require('request-promise')
const nodemailer = require('nodemailer')
const svgCaptcha = require('svg-captcha')
router.prefix('/users')
//注册
router.post('/register',async ctx=>{
let {username,password,code}=ctx.request.body
    //去数据库根据传过来的用户名查询当前用户名是否存在
    let newUser = new Users({
        username,
        password
    })
    let user = await Users.find({
        username
    })
    if (code !== ctx.session.sms) {
        ctx.body = {
            code: 500,
            msg: '验证码不正确,请重新输入'
        }
    } else {
        if (user.length > 0) {
            ctx.body = {
                code: 500,
                msg: '用户已存在'
            }
        } else {
            let res = await newUser.save()
            if (res) {
                ctx.body = {
                    code: 200,
                    msg: '注册成功'
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '注册失败'
                }
            }
        }
    }
})
// 删除用户
router.post('/deleteUser', async ctx => {
    let {id} = ctx.request.body
    let res = await Users.findByIdAndRemove(id)
    if (res) {
        ctx.body = {
            code: 200,
            msg: '删除成功',
            data: null
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '删除失败',
            data: null
        }
    }
})
//登录
router.post('/login',async ctx=>{ let {username, password, code} = ctx.request.body
    let user = await Users.find({
        username,
        password
    })

    let token = jwt.sign({
        username: username
    }, tokenSecret, {
        expiresIn: '1h'
    })
    if (code.toLowerCase() === (ctx.session.captcha).toLowerCase()) {
        if (user.length > 0) {
            ctx.session.user = user[0]
            ctx.body = {
                code: 200,
                data: ctx.session.user,
                token,
                msg: '登录成功'
            }
        } else {
            ctx.body = {
                code: 500,
                data: null,
                msg: '用户或密码不正确'
            }
        }
    } else {
        ctx.body = {
            code: 500,
            data: null,
            msg: '验证码不正确'
        }
    }
})
// 获取全部用户
router.get('/allUser', async ctx => {
    let users = await Users.find()
    if (users.length > 0) {
        ctx.body = {
            code: 200,
            msg: 'success',
            data: users
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '暂无用户',
            data: null
        }
    }
})
//退出登录
router.get('/logout',async ctx=>{
    ctx.session.user=null
    ctx.body={
        code:200,
        msg:'退出成功',
        data:null
    }
})
// 找回密码
router.post('/findPwd', async ctx => {
    let {
        username,
        email
    } = ctx.request.body
    let user = await Users.findOne({
        username: username
    })
    if (user) {
        let transporter = await nodemailer.createTransport({
            service: 'qq', // 邮箱类型
            secure: true,
            auth: {
                user: '1351414370@qq.com',
                pass: emailPass
            }
        })

        let mailOptions = {
            from: '你的小可爱 1351414370@qq.com', // 从哪个邮箱发送
            to: email,
            subject: '找回密码', // 标题
            text: `您用户名为${user.username}的密码是${user.password}`
            // cc: '抄送',
            // bcc: '私密发送'
        }

        // 发送邮件
        let info = await transporter.sendMail(mailOptions)
        if (!info) {
            ctx.body = {
                code: 500,
                msg: '发送失败'
            }
        } else {
            ctx.body = {
                code: 200,
                data: info,
                msg: `密码已成功发送在至您${email}的邮箱中`
            }
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '用户不存在'
        }
    }
})
//修改用户
router.post('/updateUser',async ctx=>{
    let{id,newPwd}=ctx.request.body
    let res=await Users.findByIdAndUpdate(id,{
        password:newPwd
    })
    if(res){
        ctx.body={
            code:200,
            msg:'修改成功',
            data:null
        }
    }else {
        ctx.body={
            code:500,
            msg:'修改失败',
            data:null
        }
    }
})
// 修改密码
router.post('/updatePwd', async ctx => {
    let {username, password, id, newPwd} = ctx.request.body
    let user = await Users.findOne({
        username,
        password
    })
    if (user) {
        if (password === newPwd) {
            ctx.body = {
                code: 500,
                msg: '新密码不能与原密码相同'
            }
        } else {
            let res = await Users.findByIdAndUpdate(id, {
                username,
                password: newPwd
            })
            if (res) {
                ctx.body = {
                    code: 200,
                    msg: '修改成功'
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: '修改失败'
                }
            }
        }
    } else {
        ctx.body = {
            code: 500,
            msg: '原密码不正确,请重新输入'
        }
    }
})
//发送短信验证码
router.post('/sendMsg',async ctx=>{
    let {phone}=ctx.request.body
    let code = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
    let options = {
        method: 'GET',
        url: 'http://apis.haoservice.com/sms/sendv2',
        qs:
            {
                mobile:phone,
                tpl_id:telId,
                content:`【小金刚在线】您的验证码为${code},如非本人操作，请忽略此条短信。该验证码五分钟之内有效，感谢你对我们的支持`,
                key:apiKey
            }
    }
    try {
        let res = rp(options)
        if (res) {
            ctx.session.sms = code
            ctx.body = {
                code: 200,
                msg: '短信发送成功',
                data: code
            }
        }
    } catch (e) {
        console.log(e)
    }
})
//图形验证码
router.get('/captcha',async ctx=>{
    const cap = svgCaptcha.create({
        size: 4, // 验证码长度
        width:160,
        height:60,
        fontSize: 50,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee' // 验证码图片背景颜色
    })
    ctx.session.captcha = cap.text
    ctx.response.type = 'image/svg+xml'
    ctx.body = cap.data
})
module.exports = router
