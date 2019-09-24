<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>网站问卷调查</span>
            </div>
            <div>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                >
                    <el-table-column
                            align="center"
                            prop="name"
                            label="问卷名称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="describe"
                            label="问卷描述"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="createDate"
                            label="创建时间"
                            sortable
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="deadline"
                            label="截止时间"
                            sortable
                            width="150">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="theme"
                            label="问卷主题"
                            width="150">
                        <template slot-scope="scope">
                            <el-tag
                                    type="primary"
                                    disable-transitions>{{scope.row.theme}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="website"
                            label="网站名称"
                            width="150"
                            >
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.type"
                                    disable-transitions>{{scope.row.website}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="150">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="check(scope.$index, scope.row)">查看网站详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <el-dialog title="复制地址" :visible.sync="dialogFormVisible" @opened="showQrcode">
            <el-form :model="form">
                <el-form-item>
                    <div style="display: flex">
                        <el-input v-model="form.address" style="width: 550px;margin-right: 20px" id="copy"></el-input>
                        <el-button type="danger" data-clipboard-target="#copy" @click.once="copyadr" class="copys">复制</el-button>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="tips">
                    如无法使用上方复制按钮，请选中内容后，使用Ctrl+C复制。也可以扫描下方二维码或右键保存二维码进行访问。
                    </div>
                </el-form-item>
                <el-form-item align="center">
                    <div id="qrcode_box"></div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    export default {
        name: "investigation",
        components:{
        },
        data(){
            return{
                tableData:[],
                dialogFormVisible:false,
                form:{
                    address:'',
                },
            }
        },
        methods:{
            check(index,row){
                this.dialogFormVisible=true
                this.form.address=row.address
            },
            showQrcode(){
                document.getElementById("qrcode_box").innerHTML=''
                let qrcode = new QRCode('qrcode_box', {
                    width: 160, //二维码的宽度
                    height: 160,//二维码的高度
                    text: this.form.address, // 二维码地址
                    colorDark : "#000",//二维码颜色
                    colorLight : "#fff",//二维码背景颜色
                })
            },
            copyadr(){
                let _this = this;
                let clipboard = new this.$clipboard('.copys');
                clipboard.on('success', function() {
                    _this.$message({
                        message: '复制成功！',
                        type: 'success'
                    });
                });
                clipboard.on('error', function() {
                    _this.$message({
                        message: '复制失败，请手动选择复制！',
                        type: 'error'
                    });
                });
            }
        },
            mounted() {
                this.$axios.req('api/table')
                .then(res=>{
                    console.log(res);
                    this.tableData=res.data.data
                    this.tableData.map(item=>{
                        if(item.website==='百度'){
                            this.$set(item,'type',"success")
                            this.$set(item,'address',"https://www.baidu.com")
                        }
                        if(item.website==='豆瓣'){
                            this.$set(item,'type',"danger")
                            this.$set(item,'address',"https://www.douban.com")
                        }
                        if(item.website==='Github'){
                            this.$set(item,'type',"info")
                            this.$set(item,'address',"https://github.com")
                        }
                        if(item.website==='掘金'){
                            this.$set(item,'type',"warning")
                            this.$set(item,'address',"https://juejin.im")
                        }
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    }
</script>

<style scoped>
.clearfix{
    font-size: 14px;
    font-weight: bold;
}
.tips{
    background-color: #8dd8f6;
    padding: 5px 4px;
    border-radius: 4px;
    font-size: 12px;
}
</style>