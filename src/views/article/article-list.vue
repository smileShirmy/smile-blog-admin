<template>
  <div class="container">
    <div class="view-title">
      <span>文章列表</span>
      <div class="search-wrapper">
        <el-input
          size="medium"
          placeholder="搜索..."
          prefix-icon="el-icon-search"
          clearable
          v-model="searchVal"
        >
        </el-input>
        <el-button class="search-btn" type="primary" size="medium"
          >搜索</el-button
        >
      </div>
    </div>
    <el-card class="filter-wrapper">
      <dl class="filter-item">
        <dt class="filter-dt">分类：</dt>
        <div class="dd-wrapper">
          <dd
            class="filter-dd"
            :class="{ 'is-active': category.id === categoryId }"
            v-for="category in categories"
            :key="category.id"
            @click="selectFilter(category.id, 'categoryId')"
          >
            {{ category.name }}
          </dd>
        </div>
      </dl>
      <dl class="filter-item">
        <dt class="filter-dt">作者：</dt>
        <div class="dd-wrapper">
          <dd
            class="filter-dd"
            :class="{ 'is-active': author.id === authorId }"
            v-for="author in authors"
            :key="author.id"
            @click="selectFilter(author.id, 'authorId')"
          >
            {{ author.name }}
          </dd>
        </div>
      </dl>
      <dl class="filter-item">
        <dt class="filter-dt">标签：</dt>
        <div class="dd-wrapper">
          <dd
            class="filter-dd"
            :class="{ 'is-active': tag.id === tagId }"
            v-for="tag in tags"
            :key="tag.id"
            @click="selectFilter(tag.id, 'tagId')"
          >
            {{ tag.name }}
          </dd>
        </div>
      </dl>
      <dl class="filter-item">
        <dt class="filter-dt">公开：</dt>
        <div class="dd-wrapper">
          <dd
            class="filter-dd"
            :class="{ 'is-active': open.id === openId }"
            v-for="open in opens"
            :key="open.id"
            @click="selectFilter(open.id, 'openId')"
          >
            {{ open.name }}
          </dd>
        </div>
      </dl>
      <dl class="filter-item">
        <dt class="filter-dt">状态：</dt>
        <div class="dd-wrapper">
          <dd
            class="filter-dd"
            :class="{ 'is-active': state.id === stateId }"
            v-for="state in states"
            :key="state.id"
            @click="selectFilter(state.id, 'stateId')"
          >
            {{ state.name }}
          </dd>
        </div>
      </dl>
    </el-card>
    <el-card class="list-wrapper">
      <el-table :data="articleData" width="100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" label-width="50px" class="demo-table-expand">
              <el-form-item label="分类">
                <span>{{props.row.category}}</span>
              </el-form-item>
              <el-form-item label="标签">
                <span>{{props.row.tag}}</span>
              </el-form-item>
              <el-form-item label="赞">
                <span>{{props.row.likes}}</span>
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
            <span class="author-item" v-for="author in scope.row.authors" :key="author.id">{{author.name}}</span>
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
            <el-button
              type="primary"
              size="mini"
              @click="editArticle(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="openArticle(scope.row)"
              >私密</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="showComments(scope.row)"
              >评论</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteArticle(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
const openMaps = {
  1: '公开',
  2: '私密',
}

const stateMaps = {
  1: '发布',
  2: '私密',
}

export default {
  data() {
    return {
      openMaps,
      stateMaps,
      searchVal: '',
      categoryId: 0,
      authorId: 0,
      tagId: 0,
      openId: 0,
      stateId: 0,
      articleData: [
        {
          id: 0,
          title: 'smile title',
          authors: [{id: 1, name: 'smile'}, {id: 2, name: 'shirmy'}],
          publish: '2019-06-10 23:33:33',
          category: 'category',
          tag: 'tag',
          open: 1,
          state: 1,
          likes: 3,
        }
      ],
      categories: [
        {
          id: 0,
          name: '全部',
        },
        {
          id: 1,
          name: 'smile',
        },
        {
          id: 2,
          name: 'shirmy',
        }
      ],
      authors: [
        {
          id: 0,
          name: '全部',
        },
        {
          id: 1,
          name: 'smile',
        },
        {
          id: 2,
          name: 'shirmy',
        }
      ],
      tags: [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: 'smile',
        },
        {
          id: 2,
          name: 'shirmy',
        }
      ],
      opens: [
         {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '公开',
        },
        {
          id: 2,
          name: '私密',
        }
      ],
      states: [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '已发布',
        },
        {
          id: 2,
          name: '草稿',
        }
      ]
    }
  },

  methods: {
    selectFilter(id, target) {
      if (id === this[target]) {
        return
      }
      this[target] = id
    },

    editAritcle() {

    },

    openArticle() {

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
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixin.scss";

.view-title {
  @include view-common-title;
  justify-content: space-between;

  .search-wrapper {
    display: flex;
    justify-content: flex-start;

    .search-btn {
      margin-left: 10px;
      border-radius: 3px;
    }
  }
}

.filter-wrapper {
  margin: 20px 30px;
  font-size: $font-size-base;
  color: $theme-primary;

  .filter-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px dashed $border-color-light;

    &:last-child {
      border-bottom: none;
    }

    .filter-dt {
      box-sizing: border-box;
      margin: 10px 0;
      padding: 8px;
      flex-shrink: 0;
    }

    .dd-wrapper {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .filter-dd {
        box-sizing: border-box;
        margin: 10px 8px;
        padding: 8px 16px;
        line-height: 1;
        cursor: pointer;
      }

      .is-active {
        background: $theme-primary;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
}

.list-wrapper {
  margin: 0 30px;

  .author-item {
    margin-right: 4px;

    &:not(:last-child)::after {
      content: ',';
    }
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
</style>
