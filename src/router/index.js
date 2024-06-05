import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import CommentsPage from '../views/CommentsPage.vue'
import ManagementPage from '../views/ManagementPage.vue'

// Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard/Home',
    component: HomePage
  },
  {
    path: '/dashboard/Product',
    component: ProductPage
  },
  {
    path:'/dashboard/Comments',
    component: CommentsPage
  },
  {
    path:'/dashboard/Management',
    component: ManagementPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
