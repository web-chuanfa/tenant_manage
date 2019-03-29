<template>
  <div class="side-menu">
    <div class="menu bg-black">
      <ul class="menu-list">
        <li class="menu-item" v-for="(data,idx) in menuData" :key="idx" @click="jump(data)" :class="{active:data.resName===menuName}">
          <p @mouseover="updatSubMenudata(data.resName)" style="text-align: left;"><img :src="data.picUrl" height="20" style="position: relative;top: 5px;left: 20px;margin-right: 30px;">{{data.resName}}</p>
          <div class="sub-menu" v-if="subMenuData.length>0">
            <!--<div>-->
              <!--<ul v-for="(item,index) in subMenuData">-->
                <!--<li v-for="(subItem,index) in item.subResList">{{ subItem.resName }}</li>-->
              <!--</ul>-->
            <!--</div>-->
            <el-menu :default-active="active" :unique-opened="true" class="el-menu-vertical-demo">
              <menu-tree :tree-data="subMenuData"></menu-tree>
            </el-menu>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import menuTree from './menuTree'
import {mapGetters,mapActions} from 'vuex'
import menuPic from './menuPic'
import menuShow from './menuShow'
export default {
  name: 'menus',
  data () {
    return {
      active: '',
      openeds: [],
      menuData: [],
      menuPic: menuPic,
      menuShow: menuShow,
      visible: true,
      subMenuData: [],
      userData: []
    }
  },
  computed: {
    ...mapGetters(['menuName'])
  },
  components: {
    menuTree
  },
  methods: {
    ...mapActions(['upMenuname']),
    jump (data) {
      let url = data.subResList.length > 0 ? data.subResList[0].resUri : data.resUri
      this.upMenuname(data.resName)
      window.location.href = url
    },
    transformPathToMenu () {
      this.active = this.$route.fullPath
      this.$route.matched.forEach(ele => {
        if (this.active !== ele.path) {
          this.openeds.push(ele.path)
        }
      })
    },
    updatSubMenudata (name) {
      this.subMenuData = this.menuData.filter( item => {
        return item.resName == name
      })[0].subResList
    }
  },
  watch: {
    $route (nv) {
      this.upMenuname(nv.matched[0].meta.pathName);
      this.transformPathToMenu()
    }
  },
  mounted () {
    this.$service.auth().then(res => {
      this.userData = res;
      Vue.prototype.global = res;
      // 根据长度来判断角色 4 系统   3 租户  2 项目   1 项目成员
      if (this.userData.length === 4 || this.userData.length === 3) {
        this.menuData = this.menuShow.menuAdminData
      } else if (this.userData.length === 2) {
        this.menuData = this.menuShow.menuProjectData
      } else if (this.userData.length === 1) {
        this.menuData = this.menuShow.userData
      }
      for (let i=0, item; item=this.menuData[i++]; ) {
        item.picUrl = i === 6 ? this.menuPic[i - 1].pic2 : this.menuPic[i - 1].pic
      }
    });
    // this.transformPathToMenu()
    // 注释了
    // this.$service.getMenus().then(res => {
    //   this.menuData = res;
    //   for (let i=0, item; item=this.menuData[i++]; ) {
    //     item.picUrl = i === 6 ? this.menuPic[i - 1].pic2 : this.menuPic[i - 1].pic
    //   }
    // })
  }
}
</script>

<style lang="less">
  @import '../../assets/css/common/menu.less';
</style>
