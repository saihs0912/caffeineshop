<template>
  <nav-bar></nav-bar>
  <slide-show></slide-show>
  <router-view/>
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
