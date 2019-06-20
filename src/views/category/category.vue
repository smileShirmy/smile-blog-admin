<template>
  <div class="container">
    <div class="view-title">分类管理</div>
    <el-card class="wrapper">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="分类列表" name="categoryList">
          <el-table :data="categories" width="100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="left"
                  label-width="50px"
                  class="demo-table-expand"
                >
                  <el-form-item label="描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column label="操作" fixed="right" width="175">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editCategory(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="deleteCategory(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="新增分类" name="categoryAdd">
          <category-info></category-info>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 编辑分类 -->
    <el-dialog append-to-body :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="dialog-body">
        <category-info ref="info" :isSubmit="false" :infoType="'edit'" :info="form" :id="id"></category-info>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">重 置</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CategoryInfo from './category-info';

export default {
  components: {
    CategoryInfo
  },

  data() {
    return {
      id: 0,
      dialogVisible: false,
      activeName: 'categoryList',
      categories: [
        {
          id: 1,
          name: 'smile',
          desc: 'smile desc'
        },
        {
          id: 2,
          name: 'shirmy',
          desc: 'shirmy desc'
        }
      ],
      form: {
        name: '',
        desc: '',
      }
    }
  },

  methods: {
    handleClick() {

    },

    editCategory(val) {
      this.id = val.id
      this.form.name = val.name
      this.form.desc = val.desc
      this.dialogVisible = true
    },
    
    edeleteCategory() {
      this.$confirm('此操作将永久删除分类, 是否继续?', '提示', {
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
      this.$refs.info.submitForm('form')
    },

    resetForm() {
      this.$refs.info.resetForm('form')
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
