<template>
    <loading-modal :active="isLoading"></loading-modal>
    <h1>優惠券管理</h1>
    <div class="text-end">
        <button class="btn btn-brown" @click.prevent="openCouponModal(true)">建立新的優惠券</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th>名稱</th>
                <th>折扣百分比</th>
                <th>到期日</th>
                <th>是否啟用</th>
                <th>編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, key) in coupons" :key="key">
                <td>{{ item.title }}</td>
                <td>{{ item.percent }}</td>
                <td>{{ $num.date(item.due_date) }}</td>
                <td>
                  <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                  <span v-else class="text-muted">未啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <coupon-modal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></coupon-modal>
    <del-modal ref="delModal" :item="tempCoupon" @del-item="delCoupon"></del-modal>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'

export default {
  components: {
    CouponModal,
    DelModal
  },
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url)
        .then(res => {
          this.coupons = res.data.coupons
          this.isLoading = false
        })
    },
    openCouponModal (isNew, item) {
      this.isNew = isNew
      if (this.isNew) {
        this.tempCoupon = {
          ...this.tempCoupon,
          due_date: new Date().getTime() / 1000
        }
      } else {
        this.tempCoupon = { ...item }
      }
      this.$refs.couponModal.showModal()
    },
    updateCoupon (tempCoupon) {
      this.tempCoupon = tempCoupon
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${api}/${tempCoupon.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempCoupon })
        .then(res => {
          this.$refs.couponModal.hideModal()
          this.getCoupons()
        })
    },
    openDelModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.showModal()
    },
    delCoupon (tempCoupon) {
      this.tempCoupon = tempCoupon
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(api, { data: this.tempCoupon })
        .then(res => {
          this.$refs.delModal.hideModal()
          this.getCoupons()
        })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
