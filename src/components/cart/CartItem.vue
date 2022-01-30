<template>
  <li class="cart__item product">
    <router-link
      class="product__pic"
      :to="{name: 'productPage', params: {id: itemProduct.product.id}}"
    >
      <img
        :src="itemProduct.product.image"
        width="120"
        height="120"
        :alt="itemProduct.product.title"
      >
    </router-link>
    <h3 class="product__title">
      {{ itemProduct.product.title }}
    </h3>
    <p class="product__info">
      Объем: <span>128GB</span>
    </p>
    <span class="product__code">
      Артикул: {{ itemProduct.product.id }}
    </span>

    <Counter v-model:product-amaunt="amount" />

    <b class="product__price">
      {{ ProductQuantityPrice }}
    </b>

    <button
      class="product__del button-del"
      type="button"
      aria-label="Удалить товар из корзины"
      @click.prevent="deleteProductToCard(itemProduct.productId)"
    >
      <svg
        width="20"
        height="20"
        fill="currentColor"
      >
        <use xlink:href="#icon-close" />
      </svg>
    </button>
  </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat'
import { mapActions } from 'vuex'
import Counter from '@/components/common/Counter.vue'

export default {
  components: {
    Counter
  },
  filters: {
    numberFormat
  },
  props: {
    itemProduct: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    amount: {
      get () {
        return this.itemProduct.amount
      },
      set (value) {
        this.$store.dispatch('setProductAmountCart', { productId: this.itemProduct.productId, amount: value })
      }
    },
    ProductQuantityPrice () {
      return this.itemProduct.amount * this.itemProduct.product.price
    }
  },
  methods: {
    ...mapActions(['deleteProductToCard'])
  }
}
</script>
