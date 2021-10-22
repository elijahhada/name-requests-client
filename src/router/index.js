import { createRouter, createWebHistory } from 'vue-router'
import RequestName from '../views/RequestName.vue'
import RequestList from '../views/RequestList.vue'

const routes = [
  {
    path: '/',
    name: 'RequestName',
    component: RequestName
  },
  {
    path: '/list',
    name: 'RequestList',
    component: RequestList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
