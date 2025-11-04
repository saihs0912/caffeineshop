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
  head () {
    return {
      title: '咖啡因商店',
      meta: [
        { name: '咖啡因商店', content: '一間販賣咖啡因商品的網路店鋪' }
      ]
    }
  },
  components: {
    SlideShow,
    NewProduct,
    ShopIntro,
    FollowUs
  }
}
</script>
