<template>
  <div>
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          size="medium"
          clearable
          v-model="form.newPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          type="password"
          size="medium"
          clearable
          v-model="form.confirmPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    default: undefined
  },

  data() {
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
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('修改成功')
        } else {
          this.$message.error('请填写正确的信息')
        }
      })
      this.resetForm(formName);
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>