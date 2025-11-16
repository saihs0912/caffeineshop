<template>
  <loading-modal :active="isLoading"></loading-modal>
  <h1>訂單管理</h1>
  <div>
    <table class="table mt-4">
        <thead>
          <tr>
            <th>結單日期</th>
            <th>訂購者</th>
            <th>訂單編號</th>
            <th>是否已付款</th>
            <th>總金額</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in orderList" :key="item.id">
            <td>{{ $num.date(item.create_at) }}</td>
            <td>{{ item.user.name }}</td>
            <td>{{ item.id }}</td>
            <td>
              <span v-if="item.is_paid == false" class="text-danger">尚未付款</span>
              <span v-else class="text-success">{{ $num.date(item.paid_date) }}付款</span>
            </td>
            <td>{{ $num.currency(item.total) }}</td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm edit" @click="openOrderModal(item)"></button>
                <button class="btn btn-outline-danger btn-sm del" @click="openDelModal(item)"></button>
              </div>
            </td>
          </tr>
        </tbody>
    </table>
  </div>
  <order-modal ref="orderModal" :order="tempOrder" :resetNum="num" @send-order="updateOrder"></order-modal>
  <del-modal ref="delModal" :item="tempOrder" @del-item="delOrder"></del-modal>
  <pagination-modal :pages="pagination" @emit-page="getOrderList"></pagination-modal>
</template>

<script>
import OrderModal from '@/components/back/OrderModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import PaginationModal from '@/components/back/PaginationModal.vue'

export default {
  head () {
    return {
      title: '訂單管理'
    }
  },
  data () {
    return {
      orderList: [],
      pagination: {},
      isLoading: false,
      tempOrder: {},
      num: ''
    }
  },
  components: {
    OrderModal,
    DelModal,
    PaginationModal
  },
  methods: {
    async getOrderList (page = 1) {
      try {
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
        this.isLoading = true
        const res = await this.$http.get(api)
        this.isLoading = false
        this.orderList = res.data.orders
        this.pagination = res.data.pagination
      } catch (err) {
        this.$InformMessage(err, '取得訂單列表')
      }
    },
    openOrderModal (item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.showModal()
    },
    openDelModal (item) {
      this.tempOrder = { ...item }
      this.$refs.delModal.showModal()
    },
    async updateOrder (item) {
      try {
        this.tempOrder = item
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
        await this.$http.put(api, { data: this.tempOrder })
        this.$refs.orderModal.hideModal()
        this.num = 0
        this.getOrderList(this.pagination.current_page)
      } catch (err) {
        this.$InformMessage(err, '訂單更新')
      }
    },
    async delOrder (item) {
      try {
        this.tempOrder = item
        const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
        const res = await this.$http.delete(api, { data: this.tempOrder })
        this.$InformMessage(res, '訂單刪除')
        this.$refs.delModal.hideModal()
        this.getOrderList()
      } catch (err) {
        this.$InformMessage(err, '訂單刪除')
      }
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
