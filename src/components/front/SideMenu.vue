<template>
    <div>
      <h4 class="text-center">詳細類別</h4>
      <div v-for="(itemOut, keyOut) in Object.keys(typecategoryList)" :key="keyOut">
        {{ itemOut }}
        <ul class="list-group">
          <li class="list-group-item" v-for="(itemIn, keyIn) in typecategoryList[itemOut]" :key="keyIn"><a href="#" @click.prevent="typeSelect(itemIn)">{{ itemIn }}</a></li>
        </ul>
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
      console.log(keyword)
      emitter.emit('sednTo', keyword)
    }
  }
}
</script>
