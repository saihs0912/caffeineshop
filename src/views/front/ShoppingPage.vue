<template>
  <div class="container pt-4">
    <div class="row">
      <div class="col-12">
        <bread-crumb :title="'線上商店'"></bread-crumb>
      </div>
      <div class="col-lg-3 col-md-3 col-sm-12 col-12 order-md-first order-lg-first">
        <side-menu />
      </div>
      <div class="col-lg-9 col-md-9 col-sm-12 col-12 order-sm-first order-first">
        <order-and-search />
        <shopping-list />
        <front-pagination />
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '@/components/front/SideMenu.vue'
import ShoppingList from '@/components/front/ShoppingList.vue'
import OrderAndSearch from '@/components/front/OrderAndSearch.vue'
import FrontPagination from '@/components/front/FrontPagination.vue'
import BreadCrumb from '@/components/front/BreadCrumb.vue'

export default {
  head() {
    return {
      meta: [
        { name: 'description', content: '一間販賣咖啡因商品的網路店鋪' },
        { name: 'keywords', content: '咖啡因商店,咖啡豆,濾掛式咖啡,茶葉,茶包,甜點' }
      ]
    }
  },
  components: {
    SideMenu,
    ShoppingList,
    OrderAndSearch,
    FrontPagination,
    BreadCrumb
  },
  mounted() {
    console.log(this.$route.meta.title)
  }
}
</script>
