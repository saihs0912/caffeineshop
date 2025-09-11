<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">後台管理</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item"><router-link class="nav-link" to="/dashboard/productlist">產品</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="">訂單</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/dashboard/couponlist">優惠券</router-link></li>
                    <li class="nav-item"><a class="nav-link" href="#" @click.prevent="logOut">登出</a></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'UserNav',
  methods: {
    logOut () {}
  }
}
</script>
