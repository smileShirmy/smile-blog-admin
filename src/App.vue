<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      eventBus: new Vue
    }
  },

  provide() {
    return {
      eventBus: this.eventBus
    }
  },
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>

