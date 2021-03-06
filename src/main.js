import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
// 声明使用VueResource插件
Vue.use(VueResource)//内部给所有的组件添加了一个属性$http: 通过它的get()/post()发ajax请求
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>' // 将<App/>渲染到页面的el元素中
})
