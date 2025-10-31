<template>
    <div class="box-container">
        <i class="bi bi-arrow-left-square-fill icons i-l text-brown"></i>
        <div class="box mx-auto my-3" :style="boxWidth">
            <div class="boxInside" ref="ProductListBox" :style="boxInsideWidth">
                <div class="card border-0 m-2" v-for="item in ProductList" :key="item.id">
                    <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
                        <img :src="item.imageUrl" alt="" class="card-img-top">
                    </router-link>
                    <router-link :to="{ name: 'product', params: { productId: item.id } }" class="no-underline">
                        {{ item.title }}
                    </router-link>
                </div>
            </div>
        </div>
        <i class="bi bi-arrow-right-square-fill icons i-r text-brown"></i>
    </div>
</template>

<script>
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'RelatedProducts',
  data () {
    return {
      ProductList: [],
      boxWidth: {
        width: ''
      },
      boxInsideWidth: {
        transform: 'translate3d(0, 0, 0)',
        width: ''
      },
      x: 0,
      step: 150,
      num: 0,
      widthSize: ''
    }
  },
  props: ['sendProduct'],
  methods: {
    getNewProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url)
        .then(res => {
          this.ProductList = res.data.products
          this.ProductList = this.ProductList.filter(item => {
            return (item.category === this.sendProduct.category) && (item.id !== this.sendProduct.id)
          }).reverse()
          console.log('執行了這邊')
          let boxWidth = ''
          let boxInsideWidth = ''
          this.num = this.ProductList.length
          boxInsideWidth = this.step * this.num
          if (this.widthSize >= 1200) {
            boxWidth = (boxInsideWidth / this.num) * 4
          }
          this.boxInsideWidth.width = `${boxInsideWidth}px`
          this.boxWidth.width = `${boxWidth}px`
        })
    }
  },
  watch: {
    sendProduct () {
      this.getNewProducts()
    },
    widthSize (newWidth, oldWidth) {
      const box = this.$refs.ProductListBox
      let boxWidth = ''
      if (newWidth >= 1200) {
        boxWidth = (box.clientWidth / this.ProductList.length) * 3
      } else if (newWidth <= 1199 && newWidth >= 992) {
        boxWidth = (box.clientWidth / 8) * 3
      } else if (newWidth <= 991 && newWidth >= 768) {
        boxWidth = (box.clientWidth / 8) * 2
      } else if (newWidth <= 767) {
        boxWidth = box.clientWidth / 8
      }
      this.boxWidth.width = `${boxWidth}px`
    }
  },
  mounted () {
    const { width } = useWindowSize()
    this.widthSize = width
    this.getNewProducts()
  }
}
</script>
