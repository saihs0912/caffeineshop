<template>
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">訂單編輯</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="date">訂單日期</label>
                        <input type="date" class="form-control" id="date" v-model="create_at">
                    </div>
                    <div class="mb-3">
                        <label for="id">訂單編號</label>
                        <input type="text" class="form-control" id="id" v-model="tempOrder.id">
                    </div>
                    <div class="mb-3">
                        <label for="message">訂單留言</label>
                        <textarea name="" id="message" class="form-control" v-model="tempOrder.message" cols="30" role="10"></textarea>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tempOrder.is_paid" id="is_paid">
                            <label class="form-check-label" for="is_enabled">是否已付款</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">更新訂單</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'OrderModal',
  data () {
    return {
      tempOrder: {
        create_at: ''
      },
      create_at: ''
    }
  },
  props: ['order'],
  watch: {
    order (newOrder, oldOrder) {
      this.tempOrder = newOrder
      const dateAndTime = new Date(this.tempOrder.create_at * 1000)
        .toISOString().split('T')
      this.create_at = dateAndTime[0]
    },
    create_at () {
      this.tempOrder.create_at = Math.floor(new Date(this.create_at) / 1000)
    }
  },
  mixins: [modalMixin]
}
</script>
