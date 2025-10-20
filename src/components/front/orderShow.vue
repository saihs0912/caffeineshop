<template>
  <div class="text-center fw-bold fs-3 pt-4 pb-4" v-if="afterSearch">
    <i class="bi bi-megaphone"></i> 請先選擇以訂單編號搜尋<br>
    或以日期範圍搜尋
  </div>
  <div class="text-center fw-bold fs-3 pt-4 pb-4" v-else-if="notFound">
    唉呀，找不到訂單...<i class="bi bi-search"></i>
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
                    </div>
                </div>
            </div>
            <div class="card-body boxClose" v-for="(productItem, index) in item.products" :key="index">
                <table class="table">
                    <tbody>
                        <tr>
                            <td><div style="width: 50px;"><img class="img-fluid" :src="productItem.product.imageUrl" alt=""></div></td>
                            <td></td>
                            <td>數量：{{ productItem.qty }}</td>
                            <td><span :class="{'text-decoration-line-through': item.final_total < item.total }">金額：{{ item.total }}</span><br><span v-if="item.final_total < item.total">折扣價：{{ item.final_total }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer">
              <div class="container">
                <div class="row">
                  <div class="col-6">
                    <p class="card-text fw-bolder fs-4">總金額：{{ item.total }}</p>
                  </div>
                  <div class="col-6 text-end">
                    <a href="#" class="btn btn-brown" v-if="item.is_paid === false">通知已付款</a>
                    <span class="btn btn-outline-brown" v-else>已付款</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  </template>
</template>

<script>
export default {
  name: 'orderShow',
  data () {
    return {
      searchResult: [],
      allOrders: [],
      afterSearch: true,
      notFound: false,
      connectError: false,
      num: 0
    }
  },
  props: ['sendOrder'],
  emits: ['sendStatus'],
  watch: {
    sendOrder (newOrder, oldOrder) {
      if (this.afterSearch === true) this.afterSearch = false
      typeof newOrder === 'string' ? this.getOrder(newOrder) : this.getOrderAll(newOrder)
    }
  },
  methods: {
    getOrder (searcInputhId) {
      this.searchResult = []
      this.notFound = false
      this.connectError = false
      const id = searcInputhId
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url)
        .then(res => {
          this.$emit('sendStatus')
          if (res.data.order !== null) {
            this.searchResult.push(res.data.order)
          } else {
            this.notFound = true
          }
        })
    },
    getOrderAll (searcInputhDate) {
      this.searchResult = []
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`
      this.$http.get(url)
        .then(res => {
          this.$emit('sendStatus')
          const today = new Date()
          const pastDate = new Date()
          pastDate.setDate(today.getDate() - searcInputhDate)
          pastDate.setHours(0, 0, 0, 0)
          this.allOrders = res.data.orders
          this.allOrders.forEach((item, i) => {
            if ((item.create_at * 1000) >= pastDate && (item.create_at * 1000) <= today) this.searchResult.push(item)
          })
        })
    },
    boxToggle (i) {
      console.log(i)
    }
  }
}
</script>

<style>
.boxClose {
  height: 0;
  padding: 0;
  overflow: hidden;
}
</style>
