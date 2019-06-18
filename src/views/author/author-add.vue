<template>
  <div>
    <div class="view-title">新增作者</div>
    <div class="wrapper">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <author-info></author-info>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import AuthorInfo from './author-info'

export default {
  components: {
    AuthorInfo
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";

.view-title {
  @include view-common-title;
}

.wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;
}
</style>
