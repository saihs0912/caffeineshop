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
          <h5 class="modal-title" id="exampleModalLabel">優惠券</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3" v-if="couponList.length !== 0">
            <span class="d-block px-3">直接點選優惠券即可帶入購物車</span>
            <div class="p-3">
              <div class="card mb-3" v-for="(item, i) in couponList" :key="i">
                <div
                  class="card-body d-flex flex-lg-nowrap flex-md-nowrap flex-sm-wrap flex-wrap flex-lg-row flex-md-row flex-sm-column flex-column position-relative"
                >
                  <div class="couponTitle">
                    <h5 class="card-title">{{ item.name }}</h5>
                    <p class="card-text">全品項 {{ unitsDigit(item.percent) }} 折</p>
                  </div>
                  <div class="couponDate">
                    <p class="card-text text-sm">到期日 {{ $num.date(item.due_date) }}</p>
                  </div>
                  <div
                    class="couponBtn btn-group float-lg-none float-md-none float-sm-end float-end"
                  >
                    <button type="button" :disabled="item.code === usedCoupon" class="btn btn-warning" @click="couponUse(item.code)">
                      <span v-if="item.code === usedCoupon">已使用</span>
                      <span v-else>使用</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <span class="d-block px-3">或是由下方輸入優惠碼</span>
          </div>
          <div class="mb-3 px-3">
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="coupon_code"
              placeholder="請輸入優惠碼"
            />
          </div>
        </div>
        <div class="modal-footer px-3">
          {{ coupon_code }}
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="couponUse('')">套用優惠碼</button>
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
  props: {
    usedCoupon: {
      default() {
        return {}
      }
    }
  },
  methods: {
    couponUse(code) {
      if (code) this.coupon_code = code
      if (this.usedCoupon === this.coupon_code) {
        alert('此優惠券已經使用！')
        return
      } else if (this.coupon_code === '') {
        alert('請輸入優惠碼！')
        return
      }
      this.$emit('send-coupon', this.coupon_code)
      this.coupon_code = ''
      this.hideModal()
    },
    unitsDigit(num) {
      if (num % 10 === 0) return num / 10
      else return num
    }
  }
}
</script>

<style>
.couponTitle {
  width: 50%;
}
.couponDate,
.couponBtn {
  width: 25%;
}
@media (max-width: 767px) {
  .couponTitle {
    width: 50%;
  }
  .couponDate {
    width: 50%;
  }
  .couponBtn {
    position: absolute;
    width: 40%;
    top: 17px;
    right: 17px;
    height: calc(100% - 34px);
  }
}
</style>
