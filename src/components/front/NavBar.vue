<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light position-fixed mw-100 w-100"
    style="z-index: 1000"
    ref="navOut"
  >
    <div class="container" style="width: 100%">
      <div class="row mx-auto" style="width: 100%; box-sizing: border-box">
        <div class="col-lg-4 col-md-6 col-sm-6 col-6 m-0 p-0">
          <div class="d-flex">
            <div>
              <a class="navbar-brand fs-1 pb-0" href="#" @click="navbarHide('home')">
                <img
                  class="img-fluid align-top"
                  src="../../assets/logo/logo-1.png"
                  width="40"
                  alt=""
                />
              </a>
            </div>
            <div class="shop-title">
              <h1 class="mb-0">
                <a class="navbar-brand fs-1 pb-0" href="#" @click="navbarHide('home')">
                  咖啡因商店
                </a>
              </h1>
            </div>
          </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-4 col-4 order-lg-last">
          <div class="collapse navbar-collapse justify-content-end" style="display: inline">
            <ul
              class="navbar-nav flex-row justify-content-end"
              @mouseleave="mouseLeave"
              ref="navbarList"
              style="font-size: 1.4rem; flex-wrap: nowrap !important"
            >
              <li class="nav-item" style="padding: 0 0.9rem">
                <router-link class="nav-link" @click="navbarHide" to="/follow"
                  ><i class="bi bi-heart-fill"></i
                ></router-link>
              </li>
              <li class="nav-item" style="padding: 0 0.9rem">
                <router-link class="nav-link position-relative" @click="navbarHide" to="/cart"
                  ><i class="bi bi-cart-fill"></i>
                  <i class="position-absolute cartItem p-2 rounded-circle">
                    <span v-show="num > 0">{{ num }}</span>
                  </i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="col-lg-6 col-md-2 col-sm-2 col-2 m-0 p-0 text-end order-lg-2 order-md-2 order-sm-2 order-last d-flex align-items-center justify-content-end"
        >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav01"
            aria-controls="navbarNav01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            ref="navbar"
            style="z-index: 999"
            @click="navOpen = !navOpen"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav01">
            <ul
              class="navbar-nav"
              @mouseleave="mouseLeave"
              ref="navbarList"
              style="font-size: 1.2rem"
            >
              <span class="target-underline" ref="underline"></span>
              <li class="nav-item" @mouseenter="mouseEnter(0)" @click="setActive(0)">
                <router-link class="nav-link" @click="navbarHide" to="/about">關於我們</router-link>
              </li>
              <li class="nav-item" @mouseenter="mouseEnter(1)" @click="setActive(1)">
                <router-link class="nav-link" @click="navbarHide" to="/caffeine"
                  >咖啡與茶</router-link
                >
              </li>
              <li class="nav-item" @mouseenter="mouseEnter(2)" @click="setActive(2)">
                <router-link class="nav-link" @click="navbarHide" to="/shopping"
                  >線上商店</router-link
                >
              </li>
              <li class="nav-item" @mouseenter="mouseEnter(3)" @click="setActive(3)">
                <router-link class="nav-link" @click="navbarHide" to="/order">訂單查詢</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <cart-modal ref="cartModal" />
</template>

<script>
import CartModal from './CartModal.vue'
import { useWindowSize } from '@vueuse/core'
import { getCart } from '@/methods/api'
import emitter from '@/methods/emitter'

export default {
  name: 'NavBar',
  data() {
    return {
      widthSize: '',
      widthSwitch: false,
      navOpen: false,
      activeIndex: null,
      nowPath: ['/about', '/caffeine', '/shopping', '/order', '/follow', '/coupon'],
      num: 0
    }
  },
  components: {
    CartModal
  },
  methods: {
    getCart,
    navbarHide(go) {
      const underline = this.$refs.underline
      if (this.widthSwitch === true && this.navOpen === true) {
        this.$refs.navbar.click()
        this.navOpen = false
      }
      if (go === 'cart') {
        this.$refs.cartModal.showModal()
      } else if (go === 'home') {
        this.activeIndex = null
        underline.style.width = 0
      }
    },
    mouseEnter(i) {
      const el = event.target
      const underline = this.$refs.underline
      underline.style.width = `${el.offsetWidth - 12}px`
      underline.style.transform = `translateX(${el.offsetLeft + 6}px)`
    },
    mouseLeave() {
      const underline = this.$refs.underline
      const navbarEl = this.$refs.navbarList
      const items = navbarEl.querySelectorAll('.nav-item')
      if (this.activeIndex !== null) {
        const activeEl = items[this.activeIndex]
        underline.style.width = `${activeEl.offsetWidth - 12}px`
        underline.style.transform = `translateX(${activeEl.offsetLeft + 6}px)`
      } else {
        underline.style.width = 0
      }
    },
    setActive(i) {
      this.activeIndex = i
    },
    clickOut(e) {
      if (this.widthSwitch === true && this.navOpen === true) {
        if (this.$refs.navOut && !this.$refs.navOut.contains(e.target)) {
          this.$refs.navbar.click()
        }
      }
    }
  },
  watch: {
    widthSize(newWidth, oldWidth) {
      if (newWidth <= 992) {
        this.widthSwitch = true
      } else {
        this.widthSwitch = false
      }
    }
  },
  created() {
    const { width } = useWindowSize()
    this.widthSize = width
    emitter.on('updateCart', () => {
      this.getCart('cart')
    })
  },
  mounted() {
    this.getCart('cart')
    const underline = this.$refs.underline
    const navbarEl = this.$refs.navbarList
    const items = navbarEl.querySelectorAll('.nav-item')
    this.nowPath.forEach((item, i) => {
      if (this.$route.fullPath === item) {
        this.activeIndex = i
        const activeEl = items[this.activeIndex]
        underline.style.width = `${activeEl.offsetWidth - 12}px`
        underline.style.transform = `translateX(${activeEl.offsetLeft + 6}px)`
      }
    })
    document.addEventListener('click', this.clickOut)
  }
}
</script>

<style>
.navbar-nav {
  position: relative;
}
.cartItem span {
  display: block;
  top: 0;
  left: 4px;
  position: absolute;
  text-align: center;
  color: #fff;
  font-family: 'Arial';
  font-size: 0.8rem;
  font-weight: bold;
}
.cartItem span::before {
  content: '';
  top: 1px;
  left: -4px;
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #f00;
  z-index: -1;
  border-radius: 50%;
}
@media (max-width: 991px) {
  #navbarNav01 {
    position: fixed;
    width: 696px;
    top: 54px;
    right: calc(50% - 348px);
    background-color: rgb(248, 249, 250);
    box-sizing: border-box;
    padding: 0 12px 12px 0;
  }
}
@media (max-width: 767px) {
  #navbarNav01 {
    width: 100%;
    right: calc(50% - 258px);
  }
}
@media (max-width: 575px) {
  .shop-title {
    display: none;
  }
  #navbarNav01 {
    right: 0;
  }
}
</style>
