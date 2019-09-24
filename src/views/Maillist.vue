<template>
  <div>
    <el-row style="margin-top: 20px" :gutter="20">
      <el-col :span="5">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-col>
        <el-col :span="19">
            <el-row :gutter="10">
                <el-col :span="8" v-for="(item,index) in mail.slice(pagesize*(currentPage4-1),currentPage4*pagesize)" :key="item.id" class="box">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix" >
                            <div>
                                <img :src="item.img" alt="" class="img">
                            </div>
                            <div>
                                <div class="name">
                                    {{item.name}}
                                </div>
                                <div>
                                    {{item.department }} / {{ item.position}}
                                </div>
                                <div class="tags" v-if="item.tag.length>0">
                                    <div v-for="(items,index) in item.tag" :style="{backgroundColor:items.color}">
                                        {{items.tag}}
                                    </div>
                                </div>
                                <div v-if="item.tag.length===0">
                                    快来给Ta添加第一个标签吧
                                </div>
                            </div>
                        </div>
                        <div class="body">
                            <div>
                                邮箱：{{item.email}}
                            </div>
                            <div>
                                办公电话：{{item.tel}}
                            </div>
                            <div>
                                手机号码：{{item.phone}}
                            </div>
                            <div>
                                性别：{{item.sex}}
                            </div>
                            <div>
                                QQ：{{item.qq}}
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="pageSizes"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="mail.length">
            </el-pagination>
        </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "Maillist",
  data() {
    return {
      data: [
        {
          label: "区域中心",
          children: [
            { label: "哈尔滨公司" },
            { label: "微易旅游", children: [{ label: "微易" }] },
            { label: "测试部门" },
            { label: "北方区域中心",
                children: [
                { label: "东南亚事业部" },
                    { label: "B2B事业部",
                        children:[
                            {label:'电商部',
                                children:[
                                    {label:'产品组'},
                                    {label:'途牛组'},
                                    {label:'携程组'},
                                    {label:'其他电商组'},
                                    {label:'资料组'},
                                    {label:'运营支持组'},
                                    ]}] },
                    { label: "华北销售部",
                        children:[
                            {label:'京津组'},
                            {label:'济南公司'},
                            {label:'石家庄公司'},
                            {label:'河北组'},
                            ] },
                    { label: "中原销售部",
                        children:[
                            {label:'太原公司'},
                            {label:'内蒙古组'},
                            {label:'郑州公司'},
                            ] },
                    { label: "单团部" },
                    { label: "新销售业务部"},
                    { label: "产品操作部",
                        children:[
                            {label:'欧洲组'},
                            {label:'中东非组'},
                            {label:'票务组'},
                            {label:'单团组'},
                            ]},
                    { label: "签证部",children:[{label:'外联部'}]},]},
            { label: "西南区域中心",
                children: [
                    { label: "西南总经理办公室"},
                    { label: "成都公司",
                        children:[
                            {label:'市场营销部'},
                            {label:'单团计调部'},
                            {label:'票务部'},
                            {label:'南亚计调部'},
                            {label:'欧洲散拼计调部'},
                            {label:'签证部'},
                            {label:'财务部'},
                            {label:'重庆办事处'},
                            {label:'电商部'},
                            {label:'综合管理部'},
                            {label:'销售部',
                                children:[
                                    {label:'地州区'},
                                    {label:'成都区'},
                                    {label:'贵州区'},
                                    ]},
                            ]},
                ]},
          ]
        }
      ],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        mail:[],
        currentPage4:1,
        pageSizes:[21, 42, 63, 84],
        pagesize:21,
        list:[]
    }
  },
    methods:{
        handleNodeClick(data){
            console.log(data);
            this.mail = this.list
            if(!data.children){
                this.mail=this.mail.filter(item=>{
                    return data.label===item.department
                })
            }
        },
        handleSizeChange(val){
            // console.log(val);
            this.pagesize=val
        },
        handleCurrentChange(val){
            this.currentPage4=val
            // console.log(val);
        }
    },
    mounted() {
      this.$axios.req('api/mail')
          .then(res=>{
              this.mail=res.data.data
              this.list =res.data.data
              console.log(this.mail);
          })
          .catch(err=>{
              console.log(err);
          })
    }
};
</script>

<style scoped>
    .clearfix{
        display: flex;
        align-items: center;
        font-size: 12px;
    }
    .name{
        font-size: 16px;
        font-weight: bold;
    }
    .tags{
        display: flex;
        align-items: center;
    }
    .tags>div{
        padding: 1px 5px;
        border-radius: 50px;
        color: #ffffff;
        margin-right: 4px;
    }
    .img{
        border-radius: 100%;
        margin-right: 10px;
    }
    .body{
        font-size: 12px;
    }
    .box{
        margin-bottom: 10px;
    }
</style>
<style>
    .el-card__header{
        padding: 10px;
    }
</style>
