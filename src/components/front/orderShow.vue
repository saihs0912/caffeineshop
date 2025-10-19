<template>
    <div v-for="(item, i) in searchResult" :key="i">
      {{ item }}
        <div class="card">
            <div class="card-header">
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
            <div class="card-body" v-for="(productItem, index) in item.products" :key="index">
                <table class="table">
                    <tbody>
                        <tr>
                            <!-- <td><div style="width: 50px;"><img class="img-fluid" :src="searchResult[i].products.imageUrl" alt=""></div></td> -->
                            <td></td>
                            <td>數量：{{ productItem.qty }}</td>
                            <td><span :class="{'text-decoration-line-through': item.final_total < item.total }">金額：{{ item.total }}</span><br><span v-if="item.final_total < item.total">折扣價：{{ item.final_total }}</span></td>
                        </tr>
                    </tbody>
                </table>
                <p class="card-text fw-bolder fs-3">總金額：{{ item.total }}</p>
                <a href="#" class="btn btn-brown" v-if="item.is_paid === false">通知已付款</a>
                <span class="btn btn-outline-brown" v-else>已付款</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'orderShow',
  data () {
    return {
      searchResult: [],
      num: 0
    }
  },
  props: ['sendOrder'],
  watch: {
    sendOrder (newOrder, oldOrder) {
      if (typeof newOrder === 'string') {
        this.getOrder(newOrder)
      }
    }
  },
  methods: {
    getOrder (searcInputhId) {
      let id = ''
      if (searcInputhId !== '') {
        id = searcInputhId
        console.log(id)
      } else if (this.$route.query.orderId) {
        id = this.$route.query.orderId
      }
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url)
        .then(res => {
          this.searchResult.push(res.data.order)
        })
    },
    getOrderAll () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders`
      this.$http.get(url)
        .then(res => {
          console.log(res.data)
        })
    }
  }
}
</script>
