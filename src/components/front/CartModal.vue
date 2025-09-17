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
          <div class="modal-body"></div>
          <div class="modal-footer"></div>
        </div>
      </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'CartModal',
  mixins: [modalMixin]
}
</script>
