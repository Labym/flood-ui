<template>
  <div class="menu-wrapper">
    <template v-for="(item,index) in menu">
      <el-menu-item v-if="noChildren(item)" :index="filterPath(item.path,index)" @click="open(item)"
                    :key="item.name">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-else :index="filterPath(item.label,index)" :key="item.name">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title" :class="{'el-menu--display':isCollapse}">{{item.name}}</span>
        </template>
        <template v-for="(child,cindex) in item.children">
          <el-menu-item :index="filterPath(child.path,cindex)" @click="open(child)" v-if="noChildren(child)"
                        :key="cindex">
            <i :class="child.icon"></i>
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
          <sidebar-item v-else :menu="[child]" :key="cindex" :isCollapse="isCollapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
  import {resolveUrlPath} from '../../../util/util'
  import {isEmpty} from 'lodash'
  export default {
    name: 'SidebarItem',
    data () {
      return {}
    },
    props: {
      menu: {
        type: Array
      },
      isCollapse: {
        type: Boolean
      }
    },
    created () {
    },
    mounted () {
    },
    computed: {},
    methods: {
      noChildren (item) {
          return isEmpty(item.children)
      },
      filterPath (path, index) {
        return path == null ? index + '' : path
      },
      open (item) {
        this.$router.push({
          path: resolveUrlPath(item.path, item.name),
          query: item.query
        })
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
