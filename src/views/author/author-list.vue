<template>
  <div>
    <div class="view-title">作者列表</div>
    <div class="wrapper">
      <el-card>
        <el-table :data="userData">
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
      <div class="dialog-body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="修改信息" name="authorInfo">
            <author-info ref="authorInfo" :isSubmit="false" :infoType="'edit'" :authorInfo="form" :id="id"></author-info>
          </el-tab-pane>
          <el-tab-pane label="修改密码" name="authorPassword">
            <author-password ref="password" :id="id"></author-password>
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

export default {
  components: {
    AuthorInfo,
    AuthorPassword
  },

  data() {
    return {
      id: 0,
      activeName: 'authorInfo',
      dialogVisible: false,
      userData: [
        {
          id: 1,
          name: 'smile',
          email: '1@qq.com',
          password: '123456',
          confirmPassword: '123456',
          desc: 'smile desc'
        },
        {
          id: 2,
          name: 'shirmy',
          email: '2@qq.com',
          password: '123456',
          confirmPassword: '123456',
          desc: 'shirmy desc'
        }
      ],
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        desc: ''
      },
    }
  },
  
  methods: {
    editAuthor(val) {
      this.id = val.id
      this.form.name = val.name
      this.form.email = val.email
      this.form.desc = val.desc
      this.dialogVisible = true
    },

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
    },

    handleClose() {
      this.dialogVisible = false
    },

    confirmEdit() {
      if (this.activeTab === 'authorInfo') {
        this.$refs.authorInfo.submitForm('form')
      } else {
        this.$refs.password.submitForm('form')
      }
    },

    resetForm() {
      if (this.activeName === 'authorInfo') {
        this.$refs.authorInfo.resetForm('form')
      } else {
        this.$refs.password.resetForm('form')
      }
    },

    handleClick() {

    }
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
