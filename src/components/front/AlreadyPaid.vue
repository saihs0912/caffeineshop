<template>
    <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-brown text-white">
          <h5 class="modal-title">
            <span>通知付款</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">確定要通知已付款嗎？</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  data-bs-dismiss="modal">取消
          </button>
          <button type="button" class="btn btn-brown" @click="$emit('emit-pay', tempPay)">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'PayModal',
  data () {
    return {
      tempPay: {}
    }
  },
  props: ['sendPayInfo'],
  emits: ['emit-pay'],
  watch: {
    sendPayInfo (newPay, oldPay) {
      this.tempPay = { ...newPay }
    }
  },
  mixins: [modalMixin]
}
</script>
