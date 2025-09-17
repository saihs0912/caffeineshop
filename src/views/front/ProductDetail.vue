<template>
    <div>
      <h2>{{ product.title }}</h2>
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
