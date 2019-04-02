<template>
  <div class="overview-container">
    <div class="filter-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="租户">
          <el-select v-model="YX.text" placeholder="请选择院系" @change="tenantChange(YX.text)">
            <el-option v-for="(option1,index) in YX"
                       :value="option1.id" :label="option1.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-select v-model="selection.text" placeholder="请选择专业" @change="grpChange(selection.text)">
            <el-option v-for="(option,index) in selection"
                       :value="option.id" :label="option.text" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="project.text" placeholder="请选择项目" @change="insChange(project.text)">
            <el-option v-for="(option,index) in project"
                       :value="option.id" :label="option.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实例ID">
          <el-select v-model="instance.text" placeholder="全部">
            <el-option v-for="(option,index) in instance" :value="option.id" :label="option.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="tenant-serve-list">
      <div class="tenant-serve-item" v-for="(item,index) in serverList">
        <el-row :gutter="20">
          <el-col :span="2">
            <img :src="require('../../../../assets/images/serviceimg/'+item.servName.toLowerCase()+'.png')" alt="" height="50">
          </el-col>
          <el-col :span="16">
            <div class="instance marginTop15">
              <span>实例ID:</span>&nbsp;&nbsp;<span class="instance-data">{{ item.insId }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="instance marginTop15 permissionOperation">
              <span class="marginRight20" @click="accessDialog = true">查看权限</span>&nbsp;&nbsp;
              <span class="marginRight20" @click="authorDialog = true">授权</span>&nbsp;&nbsp;
              <span @click="cancelAuthorDialog = true">取消授权</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="已授权用户" :visible.sync="accessDialog" width="40%">
      <el-table :data="gridData">
        <el-table-column property="username" label="用户名"></el-table-column>
        <el-table-column property="name" label="姓名"></el-table-column>
        <el-table-column property="date" label="授权时间"></el-table-column>
        <el-table-column property="user" label="授权人"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="授权用户" :visible.sync="authorDialog" width="30%">
      <el-form :model="form">
        <el-form-item label="选择用户">
          <!--<el-select v-model="form.region" placeholder="请选择授权用户">-->
            <!--<el-option label="user1" value="shanghai"></el-option>-->
            <!--<el-option label="user2" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--<el-autocomplete-->
            <!--class="inline-input"-->
            <!--v-model="state1"-->
            <!--:fetch-suggestions="querySearch"-->
            <!--placeholder="请选择授权用户"-->
            <!--@select="handleSelect"-->
          <!--&gt;</el-autocomplete>-->
          <el-select v-model="value8" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          若用户不存在，请<b @click="addUser" style="color:#3399FF;font-weight: normal;cursor: pointer;">添加用户</b>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorDialog = false">取 消</el-button>
        <el-button type="primary" @click="authorDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加用户" :visible.sync="addDialog" width="40%">
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
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="addDialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="取消授权" :visible.sync="cancelAuthorDialog" width="30%">
      <el-form :model="form">
        <el-form-item label="选择用户">
          <el-select v-model="form.region" placeholder="请选择授权用户">
            <el-option label="user1" value="shanghai"></el-option>
            <el-option label="user2" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAuthorDialog = false">取 消</el-button>
        <el-button type="primary" @click="cancelAuthorDialog = false">确 定</el-button>
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
    data () {
      return {
        formInline: {
          user: '',
          region: ''
        },
        value8: '',
        options: [
          {
            value: '2233',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        active1: '',
        active2: 'none',
        tableData: [],
        serverList: [],
        YX: [
          {
            text: '计信院',
            id: 0,
            children: [
              {
                text: '软件工程',
                id: 0,
                children: [
                  {
                    text: '软件工程项目1',
                    id: 0,
                    children: [
                      {
                        text: '软件工程实例1-1',
                        id: 0
                      },
                      {
                        text: '软件工程实例1-2',
                        id: 1
                      }
                    ]
                  },
                  {
                    text: "软件工程项目2",
                    id: 1,
                    children: [
                      {
                        text: '软件工程实例2-1',
                        id: 0
                      },
                      {
                        text: '软件工程实例2-2',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text: '计算机科学与技术',
                id: 1,
                children: [
                  {
                    text: '计算机科学项目1',
                    id: 0,
                    children: [
                      {
                        text: '计算机科学实例1-1',
                        id: 0
                      },
                      {
                        text: '计算机科学实例1-1',
                        id: 1
                      }
                    ]
                  },
                  {
                    text: "计算机科学项目2",
                    id: 1,
                    children: [
                      {
                        text: '计算机科学实例2-1',
                        id: 0
                      },
                      {
                        text: '计算机科学实例2-1',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text: "信息安全",
                id: 2,
                children: [
                  {
                    text: '信息安全项目1',
                    id: 0,
                    children: [
                      {
                        text: '信息安全实例1-1',
                        id: 0
                      },
                      {
                        text: '信息安全实例1-2',
                        id: 1
                      }
                    ]
                  },
                  {
                    text: "信息安全项目2",
                    id: 1,
                    children: [
                      {
                        text: '信息安全实例2-1',
                        id: 0
                      },
                      {
                        text: '信息安全实例2-1',
                        id: 1
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            text: '商学院',
            id: 1,
            children: [
              {
                text: '旅游管理',
                id: 0,
                children: [
                  {
                    text: '旅游管理项目1',
                    id: 0,
                    children: [
                      {
                        text: '旅游管理实例1-1',
                        id: 0
                      },
                      {
                        text: '旅游管理实例1-2',
                        id: 1
                      }
                    ]
                  },
                  {
                    text: "旅游管理项目2",
                    id: 1,
                    children: [
                      {
                        text: '旅游管理实例2-1',
                        id: 0
                      },
                      {
                        text: '旅游管理实例2-2',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text: '工商管理',
                id: 1,
                children: [
                  {
                    text: '工商管理项目1',
                    id: 0,
                    children: [
                      {
                        text: '工商管理实例1-1',
                        id: 0
                      },
                      {
                        text: '工商管理实例1-2',
                        id: 1
                      }
                    ]
                  },
                  {
                    text: "工商管理项目2",
                    id: 1,
                    children: [
                      {
                        text: '工商管理实例2-1',
                        id: 0
                      },
                      {
                        text: '工商管理实例2-1',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text: "行政管理",
                id: 2,
                children: [
                  {
                    text: '行政管理项目1',
                    id: 0,
                    children: [
                      {
                        text: '行政管理实例1-1',
                        id: 0
                      },
                      {
                        text: '工商管理实例1-2',
                        id: 1
                      }
                    ]
                  },
                  {
                    text: "行政管理项目2",
                    pr_id: 1,
                    children: [
                      {
                        text: '行政管理实例2-1',
                        id: 0
                      },
                      {
                        text: '工商管理实例2-2',
                        id: 1
                      }
                    ]
                  }
                ]
              }
            ]
          },
        ],
        selection: [],
        project: [],
        instance: [],
        currentPage: 1,
        gridData: [
          {
            date: '2016-05-02',
            username: "wangbg",
            name: '王小虎',
            user: 'system'
          }, {
            date: '2016-05-02',
            username: "wangbg",
            name: '王小虎',
            user: 'system'
          }, {
            date: '2016-05-02',
            username: "wangbg",
            name: '王小虎',
            user: 'system'
          }, {
            date: '2016-05-02',
            username: "wangbg",
            name: '王小虎',
            user: 'system'
          }
        ],
        accessDialog: false,
        authorDialog: false,
        cancelAuthorDialog: false,
        addDialog: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      addUser (){
        // this.authorDialog = false;
        this.addDialog = true;
      },
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
      tenantChange (idx){
        console.log(idx)
      },
      grpChange (proId){
        console.log(proId);
      },
      insChange (insId){
        console.log(insId);
      },
      onSubmit() {
        console.log('submit!');
      },
      handleAdd(index, row){
        this.addDialog = false;
        console.log(index, row);
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted() {
      // 用户授权
      this.$service.home.instanceManagement.getServUsageInfo().then(res => {
        this.serverList = res.resultDatabaseEntity;
      })
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../../assets/css/instanceManagement/instanceAuthority/index.less';
</style>
