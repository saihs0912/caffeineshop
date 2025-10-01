<template>
  <nav-bar></nav-bar>
  <div class="container pt-4" style="max-width: 1140px!;">
    <div class="row justify-content-center pt-5">
      <div class="col pt-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <footer-area></footer-area>
  <a class="cart" href="#" @click.prevent="openCart" @mousedown="cartMove" :style="moveDelay"><span class="cartNum" v-show="num > 0">{{ num }}</span></a>
  <cart-modal ref="cartModal" @updateNum="cartNum"></cart-modal>
</template>

<script>
import NavBar from '@/components/front/NavBar.vue'
import FooterArea from '@/components/front/FooterArea.vue'
import CartModal from '@/components/front/CartModal.vue'

export default {
  components: {
    NavBar,
    FooterArea,
    CartModal
  },
  data () {
    return {
      num: '',
      moveDelay: {
        transitionDelay: '0s'
      }
    }
  },
  methods: {
    openCart () {
      this.$refs.cartModal.showModal()
    },
    cartNum (num) {
      this.num = num
    },
    cartMove () {
      this.moveDelay.transitionDelay = '1s'
      setTimeout(() => {
        this.moveDelay.transitionDelay = '0s'
      }, 1000)
    }
  }
}
</script>
