<template>
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1050">
        <toast-modal v-for="(msg, key) in messages" :key="key" :msg="msg"></toast-modal>
    </div>
</template>

<script>
import ToastModal from './ToastModal.vue'

export default {
  components: {
    ToastModal
  },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {}
}
</script>
