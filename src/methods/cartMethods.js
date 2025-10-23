import emitter from './emitter'

export function addToCart (id, num, favor) {
  if (favor === true) {
    const favoriteId = this.favorite.indexOf(id)
    this.favorite.splice(favoriteId, 1)
    localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
  }
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
      this.$InformMessage(res, '商品放入購物車')
      emitter.emit('updateCart')
    })
    .catch(err => {
      this.status.loadingItem = ''
      this.$InformMessage(err, '商品放入購物車')
    })
}
