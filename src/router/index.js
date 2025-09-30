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
      },
      {
        path: 'about',
        component: () => import('../views/front/AboutUs.vue')
      },
      {
        path: 'caffeine',
        component: () => import('../views/front/CoffeeAndTea.vue')
      },
      {
        path: 'shopping',
        component: () => import('../views/front/ShoppingPage.vue')
      },
      {
        path: 'product/:productId',
        name: 'product',
        component: () => import('../views/front/ProductDetail.vue')
      },
      {
        path: 'order',
        component: () => import('../views/front/OrderRecord.vue')
      },
      {
        path: 'follow',
        component: () => import('../views/front/FollowList.vue')
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
