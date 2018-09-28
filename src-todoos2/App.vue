<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todo-header @addTodo="addTodo"/>     <!--绑定事件接听，指定接听的事件名，回调函数是addTodo-->
      <List :todos="todos" />    <!-- //数组里多个对象交给list显示 后传给list组件，-->
      <TodoFooter :todos="todos" :deleteComplete="deleteComplete" :selectAll="selectAll">
        <input type="checkbox" v-model="isCheck" slot="left"/>
        <span slot="middle">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button  slot="right" class="btn btn-danger" v-show="completeSize" @click="deleteComplete">清除已完成任务</button>
      </TodoFooter>
    </div>

  </div>
</template>
<script>
//引入并且注册
import PubSub from  'pubsub-js'
  import storageUtils from './utils/storageUtils'
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'

export default {
//指定状态数据
    data () {
      return {            //数组里多个对象交给list显示
        // 读取localstorage中存储的todos数据作为初始值
//        todos:JSON.parse(localStorage.getItem('todo_Key') || '[]')/*最先没有存但有读得到null或者undefined,没值但我希望是个空数组*/
        todos: storageUtils.readTodos()
      }
    },
  computed: {
    completeSize () {    /*计算统计用函数它要return结果，                         计算reduce初始值为零*/
      return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
    },                       /*上一个跟当前的一个todo*/          /*加一还是不加*/

    isCheck: {
      get () { // 计算得到一个决定是否勾选的boolean值
        return this.todos.length===this.completeSize && this.completeSize>0
      },

      set (value) { // 用户操作勾选框时调用
        this.selectAll(value)
      }
    }
  },
     mounted () {
       //      订阅消息
       PubSub.subscribe('deleteTodo', (msg,index) => {
//           接受的数据，最后删除它        /*参数不一致不能简化如果返回来也是可以的（index，msg）
                                           // 一定要用箭头函数，this不一样，PubSub库来控制的*/
         this.deleteTodo(index)
       })
     },


    methods: {
      // 添加todo
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      // 删除指定下标的todo
      deleteTodo (index) {              /*状态定义给哪个组件操作的行为就放在哪个组件最后交给item*/
        this.todos.splice(index, 1)  //传哪个，传几个
      },

      // 删除已完成的所有todo
      deleteComplete () {             /*定义函数名就看传不传参数，如果有的就看传什么名字的参数，有几个，*/
        this.todos = this.todos.filter(todo => !todo.complete)/*删除已完成的留下未完成的，过滤filter*/
      },
                                       /*要不要传参数就看做的事情有没有不确定的事情*/

      // 全选/全不选
      selectAll (isSelect) {
        this.todos.forEach(todo => todo.complete = isSelect)
      }
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        /*handler: function (value) {       监视的回调函数  newvalue，oldvalue
          // 保存todos的json数据到localStorage     localStorage村的是文本内部回调用tostring方法，TODOS_KEY存多个这里要保存成一个数组
          storageUtils.saveTodos(value)
        }*/

        handler: storageUtils.saveTodos      //监视的回调函数

       /* handler: function (todos) {
          localStorage.setItem(TODOS_KEY, JSON.stringify(todos))     /!*setItem,存,getItem读,removeItem删方法*!/
        }*/
      }
    },

//映射vue的组件标签能小写，它但不知道是html还是vue，所以就不能用用原来的header
    components: {
      TodoHeader: Header,
      List,
      TodoFooter: Footer
    }
  }
</script>
<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
