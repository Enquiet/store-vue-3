<template>
  <ul class="catalog__pagination pagination">
    <li
      class="pagination__item"
      @click.prevent="switchesPages(currentPage - 1)"
    >
      <a
        class="pagination__link pagination__link--arrow"
        :class="{'pagination__link--disabled':currentPage === 1 }"
        aria-label="Предыдущая страница"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-left" />
        </svg>
      </a>
    </li>
    <li
      v-for="pageNumber in Pages"
      :key="pageNumber"
      class="pagination__item"
      @click.prevent="paginate(pageNumber)"
    >
      <a
        href="#"
        class="pagination__link"
        :class="{'pagination__link--current' : pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li
      class="pagination__item"
      @click.prevent="switchesPages(currentPage + 1)"
    >
      <a
        class="pagination__link
        pagination__link--arrow"
        :class="{'pagination__link--disabled':currentPage === Pages}"
        href="#"
        aria-label="Следующая страница"
      >
        <svg
          width="8"
          height="14"
          fill="currentColor"
        >
          <use xlink:href="#icon-arrow-right" />
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 0
    },
    allProducts: {
      type: Number,
      default: 0
    },
    PerProducts: {
      type: Number,
      default: 0
    }
  },
  computed: {
    Pages () {
      return Math.ceil(this.allProducts / this.PerProducts)
    }
  },
  methods: {
    paginate (page) {
      this.$emit('update:currentPage', page)
    },
    switchesPages (pages) {
      if (pages >= 1 && pages <= this.Pages) {
        this.paginate(pages)
      }
    }
  }
}
</script>
