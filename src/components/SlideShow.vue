<template>
  <transition>
    <div v-show="isShow" id="myCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel" ref="carouselEl">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../assets/banners/show-banner01.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../assets/banners/show-banner02.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../assets/banners/show-banner03.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../assets/banners/show-banner04.jpg" class="d-block w-100" alt="...">
            </div>
        </div>
        <!-- 左右切換箭頭 -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
    </transition>
</template>

<script>
import Carousel from 'bootstrap/js/dist/carousel'

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
      this.carousel = new Carousel(el, { interval: 3000 })
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
.v-enter-from{
  opacity: 0;
}
.v-enter-active{
  transition: ease 1s;
}
.v-enter-to{
  opacity: 1;
}
</style>
