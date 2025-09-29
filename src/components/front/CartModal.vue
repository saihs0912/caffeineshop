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
                  <th>數量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in cart.carts" :key="i">
                  <th></th>
                  <td>{{ item.product.title }}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
</template>

<script>
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
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
