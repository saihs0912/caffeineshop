<template>
  <div class="container">
    <div class="row">
      <template v-for="(item, i) in filterData" :key="item.id">
        <div v-if="!item.id" class="col-12 col-sm-12 col-md-12 col-lg-12 px-2 py-5">
          <p class="text-center fw-bold fs-3 my-5">{{ item.title }} <i class="bi bi-search"></i></p>
        </div>
        <div
          v-else-if="i + 1 <= page.pageNow * 10 && i + 1 > page.pageNow * 10 - 10"
          class="col-6 col-sm-6 col-md-6 col-lg-4 p-2 overflow-hidden"
        >
          <div class="card h-100 shadow-sm border-0">
            <router-link
              class="no-underline xs-img"
              :to="{ name: 'product', params: { productId: item.id } }"
            >
              <img :src="item.imageUrl" class="card-img-top" alt="商品圖片" />
            </router-link>
            <div class="card-body d-flex flex-column pb-0 justify-content-between">
              <router-link
                class="no-underline"
                :to="{ name: 'product', params: { productId: item.id } }"
              >
                <h6 class="card-title">{{ item.title }}</h6>
              </router-link>
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold text-danger">{{ item.price }} 元</span>
              </div>
            </div>
            <div class="container pt-4 pb-3 overflow-hidden">
              <div class="row justify-content-end h-100">
                <div class="pb-2 col-12 text-end">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="d-block btn m-1 rounded-circle shadow border-0 text-center cart btn-danger"
                      @click="addToCart(item.id, 1, 'list', i)"
                      :disabled="item.id === status.loadingItem"
                      :class="{ addToCartAnimation: cart === i }"
                    ></button>
                    <button
                      type="button"
                      class="d-block btn m-1 rounded-circle shadow border-0 text-center heart"
                      @click="editFavorite(item.id, i)"
                      v-if="favorite.indexOf(item.id) === -1"
                    ></button>
                    <button
                      type="button"
                      class="d-block btn m-1 rounded-circle shadow border-0 text-center heart-fill"
                      :class="{ heartAnimation: heart === i }"
                      @click="editFavorite(item.id)"
                      v-else
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import { addToCart, getAllProducts } from '@/methods/api'
import { useWindowSize } from '@vueuse/core'

export default {
  name: 'ShoppingList',
  data() {
    return {
      productList: [],
      copyList: [],
      cateGory: '',
      cacheSearch: '',
      order: {},
      afterPrice: false,
      status: {
        loadingItem: ''
      },
      page: {
        pageTotal: 0,
        pageNow: 1
      },
      widthSize: '',
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || [],
      heart: '',
      cart: ''
    }
  },
  computed: {
    filterData() {
      let result = [...this.copyList]
      if (this.cateGory) {
        result = result.filter((item) => item.category === this.cateGory)
      }
      if (this.cacheSearch) {
        const keyword = this.cacheSearch.toLowerCase()
        result = result.filter((item) => item.title.toLowerCase().includes(keyword))
      }
      if (this.order) {
        if (this.order.type === 'price' && result.length !== 0) {
          result.sort((a, b) => {
            return this.order.order === 'asc' ? a.price - b.price : b.price - a.price
          })
        } else if (this.order.type === 'date' && result.length !== 0) {
          result = [...result]
          return this.order.order === 'asc' ? [...result] : [...result].reverse()
        }
      }
      if (result.length === 0) {
        const item = {}
        this.productList.length === 0
          ? (item.title = '商品載入中...')
          : (item.title = '唉呀...商品不存在')
        result.push(item)
      }
      return result
    }
  },
  watch: {
    filterData() {
      this.page.pageTotal = Math.ceil(this.filterData.length / 10)
      if (this.page.pageNow > this.page.pageTotal) this.page.pageNow = this.page.pageTotal
      if (this.page.pageTotal === 0) this.page.pageNow = 1
      emitter.emit('sendPage', this.page)
      let result = ''
      if (this.filterData.length === 1 && !this.filterData[0].id) {
        result = false
      } else {
        result = true
      }
      emitter.emit('sendResult', result)
    }
  },
  methods: {
    addToCart,
    editFavorite(id, i) {
      const favoriteId = this.favorite.indexOf(id)
      if (favoriteId === -1) {
        this.favorite.push(id)
        this.heart = i
      } else {
        this.favorite.splice(favoriteId, 1)
      }
      localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
    }
  },
  mounted() {
    emitter.on('sendTo', (keyword) => {
      this.cateGory = keyword
    })
    emitter.on('sendWord', (word) => {
      this.cacheSearch = word
    })
    emitter.on('resetAll', () => {
      this.cateGory = ''
      this.order = {}
    })
    emitter.on('sort', (sort) => {
      this.order = { ...sort }
    })
    emitter.on('newPage', (num) => {
      this.page.pageNow = num
      emitter.emit('updatePage', this.page.pageNow)
    })
  },
  unmounted() {
    this.productList = []
  },
  async created() {
    try {
      const products = await getAllProducts(this.$http)
      this.productList = products
      this.copyList = [...products].reverse()
    } catch (err) {
      this.$InformMessage(err.message)
    }
    const { width } = useWindowSize()
    this.widthSize = width
  }
}
</script>
