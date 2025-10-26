<template>
  <div class="mb-5 mt-5">
    <p class="text-center fw-bolder fs-3">請確認商品與金額</p>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>商品</th>
          <th>價格</th>
          <th style="width: 90px;">數量</th>
          <th>清除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in cart.carts" :key="i">
          <td><div style="width: 60px;"><img :src="cart.carts[i].product.imageUrl" alt="" class="img-fluid"></div></td>
          <td data-item="商品">{{ item.product.title }}</td>
          <td data-item="價格">{{ $num.currency(item.final_total) }}</td>
          <td data-item="數量"><input type="number" class="form-control" v-model.number="item.qty" min="1" @change="updateCart(item)" :disabled="item.id === status.loadingItem"></td>
          <td data-item="清除"><button type="button" class="btn btn-outline-danger btn-sm del" @click="deleteCartItem(item.id)"></button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr>
  <div class="container mb-4">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-8 col-12 mb-5">
        <span class="fs-4">套用優惠券</span> <span class="fs-6 text-danger">※ 一次限套用一張</span>
        <div class="input-group mb-3 mt-3">
          <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="addCouponCode">套用</button>
          <input type="text" class="form-control" placeholder="輸入優惠代碼" aria-label="Example text with button addon" aria-describedby="button-addon1" v-model="coupon_code">
        </div>
        <span v-if="cart.final_total < cart.total" class="text-success fs-6">※ 已套用優惠券</span>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-8 col-12 mb-5">
        <div class="d-block fs-4" :class="{'text-decoration-line-through': cart.final_total < cart.total }">總金額：{{ cart.total }}</div>
        <div class="d-block fs-4 text-success mt-3" v-if="cart.final_total < cart.total">折扣價：{{ $num.currency(cart.final_total) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckTotal',
  data () {
    return {
      cart: {},
      coupon_code: '',
      status: {
        loadingItem: ''
      }
    }
  },
  emits: ['sendData', 'sendCart', 'sendTry'],
  props: {
    sendFormFinal: {
      type: Object,
      default () { return {} }
    },
    sendCartFinal: {
      type: Object,
      default () { return {} }
    },
    sendOrder: {
      type: String
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url)
        .then(res => {
          this.cart = res.data.data
          const cart = this.cart
          this.$emit('sendCart', cart)
        })
        .catch(err => {
          this.$InformMessage(err, '取得購物車內容')
        })
    },
    updateCart (item) {
      this.status.loadingItem = item.id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart })
        .then(res => {
          this.status.loadingItem = ''
          this.getCart()
        })
        .catch(err => {
          this.status.loadingItem = ''
          this.$InformMessage(err, '更新購物車內容')
        })
    },
    deleteCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url, { data: id })
        .then(res => {
          this.status.loadingItem = ''
          this.getCart()
        })
        .catch(err => {
          this.status.loadingItem = ''
          this.$InformMessage(err, '刪除購物車內容')
        })
    },
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      this.usedCoupon_code = this.coupon_code
      this.coupon_code = ''
      const coupon = {
        code: this.usedCoupon_code
      }
      this.$http.post(url, { data: coupon })
        .then(res => {
          this.getCart()
        })
        .catch(err => {
          this.$InformMessage(err, '添加優惠券')
        })
    },
    validateForm () {}
  },
  created () {
    this.getCart()
  }
}
</script>
