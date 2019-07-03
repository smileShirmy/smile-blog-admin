<template>
  <div class="container">
    <div class="view-title">标签管理</div>
    <el-card class="wrapper">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane label="标签列表" name="tagList">
          <el-table :data="tags" width="100%" v-loading="loading">
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="操作" fixed="right" width="175">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editTag(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="deleteTag(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="新增标签" name="tagAdd">
          <tag-info @createTag="onCreateTag"></tag-info>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 编辑分类 -->
    <el-dialog append-to-body :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="dialog-body">
        <tag-info v-if="dialogVisible" ref="info" :isSubmit="false" :infoType="'edit'" :info="form" :id="id" @handleInfoResult="onHandleInfoResult"></tag-info>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import tagInfo from './tag-info';
import tag from '@/services/models/tag'

export default {
  components: {
    tagInfo
  },

  data() {
    return {
      loading: false,
      id: 0,
      dialogVisible: false,
      activeTab: 'tagList',
      tags: [],
      form: {
        name: '',
      }
    }
  },

  methods: {
    handleClick() {

    },

    // 监听添加标签是否成功
    onCreateTag(flag) {
      if (flag === true) {
        this.getTags()
      }
    },

    onHandleInfoResult(flag) {
      this.dialogVisible = false
      if (flag === true) {
        this.getTags()
      }
    },

    editTag(val) {
      this.id = val.id
      this.form.name = val.name
      this.dialogVisible = true
    },
    
    deleteTag(val) {
      this.$confirm('此操作将永久删除标签, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          this.loading = true
          const res = await tag.deleteTag(val.id)
          if (res.errorCode === 0) {
            this.loading = false
            await this.getTags()
            this.$message.success(`${res.msg}`)
          } else {
            this.loading = false
            this.$message.error(res.msg)
          }
        } catch (e) {
          this.loading = false
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

    // 刷新/获取标签
    async getTags() {
      try {
        this.loading = true
        this.tags = await tag.getTags()
        this.loading = false
      } catch (e) {
        this.loading = false
        console.log(e)
      }
    }
  },

  async created() {
    await this.getTags()
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
