<template>
  <div class="container">
    <div class="row">
      <div class="col-9 col-lg-9 col-md-9 col-sm-9 col-xs-12">
        <h2>{{ product.title }}</h2>
      </div>
      <div class="col3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
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
