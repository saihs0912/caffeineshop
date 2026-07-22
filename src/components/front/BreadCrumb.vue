<template>
  <nav aria-label="breadcrumb" class="mt-4 mb-4">
    <ol class="breadcrumb" style="font-size: 0.8rem">
      <li
        v-for="item in breadCrumbs"
        :key="item.path"
        class="breadcrumb-item active"
        aria-current="page"
      >
        {{ item.meta.title || this.title }}
      </li>
    </ol>
  </nav>
  <p>{{ this.title }}</p>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    breadCrumbs() {
      const crumbsItem = [{ name: '首頁', link: '#' }]
      let item
      if (this.$route.matched) {
        item = this.$route.matched.filter((item) => item.meta && item.meta.title)
      } else {
        item = this.title
      }
      console.log(crumbsItem, item)
      return this.$route.matched.filter((item) => item.meta && item.meta.title)
    }
  },
  head() {
    return {
      title: `${this.$route.meta.title || this.title} - 咖啡因商店`
    }
  },
  props: ['title', 'category'],
  data() {
    return {
      crumbsItem: [],
      productTitle: '',
      productCategory: ''
    }
  }
}
</script>
