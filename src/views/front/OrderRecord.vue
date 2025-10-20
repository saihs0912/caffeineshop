<template>
  <loading-modal :active="isLoading"></loading-modal>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>訂單查詢</span>
        </div>
        <h1>訂單查詢</h1>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mb-3">
              <div class="input-group h-100">
                <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="searchOrder">以訂單編號搜尋</button>
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="searchId">
              </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 col-12 mt-3 mb-3">
              <div class="form-floating">
                <select class="form-select" aria-label="Default select example" id="ordersSearch" v-model="searchDate">
                  <option selected value="" disabled>請選擇日期範圍</option>
                  <option :value="3">過去三天</option>
                  <option :value="7">過去一週</option>
                  <option :value="30">過去30天</option>
                  <option :value="90">過去90天</option>
                  <option :value="182">過去半年</option>
                  <option :value="365">過去一年</option>
                </select>
                <label for="ordersSearch">以日期搜尋</label>
              </div>
            </div>
            <div class="col-12 pt-3 pb-3">
              <order-show :sendOrder="searchResult" @send-status="resetStatus"></order-show>
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
      searchDate: '',
      isLoading: false,
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
      this.isLoading = true
      this.searchResult = this.searchId
      this.searchId = ''
    },
    resetStatus () {
      this.isLoading = false
    }
  },
  watch: {
    searchDate (newDate, oldDate) {
      this.isLoading = true
      this.searchResult = newDate
    }
  },
  mounted () {
    if (this.$route.query.orderId) {
      this.searchResult = this.$route.query.orderId
    }
  }
}
</script>
