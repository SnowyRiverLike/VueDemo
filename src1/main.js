import Vue from 'vue'
import {Button} from 'mint-ui'

import App from './App.vue'
import router from './router'

// 注册全局组件
Vue.component(Button.name, Button)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>', // 将<App/>渲染到页面的el元素中
  router // 注册路由器: <router-link> / <router-view>
})
