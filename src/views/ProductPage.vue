<template>
    <loading-modal :active="isLoading"></loading-modal>
    <div class="container-fluid">
        <div class="row">
            <div class="col">
                <div class="text-end">
                  <button class="btn btn-brown" type="button" @click.prevent="openModal">增加一個產品</button>
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
                                    <button type="button" class="btn btn-outline-primary btn-sm">編輯</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm">刪除</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <product-modal ref="productModal" :product="tempProduct"></product-modal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue'

export default {
  data () {
    return {
      products: [],
      isLoading: false,
      tempProduct: {}
    }
  },
  components: {
    ProductModal
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
          }
        })
    },
    openModal () {
      this.$refs.productModal.showModal()
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style>
.container{
    background-color: #ffffff;
}
</style>
