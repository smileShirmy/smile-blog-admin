<template>
  <div>
    <div class="view-title">作者列表</div>
    <div class="wrapper">
      <el-card>
        <el-table :data="authors" v-loading="loading">
          <el-table-column prop="name" label="作者名"></el-table-column>
          <el-table-column label="操作" width="175">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editAuthor(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="deleteAuthor(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <!-- modal 弹窗 -->
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <div class="dialog-body" v-if="dialogVisible">
        <el-tabs v-model="activeTab" @tab-click="handleClick">
          <el-tab-pane label="修改信息" name="info">
            <author-info ref="info" :isSubmit="false" :infoType="'edit'" :info="form" :id="id" @handleInfoResult="onHandleInfoResult"></author-info>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="authorPassword">
            <author-password ref="password" :id="id" @handlePasswordResult="onHandlePasswordResult"></author-password>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AuthorInfo from './author-info'
import AuthorPassword from './author-password'
import author from '@/services/models/author'

export default {
  components: {
    AuthorInfo,
    AuthorPassword
  },

  data() {
    return {
      loading: false,
      id: 0,
      activeTab: 'info',
      dialogVisible: false,
      authors: [],
      form: {
        name: '',
        avatar: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  },
  
  methods: {
    onHandleInfoResult(flag) {
      if (flag === true) {
        this.dialogVisible = false
        this.getAuthors()
      }
    },

    onHandlePasswordResult(flag) {
      if (flag === true) {
        this.dialogVisible = false
      }
    },

    editAuthor(val) {
      this.id = val.id
      this.form.name = val.name
      this.form.avatar = val.avatar
      this.form.email = val.email
      this.form.description = val.description
      this.dialogVisible = true
    },

    deleteAuthor(val) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          const res = await author.deleteAuthor(val.id)
          if (res.errorCode === 0) {
            this.loading = false
            await this.getAuthors()
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
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },

    handleClose() {
      this.dialogVisible = false
    },

    // TODO: 这里
    confirmEdit() {
      if (this.activeTab === 'info') {
        this.$refs.info.submitForm('form')
      } else {
        this.$refs.password.submitForm('form')
      }
    },

    resetForm() {
      if (this.activeTab === 'info') {
        this.$refs.info.resetForm('form')
      } else {
        this.$refs.password.resetForm('form')
      }
    },

    handleClick() {

    },

    async getAuthors() {
      try {
        this.loading = true
        this.authors = await author.getAdminAuthors()
        this.loading = false
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  },

  created() {
    this.getAuthors()
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
  margin: 20px 30px;
}

.dialog-body {
  margin-top: -24px;
}
</style>
