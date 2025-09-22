<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light position-fixed mw-100 w-100" style="z-index: 1000;">
        <div class="container">
            <div class="row" style="width: 100%;">
                <div class="col-lg-12 col-md-11 col-sm-10 col-8">
                    <h1><a class="navbar-brand" href="#" style="margin: 10px;"><img class="img-fluid align-top" src="../../assets/logo/logo-1.png" width="40" alt=""></a> 咖啡因商店</h1>
                </div>
                <div class="col-lg-12 col-md-1 col-sm-2 col-4 text-end">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav01" aria-controls="navbarNav01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav01">
                        <ul class="navbar-nav">
                            <li class="nav-item"><router-link class="nav-link" to="/about">關於我們</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" to="/caffeine">咖啡與茶</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" to="/shopping">線上商店</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" to="/order">訂單查詢</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" to="/coupon">優惠代碼</router-link></li>
                            <li class="nav-item"><router-link class="nav-link" to="/follow">追蹤清單</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
