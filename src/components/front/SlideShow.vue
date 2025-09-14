<template>
    <div id="myCarousel" class="carousel slide carousel-fade fadeIn" data-bs-ride="carousel" ref="carouselEl">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../assets/banners/show-banner01.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/banners/show-banner02.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../../assets/banners/show-banner03.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
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
.fadeIn {
  opacity: 0;
  animation: fadeIn 3s ease forwards;
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
