<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none;">首頁</router-link> > <router-link to="/shopping" style="text-decoration: none;">線上商店</router-link> > <span v-if="product.category === ('咖啡豆' || '掛耳咖啡包' || '咖啡生活用品')">咖啡</span>
          <span v-else-if="product.category === ('罐裝茶' || '茶包' || '茶生活用品')">茶</span>
          <span v-else>其他</span> > <span>{{ product.category }}</span>
        </div>
      </div>
      <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 p-3">
        <div class="container">
          <div class="row flex-row-reverse">
            <div class="col-lg-7 col-md-7">
              <h2>{{ product.title }}</h2>
            </div>
            <div class="col-lg-5 col-md-5">
              <div class="p-2"><img class="img-fluid" :src="imgArray[num]" alt=""></div>
              <div class="d-flex p-2">
                <div class="w-25" v-for="(item, i) in  imgArray" :key="i" @mouseover="num = i" :class="{ 'hover-focus': num === i }"><img class="img-fluid" :src="imgArray[i]" alt=""></div>
              </div>
            </div>
            <div class="col-lg-7 col-md-7">
              <p>商品描述</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 p-3">
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
      id: '',
      active: false,
      num: 0,
      imgArray: []
    }
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(api)
        .then(res => {
          this.product = res.data.product
          this.imgArray = [].concat(this.product.imageUrl, this.product.imagesUrl)
        })
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
