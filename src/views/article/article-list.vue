<template>
  <div>
    <div v-if="!isEdit" class="container">
      <div class="view-title">
        <span>文章列表</span>
        <div class="search-wrapper">
          <el-input
            size="medium"
            placeholder="搜索..."
            prefix-icon="el-icon-search"
            clearable
            v-model="searchVal"
            maxlength="10"
            @clear="clearSearch"
          >
          </el-input>
          <el-button class="search-btn" type="primary" size="medium" @click="search"
            >搜索</el-button
          >
        </div>
      </div>
      <el-card class="filter-wrapper" v-loading="loading">
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
              :class="{ 'is-active': item.id === publicId }"
              v-for="item in publicList"
              :key="item.id"
              @click="selectFilter(item.id, 'publicId')"
            >
              {{ item.name }}
            </dd>
          </div>
        </dl>
        <dl class="filter-item">
          <dt class="filter-dt">状态：</dt>
          <div class="dd-wrapper">
            <dd
              class="filter-dd"
              :class="{ 'is-active': item.id === statusId }"
              v-for="item in status"
              :key="item.id"
              @click="selectFilter(item.id, 'statusId')"
            >
              {{ item.name }}
            </dd>
          </div>
        </dl>
        <dl class="filter-item">
          <dt class="filter-dt">精选：</dt>
          <div class="dd-wrapper">
            <dd
              class="filter-dd"
              :class="{ 'is-active': item.id === starId }"
              v-for="item in star"
              :key="item.id"
              @click="selectFilter(item.id, 'starId')"
            >
              {{ item.name }}
            </dd>
          </div>
        </dl>
      </el-card>
      <el-card class="list-wrapper" v-loading="tableLoading">
        <article-table
          :total="total"
          :articleData="articleData"
          :currentPage="currentPage"
          @handleInfoResult="onHandleInfoResult"
          @handleEdit="onHandleEdit"
          @handleCurrentPage="onHandleCurrentPage"></article-table>
      </el-card>
    </div>
    <div v-if="isEdit">
      <article-info
        :infoType="'edit'"
        :info="form"
        :infoCategories="categories"
        :infoTags="tags"
        :infoAuthors="authors"
        @handleBack="onHandleBack"
      ></article-info>
    </div>
  </div>
</template>

<script>
import ArticleTable from './article-table'
import category from '@/services/models/category'
import tag from '@/services/models/tag'
import author from '@/services/models/author'
import article from '@/services/models/article'
import Utils from '@/services/utils/util'
import ArticleInfo from './article-info'

export default {
  components: {
    ArticleTable,
    ArticleInfo
  },

  data() {
    return {
      currentPage: 1,
      total: 0,
      isEdit: false,
      loading: false,
      tableLoading: false,
      searchVal: '',
      categoryId: 0,
      authorId: 0,
      tagId: 0,
      publicId: 0,
      statusId: 0,
      starId: 0,
      articleData: [],
      categories: [],
      authors: [],
      tags: [],
      publicList: [
        { id: 0, name: '全部' },
        { id: 1, name: '公开' },
        { id: 2, name: '私密' }
      ],
      status: [
        { id: 0, name: '全部' },
        { id: 1, name: '已发布' },
        { id: 2, name: '草稿' }
      ],
      star: [
        { id: 0, name: '全部' },
        { id: 1, name: '非精选' },
        { id: 2, name: '精选' }
      ],
      form: {}
    }
  },

  methods: {
    selectFilter(id, target) {
      if (id === this[target]) {
        return
      }
      this[target] = id
      this.getArticles()
    },

    onHandleCurrentPage(page) {
      this.getArticles(page - 1)
    },

    onHandleInfoResult(flag) {
      if (flag === true) {
        this.getArticles()
      }
    },

    onHandleBack(flag) {
      this.isEdit = false
      if (flag === true) {
        this.getArticles()
      }
    },

    async onHandleEdit(data) {
      let edit = {
        id: data.id,
        title: data.title,
        description: data.description,
        authors: data.authors.map(v => v.id),
        createdDate: data.created_date,
        cover: data.cover,
        content: '',
        categoryId: data.category.id,
        tags: data.tags.map(v => v.id),
        public: data.public,
        status: data.status,
        star: data.star
      }
      try {
        const res = await article.getContent(data.id)
        edit.content = res.content
        this.form = edit
        this.isEdit = true
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    search() {
      if (!this.searchVal) {
        this.$message.warning('搜索内容不能为空')
        return
      }
      this.getArticles()
    },

    clearSearch() {
      this.getArticles()
    },

    async getArticles(page = 0) {
      try {
        this.tableLoading = true
        let params = {
          categoryId: this.categoryId,
          authorId: this.authorId,
          tagId: this.tagId,
          publicId: this.publicId,
          statusId: this.statusId,
          starId: this.starId,
          page
        }
        if (this.searchVal) {
          params.search = this.searchVal
        }
        let { articles, total } = await article.getArticles(params)
        articles.forEach(v => {
          v.created_date = Utils.timestampToTime(v.created_date)
        })
        this.currentPage = page + 1
        this.total = total
        this.articleData = articles
        this.tableLoading = false
      } catch (e) {
        this.tableLoading = false
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getCategories() {
      try {
        const res = await category.getCategories()
        res.unshift({
          id: 0,
          name: '全部'
        })
        this.categories = res
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getAuthors() {
      try {
        const res = await author.getAuthors()
        res.unshift({
          id: 0,
          name: '全部'
        })
        this.authors = res
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getTags() {
      try {
        const res = await tag.getTags()
        res.unshift({
          id: 0,
          name: '全部'
        })
        this.tags = res
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },
  },

  created() {
    this.loading = true
    this.getCategories()
    this.getAuthors()
    this.getTags()
    this.getArticles()
    this.loading = false
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
