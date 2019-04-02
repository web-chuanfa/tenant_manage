<template>
  <div class="overview-container">
    <div class="filter-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-select v-model="YX.text" placeholder="请选择用户名">
            <el-option v-for="(option1,index) in YX"
                       :value="option1.id" :label="option1.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作类型">
          <el-select v-model="YX.text" placeholder="请选择操作类型">
            <el-option v-for="(option,index) in YX"
                       :value="option.id" :label="option.text" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="操作范围">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="tenant-serve-list">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        style="width: 100%">
        <el-table-column
          prop="uname"
          label="用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="type"
          label="操作类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作时间">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="源IP">
        </el-table-column>
        <el-table-column
          prop="content"
          label="操作描述">
        </el-table-column>
      </el-table>
    </div>
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
    data() {
      return {
        input: '',
        YX:[
          {
            text:'计信院',
            id: 0,
            children:[
              { text:'软件工程',
                id: 0,
                children:[
                  {
                    text:'软件工程项目1',
                    id: 0,
                    children: [
                      {
                        text:'软件工程实例1-1',
                        id: 0
                      },
                      {
                        text:'软件工程实例1-2',
                        id: 1
                      }
                    ]
                  },
                  { text:"软件工程项目2",
                    id: 1,
                    children: [
                      {
                        text:'软件工程实例2-1',
                        id: 0
                      },
                      {
                        text:'软件工程实例2-2',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text:'计算机科学与技术',
                id: 1,
                children:[
                  {
                    text:'计算机科学项目1',
                    id: 0,
                    children: [
                      {
                        text:'计算机科学实例1-1',
                        id: 0
                      },
                      {
                        text:'计算机科学实例1-1',
                        id: 1
                      }
                    ]
                  },
                  { text:"计算机科学项目2",
                    id: 1,
                    children: [
                      {
                        text:'计算机科学实例2-1',
                        id: 0
                      },
                      {
                        text:'计算机科学实例2-1',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              { text:"信息安全",
                id: 2,
                children:[
                  {
                    text:'信息安全项目1',
                    id: 0,
                    children: [
                      {
                        text:'信息安全实例1-1',
                        id: 0
                      },
                      {
                        text:'信息安全实例1-2',
                        id: 1
                      }
                    ]
                  },
                  { text:"信息安全项目2",
                    id: 1,
                    children: [
                      {
                        text:'信息安全实例2-1',
                        id: 0
                      },
                      {
                        text:'信息安全实例2-1',
                        id: 1
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            text:'商学院',
            id: 1,
            children:[
              {
                text:'旅游管理',
                id: 0,
                children: [
                  {
                    text:'旅游管理项目1',
                    id: 0,
                    children: [
                      {
                        text:'旅游管理实例1-1',
                        id: 0
                      },
                      {
                        text:'旅游管理实例1-2',
                        id: 1
                      }
                    ]
                  },
                  { text:"旅游管理项目2",
                    id: 1,
                    children: [
                      {
                        text:'旅游管理实例2-1',
                        id: 0
                      },
                      {
                        text:'旅游管理实例2-2',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text:'工商管理',
                id: 1,
                children: [
                  {
                    text:'工商管理项目1',
                    id: 0,
                    children: [
                      {
                        text:'工商管理实例1-1',
                        id: 0
                      },
                      {
                        text:'工商管理实例1-2',
                        id: 1
                      }
                    ]
                  },
                  { text:"工商管理项目2",
                    id: 1,
                    children: [
                      {
                        text:'工商管理实例2-1',
                        id: 0
                      },
                      {
                        text:'工商管理实例2-1',
                        id: 1
                      }
                    ]
                  }
                ]
              },
              {
                text:"行政管理",
                id: 2,
                children: [
                  {
                    text:'行政管理项目1',
                    id: 0,
                    children: [
                      {
                        text:'行政管理实例1-1',
                        id: 0
                      },
                      {
                        text:'工商管理实例1-2',
                        id: 1
                      }
                    ]
                  },
                  { text:"行政管理项目2",
                    pr_id: 1,
                    children: [
                      {
                        text:'行政管理实例2-1',
                        id: 0
                      },
                      {
                        text:'工商管理实例2-2',
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
        formInline: {
          user: '',
          region: ''
        },
        dateRange: '',
        currentPage: 1,
        pageSize: 10,
        currentTotal: 0,
        tableData: []
      }
    },
    watch: {
      dateRange (){
        console.log(this.dateRange)
      }
    },
    created (){
      // 审计日志列表
      this.$service.home.auditLog.getLogList().then(res => {
        this.tableData = res.auditInfos.info;
      });
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../../assets/css/auditLog/index.less';
</style>
