<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="mt-4 mb-4">
          <router-link to="/" style="text-decoration: none">首頁</router-link> > <span>優惠碼</span>
        </div>
        <h1>優惠碼</h1>
        <div class="container">
          <div class="col-12 text-center" v-if="noCoupon">
            <span class="fs-3 fw-bold">目前沒有可用的優惠碼呢...</span>
          </div>
          <div class="row pt-5">
            <template v-for="(item, i) in coupons" :key="i">
              <div class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3" v-if="today <= item.due_date">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">{{ item.title }}</h5>
                    <p class="card-text">{{ removeZero(item.percent) }}折優惠券！</p>
                    <p class="card-text">
                      優惠碼：{{ item.code }}<br />
                      到期日：{{ $num.date(item.due_date) }}
                    </p>
                    <a href="#" class="btn btn-outline-brown" @click.prevent="copyCode(item.code)"
                      >複製優惠碼</a
                    >
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CouponList',
  head() {
    return {
      title: '優惠碼 - 咖啡因商店',
      meta: [
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: '../../assets/logo/logo.png' },
        { property: 'og:description', content: '一間販賣咖啡因商品的網路店鋪' }
      ]
    }
  },
  data() {
    return {
      coupons: [
        {
          code: '15percentoff',
          id: '-OcFXYe_7iPWu8c6e4j8',
          title: '15%OFF優惠券',
          due_date: 1767139200,
          percent: 85
        },
        {
          code: 'newOpenShop',
          id: '-O_2yguIoTokdwXeSqsS',
          title: '開幕優惠券',
          due_date: 1777507200,
          percent: 40
        }
      ],
      today: '',
      noCoupon: false
    }
  },
  methods: {
    copyCode(code) {
      navigator.clipboard.writeText(code)
      alert(`優惠碼 ${code} 複製成功！`)
    },
    removeZero(num) {
      if (num % 10 === 0) {
        return num / 10
      } else if (num % 10 !== 0) {
        return num
      }
    }
  },
  mounted() {
    const now = new Date()
    this.today = Math.floor(now / 1000)
    let num = 0
    this.coupons.forEach((item, i) => {
      if (this.today <= item.due_date) num++
    })
    if (num === 0) this.noCoupon = true
  }
}
</script>
