<template>
  <div class="container">
    <div class="row">
      <template v-for="(item, i) in filterData" :key="item.id">
      <div v-if="(i+1 <= (page.pageNow*10)) && (i+1 > ((page.pageNow*10)-10))" class="col-6 col-sm-4 col-md-4 col-lg-4 p-4 overflow-hidden">
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
              <div class="col-4">
                <button type="button" class="d-block btn rounded-circle shadow border-0 text-center cart btn-danger" style="outline: none; width: 36px; height: 36px; font-size: 0.9rem;" @click="addToCart(item.id, 1)"></button>
              </div>
              <div class="col-4">
                <button type="button" class="d-block btn rounded-circle shadow border-0 text-center heart" style="outline: none; width: 36px; height: 36px; font-size: 0.9rem;"></button>
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
      },
      page: {
        pageTotal: 0,
        pageNow: 1
      }
    }
  },
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
  watch: {
    filterData () {
      this.page.pageTotal = Math.ceil(this.filterData.length / 10)
      emitter.emit('sendPage', this.page)
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
    emitter.on('newPage', num => {
      console.log('num', num)
      this.page.pageNow = num
      emitter.emit('updatePage', this.page.pageNow)
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

<!--1. ShoppingList先從遠端呼叫全部的資料-->
<!--2. 計算總共幾筆資料，接著計算總共要有幾頁，將總頁數傳到FrontPagination-->
<!--3. FrontPagination依照總頁數總數，渲染頁數列表，並預設目前為第一頁，並以v-if渲染第1~10筆資料-->
