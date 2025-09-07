<template>
  <nav-bar></nav-bar>
  <div class="container">
    <slide-show></slide-show>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SlideShow from './components/SlideShow.vue'

export default {
  components: {
    NavBar,
    SlideShow
  }
}
</script>

<style lang="scss">
@import "./assets/all";
</style>
