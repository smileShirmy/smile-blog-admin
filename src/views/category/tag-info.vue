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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const msg = '添加标签成功'
          this.$message.success(`${msg}`)
        } else {
          this.$message.error('请填写正确的信息')
        }
      })
      this.resetForm(formName);
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
