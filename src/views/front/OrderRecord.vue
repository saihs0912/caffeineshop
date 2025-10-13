<template>
  <div class="container">
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
                <button class="btn btn-outline-secondary" type="button" id="button-addon1">以訂單編號搜尋</button>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="searchId">
              </div>
            </div>
            <div class="col-6">
              <div class="input-group mb-3">
                <input type="date" class="form-control">
              </div>
            </div>
            <div class="col-12">
              <order-show></order-show>
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
      searchId: ''
    }
  },
  components: {
    orderShow
  },
  methods: {
    getOrder (orderId) {},
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
