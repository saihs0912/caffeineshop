<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="mt-4 mb-4">
                    <router-link to="/" style="text-decoration: none;">首頁</router-link> > <span>關於我們</span>
                </div>
                <h1>關於我們</h1>
                <div class="container">
                    <div class="row">
                        <div class="col-12 pt-4 pb-4 text-center">
                            <p>
                                由一群志同道合的友人們所創立、經營<br>
                                分別在咖啡、茶等不同領域注入了新血與熱情<br>
                                經過長時間的磋商與討論，最終開成了這間咖啡因專屬的網路商店
                            </p>
                            <div class="mx-auto mb-5" style="max-width: 400px;">
                                <img class="img-fluid" src="../../assets/img/aboutus03.jpg" alt="">
                            </div>
                            <h3 class="mb-3">一間存在於網路的商店</h3>
                            <p>
                                我們沒有實體店面，但商品及服務皆可滿足您的需求<br>
                                打開手機或電腦，就能輕鬆選購、輕鬆下單<br>
                                接著只要滿懷期待等待商品的送達
                            </p>
                            <div class="mx-auto mb-5" style="max-width: 400px;">
                                <img class="img-fluid" src="../../assets/img/aboutus01.jpg" alt="">
                            </div>
                            <h3 class="mb-3">因為咖啡因，所以我們存在</h3>
                            <p>
                                在你的一生中，是否會需要攝取咖啡因的時候呢？<br>
                                我們就是為了這個時候而存在！<br>
                                無論是早上起床後、或是工作喘口氣時、甚至是假日放鬆時
                            </p>
                            <div class="mx-auto mb-5" style="max-width: 400px;">
                                <img class="img-fluid" src="../../assets/img/aboutus02.jpg" alt="">
                            </div>
                            <h3 class="mb-3">咖啡</h3>
                            <p>
                                咖啡豆因種類，來自世界各地<br>
                                用累積的經驗來進行咖啡豆的品質確認、烘焙、調配<br>
                                都完成後，再將這些加工過的咖啡豆。依照需求<br>
                                包裝成一包包咖啡豆，或是磨成咖啡粉製成掛耳咖啡<br>
                                並使用宅配的方式，將平價又美味的咖啡商品送至您的所在地
                            </p>
                            <p>
                                也提供各種咖啡相關器具、耗材等<br>
                                便於您沖泡美味的咖啡
                            </p>
                            <div class="mx-auto mb-5" style="max-width: 400px;">
                                <img class="img-fluid" src="../../assets/img/aboutus04.jpg" alt="">
                            </div>
                            <h3 class="mb-3">茶</h3>
                            <p>
                                從綠茶、紅茶、烏龍茶<br>
                                到抹茶、煎茶、焙茶、玄米茶<br>
                                以及花茶、水果茶皆有
                            </p>
                            <p>
                                茶的來源依照種類來自台灣、日本、中國、印度、斯里蘭卡等<br>
                                再由我們團隊進行品質確認，確保您可以品嘗到好的茶
                            </p>
                            <p>
                                在工作或學習時，一杯茶即可增加專注力與提神<br>
                                除了提振精神外，也可以達到鎮定與放鬆的效果，對於休閒放鬆很有助益
                            </p>
                            <p>我們也提供相關的器具，方便您沖飲</p>
                            <div class="mx-auto mb-5" style="max-width: 400px;">
                                <img class="img-fluid" src="../../assets/img/aboutus05.jpg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'AboutUs',
  head () {
    return {
      title: '關於我們 - 咖啡因商店',
      meta: [
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: '../../assets/logo/logo.png' },
        { property: 'og:description', content: '一間販賣咖啡因商品的網路店鋪' }
      ]
    }
  }
}
</script>
