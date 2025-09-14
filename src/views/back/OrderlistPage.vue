<template>
    <loading-modal :active="isLoading"></loading-modal>
    <h1>訂單管理</h1>
    <table class="table mt-4">
        <thead></thead>
    </table>
    <pagination-modal :pages="pagination" @emit-pages="getOrderList"></pagination-modal>
</template>

<script>
import PaginationModal from '@/components/PaginationModal.vue'

export default {
  data () {
    return {
      orderList: [],
      pagination: {},
      isLoading: false
    }
  },
  components: {
    PaginationModal
  },
  methods: {
    getOrderList (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then(res => {
          this.isLoading = false
          this.orderList = res.data.orders
          this.pagination = res.data.pagination
        })
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>
