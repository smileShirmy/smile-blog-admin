<template>
  <div class="container">
    <div class="view-title">添加文章</div>
    <div class="form-wrapper">
      <el-row>
        <el-col :lg="23" :md="23" :sm="24" :xs="24">
          <el-form
            :model="form"
            ref="form"
            label-width="100px"
            @submit.native.prevent
          >
            <el-form-item label="标题">
              <el-input
                v-model="form.title"
                size="medium"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="封面">
              <el-input
                v-model="form.cover"
                size="medium"
                placeholder="请输入封面地址"
              ></el-input>
            </el-form-item>
            <el-form-item label="作者">
              <el-select
                v-model="form.authors"
                multiple
                filterable
                allow-create
                size="medium"
                placeholder="请选择作者"
              >
                <el-option
                  v-for="author in authors"
                  :key="author.id"
                  :label="author.name"
                  :value="author.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类">
              <el-select
                v-model="form.categoryId"
                size="medium"
                placeholder="请选择分类"
              >
                <el-option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                  :label="category.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-select
                v-model="form.tags"
                multiple
                filterable
                allow-create
                size="medium"
                placeholder="请选择标签"
              >
                <el-option
                  v-for="tag in tags"
                  :key="tag.id"
                  :label="tag.name"
                  :value="tag.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="form.createdDate"
                size="medium"
                type="datetime"
                :editable="false"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="内容">
              <el-input
                type="textarea"
                v-model="form.content"
                :autosize="{ minRows: 10, maxRows: 14 }"
                placeholder="请输入文章内容"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click.stop="submitForm('form')"
                >保 存</el-button
              >
              <el-button type="primary" @click="preview">预 览</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import category from '@/services/models/category'
import tag from '@/services/models/tag'
import author from '@/services/models/author'
import article from '@/services/models/article'

export default {
  data() {
    return {
      form: {
        title: '',
        authors: '',
        createdDate: '',
        cover: '',
        content: '',
        categoryId: '',
        tags: '',
      },
      authors: [],
      categories: [],
      tags: [],
    };
  },

  methods: {
    async submitForm(formName) {
      try {
        await article.createArticle(this.form)
      } catch (e) {
        console.log(e)
      }
      this.resetForm(formName);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    preview() {
      
    },

    async getCategories() {
      this.categories = await category.getCategories()
    },

    async getTags() {
      this.tags = await tag.getTags()
    },

    async getAuthors() {
      this.authors = await author.getAuthors()
    }
  },

  created() {
    this.getCategories()
    this.getTags()
    this.getAuthors()
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixin.scss";

.view-title {
  @include view-common-title;
}

.form-wrapper {
  margin-top: 20px;
}
</style>

