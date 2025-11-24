<template>
  <div class="toast-container position-fixed bottom-0 start-0 p-3" style="z-index: 1050">
    <toast-modal v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import ToastModal from '../ToastModal.vue'

export default {
  name: 'ToastMessages',
  components: {
    ToastModal
  },
  data() {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted() {
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>

<style>
@media (max-width: 767px) {
  .toast-container {
    margin-bottom: 80px !important;
  }
}
</style>
