import emitter from '@/methods/emitter'

// 取得全部商品
export async function getNewProducts() {
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
  try {
    const res = await this.$http.get(url)
    this.newProductList = res.data.products
  } catch (err) {
    this.$InformMessage(err, '取得商品')
  }
}

export async function getAllProducts(http) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
  try {
    const res = await http.get(api)
    return res.data.products
  } catch (err) {
    const error = new Error('取得產品列表')
    error.original = error
  }
}

// 取得商品資訊
export async function getProduct() {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
  try {
    const res = await this.$http.get(api)
    this.product = res.data.product
    if (this.product.imagesUrl) {
      this.imgArray = [].concat(this.product.imageUrl, this.product.imagesUrl)
    } else if (!this.product.imagesUrl) {
      this.imgArray = [].concat(this.product.imageUrl)
      this.num = 0
    }
  } catch (err) {
    this.$InformMessage(err, '取得商品資訊')
  }
}

// 取得購物車資訊
export async function getCart(from) {
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
  try {
    const res = await this.$http.get(url)
    const cart = res.data.data
    this.cart = cart
    this.num = cart.carts.length
    if (from === 'check') {
      this.$emit('sendCart', this.cart)
    } else if (from === 'cart') {
      this.$emit('updateNum', this.num)
    }
  } catch (err) {
    this.$InformMessage(err, '取得購物車資訊')
    if (from === 'cart') this.err = true
  }
}

// 將商品放入購物車
export async function addToCart(id, num, from, i) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
  if (from === 'detail') {
    if (this.cartPutIn) this.cartPutIn = !this.cartPutIn
  }
  this.status.loadingItem = id
  const cart = {
    product_id: id,
    qty: num
  }
  try {
    const res = await this.$http.post(api, { data: cart })
    if (from === 'list') {
      this.cart = i
    } else if (from === 'detail') {
      this.cartPutIn = true
    }
    this.status.loadingItem = ''
    this.$InformMessage(res, '商品放入購物車')
    emitter.emit('updateCart')
  } catch (err) {
    this.status.loadingItem = ''
    this.$InformMessage(err, '商品放入購物車')
  }
}

// 更新商品在購物車數量
export async function updateCart(item, from) {
  try {
    this.status.loadingItem = item.id
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
    const cart = {
      product_id: item.product_id,
      qty: item.qty
    }
    await this.$http.put(url, { data: cart })
    this.status.loadingItem = ''
    this.getCart(from)
  } catch (err) {
    this.status.loadingItem = ''
    this.$InformMessage(err, '購物車更新')
  }
}

// 刪除購物車內商品
export async function deleteCartItem(id, from) {
  try {
    this.status.loadingItem = id
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
    await this.$http.delete(url, { data: id })
    this.status.loadingItem = ''
    this.getCart(from)
  } catch (err) {
    this.status.loadingItem = ''
    this.$InformMessage(err, '商品刪除')
  }
}

// 加入優惠券
export async function addCouponCode() {
  try {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
    this.usedCoupon_code = this.coupon_code
    this.coupon_code = ''
    const coupon = {
      code: this.usedCoupon_code
    }
    await this.$http.post(url, { data: coupon })
    this.getCart('check')
  } catch (err) {
    this.$InformMessage(err, '添加優惠券')
  }
}

// 取得單筆訂單
export async function getOrder(id) {
  this.isLoading = true
  this.pageShow = false
  this.searchResult = []
  this.notFound = false
  this.connectError = false
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
  try {
    const res = await this.$http.get(url)
    this.isLoading = false
    if (res.data.order !== null) {
      this.searchResult.push(res.data.order)
    } else {
      this.notFound = true
    }
  } catch (err) {
    this.isLoading = false
    this.notFound = true
  }
}

// 取得全部訂單
export async function getOrderAll(page = 1) {
  this.pageShow = true
  this.isLoading = true
  if (this.notFound === true) this.notFound = false
  const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`
  try {
    const res = await this.$http.get(url)
    this.isLoading = false
    if (res.data.success) {
      this.searchResult = res.data.orders
      this.pagination = res.data.pagination
    }
  } catch (err) {
    this.isLoading = false
    this.$InformMessage(err, '取得訂單列表')
  }
}

// 後台登入
export async function signIn() {
  const url = `${process.env.VUE_APP_API}admin/signin`
  try {
    const res = await this.$http.post(url, this.user)
    if (res.data.success) {
      const { token, expired } = res.data
      this.$InformMessage(res, '登入')
      document.cookie = `makotoToken=${token}; expires=${expired}`
      setTimeout(() => {
        this.$router.push('/dashboard/productlist')
      }, 3000)
    }
  } catch (err) {
    this.$InformMessage(err, '登入')
  }
}

// 取得後台商品列表
export async function adminGetProducts(page = 1) {
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}`
  this.isLoading = true
  try {
    const res = await this.$http.get(api)
    this.isLoading = false
    if (res.data.success) {
      this.products = res.data.products
      this.pagination = res.data.pagination
    }
  } catch (err) {
    this.$InformMessage(err, '取得頁面資訊')
  }
}

// 後台更新商品資訊
export async function adminUpdateProduct(item) {
  this.tempProduct = item
  let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
  let httpMethod = 'post'
  if (!this.isNew) {
    api = `${api}/${item.id}`
    httpMethod = 'put'
  }
  try {
    const res = await this.$http[httpMethod](api, { data: this.tempProduct })
    if (res.data.success) {
      httpMethod === 'post'
        ? this.$InformMessage(res, '商品新增')
        : this.$InformMessage(res, '商品更新')
      this.getProducts(this.pagination.current_page)
    }
    this.$refs.productModal.hideModal()
  } catch (err) {
    this.$InformMessage(err, '商品更新')
  }
}

// 後台圖片上傳
export async function uploadFile(upImg) {
  try {
    const uploadFile = this.$refs[upImg].files[0]
    const formData = new FormData()
    formData.append('file-to-upload', uploadFile)
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`
    const res = await this.$http.post(url, formData)
    if (res.data.success) {
      upImg === 'fileInput'
        ? (this.tempProduct.imageUrl = res.data.imageUrl)
        : this.tempProduct.imagesUrl.push(res.data.imageUrl)
    }
  } catch (err) {
    this.$InformMessage(err, '圖片上傳')
  }
}

// 後台刪除商品
export async function adminDelProduct(item) {
  this.tempProduct = item
  const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
  try {
    const res = await this.$http.delete(api, { data: this.tempProduct })
    this.$InformMessage(res, `商品${item.title}刪除`)
    this.getProducts()
  } catch (err) {
    this.$InformMessage(err, '商品刪除')
  }
  this.$refs.delModal.hideModal()
}
