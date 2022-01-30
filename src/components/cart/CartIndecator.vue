<template>
  <router-link
    class="header__cart"
    :to="{name:'cartPage'}"
    aria-label="Корзина с товарами"
  >
    <svg
      width="30"
      height="21"
      fill="currentColor"
    >
      <use xlink:href="#icon-cart" />
    </svg>
    <span
      v-if="numberProduct > 0"
      class="header__count"
      aria-label="Количество товаров"
    >{{ numberProduct }}</span>
  </router-link>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['numberProduct'])
  }
}
</script>
