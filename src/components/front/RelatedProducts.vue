<template>
  <div class="box-container">
    <div v-if="num === 0" class="w-100 text-center fs-4 fw-bold">
      Sorry...沒有相關商品
    </div>
    <template v-else>
      <i v-if="x < 0" class="bi bi-arrow-left-square-fill icons i-l text-brown" @click="moveList(true)"></i>
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
      <i v-if="x > step*(showNum-num)" class="bi bi-arrow-right-square-fill icons i-r text-brown" @click="moveList(false)"></i>
    </template>
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
      showNum: 0,
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
          let boxWidth = ''
          let boxInsideWidth = ''
          this.num = this.ProductList.length
          boxInsideWidth = this.step * this.num
          if (this.widthSize >= 1200) {
            this.showNum = 5
            this.num > this.showNum ? boxWidth = (boxInsideWidth / this.num) * 5 : boxWidth = this.step * this.num
          } else if (this.widthSize <= 1199 && this.widthSize >= 992) {
            this.showNum = 4
            this.num > this.showNum ? boxWidth = (boxInsideWidth / this.num) * 4 : boxWidth = this.step * this.num
          } else if (this.widthSize <= 991 && this.widthSize >= 768) {
            this.showNum = 3
            this.num > this.showNum ? boxWidth = (boxInsideWidth / this.num) * 3 : boxWidth = this.step * this.num
          } else if (this.widthSize <= 767) {
            this.showNum = 1
            this.num > this.showNum ? boxWidth = (boxInsideWidth / this.num) * 1 : boxWidth = this.step * this.num
          }
          this.boxInsideWidth.width = `${boxInsideWidth}px`
          this.boxWidth.width = `${boxWidth}px`
        })
    },
    moveList (arrow) {
      if (arrow === true) {
        if (this.x === 0) {
          return false
        } else {
          this.x += this.step
          this.boxInsideWidth.transform = `translate3d(${this.x}px, 0, 0)`
        }
      } else if (arrow === false) {
        if (this.x <= (this.step * (this.showNum - this.num))) {
          return false
        } else {
          this.x -= this.step
          this.boxInsideWidth.transform = `translate3d(${this.x}px, 0, 0)`
        }
      }
    }
  },
  watch: {
    sendProduct: {
      handler (newVal) {
        if (newVal && newVal.id) {
          this.getNewProducts()
        }
      },
      immediate: true,
      deep: false
    },
    widthSize (newWidth, oldWidth) {
      if (oldWidth) {
        this.num = this.ProductList.length
        const box = this.$refs.ProductListBox
        let boxWidth
        if (newWidth >= 1200 && oldWidth < 1200) {
          this.x = 0
          this.boxInsideWidth.transform = 'translate3d(0, 0, 0)'
          this.showNum = 5
          this.num > this.showNum ? boxWidth = (box.clientWidth / this.num) * 5 : boxWidth = this.step * this.num
        } else if (newWidth <= 1199 && newWidth >= 992 && (oldWidth < 992 || oldWidth > 1199)) {
          this.x = 0
          this.boxInsideWidth.transform = 'translate3d(0, 0, 0)'
          this.showNum = 4
          this.num > this.showNum ? boxWidth = (box.clientWidth / this.num) * 4 : boxWidth = this.step * this.num
        } else if (newWidth <= 991 && newWidth >= 768 && (oldWidth < 768 || oldWidth > 991)) {
          this.x = 0
          this.boxInsideWidth.transform = 'translate3d(0, 0, 0)'
          this.showNum = 3
          this.num > this.showNum ? boxWidth = (box.clientWidth / this.num) * 3 : boxWidth = this.step * this.num
        } else if (newWidth <= 767 && oldWidth > 767) {
          this.x = 0
          this.boxInsideWidth.transform = 'translate3d(0, 0, 0)'
          this.showNum = 1
          boxWidth = box.clientWidth / this.num
        }
        this.boxWidth.width = `${Math.floor(boxWidth)}px`
      }
    }
  },
  mounted () {
    const { width } = useWindowSize()
    this.widthSize = width
    // this.getNewProducts()
  }
}
</script>
