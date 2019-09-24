import Mock from "mockjs";
Mock.mock('api/new','get',{
  code:200,
  msg:'请求成功',
  'data|5':[
    {
      new:'@boolean',
      cpar:'@cparagraph(1, 3)'
    }
  ]
})
Mock.mock("api/num", "get", {
  code: 200,
  msg: "请求成功",
  "list|3": [
    {
      num: "@natural(50000, 100000)"
    }
  ]
});
Mock.mock("api/city", "get", {
  code: 200,
  msg: "请求成功",
  "data|30": [
    {
      city: "@city",
      color: "@color",
      count: "@natural(1,100)"
    }
  ]
});
Mock.mock("api/name", "get", {
  code: 200,
  msg: "请求成功",
  "data|20": [
    {
      name: "@cname"
    }
  ]
});
Mock.mock("api/table", "get", {
  code: 200,
  msg: "请求成功",
  "data|30": [
    {
      name: "@cword(2,4)",
      describe: "@cword(2,5)",
      createDate: "@date",
      deadline: "@date",
      "theme|1": ["已发布", "未发布", "已截止"],
      "website|1": ["百度", "豆瓣", "掘金", "Github"]
    }
  ]
});
Mock.mock("api/mail", "get", {
  code: 200,
  msg: "请求成功",
  "data|200": [
    {
      id: "@increment(1)",
      name: "@cname(2,4)",
      img: "@dataImage(60x60,@name)",
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
      "sex|1": ["男", "女"],
      qq: /^[1-9][0-9]{4,10}$/,
      "position|1": ["经理", "主管", "员工", "实习生"],
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ],
      "tag|0-3": [{ tag: "@cword(2,4)", color: "@color" }]
    }
  ]
});
Mock.mock("api/offer", "get", {
  code: 200,
  msg: "请求成功",
  "data|200": [
    {
      id: "@increment(1)",
      name: "@cname(2,4)",
      phone: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      email: /[1-9]\d{7,10}@(qq|163|gmail)\.com/,
      tel: /\d{3}-\d{8}|\d{4}-\d{7}/,
      "sex|1": ["男", "女"],
      qq: /^[1-9][0-9]{4,10}$/,
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ],
      "position|1": ["经理", "主管", "员工", "实习生"],
      native: "@city(true)",
      "marital|1": ["已婚", "未婚"],
      IDType: "@cword(2,4)",
      IDnumber: /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/,
      birthday: "@date",
      "approval|1": ["待发", "已发", "已接受", "已拒绝", "已入职"],
      age: "@natural(18,60)",
      "education|1": [
        "初中",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士",
        "博士以上"
      ],
      entry: "@date",
      nation: "@cword(2,5)",
      workingPlace: "@city"
    }
  ]
});
Mock.mock("api/personnel", "get", {
  code: 200,
  msg: "请求成功",
  "data|200": [
    {
      name: "@cname(2,4)",
      id: "@natural(1000,9999)",
      mechanism: "区域中心",
      "department|1": [
        "成都分公司",
        "北京分公司",
        "上海分公司",
        "哈尔滨公司",
        "微易",
        "郑州公司",
        "测试部门",
        "财务部",
        "地州区",
        "盒马项目组",
        "成都区",
        "贵州区",
        "电商部",
        "综合管理部",
        "全民营销项目组",
        "单团部",
        "新销售业务部",
        "欧洲组",
        "中东非组",
        "票务组",
        "外联部",
        "西南总经理办公室",
        "市场营销部",
        "单团计调部",
        "票务部",
        "南亚计调部",
        "欧洲散拼计调部",
        "签证部",
        "东南亚事业部",
        "产品组",
        "途牛组",
        "携程组",
        "其他电商组",
        "资料组",
        "运营支持组",
        "京津组",
        "河北组",
        "太原公司",
        "内蒙古组"
      ],
      startProbation: "@date",
      endProbation: "@date",
      "position|1": ["经理", "主管", "员工", "实习生"],
      "approval|1": ["审批通过", "审批未通过", "审批中"]
    }
  ]
});
Mock.mock("api/pay", "get", {
  code: 200,
  msg: "请求成功",
  "data|3": [
    {
      constitute: "@cword(2,5)",
      plan: "@natural(0,1000000)",
      actual: "@natural(0,1000000)",
      lastplan: "@natural(0,1000000)",
      lastactual: "@natural(0,1000000)",
      show: true,
      show2: true,
      show1: true
    }
  ]
});
