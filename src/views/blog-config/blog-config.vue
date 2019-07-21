<template>
  <div>
    <div class="view-title">全局管理</div>
    <friend></friend>
  </div>
</template>

<script>
import Friend from './friend'

export default {
  components: {
    Friend
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.view-title {
  @include view-common-title;
}
</style>
