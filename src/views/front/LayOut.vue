<template>
  <nav-bar></nav-bar>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <footer-area></footer-area>
  <a class="cart" href="#" @click.prevent="openCart"></a>
  <cart-modal ref="cartModal"></cart-modal>
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
    return {}
  },
  methods: {
    openCart () {
      this.$refs.cartModal.showModal()
    }
  }
}
</script>

<style>
.container{
  max-width: 1140px;
}
</style>
