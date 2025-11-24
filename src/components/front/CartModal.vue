<template>
  <div
    class="modal fade"
    id="delModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0" style="max-height: 80vh">
        <div class="modal-header bg-brown text-white">
          <h5 class="modal-title">
            <span>購物車</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body overflow-auto">
          <p v-if="num === 0" class="text-center fw-bolder fs-4">購物車內沒有商品</p>
          <table class="table align-middle mb-0" v-else>
            <tbody>
              <tr v-for="(item, i) in cart.carts" :key="i">
                <td style="width: 80px">
                  <div><img :src="cart.carts[i].product.imageUrl" alt="" class="img-fluid" /></div>
                </td>
                <td>
                  <ul class="list-group-horizontal d-flex flex-wrap cart-list ps-0">
                    <li class="list-group-item border-0 pt-0 pb-2">
                      <router-link
                        class="no-underline d-block h-100"
                        :to="{ name: 'product', params: { productId: item.product.id } }"
                        @click="hideModal"
                        >{{ item.product.title }}</router-link
                      >
                    </li>
                    <li class="list-group-item border-0 d-flex align-items-center">
                      單價：{{ item.final_total }}
                    </li>
                    <li class="list-group-item border-0 d-flex align-items-center">
                      數量：<input
                        type="number"
                        class="form-control"
                        v-model.number="item.qty"
                        min="1"
                        max="20"
                        @change="updateCart(item)"
                        :disabled="item.id === status.loadingItem"
                      />
                    </li>
                  </ul>
                </td>
                <td class="text-end" style="width: 50px">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn"
                    @click="deleteCartItem(item.id)"
                    :disabled="item.id === status.loadingItem"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="err" class="text-center fw-bold pt-3 pb-3 text-danger">
            無法取得購物車資訊！請重新連線
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <div class="d-block fs-5 text-danger" v-if="num === 0">請選購至少一項商品後再結帳！</div>
          <div class="d-block fs-4 text-success" v-else>總金額：{{ cart.total }}</div>
          <div class="btn-group">
            <button class="btn btn-outline-brown" @click="goToCheck" :disabled="num === 0">
              前往結帳
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import modalMixin from '@/mixins/modalMixin'
import { getCart, updateCart, deleteCartItem } from '@/methods/api'

export default {
  name: 'CartModal',
  data() {
    return {
      cart: {},
      getIt: '',
      num: 0,
      status: {
        loadingItem: ''
      },
      err: false
    }
  },
  mixins: [modalMixin],
  methods: {
    getCart,
    updateCart,
    deleteCartItem,
    goToCheck() {
      this.hideModal()
      this.$router.push('/checkout')
    }
  },
  created() {
    emitter.on('updateCart', () => {
      this.getCart()
    })
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style>
.cart-list li:first-child {
  width: 100%;
}
.cart-list li:nth-child(2),
.cart-list li:nth-child(3) {
  width: 50%;
}
.cart-list li input {
  width: 50%;
}
@media (max-width: 575px) {
  .cart-list li:nth-child(2),
  .cart-list li:nth-child(3) {
    width: 100%;
  }
}
</style>
