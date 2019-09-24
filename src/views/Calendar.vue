<template>
  <div>
    <div>
      <lunar-full-calendar :events="events" :config="config">
      </lunar-full-calendar>
      <el-dialog title="提示" :visible.sync="dialogVisible" width="60%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="事项" placeholder="准备做什么">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动时间">
            <el-col :span="11">
              <el-time-select
                placeholder="起始时间"
                v-model="startTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30'
                }"
              >
              </el-time-select>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-select
                placeholder="结束时间"
                v-model="endTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime
                }"
              >
              </el-time-select>
            </el-col>
          </el-form-item>
          <el-form-item label="参与人:">
            <div style="display: flex">
              <div
                v-for="(item, index) in name1"
                :key="index"
                style="margin-left: 5px"
              >
                {{ item }}
              </div>
              <div style="margin-left: 5px">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link">
                    <i
                      class="el-icon-circle-plus-outline"
                      style="font-size: 18px;color: #00B7FF"
                    ></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-input
                      v-model="name2"
                      autocomplete="off"
                      placeholder="请输入参与人姓名"
                    ></el-input>
                    <el-dropdown-item>
                      <el-button
                        type="primary"
                        @click="addSure"
                        size="mini"
                        style="margin-left: 120px"
                        >确 定</el-button
                      >
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="click">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
    data() {
        return {
            events: [
                {
                    title: "事件内容", // 事件内容
                    start: "2019-05-20 09:00:00", // 事件开始时间
                    end: "2019-05-21 12:00:00", // 事件结束时间
                    color: "rgba(9, 9, 9, 0.2)" // 事件的显示颜色
                }
            ],
            config: {
                buttonText: { today: "今天", month: "月", week: "周", day: "日" },
                locale: "zh-cn",
                editable: false, //是否允许修改事件
                selectable: false,
                eventLimit: 4, //事件个数
                allDaySlot: false, //是否显示allDay
                defaultView: "month", //显示默认视图
                eventRender:this.eventRender,      //日程渲染事件
                eventClick: this.eventClick, //点击事件
                dayClick: this.dayClick //点击日程表上面某一天
            },
            dialogVisible: false,
            form: {
                name: "",
                peoples: []
            },
            startTime: "",
            endTime: "",
            name1: [],
            name2: "",
            dateDate: "",
            dateNew:'',//当天登录时间
            id:"",//日程id
        };
    },
    methods: {
        // 点击事件
        eventClick(event, jsEvent, pos) {
            console.log("eventClick", event, jsEvent, pos);
            this.id = event._id
            console.log(this.id);
            this.$axios.req("api/delCalendar",{
                id:this.id
            }).then(res=>{
                console.log(res);
                this.$message.success("删除成功")
                this.plus()
                if (this.events.length === 1) {
                    this.events = [];
                }
            }).catch(e=>{
                console.log(e);
            })
        },
        // 点击当天
        dayClick(day, jsEvent) {
            console.log("dayClick", day, jsEvent);
            this.dateDate = this.$moment(day._d).format("YYYY-MM-DD");
            let date1 = this.$moment(this.dateDate).unix()
            let date2 = this.$moment(this.dateNew).unix()
            if(date1<date2){
                this.$message.warning("不能给今天之前的日期添加日程")
            } else {
                this.dialogVisible = true;
            }
            console.log(this.dialogVisible);
        },
        addSure() {
            this.name1.push(this.name2);
        },
        //日程渲染
        eventRender(calEvent, element, view){
            let start = this.$moment(calEvent.startTime).format("HH:mm")
            let end = this.$moment(calEvent.endTime).format("HH:mm")
            let content = calEvent.schedule
            let people = calEvent.users.toString()
            let peopleNum = calEvent.users.length
            element[0].innerHTML = "<div> " + start + " ~ "+ end + "： " + content + "</div>" +
                "<div>参与人：" + people + "</div>" +
                "<div>参与人数：" +"<i class=\"el-icon-user-solid\" style='color: black'></i>×" + peopleNum+ "</div>"
        },
        //获取日程
        plus() {
            this.$axios
                .req("api/calendar")
                .then(res => {
                    if (res.data.code === 200){
                        console.log(res.data.data);
                        res.data.data.forEach(item => {
                            item.end = this.$moment(item.endTime).format("YYYY-MM-DD hh:mm:ss")
                            item.start = this.$moment(item.startTime).format("YYYY-MM-DD hh:mm:ss")
                            item.title = item.schedule
                            item.color = "rgba(9, 9, 9, 0.2)"
                        })
                        this.events = res.data.data
                    }
                    console.log(this.events);
                })
                .catch(e => {
                    console.log(e);
                });
        },
        //添加日程
        click() {
            this.dialogVisible = false;
            let startTimeStr1 = this.dateDate + " " + this.startTime + ":00";
            console.log(startTimeStr1);
            let startTimeStr2 = this.dateDate + " " + this.endTime + ":00";
            console.log(startTimeStr2);
            this.$axios
                .req("api/calendar", {
                    users: this.name1,
                    startTime: startTimeStr1,
                    endTime: startTimeStr2,
                    schedule: this.form.name
                })
                .then(res => {
                    if(res.data.code === 200){
                        this.$message.success("添加日程成功")
                        this.plus()
                    }
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.plus()
        console.log(this.user);
        this.name1.push(localStorage.getItem('user'));
        let date = new Date()
        this.dateNew = this.$moment(date).format("YYYY-MM-DD")
    },
};
</script>

<style scoped></style>
