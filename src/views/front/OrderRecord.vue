<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>訂單查詢</span>
        </div>
        <h1>訂單查詢</h1>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-9 col-md-10 col-sm-12 col-12 mt-3 mb-3">
              <div class="input-group h-100">
                <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="searchOrder">以訂單編號搜尋</button>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="searchId">
                <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="resetSearch">重置搜尋</button>
              </div>
            </div>
            <div class="col-lg-9 col-md-10 col-sm-12 col-12 pt-3 pb-5">
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
    searchOrder () {
      if (this.searchId === '') {
        alert('輸入欄不能是空的！')
        return
      }
      this.searchResult = this.searchId
      this.searchId = ''
    },
    resetSearch () {
      this.searchResult = ''
    }
  },
  mounted () {
    if (this.$route.query.orderId) {
      this.searchResult = this.$route.query.orderId
    }
  }
}
</script>
