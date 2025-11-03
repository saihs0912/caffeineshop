<template>
    <div class="sideBar mt-4 mb-5">
      <h5 class="text-center p-2">找尋商品</h5>
      <div class="ps-4 pe-4">
        <div v-for="(itemOut, keyOut) in Object.keys(typecategoryList)" :key="keyOut" class="p-2">
          <span class="fw-bold border-bottom d-block">{{ itemOut }}</span>
          <ul class="list-group mb-4">
            <li class="list-group-item border-0 border-bottom ps-0 ms-3" v-for="(itemIn, keyIn) in typecategoryList[itemOut]" :key="keyIn"><a href="#" @click.prevent="typeSelect(itemIn)" class="d-block">{{ itemIn }}</a></li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter'

export default {
  name: 'SideMenu',
  data () {
    return {
      productList: ['咖啡豆', '掛耳咖啡包', '罐裝茶', '茶包', '咖啡生活用品', '茶生活用品', '禮盒專區', '甜點', '其他'],
      typecategoryList: {
        咖啡: ['咖啡豆', '掛耳咖啡包', '咖啡生活用品'],
        茶: ['罐裝茶', '茶包', '茶生活用品'],
        其他: ['禮盒專區', '甜點', '其他']
      }
    }
  },
  methods: {
    typeSelect (keyword) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      emitter.emit('sendTo', keyword)
    }
  }
}
</script>
