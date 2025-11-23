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
    <pagination-modal :pages="pagination" @emit-pages="getCoupons"/>
    <coupon-modal ref="couponModal" :coupon="tempCoupon" @update-coupon="updateCoupon"/>
    <del-modal ref="delModal" :item="tempCoupon" @del-item="delCoupon"/>
</template>

<script>
import CouponModal from '@/components/back/CouponModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import PaginationModal from '@/components/back/PaginationModal.vue'

export default {
  head () {
    return {
      title: '優惠券管理'
    }
  },
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
    async getCoupons (page = 1) {
      try {
        this.isLoading = true
        const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${page}`
        const res = await this.$http.get(url)
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$InformMessage(err, '取得優惠券列表')
      }
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
    async updateCoupon (tempCoupon) {
      try {
        this.tempCoupon = tempCoupon
        let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
        let httpMethod = 'post'
        if (!this.isNew) {
          api = `${api}/${tempCoupon.id}`
          httpMethod = 'put'
        }
        const res = await this.$http[httpMethod](api, { data: this.tempCoupon })
        httpMethod === 'post' ? this.$InformMessage(res, '優惠券新增') : this.$InformMessage(res, '優惠券更新')
        this.$refs.couponModal.hideModal()
        this.getCoupons(this.pagination.current_page)
      } catch (err) {
        this.$refs.couponModal.hideModal()
        this.$InformMessage(err, '更新優惠券')
      }
    },
    openDelModal (item) {
      this.tempCoupon = { ...item }
      this.$refs.delModal.showModal()
    },
    async delCoupon (tempCoupon) {
      try {
        this.tempCoupon = tempCoupon
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        const res = await this.$http.delete(api, { data: this.tempCoupon })
        this.$InformMessage(res, `優惠券${tempCoupon.title}刪除`)
        this.$refs.delModal.hideModal()
        this.getCoupons()
      } catch (err) {
        this.$refs.delModal.hideModal()
        this.$InformMessage(err, '優惠券刪除')
      }
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
