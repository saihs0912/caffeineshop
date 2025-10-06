<template>
  <div class="areaBottom">
    <h2 class="text-center"><span>新商品</span></h2>
    <div class="container-fluid" style="padding: 20px 0!important;">
        <div class="row">
          <div v-for="item in latestProducts" :key="item.id" class="col-12 col-sm-4 col-md-4 col-lg-3 mb-3">
              <div class="card h-100 shadow-sm">
                <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
                  <img :src="item.imageUrl" class="card-img-top" alt="商品圖片" />
                </router-link>
                <div class="card-body d-flex flex-column">
                  <router-link class="no-underline" :to="{ name: 'product', params: { productId: item.id } }">
                    <h5 class="card-title">{{ item.title }}</h5>
                  </router-link>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-danger">{{ item.price }} 元</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
    <div class="d-grid gap-2 col-md-4 col-sm-4 col-6 mx-auto" style="padding: 20px 0;">
      <router-link class="btn btn-brown" to="/shopping">查看全部商品</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewProduct',
  data () {
    return {
      newProductList: []
    }
  },
  methods: {
    getNewProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url)
        .then(res => {
          this.newProductList = res.data.products
          console.log(res.data)
        })
    }
  },
  computed: {
    latestProducts () {
      return this.newProductList.slice(-4).reverse()
    }
  },
  created () {
    this.getNewProduct()
  }
}
</script>
