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
        <component :is="currentStepComponent" @send-data="formReceive"></component>
        <div class="d-flex mx-auto justify-content-center" style="max-width: 300px;">
          <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="preStep" v-if="pre">上一步</button>
          <button type="button" class="btn btn-outline-brown m-1 py-2 px-4 fs-4" @click="nextStep" v-if="currentStep !== totalSteps">下一步</button>
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
      form: {}
    }
  },
  components: {
    CheckoutProcess,
    CheckTotal,
    CheckCustomer,
    CheckFinal,
    CheckOver
  },
  methods: {
    nextStep () {
      if (this.currentStep < this.totalSteps) this.currentStep++
      if (this.currentStep === 1 || this.currentStep === 4) {
        this.pre = false
      } else {
        this.pre = true
      }
    },
    preStep () {
      if (this.currentStep > 1) this.currentStep--
    },
    formReceive (info) {
      console.log(info)
    }
  },
  computed: {
    currentStepComponent () {
      return ['CheckTotal', 'CheckCustomer', 'CheckFinal', 'CheckOver'][this.currentStep - 1]
    }
  },
  watch: {
    form () {}
  }
}
</script>
