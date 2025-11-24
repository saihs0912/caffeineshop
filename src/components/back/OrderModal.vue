<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="height: 80vh">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">訂單編輯</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="num = 0"
          ></button>
        </div>
        <div class="modal-body">
          <div class="btn-group d-block text-center">
            <button
              type="button"
              class="btn btn-outline-brown"
              :class="{ active: num === 0 }"
              @click="showBody(0)"
            >
              訂單資料
            </button>
            <button
              type="button"
              class="btn btn-outline-brown"
              :class="{ active: num === 1 }"
              @click="showBody(1)"
            >
              用戶資料
            </button>
            <button
              type="button"
              class="btn btn-outline-brown"
              :class="{ active: num === 2 }"
              @click="showBody(2)"
            >
              訂購商品
            </button>
          </div>
          <div class="overflow-y-auto" v-show="num === 0">
            <div class="mb-3">
              <label for="date">訂單日期</label>
              <input type="date" class="form-control" id="date" v-model="create_at" />
            </div>
            <div class="mb-3">
              <span>訂單編號：{{ tempOrder.id }}</span>
            </div>
            <div class="mb-3">
              <span v-if="tempOrder.is_paid === true" class="text-danger fs-5"
                >買方已於{{ $num.date(tempOrder.paid_date) }}付款</span
              >
            </div>
            <div class="mb-3">
              <span class="fs-3">總金額：{{ $num.currency(tempOrder.total) }}</span>
            </div>
            <div class="mb-3">
              <label for="message">訂單留言</label>
              <textarea
                name=""
                id="message"
                class="form-control"
                v-model="tempOrder.message"
                cols="30"
                role="10"
              ></textarea>
            </div>
          </div>
          <div class="overflow-y-auto" v-show="num === 1">
            <div class="mb-3">
              <label for="date">姓名</label>
              <input type="text" class="form-control" id="name" v-model="tempCustomer.name" />
            </div>
            <div class="mb-3">
              <label for="date">地址</label>
              <input type="text" class="form-control" id="name" v-model="tempCustomer.address" />
            </div>
            <div class="mb-3">
              <label for="date">Email</label>
              <input type="text" class="form-control" id="name" v-model="tempCustomer.email" />
            </div>
            <div class="mb-3">
              <label for="date">電話</label>
              <input type="text" class="form-control" id="name" v-model="tempCustomer.tel" />
            </div>
          </div>
          <div class="overflow-y-auto" v-show="num === 2">
            <table class="table">
              <thead>
                <tr>
                  <th>商品</th>
                  <th>單價</th>
                  <th>數量</th>
                  <th>總額</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in tempOrder.products" :key="i">
                  <td>{{ item.product.title }}</td>
                  <td>{{ item.product.price }}</td>
                  <td>{{ item.qty }}</td>
                  <td>
                    {{ $num.currency(item.final_total) }}
                    <span
                      v-if="item.final_total < item.total"
                      style="font-size: 0.8rem"
                      class="text-success"
                      ><br />已套用優惠券</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="num = 0">
            Close
          </button>
          <button type="button" class="btn btn-brown" @click="sendEdit">更新訂單</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'

export default {
  name: 'OrderModal',
  data() {
    return {
      tempOrder: {
        create_at: ''
      },
      tempCustomer: {},
      tempProduct: {},
      create_at: '',
      num: 0
    }
  },
  props: ['order', 'resetNum'],
  emits: ['sendOrder'],
  watch: {
    order(newOrder, oldOrder) {
      this.tempOrder = newOrder
      this.tempCustomer = newOrder.user
      const dateAndTime = new Date(this.tempOrder.create_at * 1000).toISOString().split('T')
      this.create_at = dateAndTime[0]
    },
    create_at() {
      this.tempOrder.create_at = Math.floor(new Date(this.create_at) / 1000)
    },
    resetNum() {
      this.num = 0
    }
  },
  methods: {
    showBody(num) {
      this.num = num
    },
    sendEdit() {
      this.tempOrder.user = this.tempCustomer
      this.$emit('sendOrder', this.tempOrder)
    }
  },
  mixins: [modalMixin]
}
</script>
