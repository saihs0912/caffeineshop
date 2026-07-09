<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb" style="font-size: 0.8rem">
      <li
        v-for="(item, i) in breadCrumbs"
        :key="item.path"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ item.meta.title }}{{ i }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    breadCrumbs() {
      return this.$route.matched.filter((item) => item.meta && item.meta.title)
    }
  },
  head() {
    return {
      title: `${this.$route.meta.title} - 咖啡因商店`
    }
  }
}
</script>
