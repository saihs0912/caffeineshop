<template>
    <loading-modal :active="isLoading"></loading-modal>
    <h1>商品管理</h1>
    <div class="text-end">
      <button class="btn btn-brown" type="button" @click.prevent="openModal(true)">新增產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>上架狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">已上架</span>
            <span class="text-muted" v-else>未上架</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelMdodal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination-modal :pages="pagination" @emit-pages="getProducts"></pagination-modal>
    <product-modal ref="productModal" :product="tempProduct" @update-product="updateProduct"></product-modal>
    <del-modal ref="delModal" :item="tempProduct" @del-item="delProduct"></del-modal>
</template>

<script>
import ProductModal from '@/components/back/ProductModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import PaginationModal from '@/components/PaginationModal.vue'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      isLoading: false,
      tempProduct: {},
      isNew: false
    }
  },
  components: {
    ProductModal,
    DelModal,
    PaginationModal
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(api)
        .then(res => {
          this.isLoading = false
          if (res.data.success) {
            this.products = res.data.products
            this.pagination = res.data.pagination
          }
        })
    },
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.tempProduct.category = ''
      } else {
        this.tempProduct = { ...item }
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    updateProduct (item) {
      console.log(item)
      this.tempProduct = item
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'
      if (!this.isNew) {
        api = `${api}/${item.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then(res => {
          if (res.data.success) {
            this.getProducts()
          } else {
            console.log(res.data)
          }
          this.$refs.productModal.hideModal()
        })
    },
    openDelMdodal (item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
    },
    delProduct (item) {
      this.tempProduct = item
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
      this.$http.delete(api, { data: this.tempProduct })
        .then(res => {
          this.getProducts()
        })
      this.$refs.delModal.hideModal()
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
