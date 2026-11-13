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
              class="col-lg-6 col-md-6 col-sm-12 col-12 p-4 d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">我們是誰？</h3>
              <p>一群在咖啡、茶飲上注入熱情與心血、志同道合的友人們</p>
              <p>經過長時間的合作、討論、募集資金，並確認經營方向</p>
              <p>終於成功地開張了這間以咖啡因商品為主的網路商店</p>
              <p>以滿足顧客需求為經營方針持續努力</p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center p-4">
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
              class="col-lg-6 col-md-6 col-sm-12 col-12 p-4 d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">一間存在於網路的商店</h3>
              <p>雖然我們沒有實體店面，依然可以滿足您的需求</p>
              <p>打開官網，動一動手指或滑鼠，就可以輕鬆選購、下單</p>
              <p>不時也會推出優惠折扣活動，下手更划算</p>
              <p>最後只要滿懷期待等待商品寄達即可</p>
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-first order-md-first text-center p-4"
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
              class="col-lg-6 col-md-6 col-sm-12 col-12 p-4 d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">因咖啡因，所以我們存在</h3>
              <p>在您的生活中，一定有需要攝取咖啡因的狀況</p>
              <p>我們開設網路商店就是為了此刻而存在</p>
              <p>無論是起床、工作、甚至假日來杯咖啡或茶</p>
              <p>都可達到提神、或是放鬆心情的效果</p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center p-4">
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
              class="col-lg-6 col-md-6 col-sm-12 col-12 p-4 d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">咖啡</h3>
              <p class="w-100">咖啡豆的產地來自巴西、印尼、哥倫比亞、牙買加等</p>
              <p class="w-100">各類咖啡，淺焙到深焙皆有，以滿足不同層面需求</p>
              <p class="w-100">再以咖啡豆、或磨成咖啡粉製成掛耳咖啡販售</p>
              <p class="w-100">也販賣各種咖啡相關器具、耗材等便於沖泡</p>
              <router-link
                href="#"
                class="btn btn-tea-green d-block text-rice-white ms-auto"
                to="/shopping"
                ><i class="bi bi-cart-fill"></i> 前往選購</router-link
              >
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-12 col-12 order-lg-first order-md-first text-center p-4"
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
              class="col-lg-6 col-md-6 col-sm-12 col-12 p-4 d-flex flex-wrap justifu-content-center align-items-center"
            >
              <h3 class="mb-3 w-100">茶</h3>
              <p class="w-100">茶葉來自台灣、日本、中國、印度、斯里蘭卡等主要產地</p>
              <p class="w-100">種類從綠茶、青茶、紅茶到花茶，各式茶類皆有</p>
              <p class="w-100">可選擇自行調配的散茶、或方便沖飲的茶包</p>
              <p class="w-100">另有販賣各種器具，方便您沖泡</p>
              <router-link
                href="#"
                class="btn btn-tea-green d-block text-rice-white ms-auto"
                to="/shopping"
                ><i class="bi bi-cart-fill"></i> 前往選購</router-link
              >
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 text-center p-4">
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
