<template>
  <!--模板中读取的是组件对象的属性数据-->
  <ul class="todo-main">                             <!--item显示当前的todo -->
    <Item v-for="(todo, index) in todos" :key="index" :todo="todo":index="index"/>
  </ul>
</template>
<script>
  import Item from './Item.vue'

  export default {
    // 1声明接收属性: 属性名后读组件
    props: ['todos', ], // 所有接收属性都会成为组件对象的属性(只读)
    data () { // 组件对象可以读取data中的属性
      return {
        msg: 'abc'
      }
    },
    components: {
      Item
    }
  }
</script>
<style>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>
