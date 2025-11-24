<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item" v-if="pages.has_pre">
              <a
                class="page-link"
                href="#"
                aria-label="Previous"
                @click.prevent="updatePage(pages.current_page - 1)"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item disabled" v-else>
              <span class="page-link" aria-hidden="true">&laquo;</span>
            </li>
            <li
              class="page-item"
              v-for="page in pages.total_pages"
              :key="page"
              :class="{ active: page === pages.current_page }"
            >
              <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" v-if="pages.has_next">
              <a
                class="page-link"
                href="#"
                aria-label="Next"
                @click.prevent="updatePage(pages.current_page + 1)"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
            <li class="page-item disabled" v-else>
              <span class="page-link" aria-hidden="true">&raquo;</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaginationModal',
  props: ['pages'],
  methods: {
    updatePage(page) {
      window.scrollTo({
        top: 0
      })
      this.$emit('emit-page', page)
    }
  }
}
</script>
