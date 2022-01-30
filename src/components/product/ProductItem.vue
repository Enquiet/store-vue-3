<template>
  <div>
    <router-link
      class="catalog__pic"
      :to="{name:'productPage', params: {id: product.id}}"
    >
      <img
        :src="product.image"
        alt="Название товара"
      >
    </router-link>
    <h3 class="catalog__title">
      <a href="#">
        {{ product.title }}
      </a>
    </h3>
    <span class="catalog__price">
      {{ product.price }} ₽
    </span>
    <ProductColors
      v-if="product.colors"
      :product-colors="product.colors"
    />
  </div>
</template>

<script>
import ProductColors from './ProductColors.vue'
import switchPages from '@/helpers/switchPages'
import numberFormat from '@/helpers/numberFormat'
export default {
  filters: {
    numberFormat
  },
  components: { ProductColors },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    switchPages
  }
}
</script>
