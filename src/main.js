import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'

import filters from '@/services/filter'

import '@/assets/scss/index.scss'
import '@/assets/scss/element-variable.scss'

Vue.use(ElementUI)

// 全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
