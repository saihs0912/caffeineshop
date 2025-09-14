import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/front/LayOut.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/front/HomeView.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/back/LoginApi.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/back/DashBoard.vue'),
    children: [
      {
        path: 'productlist',
        component: () => import('../views/back/ProductPage.vue')
      },
      {
        path: 'couponlist',
        component: () => import('../views/back/CouponPage.vue')
      },
      {
        path: 'orderlist',
        component: () => import('../views/back/OrderlistPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
