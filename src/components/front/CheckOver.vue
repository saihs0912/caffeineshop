<template>
  <div class="mb-1 mt-5">
    <p class="text-center fw-bolder fs-3 mb-5">感謝您的購買！</p>
    <p class="text-center fs-5">接下來您可以...</p>
  </div>
  <div
    class="d-flex mx-auto justify-content-center flex-lg-nowrap flex-md-nowrap flex-sm-nowrap flex-wrap"
  >
    <div class="checkout-btns text-center">
      <button
        type="button"
        class="btn btn-outline-brown m-1 py-2 px-4 fs-4"
        @click="goTo(sendOrder)"
      >
        查看訂單
      </button>
    </div>
    <div class="checkout-btns text-center">
      <button
        type="button"
        class="btn btn-outline-brown m-1 py-2 px-4 fs-4"
        @click="goTo('/shopping')"
      >
        回到商場
      </button>
    </div>
    <div class="checkout-btns text-center">
      <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="goTo('/')">
        回到首頁
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckOver',
  emits: ['sendData', 'sendCart'],
  props: {
    sendFormFinal: {
      type: Object,
      default() {
        return {}
      }
    },
    sendCartFinal: {
      type: Object,
      default() {
        return {}
      }
    },
    sendOrder: {
      type: String
    }
  },
  methods: {
    validateForm() {},
    goTo(where) {
      if (where === '/') {
        this.$router.push('/')
      } else if (where === '/shopping') {
        this.$router.push('/shopping')
      } else {
        this.$router.push({ name: 'orderDetail', params: { orderId: where } })
      }
    }
  }
}
</script>

<style>
.checkout-btns {
  width: calc(100% / 3);
}
@media (max-width: 575px) {
  .checkout-btns {
    width: 100%;
  }
}
</style>
