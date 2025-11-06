<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>追蹤清單</span>
                </div>
                <h1>追蹤清單</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                          <div>
                            <table class="table table-rwd">
                              <tbody>
                                <tr v-if="length === 0" class="border-0">
                                  <td colspan="3" class="text-center border-0">
                                    <span class="fs-3 fw-bold">{{ this.word }}</span>
                                  </td>
                                </tr>
                                <template v-else>
                                  <tr v-for="(item, i) in filterData" :key="i" :class="{ 'fadeOut' : this.num === i }">
                                    <td><div style="width: 100px;"><img class="img-fluid" :src="filterData[i].imageUrl" alt=""></div></td>
                                    <td class="align-middle td-rwd">
                                      <router-link class="no-underline d-block pt-3 pb-3" :to="{ name: 'product', params: { productId: item.id } }">{{ item.title }}</router-link>
                                    </td>
                                    <td class="align-middle td-rwd">
                                      <div class="btn-group" style="max-width: 260px;">
                                        <button class="d-block btn btn-outline-success" type="button" @click="addToCart(item.id, i)"><i class="bi bi-cart3"></i> 加入購物車</button>
                                        <button class="d-block btn btn-outline-danger" type="button" @click="deleteFavorite(item.id, i)"><i class="bi bi-x-lg"></i> 取消追蹤</button>
                                      </div>
                                    </td>
                                  </tr>
                                </template>
                              </tbody>
                            </table>
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
    getAllProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then(res => {
          this.productList = res.data.products
        })
        .catch(err => {
          this.$InformMessage(err, '取得商品')
        })
    },
    deleteFavorite (id, i) {
      const favoriteId = this.favorite.indexOf(id)
      this.num = i
      setTimeout(() => {
        this.num = ''
        this.favorite.splice(favoriteId, 1)
        localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
      }, 1000)
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
  transition: opacity 1s ease;
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
