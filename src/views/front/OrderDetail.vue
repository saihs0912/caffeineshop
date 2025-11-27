<template>
  <loading-modal :active="isLoading"></loading-modal>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none">首頁</router-link> >
          <span>訂單明細</span>
        </div>
        <h1>訂單明細</h1>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 py-2 px-0 fs-5">
              <router-link to="/order" style="text-decoration: none"
                ><i class="bi bi-arrow-left-square-fill"></i> 回到訂單列表</router-link
              >
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12 col-12 pt-3 px-0 pb-5">
              <div class="card mt-3">
                <div class="card-header">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-8 col-md-8 col-sm-8 col-12 px-0">
                        <span>訂購日期：{{ $num.date(order.create_at) }}</span
                        ><br />
                        <span>訂單編號：{{ order.id }}</span>
                      </div>
                      <div
                        class="col-lg-4 col-md-4 col-sm-4 col-12 px-0 text-lg-end text-md-end text-sm-end text-start py-lg-0 py-md-0 py-sm-0 py-3"
                      >
                        <button
                          class="btn btn-lg btn-brown"
                          v-if="!order.is_paid"
                          type="button"
                          @click="openPaidModal(order.id)"
                        >
                          立即付款
                        </button>
                        <span
                          class="border border-brown rounded p-1 align-items-end mt-1 btn"
                          style="cursor: text"
                          v-else
                          >{{ $num.date(order.paid_date) }}已付款</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-7 col-md-7 col-sm-12 col-12 px-0">
                        <div class="border rounded overflow-hidden mb-3">
                          <table class="table mb-0 product-table">
                            <thead>
                              <tr>
                                <th colspan="2" class="bg-secondary text-white text-center">
                                  訂購商品
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(productItem, index) in order.products" :key="index">
                                <td class="border-0" style="width: 80px">
                                  <img
                                    class="img-fluid"
                                    :src="productItem.product.imageUrl"
                                    alt=""
                                  />
                                </td>
                                <td class="border-0">
                                  <ul
                                    class="list-group-horizontal d-flex flex-wrap order-list ps-0"
                                  >
                                    <li class="list-group-item border-0 pt-0">
                                      <router-link
                                        class="no-underline d-block h-100"
                                        :to="{
                                          name: 'product',
                                          params: { productId: productItem.product.id }
                                        }"
                                      >
                                        {{ productItem.product.title }}
                                      </router-link>
                                    </li>
                                    <li class="list-group-item border-0 d-flex align-items-center">
                                      <span>數量：{{ productItem.qty }}</span>
                                    </li>
                                    <li class="list-group-item border-0 d-flex align-items-center">
                                      <span
                                        >小計：{{ $num.currency(productItem.final_total) }}</span
                                      >
                                    </li>
                                    <li class="list-group-item border-0">
                                      <button
                                        type="button"
                                        class="btn btn-outline-brown btn-sm rounded-3"
                                        @click="
                                          addToCart($http, productItem.product_id, 1, 'order')
                                        "
                                        :disabled="productItem.product_id === status.loadingItem"
                                      >
                                        <i class="bi bi-cart"></i> 再次購買
                                      </button>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2" class="text-end">
                                  <span class="fs-4 text-success fw-bold"
                                    >總金額：{{ $num.currency(order.total) }}</span
                                  >
                                  <div class="d-block text-danger" v-if="order.total < total">
                                    <span
                                      class="border border-danger rounded fw-bold"
                                      style="font-size: 0.8rem"
                                      >已套用優惠券</span
                                    >
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="col-lg-5 col-md-5 col-sm-12 col-12 px-0">
                        <div class="border rounded overflow-hidden">
                          <table class="table mb-0">
                            <thead>
                              <tr>
                                <th colspan="2" class="bg-secondary text-white text-center">
                                  訂購者資料
                                </th>
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
                                <td class="border-0">{{ order.message }}</td>
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
  <already-paid ref="paidModal" :sendPayInfo="tempId" @emit-pay="alreadyPaid" />
</template>

<script>
import AlreadyPaid from '@/components/front/AlreadyPaid.vue'
import { getOrder, addToCart, checkOut } from '@/methods/api'

export default {
  name: 'OrderDetail',
  head() {
    return {
      title: '訂單明細 - 咖啡因商店'
    }
  },
  data() {
    return {
      order: {},
      user: {},
      total: 0,
      tempId: '',
      isLoading: false,
      status: {
        loadingItem: ''
      }
    }
  },
  components: {
    AlreadyPaid
  },
  props: ['sendOrder'],
  methods: {
    getOrder,
    openPaidModal(id) {
      this.tempId = id
      this.$refs.paidModal.showModal()
    },
    async alreadyPaid(id) {
      this.$refs.paidModal.hideModal()
      try {
        this.isLoading = true
        await checkOut(id, this.$http)
        this.isLoading = false
        this.getOrder(id, 'orderdetail')
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.$InformMessage('付款')
      }
    },
    addToCart
  },
  created() {
    this.getOrder(this.$route.params.orderId, 'orderdetail')
  }
}
</script>

<style>
.order-list li:first-child {
  width: 100%;
}
.order-list li:nth-child(2),
.order-list li:nth-child(3),
.order-list li:last-child {
  width: calc(100% / 3);
}
@media (max-width: 991px) {
  .order-list li:nth-child(2),
  .order-list li:nth-child(3),
  .order-list li:last-child {
    width: 50%;
  }
}
@media (max-width: 575px) {
  .order-list li:nth-child(2),
  .order-list li:nth-child(3),
  .order-list li:last-child {
    width: 100%;
  }
}
</style>
