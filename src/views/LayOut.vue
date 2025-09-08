<template>
    <nav-bar></nav-bar>
    <router-view></router-view>
    <footer-area></footer-area>
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
