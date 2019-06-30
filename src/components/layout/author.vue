<template>
  <div class="author">
    <el-dropdown>
      <i class="avatar-icon"></i>
      <el-dropdown-menu slot="dropdown" class="author-wrapper">
        <el-button @click="outLogin">登 出</el-button>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions(['loginOut']),

    outLogin() {
      this.loginOut()
      window.location.reload(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #eee;
    outline: none;
  }

  .author-wrapper {
    box-sizing: border-box;
    padding: 20px;
  }
</style>
