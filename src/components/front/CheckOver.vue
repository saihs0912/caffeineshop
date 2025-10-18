<template>
    <div class="mb-1 mt-5">
      <p class="text-center fw-bolder fs-3 mb-5">感謝您的購買！</p>
      <p class="text-center fs-5">接下來您可以...</p>
    </div>
    <div class="d-flex mx-auto justify-content-center">
      <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="goTo(sendOrder)">查看訂單</button>
      <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="goTo('/shopping')">回到商場</button>
      <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="goTo('/')">回到首頁</button>
    </div>
</template>

<script>
export default {
  name: 'CheckOver',
  emits: ['sendData', 'sendCart'],
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
    validateForm () {},
    goTo (where) {
      console.log(where)
      if (where === '/') {
        this.$router.push('/')
      } else if (where === '/shopping') {
        this.$router.push('/shopping')
      } else {
        this.$router.push({ name: 'order', query: { orderId: where } })
      }
    }
  }
}
</script>
