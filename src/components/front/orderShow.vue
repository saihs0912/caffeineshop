<template>
    <div>
        <div class="card" v-if="sendOrder">
            <div class="card-header">
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            訂單編號：<br>{{ sendOrder.id }}
                        </div>
                        <div class="col-6 fs-6 text-end">
                            下單日期：<br>{{ $num.date(sendOrder.create_at) }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <table class="table">
                    <tbody>
                        <tr v-for="(item, i) in sendOrder.products" :key="i">
                            <td><div style="width: 50px;"><img class="img-fluid" :src="sendOrder.products[i].product.imageUrl" alt=""></div></td>
                            <td>{{ item.product.title }}</td>
                            <td>數量：{{ item.qty }}</td>
                            <td><span :class="{'text-decoration-line-through': item.final_total < item.total }">金額：{{ item.total }}</span><br><span v-if="item.final_total < item.total">折扣價：{{ item.final_total }}</span></td>
                        </tr>
                    </tbody>
                </table>
                <p class="card-text fw-bolder fs-3">總金額：{{ sendOrder.total }}</p>
                <a href="#" class="btn btn-brown" v-if="sendOrder.is_paid === false">通知已付款</a>
                <span class="btn btn-outline-brown" v-else>已付款</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'orderShow',
  props: ['sendOrder', 'sendId']
}
</script>
