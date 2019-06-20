<template>
  <div class="navbar-container">
    <screenfull></screenfull>
    <div class="user-info">
      <span class="say-hi">smile</span>
      <i class="avatar-icon"></i>
    </div>
  </div>
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

.navbar-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: $font-color-gray;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;

  .say-hi {
    margin-right: 20px;
  }

  .avatar-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    background: #eee;
  }
}
</style>

