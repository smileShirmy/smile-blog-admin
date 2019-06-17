<template>
  <div>
    <div class="view-title">用户列表</div>
    <div class="wrapper">
      <el-card>
        <el-table :data="userData" width="100%">
          <el-table-column prop="name" label="用户名"></el-table-column>
          <el-table-column label="操作" width="175">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: [
        {
          name: 'smile'
        },
        {
          name: 'shirmy'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.view-title {
  @include view-common-title;
}

.wrapper {
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;  
}

</style>
