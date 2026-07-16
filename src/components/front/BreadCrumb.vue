<template>
  <nav aria-label="breadcrumb" class="mt-4 mb-4">
    <ol class="breadcrumb" style="font-size: 0.8rem">
      <li
        v-for="item in breadCrumbs"
        :key="item.path"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ item.meta.title }}
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    breadCrumbs() {
      console.log(this.$route.matched)
      return this.$route.matched.filter((item) => item.meta && item.meta.title)
    }
  },
  head() {
    return {
      title: `${this.$route.meta.title || this.title} - 咖啡因商店`
    }
  },
  props: ['title']
}
</script>
