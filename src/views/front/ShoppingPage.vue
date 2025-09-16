<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <side-menu></side-menu>
            </div>
            <div class="col-9">
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
