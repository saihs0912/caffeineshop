<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-9 col-md-9 col-sm-12 col-12">
        <div class="d-flex w-100 position-relative pt-4">
          <span class="processline position-absolute d-block"></span>
          <span class="processlineDone position-absolute d-block" :style="widthObj"></span>
          <div class="w-25 text-center align-self-center">
            <i class="bi bi-check-circle bg-white fs-1 text-success" v-if="step === 1"></i>
            <i class="bi bi-circle-fill bg-white fs-4 text-success" v-else-if="step > 1"></i>
          </div>
          <div class="w-25 text-center align-text-bottom align-self-center">
            <i class="bi bi-check-circle bg-white fs-1 text-success" v-if="step === 2"></i>
            <i class="bi bi-circle bg-white fs-4 text-secondary" v-else-if="step < 2"></i>
            <i class="bi bi-circle-fill bg-white fs-4 text-success" v-else></i>
          </div>
          <div class="w-25 text-center align-self-center">
            <i class="bi bi-check-circle bg-white fs-1 text-success" v-if="step === 3"></i>
            <i class="bi bi-circle bg-white fs-4 text-secondary" v-else-if="step < 3"></i>
            <i class="bi bi-circle-fill bg-white fs-4 text-success" v-else></i>
          </div>
          <div class="w-25 text-center align-self-center">
            <i class="bi bi-check-circle bg-white fs-1 text-success" v-if="step === 4"></i>
            <i class="bi bi-circle bg-white fs-4 text-secondary" v-else-if="step < 4"></i>
          </div>
        </div>
        <div class="d-flex w-100">
          <div
            v-for="(item, i) in stepName"
            :key="'step' + i"
            class="w-25 text-secondary text-center"
            :class="[step == i + 1 ? 'fw-bolder' : '']"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutProcess',
  data() {
    return {
      widthObj: {
        width: ''
      },
      stepName: ['訂購資訊', '顧客資訊', '最終確認', '訂購完成']
    }
  },
  props: ['step'],
  watch: {
    step(newValue, oldValue) {
      this.widthObj.width = `calc( 75% * ((${newValue} - 1) / 3))`
    }
  }
}
</script>

<style>
.processline {
  top: 64%;
  left: 13%;
  width: 75%;
  border-top: 2px solid #6c757d;
  z-index: -1;
}
.processlineDone {
  top: 64%;
  left: 13%;
  z-index: -1;
  border-top: 2px solid #198754;
}
</style>
