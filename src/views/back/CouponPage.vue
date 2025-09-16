<template>
    <loading-modal :active="isLoading"></loading-modal>
    <h1>優惠券管理</h1>
    <div class="text-end">
        <button class="btn btn-brown" @click.prevent="openCouponModal(true)"><i class="bi bi-plus-square"></i> 新增優惠券</button>
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
                <td data-item="名稱">{{ item.title }}</td>
                <td data-item="折扣百分比">{{ item.percent }}</td>
                <td data-item="到期日">{{ $num.date(item.due_date) }}</td>
                <td data-item="是否啟用">
                  <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
                  <span v-else class="text-muted">未啟用</span>
                </td>
                <td data-item="編輯">
                    <div class="btn-group">
                        <button class="btn btn-outline-primary btn-sm edit" @click="openCouponModal(false, item)"></button>
                        <button class="btn btn-outline-danger btn-sm del" @click="openDelModal(item)"></button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <pagination-modal :pages="pagination" @emit-pages="getCoupons"></pagination-modal>
    <coupon-modal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"></coupon-modal>
    <del-modal ref="delModal" :item="tempCoupon" @del-item="delCoupon"></del-modal>
</template>

<script>
import CouponModal from '@/components/back/CouponModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import PaginationModal from '@/components/PaginationModal.vue'

export default {
  components: {
    CouponModal,
    DelModal,
    PaginationModal
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
      pagination: {},
      isNew: false,
      isLoading: false
    }
  },
  methods: {
    getCoupons (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
      this.$http.get(url)
        .then(res => {
          this.coupons = res.data.coupons
          this.pagination = res.data.pagination
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
