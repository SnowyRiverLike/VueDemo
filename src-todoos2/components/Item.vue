<template>                             <!--添加数据接听来实现数据的切换-->
  <li :style="{background: bgColor}" @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="todo.complete"/>    <!--看谁被选中-->
      <span>{{todo.title}}</span>      <!--显示的是标题-->
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>                                                <!--点击删除看有没有提示如果有就不能直接调用这个方法不能用delect取名它是关键字-->
</template>
<script>
  import PubSub from 'PubSub'
  export default {
//    item显示todo
    props: { // 指定了属性名和属性值的类型
      todo: Object,     /*原生的写法*/
      index: Number
    },

    data () {     /*只要页面发生变化就要想到状态改变*/
      return {
        bgColor: 'white',
        isShow: false        /*删除按钮默认不显示*/
      }
    },

    methods: {
      handleEnter (isEnter) {
        if(isEnter) { // 进入颜色变
          this.bgColor = '#cccccc'
          this.isShow = true
        } else { // 离开c颜色变
          this.bgColor = '#ffffff'
          this.isShow = false
        }
      },

      deleteItem () {
        if(confirm('确定删除吗')) {
          this.deleteTodo(this.index)
         /* 发布消息*/
          PubSub.publish('deleteTodo',this.index)
        }
      }
    }
  }
</script>
<style>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
