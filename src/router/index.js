import Vue from 'vue'
import Router from 'vue-router'
import todolist from '@/views/todolist'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: todolist
    }
  ]
})
