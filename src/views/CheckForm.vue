<template>
    <div>
        <section ref="print">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    账单详情
                </div>
                <div>
                    <div style="padding: 4px">付款账户：{{account }}</div>
                    <div style="padding: 4px">收款账户:{{collect }}</div>
                    <div style="padding: 4px">收款人姓名：{{name }}</div>
                    <div style="padding: 4px">收款金额：{{money }}元</div>
                </div>
                <div class="no-print">
                    <el-button type="primary" size="mini" @click="home">返回首页</el-button>
                    <el-button type="success" size="mini" @click="printing">打印</el-button>
                </div>
            </el-card>
        </section>
    </div>
</template>

<script>
    export default {
        name: "CheckForm",
        data(){
            return{
                account:'',
                collect:'',
                name:'',
                money:''
            }
        },
        methods:{
              home(){
                  this.$store.state.check=false,
                  this.$router.push('/')
              },
                printing(){
                    this.$print(this.$refs.print)
                }
        },
        mounted() {
             this.account=this.$route.params.account
             this.collect=this.$route.params.collect
             this.name=this.$route.params.name
             this.money=this.$route.params.money
        }
    }
</script>

<style scoped>
    .box-card{
        width: 500px;
        margin: 100px auto;
    }
    .no-print{
        margin-top: 10px;
        text-align: center;
    }
</style>