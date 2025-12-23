<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none">首頁</router-link> >
          <span>購物車</span>
        </div>
        <h1>購物車</h1>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th></th>
              <th>商品名稱</th>
              <th>單價</th>
              <th>數量</th>
              <th>總額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in cart.carts" :key="i">
              <td class="py-3" style="width: 80px">
                <div>
                  <img
                    :src="cart.carts[i].product.imageUrl"
                    :alt="item.product.title"
                    class="img-fluid"
                  />
                </div>
              </td>
              <td class="py-3">
                <router-link
                  class="no-underline d-block h-100"
                  :to="{ name: 'product', params: { productId: item.product.id } }"
                  >{{ item.product.title }}</router-link
                >
              </td>
              <td>
                {{ item.product.price }}
              </td>
              <td class="py-3" style="width: 80px">
                <input
                  type="number"
                  class="form-control"
                  v-model.number="item.qty"
                  min="1"
                  max="20"
                  @change="updateCart(item, 'cart')"
                  :disabled="item.id === status.loadingItem"
                />
              </td>
              <td class="py-3">
                {{ item.final_total }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-12">
        <div>
          查看優惠券
        </div>
        <div class="btn-group w-100">
          <button type="button" class="btn btn-danger fs-3">前往結帳</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/methods/emitter'
import { getCart, updateCart, deleteCartItem } from '@/methods/api'

export default {
  name: 'CartPage',
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
      this.getCart('cart')
    })
  },
  mounted() {
    this.getCart('cart')
  }
}
</script>
