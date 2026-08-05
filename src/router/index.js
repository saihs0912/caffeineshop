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
        name: 'about',
        meta: { title: '關於我們' },
        component: () => import('../views/front/AboutUs.vue')
      },
      {
        path: 'caffeine',
        name: 'caffeine',
        meta: { title: '咖啡與茶' },
        component: () => import('../views/front/CoffeeAndTea.vue')
      },
      {
        path: 'shopping',
        name: 'shopping',
        meta: { title: '線上商城' },
        component: () => import('../views/front/ShoppingPage.vue')
      },
      {
        path: 'shopping/:productId',
        name: 'product',
        component: () => import('../views/front/ProductDetail.vue')
      },
      {
        path: 'order',
        name: 'order',
        meta: { title: '訂單查詢' },
        component: () => import('../views/front/OrderRecord.vue')
      },
      {
        path: 'orderDetail/:orderId',
        name: 'orderDetail',
        meta: { title: '訂單明細' },
        component: () => import('../views/front/OrderDetail.vue')
      },
      {
        path: 'follow',
        name: 'follow',
        meta: { title: '追蹤清單' },
        component: () => import('../views/front/FollowList.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        meta: { title: '購物車' },
        component: () => import('../views/front/CartPage.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('../views/front/NotFound.vue')
      },
      {
        path: '/checkout',
        component: () => import('../views/front/CheckoutPage.vue')
      },
      {
        path: '/articles',
        name: 'articles',
        meta: { title: '最新消息' },
        component: () => import('../views/front/ArticlesList.vue')
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
      },
      {
        path: 'articlelist',
        component: () => import('../views/back/ArticlePage.vue')
      }
    ]
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
