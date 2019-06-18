<template>
  <div>
    <div class="view-title">作者列表</div>
    <div class="wrapper">
      <el-card>
        <el-table :data="userData" width="100%">
          <el-table-column prop="name" label="作者名"></el-table-column>
          <el-table-column label="操作" width="175">
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteAuthor">删除</el-button>
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
  },
  
  methods: {
    deleteAuthor() {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
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
  box-sizing: border-box;
  width: 100%;
  padding: 20px 30px;  
}

</style>
