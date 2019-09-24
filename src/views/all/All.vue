<template>
    <div>
        <el-container v-if="this.$store.state.check===false">
            <el-header height="30px">
                <headers></headers>
            </el-header>
            <el-container>
                <el-aside :width="width_" height="100vh">
                    <navs></navs>
                </el-aside>
                <el-main>
                    <bread></bread>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
        <div v-if="this.$store.state.check===true">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import headers from '../../components/Header'
    import navs from '../../components/Nav'
    import bread from '../../components/Bread'
    export default {
        name: "All",
        components:{
            headers,
            navs,
            bread
        },
        data(){
            return{
                width_:""
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-header{
        background-color: #ffffff;
    }
    .el-main{
        background-color: #eeeeee;
    }
</style>