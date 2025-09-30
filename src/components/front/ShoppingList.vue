<template>
  <div class="container">
    <div class="row">
      <div v-for="item in filterData" :key="item.id" class="col-6 col-sm-4 col-md-4 col-lg-4 p-4 overflow-hidden">
        <div class="card h-100 shadow-sm border-0">
          <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
            <img :src="item.imageUrl" class="card-img-top" alt="商品圖片" />
          </router-link>
          <div class="card-body d-flex flex-column pb-0">
            <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
              <h6 class="card-title">{{ item.title }}</h6>
            </router-link>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fw-bold text-danger">{{ item.price }} 元</span>
            </div>
          </div>
          <div class="container pt-4 pb-3 overflow-hidden">
            <div class="row">
              <div class="col-8">
                <button type="button" class="d-block btn pt-2 pb-2 btn-danger rounded-pill w-100" style="font-size: 0.8rem; outline: none;" @click="addToCart(item.id, 1)"><i class="bi bi-cart3"></i> 加入購物車</button>
              </div>
              <div class="col-4">
                <button type="button" class="d-block btn rounded-circle shadow border-0 text-center heart" style="outline: none; width: 36px; height: 36px; font-size: 0.9rem;"></button>
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
import emitter from '@/methods/emitter'

export default {
  name: 'ShoppingList',
  data () {
    return {
      productList: [],
      copyList: [],
      cateGory: '',
      cacheSearch: '',
      order: {},
      afterPrice: false,
      status: {
        loadingItem: ''
      }
    }
  },
  props: ['updateCart'],
  computed: {
    filterData () {
      let result = [...this.copyList]
      if (this.cateGory) {
        result = result.filter(item => item.category === this.cateGory)
      }
      if (this.cacheSearch) {
        const keyword = this.cacheSearch.toLowerCase()
        result = result.filter(item => item.title.toLowerCase().includes(keyword))
      }
      if (this.order) {
        if (this.order.type === 'price') {
          result.sort((a, b) => {
            return this.order.order === 'asc' ? a.price - b.price : b.price - a.price
          })
        } else if (this.order.type === 'date') {
          result = [...result]
          return this.order.order === 'asc' ? [...result] : [...result].reverse()
        }
      }
      return result
    }
  },
  methods: {
    addToCart
  },
  mounted () {
    emitter.on('sendTo', keyword => {
      this.cateGory = keyword
    })
    emitter.on('sendWord', word => {
      this.cacheSearch = word
    })
    emitter.on('resetAll', () => {
      this.cateGory = ''
      this.order = {}
    })
    emitter.on('sort', sort => {
      this.order = { ...sort }
    })
  },
  unmounted () {
    this.productList = []
  },
  created () {
    const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
    this.$http.get(api)
      .then(res => {
        this.productList = res.data.products
        this.copyList = [...this.productList]
        this.copyList.reverse()
      })
  }
}
</script>
