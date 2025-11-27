<template>
  <div class="areaBottom mb-4">
    <h2 class="text-center"><span>新商品</span></h2>
    <div class="box-container">
      <i
        v-if="x < 0"
        class="bi bi-arrow-left-circle-fill icons-lg i-lg-l text-brown"
        @click="moveList(true)"
      ></i>
      <div class="box mx-auto my-3" :style="boxWidth">
        <div class="boxInside" ref="ProductBox" :style="boxInsideMove">
          <div class="card shadow-sm newTag m-2" v-for="item in latestProducts" :key="item.id">
            <router-link
              class="no-underline"
              :to="{ name: 'product', params: { productId: item.id } }"
            >
              <img :src="item.imageUrl" :alt="item.title" class="card-img-top" />
            </router-link>
            <div class="card-body d-flex flex-column p-0">
              <router-link
                class="no-underline d-block p-2 h-100"
                :to="{ name: 'product', params: { productId: item.id } }"
              >
                <p class="card-title">{{ item.title }}</p>
                <div>
                  <span class="fw-bold text-danger">{{ item.price }} 元</span><br />
                  <span class="text-dark">{{ item.description }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <i
        v-if="x > step * -4"
        class="bi bi-arrow-right-circle-fill icons-lg i-lg-r text-brown"
        @click="moveList(false)"
      ></i>
    </div>
    <div class="d-grid gap-2 col-md-4 col-sm-4 col-6 mx-auto" style="padding: 20px 0">
      <router-link class="btn btn-brown" to="/shopping">查看全部商品</router-link>
    </div>
  </div>
</template>

<script>
import { getAllProducts } from '@/methods/api'
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'NewProduct',
  data() {
    return {
      productList: [],
      boxWidth: {
        width: ''
      },
      boxInsideMove: {
        transform: 'translate3d(0, 0, 0)',
        width: 225 * 8 + 'px'
      },
      x: 0,
      step: 0,
      widthSize: ''
    }
  },
  methods: {
    getAllProducts,
    moveList(arrow) {
      if (arrow === true) {
        if (this.x === 0) {
          return false
        } else {
          this.x += this.step
          this.boxInsideMove.transform = `translate3d(${this.x}px, 0, 0)`
        }
      } else if (arrow === false) {
        if (this.x <= this.step * -4) {
          return false
        } else {
          this.x -= this.step
          this.boxInsideMove.transform = `translate3d(${this.x}px, 0, 0)`
        }
      }
    }
  },
  computed: {
    latestProducts() {
      return this.productList.slice(-8).reverse()
    }
  },
  watch: {
    widthSize(newWidth, oldWidth) {
      const box = this.$refs.ProductBox
      let boxWidth = ''
      if (newWidth >= 1200) {
        boxWidth = (box.clientWidth / 8) * 4
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
  async mounted() {
    const { width } = useWindowSize()
    const products = await this.getAllProducts(this.$http)
    this.productList = products
    this.widthSize = width
    const box = this.$refs.ProductBox
    this.step = box.clientWidth / 8
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
  background-color: rgba(255, 255, 0, 1);
}
@media (max-width: 1199px) {
}
@media (max-width: 991px) {
  .blockOut {
    overflow: hidden;
  }
  .blockIn {
    width: calc(100% + (100% / 3));
    overflow-x: scroll;
  }
}
</style>
