<template>
  <div class="bg-black header">
    <img :src="appUrl.Data_address+'/resources2.0/images/logo-white.png'" style="float: left;margin: 8px 0 0 40px;" height="40" alt="">
    <h1 class="logo" style="margin-left: 40px;">大数据</h1>
    <div class="login-box">
      <div class="keyTab">
        <div @mouseenter="onMouseOverKeyTab" @mouseleave="onMoueoutKeyTab" :class="{ active : isActive}">keytab管理</div>
        <ul v-if="isKeyShow" @mouseenter="onMouseOverKeyTab" @mouseleave="onMoueoutKeyTab">
          <li>
            <a href="javascript:;" @click="downloadUser">下载用户keytab</a>
          </li>
          <li>
            <a href="javascript:;" @click="updateUser">更新用户keytab</a>
          </li>
          <li v-if="global.length != 1">
            <a href="javascript:;" @click="downloadPro">下载项目keytab</a>
          </li>
          <li v-if="global.length != 1">
            <a href="javascript:;" @click="updateProject">更新项目keytab</a>
          </li>
        </ul>
      </div>
      <div class="support-box">
        <div @mouseenter="onMouseOver" @mouseleave="onMoueout" :class="{ active : isActiveSupport}">帮助与支持</div>
        <ul v-if="isShow" @mouseenter="onMouseOver" @mouseleave="onMoueout">
          <li>
            <a href="https://help.c.citic/hc/kb/article/1162413/" target="_blank">环境准备</a>
          </li>
          <li>
            <a :href="appUrl.server_address+'/citic-web-ui/'" target="_blank">开发指南</a>
          </li>
          <li>
            <a href="https://help.c.citic/hc/kb/article/1162239/" target="_blank">Kerberos认证</a>
          </li>
          <li>
            <a href="http://10.247.32.37/citic/1.at" target="_blank">提交建议</a>
          </li>
        </ul>
      </div>
      <div class="logined">
        <div @mouseenter="signoutMouse" @mouseleave="signoutMoueout" :class="{ active : isActiveSignout}">宋亚伟</div>
        <div @click="signOut" class="signOut" @mouseenter="signoutMouse" v-if="isSignOut" @mouseleave="signoutMoueout">
          <img src="../../assets/images/loginOut.png" alt="">
          退出
        </div>
      </div>
      <!--<p class="btn" @click="loginout">退出</p>-->
    </div>
    <div class="downloadUser" v-if="usDialogVisible">
      <div class="content"><i class="el-icon-question"></i>确认下载 {{username}}.keytab文件吗?</div>
      <div class="footer marginTop30">
        <el-button class="marginRight10" @click="usCancel">取消</el-button>
        <el-button type="primary" @click="usDownLoad">确认</el-button>
      </div>
    </div>
    <div class="downloadUser" v-if="updateDialogVisible">
      <div class="content"><i class="el-icon-question"></i>更新会导致原{{username}}.keytab失效，确认更新并下载该文件吗?</div>
      <div class="footer">
        <el-button class="marginRight10" @click="updateCancel">取消</el-button>
        <el-button type="primary" @click="updateKey">确认</el-button>
      </div>
    </div>
    <div class="downloadProject" v-if="downloadProDialog">
      <div class="dheader"><i class="el-icon-question"></i>首次下载才支持自定义keytab文件名</div>
      <div class="content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="租户">
            <el-select placeholder="请选择院系" v-model="formInline.name" class="w160">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-select placeholder="请选择专业" v-model="formInline.name" class="w160">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="keytab文件名">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer">
        <el-button class="marginRight10" @click="downloadProCancel">取消</el-button>
        <el-button type="primary" @click="downloadProKey">确认</el-button>
      </div>
    </div>
    <div class="downloadProject updateProject" v-if="updateProjectDialog">
      <div class="dheader"><i class="el-icon-question"></i>更新会失效原项目keytab文件，确认更新吗？</div>
      <div class="content">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="租户">
            <el-select placeholder="请选择院系" v-model="formInline.name" class="w160">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目">
            <el-select placeholder="请选择专业" v-model="formInline.name" class="w160">
              <el-option label="区域一" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer marginTop10">
        <el-button class="marginRight10" @click="updateProCancel">取消</el-button>
        <el-button type="primary" @click="updateProKey">更新</el-button>
      </div>
    </div>
    <div class="mask" v-if="mask"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import App from '../../api'
import cookie from 'js-cookie'
export default {
  name: 'top',
  data () {
    return {
      msg: '欢迎来到多租户管控平台',
      isShow: false,
      isKeyShow: false,
      isActive: false,
      isActiveSupport: false,
      isActiveSignout: false,
      username: "songyawei",
      usDialogVisible: false,
      updateDialogVisible: false,
      updateProjectDialog: false,
      downloadProDialog: false,
      mask: false,
      formInline: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      isSignOut: false,
      appUrl: App
    }
  },
  methods: {
    downloadPro (){
      this.downloadProDialog = true;
      this.mask = true;
    },
    downloadProCancel (){
      this.downloadProDialog = false;
      this.mask = false;
    },
    downloadProKey (){
      this.downloadProDialog = false;
      this.mask = false;
    },
    updateProKey () {
      this.updateProjectDialog = false;
      this.mask = false;
    },
    updateProCancel (){
      this.updateProjectDialog = false;
      this.mask = false;
    },
    updateProject (){
      this.updateProjectDialog = true;
      this.mask = true;
    },
    downloadUser () {
      this.usDialogVisible = true;
      this.mask = true;
    },
    usCancel () {
      this.usDialogVisible = false;
      this.mask = false;
    },
    usDownLoad () {
      this.usDialogVisible = false;
      this.mask = false;
    },
    updateUser () {
      this.updateDialogVisible = true;
      this.mask = true;
    },
    updateCancel () {
      this.updateDialogVisible = false;
      this.mask = false;
    },
    updateKey () {
      this.updateDialogVisible = false;
      this.mask = false;
    },
    signOut () {
      this.$service.login.logout()
        .then(res => {
          cookie.set('tenantId', '');
          cookie.set('userid', '');
          cookie.set('username', '');
        })
      // this.$utils.clearCookie('aut')
      // if (Vue.config.productionTip) {
      //   this.$router.push('http://cms.biyao.com/index.html')
      // }else {
      //   this.$router.push('http://cms.biyao.com/index.html')
      // }
    },
    onMouseOver () {
      this.isShow = true
      this.isActiveSupport = true
    },
    onMoueout () {
      this.isShow = false
      this.isActiveSupport = false
    },
    signoutMouse (){
      this.isSignOut = true
      this.isActiveSignout = true
    },
    signoutMoueout (){
      this.isSignOut = false
      this.isActiveSignout = false
    },
    onMouseOverKeyTab () {
      this.isKeyShow = true
      this.isActive = true
    },
    onMoueoutKeyTab () {
      this.isKeyShow = false
      this.isActive = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../assets/css/common/top.less';
</style>
