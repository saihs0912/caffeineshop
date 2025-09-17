<template>
  <div class="row">
    <div v-for="item in productList" :key="item.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
      <router-link class="card h-100 shadow-sm" :to="{ name: 'product', params: { productId: item.id } }">
        <img :src="item.imageUrl" class="card-img-top" alt="商品圖片" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">{{ item.title }}</h5>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold text-danger">{{ item.price }} 元</span>
          </div>
        </div>
      </router-link>
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
