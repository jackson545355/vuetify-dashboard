import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import CommentsPage from '../views/CommentsPage.vue'
import MasterItems from '../views/MasterItemsPage.vue'

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
    path:'/dashboard/MasterItems',
    component: MasterItems
  },
  {
    path: '/dashboard/Product/add/step1',
    name: 'AddProductStep1',
    component: () => import('../components/AddProduct.vue'), // Thay bằng đường dẫn đến component AddProduct của bạn
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
