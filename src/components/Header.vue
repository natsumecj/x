<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div>小金刚后台管理系统</div>
      </el-col>
      <el-col :span="4" :offset="14">
        <div class="right">
          <div>
            <img src="../assets/language.png" alt="" class="language" />
          </div>
          <div class="img">
            <img src="../assets/personal.png" alt="" />
          </div>
          <div class="box" v-popover:popover>
            <div>亲爱的{{ username }}</div>
            <div>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="pop">
      <div>上传头像</div>
      <div @click="modify">修改密码</div>
      <div @click="out">退出系统</div>
    </el-popover>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="原密码" label-width="100px">
          <el-input v-model="form.oldpassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码" label-width="100px">
          <el-input v-model="form.newpassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px">
          <el-input v-model="form.confirmpassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      username: "",
      userId: "",
      dialogFormVisible: false,
      pop: false,
      form: {
        confirmpassword: "",
        newpassword: "",
        oldpassword: ""
      }
    };
  },
  methods: {
    modify() {
      this.dialogFormVisible = true;
    },
    cancel() {
      this.form.confirmpassword = "";
      this.form.newpassword = "";
      this.form.oldpassword = "";
      this.dialogFormVisible = false;
    },
    confirm() {
      if (this.form.newpassword === this.form.confirmpassword) {
        this.$axios
          .req("api/users/updatePwd", {
            username: this.username,
            password: this.form.oldpassword,
            id: this.userId,
            newPwd: this.form.newpassword
          })
          .then(res => {
            console.log(res);
            if (res.data.code === 500) {
              this.$message({
                type: "warning",
                message: res.data.msg
              });
              this.form.oldpassword = "";
              this.form.newpassword = "";
              this.form.confirmpassword = "";
            }
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.form.oldpassword = "";
              this.form.newpassword = "";
              this.form.confirmpassword = "";
              this.dialogFormVisible = false;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "新密码不正确"
        });
        this.form.newpassword = "";
        this.form.confirmpassword = "";
      }
    },
    out() {
      this.$axios
        .req("api/users/logout")
        .then(res => {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.$store.state.user = "";
          localStorage.removeItem("user");
          localStorage.removeItem("userId");
          this.$router.push("/login");
          this.pop = false;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.username = localStorage.getItem("user");
    this.userId = localStorage.getItem("userId");
  }
};
</script>

<style scoped lang="scss">
.el-row {
  align-items: center;
  height: 30px;
  display: flex;
  color: #6fac6d;
}
.language {
  width: 20px;
  height: 20px;
}
.right {
  display: flex;
  align-items: center;
  font-size: 12px;
}
.box {
  display: flex;
  align-items: center;
}
.img {
  width: 26px;
  height: 26px;
  border-radius: 100%;
  background-color: #a4e7ff;
  text-align: center;
  line-height: 32px;
  margin: 0px 10px;
}
.img > img {
  width: 20px;
  height: 20px;
}
</style>
