<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>追蹤清單</span>
        </div>
        <h1>追蹤清單</h1>
        <div class="container">
          <div class="row" v-if="length === 0">
            <div class="col-12 text-center">
              <span class="fs-3 fw-bold">{{ this.word }}</span>
            </div>
          </div>
          <div class="row pb-5" v-else>
            <div class="col-lg-3 col-md-4 col-sm-6 col-12 px-1 py-2" v-for="(item, i) in filterData" :key="i" :class="{ 'fadeOut' : this.num === i }">
              <div class="card w-100 h-100 border">
                <div class="pt-2 px-2 text-end">
                  <button class="btn btn-outline-danger btn-sm" type="button" @click.prevent="deleteFavorite(item.id, i)" :disabled="num !== i && num !== ''"><i class="bi bi-x-lg"></i></button>
                </div>
                <div class="p-2">
                  <img :src="filterData[i].imageUrl" class="img-fluid" alt="">
                </div>
                <div class="p-2 card-body d-flex flex-wrap flex-column justify-content-between">
                  <p class="card-text fw-bold">{{ item.title }}</p>
                  <div class="w-100">
                    <button class="d-block btn btn-outline-brown w-100" type="button" @click="addToCart(item.id, i)" :disabled="num !== i && num !== ''"><i class="bi bi-cart3"></i> 加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'

export default {
  name: 'FollowList',
  head () {
    return {
      title: '追蹤清單 - 咖啡因商店',
      meta: [
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: '../../assets/logo/logo.png' },
        { property: 'og:description', content: '一間販賣咖啡因商品的網路店鋪' }
      ]
    }
  },
  data () {
    return {
      productList: [],
      length: 0,
      status: {
        loadingItem: ''
      },
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || [],
      word: '追蹤清單載入中...',
      num: ''
    }
  },
  methods: {
    async getAllProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      try {
        const res = await this.$http.get(api)
        this.productList = res.data.products
      } catch (err) {
        this.$InformMessage(err, '取得商品')
      }
    },
    deleteFavorite (id, i) {
      const favoriteId = this.favorite.indexOf(id)
      this.num = i
      setTimeout(() => {
        this.num = ''
        this.favorite.splice(favoriteId, 1)
        localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
      }, 500)
    },
    addToCart (id, i) {
      const favoriteId = this.favorite.indexOf(id)
      this.num = i
      setTimeout(() => {
        this.num = ''
        this.favorite.splice(favoriteId, 1)
        localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
        this.status.loadingItem = id
        const cart = {
          product_id: id,
          qty: 1
        }
        this.$http.post(api, { data: cart })
          .then(res => {
            this.status.loadingItem = ''
            this.$InformMessage(res, '商品放入購物車')
            emitter.emit('updateCart')
          })
          .catch(err => {
            this.status.loadingItem = ''
            this.$InformMessage(err, '商品放入購物車')
          })
      }, 1000)
    }
  },
  computed: {
    filterData () {
      const result = []
      const num = this.favorite.length
      this.productList.forEach(item => {
        for (let i = 0; i < num; i++) {
          if (item.id === this.favorite[i]) result.push(item)
        }
      })
      return result
    }
  },
  watch: {
    filterData (newNum, oldNum) {
      this.length = newNum.length
      if (newNum.length === 0) this.word = '沒有追蹤商品哦...要不要加一點進來呢'
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>

<style>
.fadeOut{
  transition: opacity 0.5s ease;
  opacity: 0;
}
@media (max-width: 767px) {
  .table-rwd tr{
    border-bottom: 1px #b7b7b7 solid;
  }
  .table-rwd .td-rwd{
    padding-top: 20px;
    display: block;
    border: none;
  }
}
</style>
