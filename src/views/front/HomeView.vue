<template>
  <slide-show></slide-show>
  <shop-intro></shop-intro>
  <new-product></new-product>
  <follow-us></follow-us>
</template>

<script>
import SlideShow from '@/components/front/SlideShow.vue'
import NewProduct from '@/components/front/NewProduct.vue'
import ShopIntro from '@/components/front/ShopIntro.vue'
import FollowUs from '@/components/front/FollowUs.vue'

export default {
  name: 'HomeView',
  components: {
    SlideShow,
    NewProduct,
    ShopIntro,
    FollowUs
  }
}
</script>
