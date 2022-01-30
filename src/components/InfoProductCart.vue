<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order">
        <h3>{{ infoProduct.product.title }}</h3>
        <b>{{ infoProduct.product.price }}</b>
        <span>Артикул: {{ infoProduct.product.id }}</span>
      </li>
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ numberProducts }}</b> товара на сумму <b>{{ totalPrice }}</b></p>
    </div>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
export default {
  filters: {
    numberFormat
  },
  props: {
    infoProduct: {
      type: Object,
      default: () => {}
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    numberProducts: {
      type: Number,
      default: 0
    }
  }
}
</script>
