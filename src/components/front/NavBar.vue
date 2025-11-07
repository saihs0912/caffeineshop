<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light position-fixed mw-100 w-100" style="z-index: 1000;">
    <div class="container">
      <div class="row" style="width: 100%;">
        <div class="col-lg-12 col-md-10 col-sm-10 col-8">
          <h1>
            <a class="navbar-brand fs-1" href="#" style="margin: 10px;" @click="navbarHide('home')">
              <img class="img-fluid align-top" src="../../assets/logo/logo-1.png" width="40" alt=""> 咖啡因商店
            </a>
          </h1>
        </div>
        <div class="col-lg-12 col-md-2 col-sm-2 col-4 text-end">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav01" aria-controls="navbarNav01" aria-expanded="false" aria-label="Toggle navigation" ref="navbar" @click="navOpen = !navOpen">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav01">
            <ul class="navbar-nav" @mouseleave="mouseLeave" ref="navbar">
              <span class="target-underline" ref="underline"></span>
              <li class="nav-item" @mouseenter="mouseEnter(0)" @click="setActive(0)"><router-link class="nav-link" @click="navbarHide" to="/about">關於我們</router-link></li>
              <li class="nav-item" @mouseenter="mouseEnter(1)" @click="setActive(1)"><router-link class="nav-link" @click="navbarHide" to="/caffeine">咖啡與茶</router-link></li>
              <li class="nav-item" @mouseenter="mouseEnter(2)" @click="setActive(2)"><router-link class="nav-link" @click="navbarHide" to="/shopping">線上商店</router-link></li>
              <li class="nav-item" @mouseenter="mouseEnter(3)" @click="setActive(3)"><router-link class="nav-link" @click="navbarHide" to="/order">訂單查詢</router-link></li>
              <li class="nav-item" @mouseenter="mouseEnter(4)" @click="setActive(4)"><router-link class="nav-link" @click="navbarHide" to="/follow">追蹤清單</router-link></li>
              <li class="nav-item" @mouseenter="mouseEnter(5)" @click="setActive(5)"><router-link class="nav-link" @click="navbarHide" to="/coupon">優惠碼</router-link></li>
              <li @mouseenter="mouseEnter(6)"><a class="nav-link" @click.prevent="navbarHide('cart')" href="#">購物車</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <cart-modal ref="cartModal"></cart-modal>
</template>

<script>
import CartModal from './CartModal.vue'
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'NavBar',
  data () {
    return {
      widthSize: '',
      widthSwitch: false,
      navOpen: false,
      activeIndex: null,
      nowPath: ['/about', '/caffeine', '/shopping', '/order', '/follow', '/coupon']
    }
  },
  components: {
    CartModal
  },
  methods: {
    navbarHide (go) {
      const underline = this.$refs.underline
      if ((this.widthSwitch === true) && (this.navOpen === true)) {
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
    mouseEnter (i) {
      const el = event.target
      const underline = this.$refs.underline
      underline.style.width = `${el.offsetWidth - 12}px`
      underline.style.transform = `translateX(${el.offsetLeft + 6}px)`
    },
    mouseLeave () {
      const underline = this.$refs.underline
      const navbarEl = this.$refs.navbar
      const items = navbarEl.querySelectorAll('.nav-item')
      if (this.activeIndex !== null) {
        const activeEl = items[this.activeIndex]
        underline.style.width = `${activeEl.offsetWidth - 12}px`
        underline.style.transform = `translateX(${activeEl.offsetLeft + 6}px)`
      } else {
        underline.style.width = 0
      }
    },
    setActive (i) {
      this.activeIndex = i
    }
  },
  watch: {
    widthSize (newWidth, oldWidth) {
      if (newWidth <= 992) {
        this.widthSwitch = true
      } else {
        this.widthSwitch = false
      }
    },
    '$route.fullPath' (newPath, oldPath) {
      console.log(newPath, oldPath)
    }
  },
  created () {
    const { width } = useWindowSize()
    this.widthSize = width
  },
  mounted () {
    const underline = this.$refs.underline
    const navbarEl = this.$refs.navbar
    const items = navbarEl.querySelectorAll('.nav-item')
    this.nowPath.forEach((item, i) => {
      if (this.$route.fullPath === item) {
        this.activeIndex = i
        const activeEl = items[this.activeIndex]
        underline.style.width = `${activeEl.offsetWidth - 12}px`
        underline.style.transform = `translateX(${activeEl.offsetLeft + 6}px)`
      }
    })
  }
}
</script>

<style>
.navbar-nav{
  position: relative;
}
</style>
