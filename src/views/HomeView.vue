<template>
  <slide-show></slide-show>
  <new-product></new-product>
</template>

<script>
import SlideShow from '@/components/SlideShow.vue'
import NewProduct from '@/components/NewProduct.vue'

export default {
  name: 'HomeView',
  components: {
    SlideShow,
    NewProduct
  }
}
</script>
