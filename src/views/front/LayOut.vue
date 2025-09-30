<template>
  <nav-bar></nav-bar>
  <div class="container pt-4">
    <div class="row justify-content-center pt-5">
      <div class="col pt-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <footer-area></footer-area>
  <a class="cart" href="#" @click.prevent="openCart"><span class="cartNum">{{ num }}</span></a>
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
      num: ''
    }
  },
  methods: {
    openCart () {
      this.$refs.cartModal.showModal()
    },
    cartNum (num) {
      this.num = num
    }
  }
}
</script>

<style>
.container{
  max-width: 1140px;
}
</style>
