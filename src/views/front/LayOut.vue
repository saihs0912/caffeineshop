<template>
  <div ref="body">
    <nav-bar></nav-bar>
    <div class="container pt-4 content-height" style="max-width: 1140px!;">
      <div class="row justify-content-center pt-lg-md">
        <div class="col pt-4">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer-area></footer-area>
    <a class="cartOpen" href="#" @click.prevent="openCart" @mousedown="cartMove" :style="moveDelay"><span class="cartOpenNum" v-show="num > 0">{{ num }}</span></a>
    <a class="backToTop" href="#" v-if="showScrollTop" @click.prevent="scrollToTop"><i class="bi bi-arrow-up-circle-fill"></i></a>
    <cart-modal ref="cartModal" @updateNum="cartNum"></cart-modal>
  </div>
  <toast-messages></toast-messages>
</template>

<script>
import NavBar from '@/components/front/NavBar.vue'
import FooterArea from '@/components/front/FooterArea.vue'
import CartModal from '@/components/front/CartModal.vue'
import ToastMessages from '@/components/back/ToastMessages.vue'
import emitter from '@/methods/emitter'
import _ from 'lodash'

export default {
  components: {
    NavBar,
    FooterArea,
    CartModal,
    ToastMessages
  },
  data () {
    return {
      num: '',
      moveDelay: {
        transitionDelay: '0s'
      },
      showScrollTop: false
    }
  },
  provide () {
    return {
      emitter
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
    },
    handleScroll () {
      this.showScrollTop = window.scrollY > window.innerHeight / 2
    },
    scrollToTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 200))
  }
}
</script>

<style>
.pt-lg-md{
  padding-top: 3rem!important;
}
.content-height{
  min-height: calc(100vh - 110px)
}
@media (min-width: 1400px){
  .container{
    max-width: 1170px!important;
  }
}
@media (max-width: 991px) {
  .pt-4-5{
    padding-top: 1.5rem!important;
  }
}
@media (max-width: 767px){
  .content-height{
    min-height: calc(100vh - 166px);
  }
}
</style>
