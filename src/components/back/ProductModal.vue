<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-brown text-white">
          <h5 class="modal-title" id="exampleModalLabel"><span>新增商品</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">請輸入圖片網址</label>
                <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" @change="inputFile('imageUrl')" v-model="imageUrl">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片<i class="fas fa-spinner fa-spin"></i></label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile('fileInput')">
              </div>
              <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
              <hr>
              <div class="mb-3">
                <label for="image" class="form-label">請輸入圖片網址</label>
                <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結" @change="inputFile('imagesUrl')" v-model="imagesUrl" :disabled="(tempProduct.imagesUrl || []).length >= 4">
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片<i class="fas fa-spinner fa-spin"></i></label>
                <input type="file" id="customFile" class="form-control" ref="filesInput" @change="uploadFile('filesInput')" :disabled="(tempProduct.imagesUrl || []).length >= 4">
              </div>
              <div class="d-flex flex-wrap flex-row bd-highlight" style="max-height: 140px; overflow-y: auto;">
                <div class="flex-img" v-for="(item, i) in tempProduct.imagesUrl" :key="i">
                  <i class="bi bi-x-circle-fill img-del" @click.prevent="imageDel(i)"></i>
                  <img class="img-fluid" :src="tempProduct.imagesUrl[i]" alt="">
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <select class="form-select" aria-label="Default select example" name="" id="" v-model="tempProduct.category">
                    <option value="" selected disabled>請選擇分類</option>
                    <option v-for="item in productList" :value="item" :key="item">{{ item }}</option>
                  </select>
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input type="text" class="form-control" id="unit" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price" placeholder="請輸入售價" v-model="tempProduct.price">
                </div>
              </div>
              <hr>
              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0" id="is_enabled" v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否上架</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="$emit('update-product', tempProduct)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'ProductModal',
  data () {
    return {
      modal: {},
      productList: ['咖啡豆', '掛耳咖啡包', '罐裝茶', '茶包', '咖啡生活用品', '茶生活用品', '禮盒專區', '甜點', '其他'],
      tempProduct: {},
      imageUrl: '',
      imagesUrl: []
    }
  },
  props: {
    product: {
      type: Object,
      default () { return {} }
    }
  },
  watch: {
    product () {
      this.tempProduct = this.product
    }
  },
  methods: {
    uploadFile (upImg) {
      const uploadFile = this.$refs[upImg].files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
      this.$http.post(url, formData)
        .then(res => {
          if (res.data.success) {
            upImg === 'fileInput' ? this.tempProduct.imageUrl = res.data.imageUrl : this.tempProduct.imagesUrl.push(res.data.imageUrl)
            this.$refs[upImg].value = ''
          }
        })
    },
    inputFile (putImg) {
      putImg === 'imageUrl' ? this.tempProduct[putImg] = this[putImg] : this.tempProduct[putImg].push(this[putImg])
      this[putImg] = ''
    },
    imageDel (i) {
      this.tempProduct.imagesUrl.splice(i, 1)
    }
  },
  mixins: [modalMixin]
}
</script>
