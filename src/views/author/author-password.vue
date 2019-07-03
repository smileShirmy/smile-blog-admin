<template>
  <div>
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px" v-loading="loading">
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          size="medium"
          clearable
          v-model="form.newPassword"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          size="medium"
          clearable
          v-model="form.confirmPassword"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import author from '@/services/models/author'

export default {
  props: {
    id: {
      type: Number,
      default: undefined
    }
  },

  data() {
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/.test(value)) {
        callback(new Error('密码需要由字母和数字组成'))
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
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: {
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        newPassword: [
          { validator: checkPassword, trigger: 'blur', required: true },
        ],
        confirmPassword: [
          { validator: checkPassword2, trigger: 'blur', required: true },
        ],
      },
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const data = {
            password: this.form.newPassword
          }
          try {
            const res = await author.changePassword(data, this.id)
            if (res.errorCode === 0) {
              this.loading = false
              this.$message.success(`${res.msg}`)
              this.resetForm(formName)
              this.$emit('handlePasswordResult', true)
            } else {
              this.loading = false
              this.$message.error(`${res.msg}`)
            }
          } catch (e) {
            this.loading = false
            console.log(e)
          }
        } else {
          this.$message.error('请填写正确的信息')
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>