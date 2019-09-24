<template>
    <div>
        <div class="top">
            <div class="img">
                <img src="../assets/tips.png" alt="">
            </div>
            <div>
                薪酬管理
            </div>
        </div>
        <el-row class="title">
            <el-col :span="6">
                {{val}} 薪酬预算
            </el-col>
            <el-col :span="5" :offset="13">
                <el-date-picker
                        v-model="value"
                        type="month"
                        placeholder="请选择月份"
                        size="small"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
        </el-row>
        <el-row class="tips">
            <el-col>
                如果有更多渠道请自行添加，所以添加的渠道会显示在CRM系统中
            </el-col>
        </el-row>
        <el-card class="box-card">
            <div>
                <el-row style="font-size: 20px; font-weight: bold;margin: 10px 4px">
                    <el-col>
                        薪资结构
                    </el-col>
                </el-row>
                <el-row>
                    <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                        <el-table-column
                                align="center"
                                label="薪资构成"
                                width="120">
                            <template slot-scope="scope">
                                <div v-show="scope.row.show1===true">
                                    {{scope.row.constitute}}
                                </div>
                                <el-input v-show="scope.row.show1===false" v-model="scope.row.constitute" @blur="name(scope)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="计划支出(元)"
                                width="120">
                            <template slot-scope="scope">
                                <div @click="int(scope)" v-show="scope.row.show===true">{{ scope.row.plan}}</div>
                                <el-input v-model.number="scope.row.plan" placeholder="请输入金额" v-show="scope.row.show===false" @blur="shows(scope)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="实际支出(元)"
                                width="120">
                            <template slot-scope="scope">
                                <div @click="ints(scope)" v-show="scope.row.show2===true">{{ scope.row.actual}}</div>
                                <el-input v-model.number="scope.row.actual" placeholder="请输入金额" v-show="scope.row.show2===false" @blur="showes(scope)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                width="465">
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="上月计划(元)"
                                width="120">
                            <template slot-scope="scope"><div style="color: #dcdcdc;">{{ scope.row.lastplan }}</div></template>
                        </el-table-column>
                        <el-table-column
                                align="center"
                                label="上月实际(元)"
                                width="120">
                            <template slot-scope="scope"><div style="color: #dcdcdc;">{{ scope.row.lastactual }}</div></template>
                        </el-table-column>
                    </el-table>
                </el-row>
                <el-button type="primary" size="mini" style="margin: 10px" @click="add">添加更多</el-button>
                <el-button size="mini" style="margin: 10px" @click="cancel" v-show="can===false">取消</el-button>
                <el-row class="btm">
                    <el-col :span="2">
                        总计
                    </el-col>
                    <el-col :span="3">
                        {{allplan}}
                    </el-col>
                    <el-col :span="3">
                        {{allactual}}
                    </el-col>
                    <el-col :span="3" :offset="10">
                        {{alllastplan}}
                    </el-col>
                    <el-col :span="3">
                        {{alllastactual}}
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Pay",
        data(){
            return{
                value:new Date(),
                pickerOptions:{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '本月',
                    onClick(picker) {
                        picker.$emit('pick', Date.now());
                    }
                }, {
                    text: '上月',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', date);
                    }
                }]
            },
                tableData:[],
                allplan:0,
                allactual:0,
                alllastplan:0,
                alllastactual:0,
                can:true,
            }
        },
        methods:{
            int(scope){
                scope.row.show=false
            },
            shows(scope){
                this.can=true
                this.allplan=0
                scope.row.show=true
                this.tableData.map(item=>{
                    this.allplan+=item.plan
                })
            },
            ints(scope){
                scope.row.show2=false
            },
            showes(scope){
                this.can=true
                this.allactual=0
                scope.row.show2=true
                console.log(scope);
                this.tableData.map(item=>{
                    this.allactual+=item.actual
                })
            },
            add(){
                this.can=false
                this.tableData.push({show:false,show2:false,show1:false,lastplan:0,lastactual:0,plan:0,actual:0})
            },
            name(scope){
                if(scope.row.constitute){
                    this.can=true
                    scope.row.show1=true
                }else {
                    this.$message({
                        type:'warning',
                        message:'薪资构成不能为空'
                    })
                }
            },
            cancel(){
                this.can=true
                this.tableData.splice(this.tableData.length-1,1)
            }
        },
        mounted(){
          this.$axios.req('api/pay')
              .then(res=>{
                  res.data.data.map(item=>{
                      this.allplan+=item.plan
                      this.allactual+=item.actual
                      this.alllastplan+=item.lastplan
                      this.alllastactual+=item.lastactual
                  })
                  this.tableData=res.data.data
                  console.log(this.tableData);
              })
              .catch(err=>{
                  console.log(err);
              })
        },
        computed:{
            val(){
                return this.$moment(this.value).format('YYYY年MM月')
            }
        }
    }
</script>

<style scoped>
    .top{
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
    }
    .img{
        width: 22px;
        height: 22px;
        background-color: #b6b6b6;
        text-align: center;
        margin-right: 4px;
        line-height: 30px;
    }
    .img>img{
        width: 18px;
        height: 18px;
    }
    .title{
        margin-top: 6px;
        background-color: white;
        padding: 14px;
        font-weight: bold;
        font-size: 24px;
    }
    .tips{
        background-color: #d0f1b5;
        font-size: 12px;
        padding: 10px;
    }
    .btm{
        text-align: center;
        color: #5bb1fd;
    }
</style>