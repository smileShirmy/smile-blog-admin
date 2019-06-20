<template>
  <div class="container">
    <el-form
      :model="form"
      @submit.native.prevent
      status-icon
      label-width="100px"
      ref="form"
      v-loading="loading"
      :rules="rules"
    >
      <el-form-item label="作者名" prop="name">
        <el-input size="medium" clearable v-model="form.name" :disabled="!isEdited"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          size="medium"
          clearable
          v-model="form.email"
          auto-complete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="infoType === 'add'" label="密码" prop="password">
        <el-input
          type="password"
          size="medium"
          clearable
          v-model="form.password"
          auto-complete="new-password"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item v-if="infoType === 'add'" label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          size="medium"
          clearable
          v-model="form.confirmPassword"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="作者描述" prop="desc">
        <el-input
          type="textarea"
          v-model="form.desc"
          clearable=""
          :autosize="{ minRows: 6, maxRows: 8 }"
          autocomplete="off"
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

    authorInfo: {
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
      if (!value) {
        callback(new Error('用户名不能为空'))
      }
      callback()
    }
     const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else {
        if (this.form.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkDesc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写描述信息'))
      }
      callback()
    }
    return {
      isEdited: true,
      loading: false,
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        desc: ''
      },
      rules: {
        name: [
          {
            validator: checkName,
            trigger: ['blur', 'change'],
            required: true
          }
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: 'blur',
            required: true
          },
        ],
        password: [
          { validator: checkPassword, trigger: 'blur', required: true },
        ],
        confirmPassword: [
          { validator: checkPassword2, trigger: 'blur', required: true },
        ],
        desc: [
          { validator: checkDesc, trigger: 'blur', required: true },
        ]
      }
    }
  },
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const msg = '添加用户成功'
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
      this.form.name = this.authorInfo.name
      this.form.email = this.authorInfo.email
      this.form.desc = this.authorInfo.desc
    }
  },

  created() {
    if (this.infoType === 'edit') {
      this.setInfo()
      this.isEdited = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
