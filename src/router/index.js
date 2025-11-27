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
        name: 'order',
        component: () => import('../views/front/OrderRecord.vue')
      },
      {
        path: 'orderDetail/:orderId',
        name: 'orderDetail',
        component: () => import('../views/front/OrderDetail.vue')
      },
      {
        path: 'coupon',
        component: () => import('../views/front/CouponList.vue')
      },
      {
        path: 'follow',
        component: () => import('../views/front/FollowList.vue')
      },
    ]
  },
  {
    path: '/checkout',
    component: () => import('../views/front/CheckoutPage.vue')
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
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/front/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})

export default router
