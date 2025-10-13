<template>
  <div class="container" ref="orderPage">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>訂單查詢</span>
        </div>
        <h1>訂單查詢</h1>
        <div class="container">
          <div class="row">
            <div class="col-6">
              <div class="input-group mb-3">
                <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="getOrder">以訂單編號搜尋</button>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="searchId">
              </div>
            </div>
            <div class="col-6">
              <select class="form-select" aria-label="Default select example">
                <option selected>過去一週</option>
                <option value="1">過去30天</option>
                <option value="2">過去3個月</option>
                <option value="3">過去半年</option>
                <option value="4">過去一年</option>
                <option value="5">過去兩年</option>
              </select>
            </div>
            <div class="col-12">
              <order-show :sendOrder="searchResult"></order-show>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderShow from '@/components/front/orderShow.vue'

export default {
  name: 'OrderRecord',
  data () {
    return {
      searchId: '',
      searchResult: ''
    }
  },
  components: {
    orderShow
  },
  methods: {
    getOrder () {
      const orderId = this.searchId
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${orderId}`
      this.$http.get(url)
        .then(res => {
          this.searchId = ''
          console.log(res.data)
          this.searchResult = res.data.order
          const orderPage = this.$refs.orderPage
          const orderHeight = orderPage.scrollHeight
          console.log(orderHeight)
        })
    },
    getOrderAll () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`
      this.$http.get(url)
        .then(res => {
          console.log(res)
        })
    }
  },
  created () {
    this.getOrderAll()
  }
}
</script>
