<template>
  <div class="sidebar">
    <div class="logo">Admin</div> 
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="defaultActive"
      :collapse="isCollapse"
      background-color="#333"
      text-color="#bbb"
      active-text-color="#fff"
      >
      <template v-for="item in sideBarList">
        <el-submenu
          v-if="item.children"
          :key="idMap[item.name]"
          :index="idMap[item.name]">
          <template
            slot="title">
            <i v-if="!filterIcon(item.icon)" :class="item.icon"></i>
            <img v-else :src="item.icon" class="imgIcon" />
            <span slot="title">{{item.title}}</span>
          </template>

          <!--二级菜单 -->
          <template v-for="(subItem) in item.children">
            <el-submenu
              v-if="subItem.children"
              :key="idMap[subItem.name]"
              :index="idMap[subItem.name]">
              <template slot="title">
                <i></i>
                <span slot="title">{{subItem.title}}</span>
              </template>

              <!-- 三级菜单 -->
              <router-link
                v-for="(grandchildItem) in subItem.children"
                :key="idMap[grandchildItem.name]"
                :to="grandchildItem.path"
                class="circle third">
                <el-menu-item :index="idMap[grandchildItem.name]" style="padding-left: 80px;">
                  <span>{{grandchildItem.title}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>

            <!-- 二级菜单 else -->
              <router-link
                :to="subItem.path"
                :key="subItem.name"
                class="circle"
                v-else>
                <el-menu-item :index="idMap[subItem.name]" style="padding-left: 60px;">
                  <span>{{subItem.title}}</span>
                </el-menu-item>
              </router-link>

          </template>
        </el-submenu>

        <!-- 一级菜单 else -->
        <el-menu-item
          v-else
          :index="idMap[item.name]"
          @click="goto(item.path)"
          :key="idMap[item.name]"
          >
          <i v-if="!filterIcon(item.icon)" :class="item.icon"></i>
          <img v-else :src="item.icon" class="imgIcon" />
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import Utils from '@/services/utils/util'
import { mapGetters } from 'vuex'

export default {
  props: {
    isCollapse: Boolean
  },

  computed: {
    defaultActive() {
      for (let i = (this.stageInfo.length - 1); i >= 0; i -= 1) {
        if (this.idMap[this.stageInfo[i].name]) {
          return this.idMap[this.stageInfo[i].name]
        }
      }
      return ''
    },

    stageInfo() {
      return this.$store.getters.getStageInfo(this.$route.name)
    },

    // 由于index不支持symbol格式, 因此使用 idMap 进行映射
    idMap() {
      const { sideBarList } = this
      const mapData = {}
      const deepTravel = (obj, func) => {
        if (Array.isArray(obj)) {
          obj.forEach((item) => {
            deepTravel(item, func)
          })
          return
        }
        if (obj && obj.children) {
          func(obj)
          deepTravel(obj.children, func)
          return
        }
        if (obj.name) {
          func(obj)
        }
      }
      deepTravel(sideBarList, (item) => {
        mapData[item.name] = Utils.getRandomStr()
      })

      return mapData
    },

    ...mapGetters([
      'sideBarList'
    ]),
  },

  methods: {
    goto(path) {
      this.$router.push({
        path,
      })
    },

    filterIcon(icon) {
      return icon.indexOf('/') !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  font-size: $font-size-extra-large;
  letter-spacing: 1px;
  color: #fff;
}
</style>
