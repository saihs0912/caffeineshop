<template>
    <div class="container pt-4">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-12 order-md-first order-lg-first">
                <side-menu></side-menu>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-12 col-12 order-sm-first order-first">
                <order-and-search></order-and-search>
                <shopping-list></shopping-list>
                <front-pagination></front-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import SideMenu from '@/components/front/SideMenu.vue'
import ShoppingList from '@/components/front/ShoppingList.vue'
import OrderAndSearch from '@/components/front/OrderAndSearch.vue'
import FrontPagination from '@/components/front/FrontPagination.vue'

export default {
  components: {
    SideMenu,
    ShoppingList,
    OrderAndSearch,
    FrontPagination
  }
}
</script>
