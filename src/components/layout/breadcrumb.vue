<template>
  <div class="nav-title">
    <a
      class="item"
      v-for="(item, index) in titleArr"
      style="cursor: default;"
      :key="index">
      <p>{{item}}</p>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    stageInfo() {
      return this.$store.getters.getStageInfo(this.$route.name)
    },
    titleArr() {
      return this.stageInfo.map(item => item.title).filter(item => !!item)
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

.nav-title {
  display: flex;
  align-items: center;
  font-size: 14px;

  .item {
    color: $font-color-gray;

    i {
      margin-right: 4px;
    }

    display: flex;
    align-items: center;
    padding-right: 18px;
    position: relative;

    &:after {
      content: "/";
      position: absolute;
      top: 0;
      right: 6px;
    }
  }

  .item:last-child {
    padding-right: 0;

    &:after {
      content: "";
    }
  }
}
</style>
