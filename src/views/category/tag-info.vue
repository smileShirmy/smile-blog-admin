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
      <el-form-item v-if="isSubmit">
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="submitForm('form')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import tag from '@/services/models/tag'

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
        callback(new Error('标签名不能为空'))
      }
      callback()
    }
    return {
      loading: false,
      form: {
        name: '',
      },
      rules: {
        name: [
          { validator: checkName, trigger: 'blur', required: true },
        ]
      }
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if (this.infoType === 'add') {
            // 新增标签
            try {
              this.loading = true
              const res = await tag.createTag(this.form)
              if (res.errorCode === 0) {
                this.loading = false
                this.$message.success(`${res.msg}`)
                this.$emit('createTag', true)
                this.resetForm(formName)
              } else {
                this.loading = false
                this.$message.error(`${res.msg}`)
              }
            } catch (e) {
              this.loading = false
              console.log(e)
            }
          } else {
            // 更新标签
            if (this.form.name === this.info.name) {
              this.$emit('handleInfoResult', false)
              return
            }
            try {
              this.loading = true
              const res = await tag.updateTag(this.id, this.form)
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
    }
  },

  created() {
    if (this.infoType === 'edit') {
      this.setInfo()
    }
  }
}
</script>
