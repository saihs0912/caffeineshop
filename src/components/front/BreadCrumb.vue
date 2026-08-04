<template>
  <nav aria-label="breadcrumb" class="mt-4 mb-4">
    <ol class="breadcrumb" style="font-size: 0.8rem">
      <template v-for="item in breadCrumbs" :key="item.title">
        <li v-if="item.link" class="breadcrumb-item active" aria-current="page">
          <router-link :to="item.link">{{ item.title }}</router-link>
        </li>
        <li v-else class="breadcrumb-item active" aria-current="page">
          {{ item.title }}
        </li>
      </template>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'BreadCrumbs',
  computed: {
    breadCrumbs() {
      const crumbsItem = [{ title: '首頁', link: '#' }]
      let item
      console.log(this.$route.matched[1])
      // if (this.$route.matched) {
      //   console.log(this.$route.matched[1])
      //   item = this.$route.matched.filter((item) => item.meta && item.meta.title)
      // } else {
      //   item = this.title
      // }
      if (this.$route.matched[1].name === 'product') {
        const crumb2 = { title: '線上商店', link: '/shopping' }
        const crumb3 = { title: this.category }
        const crumb4 = { title: this.title }
        crumbsItem.push(crumb2, crumb3, crumb4)
      } else {
        const crumb2 = { title: this.$route.matched[1].meta.title }
        crumbsItem.push(crumb2)
      }
      console.log(crumbsItem, item)
      return crumbsItem
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
