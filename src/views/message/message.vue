<template>
  <div class="container">
    <div class="view-title">留言管理</div>
    <el-card class="wrapper">
      <el-table :data="messages">
        <el-table-column prop="name" label="名字" width="120"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="time" label="时间" width="170"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteMessage(scope.row)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          id: 1,
          name: 'name',
          content: 'content',
          time: '2019-06-20 23:33:33'
        },
        {
          id: 2,
          name: 'name',
          content: 'content',
          time: '2019-06-20 23:33:33'
        },
      ]
    }
  },

  methods: {
    deleteMessage() {
      this.$confirm('此操作将永久删除这条留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
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
  margin: 20px 30px;
}
</style>
