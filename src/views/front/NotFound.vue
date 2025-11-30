<template>
  <div class="container" style="max-width: 600px;">
    <div class="row align-items-center align-content-center mt-4 mb-4" style="min-height: calc(100vh - 332px);">
      <div class="col-12 text-center">
        <h1>Oops...頁面不存在</h1>
        <p class="fs-5">將於 10 秒後跳回首頁</p>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-6 col-9 mx-auto" style="filter: grayscale(100%)">
        <img src="../../assets/img/404.jpg" alt="Oops...頁面不存在" class="img-fluid" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style>
* {
  font-family: '微軟正黑體', Arial, Helvetica, sans-serif;
}
</style>
