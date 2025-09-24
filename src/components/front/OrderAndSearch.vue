<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <div class="input-group mb-3">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon1" @click="resetCategoryAndSearch">重置全部</button>
                    <input type="text" placeholder="搜尋商品" class="form-control" aria-describedby="basic-addon1" v-model="cacheSearch">
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                <div class="d-flex w-100 mx-100 mb-3">
                    <div class="btn-group w-75">
                        <button type="button" class="btn btn-outline-secondary" @click="itemOrder('price')"><small>價格排序</small></button>
                    </div>
                    <div class="btn-group-vertical w-25" role="group" aria-label="Vertical radio toggle button group">
                        <button type="button" class="btn btn-outline-secondary arrow a-up" @click="itemOrder('price', 'up')"></button>
                        <button type="button" class="btn btn-outline-secondary arrow a-down" @click="itemOrder('price', 'down')"></button>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6 col-6">
                <div class="d-flex w-100 mx-100 mb-3">
                    <div class="btn-group w-75">
                        <button type="button" class="btn btn-outline-secondary" @click="itemOrder('release')"><small>上架排序</small></button>
                    </div>
                    <div class="btn-group-vertical w-25" role="group" aria-label="Vertical radio toggle button group">
                        <button type="button" class="btn btn-outline-secondary arrow a-up" @click="itemOrder('release', 'up')"></button>
                        <button type="button" class="btn btn-outline-secondary arrow a-down" @click="itemOrder('release', 'down')"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter'

export default {
  name: 'OrderAndSearch',
  data () {
    return {
      cacheSearch: ''
    }
  },
  watch: {
    cacheSearch () {
      emitter.emit('sendWord', this.cacheSearch)
    }
  },
  methods: {
    resetCategoryAndSearch () {
      this.cacheSearch = ''
      emitter.emit('resetAll')
    },
    itemOrder (order, upDown) {
      emitter.emit('arrOrder', { order, upDown })
    }
  }
}
</script>
