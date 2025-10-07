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
  <div class="container" style="max-width: 991px;">
    <div class="row">
      <div class="col-12">
        <checkout-process></checkout-process>
        <component :is="currentStepComponent"></component>
        <button type="button" class="btn btn-primary" @click="preStep" v-if="(currentStep !== 1) || (currentStep <= totalSteps)">上一步</button>
        <button type="button" class="btn btn-primary" @click="nextStep" v-if="currentStep !== totalSteps">下一步</button>
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
      totalSteps: 4
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
    },
    preStep () {
      if (this.currentStep > 1) this.currentStep--
    }
  },
  computed: {
    currentStepComponent () {
      return ['CheckTotal', 'CheckCustomer', 'CheckFinal', 'CheckOver'][this.currentStep - 1]
    }
  }
}
</script>
