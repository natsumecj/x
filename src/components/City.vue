<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>利润(万)</span>
            </div>
            <div>
                <ve-wordcloud :data="chartData" :settings="chartSettings" height="240px" width="100%"></ve-wordcloud>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "City",
        data(){
            this.chartSettings = {
                shape: 'diamond',
                sizeMin: 10,
                sizeMax: 14
            }
            return{
                chartData: {
                    columns: ['city', 'count'],
                    rows:[],
                }
            }
        },
        methods:{

        },
        mounted() {
            this.$axios.req('api/city')
                .then(res=>{
                    // console.log(res);
                    this.chartData.rows=res.data.data
                    // console.log(this.chartData.rows);
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
</script>

<style scoped lang="scss">
    .clearfix{
        font-size: 14px;
    }
    .box-card{
        /*height: 340px;*/
        width: 100%;
    }
</style>