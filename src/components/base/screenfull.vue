<template>
  <div class="container">
    <i :class="[isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen', 'icon']" @click="handleFullScreen"></i>
  </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
  data() {
    return {
      isFullscreen: false,
    }
  },

  methods: {
    handleFullScreen() {
      if (!screenfull.enabled) {
        this.$message({
          message: '你的浏览器无法全屏',
          type: 'warning',
        })
        return false
      }
      screenfull.toggle()
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    init() {
      if (screenfull.enabled) {
        screenfull.on('change', this.change)
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off('change', this.change)
      }
    },
  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    this.destroy()
  },
}
</script>

<style scoped lang="scss">
.container {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  i {
    width: 40px;
    height: 40px;
    font-size: 26px;
    &:before {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
