<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认"
           v-model="title" @keyup.enter="add"/>
  </div>          <!--一旦按确定添加就监听enter去添加add（不能addTodo重名）-->
</template>
<script>
  export default {

    props: { // 属性名/属性值的类型/属性的必要性
      addTodo: {
        type: Function,
        required: true
    /*    default:0      //默认值不需要*/
      },
    },

    data() {
      return {
        title: ''
      }
    },

    methods: {
      add () {
        // 得到输入数据
        const title = this.title.trim() /*trim空格*/
        // 检查
        if(!title) {
          alert('必须输入')
          return
        }

        // 封装一个todo对象
        const todo = {
          title,
          complete: false
        }

        // 添加到todos中
        this.addTodo(todo)

        // 清除输入
        this.title = ''
      }/*双向绑定*/
    }
  }
</script>
<style>
  .todo-header input {
    width: 560px;
    height: 28px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 7px;
  }

  .todo-header input:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
  }
</style>
