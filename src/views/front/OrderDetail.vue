<template>
    <loading-modal :active="isLoading"></loading-modal>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>訂單明細</span>
                </div>
                <h1>訂單明細</h1>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 py-2 px-0 fs-5">
                            <router-link to="/order" style="text-decoration: none;"><i class="bi bi-arrow-left-square-fill"></i> 回到訂單列表</router-link>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-12 pt-3 px-0 pb-5">
                            <div class="card mt-3">
                                <div class="card-header">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-8 col-md-8 col-sm-8 col-12 px-0">
                                                <span>訂購日期：{{ $num.date(order.create_at) }}</span><br>
                                                <span>訂單編號：{{ order.id }}</span>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-0 text-lg-end text-md-end text-sm-end text-start py-lg-0 py-md-0 py-sm-0 py-3">
                                                <button class="btn btn-lg btn-brown" v-if="!order.is_paid" type="button" @click="openPaidModal(order.id)">
                                                    立即付款
                                                </button>
                                                <span class="border border-brown rounded p-1 align-items-end mt-1 btn" style="cursor: text;" v-else>{{ $num.date(order.paid_date) }}已付款</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-7 col-md-7 col-sm-12 col-12">
                                                <div class="border rounded overflow-hidden mb-3">
                                                    <table class="table mb-0 product-table">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="2" class="bg-secondary text-white text-center">訂購商品</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(productItem, index) in order.products" :key="index">
                                                                <td class="border-0" style="width: 60px;">
                                                                    <img class="img-fluid" :src="productItem.product.imageUrl" alt="">
                                                                </td>
                                                                <td class="border-0">
                                                                    <ul class="list-group-horizontal d-flex flex-nowrap">
                                                                        <li class="list-group-item border-0 pt-0">
                                                                            <router-link class="no-underline d-block h-100" :to="{ name: 'product', params: { productId: productItem.product.id } }">
                                                                                {{ productItem.product.title }}
                                                                            </router-link>
                                                                        </li>
                                                                        <li class="list-group-item border-0 pt-0">
                                                                            數量：{{ productItem.qty }}
                                                                        </li>
                                                                        <li class="list-group-item border-0 pt-0">
                                                                            小計：{{ productItem.final_total }}
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div class="col-lg-5 col-md-5 col-sm-12 col-12">
                                                <div class="border rounded overflow-hidden">
                                                    <table class="table mb-0">
                                                        <thead>
                                                            <tr>
                                                                <th colspan="2" class="bg-secondary text-white text-center">訂購者資料</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td class="border-0 text-end">訂購人</td>
                                                                <td class="border-0">{{ user.name }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="border-0 text-end">地址</td>
                                                                <td class="border-0">{{ user.address }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="border-0 text-end">電話</td>
                                                                <td class="border-0">{{ user.tel }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="border-0 text-end">Email</td>
                                                                <td class="border-0">{{ user.email }}</td>
                                                            </tr>
                                                            <tr>
                                                                <td class="border-0 text-end">留言</td>
                                                                <td class="border-0">{{order.message}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
  head () {
    return {
      title: '訂單明細 - 咖啡因商店'
    }
  },
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
          this.isLoading = false
          this.$InformMessage(err, '付款')
        })
    }
  },
  created () {
    console.log(this.$route.params.orderId)
    this.getOrder(this.$route.params.orderId)
  }
}
</script>
