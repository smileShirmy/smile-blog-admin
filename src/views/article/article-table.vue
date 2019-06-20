<template>
  <div>
    <el-table :data="articleData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            inline
            label-position="left"
            label-width="80px"
            class="demo-table-expand"
          >
            <el-form-item label="分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="浏览次数">
              <span>{{ props.row.views }}</span>
            </el-form-item>
            <el-form-item label="标签">
              <span>{{ props.row.tag }}</span>
            </el-form-item>
            <el-form-item label="赞">
              <span>{{ props.row.likes }}</span>
            </el-form-item>
            <el-form-item label="封面">
              <img class="cover" :src="props.row.cover">
            </el-form-item>
            <el-form-item label="评论数">
              <span>{{ props.row.comments }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column
        prop="publish"
        label="发布时间"
        sortable
        width="170"
      ></el-table-column>
      <el-table-column prop="authors" label="作者">
        <template slot-scope="scope">
          <span
            class="author-item"
            v-for="author in scope.row.authors"
            :key="author.id"
            >{{ author.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="open"
        label="是否公开"
        :formatter="row => openMaps[row.open]"
      ></el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        :formatter="row => stateMaps[row.state]"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editArticle(scope.row)"
            >编辑</el-button
          >
          <el-button type="primary" size="mini" @click="openArticle(scope.row)"
            >私密</el-button
          >
          <el-button type="primary" size="mini" @click="showComments(scope.row)"
            >评论</el-button
          >
          <el-button type="danger" size="mini" @click="deleteArticle(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 评论弹窗 -->
    <el-dialog append-to-body :visible.sync="dialogVisible" :before-close="handleClose">
      <comments></comments>
    </el-dialog>
  </div>
</template>

<script>
import Comments from './comments'

const openMaps = {
  1: '公开',
  2: '私密',
}

const stateMaps = {
  1: '发布',
  2: '私密',
}

export default {
  components: {
    Comments
  },

  props: {
    articleData: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      openMaps,
      stateMaps,
      dialogVisible: false,
    }
  },

  methods: {
    handleClose() {
      this.dialogVisible = false
    },

    editArticle() {

    },

    openArticle() {

    },

    showComments() {
      this.dialogVisible = true
    },

    deleteArticle() {
      this.$confirm('此操作将删除文章, 是否继续?', '提示', {
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
  },

}
</script>

<style lang="scss" scoped>
.author-item {
  margin-right: 4px;

  &:not(:last-child)::after {
    content: ',';
  }
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

.cover {
  max-width: 150px;
  max-height: 150px;
}
</style>
