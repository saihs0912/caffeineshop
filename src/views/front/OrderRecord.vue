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
                <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="searchOrder">搜尋</button>
                <input type="search" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" v-model="searchId" placeholder="輸入訂單編號">
              </div>
            </div>
            <div class="col-lg-9 col-md-10 col-sm-12 col-12 pt-3 pb-5">
              <order-show :sendOrder="searchResult"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderShow from '@/components/front/OrderShow.vue'

export default {
  name: 'OrderRecord',
  head () {
    return {
      title: '訂單查詢 - 咖啡因商店',
      meta: [
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: '../../assets/logo/logo.png' },
        { property: 'og:description', content: '一間販賣咖啡因商品的網路店鋪' }
      ]
    }
  },
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
    },
    resetSearch () {
      this.searchResult = ''
    }
  },
  watch: {
    searchId (newSearch, oldSearch) {
      if (newSearch === '') this.searchResult = ''
    }
  },
  mounted () {
    if (this.$route.query.orderId) {
      this.searchResult = this.$route.query.orderId
    }
  }
}
</script>
