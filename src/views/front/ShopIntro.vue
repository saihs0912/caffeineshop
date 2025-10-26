<template>
    <div class="areaBottom mb-4">
        <h2 class="text-center"><span>咖啡因商店是？</span></h2>
        <div class="container">
            <div class="row no-gutters my-5 ">
                <div class="p-0 col-lg-3 offset-lg-3 col-md-5 col-sm-6 col-12 text-center d-flex align-items-center justify-content-center p-1 introBlock">
                    <p class="fs-5">
                        一間專門販賣咖啡因商品的店鋪<br><br>
                        咖啡、茶類應有盡有<br><br>
                        是您提神、放鬆的好夥伴
                    </p>
                </div>
                <div class="p-0 col-lg-3 col-md-5 col-sm-6 col-12"><img src="../../assets/img/aboutshop01.jpg" alt="" class="img-fluid"></div>
                <div class="p-0 col-lg-3 col-md-5 col-sm-6 col-12 order-lg-last order-md-last order-sm-last text-center d-flex align-items-center justify-content-center p-1 introBlock">
                    <p class="fs-5">
                        除了咖啡因商品本身<br><br>
                        也販賣周邊耗材、器具<br><br>
                        以及一些搭配用的甜點
                    </p>
                </div>
                <div class="p-0 col-lg-3 offset-lg-3 col-md-5 col-sm-6 col-12"><img src="../../assets/img/aboutshop02.jpg" alt="" class="img-fluid"></div>
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
.introBlock{
    transition: 0.5s ease;
}
.introBlock:hover{
    background-color: rgba(77, 57, 0, 0.1);
}
</style>
