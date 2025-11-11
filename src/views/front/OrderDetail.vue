<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>訂單明細</span>
                </div>
                <h1>訂單明細</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-12 p-0">
                            <div class="card mt-3">
                                <div class="card-header">
                                    <span>訂購日期：{{ $num.date(order.create_at) }}</span><br>
                                    <span>訂單編號：{{ order.id }}</span>
                                </div>
                                <div class="card-body">
                                    <div class="border rounded overflow-hidden mb-3">
                                        <table class="table">
                                            <tbody>
                                                <tr v-for="(productItem, index) in order.products" :key="index" class="tr-border">
                                                    <td class="float-lg-none float-md-none float-sm-none float-start td-img" style="width: 50px;">
                                                        <img class="img-fluid" :src="productItem.product.imageUrl" alt="">
                                                    </td>
                                                    <td class="td-block">
                                                        <router-link class="no-underline d-block h-100" :to="{ name: 'product', params: { productId: productItem.product.id } }">{{ productItem.product.title }}</router-link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="border rounded overflow-hidden">
                                        <table class="table mb-0">
                                            <tbody>
                                                <tr>
                                                    <td>訂購人</td>
                                                    <td>{{ user.name }}</td>
                                                </tr>
                                                <tr>
                                                    <td>地址</td>
                                                    <td>{{ user.address }}</td>
                                                </tr>
                                                <tr>
                                                    <td>電話</td>
                                                    <td>{{ user.tel }}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{{ user.email }}</td>
                                                </tr>
                                                <tr>
                                                    <td>留言</td>
                                                    <td>{{order.message}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button class="btn" type="button" v-if="!order.is_paid">付款</button>
                                    <span class="border border-brown rounded p-1 align-items-end mt-1 btn" style="cursor: text;" v-else>{{ $num.date(item.paid_date) }}已付款</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <already-paid ref="paidModal" :sendPayInfo="tempId" @emit-pay="alreadyPaid"></already-paid>
</template>

<script>
import AlreadyPaid from '@/components/front/AlreadyPaid.vue'

export default {
  name: 'OrderDetail',
  data () {
    return {
      order: {},
      user: {},
      tempId: '',
      isLoading: false
    }
  },
  components: {
    AlreadyPaid
  },
  props: ['sendOrder'],
  methods: {
    getOrder (id) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url)
        .then(res => {
          this.isLoading = false
          this.order = res.data.order
          this.user = res.data.order.user
        })
        .catch(() => {
          this.isLoading = false
          this.notFound = true
        })
    },
    openPaidModal (id) {
      this.tempId = id
      this.$refs.paidModal.showModal()
    },
    alreadyPaid (id) {
      this.$refs.paidModal.hideModal()
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http.post(url)
        .then(res => {
          this.isLoading = false
          this.getOrder(id)
        })
        .catch(err => {
          this.$InformMessage(err, '通知付款')
        })
    }
  },
  created () {
    console.log(this.$route.params.orderId)
    this.getOrder(this.$route.params.orderId)
  }
}
</script>
