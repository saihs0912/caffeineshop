export function addToCart (id, num) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
  this.status.loadingItem = id
  const cart = {
    product_id: id,
    qty: num
  }
  this.$http.post(api, { data: cart })
    .then(res => {
      this.status.loadingItem = ''
      console.log(res.data)
    })
}

export function getCart () {
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
  this.$http.get(url).then(res => {
    console.log('取得購物車資訊', res)
    this.cart = res.data.data
  })
}
