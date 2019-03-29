<template>
  <div class="overview-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="16">
          <el-button type="info" @click="dialogFormVisible1 = true">添加用户1</el-button>
          <el-button @click="open3">批量删除</el-button>
          <!--<el-button>批量授权</el-button>-->
          <el-button @click="open2">下载用户keytab</el-button>
          <el-button @click="dialogFormVisible4 = true">下载项目组keytab</el-button>
          <el-button @click="dialogFormVisible5 = true">更新项目组keytab</el-button>
        </el-col>
        <el-col :span="8">
          <el-input v-model="input" placeholder="请输入手机号或用户名搜索"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="tenant-serve-list">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="用户">
          <template slot-scope="scope">{{ scope.row.username }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="iphone"
          label="手机号"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column width="250" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleOperate(scope.$index, scope.row)">授权</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
        <router-link :to="'/user/' + id">我</router-link>
      </div>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible1" width="40%">
      <el-form :model="form">
        <el-form-item>
          <el-radio-group v-model="form.resource" @change="changeStatus">
            <el-radio label="username">按姓名</el-radio>
            <el-radio label="iphone">按手机或邮箱</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-col :span="14">
            <el-input v-model="form.region" placeholder="请按姓名添加用户" :style="{ display: active1 }"></el-input>
            <el-input v-model="form.region" placeholder="请按手机或邮箱添加用户" :style="{ display: active2 }"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="onSubmit" style="margin-left: 30px;">查询</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-table :data="tableData3">
            <el-table-column property="username" label="用户名"></el-table-column>
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="iphone" label="手机号"></el-table-column>
            <el-table-column property="email" label="邮箱"></el-table-column>
            <el-table-column property="operate" label="操作"></el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible1 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="授权用户" :visible.sync="dialogFormVisible2" width="30%">
      <el-form :model="form">
        <el-form-item label="租户" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择租户">
            <el-option label="租户1" value="project1"></el-option>
            <el-option label="租户2" value="project2"></el-option>
            <el-option label="租户3" value="project3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择项目">
            <el-option label="项目1" value="project1"></el-option>
            <el-option label="项目2" value="project2"></el-option>
            <el-option label="项目3" value="project3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="租户管理员" value="zuhu1"></el-option>
            <el-option label="项目管理员" value="zuhu2"></el-option>
            <el-option label="项目成员" value="zuhu3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="只有首次下载时，可自定义keytab文件名" :visible.sync="dialogFormVisible4" width="30%">
      <el-form :model="form">
        <el-form-item label="租户" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择租户">
            <el-option label="租户1" value="project1"></el-option>
            <el-option label="租户2" value="project2"></el-option>
            <el-option label="租户3" value="project3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择项目">
            <el-option label="项目1" value="project1"></el-option>
            <el-option label="项目2" value="project2"></el-option>
            <el-option label="项目3" value="project3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="keytab文件名" :label-width="formLabelWidth">
          <el-col :span="17">
            <el-input v-model="form.role"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible4 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible4 = false">下 载</el-button>
      </div>
    </el-dialog>
    <el-dialog title="更新会导致原keytab失效，确认更新吗？" :visible.sync="dialogFormVisible5" width="30%">
      <el-form :model="form">
        <el-form-item label="租户" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择租户">
            <el-option label="租户1" value="project1"></el-option>
            <el-option label="租户2" value="project2"></el-option>
            <el-option label="租户3" value="project3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择项目">
            <el-option label="项目1" value="project1"></el-option>
            <el-option label="项目2" value="project2"></el-option>
            <el-option label="项目3" value="project3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible5 = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible5 = false">更 新</el-button>
      </div>
    </el-dialog>
    <div class="block marginTop15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        background
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        input: '',
        currentPage4: 4,
        id:'10001111',
        tableData3: [{
          username: 'wangbg',
          name: '王保国',
          iphone: '18102030506',
          email: "wangbg@citic.com",
          updateDate: "2018-10-24 12:01:15",
          operate: "添加"
        }, {
          username: 'zhaonina',
          name: '赵妮娜',
          iphone: '18102030506',
          email: "wangbg@citic.com",
          updateDate: "2018-10-24 12:01:15",
          operate: "添加"
        }, {
          username: 'xiesj',
          name: '谢世局',
          iphone: '18102030506',
          email: "wangbg@citic.com",
          updateDate: "2018-10-24 12:01:15",
          operate: "添加"
        }, {
          username: 'songyaw',
          name: '宋亚伟',
          iphone: '18102030506',
          email: "wangbg@citic.com",
          updateDate: "2018-10-24 12:01:15",
          operate: "添加"
        }],
        multipleSelection: [],
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogFormVisible4: false,
        dialogFormVisible5: false,
        form: {
          name: '',
          region: '',
          role: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: 'username',
          desc: ''
        },
        active1: '',
        active2: 'none',
        formLabelWidth: '120px'
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      changeStatus (){
        console.log(this.form.resource)
        if(this.form.resource === 'username'){
          this.active1 = ''
          this.active2 = 'none'
        }else if(this.form.resource === 'iphone'){
          this.active1 = 'none'
          this.active2 = ''
        }else{
          this.active1 = 'none'
          this.active2 = 'none'
        }
      },
      onSubmit() {
        console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleDelete(index, row) {
        this.$confirm('确认删除此人员吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.log(index, row);
      },
      handleOperate(index, row){
        this.dialogFormVisible2 = true;
        console.log(index, row);
      },
      open2() {
        this.$confirm('确认下载username.keytab文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      open3() {
        this.$confirm('确定批量删除选定的所有用户并回收用户的所有实例权限吗？', '提示', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    created() {
      this.$service.home.instanceManagement.getServUsageInfo().then(res => {
        console.log(res);
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .overview-container {
    width: 100%;
    background-color: #ffffff;
    .filter-container{
      min-height: 50px;
    }
    .tenant-serve-list{
      .el-form-item {
        margin-bottom: 10px;
      }
      .el-row {
        margin-bottom: 20px;
        height: 80px;
        background-color: #f7f7f7;
        padding: 15px;
        &:last-child {
          margin-bottom: 0;
        }
        &:hover{
          -webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
          box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.349019607843137);
        }
      }
      .el-col {
        border-radius: 4px;
        .hive,.instance{
          span{
            color: #736b6b;
            font-size: 14px;
          }
        }
        .permissionOperation{
          span{
            color: #1bb0e1;
            cursor: pointer;
          }
        }
        .hive{
          margin-top: 8px;
          .marginRight10{
            margin-right: 10px;
          }
        }
        .detail{
          margin-top: 15px;
          b{
            color: #009aff;
          }
        }
        .idleness{
          position: relative;
          top:10px;
          span{
            position: relative;
            top: -50px;
            left: 45px;
            font-size: 13px;
            color: rgb(125, 127, 128);
            font-weight: bold;
          }
        }
        .el-progress-circle,.el-progress,.el-progress-circle{
          .el-progress__text{
            font-size: 14px;
          }
        }
      }
    }
  }
  .marginTop8{
    margin-top: 8px;
  }
  .marginTop15{
    margin-top: 15px;
  }
  .marginRight20{
    margin-right: 20px;
  }
</style>
