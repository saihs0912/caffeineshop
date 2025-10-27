<template>
  <slide-show></slide-show>
  <new-product></new-product>
  <shop-intro></shop-intro>
  <follow-us></follow-us>
</template>

<script>
import SlideShow from '@/components/front/SlideShow.vue'
import NewProduct from '@/components/front/NewProduct.vue'
import ShopIntro from './ShopIntro.vue'
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
