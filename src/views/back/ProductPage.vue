<template>
  <loading-modal :active="isLoading"></loading-modal>
  <h1>商品管理</h1>
  <div class="text-end">
    <button class="btn btn-brown" type="button" @click.prevent="openModal(true)">
      <i class="bi bi-plus-square"></i> 新增商品
    </button>
  </div>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>產品名稱</th>
          <th>分類</th>
          <th>原價</th>
          <th>售價</th>
          <th>上架狀態</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td data-item="產品名稱">{{ item.title }}</td>
          <td data-item="分類">{{ item.category }}</td>
          <td data-item="原價">{{ item.origin_price }}</td>
          <td data-item="售價">{{ item.price }}</td>
          <td data-item="上架狀態">
            <span class="text-success" v-if="item.is_enabled">已上架</span>
            <span class="text-muted" v-else>未上架</span>
          </td>
          <td data-item="編輯">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm edit"
                @click="openModal(false, item)"
              ></button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm del"
                @click="openDelMdodal(item)"
              ></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <product-modal ref="productModal" :product="tempProduct" @update-product="updateProduct" />
  <del-modal ref="delModal" :item="tempProduct" @del-item="delProduct" />
  <pagination-modal :pages="pagination" @emit-page="getProducts" />
</template>

<script>
import { adminGetProducts, adminUpdateProduct, adminDelProduct } from '@/methods/api'
import ProductModal from '@/components/back/ProductModal.vue'
import DelModal from '@/components/back/DelModal.vue'
import PaginationModal from '@/components/back/PaginationModal.vue'

export default {
  head() {
    return {
      title: '商品管理'
    }
  },
  data() {
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
  inject: ['emitter'],
  methods: {
    adminGetProducts,
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.tempProduct.category = ''
        this.tempProduct.imagesUrl = []
      } else {
        this.tempProduct = { ...item }
        if (!this.tempProduct.imagesUrl) this.tempProduct.imagesUrl = []
      }
      this.isNew = isNew
      this.$refs.productModal.showModal()
    },
    adminUpdateProduct,
    openDelMdodal(item) {
      this.tempProduct = { ...item }
      this.$refs.delModal.showModal()
    },
    adminDelProduct
  },
  created() {
    this.getProducts()
  }
}
</script>
