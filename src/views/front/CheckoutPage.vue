<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-4" style="max-width: 991px;">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <router-link to="/" class="navbar-brand"><i class="bi bi-box-arrow-left"></i> 返回</router-link>
        </div>
      </div>
    </div>
  </nav>
  <div class="container mb-5" style="max-width: 991px;">
    <div class="row">
      <div class="col-12">
        <checkout-process :step="currentStep"></checkout-process>
        <keep-alive>
          <component :is="currentStepComponent" ref="infoForm"
          :send-form-final="form"
          :send-cart-final="cart"
          :send-order="orderId"
          @send-cart="getCart"
          @send-data="getForm"></component>
        </keep-alive>
        <div class="d-flex mx-auto justify-content-center" style="max-width: 300px;">
          <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="preStep" v-if="pre">上一步</button>
          <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="nextStep" v-if="currentStep !== totalSteps">
            <span v-if="currentStep == 3">結帳</span>
            <span v-else>下一步</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckoutProcess from '@/components/front/CheckoutProcess.vue'
import CheckTotal from '@/components/front/CheckTotal.vue'
import CheckCustomer from '@/components/front/CheckCustomer.vue'
import CheckFinal from '@/components/front/CheckFinal.vue'
import CheckOver from '@/components/front/CheckOver.vue'

export default {
  name: 'CheckPage',
  data () {
    return {
      currentStep: 1,
      totalSteps: 4,
      pre: false,
      next: true,
      cart: {},
      tempCart: {},
      form: {},
      cartAndForm: {},
      orderId: ''
    }
  },
  components: {
    CheckoutProcess,
    CheckTotal,
    CheckCustomer,
    CheckFinal,
    CheckOver
  },
  props: ['sendForm'],
  methods: {
    // nextStep () {
    //   if (this.currentStep < this.totalSteps) this.currentStep++
    //   if (this.currentStep === 1 || this.currentStep === 4) {
    //     this.pre = false
    //   } else {
    //     this.pre = true
    //   }
    // },
    async nextStep () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      if (this.$refs.infoForm.validateForm()) {
        const valid = await this.$refs.infoForm.validateForm()
        console.log(valid)
        if (!valid) return
      }
      if (this.currentStep < this.totalSteps) this.currentStep++
      if (this.currentStep === 4) this.createOrder()
      if (this.currentStep === 1 || this.currentStep === 4) {
        this.pre = false
      } else {
        this.pre = true
      }
    },
    preStep () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      if (this.currentStep > 1) this.currentStep--
      if (this.currentStep === 1) this.pre = false
    },
    getCart (item) {
      this.cart = item
    },
    getForm (item) {
      this.form = item
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then(res => {
          this.orderId = res.data.orderId
        })
        .catch(err => {
          this.$InformMessage(err, '送出訂單')
        })
    }
  },
  computed: {
    currentStepComponent () {
      return ['CheckTotal', 'CheckCustomer', 'CheckFinal', 'CheckOver'][this.currentStep - 1]
    }
  }
}
</script>
