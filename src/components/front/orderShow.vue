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
            <div class="card-header" @click="boxToggle(i)">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            訂單編號：<br>{{ item.id }}
                        </div>
                        <div class="col-6 fs-6 text-end">
                            下單日期：<br>{{ $num.date(item.create_at) }}
                        </div>
                        <div class="col-12 text-center" ref="arrowDown" style="transform: rotate(0deg); transition: 1s ease;">
                          <i class="bi bi-caret-down-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body boxClose" ref="cards" style="max-height: 0; padding: 0;">
                <table class="table">
                    <tbody>
                        <tr v-for="(productItem, index) in item.products" :key="index">
                            <td><div style="width: 50px;"><img class="img-fluid" :src="productItem.product.imageUrl" alt=""></div></td>
                            <td>{{ productItem.product.title }}</td>
                            <td>數量：{{ productItem.qty }}</td>
                            <td>金額：{{ productItem.total }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- <table class="table">
                  <tbody>
                    <tr>
                      <td>姓名：</td>
                      <td>{{ item.user.name }}</td>
                    </tr>
                    <tr>
                      <td>Email：</td>
                      <td>{{ item.user.email }}</td>
                    </tr><tr>
                      <td>電話：</td>
                      <td>{{ item.user.tel }}</td>
                    </tr>
                    <tr>
                      <td>地址：</td>
                      <td>{{ item.user.address }}</td>
                    </tr>
                    <tr>
                      <td>留言：</td>
                      <td>{{ item.message }}</td>
                    </tr>
                  </tbody>
                </table> -->
            </div>
            <div class="card-footer">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <p class="card-text fw-bolder fs-4">總金額：{{ item.total }}</p>
                  </div>
                  <div class="col-6 text-end h-auto">
                    <a href="#" class="btn btn-brown" v-if="item.is_paid === false" @click.prevent="alreadyPaid(item.id, i)">通知已付款</a>
                    <span class="border border-brown rounded p-1 align-items-end mt-1 btn" style="cursor: text;" v-else>已付款</span>
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
      num: 0
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
          console.log(res)
          this.isLoading = false
          if (res.data.success) {
            this.searchResult = res.data.orders
            this.pagination = res.data.pagination
          }
        })
    },
    boxToggle (i) {
      if (this.$refs.cards[i].style.maxHeight === '0px') {
        this.$refs.cards[i].style.maxHeight = '500px'
        this.$refs.arrowDown[i].style.transform = 'rotate(180deg)'
      } else {
        this.$refs.cards[i].style.maxHeight = '0'
        this.$refs.arrowDown[i].style.transform = 'rotate(0deg)'
      }
    },
    alreadyPaid (id, i) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http.post(url)
        .then(res => {
          this.isLoading = false
          this.searchResult[i].is_paid = true
        })
    }
  },
  created () {
    this.getOrderAll()
  }
}
</script>

<style>
.boxClose {
  overflow: hidden;
  transition: 1s ease;
}
</style>
