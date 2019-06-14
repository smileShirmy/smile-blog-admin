<template>
  <header class="header">
    <div class="left"></div>
    <div class="right">
      <screenfull></screenfull>
      <span class="author">西麦</span>
      <i class="avatar"></i>
    </div>  
  </header>
</template>

<script>
import Screenfull from '@/components/base/screenfull'

export default {
  components: {
    Screenfull
  }
  
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  color: $font-color-gray;
  background: $background-color-header;

  .right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .author {
      color: #fff;
      padding: 10px 20px;
      border-left: 1px solid #000;
    }

    .avatar {
      display: inline-block;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #bbb;
    }
  }
}
</style>
