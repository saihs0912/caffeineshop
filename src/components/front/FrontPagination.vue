<template>
    <div class="container mt-4 mb-4">
        <div class="row">
            <div class="col-12">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" v-if="pages.pageNow !== 1">
                            <a class="page-link text-brown" href="#" aria-label="Previous" @click.prevent="updatePage(pages.pageNow - 1)">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item disabled" v-else>
                            <span class="page-link text-brown" aria-hidden="true">&laquo;</span>
                        </li>
                        <li class="page-item" v-for="page in pages.pageTotal" :key="page" :class="{ 'active': page === pages.pageNow }">
                            <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" v-if="pages.pageNow !== pages.pageTotal">
                            <a class="page-link" href="#" aria-label="Next" @click.prevent="updatePage(pages.pageNow + 1)">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                        <li class="page-item disabled" v-else>
                            <span class="page-link text-brown" aria-hidden="true">&raquo;</span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
import emitter from '@/methods/emitter'

export default {
  name: 'FrontPagination',
  data () {
    return {
      pages: {}
    }
  },
  methods: {
    updatePage (updatePage) {
      if (this.pages.pageNow !== updatePage) {
        window.scrollTo({
          top: 0
        })
        emitter.emit('newPage', updatePage)
      }
    }
  },
  mounted () {
    emitter.on('sendPage', num => {
      this.pages = { ...num }
    })
    emitter.on('updatePage', num => {
      this.pages.pageNow = num
    })
  }
}
</script>
