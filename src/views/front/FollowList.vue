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
                            <table class="table">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>商品名稱</th>
                                  <th>加入購物車</th>
                                  <th>取消追蹤</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-if="num === 0">
                                  <td colspan="4" class="text-center">
                                    <span class="fs-3 fw-bold">沒有追蹤商品哦...要不要加一點進來呢</span>
                                  </td>
                                </tr>
                                <template v-else>
                                  <tr v-for="(item, i) in filterData" :key="i">
                                  <td><div style="width: 100px;"><img class="img-fluid" :src="filterData[i].imageUrl" alt=""></div></td>
                                  <td class="align-middle"><router-link class="no-underline d-block pt-3 pb-3" :to="{ name: 'product', params: { productId: item.id } }">{{ item.title }}</router-link></td>
                                  <td class="align-middle">
                                    <div class="btn-group">
                                      <button class="d-block btn btn-lg btn-outline-success" type="button" @click="addToCart(item.id, 1, true)"><i class="bi bi-cart3"></i></button>
                                    </div>
                                  </td>
                                  <td class="align-middle">
                                    <div class="btn-group">
                                      <button class="d-block btn btn-lg btn-outline-danger" type="button" @click="deleteFavorite(item.id)"><i class="bi bi-x-lg"></i></button>
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
import { addToCart } from '@/methods/cartMethods'

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
      num: 0,
      status: {
        loadingItem: ''
      },
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || []
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
    deleteFavorite (id) {
      const favoriteId = this.favorite.indexOf(id)
      this.favorite.splice(favoriteId, 1)
      localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
    },
    addToCart
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
      this.num = newNum.length
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>
