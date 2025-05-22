import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TodoList from '../components/TodoList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router