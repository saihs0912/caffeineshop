<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light position-fixed mw-100 w-100" style="z-index: 1000;">
        <div class="container">
            <div class="row" style="width: 100%;">
                <div class="col-lg-12 col-md-10 col-sm-10 col-8">
                    <h1><a class="navbar-brand" href="#" style="margin: 10px;" @click="navbarHide"><img class="img-fluid align-top" src="../../assets/logo/logo-1.png" width="40" alt=""></a> 咖啡因商店</h1>
                </div>
                <div class="col-lg-12 col-md-2 col-sm-2 col-4 text-end">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav01" aria-controls="navbarNav01" aria-expanded="false" aria-label="Toggle navigation" ref="navbar" @click="navOpen = !navOpen">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav01">
                        <ul class="navbar-nav">
                            <li class="nav-item"><router-link class="nav-link" @click="navbarHide" to="/about">關於我們</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" @click="navbarHide" to="/caffeine">咖啡與茶</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" @click="navbarHide" to="/shopping">線上商店</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" @click="navbarHide" to="/order">訂單查詢</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" @click="navbarHide" to="/follow">追蹤清單</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" @click="navbarHide" to="/coupon">優惠碼</router-link></li>
                            <li class="nav-item"><a class="nav-link" @click.prevent="navbarHide('cart')" href="#">購物車</a></li>
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
      navOpen: false
    }
  },
  components: {
    CartModal
  },
  methods: {
    navbarHide (cart) {
      if ((this.widthSwitch === true) && (this.navOpen === true)) {
        this.$refs.navbar.click()
        this.navOpen = false
      }
      if (cart === 'cart') {
        this.$refs.cartModal.showModal()
      }
    }
  },
  watch: {
    widthSize (newWidth, oldWidth) {
      if (newWidth <= 992) {
        this.widthSwitch = true
      } else {
        this.widthSwitch = false
      }
    }
  },
  created () {
    const { width } = useWindowSize()
    this.widthSize = width
  }
}
</script>
