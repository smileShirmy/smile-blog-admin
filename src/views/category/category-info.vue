<template>
  <div class="container">
    <el-form
      :model="form"
      @submit.native.prevent
      status-icon
      label-width="80px"
      ref="form"
      v-loading="loading"
      :rules="rules"
    >
      <el-form-item label="名称" prop="name">
        <el-input size="medium" clearable v-model="form.name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-input
          v-model="form.cover"
          size="medium"
          placeholder="请输入封面地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          type="textarea"
          size="medium"
          v-model="form.description"
          :autosize="{ minRows: 6, maxRows: 8 }"
          auto-complete="off"
          maxlength="140"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item v-if="isSubmit">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import category from '@/services/models/category'

export default {
  props: {
    isSubmit: {
      type: Boolean,
      default: true
    },

    infoType: {
      type: String,
      default: 'add'
    },

    info: {
      type: Object,
      default: () => {}
    },

    id: {
      type: Number,
      default: undefined
    }
  },

  data() {
    const checkName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('分类名不能为空'))
      }
      callback()
    }
    const checkDescription = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写描述信息'))
      }
      callback()
    }
    return {
      loading: false,
      form: {
        name: '',
        cover: '',
        description: '',
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur', required: true },
        ],
        cover: [
          {
            type: 'url',
            message: '请输入正确的头像地址',
            trigger: 'blur',
            required: true
          }
        ],
        description: [
          { validator: checkDescription, trigger: 'blur', required: true },
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.infoType === 'add') {
            // 新增分类
            try {
              this.loading = true
              const res = await category.createCategory(this.form)
              if (res.errorCode === 0) {
                this.loading = false
                this.$message.success(`${res.msg}`)
                this.$emit('createCategory', true)
                this.resetForm(formName);
              } else {
                this.loading = false
                this.$message.error(`${res.msg}`)
              }
            } catch (e) {
              this.loading = false
              console.log(e)
            }
          } else {
            // 更新分类
            if (this.form.name === this.info.name && this.form.cover === this.info.cover && this.form.description === this.info.description) {
              this.$emit('handleInfoResult', false)
              return
            }
            try {
              this.loading = true
              const res = await category.updateCategory(this.id, this.form)
              if (res.errorCode === 0) {
                this.loading = false
                this.$message.success(`${res.msg}`)
                this.$emit('handleInfoResult', true)
              } else {
                this.loading = false
                this.$message.error(`${res.msg}`)
              }
            } catch (e) {
              this.loading = false
              console.log(e)
            }
          }
        } else {
          this.$message.error('请填写正确的信息')
        }
      })
    },

    resetForm(formName) {
      if (this.infoType === 'edit') {
        this.setInfo()
      } else {
        this.$refs[formName].resetFields()
      }
    },

    setInfo() {
      this.form.name = this.info.name
      this.form.cover = this.info.cover
      this.form.description = this.info.description
    }
  },

  created() {
    if (this.infoType === 'edit') {
      this.setInfo()
    }
  }
}
</script>
