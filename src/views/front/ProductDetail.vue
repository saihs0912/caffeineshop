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
            {{ product.price }} 元 <i class="bi bi-tag"></i>
          </p>
          <p class="fs-3">
            <del v-if="product.price !== product.origin_price" class="text-secondary fs-6">售價：{{ product.origin_price }} 元</del>
            <span v-else class="fw-bold">{{ product.origin_price }}</span>
          </p>
          <div class="d-grid gap-2 col-12 mx-auto" style="padding: 20px 0;">
            <div class="form-floating">
              <select v-model="qty" class="form-select" aria-label="Default select example" name="" id="itemQty">
                <option v-for="n in 20" :key="n" :value="n">{{ n }}</option>
              </select>
              <label for="itemQty">數量</label>
            </div>
            <button type="button" class="btn btn-brown btn-flex fs-4" @click="addToCart(product.id, qty)" :disabled="product.id === status.loadingItem">
              <div style="width: 23px;" v-if="!cart">
                <i class="bi bi-cart"></i>
              </div>
              <div class="addToCartAnimation" style="width: 23px;" v-else>
                <i class="bi bi-cart-check-fill"></i>
              </div>
              <div style="width: 122px;">
                加入購物車
              </div>
            </button>
            <p class="fs-6">購買且付款後最快３天出貨</p>
            <p class="fs-6">購買後將會寄確認信至您的信箱，可選擇信用卡結帳或是銀行轉帳</p>
          </div>
          <div class="text-center">
            <div class="btn-group w-100 mb-3">
              <button type="button" class="btn btn-flex border" v-if="favorite.indexOf(product.id) === -1" @click="editFavorite(product.id)">
                <div style="width: 16px;"><i class="bi bi-heart text-warning"></i></div>
                <div style="width: 68px;">加入追蹤</div>
              </button>
              <button type="button" class="btn btn-flex border" v-else @click="editFavorite(product.id)">
                <div style="width: 16px;" :class="{ heartAnimation : heart }"><i class="bi bi-heart-fill text-warning"></i></div>
                <div style="width: 70px;">已經追蹤</div>
              </button>
            </div>
            <div class="btn-group w-100">
              <button type="button" class="btn border-0" v-if="copySuccess === false" @click="copyToClipBoard"><i class="bi bi-link-45deg"></i> 分享商品</button>
              <button type="button" class="btn border-0" v-else @click="copyToClipBoard"><i class="bi bi-check-lg text-success"></i> 分享成功！</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 p-3 pb-5">
        <p><span class="fs-4 fw-bold">商品注意事項：</span><br>{{ product.content }}</p>
        <p><span class="fs-4 fw-bold">運送注意事項：</span><br>免運費<br>運送僅限台澎金馬，恕不接受海外運送<br>商品到貨後享十天猶豫期，欲退貨需保持商品全新狀態或包裝完整</p>
      </div>
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 p-3 pb-5">
        <span class="fs-4 fw-bold">相關商品：</span>
        <related-products :sendProduct="product"></related-products>
      </div>
    </div>
  </div>
</template>

<script>
import RelatedProducts from '@/components/front/RelatedProducts.vue'
import emitter from '@/methods/emitter'
import { useWindowSize, useClipboard } from '@vueuse/core'

export default {
  name: 'ProductDetail',
  head () {
    return {
      title: `${this.product.title} - 咖啡因商店`,
      meta: [
        { name: 'description', content: `${this.product.title}：${this.product.description}` },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: `${this.product.imageUrl}` },
        { property: 'og:description', content: `${this.product.title}：${this.product.description}` }
      ]
    }
  },
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
      widthSize: '',
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || [],
      copy: '',
      copySuccess: false,
      copied: false,
      cart: false,
      heart: false
    }
  },
  components: {
    RelatedProducts
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
          this.num = 0
        })
        .catch(err => {
          this.$InformMessage(err, '取得商品資訊')
        })
    },
    addToCart (id, num) {
      if (this.cart) this.cart = !this.cart
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: num
      }
      this.$http.post(api, { data: cart })
        .then(res => {
          this.cart = true
          this.status.loadingItem = ''
          this.$InformMessage(res, '商品放入購物車')
          emitter.emit('updateCart')
        })
        .catch(err => {
          this.status.loadingItem = ''
          this.$InformMessage(err, '商品放入購物車')
        })
    },
    editFavorite (id) {
      const favoriteId = this.favorite.indexOf(id)
      if (favoriteId === -1) {
        this.heart = true
        this.favorite.push(id)
      } else {
        this.heart = false
        this.favorite.splice(favoriteId, 1)
      }
      localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
    },
    async copyToClipBoard () {
      try {
        await this._copy(window.location.href)
        this.copySuccess = true
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 1500)
      } catch (err) {
        alert('不好意思，您的瀏覽器可能不支援此功能！請手動複製')
      }
    }
  },
  watch: {
    '$route.params.productId': {
      handler (newId, oldId) {
        this.id = newId
        this.getProduct()
      }
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
    const { width } = useWindowSize()
    this.widthSize = width
  },
  mounted () {
    const { copy, copied } = useClipboard()
    this._copy = copy
    this._copiedRef = copied
  }
}
</script>

<style>
.btn-flex{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
