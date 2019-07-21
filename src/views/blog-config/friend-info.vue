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
        <el-input size="medium" clearable v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input size="medium" clearable v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input size="medium" clearable v-model="form.avatar"></el-input>
      </el-form-item>
      <el-form-item v-if="isSubmit">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import blog from '@/services/models/blog'

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
    return {
      loading: false,
      form: {
        name: '',
        link: '',
        avatar: '',
      },
      rules: {
        name: [
          { trigger: 'blur', message: '友链名不能为空', required: true },
        ],
        link: [
          { type: 'url', trigger: 'blur', message: '请输入正确的链接', required: true}
        ],
        avatar: [
          { type: 'url', trigger: 'blur', message: '请输入正确的头像地址'}
        ],
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.infoType === 'add') {
            // 新增友链
            try {
              this.loading = true
              const res = await blog.createFriend(this.form)
              if (res.errorCode === 0) {
                this.loading = false
                this.$message.success(`${res.msg}`)
                this.$emit('createFriend', true)
                this.resetForm(formName)
              } else {
                this.loading = false
                this.$message.error(`${res.msg}`)
              }
            } catch (e) {
              this.loading = false
              // eslint-disable-next-line no-console
              console.log(e)
            }
          } else {
            // 更新友链
            if (this.form.name === this.info.name && this.form.link === this.info.link && this.form.avatar === this.info.avatar) {
              this.$emit('handleInfoResult', false)
              return
            }
            try {
              this.loading = true
              const res = await blog.updateFriend(this.id, this.form)
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
              // eslint-disable-next-line no-console
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
      this.form.link = this.info.link
      this.form.avatar = this.info.avatar
    }
  },

  created() {
    if (this.infoType === 'edit') {
      this.setInfo()
    }
  }
}
</script>
