<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todo-header :addTodo="addTodo"/>      <!--methods方法都会成为组件对象的，所以不用定义-->
      <List :todos="todos" :deleteTodo="deleteTodo"/>    <!-- //数组里多个对象交给list显示 后传给list组件，deleteTodo逐层传递-->
      <TodoFooter :todos="todos" :deleteComplete="deleteComplete" :selectAll="selectAll"/>
    </div>

  </div>
</template>
<script>
//引入并且注册
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
