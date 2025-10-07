<template>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-brown text-white">
            <h5 class="modal-title">
              <span>購物車</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <table class="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>商品</th>
                  <th>價格</th>
                  <th style="width: 90px;">數量</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in cart.carts" :key="i">
                  <th><div style="width: 40px;"><img :src="cart.carts[i].product.imageUrl" alt="" class="img-fluid"></div></th>
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.final_total }}</td>
                  <td><input type="number" class="form-control" v-model.number="item.qty" min="1" @change="updateCart(item)"></td>
                  <td><button type="button" class="btn btn-outline-danger btn-sm del" @click="deleteCartItem(item.id)"></button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer justify-content-between">
            <div class="d-block fs-4 text-success">商品總金額：{{ cart.total }}</div>
            <div class="btn-group">
              <button class="btn btn-outline-brown" @click="goToCheck">前往結帳</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter'
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'CartModal',
  data () {
    return {
      cart: {},
      getIt: ''
    }
  },
  mixins: [modalMixin],
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then(res => {
        console.log('取得購物車資訊', res)
        this.cart = res.data.data
        const num = this.cart.carts.length
        this.$emit('updateNum', num)
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart })
        .then(res => {
          console.log(res)
          this.getCart()
        })
    },
    deleteCartItem (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url, { data: id })
        .then(res => {
          this.getCart()
        })
    },
    goToCheck () {
      this.hideModal()
      this.$router.push('checkout')
    }
  },
  created () {
    this.getCart()
  },
  mounted () {
    emitter.on('updateCart', () => {
      this.getCart()
    })
  }
}
</script>
