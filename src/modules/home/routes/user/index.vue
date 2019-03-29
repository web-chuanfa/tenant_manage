<template>
  <div class="overview-container">
    <div class="filter-container">
      <el-row>
        <el-col :span="16">
          <el-button type="primary" @click="addUserDialog = true" style="background-color: #009ddb;border-color: #009ddb;">添加用户</el-button>
        </el-col>
        <el-col :span="8">
          <el-input v-model="search" placeholder="请输入手机号或用户名搜索"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="tenant-serve-list">
      <el-table
        ref="multipleTable"
        :data="tables.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
          prop="created"
          label="录入用户"
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
              @click="handleOperate(scope.$index, scope.row)">角色</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" v-if="global.length == 4">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div style="margin-top: 20px">-->
        <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
        <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
        <!--<router-link :to="'/user/' + id">我</router-link>-->
      <!--</div>-->
    </div>
    <el-dialog title="添加用户" :visible.sync="addUserDialog" width="40%">
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
          <el-table :data="tableData">
            <el-table-column property="username" label="用户名"></el-table-column>
            <el-table-column property="name" label="姓名"></el-table-column>
            <el-table-column property="iphone" label="手机号"></el-table-column>
            <el-table-column property="email" label="邮箱"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleAdd(scope.$index, scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="授权用户" :visible.sync="userInsDg">
      <div class="content" style="min-height: 200px;">
        <el-tree
          :data="userAuthor.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="margin-right: 50px;">{{ node.label }}</span>
         <el-checkbox-group v-model="checkOne" class="checkGroup" >
            <el-checkbox  v-for='item in data.roleList' :label="item.tenantId" :key="item.tenantId" @change="() => getKey(item)">{{ item.roleName }}</el-checkbox>
         </el-checkbox-group>
      </span>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userInsCancel">取 消</el-button>
        <el-button type="primary" @click="userInsConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="授权用户" :visible.sync="userInsDg2" width="35%">
      <div class="content" style="min-height: 200px;">
        <el-tree
          :data="userAuthor"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="margin-right: 50px;">{{ node.label }}</span>
         <el-checkbox-group v-model="checkOne" class="checkGroup" >
            <el-checkbox  v-for='item in data.roleList' :label="item.tenantId" :key="item.tenantId" @change="() => getKey(item.tenantId)">{{ item.roleName }}</el-checkbox>
         </el-checkbox-group>
      </span>
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userInsDg2 = false">取 消</el-button>
        <el-button type="primary" @click="userInsDg2 = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="block marginTop15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        background
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
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
        currentPage: 1,
        pageSize: 10,
        currentTotal: 0,
        search: '',  //搜索
        tableData: [],
        multipleSelection: [],
        addUserDialog: false,
        userInsDg2: false,
        userInsDg: false,
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
        formLabelWidth: '120px',
        userAuthor: [],
        checkOne: [1,2],
        id: '10001111'
      }
    },
    computed:{
      tables:function(){
        let search=this.search;
        if(search){
          return  this.tableData.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              if(key == "name" || key == "email"){
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
              }
              // return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    },
    created (){
      // 这个也可以把登陆权限放到loacalstorage 然后判断  是否显示删除按钮
      console.log(this.global)
      // 用户列表
      this.$service.home.user.getListInfo().then(res => {
        this.tableData = res.tableData;
      });
      // 用户授权
      this.$service.home.user.getUserAuthor().then(res => {
        this.userAuthor = JSON.parse(JSON.stringify(res.userAuthor));
      });
    },
    methods: {
      getKey (ids){
        console.log(ids);
        console.log(this.checkOne);
        let param = [
          "123","398","987"
        ];
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      // toggleSelection(rows) {
      //   if (rows) {
      //     rows.forEach(row => {
      //       this.$refs.multipleTable.toggleRowSelection(row);
      //     });
      //   } else {
      //     this.$refs.multipleTable.clearSelection();
      //   }
      // },
      changeStatus (){
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
        this.$confirm('删除将导致该用户的所有实例被取消授权，确定删除吗?', '提示', {
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
        this.userInsDg2 = true;
        console.log(index, row);
      },
      handleAdd(index, row){
        this.addUserDialog = true;
        this.userInsDg = true;
        console.log(index, row);
      },
      userInsConfirm (){
        this.addUserDialog = false;
        this.userInsDg = false;
      },
      userInsCancel (){
        this.addUserDialog = true;
        this.userInsDg = false;
      }
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../../assets/css/user/index.less';
</style>
