<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header bg-brown text-white">
          <h5 class="modal-title" id="exampleModalLabel">優惠券一覽</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="couponList.length !== 0">
            <span class="d-block pb-2">直接點選優惠券即可帶入購物車</span>
            <div class="p-3">
              <div class="card mb-3" v-for="(item, i) in couponList" :key="i">
                <div class="card-body d-flex">
                  <div class="w-75">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text">全項商品 {{ item.percent }} 折優惠</p>
                    <p class="card-text text-sm">到期日 {{ $num.date(item.due_date) }}</p>
                  </div>
                  <div class="w-25 btn-group">
                    <button type="button" class="btn btn-warning" @click="couponUse(item.code)">
                      套用 <i class="bi bi-ticket-perforated-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span class="d-block">或是由下方輸入優惠碼</span>
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="couponUse">套用優惠碼</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'CouponSelect',
  data() {
    return {
      couponList: [
        {
          name: '15%OFF優惠券',
          percent: 85,
          code: '15percentoff',
          due_date: 1785456000
        },
        {
          name: '開幕優惠券',
          percent: 40,
          code: 'newOpenShop',
          due_date: 1790726400
        }
      ],
      coupon_code: ''
    }
  },
  mixins: [modalMixin],
  methods: {
    couponUse(code) {
      if (code) this.coupon_code = code
      this.$emit('send-coupon', this.coupon_code)
      this.coupon_code = ''
      this.hideModal()
    }
  }
}
</script>
