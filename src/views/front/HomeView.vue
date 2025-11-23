<template>
  <slide-show/>
  <shop-intro/>
  <new-product/>
  <follow-us/>
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
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: '../../assets/logo/logo.png' },
        { property: 'og:description', content: '一間販賣咖啡因商品的網路店鋪' }
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
