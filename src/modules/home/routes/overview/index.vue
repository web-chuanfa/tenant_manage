<template>
  <div class="overview-container">
    <div class="panel-group">
      <div class="card-panel-col">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="card-panel tenant-count" @mouseenter="onMouseOver" @mouseleave="onMoueout" :class="{ active : isActive}" style="margin-right: 0px;">
              <div class="tenant-show" v-if="isShow">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="card-panel-project">
                      <div class="card-panel-icon-wrapper">
                        {{ orgsPrivs.length || 0 }}
                      </div>
                      <div class="card-panel-description">我的租户</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="card-panel-project last">
                      <div class="card-panel-icon-wrapper">{{ orgsPrivsCount }}</div>
                      <div class="card-panel-description">我的项目</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="card-count" v-if="isOrgData">
                <div class="title">
                  所属组织：
                </div>
                <ul>
                  <li v-for='(item,index) in orgsPrivs'>
                    <p v-for='(itemGrp,index) in item.grpsPrivs'>{{ itemGrp.org_name }}-{{ itemGrp.grp_name}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
             <div class="card-panel" v-cloak style="margin-left: 0px;">
              <p>待办事项</p>
              <div class="card-panel-item" @mouseenter="onMouseOverRenew" @mouseleave="onMoueoutRenew" @click="reNew">
                <span class="text-title">续费</span><span>{{ nenew }}</span>
              </div>
              <div class="card-panel-item" @mouseenter="onMouseOverMatch" @mouseleave="onMoueoutMatch" @click="variableMatch">
                <span class="text-title">变配</span><span>{{ match }}</span>
              </div>
              <div class="renew" v-if="isShowRenew">{{ nenewTip }}</div>
              <div class="match" v-if="isShowMatch">{{ matchTip }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="card-panel-mar marginLeft20"></div>
      <div class="card-panel-col">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="card-panel last">
              <p style="padding-left: 10px;padding-top: 5px;padding-bottom: 10px;">公告</p>
              <div id="news-item">
                <ul id="marquee_list" ref="marquee_list"  :class="{anim:animate==true}">
                  <li v-for='item in news'>
                    <a :href="item.url" target="_blank">{{item.titile}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="panel-modules">
      <el-row :gutter="24">
        <el-col :span="14">
          <div class="panel-instance">
            <div class="title">我的实例</div>
            <div class="content">
              <div class="item-instance" v-for="(item,index) in insinfo">
                <div class="item-instance-title">{{ item.tit }}</div>
                <div class="item-instance-arrImgs">
                  <div class="item-instance-img" v-for="(itemKey,index) in item.storageResource">
                    <div class="item-key-show">
                      <img :src="require('../../../../assets/images/serviceimg/'+itemKey.servname.toLowerCase()+'.png')" @click="insInfo(itemKey.insid)" alt="">
                    </div>
                    <div class="item-key-number">{{ itemKey.count }}</div>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="panel-service">
            <div class="title">我的服务</div>
            <div class="content">
              <div class="item-service" v-for="(item,index) in serviceinfo">
                <div class="item-service-title">{{ item.tit }}</div>
                <div class="item-service-arrImgs">
                  <div class="item-service-img" v-for="(itemService,index) in item.storageResource">
                    <div class="item-key-show">
                      <img :src="require('../../../../assets/images/serviceimg/'+itemService.servname.toLowerCase()+'.png')" @click="insInfo(itemService.insid)" alt="">
                    </div>
                    <div class="item-key-number">{{ itemService.count }}</div>
                  </div>
                  <div style="clear: both"></div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
export default {
  name: 'overview',
  data () {
    return {
      ckeckVal: false,
      id: '10001111',
      isShow: true,
      isOrgData: false,
      isActive: false,
      isShowRenew: false,
      isShowMatch: false,
      animate: false,
      news: [],
      checkOne: [1, 2, 3],
      userPrivsCount: 0,
      orgsPrivsCount: 0,
      orgsPrivs: [],
      nenew: '10',
      nenewTip: '实例7天后即将到期',
      match: '8',
      matchTip: '资源用量已超90%',
      insinfo: [],
      serviceinfo: []
    }
  },
  created () {
    setInterval(this.scroll, 2500);
    // 测试登陆sso userid=20180808112510707-9031-F790CF0ED
    // this.$service.home.overview.getSso().then(res => {
    //   console.log("1222");
    // });
    // 测试菜单
    // this.$service.home.overview.getPrivs({'userid':'20181019101535041-7F9B-46F12E9AA'}).then(res => {
    //   console.log(this.$service.home);
    // });
    // 测试模块用户
    this.$service.home.overview.geTall().then(res => {
      // console.log(res)
    })
    // 概览新闻
    this.$service.home.overview.getNews().then(res => {
      this.news = res
    })
    // 所属组织
    this.$service.home.overview.getOrgsPrivs().then(res => {
      this.orgsPrivs = res.orgsPrivs
    })
    // 我的实例
    this.$service.home.overview.getInsInfo().then(res => {
      this.insinfo = res.insinfo
    })
    // 我的服务
    this.$service.home.overview.getServiceInfo().then(res => {
      this.serviceinfo = res.serviceinfo
    })
    // 我的项目总数
    for (let i = 0, item; item = this.orgsPrivs[i++];) {
      this.orgsPrivsCount += parseInt(item.grpsPrivs.length)
    }
  },
  methods: {
    insInfo (name) {
      console.log(name)
    },
    onMouseOver () {
      this.isShow = false
      this.isOrgData = true
    },
    onMoueout () {
      this.isShow = true
      this.isOrgData = false
    },
    onMouseOverRenew () {
      this.isShowRenew = true
    },
    onMoueoutRenew () {
      this.isShowRenew = false
    },
    onMouseOverMatch () {
      this.isShowMatch = true
    },
    onMoueoutMatch () {
      this.isShowMatch = false
    },
    scroll () {
      this.animate = true
      setTimeout(() => {
        this.news.push(this.news[0]);
        this.news.shift()
        this.animate = false // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 1500)
    },
    reNew () {
      this.$router.push({
        name: 'insManage',
        params: {'type': 'wed'}
      });
      localStorage.setItem('renewal',this.$route.params.type)
    },
    variableMatch () {
      this.$router.push({path: '/insManage/useReport', params: { 'type': 'ddw' }})
    }
  }
}
</script>
<style rel="stylesheet/less" lang="less" scoped>
  @import '../../../../assets/css/overview/index.less';
</style>
