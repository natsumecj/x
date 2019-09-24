<template>
  <div>
    <el-row class="top">
      <el-col>
        <div class="concent">请填写您的转账信息</div>
        <div class="tips">请务必是你本人操作，确认转账金额及收款人信息</div>
      </el-col>
    </el-row>
    <el-card class="box-card">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="填写转账信息"></el-step>
        <el-step title="确认转账信息"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-show="active === 0"
      >
        <el-form-item label="付款账户" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="收款账户" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择" class="sel">
            <el-option label="支付宝" value="支付宝"></el-option>
            <el-option label="银行卡" value="银行卡"></el-option>
          </el-select>
          <el-input v-model="ruleForm.collect" class="int"></el-input>
        </el-form-item>
        <el-form-item label="付款人姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="收款金额" prop="money">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
      <div class="box2" v-show="active === 1">
        <el-alert
          title="确认转账后，资金将直接打入对方账户，无法退回。"
          type="warning"
          show-icon
        >
        </el-alert>
        <div>付款账户：{{ ruleForm.account }}</div>
        <div>收款账户:{{ ruleForm.collect }}</div>
        <div>收款人姓名：{{ ruleForm.name }}</div>
        <div>收款金额：{{ ruleForm.money }}元</div>
        <hr />
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="支付密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="submit"
              >提交</el-button
            >
            <el-button size="mini" @click="last">上一步</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active === 2" class="box3">
        <div class="icon">
          <img src="../assets/yes.png" alt="" />
        </div>
        <div style="text-align: center;font-size: 16px;margin-top: 6px">
          操作成功
        </div>
        <div style="text-align: center;font-size:14px;color: #9c9898">
          预计两小时到账
        </div>
        <div
          style="width: 100%;background-color: #eee8e8;padding: 10px 4px;font-size: 16px;text-align: left;margin: 10px 0"
        >
          <div style="padding: 4px">付款账户：{{ ruleForm.account }}</div>
          <div style="padding: 4px">收款账户:{{ ruleForm.collect }}</div>
          <div style="padding: 4px">收款人姓名：{{ ruleForm.name }}</div>
          <div style="padding: 4px">收款金额：{{ ruleForm.money }}元</div>
        </div>
        <el-button type="primary" size="mini" @click="again"
          >再转一笔</el-button
        >
        <el-button size="mini" @click="check">查看账单</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      active: 0,
      ruleForm: {
        account: "",
        name: "",
        region: "",
        collect: "",
        money: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, message: "请输入付款账户", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入付款人姓名", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择收款账户", trigger: "blur" }
        ],
        money: [{ required: true, message: "请输入付款金额", trigger: "blur" }],
        password: [
          { required: true, message: "请输入账号密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    next() {
      if (
        this.ruleForm.account !== "" &&
        this.ruleForm.name !== "" &&
        this.ruleForm.region !== "" &&
        this.ruleForm.collect !== "" &&
        this.ruleForm.money !== ""
      ) {
        this.active = 1;
      } else {
        this.$message({
          type: "warning",
          message: "请填写完整表格"
        });
      }
    },
    submit() {
      if (this.ruleForm.password !== "") {
        this.active = 2;
      } else {
        this.$message({
          type: "warning",
          message: "请输入密码"
        });
      }
    },
    last() {
      this.active = 0;
    },
    again() {
      this.active = 0;
      this.ruleForm.account = "";
      this.ruleForm.name = "";
      this.ruleForm.region = "";
      this.ruleForm.collect = "";
      this.ruleForm.money = "";
      this.ruleForm.password = "";
    },
    check() {
        this.$store.state.check=true
        this.$router.push({name:'checkform',params:{
          account:this.ruleForm.account,
            name:this.ruleForm.name,
            collect:this.ruleForm.collect,
            money:this.ruleForm.money}})
    }
  }
};
</script>

<style scoped>
.top {
  margin-top: 10px;
  width: 100%;
  padding: 6px;
  background-color: white;
}
.concent {
  font-size: 14px;
  margin-bottom: 4px;
}
.tips {
  color: #9c9898;
  font-size: 12px;
}
.demo-ruleForm {
  width: 500px;
  margin: 40px auto;
}
.box-card {
  text-align: center;
  margin-top: 10px;
}
.sel {
  width: 100px;
}
.int {
  width: 300px;
}
.box2 {
  width: 500px;
  margin: 40px auto;
  text-align: left;
  font-size: 14px;
}
.box2 > div {
  padding: 4px;
}
hr {
  margin: 6px 0;
}
.box3 {
  width: 300px;
  margin: 40px auto;
  font-size: 14px;
  text-align: center;
}
.icon {
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  text-align: center;
  background-color: #67c23a;
  line-height: 64px;
  margin: 0 auto;
}
.icon > img {
  width: 24px;
  height: 24px;
}
</style>
