<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-12 order-md-first order-lg-first">
                <side-menu></side-menu>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-12 col-12 order-sm-first order-first">
                <shopping-list></shopping-list>
            </div>
        </div>
    </div>
</template>

<script>
import SideMenu from '@/components/front/SideMenu.vue'
import ShoppingList from '@/components/front/ShoppingList.vue'

export default {
  components: {
    SideMenu,
    ShoppingList
  }
}
</script>
