<template>
  <div class="navbar-container">
    <screenfull></screenfull>
    <div class="user-info">
      <span class="say-hi">smile</span>
      <author></author>
    </div>
  </div>
</template>

<script>
import Screenfull from '@/components/base/screenfull'
import Author from '@/components/layout/author'

export default {
  components: {
    Screenfull,
    Author
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
}
</style>

