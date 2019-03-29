<template>
  <div class="overview-container">
    <div class="filter-container">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="租户">
          <el-select v-model="YX.text" placeholder="请选择院系" @change="indexSelect(YX.text)">
            <el-option v-for="(option1,index) in YX"
                       :value="option1.id" :label="option1.text" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目">
          <el-select v-model="selection.text" placeholder="请选择专业" @change="indexMajor(selection.text)">
            <el-option v-for="(option,index) in selection"
                       :value="option.id" :label="option.text" :key="index" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="project.text" placeholder="请选择项目" @change="indexInstance(project.text)">
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
    <div class="block marginTop15">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        align="right"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
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
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        dialogVisible: false,
        mask: false,
        insinfo:[
          {
            "dfid":"26b55ebb-8355-11e8-8fe2-00163e0007e4",
            "insid": "2b47fd9d-46b0-43bb-bfc0-f4fc49c5f422",
            "grp_id": "13b40460-ad9d-4d02-adb6-828a3beb5595",
            "grp_name": "测试租户12",
            "insname": "Hive_201807091650_37cb9484-cae5-4f02-985a-577d6a8cb92a",
            "param":{
              "PayType": "Postpaid",
              "storageSpaceQuota": "32",
              "yarnQueueQuota": "16"
            },
            "servname": "Hive",
            "createDate": "2017-03-19 18:20:09",
            "expireDate": "2019-03-20 14:20:09"
          },
          {
            "dfid":"26b55ebb-8355-11e8-8fe2-00163e0007e4",
            "insid": "8b19b0d2-82ec-4b04-a323-7101abdf32e2",
            "grp_id": "8bc621e6-7f70-445e-b9d8-40fd8a805eaf",
            "grp_name": "测试租户3",
            "insname": "HDFS_201808241756_60ebf977-0c5e-4c07-8c71-1bd2ff10d126",
            "param":{
              "PayType": "Postpaid",
              "storageSpaceQuota": "1",
              "yarnQueueQuota": "1"
            },
            "servname": "HDFS",
            "createDate": "2017-07-19 14:20:09",
            "expireDate": "2019-08-20 14:30:12"
          },
          {
            "dfid":"26b55ebb-8355-11e8-8fe2-00163e0007e4",
            "insid": "a2f3a805-a893-47b5-9481-8cc3fe7de44c",
            "grp_id": "69d6ff63-3562-4377-b07c-2d1a939b6fca",
            "grp_name": "测试租户应用基线",
            "insname": "Greenplum_201807091513_d08c678e-c0b5-4b58-9a1c-f8acda623379",
            "param":{
              "PayType": "Postpaid",
              "storageSpaceQuota": "64",
              "yarnQueueQuota": "0"
            },
            "servname": "Greenplum",
            "createDate": "2017-08-19 14:20:09",
            "expireDate": "2019-02-20 14:40:29"
          }
        ]
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
    methods: {
      checkInfo (insid,name){
        this.dialogVisible = true;
        this.mask = true;
        // ubs/v1/bigdata/service_instances/info
        // dfname: HDFS_201806281746_78ffb948-16f8-4331-acc0-bf8afc0d7780
        // grpid: 5b34ae26fa9260000158e5e8
        console.log(insid);
      },
      cancel (){
        this.dialogVisible = false;
        this.mask = false;
        console.log("wqeds");
      },
      getData(){
        //接收到a.vue页面传递的id
        let id = this.$route.query.id;
        console.log(id);
        //在这里接收到id传给后台，返回不同数据进行渲染页面
        // this.axios.get('api',{
        // 	params:{
        //		id : id
        // 	}
        // })
        //.then((res)=>{
        //	console.log(res)
        //})
        //.catch((error)=>{
        //})
        // {'orgId':'723b7193-afd5-44af-813a-775461d123ab'}
      },
      indexSelect(id){
        this.selection = this.YX[id].children;
      },
      indexMajor(id){
        this.project = this.YX[id].children[id].children;
      },
      indexInstance(id){
        this.instance = this.YX[id].children[id].children[id].children;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    created(){
      this.$service.home.instanceManagement.getServUsageInfo().then(res => {
        console.log(res);
      })
      this.getData();
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../../assets/css/instanceManagement/common/index.less';
</style>
