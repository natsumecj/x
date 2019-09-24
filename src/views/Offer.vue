<template>
    <div>
        <div class="top">
            <div style="display: flex;align-items: center">
                <div class="img">
                    <img src="../assets/Folder.png" alt="">
                </div>
                <div>
                    offer管理
                </div>
            </div>
            <div>
                <el-button type="primary" size="mini">新建offer</el-button>
                <el-button type="primary" size="mini">转移状态</el-button>
                <el-button type="primary" size="mini">导出</el-button>
            </div>
        </div>
        <el-card class="box-card">
            <div class="clearfix">
                <el-button type="primary" size="mini" v-for="(item,index) in head" round>{{item.title}}offer({{item.num.length}})</el-button>
                <el-table
                        ref="multipleTable"
                        :data="tableData.slice(pageSize*(currentPage-1),currentPage*pageSize)"
                        tooltip-effect="dark"
                        :row-style="{height: height1}"
                        :cell-style="{padding: '0px'}"
                        style="width: 100%;margin-top: 10px;position: relative"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="50"
                    align="center">
                    </el-table-column>
                    <el-table-column
                            :prop="item.type"
                            :label="item.label"
                            show-overflow-tooltip
                            align="center"
                    v-for="(item,index) in array2" :key="item.id">
                    </el-table-column>
                    <el-table-column width="35" align="center">
                        <template slot="header">
                            <el-popover
                                    placement="bottom"
                                    width="200"
                                    trigger="click"
                                    v-model="visible"
                            >
                                <i class="el-icon-setting" style="color: #00b7ff;font-size: 14px" slot="reference"></i>
                                <div class="popover1">
                                    <div class="field">
                                        <div v-popover:popover>添加显示字段</div>
                                        <div v-popover:popover2>删除显示字段</div>
                                    </div>
                                    <hr>
                                    <div>选择间距类型</div>
                                    <div class="type">
                                        <div v-for="(item,index) in type" :class="{types:typeId===index}" @click="change(index)">{{item}}</div>
                                    </div>
                                </div>
                            </el-popover>
                            <el-popover
                                    ref="popover"
                                    placement="left"
                                    width="100"
                                    v-model="visible2">
                                <el-table
                                        ref="multipleTable"
                                        :data="array3"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        :show-header="false"
                                        :row-style="{ height: '20px' }"
                                        :cell-style="{ padding: '0px' }"
                                        @selection-change="handleSelectionChange2"
                                >
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column prop="label" width="80">
                                    </el-table-column>
                                </el-table>
                                <div style="text-align: right; margin: 6px 0px">
                                    <el-button type="primary" size="mini" @click="confirm">确定</el-button>
                                </div>
                            </el-popover>
                            <el-popover
                                    ref="popover2"
                                    placement="left"
                                    width="100"
                                    v-model="visible3">
                                <el-table
                                        :data="array2"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        :show-header="false"
                                        :row-style="{ height: '20px' }"
                                        :cell-style="{ padding: '0px' }"
                                        @selection-change="handleSelectionChange3"
                                >
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column prop="label" width="80">
                                    </el-table-column>
                                </el-table>
                                <div style="text-align: right; margin: 6px 0px">
                                    <el-button type="primary" size="mini" @click="confirm2">确定</el-button>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,20,30,40]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.length">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Offer",
        data(){
            return{
                height1: '60px',
                head:[
                    {title:'待发',num:[]},
                    {title:'已发',num:[]},
                    {title:'已接受',num:[]},
                    {title:'已拒绝',num:[]},
                    {title:'已入职',num:[]},
                ],
                tableData:[],
                currentPage:1,
                pageSize:10,
                visible:false,
                visible2:false,
                visible3:false,
                array:[
                    {
                        type: "name",
                        label: "姓名"
                    },
                    {
                        type: "email",
                        label: "个人邮箱"
                    },
                    {
                        type: "IDType",
                        label: "证件类型"
                    },
                    {
                        type: "IDnumber",
                        label: "证件号码"
                    },
                    {
                        type: "nation",
                        label: "民族"
                    },
                    {
                        type: "phone",
                        label: "电话"
                    },
                    {
                        type: "tel",
                        label: "座机电话"
                    },
                    {
                        type: "sex",
                        label: "性别"
                    },
                    {
                        type: "qq",
                        label: "QQ"
                    },
                    {
                        type: "department",
                        label: "部门"
                    },
                    {
                        type: "position",
                        label: "职位"
                    },
                    {
                        type: "approval",
                        label: "offer状态"
                    },
                    {
                        type: "birthday",
                        label: "出生日期"
                    },
                    {
                        type: "native",
                        label: "籍贯"
                    },
                    {
                        type: "marital",
                        label: "婚姻状态"
                    },
                    {
                        type: "age",
                        label: "年龄"
                    },
                    {
                        type: "education",
                        label: "学历"
                    },
                    {
                        type: "entry",
                        label: "入职时间"
                    },
                    {
                        type: "workingPlace",
                        label: "工作地点"
                    }
                ],
                array2:[],
                array3:[],
                type:['紧凑','适中','宽松'],
                typeId:1,
                checked1:[],
                checked2:[],
            }
        },
        methods:{
            handleSelectionChange(){

            },
            handleSizeChange(val){
                this.pageSize=val
            },
            handleCurrentChange(val){
                this.currentPage=val
            },
            handleSelectionChange2(val){
                this.checked1=val
            },
            change(index){
                this.typeId=index
                if(index===0){
                    this.height1 = '30px'
                }
                if(index===1){
                    this.height1 = '60px'
                }
                if(index===2){
                    this.height1 = '100px'
                }
            },
            confirm(){
                this.array2=this.array2.concat(this.checked1)
                this.checked1.map(item=>{
                    this.array3=this.array3.filter(items=>{
                        return JSON.stringify(items) !==JSON.stringify(item)
                    })
                })
                this.checked1=[]
                this.visible2=false
            },
            handleSelectionChange3(val){
                this.checked2=val
            },
            confirm2(){
                this.checked2.map(item=>{
                    this.array2=this.array2.filter(items=>{
                        return JSON.stringify(items) !==JSON.stringify(item)
                    })
                })
                this.checked2=[]
                this.visible3=false
            }
        },
        mounted() {
            this.array2=this.array.slice(0,9)
            this.array3=this.array.slice(9,this.array.length)
            this.$axios.req('api/offer')
                .then(res=>{
                    this.tableData=res.data.data
                    console.log(this.tableData);
                    this.head.map(item=>{
                        item.num=res.data.data.filter(items=>{
                            return items.approval===item.title
                        })
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
</script>

<style scoped>
    .top{
        width: 100%;
        margin-top: 20px;
        display: flex;
        align-items: center;
        font-size: 14px;
        justify-content: space-between;
        font-weight: bold;
    }
    .img{
        width: 20px;
        height: 20px;
        background-color: #6fac6d;
        text-align: center;
        line-height: 25px;
        margin-right: 4px;
    }
    .img>img{
        width: 16px;
        height: 16px;
    }
    .box-card{
        margin-top: 10px;
    }
    .field{
        display: flex;
        justify-content: space-between;
        align-items: center
    }
    .field>div{
        color: #00b7ff;
        font-size: 12px;
    }
    hr{
        color: #b6b6b6;
    }
    .type{
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 4px;
    }
    .types{
        color: #00b7ff;
    }
    .popover1{
        font-size: 12px;
    }
</style>