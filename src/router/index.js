import { createWebHistory, createRouter } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductPage from '../views/ProductPage.vue'
import CommentsPage from '../views/CommentsPage.vue'
import MasterItems from '../views/MasterItems.vue'
import Technologies from '../components/Technologies.vue'
import Tools from '../components/Tools.vue'
import Platforms from '../components/Platforms.vue'

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
    component: MasterItems,
    redirect: '/dashboard/MasterItems/technologies',
    children: [
      {
        path: 'technologies',
        component: Technologies
      },
      {
        path: 'tools',
        component: Tools
      },
      {
        path: 'platforms',
        component: Platforms
      }
    ]
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
