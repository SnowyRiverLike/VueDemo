/*
操作local storage数据的工具模块    保存两个功能set跟get
 */


const TODOS_KEY = 'todos_key'
export default {
  // 保存todos
  saveTodos(todos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
    // 调用setItem保存json数据传key值跟value值      字符串变json数据保存
  },
  // 读取todos
  readTodos() {
    return JSON.parse(localStorage.getItem(TODOS_KEY) || '[]')
  }
}
