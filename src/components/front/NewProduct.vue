<template>
  <div class="areaBottom mb-4">
    <h2 class="text-center"><span>新商品</span></h2>
    <!-- <div class="container-fluid blockOut" style="padding: 20px 0!important;">
      <div class="row blockIn">
        <div v-for="(item, i) in latestProducts" :key="item.id" class="col-3 col-sm-3 col-md-3 col-lg-3 mb-3" :ref="el => boxesRefs[i] = el">
          <div class="card h-100 shadow-sm newTag">
            <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
              <img :src="item.imageUrl" class="card-img-top" alt="商品圖片" />
            </router-link>
            <div class="card-body d-flex flex-column">
              <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
                <h5 class="card-title">{{ item.title }}</h5>
              </router-link>
              <div>
                <span class="fw-bold text-danger">{{ item.price }} 元</span><br>
                <span>{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="box-container">
      <i class="bi bi-arrow-left-circle-fill icons i-l fs-1" @click="moveList(true)"></i>
      <div class="box mx-auto my-3" :style="boxWidth">
        <div class="boxInside" ref="ProductBox" :style="boxInsideMove">
          <div class="card shadow-sm newTag m-2" v-for="item in latestProducts" :key="item.id">
            <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
              <img :src="item.imageUrl" alt="" class="card-img-top">
            </router-link>
            <div class="card-body d-flex flex-column">
              <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
                <p class="card-title">{{ item.title }}</p>
              </router-link>
              <div>
                <span class="fw-bold text-danger">{{ item.price }} 元</span><br>
                <span>{{ item.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <i class="bi bi-arrow-right-circle-fill icons i-r fs-1" @click="moveList(false)"></i>
    </div>
    <div class="d-grid gap-2 col-md-4 col-sm-4 col-6 mx-auto" style="padding: 20px 0;">
      <router-link class="btn btn-brown" to="/shopping">查看全部商品</router-link>
    </div>
  </div>
</template>

<script>
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'NewProduct',
  data () {
    return {
      newProductList: [],
      boxWidth: {
        width: ''
      },
      boxInsideMove: {
        transform: 'translate3d(0, 0, 0)'
      },
      x: 0
    }
  },
  methods: {
    getNewProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url)
        .then(res => {
          this.newProductList = res.data.products
          console.log(res.data)
        })
    },
    setItemRef (el) {
      console.log(el)
      if (el) this.itemRefs.push(el)
    },
    moveList (arrow) {
      const box = this.$refs.ProductBox
      const step = box.clientWidth / 8
      if (arrow === true) {
        if (this.x === 0) {
          return false
        } else {
          this.x += step
          this.boxInsideMove.transform = `translate3d(${this.x}px, 0, 0)`
        }
      } else if (arrow === false) {
        if (this.x <= (step * -4)) {
          return false
        } else {
          this.x -= step
          this.boxInsideMove.transform = `translate3d(${this.x}px, 0, 0)`
        }
      }
    }
  },
  computed: {
    latestProducts () {
      return this.newProductList.slice(-8).reverse()
    }
  },
  created () {
    const { width } = useWindowSize()
    this.widthSize = width
    this.getNewProduct()
  },
  mounted () {
    const box = this.$refs.ProductBox
    console.log(box.clientWidth)
    const boxWidth = (box.clientWidth / 8) * 4
    this.boxWidth.width = `${boxWidth}px`
  }
}
</script>

<style>
.newTag {
  position: relative;
  overflow: hidden;
}
.newTag::before {
  position: absolute;
  text-align: center;
  width: 100px;
  content: 'NEW';
  color: #ff0000;
  font-family: '微軟正黑體';
  font-weight: bolder;
  transform: rotate(315deg);
  top: 10px;
  left: -30px;
  background-color: rgba(255, 255, 0, 1)
}
@media (max-width: 991px){
  .blockOut{
    overflow: hidden;
  }
  .blockIn{
    width: calc(100% + (100%/3));
    overflow-x: scroll;
  }
}
</style>
