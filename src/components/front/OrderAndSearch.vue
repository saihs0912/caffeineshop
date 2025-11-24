<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12 col-12">
        <div class="input-group mb-3">
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon1"
            @click="resetCategoryAndSearch"
          >
            <i class="bi bi-x-lg"></i>
          </button>
          <input
            type="text"
            placeholder="搜尋商品"
            class="form-control"
            aria-describedby="basic-addon1"
            v-model="cacheSearch"
          />
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-6 align-self-center">
        <div class="d-flex w-100 mx-100 mb-3">
          <div class="w-75 text-right text-end">
            <button
              class="btn border-0 sort align-middle pe-2"
              @click="sortByPrice"
              :disabled="!result"
            >
              價格高低排序
            </button>
          </div>
          <div
            class="btn-group-vertical w-25"
            role="group"
            aria-label="Vertical radio toggle button group"
          >
            <button
              type="button"
              :disabled="!result"
              class="btn border-0 arrow a-up"
              @click="sortDesc('price')"
            ></button>
            <button
              type="button"
              :disabled="!result"
              class="btn border-0 arrow a-down"
              @click="sortAsc('price')"
            ></button>
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-6 col-6 align-self-center">
        <div class="d-flex w-100 mx-100 mb-3">
          <div class="w-75 text-right text-end">
            <button
              class="btn border-0 sort align-middle pe-2"
              @click="sortByDate"
              :disabled="!result"
            >
              上架順序排序
            </button>
          </div>
          <div
            class="btn-group-vertical w-25"
            role="group"
            aria-label="Vertical radio toggle button group"
          >
            <button
              type="button"
              :disabled="!result"
              class="btn border-0 arrow a-up"
              @click="sortAsc('date')"
            ></button>
            <button
              type="button"
              :disabled="!result"
              class="btn border-0 arrow a-down"
              @click="sortDesc('date')"
            ></button>
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
  data() {
    return {
      cacheSearch: '',
      sortType: '',
      sortOrder: 'asc',
      result: ''
    }
  },
  watch: {
    cacheSearch() {
      emitter.emit('sendWord', this.cacheSearch)
    }
  },
  methods: {
    resetCategoryAndSearch() {
      this.cacheSearch = ''
      emitter.emit('resetAll')
    },
    sortByPrice() {
      this.sortType = 'price'
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      emitter.emit('sort', { type: this.sortType, order: this.sortOrder })
    },
    sortByDate() {
      this.sortType = 'date'
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      emitter.emit('sort', { type: this.sortType, order: this.sortOrder })
    },
    sortAsc(order) {
      this.sortType = order
      this.sortOrder = 'asc'
      emitter.emit('sort', { type: this.sortType, order: this.sortOrder })
    },
    sortDesc(order) {
      this.sortType = order
      this.sortOrder = 'desc'
      emitter.emit('sort', { type: this.sortType, order: this.sortOrder })
    }
  },
  mounted() {
    emitter.on('sendResult', (result) => {
      this.result = result
    })
  }
}
</script>
