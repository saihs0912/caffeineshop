<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <span v-if="product.category === ('咖啡豆' || '掛耳咖啡包' || '咖啡生活用品')">咖啡</span>
          <span v-else-if="product.category === ('罐裝茶' || '茶包' || '茶生活用品')">茶</span>
          <span v-else>其他</span> > <span>{{ product.category }}</span>
        </div>
      </div>
      <div class="col-9 col-lg-9 col-md-9 col-sm-9 col-xs-12 p-3">
        <h2>{{ product.title }}</h2>
        <div class="d-flex w-50">
          <div class="w-25" v-for="(item, i) in  product.imagesUrl" :key="i"><img class="img-fluid" :src="product.imagesUrl[i]" alt=""></div>
        </div>
      </div>
      <div class="col3 col-lg-3 col-md-3 col-sm-3 col-xs-12 p-3">
        {{ product.price }}元
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {},
      id: ''
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api)
        .then(res => {
          this.product = res.data.product
        })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
