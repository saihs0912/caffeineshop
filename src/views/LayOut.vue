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
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterArea from '@/components/FooterArea.vue'

export default {
  components: {
    NavBar,
    FooterArea
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
