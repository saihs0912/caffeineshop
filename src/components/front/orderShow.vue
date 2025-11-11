<template>
  <loading-modal :active="isLoading"></loading-modal>
  <div class="text-center fw-bold fs-3 pt-4 pb-4" v-if="notFound">
    唉呀，找不到訂單...<i class="bi bi-search"></i>
    <br>
    <br>
    請重新搜尋或<br>
    <br>
    <button type="button" class="btn btn-outline-brown btn-lg" @click="getOrderAll">回到全部訂單</button>
    <br>
  </div>
  <div class="text-center fw-bold fs-3 pt-4 pb-4" v-else-if="connectError">
    連線錯誤，請重新整理後再搜一次...<i class="bi bi-wifi-off"></i>
  </div>
  <template v-else>
    <div v-for="(item, i) in searchResult" :key="i" class="pb-4">
        <div class="card">
            <div class="card-header">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 col-md-8 col-sm-8 col-12 py-1 px-0">
                            <span>訂購日期：{{ $num.date(item.create_at) }}</span><br>
                            <span>訂單編號：{{ item.id }}</span>
                        </div>
                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 py-1 px-0 d-flex flex-lg-row-reverse flex-md-row-reverse flex-sm-row-reverse">
                          <div class="btn-group">
                            <button class="btn btn-brown" @click="goToDetail(item.id)">訂單明細</button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body boxClose" ref="cards">
                <table class="table">
                    <tbody>
                        <tr v-for="(productItem, index) in item.products" :key="index" class="tr-border">
                            <td class="float-lg-none float-md-none float-sm-none float-start td-img" style="width: 50px;"><img class="img-fluid" :src="productItem.product.imageUrl" alt=""></td>
                            <td class="td-block"><router-link class="no-underline d-block h-100" :to="{ name: 'product', params: { productId: productItem.product.id } }">{{ productItem.product.title }}</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <p class="card-text fw-bolder fs-4">總金額：{{ $num.currency(item.total) }}</p>
                  </div>
                  <div class="col-6 text-end h-auto d-flex align-items-center justify-content-end">
                    <span class="border border-brown rounded p-1 align-items-end mt-1 btn" style="cursor: text;" v-if="item.is_paid === false">尚未付款</span>
                    <span class="border border-brown rounded p-1 align-items-end mt-1 btn" style="cursor: text;" v-else>{{ $num.date(item.paid_date) }}已付款</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </template>
  <pagination-modal v-if="pageShow" :pages="pagination" @emit-page="getOrderAll"></pagination-modal>
</template>

<script>
import PaginationModal from '../back/PaginationModal.vue'

export default {
  name: 'orderShow',
  data () {
    return {
      searchResult: [],
      pagination: {},
      afterSearch: true,
      notFound: false,
      pageShow: true,
      connectError: false,
      isLoading: false,
      num: 0,
      tempPay: {}
    }
  },
  components: {
    PaginationModal
  },
  props: ['sendOrder'],
  watch: {
    sendOrder (newOrder, oldOrder) {
      if (this.afterSearch === true) this.afterSearch = false
      newOrder === '' ? this.getOrderAll() : this.getOrder(newOrder)
    }
  },
  methods: {
    getOrder (id) {
      this.isLoading = true
      this.pageShow = false
      this.searchResult = []
      this.notFound = false
      this.connectError = false
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url)
        .then(res => {
          this.isLoading = false
          if (res.data.order !== null) {
            this.searchResult.push(res.data.order)
          } else {
            this.notFound = true
          }
        })
        .catch(() => {
          this.isLoading = false
          this.notFound = true
        })
    },
    getOrderAll (page = 1) {
      this.pageShow = true
      this.isLoading = true
      if (this.notFound === true) this.notFound = false
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`
      this.$http.get(url)
        .then(res => {
          this.isLoading = false
          if (res.data.success) {
            this.searchResult = res.data.orders
            this.pagination = res.data.pagination
          }
        })
        .catch(err => {
          this.isLoading = false
          this.$InformMessage(err, '取得訂單列表')
        })
    },
    goToDetail (id) {
      this.$router.push({ name: 'orderDetail', params: { orderId: id } })
    }
  },
  created () {
    if (!this.$route.query.orderId) this.getOrderAll()
  }
}
</script>

<style>
@media (min-width: 576px) {
  .txt-end {
    text-align: right;
  }
}
</style>
