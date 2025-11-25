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
              <button
                class="btn btn-outline-primary btn-sm edit"
                @click="openOrderModal(item)"
              ></button>
              <button
                class="btn btn-outline-danger btn-sm del"
                @click="openDelModal(item)"
              ></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <order-modal ref="orderModal" :order="tempOrder" :resetNum="num" @send-order="updateOrder" />
  <del-modal ref="delModal" :item="tempOrder" @del-item="delOrder" />
  <pagination-modal :pages="pagination" @emit-page="getOrderList" />
</template>

<script>
import OrderModal from '@/components/back/OrderModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import PaginationModal from '@/components/back/PaginationModal.vue'
import { getOrderList, updateOrder, delOrder } from '@/methods/api'

export default {
  head() {
    return {
      title: '訂單管理'
    }
  },
  data() {
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
    getOrderList,
    openOrderModal(item) {
      this.tempOrder = { ...item }
      this.$refs.orderModal.showModal()
    },
    openDelModal(item) {
      this.tempOrder = { ...item }
      this.$refs.delModal.showModal()
    },
    updateOrder,
    delOrder
  },
  created() {
    this.getOrderList()
  }
}
</script>
