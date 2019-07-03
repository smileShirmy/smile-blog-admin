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
      <el-form-item label="头像" prop="avatar">
        <el-input
          v-model="form.avatar"
          size="medium"
        ></el-input>
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
      <el-form-item label="作者描述" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
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
import author from '@/services/models/author'

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
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkDescription = (rule, value, callback) => {
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
        avatar: '',
        email: '',
        password: '',
        confirmPassword: '',
        description: ''
      },
      rules: {
        name: [
          {
            validator: checkName,
            trigger: ['blur', 'change'],
            required: this.infoType === 'add'
          }
        ],
        avatar: [
          {
            type: 'url',
            message: '请输入正确的头像地址',
            trigger: 'blur',
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
          { validator: checkPassword, trigger: 'blur', required: this.infoType === 'add' },
        ],
        confirmPassword: [
          { validator: checkPassword2, trigger: 'blur', required: this.infoType === 'add' },
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
            // 新增用户
            try {
              this.loading = true
              const data = {
                name: this.form.name,
                avatar: this.form.avatar,
                email: this.form.email,
                password: this.form.password,
                description: this.form.description,
                auth: 8
              }
              const res = await author.createAuthor(data)
              if (res.errorCode === 0) {
                this.loading = false
                this.$message.success(`${res.msg}`)
                this.resetForm(formName)
              }
            } catch(e) {
              this.loading  = false
              console.log(e)
            }
          } else {
            // 修改用户信息
            if (this.form.avatar === this.info.avatar && this.form.email === this.info.email && this.form.description === this.info.description && this.form.auth === this.info.auth) {
              this.$emit('handleInfoResult', false)
              return
            }
            const data = {
              avatar: this.form.avatar,
              email: this.form.email,
              description: this.form.description,
              auth: 8
            }
            try {
              const res = await author.updateAuthor(data, this.id)
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
      this.form.avatar = this.info.avatar
      this.form.email = this.info.email
      this.form.description = this.info.description
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
