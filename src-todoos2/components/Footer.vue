<template>
  <div class="todo-footer">
    <label>                                                <!--必须写在计算属性里面去而且，得到结果做显示条件，也要监视它有没有改-->
      <input type="checkbox" v-model="isCheck"/><!--看勾选 不勾选，不只显示勾选没，还的监视他们勾选或者不勾选。用get或者是set方法-->
    </label>
    <span>                        <!--分析props属性，显示的数据从哪里来的，我的交互行为会不会修改外边的数据-->
          <span>已完成{{completeSize}}</span> / 全部{{todos.length}}
        </span>
    <button class="btn btn-danger" v-show="completeSize" @click="deleteComplete">清除已完成任务</button>
  </div>                                 <!-- v-show="completeSize>0-->
</template>
<script>
  export default {
    props: {
      todos: Array,
      deleteComplete: Function,/*看全部删除*/
      selectAll: Function     /*看数全选还是全部选，怎么看全选还是全部选就看传的参数boolen值，
                                    然后把使用的标签位置给app传过去传好之后再去写组件的实现*/
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
    }
  }
</script>
<style>
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }
</style>
