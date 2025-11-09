<template>
  <div id="myCarousel" class="carousel slide carousel-fade fadeIn" data-bs-ride="carousel" ref="carouselEl" style="overflow: hidden;">
    <div class="carousel-inner extend-box">
      <div class="carousel-item position-relative active">
        <span class="position-absolute vertical-word text-white fw-bold text-shadow">
          一份工作，靠咖啡因再加油
        </span>
        <img src="../../assets/banners/show-banner01.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item position-relative">
        <span class="position-absolute vertical-word text-white fw-bold text-shadow">
          一日生活，從一杯咖啡開始
        </span>
        <img src="../../assets/banners/show-banner02.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item position-relative">
        <span class="position-absolute vertical-word text-white fw-bold text-shadow">
          一杯好茶，讓您放鬆身心靈
        </span>
        <img src="../../assets/banners/show-banner03.jpg" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item position-relative">
        <span class="position-absolute vertical-word text-white fw-bold text-shadow">
          一包茶包，也可以喝出樂趣
        </span>
        <img src="../../assets/banners/show-banner04.jpg" class="d-block w-100" alt="...">
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel } from 'bootstrap'

export default {
  name: 'SlideShow',
  data () {
    return {
      carousel: null,
      isShow: false
    }
  },
  mounted () {
    const el = this.$refs.carouselEl
    setTimeout(() => {
      this.carousel = new Carousel(el, { interval: 5000 })
      this.carousel.cycle()
      this.isShow = true
    }, 1500)
  },
  beforeUnmount () {
    if (this.carousel) this.carousel.dispose()
  }
}
</script>

<style>
.vertical-word {
  writing-mode: vertical-lr;
  font-size: 1.5rem;
  left: 5%;
  top: 50px;
}
.fadeIn {
  opacity: 0;
  animation: fadeIn 3s ease forwards;
}
.text-shadow {
  text-shadow: 2px 2px 5px #1c1c1c;
}
@media (max-width: 767px){
  .extend-box {
    width: 150%;
  }
}
@media (max-width: 575px){
  .extend-box {
    width: 180%;
  }
  .vertical-word {
    writing-mode: vertical-lr;
    font-size: 1.1rem;
    left: 5%;
    top: 20px;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
