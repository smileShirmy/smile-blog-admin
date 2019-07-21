<template>
  <div class="container">
    <el-card class="wrapper">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="友链列表" name="friendList">
          <el-table :data="friends" width="100%" v-loading="loading">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="link" label="链接"></el-table-column>
            <el-table-column prop="avatar" label="头像"></el-table-column>
            <el-table-column label="操作" fixed="right" width="175">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editFriend(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="deleteFriend(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="新增友链" name="friendAdd">
          <friend-info @createFriend="onCreateFriend"></friend-info>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 编辑分类 -->
    <el-dialog append-to-body :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="dialog-body">
        <friend-info v-if="dialogVisible" ref="info" :isSubmit="false" :infoType="'edit'" :info="form" :id="id" @handleInfoResult="onHandleInfoResult"></friend-info>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import friendInfo from './friend-info'
import blog from '@/services/models/blog'

export default {
  components: {
    friendInfo
  },

  data() {
    return {
      loading: false,
      id: 0,
      dialogVisible: false,
      activeTab: 'friendList',
      friends: [],
      form: {
        name: '',
        link: '',
        avatar: '',
      }
    }
  },

  methods: {
    handleClick() {

    },

    // 监听添加友链是否成功
    onCreateFriend(flag) {
      if (flag === true) {
        this.getFriends()
      }
    },

    onHandleInfoResult(flag) {
      this.dialogVisible = false
      if (flag === true) {
        this.getFriends()
      }
    },

    editFriend(val) {
      this.id = val.id
      this.form.name = val.name
      this.form.link = val.link
      this.form.avatar = val.avatar
      this.dialogVisible = true
    },
    
    deleteFriend(val) {
      this.$confirm('此操作将永久删除友链, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          const res = await blog.deleteFriend(val.id)
          if (res.errorCode === 0) {
            this.loading = false
            await this.getFriends()
            this.$message.success(`${res.msg}`)
          } else {
            this.loading = false
            this.$message.error(`${res.msg}`)
          }
        } catch (e) {
          this.loading = false
          // eslint-disable-next-line no-console
          console.log(e)
        }
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },

    handleClose() {
      this.dialogVisible = false
    },

    confirmEdit() {
      this.$refs.info.submitForm('form')
    },

    resetForm() {
      this.$refs.info.resetForm('form')
    },

    // 刷新/获取友链
    async getFriends() {
      try {
        this.loading = true
        this.friends = await blog.getFriends()
        this.loading = false
      } catch (e) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },

  created() {
    this.getFriends()
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 20px 30px;
}

.demo-table-expand {
  font-size: 0;

  label {
    width: 90px;
  }

  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
}
</style>
