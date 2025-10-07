<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-4" style="max-width: 991px;">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <router-link to="/" class="navbar-brand"><i class="bi bi-box-arrow-left"></i> 返回</router-link>
        </div>
      </div>
    </div>
  </nav>
  <div class="container" style="max-width: 991px;">
    <div class="row">
      <div class="col-12">
        <router-view class="view two" name="total"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckPage'
}
</script>
