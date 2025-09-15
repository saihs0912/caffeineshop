<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col areaBottom">
                <h2 class="text-center"><span>新進商品</span></h2>
                <div class="d-grid gap-2 col-md-4 col-sm-4 col-6 mx-auto" style="padding: 20px 0;">
                    <button class="btn btn-brown" type="button">查看全部商品</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'NewProduct',
  data () {
    return {
      newProductList: []
    }
  },
  methods: {
    getNewProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=1`
      this.$http(url)
        .then(res => {
          this.newProductList = res.data.products
          console.log(res.data)
        })
    }
  },
  created () {
    this.getNewProduct()
  }
}
</script>

<style>
.container-fluid{
    padding: 20px 0;
}
</style>
