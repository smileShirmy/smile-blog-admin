<template>
  <div class="author">
    <el-dropdown>
      <i class="avatar-icon"></i>
      <el-dropdown-menu slot="dropdown" class="author-wrapper">
        <ul class="author-wrapper">
          <li @click="changePassword">
            <i class="el-icon-lock"></i>
            <span>修改密码</span>
          </li>
          <li @click="outLogin">
            <i class="el-icon-switch-button"></i>
            <span>登 出</span>
          </li>
        </ul>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 弹窗 -->
    <el-dialog
      append-to-body
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px" v-loading="loading" @submit.native.prevent>
        <el-form-item label="原始密码" prop="oldPassword">
          <el-input
            type="password"
            size="medium"
            clearable
            v-model="form.oldPassword"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
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
        <el-form-item>
          <el-button @click="resetForm('form')">重 置</el-button>
          <el-button type="primary" @click="submitForm('form')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import author from '@/services/models/author'

export default {
  data() {
    const checkOldPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原始密码不能为空'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位数'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/.test(value)) {
        callback(new Error('密码需要由字母和数字组成'))
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
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialogVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: [
          { validator: checkOldPassword, trigger: 'blur', required: true },
        ],
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
    ...mapActions(['loginOut']),

    outLogin() {
      this.loginOut()
      window.location.reload(true)
    },

    changePassword() {
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
    },

    submitForm(formName) {
      if (this.form.oldPassword === '' && this.form.newPassword === '' && this.form.confirmPassword === '') {
        this.dialogVisible = false
        return
      }
      if (this.form.oldPassword === this.form.newPassword) {
        this.$message.error('新密码不能与原始密码一样')
        return
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            this.loading = true
            const data = {
              oldPassword: this.form.oldPassword,
              password: this.form.confirmPassword
            }
            const res = await author.changeSelfPassword(data)
            if (res.errorCode === 0) {
              this.loading = false
              this.$message.success(`${res.msg}`)
              this.resetForm(formName)
              this.dialogVisible = false
            } else {
              this.loading = false
              this.$message.error(`${res.msg}`)
            }
          } catch (e) {
            this.loading = false
            console.log(e)  
          }
        }
      })
    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.avatar-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
  outline: none;
}

.author-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;

  > li {
    margin-bottom: 20px;
    cursor: pointer;

    &:hover {
      color: $menu-item-hover;
    }

    > i {
      margin-right: 10px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
