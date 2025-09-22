<template>
  <div class="container">
  <div class="row">
    <div v-for="item in productList" :key="item.id" class="col-6 col-sm-4 col-md-4 col-lg-4 p-4 overflow-hidden">
      <div class="card h-100 shadow-sm border-0">
      <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
        <img :src="item.imageUrl" class="card-img-top" alt="商品圖片" />
      </router-link>
      <div class="card-body d-flex flex-column">
        <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
          <h6 class="card-title">{{ item.title }}</h6>
        </router-link>
        <div class="d-flex justify-content-between align-items-center">
          <span class="fw-bold text-danger">{{ item.price }} 元</span>
        </div>
      </div>
      <div class="container mb-3">
        <div class="row">
          <div class="col-8">
            <button type="button" class="d-block btn pt-2 pb-2 btn-danger rounded-pill w-100" style="font-size: 0.8rem; outline: none;"><i class="bi bi-cart3"></i> 加入購物車</button>
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
import emitter from '@/methods/emitter'

export default {
  name: 'ShoppingList',
  data () {
    return {
      productList: [],
      selectedList: [],
      copyList: [],
      cateGory: ''
    }
  },
  watch: {
    cateGory () {
      this.productList = [...this.copyList]
      this.selectedList = this.productList.filter(item => {
        return item.category === this.cateGory
      })
      this.productList = [...this.selectedList]
      this.selectedList = []
    }
  },
  mounted () {
    emitter.on('sendTo', keyword => {
      this.cateGory = keyword
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
        console.log('全部的陣列', this.productList)
        console.log('複製的陣列', this.copyList)
      })
  }
}
</script>
