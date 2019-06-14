<template>
  <div class="home">
    <el-container class="home-container">
      <el-header class="header">Header</el-header>
      <el-container>
        <el-aside class="aside" width="170px">
          <sidebar></sidebar>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Sidebar } from '@/components/layout'

export default {
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.home {
  height: 100%;
}

.home-container {
  height: 100%;

  .header {
    background: $background-color-header;
  }

  .aside {
    background-color: $background-color-sidebar;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }

  .main {
    background-color: $background-color-main;
  }
}


</style>
