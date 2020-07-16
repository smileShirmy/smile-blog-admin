<template>
  <div class="login">
    <div class="overlay"></div>
    <el-card class="card" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
      <header class="logo">
        夏日谜语
      </header>
      <form class="form-box" @submit.prevent="throttleLogin">
        <div class="form-item">
          <input type="text" v-model="form.authorname" autocomplete="off" placeholder="用户名">
        </div>
        <div class="form-item">
          <input type="password" v-model="form.password" autocomplete="off" placeholder="密码">
        </div>
        <button class="submit-btn" type="submit">登录</button>
      </form>
    </el-card>
  </div>
</template>

<script>
import Utils from '@/services/utils/util'
import Author from '@/services/models/author'
import { mapActions } from 'vuex'

export default {
  name: 'login',

  data() {
    return {
      loading: false,
      wait: 2000,
      throttleLogin: null,
      form: {
        authorname: '',
        password: '',
      }
    }
  },

  methods: {
    async login() {
      const { authorname, password } = this.form
      try {
        this.loading = true
        await Author.getToken( authorname, password )
        await this.getAuthorInfo()
        this.loading = false
        this.$router.push('/about')
        this.$message.success('登录成功')
      } catch (e) {
        this.loading = false
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async getAuthorInfo() {
      try {
        const author = await Author.getAuthorInfo()
        this.setAuthorAndState(author)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e) 
      }
    },

    ...mapActions(['setAuthorAndState'])
  },

  created() {
    this.throttleLogin = Utils.throttle(this.login, this.wait)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/images/lighthouse.jpeg') no-repeat center center;
  background-size: cover;

  .overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
  }

  .card {
    transform: translateY(-40%);
  }
}


.logo {
  padding: 10px 0;
  font-size: $font-size-extra-large;
  color: $font-color-base;
  text-align: center;
}

.form-box {
  width: 350px;

  .form-item {
    margin-top: 20px;

    input {
      box-sizing: border-box;
      width: 100%;
      height: 48px;
      font-size: $font-size-base;
      color: $font-color-base;
      line-height: normal;
      outline: none;
      border-width: 0 0 1px 0;
      border-style: solid;
      border-color: $border-color-base;
      transition: all .3s;

      &:hover,
      &:focus {
        border-color: $border-color-dark;
      }
    }
  }

  .submit-btn {
    width: 100%;
    height: 36px;
    margin: 36px 0 10px;
    padding: 0;
    font-size: $font-size-base;
    color: #fff;
    text-align: center;
    outline: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: $theme-primary;
    transition: all .5s;
  }
}

</style>

