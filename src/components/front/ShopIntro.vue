<template>
    <div class="areaBottom px-0 mb-4">
        <h2 class="text-center"><span>咖啡因商店是？</span></h2>
        <div class="container">
            <div class="row no-gutters my-5" style="background-color: #090907;">
                <div class="col-lg-6 col-md-6 col-sm-12 col-12 p-0 order-lg-last order-md-last">
                    <img src="../../assets/img/aboutshop03.jpg" alt="" class="img-fluid">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-white text-center d-flex align-items-center justify-content-center flex-wrap py-5">
                    由一群熱愛咖啡因的同好所開設的店鋪<br>
                    <br>
                    將熱情貫注於工作中<br>
                    <br>
                    為了讓您喝上一杯好喝的咖啡、茶飲<br>
                    <div class="w-100 mt-5">
                        <router-link to="/about" class="aboutBtn no-underline border border-white px-4 py-2">更多關於我們 <i class="bi bi-arrow-right-short moveR"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ShopIntro'
}
</script>

<style>
.aboutBtn {
    color: rgba(255,255,255,1);
    transition: 0.5s ease;
}
.aboutBtn:hover {
    color: rgba(255,255,255,0.5)!important;
}
.moveR {
    transition: 0.5s ease;
}
.aboutBtn .moveR::before {
    transition: 0.5s ease;
}
.aboutBtn:hover .moveR::before {
    transform: translateX(6px);
}
</style>
