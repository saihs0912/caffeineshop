<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <nav-bar></nav-bar>
        <router-view></router-view>
        <footer-area></footer-area>
      </div>
    </div>
  </div>
  <a class="cart" href="#"></a>
  <cart-modal></cart-modal>
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
  }
}
</script>

<style>
.container{
  max-width: 1140px;
}
</style>
