<template>
  <loading-modal :active="isLoading"></loading-modal>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none">首頁</router-link> >
          <span>購物車</span>
        </div>
        <h1>購物車</h1>
      </div>
      <div v-if="num === 0">
        <p class="text-center">
          購物車內是空的<br /><br />就像你的咖啡杯一樣<br /><br /><router-link
            to="/shopping"
            class="no-underline fw-bold btn btn-outline-brown"
            >回商店繼續逛逛</router-link
          ><br /><br />
          <span v-if="length !== 0">或是直接從下面追蹤清單放入購物車吧！</span>
        </p>
      </div>
      <template v-else>
        <div class="col-lg-8 col-md-8 col-sm-12 col-12">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th></th>
                <th>商品名稱</th>
                <th>單價</th>
                <th>數量</th>
                <th>總額</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in cart.carts" :key="i">
                <td class="py-3" style="width: 80px">
                  <div>
                    <img
                      :src="cart.carts[i].product.imageUrl"
                      :alt="item.product.title"
                      class="img-fluid"
                    />
                  </div>
                </td>
                <td class="py-3">
                  <router-link
                    class="no-underline d-block h-100"
                    :to="{ name: 'product', params: { productId: item.product.id } }"
                    >{{ item.product.title }}</router-link
                  >
                </td>
                <td>
                  {{ item.product.price }}
                </td>
                <td class="py-3" style="width: 80px">
                  <input
                    type="number"
                    class="form-control"
                    v-model.number="item.qty"
                    min="1"
                    max="20"
                    @change="updateCart(item, 'cart')"
                    :disabled="item.id === status.loadingItem"
                  />
                </td>
                <td class="py-3">
                  <span class="fs-5 fw-bold">{{ $num.currency(item.final_total) }}</span>
                </td>
                <td class="text-end" style="width: 50px">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn"
                    @click="deleteCartItem(item.id, 'cart')"
                    :disabled="item.id === status.loadingItem"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-12 text-center" :class="{ fixedBox: fixedBox, noFixedBox: !fixedBox }">
          <div class="border py-4">
            <div class="pb-3 fs-3 text-success">
              <span
                :class="[
                  {
                    'fs-4': cart.total !== cart.final_total,
                    'text-decoration-line-through': cart.total !== cart.final_total
                  }
                ]"
                >{{ $num.currency(cart.total) }} 元<br
              /></span>
              <span v-if="cart.total !== cart.final_total"
                >合計 {{ $num.currency(cart.final_total) }} 元<br /><span
                  class="text-danger"
                  style="font-size: 1rem"
                  >已套用 {{ unitsDigit(cart.carts[0].coupon.percent) }}折 優惠券</span
                ></span
              >
            </div>
            <div class="pb-4">
              <button
                type="button"
                class="btn btn-outline-warning"
                @click.prevent="openCouponModal"
              >
                查看優惠券 <i class="bi bi-ticket-perforated-fill"></i>
              </button>
            </div>
            <div class="pb-4 btn-group w-75">
              <button type="button" class="btn btn-secondary fs-5" v-if="num === 0">
                購物車內沒有商品
              </button>
              <button type="button" class="btn btn-danger fs-5" @click="goToCheck" v-else>
                前往結帳
              </button>
            </div>
            <div>
              或是...<br />
              <router-link to="/shopping" class="no-underline fw-bold">回商店繼續逛逛</router-link>
            </div>
          </div>
        </div>
      </template>
      <div class="col-12 mt-5" v-if="length !== 0">
        <p class="fw-bold fs-4">追蹤清單內尚有商品</p>
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 mb-2"
              v-for="(item, i) in filterData"
              :key="i"
              :class="{ fadeOut: this.favorNum === i }"
            >
              <div class="border d-flex p-2">
                <div class="w-25">
                  <router-link
                    class="no-underline text-dark"
                    :to="{ name: 'product', params: { productId: item.id } }"
                    ><img :src="filterData[i].imageUrl" class="img-fluid" :alt="item.title"
                  /></router-link>
                </div>
                <div class="w-75 ps-2 position-relative d-flex">
                  <button
                    class="btn btn-outline-danger btn-sm position-absolute top-0 end-0"
                    type="button"
                    style="font-size: 0.6rem"
                    @click.prevent="deleteFavorite(item.id, i)"
                    :disabled="favorNum !== i && favorNum !== ''"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                  <div class="d-flex flex-column justify-content-center" style="width: 50%">
                    <router-link
                      class="no-underline text-dark"
                      :to="{ name: 'product', params: { productId: item.id } }"
                    >
                      <span class="fw-bold">
                        {{ item.title }}<br />
                        <span class="fs-5">{{ item.price }} 元</span>
                      </span></router-link
                    >
                  </div>
                  <div class="d-flex flex-column justify-content-center" style="width: 50%">
                    <button
                      type="button"
                      class="btn btn-brown w-75"
                      @click="addProduct(item.id, i, 'cart')"
                    >
                      <i class="bi bi-cart-fill"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <coupon-select ref="couponModal" :usedCoupon="usedCoupon" @send-coupon="couponUse" />
</template>

<script>
import emitter from '@/methods/emitter'
import CouponSelect from '@/components/front/CouponSelect.vue'
import {
  getCart,
  updateCart,
  deleteCartItem,
  getAllProducts,
  addToCart,
  addCouponCode
} from '@/methods/api'

export default {
  name: 'CartPage',
  data() {
    return {
      cart: {},
      getIt: '',
      num: 0,
      status: {
        loadingItem: ''
      },
      err: false,
      productList: [],
      length: 0,
      favorite: JSON.parse(localStorage.getItem('favoriteList')) || [],
      favorNum: '',
      fixedBox: false,
      usedCoupon: '',
      isLoading: false
    }
  },
  components: {
    CouponSelect
  },
  methods: {
    getCart,
    updateCart,
    deleteCartItem,
    goToCheck() {
      this.$router.push('/checkout')
    },
    async allProducts() {
      try {
        const products = await getAllProducts(this.$http)
        this.productList = products
      } catch (err) {
        this.$InformMessage(err, '取得商品')
      }
    },
    deleteFavorite(id, i) {
      const favoriteId = this.favorite.indexOf(id)
      this.favorNum = i
      setTimeout(() => {
        this.favorNum = ''
        this.favorite.splice(favoriteId, 1)
        localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
      }, 500)
    },
    async addProduct(id, i, from) {
      const favoriteId = this.favorite.indexOf(id)
      this.favorNum = i
      await new Promise((resolve) => setTimeout(resolve, 1000))
      this.favorNum = ''
      this.favorite.splice(favoriteId, 1)
      localStorage.setItem('favoriteList', JSON.stringify(this.favorite))
      try {
        const res = await addToCart(this.$http, id, 1, from)
        console.log(res)
        this.$InformMessage(res, '商品放入購物車')
        this.getCart('cart')
      } catch (err) {
        this.$InformMessage(err.message)
      }
    },
    openCouponModal() {
      this.$refs.couponModal.showModal()
    },
    async couponUse(couponCode) {
      this.$refs.couponModal.hideModal()
      this.isLoading = true
      try {
        const couponResult = await addCouponCode(couponCode, this.$http)
        if (couponResult.data.success) this.getCart('cart')
        else if (!couponResult.data.success) throw couponResult
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$InformMessage(err, '添加優惠券')
      }
    },
    handleScroll() {
      if (window.scrollY > 72 && this.fixedBox === false) {
        this.fixedBox = true
        console.log(this.fixedBox)
      } else if (window.scrollY <= 72 && this.fixedBox === true) {
        this.fixedBox = false
        console.log(this.fixedBox)
      }
    },
    unitsDigit(num) {
      if (num % 10 === 0) return num / 10
      else return num
    }
  },
  computed: {
    filterData() {
      const result = []
      const num = this.favorite.length
      this.productList.forEach((item) => {
        for (let i = 0; i < num; i++) {
          if (item.id === this.favorite[i]) result.push(item)
        }
      })
      return result
    }
  },
  watch: {
    filterData(newNum, oldNum) {
      this.length = newNum.length
    }
  },
  created() {
    this.allProducts()
    emitter.on('updateCart', () => {
      this.getCart('cart')
    })
  },
  mounted() {
    this.getCart('cart')
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
.fadeOut {
  transition: opacity 0.5s ease;
  opacity: 0;
}
.noFixedBox {
  position: static;
}
.fixedBox {
  position: fixed;
  top: 74px;
  right: 0;
}
</style>
