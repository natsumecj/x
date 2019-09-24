<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="(item, index) in title" :key="index" class="box">
        <div @click="change(index)" class="all">
          <div :class="{ top: active === index }"></div>
          <div class="title">
            <div class="name">{{ item.name }}(元)</div>
            <div class="num" v-if="active === index">
              ￥
              <countTo
                :startVal="startVal"
                :endVal="item.num"
                :duration="3000"
                :autoplay="autoplay"
              ></countTo>
            </div>
            <div class="num" v-else>
              ￥
              <countTo
                :startVal="item.num"
                :endVal="item.num"
                :autoplay="autoplay"
              ></countTo>
            </div>
          </div>
          <circle-progress
            v-show="active === index"
            class="circle"
            :width="width"
            :radius="radius"
            :progress="progress"
            :delay="delay"
            :duration="duration"
            :barColor="barColor"
            :backgroundColor="backgroundColor"
            :isRound="isRound"
            :isAnimation="isAnimation"
            :timeFunction="timeFunction"
          />
          <circle-progress
            v-show="active !== index"
            class="circle"
            :width="width"
            :radius="radius"
            :progress="progress2"
            :delay="delay"
            :duration="duration"
            :barColor="barColor2"
            :backgroundColor="backgroundColor"
            :isRound="isRound"
            :isAnimation="isAnimation2"
            :timeFunction="timeFunction"
          />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="16" class="chart">
      <el-col :span="12">
        <city></city>
      </el-col>
      <el-col :span="12">
        <dynamic></dynamic>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col>
        <investigation></investigation>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import circleProgress from "../components/circle-progress";
import countTo from "vue-count-to";
import city from "../components/City";
import dynamic from "../components/dynamic";
import investigation from "../components/investigation";
export default {
  name: "home",
  components: {
    circleProgress,
    countTo,
    city,
    dynamic,
    investigation,
  },
  data() {
    return {
      startVal: 0,
      list: [],
      autoplay: true,
      title: [
        { name: "本月营收" },
        { name: "待回款" },
        { name: "客单价/合同" }
      ],
      active: 0,
      width: "60",
      radius: "6",
      progress: "65",
      progress2: "50",
      delay: "20",
      delay2: "0",
      duration: "1500",
      barColor: "#81ac79",
      barColor2: "#acacaa",
      backgroundColor: "#d4d0ce",
      isRound: true,
      isAnimation: true,
      isAnimation2: false,
      timeFunction: "cubic-bezier(0.99, 0.01, 0.22, 0.94)"
    };
  },
  methods: {
    change(index) {
      this.active = index;
    }
  },
  mounted() {
    this.$axios
      .req("api/num")
      .then(res => {
        // console.log(res)
        res.data.list.map(i => {
          this.list.push(i.num);
        });
        // console.log(this.list);
        this.title.map((item, index) => {
          this.$set(item, "num", this.list[index]);
        });
        // console.log(this.title);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="scss">
.icon {
  background-color: #6fac6d;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: white;
  font-size: 18px;
  float: right;
}
.all {
  width: 100%;
  height: 100%;
}
.head {
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  margin-top: 30px;
}
.box {
  margin-top: 20px;
  background-color: white;
  height: 100px;
  display: flex;
  align-items: center;
  border-right: 1px solid skyblue;
  position: relative;
}
.top {
  width: 100%;
  height: 6px;
  background-color: #00b7ff;
  position: absolute;
  top: 0;
}
.name {
  color: #d4d4d4;
  font-size: 12px;
  margin-bottom: 10px;
}
.title {
  margin-left: 40px;
  margin-top: 30px;
}
.circle {
  position: absolute;
  top: 20px;
  right: 140px;
}
  .chart{
    margin-top: 20px;
    height: 340px;
    }
  </style>
