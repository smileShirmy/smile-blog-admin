<template>
  <div class="container">
    <div class="view-title">留言管理</div>
    <el-card class="wrapper">
      <el-table :data="messages" v-loading="loading">
        <el-table-column prop="nickname" label="名字" width="120"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="createTime" label="时间" width="170"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteMessage(scope.row)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next, jumper"
          :total="total"
          :background="true"
          :page-size="pageSize"
          :currentPage="currentPage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import message from '@/services/models/message'
import Utils from '@/services/utils/util'

export default {
  data() {
    return {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      loading: false,
      messages: []
    }
  },

  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getMessages()
    },

    async deleteMessage(val) {
      this.$confirm('此操作将永久删除这条留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          const res = await message.deleteMessage(val.id)
          if (res.errorCode === 0) {
            this.loading = false
            // 判断删除的是不是每一页的最后一条数据
            if (this.total % this.pageSize === 1 && this.currentPage !== 1) {
              this.currentPage--
            }
            await this.getMessages()
            this.$message({
              type: 'success',
              message: res.msg
            });
          } else {
            this.loading = false
            this.$message.error(res.msg)
          }
        } catch (e) {
          this.loading = false
          console.log(e)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    async getMessages() {
      try {
        this.loading = true
        const res = await message.getMessages(this.currentPage - 1)
        res.collection.forEach(v => {
          v.createTime = Utils.timestampToTime(v.createTime)
        })
        this.total = res.total
        this.messages = res.collection
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    }
  },

  created() {
    this.getMessages()
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

.pagination {
  display: flex;
  justify-content: flex-end;
  margin: 20px;
}
</style>
