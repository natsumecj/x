<template>
  <div>
    <!--        个人动态-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人动态</span>
        <el-button
          style="float: right;padding: 3px 8px"
          type="primary"
          size="mini"
          @click="add"
          >添加动态</el-button
        >
      </div>
      <div>
        <el-date-picker
          v-model="value"
          type="date"
          @change="change"
          placeholder="选择日期"
        >
        </el-date-picker>
        <div
          v-for="(item, index) in list"
          :key="item._id"
          class="box"
          v-if="list.length > 0"
        >
          <el-row>
            <el-col :span="4">
              {{ item.classification }}
            </el-col>
            <el-col :span="4" :offset="16" style="text-align: right">
              {{ item.username }}
            </el-col>
          </el-row>
          <el-row v-if="item.reportUsers.length!==0">
            <el-col :span="24">
              <div style="display: flex;align-items: center">
                <div>汇报人:</div>
                <div v-for="items in item.reportUsers" style="margin-left: 4px">
                  {{ items }}
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="17"> 动态：{{ item.dynamic }} </el-col>
            <el-col :span="7" style="text-align: right;color: #b6b6b6;">
              发布于{{ item.date }}
            </el-col>
          </el-row>
        </div>
        <div class="no" v-if="list.length === 0">
          暂无动态
        </div>
        <div>
          <el-dialog title="添加动态" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="动态类型" :label-width="formLabelWidth">
                <el-select v-model="form.dynamic" placeholder="请选择动态类型">
                  <el-option
                    v-for="(item, index) in form.type"
                    :label="item.type"
                    :value="index + 1"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                label="相关汇报人"
                :label-width="formLabelWidth"
                v-if="form.dynamic == 2"
              >
                <el-select
                  v-model="form.Reporter"
                  placeholder="请选择汇报人"
                  multiple
                >
                  <el-option
                    v-for="(item, index) in form.names"
                    :key="index"
                    :label="item.name"
                    :value="index + 1"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="详情内容" :label-width="formLabelWidth">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="form.textarea"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="save">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "dynamic",
  data() {
    return {
      value: new Date(),
      dialogFormVisible: false,
      formLabelWidth: "100px",
      form: {
        textarea: "",
        dynamic: "",
        Reporter: [],
        names: [],
        type: [
          { type: "个人心情" },
          { type: "工作汇报" },
          { type: "公司相关" },
          { type: "其他事物" }
        ]
      },
      selectname: [],
      list: []
    };
  },
  methods: {
    add() {
      this.dialogFormVisible = true;
    },
    save() {
      // console.log(this.users);
      let type = this.form.type[this.form.dynamic - 1].type;
      this.form.Reporter.map(item => {
        this.selectname.push(this.form.names[item - 1].name);
      });
      this.dialogFormVisible = false;
      this.$axios
        .req("api/addDynamic", {
          username: this.users,
          date: this.value,
          dynamic: this.form.textarea,
          classification: type,
          reportUsers: this.selectname
        })
        .then(res => {
          console.log(res);
          this.form.textarea=''
          this.form.dynamic=''
          this.form.Reporter=[]
        })
        .catch(err => {
          console.log(err);
        });
      this.$axios
        .req("api/getDynamic")
        .then(res => {
          console.log(res);
          res.data.data.map(item => {
            item.date = this.$moment(item.date).format("YYYY年MM月DD日");
          });
          let val = this.$moment(this.value).format("YYYY年MM月DD日");
          this.list = res.data.data.filter(item => {
            return item.date === val;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    change() {
      this.$axios
        .req("api/getDynamic")
        .then(res => {
          console.log(res);
          res.data.data.map(item => {
            item.date = this.$moment(item.date).format("YYYY年MM月DD日");
          });
          let val = this.$moment(this.value).format("YYYY年MM月DD日");
          this.list = res.data.data.filter(item => {
            return item.date === val;
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.$axios
      .req("api/name")
      .then(res => {
        // console.log(res);
        this.form.names = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .req("api/getDynamic")
      .then(res => {
        console.log(res);
        res.data.data.map(item => {
          item.date = this.$moment(item.date).format("YYYY年MM月DD日");
        });
        let val = this.$moment(this.value).format("YYYY年MM月DD日");
        this.list = res.data.data.filter(item => {
          return item.date === val;
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    users() {
      return localStorage.getItem("user");
    }
  }
};
</script>

<style scoped lang="scss">
.box-card {
  height: 330px;
  overflow: auto;
}
.clearfix {
  font-size: 14px;
}
.no {
  margin-top: 40px;
}
.el-select {
  width: 100%;
}
.box {
  width: 96%;
  background-color: #e7e7e7;
  font-size: 12px;
  padding: 6px 10px;
  margin-top: 10px;
}
.box:hover {
  background-color: #9c9898;
}
.box > .el-row {
  padding: 4px;
}
</style>
