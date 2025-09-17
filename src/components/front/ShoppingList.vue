<template>
    <div>商品一覽表</div>
</template>

<script>
import emitter from '@/methods/emitter'

export default {
  name: 'ShoppingList',
  data () {
    return {
      productList: []
    }
  },
  props: ['type'],
  methods: {
    getProduct () {}
  },
  mounted () {
    emitter.on('sendTo', keyword => {
      this.productList = keyword
      console.log('傳入', this.productList)
    })
  }
}
</script>
