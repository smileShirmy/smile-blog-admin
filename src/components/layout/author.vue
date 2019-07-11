<template>
  <div class="author">
    <el-dropdown>
      <i class="avatar-icon" :style="{backgroundImage: `url(${author.avatar}?${Date.now()})`}"></i>
      <el-dropdown-menu slot="dropdown" class="author-wrapper">
        <ul class="author-wrapper">
          <div class="author-info">
            <div class="background"></div>
            <i class="avatar"
              :style="{backgroundImage: `url(${author.avatar}?${Date.now()})`}"
            >
              <i class="edit el-icon-edit"></i>
              <input
                class="file"
                ref="avatarInput"
                type="file"
                accept="image/*"
                @change="fileChange" />
            </i>
            <span class="name">{{author.name}}</span>
          </div>
          <div class="control-wrapper">
            <li @click="changePassword">
              <i class="el-icon-lock"></i>
              <span>修改密码</span>
            </li>
            <li @click="outLogin">
              <i class="el-icon-switch-button"></i>
              <span>登 出</span>
            </li>
          </div>
        </ul>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 修改密码弹窗 -->
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
    <!-- 修改头像弹窗 -->
    <el-dialog
      title="剪裁"
      append-to-body
      width="300px"
      :visible.sync="cropVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="croppa-dialog"
      center
    >
      <div class="avatar-croppa-container">
        <div class="croppa-wrapper">
          <croppa
            ref="croppa"
            :width="cropRule.width"
            :height="cropRule.height"
            :placeholder="'loading'"
            :zoom-speed="30"
            :disable-drag-and-drop="false"
            :show-remove-button="false"
            :prevent-white-space="true"
            :disable-click-to-choose="false"
            :disable-scroll-to-zoom="false"
            :show-loading="true"
            :quality="quality"
            :initial-image="cropImg">
          </croppa>
        </div>
        <div style="margin-top: 1em;">通过鼠标滚轮调节头像大小</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cropVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleCrop" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Author from '@/services/models/author'
import Vue from 'vue'
import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'

Vue.use(Croppa)

const width = 150
const height = 150

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
      cropVisible: false,
      // crop 属性
      cropRule: {
        width,
        height,
      },
      imgRule: {
        minWidth: width,
        minHeight: height,
      },
      cropImg: '',
      croppa: {},
      imgInfo: null,
      quality: 1
    }
  },

  computed: {
    ...mapGetters(['author'])
  },

  methods: {
    ...mapActions(['loginOut', 'setAuthorAndState']),

    fileChange(evt) {
      if (evt.target.files.length !== 1) {
        this.clearFileInput(this.$refs.avatarInput)
        return
      }
      const imgFile = evt.target.files[0]
      // 验证文件大小是否符合要求, 不大于 2M
      if (imgFile.size > 1024 * 1024 * 2) {
        this.$message.error('文件过大超过2M')
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
        return
      }

      // 验证图像是否符合要求
      const imgSrc = window.URL.createObjectURL(imgFile)
      const image = new Image()
      image.src = imgSrc
      image.onload = () => {
        const w = image.width
        const h = image.height
        if (w < 50) {
          this.$message.error('图片宽度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.avatarInput)
          return
        }
        if (h < 50) {
          this.$message.error('图片高度过小, 请选择大于50px的图像')
          // 清空输入框
          this.clearFileInput(this.$refs.avatarInput)
          return
        }
        // 验证通过, 打开裁剪框
        this.cropImg = imgSrc
        this.cropVisible = true
        if (this.$refs.croppa) {
          this.$refs.croppa.refresh()
        }
        this.clearFileInput(this.$refs.avatarInput)
      }
      image.onerror = () => {
        this.$message.error('获取本地图片出现错误, 请重试')
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
      }
    },

    async handleCrop() {
      // 获取剪裁数据
      const blob = await this.$refs.croppa.promisedBlob('image/jpeg', 0.8)
      // 构造为文件对象
      const file = new File([blob], `${this.author.name}-avatar.jpg`, {
        type: 'image/jpeg',
      })

      return this.$axios({
        method: 'post',
        url: '/v1/file',
        data: {
          file,
        },
      }).then((res) => {
        // 清空输入框
        this.clearFileInput(this.$refs.avatarInput)
        if (!Array.isArray(res) || res.length !== 1) {
          this.$message.error('头像上传失败, 请重试')
          return false
        }
        // if (res.errorCode === ) {
        //   throw new Error('文件体积过大')
        // }
        return this.$axios({
          method: 'put',
          url: '/v1/author/avatar',
          data: {
            avatar: res[0]
          },
        }).then((res) => {
          if (res.errorCode === 0) {
            this.$message({
              type: 'success',
              message: '更新头像成功',
            })
            this.cropVisible = false
            // 触发重新获取用户信息
            this.getAuthorInfo()
          } else {
            return Promise.reject(new Error('更新头像失败'))
          }
        })
      })
    },

    async getAuthorInfo() {
      try {
        const author = await Author.getAuthorInfo()
        this.setAuthorAndState(author)
      } catch (e) {
        console.log(e) 
      }
    },

    outLogin() {
      this.loginOut()
      window.location.reload(true)
    },

    changePassword() {
      this.dialogVisible = true
    },

    handleClose() {
      this.dialogVisible = false
      this.cropVisible = false
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
            const res = await Author.changeSelfPassword(data)
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
    },

    clearFileInput(ele) {
      ele.value = ''
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
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  outline: none;
}

.author-wrapper {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 300px;
  padding: 0;
  border: none;
  overflow: hidden;

  .author-info {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    width: 100%;
    height: 150px;
    padding: 20px;

    .background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: url(../../assets/images/lighthouse.jpeg) center center no-repeat;
      background-size: cover;
      filter: brightness(.7);
    }

    .avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 80px;
      height: 80px;
      margin-right: 46px;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      cursor: pointer;
      transition: all .2s linear;
      z-index: $index-popper;

      .edit {
        opacity: 0;
        transition: all .2s linear;
      }

      &:hover {
        filter: brightness(.6);

        .edit {
          opacity: 1;
        }
      }

      > input {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }

    .name {
      font-size: $font-size-large;
      font-weight: $font-weight-bold;
      color: #fff;
      z-index: $index-popper;
    }
  }

  .control-wrapper {
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
}

.avatar-croppa-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .croppa-wrapper {
    width: 150px;
    height: 150px;
    margin: 0 auto;
    border: 2px dashed;
  }
}
</style>
