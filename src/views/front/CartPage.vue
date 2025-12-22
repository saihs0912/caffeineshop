<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 col-12">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-12"></div>
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
