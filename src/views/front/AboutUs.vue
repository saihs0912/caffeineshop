<template>
  <div class="container">
    <div class="row">
      <div class="col-12" v-show="!this.$route.path === '/about'">
        <bread-crumb />
      </div>
      <div class="col-12">
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 pt-4 pb-4 text-center d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">我們是誰？</h3>
              <p class="w-100">
                一群志同道合的友人們所創立、經營<br /><br />
                在咖啡因上注入了熱情、心血與專業<br /><br />
                最終開成了這間咖啡因專屬網路商店<br /><br />
                以滿足顧客需求為經營方針持續努力
              </p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center m-0 p-0">
              <div class="mx-auto m-0 p-0">
                <picture alt title>
                  <source
                    media="(min-width: 992px)"
                    srcset="../../assets/img/aboutus00-1.jpg"
                    title
                  />
                  <img class="img-fluid" src="../../assets/img/aboutus00.jpg" alt="關於我們01" />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 pt-4 pb-4 text-center d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">一間存在於網路的商店</h3>
              <p class="w-100">
                即便沒有實體店面，也可滿足您的需求<br /><br />
                打開官網，就可以輕鬆選購、輕鬆下單<br /><br />
                不時會推出優惠折扣活動，下手更划算<br /><br />
                最後只要滿懷期待等待商品的寄達即可
              </p>
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-first order-md-first text-center m-0 p-0"
            >
              <div class="mx-auto m-0 p-0">
                <picture alt title>
                  <source
                    media="(min-width: 992px)"
                    srcset="../../assets/img/aboutus01-1.jpg"
                    title
                  />
                  <img class="img-fluid" src="../../assets/img/aboutus01.jpg" alt="關於我們02" />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 pt-4 pb-4 text-center d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">因咖啡因，所以我們存在</h3>
              <p class="w-100">
                生活中，常有需要攝取咖啡因的狀況<br /><br />
                我們的網路商店就是為了此刻而存在<br /><br />
                無論是早上起床、工作中、甚至假日<br /><br />
                來一杯咖啡因，提神、或是放鬆心情
              </p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center m-0 p-0">
              <div class="mx-auto m-0 p-0">
                <picture alt title>
                  <source
                    media="(min-width: 992px)"
                    srcset="../../assets/img/aboutus02-1.jpg"
                    title
                  />
                  <img class="img-fluid" src="../../assets/img/aboutus02.jpg" alt="關於我們03" />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 pt-4 pb-4 text-center d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">咖啡</h3>
              <p class="w-100">
                產地來自巴西、印尼、哥倫比亞、牙買加等<br /><br />
                各類咖啡，淺焙到深焙皆有，滿足不同需求<br /><br />
                以咖啡豆販賣，或磨成咖啡粉製成掛耳咖啡<br /><br />
                也販賣各種咖啡相關器具、耗材等便於沖泡
              </p>
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-first order-md-first text-center m-0 p-0"
            >
              <div class="mx-auto m-0 p-0">
                <picture alt title>
                  <source
                    media="(min-width: 992px)"
                    srcset="../../assets/img/aboutus04-1.jpg"
                    title
                  />
                  <img class="img-fluid" src="../../assets/img/aboutus04.jpg" alt="關於我們04" />
                </picture>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 pt-4 pb-4 text-center d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">茶</h3>
              <p class="w-100">
                來自台灣、日本、中國、印度、斯里蘭卡等<br /><br />
                從綠茶、青茶、紅茶到花茶，各式茶類皆有<br /><br />
                可選擇自行調配的散茶、或方便沖飲的茶包<br /><br />
                此外，也有販賣各種沖泡茶葉時所用的器具
              </p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center m-0 p-0">
              <div class="mx-auto m-0 p-0">
                <picture alt title>
                  <source
                    media="(min-width: 992px)"
                    srcset="../../assets/img/aboutus05-1.jpg"
                    title
                  />
                  <img class="img-fluid" src="../../assets/img/aboutus05.jpg" alt="關於我們05" />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/front/BreadCrumb.vue'

export default {
  name: 'AboutUs',
  head() {
    return {
      meta: [
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' },
        { property: 'og:title', content: '咖啡因商店' },
        { property: 'og:image', content: '../../assets/logo/logo.png' },
        { property: 'og:description', content: '一間販賣咖啡因商品的網路店鋪' }
      ]
    }
  },
  components: {
    BreadCrumb
  }
}
</script>
