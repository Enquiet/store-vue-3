import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/pages/MainPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import OrderPage from '@/pages/OrderPage.vue'
import OrderInfoPage from '@/pages/OrderInfoPage.vue'
import CartPage from '@/pages/CartPage.vue'

const routes = [
  { name: 'mainPage', component: MainPage, path: '/' },
  { name: 'cartPage', component: CartPage, path: '/cart' },
  { name: 'orderPage', component: OrderPage, path: '/order' },
  { name: 'infoPage', component: OrderInfoPage, path: '/order/:id' },
  { name: 'productPage', component: ProductPage, path: '/product/:id' },
  { name: 'notFound', component: NotFoundPage, path: '/:pathMatch(.*)*' }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
