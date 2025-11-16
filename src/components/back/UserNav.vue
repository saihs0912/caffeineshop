<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary navtest">
        <div class="container-fluid">
            <span class="navbar-brand">後台管理</span>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><router-link class="nav-link" to="/dashboard/productlist"><i class="bi bi-archive-fill"></i> 產品</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/dashboard/orderlist"><i class="bi bi-card-checklist"></i> 訂單</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/dashboard/couponlist"><i class="bi bi-ticket-perforated-fill"></i> 優惠券</router-link></li>
                    <li class="nav-item"><a class="nav-link" href="#" @click.prevent="logOut"><i class="bi bi-box-arrow-right"></i> 登出</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'UserNav',
  methods: {
    async logOut () {
      try {
        const api = `${process.env.VUE_APP_API}logout`
        const res = await this.$http.post(api, this.user)
        if (res.data.success) this.$router.push('/login')
      } catch (err) {
        this.$InformMessage(err, '登入')
      }
    }
  }
}
</script>
