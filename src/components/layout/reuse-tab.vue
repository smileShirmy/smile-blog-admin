<template>
  <div v-if="histories.length > 1">
    <swiper :options="swiperOption" class="reuse-tab-wrapper">
      <swiper-slide v-for="(item, index) in histories" :key="item.path">
        <router-link
          class="reuse-tab-item"
          :class="item.path === $route.path ? 'active' : ''"
          :to="item.path"
          @contextmenu.prevent.native="onTags">
          <i v-if="!filterIcon(stageList[item.stageId].icon)" :class="stageList[item.stageId].icon"></i>
          <span class="title">{{ stageList[item.stageId].title | filterTitle }}</span>
          <span class="el-icon-close" @click.prevent.stop="close(index)" />
        </router-link>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },

  inject: ['eventBus'],

  data() {
    return {
      histories: [],
      swiperOption: {
        slidesPerView: 'auto',
        initialSlide: 0,
        effect: 'slide',
        spaceBetween: 1,
        preventClicks: false,
        freeMode: true,
        mousewheel: {
          sensitivity: 1.5,
        },
      },
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

.swiper-slide {
  display: inline-block;
  height: 26px;
  line-height: 26px;
  text-align: center;
  background-color: $background-color-sidebar;
}

.reuse-tab-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2px;

  .reuse-tab-item {
    box-sizing: border-box;
    padding: 0 1em;
    font-size: $font-size-base;
    color: $font-color-gray;
    white-space: nowrap;

    .title {
      margin: 0 5px;
    }
  }

  .active {
    color: #fff;
  }
}
</style>
<style>
.swiper-wrapper {
  display: flex;
  justify-content: flex-start;
}
</style>
