<template>
  <div>
      <div style="display:flex;align-items: center">
          <div class="icon" @click="change">
              <i class="el-icon-s-fold"></i>
          </div>
          <div>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item v-if="title">{{title}}</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "Bread",
  data() {
    return {
      title: ""
    };
  },
    methods:{
      change(){
          this.$store.state.show=!this.$store.state.show
      }
    },
  watch: {
    $route(val) {
        console.log(val);
        this.title = val.meta.title;
    }
  }
};
</script>

<style scoped>
    .icon {
        background-color: #6fac6d;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        color: white;
        font-size: 18px;
        margin-right: 10px;
    }
</style>
