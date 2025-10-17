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
                        <div class="col-12">
                          <div>
                            <table class="table">
                              <thead>
                                <tr>
                                  <th></th>
                                  <th>商品名稱</th>
                                  <th>加入購物車/取消追蹤</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, i) in filterData" :key="i">
                                  <td><div style="width: 100px;"><img class="img-fluid" :src="filterData[i].imageUrl" alt=""></div></td>
                                  <td>{{ item.title }}</td>
                                  <td>
                                    <div class="btn-group">
                                      <button class="btn btn-outline-success btn-sm carts" type="button"></button>
                                      <button class="btn btn-outline-danger btn-sm del" type="button"></button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
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
  computed: {
    filterData () {
      const result = []
      const num = this.favorite.length
      this.productList.forEach(item => {
        for (let i = 0; i < num; i++) {
          if (item.id === this.favorite[i]) result.push(item)
        }
      })
      return result
    }
  },
  created () {
    this.getAllProducts()
  }
}
</script>
