<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <bread-crumb />
      </div>
      <div class="col-12">
        <h1>最新消息</h1>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/front/BreadCrumb.vue'

export default {
  name: 'ArticlesList',
  data() {
    return {
      list: []
    }
  },
  components: {
    BreadCrumb
  }
}
</script>
