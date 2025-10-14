<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none;">首頁</router-link> > <router-link to="/shopping" style="text-decoration: none;">線上商店</router-link> > <span v-if="product.category === ('咖啡豆' || '掛耳咖啡包' || '咖啡生活用品')">咖啡</span>
          <span v-else-if="product.category === ('罐裝茶' || '茶包' || '茶生活用品')">茶</span>
          <span v-else>其他</span> > <span>{{ product.category }}</span>
        </div>
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12 col-xs-12 p-3">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-12 pb-3" v-if="widthSize <= 991">
              <h2>{{ product.title }}</h2>
            </div>
            <div class="col-lg-5 col-md-12">
              <div class="p-2 sqLarge"><div><img class="img-fluid" :src="imgArray[num]" alt=""></div></div>
              <div class="d-flex p-2">
                <div class="w-25 sqSmall m-1" v-for="(item, i) in  imgArray" :key="i" @mouseover="num = i" :class="{ 'hover-focus': num === i }"><div><img class="img-fluid" :src="imgArray[i]" alt=""></div></div>
              </div>
            </div>
            <div class="col-lg-7 col-md-12">
              <div class="d-flex flex-column">
                <div class="pb-4" v-if="widthSize >= 992">
                  <h2>{{ product.title }}</h2>
                </div>
                <div class="pt-4 border-top">
                  <p>{{ product.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-4 col-sm-12 col-xs-12">
        <div class="border p-3">
          <p class="fs-3">每{{ product.unit }}</p>
          <p class="fs-3 fw-bold text-success" v-if="product.price !== product.origin_price">
            {{ product.price }} 元
          </p>
          <p class="fs-3">
            <del v-if="product.price !== product.origin_price" class="text-secondary fs-6">售價：{{ product.origin_price }} 元</del>
            <span v-else class="fw-bold">{{ product.origin_price }}</span>
          </p>
          <div class="d-grid gap-2 col-12 mx-auto" style="padding: 20px 0;">
            <div class="form-floating">
              <select v-model="qty" class="form-select" aria-label="Default select example" name="" id="itemQty">
                <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
              </select>
              <label for="itemQty">數量</label>
            </div>
            <button type="button" class="btn btn-brown fs-4" @click="addToCart(product.id, qty)"><i class="bi bi-cart3"></i> 加入購物車</button>
            <p class="fs-6">購買且付款後最快３天出貨</p>
            <p class="fs-6">購買後將會寄確認信至您的信箱，可選擇信用卡結帳或是銀行轉帳</p>
          </div>
          <div class="text-center">
            <div class="btn-group w-100">
              <button type="button" class="btn border"><i class="bi bi-heart text-warning"></i> 加入追蹤</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-10 col-md-10 col-sm-10 col-xs-12 p-3 pb-5 offset-lg-2 offset-md-2 offset-sm-2">
        <p><span class="fs-4 fw-bold">商品注意事項：</span><br>{{ product.content }}</p>
        <p><span class="fs-4 fw-bold">運送注意事項：</span><br>免運費<br>運送僅限台澎金馬，恕不接受海外運送<br>商品到貨後享十天猶豫期，欲退貨需保持商品全新狀態或包裝完整</p>
      </div>
    </div>
  </div>
</template>

<script>
import { addToCart } from '@/methods/cartMethods'
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {},
      id: '',
      active: false,
      num: 0,
      imgArray: [],
      qty: 1,
      status: {
        loadingItem: ''
      },
      widthSize: ''
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api)
        .then(res => {
          this.product = res.data.product
          if (this.product.imagesUrl) {
            this.imgArray = [].concat(this.product.imageUrl, this.product.imagesUrl)
          } else if (!this.product.imagesUrl) {
            this.imgArray = [].concat(this.product.imageUrl)
          }
        })
    },
    addToCart
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
    const { width } = useWindowSize()
    this.widthSize = width
  }
}
</script>
