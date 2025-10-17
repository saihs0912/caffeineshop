<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>追蹤清單</span>
                </div>
                <h1>追蹤清單</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-12"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FollowList',
  data () {
    return {
      productList: [],
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || []
    }
  },
  methods: {
    getAllProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(api)
        .then(res => {
          this.productList = res.data.products
        })
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>
