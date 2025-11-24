// 圖片上傳
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

// 取得購物車資訊
export async function getCart() {
  try {
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    const res = await this.$http.get(url)
    const cart = res.data.data
    this.cart = cart
    this.num = cart.carts.length
    this.$emit('updateNum', this.num)
  } catch (err) {
    this.$InformMessage(err, '取得購物車資訊')
    this.err = true
  }
}

// 將商品放入購物車
export async function updateCart(item) {
  try {
    this.status.loadingItem = item.id
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
    const cart = {
      product_id: item.product_id,
      qty: item.qty
    }
    await this.$http.put(url, { data: cart })
    this.status.loadingItem = ''
    this.getCart()
  } catch (err) {
    this.$InformMessage(err, '購物車更新')
  }
}

// 刪除購物車內商品
export async function deleteCartItem(id) {
  try {
    this.status.loadingItem = id
    const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
    await this.$http.delete(url, { data: id })
    this.status.loadingItem = ''
    this.getCart()
  } catch (err) {
    this.$InformMessage(err, '商品刪除')
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
