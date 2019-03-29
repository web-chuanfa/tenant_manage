<template>
  <div class="overview-container">
    <div class="filter-container" style="margin-bottom: 5px;">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="租户">
          <el-select placeholder="全部" v-model="tenant.orgId" @change="tenantChange(tenant.orgId)">
            <el-option v-for="(item,index) in tenant" :value="item.orgId" :label="item.orgName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-select placeholder="全部" v-model="project.grpId" @change="grpChange(project.grpId)">
            <el-option v-for="(item,index) in project" :value="item.grpId" :label="item.grpName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select placeholder="全部" v-model="types.servId" @change="insChange(types.servId)">
            <el-option v-for="(item,index) in types" :value="item.servId" :label="item.servType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实例ID">
          <el-select placeholder="全部" v-model="instance.insId">
            <el-option v-for="(item,index) in instance" :value="item.insId" :label="item.insId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="tenant-serve-refresh">
      <el-button type="primary"><i class="el-icon-refresh"></i> 刷新</el-button>
    </div>
    <div class="tenant-serve-list">
      <div class="tenant-serve-item" v-for="(item,index) in serverList">
        <el-row :gutter="20">
          <el-col :span="2">
            <img src="../../../../assets/images/serviceimg/hive.png" alt="" height="50">
          </el-col>
          <el-col :span="9">
            <div class="instance marginTop15">
              <span>实例ID:</span>&nbsp;&nbsp;<span class="instance-data">{{ item.insId }}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="instance idleness">
              <el-progress type="circle" :width="circleWidth" :stroke-width="radius" :percentage="parseInt(item.percentAge)" color="#ff9359"></el-progress>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="instance marginTop15 dosageTotal">
              <span>已用量:</span>&nbsp;&nbsp;<span class="dosage marginRight30">{{ item.actUsedSize }}G</span>
              <span>剩余量:</span>&nbsp;&nbsp;<span class="dosage">{{ item.purSize }}G</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="instance marginTop8">
              <el-button type="primary">变配</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="block marginTop15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="100"
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
        tenant: [],
        project: [],
        types: [],
        instance: [],
        serverList: [],
        radius: 6,
        circleWidth: 45,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    methods: {
      getData (){
        // {"orgId":"723b7193-afd5-44af-813a-775461d123ab"}
        this.$service.home.instanceManagement.getServUsageInfo().then(res => {
          this.serverList = res.resultDatabaseEntity;
        })
      },
      tenantChange (idx){
        let obj = {};
        obj = this.tenant.find((item) => { //这里的tenant就是上面遍历的数据源
          return item.orgId === idx; //筛选出匹配数据
        });
        this.project = obj.resultGrpEntityList;
        // console.log(obj.resultGrpEntity);
      },
      grpChange (proId){
        let proObj = {};
        proObj = this.project.find((item) => { //这里的tenant就是上面遍历的数据源
          return item.grpId === proId; //筛选出匹配数据
        });
        this.types = proObj.resultServTypeEntityList;
        // console.log(proObj);
      },
      insChange (insId){
        let insObj = {};
        insObj = this.types.find((item) => { //这里的tenant就是上面遍历的数据源
          return item.servId === insId; //筛选出匹配数据
        });
        this.instance = insObj.resultInsEntityList;
        console.log(insObj);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    created(){
      this.getData();
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../assets/css/instanceManagement/useReport/index.less';
</style>
