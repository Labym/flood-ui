<template>
  <div class="tags-container">
    <!-- tag盒子 -->
    <div class="tags-box" ref="tagBox">
      <div class="tags-list" ref="tagsList" >
        <div ref="tagsPageOpened" class="tag-item" :class="{'is-active':nowTagValue==item.value}" :name="item.value"  v-for="(item,index) in tagList" :key="index" >
          <span class="icon-yuan tag-item-icon"></span>
          <span class="tag-text">{{item.label}}</span>
          <i class="el-icon-close tag-close"  v-if="item.close"></i>
        </div>
      </div>
      <el-dropdown class="tags-menu pull-right">
        <el-button type="primary" size="mini">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >关闭其他</el-dropdown-item>
          <el-dropdown-item >关闭全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
          <li @click="closeTag(selectedTag)">关闭</li>
          <li @click="closeOthersTags">关闭其他</li>
          <li @click="closeAllTags">关闭全部</li>
        </ul> -->
  </div>
</template>
<script>
  /* eslint-disable one-var,eqeqeq,no-unused-vars */

  import { resolveUrlPath, setUrlPath } from '@/util/util'
  import { mapGetters } from 'vuex'
  export default {
    name: 'tags',
    data () {
      return {
        visible: false,
        tagBodyLeft: 0,
        lock: false,
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        top: 0,
        left: 0,
        selectedTag: {}
      }
    },
    created () {},
    mounted () {
      this.init()
    },
    watch: {
      $route (to) {
        this.init()
      },
      visible (value) {
        if (value) {
          document.body.addEventListener('click', this.closeMenu)
        } else {
          document.body.removeEventListener('click', this.closeMenu)
        }
      },
      tagBodyLeft (value) {
        this.$refs.tagsList.style.left = value + 'px'
      }
    },
    computed: {
      ...mapGetters(['tagWel', 'tagList', 'isCollapse', 'tag']),
      nowTagValue: function () {
        return setUrlPath(this.$route)
      },
      tagListNum: function () {
        return this.tagList.length != 0
      }
    },
    methods: {
      init () {}
    }
  }
</script>
<style lang="scss" scoped>

</style>
