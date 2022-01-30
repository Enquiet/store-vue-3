<template>
  <ul class="catalog__list">
    <li
      v-for="productItem in productList"
      :key="productItem.id"
      class="catalog__item"
    >
      <ProductItem :product="productItem" />
    </li>
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
  components: { ProductItem },
  props: {
    productList: {
      type: Array,
      default: () => []
    }
  }
}

</script>
