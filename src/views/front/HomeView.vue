<template>
  <slide-show></slide-show>
  <new-product></new-product>
</template>

<script>
import SlideShow from '@/components/front/SlideShow.vue'
import NewProduct from '@/components/front/NewProduct.vue'

export default {
  name: 'HomeView',
  components: {
    SlideShow,
    NewProduct
  }
}
</script>
