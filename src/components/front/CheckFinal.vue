<template>
    <div class="mb-5 mt-5">
        <p class="text-center fw-bolder fs-3">請確認您的個人資料以及訂單內容</p>
        <div class="pb-5">
          <table class="table">
            <tbody>
              <tr>
                <td>姓名：</td>
                <td>{{ sendFormFinal.user.name }}</td>
              </tr>
              <tr>
                <td>Email：</td>
                <td>{{ sendFormFinal.user.email }}</td>
              </tr>
              <tr>
                <td>地址：</td>
                <td>{{ sendFormFinal.user.address }}</td>
              </tr>
              <tr>
                <td>電話：</td>
                <td>{{ sendFormFinal.user.tel }}</td>
              </tr>
              <tr v-if="sendFormFinal.message">
                <td>留言：</td>
                <td>{{ sendFormFinal.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table class="table">
            <thead>
              <tr>
                <th>商品名稱</th>
                <th>數量</th>
                <th>總金額</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in sendCartFinal.carts" :key="i">
                <td>{{ item.product.title }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.final_total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <p class="fs-2">總金額：{{ $num.currency(sendCartFinal.final_total) }}</p>
          <p class="text-success" v-if="sendCartFinal.final_total < sendCartFinal.total">已套用優惠券</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'CheckFinal',
  data () {
    return {
      cart: {}
    }
  },
  emits: ['sendData', 'sendCart'],
  props: {
    sendFormFinal: {
      type: Object,
      default () { return {} }
    },
    sendCartFinal: {
      type: Object,
      default () { return {} }
    },
    sendOrder: {
      type: String
    }
  },
  methods: {
    validateForm () {}
  }
}
</script>
