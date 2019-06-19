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
                v-model="form.author"
                multiple
                filterable
                allow-create
                size="medium"
                placeholder="请选择作者"
              >
                <el-option
                  v-for="item in authors"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <el-date-picker
                v-model="form.pubTime"
                size="medium"
                type="datetime"
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
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button type="primary" @click="preview">预 览</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        author: '',
        pubTime: '',
        cover: '',
        content: ''
      },
      authors: [{
        id: 1,
        value: 'smile',
        label: 'smile'
      }, {
        id: 2,
        value: 'shirmy',
        label: 'shirmy'
      }],
    };
  },

  methods: {
    submitForm(formName) {
      this.resetForm(formName);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    preview() {
      
    }
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

