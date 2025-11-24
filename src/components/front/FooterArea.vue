<template>
  <footer class="bg-light" ref="footerArea" :class="{ footerFixed: fixed }">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 p-4">
          <div class="d-flex flex-nowrap align-items-center h-100">
            <div class="px-1">
              本網站僅供學習使用<br />
              <a class="no-underline" @click.prevent="goLogin" href="#"
                ><i class="bi bi-pc-display-horizontal"></i> 管理員登入</a
              >
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 col-6 p-4">
          <div class="d-flex flex-nowrap justify-content-end">
            <div class="p-2"><i class="bi bi-facebook fs-2"></i></div>
            <div class="p-2"><i class="bi bi-instagram fs-2"></i></div>
            <div class="p-2"><i class="bi bi-threads fs-2"></i></div>
            <div class="p-2"><i class="bi bi-envelope-fill fs-2"></i></div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterArea',
  data() {
    return {
      fixed: false,
      footerHeight: ''
    }
  },
  props: ['heightChange'],
  emits: ['sendHeight'],
  watch: {
    heightChange(newHeight, oldHeight) {
      this.fixed = newHeight
    }
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    }
  },
  mounted() {
    const footerArea = this.$refs.footerArea
    this.footerHeight = footerArea.offsetHeight
    this.$emit('sendHeight', this.footerHeight)
  }
}
</script>

<style>
.footerFixed {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
</style>
