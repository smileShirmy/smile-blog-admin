<template>
  <div class="navbar-container">
    <screenfull></screenfull>
    <div class="user-info">
      <span class="say-hi">{{author.name}}</span>
      <author></author>
    </div>
  </div>
</template>

<script>
import Screenfull from '@/components/base/screenfull'
import Author from '@/components/layout/author'
import { mapGetters } from 'vuex'

export default {
  components: {
    Screenfull,
    Author
  },

  computed: {
    ...mapGetters(['author'])
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

