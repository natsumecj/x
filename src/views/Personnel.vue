<template>
  <div>
    <div class="top">
      <div style="display: flex;align-items: center">
        <div class="img">
          <img src="../assets/personal.png" alt="" />
        </div>
        <div>
          人员信息
        </div>
      </div>
      <div>
        <el-button
          type="primary"
          size="mini"
          @click="apply"
          v-if="show === true"
          >批量转正申请</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="show === false"
          @click="confirm"
          >确认</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="cancel"
          v-if="show === false"
          >取消</el-button
        >
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <el-button
        type="primary"
        round
        plain
        v-for="(item, index) in btn"
        @click="change(index)"
        size="mini"
        >{{ item }}</el-button
      >
    </div>
    <el-table
      ref="multipleTable"
      :data="
        tableData.slice(pagesize * (currentPage - 1), currentPage * pagesize)
      "
      tooltip-effect="dark"
      style="width: 100%;margin-top: 10px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column label="姓名" align="center" prop="name" width="90">
        <!--                <template slot-scope="scope">{{ scope.row.name }}</template>-->
      </el-table-column>
      <el-table-column
        align="center"
        label="工号"
        prop="id"
        sortable
        width="90"
      >
        <!--                <template slot-scope="scope">{{ scope.row.id }}</template>-->
      </el-table-column>
      <el-table-column align="center" label="机构" prop="mechanism" width="100">
        <!--                <template slot-scope="scope">{{ scope.row.mechanism }}</template>-->
      </el-table-column>
      <el-table-column
        align="center"
        label="部门"
        prop="department"
        width="100"
      >
        <!--                <template slot-scope="scope">{{ scope.row.department }}</template>-->
      </el-table-column>
      <el-table-column
        align="center"
        header-align="center"
        label="试用期开始日期"
        sortable
        prop="startProbation"
        width="150"
      >
        <!--                <template slot-scope="scope">{{ scope.row.startProbation }}</template>-->
      </el-table-column>
      <el-table-column
        align="center"
        label="试用期结束日期"
        sortable
        prop="endProbation"
        width="150"
      >
        <!--                <template slot-scope="scope">{{ scope.row.endProbation }}</template>-->
      </el-table-column>
      <el-table-column align="center" label="职位" prop="position" width="90">
        <!--                <template slot-scope="scope">{{ scope.row.position }}</template>-->
      </el-table-column>
      <el-table-column align="center" label="转正审批状态" width="140">
        <template slot-scope="scope"
          ><div class="colors">{{ scope.row.approval }}</div></template
        >
      </el-table-column>
      <el-table-column align="center" label="操作" width="140">
        <el-button type="primary" size="mini">编辑试用期</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "Personnel",
  data() {
    return {
      tableData: [],
      btn: ["全部员工", "考核中员工", "已转正员工"],
      active: 0,
      pagesize: 10,
      currentPage: 1,
      table: [],
      show: true,
      val: []
    };
  },
  methods: {
    change(index) {
      this.tableData = this.table;
      this.tableData = this.tableData.filter(i => {
        if (index === 0) {
          return i;
        }
        if (index === 1) {
          return i.approval === "审批中";
        }
        if (index === 2) {
          return i.approval === "审批通过";
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.val = val;
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    apply() {
      this.show = false;
      this.tableData = this.tableData.filter(item => {
        return item.approval === "审批中";
      });
    },
    confirm() {
      if (this.val.length > 0) {
        this.val.map(item => {
          item.approval = "审批通过";
        });
      } else {
        this.$message({
          type: "warning",
          message: "至少选中一条数据"
        });
      }
      this.show = true;
      // this.tableData=this.table
    },
    cancel() {
      this.show = true;
      this.tableData = this.table;
    }
  },
  mounted() {
    this.$axios
      .req("api/personnel")
      .then(res => {
        // console.log(res.data.data);
        this.tableData = res.data.data;
        this.table = res.data.data;
        // console.log(this.tableData);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.top {
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  justify-content: space-between;
  font-weight: bold;
}
.img {
  width: 20px;
  height: 20px;
  background-color: #6fac6d;
  text-align: center;
  line-height: 25px;
  margin-right: 4px;
}
.img > img {
  width: 16px;
  height: 16px;
}
.colors {
  color: #5bb1fd;
}
</style>
