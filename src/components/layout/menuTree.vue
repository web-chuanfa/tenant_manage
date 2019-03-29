<template>
  <div>
    <div v-for="data in treeData" :key="data.resName" >
      <el-submenu  v-if="data.subResList && data.subResList.length>0" :index="data.resUri.split('#')[1]">
          <!--<i class="menu-l"></i>-->
        <span slot="title" @click.stop="menuChange(data.resUri)">{{data.resName}}</span>
        <template v-if="data.subResList && data.subResList.length>0" >
          <menu-tree :tree-data="data.subResList"></menu-tree>
        </template>
      </el-submenu>
      <el-menu-item v-else :index="data.resUri.split('#')[1]" :class="{'is-active': $route.path == data.resUri.split('#')[1] }">
        <!--<i class="menu-l"></i>-->
        <span slot="title" @click.stop="menuChange(data.resUri)">{{data.resName}}</span>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  inject: ['rootMenu'],
  name: 'menuTree',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['menuName'])
  },
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    menuChange (path) {
      localStorage.setItem('renewal','');
      if (path.indexOf('#') !== -1 && path.indexOf('.index') === -1) {
        this.$router.push(path.split('#')[1])
      } else {
        window.location.href = path
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
a { color: red}
.el-submenu,
.el-submenu .el-menu-item,
.el-menu-item, .el-submenu__title {
  height: 45px;
  line-height: 45px;
}
.menu-l {
  background: #999 none repeat scroll 0 0;
  border-radius: 2px;
  display: inline-block;
  height: 16px;
  width: 3px;
}
</style>
