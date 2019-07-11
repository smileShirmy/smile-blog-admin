<template>
  <div v-if="histories.length > 1">
    <ul class="reuse-tab-wrapper">
      <li class="reuse-tab-item" v-for="(item, index) in histories" :key="item.path">
        <router-link
          class="reuse-tab-link"
          :class="item.path === $route.path ? 'active' : ''"
          :to="item.path"
          @contextmenu.prevent.native="onTags">
          <i v-if="!filterIcon(stageList[item.stageId].icon)" :class="stageList[item.stageId].icon"></i>
          <span class="title">{{ stageList[item.stageId].title | filterTitle }}</span>
          <span class="el-icon-close" @click.prevent.stop="close(index)" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  inject: ['eventBus'],

  data() {
    return {
      histories: [],
    }
  },

  watch: {
    $route(to) {
      // 对路由变化作出响应
      const { histories } = this
      const flag = histories.find(item => (item.path === to.path))
      if (flag) {
        return
      }
      const ele = {}
      ele.stageId = to.name
      ele.path = to.path
      ele.routePath = to.matched[to.matched.length - 1].path
      this.histories = [ele, ...histories]
    },

    histories(arr) {
      if (arr.length < 2) {
        this.eventBus.$emit('noReuse')
      } else {
        this.eventBus.$emit('hasReuse')
      }
    },
  },

  computed: {
    defaultRoute() {
      return this.$store.state.defaultRoute
    },

    ...mapGetters([
      'getStageByRoute',
      'getStageByName',
      'stageList'
    ]),
  },

  methods: {
    init() {
      const histories = []

      // 获取当前的历史记录, 可能从本地存储, 可能直接获取当前的
      let localHistory
      if (this.histories.length > 0) {
        localHistory = [...this.histories]
      } else {
        localHistory = window.localStorage.getItem('history') || '[]'
        localHistory = JSON.parse(localHistory)
      }

      localHistory.forEach((item) => {
        let findResult
        if (item.name) {
          findResult = this.getStageByName(item.name)
        } else {
          findResult = this.getStageByRoute(item.routePath)
        }
        if (!findResult) {
          return
        }
        histories.push({
          ...item,
          stageId: findResult.name,
        })
        this.histories = histories
      })
    },

    filterIcon(icon) {
      if (!icon) {
        return false
      }
      return icon.indexOf('/') !== -1
    },

    close(index) {
      // 检测是否是当前页, 如果是当前页则自动切换路由
      if (this.$route.path === this.histories[index].path) {
        if (index > 0) {
          this.$router.push(this.histories[index - 1].path)
        } else if (this.histories.length > 1) {
          this.$router.push(this.histories[1].path)
        } else {
          this.$router.push(this.defaultRoute)
        }
      }
      // 删除该历史记录
      this.histories.splice(index, 1)
      this.histories = [...this.histories]
    },
  },

  created() {
    window.onbeforeunload = () => {
      // 缓存历史记录
      window.localStorage.setItem('history', JSON.stringify(this.histories))
    }
  },

  mounted() {
    this.init()
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.reuse-tab-wrapper {
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  height: 25px;
  
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .reuse-tab-item {
    margin-right: 1px;

    &:last-child {
      margin-right: 0;
    }
  }

  .reuse-tab-link {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 25px;
    padding: 0 1em;
    font-size: $font-size-base;
    color: $font-color-gray;
    background-color: $theme-primary;
    white-space: nowrap;

    .title {
      margin: 0 5px;
    }
  }

  .active {
    color: $theme-primary;
    background-color: $reuse-tab-bg;
  }
}
</style>
