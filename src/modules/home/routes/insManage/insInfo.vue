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
          <el-select v-model="project.text" placeholder="请选择项目" @change="typesChange(project.text)">
            <el-option v-for="(option,index) in project"
                       :value="option.id" :label="option.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实例ID">
          <el-select v-model="instance.text" placeholder="全部" @change="insChange(project.text)">
            <el-option v-for="(option,index) in instance" :value="option.id" :label="option.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="tenant-serve-list">
      <div v-for="(item,index) in insinfo" style="margin-bottom: 15px;">
        <el-row :gutter="20">
          <el-col :span="2">
            <img :src="require('../../../../assets/images/serviceimg/'+item.servname.toLowerCase()+'.png')" :onerror="logo" alt="" height="50">
          </el-col>
          <el-col :span="12">
            <div class="instance">
              <span>实例ID:</span>&nbsp;&nbsp;<span class="instance-data">{{ item.insid }}（使用中）</span>
            </div>
            <div class="hive">
              <span>存储空间:</span>&nbsp;&nbsp;<span class="number marginRight10">{{ item.param.storageSpaceQuota }}</span>
              <span>计算内存:</span>&nbsp;&nbsp;<span class="number marginRight10">{{ item.param.yarnQueueQuota }}</span>
              <span>付费类型:</span>&nbsp;&nbsp;<span class="number">{{ item.param.PayType}}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="instance">
              <span>创建时间:</span>&nbsp;&nbsp;<span class="instance-data">{{item.createDate }}</span>
            </div>
            <div class="hive">
              <span>到期时间:</span>&nbsp;&nbsp;<span class="number">{{item.expireDate }}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="instance detail">
              <a href="javascript:void(0);" @click="checkInfo(item.grp_id,item.grp_name)">访问信息</a>&nbsp;&nbsp;&nbsp;&nbsp;<a :href="item.servname | getTitleHref" target="_blank">开发指南</a>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="block marginTop15" v-if="typeShow == ''">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
    </div>
    <div class="block marginTop15" v-if="typeShow != ''">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="5"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10">
      </el-pagination>
    </div>
    <div class="accessInfo" v-if="dialogVisible">
      <div class="modal-header" style="padding:0px 15px;border-bottom: 1px solid #e5e5e5;">
        <h5 class="modal-title" style="height: 42px;line-height: 42px;">
          <span class="modal_name">访问信息</span>
          <a @click="cancel()" href="javascript:;" class="modal-close" style="margin-top: 12px;">
            <i class="el-icon-close"></i>
          </a>
        </h5>
      </div>
      <div class="modal-body">
        <div class="container-detail">
          <div>
            <div style="width: 100%;height: 480px;">
              <div class="well well-log" style="margin: 0;width: 100%;padding-left:0;padding-right:0;">
                <div style="color: #fff;padding:0 15px;overflow: auto;">
                  <div style="padding:2px 0px;word-break:break-all;word-wrap:break-word;">
                    qq&nbsp;:&nbsp;23wwq
                  </div>
                </div>
                <div style="color: #fff;padding:0 15px;overflow: auto;">
                  <div style="padding:2px 0px;word-break:break-all;word-wrap:break-word;">111&nbsp;:&nbsp;2wsdw</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" v-if="mask"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logo: 'this.src="' + require('../../../../assets/images/serviceimg/default.png') + '"',
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
        currentPage: 5,
        typeShow: '',
        dialogVisible: false,
        mask: false,
        insinfo:[]
      }
    },
    filters:{
      getTitleHref(val){
        let str = val.toLowerCase(),
          links={
            "hive":"https://help.c.citic/hc/kb/article/1162414/",
            "hdfs":"https://help.c.citic/hc/kb/article/1162348/",
            "kafka":"https://help.c.citic/hc/kb/article/1162417/",
            "spark":"https://help.c.citic/hc/kb/article/1162415/",
            "hbase":"https://help.c.citic/hc/kb/article/1162279/",
            "mapreduce":"https://help.c.citic/hc/kb/section/1059511/",
            "greenplum":"https://help.c.citic/hc/kb/section/1059511/",
          },link="https://help.c.citic/hc/kb/section/1059511/";
        if(links[str]){
          link=links[str];
        }
        return link;
      }
    },
    watch: {
      typeShow (newVal,oldVal){
        this.getData();
      }
    },
    methods: {
      checkInfo (insid,name){
        this.dialogVisible = true;
        this.mask = true;
      },
      cancel (){
        this.dialogVisible = false;
        this.mask = false;
      },
      getData(){
        this.typeShow = localStorage.getItem('renewal');
        // 判断 typeShow 是否有值，然后返回不同数据进行渲染页面
        if(this.typeShow == '' || this.typeShow == null || this.typeShow == 'undefined'){
          console.log("菜单栏进入")
          this.$service.home.instanceManagement.getSerInfo().then(res => {
            this.insinfo = res.insinfo;
          })
        }else{
          console.log("跳转后的")
          this.$service.home.instanceManagement.getRenewalList().then(res => {
            this.insinfo = res.insinfo;
          })
        }
      },
      clearRenewal (){
        localStorage.setItem('renewal','');
        this.typeShow = '';
        // location.reload()
      },
      tenantChange(id){
        this.selection = this.YX[id].children;
        this.clearRenewal();
      },
      grpChange(id){
        this.project = this.YX[id].children[id].children;
        this.clearRenewal();
      },
      typesChange (){
        this.instance = this.YX[id].children[id].children[id].children;
        this.clearRenewal();
      },
      insChange(id){
        this.instance = this.YX[id].children[id].children[id].children;
        this.clearRenewal();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      this.getData();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../../assets/css/instanceManagement/common/index.less';
</style>
